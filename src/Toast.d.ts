import { ContextHelper } from 'ractive';

export interface Options {
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  
  dismissable?: boolean;
  closeButton?: boolean;
  type?: 'success'|'info'|'warn'|'error'|string;
  class?: string;
  buttons?: Button[];

  timeout?: number;
}

export interface Button {
  class?: string;
  action?: () => void;
  label: string;
}

export interface Handle {
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

  readonly live?: boolean;]

  close(timeout?: number): void;
  cancelClose(): void;
  updateButtons(): void;
}

export interface Toast {
  toast(message: string, options?: Options): Handle;
}

export interface PluginOpts extends Options {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;