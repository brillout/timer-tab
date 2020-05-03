import assert from "@brillout/assert";
import { store } from "../../../tab-utils/store";
import { customAlphabet } from "nanoid";

const idFieldSymbol = Symbol("idField");
const clsNameSymbol = Symbol("clsName");
const isPersistedClass = Symbol("isPersistedClass");
const ID = Symbol("ID");
const get_pointer = Symbol("get_pointer");

type ClassName = string;
type PersistedProps = object;
type IdField = string;
type Schema = object;
type IdVal = string;

export { persist, ID };

const persisted_classes = [];

interface InstancePointer {
  instance_id: IdVal;
  instance_type: ClassName;
}
interface StorageData {
  instance_props: PersistedProps;
  instance_type: ClassName;
}

function persist(schema: Schema) {
  const id_field: IdField = retrieve_id_field(schema);

  let clsName: ClassName;

  return function <T extends { new (...args: any[]): {} }>(cls: T) {
    clsName = cls.name;
    assert(clsName);

    class cls_extended extends cls {
      constructor(...args: any[]) {
        super(...args);
        load(this, args);
      }
      save() {
        save(this);
      }
      static [idFieldSymbol]: IdField = id_field;
      static [clsNameSymbol]: ClassName = clsName;
      static [isPersistedClass] = true;

      [get_pointer](): InstancePointer {
        const instance_id = this[id_field];
        assert(instance_id.constructor === String);
        const pointer_data: InstancePointer = {
          instance_id,
          instance_type: clsName,
        };
        return pointer_data;
      }
    }

    persisted_classes.push(cls_extended);

    return cls_extended;
  };

  function save(instance) {
    const data: StorageData = extract_storage_data(instance);
    store_set(instance, data);
  }

  function load(instance, args) {
    const persisted_props: PersistedProps = {};

    const instance_id = instance[id_field] || args[0][id_field];
    if (instance_id) persisted_props[id_field] = instance_id;

    if (instance_id && store_has(instance_id)) {
      const data: StorageData = store_get(instance_id);
      assert(data.instance_props[id_field] === persisted_props[id_field]);
      construct_relations(data);
      Object.assign(persisted_props, data.instance_props);
    }

    const data__defaults = compute_defaults(persisted_props, instance);
    Object.assign(persisted_props, data__defaults);

    validate_instance_props(persisted_props, instance);
    Object.assign(instance, persisted_props);
  }

  function extract_storage_data(instance): StorageData {
    const instance_props = {};
    Object.keys(schema).forEach((key) => {
      const val = instance[key];
      if (val === undefined) {
        return;
      } else if (val && val.constructor === Array) {
        instance_props[key] = val.map(retrieve_prop_data);
      } else {
        instance_props[key] = retrieve_prop_data(val);
      }
    });
    const data: StorageData = {
      instance_type: clsName,
      instance_props,
    };
    return data;

    function retrieve_prop_data<T>(thing: T): T | InstancePointer {
      if (
        !thing ||
        thing.constructor === String ||
        thing.constructor === Number ||
        thing.constructor === Date ||
        thing.constructor === Boolean
      ) {
        return thing;
      }
      if (thing && thing.constructor[isPersistedClass]) {
        // @ts-ignore
        thing.save();
        return thing[get_pointer]();
      }
      assert_todo(false, thing.constructor);
    }
  }

  function construct_relations(data: StorageData) {
    const { instance_props } = data;
    Object.entries(schema).forEach(([field, field_type]: [string, any]) => {
      if ([ID, String, Number, Date, Boolean].includes(field_type)) {
        return;
      } else if (field_type.constructor === Array) {
        assert(field_type.length === 1);
        const entry_type__todo = field_type[0];
        assert(entry_type__todo.constructor === Function);
        const entries = instance_props[field];
        assert(entries.constructor === Array);
        instance_props[field] = entries.map((entry_data: InstancePointer) => {
          const entry_cls = find_class(entry_data.instance_type);
          assert(entry_cls[isPersistedClass]);
          const entry_instance = new entry_cls(entry_data.instance_id);
          return entry_instance;
        });
      } else {
        assert_todo(false);
      }
    });
  }

  function find_class<T extends { new (...args: any[]): {} }>(
    instance_type: ClassName
  ): T {
    const matches = persisted_classes.filter(
      (cls) => cls[clsNameSymbol] === instance_type
    );
    assert(matches.length === 1, { instance_type, matches });
    return matches[0];
  }

  function compute_defaults(data: object, instance): object {
    const data__defaults = {};
    Object.entries(schema)
      .filter(([field]) => instance[field] === undefined)
      .filter(([field]) => data[field] === undefined)
      .forEach(([field, field_type]) => {
        if (field === id_field) {
          data__defaults[field] = generate_id();
        }
        /* else if (field_type.constructor === Array) {
          data__defaults[field] = [];
        } else {
          assert_todo(false, "Couldn't compute default for " + field, {
            data,
            instance,
          });
        }
	*/
      });
    return data__defaults;
  }

  function validate_storage_data(data: StorageData) {
    validate(data.instance_props, { is_storage_data: true });
  }
  function validate_instance_props(persisted_props: PersistedProps, instance) {
    validate(persisted_props, { instance });
  }
  function validate(
    instance_props: object,
    { instance = null, is_storage_data = false }
  ) {
    assert(instance_props);
    assert(!!is_storage_data !== !!instance);
    Object.keys(schema).forEach((field) => {
      assert(field in instance_props || (instance && field in instance), {
        field,
        is_storage_data,
        instance_props,
        schema,
      });
    });
    Object.entries(instance_props).forEach(([field, val]: [string, any]) => {
      const field_type = schema[field];
      assert(field_type);
      if (field_type === ID) {
        assert.usage([String, Number].includes(val.constructor));
      } else if ([String, Number, Date, Boolean].includes(field_type)) {
        assert.usage(
          val === null ||
            (!isNaN(val) &&
              val !== undefined &&
              val.constructor === field_type),
          {
            field,
            field_type,
            val,
          }
        );
      } else if (field_type.constructor === Array) {
        assert(val.constructor === Array);
        assert(field_type.length === 1);
        const entry_type = field_type[0];
        val.forEach((entry) => {
          if (!is_storage_data) {
            assert(entry instanceof entry_type, field, entry);
          } else {
            const instance_pointer: InstancePointer = entry;
            const entry_keys = Object.keys(instance_pointer);
            const { instance_id, instance_type } = instance_pointer;
            assert(
              entry_keys.length === 2 &&
                instance_id.constructor === String &&
                instance_type.constructor === String,
              { instance_pointer, instance_props }
            );
            const entry_cls = find_class(instance_type);
            assert(entry_cls);
            /*
            const entry_idField = entry_keys[0];
            assert(instance_pointer[entry_idField]);
	    */
            /* Doesn't work when instance_pointer is a subtype of entry_type
            assert(entry_idField === entry_type[idFieldSymbol]);
	    */
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

  function store_set(instance, data: StorageData) {
    const key: string = construct_storage_key({ instance });
    validate_storage_data(data);
    store.set_val(key, data);
  }

  function store_get(instance_id: string): StorageData {
    const key: string = construct_storage_key({ instance_id });
    const data: StorageData = store.get_val(key);
    validate_storage_data(data);
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
    const instance_id = instance[id_field];
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

function retrieve_id_field(schema: Schema): IdField {
  const id_fields = Object.entries(schema)
    .map(([key, val]) => (val === ID ? key : null))
    .filter(Boolean);
  assert.usage(id_fields.length === 1);
  return id_fields[0];
}
