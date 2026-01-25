import Ractive, { Plugin as RactivePlugin } from 'ractive';

export class Runner extends Ractive<Runner> {
  /**
  * Register a plugin with the runner.
  * @param plugin - the plugin to register
  */
  addPlugin(plugin: Plugin): void;

  /**
  * Show the runner interface
  */
  show(): void;

  /**
  * Hide the runner interface
  */
  hide(): void;

  /**
  * Toggle the runner interface
  */
  showHide(): void;
}

export type Result = string[]|Array<[string, any]>|Array<{ label: string; value: any }>;

/**
 * A runner plugin that produces results to be shown in the runner.
 */
export interface Plugin {
  /**
   * The name of the plugin, which is also displayed with each runner result by default.
  */
  name: string;

  /**
  * The primary interface of the runner that receives a command string and produces results.
  */
  run(cmd: string): Result|Promise<Result>;

  /**
  * An optional action to be executed when a result is selected. The value portion of a result is passed into the function. If the result is a single string, that string is both the label and the value, so the value passed here will be the string.
  */
  action?(result: any): false|Promise<false>|any|Promise<any>;
}

/**
 * A runner plugin that lists windows in the given host that have titles that match the command given to the runner. The action for results is to raise the window.
 */
export function WindowList(host: Ractive): Plugin;

export interface MenuListOptions {
  /**
  * The name to use for the plugin, which defaults to Menu List.
  */
  name?: string;

  /**
  * If not false, will result in menu item names prefixed with the path through the menu to reach them.
  */
  flat?: boolean;

  /**
  * If true, will gather menu items every time the plgun is called. If not true, will gather the menu items at initialization.
  */
  dynamic?: boolean;
}

/**
 * A runner plugin that lists rendered menu items with an action from the given menu that match the command given to the runner. The action for the result will execute the action for the selected menu item.
 */
export function MenuList(menu: Ractive, opts?: MenuListOptions): Plugin;

export interface PluginOpts {
  name?: string;
}
export default function plugin(opts?: PluginOpts): RactivePlugin;
