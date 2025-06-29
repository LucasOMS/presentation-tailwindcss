class SpoilerBox extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        const container = document.createElement('div');
        container.innerHTML = `
          <style>
            .spoiler-header {
              background: #eee;
              padding: 0.5em;
              cursor: pointer;
              user-select: none;
              font-weight: bold;
              border-bottom: 1px solid #ccc;
            }
            .spoiler-content {
              display: none;
              padding: 0.5em;
              background: #f9f9f9;
            }
            .spoiler-content.open {
              display: block;
            }
          </style>
          <div class="spoiler-header">${this.getAttribute('title') || 'Spoiler'}</div>
          <div class="spoiler-content"><slot></slot></div>
        `;

        this.shadowRoot.appendChild(container);

        const header = this.shadowRoot.querySelector('.spoiler-header');
        const content = this.shadowRoot.querySelector('.spoiler-content');

        header.addEventListener('click', () => {
            content.classList.toggle('open');
        });
    }
}

customElements.define('spoiler-box', SpoilerBox);
