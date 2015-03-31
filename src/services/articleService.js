/* globals module */
/**
 * @module baasicArticleService
 * @description Baasic Articles Service provides an easy way to consume Baasic Articles REST API.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, articleRouteService) {
		    // https://github.com/yvg/js-replace-diacritics/blob/master/replace-diacritics.js
            var alphabet = {
              a : /[\u0061\u24D0\uFF41\u1E9A\u00E0\u00E1\u00E2\u1EA7\u1EA5\u1EAB\u1EA9\u00E3\u0101\u0103\u1EB1\u1EAF\u1EB5\u1EB3\u0227\u01E1\u00E4\u01DF\u1EA3\u00E5\u01FB\u01CE\u0201\u0203\u1EA1\u1EAD\u1EB7\u1E01\u0105\u2C65\u0250]/ig,
              aa : /[\uA733]/ig,
              ae : /[\u00E6\u01FD\u01E3]/ig,
              ao : /[\uA735]/ig,
              au : /[\uA737]/ig,
              av : /[\uA739\uA73B]/ig,
              ay : /[\uA73D]/ig,
              b : /[\u0062\u24D1\uFF42\u1E03\u1E05\u1E07\u0180\u0183\u0253]/ig,
              c : /[\u0063\u24D2\uFF43\u0107\u0109\u010B\u010D\u00E7\u1E09\u0188\u023C\uA73F\u2184]/ig,
              d : /[\u0064\u24D3\uFF44\u1E0B\u010F\u1E0D\u1E11\u1E13\u1E0F\u0111\u018C\u0256\u0257\uA77A]/ig,
              dz : /[\u01F3\u01C6]/ig,
              e : /[\u0065\u24D4\uFF45\u00E8\u00E9\u00EA\u1EC1\u1EBF\u1EC5\u1EC3\u1EBD\u0113\u1E15\u1E17\u0115\u0117\u00EB\u1EBB\u011B\u0205\u0207\u1EB9\u1EC7\u0229\u1E1D\u0119\u1E19\u1E1B\u0247\u025B\u01DD]/ig,
              f : /[\u0066\u24D5\uFF46\u1E1F\u0192\uA77C]/ig,
              g : /[\u0067\u24D6\uFF47\u01F5\u011D\u1E21\u011F\u0121\u01E7\u0123\u01E5\u0260\uA7A1\u1D79\uA77F]/ig,
              h : /[\u0068\u24D7\uFF48\u0125\u1E23\u1E27\u021F\u1E25\u1E29\u1E2B\u1E96\u0127\u2C68\u2C76\u0265]/ig,
              hv : /[\u0195]/ig,
              i : /[\u0069\u24D8\uFF49\u00EC\u00ED\u00EE\u0129\u012B\u012D\u00EF\u1E2F\u1EC9\u01D0\u0209\u020B\u1ECB\u012F\u1E2D\u0268\u0131]/ig,
              j : /[\u006A\u24D9\uFF4A\u0135\u01F0\u0249]/ig,
              k : /[\u006B\u24DA\uFF4B\u1E31\u01E9\u1E33\u0137\u1E35\u0199\u2C6A\uA741\uA743\uA745\uA7A3]/ig,
              l : /[\u006C\u24DB\uFF4C\u0140\u013A\u013E\u1E37\u1E39\u013C\u1E3D\u1E3B\u017F\u0142\u019A\u026B\u2C61\uA749\uA781\uA747]/ig,
              lj : /[\u01C9]/ig,
              m : /[\u006D\u24DC\uFF4D\u1E3F\u1E41\u1E43\u0271\u026F]/ig,
              n : /[\u006E\u24DD\uFF4E\u01F9\u0144\u00F1\u1E45\u0148\u1E47\u0146\u1E4B\u1E49\u019E\u0272\u0149\uA791\uA7A5]/ig,
              nj : /[\u01CC]/ig,
              o : /[\u006F\u24DE\uFF4F\u00F2\u00F3\u00F4\u1ED3\u1ED1\u1ED7\u1ED5\u00F5\u1E4D\u022D\u1E4F\u014D\u1E51\u1E53\u014F\u022F\u0231\u00F6\u022B\u1ECF\u0151\u01D2\u020D\u020F\u01A1\u1EDD\u1EDB\u1EE1\u1EDF\u1EE3\u1ECD\u1ED9\u01EB\u01ED\u00F8\u01FF\u0254\uA74B\uA74D\u0275]/ig,
              oi : /[\u01A3]/ig,
              ou : /[\u0223]/ig,
              oo : /[\uA74F]/ig,
              p : /[\u0070\u24DF\uFF50\u1E55\u1E57\u01A5\u1D7D\uA751\uA753\uA755]/ig,
              q : /[\u0071\u24E0\uFF51\u024B\uA757\uA759]/ig,
              r : /[\u0072\u24E1\uFF52\u0155\u1E59\u0159\u0211\u0213\u1E5B\u1E5D\u0157\u1E5F\u024D\u027D\uA75B\uA7A7\uA783]/ig,
              s : /[\u0073\u24E2\uFF53\u015B\u1E65\u015D\u1E61\u0161\u1E67\u1E63\u1E69\u0219\u015F\u023F\uA7A9\uA785\u1E9B]/ig,
              ss : /[\u00DF\u1E9E]/ig,
              t : /[\u0074\u24E3\uFF54\u1E6B\u1E97\u0165\u1E6D\u021B\u0163\u1E71\u1E6F\u0167\u01AD\u0288\u2C66\uA787]/ig,
              tz : /[\uA729]/ig,
              u : /[\u0075\u24E4\uFF55\u00F9\u00FA\u00FB\u0169\u1E79\u016B\u1E7B\u016D\u00FC\u01DC\u01D8\u01D6\u01DA\u1EE7\u016F\u0171\u01D4\u0215\u0217\u01B0\u1EEB\u1EE9\u1EEF\u1EED\u1EF1\u1EE5\u1E73\u0173\u1E77\u1E75\u0289]/ig,
              v : /[\u0076\u24E5\uFF56\u1E7D\u1E7F\u028B\uA75F\u028C]/ig,
              vy : /[\uA761]/ig,
              w : /[\u0077\u24E6\uFF57\u1E81\u1E83\u0175\u1E87\u1E85\u1E98\u1E89\u2C73]/ig,
              x : /[\u0078\u24E7\uFF58\u1E8B\u1E8D]/ig,
              y : /[\u0079\u24E8\uFF59\u1EF3\u00FD\u0177\u1EF9\u0233\u1E8F\u00FF\u1EF7\u1E99\u1EF5\u01B4\u024F\u1EFF]/ig,
              z : /[\u007A\u24E9\uFF5A\u017A\u1E91\u017C\u017E\u1E93\u1E95\u01B6\u0225\u0240\u2C6C\uA763]/ig,
              '' : /[\u0300\u0301\u0302\u0303\u0308]/ig
            };
            function replaceDiacritics(str) {
              for (var letter in alphabet) {
                str = str.replace(alphabet[letter], letter);
              }
              return str;
            }
			
            var statuses = {
                none: 0,
                published: 2,
                draft: 1,
                archive: 4
            };

            function toSlug(str) {
                if (angular.isUndefined(str) || str === null || str === '') {
                    return str;
                }
				str = replaceDiacritics(str);
                str = str.toLowerCase();
                str = str.replace(/[^a-z0-9]+/g, '-');
                str = str.replace(/^-|-$/g, '');
                return str;
            }

            function updateSlug(resource) {
                var newSlug = toSlug(resource.slug);
                if (angular.isUndefined(newSlug) || newSlug === null || newSlug === '') {
                    newSlug = toSlug(resource.title);
                }

                if (!angular.isUndefined(newSlug) || newSlug !== null || newSlug !== '') {
                    if (!angular.equals(resource.slug, newSlug)) {
                        resource.slug = newSlug;
                    }
                }
            }

            return {
                routeService: articleRouteService,
                /**
                * Contains a refrerence to valid list of article statuses. It returns an object containing all article statuses: `{ published: 2, draft: 1, archive: 4 }`
                * @method        
                * @example baasicArticleService.statuses.archive;
                **/ 				
                statuses: statuses,
                /**
                * Parses article object and generates a valid slug.
                * @method        
                * @example baasicArticleService.updateslug(article);
                **/ 				
                updateSlug: updateSlug,
                /**
                * Generates and returns a valid slug string.
                * @method        
                * @example baasicArticleService.toSlug("<slug>");
                **/ 				
                toSlug: toSlug,
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article resources.
                 * @method        
                 * @example 
