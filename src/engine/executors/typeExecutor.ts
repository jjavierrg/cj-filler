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
      this.fireEvent('input', inputElement, action);
      this.fireEvent('keyup', inputElement, action);
    }
  }

  private async getValue(action: ICJAction, element?: HTMLElement): Promise<string> {
    if (action.stringValue) {
      return action.stringValue;
    }

    if (action.executeFunc !== undefined && action.executeFunc !== null) {
      return (await action.executeFunc(element))?.toString() ?? '';
    }

    return '';
  }
}
