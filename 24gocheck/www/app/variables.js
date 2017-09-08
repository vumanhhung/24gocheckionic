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

angular.module('starter')
    //.constant('BASE_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php')
    .constant('BASE_URL', 'http://ocdemo.i2csmobile.com/index.php')
    //.constant('BASE_API_URL', 'http://localhost/opencart-2.3.0.2/upload/index.php?route=api2')
    .constant('BASE_API_URL', 'http://ocdemo.i2csmobile.com/index.php?route=api2')
    .constant('WEBSITE', 'http://ocdemo.i2csmobile.com')
    .constant('FORGOT_LINK', 'http://ocdemo.i2csmobile.com/index.php?route=account/forgotten')
    .constant('EMAIL', 'i2cssolutions@gmail.com')
    .constant('PHONE', '0712966650')
    .constant('ANALYTICS_ID', 'UA-79548648-1')
	.constant('COUPONS_ENABLED', true)
    .constant('STATUSBAR_COLOR', "#387ef5")
    .constant('LANGUAGES', [
            { name: "English", language_id: "en-US" },
            { name: "French", language_id: "fr-FR" },
            { name: "Chinese", language_id: "zh-CN" },
            { name: "Arabic", language_id: "ar-EG" }])
    .constant('LOCAL_NOTIFICATIONS_ARRAY', [
            {
                text: 'Come and see new arrivals and offers! Exclusive for mobile app users',
                title: 'New Arrivals and Offers at i2CS'
            },
            {
                text: 'Exclusive offers for mobile app users',
                title: 'See New Offers at i2CS'
            },
            {
                text: 'Hi :*, check our new collection!',
                title: 'Hi from i2CS :)'
            }
    ])
    .constant('RTL_LANGUAGES', ['ar'])