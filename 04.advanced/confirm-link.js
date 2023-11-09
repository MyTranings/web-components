class ConfrimLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', (event) => {
            if(!confirm('Do you really want to leave?')) {
                event.preventDefault();
            } 
        })
    }
}

customElements.define('pxy-confirm-link', ConfrimLink, { extends: 'a' });