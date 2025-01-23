export interface ICJAction {
  type: string;
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
