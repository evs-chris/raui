import Ractive, { Decorator } from 'ractive';

export type MessageLevel = 'error'|'warn'|'info';
export type Level = 'none'|MessageLevel;
export type ValidatorResult = Array<[MessageLevel, string]|[MessageLevel, string, string|string[]]>;
export type ValidatorFn = (this: Ractive, ...values: any[]) => ValidatorResult;

export interface CheckHandle {
  cancel(): void;
}

export interface CheckOptions {
  group?: string|string[];
  init?: boolean;
}

export interface ManyCheckOptions {
  init?: boolean;
}

export interface GroupKey {
  group: string|string[];
}

export type Hook = () => void;

export interface CheckHelper {
  check(keys: string|string[], deps: string|string[], fn: ValidatorFn, opts?: CheckOptions): void;
  check(keys: string|string[], fn: ValidatorFn, opts?: CheckOptions): void;
  checkList(path: string, fn: (key: string, check: CheckHelper, index: number) => void, opts?: ManyCheckOptions): void;
  checkDefer(path: string, fn: (key: string, check: CheckHelper, key: string) => void, opts?: ManyCheckOptions): void;
}

export interface DecoratorOpts {
  indicator?: boolean;
  tab?: boolen;
  regex?: boolean;
  levels?: [string, string, string, string];
  group?: boolean;
}

export class Validator {
  constructor(ractive: Ractive, debounce = 500); 

  check(keys: string|string[], deps: string|string[], fn: ValidatorFn, opts?: CheckOptions): CheckHandle;
  check(keys: string|string[], fn: ValidatorFn, opts?: CheckOptions): CheckHandle;
  /**
   * Allows setup of validations for each entry in a list.
   */
  checkList(path: string, fn: (key: string, check: CheckHelper, index: number) => void, opts?: ManyCheckOptions): CheckHandle;
  /**
   * Waits until the given path(s) is defined and allows further validiation setup.
   */
  checkDefer(path: string, fn: (key: string, check: CheckHelper, key: string) => void, opts?: ManyCheckOptions): CheckHandle;
  refresh(path: string|string[]|RegExp, recurse = true): void;
  notify(key: string|RegExp, up?: boolean, recurse?: boolean): void;
  clear(key: string|RegExp, recurse?: boolean): void;
  level(key: string|string[]|RegExp|GroupKey, recurse = true): Level;
  messages(key: string|string[]|RegExp|GroupKey, recurse?: boolean): ValidatorResult;
  hook(key: string|string[]|RegExp|RegExp[]|GroupKey, fn: Hook): void;
  unhook(key: string|string[]|RegExp|RegExp[]|GroupKey, fn: Hook): void;
  decorator(opts: DecoratorOpts = {}): Decorator
}

export function required(name: string, level: MessageLevel = 'error'): ValidatorFn;
export function lt(name: string, num: number, level: MessageLevel = 'error'): ValidatorFn;
export function lte(name: string, num: number, level: MessageLevel = 'error'): ValidatorFn;
export function gt(name: string, num: number, level: MessageLevel = 'error'): ValidatorFn;
export function gte(name: string, num: number, level: MessageLevel = 'error'): ValidatorFn;
export function between(name: string, lower: number, upper: number, level: MessageLevel = 'error'): ValidatorFn;
