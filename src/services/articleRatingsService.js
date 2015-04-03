﻿/* globals module */
/**
 * @module baasicArticleRatingsService
 * @description Baasic Article Ratings Service provides an easy way to consume Baasic Article Ratings REST API. `baasicArticleRatingsService` functions are not bound to particular article items but are meant to be used on ratings resources directly. In order to obtain a needed routes `baasicArticleRatingsService` uses `baasicArticleRatingsRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleRatingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleRatingsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, articleRatingsRouteService) {
            return {
                /**
                * Provides direct access to `baasicArticleRatingsRouteService`.
                * @method        
                * @example baasicArticleRatingsService.routeService.get.expand(expandObject);
                **/  
                routeService: articleRatingsRouteService,
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article rating resources matching the given criteria.
                 * @method        
                 * @example 
baasicArticleRatingsService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<article-title>',
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
                    return baasicApiHttp.get(articleRatingsRouteService.find.expand(baasicApiService.findParams(options)));
                },
                 /**
                 * Returns a promise that is resolved once the findByUser action has been performed. Success response returns a list of article rating resources filtered by username.
                 * @method        
                 * @example 
baasicArticleRatingsService.find('<username>', {
  pageNumber : 1,
  pageSize : 10,
  orderBy : '<article-title>',
  orderDirection : '<asc|desc>'
})
.success(function (collection) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});    
                 **/  				
                findByUser: function (username, options) {
                    var params = angular.extend({}, options);
                    params.username = username;
                    return baasicApiHttp.get(articleRatingsRouteService.findByUser.expand(baasicApiService.findParams(params)));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article rating resource.
                 * @method        
                 * @example 
baasicArticleRatingsService.get('<article-id>')
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/ 				
                get: function (id, options) {
                    return baasicApiHttp.get(articleRatingsRouteService.get.expand(baasicApiService.getParams(id, options)));
                },
                 /**
                 * Returns a promise that is resolved once the create article rating action has been performed, this action creates a new article rating.
                 * @method        
                 * @example 
baasicArticleRatingsService.create({
  articleId : '<article-id>',
  rating : 5,
  userId : '<user-id>'
})
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/ 				
                create: function (data) {
                    return baasicApiHttp.post(articleRatingsRouteService.create.expand(), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },
                 /**
                 * Returns a promise that is resolved once the update article rating action has been performed, this action updates an article rating. This function doesn't use `baasicArticleRatingsRouteService` for obtaining route templates, however `update` route can be obtained from article rating (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(articleRating);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
articleRating.rating = 4;
baasicArticleRatingsService.update(articleRating)
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
                * Returns a promise that is resolved once the remove article rating action has been performed. If the action is successfully completed the article rating resource is permanently removed from the system. This function doesn't use `baasicArticleRatingsRouteService` for obtaining route templates, however `remove` route can be obtained from article rating (HAL enabled) objects like this:
```
var params = baasicApiService.removeParams(articleRating);
var uri = params['model'].links('delete').href;
```
                * @method        
                * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleRatingsService.remove(articleRating)
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
