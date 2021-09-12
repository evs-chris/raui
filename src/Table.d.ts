import Ractive, { Plugin } from 'ractive';

export class Table<V = any, T extends Table<T> = Table<any>> extends Ractive<T> {
  /** All selected items */
  selections: V[];
  /** The deisgnated (last) selected item */
  selected: V;
  /** All items that are currently available for render i.e. not filtered out */
  rows: V[];
  /** All items that are currently rendered. */
  visibleRows: V[];
  /** All items that are available in the table */
  allRows: V[];

  /** Remove any selections. */
  deselect(): void;

  /** Move the selection up or down the list by the given offset.
   *
   * @param offset - the positive (down) or negative (up) offset to move the selection
   */
  selectionOffset(offset: number): void;

  /** Move the selection down by one row. */
  selectionDown(): void;

  /** Move the selection up by one row. */
  selectionUp(): void;
}

export interface PluginOpts {
  name?: string;
}

export default function plugin(opts?: PluginOpts): Plugin;
