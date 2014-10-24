(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleService", ["baasicApiHttp", "baasicArticleRouteService",
        function (baasicApiHttp, baasicArticleRouteService) {
            var statuses = {
                none: 0,
                published: 2,
                draft: 1,
                archive: 4
            };

            function toSlug(str) {
                if (_.isUndefined(str) || _.isNull(str) || str === "") {
                    return str;
                }
                str = str.toLowerCase();
                str = str.replace(/[^a-z0-9]+/g, '-');
                str = str.replace(/^-|-$/g, '');
                return str;
            }

            function updateSlug(resource) {
                var newSlug = toSlug(resource.slug);
                if (_.isUndefined(newSlug) || _.isNull(newSlug) || newSlug === "" ||
                    resource.status === statuses.draft) {
                    newSlug = toSlug(resource.title);
                }

                if (!_.isUndefined(newSlug) || !_.isNull(newSlug) || newSlug !== "") {
                    if (!angular.equals(resource.slug, newSlug)) {
                        resource.slug = newSlug;
                    }
                }
            }

            function initTags(resource) {
                if (_.isUndefined(resource)) return;

                resource.tags = [];
                _.each(resource.$tags, function (item) {
                    resource.tags.push({
                        name: item.text,
                        slug: toSlug(item.text)
                    });
                });
            }

            return {
                statuses: statuses,
                find: function (params) {
                    function getStartDate() {
                        if (!_.isUndefined(params.startDate) && !_.isNull(params.startDate)) {
                            return params.startDate.toISOString();
                        }
                        return undefined;
                    }
                    function getEndDate() {
                        if (!_.isUndefined(params.endDate) && !_.isNull(params.endDate)) {
                            return params.endDate.toISOString();
                        }
                        return undefined;
                    }

                    var apiParams = {
                        page: params.pageNumber,
                        rpp: params.pageSize,
                        sort: params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                        searchQuery: params.search,
                        statuses: params.statuses,
                        tags: params.tags,
                        embed: "Author,Tags",
                        startDate: getStartDate(),
                        endDate: getEndDate(),
                        fields: "id,title,slug,authorId,author,publishDate,tags,archiveDate,dateUpdated,status"
                    };

                    return baasicApiHttp.get(articleRouteService.find.expand(apiParams));
                },
                get: function (key) {
                    var apiParams = {
                        id: key,
                        embed: "Tags",
                        fields: undefined
                    };
                    return baasicApiHttp.get(articleRouteService.get.expand(apiParams));
                },
                create: function (resource) {
                    updateSlug(resource);
                    initTags(resource);
                    return baasicApiHttp.post(articleRouteService.create, resource);
                },
                update: function (resource) {
                    if (_.isUndefined(resource.slug) || _.isNull(resource.slug) || resource.slug === "") {
                        updateSlug(resource);
                    }
                    initTags(resource);
                    return baasicApiHttp.put(resource.links('put').href, resource);
                },
                saveDraft: function (resource) {
                    if (_.isUndefined(resource.id)) {
                        //Create new draft
                        return this.create(resource);
                    } else {
                        //Update draft
                        return this.update(resource);
                    }
                },
                remove: function (resource) {
                    return baasicApiHttp.delete(resource.links('delete').href);
                },
                archive: function (resource) {
                    return baasicApiHttp.put(resource.links('archive').href);
                },
                restore: function (resource) {
                    return baasicApiHttp.put(resource.links('restore').href);
                },
                publish: function (resource) {
                    return baasicApiHttp.put(articleRouteService.publish.expand({ key: resource.id }));
                },
                purge: function (data) {
                    return baasicApiHttp.delete(articleRouteService.purge.expand(data));
                },
                updateSlug: updateSlug
            };
        }]);
}(angular, module));