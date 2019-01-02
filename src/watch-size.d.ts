import { Decorator, Plugin } from 'ractive';

export interface PluginOpts {
  name?: string;
}

export const sized: Decorator;
export default function(options?: PluginOpts): Plugin;