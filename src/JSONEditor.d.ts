import Ractive, { Plugin } from 'ractive';

export class JSONEditor<T extends JSONEditor<T> = JSONEditor<any>> extends Ractive<T> {
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;