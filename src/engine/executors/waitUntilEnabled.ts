import { ExecutorBase } from '../../core/ExecutorBase';
import { ICJAction } from '../../core/ICJAction';
import { ActionType } from '../../enums/actions';
import { waitFor } from '../../helpers/helpers';

export class WaitUntilEnabledExecutor extends ExecutorBase {
  constructor() {
    super(ActionType.WAIT_UNTIL_ENABLED);
  }

  protected async executeAction(action: ICJAction, element?: HTMLElement): Promise<void> {
    const isElementEnabledCondition = (): boolean => !element.hasAttribute('disabled');
    waitFor(isElementEnabledCondition, action.timeout || 10000);
  }
}
