import { ICJAction } from './ICJAction';

export interface ICJ {
  actions: ICJAction[];
  submitAction: ICJAction;
  name?: string;
}
