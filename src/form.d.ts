import { Decorator, Plugin, Macro } from 'ractive';

export const field: Decorator;
export const autofocus: Decorator;

export interface PluginOpts {
  name?: string;
  autofocusName?: string;
  includeStyle?: boolean;
}

export interface TypeRegistry {
  [name: string]: TypePlugin;
}
export type TypePlugin = (attrs: any[], content: any[], handle: MacroHandle) => any[];
export const macro: Macro & { types: TypeRegistry };

export function style(data: (string) => any): string;

export default function(options?: PluginOpts): Plugin;
