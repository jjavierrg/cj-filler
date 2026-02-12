import { ActionType } from '../enums/actions';

export interface ICJAction {
  type: ActionType;
  selector?: string;
  stringValue?: string;
  numericValue?: number;
  booleanValue?: boolean;
  executeFunc?: (element?: HTMLElement) => Promise<string | number | null>;
  executeIf?: () => Promise<boolean>;
  optional?: boolean;
  timeout?: number;
  omitFireEvents?: boolean;
}
