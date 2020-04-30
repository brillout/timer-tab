import assert from "@brillout/assert";
import { store } from "../../../tab-utils/store";

export { persist };

function persist({
  storageKey,
  isSingleton,
  clsName,
  data: dataSchema,
  dataType,
}) {
  assert(isSingleton === false);
  assert(clsName.constructor === String);

  return function <T extends { new (...args: any[]): {} }>(cls: T) {
    return class extends cls {
      constructor(...args: any[]) {
        super(...args);
        deserialize(this);
      }
      save() {
        serialize(this);
      }
    };
  };

  function serialize(instance) {
    const data: object = extract_schema_data(instance);
    validate_schema_instance(data);
    store_set(instance, data);
  }

  function deserialize(instance) {
    let data: object;
    if (!store_has(instance)) {
      data = get_schema_default_instance();
    } else {
      data = store_get(instance);
    }
    validate_schema_instance(data);
    assert(data.constructor === Object);

    if (dataType) {
      data = apply_data_type(data, dataType);
    }

    Object.assign(instance, data);
  }

  function store_has(instance): boolean {
    const key: string = construct_storage_key(instance);
    return store.has_val(key);
  }

  function store_set(instance, data) {
    const key: string = construct_storage_key(instance);
    store.set_val(key, data);
  }

  function store_get(instance) {
    const key: string = construct_storage_key(instance);
    const data: object = store.get_val(key);
    return data;
  }

  function construct_storage_key(instance) {
    const storage_key: string = clsName + "_" + storageKey(instance);
    return storage_key;
  }

  function extract_schema_data(instance) {
    const data = {};
    Object.keys(dataSchema).forEach((key) => {
      data[key] = instance[key];
    });
    return data;
  }
  function get_schema_default_instance(): object {
    const data = {};
    Object.entries(dataSchema).forEach(([key, val]) => {
      assert_todo(val.constructor === Array);
      data[key] = [];
    });
    return data;
  }
  function validate_schema_instance(data: object) {
    Object.keys(dataSchema).forEach((key) => {
      assert(key in data);
    });
    Object.entries(data).forEach(([key, val]) => {
      const propSchema = dataSchema[key];
      assert(propSchema);
      const propType = propSchema.constructor;
      assert_todo(propType === Array);
      assert(val.constructor === propType);
    });
  }
}

function apply_data_type(data: object, dataType: object) {
  Object.entries(dataType).forEach(([key, val]) => {
    if (val.constructor === Array) {
      assert(val.length === 1);
      const entryType = val[0];
      assert(entryType.constructor === Function);
      const current = data[key];
      assert(current.constructor === Array);
      data[key] = current.map((entryData: any) => new entryType(entryData));
    } else {
      assert_todo(false);
    }
  });
  return data;
}

function assert_todo(...args: any[]) {
  assert(...args);
}
