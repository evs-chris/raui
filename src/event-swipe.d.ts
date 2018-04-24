import { Plugin } from 'ractive';

export interface PluginOpts {
  name?: string;
  direction?: 'left' | 'right' | 'up' | 'down';
  distance?: number;
  flick?: number;
  threshold?: number;
}

export const left: Plugin;
export const right: Plugin;
export const up: Plugin;
export const down: Plugin;

export default function(options?: PluginOpts): Plugin;