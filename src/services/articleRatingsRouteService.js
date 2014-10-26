(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleRatingsRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("/article-ratings/{?searchQuery,page,rpp,sort,embed,fields}"),
				findByUser: uriTemplateService.parse("/article-ratings/{?username,page,rpp,sort,embed,fields}"),
                get: uriTemplateService.parse("/article-ratings/{id}/{?embed,fields}"),
                create: uriTemplateService.parse("/article-ratings"),
				parse: uriTemplateService.parse
            };
        }]);
}(angular, module));