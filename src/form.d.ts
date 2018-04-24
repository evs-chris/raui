import { Decorator, Plugin } from 'ractive';

export const field: Decorator;
export const autofocus: Decorator;

export interface PluginOpts {
  name?: string;
  autofocusName?: string;
  includeStyle?: boolean;
}

export default function(options?: PluginOpts): Plugin;