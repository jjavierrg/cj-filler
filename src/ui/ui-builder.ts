import { ExecuteOptions } from '../core/Engine';
import { ICJ } from '../core/ICJ';
import { recordService } from '../services/record';
import { displayCJ } from './cj-viewer';

import './record-button';
import { RecordButton } from './record-button';

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
    }
     
    .button-container {
      padding-top: 10px;
      display: flex;
      flex-grow: 1;
      column-gap: 10px;
    }
      
    .cj-viewer-backdrop {
      display: flex !important;
      justify-content: center;
      align-items: center;
    }
      
    .cj-viewer-modal {
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
      
    .cj-viewer-textarea {
      font-family: monospace;
      font-size: 12px;
      padding: 10px;
      border: 1px solid rgb(204, 204, 204);
      border-radius: 4px;
      resize: vertical;
      flex-grow: 1;
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

function createButton(parent: HTMLElement, text: string, className: string = 'solid-main', onClick: () => void): HTMLButtonElement {
  const button = document.createElement('button');
  button.innerText = text;
  button.addEventListener('click', onClick);
  button.classList.add('btn', 'text-08-d-regular');
  button.classList.add(...className.split(' '));

  parent.appendChild(button);

  return button;
}

function createRecordButton(parent: HTMLElement): RecordButton {
  const button = new RecordButton();
  button.addEventListener('plan-selected', (e: CustomEvent<ICJ>): void => displayCJ(e.detail));
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
  const location = window.location.href;

  const availiablePlans = plans.filter((plan) => plan.isEnabledForLocation(location));

  const select = createSelect(container, availiablePlans);
  const checkbox = createCheckbox(container, 'Auto submit CJ', true);
  createBreak(container);

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');

  const fillButton = createButton(buttonContainer, 'Fill CJ', 'solid-main', () =>
    onRunCJ(availiablePlans[select.selectedIndex], { executeSubmitAction: checkbox.checked }),
  );

  const recordButton = createRecordButton(buttonContainer);
  recordService.excludedFromRecording([recordButton, select, checkbox, fillButton, buttonContainer, container]);

  container.appendChild(buttonContainer);

  container.classList.add('filler');
  return container;
}
