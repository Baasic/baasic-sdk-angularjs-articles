/* globals module */
/**
 * @module baasicArticleRatingsService
 * @description Baasic Article Ratings Service provides an easy way to consume Baasic Article Ratings REST API. `baasicArticleRatingsService` functions are not bound to particular article items but are meant to be used on ratings resources directly.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleRatingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleRatingsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, articleRatingsRouteService) {
            return {
                routeService: articleRatingsRouteService,
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article rating resources.
                 * @method        
                 * @example 
baasicArticleRatingsService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : "article.title",
  orderDirection : "desc",
  search : "searchTerm"
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
                 * Returns a promise that is resolved once the findByUser action has been performed. Success response returns a list of article rating resources.
                 * @method        
                 * @example 
baasicArticleRatingsService.find("userName", {
  pageNumber : 1,
  pageSize : 10,
  orderBy : "article.title",
  orderDirection : "desc"
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
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the article rating resource.
                 * @method        
                 * @example 
baasicArticleRatingsService.get("uniqueID")
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
                 * Returns a promise that is resolved once the create article rating action has been performed.
                 * @method        
                 * @example 
baasicArticleRatingsService.create({
  articleId : "articleId",
  rating : 5,
  userId : "userId"
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
                 * Returns a promise that is resolved once the update article rating action has been performed.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
existingResource.rating = 4;
baasicArticleRatingsService.update(existingResource)
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
                * Returns a promise that is resolved once the remove article rating action has been performed. If the action is successfully completed the article rating resource is permanently removed from the system.
                * @method        
                * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleRatingsService.remove(existingResource)
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