class SVGLoader extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    async connectedCallback() {
        const src = this.getAttribute('src');
        if (!src) return;

        const cacheKey = 'svg-cache-' + src;
        let svgText;

        if (localStorage.getItem(cacheKey)) {
            svgText = localStorage.getItem(cacheKey);
        } else {
            try {
                const response = await fetch(src);
                svgText = await response.text();

                if (svgText.includes('<svg')) {
                    localStorage.setItem(cacheKey, svgText);
                }
            } catch (error) {
                console.error('Erreur lors du chargement du SVG:', error);
                return;
            }
        }

        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(svgText, 'image/svg+xml');
        const svg = svgDoc.querySelector('svg');

        if (svg) {
            svg.setAttribute('width', '100%');
            svg.setAttribute('height', '100%');
            svg.setAttribute('preserveAspectRatio', 'xMidYMid meet');
            svg.style.display = 'block';

            const viewBox = svg.getAttribute('viewBox')?.split(' ') || ['0', '0', '1', '1'];
            const width = parseFloat(viewBox[2]) || 1;
            const height = parseFloat(viewBox[3]) || 1;

            this.shadowRoot.innerHTML = `
        <style>
          :host {
            display: block;
            width: 100%;
            height: auto;
            aspect-ratio: ${width} / ${height};
          }
          svg {
            width: 100%;
            height: 100%;
          }
        </style>
      `;
            this.shadowRoot.appendChild(svg);
        }
    }
}

customElements.define('svg-loader', SVGLoader);
