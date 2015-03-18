/* globals module */
/**
 * @module baasicArticleSettingsService
 * @description Baasic Article Settings Service provides an easy way to consume Baasic Article Settings REST API. `baasicArticleSettingsService` functions are not bound to particular article items but are meant to be used on settings resources directly.
 * @copyright (c) 2015 Mono-Software
 * @license MIT
 * @author Mono-Software
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleSettingsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, articleSettingsRouteService) {
            return {
                routeService: articleSettingsRouteService,
                 /**
                 * Returns a promise that is resolved once the get action has been performed. Success response returns the article settings resource.
                 * @method        
                 * @example 
baasicArticleSettingsService.get()
.success(function (data) {
  // perform success action here
})
.error(function (response, status, headers, config) {
  // perform error handling here
});
                **/ 				
                get: function (options) {
                    return baasicApiHttp.get(articleSettingsRouteService.get.expand(baasicApiService.getParams(options)));
                },
                 /**
                 * Returns a promise that is resolved once the update article settings action has been performed.
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
existingResource.allowArchive = true;
baasicArticleSettingsService.update(existingResource)
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
                }
            };
        }]);
}(angular, module));