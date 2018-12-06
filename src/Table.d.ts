import Ractive, { Plugin } from 'ractive';

export class Table<V = any, T extends Table<T> = Table<any>> extends Ractive<T> {
  readonly selections: V[];
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;