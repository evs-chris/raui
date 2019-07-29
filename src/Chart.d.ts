import Ractive, { Plugin } from 'ractive';

export class Chart<T extends Chart<T> = Chart<any>> extends Ractive<T> {}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;