import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';

@customElement('filler-checkbox')
export class FillerCheckbox extends LitElement {
  @property()
  public text: string = '';

  @property({ type: Boolean })
  public checked: boolean = false;

  static styles = css`
    .filler-checkbox {
      font-size: 20px;
      display: flex;
      align-items: center;
      gap: 6px;
    }
    [type='checkbox'] {
      --_accent: #3dd092;
      --_bdw: calc(1em * (4/3) / 13.333333);
      --_mask: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-width="3" stroke="%23000" fill="none" stroke-linecap="round" stroke-linejoin="round"> <path d="M5 12l5 5l10 -10"/></svg>');

      appearance: none;
      aspect-ratio: 1;
      background: var(--_bg, Field);
      border: var(--_bdw) solid var(--_bdc, GrayText);
      border-radius: var(--_bdrs, 0.2em);
      box-sizing: border-box;
      font-size: 1em;
      height: 1em;
      margin: var(--_m, 0.1875em 0.1875em 0.1875em 0.25em);
      position: relative;
      width: 1em;

      &::after {
        background: var(--_bga, transparent);
        content: '';
        inset: 0;
        position: absolute;
        mask: var(--_mask) no-repeat center / contain;
        -webkit-mask: var(--_mask) no-repeat center / contain;
      }

      &:checked {
        --_bdc: var(--_bdc--checked, transparent);
        --_bg: var(--_bg--checked, var(--_accent));
        --_bga: var(--_bga--checked, Field);
      }
    }
  `;

  public render(): TemplateResult {
    return html`
      <label class="filler-checkbox">
        <input type="checkbox" ?checked=${this.checked} @change=${this.handleChange} />
        ${this.text}
      </label>
    `;
  }

  private handleChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.dispatchEvent(new CustomEvent('checkbox-changed', { detail: { checked: this.checked } }));
  }
}
