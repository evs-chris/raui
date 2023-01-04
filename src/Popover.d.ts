import Ractive, { Plugin } from 'ractive';

export class Popover<T extends Popover<T> = Popover<any>> extends Ractive<T> {
  /**
   * Reposition the popover
   */
  position(node?: HTMLElement): void;

  /**
   * Show the popover relative to the given node.
   */
  show(node: HTMLElement): Promise<void>;

  /**
   * Hide the popover.
   */
  hide(): Promise<void>;
}

export interface TriggerOpts {
/**
   * The name for both the popover component and the trigger decorator.
   * @default 'pop'
   */
  name?: string;
  
  /**
   * Trigger popover on hover too?
   * @default false
   */
  hover?: boolean;

  /**
   * Trigger popover on click?
   * @default true
   */
  click?: boolean;
}

export interface PluginOpts extends TriggerOpts {
  /**
   * Override for trigger decorator trigger name.
   */
  trigger?: string;

  /**
   * Name for the mobile popover host component. If you don't create your own mobile host, one will be added to the document body for you.
   */
  mobileName?: string;
}

export function trigger(opts?: TriggerOpts): Plugin;

export default function plugin(opts?: PluginOpts): Plugin;
