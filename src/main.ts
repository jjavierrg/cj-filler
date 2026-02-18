import { ExecuteOptions } from './core/Engine';
import { ICJ } from './core/ICJ';
import { FillerEngine } from './engine/fillerEngine';
import { waitForElement } from './helpers/helpers';
import { onElementRemoved } from './helpers/observer';
import plans from './plans';
import { FillerApp } from './ui/app';

const engine = new FillerEngine();

async function InsertFillerComponentIntoParent(parentSelector: string, fillerComponent: HTMLElement): Promise<void> {
  await waitForElement(parentSelector, false, 10000);
  const parent = document.querySelector(parentSelector) as HTMLElement;
  parent.appendChild(fillerComponent);
}

async function BuildUI(parentSelector: string): Promise<void> {
  const filler = new FillerApp();
  filler.plans = plans;
  filler.onPlanSelected = RunCJ;
  await InsertFillerComponentIntoParent(parentSelector, filler);

  onElementRemoved(filler, async () => {
    await InsertFillerComponentIntoParent(parentSelector, filler);
  });
}

async function RunCJ(plan: ICJ, options: ExecuteOptions): Promise<void> {
  if (plan === null) {
    return;
  }

  try {
    await engine.executePlan(plan, options);
  } catch (error) {
    console.error(error);
  }
}

BuildUI('header > .container, #cj-header > .container');
