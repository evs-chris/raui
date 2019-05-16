export interface Options {
  bottom?: boolean;
  left?: boolean;
  right?: boolean;
  top?: boolean;
  
  dismissable?: boolean;
  type?: 'success'|'info'|'warn'|'error'|string;
  buttons?: Button[];

  timeout?: number;
}

export interface Button {
  class?: string;
  action?: () => void;
  label: string;
}

export interface Toast {
  toast(message: string, options?: Options): void;
}

export interface PluginOpts extends Options {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;