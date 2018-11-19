import { Decorator, Plugin } from 'ractive';

export interface PluginOpts {
  name?: string;
}

export const autoResize: Decorator;

export function plugin(options?: PluginOpts): Plugin;

export default plugin;