import { Plugin, Transition } from 'ractive';

export const fade: Transition;

export interface PluginOpts {
  name?: string;
}

export default function(options?: PluginOpts): Plugin;