import Ractive, { Decorator } from 'ractive';

export type MessageLevel = 'error'|'warn'|'info';
export type Level = 'none'|MessageLevel;
export type ValidatorResult = Array<[Message, string]|[Message, string, string|string[]]>;
export type ValidatorFn = (this: Ractive, ...values: any[]) => ValidatorResult;

export interface CheckHandle {
  cancel(): void;
}

export type Hook = () => void;

export interface CheckHelper {
  check(keys: string|string[], deps: string|string[], fn: ValidatorFn): void;
  check(keys: string|string[], fn: ValidatorFn): void;
  checkList(path: string, fn: (key: string, check: CheckHelper, index: number) => void): void;
  checkWild(path: string, fn: (key: string, check: CheckHelper, key: string) => void): void;
}

export interface DecoratorOpts {
  indicator?: boolean;
  tab?: boolen;
  regex?: boolean;
  levels?: [string, string, string, string];
}

export class Validator {
  constructor(ractive: Ractive, debounce = 500); 

  check(keys: string|string[], deps: string|string[], fn: ValidatorFn): CheckHandle;
  check(keys: string|string[], fn: ValidatorFn): CheckHandle;
  checkList(path: string, fn: (key: string, check: CheckHelper, index: number) => void): CheckHandle;
  checkWild(path: string, fn: (key: string, check: CheckHelper, key: string) => void): CheckHandle;
  refresh(path: string|string[]|RegExp, recurse = true): void;
  notify(key: string|RegExp, up?: boolean, recurse?: boolean): void;
  clear(key: string|RegExp, recurse?: boolean): void;
  level(key: string|string[]|RegExp, recurse = true): Level;
  messages(key: string|string[]|RegExp, recurse?: boolean): ValidatorResult;
  hook(key: string|RegExp, fn: Hook): void;
  unhook(key: string|RegExp, fn: Hook): void;
  decorator(opts: DecoratorOpts = {}): Decorator
}

export function required(name: string): ValidatorFn;
export function lt(name: string, num: number): ValidatorFn;
export function lte(name: string, num: number): ValidatorFn;
export function gt(name: string, num: number): ValidatorFn;
export function gte(name: string, num: number): ValidatorFn;
export function between(name: string, lower: number, upper: number): ValidatorFn;
