export interface ICJAction {
  type: string;
  selector?: string;
  stringValue?: string;
  numericValue?: number;
  booleanValue?: boolean;
  optional?: boolean;
  timeout?: number;
}
