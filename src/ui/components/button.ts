import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ICJ } from '../../core/ICJ';

@customElement('filler-button')
export class FillerButton extends LitElement {
  @property()
  public text: string = '';

  @property({ type: Boolean })
  public disabled: boolean = false;

  @property()
  public variant: 'primary' | 'secondary' | 'record' = 'primary';

  @property({ type: Array })
  public plans: ICJ[] = [];

  @state()
  private isMenuOpen: boolean = false;

  static styles = css`
    :host {
      width: 100%;
      display: flex;
      position: relative;
    }
    /* disabled state */
    .btn:disabled {
      background-color: #e0e0e0;
      color: #a0a0a0;
      cursor: not-allowed;
      &:disabled:hover {
        background-color: #e0e0e0;
        color: #a0a0a0;
      }
    }

    .btn {
      cursor: pointer;
      border: 0;
      padding: 8px 12px;
      border-radius: 6px;
      color: white;
      flex-grow: 1;
      font-size: 16px;
      line-height: 27px;
      min-height: 60px;
      padding: 16px 40px;

      &.split-button {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }
      &.split-button + .btn {
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
        flex-grow: 0;
        padding: 16px 12px;
      }
    }

    .primary {
      background-color: #27c07f;
      &:hover {
        background-color: #1e8c5a;
      }
    }

    .secondary {
      background-color: #013f4d;
      &:hover {
        background-color: #012b34;
      }
    }

    .record {
      background-color: #dc3545;
      &:hover {
        background-color: #c82333;
      }
    }

    .menu {
      position: absolute;
      top: 100%;
      left: 0;
      right: 0;
      margin-top: 4px;
      background: white;
      border: 1px solid #ccc;
      border-radius: 6px;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
      display: none;
      z-index: 1000;
    }

    .menu.open {
      display: block;
    }

    .menu-item {
      padding: 8px 12px;
      cursor: pointer;
    }

    .menu-item:hover,
    .menu-item:focus {
      background-color: #f5f5f5;
      outline: none;
    }
  `;

  public connectedCallback(): void {
    super.connectedCallback();
    document.addEventListener('click', this.handleOutsideClick, { capture: true });
  }

  public disconnectedCallback(): void {
    super.disconnectedCallback();
    document.removeEventListener('click', this.handleOutsideClick, { capture: true });
  }

  public render(): TemplateResult {
    const isSplitButton = !!this.plans?.length;
    const mainButton = html`<button ?disabled=${this.disabled} class="btn ${this.variant}${isSplitButton ? ' split-button' : ''}" @click=${this.handleMainButtonClick}>${this.text}</button>`;
    if (!isSplitButton) {
      return mainButton;
    }

    return html`
      ${mainButton}
      <button class="btn ${this.variant}" @click=${() => (this.isMenuOpen = !this.isMenuOpen)}>▼</button>
      <div class="menu ${this.isMenuOpen ? 'open' : ''}" role="menu">${this.plans.map((plan) => html` <div class="menu-item" role="menuitem" tabindex="0" @click=${() => this.handlePlanSelectClick(plan)}>${plan.name}</div> `)}</div>
    `;
  }

  private handleMainButtonClick(): void {
    this.dispatchEvent(new Event('button-click'));
  }

  private handlePlanSelectClick(plan: ICJ): void {
    this.isMenuOpen = false;
    this.dispatchEvent(new CustomEvent('plan-selected', { detail: plan }));
  }
  private handleOutsideClick = (event: MouseEvent): void => {
    if (!this.contains(event.target as Node)) {
      this.isMenuOpen = false;
    }
  };
}
