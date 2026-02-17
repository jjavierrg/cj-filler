import { ICJ } from '../core/ICJ';
import { recordService } from '../services/record';

export class RecordButton extends HTMLElement {
  private shadow: ShadowRoot;
  private isOpen: boolean = false;
  private boundOutsideClick: (e: MouseEvent) => void;

  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.boundOutsideClick = this.handleOutsideClick.bind(this);
  }

  public connectedCallback(): void {
    this.render();
    document.addEventListener('click', this.boundOutsideClick);
  }

  public disconnectedCallback(): void {
    document.removeEventListener('click', this.boundOutsideClick);
  }

  // ============================
  // Render
  // ============================s
  private render(): void {
    this.shadow.innerHTML = '';

    const style: HTMLStyleElement = document.createElement('style');
    style.textContent = this.getStyles();
    this.shadow.appendChild(style);

    const wrapper: HTMLDivElement = document.createElement('div');
    wrapper.classList.add('wrapper');

    const recordButton: HTMLButtonElement = this.createRecordButton();
    wrapper.appendChild(recordButton);

    if (recordService.RecordedPlans.length > 0 && !recordService.IsRecordingActive) {
      const dropdownButton: HTMLButtonElement = this.createMenuDropdownButton();
      wrapper.appendChild(dropdownButton);
    }

    this.shadow.appendChild(wrapper);

    if (recordService.RecordedPlans.length > 0 && !recordService.IsRecordingActive) {
      const menu: HTMLElement = this.createMenu();
      this.shadow.appendChild(menu);
    }
  }

  // ============================
  // Buttons
  // ============================

  private createRecordButton(): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.classList.add('btn', 'main-button');

    button.classList.add(recordService.IsRecordingActive ? 'record-active' : 'record-inactive');

    button.textContent = recordService.IsRecordingActive ? '⏹ Stop Recording' : '⏺ Record CJ';

    if (recordService.RecordedPlans.length > 0 && !recordService.IsRecordingActive) {
      button.classList.add('has-recorded-plans');
    }

    button.addEventListener('click', (): void => {
      if (!recordService.IsRecordingActive) {
        recordService.startRecording();
        this.isOpen = false;
        this.render();
        return;
      }

      const recordedCJ: ICJ | null = recordService.stopRecording();

      if (recordedCJ) {
        this.dispatchEvent(new CustomEvent<ICJ>('plan-selected', { detail: recordedCJ, bubbles: true }));
      }

      this.isOpen = false;
      this.render();
    });

    return button;
  }

  private createMenuDropdownButton(): HTMLButtonElement {
    const button: HTMLButtonElement = document.createElement('button');
    button.textContent = '▼';
    button.classList.add('btn', 'split-button', 'toggle');

    button.setAttribute('aria-haspopup', 'true');
    button.setAttribute('aria-expanded', 'false');

    button.addEventListener('click', (e: MouseEvent): void => {
      e.stopPropagation();
      this.toggleMenu();
    });

    return button;
  }

  // ============================
  // Menu
  // ============================

  private createMenu(): HTMLElement {
    const menu: HTMLDivElement = document.createElement('div');
    menu.classList.add('menu');
    menu.setAttribute('role', 'menu');

    recordService.RecordedPlans.forEach((plan: ICJ): void => {
      const item: HTMLDivElement = document.createElement('div');
      item.classList.add('menu-item');
      item.setAttribute('role', 'menuitem');
      item.tabIndex = 0;
      item.textContent = plan.name;

      item.addEventListener('click', (): void => {
        this.dispatchEvent(new CustomEvent<ICJ>('plan-selected', { detail: plan, bubbles: true }));
        this.closeMenu();
      });

      item.addEventListener('keydown', (e: KeyboardEvent): void => {
        if (e.key === 'Enter') {
          item.click();
        }
        if (e.key === 'Escape') {
          this.closeMenu();
        }
      });

      menu.appendChild(item);
    });

    return menu;
  }

  // ============================
  // Behavior
  // ============================

  private toggleMenu(): void {
    this.isOpen ? this.closeMenu() : this.openMenu();
  }

  private openMenu(): void {
    const menu: HTMLElement | null = this.shadow.querySelector('.menu');

    const toggle: HTMLElement | null = this.shadow.querySelector('.toggle');

    if (!menu || !toggle) return;

    menu.classList.add('open');
    toggle.setAttribute('aria-expanded', 'true');
    this.isOpen = true;
  }

  private closeMenu(): void {
    const menu: HTMLElement | null = this.shadow.querySelector('.menu');

    const toggle: HTMLElement | null = this.shadow.querySelector('.toggle');

    if (!menu || !toggle) return;

    menu.classList.remove('open');
    toggle.setAttribute('aria-expanded', 'false');
    this.isOpen = false;
  }

  private handleOutsideClick(event: MouseEvent): void {
    if (!this.contains(event.target as Node)) {
      this.closeMenu();
    }
  }

  // ============================
  // Styles (encapsulated)
  // ============================

  private getStyles(): string {
    return `
      :host {
        width: 100%;
        position: relative;
      }

      .wrapper {
        display: flex;
        width: 100%;
        height: 100%;
      }

      .btn {
        cursor: pointer;
        border: 0;
        padding: 8px 12px;
        font-size: 14px;
      }

      .main-button {
        flex-grow: 1;
        border-radius: 6px;
      }

      .main-button.has-recorded-plans {
        border-top-right-radius: 0;
        border-bottom-right-radius: 0;
      }

      .split-button {
        border-top-right-radius: 6px;
        border-bottom-right-radius: 6px;
        width: 40px;
      }

      .record-inactive,
      .split-button {
        background-color: #dc3545;
        color: white;
      }

      .record-inactive:hover,
      .split-button:hover {
        background-color: #c82333;
      }

      .record-active {
        background-color: #015368;
        color: white;
      }

      .record-active:hover {
        background-color: #013f4d;
      }

      .menu {
        position: absolute;
        top: 100%;
        left: 0;
        right: 0;
        margin-top: 4px;
        background: white;
        border: 1px solid #ccc;
        border-radius: 6px;
        box-shadow: 0 4px 8px rgba(0,0,0,0.1);
        display: none;
        z-index: 1000;
      }

      .menu.open {
        display: block;
      }

      .menu-item {
        padding: 8px 12px;
        cursor: pointer;
      }

      .menu-item:hover,
      .menu-item:focus {
        background-color: #f5f5f5;
        outline: none;
      }
    `;
  }
}

if (!customElements.get('record-button')) {
  customElements.define('record-button', RecordButton);
}
