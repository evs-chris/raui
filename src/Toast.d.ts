import { ContextHelper } from 'ractive';

export interface Options extends Sets {
  timeout?: number;
}

export interface Button {
  class?: string;
  action?: () => void;
  label: string;
}

export interface Sets {
  top?: boolean;
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  center?: boolean;

  buttons?: Button[];

  dismissable?: boolean;
  closeButton?: boolean;
  type?: 'success'|'info'|'warn'|'error'|string;
  class?: string;

  message?: string|any[];
  more?: string|any[];
  context?: ContextHelper;
  showMore?: boolean;
}

export interface Handle extends Sets {
  readonly live?: boolean;
  readonly closed?: Promise<void>;

  close(timeout?: number): Promise<void>;
  cancelClose(): void;
  updateButtons(): void;
  set(map: Sets & { [key: string]: any }): Promise<void>;
  set(key: keyof Sets | string, value: any): Promise<void>;
}

export interface Toast {
  toast(message: string, options?: Options): Handle;
}

export interface PluginOpts extends Options {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;