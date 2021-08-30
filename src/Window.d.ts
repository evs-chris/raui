import Ractive, { InitOpts as BaseInitOpts, ExtendOpts as BaseExtendOpts, Plugin, Static, Constructor as BaseConstructor } from 'ractive';
import { Toast, Options as ToastOptions, Handle } from './Toast';

export interface InitOpts<T extends Window<T> = Window> extends BaseInitOpts<T> {
  options?: WindowOpts;
}
export interface ExtendOpts<T extends Window<T> = Window> extends BaseExtendOpts<T> {
  options?: WindowOpts;
}

export interface Constructor<A extends Window<A>, B extends InitOpts<A> = InitOpts> extends BaseConstructor<A, B> {}

export interface WindowButton {
  label: string;
  action: (this: Window) => void;
  class?: string;
  where?: 'left'|'right'|'center';
}

export class Window<T extends Window<T> = Window<any>, Result = any> extends Ractive<T> {
  constructor(opts?: InitOpts<T>);

  host?: Host;

  readonly id: string;
  
  resizable?: boolean;
  title?: string;
  visible?: boolean;
  pad?: boolean;
  buttons?: WindowButton[];
  blocked?: boolean;

  result: Promise<Result>;

  close(force?: boolean, result?: Result): boolean;
  minimize(): void;
  hide(): void;
  raise(show?: boolean): void;
  show(): void;
  size(width: 'auto'): Promise<void>;
  size(width: string | number, height: string | number): Promise<void>;
  size(width: string | number | 'auto', height?: string | number): Promise<void>;
  minSize(width: 'auto'): Promise<void>;
  minSize(width: string | number, height: string | number): Promise<void>;
  minSize(width: string | number | 'auto', height?: string | number): Promise<void>;
  move(top: string | number, left: string | number): Promise<void>;

  protected setResult(result: Result): void;

  static extend<U>(opts?: ExtendOpts<Window & U>): Static<Window<Window & U>>;
  static extendWith<U extends Window<U>, V extends InitOpts<any> = InitOpts, W extends ExtendOpts<U> = ExtendOpts<U>>(c: Constructor<U, V>, opts?: W): Static<Window<Window & U>>;
}

export interface WindowOpts {
  id?: string;
  title?: string;
  close?: boolean;
  maximize?: boolean;
  minimize?: boolean;
  resizable?: boolean;
  movable?: boolean;
  flex?: boolean;
  pad?: boolean;
  show?: boolean;
  width?: string;
  height?: string;
  minWidth?: string;
  minHeight?: string;
  size?: 'fill'|'auto';
  fillPad?: number;
  block?: boolean|Window;
  stickToParent?: boolean;
  dialog?: boolean;
  top?: string;
  left?: string;
}

export interface Control {

}
export interface Position {
  top: number | string;
  left: number | string;
}
export type Placement = 'smart' | 'grid' | ((host: Host, element: HTMLElement, control: Control) => Position)

export class Host<T extends Host<T> = Host<any>> extends Ractive<Host> implements Toast {
  constructor(opts?: BaseInitOpts<T>);

  current?: Window;
  currentId?: string;
  defaults?: WindowOpts;
  readonly toastDefaults: ToastOptions;
  placement?: Placement;

  readonly windows: string[];
  readonly topmost?: Window;

  addWindow<T extends Window>(window: T, opts?: WindowOpts): Promise<T>;
  getWindow(id: string): Window;
  raise(window: string | Window, show: boolean): void;
  sizeInPx(size: number | string): number;
  sizeInEm(size: number | string): number;

  toast(message: string, options?: ToastOptions): Handle;
}

export interface PluginOpts {
  name?: string;
}

export default function(opts?: PluginOpts): Plugin;
