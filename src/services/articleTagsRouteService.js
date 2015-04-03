/* globals module */
/**
 * @module baasicArticleTagsRouteService
 * @description Baasic Article Tags Route Service provides Baasic route templates which can be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `baasicArticleTagsRouteService` uses `baasicArticleTagsRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
*/

(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleTagsRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
				/**
				* Parses find article tags route which can be expanded with additional options. Supported items are: 
				* - `searchQuery` - A string referencing resource properties using the phrase or query search.
				* - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
				* - `rpp` - A value used to limit the size of result set per page.
				* - `sort` - A string used to set the role property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example baasicArticleTagsRouteService.find.expand({searchQuery: "<search-phrase>"});               
				**/ 				
                find: uriTemplateService.parse('article-tags/{?searchQuery,page,rpp,sort,embed,fields}'),
				/**
                * Parses get article tag route which must be expanded with the Id of the previously created article resource in the system. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example baasicArticleTagsRouteService.find.expand({id: "<article-id>"});               
				**/ 					
                get: uriTemplateService.parse('article-tags/{id}/{?embed,fields}'),
				/**
				* Parses create article tag route; this URI template doesn't expose any additional properties.
				* @method      
				* @example baasicArticleTagsRouteService.create.expand({});              
				**/  					
                create: uriTemplateService.parse('article-tags'),
				/**
				* Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
				* @method
				* @example baasicArticleTagsRouteService.parse("route/{?embed,fields,options}").expand({embed: "<embedded-resource>"});
				**/							
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));