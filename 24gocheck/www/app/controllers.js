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

/**
* @ngdoc controller
* @name starter.controller:WelcomeCtrl
* @requires $scope
* @requires $rootScope
* @requires $timeout
* @requires $state
* @requires $ionicModal
* @requires $ionicPlatform
* @requires $localStorage
* @requires locale
* @requires i18nService
* @requires dataService
* @requires appService
* @description
* Entrypoint of the app. Welcome screen renders the loading status of the app. i.e, connecting to API, logged in etc.
* This controller sets the default language and creates a valid session with the API server. 
*/
angular.module('starter')
    .controller('WelcomeCtrl', function ($scope, $rootScope, $timeout, $state, $ionicModal, $ionicPlatform, $localStorage, locale, i18nService, dataService, appService, STATUSBAR_COLOR) {
        $localStorage.lang = $localStorage.lang || 'en-US';

        $timeout(function () {
            var lang = $localStorage.lang || 'en-US';
            i18nService.SetLanguage(lang);
        }, 0);

        $scope.version = "1.1.0";

        $scope.goHome = function () {
            if (window.StatusBar) {
                StatusBar.show();
                StatusBar.styleDefault();
            }

            ionic.Platform.showStatusBar(true);

            $state.go('app.menu.shop.home');
        }

        $scope.$on('$ionicView.enter', function () {
            $scope.text = locale.getString('common.welcome_connecting');
            $ionicPlatform.ready(function () {
                if (window.StatusBar) {
                    StatusBar.backgroundColorByHexString(STATUSBAR_COLOR);
                }

                if (window.cordova && typeof window.cordova.getAppVersion === 'function') {
                    cordova.getAppVersion(function (version) {
                        $scope.version = version;
                    });
                }
            });

            $timeout(function () {
                $scope.text = locale.getString('common.welcome_connected');
            }, 100);

            if ($localStorage.login) {
                $timeout(function () {
                    $scope.text = locale.getString('common.welcome_logging_in');
                }, 500);
                appService.Login($localStorage.login).then(function (data) {
                    $scope.text = locale.getString('common.welcome_loading_store');
                    $timeout(function () {
                        $scope.goHome();
                    }, 500);
                }, function (data) {
                    $scope.text = locale.getString('common.welcome_retrying');
                    $timeout(function () {
                        $scope.goHome();
                    }, 500);
                })
            } else {
                $timeout(function () {
                    $scope.goHome();
                }, 500);
            }
        });
    })


