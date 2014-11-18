(function (angular, module, undefined) {
    "use strict";
    module.service("baasicArticleRouteService", ["baasicUriTemplateService",
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse("/articles/{?searchQuery,page,rpp,sort,embed,fields,statuses,tags,startDate,endDate}"),
                get: uriTemplateService.parse("/articles/{id}/{?embed,fields}"),
                publish: uriTemplateService.parse("/articles/{id}/publish/"),
                purge: uriTemplateService.parse("/articles/purge/"),
                create: uriTemplateService.parse("/articles"),
                parse: uriTemplateService.parse,
                ratings: {
                    find: uriTemplateService.parse("/articles/{articleId}/ratings{?page,rpp,sort,embed,fields}"),
                    findByUsername: uriTemplateService.parse("/articles/{articleId}/users/{username}/ratings/{?embed,fields}"),
                    create: uriTemplateService.parse("/articles/{articleId}/ratings/"),
                    parse: uriTemplateService.parse
                },
                tags: {
                    find: uriTemplateService.parse("/articles/{id}/tags/{?searchQuery,page,rpp,sort,embed,fields}"),
                    get: uriTemplateService.parse("/articles/{id}/tags/{tag}/{?embed,fields}"),
                    create: uriTemplateService.parse("/articles/{id}/tags/{tag}/"),
                    parse: uriTemplateService.parse
                }
            };
        }]);
}(angular, module));