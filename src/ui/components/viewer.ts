import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property, query, state } from 'lit/decorators.js';
import { ICJ } from '../../core/ICJ';
import { convertPlanToTypescript } from '../../helpers/converter';
import { FillerButton } from './button';

import './button';

@customElement('filler-viewer')
export class FillerViewer extends LitElement {
  @property({ attribute: false })
  public plan: ICJ | null = null;

  @property({ type: Boolean })
  public isOpen: boolean = false;

  @state()
  private copyButtonText: string = 'Copy to Clipboard';

  @query('#copy-button')
  private copyButton!: FillerButton;

  static styles = css`
    .backdrop {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: #01536880;
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 1000;
    }

    .viewer {
      background: white;
      padding: 30px;
      border-radius: 8px;
      min-width: 65vw;
      min-height: 65vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      row-gap: 1rem;
    }

    .viewer-textarea {
      font-family: monospace;
      font-size: 12px;
      padding: 10px;
      border: 1px solid rgb(204, 204, 204);
      border-radius: 4px;
      resize: vertical;
      flex-grow: 1;
    }

    .button-container {
      display: flex;
      gap: 10px;
      justify-content: flex-end;
    }
  `;

  protected updated(changedProperties: Map<string, unknown>): void {
    if (!changedProperties.has('isOpen') || !this.isOpen) {
      return;
    }

    this.updateComplete.then(() => {
      const button = this.copyButton?.shadowRoot?.querySelector('button');
      if (button) {
        button.focus();
      }
    });
  }

  public render(): TemplateResult {
    if (!this.plan || !this.isOpen) {
      return html``;
    }

    const output = convertPlanToTypescript(this.plan);

    return html`
      <div class="backdrop" @click=${this.handleClose} @keydown=${this.onViewerKeyDown} tabindex="0">
        <div class="viewer" @click=${(e: Event) => e.stopPropagation()}>
          <span>${this.plan.name}</span>
          <textarea readonly class="viewer-textarea" .value=${output}></textarea>
          <div class="button-container">
            <filler-button id="copy-button" variant="primary" .text=${this.copyButtonText} @button-click=${() => this.copyToClipboard(output)}></filler-button>
            <filler-button variant="secondary" text="Close" @button-click=${this.handleClose}></filler-button>
          </div>
        </div>
      </div>
    `;
  }

  private onViewerKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      this.handleClose();
    }
  }

  private handleClose(): void {
    this.dispatchEvent(new CustomEvent('close'));
  }

  private async copyToClipboard(text: string): Promise<void> {
    try {
      await navigator.clipboard.writeText(text);
      this.copyButtonText = 'Copied!';
    } catch (err) {
      console.error('Failed to copy text: ', err);
      this.copyButtonText = 'Failed to copy';
    }

    await new Promise((resolve) => setTimeout(resolve, 2000));
    this.copyButtonText = 'Copy to Clipboard';
  }
}
