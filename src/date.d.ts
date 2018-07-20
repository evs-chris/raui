import { Plugin } from 'ractive';

export interface PluginOpts {
  name?: string;
  mask?: string;
  time?: string;
  date?: string;
}

export default function(options?: PluginOpts): Plugin;