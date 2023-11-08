class MoreInfo extends HTMLElement {
    constructor() {
        super();
        this.isOpen = false;

        this.attachShadow({ mode: 'open' })

        this.shadowRoot.innerHTML = `<button>Show</button>`;
        this.button = this.shadowRoot.querySelector('button');

        this.infoElement = document.createElement('p');
        this.infoSlot = '<slot>Default</slot>';
    }

    connectedCallback() {
        this.infoElement.innerHTML = this.infoSlot;

        if(this.hasAttribute('open')) {
            this._toggleContent();
        }

        this.button.addEventListener('click', this._toggleContent.bind(this))
    }

    _toggleContent() {
        this.isOpen = !this.isOpen;

        if(this.isOpen) {
            this.shadowRoot.appendChild(this.infoElement);
            this.button.textContent = 'Hide'
        } else {
            this.shadowRoot.removeChild(this.infoElement);
            this.button.textContent = 'Show'
        }
    }
}

customElements.define('px-more-info', MoreInfo);