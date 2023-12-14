import { FillerEngine } from './engine/fillerEngine';
import plans from './plans';

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

async function LoadPlans(parentSelector: string): Promise<void> {
  await waitForElement(parentSelector);

  const parent = document.querySelector(parentSelector);
  const container = document.createElement('div');
  const button = document.createElement('button');
  const select = document.createElement('select');

  plans.sort().forEach((plan, index) => {
    const option = document.createElement('option');
    option.value = index.toString();
    option.innerText = plan.name;
    select.appendChild(option);
  });

  select.style.backgroundImage = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink' width='24' height='24'%3E%3Cdefs%3E%3Cpath id='a' d='M8.707 11.707l2.586 2.586a1 1 0 0 0 1.414 0l2.586-2.586A1 1 0 0 0 14.586 10H9.414a1 1 0 0 0-.707 1.707z'/%3E%3C/defs%3E%3Cuse fill='%23C2D1D9' fill-rule='evenodd' xlink:href='%23a'/%3E%3C/svg%3E")`;
  select.style.backgroundRepeat = 'no-repeat';
  select.style.backgroundPosition = '99%';
  select.style.backgroundSize = '25px';
  select.style.color = '#859ca8';
  select.style.margin = '0 1em 0 0';
  select.style.border = '0';
  select.style.width = '100%';
  select.style.appearance = 'none';
  select.style.fontSize = '15px';
  select.style.padding = '19px 35px 19px 24px';

  button.innerText = 'Fill CJ';
  button.addEventListener('click', () => RunCJ(select.selectedIndex));
  button.classList.add('btn', 'solid-main', 'text-08-d-regular');

  container.style.display = 'flex';
  container.appendChild(select);
  container.appendChild(button);

  parent.appendChild(container);
}

async function RunCJ(planIndex: number): Promise<void> {
  if (planIndex === null || planIndex === undefined || planIndex < 0 || planIndex >= plans.length) {
    return;
  }

  try {
    const plan = plans[planIndex];
    await engine.executePlan(plan);
  } catch (error) {
    console.error(error);
  }
}

LoadPlans('header > .container');
