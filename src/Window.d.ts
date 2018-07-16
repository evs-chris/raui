import Ractive, { InitOpts as BaseInitOpts, ExtendOpts as BaseExtendOpts, Plugin, Static, Constructor } from 'ractive';
import { Toast, Options as ToastOptions } from './Toast';

export interface InitOpts<T extends Window<T> = Window> extends BaseInitOpts<T> {
  options?: WindowOpts;
}
export interface ExtendOpts<T extends Window<T> = Window> extends BaseExtendOpts<T> {
  options?: WindowOpts;
}

export interface WindowButton {
  label: string;
  action: (this: Window) => void;
  class?: string;
  where?: 'left'|'right'|'center';
}

export class Window<T extends Window<T> = Window<any>> extends Ractive<T> {
  constructor(opts?: InitOpts<T>);

  host?: Host;

  resizable?: boolean;
  title?: string;
  visible?: boolean;
  pad?: boolean;
  buttons?: WindowButton[];

  close(force?: boolean): void;
  minimize(): void;
  hide(): void;
  raise(show?: boolean): void;
  show(): void;
  size(width: string | number, height: string | number): void;
  move(top: string | number, left: string | number): void;

	static extend<T extends Window<T>>(opts?: ExtendOpts<T>): Static<Ractive<Ractive & T>>;
	static extendWith<U extends Window<U>, V extends InitOpts<U> = InitOpts<U>, W extends ExtendOpts<U> = ExtendOpts<U>>(c: Constructor<U, V>, opts?: W): void;
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
  size?: 'fill'|'auto';
  block?: boolean|Window;
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
  placement?: Placement;

  addWindow<T extends Window>(window: T, opts?: WindowOpts): Promise<T>;
  getWindow(id: string): Window;
  rasie(window: string | Window, show: boolean);
  sizeInPx(size: number | string): number;
  sizeInEm(size: number | string): number;

  toast(message: string, options?: ToastOptions): void;
}

export interface PluginOpts {
  name?: string;
}

export default function(opts?: PluginOpts): Plugin;