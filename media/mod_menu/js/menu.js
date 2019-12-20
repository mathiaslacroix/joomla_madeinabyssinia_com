/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @copyright  Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
(function () {
  'use strict';

  function topLevelMouseOver(el, settings) {
    var ulChild = el.querySelector('ul');

    if (ulChild) {
      ulChild.setAttribute('aria-hidden', 'false');
      ulChild.classList.add(settings.menuHoverClass);
    }
  }

  function topLevelMouseOut(el, settings) {
    var ulChild = el.querySelector('ul');

    if (ulChild) {
      ulChild.setAttribute('aria-hidden', 'true');
      ulChild.classList.remove(settings.menuHoverClass);
    }
  }

  function setupNavigation(nav) {
    var settings = {
      menuHoverClass: 'show-menu',
      dir: 'ltr'
    };
    var topLevelChilds = nav.querySelectorAll(':scope > li'); // Set tabIndex to -1 so that top_level_childs can't receive focus until menu is open

    topLevelChilds.forEach(function (topLevelEl) {
      var linkEl = topLevelEl.querySelector('a');

      if (linkEl) {
        linkEl.tabIndex = '0';
        linkEl.addEventListener('mouseover', topLevelMouseOver(topLevelEl, settings));
        linkEl.addEventListener('mouseout', topLevelMouseOut(topLevelEl, settings));
      }

      var spanEl = topLevelEl.querySelector('span');

      if (spanEl) {
        spanEl.tabIndex = '0';
        spanEl.addEventListener('mouseover', topLevelMouseOver(topLevelEl, settings));
        spanEl.addEventListener('mouseout', topLevelMouseOut(topLevelEl, settings));
      }

      topLevelEl.addEventListener('mouseover', function (event) {
        var curEl = event.target;
        var ulChild = curEl.querySelector('ul');

        if (ulChild) {
          ulChild.setAttribute('aria-hidden', 'false');
          ulChild.classList.add(settings.menuHoverClass);
        }
      });
      topLevelEl.addEventListener('mouseout', function (event) {
        var curEl = event.target;
        var ulChild = curEl.querySelector('ul');

        if (ulChild) {
          ulChild.setAttribute('aria-hidden', 'true');
          ulChild.classList.remove(settings.menuHoverClass);
        }
      });
      topLevelEl.addEventListener('focus', function (event) {
        var curEl = event.target;
        var ulChild = curEl.querySelector('ul');

        if (ulChild) {
          ulChild.setAttribute('aria-hidden', 'true');
          ulChild.classList.add(settings.menuHoverClass);
        }
      });
      topLevelEl.addEventListener('blur', function (event) {
        var curEl = event.target;
        var ulChild = curEl.querySelector('ul');

        if (ulChild) {
          ulChild.setAttribute('aria-hidden', 'false');
          ulChild.classList.remove(settings.menuHoverClass);
        }
      });
      topLevelEl.addEventListener('keydown', function (event) {
        var keyName = event.key;
        var curEl = event.target;
        var curLiEl = curEl.parentElement;
        var curUlEl = curLiEl.parentElement;
        var prevLiEl = curLiEl.previousElementSibling;
        var nextLiEl = curLiEl.nextElementSibling;

        if (!prevLiEl) {
          prevLiEl = curUlEl.children[curUlEl.children.length - 1];
        }

        if (!nextLiEl) {
          var _curUlEl$children = _slicedToArray(curUlEl.children, 1);

          nextLiEl = _curUlEl$children[0];
        }

        switch (keyName) {
          case 'ArrowLeft':
            event.preventDefault();

            if (settings.dir === 'rtl') {
              nextLiEl.children[0].focus();
            } else {
              prevLiEl.children[0].focus();
            }

            break;

          case 'ArrowRight':
            event.preventDefault();

            if (settings.dir === 'rtl') {
              prevLiEl.children[0].focus();
            } else {
              nextLiEl.children[0].focus();
            }

            break;

          case 'ArrowUp':
            {
              event.preventDefault();
              var parent = curLiEl.parentElement.parentElement;

              if (parent.nodeName === 'LI') {
                parent.children[0].focus();
              } else {
                prevLiEl.children[0].focus();
              }

              break;
            }

          case 'ArrowDown':
            event.preventDefault();

            if (curLiEl.classList.contains('parent')) {
              var child = curLiEl.querySelector('ul');

              if (child != null) {
                var childLi = child.querySelector('li');
                childLi.children[0].focus();
              } else {
                nextLiEl.children[0].focus();
              }
            } else {
              nextLiEl.children[0].focus();
            }

            break;

          default:
            break;
        }
      });
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    var navs = document.querySelectorAll('.nav');
    [].forEach.call(navs, function (nav) {
      setupNavigation(nav);
    });
  });
})();