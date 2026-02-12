import { ICJ } from '../core/ICJ';
import { ActionType } from '../enums/actions';

const typeReplacer = (key: string, val: string): string => {
  if (key !== 'type') {
    return val;
  }

  const enumKey = Object.keys(ActionType).find((k) => ActionType[k as keyof typeof ActionType] === val);
  return enumKey ? `ActionType.${enumKey}` : val;
};

async function copyToClipboard(text: string, copyButton: HTMLButtonElement): Promise<void> {
  try {
    await navigator.clipboard.writeText(text);
    copyButton.textContent = 'Copied!';
  } catch (err) {
    console.error('Failed to copy text: ', err);
    copyButton.textContent = 'Failed to copy';
  }

  await new Promise((resolve) => setTimeout(resolve, 2000));
  copyButton.textContent = 'Copy to Clipboard';
}

function closeModal(modal: HTMLElement, e: Event | null = null): void {
  if (e === null || e.target === modal) {
    document.body.removeChild(modal);
  }
}

export function displayCJ(plan: ICJ): void {
  if (!plan) {
    return;
  }

  const output = JSON.stringify(plan, typeReplacer, 2).replace(/"ActionType\.(\w+)"/g, 'ActionType.$1');

  // Create a modal overlay
  const modal = document.createElement('div');
  modal.classList.add('overlay', 'active', 'cj-viewer-backdrop');

  const modalContent = document.createElement('div');
  modalContent.classList.add('cj-viewer-modal');

  const title = document.createElement('span');
  title.textContent = `Plan: ${plan.name}`;

  const textArea = document.createElement('textarea');
  textArea.value = output;
  textArea.readOnly = true;
  textArea.classList.add('cj-viewer-textarea');

  const buttonRow = document.createElement('div');
  buttonRow.style.cssText = 'display: flex; gap: 10px; justify-content: flex-end;';

  const copyButton = document.createElement('button');
  copyButton.textContent = 'Copy to Clipboard';
  copyButton.classList.add('btn', 'solid-main');
  copyButton.onclick = (): Promise<void> => copyToClipboard(output, copyButton);

  const closeButton = document.createElement('button');
  closeButton.textContent = 'Close';
  closeButton.classList.add('btn', 'solid-secondary');
  closeButton.onclick = (): void => closeModal(modal);

  buttonRow.appendChild(copyButton);
  buttonRow.appendChild(closeButton);

  modalContent.appendChild(title);
  modalContent.appendChild(textArea);
  modalContent.appendChild(buttonRow);
  modal.appendChild(modalContent);

  // Close modal when clicking outside or pressing Escape
  modal.onclick = (e): void => closeModal(modal, e);
  modal.onkeydown = (e): void => {
    if (e.key === 'Escape') {
      closeModal(modal);
    }
  };
  document.body.appendChild(modal);
  copyButton.focus();
}
