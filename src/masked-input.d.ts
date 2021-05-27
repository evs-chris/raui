import { Plugin } from 'ractive';

export interface PluginOpts {
  name?: string;
  mask?: string;
  blurMask?: string;
  masks?: { [char: string]: RegExp };
  privateMask?: string;
}

export default function(options?: PluginOpts): Plugin;

export function masked(options: PluginOpts = {}): Decorator;
