import { ICJ } from './ICJ';
import { ICJAction } from './ICJAction';
import { IExecutor } from './IExecutor';

export interface ExecuteOptions {
  executeSubmitAction?: boolean;
}

export class Engine {
  public isRunning: boolean = false;
  private readonly _executors: IExecutor[] = [];
  private cancellationRequested: boolean = false;

  public addExecutor(executor: IExecutor): void {
    this._executors.push(executor);
  }

  public addExecutors(executors: IExecutor[]): void {
    this._executors.push(...executors);
  }

  public cancel(): void {
    this.cancellationRequested = true;
  }

  public async executePlan(plan: ICJ, options: ExecuteOptions = {}): Promise<void> {
    this.cancellationRequested = false;
    this.isRunning = true;
    for (const action of plan.actions) {
      await this.executeAction(action);

      if (this.cancellationRequested) {
        this.isRunning = false;
        return;
      }
    }

    if (options.executeSubmitAction && plan.submitAction) {
      await this.executeAction(plan.submitAction);
    }

    this.isRunning = false;
  }

  private async executeAction(action: ICJAction): Promise<void> {
    const engineExecutor = this._executors.find((a) => a.type === action.type);
    if (!engineExecutor) {
      throw new Error(`Engine executor not found for type: ${action.type}`);
    }

    if (engineExecutor) {
      await engineExecutor.invoke(action);
    }
  }
}
