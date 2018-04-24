import { Plugin } from 'ractive';

export interface PluginOpts {
  name?: string;
  keys?: number[];
}

export default function(options?: PluginOpts): Plugin;

export const tab: Plugin;