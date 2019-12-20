/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
Joomla = window.Joomla || {};

(function (Joomla) {
  Joomla.toggleAll = function () {
    var checkBoxes = [].slice.call(document.querySelectorAll('.chk-menulink'));
    var value = checkBoxes[0].checked;
    checkBoxes.forEach(function (checkBox) {
      checkBox.checked = !value;
    });
  };

  Joomla.toggleMenutype = function (a) {
    var checkBox = [].slice.call(document.getElementsByClassName("menutype-".concat(a)));
    var value = checkBox[0].checked;
    checkBox.forEach(function (element) {
      element.checked = !value;
    });
  };
})(Joomla);