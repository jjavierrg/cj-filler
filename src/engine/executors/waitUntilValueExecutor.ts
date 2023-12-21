import { ExecutorBase } from '../../core/ExecutorBase';
import { ICJAction } from '../../core/ICJAction';
import { ActionType } from '../../enums/actions';

export class WaitUntilValueExecutor extends ExecutorBase {
  constructor() {
    super(ActionType.WAIT_UNTIL_VALUE);
  }

  protected async executeAction(action: ICJAction, element?: HTMLElement): Promise<void> {
    const elementHasValueCondition = (): boolean => {
      const value = element.innerText ?? element.getAttribute('value') ?? '';
      return value.toUpperCase() === action.stringValue.toUpperCase();
    };

    this.waitFor(elementHasValueCondition, action.timeout || 10000);
  }
}
