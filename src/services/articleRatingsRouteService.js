/* globals module */
/**
 * @module baasicArticleRatingsRouteService
 * @description Baasic Article Ratings Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `baasicArticleRatingsRouteService` uses `baasicArticleRatingsRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
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
                * @example baasicArticleRatingsRouteService.find.expand({searchQuery: "<search-phrase>"});               
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
                * @example baasicArticleRatingsRouteService.find.expand({username: "<username>"});               
                **/ 				
                findByUser: uriTemplateService.parse('article-ratings/{?username,page,rpp,sort,embed,fields}'),
                /**
                * Parses get article rating route which must be expanded with the Id of the previously created resource in the system. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example baasicArticleRatingsRouteService.get.expand({id: "<article-id>"});               
                **/   				
                get: uriTemplateService.parse('article-ratings/{id}/{?embed,fields}'),
                /**
                * Parses create article rating route; this URI template does not expose any additional options.
                * @method        
                * @example baasicArticleRatingsRouteService.create.expand({});              
                **/  					
                create: uriTemplateService.parse('article-ratings'),
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example baasicArticleRatingsRouteService.parse("route/{?embed,fields,options}").expand({embed: "<embedded-resource>"});
                **/				
                parse: uriTemplateService.parse
            };
        }]);
}(angular, module));