import { Plugin } from 'ractive';

export interface PluginOpts {
  name?: string;
  immediate?: boolean;
  timeout?: number;
}

export default function(options?: PluginOpts): Plugin;
