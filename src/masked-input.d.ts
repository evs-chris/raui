import { Plugin } from 'ractive';

export interface PluginOpts {
  name?: string;
}

export default function(options?: PluginOpts): Plugin;