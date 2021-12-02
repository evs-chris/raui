import { Decorator, Plugin } from 'ractive';

export function numeric(opts?: DecoratorOpts): Decorator;

export interface DecoratorOpts {
  decimal?: number;
  whole?: number;
  prefix?: string;
  suffix?: string;
  default?: string;
  optional?: boolean;
  lazy?: boolean;
  preferInteger?: boolean;
  twoway?: boolean;
}

export interface PluginOpts extends DecoratorOpts {
  name?: string;
}

export function plugin(options?: PluginOpts): Plugin;

export default plugin;
