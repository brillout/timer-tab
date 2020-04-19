import { store, view } from "@risingstack/react-easy-state";

export { reactiveView };

function reactiveView(cls) {
  const cls__proxied = new Proxy(cls, {
    construct(target, args, newTarget) {
      const instance = Reflect.construct(target, args, newTarget);
      const instance__observed = store(instance);
      instance__observed.view = view((...args) => {
        return cls.prototype.view.apply(instance__observed, args);
      });
      return instance__observed;
    },
  });
  return cls__proxied;
}
