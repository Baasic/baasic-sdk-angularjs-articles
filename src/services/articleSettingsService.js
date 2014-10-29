(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleSettingsService", ["baasicApiHttp", "baasicApiService", "baasicConstants", "baasicArticleSettingsRouteService",
        function (baasicApiHttp, baasicApiService, baasicConstants, articleSettingsRouteService) {
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