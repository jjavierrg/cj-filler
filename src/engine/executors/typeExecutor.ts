import { ExecutorBase } from '../../core/ExecutorBase';
import { ICJAction } from '../../core/ICJAction';
import { ActionType } from '../../enums/actions';

export class TypeExecutor extends ExecutorBase {
  constructor() {
    super(ActionType.TYPE);
  }

  protected async executeAction(action: ICJAction, element?: HTMLElement): Promise<void> {
    const inputElement = element as HTMLInputElement;
    if (!inputElement) {
      return Promise.reject('Element is not an input');
    }

    inputElement.focus();
    inputElement.click();

    const value = await this.getValue(action, element);
    if (value) {
      inputElement.value = value;
      this.fireEvent('input', inputElement);
    }
  }

  private async getValue(action: ICJAction, element?: HTMLElement): Promise<string> {
    if (action.stringValue) {
      return action.stringValue;
    }

    if (action.stringValueFunc !== undefined && action.stringValueFunc !== null) {
      return await action.stringValueFunc(element);
    }

    return '';
  }
}
