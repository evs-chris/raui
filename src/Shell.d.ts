import Ractive, { Plugin } from 'ractive';

export class Shell<T extends Shell<T> = Shell<any>> extends Ractive<T> {
  shellSize(relative?: string): { width: number; height: number };
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;
