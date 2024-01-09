import { ExecuteOptions } from './core/Engine';
import { ICJ } from './core/ICJ';

function addStyle(): void {
  const style = document.createElement('style');
  style.innerHTML = `
    .filler {
      display: flex;
      align-items: center;
      z-index: 10;
      flex-wrap: wrap;
    }

    .filler .break {
      flex-basis: 100%;
      height: 0;
    }

    .filler .normal-checkbox {
      margin-bottom: 0 !important;
    }

    .filler .checkmark-container {
      margin: 0 0 0 1em;
      color: #fff !important;
    }

    .filler select {
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
    }`;
  document.head.appendChild(style);
}

function createCheckbox(parent: HTMLElement, text: string, checked: boolean): HTMLInputElement {
  const container = document.createElement('div');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const checkmarkContainer = document.createElement('div');
  const checkmark = document.createElement('span');
  const textElement = document.createElement('span');

  container.classList.add('form-control', 'normal-checkbox');
  label.classList.add('normal-checkbox-container');
  checkmarkContainer.classList.add('checkmark-container');
  checkmark.classList.add('checkmark');

  input.type = 'checkbox';
  input.checked = checked;
  textElement.innerText = text;

  checkmarkContainer.appendChild(checkmark);
  checkmarkContainer.appendChild(textElement);
  label.appendChild(input);
  label.appendChild(checkmarkContainer);
  container.appendChild(label);
  parent.appendChild(container);

  return input;
}

function createSelect(parent: HTMLElement, plans: ICJ[]): HTMLSelectElement {
  const select = document.createElement('select');

  plans
    .sort((a, b) => a.name.localeCompare(b.name))
    .forEach((plan, index) => {
      const option = document.createElement('option');
      option.value = index.toString();
      option.innerText = plan.name;
      select.appendChild(option);
    });

  parent.appendChild(select);
  return select;
}

function createButton(parent: HTMLElement, text: string, onClick: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.innerText = text;
  button.addEventListener('click', onClick);
  button.classList.add('btn', 'solid-main', 'text-08-d-regular');
  parent.appendChild(button);

  return button;
}

function createBreak(parent: HTMLElement): void {
  const breakElement = document.createElement('div');
  breakElement.classList.add('break');
  parent.appendChild(breakElement);
}

export function createUI(plans: ICJ[], onRunCJ: (plan: ICJ, options: ExecuteOptions) => void): HTMLElement {
  addStyle();

  const container = document.createElement('div');

  const select = createSelect(container, plans);
  const checkbox = createCheckbox(container, 'Auto submit CJ', true);
  createBreak(container);
  createButton(container, 'Fill CJ', () => onRunCJ(plans[select.selectedIndex], { executeSubmitAction: checkbox.checked }));

  container.classList.add('filler');
  return container;
}
