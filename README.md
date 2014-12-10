# Baasic Articles AngularJS SDK

Baasic AngularJS Articles library provides access to article resource Baasic Service [REST API](https://api.baasic.com).

## Dependencies

Baasic AngularJS Articles library has the following dependencies:

* [Baasic Core AngularJS SDK](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core)

## Usage

This section will describe how to add the Baasic AngularJS Articles library to your project. If you prefer learning by example please skip to [Demo Section](#demo).

### Adding the Library to your Project

Please add the _Baasic Articles_ include after the _Baasic Angular Core_ include:

```html
<script src='//cdn.net/js/baasic-angular-1.0.0.min.js'></script>
<script src='//cdn.net/js/baasic-angular-article-1.0.0.min.js'></script>
```

The recommended way of serving the library is through a [CDN](http://en.wikipedia.org/wiki/Content_delivery_network) but note that this is not a requirement. If you prefer adding library files directly to your project instead, please modify the includes accordingly.


### Initialization

To be able to use the library you will need to add the Baasic (_baasic.article_) dependency to your AngularJS module. This will allow you to use library services described in [Modules Section](#baasic-modules).

```javascript
angular.module('my-module', ["baasic.api", "baasic.article"])
```

## Articles Module

Baasic AngularJS Articles services and their functions can be found bellow. For further details please check the [API documentation](#tba)

##### articleService

Baasic Articles Service provides an easy way to consume Baasic Articles REST routes.

* `get` - Gets a single article
* `find` - Finds articles by given criteria
* `create` - Creates a new article
* `update` - Updates an article
* `remove` - Deletes an article
* `saveDraft` - Saves an article with "draft" status
* `archive` - Sets the status of an article from "published" to "archive"
* `restore` - Sets the status of an article from "archive" to "published"
* `unpublish` - Sets the status of an article from "published" to "draft"
* `publish` - Sets the status of an article from "draft" to "published"
* `purge` - Deletes all articles
* `statuses` - Returns an object containing all article statuses: `{ none: 0, published: 2, draft: 1, archive: 4 }`
* `updateSlug` - Updates slug of an article
* `toSlug` - ??? (TODO)
* `ratings.*`
 * `find` - Finds ratings of an article
 * `findByUsername` - Finds rating of an article by _userName_
 * `create` - Creates a new rating for an article
 * `update` - Updates a rating of an article
 * `remove` - Removes a rating from an article
 * `removeAll` - Removes all ratings from an article
* `tags.*`
 * `get` - Gets an article tag
 * `find` - Finds article tags by given criteria
 * `create` - Creates a new tag for an article
 * `remove` - Removes a tag from an article
 * `removeAll` - Removes all tags from an article
* `permissions.*`
 * `get` - Gets an article permission
 * `update` - Updates an article permission
 * `removeByUser` - ??? (TODO)
 * `removeByRole` - ??? (TODO)
* `routeService` - Provides direct access to `articleRouteService`

Here are a few examples on how to use the `articleService`:

```javascript
var id = "73a22b5d-e5ef-44f2-9c81-a3fb01063f86";
baasicArticlesService.get(id)
.success(function(data) {
    // data variable contains a single article object that match the id
    });
```

```javascript
var options = { searchQuery: "myQuery", page: 4, rpp: 3 };
baasicArticlesService.find(options)
.success(function(data) {
    // data variable contains a collection of article objects that match the filtering parameters
    });
```

For functions such as `update` and `remove` that don't use `articleRouteService` for obtaining route templates, routes can be obtained from article (HAL enabled) objects like this:

```javascript
var params = baasicApiService.removeParams(articleObject);
var uri = params["model"].links('delete').href;
// i.e. if the articleObject had the following id: "73a22b5d-e5ef-44f2-9c81-a3fb01063f86"
// the uri would yield "/articles/73a22b5d-e5ef-44f2-9c81-a3fb01063f86"
```

##### articleRatingsService

Baasic Article Ratings Service provides an easy way to consume Baasic Article Ratings REST routes. `articleRatingsService` functions are not bound to particular article items but are meant to be used on ratings resources directly.

* `get` - Gets a single article rating
* `find` - Finds article ratings by given criteria
* `findByUser` - Finds article ratings by _user_
* `create` - Creates a new article rating
* `update` - Updates an article rating
* `remove` - Deletes an article rating
* `routeService` - Provides direct access to `articleRatingsRouteService`

`articleRatingsService` is used in the same way as the `articleService`.

##### articleTagsService

Baasic Article Tags Service provides an easy way to consume Baasic Article Tags REST routes. `articleTagsService` functions are not bound to particular article items but are meant to be used on tag resources directly.

* `get` - Gets a single article tag
* `find` - Finds article tags by given criteria
* `create` - Creates a new tag rating
* `update` - Updates an tag rating
* `remove` - Deletes an tag rating
* `routeService` - Provides direct access to `articleTagsRouteService`

`articleTagsService` is used in the same way as the `articleService`.

##### articleSettingsService

Baasic Article Settings Service provides an easy way to consume Baasic Article Settings REST routes. `articleSettingsService` functions are not bound to particular article items but are meant to be used on settings resources directly.

* `get` - Gets article settings
* `update` - Updates article settings
* `routeService` - Provides direct access to `articleSettingsService`

`articleSettingsService` is used in the same way as the `articleService`.

##### Route Services

Baasic Articles Route Services (`articleRouteService`, `articleRatingsRouteService`, `articleTagsRouteService`, `articleSettingsRouteService`) provide Baasic route templates which can then be expanded to Baasic REST URI's through the [URI Template](https://github.com/Baasic/uritemplate-js) by providing it with an object that contains URI parameters. For example `articleService` uses `articleRouteService` to obtain a part of needed routes while the other part is obtained through HAL. Route services by convention use the same function names as their corresponding services.

* __articleRouteService__
 * `get`, `find`, `create`, `publish`, `purge`
 * `ratings.*` - `find`, `findByUsername`, `create`
 * `tags.*` - `get`, `find`, `create`
 * `permissions.*` - `get`, `update`, `removeByUser`, `removeByRole`
 * `parse` - Provides direct access to the `uriTemplateService`

* __articleRatingsRouteService__
 * `get`, `find`, `findByUser`, `create`
 * `parse` - Provides direct access to the `uriTemplateService`

* __articleTagsRouteService__
 * `get`, `find`, `create`
 * `parse` - Provides direct access to the `uriTemplateService`

* __articleSettingsRouteService__
 * `get`
 * `parse` - Provides direct access to the `uriTemplateService`

URI templates can be expanded manually like this:

```javascript
var params = { searchQuery: "myQuery", page: 4, rpp: 3 };
var uri = baasicArticleRouteService.find.expand(params);
// uri will yield "/articles/?searchQuery=myQuery&page=4&rpp=3"
```

## Build Process

1. Install [NodeJs](http://nodejs.org/download/)
2. Open Shell/Command Prompt in the Baasic AngularJS folder
3. Run `npm install`
4. Install gulp globally: `npm install -g gulp`
5. Run `gulp`

## Contributing

* [Pull requests are always welcome](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#pull-requests-are-always-welcome)
* Please [report](https://github.com/Baasic/baasic-sdk-sdk-angularjs-core#issue-reporting) any issues you might  have found
* Help us write the documentation
* Create interesting apps using SDK
* Looking for something else to do? Get in touch..
