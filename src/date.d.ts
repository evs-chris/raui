import { Plugin } from 'ractive';

export function padl(str: string|any, length: number, char?: string): string;

export const defaults: {
  mask: string;
  time: string;
  date: () => Date;
  parseDate?: (dt: string) => Date;
}

export interface PluginOpts {
  name?: string;
  mask?: string;
  time?: string;
  date?: string;
  parseDate?: (dt: string) => Date;
}

export default function(options?: PluginOpts): Plugin;
