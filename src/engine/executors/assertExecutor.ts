import { ExecutorBase } from '../../core/ExecutorBase';
import { ICJAction } from '../../core/ICJAction';
import { ActionType } from '../../enums/actions';

export enum AssertResult {
  FAIL = 0,
  PASS = 1,
}

export class AssertExecutor extends ExecutorBase {
  constructor() {
    super(ActionType.ASSERT);
  }

  protected async executeAction(action: ICJAction, element?: HTMLElement): Promise<void> {
    if (!action.executeFunc) {
      return;
    }

    const result = await action.executeFunc(element);
    if (result === null || result === undefined) {
      return;
    }

    if (!result) {
      alert(`Assertion failed: ${action.selector}`);
      throw new Error(`Assertion failed: ${action.selector}`);
    }
  }
}
