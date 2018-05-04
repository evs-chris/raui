import { Plugin, EventPlugin } from 'ractive';

export interface PluginOpts {
  name?: string;
}

export default function(options?: PluginOpts): Plugin;

export const clickout: EventPlugin;