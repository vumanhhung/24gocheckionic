/*
 * i2CSMobile Lite is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * any later version.
 *
 * i2CSMobile Lite is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Foobar.  If not, see <http://www.gnu.org/licenses/>.
 * 
 * This is the free version of i2CSMobile for developers. Feel free to develop this
 * and customize for personal or commercial use. Contact lite@i2csmobile.com
 * 
 * http://i2csmobile.com/
 */

'use strict';

/**
* @ngdoc overview
* @name starter
* 
* @requires ionic
* @requires ngCordova
* @requires angular-preload-image
* @requires ngLocalize
* @requires ngLocalize.InstalledLanguages
* @requires ionic.service.core
* @requires ngStorage
* @requires ngMessages
* @requires shop.module
* @requires offers.module
* @requires cart.module
* @requires info.module
* @requires payments.module
* @requires auth.module
*
* @description 
* Main entry point of the app. When a new module needs to be added, have to inject the module here. ex, `sample.module`
* New languages must be initialized by editing following configuration values,
* ```
 .value('localeSupported', [
        'en-US',
        'fr-FR',
        'zh-CN'
    ])
 ```
*
* Configuration for the main entrypoint of the app is here. 
* You can switch the main layout (tabs or side menu) by toggling templateUrl of the 
* 'app.menu' state. 

* The app is bootstrapped from an abstract state called `app`. Then it branches into 
* two abstract states, `app.menu` and `app.main`. All the states which inherit `app.menu`
* state will have either tabs or side menu, whereas `app.main` will have a clean 
* layout without tabs or side menus.
* 
* ```
$stateProvider
    .state('app', {
        url: '/app',
        abstract: true,
        templateUrl: 'app/menu/templates/app.html',
        controller: 'AppCtrl'
    })
    .state('app.menu', {
        url: '/menu',
        abstract: true,
        templateUrl: 'app/menu/templates/tabs.html',
        //templateUrl: 'app/menu/templates/side.html',
        controller: 'MenuCtrl'
    })
    .state('app.main', {
        url: '/main',
        abstract: true,
        templateUrl: 'app/menu/templates/menuless.html',
        controller: 'MainCtrl'
    })
* ```
*/
var starter = angular.module('starter', ['ionic', 'ngCordova', 'angular-preload-image', 'ionic-ratings', 'ngLocalize', 'ngLocalize.InstalledLanguages', 'ngLocalize.Events', 'ionic.service.core', 'ngStorage', 'ngMessages', 'shop.module', 'offers.module', 'cart.module', 'info.module', 'payments.module'])
    .run(function ($ionicPlatform, $ionicPopup, $ionicLoading, $localStorage, $ionicNavBarDelegate, $ionicScrollDelegate, $rootScope, $timeout, $state, notificationService, updateService) {
        $ionicPlatform.ready(function () {

            // init ionic service platform
            Ionic.io();

            // check for updates
            updateService.init();


            var user = Ionic.User.current();

            $localStorage.silent = $localStorage.silent || false;

            // call to push registration if service is available
            var pushInit = function () {
                if (!$localStorage.silent && notificationService && notificationService.subscribeForPush)
                    notificationService.subscribeForPush();
            }

            // save additional data to user
            var saveInfoToUser = function () {
                user = Ionic.User.current();
                var deviceInfo = cordova.require("cordova/plugin/DeviceInformation");
                deviceInfo.get(function (result) {
                    user.set('data', angular.toJson(result));
                    user.save();
                });
            }

            var device = device || {};
            device.uuid = device.uuid ? device.uuid : Math.random().toString(36).substr(2, 5);

            // user login details
            var loginDetails = {
                'email': device.uuid + '@i2cs.com',
                'password': device.uuid
            };

            if (user.isAuthenticated()) {
                pushInit();
            } else {

                Ionic.Auth.login('basic', { 'remember': true }, loginDetails)
                       .then(function () {
                           pushInit();
                       }, function (errors) {
                           Ionic.Auth.signup(loginDetails).then(function () {
                               Ionic.Auth.login('basic', { 'remember': true }, loginDetails).then(function () {
                                   pushInit();
                                   if (cordova.platformId === 'android') {
                                       saveInfoToUser();
                                   }
                               });
                           });
                       });
            }

            // local notifications
            notificationService.init();

            // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
            // for form inputs)
            if (cordova.platformId === 'ios' && window.cordova && window.cordova.plugins && window.cordova.plugins.Keyboard) {
                cordova.plugins.Keyboard.disableScroll(true);
            }
            if (window.StatusBar) {
                // org.apache.cordova.statusbar required
                StatusBar.styleDefault();
            }

            $ionicPlatform.onHardwareBackButton(function (event) {
                event.preventDefault();
                event.stopPropagation();
                $ionicLoading.hide();
            });
        });

        $rootScope.$on('$ionicView.enter', function () {
            $ionicNavBarDelegate.showBar(true);
        });

        $rootScope.$on('$ionicView.loaded ', function () {

        });
    })
    //list of languages currently supported
    .value('localeSupported', [
        'en-US',
        'fr-FR',
        'zh-CN',
        'ar-EG'
    ])
    //fallbacks when a particular language is present but not for the region from which the app is being opened (e.g. en-GB will use en-US)
    .value('localeFallbacks', {
        'en': 'en-US',
        'fr': 'fr-FR',
        'zh': 'zh-CN',
        'ar': 'ar-EG'
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        /**
         * You can switch the main layout (tabs or side menu) by toggling templateUrl of the 
         * 'app.menu' state. 
         * 
         * The app is bootstrapped from an abstract state called `app`. Then it branches into 
         * two abstract states, `app.menu` and `app.main`. All the states which inherit `app.menu`
         * state will have either tabs or side menu, whereas `app.main` will have a clean 
         * layout without tabs or side menus.
         * **/
        $stateProvider
            .state('app', {
                url: '/app',
                abstract: true,
                templateUrl: 'app/menu/templates/app.html',
                controller: 'AppCtrl'
            })
            .state('app.menu', {
                url: '/menu',
                abstract: true,
                templateUrl: 'app/menu/templates/tabs.html',
                //templateUrl: 'app/menu/templates/side.html',
                controller: 'MenuCtrl'
            })
            .state('app.main', {
                url: '/main',
                abstract: true,
                templateUrl: 'app/menu/templates/menuless.html',
                controller: 'MainCtrl'
            })
    })
    .config(function ($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('welcome', {
                url: '/welcome',
                templateUrl: 'templates/welcome.html',
                controller: 'WelcomeCtrl'
            })

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/welcome');
    })
    .config(function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true;
    });

starter.config(function ($ionicConfigProvider) {
    $ionicConfigProvider.tabs.position('top').style('standard');
})

starter.constant('$ionicLoadingConfig', {
    templateUrl: 'templates/loading.html',
    duration: 30000
});
