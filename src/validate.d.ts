import Ractive, { Decorator } from 'ractive';

export type MessageLevel = 'error'|'warn'|'info';
export type Level = 'none'|MessageLevel;
export type ValidatorResult = Array<[MessageLevel, string]|[MessageLevel, string, string|string[]]>;
export type ValidatorFn = (this: Ractive, ...values: any[]) => ValidatorResult;
export type ConditionFn = (this: Ractive, ...values: any[]) => boolean;

export interface CheckHandle {
  cancel(): void;
}

export interface CheckOptions {
  /** The name or names of groups that a validation should be placed in. */
  group?: string|string[];
  /** Whether or not to immediately run the validation. */
  init?: boolean;
}

export interface ManyCheckOptions {
  /** Whether or not to immediately run the validation. */
  init?: boolean;
}

export interface GroupKey {
  group: string|string[];
}

export type Hook = () => void;

export interface HookHandle {
  /** Removes the related Hook. */
  cancel(): void;
}

export interface CheckHelper {
  /**
   * Install a validator on a number of keys, which may include additional dependencies that aren't reported along with the keys.
   *
   * @param keys - the keys to watch and report messages for
   * @param deps - addition dependencies that cause validation, but are not reported
   * @param fn - the validator to run when the keys or deps change
   * @param opts - addition validation options
   */
  check(keys: string|string[], deps: string|string[], fn: ValidatorFn, opts?: CheckOptions): void;
  /**
   * Install a validator on a number of keys.
   *
   * @param keys - the keys to watch and report messages for
   * @param fn - the validator to run when the keys change
   * @param opts - addition validation options
   */
  check(keys: string|string[], fn: ValidatorFn, opts?: CheckOptions): void;
  /**
   * Waits until the given path(s) is defined and allows further validiation setup.
   *
   * @param path - the path to watch
   * @param scope - the scope function to fire once for each item that matches the keypath
   * @param opts - additional validation options
   */
  checkList(path: string, scope: (path: string, check: CheckHelper, index: number) => void, opts?: ManyCheckOptions): void;
  /**
   * Waits until the given path(s) is defined and allows further validiation setup.
   *
   * @param path - the path to watch
   * @param scope - the scope function to fire once for each item that matches the keypath
   * @param opts - additional validation options
   */
  checkDefer(path: string, scope: (path: string, check: CheckHelper, key: string) => void, opts?: ManyCheckOptions): void;
  /**
   * Watches the given path, executing the conditional function on each change to determine whether to run the check function or remove any checks previously installed.
   *
   * @param path - the path to watch
   * @param condition - the condition function used to determine whether to validate or not
   * @param scope - the scope function to fire once for each item that matches the keypath
   * @param opts - additional validation options
   */
  checkCondition(path: string, condition: ConditionFn, scope: (path: string, check: CheckHelper, key: string) => void, opts?: ManyCheckOptions): void;
  /**
   * Watches the given path, executing the conditional function on each change to determine whether to run the check function or remove any checks previously installed.
   *
   * @param path - the path to watch
   * @param deps - an additional keypath or array of additional keypaths to watch
   * @param condition - the condition function used to determine whether to validate or not
   * @param scope - the scope function to fire once for each item that matches the keypath
   * @param opts - additional validation options
   */
  checkCondition(path: string, deps: string|string[], condition: ConditionFn, scope: (path: string, check: CheckHelper, key: string) => void, opts?: ManyCheckOptions): void;
}

export interface DecoratorOpts {
  /** Whether the decorator should display an indicator for the level and messages to which it is related. */
  indicator?: boolean;
  /** Whether the decorator should update on blur. */
  tab?: boolen;
  /** Whether the paths associated with this decorator should be specified as regexes. */
  regex?: boolean;
  /** The class names for each level - none, info, warn, and error - defaults to ['', 'info', 'warn', 'error']. */
  levels?: [string, string, string, string];
  /** Whether the paths associated with this decorator refer to named groups. */
  group?: boolean;
}

export interface HookOpts {
  /** By default, hooks will fire upon instantiation. If lazy is set to true, the hook will not fire until a change affects it. */
  lazy?: boolean;
}

export class Validator implements CheckHelper {
  constructor(ractive: Ractive, debounce = 500); 

