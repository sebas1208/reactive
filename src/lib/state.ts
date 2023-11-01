type Effect = Function;

export const reactiveMap = new WeakMap<object, Map<string, Set<Effect>>>()

export function state<T extends object, K extends keyof T>(initialValue: T): T {
  return new Proxy<T>(initialValue, {
    set(target, key, newValue) {
      // If the same value return
      if (newValue === target[key as K]) return true;
      // Set the value on the target object
      target[key as K] = newValue;

      return true;
    },
    get(target, key) {
      // Get the value from the target
      const value = target[key as K];
      
      return value;
    }
  });
}










export function watchEffect(f: Effect) {

}
