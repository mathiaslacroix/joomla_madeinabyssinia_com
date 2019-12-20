/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @package     Joomla.JavaScript
 * @copyright   Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license     GNU General Public License version 2 or later; see LICENSE.txt
 */
window.JoomlaInitReCaptcha2 = function () {
  'use strict';

  var itemNodes = document.getElementsByClassName('g-recaptcha');
  var optionKeys = ['sitekey', 'theme', 'size', 'tabindex', 'callback', 'expired-callback', 'error-callback'];
  var items = [].slice.call(itemNodes);
  items.forEach(function (item) {
    var options = {};

    if (item.dataset) {
      options = item.dataset;
    } else {
      [].slice.call(optionKeys).forEach(function (optionData) {
        var optionKeyFq = "data-".concat(optionData);

        if (item.hasAttribute(optionKeyFq)) {
          options[optionData] = item.getAttribute(optionKeyFq);
        }
      });
    } // Set the widget id of the recaptcha item


    item.setAttribute('data-recaptcha-widget-id',
    /* global grecaptcha */
    grecaptcha.render(item, options));
  });
};