  /**
   * Install a validator on a number of keys, which may include additional dependencies that aren't reported along with the keys.
   *
   * @param keys - the keys to watch and report messages for
   * @param deps - addition dependencies that cause validation, but are not reported
   * @param fn - the validator to run when the keys or deps change
   * @param opts - addition validation options
   */
  check(keys: string|string[], deps: string|string[], fn: ValidatorFn, opts?: CheckOptions): void;
  /**
   * Install a validator on a number of keys.
   *
   * @param keys - the keys to watch and report messages for
   * @param fn - the validator to run when the keys change
   * @param opts - addition validation options
   */
  check(keys: string|string[], fn: ValidatorFn, opts?: CheckOptions): void;
  /**
   * Waits until the given path(s) is defined and allows further validiation setup.
   *
   * @param path - the path to watch
   * @param scope - the scope function to fire once for each item that matches the keypath
   * @param opts - additional validation options
   */
  checkList(path: string, scope: (path: string, check: CheckHelper, index: number) => void, opts?: ManyCheckOptions): void;
  /**
   * Waits until the given path(s) is defined and allows further validiation setup.
   *
   * @param path - the path to watch
   * @param scope - the scope function to fire once for each item that matches the keypath
   * @param opts - additional validation options
   */
  checkDefer(path: string, scope: (path: string, check: CheckHelper, key: string) => void, opts?: ManyCheckOptions): void;
  /**
   * Watches the given path, executing the conditional function on each change to determine whether to run the check function or remove any checks previously installed.
   *
   * @param path - the path to watch
   * @param condition - the condition function used to determine whether to validate or not
   * @param scope - the scope function to fire once for each item that matches the keypath
   * @param opts - additional validation options
   */
  checkCondition(path: string, condition: ConditionFn, scope: (path: string, check: CheckHelper, key: string) => void, opts?: ManyCheckOptions): void;
  /**
   * Watches the given path, executing the conditional function on each change to determine whether to run the check function or remove any checks previously installed.
   *
   * @param path - the path to watch
   * @param deps - an additional keypath or array of additional keypaths to watch
   * @param condition - the condition function used to determine whether to validate or not
   * @param scope - the scope function to fire once for each item that matches the keypath
   * @param opts - additional validation options
   */
  checkCondition(path: string, deps: string|string[], condition: ConditionFn, scope: (path: string, check: CheckHelper, key: string) => void, opts?: ManyCheckOptions): void;
  /**
   * Re-validate the paths that match the given path specifier.
   *
   * @param path - specifies which paths should be re-validated
   * @param recurse - specifies that children of exact path matches should also be checked - defaults to true
   */
  refresh(path: string|string[]|RegExp, recurse = true): void;
  /**
   * Remove all validations, hooks, etc from this validator.
   */
  reset(): void;
  /**
   * Inform the validator that a path has changed.
   *
   * @param key - the path that has changed
   * @param up - whether to cascade upward in the path
   * @param recurse - whether to cascade downward in the path
   */
  notify(key: string|RegExp, up?: boolean, recurse?: boolean): void;
  /**
   * Removes the validation results for the given path specifier.
   *
   * @param key - the path specifier
   * @param up - whether to cascade upward in the path
   * @param recurse - whether to cascade downward in the path
   */
  clear(key: string|RegExp, recurse?: boolean): void;
  /**
   * Retrieve the highest level of validation result for all paths.
   */
  level(): Level;
  /**
   * Retrieve the highest level of validation result for the given path specifier.
   * 
   * @param key - the path specifier, which may be a named group
   * @param recurse - whether or not to cascade downward in the path when looking for messages
   */
  level(key: string|string[]|RegExp|GroupKey, recurse = true): Level;
  /**
   * Gather messages for the given path specifier.
   *
   * @param key - the path specifier, which may be a named group
   * @param recurse - whether or not to cascade downward in the path when looking for messages
   */
  messages(key: string|string[]|RegExp|GroupKey, recurse?: boolean): ValidatorResult;
  /**
   * Fire a callback function when the validation status of any path changes.
   *
   * @param fn - the function to call when changes occur
   */
  hook(fn: Hook, opts?: HookOpts): HookHandle;
  /**
   * Fire a callback function when the validation status of a path specifier changes.
   *
   * @param key - the path specifier, which may be a named group
   * @param fn - the function to call when changes occur
   */
  hook(key: string|string[]|RegExp|RegExp[]|GroupKey, fn: Hook, opts?: HookOpts): HookHandle;
  /**
   * Remove a hook that was registered against all paths.
   *
   * @param fn - thie originally supplied function callback
   */
  unhook(fn: Hook): void;
  /**
   * Remove a hook.
   *
   * @param key - the originally supplied path specifier
   * @param fn - the originally supplied function callback
   */
  unhook(key: string|string[]|RegExp|RegExp[]|GroupKey, fn: Hook): void;
  /**
   * Registers a watcher with the validator that will have its reset method called when the
   * validator is reset.
   */
  register(watcher: { reset(): void }): void;
  /**
   * Unregisters a watcher.
   */
  unregister(watcher: { reset(): void }): void;
  /**
   * Builds a decorator that can be used to expose validation to the UI.
   */
  decorator(opts: DecoratorOpts = {}): Decorator
}

/** Returns a validator that requires that the validated value be truthy. */
export function required(name: string, level: MessageLevel = 'error'): ValidatorFn;
/** Returns a validator that checks that the validated value is less than the given number. */
export function lt(name: string, num: number, level: MessageLevel = 'error'): ValidatorFn;
/** Returns a validator that checks that the validated value is less than or equal to the given number. */
export function lte(name: string, num: number, level: MessageLevel = 'error'): ValidatorFn;
/** Returns a validator that checks that the validated value is greater than the given number. */
export function gt(name: string, num: number, level: MessageLevel = 'error'): ValidatorFn;
/** Returns a validator that checks that the validated value is greater than or equal to the given number. */
export function gte(name: string, num: number, level: MessageLevel = 'error'): ValidatorFn;
/** Returns a validator that checks that the validated value is between the given numbers inclusively. */
export function between(name: string, lower: number, upper: number, level: MessageLevel = 'error'): ValidatorFn;
