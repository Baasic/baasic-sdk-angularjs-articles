(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleTagsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicArticleTagsRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, articleTagsRouteService) {
            return {
				routeService: articleTagsRouteService,
                find: function (data) {
                    return baasicApiHttp.get(articleTagsRouteService.find.expand(baasicApiService.findParams(data)));
                },
                get: function (data) {
                    return baasicApiHttp.get(articleTagsRouteService.get.expand(baasicApiService.getParams(data)));
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