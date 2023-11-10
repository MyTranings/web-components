class Modal extends HTMLElement {
    constructor() {
        super();

        this.isOpen = false;

        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                }

                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0, 0, 0, 0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }
                
                #modal {
                    position: fixed;
                    top: 15vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: white;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                    border-radius: 8px;
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    pointer-events: none;
                }   

                :host([opened]) {
                    display: block;
                }   

                :host([opened]) #backdrop,
                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }

                header {
                    padding: 1rem;
                }

                ::slotted(h1) {
                    font-size: 1.25rem;
                }

                #main {
                    padding: 1rem;
                }

                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                #actions button {
                    margin: 0 0.25rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title">Please Confirm</slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="cancel-button">Cancel</button>
                    <button id="confirm-button">Okay</button>
                </section>
            </div>
        `;
        const slots = this.shadowRoot.querySelectorAll('slot');
        console.log(slots)
        slots[1].addEventListener('slotchange', function() {
            console.dir(slots[1].assignedNodes())
        });
        const cancelButton = this.shadowRoot.querySelector('#cancel-button');
        const confirmButton = this.shadowRoot.querySelector('#confirm-button');

        cancelButton.addEventListener('click', this._cancel.bind(this));
        confirmButton.addEventListener('click', this._confirm.bind(this));
    }

    connectedCallback() {
        const backdrop = this.shadowRoot.querySelector('#backdrop');
        backdrop.addEventListener('click', this.hide.bind(this));
    }

    disconnectedCallback() {

    }

    open() {
        this.setAttribute('opened', '');
        this.isOpen = true;
    }

    hide() {
        if(this.hasAttribute('opened')) {
            this.removeAttribute('opened');
        }
        this.isOpen = false;
    }

    _cancel() {
        this.hide();
    }

    _confirm() {
        this.hide();
    }
}

customElements.define('pxy-modal', Modal)