import assert from "@brillout/assert";
import { store } from "../../../tab-utils/store";
import { customAlphabet } from "nanoid";

const idFieldSymbol = Symbol();
const ID = Symbol("ID");

export { persist, ID };

function persist(schema) {
  const idField = retrieve_id_field(schema);

  let clsName;

  return function <T extends { new (...args: any[]): {} }>(cls: T) {
    clsName = cls.name;
    assert(clsName);

    return class extends cls {
      constructor(...args: any[]) {
        super(...args);
        load(this, args);
      }
      save() {
        save(this);
      }
      static [idFieldSymbol] = idField;
    };
  };

  function save(instance) {
    const data: object = extract_schema_data(instance);
    validate_save_data({ data });
    store_set(instance, data);
  }

  function load(instance, args) {
    const data = {};

    const instance_id = instance[idField] || args[0][idField];
    if (instance_id) data[idField] = instance_id;

    if (instance_id && store_has(instance_id)) {
      const data__from_store: object = store_get(instance_id);
      assert(data__from_store.constructor === Object);
      assert(data__from_store[idField] === data[idField]);
      construct_relations(data__from_store);
      Object.assign(data, data__from_store);
    }

    const data__defaults = compute_defaults(data, instance);
    Object.assign(data, data__defaults);

    validate_load_data({ data, instance });
    Object.assign(instance, data);
  }

  function extract_schema_data(instance) {
    const data = {};
    Object.keys(schema).forEach((key) => {
      const val = instance[key];
      assert_todo(val);
      if (val.constructor === Array) {
        data[key] = val.map((entry) => {
          return retrieve_val(entry);
        });
      } else {
        data[key] = retrieve_val(val);
      }
    });
    return data;

    function retrieve_val(thing) {
      const idField = thing.constructor[idFieldSymbol];
      if (!idField) {
        return thing;
      }
      thing.save();
      return { [idField]: thing[idField] };
    }
  }

  function construct_relations(data: object) {
    Object.entries(schema).forEach(([field, field_type]: [string, any]) => {
      if ([ID, String, Number, Date].includes(field_type)) {
        return;
      } else if (field_type.constructor === Array) {
        assert(field_type.length === 1);
        const entry_type = field_type[0];
        assert(entry_type.constructor === Function);
        const entries = data[field];
        assert(entries.constructor === Array);
        data[field] = entries.map(
          (entry_data: any) => new entry_type(entry_data)
        );
      } else {
        assert_todo(false);
      }
    });
  }

  function compute_defaults(data: object, instance): object {
    const data__defaults = {};
    Object.entries(schema)
      .filter(([field]) => instance[field] === undefined)
      .filter(([field]) => data[field] === undefined)
      .forEach(([field, field_type]) => {
        if (field === idField) {
          data__defaults[field] = generate_id();
        } else if (field_type.constructor === Array) {
          data__defaults[field] = [];
        } else {
          assert_todo(false, "Couldn't compute default for " + field, {
            data,
            instance,
          });
        }
      });
    return data__defaults;
  }

  function validate_save_data({ data }) {
    validate({ data, will_be_saved: true });
  }
  function validate_load_data({ data, instance }) {
    validate({ data, instance });
  }
  function validate({ data, instance = null, will_be_saved = false }) {
    assert(will_be_saved || instance);
    Object.keys(schema).forEach((field) => {
      assert(
        field in data || (instance && field in instance),
        field,
        data,
        schema
      );
    });
    Object.entries(data).forEach(([field, val]: [string, any]) => {
      const field_type = schema[field];
      assert(field_type);
      if (field_type === ID) {
        assert.usage([String, Number].includes(val.constructor));
      } else if ([String, Number, Date].includes(field_type)) {
        assert.usage(val.constructor === field_type, field, field_type, val);
      } else if (field_type.constructor === Array) {
        assert(val.constructor === Array);
        assert(field_type.length === 1);
        const entry_type = field_type[0];
        val.forEach((entry: any) => {
          if (will_be_saved) {
            const entry_keys = Object.keys(entry);
            const entry_idField = entry_keys[0];
            /* Doesn't work when entry is a subtype of entry_type
            assert(entry_idField === entry_type[idFieldSymbol]);
	    */
            assert(entry_keys.length === 1);
            assert(entry[entry_idField]);
          } else {
            assert(entry instanceof entry_type, field, entry);
          }
        });
      } else {
        assert_todo(false, field_type, field);
      }
    });
  }

  function store_has(instance_id): boolean {
    const key: string = construct_storage_key({ instance_id });
    return store.has_val(key);
  }

  function store_set(instance, data) {
    const key: string = construct_storage_key({ instance });
    store.set_val(key, data);
  }

  function store_get(instance_id): object {
    const key: string = construct_storage_key({ instance_id });
    const data: object = store.get_val(key);
    return data;
  }

  function construct_storage_key({ instance = null, instance_id = null }) {
    instance_id = instance_id || get_id(instance);
    assert(instance_id);
    assert(clsName);
    const storage_key: string = clsName + "_" + instance_id;
    return storage_key;
  }

  function get_id(instance) {
    const instance_id = instance[idField];
    assert(instance_id);
    return instance_id;
  }
}

function assert_todo(...args: any[]) {
  assert(...args);
}

function generate_id() {
  const nanoid = customAlphabet(
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz",
    8
  );
  const uid = nanoid(); //=> "FwGcLB7e"
  return uid;
}

function retrieve_id_field(schema): string {
  const id_fields = Object.entries(schema)
    .map(([key, val]) => (val === ID ? key : null))
    .filter(Boolean);
  assert.usage(id_fields.length === 1);
  return id_fields[0];
}
