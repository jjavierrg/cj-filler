import { ExecuteOptions } from './core/Engine';
import { ICJ } from './core/ICJ';
import { FillerEngine } from './engine/fillerEngine';
import plans from './plans';
import { createUI } from './ui-builder';

const engine = new FillerEngine();

function waitForElement(selector: string): Promise<void> {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      const container = document.querySelector(selector);
      if (container) {
        clearInterval(interval);
        resolve();
      }
    }, 100);
  });
}
async function BuildUI(parentSelector: string): Promise<void> {
  await waitForElement(parentSelector);
  const parent = document.querySelector(parentSelector) as HTMLElement;
  createUI(parent, plans, RunCJ);
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

BuildUI('header > .container');
