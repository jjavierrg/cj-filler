import { ExecutorBase } from '../../core/ExecutorBase';
import { ICJAction } from '../../core/ICJAction';
import { ActionType } from '../../enums/actions';
import { sleep } from '../../helpers/helpers';

export class WaitExecutor extends ExecutorBase {
  constructor() {
    super(ActionType.WAIT);
  }

  protected async executeAction(action: ICJAction): Promise<void> {
    if (!action.numericValue) {
      throw new Error(`Invalid action value: ${action.numericValue}`);
    }

    await sleep(action.numericValue);
  }
}
