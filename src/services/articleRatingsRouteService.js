(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleRatingsRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("/articlerating/{?searchQuery,page,rpp,sort}"),
                findByArticle: uriTemplateService.parse("/articlerating/article/{articleId}/{?searchQuery,page,rpp,sort}"),
                get: uriTemplateService.parse("/articlerating/{id}"),
                create: "/articlerating"
            };
        }]);
}(angular, module));