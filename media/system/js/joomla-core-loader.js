"use strict";

(customElements => {
  'strict';
  /**
   * Creates a custom element with the default spinner of the Joomla logo
   */

  class JoomlaCoreLoader extends HTMLElement {
    constructor() {
      super();
      const template = document.createElement('template');
      template.innerHTML = `<style>:host{position:fixed;top:0;left:0;z-index:10000;display:block;width:100%;height:100%;overflow:hidden;opacity:.8}.box{position:relative;width:300px;height:300px;margin:0 auto;-webkit-transform:rotate(45deg);transform:rotate(45deg)}.box p{float:left;margin:-20px 0 0 252px;font:normal 1.25em/1em sans-serif;color:#999;-webkit-transform:rotate(-45deg);transform:rotate(-45deg)}.box>span{-webkit-animation:jspinner 2s ease-in-out infinite;animation:jspinner 2s ease-in-out infinite}.box .red{-webkit-animation-delay:-1.5s;animation-delay:-1.5s}.box .blue{-webkit-animation-delay:-1s;animation-delay:-1s}.box .green{-webkit-animation-delay:-.5s;animation-delay:-.5s}.yellow{width:90px;height:90px;background:#f9a541;border-radius:90px}.yellow,.yellow:after,.yellow:before{position:absolute;top:0;left:0;content:""}.yellow:after,.yellow:before{width:50px;box-sizing:content-box;border:50px solid #f9a541;background:transparent}.yellow:before{height:35px;margin:60px 0 0 -30px;border-width:50px 50px 0;border-radius:75px 75px 0 0}.yellow:after{height:101px;margin:145px 0 0 -30px;border-width:0 0 0 50px}.red{width:90px;height:90px;background:#f44321;border-radius:90px}.red,.red:after,.red:before{position:absolute;top:0;left:0;content:""}.red:after,.red:before{width:50px;box-sizing:content-box;border:50px solid #f44321;background:transparent}.red:before{height:35px;margin:60px 0 0 -30px;border-width:50px 50px 0;border-radius:75px 75px 0 0}.red:after{height:101px;margin:145px 0 0 -30px;border-width:0 0 0 50px}.blue{width:90px;height:90px;background:#5091cd;border-radius:90px}.blue,.blue:after,.blue:before{position:absolute;top:0;left:0;content:""}.blue:after,.blue:before{width:50px;box-sizing:content-box;border:50px solid #5091cd;background:transparent}.blue:before{height:35px;margin:60px 0 0 -30px;border-width:50px 50px 0;border-radius:75px 75px 0 0}.blue:after{height:101px;margin:145px 0 0 -30px;border-width:0 0 0 50px}.green{width:90px;height:90px;background:#7ac143;border-radius:90px}.green,.green:after,.green:before{position:absolute;top:0;left:0;content:""}.green:after,.green:before{width:50px;box-sizing:content-box;border:50px solid #7ac143;background:transparent}.green:before{height:35px;margin:60px 0 0 -30px;border-width:50px 50px 0;border-radius:75px 75px 0 0}.green:after{height:101px;margin:145px 0 0 -30px;border-width:0 0 0 50px}.yellow{margin:0 0 0 182px;-webkit-transform:rotate(0deg);transform:rotate(0deg)}.red{margin:182px 0 0 364px;-webkit-transform:rotate(90deg);transform:rotate(90deg)}.blue{margin:364px 0 0 182px;-webkit-transform:rotate(180deg);transform:rotate(180deg)}.green{margin:182px 0 0;-webkit-transform:rotate(270deg);transform:rotate(270deg)}@-webkit-keyframes jspinner{0%,40%,to{opacity:.3}20%{opacity:1}}@keyframes jspinner{0%,40%,to{opacity:.3}20%{opacity:1}}@media (prefers-reduced-motion:reduce){.box>span{-webkit-animation:none;animation:none}}</style>
<div>
    <span class="yellow"></span>
    <span class="red"></span>
    <span class="blue"></span>
    <span class="green"></span>
    <p>&reg;</p>
</div>`; // Patch the shadow DOM

      if (window.ShadyCSS) {
        window.ShadyCSS.prepareTemplate(template, 'joomla-core-loader');
      }

      this.attachShadow({
        mode: 'open'
      });
      this.shadowRoot.appendChild(template.content.cloneNode(true)); // Patch the shadow DOM

      if (window.ShadyCSS) {
        window.ShadyCSS.styleElement(this);
      }
    }

    connectedCallback() {
      this.style.backgroundColor = this.color;
      this.style.opacity = 0.8;
      this.shadowRoot.querySelector('div').classList.add('box');
    }

    static get observedAttributes() {
      return ['color'];
    }

    get color() {
      return this.getAttribute('color') || '#fff';
    }

    set color(value) {
      this.setAttribute('color', value);
    }

    attributeChangedCallback(attr, oldValue, newValue) {
      switch (attr) {
        case 'color':
          if (newValue && newValue !== oldValue) {
            this.style.backgroundColor = this.color;
          }

          break;

        default: // Do nothing

      }
    }

  }

  if (!customElements.get('joomla-core-loader')) {
    customElements.define('joomla-core-loader', JoomlaCoreLoader);
  }
})(customElements);