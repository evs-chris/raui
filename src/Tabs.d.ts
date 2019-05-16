import Ractive, { Plugin } from 'ractive';

export class Tabs<T extends Tabs<T> = Tabs<any>> extends Ractive<T> {
  /**
   * Add a tab, optionally at a given index
   * @param tab 
   * @param idx 
   */
  addTab(tab: Tab, idx?: number): Handle;

  /**
   * Get a handle to the given tab by id or index
   * @param id 
   */
  getTab(id: string|number): Handle;

  /**
   * Make the tab at the given index the active tab.
   * @param index 
   */
  select(index: number): void;
}

export interface TabAttrs {
  id?: string;
  title?: string|any[],
  template?: { template: string }|any[];
  pad?: boolean;
  right?: boolean;
  hidden?: boolean;
  closable?: boolean;
  disabled?: boolean;
  button?: false|(() => void);
  onclose?: () => void;
}

export interface Tab extends TabAttrs {
  select?: boolean;
}

export interface Handle extends TabAttrs {
  readonly index: number;
  readonly keypath: string;

  select(): void;
  get(path?: string): any;
  set(path: string, value: any): any;
  remove(): boolean;
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;