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
                * Contains a refrerence to valid list of article statuses. Valid article statuses are: none, published, draft and archive.
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
                * @example baasicArticleService.toSlug("articleSlug");
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
  search : "searchTerm"
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
baasicArticleService.get("uniqueID")
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
  title : 'Lorem ipsum',
  content : 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque nec quam magna. Maecenas non quam eget dui accumsan aliquam.'
  slug : '',
  status : baasicArticleService.statuses.draft;
  $tags : ["lorem", "ipsum"]
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
existingResource.title = 'Lorem ipsum dolor sit amet';
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
baasicArticleService.publish("uniqueID")
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
baasicArticleService.publish("uniqueID")
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
baasicArticleService.ratings.find("uniqueID")
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
baasicArticleService.ratings.findByUsername("uniqueID", "userName")
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
  articleId : "articleId",
  rating : 5,
  userId : "userId"
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
baasicArticleService.tags.find("uniqueID")
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
baasicArticleRatingsService.get("uniqueID")
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
  articleId : "uniqueId",
  tag : {
    slug : "slug",
    sortOrder : 1,
    tag : "tag"
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
baasicArticleService.permissions.get({id: "uniqueId"})
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
baasicArticleService.permissions.removeByUser("read", "userName")
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
baasicArticleService.permissions.removeByRole("read", "role name")
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
