import { ActionType } from '../enums/actions';
import { ICJ } from './ICJ';
import { ICJAction } from './ICJAction';

export class InteractionRecorder {
  private isRecording: boolean = false;
  private recordedActions: ICJAction[] = [];
  private excludedElements: Set<HTMLElement> = new Set();
  private lastInputElement: HTMLInputElement | HTMLTextAreaElement | null = null;

  // Event handler references for proper cleanup
  private boundClickHandler: (e: MouseEvent) => void;
  private boundInputHandler: (e: Event) => void;
  private boundChangeHandler: (e: Event) => void;
  private boundFocusHandler: (e: FocusEvent) => void;

  constructor() {
    // Bind handlers once for consistent reference management
    this.boundClickHandler = this.handleClick.bind(this);
    this.boundInputHandler = this.handleInput.bind(this);
    this.boundChangeHandler = this.handleInputChange.bind(this);
    this.boundFocusHandler = this.handleFocusChange.bind(this);
  }

  public get isRecordingActive(): boolean {
    return this.isRecording;
  }

  /**
   * Excludes specific elements from being recorded (e.g., Record/Stop buttons)
   */
  public excludeElements(elements: HTMLElement[]): void {
    this.excludedElements = new Set([...this.excludedElements, ...elements]);
  }

  public startRecording(): void {
    if (this.isRecording) {
      console.warn('InteractionRecorder: Already recording');
      return;
    }

    this.isRecording = true;
    this.recordedActions = [];
    this.lastInputElement = null;

    document.addEventListener('click', this.boundClickHandler, true);
    document.addEventListener('input', this.boundInputHandler, true);
    document.addEventListener('change', this.boundChangeHandler, true);
    document.addEventListener('focusin', this.boundFocusHandler, true);
    document.addEventListener('focusout', this.boundFocusHandler, true);
  }

  public stopRecording(): ICJ | null {
    if (!this.isRecording) {
      console.warn('InteractionRecorder: Not currently recording');
      return null;
    }

    this.flushTypeBuffer();

    document.removeEventListener('click', this.boundClickHandler, true);
    document.removeEventListener('input', this.boundInputHandler, true);
    document.removeEventListener('change', this.boundChangeHandler, true);
    document.removeEventListener('focusin', this.boundFocusHandler, true);
    document.removeEventListener('focusout', this.boundFocusHandler, true);

    this.isRecording = false;

    return {
      name: `Recorded Plan [${new Date().toLocaleString()}]`,
      actions: this.recordedActions,
      isEnabledForLocation: () => true,
      submitAction: { type: ActionType.CLICK },
    };
  }

  private handleClick(event: MouseEvent): void {
    if (!this.isRecording) return;

    const target = event.target as HTMLElement;

    if (this.isExcludedElement(target)) return;
    if (this.isTypableElement(target)) return;
    if (target.tagName === 'SELECT') return;

    const pointerEvent = event as PointerEvent;
    if (pointerEvent && !pointerEvent.pointerType) {
      return;
    }

    const action: ICJAction = {
      selector: this.generateElementIdentifier(target),
      type: ActionType.CLICK,
    };

    this.recordedActions.push(action);
  }

  private handleInput(event: Event): void {
    if (!this.isRecording) return;

    const target = event.target as HTMLElement;
    if (!this.isTypableElement(target)) return;

    const element = target as HTMLInputElement | HTMLTextAreaElement;

    // Initialize buffer if this is a new element
    if (!this.lastInputElement || this.lastInputElement !== element) {
      this.flushTypeBuffer();
      this.lastInputElement = element;
    }
  }

  private handleInputChange(event: Event): void {
    if (!this.isRecording) return;

    const target = event.target as HTMLElement;

    // Handle SELECT elements
    if (target.tagName === 'SELECT') {
      this.handleSelectChange(event);
      return;
    }

    // Handle input/textarea elements
    if (this.isTypableElement(target)) {
      const element = target as HTMLInputElement | HTMLTextAreaElement;

      // Only flush if this is the buffered element
      if (this.lastInputElement && this.lastInputElement === element) {
        this.flushTypeBuffer();
      }
    }
  }

  private handleFocusChange(event: FocusEvent): void {
    if (!this.isRecording) return;

    if (event.type === 'focusout') {
      const target = event.target as HTMLElement;

      if (this.isTypableElement(target) && this.lastInputElement === target) {
        this.flushTypeBuffer();
      }
    }
  }

  private handleSelectChange(event: Event): void {
    if (!this.isRecording) return;

    const target = event.target as HTMLSelectElement;

    if (target.tagName !== 'SELECT') return;

    const action: ICJAction = {
      selector: this.generateElementIdentifier(target),
      type: ActionType.SELECT,
      numericValue: target.selectedIndex,
    };

    this.recordedActions.push(action);
  }

