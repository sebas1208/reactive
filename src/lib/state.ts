interface InvoiceItem {
  description: string;
  quantity: number;
  value: number;
}

interface Invoice {
  total: number;
  items: InvoiceItem[],
}

export const reactiveMap = new WeakMap<any, Map<string, Set<Function>>>()

let activeEffect: Function | null;
export function watchEffect(f: Function) {
  const effect = () => {
    activeEffect = effect;
    const value = f();
    activeEffect = null;
    return value;
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
  set(target: Invoice, key: keyof Invoice, newValue: Invoice[keyof Invoice]) {
    console.log('Setting a value', target, newValue);
    // console.log('New Value', newValue, 'Old Value', target[key], newValue !== target[key]);
    if (newValue == target[key]) return true;
    target[key] = newValue;
    
    const targetMap = reactiveMap.get(target);
    const effectSet = targetMap?.get(key);
    effectSet?.forEach(effect => effect());
    
    return true;
  },
  get(target, key: keyof Invoice) {
    const value = target[key];

    const targetMap = reactiveMap.get(target);
    if (!targetMap && activeEffect) {
      const effectMap = new Map<string, Set<Function>>;
      const effectSet = new Set<Function>;
      effectSet.add(activeEffect);
      effectMap.set(key, effectSet);
      reactiveMap.set(target, effectMap)
    }

    return value;
  }
}
export function state(initialValue: object): Invoice {
  Object.entries(initialValue).forEach(([key, value]) => {
    if (typeof value === 'object') {
      initialValue[key] = state(value);
    }
  });

  return new Proxy(initialValue, handler);
}
