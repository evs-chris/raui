import { Decorator, Plugin } from 'ractive';

export const scrollspy: Decorator;
export const spytarget: Decorator;

export interface PluginOpts {
  name?: string;
  targetName?: string;
}

export default function(options?: PluginOpts): Plugin;