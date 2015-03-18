/* globals module */
/**
 * @module baasicArticleRouteService
 * @description Baasic Article Route Service provides Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `baasicArticleRouteService` uses `baasicArticleRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services. 
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
                /**
                * Parses find article route which can be expanded with additional options. Supported items are: 
                * - `searchQuery` - A string referencing resource properties using the phrase or query search.
                * - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
                * - `rpp` - A value used to limit the size of result set per page.
                * - `sort` - A string used to set the role property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * - `startDate` - A value used to specify the article creation date starting from which article resource collection should be returned.
                * - `endDate` - A value used to specify the article creation date until (and including) which article resource collection should be returned.
                * - `statuses` - Comma separated list of article statuses that specify where search should be done (Allowed statuses: Published, Draft and Archived).
                * -  `tags` - A value used to restrict the search to article resources with these tags. Multiple tags should be comma separated.        				
                * @method        
                * @example baasicArticleRouteService.find.expand({searchQuery: "searchTerm"});               
                **/  			
                find: uriTemplateService.parse('articles/{?searchQuery,page,rpp,sort,embed,fields,statuses,tags,startDate,endDate}'),
                /**
                * Parses get article route which must be expanded with the Id of the previously created article resource in the system. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example baasicArticleRouteService.get.expand({id: "uniqueID"});               
                **/   				
                get: uriTemplateService.parse('articles/{id}/{?embed,fields}'),
                /**
                * Parses publish article route which must be expanded with the Id of the previously created article resource in the system.
                * @method        
                * @example baasicArticleRouteService.publish.expand({id: "uniqueID"});               
                **/ 				
                publish: uriTemplateService.parse('articles/{id}/publish/'),
                /**
                * Parses purge article route, this URI template doesn't expose any additional properties.
                * @method        
                * @example baasicArticleRouteService.purge.expand({id: "uniqueID"});               
                **/ 				
                purge: uriTemplateService.parse('articles/purge/'),
                /**
                * Parses create article route; this URI template doesn't expose any additional properties.
                * @method        
                * @example baasicArticleRouteService.create.expand({});               
                **/ 				
                create: uriTemplateService.parse('articles'),
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example baasicArticleRouteService.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                **/				
                parse: uriTemplateService.parse,
                ratings: {
					/**
					* Parses find article rating route which can be expanded with additional options. Supported items are: 
					* - `articleId` - Id of the article.
					* - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
					* - `rpp` - A value used to limit the size of result set per page.
					* - `sort` - A string used to set the role property to sort the result collection by.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method ratings.find       
					* @example baasicArticleRouteService.ratings.find.expand({articleId`: "uniqueID"});               
					**/ 				
                    find: uriTemplateService.parse('articles/{articleId}/ratings{?page,rpp,sort,embed,fields}'),
					/**
					* Parses findByUser article rating route which can be expanded with additional options. Supported items are: 
					* - `articleId` - Id of the article.
					* - `username` - A value that uniquely identifies a user which has created an article rating.
					* - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
					* - `rpp` - A value used to limit the size of result set per page.
					* - `sort` - A string used to set the role property to sort the result collection by.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method ratings.findByUsername       
					* @example baasicArticleRouteService.ratings.findByUsername.expand({articleId: "uniqueID", username: "username"});               
					**/ 					
                    findByUsername: uriTemplateService.parse('articles/{articleId}/users/{username}/ratings/{?embed,fields}'),
					/**
					* Parses create article rating route; this URI template should be expanded with the Id of the article.
					* @method ratings.create       
					* @example baasicArticleRouteService.ratings.create.expand({articleId: "uniqueID"});              
					**/  					
                    create: uriTemplateService.parse('articles/{articleId}/ratings/'),
                    /**
                    * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                    * @method ratings.parse
                    * @example baasicArticleRouteService.ratings.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                    **/					
                    parse: uriTemplateService.parse
                },
                tags: {
					/**
					* Parses find article tags route which can be expanded with additional options. Supported items are: 
					* - `id` - Id of the article.
					* - `searchQuery` - A string referencing resource properties using the phrase or query search.
					* - `page` - A value used to set the page size, i.e. to retrieve certain resource subset from the storage.
					* - `rpp` - A value used to limit the size of result set per page.
					* - `sort` - A string used to set the role property to sort the result collection by.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method tags.find       
					* @example baasicArticleRouteService.tags.find.expand({id: "uniqueID", searchQuery: "searchTerm"});               
					**/ 					
                    find: uriTemplateService.parse('articles/{id}/tags/{?searchQuery,page,rpp,sort,embed,fields}'),
					/**
					* Parses get article tags route which can be expanded with additional options. Supported items are: 
					* - `id` - Id of the article.					
					* - `tag` - Article slug which uniquely identifies article tag resource that needs to be retrieved.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method tags.get       
					* @example baasicArticleRouteService.tags.find.expand({id: "uniqueID", tag: "keyword"});               
					**/ 					
                    get: uriTemplateService.parse('articles/{id}/tags/{tag}/{?embed,fields}'),
					/**
					* Parses create article tag route; this URI template should be expanded with the Id of the article.
					* @method tags.create       
					* @example baasicArticleRouteService.tags.create.expand({id: "uniqueID"});              
					**/  					
                    create: uriTemplateService.parse('articles/{id}/tags/{tag}/'),
                    /**
                    * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [github](https://github.com/Baasic/uritemplate-js) page.
                    * @method tags.parse
                    * @example baasicArticleRouteService.tags.parse("route/{?embed,fields,options}").expand({embed: "embeddedResource"});
                    **/										
                    parse: uriTemplateService.parse
                },
                permissions: {
					/**
					* Parses get article permissions route; this URI template should be expanded with the Id of the article.					
					* @method permissions.get       
					* @example baasicArticleRouteService.permissions.get.expand({id: "articleId"});               
					**/ 				
                    get: uriTemplateService.parse('articles/{id}/permissions/{?fields}'),
					/**
					* Parses update article permissions route; this URI template should be expanded with the Id of the article.					
					* @method permissions.update       
					* @example baasicArticleRouteService.permissions.update.expand({id: "articleId"});               
					**/ 					
                    update: uriTemplateService.parse('articles/{id}/permissions/{?fields}'),
					/**
					* Parses deleteByUser article permissions route which can be expanded with additional options. Supported items are:
					* - `id` - Id of the article.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and article resource.
					* - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
					* @method permissions.deleteByUser       
					* @example baasicArticleRouteService.permissions.deleteByUser.expand({id: "articleId", accessAction: "read", user: "username"});               
					**/ 					
                    deleteByUser: uriTemplateService.parse('articles/{id}/permissions/actions/{accessAction}/users/{user}/'),
					/**
					* Parses deleteByUser article permissions route which can be expanded with additional options. Supported items are:
					* - `id` - Id of the article.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and article resource.
					* - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
					* @method permissions.deleteByRole       
					* @example baasicArticleRouteService.permissions.deleteByRole.expand({id: "articleId", accessAction: "read", role: "roleName"});               
					**/ 					
                    deleteByRole: uriTemplateService.parse('articles/{id}/permissions/actions/{accessAction}/roles/{role}/')
                }
            };
        }]);
}(angular, module));
