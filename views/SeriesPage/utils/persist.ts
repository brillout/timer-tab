import assert from "@brillout/assert";

export { persist };

function persist({ key, serializer, deserializer }) {
  return function <T extends { new (...args: any[]): {} }>(cls: T) {
    return class extends cls {
      constructor(...args) {
        super(...args);
        deserialize(this);
      }
      save() {
        serialize(this);
      }
    };
  };

  function serialize(instance) {
    const data = serializer(instance);
    assert(
      data.every((d) => d.counter_id && d.counter_target),
      data
    );
    window.localStorage[key] = JSON.stringify(data);
  }

  function deserialize(instance) {
    let data;
    const data__str = window.localStorage[key];
    if (data__str) {
      data = JSON.parse(data__str);
    } else {
      data = [];
    }
    deserializer(data, instance);
  }
}
