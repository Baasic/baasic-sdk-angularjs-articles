﻿/* globals module */
/**
 * @module baasicArticleSettingsService
 * @description Baasic Article Settings Service provides an easy way to consume Baasic Article Settings REST API. `baasicArticleSettingsService` functions are not bound to particular article items but are meant to be used on settings resources directly. In order to obtain a needed routes `baasicArticleSettingsService` uses `baasicArticleSettingsRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleSettingsService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleSettingsRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, articleSettingsRouteService) {
            return {
                /**
                * Provides direct access to `baasicArticleSettingsRouteService`.
                * @method        
                * @example baasicArticleSettingsService.routeService.get.expand(expandObject);
                **/  			
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
                 * Returns a promise that is resolved once the update article settings action has been performed, this action updates article settings. This route uses HAL enabled objects to obtain routes and therefore it doesn't use `baasicArticleSettingsRouteService` route template, here is an example of how a route can be obtained from HAL enabled objects::
```
var params = baasicApiService.removeParams(articleSettings);
var uri = params['model'].links('put').href;
```
                 * @method        
                 * @example 
// Existing resource is a resource previously fetched using get action.
articleSettings.allowArchive = true;
baasicArticleSettingsService.update(articleSettings)
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
/**
 * @copyright (c) 2015 Mono
 * @license MIT
 * @author Mono
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
