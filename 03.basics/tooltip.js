class Tooltip extends HTMLElement {
  constructor() {
    super();
    this._tooltipContainer;
    this._tooltipText = 'Tooltip Web Component.';
  }

  connectedCallback() {
    const tooltipIcon = document.createElement('span');
    
    if(this.hasAttribute('text')) {
      this._tooltipText = this.getAttribute('text');
    }

    tooltipIcon.textContent = ' (?)';

    tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
    tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));

    this.appendChild(tooltipIcon);
  }

  _showTooltip() {
    this._tooltipContainer = document.createElement('div');
    this._tooltipContainer.textContent = this._tooltipText;
    this.appendChild(this._tooltipContainer);
  }

  _hideTooltip() {
    this.removeChild(this._tooltipContainer)
  }
}

customElements.define('pxy-tooltip', Tooltip);