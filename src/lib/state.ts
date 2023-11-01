type Effect = Function;

export const reactiveMap = new WeakMap<object, Map<string, Set<Effect>>>()

let activeEffect: Effect | null;
// Sets the effect as active, runs the effect and set it as null
export function watchEffect(f: Effect) {
  const effect = () => {
    activeEffect = effect;
    f();
    activeEffect = null;
  };

  effect();
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

      // Get all the effects from the reactiveMap and run them
      const targetMap = reactiveMap.get(target);
      const effectSet = targetMap?.get(String(key));
      effectSet?.forEach(effect => effect());

      return true;
    },
    get(target, key: keyof object) {
      // Get the value from the target
      const value = target[key];
      // If not active effect return the value
      if(!activeEffect) return value;

      // Get the reactivity map of the target
      const targetMap = reactiveMap.get(target);
      // If targetMap exists add the new effect
      if (targetMap) {
        // Gets or creates the effect set and sets it in the map
        const effectSet = targetMap.get(key) ?? new Set<Effect>;
        targetMap.set(key , effectSet);
        // Adds the running effect
        effectSet?.add(activeEffect);
      } else {
        // New effect set
        const effectSet = new Set<Effect>;
        effectSet.add(activeEffect);

        // New effect map
        const effectMap = new Map<string, Set<Effect>>;
        effectMap.set(key, effectSet);
        
        // Add to the global map
        reactiveMap.set(target, effectMap)
      }

      return value;
    }
  });
}
