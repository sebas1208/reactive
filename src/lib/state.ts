type Effect = Function;

// Sets the effect as active, runs the effect and set it as null
export function watchEffect(f: Function) {

}

export function state<T extends object, K extends keyof T>(initialValue: T): T {
  // Makes deep objects reactive too
  Object.entries(initialValue).forEach(([key, value]) => {
    if (typeof value === 'object') {
      initialValue[(key as keyof T)] = state(value);
    }
  });

  return new Proxy<T>(initialValue, {
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
      
      return value;
    }
  });
}
