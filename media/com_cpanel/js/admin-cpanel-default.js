/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
(function (window, document, Joomla) {
  var matchesFn = 'matches';

  var closest = function closest(element, selector) {
    var parent;
    var el = element; // Traverse parents

    while (el) {
      parent = el.parentElement;

      if (parent && parent[matchesFn](selector)) {
        return parent;
      }

      el = parent;
    }

    return null;
  };

  Joomla.unpublishModule = function (element) {
    // Get variables
    var baseUrl = 'index.php?option=com_modules&task=modules.unpublish&format=json';
    var id = element.getAttribute('data-module-id');
    Joomla.request({
      url: "".concat(baseUrl, "&cid=").concat(id),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      onSuccess: function onSuccess() {
        var wrapper = closest(element, '.module-wrapper');
        wrapper.parentNode.removeChild(wrapper);
        Joomla.renderMessages({
          message: [Joomla.JText._('COM_CPANEL_UNPUBLISH_MODULE_SUCCESS')]
        });
      },
      onError: function onError() {
        Joomla.renderMessages({
          error: [Joomla.JText._('COM_CPANEL_UNPUBLISH_MODULE_ERROR')]
        });
      }
    });
  };

  var onBoot = function onBoot() {
    // Find matchesFn with vendor prefix
    ['matches', 'msMatchesSelector'].some(function (fn) {
      if (typeof document.body[fn] === 'function') {
        matchesFn = fn;
        return true;
      }

      return false;
    });
    var cpanelModules = document.getElementById('cpanel-modules');

    if (cpanelModules) {
      var links = [].slice.call(cpanelModules.querySelectorAll('.unpublish-module'));
      links.forEach(function (link) {
        link.addEventListener('click', function (event) {
          return Joomla.unpublishModule(event.target);
        });
      });
    } // Cleanup


    document.removeEventListener('DOMContentLoaded', onBoot);
  }; // Initialise


  document.addEventListener('DOMContentLoaded', onBoot);
})(window, document, window.Joomla);