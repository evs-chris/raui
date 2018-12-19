import Ractive, { Plugin } from 'ractive';
import { TypePlugin } from './form';

export class Autocomplete<T extends Autocomplete<T> = Autocomplete<any>> extends Ractive<T> {
}

export interface PluginOpts {
  name?: string;
}

export function FieldType(opts?: PluginOpts): TypePlugin;

export default function plugin(opts?: PluginOpts): Plugin;