(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleRatingsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicArticleRatingsRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, articleRatingsRouteService) {
            return {
				routeService: articleRatingsRouteService,
				find: function (data) {
                    return baasicApiHttp.get(articleRatingsRouteService.find.expand(baasicApiService.findParams(data)));
                },
				findByUser: function (data) {
                    return baasicApiHttp.get(articleRatingsRouteService.findByUser.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(articleRatingsRouteService.get.expand(baasicApiService.getParams(data)));
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