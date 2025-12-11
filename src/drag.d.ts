import { Plugin, Decorator } from 'ractive';

export interface MoveOptions {
  /** The suffix to place on the move and moveItem decorators in the plugin, and on the events and classes fired and applied at runtime. */
  suffix?: string;
  /** Prevent actually moving items in or to and from arrays. */
  eventsOnly?: boolean;
  /** Prevent dropping items at inner indices in destination arrays. */
  appendOnly?: boolean;
  /** Allow moving items within their source array. Defaults to true. */
  sort?: boolean;
  /** The color to use for the drop position indicator. This defaults to raui.primary.fga (or #07e) from the Ractive style data. */
  color?: string;
  /** Allow horizontal scrolling on mouse drag */
  xScroll?: boolean;
}

export function move(opts: MoveOptions = {}): {
  move: Decorator,
  moveItem: Decorator,
  plugin: Plugin
};
