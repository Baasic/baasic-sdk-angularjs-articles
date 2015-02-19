/* globals module */
/**
 * @module baasicArticleTagsRouteService
**/

/** 
 * @overview Article tags route service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
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
				* @example baasicArticleTagsRouteService.find.expand({searchQuery: "searchTerm"});               
				**/ 				
                find: uriTemplateService.parse('article-tags/{?searchQuery,page,rpp,sort,embed,fields}'),
				/**
                * Parses get article tag route which must be expanded with the Id of the previously created resource in the system. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
				* @method      
				* @example baasicArticleTagsRouteService.find.expand({id: "uniqueID"});               
				**/ 					
                get: uriTemplateService.parse('article-tags/{id}/{?embed,fields}'),
				/**
				* Parses create article tag route; this URI template doesn't expose any additional properties.
				* @method      
				* @example baasicArticleTagsRouteService.create.expand({});              
				**/  					
                create: uriTemplateService.parse('article-tags'),
				/**
				* Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
				* @method
				* @example uriTemplateService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
				**/							
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));