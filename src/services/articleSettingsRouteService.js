(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleSettingsRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                get: uriTemplateService.parse("/articlesettings/")
            }
        }]);
}(angular, module));