(function (angular, undefined) {
    var module = angular.module("baasic.article", ["baasic.api"]);

    module.config(["$provide", function config($provide) {}]);

    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleRatingsRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("article-ratings/{?searchQuery,page,rpp,sort,embed,fields}"),
                findByUser: uriTemplateService.parse("article-ratings/{?username,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("article-ratings/{id}/{?embed,fields}"),
                create: uriTemplateService.parse("article-ratings"),
                parse: uriTemplateService.parse
            };
        }]);
    }(angular, module));
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleRatingsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicArticleRatingsRouteService", function (baasicApiHttp, baasicApiService, baasicConstants, articleRatingsRouteService) {
            return {
                routeService: articleRatingsRouteService,
                find: function (options) {
                    return baasicApiHttp.get(articleRatingsRouteService.find.expand(baasicApiService.findParams(options)));
                },
                findByUser: function (username, options) {
                    var params = angular.extend({}, options);
                    params.username = username;
                    return baasicApiHttp.get(articleRatingsRouteService.findByUser.expand(baasicApiService.findParams(params)));
                },
                get: function (id, options) {
                    return baasicApiHttp.get(articleRatingsRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                create: function (data) {
                    return baasicApiHttp.post(articleRatingsRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
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
    (function (angular, module, undefined) {
        "use strict";
        module.service("baasicArticleRouteService", ["baasicUriTemplateService", function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("articles/{?searchQuery,page,rpp,sort,embed,fields,statuses,tags,startDate,endDate}"),
                get: uriTemplateService.parse("articles/{id}/{?embed,fields}"),
                publish: uriTemplateService.parse("articles/{id}/publish/"),
                purge: uriTemplateService.parse("articles/purge/"),
                create: uriTemplateService.parse("articles"),
                parse: uriTemplateService.parse,
                ratings: {
                    find: uriTemplateService.parse("articles/{articleId}/ratings{?page,rpp,sort,embed,fields}"),
                    findByUsername: uriTemplateService.parse("articles/{articleId}/users/{username}/ratings/{?embed,fields}"),
                    create: uriTemplateService.parse("articles/{articleId}/ratings/"),
                    parse: uriTemplateService.parse
                },
                tags: {
                    find: uriTemplateService.parse("articles/{id}/tags/{?searchQuery,page,rpp,sort,embed,fields}"),
                    get: uriTemplateService.parse("articles/{id}/tags/{tag}/{?embed,fields}"),
                    create: uriTemplateService.parse("articles/{id}/tags/{tag}/"),
                    parse: uriTemplateService.parse
                }
            };
        }]);
    }(angular, module));
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