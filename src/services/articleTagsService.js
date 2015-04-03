/* globals module */
/**
 * @module baasicArticleTagsService
 * @description Baasic Article Tags Service provides an easy way to consume Baasic Article Tags REST API. `baasicArticleTagsService` functions are not bound to particular article items but are meant to be used on tag resources directly. In order to obtain a needed routes `baasicArticleTagsService` uses `baasicArticleTagsRouteService`.
*/

(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleTagsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleTagsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, articleTagsRouteService) {
            return {
                /**
                * Provides direct access to `baasicArticleTagsRouteService`.
                * @method        
                * @example baasicArticleTagsService.routeService.get.expand(expandObject);
                **/  				
                routeService: articleTagsRouteService,
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article tag resources matching the given criteria.
                 * @method        
                 * @example 
baasicArticleTagsService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<tag>',
  orderDirection : '<asc|desc>',
  search : '<search-phrase>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/  					
                find: function (options) {
                    return baasicApiHttp.get(articleTagsRouteService.find.expand(baasicApiService.findParams(options)));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article tag resource.
                 * @method        
                 * @example 
baasicArticleTagsService.get('<article-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/ 				
                get: function (id, options) {
                    return baasicApiHttp.get(articleTagsRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                 /**
                 * Returns a promise that is resolved once the create article tag action has been performed, this action creates a new tag.
                 * @method        
                 * @example 
baasicArticleTagsService.create({
  slug : '<slug>',
  sortOrder : 5,
  tag : '<tag>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/ 					
                create: function (data) {
                    return baasicApiHttp.post(articleTagsRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update article tag action has been performed, this action updates a tag. This function doesn't use `baasicArticleTagsRouteService` for obtaining route templates, however `update` route can be obtained from article tag (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(articleTag);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
articleTag.tag = '<new-tag>';
baasicArticleTagsService.update(articleTag)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
				**/						
                update: function (data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);
                },
                /**
                * Returns a promise that is resolved once the remove article tag action has been performed. If the action is successfully completed the article tag resource is permanently removed from the system. This function doesn't use `baasicArticleTagsRouteService` for obtaining route templates, however `remove` route can be obtained from article tag (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(articleTag);
var uri = params['model'].links('delete').href;
```
                * @method        
                * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleTagsService.remove(articleTag)
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});		
				**/						
                remove: function (data) {
                    var params = baasicApiService.removeParams(data);
                    return baasicApiHttp.delete(params[baasicConstants.modelPropertyName].links('delete').href);
                }
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
 - All end-point objects are transformed by the associated route service.
*/