import { LitElement, TemplateResult, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';
import { ICJ } from '../core/ICJ';
import { ExecuteOptions } from '../core/Engine';
import { recordService } from '../services/record';

import './components/planselector';
import './components/checkbox';
import './components/button';
import './components/viewer';

@customElement('filler-app')
export class FillerApp extends LitElement {
  @property({ type: Array })
  public plans: ICJ[] = [];

  @property()
  public onPlanSelected: (plan: ICJ, options: ExecuteOptions) => void = () => {};

  private autoSubmit: boolean = false;

  @state()
  private selectedPlan: ICJ | null = null;

  @state()
  private isRecording: boolean = recordService.IsRecordingActive;

  @state()
  private isViewerOpen: boolean = false;

  constructor() {
    super();
    recordService.excludedFromRecording([this]);
  }

  static styles = css`
    .filler-app-container {
      display: flex;
      align-items: center;
      z-index: 10;
      flex-wrap: wrap;
    }

    .plan-selector {
      flex-grow: 1;
      display: flex;
      margin-right: 16px;
    }

    .button-container {
      padding-top: 10px;
      display: flex;
      flex-grow: 1;
      column-gap: 10px;
      flex-basis: 100%;
      & > * {
        flex-grow: 1;
      }
    }

    .break {
      flex-basis: 100%;
      height: 0;
    }
  `;

  public render(): TemplateResult {
    const availablePlans = this.plans.filter((plan) => plan.isEnabledForLocation(window.location.href));
    const recordButtonText = this.isRecording ? '⏹ Stop Recording' : '⏺ Record CJ';
    const recordButtonVariant = this.isRecording ? 'secondary' : 'record';
    const recordedPlans = this.isRecording ? [] : recordService.RecordedPlans;

    return html`
      <filler-viewer .plan=${this.selectedPlan} .isOpen=${this.isViewerOpen} @close=${this.handleViewerClose}></filler-viewer>
      <div class="filler-app-container">
        <filler-plan-selector class="plan-selector" .plans=${availablePlans} @plan-selected=${(e: CustomEvent) => (this.selectedPlan = e.detail)}></filler-plan-selector>
        <filler-checkbox text="Auto submit CJ" .checked=${this.autoSubmit} @checkbox-changed=${(e: CustomEvent) => (this.autoSubmit = e.detail.checked)}></filler-checkbox>
        <div class="break"></div>
        <div class="button-container">
          <filler-button text="Fill CJ" variant="primary" @button-click=${() => this.runPlan(this.selectedPlan, this.autoSubmit)}></filler-button>
          <filler-button text=${recordButtonText} variant=${recordButtonVariant} @button-click=${this.handleRecordButtonClick} .plans=${recordedPlans ?? []} @plan-selected=${(e: CustomEvent) => this.showPlan(e.detail)}></filler-button>
        </div>
      </div>
    `;
  }

  private runPlan(plan: ICJ | null, autoSubmit: boolean = false): void {
    if (plan) {
      this.onPlanSelected(plan, { executeSubmitAction: autoSubmit });
    }
  }

  private handleRecordButtonClick(): void {
    if (recordService.IsRecordingActive) {
      const plan = recordService.stopRecording();
      this.showPlan(plan);
    } else {
      recordService.startRecording();
    }

    this.isRecording = recordService.IsRecordingActive;
  }

  private showPlan(plan: ICJ): void {
    this.selectedPlan = plan;
    this.isViewerOpen = true;
  }

  private handleViewerClose(): void {
    this.isViewerOpen = false;
    this.selectedPlan = null;
  }
}
