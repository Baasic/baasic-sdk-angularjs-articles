(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleSettingsRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                get: uriTemplateService.parse("/article-settings/{?embed,fields}"),
				parse: uriTemplateService.parse
            }
        }]);
}(angular, module));