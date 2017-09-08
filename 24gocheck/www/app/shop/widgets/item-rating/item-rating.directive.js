'use strict';

/**
* @ngdoc directive
* @name shop.module.directive:itemRating
* @description
* Widget to render product reviews list and add new review sections. 
* @param {object} item Product object
* @example
<pre>
    <item-rating item="item"></item-rating>
</pre>
*/
angular.module('shop.module')
   .directive('itemRating', function ($ionicLoading) {
       return {
           templateUrl: 'app/shop/widgets/item-rating/reviews-template.html'
       };
   });