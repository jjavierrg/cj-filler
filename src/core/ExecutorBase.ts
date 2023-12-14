import { ICJAction } from './ICJAction';
import { IExecutor } from './IExecutor';

export abstract class ExecutorBase implements IExecutor {
  constructor(public type: string) {}

  public async invoke(action: ICJAction): Promise<void> {
    if (this.type !== action.type) {
      throw new Error(`Invalid action type: ${action.type}`);
    }

    let element: HTMLElement = null;
    if (action.selector) {
      element = await this.waitForElement(action.selector, action.optional);
    }

    if (!element && action.selector) {
      return;
    }

    await this.executeAction(action, element);
    await this.sleep(100);
  }

  protected abstract executeAction(action: ICJAction, element?: HTMLElement): Promise<void>;

  protected fireEvent(eventName: string, element: HTMLElement): void {
    const event = new Event(eventName, { bubbles: true });
    element.dispatchEvent(event);
  }

  protected async sleep(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }

  protected async waitFor(condition: () => boolean, timeout: number = 3000): Promise<void> {
    const start = Date.now();
    while (Date.now() - start < timeout) {
      if (condition()) {
        return;
      }

      await this.sleep(100);
    }

    throw new Error('Timeout exceeded while waiting for condition');
  }

  protected async waitForElement(selector: string, optional: boolean = false, timeout: number = 3000): Promise<HTMLElement> {
    const isElementPresent = (): boolean => document.querySelector<HTMLElement>(selector) !== null;

    try {
      await this.waitFor(isElementPresent, timeout);
      return document.querySelector<HTMLElement>(selector);
    } catch (error) {
      if (!optional) {
        throw new Error(`Element not found: ${selector}`);
      }

      return null;
    }
  }
}
