import { ICJ } from './ICJ';
import { IExecutor } from './IExecutor';

export class Engine {
  private readonly _executors: IExecutor[] = [];

  public addExecutor(executor: IExecutor): void {
    this._executors.push(executor);
  }

  public addExecutors(executors: IExecutor[]): void {
    this._executors.push(...executors);
  }

  public async executePlan(plan: ICJ): Promise<void> {
    for (const action of plan.actions) {
      const engineExecutor = this._executors.find((a) => a.type === action.type);
      if (!engineExecutor) {
        throw new Error(`Engine executor not found for type: ${action.type}`);
      }

      if (engineExecutor) {
        await engineExecutor.invoke(action);
      }
    }
  }
}
