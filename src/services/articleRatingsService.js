(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleRatingsService", ["baasicApiHttp", "baasicArticleRatingsRouteService",
        function (baasicApiHttp, baasicArticleRatingsRouteService) {
            return {
                find: function (params) {
                    //TODO: Add article id to api params
                    var apiParams = {
                        page: params.pageNumber,
                        rpp: params.pageSize,
                        sort: params.orderBy ? params.orderBy + '|' + params.orderDirection : null,
                        searchQuery: params.search
                    };

                    return baasicApiHttp.get(articleRatingsRouteService.find.expand(apiParams));
                },
                get: function (key) {
                    return baasicApiHttp.get(articleRatingsRouteService.get.expand({ key: key }));
                },
                create: function (rating) {
                    return baasicApiHttp.post(articleRatingsRouteService.create, rating);
                },
                update: function (rating) {
                    return baasicApiHttp.put(rating.links('put').href, rating);
                },
                remove: function (rating) {
                    return baasicApiHttp.delete(rating.links('delete').href);
                }
            };
        }]);
}(angular, module));