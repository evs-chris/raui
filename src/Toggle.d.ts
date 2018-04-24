import { Macro, Plugin } from 'ractive';

export const Toggle: Macro;

export interface PluginOpts {
  name?: string;
}

export default function plugin(options?: PluginOpts): Plugin;