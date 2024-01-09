export interface ICJAction {
  type: string;
  selector?: string;
  stringValue?: string;
  numericValue?: number;
  booleanValue?: boolean;
  stringValueFunc?: (element?: HTMLElement) => Promise<string>;
  numericValueFunc?: (element?: HTMLElement) => Promise<number>;
  executeIf?: () => Promise<boolean>;
  optional?: boolean;
  timeout?: number;
  omitFireEvents?: boolean;
}
