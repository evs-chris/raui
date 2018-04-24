import { Plugin, Transition } from 'ractive';

export const expand: Transition;

export interface PluginOpts {
  name?: string;
}

export default function(options?: PluginOpts): Plugin;