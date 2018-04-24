import Ractive, { Plugin } from 'ractive';

export class Split<T extends Split<T> = Split<any>> extends Ractive<T> {
  maximize(index: number): void;
  minmize(index: number): void;
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;