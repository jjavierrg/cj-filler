import { ExecutorBase } from '../../core/ExecutorBase';
import { ICJAction } from '../../core/ICJAction';
import { ActionType } from '../../enums/actions';

export class ClickExecutor extends ExecutorBase {
  constructor() {
    super(ActionType.CLICK);
  }

  protected executeAction(_: ICJAction, element?: HTMLElement): Promise<void> {
    element?.focus();
    element?.click();
    return Promise.resolve();
  }
}
