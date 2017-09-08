'use strict';

/**
* @ngdoc directive
* @name shop.module.directive:itemSearch
* @description
* Widget to render product search page. 
* @example
<pre>
    <item-search></item-search>
</pre>
*/
angular.module('shop.module')
   .directive('itemSearch', function () {
       return {
           templateUrl: 'app/shop/widgets/item-search/search-template.html'
       };
   });