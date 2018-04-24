import Ractive, { Plugin } from 'ractive';

export class Table<T extends Table<T> = Table<any>> extends Ractive<T> {
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;