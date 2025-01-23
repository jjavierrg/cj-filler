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

    const option = await this.getOption(selectElement, action);
    if (!option) {
      return Promise.reject('Option not found');
    }

    option.selected = true;
    selectElement.selectedIndex = option.index;
    selectElement.value = option.value;

    this.fireEvent('change', selectElement, action);
  }

  private async getOption(selectElement: HTMLSelectElement, action: ICJAction): Promise<HTMLOptionElement> {
    const options = Array.from(selectElement.options);
    const value: number | string | boolean = action.numericValue ?? action.stringValue ?? (await action.executeFunc?.()) ?? '';

    if (typeof value === 'number') {
      return options[value - 1];
    }

    return options.find((option) => option.text === value?.toString());
  }
}