/**
* @ngdoc controller
* @name starter.controller:AppCtrl
* @requires $scope
* @requires $rootScope
* @requires locale
* @requires $location
* @requires $ionicModal
* @requires $ionicLoading
* @requires $ionicPopup
* @requires $localStorage
* @requires $state
* @requires $timeout
* @requires appService
* @requires CartService
* @requires FORGOT_LINK
* @requires EMAIL
* @requires PHONE
* 
* @description
* This controller is the parent of all the controller states. Contains generic functions and procedures of the
* app. `$scope.user` variable holds the customer object of currently logged in mobile user.
*/
angular.module('starter')
    .controller('AppCtrl', function ($scope, $rootScope, locale, $location, $ionicModal, $ionicLoading, $ionicPopup, $localStorage, $state, $timeout, appService, CartService, FORGOT_LINK, EMAIL, PHONE) {
        $scope.user = {};
        $scope.page = {};
        $scope.page.breadcrumb = [];
        $scope.login = {};
        $scope.register = {};
        $scope.forms = {};
        $rootScope.data = $localStorage;
        $rootScope.email = EMAIL;

        // override the default alert box
        alert = function (log) {
            $ionicPopup.alert({
                title: "Information",
                template: log
            });
        }

        $scope.currentState = function () {
            return $state.current.name;
        }

        $rootScope.setLanguage = function (lang) {
            window.localStorage.lang = window.localStorage.lang || 'en-US';

            if (!lang) {
                lang = window.localStorage.lang
            }
            else {
                window.localStorage.lang = lang;
            }

            locale.setLocale(lang);

            $ionicLoading.show();
            appService.SetLanguage(lang).then(function () {
                $ionicLoading.hide();
            }, function () {
                $ionicLoading.hide();
            });

            $ionicHistory.clearCache();
        }

        // login prompt
        $timeout(function () {

            if (!$rootScope.noLoginSignupPopup && !$rootScope.userLoggedIn()) {
                $rootScope.noLoginSignupPopup = true;
                $rootScope.showRegisterPopup();
            }
        }, 10000);

        $rootScope.$on("$cordovaNetwork:offline", function () {
            if (window.Connection) {
                if (navigator.connection.type == Connection.NONE) {
                    $ionicPopup.alert({
                        title: locale.getString('modals.no_internet_modal_title'),
                        templateUrl: 'templates/popups/no-internet.html',
                        buttons: [{
                            text: locale.getString('modals.button_retry'),
                            type: 'button-positive',
                            onTap: function (e) {
                                $state.go("welcome");
                            }
                        }, {
                            text: locale.getString('modals.button_cancel'),
                            type: 'button-default'
                        }]
                    });
                }
            }
        });

        $rootScope.openAboutModal = function () {
            $ionicPopup.alert({
                title: locale.getString('modals.about_modal_title'),
                templateUrl: 'templates/popups/about-modal.html',
                buttons: [{
                    text: locale.getString('modals.button_ok'),
                    type: 'button-default'
                }]
            });
        }

        $rootScope.openContactUsModal = function () {
            $ionicPopup.alert({
                title: locale.getString('modals.contact_modal_title'),
                templateUrl: 'templates/popups/contact-modal.html',
                buttons: [{
                    text: locale.getString('modals.button_call_us'),
                    type: 'button-positive',
                    onTap: function (e) {
                        window.location.href = "tel:" + PHONE;
                    }
                }, {
                    text: locale.getString('modals.button_send_email'),
                    type: 'button-positive',
                    onTap: function (e) {
                        window.location.href = "mailto:" + EMAIL;
                    }
                }, {
                    text: locale.getString('modals.button_cancel'),
                    type: 'button-default'
                }]
            });
        }

        CartService.GetAddress().then(function (data) {
            $scope.countries = data.countries;
            $ionicLoading.hide();
        }, function (data) {
            $ionicLoading.hide();
        });

        // method to be called when country is changed by user
        $scope.countryChanged = function () {
            $ionicLoading.show();

            // save payment methods
            CartService.LoadZones($scope.register['country_id']).then(function (data) {
                $ionicLoading.hide();
                $scope.zones = data.zones;
            }, function (data) {
                alert(locale.getString('modals.error_loading_zones'));
                $ionicLoading.hide();
            });
        }

        $rootScope.showRegisterPopup = function () {
            $ionicPopup.alert({
                title: locale.getString('modals.not_signup_modal_title'),
                templateUrl: 'templates/popups/not-signup-modal.html',
                buttons: [{
                    text: locale.getString('modals.button_log_in'),
                    type: 'button-positive',
                    onTap: function (e) {
                        $rootScope.openLoginModal();
                    }
                }, {
                    text: locale.getString('modals.button_register'),
                    type: 'button-balanced',
                    onTap: function (e) {
                        $rootScope.openRegisterModal();
                    }
                }, {
                    text: locale.getString('modals.button_no'),
                    type: 'button-default'
                }]
            });
        }

        $rootScope.hideLoading = function () {
            $ionicLoading.hide();
        }

        $ionicModal.fromTemplateUrl('templates/login-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $rootScope.loginModal = modal;
        });

        $rootScope.userLoggedIn = function () {
            return $localStorage.user != undefined && $localStorage.user != {} && $localStorage.user.customer_id;
        }

        $rootScope.userObject = function () {
            return $localStorage.user || {};
        }

        $rootScope.openLoginModal = function () {
            $rootScope.loginModal.show();
        };

        $rootScope.closeLoginModal = function () {
            $rootScope.loginModal.hide();
        };

        $rootScope.openForgotPassword = function () {
            if (cordova && cordova.InAppBrowser) {
                cordova.InAppBrowser.open(FORGOT_LINK, '_blank', 'location=yes');
            } else {
                alert(locale.getString('modals.error_password_reset_inappbrowser'));
            }
        }

        $ionicModal.fromTemplateUrl('templates/register-modal.html', {
            scope: $scope,
            animation: 'slide-in-up'
        }).then(function (modal) {
            $scope.registerModal = modal;
        });

        $rootScope.openRegisterModal = function () {
            $scope.registerModal.show();
            $scope.closeLoginModal();
        };

        $rootScope.closeRegisterModal = function () {
            $scope.registerModal.hide();
        };

        $rootScope.addPageTitle = function (title) {
            $scope.page.breadcrumb.push(title);
        }

        $rootScope.clearPageTitle = function (title) {
            $scope.page.breadcrumb = [];
        }
    });

/**
* @ngdoc controller
* @name starter.controller:MenuCtrl
* 
* @description
* This controller is the parent of all the controller states with main menu.
*/
angular.module('starter')
    .controller('MenuCtrl', function () {

    });

/**
* @ngdoc controller
* @name starter.controller:MainCtrl
* 
* @description
* This controller is the parent of all the controller states without main menu.
*/
angular.module('starter')
    .controller('MainCtrl', function () {

    });