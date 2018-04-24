import { Plugin } from 'ractive';

export interface PluginOpts {
  name?: string;
  count?: number;
  delay?: number;
  hold?: boolean;
  bubble?: boolean;
}

export const click: Plugin;
export const dblclick: Plugin;
export const trpclick: Plugin;

export default function(options?: PluginOpts): Plugin;