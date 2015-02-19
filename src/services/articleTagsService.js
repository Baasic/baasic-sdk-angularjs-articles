/* globals module */
/**
 * @module baasicArticleTagsService
**/

/** 
 * @overview Article tags service.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/

(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleTagsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleTagsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, articleTagsRouteService) {
            return {
                routeService: articleTagsRouteService,
                 /**
                 * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article tag resources.
                 * @method        
                 * @example 
baasicArticleTagsService.find({
  pageNumber : 1,
  pageSize : 10,
  orderBy : "tag",
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
                    return baasicApiHttp.get(articleTagsRouteService.find.expand(baasicApiService.findParams(options)));
                },
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the article tag resource.
                 * @method        
                 * @example 
baasicArticleTagsService.get("uniqueID")
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
                 * Returns a promise that is resolved once the create article tag action has been performed.
                 * @method        
                 * @example 
baasicArticleTagsService.create({
  slug : "slug",
  sortOrder : 5,
  tag : "tag"
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
                 * Returns a promise that is resolved once the update article tag action has been performed.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
existingResource.tag = "updated tag";
baasicArticleTagsService.update(existingResource)
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
                * Returns a promise that is resolved once the remove article tag action has been performed. If the action is successfully completed the article tag resource is permanently removed from the system.
                * @method        
                * @example 
// Existing resource is a resource previously fetched using get action.				 
baasicArticleTagsService.remove(existingResource)
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