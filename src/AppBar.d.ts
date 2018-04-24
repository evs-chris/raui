import Ractive, { Plugin } from 'ractive';

export class AppBar<T extends AppBar<T> = AppBar<any>> extends Ractive<T> {
  waiting: boolean;
  wait(show: boolean): void;
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;