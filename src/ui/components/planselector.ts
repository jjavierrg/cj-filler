import { LitElement, TemplateResult, css, html } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { ICJ } from '../../core/ICJ';

@customElement('filler-plan-selector')
export class PlanSelector extends LitElement {
  @property({ type: Array })
  public plans: ICJ[] = [];

  static styles = css`
    select {
      background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24'%3E%3Cdefs%3E%3Cpath id='a' d='M8.707 11.707l2.586 2.586a1 1 0 0 0 1.414 0l2.586-2.586A1 1 0 0 0 14.586 10H9.414a1 1 0 0 0-.707 1.707z'/%3E%3C/defs%3E%3Cuse fill='%23C2D1D9' fill-rule='evenodd' xlink:href='%23a'/%3E%3C/svg%3E");
      background-repeat: no-repeat;
      background-position: 99%;
      background-size: 25px;
      color: #859ca8;
      border: 0;
      flex-grow: 1;
      appearance: none;
      font-size: 15px;
      padding: 19px 35px 19px 24px;
      z-index: 10;
      outline: none;
    }
  `;

  public render(): TemplateResult {
    if (this.plans?.length) {
      this.handlePlanChange(0);
    }
    return html`
      <select @change=${(e: { target: HTMLSelectElement }) => this.handlePlanChange(e.target.selectedIndex)}>
        ${this.plans.map((plan) => html`<option value="${plan.name}">${plan.name}</option>`)}
      </select>
    `;
  }

  private handlePlanChange(index: number): void {
    const selectedPlan = this.plans[index];
    if (selectedPlan) {
      this.dispatchEvent(new CustomEvent('plan-selected', { detail: selectedPlan }));
    }
  }
}
