import { decryptString } from './dumbcrypt.js';

export class EmailButton extends HTMLElement {
  constructor() {
    // Always call super first in constructor
    super();

    const shadow = this.attachShadow({mode: 'open'});

    const wrapper = document.createElement('span');
    wrapper.classList.add('email-button-wrapper');
    shadow.append(wrapper);

    // style
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = '/custom.css';
    shadow.append(link);

    const revealButton = document.createElement('button');
    revealButton.classList.add('btn', 'btn-email');
    revealButton.innerHTML = '<svg class="icon" viewBox="0 0 32 32"><use href="/static/icons.svg#mail" width="32" height="32" /></svg>Email me';

    wrapper.append(revealButton);

    revealButton.addEventListener('click', (evt) => {
      const addy = decryptString(this.getAttribute('value'));
      const emailButtonGroup = document.createElement('div');
      emailButtonGroup.classList.add('btn-group');

      const emailButton = document.createElement('a');
      emailButton.classList.add('btn', 'btn-outline-email');
      emailButton.href = `mailto:${addy}`;
      emailButton.textContent = addy;

      emailButtonGroup.append(emailButton);

      const copyEmailButton = document.createElement('button');
      copyEmailButton.classList.add('btn', 'btn-email');
      copyEmailButton.innerHTML = '<svg class="icon right" viewBox="0 0 32 32"><use href="/static/icons.svg#clipboard" width="32" height="32" /></svg>';
      copyEmailButton.addEventListener('click', async () => {
        await navigator.clipboard.writeText(addy);
        copyEmailButton.querySelector('use').setAttribute('href', "/static/icons.svg#clipboard-check");
      });

      emailButtonGroup.append(copyEmailButton);

      revealButton.remove();
      wrapper.append(emailButtonGroup);
    });

  }
}
