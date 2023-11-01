import './style.css';
import { App } from './components/App';

function render(el: HTMLElement | null, app: HTMLElement) {
  if(el) {
    el.replaceWith(app);
  }
}

render(document.getElementById("app"), App());
