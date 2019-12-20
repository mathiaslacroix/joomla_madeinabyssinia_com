/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
Joomla = window.Joomla || {};

(function (document) {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    window.jSelectModuleType = function () {
      var elements = document.querySelectorAll('#moduleDashboardAddModal .modal-footer .btn');

      if (elements.length) {
        elements.forEach(function (button) {
          button.classList.remove('hidden');
        });
      }
    };

    var buttons = document.querySelectorAll('#moduleDashboardAddModal .modal-footer .btn');

    if (buttons.length) {
      buttons.forEach(function (button) {
        button.addEventListener('click', function (event) {
          var elem = event.currentTarget; // There is some bug with events in iframe where currentTarget is "null"
          // => prevent this here by bubble up

          if (!elem) {
            elem = event.target;
          }

          var clicktarget = elem.getAttribute('data-target');

          if (clicktarget) {
            var iframe = document.querySelector('#moduleDashboardAddModal iframe');
            var content = iframe.contentDocument || iframe.contentWindow.document;
            content.querySelector(clicktarget).click();
          }
        });
      });
    }
  });
})(document);