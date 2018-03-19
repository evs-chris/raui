import Ractive from 'ractive';
import App from './App';
import tabs from 'cmp/Tabs';
import marked from 'cmp/marked';
import form from 'cmp/form';

Ractive.use(
  marked(),
  form({ includeStyle: true }),
  tabs()
);

var app = window.app = new App({ target: '#target' });
