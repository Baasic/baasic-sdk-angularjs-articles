﻿/* globals module */
/**
 * @module baasicArticleSettingsRouteService
 * @description Baasic Article Settings Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Settings Route Service to obtain a needed routes while some routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
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
/**
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about Baasic REST API end-points.
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
 - All end-point objects are transformed by the associated route service.
*/