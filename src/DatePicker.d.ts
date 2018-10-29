import Ractive, { Plugin } from 'ractive';

export class DatePicker<T extends DatePicker<T> = DatePicker<any>> extends Ractive<T> {
  select(date: Date): void;
  today(): void;
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;