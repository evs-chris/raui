import { Plugin } from 'ractive';

export interface PluginOpts {
  /**
   * The Ace Editor constructor to use when creating editor instances. If not supplied, the plugin will check for a global instance before erroring.
   */
  ace?: any;

  name?: string;
}

export default function(options?: PluginOpts): Plugin;