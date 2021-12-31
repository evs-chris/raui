import Ractive, { Plugin } from 'ractive';

export class SideBar<T extends SideBar<T> = SideBar<any>> extends Ractive<T> {
  /**
   * Open the side bar
   */
  open(): Promise<void>;

  /**
   * Close the side bar
   */
  close(): Promise<void>;

  /**
   * Indicate that the side bar is no longer of interest, which will cause it to close in narrow and medium modes.
   */
  blur(): Promise<boolean>;

  /**
   * Toggle the side bar
   */
  toggle(): Promise<boolean>;

  /**
   * Toggle the given key
   */
  toggle(key: string): Promise<boolean>;

  /**
   * Select the given tab index on the side bar. If open is not specified as `false`, the side bar will also be opened.
   */
  select(index: number, open?: boolean): Promise<void>;
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;
