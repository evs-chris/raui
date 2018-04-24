import Ractive, { Plugin } from 'ractive';

export class Tabs<T extends Tabs<T> = Tabs<any>> extends Ractive<T> {
  /**
   * Make the tab at the given index the active tab.
   * @param index 
   */
  select(index: number): void;
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;