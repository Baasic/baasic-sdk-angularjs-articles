/* globals module */
/**
 * @module baasicArticleSettingsRouteService
**/

/** 
 * @overview Article settings route service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleSettingsRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
				/**
				* Parses get article settings route; this URI template doesn't expose any additional properties.				
				* @method
				* @example baasicArticleRatingsRouteService.permissions.get.expand({id: "articleId"});               
				**/ 				
                get: uriTemplateService.parse('article-settings/{?embed,fields}'),
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                **/						
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));