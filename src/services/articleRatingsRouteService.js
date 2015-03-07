/* globals module */
/**
 * @module baasicArticleRatingsRouteService
**/

/** 
 * @overview Article ratings route service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleRatingsRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
                /**
                * Parses find article rating route which can be expanded with additional options. Supported items are: 
                * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                * - `rpp` - A value used to limit the size of result set per page.
                * - `sort` - A string used to set the role property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example baasicArticleRatingsRouteService.find.expand({searchQuery: "searchTerm"});               
                **/   			
                find: uriTemplateService.parse('article-ratings/{?searchQuery,page,rpp,sort,embed,fields}'),
                /**
                * Parses findByUser article rating route which can be expanded with additional options. Supported items are: 
                * - `username` - A value that uniquely identifies a user which has created an article rating.
                * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                * - `rpp` - A value used to limit the size of result set per page.
                * - `sort` - A string used to set the role property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example baasicArticleRatingsRouteService.find.expand({username: "username"});               
                **/ 				
                findByUser: uriTemplateService.parse('article-ratings/{?username,page,rpp,sort,embed,fields}'),
                /**
                * Parses get article rating route which must be expanded with the Id of the previously created resource in the system. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example baasicArticleRatingsRouteService.get.expand({id: "uniqueID"});               
                **/   				
                get: uriTemplateService.parse('article-ratings/{id}/{?embed,fields}'),
                /**
                * Parses create article rating route; this URI template does not expose any additional options.
                * @method        
                * @example baasicArticleRatingsRouteService.create.expand({});              
                **/  					
                create: uriTemplateService.parse('article-ratings'),
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example baasicArticleRatingsRouteService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                **/				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));