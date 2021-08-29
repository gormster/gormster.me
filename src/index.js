const $ = (...args) => Array.from(document.querySelectorAll(...args));

import { EmailButton } from './emailButton.js';

customElements.define('email-button', EmailButton);

window.addEventListener('DOMContentLoaded', () => {

  const helloBanner = $('#hello-banner')[0];
  const helloLead = $('#hello-lead')[0];
  const helloImage = $('#hello-image')[0];
  const main = $('main')[0];

  function hashchange() {
    if (!window.location.hash) {
      window.location.hash = '#ios';
    }

    let target = $(window.location.hash)[0];

    $('.nav-link').forEach( el => {
      el.classList.remove('active')
      el.ariaSelected = false;
    });

    let tab = $(`.nav-link[href="${window.location.hash}"]`)[0];
    tab.classList.add('active');
    tab.ariaSelected = true;

    helloBanner.textContent = target.dataset.helloBanner;
    helloLead.textContent = target.dataset.helloLead;
    helloImage.src = target.dataset.helloImage;

    let removeThese = [].filter.call(main.classList, (t) => t.match(/tab-/));
    main.classList.remove(...removeThese);
    main.classList.add(`tab-${tab.dataset.tabId}`);
  }

  window.onhashchange = hashchange;

  hashchange();

  window.addEventListener('load', () => {
    document.body.classList.remove('preload');
  });
});

