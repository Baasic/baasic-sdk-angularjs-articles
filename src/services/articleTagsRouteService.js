/* globals module */

(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleTagsRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
                find: uriTemplateService.parse('article-tags/{?searchQuery,page,rpp,sort,embed,fields}'),
                get: uriTemplateService.parse('article-tags/{id}/{?embed,fields}'),
                create: uriTemplateService.parse('article-tags'),
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));