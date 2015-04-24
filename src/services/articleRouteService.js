/* globals module */
/**
 * @module baasicArticleRouteService
 * @description Baasic Article Route Service provides Baasic route templates which can be expanded to Baasic REST URIs. Various services can use Baasic Article Route Service to obtain a needed routes while other routes will be obtained through HAL. By convention, all route services use the same function names as their corresponding services.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleRouteService', ['baasicUriTemplateService',
        function (uriTemplateService) {
            return {
                /**
                * Parses find article route which can be expanded with additional options. Supported items are: 
                * - `searchQuery` - A string referencing article properties using the phrase or BQL (Baasic Query Language) search.
                * - `page` - A value used to set the page number, i.e. to retrieve certain article subset from the storage.
                * - `rpp` - A value used to limit the size of result set per page.
                * - `sort` - A string used to set the article property to sort the result collection by.
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * - `startDate` - A value used to specify the article creation, publish or archive date date starting from which article resource collection should be returned.
                * - `endDate` - A value used to specify the article creation, publish or archive date until (and including) which article resource collection should be returned.
                * - `statuses` - Comma separated list of article statuses that specify where search should be done (Allowed statuses: Published, Draft and Archived).
                * -  `tags` - A value used to restrict the search to article resources with these tags. Multiple tags should be comma separated.        				
                * @method        
                * @example 
baasicArticleRouteService.find.expand(
	{searchQuery: '<search-phrase>'}
);               
                **/  			
                find: uriTemplateService.parse('articles/{?searchQuery,page,rpp,sort,embed,fields,statuses,tags,startDate,endDate}'),
                /**
                * Parses get article route which must be expanded with the Id of the previously created article resource in the system. Additional expand supported items are:
				* - `embed` - Comma separated list of resources to be contained within the current representation.
                * @method        
                * @example 
baasicArticleRouteService.get.expand(
	{id: '<article-id>'}
);               
                **/   				
                get: uriTemplateService.parse('articles/{id}/{?embed,fields}'),
                /**
                * Parses publish article route which must be expanded with the Id of the previously created article resource in the system.
                * @method        
                * @example 
baasicArticleRouteService.publish.expand(
	{id: '<article-id>'}
);               
                **/ 				
                publish: uriTemplateService.parse('articles/{id}/publish/'),
                /**
                * Parses purge article route, this URI template doesn't expose any additional properties.
                * @method        
                * @example baasicArticleRouteService.purge.expand({});               
                **/ 				
                purge: uriTemplateService.parse('articles/purge/'),
                /**
                * Parses create article route; this URI template doesn't expose any additional properties.
                * @method        
                * @example baasicArticleRouteService.create.expand({});               
                **/ 				
                create: uriTemplateService.parse('articles'),
                /**
                * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                * @method
                * @example 
baasicArticleRouteService.parse(
	'<route>/{?embed,fields,options}'
).expand(
	{embed: '<embedded-resource>'}
);
                **/				
                parse: uriTemplateService.parse,
                ratings: {
					/**
					* Parses find article rating route which can be expanded with additional options. Supported items are: 
					* - `articleId` - Id of the article.
					* - `page` - A value used to set the page number, i.e. to retrieve certain article rating subset from the storage.
					* - `rpp` - A value used to limit the size of result set per page.
					* - `sort` - A string used to set the article rating property to sort the result collection by.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method ratings.find       
					* @example 
baasicArticleRouteService.ratings.find.expand(
	{articleId`: '<article-id>'}
);               
					**/ 				
                    find: uriTemplateService.parse('articles/{articleId}/ratings{?page,rpp,sort,embed,fields}'),
					/**
					* Parses findByUser article rating route which can be expanded with additional options. Supported items are: 
					* - `articleId` - Id of the article.
					* - `username` - A value that uniquely identifies a user which has created an article rating.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method ratings.findByUsername       
					* @example 
baasicArticleRouteService.ratings.findByUsername.expand({
    articleId: '<article-id>', 
    username: '<username>'
});
					**/ 					
                    findByUsername: uriTemplateService.parse('articles/{articleId}/users/{username}/ratings/{?embed,fields}'),
					/**
					* Parses create article rating route; this URI template should be expanded with the Id of the article.
					* @method ratings.create       
					* @example 
baasicArticleRouteService.ratings.create.expand(
	{articleId: '<article-id>'}
);
					**/  					
                    create: uriTemplateService.parse('articles/{articleId}/ratings/'),
                    /**
                    * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                    * @method ratings.parse
                    * @example 
baasicArticleRouteService.ratings.parse(
	'<route>/{?embed,fields,options}'
).expand(
	{embed: '<embedded-resource>'}
);
                    **/					
                    parse: uriTemplateService.parse
                },
                tags: {
					/**
					* Parses find article tags route which can be expanded with additional options. Supported items are: 
					* - `id` - Id of the article.
					* - `searchQuery` - A string value used to identify article tag resources using the phrase search.
					* - `page` - A value used to set the page number, i.e. to retrieve certain article tag subset from the storage.
					* - `rpp` - A value used to limit the size of result set per page.
					* - `sort` - A string used to set the article tag property to sort the result collection by.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method tags.find       
					* @example 
baasicArticleRouteService.tags.find.expand({
    id: '<article-id>', 
    searchQuery: '<search-phrase>'
});
					**/ 					
                    find: uriTemplateService.parse('articles/{id}/tags/{?searchQuery,page,rpp,sort,embed,fields}'),
					/**
					* Parses get article tags route which can be expanded with additional options. Supported items are: 
					* - `id` - Id of the article.					
					* - `tag` - Article slug which uniquely identifies article tag resource that needs to be retrieved.
					* - `embed` - Comma separated list of resources to be contained within the current representation.
					* @method tags.get       
					* @example 
baasicArticleRouteService.tags.find.expand({
	id: '<article-id>', 
	tag: '<tag>'
});
					**/ 					
                    get: uriTemplateService.parse('articles/{id}/tags/{tag}/{?embed,fields}'),
					/**
					* Parses create article tag route; this URI template should be expanded with the tag and Id of the article.
					* @method tags.create       
					* @example 
baasicArticleRouteService.tags.create.expand({
    id: '<article-id>', 
    tag: '<tag>'
});
					**/  					
                    create: uriTemplateService.parse('articles/{id}/tags/{tag}/'),
                    /**
                    * Parses and expands URI templates based on [RFC6570](http://tools.ietf.org/html/rfc6570) specifications. For more information please visit the project [GitHub](https://github.com/Baasic/uritemplate-js) page.
                    * @method tags.parse
                    * @example 
baasicArticleRouteService.tags.parse(
	'<route>/{?embed,fields,options}'
).expand(
	{embed: '<embedded-resource>'}
);
                    **/										
                    parse: uriTemplateService.parse
                },
                acl: {
					/**
					* Parses get article acl route; this URI template should be expanded with the Id of the article.					
					* @method acl.get       
					* @example 
baasicArticleRouteService.acl.get.expand(
	{id: '<article-id>'}
);
					**/ 				
                    get: uriTemplateService.parse('articles/{id}/acl/{?fields}'),
					/**
					* Parses update article acl route; this URI template should be expanded with the Id of the article.					
					* @method acl.update       
					* @example 
baasicArticleRouteService.acl.update.expand(
	{id: '<article-id>'}
);
					**/ 					
                    update: uriTemplateService.parse('articles/{id}/acl/{?fields}'),
					/**
					* Parses deleteByUser article acl route which can be expanded with additional options. Supported items are:
					* - `id` - Id of the article.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified user and article resource.
					* - `user` - A value which uniquely identifies user for which ACL policy needs to be removed.					
					* @method acl.deleteByUser       
					* @example 
baasicArticleRouteService.acl.deleteByUser.expand({
    id: '<article-id>', 
    accessAction: '<access-action>', 
    user: '<username>'
});
					**/ 					
                    deleteByUser: uriTemplateService.parse('articles/{id}/acl/actions/{accessAction}/users/{user}/'),
					/**
					* Parses deleteByUser article acl route which can be expanded with additional options. Supported items are:
					* - `id` - Id of the article.
					* - `accessAction` - Action abbreviation which identifies ACL policy assigned to the specified role and article resource.
					* - `role` - A value which uniquely identifies role for which ACL policy needs to be removed.					
					* @method acl.deleteByRole       
					* @example 
baasicArticleRouteService.acl.deleteByRole.expand({
    id: '<article-id>', 
    accessAction: '<access-action>', 
    role: '<role-name>'
});
					**/ 					
                    deleteByRole: uriTemplateService.parse('articles/{id}/acl/actions/{accessAction}/roles/{role}/')
                }
            };
        }]);
}(angular, module));
/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - [URI Template](https://github.com/Baasic/uritemplate-js) syntax enables expanding the Baasic route templates to Baasic REST URIs providing it with an object that contains URI parameters.
 - All end-point objects are transformed by the associated route service.
*/