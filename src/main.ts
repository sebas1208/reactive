import './style.css';
import { App } from './components/App';
// import { Component } from './lib/component';

function render(el: HTMLElement | null, app: HTMLElement) {
  if(el) {
    el.appendChild(app);
  }
}

render(document.getElementById("app"), App());

// // This are our effects
// nameEl!.innerHTML = person.name;
// ageEl!.innerHTML = String(person.age);

// person.name = 'Luis'
// person.age = 25
