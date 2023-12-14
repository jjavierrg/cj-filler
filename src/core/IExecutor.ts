import { ICJAction } from './ICJAction';

export interface IExecutor {
  type: string;
  invoke: (action: ICJAction) => Promise<void>;
}
