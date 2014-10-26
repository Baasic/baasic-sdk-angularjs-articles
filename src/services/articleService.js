(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicArticleRouteService",
		function (baasicApiHttp, baasicApiService, baasicConstants, articleRouteService) {
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
                if (angular.isUndefined(newSlug) || newSlug === null || newSlug === "" ||
                    resource.status === statuses.draft) {
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
				find: function (data) {
					function getStartDate() {
                        if (!angular.isUndefined(data.startDate) && !(data.startDate === null)) {
                            return data.startDate.toISOString();
                        }
                        return undefined;
                    }
                    function getEndDate() {
                        if (!angular.isUndefined(data.endDate) && !(data.endDate === null)) {
                            return data.endDate.toISOString();
                        }
                        return undefined;
                    }

					var apiData = baasicApiService.findParams(data);
					apiData.startDate = getStartDate();
                    apiData.endDate = getEndDate();
                    return baasicApiHttp.get(articleRouteService.find.expand(apiData));
                },
				get: function (data) {
                    return baasicApiHttp.get(articleRouteService.get.expand(baasicApiService.getParams(data)));
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
                    } else {
                        //Update draft
                        return this.update(data);
                    }
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
                publish: function (data) {
                    return baasicApiHttp.put(articleRouteService.publish.expand(baasicApiService.getParams(data)));
                },
                purge: function (data) {
                    return baasicApiHttp.delete(articleRouteService.purge.expand(data));
                },
                ratings: {
					find: function (data) {
						return baasicApiHttp.get(articleRouteService.ratings.find.expand(baasicApiService.findParams(data)));
					},
					findByUsername: function (data) {
						return baasicApiHttp.get(articleRouteService.ratings.findByUsername.expand(baasicApiService.findParams(data)));
					},
					create: function (data) {
						return baasicApiHttp.post(articleRouteService.ratings.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
					},
					update: function (data) {
						var params = baasicApiService.updateParams(data);
						return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
					},
					remove: function (data) {
						var params = baasicApiService.removeParams(data);
						return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
					}
				},
				tags: {
					find: function (data) {
						return baasicApiHttp.get(articleRouteService.tags.find.expand(baasicApiService.findParams(data)));
					},
					get: function (data) {
						return baasicApiHttp.get(articleRouteService.tags.get.expand(baasicApiService.getParams(data)));
					},
					create: function (data) {
						return baasicApiHttp.post(articleRouteService.tags.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
					},					
					remove: function (data) {
						var params = baasicApiService.removeParams(data);
						return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
					}
				}
            };
        }]);
}(angular, module));