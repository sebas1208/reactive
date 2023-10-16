const person = {
  name: 'Sebastian',
  age: 29,
}

const proxy = new Proxy(person, {
  set(target, p, newValue, receiver) {
    console.log(target, p, newValue, receiver)
    return true;
  },
})

const nameEl = document.getElementById('name');
const ageEl = document.getElementById('age');

nameEl!.innerHTML = person.name;
ageEl!.innerHTML = String(person.age);

proxy.name = 'Luis'
proxy.age = 25
