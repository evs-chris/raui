import Ractive, { Plugin } from 'ractive';

export class Autocomplete<T extends Autocomplete<T> = Autocomplete<any>> extends Ractive<T> {
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;