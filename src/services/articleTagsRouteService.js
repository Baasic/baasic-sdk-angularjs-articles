﻿/* globals module */
/**
 * @module baasicArticleTagsRouteService
 * @description Baasic Article Tags Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Tags Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services  use the same function names as their corresponding services.
*/

(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleTagsRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
				/**
				* Parses find article tags route which can be expanded with additional options. Supported items are: 
				* - `searchQuery` - A string referencing resource properties using the phrase or query search.
				* - `page` - A value used to set the page offset, i.e. to retrieve certain resource subset from the storage.
				* - `rpp` - A value used to limit the size of result set per page.
				* - `sort` - A string used to set the role property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example baasicArticleTagsRouteService.find.expand({searchQuery: '<search-phrase>'});               
				**/ 				
                find: uriTemplateService.parse('article-tags/{?searchQuery,page,rpp,sort,embed,fields}'),
				/**
                * Parses get article tag route which must be expanded with the Id of the previously created article tag resource in the system. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example baasicArticleTagsRouteService.find.expand({id: '<articleTag-id>'});               
				**/ 					
                get: uriTemplateService.parse('article-tags/{id}/{?embed,fields}'),
				/**
				* Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
				* @method
				* @example baasicArticleTagsRouteService.parse('<route>/{?embed,fields,options}').expand({embed: '<embedded-resource>'});
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
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
 - All end-point objects are transformed by the associated route service.
*/