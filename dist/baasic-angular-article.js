(function (angular, undefined) {
    /** 
     * @overview The angular.module is a global place for creating, registering or retrieving modules. All modules should be registered in an application using this mechanism.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */

    /**
     * An angular module is a container for the different parts of your app - services, directives etc. In order to use baasic.article module functionality it must be added as a dependency to your app.
     * @module baasic.article
     * @example
     (function (Main) {
     "use strict";
     var dependencies = [
     "baasic.api",
     "baasic.membership",
     "baasic.security",
     "baasic.appSettings",
     "baasic.article",
     "baasic.dynamicResource",
     "baasic.keyValue",
     "baasic.valueSet"
     ];
     Main.module = angular.module("myApp.Main", dependencies);
     }
     (MyApp.Modules.Main = {})); 
     */
    var module = angular.module("baasic.article", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    /**
     * @module baasicArticleRatingsRouteService
     **/

    /** 
     * @overview Article ratings route service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleRatingsRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find article rating route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                 * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the role property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicArticleRatingsRouteService.find.expand({searchQuery: "searchTerm"});               
                 **/
                find: uriTemplateService.parse("article-ratings/{?searchQuery,page,rpp,sort,embed,fields}"),
                /**
                 * Parses findByUser article rating route which can be expanded with additional options. Supported items are: 
                 * - `username` - A value that uniquely identifies a user which has created an article rating.
                 * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the role property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicArticleRatingsRouteService.find.expand({username: "username"});               
                 **/
                findByUser: uriTemplateService.parse("article-ratings/{?username,page,rpp,sort,embed,fields}"),
                /**
                 * Parses get article rating route which must be expanded with the Id of the previously created resource in the system. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicArticleRatingsRouteService.get.expand({id: "uniqueID"});               
                 **/
                get: uriTemplateService.parse("article-ratings/{id}/{?embed,fields}"),
                /**
                 * Parses create article rating route, this URI template does not expose any additional options.
                 * @method        
                 * @example baasicArticleRatingsRouteService.create.expand({});              
                 **/
                create: uriTemplateService.parse("article-ratings"),
                /**
                 * Parses change password route, URI template should be expanded with the Username of the user resource whose password should be updated.
                 * @method        
                 * @example baasicUserRouteService.changePassword.expand({userName: "userName"});              
                 **/
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    /**
     * @module baasicArticleRatingsService
     **/

    /** 
     * @overview Article ratings service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleRatingsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicArticleRatingsRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, articleRatingsRouteService) {
            return {
                routeService: articleRatingsRouteService,
                /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article rating resources.
                 * @method        
                 * @example 
                 baasicArticleRatingsService.find({
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : "article.title",
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
                    return baasicApiHttp.get(articleRatingsRouteService.find.expand(baasicApiService.findParams(options)));
                },
                /**
                 * Returns a promise that is resolved once the findByUser action has been performed. Success response returns a list of article rating resources.
                 * @method        
                 * @example 
                 baasicArticleRatingsService.find("userName", {
                 pageNumber : 1,
                 pageSize : 10,
                 orderBy : "article.title",
                 orderDirection : "desc"
                 })
                 .success(function (collection) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                findByUser: function (username, options) {
                    var params = angular.extend({}, options);
                    params.username = username;
                    return baasicApiHttp.get(articleRatingsRouteService.findByUser.expand(baasicApiService.findParams(params)));
                },
                /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the article rating resource.
                 * @method        
                 * @example 
                 baasicArticleRatingsService.get("uniqueID")
                 .success(function (data) {
                 // perform success action here
                 })
                 .error(function (response, status, headers, config) {
                 // perform error handling here
                 });
                 **/
                get: function (id, options) {
                    return baasicApiHttp.get(articleRatingsRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                /**
                 * Returns a promise that is resolved once the create article rating action has been performed.
                 * @method        
                 * @example 
                 baasicArticleRatingsService.create({
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
                    return baasicApiHttp.post(articleRatingsRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                /**
                 * Returns a promise that is resolved once the update article rating action has been performed.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 existingResource.rating = 4;
                 baasicArticleRatingsService.update(existingResource)
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
                 * Returns a promise that is resolved once the remove article rating action has been performed. If the action is successfully completed the resource is permanently removed from the system.
                 * @method        
                 * @example 
                 // Existing resource is a resource previously fetched using get action.
                 baasicArticleRatingsService.remove(existingResource)
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
                }
            };
        }]);
    }(angular, module));
    /**
     * @module baasicArticleRouteService
     **/

    /** 
     * @overview Article ratings route service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                /**
                 * Parses find article route which can be expanded with additional options. Supported items are: 
                 * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                 * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                 * - `rpp` - A value used to limit the size of result set per page.
                 * - `sort` - A string used to set the role property to sort the result collection by.
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * - `startDate` - A value used to specify the article creation date starting from which article resource collection should be returned.
                 * - `endDate` - A value used to specify the article creation date until (and including) which article resource collection should be returned.
                 * - `statuses` - Comma separated list of article statuses that specify where search should be done (Allowed statuses: Published, Draft and Archived).
                 * -  `tags` - A value used to restrict the search to article resources with these tags. Multiple tags should be comma separated.        				
                 * @method        
                 * @example baasicArticleRouteService.find.expand({searchQuery: "searchTerm"});               
                 **/
                find: uriTemplateService.parse("articles/{?searchQuery,page,rpp,sort,embed,fields,statuses,tags,startDate,endDate}"),
                /**
                 * Parses get article route which must be expanded with the Id of the previously created resource in the system. Additional expand supported items are:
                 * - `embed` - Comma separated list of resources to be contained within the current representation.
                 * @method        
                 * @example baasicArticleRouteService.get.expand({id: "uniqueID"});               
                 **/
                get: uriTemplateService.parse("articles/{id}/{?embed,fields}"),
                /**
                 * Parses publish article route which must be expanded with the Id of the previously created resource in the system.
                 * @method        
                 * @example baasicArticleRouteService.publish.expand({id: "uniqueID"});               
                 **/
                publish: uriTemplateService.parse("articles/{id}/publish/"),
                /**
                 * Parses purge article route, this URI template doesn't expose any additional properties.
                 * @method        
                 * @example baasicArticleRouteService.purge.expand({id: "uniqueID"});               
                 **/
                purge: uriTemplateService.parse("articles/purge/"),
                /**
                 * Parses create article route, this URI template doesn't expose any additional properties.
                 * @method        
                 * @example baasicArticleRouteService.create.expand({id: "uniqueID"});               
                 **/
                create: uriTemplateService.parse("articles"),
                /**
                 * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                 * @method
                 * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                 **/
                parse: uriTemplateService.parse,
                ratings: {
                    /**
                     * Parses find article rating route which can be expanded with additional options. Supported items are: 
                     * - `articleId` - Id of the article.
                     * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the role property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method ratings.find       
                     * @example baasicArticleRatingsRouteService.ratings.find.expand({articleId`: "uniqueID"});               
                     **/
                    find: uriTemplateService.parse("articles/{articleId}/ratings{?page,rpp,sort,embed,fields}"),
                    /**
                     * Parses findByUser article rating route which can be expanded with additional options. Supported items are: 
                     * - `articleId` - Id of the article.
                     * - `username` - A value that uniquely identifies a user which has created an article rating.
                     * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the role property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method ratings.findByUsername       
                     * @example baasicArticleRatingsRouteService.ratings.findByUsername.expand({articleId: "uniqueID", username: "username"});               
                     **/
                    findByUsername: uriTemplateService.parse("articles/{articleId}/users/{username}/ratings/{?embed,fields}"),
                    /**
                     * Parses create article rating route, this URI template should be expanded with the Id of the article.
                     * @method ratings.create       
                     * @example baasicArticleRatingsRouteService.ratings.create.expand({articleId: "uniqueID"});              
                     **/
                    create: uriTemplateService.parse("articles/{articleId}/ratings/"),
                    /**
                     * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                     * @method ratings.parse
                     * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                     **/
                    parse: uriTemplateService.parse
                },
                tags: {
                    /**
                     * Parses find article tags route which can be expanded with additional options. Supported items are: 
                     * - `id` - Id of the article.
                     * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                     * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                     * - `rpp` - A value used to limit the size of result set per page.
                     * - `sort` - A string used to set the role property to sort the result collection by.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method tags.find       
                     * @example baasicArticleRatingsRouteService.tags.find.expand({id: "uniqueID", searchQuery: "searchTerm"});               
                     **/
                    find: uriTemplateService.parse("articles/{id}/tags/{?searchQuery,page,rpp,sort,embed,fields}"),
                    /**
                     * Parses get article tags route which can be expanded with additional options. Supported items are: 
                     * - `id` - Id of the article.					
                     * - `tag` - Article slug which uniquely identifies article tag resource that needs to be retrieved.
                     * - `embed` - Comma separated list of resources to be contained within the current representation.
                     * @method tags.get       
                     * @example baasicArticleRatingsRouteService.tags.find.expand({id: "uniqueID", tag: "keyword"});               
                     **/
                    get: uriTemplateService.parse("articles/{id}/tags/{tag}/{?embed,fields}"),
                    /**
                     * Parses create article tag route, this URI template should be expanded with the Id of the article.
                     * @method tags.create       
                     * @example baasicArticleRatingsRouteService.tags.create.expand({id: "uniqueID"});              
                     **/
                    create: uriTemplateService.parse("articles/{id}/tags/{tag}/"),
                    /**
                     * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                     * @method tags.parse
                     * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                     **/
                    parse: uriTemplateService.parse
                },
                permissions: {
                    /**
                     * Parses get article permissions route, this URI template should be expanded with the Id of the article.					
                     * @method permissions.get       
                     * @example baasicArticleRatingsRouteService.permissions.get.expand({id: "articleId"});               
                     **/
                    get: uriTemplateService.parse("articles/{id}/permissions/{?fields}"),
                    /**
                     * Parses update article permissions route, this URI template should be expanded with the Id of the article.					
                     * @method permissions.update       
                     * @example baasicArticleRatingsRouteService.permissions.update.expand({id: "articleId"});               
                     **/
                    update: uriTemplateService.parse("articles/{id}/permissions/{?fields}"),
                    /**
                     * Parses deleteByUser article permissions route which can be expanded with additional options. Supported items are:
                     * - `id` - Id of the article.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified resource.
                     * - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
                     * @method permissions.deleteByUser       
                     * @example baasicArticleRatingsRouteService.permissions.deleteByUser.expand({id: "articleId", accessAction: "read", user: "username"});               
                     **/
                    deleteByUser: uriTemplateService.parse("articles/{id}/permissions/actions/{accessAction}/users/{user}/"),
                    /**
                     * Parses deleteByUser article permissions route which can be expanded with additional options. Supported items are:
                     * - `id` - Id of the article.
                     * - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified resource.
                     * - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
                     * @method permissions.deleteByRole       
                     * @example baasicArticleRatingsRouteService.permissions.deleteByRole.expand({id: "articleId", accessAction: "read", role: "roleName"});               
                     **/
                    deleteByRole: uriTemplateService.parse("articles/{id}/permissions/actions/{accessAction}/roles/{role}/")
                }
            };
        }]);
    }(angular, module));

    /**
     * @module baasicArticleService
     **/

    /** 
     * @overview Article service.
     * @copyright (c) 2015 Mono-Software
     * @license MIT
     * @author Mono-Software
     */
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicArticleRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, articleRouteService) {
            var statuses = {
                none: 0,
                published: 2,
                draft: 1,
                archive: 4
            };

            function toSlug(str) {
                if (angular.isUndefined(str) || str === null || str === "") {
                    return str;
                }
                str = str.toLowerCase();
                str = str.replace(/[^a-z0-9]+/g, '-');
                str = str.replace(/^-|-$/g, '');
                return str;
            }

            function updateSlug(resource) {
                var newSlug = toSlug(resource.slug);
                if (angular.isUndefined(newSlug) || newSlug === null || newSlug === "") {
                    newSlug = toSlug(resource.title);
                }

                if (!angular.isUndefined(newSlug) || !(newSlug === null) || newSlug !== "") {
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
                updateSlug: updateSlug,
                toSlug: toSlug,
                find: function (options) {
                    function getStartDate() {
                        if (!angular.isUndefined(options.startDate) && !(options.startDate === null)) {
                            return options.startDate.toISOString();
                        }
                        return undefined;
                    }

                    function getEndDate() {
                        if (!angular.isUndefined(options.endDate) && !(options.endDate === null)) {
                            return options.endDate.toISOString();
                        }
                        return undefined;
                    }

                    var params = baasicApiService.findParams(options);
                    params.startDate = getStartDate();
                    params.endDate = getEndDate();
                    return baasicApiHttp.get(articleRouteService.find.expand(params));
                },
                get: function (id, options) {
                    return baasicApiHttp.get(articleRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                create: function (data) {
                    updateSlug(data);
                    return baasicApiHttp.post(articleRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    if (angular.isUndefined(data.slug) || (data.slug === null) || data.slug === "") {
                        updateSlug(data);
                    }
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                saveDraft: function (data) {
                    if (angular.isUndefined(data.id)) {
                        //Create new draft
                        return this.create(data);
                    }
                    //Update draft
                    return this.update(data);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                },
                archive: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('archive').href);
                },
                restore: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('restore').href);
                },
                unpublish: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('unpublish').href);
                },
                publish: function (id, options) {
                    return baasicApiHttp.put(articleRouteService.publish.expand(baasicApiService.getParams(id, options)));
                },
                purge: function (options) {
                    return baasicApiHttp.delete(articleRouteService.purge.expand(options));
                },
                ratings: {
                    find: function (articleId, options) {
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.ratings.find.expand(baasicApiService.findParams(params)));
                    },
                    findByUsername: function (articleId, username, options) {
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        params.username = username;
                        return baasicApiHttp.get(articleRouteService.ratings.findByUsername.expand(baasicApiService.findParams(params)));
                    },
                    create: function (data) {
                        return baasicApiHttp.post(articleRouteService.ratings.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    },
                    update: function (data) {
                        var params = baasicApiService.updateParams(data);
                        return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                    },
                    remove: function (data) {
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                    },
                    removeAll: function (data) {
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-ratings-by-article').href);
                    }
                },
                tags: {
                    find: function (articleId, options) {
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.tags.find.expand(baasicApiService.findParams(params)));
                    },
                    get: function (articleId, id, options) {
                        var params = angular.extend({}, options);
                        params.articleId = articleId;
                        return baasicApiHttp.get(articleRouteService.tags.get.expand(baasicApiService.getParams(id, params)));
                    },
                    create: function (data) {
                        return baasicApiHttp.post(articleRouteService.tags.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                    },
                    remove: function (data) {
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                    },
                    removeAll: function (data) {
                        var params = baasicApiService.removeParams(data);
                        return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete-tags-by-article').href);
                    }
                },
                permissions: {
                    get: function (options) {
                        var params = angular.extend({}, options);
                        return baasicApiHttp.get(articleRouteService.permissions.get.expand(params));
                    },
                    update: function (options) {
                        var params = angular.extend({}, options);
                        return baasicApiHttp.put(articleRouteService.permissions.get.expand(params), params[baasicConstants.modelPropertyName]);
                    },
                    removeByUser: function (action, user, data) {
                        var params = baasicApiService.removeParams(data);
                        params.user = user;
                        params.accessAction = action;
                        return baasicApiHttp.delete(articleRouteService.permissions.deleteByUser.expand(params));
                    },
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

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleSettingsRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                get: uriTemplateService.parse("article-settings/{?embed,fields}"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleSettingsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicArticleSettingsRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, articleSettingsRouteService) {
            return {
                routeService: articleSettingsRouteService,
                get: function (options) {
                    return baasicApiHttp.get(articleSettingsRouteService.get.expand(baasicApiService.getParams(options)));
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                }
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleTagsRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("article-tags/{?searchQuery,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("article-tags/{id}/{?embed,fields}"),
                create: uriTemplateService.parse("article-tags"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleTagsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicArticleTagsRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, articleTagsRouteService) {
            return {
                routeService: articleTagsRouteService,
                find: function (options) {
                    return baasicApiHttp.get(articleTagsRouteService.find.expand(baasicApiService.findParams(options)));
                },
                get: function (id, options) {
                    return baasicApiHttp.get(articleTagsRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                create: function (data) {
                    return baasicApiHttp.post(articleTagsRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
            };
        }]);
    }(angular, module));
})(angular);