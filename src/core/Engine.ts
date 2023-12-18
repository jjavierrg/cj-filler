import { ICJ } from './ICJ';
import { IExecutor } from './IExecutor';

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

  public async executePlan(plan: ICJ): Promise<void> {
    this.cancellationRequested = false;
    this.isRunning = true;
    for (const action of plan.actions) {
      const engineExecutor = this._executors.find((a) => a.type === action.type);
      if (!engineExecutor) {
        throw new Error(`Engine executor not found for type: ${action.type}`);
      }

      if (engineExecutor) {
        await engineExecutor.invoke(action);
      }

      if (this.cancellationRequested) {
        this.isRunning = false;
        return;
      }
    }

    this.isRunning = false;
  }
}
