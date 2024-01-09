import { sleep, waitForElement } from '../helpers/helpers';
import { ICJAction } from './ICJAction';
import { IExecutor } from './IExecutor';

export abstract class ExecutorBase implements IExecutor {
  constructor(public type: string) {}

  public async invoke(action: ICJAction): Promise<void> {
    if (this.type !== action.type) {
      throw new Error(`Invalid action type: ${action.type}`);
    }

    if (action.executeIf !== undefined) {
      const executeIf = await action.executeIf();
      if (!executeIf) {
        return;
      }
    }

    let element: HTMLElement = null;
    if (action.selector) {
      element = await waitForElement(action.selector, action.optional, action.timeout);
    }

    if (!element && action.selector) {
      return;
    }

    await this.executeAction(action, element);
    await sleep(100);
  }

  protected abstract executeAction(action: ICJAction, element?: HTMLElement): Promise<void>;

  protected fireEvent(eventName: string, element: HTMLElement, action: ICJAction): void {
    if (action.omitFireEvents) return;
    const event = new Event(eventName, { bubbles: true });
    element.dispatchEvent(event);
  }
}
