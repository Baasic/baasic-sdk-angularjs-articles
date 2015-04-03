/* globals module */
/**
 * @module baasicArticleSettingsRouteService
 * @description Baasic Article Settings Route Service provides Baasic route templates which can be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `baasicArticleSettingsService` uses `baasicArticleSettingsRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleSettingsRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
				/**
				* Parses get article settings route; this URI template doesn't expose any additional properties.				
				* @method
				* @example baasicArticleSettingsRouteService.permissions.get.expand({id: '<article-id>'});               
				**/ 				
                get: uriTemplateService.parse('article-settings/{?embed,fields}'),
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example baasicArticleSettingsRouteService.parse('route/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
                **/						
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));