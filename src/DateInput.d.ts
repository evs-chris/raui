import { Macro, Plugin } from 'ractive';

export const DateInput: Macro;

export interface PluginOpts {
  name?: string;
  parseDate?: (dt: string) => Date;
}

export default function plugin(options?: PluginOpts): Plugin;
