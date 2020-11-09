import Ractive from 'ractive';
import App from './App';
import tabs from 'cmp/Tabs';
import marked from 'cmp/marked';
import form from 'cmp/form';

Ractive.use(
  marked({ highlight: true }),
  form({ includeStyle: true }),
  tabs()
);

var app = window.app = new App({ target: '#target' });

var el;
document.addEventListener('click', ev => el = ev.target);
document.addEventListener('focus', ev => el = ev.target);

Object.defineProperty(window, 'C', {
  get() {
    return app.getContext(el);
  }
});

Object.defineProperty(window, 'R', {
  get() {
    const res = window.C;
    if (res) return res.ractive;
  }
});
