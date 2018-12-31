import { Plugin } from 'ractive';

export function padl(str: string, length: number, char?: string): string;

export const defaults: {
  mask: string;
  time: string;
  date: () => Date;
}

export interface PluginOpts {
  name?: string;
  mask?: string;
  time?: string;
  date?: string;
}

export default function(options?: PluginOpts): Plugin;