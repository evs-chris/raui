import Ractive, { Plugin, ContextHelper as Context } from 'ractive';

export interface MenuItem {
  condition?: boolean | (() => boolean);
  type?: 'item' | 'section' | 'container';
  ref?: string;
  active?: (Handle) => boolean;
  action?: () => void;
  left?: string;
  title?: string;
  right?: string;
  open?: boolean;
  items?: MenuItem[];
  content?: string;
  pad?: boolean;
}

export interface Handle {
  menu: Menu;
  item: MenuItem;

  keypath: string;
  disabled: boolean;
  action: () => void;
  active: boolean | ((Handle) => boolean);
  addItem(item: MenuItem, index?: number): Handle;
  open(): void;
  close(): void;
  remove(): boolean;
  get(keypath: string): any;
  set(keypath: string, value: any): Promise<void>;
}

export class Menu<T extends Menu<T> = Menu<any>> extends Ractive<T> {
  addItem(item: MenuItem, index?: number): Handle;
  getHandle(what: string | HTMLElement | Context): Handle;
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;