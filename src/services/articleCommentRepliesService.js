/* globals module */
/**
 * @module baasicArticleCommentRepliesService
 * @description Baasic Article Comment Replies Service provides an easy way to consume Baasic Article Comment Replies REST API end-points. `baasicArticleCommentRepliesService` functions enable performing standard CRUD operations directly on article comment reply resources, whereas the `baasicArticleService` functions allow management between article and article comment reply. In order to obtain a needed routes `baasicArticleCommentRepliesService` uses `baasicArticleCommentRepliesRouteService`.
*/
(function (angular, module, undefined) {
    'use strict';
    module.service('baasicArticleCommentRepliesService', ['baasicApiHttp', 'baasicApiService', 'baasicConstants', 'baasicArticleCommentRepliesRouteService',
        function (baasicApiHttp, baasicApiService, baasicConstants, articleCommentRepliesRouteService) {
            var commentStatuses = {
                approved: 1,
                spam: 2,
                reported: 4,
                flagged: 8,
                unapproved: 16 
            };
                        
            return {
                /**
                * Contains a refrerence to valid list of article comment statuses. It returns an object containing all article comment statuses.
                * @method comments.replies.statuses    
                * @example baasicArticleCommentRepliesService.statuses.approved;
                **/                     
                statuses: commentStatuses,
                /**
                * Returns a promise that is resolved once the approve article comment reply action has been performed. This action sets the status of an article comment reply to "approved". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-approve').href;
```
                * @method comments.replies.approve       
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.approve(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		                    
                approve: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-approve').href, params[baasicConstants.modelPropertyName]);                        
                },
                /**
                * Returns a promise that is resolved once the create article comment reply action has been performed; this action creates a new comment reply for an article.
                * @method  comments.replies.create      
                * @example 
baasicArticleCommentRepliesService.create('<article-id>', {
commentId : '<comment-id>',
comment : <comment>,
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
                    return baasicApiHttp.post(articleCommentRepliesRouteService.comments.create.expand(data), baasicApiService.createParams(data)[baasicConstants.modelPropertyName]);
                },                                            
                /**
                * Returns a promise that is resolved once the find action has been performed. Success response returns a list of article comment reply resources matching the given criteria.
                * @method comments.replies.find
                * @example 
baasicArticleCommentRepliesService.find({
pageNumber : 1,
pageSize : 10,
orderBy : '<field>',
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
                    return baasicApiHttp.get(articleCommentRepliesRouteService.find.expand(baasicApiService.findParams(options)));
                },                     
                /**
                * Returns a promise that is resolved once the flag article comment reply action has been performed. This action sets the status of an article comment reply to "flagged". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-flag').href;
```
                * @method comments.replies.flag       
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.flag(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/	
                flag: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-flag').href, params[baasicConstants.modelPropertyName]);                        
                }, 
                /**
                * Returns a promise that is resolved once the get action has been performed. Success response returns the specified article comment reply resource.
                * @method comments.replies.get       
                * @example 
baasicArticleCommentRepliesService.get('<comment-reply-id>')
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});
                **/ 					
                get: function (id, options) {                            
                    return baasicApiHttp.get(articleCommentRepliesRouteService.get.expand(baasicApiService.getParams(id, options)));
                },                                                                      
                /**
                * Returns a promise that is resolved once the remove article comment reply action has been performed. If the action is successfully completed, the article comment reply resource will be permanently removed from the system. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.removeParams(articleCommentReply);
var uri = params['model'].links('delete').href;
```
                * @method comments.replies.remove  
                * @example 
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.remove(articleCommentReply)
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
                },
                /**
                * Returns a promise that is resolved once the report article comment reply action has been performed. This action sets the status of an article comment reply to "reported". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-report').href;
```
                * @method comments.replies.report       
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.report(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		                    
                report: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-report').href, params[baasicConstants.modelPropertyName]);                        
                },                        
                /**
                * Returns a promise that is resolved once the mark as spam article comment reply action has been performed. This action sets the status of an article comment reply to "spam". This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('comment-spam').href;
```
                * @method comments.replies.spam       
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.spam(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		                    
                spam: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('comment-spam').href, params[baasicConstants.modelPropertyName]);                        
                },
                /**
                * Returns a promise that is resolved once the update article comment reply action has been performed; this action updates an article comment reply resource. This route uses HAL enabled objects to obtain routes and therefore it doesn't apply `baasicarticleCommentRepliesRouteService` route template. Here is an example of how a route can be obtained from HAL enabled objects:
```
var params = baasicApiService.updateParams(articleCommentReply);
var uri = params['model'].links('put').href;
```
                * @method comments.replies.update       
                * @example 	
// articleCommentReply is a resource previously fetched using get action.				 
baasicArticleCommentRepliesService.update(articleCommentReply)
.success(function (data) {
// perform success action here
})
.error(function (response, status, headers, config) {
// perform error handling here
});		
                **/		                    
                update: function(data) {
                    var params = baasicApiService.updateParams(data);
                    return baasicApiHttp.put(params[baasicConstants.modelPropertyName].links('put').href, params[baasicConstants.modelPropertyName]);                        
                },                   
                /**
                * Provides direct access to `baasicArticleCommentRepliesRouteService`.
                * @method        
                * @example baasicArticleCommentRepliesService.routeService.get.expand(expandObject);
                **/  
                routeService: articleCommentRepliesRouteService
            };
        }]);
}(angular, module));

/**
 * @overview 
 ***Notes:**
 - Refer to the [REST API documentation](https://github.com/Baasic/baasic-rest-api/wiki) for detailed information about available Baasic REST API end-points.
 - All end-point objects are transformed by the associated route service.
*/
