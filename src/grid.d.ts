import { Decorator, Plugin, CssFn } from 'ractive';

export const grid: Decorator;
export const style: CssFn;

export interface PluginOpts {
  name?: string;
  inclideStyle?: boolean;
}

export default function(options?: PluginOpts): Plugin;