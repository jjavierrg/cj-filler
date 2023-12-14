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

    if (action.stringValue) {
      inputElement.value = action.stringValue;
    }

    if (action.numericValue) {
      inputElement.value = action.numericValue.toString();
    }

    this.fireEvent('input', inputElement);
  }
}
