import { ExecutorBase } from '../../core/ExecutorBase';
import { ICJAction } from '../../core/ICJAction';
import { ActionType } from '../../enums/actions';

export class SelectExecutor extends ExecutorBase {
  constructor() {
    super(ActionType.SELECT);
  }

  protected async executeAction(action: ICJAction, element?: HTMLElement): Promise<void> {
    element?.focus();
    element?.click();

    const selectElement = element as HTMLSelectElement;
    if (!selectElement) {
      return Promise.reject('Element is not a select');
    }

    const option = this.getOption(selectElement, action);
    if (!option) {
      return Promise.reject('Option not found');
    }

    option.selected = true;
    selectElement.selectedIndex = option.index;
    selectElement.value = option.value;

    this.fireEvent('change', selectElement);
    Promise.resolve();
  }

  private getOption(selectElement: HTMLSelectElement, action: ICJAction): HTMLOptionElement {
    const options = Array.from(selectElement.options);

    if (action.numericValue) {
      return options[action.numericValue - 1];
    }

    if (action.stringValue) {
      return options.find((option) => option.text === action.stringValue);
    }

    return null;
  }
}
