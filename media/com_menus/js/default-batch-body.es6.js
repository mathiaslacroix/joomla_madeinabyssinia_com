/**
* PLEASE DO NOT MODIFY THIS FILE. WORK ON THE ES6 VERSION.
* OTHERWISE YOUR CHANGES WILL BE REPLACED ON THE NEXT BUILD.
**/

/**
 * @copyright  Copyright (C) 2005 - 2019 Open Source Matters, Inc. All rights reserved.
 * @license    GNU General Public License version 2 or later; see LICENSE.txt
 */
(document => {
  const batchMenu = document.getElementById('batch-menu-id');
  const batchCopyMove = document.getElementById('batch-copy-move');
  let batchSelector;

  const onChange = () => {
    if (batchSelector.value !== 0 || batchSelector.value !== '') {
      batchCopyMove.style.display = 'block';
    } else {
      batchCopyMove.style.display = 'none';
    }
  };

  if (batchMenu) {
    batchSelector = batchMenu;
  }

  if (batchCopyMove) {
    batchSelector.addEventListener('change', onChange);
  }
})(document);