  private flushTypeBuffer(): void {
    if (!this.lastInputElement) return;

    const currentValue = this.lastInputElement.value;

    if (currentValue.trim() === '') {
      this.lastInputElement = null;
      return;
    }

    // Only log if value actually changed
    const action: ICJAction = {
      selector: this.generateElementIdentifier(this.lastInputElement),
      type: ActionType.TYPE,
      stringValue: currentValue,
    };

    this.recordedActions.push(action);
    this.lastInputElement = null;
  }

  /**
   * Generates a deterministic, unique identifier for a DOM element
   *
   * Strategy:
   * 1. Prefer element.id if available
   * 2. Build CSS-like selector using tag, name, classes, attributes
   * 3. Include parent hierarchy for uniqueness
   * 4. Avoid random UUIDs - must be deterministic
   *
   * Examples:
   * - input#email
   * - input[name="firstName"]
   * - button.submit-btn
   * - div.form-group > input.form-control[type="text"]
   */
  private generateElementIdentifier(element: HTMLElement): string {
    // Priority 1: Use ID if available (most stable)
    if (element.id) {
      // escape special characters in ID for CSS selector
      const escapedId = CSS.escape(element.id);
      return `#${escapedId}`;
    }

    const parts: string[] = [];
    let current: HTMLElement | null = element;

    while (current) {
      const part = this.getElementSignature(current);
      parts.unshift(part);

      // Stop if we found a stable anchor (id or unique landmark)
      if (current.id || this.isLandmarkElement(current)) {
        break;
      }

      current = current.parentElement;
    }

    return parts.join(' > ');
  }

  /**
   * Generates a CSS-like signature for a single element
   */
  private getElementSignature(element: HTMLElement): string {
    const tag = element.tagName.toLowerCase();
    let signature = tag;

    // Add ID if present
    if (element.id) {
      const escapedId = CSS.escape(element.id);
      signature += `#${escapedId}`;
      return signature; // ID is sufficient
    }

    // Add name attribute (common in forms)
    const name = element.getAttribute('name');
    if (name) {
      signature += `[name="${name}"]`;
    }

    // Add type attribute (for inputs)
    const type = element.getAttribute('type');
    if (type && tag === 'input') {
      signature += `[type="${type}"]`;
    }

    // Add first meaningful class (avoid utility classes like 'active', 'hidden')
    const classes = Array.from(element.classList).filter((cls) => cls.length > 2 && !['active', 'hidden', 'show', 'hide'].includes(cls));
    if (classes.length > 0) {
      signature += `.${classes[0]}`;
    }

    // Add data attributes that look like identifiers
    const dataId = element.getAttribute('data-id') || element.getAttribute('data-test-id') || element.getAttribute('data-testid');
    if (dataId) {
      const attrName = element.getAttribute('data-id') ? 'data-id' : element.getAttribute('data-test-id') ? 'data-test-id' : 'data-testid';
      signature += `[${attrName}="${dataId}"]`;
    }

    // Add position indicator if element has siblings of same type
    const parent = element.parentElement;
    if (parent) {
      const siblings = Array.from(parent.children).filter((el) => el.tagName === element.tagName);
      if (siblings.length > 1) {
        const index = siblings.indexOf(element);
        if (index > 0) {
          signature += `:nth-of-type(${index + 1})`;
        }
      }
    }

    return signature;
  }

  /**
   * Checks if element is a structural landmark (nav, main, form, etc.)
   */
  private isLandmarkElement(element: HTMLElement): boolean {
    const landmarks = ['nav', 'main', 'header', 'footer', 'aside', 'form', 'section'];
    if (landmarks.includes(element.tagName.toLowerCase())) {
      return true;
    }

    // check for angular app prefixes or other common patterns
    if (element.tagName.toLowerCase().startsWith('app-')) {
      return true;
    }

    return false;
  }

  /**
   * Checks if element is a text input or textarea
   */
  private isTypableElement(element: HTMLElement): boolean {
    if (element.tagName === 'TEXTAREA') return true;

    if (element.tagName === 'INPUT') {
      const type = (element as HTMLInputElement).type;
      const typableTypes = ['text', 'email', 'password', 'tel', 'url', 'search', 'number'];
      return typableTypes.includes(type);
    }

    return false;
  }

  /**
   * Checks if element or its ancestors are excluded
   */
  private isExcludedElement(element: HTMLElement): boolean {
    let current: HTMLElement | null = element;

    while (current) {
      if (this.excludedElements.has(current)) {
        return true;
      }
      current = current.parentElement;
    }

    return false;
  }
}
