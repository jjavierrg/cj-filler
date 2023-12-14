import { Engine as CoreEngine } from '../core/Engine';
import { ClickExecutor } from './executors/clickExecutor';
import { SelectExecutor } from './executors/selectExecutor';
import { TypeExecutor } from './executors/typeExecutor';
import { WaitExecutor } from './executors/waitExecutor';
import { WaitUntilEnabledExecutor } from './executors/waitUntilEnabled';
import { WaitUntilValueExecutor } from './executors/waitUntilValueExecutor';
export class FillerEngine extends CoreEngine {
  constructor() {
    super();

    this.addExecutors([
      new ClickExecutor(),
      new TypeExecutor(),
      new SelectExecutor(),
      new WaitExecutor(),
      new WaitUntilEnabledExecutor(),
      new WaitUntilValueExecutor(),
    ]);
  }
}
