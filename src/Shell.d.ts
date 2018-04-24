import Ractive, { Plugin } from 'ractive';

export class Shell<T extends Shell<T> = Shell<any>> extends Ractive<T> {
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;