baasicArticleService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : "publishDate",
  orderDirection : "desc",
  search : "<search-phrase>"
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                **/  				
                find: function (options) {
                    function getStartDate() {
                        if (!angular.isUndefined(options.startDate) && options.startDate !== null) {
                            return options.startDate.toISOString();
                        }
                        return undefined;
                    }
                    function getEndDate() {
                        if (!angular.isUndefined(options.endDate) && options.endDate !== null) {
                            return options.endDate.toISOString();
                        }
                        return undefined;
                    }

                    var params = baasicApiService.findParams(options);
                    params.startDate = getStartDate();
                    params.endDate = getEndDate();
                    return baasicApiHttp.get(articleRouteService.find.expand(params));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the article resource.
                 * @method        
                 * @example 
baasicArticleService.get("<article-id>")
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/ 				
                get: function (id, options) {
                    return baasicApiHttp.get(articleRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                 /**
                 * Returns a promise that is resolved once the create article action has been performed.
                 * @method        
                 * @example 
baasicArticleService.create({
  publishDate : new Date(),
  title : '<title>',
  content : '<content>'
  slug : '',
  status : baasicArticleService.statuses.draft;
  $tags : ["<tag1>", "<tag2>"]
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                 **/ 				
                create: function (data) {
					return baasicApiHttp.post(articleRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update article action has been performed.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
existingResource.title = '<title>';
baasicArticleService.update(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/					
                update: function (data) {
					var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the saveDraft article action has been performed. The action will determine whether the draft should be created or updated.
                 * @method        
                 * @example 
baasicArticleService.saveDraft(article)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/					
                saveDraft: function (data) {
                    if (angular.isUndefined(data.id)) {
                        //Create new draft
                        return this.create(data);
                    }
                    //Update draft
                    return this.update(data);
                },
                 /**
                 * Returns a promise that is resolved once the remove article action has been performed. If the action is successfully completed the article resource is permanently removed from the system.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleService.remove(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                 /**
                 * Returns a promise that is resolved once the archive article action has been performed.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleService.archive(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/						
                archive: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('archive').href);
                },
                 /**
                 * Returns a promise that is resolved once the restore article action has been performed. This action will restore a previously archived article resource.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleService.restore(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                restore: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('restore').href);
                },
                 /**
                 * Returns a promise that is resolved once the unpublish article action has been performed.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleService.unpublish(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/						
                unpublish: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('unpublish').href);
                },
                 /**
                 * Returns a promise that is resolved once the publish article action has been performed.
                 * @method        
                 * @example 	 
baasicArticleService.publish("<article-id>")
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/					
                publish: function (id, options) {
                    return baasicApiHttp.put(articleRouteService.publish.expand(baasicApiService.getParams(id, options)));
                },
                 /**
                 * Returns a promise that is resolved once the purge articles action has been performed. This action will delete all article resources from the system.
                 * @method        
                 * @example 	 
baasicArticleService.publish("<article-id>")
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/						
                purge: function (options) {
                    return baasicApiHttp.delete(articleRouteService.purge.expand(options));
                },
                ratings: {
                    /**
                    * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article rating resources.
                    * @method ratings.find    
                    * @example 
baasicArticleService.ratings.find("<article-id>")
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                    **/ 				
                    find: function (articleId, options) {
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.ratings.find.expand(baasicApiService.findParams(params)));
                    },
                    /**
                    * Returns a promise that is resolved once the findByUsername action has been performed. Success response returns a list of article rating resources.
                    * @method ratings.findByUsername    
                    * @example 
baasicArticleService.ratings.findByUsername("<article-id>", "<username>")
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                    **/ 					
                    findByUsername: function (articleId, username, options) {
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        params.username = username;
                        return baasicApiHttp.get(articleRouteService.ratings.findByUsername.expand(baasicApiService.findParams(params)));
                    },
                    /**
                    * Returns a promise that is resolved once the create article rating action has been performed.
                    * @method  ratings.create      
                    * @example 
baasicArticleService.ratings.create({
  articleId : "<article-id>",
  rating : 5,
  userId : "<user-id>"
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/ 						
                    create: function (data) {
                        return baasicApiHttp.post(articleRouteService.ratings.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    },
                    /**
                    * Returns a promise that is resolved once the update article rating action has been performed.
                    * @method ratings.update       
                    * @example 
// Existing resource is a resource previously fetched using get action.
existingResource.rating = 4;
baasicArticleService.update(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/						
                    update: function (data) {
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                    },
                    /**
                    * Returns a promise that is resolved once the remove article rating action has been performed. If the action is successfully completed the article rating resource is permanently removed from the system.
                    * @method ratings.remove       
                    * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleService.remove(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/							
                    remove: function (data) {
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                    },
                    /**
                    * Returns a promise that is resolved once the removeAll article rating action has been performed. If the action is successfully completed the article rating resources are permanently removed from the system for a specified article resource.
                    * @method ratings.removeAll
                    * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleService.remove(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/						
                    removeAll: function (data) {
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-ratings-by-article').href);
                    }
                },
                tags: {
                    /**
                    * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article tag resources.
                    * @method tags.find    
                    * @example 
baasicArticleService.tags.find("<article-id>")
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                    **/ 				
                    find: function (articleId, options) {
                        var params = angular.copy(options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.tags.find.expand(baasicApiService.findParams(params)));
                    },
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns the article tag resource.
                    * @method tags.get       
                    * @example 
baasicArticleRatingsService.get("<article-id")
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/ 					
                    get: function (articleId, id, options) {
                        var params = angular.copy(options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.tags.get.expand(baasicApiService.getParams(id, params)));
                    },
                    /**
                    * Returns a promise that is resolved once the create article rating action has been performed.
                    * @method  tags.create      
                    * @example 
baasicArticleService.tags.create({
  articleId : "<article-id>",
  tag : {
    slug : "<slug>",
    sortOrder : 1,
    tag : "<tag>"
  }
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/ 					
                    create: function (data) {
                        return baasicApiHttp.post(articleRouteService.tags.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    },
                     /**
                     * Returns a promise that is resolved once the remove article tag action has been performed. If the action is successfully completed the article tag resource is permanently removed from the system.
                     * @method tags.remove       
                     * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleService.tags.remove(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/						
                    remove: function (data) {
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                    },
                    /**
                    * Returns a promise that is resolved once the removeAll article tag action has been performed. If the action is successfully completed the article tag resources are permanently removed from the system for a specified article resource.
                    * @method tags.removeAll
                    * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleService.tags.removeAll(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				    **/					
                    removeAll: function (data) {
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-tags-by-article').href);
                    }
                },
                permissions: {
                    /**
                    * Returns a promise that is resolved once the get action has been performed. Success response returns a list of article permissions.
                    * @method permissions.get       
                    * @example 
baasicArticleService.permissions.get({id: "<article-id>"})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                    **/ 					
                    get: function (options) {
                        var params = angular.copy(options);
                        return baasicApiHttp.get(articleRouteService.permissions.get.expand(params));
                    },
                    /**
                    * Returns a promise that is resolved once the update permissions action has been performed.
                    * @method permissions.update      
                    * @example 
// Existing resource is a resource previously fetched using get action.
baasicArticleService.permissions.update(existingResource)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/							
                    update: function (options) {
                        var params = angular.copy(options);
                        return baasicApiHttp.put(articleRouteService.permissions.get.expand(params), params[baasicConstants.modelPropertyName]);
                    },
                    /**
                    * Returns a promise that is resolved once the removeByUser action has been performed. This action deletes all ACL assigned to the specified user and article resource.
                    * @method permissions.update      
                    * @example 
baasicArticleService.permissions.removeByUser("<access-action>", "<username>")
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/						
                    removeByUser: function (action, user, data) {
                        var params = baasicApiService.removeParams(data);
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(articleRouteService.permissions.deleteByUser.expand(params));
                    },
                    /**
                    * Returns a promise that is resolved once the removeByRole action has been performed. This action deletes all ACL assigned to the specified role and article resource.
                    * @method permissions.update      
                    * @example 
baasicArticleService.permissions.removeByRole("<access-action>", "<role-name>")
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				    **/						
                    removeByRole: function (action, role, data) {
                        var params = baasicApiService.removeParams(data);
                        params.role = role;
                        params.accessAction = action;
                        return baasicApiHttp.delete(articleRouteService.permissions.deleteByRole.expand(params));
                    }
                }
            };
        }]);
}(angular, module));
