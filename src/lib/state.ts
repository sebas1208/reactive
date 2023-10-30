export const reactiveMap = new WeakMap<any, Map<string, Set<Function>>>()

let activeEffect: Function | null;
export function watchEffect(f: Function) {
  const effect = () => {
    activeEffect = effect;
    f();
    activeEffect = null;
  }
  return effect();
}

export function computed(f: Function) {
  const effect = () => {
    activeEffect = f;
    const value = f();
    activeEffect = null;
    return typeof value !== 'object' ? state({value}) : state(value)
  }
  return effect();
}

const handler = {
  set(target: object, key, newValue) {
    if (newValue === target[key]) return true;
    target[key] = newValue;
    
    const targetMap = reactiveMap.get(target);
    const effectSet = targetMap?.get(key);
    effectSet?.forEach(effect => effect());
    console.log(reactiveMap.get(target));
    
    return true;
  },
  get(target: object, key: string) {
    const value = target[key];

    const targetMap = reactiveMap.get(target);
    if(targetMap && activeEffect) {
      const effects = targetMap.get(key);
      if(!effects) {
        const effectSet = new Set<Function>;
        effectSet.add(activeEffect);
        targetMap.set(key, effectSet);
      }
      effects?.add(activeEffect);
    } else if(!targetMap && activeEffect) {
      const effectMap = new Map<string, Set<Function>>;
      reactiveMap.set(target, effectMap)
      const effectSet = new Set<Function>;
      effectMap.set(key, effectSet);
      effectSet.add(activeEffect);
    }

    return value;
  }
}

export function state<T extends object>(initialValue: T): T {
  Object.entries(initialValue).forEach(([key, value]) => {
    if (typeof value === 'object') {
      initialValue[key] = state(value);
    }
  });

  return new Proxy<T>(initialValue, handler);
}
