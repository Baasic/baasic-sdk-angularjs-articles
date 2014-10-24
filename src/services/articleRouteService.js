(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("/article/{?searchQuery,page,rpp,sort,embed,fields,statuses,tags,startDate,endDate}"),
                get: uriTemplateService.parse("/article/{id}/{?embed,fields}"),
                publish: uriTemplateService.parse("/article/publish/{key}/"),
                purge: uriTemplateService.parse("/article/purge/"),
                create: "/article"
            };
        }]);
}(angular, module));