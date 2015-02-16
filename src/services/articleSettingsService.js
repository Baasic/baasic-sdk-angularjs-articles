/* globals module */

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
baasicArticleRatingsService.get()
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
                }
            };
        }]);
}(angular, module));