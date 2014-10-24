(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleSettingsService", ["baasicApiHttp", "baasicArticleSettingsRouteService",
        function (baasicApiHttp, baasicArticleSettingsRouteService) {
            return {
                get: function () {
                    return baasicApiHttp.get(articleSettingsRouteService.get.expand());
                },
                update: function (settings) {
                    return baasicApiHttp.put(settings.links('put').href, settings);
                }
            };
        }]);
}(angular, module));