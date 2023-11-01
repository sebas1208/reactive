export const reactiveMap = new WeakMap<object, Map<string, Set<Function>>>()

// Sets the effect as active, runs the effect and set it as null
export function watchEffect(f: Function) {

}

function createHandler<T extends object, K extends keyof T>(): ProxyHandler<T> {
  return {
    set(target, key, newValue) {
      // If the same value return
      if (newValue === target[key as K]) return true;
      // Set the value on the target object
      target[key as K] = newValue;

      // Get all the effects from the reactiveMap and run

      return true;
    },
    get(target, key) {
      // Get the value from the target
      const value = target[key as K];

      // Get the reactivity effects
      
      return value;
    }
  }
}

export function state<T extends object>(initialValue: T): T {
  return new Proxy<T>(initialValue, createHandler());
}
