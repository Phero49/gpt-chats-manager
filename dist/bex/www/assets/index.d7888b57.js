function makeMap(str, expectsLowerCase) {
  const map = /* @__PURE__ */ Object.create(null);
  const list = str.split(",");
  for (let i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase ? (val) => !!map[val.toLowerCase()] : (val) => !!map[val];
}
const EMPTY_OBJ = {};
const EMPTY_ARR = [];
const NOOP = () => {
};
const NO = () => false;
const onRE = /^on[^a-z]/;
const isOn = (key) => onRE.test(key);
const isModelListener = (key) => key.startsWith("onUpdate:");
const extend = Object.assign;
const remove = (arr, el) => {
  const i = arr.indexOf(el);
  if (i > -1) {
    arr.splice(i, 1);
  }
};
const hasOwnProperty$1 = Object.prototype.hasOwnProperty;
const hasOwn = (val, key) => hasOwnProperty$1.call(val, key);
const isArray$1 = Array.isArray;
const isMap = (val) => toTypeString(val) === "[object Map]";
const isSet = (val) => toTypeString(val) === "[object Set]";
const isFunction = (val) => typeof val === "function";
const isString = (val) => typeof val === "string";
const isSymbol = (val) => typeof val === "symbol";
const isObject$1 = (val) => val !== null && typeof val === "object";
const isPromise = (val) => {
  return isObject$1(val) && isFunction(val.then) && isFunction(val.catch);
};
const objectToString = Object.prototype.toString;
const toTypeString = (value) => objectToString.call(value);
const toRawType = (value) => {
  return toTypeString(value).slice(8, -1);
};
const isPlainObject$1 = (val) => toTypeString(val) === "[object Object]";
const isIntegerKey = (key) => isString(key) && key !== "NaN" && key[0] !== "-" && "" + parseInt(key, 10) === key;
const isReservedProp = /* @__PURE__ */ makeMap(
  ",key,ref,ref_for,ref_key,onVnodeBeforeMount,onVnodeMounted,onVnodeBeforeUpdate,onVnodeUpdated,onVnodeBeforeUnmount,onVnodeUnmounted"
);
const cacheStringFunction = (fn) => {
  const cache = /* @__PURE__ */ Object.create(null);
  return (str) => {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
};
const camelizeRE = /-(\w)/g;
const camelize = cacheStringFunction((str) => {
  return str.replace(camelizeRE, (_, c) => c ? c.toUpperCase() : "");
});
const hyphenateRE = /\B([A-Z])/g;
const hyphenate = cacheStringFunction(
  (str) => str.replace(hyphenateRE, "-$1").toLowerCase()
);
const capitalize = cacheStringFunction(
  (str) => str.charAt(0).toUpperCase() + str.slice(1)
);
const toHandlerKey = cacheStringFunction(
  (str) => str ? `on${capitalize(str)}` : ``
);
const hasChanged = (value, oldValue) => !Object.is(value, oldValue);
const invokeArrayFns = (fns, arg) => {
  for (let i = 0; i < fns.length; i++) {
    fns[i](arg);
  }
};
const def = (obj, key, value) => {
  Object.defineProperty(obj, key, {
    configurable: true,
    enumerable: false,
    value
  });
};
const looseToNumber = (val) => {
  const n = parseFloat(val);
  return isNaN(n) ? val : n;
};
const toNumber = (val) => {
  const n = isString(val) ? Number(val) : NaN;
  return isNaN(n) ? val : n;
};
let _globalThis;
const getGlobalThis = () => {
  return _globalThis || (_globalThis = typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : {});
};
function normalizeStyle(value) {
  if (isArray$1(value)) {
    const res = {};
    for (let i = 0; i < value.length; i++) {
      const item = value[i];
      const normalized = isString(item) ? parseStringStyle(item) : normalizeStyle(item);
      if (normalized) {
        for (const key in normalized) {
          res[key] = normalized[key];
        }
      }
    }
    return res;
  } else if (isString(value)) {
    return value;
  } else if (isObject$1(value)) {
    return value;
  }
}
const listDelimiterRE = /;(?![^(]*\))/g;
const propertyDelimiterRE = /:([^]+)/;
const styleCommentRE = /\/\*[^]*?\*\//g;
function parseStringStyle(cssText) {
  const ret = {};
  cssText.replace(styleCommentRE, "").split(listDelimiterRE).forEach((item) => {
    if (item) {
      const tmp = item.split(propertyDelimiterRE);
      tmp.length > 1 && (ret[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return ret;
}
function normalizeClass(value) {
  let res = "";
  if (isString(value)) {
    res = value;
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      const normalized = normalizeClass(value[i]);
      if (normalized) {
        res += normalized + " ";
      }
    }
  } else if (isObject$1(value)) {
    for (const name in value) {
      if (value[name]) {
        res += name + " ";
      }
    }
  }
  return res.trim();
}
const specialBooleanAttrs = `itemscope,allowfullscreen,formnovalidate,ismap,nomodule,novalidate,readonly`;
const isSpecialBooleanAttr = /* @__PURE__ */ makeMap(specialBooleanAttrs);
function includeBooleanAttr(value) {
  return !!value || value === "";
}
const toDisplayString = (val) => {
  return isString(val) ? val : val == null ? "" : isArray$1(val) || isObject$1(val) && (val.toString === objectToString || !isFunction(val.toString)) ? JSON.stringify(val, replacer, 2) : String(val);
};
const replacer = (_key, val) => {
  if (val && val.__v_isRef) {
    return replacer(_key, val.value);
  } else if (isMap(val)) {
    return {
      [`Map(${val.size})`]: [...val.entries()].reduce((entries, [key, val2]) => {
        entries[`${key} =>`] = val2;
        return entries;
      }, {})
    };
  } else if (isSet(val)) {
    return {
      [`Set(${val.size})`]: [...val.values()]
    };
  } else if (isObject$1(val) && !isArray$1(val) && !isPlainObject$1(val)) {
    return String(val);
  }
  return val;
};
let activeEffectScope;
class EffectScope {
  constructor(detached = false) {
    this.detached = detached;
    this._active = true;
    this.effects = [];
    this.cleanups = [];
    this.parent = activeEffectScope;
    if (!detached && activeEffectScope) {
      this.index = (activeEffectScope.scopes || (activeEffectScope.scopes = [])).push(
        this
      ) - 1;
    }
  }
  get active() {
    return this._active;
  }
  run(fn) {
    if (this._active) {
      const currentEffectScope = activeEffectScope;
      try {
        activeEffectScope = this;
        return fn();
      } finally {
        activeEffectScope = currentEffectScope;
      }
    }
  }
  on() {
    activeEffectScope = this;
  }
  off() {
    activeEffectScope = this.parent;
  }
  stop(fromParent) {
    if (this._active) {
      let i, l;
      for (i = 0, l = this.effects.length; i < l; i++) {
        this.effects[i].stop();
      }
      for (i = 0, l = this.cleanups.length; i < l; i++) {
        this.cleanups[i]();
      }
      if (this.scopes) {
        for (i = 0, l = this.scopes.length; i < l; i++) {
          this.scopes[i].stop(true);
        }
      }
      if (!this.detached && this.parent && !fromParent) {
        const last = this.parent.scopes.pop();
        if (last && last !== this) {
          this.parent.scopes[this.index] = last;
          last.index = this.index;
        }
      }
      this.parent = void 0;
      this._active = false;
    }
  }
}
function effectScope(detached) {
  return new EffectScope(detached);
}
function recordEffectScope(effect, scope = activeEffectScope) {
  if (scope && scope.active) {
    scope.effects.push(effect);
  }
}
function getCurrentScope() {
  return activeEffectScope;
}
function onScopeDispose(fn) {
  if (activeEffectScope) {
    activeEffectScope.cleanups.push(fn);
  }
}
const createDep = (effects) => {
  const dep = new Set(effects);
  dep.w = 0;
  dep.n = 0;
  return dep;
};
const wasTracked = (dep) => (dep.w & trackOpBit) > 0;
const newTracked = (dep) => (dep.n & trackOpBit) > 0;
const initDepMarkers = ({ deps }) => {
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].w |= trackOpBit;
    }
  }
};
const finalizeDepMarkers = (effect) => {
  const { deps } = effect;
  if (deps.length) {
    let ptr = 0;
    for (let i = 0; i < deps.length; i++) {
      const dep = deps[i];
      if (wasTracked(dep) && !newTracked(dep)) {
        dep.delete(effect);
      } else {
        deps[ptr++] = dep;
      }
      dep.w &= ~trackOpBit;
      dep.n &= ~trackOpBit;
    }
    deps.length = ptr;
  }
};
const targetMap = /* @__PURE__ */ new WeakMap();
let effectTrackDepth = 0;
let trackOpBit = 1;
const maxMarkerBits = 30;
let activeEffect;
const ITERATE_KEY = Symbol("");
const MAP_KEY_ITERATE_KEY = Symbol("");
class ReactiveEffect {
  constructor(fn, scheduler = null, scope) {
    this.fn = fn;
    this.scheduler = scheduler;
    this.active = true;
    this.deps = [];
    this.parent = void 0;
    recordEffectScope(this, scope);
  }
  run() {
    if (!this.active) {
      return this.fn();
    }
    let parent = activeEffect;
    let lastShouldTrack = shouldTrack;
    while (parent) {
      if (parent === this) {
        return;
      }
      parent = parent.parent;
    }
    try {
      this.parent = activeEffect;
      activeEffect = this;
      shouldTrack = true;
      trackOpBit = 1 << ++effectTrackDepth;
      if (effectTrackDepth <= maxMarkerBits) {
        initDepMarkers(this);
      } else {
        cleanupEffect(this);
      }
      return this.fn();
    } finally {
      if (effectTrackDepth <= maxMarkerBits) {
        finalizeDepMarkers(this);
      }
      trackOpBit = 1 << --effectTrackDepth;
      activeEffect = this.parent;
      shouldTrack = lastShouldTrack;
      this.parent = void 0;
      if (this.deferStop) {
        this.stop();
      }
    }
  }
  stop() {
    if (activeEffect === this) {
      this.deferStop = true;
    } else if (this.active) {
      cleanupEffect(this);
      if (this.onStop) {
        this.onStop();
      }
      this.active = false;
    }
  }
}
function cleanupEffect(effect2) {
  const { deps } = effect2;
  if (deps.length) {
    for (let i = 0; i < deps.length; i++) {
      deps[i].delete(effect2);
    }
    deps.length = 0;
  }
}
let shouldTrack = true;
const trackStack = [];
function pauseTracking() {
  trackStack.push(shouldTrack);
  shouldTrack = false;
}
function resetTracking() {
  const last = trackStack.pop();
  shouldTrack = last === void 0 ? true : last;
}
function track(target2, type, key) {
  if (shouldTrack && activeEffect) {
    let depsMap = targetMap.get(target2);
    if (!depsMap) {
      targetMap.set(target2, depsMap = /* @__PURE__ */ new Map());
    }
    let dep = depsMap.get(key);
    if (!dep) {
      depsMap.set(key, dep = createDep());
    }
    trackEffects(dep);
  }
}
function trackEffects(dep, debuggerEventExtraInfo) {
  let shouldTrack2 = false;
  if (effectTrackDepth <= maxMarkerBits) {
    if (!newTracked(dep)) {
      dep.n |= trackOpBit;
      shouldTrack2 = !wasTracked(dep);
    }
  } else {
    shouldTrack2 = !dep.has(activeEffect);
  }
  if (shouldTrack2) {
    dep.add(activeEffect);
    activeEffect.deps.push(dep);
  }
}
function trigger$1(target2, type, key, newValue, oldValue, oldTarget) {
  const depsMap = targetMap.get(target2);
  if (!depsMap) {
    return;
  }
  let deps = [];
  if (type === "clear") {
    deps = [...depsMap.values()];
  } else if (key === "length" && isArray$1(target2)) {
    const newLength = Number(newValue);
    depsMap.forEach((dep, key2) => {
      if (key2 === "length" || key2 >= newLength) {
        deps.push(dep);
      }
    });
  } else {
    if (key !== void 0) {
      deps.push(depsMap.get(key));
    }
    switch (type) {
      case "add":
        if (!isArray$1(target2)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target2)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        } else if (isIntegerKey(key)) {
          deps.push(depsMap.get("length"));
        }
        break;
      case "delete":
        if (!isArray$1(target2)) {
          deps.push(depsMap.get(ITERATE_KEY));
          if (isMap(target2)) {
            deps.push(depsMap.get(MAP_KEY_ITERATE_KEY));
          }
        }
        break;
      case "set":
        if (isMap(target2)) {
          deps.push(depsMap.get(ITERATE_KEY));
        }
        break;
    }
  }
  if (deps.length === 1) {
    if (deps[0]) {
      {
        triggerEffects(deps[0]);
      }
    }
  } else {
    const effects = [];
    for (const dep of deps) {
      if (dep) {
        effects.push(...dep);
      }
    }
    {
      triggerEffects(createDep(effects));
    }
  }
}
function triggerEffects(dep, debuggerEventExtraInfo) {
  const effects = isArray$1(dep) ? dep : [...dep];
  for (const effect2 of effects) {
    if (effect2.computed) {
      triggerEffect(effect2);
    }
  }
  for (const effect2 of effects) {
    if (!effect2.computed) {
      triggerEffect(effect2);
    }
  }
}
function triggerEffect(effect2, debuggerEventExtraInfo) {
  if (effect2 !== activeEffect || effect2.allowRecurse) {
    if (effect2.scheduler) {
      effect2.scheduler();
    } else {
      effect2.run();
    }
  }
}
function getDepFromReactive(object, key) {
  var _a;
  return (_a = targetMap.get(object)) == null ? void 0 : _a.get(key);
}
const isNonTrackableKeys = /* @__PURE__ */ makeMap(`__proto__,__v_isRef,__isVue`);
const builtInSymbols = new Set(
  /* @__PURE__ */ Object.getOwnPropertyNames(Symbol).filter((key) => key !== "arguments" && key !== "caller").map((key) => Symbol[key]).filter(isSymbol)
);
const get$1 = /* @__PURE__ */ createGetter();
const shallowGet = /* @__PURE__ */ createGetter(false, true);
const readonlyGet = /* @__PURE__ */ createGetter(true);
const arrayInstrumentations = /* @__PURE__ */ createArrayInstrumentations();
function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function(...args) {
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function(...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
function hasOwnProperty(key) {
  const obj = toRaw(this);
  track(obj, "has", key);
  return obj.hasOwnProperty(key);
}
function createGetter(isReadonly2 = false, shallow = false) {
  return function get2(target2, key, receiver) {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_isShallow") {
      return shallow;
    } else if (key === "__v_raw" && receiver === (isReadonly2 ? shallow ? shallowReadonlyMap : readonlyMap : shallow ? shallowReactiveMap : reactiveMap).get(target2)) {
      return target2;
    }
    const targetIsArray = isArray$1(target2);
    if (!isReadonly2) {
      if (targetIsArray && hasOwn(arrayInstrumentations, key)) {
        return Reflect.get(arrayInstrumentations, key, receiver);
      }
      if (key === "hasOwnProperty") {
        return hasOwnProperty;
      }
    }
    const res = Reflect.get(target2, key, receiver);
    if (isSymbol(key) ? builtInSymbols.has(key) : isNonTrackableKeys(key)) {
      return res;
    }
    if (!isReadonly2) {
      track(target2, "get", key);
    }
    if (shallow) {
      return res;
    }
    if (isRef(res)) {
      return targetIsArray && isIntegerKey(key) ? res : res.value;
    }
    if (isObject$1(res)) {
      return isReadonly2 ? readonly(res) : reactive(res);
    }
    return res;
  };
}
const set$1 = /* @__PURE__ */ createSetter();
const shallowSet = /* @__PURE__ */ createSetter(true);
function createSetter(shallow = false) {
  return function set2(target2, key, value, receiver) {
    let oldValue = target2[key];
    if (isReadonly(oldValue) && isRef(oldValue) && !isRef(value)) {
      return false;
    }
    if (!shallow) {
      if (!isShallow(value) && !isReadonly(value)) {
        oldValue = toRaw(oldValue);
        value = toRaw(value);
      }
      if (!isArray$1(target2) && isRef(oldValue) && !isRef(value)) {
        oldValue.value = value;
        return true;
      }
    }
    const hadKey = isArray$1(target2) && isIntegerKey(key) ? Number(key) < target2.length : hasOwn(target2, key);
    const result = Reflect.set(target2, key, value, receiver);
    if (target2 === toRaw(receiver)) {
      if (!hadKey) {
        trigger$1(target2, "add", key, value);
      } else if (hasChanged(value, oldValue)) {
        trigger$1(target2, "set", key, value);
      }
    }
    return result;
  };
}
function deleteProperty(target2, key) {
  const hadKey = hasOwn(target2, key);
  target2[key];
  const result = Reflect.deleteProperty(target2, key);
  if (result && hadKey) {
    trigger$1(target2, "delete", key, void 0);
  }
  return result;
}
function has$1(target2, key) {
  const result = Reflect.has(target2, key);
  if (!isSymbol(key) || !builtInSymbols.has(key)) {
    track(target2, "has", key);
  }
  return result;
}
function ownKeys(target2) {
  track(target2, "iterate", isArray$1(target2) ? "length" : ITERATE_KEY);
  return Reflect.ownKeys(target2);
}
const mutableHandlers = {
  get: get$1,
  set: set$1,
  deleteProperty,
  has: has$1,
  ownKeys
};
const readonlyHandlers = {
  get: readonlyGet,
  set(target2, key) {
    return true;
  },
  deleteProperty(target2, key) {
    return true;
  }
};
const shallowReactiveHandlers = /* @__PURE__ */ extend(
  {},
  mutableHandlers,
  {
    get: shallowGet,
    set: shallowSet
  }
);
const toShallow = (value) => value;
const getProto = (v) => Reflect.getPrototypeOf(v);
function get(target2, key, isReadonly2 = false, isShallow2 = false) {
  target2 = target2["__v_raw"];
  const rawTarget = toRaw(target2);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "get", key);
    }
    track(rawTarget, "get", rawKey);
  }
  const { has: has2 } = getProto(rawTarget);
  const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
  if (has2.call(rawTarget, key)) {
    return wrap(target2.get(key));
  } else if (has2.call(rawTarget, rawKey)) {
    return wrap(target2.get(rawKey));
  } else if (target2 !== rawTarget) {
    target2.get(key);
  }
}
function has(key, isReadonly2 = false) {
  const target2 = this["__v_raw"];
  const rawTarget = toRaw(target2);
  const rawKey = toRaw(key);
  if (!isReadonly2) {
    if (key !== rawKey) {
      track(rawTarget, "has", key);
    }
    track(rawTarget, "has", rawKey);
  }
  return key === rawKey ? target2.has(key) : target2.has(key) || target2.has(rawKey);
}
function size$1(target2, isReadonly2 = false) {
  target2 = target2["__v_raw"];
  !isReadonly2 && track(toRaw(target2), "iterate", ITERATE_KEY);
  return Reflect.get(target2, "size", target2);
}
function add(value) {
  value = toRaw(value);
  const target2 = toRaw(this);
  const proto = getProto(target2);
  const hadKey = proto.has.call(target2, value);
  if (!hadKey) {
    target2.add(value);
    trigger$1(target2, "add", value, value);
  }
  return this;
}
function set(key, value) {
  value = toRaw(value);
  const target2 = toRaw(this);
  const { has: has2, get: get2 } = getProto(target2);
  let hadKey = has2.call(target2, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target2, key);
  }
  const oldValue = get2.call(target2, key);
  target2.set(key, value);
  if (!hadKey) {
    trigger$1(target2, "add", key, value);
  } else if (hasChanged(value, oldValue)) {
    trigger$1(target2, "set", key, value);
  }
  return this;
}
function deleteEntry(key) {
  const target2 = toRaw(this);
  const { has: has2, get: get2 } = getProto(target2);
  let hadKey = has2.call(target2, key);
  if (!hadKey) {
    key = toRaw(key);
    hadKey = has2.call(target2, key);
  }
  get2 ? get2.call(target2, key) : void 0;
  const result = target2.delete(key);
  if (hadKey) {
    trigger$1(target2, "delete", key, void 0);
  }
  return result;
}
function clear() {
  const target2 = toRaw(this);
  const hadItems = target2.size !== 0;
  const result = target2.clear();
  if (hadItems) {
    trigger$1(target2, "clear", void 0, void 0);
  }
  return result;
}
function createForEach(isReadonly2, isShallow2) {
  return function forEach(callback, thisArg) {
    const observed = this;
    const target2 = observed["__v_raw"];
    const rawTarget = toRaw(target2);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(rawTarget, "iterate", ITERATE_KEY);
    return target2.forEach((value, key) => {
      return callback.call(thisArg, wrap(value), wrap(key), observed);
    });
  };
}
function createIterableMethod(method, isReadonly2, isShallow2) {
  return function(...args) {
    const target2 = this["__v_raw"];
    const rawTarget = toRaw(target2);
    const targetIsMap = isMap(rawTarget);
    const isPair = method === "entries" || method === Symbol.iterator && targetIsMap;
    const isKeyOnly = method === "keys" && targetIsMap;
    const innerIterator = target2[method](...args);
    const wrap = isShallow2 ? toShallow : isReadonly2 ? toReadonly : toReactive;
    !isReadonly2 && track(
      rawTarget,
      "iterate",
      isKeyOnly ? MAP_KEY_ITERATE_KEY : ITERATE_KEY
    );
    return {
      next() {
        const { value, done } = innerIterator.next();
        return done ? { value, done } : {
          value: isPair ? [wrap(value[0]), wrap(value[1])] : wrap(value),
          done
        };
      },
      [Symbol.iterator]() {
        return this;
      }
    };
  };
}
function createReadonlyMethod(type) {
  return function(...args) {
    return type === "delete" ? false : this;
  };
}
function createInstrumentations() {
  const mutableInstrumentations2 = {
    get(key) {
      return get(this, key);
    },
    get size() {
      return size$1(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, false)
  };
  const shallowInstrumentations2 = {
    get(key) {
      return get(this, key, false, true);
    },
    get size() {
      return size$1(this);
    },
    has,
    add,
    set,
    delete: deleteEntry,
    clear,
    forEach: createForEach(false, true)
  };
  const readonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, false)
  };
  const shallowReadonlyInstrumentations2 = {
    get(key) {
      return get(this, key, true, true);
    },
    get size() {
      return size$1(this, true);
    },
    has(key) {
      return has.call(this, key, true);
    },
    add: createReadonlyMethod("add"),
    set: createReadonlyMethod("set"),
    delete: createReadonlyMethod("delete"),
    clear: createReadonlyMethod("clear"),
    forEach: createForEach(true, true)
  };
  const iteratorMethods = ["keys", "values", "entries", Symbol.iterator];
  iteratorMethods.forEach((method) => {
    mutableInstrumentations2[method] = createIterableMethod(
      method,
      false,
      false
    );
    readonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      false
    );
    shallowInstrumentations2[method] = createIterableMethod(
      method,
      false,
      true
    );
    shallowReadonlyInstrumentations2[method] = createIterableMethod(
      method,
      true,
      true
    );
  });
  return [
    mutableInstrumentations2,
    readonlyInstrumentations2,
    shallowInstrumentations2,
    shallowReadonlyInstrumentations2
  ];
}
const [
  mutableInstrumentations,
  readonlyInstrumentations,
  shallowInstrumentations,
  shallowReadonlyInstrumentations
] = /* @__PURE__ */ createInstrumentations();
function createInstrumentationGetter(isReadonly2, shallow) {
  const instrumentations = shallow ? isReadonly2 ? shallowReadonlyInstrumentations : shallowInstrumentations : isReadonly2 ? readonlyInstrumentations : mutableInstrumentations;
  return (target2, key, receiver) => {
    if (key === "__v_isReactive") {
      return !isReadonly2;
    } else if (key === "__v_isReadonly") {
      return isReadonly2;
    } else if (key === "__v_raw") {
      return target2;
    }
    return Reflect.get(
      hasOwn(instrumentations, key) && key in target2 ? instrumentations : target2,
      key,
      receiver
    );
  };
}
const mutableCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, false)
};
const shallowCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(false, true)
};
const readonlyCollectionHandlers = {
  get: /* @__PURE__ */ createInstrumentationGetter(true, false)
};
const reactiveMap = /* @__PURE__ */ new WeakMap();
const shallowReactiveMap = /* @__PURE__ */ new WeakMap();
const readonlyMap = /* @__PURE__ */ new WeakMap();
const shallowReadonlyMap = /* @__PURE__ */ new WeakMap();
function targetTypeMap(rawType) {
  switch (rawType) {
    case "Object":
    case "Array":
      return 1;
    case "Map":
    case "Set":
    case "WeakMap":
    case "WeakSet":
      return 2;
    default:
      return 0;
  }
}
function getTargetType(value) {
  return value["__v_skip"] || !Object.isExtensible(value) ? 0 : targetTypeMap(toRawType(value));
}
function reactive(target2) {
  if (isReadonly(target2)) {
    return target2;
  }
  return createReactiveObject(
    target2,
    false,
    mutableHandlers,
    mutableCollectionHandlers,
    reactiveMap
  );
}
function shallowReactive(target2) {
  return createReactiveObject(
    target2,
    false,
    shallowReactiveHandlers,
    shallowCollectionHandlers,
    shallowReactiveMap
  );
}
function readonly(target2) {
  return createReactiveObject(
    target2,
    true,
    readonlyHandlers,
    readonlyCollectionHandlers,
    readonlyMap
  );
}
function createReactiveObject(target2, isReadonly2, baseHandlers, collectionHandlers, proxyMap) {
  if (!isObject$1(target2)) {
    return target2;
  }
  if (target2["__v_raw"] && !(isReadonly2 && target2["__v_isReactive"])) {
    return target2;
  }
  const existingProxy = proxyMap.get(target2);
  if (existingProxy) {
    return existingProxy;
  }
  const targetType = getTargetType(target2);
  if (targetType === 0) {
    return target2;
  }
  const proxy = new Proxy(
    target2,
    targetType === 2 ? collectionHandlers : baseHandlers
  );
  proxyMap.set(target2, proxy);
  return proxy;
}
function isReactive(value) {
  if (isReadonly(value)) {
    return isReactive(value["__v_raw"]);
  }
  return !!(value && value["__v_isReactive"]);
}
function isReadonly(value) {
  return !!(value && value["__v_isReadonly"]);
}
function isShallow(value) {
  return !!(value && value["__v_isShallow"]);
}
function isProxy(value) {
  return isReactive(value) || isReadonly(value);
}
function toRaw(observed) {
  const raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}
function markRaw(value) {
  def(value, "__v_skip", true);
  return value;
}
const toReactive = (value) => isObject$1(value) ? reactive(value) : value;
const toReadonly = (value) => isObject$1(value) ? readonly(value) : value;
function trackRefValue(ref2) {
  if (shouldTrack && activeEffect) {
    ref2 = toRaw(ref2);
    {
      trackEffects(ref2.dep || (ref2.dep = createDep()));
    }
  }
}
function triggerRefValue(ref2, newVal) {
  ref2 = toRaw(ref2);
  const dep = ref2.dep;
  if (dep) {
    {
      triggerEffects(dep);
    }
  }
}
function isRef(r) {
  return !!(r && r.__v_isRef === true);
}
function ref(value) {
  return createRef(value, false);
}
function shallowRef(value) {
  return createRef(value, true);
}
function createRef(rawValue, shallow) {
  if (isRef(rawValue)) {
    return rawValue;
  }
  return new RefImpl(rawValue, shallow);
}
class RefImpl {
  constructor(value, __v_isShallow) {
    this.__v_isShallow = __v_isShallow;
    this.dep = void 0;
    this.__v_isRef = true;
    this._rawValue = __v_isShallow ? value : toRaw(value);
    this._value = __v_isShallow ? value : toReactive(value);
  }
  get value() {
    trackRefValue(this);
    return this._value;
  }
  set value(newVal) {
    const useDirectValue = this.__v_isShallow || isShallow(newVal) || isReadonly(newVal);
    newVal = useDirectValue ? newVal : toRaw(newVal);
    if (hasChanged(newVal, this._rawValue)) {
      this._rawValue = newVal;
      this._value = useDirectValue ? newVal : toReactive(newVal);
      triggerRefValue(this);
    }
  }
}
function unref(ref2) {
  return isRef(ref2) ? ref2.value : ref2;
}
const shallowUnwrapHandlers = {
  get: (target2, key, receiver) => unref(Reflect.get(target2, key, receiver)),
  set: (target2, key, value, receiver) => {
    const oldValue = target2[key];
    if (isRef(oldValue) && !isRef(value)) {
      oldValue.value = value;
      return true;
    } else {
      return Reflect.set(target2, key, value, receiver);
    }
  }
};
function proxyRefs(objectWithRefs) {
  return isReactive(objectWithRefs) ? objectWithRefs : new Proxy(objectWithRefs, shallowUnwrapHandlers);
}
function toRefs(object) {
  const ret = isArray$1(object) ? new Array(object.length) : {};
  for (const key in object) {
    ret[key] = propertyToRef(object, key);
  }
  return ret;
}
class ObjectRefImpl {
  constructor(_object, _key, _defaultValue) {
    this._object = _object;
    this._key = _key;
    this._defaultValue = _defaultValue;
    this.__v_isRef = true;
  }
  get value() {
    const val = this._object[this._key];
    return val === void 0 ? this._defaultValue : val;
  }
  set value(newVal) {
    this._object[this._key] = newVal;
  }
  get dep() {
    return getDepFromReactive(toRaw(this._object), this._key);
  }
}
function propertyToRef(source, key, defaultValue) {
  const val = source[key];
  return isRef(val) ? val : new ObjectRefImpl(
    source,
    key,
    defaultValue
  );
}
class ComputedRefImpl {
  constructor(getter, _setter, isReadonly2, isSSR) {
    this._setter = _setter;
    this.dep = void 0;
    this.__v_isRef = true;
    this["__v_isReadonly"] = false;
    this._dirty = true;
    this.effect = new ReactiveEffect(getter, () => {
      if (!this._dirty) {
        this._dirty = true;
        triggerRefValue(this);
      }
    });
    this.effect.computed = this;
    this.effect.active = this._cacheable = !isSSR;
    this["__v_isReadonly"] = isReadonly2;
  }
  get value() {
    const self2 = toRaw(this);
    trackRefValue(self2);
    if (self2._dirty || !self2._cacheable) {
      self2._dirty = false;
      self2._value = self2.effect.run();
    }
    return self2._value;
  }
  set value(newValue) {
    this._setter(newValue);
  }
}
function computed$1(getterOrOptions, debugOptions, isSSR = false) {
  let getter;
  let setter;
  const onlyGetter = isFunction(getterOrOptions);
  if (onlyGetter) {
    getter = getterOrOptions;
    setter = NOOP;
  } else {
    getter = getterOrOptions.get;
    setter = getterOrOptions.set;
  }
  const cRef = new ComputedRefImpl(getter, setter, onlyGetter || !setter, isSSR);
  return cRef;
}
function warn(msg, ...args) {
  return;
}
function callWithErrorHandling(fn, instance, type, args) {
  let res;
  try {
    res = args ? fn(...args) : fn();
  } catch (err) {
    handleError(err, instance, type);
  }
  return res;
}
function callWithAsyncErrorHandling(fn, instance, type, args) {
  if (isFunction(fn)) {
    const res = callWithErrorHandling(fn, instance, type, args);
    if (res && isPromise(res)) {
      res.catch((err) => {
        handleError(err, instance, type);
      });
    }
    return res;
  }
  const values = [];
  for (let i = 0; i < fn.length; i++) {
    values.push(callWithAsyncErrorHandling(fn[i], instance, type, args));
  }
  return values;
}
function handleError(err, instance, type, throwInDev = true) {
  const contextVNode = instance ? instance.vnode : null;
  if (instance) {
    let cur = instance.parent;
    const exposedInstance = instance.proxy;
    const errorInfo = type;
    while (cur) {
      const errorCapturedHooks = cur.ec;
      if (errorCapturedHooks) {
        for (let i = 0; i < errorCapturedHooks.length; i++) {
          if (errorCapturedHooks[i](err, exposedInstance, errorInfo) === false) {
            return;
          }
        }
      }
      cur = cur.parent;
    }
    const appErrorHandler = instance.appContext.config.errorHandler;
    if (appErrorHandler) {
      callWithErrorHandling(
        appErrorHandler,
        null,
        10,
        [err, exposedInstance, errorInfo]
      );
      return;
    }
  }
  logError$1(err, type, contextVNode, throwInDev);
}
function logError$1(err, type, contextVNode, throwInDev = true) {
  {
    console.error(err);
  }
}
let isFlushing = false;
let isFlushPending = false;
const queue$1 = [];
let flushIndex = 0;
const pendingPostFlushCbs = [];
let activePostFlushCbs = null;
let postFlushIndex = 0;
const resolvedPromise = /* @__PURE__ */ Promise.resolve();
let currentFlushPromise = null;
function nextTick(fn) {
  const p2 = currentFlushPromise || resolvedPromise;
  return fn ? p2.then(this ? fn.bind(this) : fn) : p2;
}
function findInsertionIndex(id) {
  let start2 = flushIndex + 1;
  let end = queue$1.length;
  while (start2 < end) {
    const middle = start2 + end >>> 1;
    const middleJobId = getId(queue$1[middle]);
    middleJobId < id ? start2 = middle + 1 : end = middle;
  }
  return start2;
}
function queueJob(job) {
  if (!queue$1.length || !queue$1.includes(
    job,
    isFlushing && job.allowRecurse ? flushIndex + 1 : flushIndex
  )) {
    if (job.id == null) {
      queue$1.push(job);
    } else {
      queue$1.splice(findInsertionIndex(job.id), 0, job);
    }
    queueFlush();
  }
}
function queueFlush() {
  if (!isFlushing && !isFlushPending) {
    isFlushPending = true;
    currentFlushPromise = resolvedPromise.then(flushJobs);
  }
}
function invalidateJob(job) {
  const i = queue$1.indexOf(job);
  if (i > flushIndex) {
    queue$1.splice(i, 1);
  }
}
function queuePostFlushCb(cb) {
  if (!isArray$1(cb)) {
    if (!activePostFlushCbs || !activePostFlushCbs.includes(
      cb,
      cb.allowRecurse ? postFlushIndex + 1 : postFlushIndex
    )) {
      pendingPostFlushCbs.push(cb);
    }
  } else {
    pendingPostFlushCbs.push(...cb);
  }
  queueFlush();
}
function flushPreFlushCbs(seen2, i = isFlushing ? flushIndex + 1 : 0) {
  for (; i < queue$1.length; i++) {
    const cb = queue$1[i];
    if (cb && cb.pre) {
      queue$1.splice(i, 1);
      i--;
      cb();
    }
  }
}
function flushPostFlushCbs(seen2) {
  if (pendingPostFlushCbs.length) {
    const deduped = [...new Set(pendingPostFlushCbs)];
    pendingPostFlushCbs.length = 0;
    if (activePostFlushCbs) {
      activePostFlushCbs.push(...deduped);
      return;
    }
    activePostFlushCbs = deduped;
    activePostFlushCbs.sort((a, b) => getId(a) - getId(b));
    for (postFlushIndex = 0; postFlushIndex < activePostFlushCbs.length; postFlushIndex++) {
      activePostFlushCbs[postFlushIndex]();
    }
    activePostFlushCbs = null;
    postFlushIndex = 0;
  }
}
const getId = (job) => job.id == null ? Infinity : job.id;
const comparator = (a, b) => {
  const diff = getId(a) - getId(b);
  if (diff === 0) {
    if (a.pre && !b.pre)
      return -1;
    if (b.pre && !a.pre)
      return 1;
  }
  return diff;
};
function flushJobs(seen2) {
  isFlushPending = false;
  isFlushing = true;
  queue$1.sort(comparator);
  const check = NOOP;
  try {
    for (flushIndex = 0; flushIndex < queue$1.length; flushIndex++) {
      const job = queue$1[flushIndex];
      if (job && job.active !== false) {
        if (false)
          ;
        callWithErrorHandling(job, null, 14);
      }
    }
  } finally {
    flushIndex = 0;
    queue$1.length = 0;
    flushPostFlushCbs();
    isFlushing = false;
    currentFlushPromise = null;
    if (queue$1.length || pendingPostFlushCbs.length) {
      flushJobs();
    }
  }
}
function emit(instance, event, ...rawArgs) {
  if (instance.isUnmounted)
    return;
  const props2 = instance.vnode.props || EMPTY_OBJ;
  let args = rawArgs;
  const isModelListener2 = event.startsWith("update:");
  const modelArg = isModelListener2 && event.slice(7);
  if (modelArg && modelArg in props2) {
    const modifiersKey = `${modelArg === "modelValue" ? "model" : modelArg}Modifiers`;
    const { number, trim } = props2[modifiersKey] || EMPTY_OBJ;
    if (trim) {
      args = rawArgs.map((a) => isString(a) ? a.trim() : a);
    }
    if (number) {
      args = rawArgs.map(looseToNumber);
    }
  }
  let handlerName;
  let handler = props2[handlerName = toHandlerKey(event)] || props2[handlerName = toHandlerKey(camelize(event))];
  if (!handler && isModelListener2) {
    handler = props2[handlerName = toHandlerKey(hyphenate(event))];
  }
  if (handler) {
    callWithAsyncErrorHandling(
      handler,
      instance,
      6,
      args
    );
  }
  const onceHandler = props2[handlerName + `Once`];
  if (onceHandler) {
    if (!instance.emitted) {
      instance.emitted = {};
    } else if (instance.emitted[handlerName]) {
      return;
    }
    instance.emitted[handlerName] = true;
    callWithAsyncErrorHandling(
      onceHandler,
      instance,
      6,
      args
    );
  }
}
function normalizeEmitsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.emitsCache;
  const cached = cache.get(comp);
  if (cached !== void 0) {
    return cached;
  }
  const raw = comp.emits;
  let normalized = {};
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendEmits = (raw2) => {
      const normalizedFromExtend = normalizeEmitsOptions(raw2, appContext, true);
      if (normalizedFromExtend) {
        hasExtends = true;
        extend(normalized, normalizedFromExtend);
      }
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendEmits);
    }
    if (comp.extends) {
      extendEmits(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendEmits);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, null);
    }
    return null;
  }
  if (isArray$1(raw)) {
    raw.forEach((key) => normalized[key] = null);
  } else {
    extend(normalized, raw);
  }
  if (isObject$1(comp)) {
    cache.set(comp, normalized);
  }
  return normalized;
}
function isEmitListener(options, key) {
  if (!options || !isOn(key)) {
    return false;
  }
  key = key.slice(2).replace(/Once$/, "");
  return hasOwn(options, key[0].toLowerCase() + key.slice(1)) || hasOwn(options, hyphenate(key)) || hasOwn(options, key);
}
let currentRenderingInstance = null;
let currentScopeId = null;
function setCurrentRenderingInstance(instance) {
  const prev = currentRenderingInstance;
  currentRenderingInstance = instance;
  currentScopeId = instance && instance.type.__scopeId || null;
  return prev;
}
function pushScopeId(id) {
  currentScopeId = id;
}
function popScopeId() {
  currentScopeId = null;
}
function withCtx(fn, ctx = currentRenderingInstance, isNonScopedSlot) {
  if (!ctx)
    return fn;
  if (fn._n) {
    return fn;
  }
  const renderFnWithContext = (...args) => {
    if (renderFnWithContext._d) {
      setBlockTracking(-1);
    }
    const prevInstance = setCurrentRenderingInstance(ctx);
    let res;
    try {
      res = fn(...args);
    } finally {
      setCurrentRenderingInstance(prevInstance);
      if (renderFnWithContext._d) {
        setBlockTracking(1);
      }
    }
    return res;
  };
  renderFnWithContext._n = true;
  renderFnWithContext._c = true;
  renderFnWithContext._d = true;
  return renderFnWithContext;
}
function markAttrsAccessed() {
}
function renderComponentRoot(instance) {
  const {
    type: Component,
    vnode,
    proxy,
    withProxy,
    props: props2,
    propsOptions: [propsOptions],
    slots,
    attrs,
    emit: emit3,
    render,
    renderCache,
    data,
    setupState,
    ctx,
    inheritAttrs
  } = instance;
  let result;
  let fallthroughAttrs;
  const prev = setCurrentRenderingInstance(instance);
  try {
    if (vnode.shapeFlag & 4) {
      const proxyToUse = withProxy || proxy;
      result = normalizeVNode(
        render.call(
          proxyToUse,
          proxyToUse,
          renderCache,
          props2,
          setupState,
          data,
          ctx
        )
      );
      fallthroughAttrs = attrs;
    } else {
      const render2 = Component;
      if (false)
        ;
      result = normalizeVNode(
        render2.length > 1 ? render2(
          props2,
          false ? {
            get attrs() {
              markAttrsAccessed();
              return attrs;
            },
            slots,
            emit: emit3
          } : { attrs, slots, emit: emit3 }
        ) : render2(
          props2,
          null
        )
      );
      fallthroughAttrs = Component.props ? attrs : getFunctionalFallthrough(attrs);
    }
  } catch (err) {
    blockStack.length = 0;
    handleError(err, instance, 1);
    result = createVNode(Comment);
  }
  let root = result;
  if (fallthroughAttrs && inheritAttrs !== false) {
    const keys = Object.keys(fallthroughAttrs);
    const { shapeFlag } = root;
    if (keys.length) {
      if (shapeFlag & (1 | 6)) {
        if (propsOptions && keys.some(isModelListener)) {
          fallthroughAttrs = filterModelListeners(
            fallthroughAttrs,
            propsOptions
          );
        }
        root = cloneVNode(root, fallthroughAttrs);
      }
    }
  }
  if (vnode.dirs) {
    root = cloneVNode(root);
    root.dirs = root.dirs ? root.dirs.concat(vnode.dirs) : vnode.dirs;
  }
  if (vnode.transition) {
    root.transition = vnode.transition;
  }
  {
    result = root;
  }
  setCurrentRenderingInstance(prev);
  return result;
}
const getFunctionalFallthrough = (attrs) => {
  let res;
  for (const key in attrs) {
    if (key === "class" || key === "style" || isOn(key)) {
      (res || (res = {}))[key] = attrs[key];
    }
  }
  return res;
};
const filterModelListeners = (attrs, props2) => {
  const res = {};
  for (const key in attrs) {
    if (!isModelListener(key) || !(key.slice(9) in props2)) {
      res[key] = attrs[key];
    }
  }
  return res;
};
function shouldUpdateComponent(prevVNode, nextVNode, optimized) {
  const { props: prevProps, children: prevChildren, component } = prevVNode;
  const { props: nextProps, children: nextChildren, patchFlag } = nextVNode;
  const emits = component.emitsOptions;
  if (nextVNode.dirs || nextVNode.transition) {
    return true;
  }
  if (optimized && patchFlag >= 0) {
    if (patchFlag & 1024) {
      return true;
    }
    if (patchFlag & 16) {
      if (!prevProps) {
        return !!nextProps;
      }
      return hasPropsChanged(prevProps, nextProps, emits);
    } else if (patchFlag & 8) {
      const dynamicProps = nextVNode.dynamicProps;
      for (let i = 0; i < dynamicProps.length; i++) {
        const key = dynamicProps[i];
        if (nextProps[key] !== prevProps[key] && !isEmitListener(emits, key)) {
          return true;
        }
      }
    }
  } else {
    if (prevChildren || nextChildren) {
      if (!nextChildren || !nextChildren.$stable) {
        return true;
      }
    }
    if (prevProps === nextProps) {
      return false;
    }
    if (!prevProps) {
      return !!nextProps;
    }
    if (!nextProps) {
      return true;
    }
    return hasPropsChanged(prevProps, nextProps, emits);
  }
  return false;
}
function hasPropsChanged(prevProps, nextProps, emitsOptions) {
  const nextKeys = Object.keys(nextProps);
  if (nextKeys.length !== Object.keys(prevProps).length) {
    return true;
  }
  for (let i = 0; i < nextKeys.length; i++) {
    const key = nextKeys[i];
    if (nextProps[key] !== prevProps[key] && !isEmitListener(emitsOptions, key)) {
      return true;
    }
  }
  return false;
}
function updateHOCHostEl({ vnode, parent }, el) {
  while (parent && parent.subTree === vnode) {
    (vnode = parent.vnode).el = el;
    parent = parent.parent;
  }
}
const isSuspense = (type) => type.__isSuspense;
function queueEffectWithSuspense(fn, suspense) {
  if (suspense && suspense.pendingBranch) {
    if (isArray$1(fn)) {
      suspense.effects.push(...fn);
    } else {
      suspense.effects.push(fn);
    }
  } else {
    queuePostFlushCb(fn);
  }
}
const INITIAL_WATCHER_VALUE = {};
function watch(source, cb, options) {
  return doWatch(source, cb, options);
}
function doWatch(source, cb, { immediate, deep, flush, onTrack, onTrigger } = EMPTY_OBJ) {
  var _a;
  const instance = getCurrentScope() === ((_a = currentInstance) == null ? void 0 : _a.scope) ? currentInstance : null;
  let getter;
  let forceTrigger = false;
  let isMultiSource = false;
  if (isRef(source)) {
    getter = () => source.value;
    forceTrigger = isShallow(source);
  } else if (isReactive(source)) {
    getter = () => source;
    deep = true;
  } else if (isArray$1(source)) {
    isMultiSource = true;
    forceTrigger = source.some((s) => isReactive(s) || isShallow(s));
    getter = () => source.map((s) => {
      if (isRef(s)) {
        return s.value;
      } else if (isReactive(s)) {
        return traverse(s);
      } else if (isFunction(s)) {
        return callWithErrorHandling(s, instance, 2);
      } else
        ;
    });
  } else if (isFunction(source)) {
    if (cb) {
      getter = () => callWithErrorHandling(source, instance, 2);
    } else {
      getter = () => {
        if (instance && instance.isUnmounted) {
          return;
        }
        if (cleanup) {
          cleanup();
        }
        return callWithAsyncErrorHandling(
          source,
          instance,
          3,
          [onCleanup]
        );
      };
    }
  } else {
    getter = NOOP;
  }
  if (cb && deep) {
    const baseGetter = getter;
    getter = () => traverse(baseGetter());
  }
  let cleanup;
  let onCleanup = (fn) => {
    cleanup = effect.onStop = () => {
      callWithErrorHandling(fn, instance, 4);
    };
  };
  let ssrCleanup;
  if (isInSSRComponentSetup) {
    onCleanup = NOOP;
    if (!cb) {
      getter();
    } else if (immediate) {
      callWithAsyncErrorHandling(cb, instance, 3, [
        getter(),
        isMultiSource ? [] : void 0,
        onCleanup
      ]);
    }
    if (flush === "sync") {
      const ctx = useSSRContext();
      ssrCleanup = ctx.__watcherHandles || (ctx.__watcherHandles = []);
    } else {
      return NOOP;
    }
  }
  let oldValue = isMultiSource ? new Array(source.length).fill(INITIAL_WATCHER_VALUE) : INITIAL_WATCHER_VALUE;
  const job = () => {
    if (!effect.active) {
      return;
    }
    if (cb) {
      const newValue = effect.run();
      if (deep || forceTrigger || (isMultiSource ? newValue.some(
        (v, i) => hasChanged(v, oldValue[i])
      ) : hasChanged(newValue, oldValue)) || false) {
        if (cleanup) {
          cleanup();
        }
        callWithAsyncErrorHandling(cb, instance, 3, [
          newValue,
          oldValue === INITIAL_WATCHER_VALUE ? void 0 : isMultiSource && oldValue[0] === INITIAL_WATCHER_VALUE ? [] : oldValue,
          onCleanup
        ]);
        oldValue = newValue;
      }
    } else {
      effect.run();
    }
  };
  job.allowRecurse = !!cb;
  let scheduler;
  if (flush === "sync") {
    scheduler = job;
  } else if (flush === "post") {
    scheduler = () => queuePostRenderEffect(job, instance && instance.suspense);
  } else {
    job.pre = true;
    if (instance)
      job.id = instance.uid;
    scheduler = () => queueJob(job);
  }
  const effect = new ReactiveEffect(getter, scheduler);
  if (cb) {
    if (immediate) {
      job();
    } else {
      oldValue = effect.run();
    }
  } else if (flush === "post") {
    queuePostRenderEffect(
      effect.run.bind(effect),
      instance && instance.suspense
    );
  } else {
    effect.run();
  }
  const unwatch = () => {
    effect.stop();
    if (instance && instance.scope) {
      remove(instance.scope.effects, effect);
    }
  };
  if (ssrCleanup)
    ssrCleanup.push(unwatch);
  return unwatch;
}
function instanceWatch(source, value, options) {
  const publicThis = this.proxy;
  const getter = isString(source) ? source.includes(".") ? createPathGetter(publicThis, source) : () => publicThis[source] : source.bind(publicThis, publicThis);
  let cb;
  if (isFunction(value)) {
    cb = value;
  } else {
    cb = value.handler;
    options = value;
  }
  const cur = currentInstance;
  setCurrentInstance(this);
  const res = doWatch(getter, cb.bind(publicThis), options);
  if (cur) {
    setCurrentInstance(cur);
  } else {
    unsetCurrentInstance();
  }
  return res;
}
function createPathGetter(ctx, path) {
  const segments = path.split(".");
  return () => {
    let cur = ctx;
    for (let i = 0; i < segments.length && cur; i++) {
      cur = cur[segments[i]];
    }
    return cur;
  };
}
function traverse(value, seen2) {
  if (!isObject$1(value) || value["__v_skip"]) {
    return value;
  }
  seen2 = seen2 || /* @__PURE__ */ new Set();
  if (seen2.has(value)) {
    return value;
  }
  seen2.add(value);
  if (isRef(value)) {
    traverse(value.value, seen2);
  } else if (isArray$1(value)) {
    for (let i = 0; i < value.length; i++) {
      traverse(value[i], seen2);
    }
  } else if (isSet(value) || isMap(value)) {
    value.forEach((v) => {
      traverse(v, seen2);
    });
  } else if (isPlainObject$1(value)) {
    for (const key in value) {
      traverse(value[key], seen2);
    }
  }
  return value;
}
function withDirectives(vnode, directives) {
  const internalInstance = currentRenderingInstance;
  if (internalInstance === null) {
    return vnode;
  }
  const instance = getExposeProxy(internalInstance) || internalInstance.proxy;
  const bindings = vnode.dirs || (vnode.dirs = []);
  for (let i = 0; i < directives.length; i++) {
    let [dir, value, arg, modifiers = EMPTY_OBJ] = directives[i];
    if (dir) {
      if (isFunction(dir)) {
        dir = {
          mounted: dir,
          updated: dir
        };
      }
      if (dir.deep) {
        traverse(value);
      }
      bindings.push({
        dir,
        instance,
        value,
        oldValue: void 0,
        arg,
        modifiers
      });
    }
  }
  return vnode;
}
function invokeDirectiveHook(vnode, prevVNode, instance, name) {
  const bindings = vnode.dirs;
  const oldBindings = prevVNode && prevVNode.dirs;
  for (let i = 0; i < bindings.length; i++) {
    const binding = bindings[i];
    if (oldBindings) {
      binding.oldValue = oldBindings[i].value;
    }
    let hook = binding.dir[name];
    if (hook) {
      pauseTracking();
      callWithAsyncErrorHandling(hook, instance, 8, [
        vnode.el,
        binding,
        vnode,
        prevVNode
      ]);
      resetTracking();
    }
  }
}
function useTransitionState() {
  const state = {
    isMounted: false,
    isLeaving: false,
    isUnmounting: false,
    leavingVNodes: /* @__PURE__ */ new Map()
  };
  onMounted(() => {
    state.isMounted = true;
  });
  onBeforeUnmount(() => {
    state.isUnmounting = true;
  });
  return state;
}
const TransitionHookValidator = [Function, Array];
const BaseTransitionPropsValidators = {
  mode: String,
  appear: Boolean,
  persisted: Boolean,
  onBeforeEnter: TransitionHookValidator,
  onEnter: TransitionHookValidator,
  onAfterEnter: TransitionHookValidator,
  onEnterCancelled: TransitionHookValidator,
  onBeforeLeave: TransitionHookValidator,
  onLeave: TransitionHookValidator,
  onAfterLeave: TransitionHookValidator,
  onLeaveCancelled: TransitionHookValidator,
  onBeforeAppear: TransitionHookValidator,
  onAppear: TransitionHookValidator,
  onAfterAppear: TransitionHookValidator,
  onAppearCancelled: TransitionHookValidator
};
const BaseTransitionImpl = {
  name: `BaseTransition`,
  props: BaseTransitionPropsValidators,
  setup(props2, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevTransitionKey;
    return () => {
      const children = slots.default && getTransitionRawChildren(slots.default(), true);
      if (!children || !children.length) {
        return;
      }
      let child = children[0];
      if (children.length > 1) {
        for (const c of children) {
          if (c.type !== Comment) {
            child = c;
            break;
          }
        }
      }
      const rawProps = toRaw(props2);
      const { mode } = rawProps;
      if (state.isLeaving) {
        return emptyPlaceholder(child);
      }
      const innerChild = getKeepAliveChild(child);
      if (!innerChild) {
        return emptyPlaceholder(child);
      }
      const enterHooks = resolveTransitionHooks(
        innerChild,
        rawProps,
        state,
        instance
      );
      setTransitionHooks(innerChild, enterHooks);
      const oldChild = instance.subTree;
      const oldInnerChild = oldChild && getKeepAliveChild(oldChild);
      let transitionKeyChanged = false;
      const { getTransitionKey } = innerChild.type;
      if (getTransitionKey) {
        const key = getTransitionKey();
        if (prevTransitionKey === void 0) {
          prevTransitionKey = key;
        } else if (key !== prevTransitionKey) {
          prevTransitionKey = key;
          transitionKeyChanged = true;
        }
      }
      if (oldInnerChild && oldInnerChild.type !== Comment && (!isSameVNodeType(innerChild, oldInnerChild) || transitionKeyChanged)) {
        const leavingHooks = resolveTransitionHooks(
          oldInnerChild,
          rawProps,
          state,
          instance
        );
        setTransitionHooks(oldInnerChild, leavingHooks);
        if (mode === "out-in") {
          state.isLeaving = true;
          leavingHooks.afterLeave = () => {
            state.isLeaving = false;
            if (instance.update.active !== false) {
              instance.update();
            }
          };
          return emptyPlaceholder(child);
        } else if (mode === "in-out" && innerChild.type !== Comment) {
          leavingHooks.delayLeave = (el, earlyRemove, delayedLeave) => {
            const leavingVNodesCache = getLeavingNodesForType(
              state,
              oldInnerChild
            );
            leavingVNodesCache[String(oldInnerChild.key)] = oldInnerChild;
            el._leaveCb = () => {
              earlyRemove();
              el._leaveCb = void 0;
              delete enterHooks.delayedLeave;
            };
            enterHooks.delayedLeave = delayedLeave;
          };
        }
      }
      return child;
    };
  }
};
const BaseTransition = BaseTransitionImpl;
function getLeavingNodesForType(state, vnode) {
  const { leavingVNodes } = state;
  let leavingVNodesCache = leavingVNodes.get(vnode.type);
  if (!leavingVNodesCache) {
    leavingVNodesCache = /* @__PURE__ */ Object.create(null);
    leavingVNodes.set(vnode.type, leavingVNodesCache);
  }
  return leavingVNodesCache;
}
function resolveTransitionHooks(vnode, props2, state, instance) {
  const {
    appear,
    mode,
    persisted = false,
    onBeforeEnter,
    onEnter,
    onAfterEnter,
    onEnterCancelled,
    onBeforeLeave,
    onLeave,
    onAfterLeave,
    onLeaveCancelled,
    onBeforeAppear,
    onAppear,
    onAfterAppear,
    onAppearCancelled
  } = props2;
  const key = String(vnode.key);
  const leavingVNodesCache = getLeavingNodesForType(state, vnode);
  const callHook2 = (hook, args) => {
    hook && callWithAsyncErrorHandling(
      hook,
      instance,
      9,
      args
    );
  };
  const callAsyncHook = (hook, args) => {
    const done = args[1];
    callHook2(hook, args);
    if (isArray$1(hook)) {
      if (hook.every((hook2) => hook2.length <= 1))
        done();
    } else if (hook.length <= 1) {
      done();
    }
  };
  const hooks = {
    mode,
    persisted,
    beforeEnter(el) {
      let hook = onBeforeEnter;
      if (!state.isMounted) {
        if (appear) {
          hook = onBeforeAppear || onBeforeEnter;
        } else {
          return;
        }
      }
      if (el._leaveCb) {
        el._leaveCb(
          true
        );
      }
      const leavingVNode = leavingVNodesCache[key];
      if (leavingVNode && isSameVNodeType(vnode, leavingVNode) && leavingVNode.el._leaveCb) {
        leavingVNode.el._leaveCb();
      }
      callHook2(hook, [el]);
    },
    enter(el) {
      let hook = onEnter;
      let afterHook = onAfterEnter;
      let cancelHook = onEnterCancelled;
      if (!state.isMounted) {
        if (appear) {
          hook = onAppear || onEnter;
          afterHook = onAfterAppear || onAfterEnter;
          cancelHook = onAppearCancelled || onEnterCancelled;
        } else {
          return;
        }
      }
      let called = false;
      const done = el._enterCb = (cancelled) => {
        if (called)
          return;
        called = true;
        if (cancelled) {
          callHook2(cancelHook, [el]);
        } else {
          callHook2(afterHook, [el]);
        }
        if (hooks.delayedLeave) {
          hooks.delayedLeave();
        }
        el._enterCb = void 0;
      };
      if (hook) {
        callAsyncHook(hook, [el, done]);
      } else {
        done();
      }
    },
    leave(el, remove2) {
      const key2 = String(vnode.key);
      if (el._enterCb) {
        el._enterCb(
          true
        );
      }
      if (state.isUnmounting) {
        return remove2();
      }
      callHook2(onBeforeLeave, [el]);
      let called = false;
      const done = el._leaveCb = (cancelled) => {
        if (called)
          return;
        called = true;
        remove2();
        if (cancelled) {
          callHook2(onLeaveCancelled, [el]);
        } else {
          callHook2(onAfterLeave, [el]);
        }
        el._leaveCb = void 0;
        if (leavingVNodesCache[key2] === vnode) {
          delete leavingVNodesCache[key2];
        }
      };
      leavingVNodesCache[key2] = vnode;
      if (onLeave) {
        callAsyncHook(onLeave, [el, done]);
      } else {
        done();
      }
    },
    clone(vnode2) {
      return resolveTransitionHooks(vnode2, props2, state, instance);
    }
  };
  return hooks;
}
function emptyPlaceholder(vnode) {
  if (isKeepAlive(vnode)) {
    vnode = cloneVNode(vnode);
    vnode.children = null;
    return vnode;
  }
}
function getKeepAliveChild(vnode) {
  return isKeepAlive(vnode) ? vnode.children ? vnode.children[0] : void 0 : vnode;
}
function setTransitionHooks(vnode, hooks) {
  if (vnode.shapeFlag & 6 && vnode.component) {
    setTransitionHooks(vnode.component.subTree, hooks);
  } else if (vnode.shapeFlag & 128) {
    vnode.ssContent.transition = hooks.clone(vnode.ssContent);
    vnode.ssFallback.transition = hooks.clone(vnode.ssFallback);
  } else {
    vnode.transition = hooks;
  }
}
function getTransitionRawChildren(children, keepComment = false, parentKey) {
  let ret = [];
  let keyedFragmentCount = 0;
  for (let i = 0; i < children.length; i++) {
    let child = children[i];
    const key = parentKey == null ? child.key : String(parentKey) + String(child.key != null ? child.key : i);
    if (child.type === Fragment) {
      if (child.patchFlag & 128)
        keyedFragmentCount++;
      ret = ret.concat(
        getTransitionRawChildren(child.children, keepComment, key)
      );
    } else if (keepComment || child.type !== Comment) {
      ret.push(key != null ? cloneVNode(child, { key }) : child);
    }
  }
  if (keyedFragmentCount > 1) {
    for (let i = 0; i < ret.length; i++) {
      ret[i].patchFlag = -2;
    }
  }
  return ret;
}
function defineComponent(options, extraOptions) {
  return isFunction(options) ? /* @__PURE__ */ (() => extend({ name: options.name }, extraOptions, { setup: options }))() : options;
}
const isAsyncWrapper = (i) => !!i.type.__asyncLoader;
const isKeepAlive = (vnode) => vnode.type.__isKeepAlive;
function onActivated(hook, target2) {
  registerKeepAliveHook(hook, "a", target2);
}
function onDeactivated(hook, target2) {
  registerKeepAliveHook(hook, "da", target2);
}
function registerKeepAliveHook(hook, type, target2 = currentInstance) {
  const wrappedHook = hook.__wdc || (hook.__wdc = () => {
    let current = target2;
    while (current) {
      if (current.isDeactivated) {
        return;
      }
      current = current.parent;
    }
    return hook();
  });
  injectHook(type, wrappedHook, target2);
  if (target2) {
    let current = target2.parent;
    while (current && current.parent) {
      if (isKeepAlive(current.parent.vnode)) {
        injectToKeepAliveRoot(wrappedHook, type, target2, current);
      }
      current = current.parent;
    }
  }
}
function injectToKeepAliveRoot(hook, type, target2, keepAliveRoot) {
  const injected = injectHook(
    type,
    hook,
    keepAliveRoot,
    true
  );
  onUnmounted(() => {
    remove(keepAliveRoot[type], injected);
  }, target2);
}
function injectHook(type, hook, target2 = currentInstance, prepend = false) {
  if (target2) {
    const hooks = target2[type] || (target2[type] = []);
    const wrappedHook = hook.__weh || (hook.__weh = (...args) => {
      if (target2.isUnmounted) {
        return;
      }
      pauseTracking();
      setCurrentInstance(target2);
      const res = callWithAsyncErrorHandling(hook, target2, type, args);
      unsetCurrentInstance();
      resetTracking();
      return res;
    });
    if (prepend) {
      hooks.unshift(wrappedHook);
    } else {
      hooks.push(wrappedHook);
    }
    return wrappedHook;
  }
}
const createHook = (lifecycle) => (hook, target2 = currentInstance) => (!isInSSRComponentSetup || lifecycle === "sp") && injectHook(lifecycle, (...args) => hook(...args), target2);
const onBeforeMount = createHook("bm");
const onMounted = createHook("m");
const onBeforeUpdate = createHook("bu");
const onUpdated = createHook("u");
const onBeforeUnmount = createHook("bum");
const onUnmounted = createHook("um");
const onServerPrefetch = createHook("sp");
const onRenderTriggered = createHook(
  "rtg"
);
const onRenderTracked = createHook(
  "rtc"
);
function onErrorCaptured(hook, target2 = currentInstance) {
  injectHook("ec", hook, target2);
}
const COMPONENTS = "components";
function resolveComponent(name, maybeSelfReference) {
  return resolveAsset(COMPONENTS, name, true, maybeSelfReference) || name;
}
const NULL_DYNAMIC_COMPONENT = Symbol.for("v-ndc");
function resolveAsset(type, name, warnMissing = true, maybeSelfReference = false) {
  const instance = currentRenderingInstance || currentInstance;
  if (instance) {
    const Component = instance.type;
    if (type === COMPONENTS) {
      const selfName = getComponentName(
        Component,
        false
      );
      if (selfName && (selfName === name || selfName === camelize(name) || selfName === capitalize(camelize(name)))) {
        return Component;
      }
    }
    const res = resolve(instance[type] || Component[type], name) || resolve(instance.appContext[type], name);
    if (!res && maybeSelfReference) {
      return Component;
    }
    return res;
  }
}
function resolve(registry, name) {
  return registry && (registry[name] || registry[camelize(name)] || registry[capitalize(camelize(name))]);
}
function renderList(source, renderItem, cache, index) {
  let ret;
  const cached = cache && cache[index];
  if (isArray$1(source) || isString(source)) {
    ret = new Array(source.length);
    for (let i = 0, l = source.length; i < l; i++) {
      ret[i] = renderItem(source[i], i, void 0, cached && cached[i]);
    }
  } else if (typeof source === "number") {
    ret = new Array(source);
    for (let i = 0; i < source; i++) {
      ret[i] = renderItem(i + 1, i, void 0, cached && cached[i]);
    }
  } else if (isObject$1(source)) {
    if (source[Symbol.iterator]) {
      ret = Array.from(
        source,
        (item, i) => renderItem(item, i, void 0, cached && cached[i])
      );
    } else {
      const keys = Object.keys(source);
      ret = new Array(keys.length);
      for (let i = 0, l = keys.length; i < l; i++) {
        const key = keys[i];
        ret[i] = renderItem(source[key], key, i, cached && cached[i]);
      }
    }
  } else {
    ret = [];
  }
  if (cache) {
    cache[index] = ret;
  }
  return ret;
}
const getPublicInstance = (i) => {
  if (!i)
    return null;
  if (isStatefulComponent(i))
    return getExposeProxy(i) || i.proxy;
  return getPublicInstance(i.parent);
};
const publicPropertiesMap = /* @__PURE__ */ extend(/* @__PURE__ */ Object.create(null), {
  $: (i) => i,
  $el: (i) => i.vnode.el,
  $data: (i) => i.data,
  $props: (i) => i.props,
  $attrs: (i) => i.attrs,
  $slots: (i) => i.slots,
  $refs: (i) => i.refs,
  $parent: (i) => getPublicInstance(i.parent),
  $root: (i) => getPublicInstance(i.root),
  $emit: (i) => i.emit,
  $options: (i) => resolveMergedOptions(i),
  $forceUpdate: (i) => i.f || (i.f = () => queueJob(i.update)),
  $nextTick: (i) => i.n || (i.n = nextTick.bind(i.proxy)),
  $watch: (i) => instanceWatch.bind(i)
});
const hasSetupBinding = (state, key) => state !== EMPTY_OBJ && !state.__isScriptSetup && hasOwn(state, key);
const PublicInstanceProxyHandlers = {
  get({ _: instance }, key) {
    const { ctx, setupState, data, props: props2, accessCache, type, appContext } = instance;
    let normalizedProps;
    if (key[0] !== "$") {
      const n = accessCache[key];
      if (n !== void 0) {
        switch (n) {
          case 1:
            return setupState[key];
          case 2:
            return data[key];
          case 4:
            return ctx[key];
          case 3:
            return props2[key];
        }
      } else if (hasSetupBinding(setupState, key)) {
        accessCache[key] = 1;
        return setupState[key];
      } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
        accessCache[key] = 2;
        return data[key];
      } else if ((normalizedProps = instance.propsOptions[0]) && hasOwn(normalizedProps, key)) {
        accessCache[key] = 3;
        return props2[key];
      } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
        accessCache[key] = 4;
        return ctx[key];
      } else if (shouldCacheAccess) {
        accessCache[key] = 0;
      }
    }
    const publicGetter = publicPropertiesMap[key];
    let cssModule, globalProperties;
    if (publicGetter) {
      if (key === "$attrs") {
        track(instance, "get", key);
      }
      return publicGetter(instance);
    } else if ((cssModule = type.__cssModules) && (cssModule = cssModule[key])) {
      return cssModule;
    } else if (ctx !== EMPTY_OBJ && hasOwn(ctx, key)) {
      accessCache[key] = 4;
      return ctx[key];
    } else if (globalProperties = appContext.config.globalProperties, hasOwn(globalProperties, key)) {
      {
        return globalProperties[key];
      }
    } else
      ;
  },
  set({ _: instance }, key, value) {
    const { data, setupState, ctx } = instance;
    if (hasSetupBinding(setupState, key)) {
      setupState[key] = value;
      return true;
    } else if (data !== EMPTY_OBJ && hasOwn(data, key)) {
      data[key] = value;
      return true;
    } else if (hasOwn(instance.props, key)) {
      return false;
    }
    if (key[0] === "$" && key.slice(1) in instance) {
      return false;
    } else {
      {
        ctx[key] = value;
      }
    }
    return true;
  },
  has({
    _: { data, setupState, accessCache, ctx, appContext, propsOptions }
  }, key) {
    let normalizedProps;
    return !!accessCache[key] || data !== EMPTY_OBJ && hasOwn(data, key) || hasSetupBinding(setupState, key) || (normalizedProps = propsOptions[0]) && hasOwn(normalizedProps, key) || hasOwn(ctx, key) || hasOwn(publicPropertiesMap, key) || hasOwn(appContext.config.globalProperties, key);
  },
  defineProperty(target2, key, descriptor) {
    if (descriptor.get != null) {
      target2._.accessCache[key] = 0;
    } else if (hasOwn(descriptor, "value")) {
      this.set(target2, key, descriptor.value, null);
    }
    return Reflect.defineProperty(target2, key, descriptor);
  }
};
function normalizePropsOrEmits(props2) {
  return isArray$1(props2) ? props2.reduce(
    (normalized, p2) => (normalized[p2] = null, normalized),
    {}
  ) : props2;
}
let shouldCacheAccess = true;
function applyOptions(instance) {
  const options = resolveMergedOptions(instance);
  const publicThis = instance.proxy;
  const ctx = instance.ctx;
  shouldCacheAccess = false;
  if (options.beforeCreate) {
    callHook$1(options.beforeCreate, instance, "bc");
  }
  const {
    data: dataOptions,
    computed: computedOptions,
    methods,
    watch: watchOptions,
    provide: provideOptions,
    inject: injectOptions,
    created,
    beforeMount,
    mounted,
    beforeUpdate,
    updated,
    activated,
    deactivated,
    beforeDestroy,
    beforeUnmount,
    destroyed,
    unmounted,
    render,
    renderTracked,
    renderTriggered,
    errorCaptured,
    serverPrefetch,
    expose,
    inheritAttrs,
    components: components2,
    directives,
    filters
  } = options;
  const checkDuplicateProperties = null;
  if (injectOptions) {
    resolveInjections(injectOptions, ctx, checkDuplicateProperties);
  }
  if (methods) {
    for (const key in methods) {
      const methodHandler = methods[key];
      if (isFunction(methodHandler)) {
        {
          ctx[key] = methodHandler.bind(publicThis);
        }
      }
    }
  }
  if (dataOptions) {
    const data = dataOptions.call(publicThis, publicThis);
    if (!isObject$1(data))
      ;
    else {
      instance.data = reactive(data);
    }
  }
  shouldCacheAccess = true;
  if (computedOptions) {
    for (const key in computedOptions) {
      const opt = computedOptions[key];
      const get2 = isFunction(opt) ? opt.bind(publicThis, publicThis) : isFunction(opt.get) ? opt.get.bind(publicThis, publicThis) : NOOP;
      const set2 = !isFunction(opt) && isFunction(opt.set) ? opt.set.bind(publicThis) : NOOP;
      const c = computed({
        get: get2,
        set: set2
      });
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => c.value,
        set: (v) => c.value = v
      });
    }
  }
  if (watchOptions) {
    for (const key in watchOptions) {
      createWatcher(watchOptions[key], ctx, publicThis, key);
    }
  }
  if (provideOptions) {
    const provides = isFunction(provideOptions) ? provideOptions.call(publicThis) : provideOptions;
    Reflect.ownKeys(provides).forEach((key) => {
      provide(key, provides[key]);
    });
  }
  if (created) {
    callHook$1(created, instance, "c");
  }
  function registerLifecycleHook(register, hook) {
    if (isArray$1(hook)) {
      hook.forEach((_hook) => register(_hook.bind(publicThis)));
    } else if (hook) {
      register(hook.bind(publicThis));
    }
  }
  registerLifecycleHook(onBeforeMount, beforeMount);
  registerLifecycleHook(onMounted, mounted);
  registerLifecycleHook(onBeforeUpdate, beforeUpdate);
  registerLifecycleHook(onUpdated, updated);
  registerLifecycleHook(onActivated, activated);
  registerLifecycleHook(onDeactivated, deactivated);
  registerLifecycleHook(onErrorCaptured, errorCaptured);
  registerLifecycleHook(onRenderTracked, renderTracked);
  registerLifecycleHook(onRenderTriggered, renderTriggered);
  registerLifecycleHook(onBeforeUnmount, beforeUnmount);
  registerLifecycleHook(onUnmounted, unmounted);
  registerLifecycleHook(onServerPrefetch, serverPrefetch);
  if (isArray$1(expose)) {
    if (expose.length) {
      const exposed = instance.exposed || (instance.exposed = {});
      expose.forEach((key) => {
        Object.defineProperty(exposed, key, {
          get: () => publicThis[key],
          set: (val) => publicThis[key] = val
        });
      });
    } else if (!instance.exposed) {
      instance.exposed = {};
    }
  }
  if (render && instance.render === NOOP) {
    instance.render = render;
  }
  if (inheritAttrs != null) {
    instance.inheritAttrs = inheritAttrs;
  }
  if (components2)
    instance.components = components2;
  if (directives)
    instance.directives = directives;
}
function resolveInjections(injectOptions, ctx, checkDuplicateProperties = NOOP) {
  if (isArray$1(injectOptions)) {
    injectOptions = normalizeInject(injectOptions);
  }
  for (const key in injectOptions) {
    const opt = injectOptions[key];
    let injected;
    if (isObject$1(opt)) {
      if ("default" in opt) {
        injected = inject(
          opt.from || key,
          opt.default,
          true
        );
      } else {
        injected = inject(opt.from || key);
      }
    } else {
      injected = inject(opt);
    }
    if (isRef(injected)) {
      Object.defineProperty(ctx, key, {
        enumerable: true,
        configurable: true,
        get: () => injected.value,
        set: (v) => injected.value = v
      });
    } else {
      ctx[key] = injected;
    }
  }
}
function callHook$1(hook, instance, type) {
  callWithAsyncErrorHandling(
    isArray$1(hook) ? hook.map((h2) => h2.bind(instance.proxy)) : hook.bind(instance.proxy),
    instance,
    type
  );
}
function createWatcher(raw, ctx, publicThis, key) {
  const getter = key.includes(".") ? createPathGetter(publicThis, key) : () => publicThis[key];
  if (isString(raw)) {
    const handler = ctx[raw];
    if (isFunction(handler)) {
      watch(getter, handler);
    }
  } else if (isFunction(raw)) {
    watch(getter, raw.bind(publicThis));
  } else if (isObject$1(raw)) {
    if (isArray$1(raw)) {
      raw.forEach((r) => createWatcher(r, ctx, publicThis, key));
    } else {
      const handler = isFunction(raw.handler) ? raw.handler.bind(publicThis) : ctx[raw.handler];
      if (isFunction(handler)) {
        watch(getter, handler, raw);
      }
    }
  } else
    ;
}
function resolveMergedOptions(instance) {
  const base2 = instance.type;
  const { mixins, extends: extendsOptions } = base2;
  const {
    mixins: globalMixins,
    optionsCache: cache,
    config: { optionMergeStrategies }
  } = instance.appContext;
  const cached = cache.get(base2);
  let resolved;
  if (cached) {
    resolved = cached;
  } else if (!globalMixins.length && !mixins && !extendsOptions) {
    {
      resolved = base2;
    }
  } else {
    resolved = {};
    if (globalMixins.length) {
      globalMixins.forEach(
        (m) => mergeOptions$1(resolved, m, optionMergeStrategies, true)
      );
    }
    mergeOptions$1(resolved, base2, optionMergeStrategies);
  }
  if (isObject$1(base2)) {
    cache.set(base2, resolved);
  }
  return resolved;
}
function mergeOptions$1(to, from, strats, asMixin = false) {
  const { mixins, extends: extendsOptions } = from;
  if (extendsOptions) {
    mergeOptions$1(to, extendsOptions, strats, true);
  }
  if (mixins) {
    mixins.forEach(
      (m) => mergeOptions$1(to, m, strats, true)
    );
  }
  for (const key in from) {
    if (asMixin && key === "expose")
      ;
    else {
      const strat = internalOptionMergeStrats[key] || strats && strats[key];
      to[key] = strat ? strat(to[key], from[key]) : from[key];
    }
  }
  return to;
}
const internalOptionMergeStrats = {
  data: mergeDataFn,
  props: mergeEmitsOrPropsOptions,
  emits: mergeEmitsOrPropsOptions,
  methods: mergeObjectOptions,
  computed: mergeObjectOptions,
  beforeCreate: mergeAsArray,
  created: mergeAsArray,
  beforeMount: mergeAsArray,
  mounted: mergeAsArray,
  beforeUpdate: mergeAsArray,
  updated: mergeAsArray,
  beforeDestroy: mergeAsArray,
  beforeUnmount: mergeAsArray,
  destroyed: mergeAsArray,
  unmounted: mergeAsArray,
  activated: mergeAsArray,
  deactivated: mergeAsArray,
  errorCaptured: mergeAsArray,
  serverPrefetch: mergeAsArray,
  components: mergeObjectOptions,
  directives: mergeObjectOptions,
  watch: mergeWatchOptions,
  provide: mergeDataFn,
  inject: mergeInject
};
function mergeDataFn(to, from) {
  if (!from) {
    return to;
  }
  if (!to) {
    return from;
  }
  return function mergedDataFn() {
    return extend(
      isFunction(to) ? to.call(this, this) : to,
      isFunction(from) ? from.call(this, this) : from
    );
  };
}
function mergeInject(to, from) {
  return mergeObjectOptions(normalizeInject(to), normalizeInject(from));
}
function normalizeInject(raw) {
  if (isArray$1(raw)) {
    const res = {};
    for (let i = 0; i < raw.length; i++) {
      res[raw[i]] = raw[i];
    }
    return res;
  }
  return raw;
}
function mergeAsArray(to, from) {
  return to ? [...new Set([].concat(to, from))] : from;
}
function mergeObjectOptions(to, from) {
  return to ? extend(/* @__PURE__ */ Object.create(null), to, from) : from;
}
function mergeEmitsOrPropsOptions(to, from) {
  if (to) {
    if (isArray$1(to) && isArray$1(from)) {
      return [.../* @__PURE__ */ new Set([...to, ...from])];
    }
    return extend(
      /* @__PURE__ */ Object.create(null),
      normalizePropsOrEmits(to),
      normalizePropsOrEmits(from != null ? from : {})
    );
  } else {
    return from;
  }
}
function mergeWatchOptions(to, from) {
  if (!to)
    return from;
  if (!from)
    return to;
  const merged = extend(/* @__PURE__ */ Object.create(null), to);
  for (const key in from) {
    merged[key] = mergeAsArray(to[key], from[key]);
  }
  return merged;
}
function createAppContext() {
  return {
    app: null,
    config: {
      isNativeTag: NO,
      performance: false,
      globalProperties: {},
      optionMergeStrategies: {},
      errorHandler: void 0,
      warnHandler: void 0,
      compilerOptions: {}
    },
    mixins: [],
    components: {},
    directives: {},
    provides: /* @__PURE__ */ Object.create(null),
    optionsCache: /* @__PURE__ */ new WeakMap(),
    propsCache: /* @__PURE__ */ new WeakMap(),
    emitsCache: /* @__PURE__ */ new WeakMap()
  };
}
let uid$1$1 = 0;
function createAppAPI(render, hydrate) {
  return function createApp2(rootComponent, rootProps = null) {
    if (!isFunction(rootComponent)) {
      rootComponent = extend({}, rootComponent);
    }
    if (rootProps != null && !isObject$1(rootProps)) {
      rootProps = null;
    }
    const context = createAppContext();
    const installedPlugins = /* @__PURE__ */ new Set();
    let isMounted = false;
    const app2 = context.app = {
      _uid: uid$1$1++,
      _component: rootComponent,
      _props: rootProps,
      _container: null,
      _context: context,
      _instance: null,
      version,
      get config() {
        return context.config;
      },
      set config(v) {
      },
      use(plugin, ...options) {
        if (installedPlugins.has(plugin))
          ;
        else if (plugin && isFunction(plugin.install)) {
          installedPlugins.add(plugin);
          plugin.install(app2, ...options);
        } else if (isFunction(plugin)) {
          installedPlugins.add(plugin);
          plugin(app2, ...options);
        } else
          ;
        return app2;
      },
      mixin(mixin) {
        {
          if (!context.mixins.includes(mixin)) {
            context.mixins.push(mixin);
          }
        }
        return app2;
      },
      component(name, component) {
        if (!component) {
          return context.components[name];
        }
        context.components[name] = component;
        return app2;
      },
      directive(name, directive) {
        if (!directive) {
          return context.directives[name];
        }
        context.directives[name] = directive;
        return app2;
      },
      mount(rootContainer, isHydrate, isSVG) {
        if (!isMounted) {
          const vnode = createVNode(
            rootComponent,
            rootProps
          );
          vnode.appContext = context;
          if (isHydrate && hydrate) {
            hydrate(vnode, rootContainer);
          } else {
            render(vnode, rootContainer, isSVG);
          }
          isMounted = true;
          app2._container = rootContainer;
          rootContainer.__vue_app__ = app2;
          return getExposeProxy(vnode.component) || vnode.component.proxy;
        }
      },
      unmount() {
        if (isMounted) {
          render(null, app2._container);
          delete app2._container.__vue_app__;
        }
      },
      provide(key, value) {
        context.provides[key] = value;
        return app2;
      },
      runWithContext(fn) {
        currentApp = app2;
        try {
          return fn();
        } finally {
          currentApp = null;
        }
      }
    };
    return app2;
  };
}
let currentApp = null;
function provide(key, value) {
  if (!currentInstance)
    ;
  else {
    let provides = currentInstance.provides;
    const parentProvides = currentInstance.parent && currentInstance.parent.provides;
    if (parentProvides === provides) {
      provides = currentInstance.provides = Object.create(parentProvides);
    }
    provides[key] = value;
  }
}
function inject(key, defaultValue, treatDefaultAsFactory = false) {
  const instance = currentInstance || currentRenderingInstance;
  if (instance || currentApp) {
    const provides = instance ? instance.parent == null ? instance.vnode.appContext && instance.vnode.appContext.provides : instance.parent.provides : currentApp._context.provides;
    if (provides && key in provides) {
      return provides[key];
    } else if (arguments.length > 1) {
      return treatDefaultAsFactory && isFunction(defaultValue) ? defaultValue.call(instance && instance.proxy) : defaultValue;
    } else
      ;
  }
}
function hasInjectionContext() {
  return !!(currentInstance || currentRenderingInstance || currentApp);
}
function initProps(instance, rawProps, isStateful, isSSR = false) {
  const props2 = {};
  const attrs = {};
  def(attrs, InternalObjectKey, 1);
  instance.propsDefaults = /* @__PURE__ */ Object.create(null);
  setFullProps(instance, rawProps, props2, attrs);
  for (const key in instance.propsOptions[0]) {
    if (!(key in props2)) {
      props2[key] = void 0;
    }
  }
  if (isStateful) {
    instance.props = isSSR ? props2 : shallowReactive(props2);
  } else {
    if (!instance.type.props) {
      instance.props = attrs;
    } else {
      instance.props = props2;
    }
  }
  instance.attrs = attrs;
}
function updateProps(instance, rawProps, rawPrevProps, optimized) {
  const {
    props: props2,
    attrs,
    vnode: { patchFlag }
  } = instance;
  const rawCurrentProps = toRaw(props2);
  const [options] = instance.propsOptions;
  let hasAttrsChanged = false;
  if ((optimized || patchFlag > 0) && !(patchFlag & 16)) {
    if (patchFlag & 8) {
      const propsToUpdate = instance.vnode.dynamicProps;
      for (let i = 0; i < propsToUpdate.length; i++) {
        let key = propsToUpdate[i];
        if (isEmitListener(instance.emitsOptions, key)) {
          continue;
        }
        const value = rawProps[key];
        if (options) {
          if (hasOwn(attrs, key)) {
            if (value !== attrs[key]) {
              attrs[key] = value;
              hasAttrsChanged = true;
            }
          } else {
            const camelizedKey = camelize(key);
            props2[camelizedKey] = resolvePropValue(
              options,
              rawCurrentProps,
              camelizedKey,
              value,
              instance,
              false
            );
          }
        } else {
          if (value !== attrs[key]) {
            attrs[key] = value;
            hasAttrsChanged = true;
          }
        }
      }
    }
  } else {
    if (setFullProps(instance, rawProps, props2, attrs)) {
      hasAttrsChanged = true;
    }
    let kebabKey;
    for (const key in rawCurrentProps) {
      if (!rawProps || !hasOwn(rawProps, key) && ((kebabKey = hyphenate(key)) === key || !hasOwn(rawProps, kebabKey))) {
        if (options) {
          if (rawPrevProps && (rawPrevProps[key] !== void 0 || rawPrevProps[kebabKey] !== void 0)) {
            props2[key] = resolvePropValue(
              options,
              rawCurrentProps,
              key,
              void 0,
              instance,
              true
            );
          }
        } else {
          delete props2[key];
        }
      }
    }
    if (attrs !== rawCurrentProps) {
      for (const key in attrs) {
        if (!rawProps || !hasOwn(rawProps, key) && true) {
          delete attrs[key];
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (hasAttrsChanged) {
    trigger$1(instance, "set", "$attrs");
  }
}
function setFullProps(instance, rawProps, props2, attrs) {
  const [options, needCastKeys] = instance.propsOptions;
  let hasAttrsChanged = false;
  let rawCastValues;
  if (rawProps) {
    for (let key in rawProps) {
      if (isReservedProp(key)) {
        continue;
      }
      const value = rawProps[key];
      let camelKey;
      if (options && hasOwn(options, camelKey = camelize(key))) {
        if (!needCastKeys || !needCastKeys.includes(camelKey)) {
          props2[camelKey] = value;
        } else {
          (rawCastValues || (rawCastValues = {}))[camelKey] = value;
        }
      } else if (!isEmitListener(instance.emitsOptions, key)) {
        if (!(key in attrs) || value !== attrs[key]) {
          attrs[key] = value;
          hasAttrsChanged = true;
        }
      }
    }
  }
  if (needCastKeys) {
    const rawCurrentProps = toRaw(props2);
    const castValues = rawCastValues || EMPTY_OBJ;
    for (let i = 0; i < needCastKeys.length; i++) {
      const key = needCastKeys[i];
      props2[key] = resolvePropValue(
        options,
        rawCurrentProps,
        key,
        castValues[key],
        instance,
        !hasOwn(castValues, key)
      );
    }
  }
  return hasAttrsChanged;
}
function resolvePropValue(options, props2, key, value, instance, isAbsent) {
  const opt = options[key];
  if (opt != null) {
    const hasDefault = hasOwn(opt, "default");
    if (hasDefault && value === void 0) {
      const defaultValue = opt.default;
      if (opt.type !== Function && !opt.skipFactory && isFunction(defaultValue)) {
        const { propsDefaults } = instance;
        if (key in propsDefaults) {
          value = propsDefaults[key];
        } else {
          setCurrentInstance(instance);
          value = propsDefaults[key] = defaultValue.call(
            null,
            props2
          );
          unsetCurrentInstance();
        }
      } else {
        value = defaultValue;
      }
    }
    if (opt[0]) {
      if (isAbsent && !hasDefault) {
        value = false;
      } else if (opt[1] && (value === "" || value === hyphenate(key))) {
        value = true;
      }
    }
  }
  return value;
}
function normalizePropsOptions(comp, appContext, asMixin = false) {
  const cache = appContext.propsCache;
  const cached = cache.get(comp);
  if (cached) {
    return cached;
  }
  const raw = comp.props;
  const normalized = {};
  const needCastKeys = [];
  let hasExtends = false;
  if (!isFunction(comp)) {
    const extendProps = (raw2) => {
      hasExtends = true;
      const [props2, keys] = normalizePropsOptions(raw2, appContext, true);
      extend(normalized, props2);
      if (keys)
        needCastKeys.push(...keys);
    };
    if (!asMixin && appContext.mixins.length) {
      appContext.mixins.forEach(extendProps);
    }
    if (comp.extends) {
      extendProps(comp.extends);
    }
    if (comp.mixins) {
      comp.mixins.forEach(extendProps);
    }
  }
  if (!raw && !hasExtends) {
    if (isObject$1(comp)) {
      cache.set(comp, EMPTY_ARR);
    }
    return EMPTY_ARR;
  }
  if (isArray$1(raw)) {
    for (let i = 0; i < raw.length; i++) {
      const normalizedKey = camelize(raw[i]);
      if (validatePropName(normalizedKey)) {
        normalized[normalizedKey] = EMPTY_OBJ;
      }
    }
  } else if (raw) {
    for (const key in raw) {
      const normalizedKey = camelize(key);
      if (validatePropName(normalizedKey)) {
        const opt = raw[key];
        const prop = normalized[normalizedKey] = isArray$1(opt) || isFunction(opt) ? { type: opt } : extend({}, opt);
        if (prop) {
          const booleanIndex = getTypeIndex(Boolean, prop.type);
          const stringIndex = getTypeIndex(String, prop.type);
          prop[0] = booleanIndex > -1;
          prop[1] = stringIndex < 0 || booleanIndex < stringIndex;
          if (booleanIndex > -1 || hasOwn(prop, "default")) {
            needCastKeys.push(normalizedKey);
          }
        }
      }
    }
  }
  const res = [normalized, needCastKeys];
  if (isObject$1(comp)) {
    cache.set(comp, res);
  }
  return res;
}
function validatePropName(key) {
  if (key[0] !== "$") {
    return true;
  }
  return false;
}
function getType(ctor) {
  const match = ctor && ctor.toString().match(/^\s*(function|class) (\w+)/);
  return match ? match[2] : ctor === null ? "null" : "";
}
function isSameType(a, b) {
  return getType(a) === getType(b);
}
function getTypeIndex(type, expectedTypes) {
  if (isArray$1(expectedTypes)) {
    return expectedTypes.findIndex((t) => isSameType(t, type));
  } else if (isFunction(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1;
  }
  return -1;
}
const isInternalKey = (key) => key[0] === "_" || key === "$stable";
const normalizeSlotValue = (value) => isArray$1(value) ? value.map(normalizeVNode) : [normalizeVNode(value)];
const normalizeSlot$1 = (key, rawSlot, ctx) => {
  if (rawSlot._n) {
    return rawSlot;
  }
  const normalized = withCtx((...args) => {
    if (false)
      ;
    return normalizeSlotValue(rawSlot(...args));
  }, ctx);
  normalized._c = false;
  return normalized;
};
const normalizeObjectSlots = (rawSlots, slots, instance) => {
  const ctx = rawSlots._ctx;
  for (const key in rawSlots) {
    if (isInternalKey(key))
      continue;
    const value = rawSlots[key];
    if (isFunction(value)) {
      slots[key] = normalizeSlot$1(key, value, ctx);
    } else if (value != null) {
      const normalized = normalizeSlotValue(value);
      slots[key] = () => normalized;
    }
  }
};
const normalizeVNodeSlots = (instance, children) => {
  const normalized = normalizeSlotValue(children);
  instance.slots.default = () => normalized;
};
const initSlots = (instance, children) => {
  if (instance.vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      instance.slots = toRaw(children);
      def(children, "_", type);
    } else {
      normalizeObjectSlots(
        children,
        instance.slots = {}
      );
    }
  } else {
    instance.slots = {};
    if (children) {
      normalizeVNodeSlots(instance, children);
    }
  }
  def(instance.slots, InternalObjectKey, 1);
};
const updateSlots = (instance, children, optimized) => {
  const { vnode, slots } = instance;
  let needDeletionCheck = true;
  let deletionComparisonTarget = EMPTY_OBJ;
  if (vnode.shapeFlag & 32) {
    const type = children._;
    if (type) {
      if (optimized && type === 1) {
        needDeletionCheck = false;
      } else {
        extend(slots, children);
        if (!optimized && type === 1) {
          delete slots._;
        }
      }
    } else {
      needDeletionCheck = !children.$stable;
      normalizeObjectSlots(children, slots);
    }
    deletionComparisonTarget = children;
  } else if (children) {
    normalizeVNodeSlots(instance, children);
    deletionComparisonTarget = { default: 1 };
  }
  if (needDeletionCheck) {
    for (const key in slots) {
      if (!isInternalKey(key) && !(key in deletionComparisonTarget)) {
        delete slots[key];
      }
    }
  }
};
function setRef(rawRef, oldRawRef, parentSuspense, vnode, isUnmount = false) {
  if (isArray$1(rawRef)) {
    rawRef.forEach(
      (r, i) => setRef(
        r,
        oldRawRef && (isArray$1(oldRawRef) ? oldRawRef[i] : oldRawRef),
        parentSuspense,
        vnode,
        isUnmount
      )
    );
    return;
  }
  if (isAsyncWrapper(vnode) && !isUnmount) {
    return;
  }
  const refValue = vnode.shapeFlag & 4 ? getExposeProxy(vnode.component) || vnode.component.proxy : vnode.el;
  const value = isUnmount ? null : refValue;
  const { i: owner, r: ref2 } = rawRef;
  const oldRef = oldRawRef && oldRawRef.r;
  const refs = owner.refs === EMPTY_OBJ ? owner.refs = {} : owner.refs;
  const setupState = owner.setupState;
  if (oldRef != null && oldRef !== ref2) {
    if (isString(oldRef)) {
      refs[oldRef] = null;
      if (hasOwn(setupState, oldRef)) {
        setupState[oldRef] = null;
      }
    } else if (isRef(oldRef)) {
      oldRef.value = null;
    }
  }
  if (isFunction(ref2)) {
    callWithErrorHandling(ref2, owner, 12, [value, refs]);
  } else {
    const _isString = isString(ref2);
    const _isRef = isRef(ref2);
    if (_isString || _isRef) {
      const doSet = () => {
        if (rawRef.f) {
          const existing = _isString ? hasOwn(setupState, ref2) ? setupState[ref2] : refs[ref2] : ref2.value;
          if (isUnmount) {
            isArray$1(existing) && remove(existing, refValue);
          } else {
            if (!isArray$1(existing)) {
              if (_isString) {
                refs[ref2] = [refValue];
                if (hasOwn(setupState, ref2)) {
                  setupState[ref2] = refs[ref2];
                }
              } else {
                ref2.value = [refValue];
                if (rawRef.k)
                  refs[rawRef.k] = ref2.value;
              }
            } else if (!existing.includes(refValue)) {
              existing.push(refValue);
            }
          }
        } else if (_isString) {
          refs[ref2] = value;
          if (hasOwn(setupState, ref2)) {
            setupState[ref2] = value;
          }
        } else if (_isRef) {
          ref2.value = value;
          if (rawRef.k)
            refs[rawRef.k] = value;
        } else
          ;
      };
      if (value) {
        doSet.id = -1;
        queuePostRenderEffect(doSet, parentSuspense);
      } else {
        doSet();
      }
    }
  }
}
const queuePostRenderEffect = queueEffectWithSuspense;
function createRenderer(options) {
  return baseCreateRenderer(options);
}
function baseCreateRenderer(options, createHydrationFns) {
  const target2 = getGlobalThis();
  target2.__VUE__ = true;
  const {
    insert: hostInsert,
    remove: hostRemove,
    patchProp: hostPatchProp,
    createElement: hostCreateElement,
    createText: hostCreateText,
    createComment: hostCreateComment,
    setText: hostSetText,
    setElementText: hostSetElementText,
    parentNode: hostParentNode,
    nextSibling: hostNextSibling,
    setScopeId: hostSetScopeId = NOOP,
    insertStaticContent: hostInsertStaticContent
  } = options;
  const patch = (n1, n2, container, anchor = null, parentComponent = null, parentSuspense = null, isSVG = false, slotScopeIds = null, optimized = !!n2.dynamicChildren) => {
    if (n1 === n2) {
      return;
    }
    if (n1 && !isSameVNodeType(n1, n2)) {
      anchor = getNextHostNode(n1);
      unmount(n1, parentComponent, parentSuspense, true);
      n1 = null;
    }
    if (n2.patchFlag === -2) {
      optimized = false;
      n2.dynamicChildren = null;
    }
    const { type, ref: ref2, shapeFlag } = n2;
    switch (type) {
      case Text:
        processText(n1, n2, container, anchor);
        break;
      case Comment:
        processCommentNode(n1, n2, container, anchor);
        break;
      case Static:
        if (n1 == null) {
          mountStaticNode(n2, container, anchor, isSVG);
        }
        break;
      case Fragment:
        processFragment(
          n1,
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        break;
      default:
        if (shapeFlag & 1) {
          processElement(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 6) {
          processComponent(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (shapeFlag & 64) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else if (shapeFlag & 128) {
          type.process(
            n1,
            n2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized,
            internals
          );
        } else
          ;
    }
    if (ref2 != null && parentComponent) {
      setRef(ref2, n1 && n1.ref, parentSuspense, n2 || n1, !n2);
    }
  };
  const processText = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateText(n2.children),
        container,
        anchor
      );
    } else {
      const el = n2.el = n1.el;
      if (n2.children !== n1.children) {
        hostSetText(el, n2.children);
      }
    }
  };
  const processCommentNode = (n1, n2, container, anchor) => {
    if (n1 == null) {
      hostInsert(
        n2.el = hostCreateComment(n2.children || ""),
        container,
        anchor
      );
    } else {
      n2.el = n1.el;
    }
  };
  const mountStaticNode = (n2, container, anchor, isSVG) => {
    [n2.el, n2.anchor] = hostInsertStaticContent(
      n2.children,
      container,
      anchor,
      isSVG,
      n2.el,
      n2.anchor
    );
  };
  const moveStaticNode = ({ el, anchor }, container, nextSibling) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostInsert(el, container, nextSibling);
      el = next;
    }
    hostInsert(anchor, container, nextSibling);
  };
  const removeStaticNode = ({ el, anchor }) => {
    let next;
    while (el && el !== anchor) {
      next = hostNextSibling(el);
      hostRemove(el);
      el = next;
    }
    hostRemove(anchor);
  };
  const processElement = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    isSVG = isSVG || n2.type === "svg";
    if (n1 == null) {
      mountElement(
        n2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      patchElement(
        n1,
        n2,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const mountElement = (vnode, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let el;
    let vnodeHook;
    const { type, props: props2, shapeFlag, transition, dirs } = vnode;
    el = vnode.el = hostCreateElement(
      vnode.type,
      isSVG,
      props2 && props2.is,
      props2
    );
    if (shapeFlag & 8) {
      hostSetElementText(el, vnode.children);
    } else if (shapeFlag & 16) {
      mountChildren(
        vnode.children,
        el,
        null,
        parentComponent,
        parentSuspense,
        isSVG && type !== "foreignObject",
        slotScopeIds,
        optimized
      );
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "created");
    }
    setScopeId(el, vnode, vnode.scopeId, slotScopeIds, parentComponent);
    if (props2) {
      for (const key in props2) {
        if (key !== "value" && !isReservedProp(key)) {
          hostPatchProp(
            el,
            key,
            null,
            props2[key],
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in props2) {
        hostPatchProp(el, "value", null, props2.value);
      }
      if (vnodeHook = props2.onVnodeBeforeMount) {
        invokeVNodeHook(vnodeHook, parentComponent, vnode);
      }
    }
    if (dirs) {
      invokeDirectiveHook(vnode, null, parentComponent, "beforeMount");
    }
    const needCallTransitionHooks = (!parentSuspense || parentSuspense && !parentSuspense.pendingBranch) && transition && !transition.persisted;
    if (needCallTransitionHooks) {
      transition.beforeEnter(el);
    }
    hostInsert(el, container, anchor);
    if ((vnodeHook = props2 && props2.onVnodeMounted) || needCallTransitionHooks || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        needCallTransitionHooks && transition.enter(el);
        dirs && invokeDirectiveHook(vnode, null, parentComponent, "mounted");
      }, parentSuspense);
    }
  };
  const setScopeId = (el, vnode, scopeId, slotScopeIds, parentComponent) => {
    if (scopeId) {
      hostSetScopeId(el, scopeId);
    }
    if (slotScopeIds) {
      for (let i = 0; i < slotScopeIds.length; i++) {
        hostSetScopeId(el, slotScopeIds[i]);
      }
    }
    if (parentComponent) {
      let subTree = parentComponent.subTree;
      if (vnode === subTree) {
        const parentVNode = parentComponent.vnode;
        setScopeId(
          el,
          parentVNode,
          parentVNode.scopeId,
          parentVNode.slotScopeIds,
          parentComponent.parent
        );
      }
    }
  };
  const mountChildren = (children, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, start2 = 0) => {
    for (let i = start2; i < children.length; i++) {
      const child = children[i] = optimized ? cloneIfMounted(children[i]) : normalizeVNode(children[i]);
      patch(
        null,
        child,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
  };
  const patchElement = (n1, n2, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const el = n2.el = n1.el;
    let { patchFlag, dynamicChildren, dirs } = n2;
    patchFlag |= n1.patchFlag & 16;
    const oldProps = n1.props || EMPTY_OBJ;
    const newProps = n2.props || EMPTY_OBJ;
    let vnodeHook;
    parentComponent && toggleRecurse(parentComponent, false);
    if (vnodeHook = newProps.onVnodeBeforeUpdate) {
      invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
    }
    if (dirs) {
      invokeDirectiveHook(n2, n1, parentComponent, "beforeUpdate");
    }
    parentComponent && toggleRecurse(parentComponent, true);
    const areChildrenSVG = isSVG && n2.type !== "foreignObject";
    if (dynamicChildren) {
      patchBlockChildren(
        n1.dynamicChildren,
        dynamicChildren,
        el,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds
      );
    } else if (!optimized) {
      patchChildren(
        n1,
        n2,
        el,
        null,
        parentComponent,
        parentSuspense,
        areChildrenSVG,
        slotScopeIds,
        false
      );
    }
    if (patchFlag > 0) {
      if (patchFlag & 16) {
        patchProps(
          el,
          n2,
          oldProps,
          newProps,
          parentComponent,
          parentSuspense,
          isSVG
        );
      } else {
        if (patchFlag & 2) {
          if (oldProps.class !== newProps.class) {
            hostPatchProp(el, "class", null, newProps.class, isSVG);
          }
        }
        if (patchFlag & 4) {
          hostPatchProp(el, "style", oldProps.style, newProps.style, isSVG);
        }
        if (patchFlag & 8) {
          const propsToUpdate = n2.dynamicProps;
          for (let i = 0; i < propsToUpdate.length; i++) {
            const key = propsToUpdate[i];
            const prev = oldProps[key];
            const next = newProps[key];
            if (next !== prev || key === "value") {
              hostPatchProp(
                el,
                key,
                prev,
                next,
                isSVG,
                n1.children,
                parentComponent,
                parentSuspense,
                unmountChildren
              );
            }
          }
        }
      }
      if (patchFlag & 1) {
        if (n1.children !== n2.children) {
          hostSetElementText(el, n2.children);
        }
      }
    } else if (!optimized && dynamicChildren == null) {
      patchProps(
        el,
        n2,
        oldProps,
        newProps,
        parentComponent,
        parentSuspense,
        isSVG
      );
    }
    if ((vnodeHook = newProps.onVnodeUpdated) || dirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, n2, n1);
        dirs && invokeDirectiveHook(n2, n1, parentComponent, "updated");
      }, parentSuspense);
    }
  };
  const patchBlockChildren = (oldChildren, newChildren, fallbackContainer, parentComponent, parentSuspense, isSVG, slotScopeIds) => {
    for (let i = 0; i < newChildren.length; i++) {
      const oldVNode = oldChildren[i];
      const newVNode = newChildren[i];
      const container = oldVNode.el && (oldVNode.type === Fragment || !isSameVNodeType(oldVNode, newVNode) || oldVNode.shapeFlag & (6 | 64)) ? hostParentNode(oldVNode.el) : fallbackContainer;
      patch(
        oldVNode,
        newVNode,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        true
      );
    }
  };
  const patchProps = (el, vnode, oldProps, newProps, parentComponent, parentSuspense, isSVG) => {
    if (oldProps !== newProps) {
      if (oldProps !== EMPTY_OBJ) {
        for (const key in oldProps) {
          if (!isReservedProp(key) && !(key in newProps)) {
            hostPatchProp(
              el,
              key,
              oldProps[key],
              null,
              isSVG,
              vnode.children,
              parentComponent,
              parentSuspense,
              unmountChildren
            );
          }
        }
      }
      for (const key in newProps) {
        if (isReservedProp(key))
          continue;
        const next = newProps[key];
        const prev = oldProps[key];
        if (next !== prev && key !== "value") {
          hostPatchProp(
            el,
            key,
            prev,
            next,
            isSVG,
            vnode.children,
            parentComponent,
            parentSuspense,
            unmountChildren
          );
        }
      }
      if ("value" in newProps) {
        hostPatchProp(el, "value", oldProps.value, newProps.value);
      }
    }
  };
  const processFragment = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    const fragmentStartAnchor = n2.el = n1 ? n1.el : hostCreateText("");
    const fragmentEndAnchor = n2.anchor = n1 ? n1.anchor : hostCreateText("");
    let { patchFlag, dynamicChildren, slotScopeIds: fragmentSlotScopeIds } = n2;
    if (fragmentSlotScopeIds) {
      slotScopeIds = slotScopeIds ? slotScopeIds.concat(fragmentSlotScopeIds) : fragmentSlotScopeIds;
    }
    if (n1 == null) {
      hostInsert(fragmentStartAnchor, container, anchor);
      hostInsert(fragmentEndAnchor, container, anchor);
      mountChildren(
        n2.children,
        container,
        fragmentEndAnchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    } else {
      if (patchFlag > 0 && patchFlag & 64 && dynamicChildren && n1.dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          container,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        if (n2.key != null || parentComponent && n2 === parentComponent.subTree) {
          traverseStaticChildren(
            n1,
            n2,
            true
          );
        }
      } else {
        patchChildren(
          n1,
          n2,
          container,
          fragmentEndAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      }
    }
  };
  const processComponent = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    n2.slotScopeIds = slotScopeIds;
    if (n1 == null) {
      if (n2.shapeFlag & 512) {
        parentComponent.ctx.activate(
          n2,
          container,
          anchor,
          isSVG,
          optimized
        );
      } else {
        mountComponent(
          n2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          optimized
        );
      }
    } else {
      updateComponent(n1, n2, optimized);
    }
  };
  const mountComponent = (initialVNode, container, anchor, parentComponent, parentSuspense, isSVG, optimized) => {
    const instance = initialVNode.component = createComponentInstance(
      initialVNode,
      parentComponent,
      parentSuspense
    );
    if (isKeepAlive(initialVNode)) {
      instance.ctx.renderer = internals;
    }
    {
      setupComponent(instance);
    }
    if (instance.asyncDep) {
      parentSuspense && parentSuspense.registerDep(instance, setupRenderEffect);
      if (!initialVNode.el) {
        const placeholder = instance.subTree = createVNode(Comment);
        processCommentNode(null, placeholder, container, anchor);
      }
      return;
    }
    setupRenderEffect(
      instance,
      initialVNode,
      container,
      anchor,
      parentSuspense,
      isSVG,
      optimized
    );
  };
  const updateComponent = (n1, n2, optimized) => {
    const instance = n2.component = n1.component;
    if (shouldUpdateComponent(n1, n2, optimized)) {
      if (instance.asyncDep && !instance.asyncResolved) {
        updateComponentPreRender(instance, n2, optimized);
        return;
      } else {
        instance.next = n2;
        invalidateJob(instance.update);
        instance.update();
      }
    } else {
      n2.el = n1.el;
      instance.vnode = n2;
    }
  };
  const setupRenderEffect = (instance, initialVNode, container, anchor, parentSuspense, isSVG, optimized) => {
    const componentUpdateFn = () => {
      if (!instance.isMounted) {
        let vnodeHook;
        const { el, props: props2 } = initialVNode;
        const { bm, m, parent } = instance;
        const isAsyncWrapperVNode = isAsyncWrapper(initialVNode);
        toggleRecurse(instance, false);
        if (bm) {
          invokeArrayFns(bm);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeBeforeMount)) {
          invokeVNodeHook(vnodeHook, parent, initialVNode);
        }
        toggleRecurse(instance, true);
        if (el && hydrateNode) {
          const hydrateSubTree = () => {
            instance.subTree = renderComponentRoot(instance);
            hydrateNode(
              el,
              instance.subTree,
              instance,
              parentSuspense,
              null
            );
          };
          if (isAsyncWrapperVNode) {
            initialVNode.type.__asyncLoader().then(
              () => !instance.isUnmounted && hydrateSubTree()
            );
          } else {
            hydrateSubTree();
          }
        } else {
          const subTree = instance.subTree = renderComponentRoot(instance);
          patch(
            null,
            subTree,
            container,
            anchor,
            instance,
            parentSuspense,
            isSVG
          );
          initialVNode.el = subTree.el;
        }
        if (m) {
          queuePostRenderEffect(m, parentSuspense);
        }
        if (!isAsyncWrapperVNode && (vnodeHook = props2 && props2.onVnodeMounted)) {
          const scopedInitialVNode = initialVNode;
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, scopedInitialVNode),
            parentSuspense
          );
        }
        if (initialVNode.shapeFlag & 256 || parent && isAsyncWrapper(parent.vnode) && parent.vnode.shapeFlag & 256) {
          instance.a && queuePostRenderEffect(instance.a, parentSuspense);
        }
        instance.isMounted = true;
        initialVNode = container = anchor = null;
      } else {
        let { next, bu, u, parent, vnode } = instance;
        let originNext = next;
        let vnodeHook;
        toggleRecurse(instance, false);
        if (next) {
          next.el = vnode.el;
          updateComponentPreRender(instance, next, optimized);
        } else {
          next = vnode;
        }
        if (bu) {
          invokeArrayFns(bu);
        }
        if (vnodeHook = next.props && next.props.onVnodeBeforeUpdate) {
          invokeVNodeHook(vnodeHook, parent, next, vnode);
        }
        toggleRecurse(instance, true);
        const nextTree = renderComponentRoot(instance);
        const prevTree = instance.subTree;
        instance.subTree = nextTree;
        patch(
          prevTree,
          nextTree,
          hostParentNode(prevTree.el),
          getNextHostNode(prevTree),
          instance,
          parentSuspense,
          isSVG
        );
        next.el = nextTree.el;
        if (originNext === null) {
          updateHOCHostEl(instance, nextTree.el);
        }
        if (u) {
          queuePostRenderEffect(u, parentSuspense);
        }
        if (vnodeHook = next.props && next.props.onVnodeUpdated) {
          queuePostRenderEffect(
            () => invokeVNodeHook(vnodeHook, parent, next, vnode),
            parentSuspense
          );
        }
      }
    };
    const effect = instance.effect = new ReactiveEffect(
      componentUpdateFn,
      () => queueJob(update2),
      instance.scope
    );
    const update2 = instance.update = () => effect.run();
    update2.id = instance.uid;
    toggleRecurse(instance, true);
    update2();
  };
  const updateComponentPreRender = (instance, nextVNode, optimized) => {
    nextVNode.component = instance;
    const prevProps = instance.vnode.props;
    instance.vnode = nextVNode;
    instance.next = null;
    updateProps(instance, nextVNode.props, prevProps, optimized);
    updateSlots(instance, nextVNode.children, optimized);
    pauseTracking();
    flushPreFlushCbs();
    resetTracking();
  };
  const patchChildren = (n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized = false) => {
    const c1 = n1 && n1.children;
    const prevShapeFlag = n1 ? n1.shapeFlag : 0;
    const c2 = n2.children;
    const { patchFlag, shapeFlag } = n2;
    if (patchFlag > 0) {
      if (patchFlag & 128) {
        patchKeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      } else if (patchFlag & 256) {
        patchUnkeyedChildren(
          c1,
          c2,
          container,
          anchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
        return;
      }
    }
    if (shapeFlag & 8) {
      if (prevShapeFlag & 16) {
        unmountChildren(c1, parentComponent, parentSuspense);
      }
      if (c2 !== c1) {
        hostSetElementText(container, c2);
      }
    } else {
      if (prevShapeFlag & 16) {
        if (shapeFlag & 16) {
          patchKeyedChildren(
            c1,
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else {
          unmountChildren(c1, parentComponent, parentSuspense, true);
        }
      } else {
        if (prevShapeFlag & 8) {
          hostSetElementText(container, "");
        }
        if (shapeFlag & 16) {
          mountChildren(
            c2,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      }
    }
  };
  const patchUnkeyedChildren = (c1, c2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    c1 = c1 || EMPTY_ARR;
    c2 = c2 || EMPTY_ARR;
    const oldLength = c1.length;
    const newLength = c2.length;
    const commonLength = Math.min(oldLength, newLength);
    let i;
    for (i = 0; i < commonLength; i++) {
      const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      patch(
        c1[i],
        nextChild,
        container,
        null,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized
      );
    }
    if (oldLength > newLength) {
      unmountChildren(
        c1,
        parentComponent,
        parentSuspense,
        true,
        false,
        commonLength
      );
    } else {
      mountChildren(
        c2,
        container,
        anchor,
        parentComponent,
        parentSuspense,
        isSVG,
        slotScopeIds,
        optimized,
        commonLength
      );
    }
  };
  const patchKeyedChildren = (c1, c2, container, parentAnchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized) => {
    let i = 0;
    const l2 = c2.length;
    let e1 = c1.length - 1;
    let e2 = l2 - 1;
    while (i <= e1 && i <= e2) {
      const n1 = c1[i];
      const n2 = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      i++;
    }
    while (i <= e1 && i <= e2) {
      const n1 = c1[e1];
      const n2 = c2[e2] = optimized ? cloneIfMounted(c2[e2]) : normalizeVNode(c2[e2]);
      if (isSameVNodeType(n1, n2)) {
        patch(
          n1,
          n2,
          container,
          null,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          optimized
        );
      } else {
        break;
      }
      e1--;
      e2--;
    }
    if (i > e1) {
      if (i <= e2) {
        const nextPos = e2 + 1;
        const anchor = nextPos < l2 ? c2[nextPos].el : parentAnchor;
        while (i <= e2) {
          patch(
            null,
            c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]),
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          i++;
        }
      }
    } else if (i > e2) {
      while (i <= e1) {
        unmount(c1[i], parentComponent, parentSuspense, true);
        i++;
      }
    } else {
      const s1 = i;
      const s2 = i;
      const keyToNewIndexMap = /* @__PURE__ */ new Map();
      for (i = s2; i <= e2; i++) {
        const nextChild = c2[i] = optimized ? cloneIfMounted(c2[i]) : normalizeVNode(c2[i]);
        if (nextChild.key != null) {
          keyToNewIndexMap.set(nextChild.key, i);
        }
      }
      let j;
      let patched = 0;
      const toBePatched = e2 - s2 + 1;
      let moved = false;
      let maxNewIndexSoFar = 0;
      const newIndexToOldIndexMap = new Array(toBePatched);
      for (i = 0; i < toBePatched; i++)
        newIndexToOldIndexMap[i] = 0;
      for (i = s1; i <= e1; i++) {
        const prevChild = c1[i];
        if (patched >= toBePatched) {
          unmount(prevChild, parentComponent, parentSuspense, true);
          continue;
        }
        let newIndex;
        if (prevChild.key != null) {
          newIndex = keyToNewIndexMap.get(prevChild.key);
        } else {
          for (j = s2; j <= e2; j++) {
            if (newIndexToOldIndexMap[j - s2] === 0 && isSameVNodeType(prevChild, c2[j])) {
              newIndex = j;
              break;
            }
          }
        }
        if (newIndex === void 0) {
          unmount(prevChild, parentComponent, parentSuspense, true);
        } else {
          newIndexToOldIndexMap[newIndex - s2] = i + 1;
          if (newIndex >= maxNewIndexSoFar) {
            maxNewIndexSoFar = newIndex;
          } else {
            moved = true;
          }
          patch(
            prevChild,
            c2[newIndex],
            container,
            null,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
          patched++;
        }
      }
      const increasingNewIndexSequence = moved ? getSequence(newIndexToOldIndexMap) : EMPTY_ARR;
      j = increasingNewIndexSequence.length - 1;
      for (i = toBePatched - 1; i >= 0; i--) {
        const nextIndex = s2 + i;
        const nextChild = c2[nextIndex];
        const anchor = nextIndex + 1 < l2 ? c2[nextIndex + 1].el : parentAnchor;
        if (newIndexToOldIndexMap[i] === 0) {
          patch(
            null,
            nextChild,
            container,
            anchor,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        } else if (moved) {
          if (j < 0 || i !== increasingNewIndexSequence[j]) {
            move(nextChild, container, anchor, 2);
          } else {
            j--;
          }
        }
      }
    }
  };
  const move = (vnode, container, anchor, moveType, parentSuspense = null) => {
    const { el, type, transition, children, shapeFlag } = vnode;
    if (shapeFlag & 6) {
      move(vnode.component.subTree, container, anchor, moveType);
      return;
    }
    if (shapeFlag & 128) {
      vnode.suspense.move(container, anchor, moveType);
      return;
    }
    if (shapeFlag & 64) {
      type.move(vnode, container, anchor, internals);
      return;
    }
    if (type === Fragment) {
      hostInsert(el, container, anchor);
      for (let i = 0; i < children.length; i++) {
        move(children[i], container, anchor, moveType);
      }
      hostInsert(vnode.anchor, container, anchor);
      return;
    }
    if (type === Static) {
      moveStaticNode(vnode, container, anchor);
      return;
    }
    const needTransition = moveType !== 2 && shapeFlag & 1 && transition;
    if (needTransition) {
      if (moveType === 0) {
        transition.beforeEnter(el);
        hostInsert(el, container, anchor);
        queuePostRenderEffect(() => transition.enter(el), parentSuspense);
      } else {
        const { leave, delayLeave, afterLeave } = transition;
        const remove22 = () => hostInsert(el, container, anchor);
        const performLeave = () => {
          leave(el, () => {
            remove22();
            afterLeave && afterLeave();
          });
        };
        if (delayLeave) {
          delayLeave(el, remove22, performLeave);
        } else {
          performLeave();
        }
      }
    } else {
      hostInsert(el, container, anchor);
    }
  };
  const unmount = (vnode, parentComponent, parentSuspense, doRemove = false, optimized = false) => {
    const {
      type,
      props: props2,
      ref: ref2,
      children,
      dynamicChildren,
      shapeFlag,
      patchFlag,
      dirs
    } = vnode;
    if (ref2 != null) {
      setRef(ref2, null, parentSuspense, vnode, true);
    }
    if (shapeFlag & 256) {
      parentComponent.ctx.deactivate(vnode);
      return;
    }
    const shouldInvokeDirs = shapeFlag & 1 && dirs;
    const shouldInvokeVnodeHook = !isAsyncWrapper(vnode);
    let vnodeHook;
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeBeforeUnmount)) {
      invokeVNodeHook(vnodeHook, parentComponent, vnode);
    }
    if (shapeFlag & 6) {
      unmountComponent(vnode.component, parentSuspense, doRemove);
    } else {
      if (shapeFlag & 128) {
        vnode.suspense.unmount(parentSuspense, doRemove);
        return;
      }
      if (shouldInvokeDirs) {
        invokeDirectiveHook(vnode, null, parentComponent, "beforeUnmount");
      }
      if (shapeFlag & 64) {
        vnode.type.remove(
          vnode,
          parentComponent,
          parentSuspense,
          optimized,
          internals,
          doRemove
        );
      } else if (dynamicChildren && (type !== Fragment || patchFlag > 0 && patchFlag & 64)) {
        unmountChildren(
          dynamicChildren,
          parentComponent,
          parentSuspense,
          false,
          true
        );
      } else if (type === Fragment && patchFlag & (128 | 256) || !optimized && shapeFlag & 16) {
        unmountChildren(children, parentComponent, parentSuspense);
      }
      if (doRemove) {
        remove2(vnode);
      }
    }
    if (shouldInvokeVnodeHook && (vnodeHook = props2 && props2.onVnodeUnmounted) || shouldInvokeDirs) {
      queuePostRenderEffect(() => {
        vnodeHook && invokeVNodeHook(vnodeHook, parentComponent, vnode);
        shouldInvokeDirs && invokeDirectiveHook(vnode, null, parentComponent, "unmounted");
      }, parentSuspense);
    }
  };
  const remove2 = (vnode) => {
    const { type, el, anchor, transition } = vnode;
    if (type === Fragment) {
      {
        removeFragment(el, anchor);
      }
      return;
    }
    if (type === Static) {
      removeStaticNode(vnode);
      return;
    }
    const performRemove = () => {
      hostRemove(el);
      if (transition && !transition.persisted && transition.afterLeave) {
        transition.afterLeave();
      }
    };
    if (vnode.shapeFlag & 1 && transition && !transition.persisted) {
      const { leave, delayLeave } = transition;
      const performLeave = () => leave(el, performRemove);
      if (delayLeave) {
        delayLeave(vnode.el, performRemove, performLeave);
      } else {
        performLeave();
      }
    } else {
      performRemove();
    }
  };
  const removeFragment = (cur, end) => {
    let next;
    while (cur !== end) {
      next = hostNextSibling(cur);
      hostRemove(cur);
      cur = next;
    }
    hostRemove(end);
  };
  const unmountComponent = (instance, parentSuspense, doRemove) => {
    const { bum, scope, update: update2, subTree, um } = instance;
    if (bum) {
      invokeArrayFns(bum);
    }
    scope.stop();
    if (update2) {
      update2.active = false;
      unmount(subTree, instance, parentSuspense, doRemove);
    }
    if (um) {
      queuePostRenderEffect(um, parentSuspense);
    }
    queuePostRenderEffect(() => {
      instance.isUnmounted = true;
    }, parentSuspense);
    if (parentSuspense && parentSuspense.pendingBranch && !parentSuspense.isUnmounted && instance.asyncDep && !instance.asyncResolved && instance.suspenseId === parentSuspense.pendingId) {
      parentSuspense.deps--;
      if (parentSuspense.deps === 0) {
        parentSuspense.resolve();
      }
    }
  };
  const unmountChildren = (children, parentComponent, parentSuspense, doRemove = false, optimized = false, start2 = 0) => {
    for (let i = start2; i < children.length; i++) {
      unmount(children[i], parentComponent, parentSuspense, doRemove, optimized);
    }
  };
  const getNextHostNode = (vnode) => {
    if (vnode.shapeFlag & 6) {
      return getNextHostNode(vnode.component.subTree);
    }
    if (vnode.shapeFlag & 128) {
      return vnode.suspense.next();
    }
    return hostNextSibling(vnode.anchor || vnode.el);
  };
  const render = (vnode, container, isSVG) => {
    if (vnode == null) {
      if (container._vnode) {
        unmount(container._vnode, null, null, true);
      }
    } else {
      patch(container._vnode || null, vnode, container, null, null, null, isSVG);
    }
    flushPreFlushCbs();
    flushPostFlushCbs();
    container._vnode = vnode;
  };
  const internals = {
    p: patch,
    um: unmount,
    m: move,
    r: remove2,
    mt: mountComponent,
    mc: mountChildren,
    pc: patchChildren,
    pbc: patchBlockChildren,
    n: getNextHostNode,
    o: options
  };
  let hydrate;
  let hydrateNode;
  if (createHydrationFns) {
    [hydrate, hydrateNode] = createHydrationFns(
      internals
    );
  }
  return {
    render,
    hydrate,
    createApp: createAppAPI(render, hydrate)
  };
}
function toggleRecurse({ effect, update: update2 }, allowed) {
  effect.allowRecurse = update2.allowRecurse = allowed;
}
function traverseStaticChildren(n1, n2, shallow = false) {
  const ch1 = n1.children;
  const ch2 = n2.children;
  if (isArray$1(ch1) && isArray$1(ch2)) {
    for (let i = 0; i < ch1.length; i++) {
      const c1 = ch1[i];
      let c2 = ch2[i];
      if (c2.shapeFlag & 1 && !c2.dynamicChildren) {
        if (c2.patchFlag <= 0 || c2.patchFlag === 32) {
          c2 = ch2[i] = cloneIfMounted(ch2[i]);
          c2.el = c1.el;
        }
        if (!shallow)
          traverseStaticChildren(c1, c2);
      }
      if (c2.type === Text) {
        c2.el = c1.el;
      }
    }
  }
}
function getSequence(arr) {
  const p2 = arr.slice();
  const result = [0];
  let i, j, u, v, c;
  const len = arr.length;
  for (i = 0; i < len; i++) {
    const arrI = arr[i];
    if (arrI !== 0) {
      j = result[result.length - 1];
      if (arr[j] < arrI) {
        p2[i] = j;
        result.push(i);
        continue;
      }
      u = 0;
      v = result.length - 1;
      while (u < v) {
        c = u + v >> 1;
        if (arr[result[c]] < arrI) {
          u = c + 1;
        } else {
          v = c;
        }
      }
      if (arrI < arr[result[u]]) {
        if (u > 0) {
          p2[i] = result[u - 1];
        }
        result[u] = i;
      }
    }
  }
  u = result.length;
  v = result[u - 1];
  while (u-- > 0) {
    result[u] = v;
    v = p2[v];
  }
  return result;
}
const isTeleport = (type) => type.__isTeleport;
const isTeleportDisabled = (props2) => props2 && (props2.disabled || props2.disabled === "");
const isTargetSVG = (target2) => typeof SVGElement !== "undefined" && target2 instanceof SVGElement;
const resolveTarget = (props2, select) => {
  const targetSelector = props2 && props2.to;
  if (isString(targetSelector)) {
    if (!select) {
      return null;
    } else {
      const target2 = select(targetSelector);
      return target2;
    }
  } else {
    return targetSelector;
  }
};
const TeleportImpl = {
  __isTeleport: true,
  process(n1, n2, container, anchor, parentComponent, parentSuspense, isSVG, slotScopeIds, optimized, internals) {
    const {
      mc: mountChildren,
      pc: patchChildren,
      pbc: patchBlockChildren,
      o: { insert, querySelector, createText, createComment }
    } = internals;
    const disabled = isTeleportDisabled(n2.props);
    let { shapeFlag, children, dynamicChildren } = n2;
    if (n1 == null) {
      const placeholder = n2.el = createText("");
      const mainAnchor = n2.anchor = createText("");
      insert(placeholder, container, anchor);
      insert(mainAnchor, container, anchor);
      const target2 = n2.target = resolveTarget(n2.props, querySelector);
      const targetAnchor = n2.targetAnchor = createText("");
      if (target2) {
        insert(targetAnchor, target2);
        isSVG = isSVG || isTargetSVG(target2);
      }
      const mount = (container2, anchor2) => {
        if (shapeFlag & 16) {
          mountChildren(
            children,
            container2,
            anchor2,
            parentComponent,
            parentSuspense,
            isSVG,
            slotScopeIds,
            optimized
          );
        }
      };
      if (disabled) {
        mount(container, mainAnchor);
      } else if (target2) {
        mount(target2, targetAnchor);
      }
    } else {
      n2.el = n1.el;
      const mainAnchor = n2.anchor = n1.anchor;
      const target2 = n2.target = n1.target;
      const targetAnchor = n2.targetAnchor = n1.targetAnchor;
      const wasDisabled = isTeleportDisabled(n1.props);
      const currentContainer = wasDisabled ? container : target2;
      const currentAnchor = wasDisabled ? mainAnchor : targetAnchor;
      isSVG = isSVG || isTargetSVG(target2);
      if (dynamicChildren) {
        patchBlockChildren(
          n1.dynamicChildren,
          dynamicChildren,
          currentContainer,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds
        );
        traverseStaticChildren(n1, n2, true);
      } else if (!optimized) {
        patchChildren(
          n1,
          n2,
          currentContainer,
          currentAnchor,
          parentComponent,
          parentSuspense,
          isSVG,
          slotScopeIds,
          false
        );
      }
      if (disabled) {
        if (!wasDisabled) {
          moveTeleport(
            n2,
            container,
            mainAnchor,
            internals,
            1
          );
        }
      } else {
        if ((n2.props && n2.props.to) !== (n1.props && n1.props.to)) {
          const nextTarget = n2.target = resolveTarget(
            n2.props,
            querySelector
          );
          if (nextTarget) {
            moveTeleport(
              n2,
              nextTarget,
              null,
              internals,
              0
            );
          }
        } else if (wasDisabled) {
          moveTeleport(
            n2,
            target2,
            targetAnchor,
            internals,
            1
          );
        }
      }
    }
    updateCssVars(n2);
  },
  remove(vnode, parentComponent, parentSuspense, optimized, { um: unmount, o: { remove: hostRemove } }, doRemove) {
    const { shapeFlag, children, anchor, targetAnchor, target: target2, props: props2 } = vnode;
    if (target2) {
      hostRemove(targetAnchor);
    }
    if (doRemove || !isTeleportDisabled(props2)) {
      hostRemove(anchor);
      if (shapeFlag & 16) {
        for (let i = 0; i < children.length; i++) {
          const child = children[i];
          unmount(
            child,
            parentComponent,
            parentSuspense,
            true,
            !!child.dynamicChildren
          );
        }
      }
    }
  },
  move: moveTeleport,
  hydrate: hydrateTeleport
};
function moveTeleport(vnode, container, parentAnchor, { o: { insert }, m: move }, moveType = 2) {
  if (moveType === 0) {
    insert(vnode.targetAnchor, container, parentAnchor);
  }
  const { el, anchor, shapeFlag, children, props: props2 } = vnode;
  const isReorder = moveType === 2;
  if (isReorder) {
    insert(el, container, parentAnchor);
  }
  if (!isReorder || isTeleportDisabled(props2)) {
    if (shapeFlag & 16) {
      for (let i = 0; i < children.length; i++) {
        move(
          children[i],
          container,
          parentAnchor,
          2
        );
      }
    }
  }
  if (isReorder) {
    insert(anchor, container, parentAnchor);
  }
}
function hydrateTeleport(node, vnode, parentComponent, parentSuspense, slotScopeIds, optimized, {
  o: { nextSibling, parentNode, querySelector }
}, hydrateChildren) {
  const target2 = vnode.target = resolveTarget(
    vnode.props,
    querySelector
  );
  if (target2) {
    const targetNode = target2._lpa || target2.firstChild;
    if (vnode.shapeFlag & 16) {
      if (isTeleportDisabled(vnode.props)) {
        vnode.anchor = hydrateChildren(
          nextSibling(node),
          vnode,
          parentNode(node),
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
        vnode.targetAnchor = targetNode;
      } else {
        vnode.anchor = nextSibling(node);
        let targetAnchor = targetNode;
        while (targetAnchor) {
          targetAnchor = nextSibling(targetAnchor);
          if (targetAnchor && targetAnchor.nodeType === 8 && targetAnchor.data === "teleport anchor") {
            vnode.targetAnchor = targetAnchor;
            target2._lpa = vnode.targetAnchor && nextSibling(vnode.targetAnchor);
            break;
          }
        }
        hydrateChildren(
          targetNode,
          vnode,
          target2,
          parentComponent,
          parentSuspense,
          slotScopeIds,
          optimized
        );
      }
    }
    updateCssVars(vnode);
  }
  return vnode.anchor && nextSibling(vnode.anchor);
}
const Teleport = TeleportImpl;
function updateCssVars(vnode) {
  const ctx = vnode.ctx;
  if (ctx && ctx.ut) {
    let node = vnode.children[0].el;
    while (node !== vnode.targetAnchor) {
      if (node.nodeType === 1)
        node.setAttribute("data-v-owner", ctx.uid);
      node = node.nextSibling;
    }
    ctx.ut();
  }
}
const Fragment = Symbol.for("v-fgt");
const Text = Symbol.for("v-txt");
const Comment = Symbol.for("v-cmt");
const Static = Symbol.for("v-stc");
const blockStack = [];
let currentBlock = null;
function openBlock(disableTracking = false) {
  blockStack.push(currentBlock = disableTracking ? null : []);
}
function closeBlock() {
  blockStack.pop();
  currentBlock = blockStack[blockStack.length - 1] || null;
}
let isBlockTreeEnabled = 1;
function setBlockTracking(value) {
  isBlockTreeEnabled += value;
}
function setupBlock(vnode) {
  vnode.dynamicChildren = isBlockTreeEnabled > 0 ? currentBlock || EMPTY_ARR : null;
  closeBlock();
  if (isBlockTreeEnabled > 0 && currentBlock) {
    currentBlock.push(vnode);
  }
  return vnode;
}
function createElementBlock(type, props2, children, patchFlag, dynamicProps, shapeFlag) {
  return setupBlock(
    createBaseVNode(
      type,
      props2,
      children,
      patchFlag,
      dynamicProps,
      shapeFlag,
      true
    )
  );
}
function createBlock(type, props2, children, patchFlag, dynamicProps) {
  return setupBlock(
    createVNode(
      type,
      props2,
      children,
      patchFlag,
      dynamicProps,
      true
    )
  );
}
function isVNode(value) {
  return value ? value.__v_isVNode === true : false;
}
function isSameVNodeType(n1, n2) {
  return n1.type === n2.type && n1.key === n2.key;
}
const InternalObjectKey = `__vInternal`;
const normalizeKey = ({ key }) => key != null ? key : null;
const normalizeRef = ({
  ref: ref2,
  ref_key,
  ref_for
}) => {
  if (typeof ref2 === "number") {
    ref2 = "" + ref2;
  }
  return ref2 != null ? isString(ref2) || isRef(ref2) || isFunction(ref2) ? { i: currentRenderingInstance, r: ref2, k: ref_key, f: !!ref_for } : ref2 : null;
};
function createBaseVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, shapeFlag = type === Fragment ? 0 : 1, isBlockNode = false, needFullChildrenNormalization = false) {
  const vnode = {
    __v_isVNode: true,
    __v_skip: true,
    type,
    props: props2,
    key: props2 && normalizeKey(props2),
    ref: props2 && normalizeRef(props2),
    scopeId: currentScopeId,
    slotScopeIds: null,
    children,
    component: null,
    suspense: null,
    ssContent: null,
    ssFallback: null,
    dirs: null,
    transition: null,
    el: null,
    anchor: null,
    target: null,
    targetAnchor: null,
    staticCount: 0,
    shapeFlag,
    patchFlag,
    dynamicProps,
    dynamicChildren: null,
    appContext: null,
    ctx: currentRenderingInstance
  };
  if (needFullChildrenNormalization) {
    normalizeChildren(vnode, children);
    if (shapeFlag & 128) {
      type.normalize(vnode);
    }
  } else if (children) {
    vnode.shapeFlag |= isString(children) ? 8 : 16;
  }
  if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock && (vnode.patchFlag > 0 || shapeFlag & 6) && vnode.patchFlag !== 32) {
    currentBlock.push(vnode);
  }
  return vnode;
}
const createVNode = _createVNode;
function _createVNode(type, props2 = null, children = null, patchFlag = 0, dynamicProps = null, isBlockNode = false) {
  if (!type || type === NULL_DYNAMIC_COMPONENT) {
    type = Comment;
  }
  if (isVNode(type)) {
    const cloned = cloneVNode(
      type,
      props2,
      true
    );
    if (children) {
      normalizeChildren(cloned, children);
    }
    if (isBlockTreeEnabled > 0 && !isBlockNode && currentBlock) {
      if (cloned.shapeFlag & 6) {
        currentBlock[currentBlock.indexOf(type)] = cloned;
      } else {
        currentBlock.push(cloned);
      }
    }
    cloned.patchFlag |= -2;
    return cloned;
  }
  if (isClassComponent(type)) {
    type = type.__vccOpts;
  }
  if (props2) {
    props2 = guardReactiveProps(props2);
    let { class: klass, style } = props2;
    if (klass && !isString(klass)) {
      props2.class = normalizeClass(klass);
    }
    if (isObject$1(style)) {
      if (isProxy(style) && !isArray$1(style)) {
        style = extend({}, style);
      }
      props2.style = normalizeStyle(style);
    }
  }
  const shapeFlag = isString(type) ? 1 : isSuspense(type) ? 128 : isTeleport(type) ? 64 : isObject$1(type) ? 4 : isFunction(type) ? 2 : 0;
  return createBaseVNode(
    type,
    props2,
    children,
    patchFlag,
    dynamicProps,
    shapeFlag,
    isBlockNode,
    true
  );
}
function guardReactiveProps(props2) {
  if (!props2)
    return null;
  return isProxy(props2) || InternalObjectKey in props2 ? extend({}, props2) : props2;
}
function cloneVNode(vnode, extraProps, mergeRef = false) {
  const { props: props2, ref: ref2, patchFlag, children } = vnode;
  const mergedProps = extraProps ? mergeProps(props2 || {}, extraProps) : props2;
  const cloned = {
    __v_isVNode: true,
    __v_skip: true,
    type: vnode.type,
    props: mergedProps,
    key: mergedProps && normalizeKey(mergedProps),
    ref: extraProps && extraProps.ref ? mergeRef && ref2 ? isArray$1(ref2) ? ref2.concat(normalizeRef(extraProps)) : [ref2, normalizeRef(extraProps)] : normalizeRef(extraProps) : ref2,
    scopeId: vnode.scopeId,
    slotScopeIds: vnode.slotScopeIds,
    children,
    target: vnode.target,
    targetAnchor: vnode.targetAnchor,
    staticCount: vnode.staticCount,
    shapeFlag: vnode.shapeFlag,
    patchFlag: extraProps && vnode.type !== Fragment ? patchFlag === -1 ? 16 : patchFlag | 16 : patchFlag,
    dynamicProps: vnode.dynamicProps,
    dynamicChildren: vnode.dynamicChildren,
    appContext: vnode.appContext,
    dirs: vnode.dirs,
    transition: vnode.transition,
    component: vnode.component,
    suspense: vnode.suspense,
    ssContent: vnode.ssContent && cloneVNode(vnode.ssContent),
    ssFallback: vnode.ssFallback && cloneVNode(vnode.ssFallback),
    el: vnode.el,
    anchor: vnode.anchor,
    ctx: vnode.ctx,
    ce: vnode.ce
  };
  return cloned;
}
function createTextVNode(text = " ", flag = 0) {
  return createVNode(Text, null, text, flag);
}
function createCommentVNode(text = "", asBlock = false) {
  return asBlock ? (openBlock(), createBlock(Comment, null, text)) : createVNode(Comment, null, text);
}
function normalizeVNode(child) {
  if (child == null || typeof child === "boolean") {
    return createVNode(Comment);
  } else if (isArray$1(child)) {
    return createVNode(
      Fragment,
      null,
      child.slice()
    );
  } else if (typeof child === "object") {
    return cloneIfMounted(child);
  } else {
    return createVNode(Text, null, String(child));
  }
}
function cloneIfMounted(child) {
  return child.el === null && child.patchFlag !== -1 || child.memo ? child : cloneVNode(child);
}
function normalizeChildren(vnode, children) {
  let type = 0;
  const { shapeFlag } = vnode;
  if (children == null) {
    children = null;
  } else if (isArray$1(children)) {
    type = 16;
  } else if (typeof children === "object") {
    if (shapeFlag & (1 | 64)) {
      const slot = children.default;
      if (slot) {
        slot._c && (slot._d = false);
        normalizeChildren(vnode, slot());
        slot._c && (slot._d = true);
      }
      return;
    } else {
      type = 32;
      const slotFlag = children._;
      if (!slotFlag && !(InternalObjectKey in children)) {
        children._ctx = currentRenderingInstance;
      } else if (slotFlag === 3 && currentRenderingInstance) {
        if (currentRenderingInstance.slots._ === 1) {
          children._ = 1;
        } else {
          children._ = 2;
          vnode.patchFlag |= 1024;
        }
      }
    }
  } else if (isFunction(children)) {
    children = { default: children, _ctx: currentRenderingInstance };
    type = 32;
  } else {
    children = String(children);
    if (shapeFlag & 64) {
      type = 16;
      children = [createTextVNode(children)];
    } else {
      type = 8;
    }
  }
  vnode.children = children;
  vnode.shapeFlag |= type;
}
function mergeProps(...args) {
  const ret = {};
  for (let i = 0; i < args.length; i++) {
    const toMerge = args[i];
    for (const key in toMerge) {
      if (key === "class") {
        if (ret.class !== toMerge.class) {
          ret.class = normalizeClass([ret.class, toMerge.class]);
        }
      } else if (key === "style") {
        ret.style = normalizeStyle([ret.style, toMerge.style]);
      } else if (isOn(key)) {
        const existing = ret[key];
        const incoming = toMerge[key];
        if (incoming && existing !== incoming && !(isArray$1(existing) && existing.includes(incoming))) {
          ret[key] = existing ? [].concat(existing, incoming) : incoming;
        }
      } else if (key !== "") {
        ret[key] = toMerge[key];
      }
    }
  }
  return ret;
}
function invokeVNodeHook(hook, instance, vnode, prevVNode = null) {
  callWithAsyncErrorHandling(hook, instance, 7, [
    vnode,
    prevVNode
  ]);
}
const emptyAppContext = createAppContext();
let uid$3 = 0;
function createComponentInstance(vnode, parent, suspense) {
  const type = vnode.type;
  const appContext = (parent ? parent.appContext : vnode.appContext) || emptyAppContext;
  const instance = {
    uid: uid$3++,
    vnode,
    type,
    parent,
    appContext,
    root: null,
    next: null,
    subTree: null,
    effect: null,
    update: null,
    scope: new EffectScope(
      true
    ),
    render: null,
    proxy: null,
    exposed: null,
    exposeProxy: null,
    withProxy: null,
    provides: parent ? parent.provides : Object.create(appContext.provides),
    accessCache: null,
    renderCache: [],
    components: null,
    directives: null,
    propsOptions: normalizePropsOptions(type, appContext),
    emitsOptions: normalizeEmitsOptions(type, appContext),
    emit: null,
    emitted: null,
    propsDefaults: EMPTY_OBJ,
    inheritAttrs: type.inheritAttrs,
    ctx: EMPTY_OBJ,
    data: EMPTY_OBJ,
    props: EMPTY_OBJ,
    attrs: EMPTY_OBJ,
    slots: EMPTY_OBJ,
    refs: EMPTY_OBJ,
    setupState: EMPTY_OBJ,
    setupContext: null,
    attrsProxy: null,
    slotsProxy: null,
    suspense,
    suspenseId: suspense ? suspense.pendingId : 0,
    asyncDep: null,
    asyncResolved: false,
    isMounted: false,
    isUnmounted: false,
    isDeactivated: false,
    bc: null,
    c: null,
    bm: null,
    m: null,
    bu: null,
    u: null,
    um: null,
    bum: null,
    da: null,
    a: null,
    rtg: null,
    rtc: null,
    ec: null,
    sp: null
  };
  {
    instance.ctx = { _: instance };
  }
  instance.root = parent ? parent.root : instance;
  instance.emit = emit.bind(null, instance);
  if (vnode.ce) {
    vnode.ce(instance);
  }
  return instance;
}
let currentInstance = null;
const getCurrentInstance = () => currentInstance || currentRenderingInstance;
let internalSetCurrentInstance;
let globalCurrentInstanceSetters;
let settersKey = "__VUE_INSTANCE_SETTERS__";
{
  if (!(globalCurrentInstanceSetters = getGlobalThis()[settersKey])) {
    globalCurrentInstanceSetters = getGlobalThis()[settersKey] = [];
  }
  globalCurrentInstanceSetters.push((i) => currentInstance = i);
  internalSetCurrentInstance = (instance) => {
    if (globalCurrentInstanceSetters.length > 1) {
      globalCurrentInstanceSetters.forEach((s) => s(instance));
    } else {
      globalCurrentInstanceSetters[0](instance);
    }
  };
}
const setCurrentInstance = (instance) => {
  internalSetCurrentInstance(instance);
  instance.scope.on();
};
const unsetCurrentInstance = () => {
  currentInstance && currentInstance.scope.off();
  internalSetCurrentInstance(null);
};
function isStatefulComponent(instance) {
  return instance.vnode.shapeFlag & 4;
}
let isInSSRComponentSetup = false;
function setupComponent(instance, isSSR = false) {
  isInSSRComponentSetup = isSSR;
  const { props: props2, children } = instance.vnode;
  const isStateful = isStatefulComponent(instance);
  initProps(instance, props2, isStateful, isSSR);
  initSlots(instance, children);
  const setupResult = isStateful ? setupStatefulComponent(instance, isSSR) : void 0;
  isInSSRComponentSetup = false;
  return setupResult;
}
function setupStatefulComponent(instance, isSSR) {
  const Component = instance.type;
  instance.accessCache = /* @__PURE__ */ Object.create(null);
  instance.proxy = markRaw(new Proxy(instance.ctx, PublicInstanceProxyHandlers));
  const { setup } = Component;
  if (setup) {
    const setupContext = instance.setupContext = setup.length > 1 ? createSetupContext(instance) : null;
    setCurrentInstance(instance);
    pauseTracking();
    const setupResult = callWithErrorHandling(
      setup,
      instance,
      0,
      [instance.props, setupContext]
    );
    resetTracking();
    unsetCurrentInstance();
    if (isPromise(setupResult)) {
      setupResult.then(unsetCurrentInstance, unsetCurrentInstance);
      if (isSSR) {
        return setupResult.then((resolvedResult) => {
          handleSetupResult(instance, resolvedResult, isSSR);
        }).catch((e) => {
          handleError(e, instance, 0);
        });
      } else {
        instance.asyncDep = setupResult;
      }
    } else {
      handleSetupResult(instance, setupResult, isSSR);
    }
  } else {
    finishComponentSetup(instance, isSSR);
  }
}
function handleSetupResult(instance, setupResult, isSSR) {
  if (isFunction(setupResult)) {
    if (instance.type.__ssrInlineRender) {
      instance.ssrRender = setupResult;
    } else {
      instance.render = setupResult;
    }
  } else if (isObject$1(setupResult)) {
    instance.setupState = proxyRefs(setupResult);
  } else
    ;
  finishComponentSetup(instance, isSSR);
}
let compile;
function finishComponentSetup(instance, isSSR, skipOptions) {
  const Component = instance.type;
  if (!instance.render) {
    if (!isSSR && compile && !Component.render) {
      const template = Component.template || resolveMergedOptions(instance).template;
      if (template) {
        const { isCustomElement, compilerOptions } = instance.appContext.config;
        const { delimiters, compilerOptions: componentCompilerOptions } = Component;
        const finalCompilerOptions = extend(
          extend(
            {
              isCustomElement,
              delimiters
            },
            compilerOptions
          ),
          componentCompilerOptions
        );
        Component.render = compile(template, finalCompilerOptions);
      }
    }
    instance.render = Component.render || NOOP;
  }
  {
    setCurrentInstance(instance);
    pauseTracking();
    applyOptions(instance);
    resetTracking();
    unsetCurrentInstance();
  }
}
function getAttrsProxy(instance) {
  return instance.attrsProxy || (instance.attrsProxy = new Proxy(
    instance.attrs,
    {
      get(target2, key) {
        track(instance, "get", "$attrs");
        return target2[key];
      }
    }
  ));
}
function createSetupContext(instance) {
  const expose = (exposed) => {
    instance.exposed = exposed || {};
  };
  {
    return {
      get attrs() {
        return getAttrsProxy(instance);
      },
      slots: instance.slots,
      emit: instance.emit,
      expose
    };
  }
}
function getExposeProxy(instance) {
  if (instance.exposed) {
    return instance.exposeProxy || (instance.exposeProxy = new Proxy(proxyRefs(markRaw(instance.exposed)), {
      get(target2, key) {
        if (key in target2) {
          return target2[key];
        } else if (key in publicPropertiesMap) {
          return publicPropertiesMap[key](instance);
        }
      },
      has(target2, key) {
        return key in target2 || key in publicPropertiesMap;
      }
    }));
  }
}
function getComponentName(Component, includeInferred = true) {
  return isFunction(Component) ? Component.displayName || Component.name : Component.name || includeInferred && Component.__name;
}
function isClassComponent(value) {
  return isFunction(value) && "__vccOpts" in value;
}
const computed = (getterOrOptions, debugOptions) => {
  return computed$1(getterOrOptions, debugOptions, isInSSRComponentSetup);
};
function h(type, propsOrChildren, children) {
  const l = arguments.length;
  if (l === 2) {
    if (isObject$1(propsOrChildren) && !isArray$1(propsOrChildren)) {
      if (isVNode(propsOrChildren)) {
        return createVNode(type, null, [propsOrChildren]);
      }
      return createVNode(type, propsOrChildren);
    } else {
      return createVNode(type, null, propsOrChildren);
    }
  } else {
    if (l > 3) {
      children = Array.prototype.slice.call(arguments, 2);
    } else if (l === 3 && isVNode(children)) {
      children = [children];
    }
    return createVNode(type, propsOrChildren, children);
  }
}
const ssrContextKey = Symbol.for("v-scx");
const useSSRContext = () => {
  {
    const ctx = inject(ssrContextKey);
    return ctx;
  }
};
const version = "3.3.4";
const svgNS = "http://www.w3.org/2000/svg";
const doc = typeof document !== "undefined" ? document : null;
const templateContainer = doc && /* @__PURE__ */ doc.createElement("template");
const nodeOps = {
  insert: (child, parent, anchor) => {
    parent.insertBefore(child, anchor || null);
  },
  remove: (child) => {
    const parent = child.parentNode;
    if (parent) {
      parent.removeChild(child);
    }
  },
  createElement: (tag, isSVG, is, props2) => {
    const el = isSVG ? doc.createElementNS(svgNS, tag) : doc.createElement(tag, is ? { is } : void 0);
    if (tag === "select" && props2 && props2.multiple != null) {
      el.setAttribute("multiple", props2.multiple);
    }
    return el;
  },
  createText: (text) => doc.createTextNode(text),
  createComment: (text) => doc.createComment(text),
  setText: (node, text) => {
    node.nodeValue = text;
  },
  setElementText: (el, text) => {
    el.textContent = text;
  },
  parentNode: (node) => node.parentNode,
  nextSibling: (node) => node.nextSibling,
  querySelector: (selector) => doc.querySelector(selector),
  setScopeId(el, id) {
    el.setAttribute(id, "");
  },
  insertStaticContent(content, parent, anchor, isSVG, start2, end) {
    const before = anchor ? anchor.previousSibling : parent.lastChild;
    if (start2 && (start2 === end || start2.nextSibling)) {
      while (true) {
        parent.insertBefore(start2.cloneNode(true), anchor);
        if (start2 === end || !(start2 = start2.nextSibling))
          break;
      }
    } else {
      templateContainer.innerHTML = isSVG ? `<svg>${content}</svg>` : content;
      const template = templateContainer.content;
      if (isSVG) {
        const wrapper = template.firstChild;
        while (wrapper.firstChild) {
          template.appendChild(wrapper.firstChild);
        }
        template.removeChild(wrapper);
      }
      parent.insertBefore(template, anchor);
    }
    return [
      before ? before.nextSibling : parent.firstChild,
      anchor ? anchor.previousSibling : parent.lastChild
    ];
  }
};
function patchClass(el, value, isSVG) {
  const transitionClasses = el._vtc;
  if (transitionClasses) {
    value = (value ? [value, ...transitionClasses] : [...transitionClasses]).join(" ");
  }
  if (value == null) {
    el.removeAttribute("class");
  } else if (isSVG) {
    el.setAttribute("class", value);
  } else {
    el.className = value;
  }
}
function patchStyle(el, prev, next) {
  const style = el.style;
  const isCssString = isString(next);
  if (next && !isCssString) {
    if (prev && !isString(prev)) {
      for (const key in prev) {
        if (next[key] == null) {
          setStyle(style, key, "");
        }
      }
    }
    for (const key in next) {
      setStyle(style, key, next[key]);
    }
  } else {
    const currentDisplay = style.display;
    if (isCssString) {
      if (prev !== next) {
        style.cssText = next;
      }
    } else if (prev) {
      el.removeAttribute("style");
    }
    if ("_vod" in el) {
      style.display = currentDisplay;
    }
  }
}
const importantRE = /\s*!important$/;
function setStyle(style, name, val) {
  if (isArray$1(val)) {
    val.forEach((v) => setStyle(style, name, v));
  } else {
    if (val == null)
      val = "";
    if (name.startsWith("--")) {
      style.setProperty(name, val);
    } else {
      const prefixed = autoPrefix(style, name);
      if (importantRE.test(val)) {
        style.setProperty(
          hyphenate(prefixed),
          val.replace(importantRE, ""),
          "important"
        );
      } else {
        style[prefixed] = val;
      }
    }
  }
}
const prefixes = ["Webkit", "Moz", "ms"];
const prefixCache = {};
function autoPrefix(style, rawName) {
  const cached = prefixCache[rawName];
  if (cached) {
    return cached;
  }
  let name = camelize(rawName);
  if (name !== "filter" && name in style) {
    return prefixCache[rawName] = name;
  }
  name = capitalize(name);
  for (let i = 0; i < prefixes.length; i++) {
    const prefixed = prefixes[i] + name;
    if (prefixed in style) {
      return prefixCache[rawName] = prefixed;
    }
  }
  return rawName;
}
const xlinkNS = "http://www.w3.org/1999/xlink";
function patchAttr(el, key, value, isSVG, instance) {
  if (isSVG && key.startsWith("xlink:")) {
    if (value == null) {
      el.removeAttributeNS(xlinkNS, key.slice(6, key.length));
    } else {
      el.setAttributeNS(xlinkNS, key, value);
    }
  } else {
    const isBoolean = isSpecialBooleanAttr(key);
    if (value == null || isBoolean && !includeBooleanAttr(value)) {
      el.removeAttribute(key);
    } else {
      el.setAttribute(key, isBoolean ? "" : value);
    }
  }
}
function patchDOMProp(el, key, value, prevChildren, parentComponent, parentSuspense, unmountChildren) {
  if (key === "innerHTML" || key === "textContent") {
    if (prevChildren) {
      unmountChildren(prevChildren, parentComponent, parentSuspense);
    }
    el[key] = value == null ? "" : value;
    return;
  }
  const tag = el.tagName;
  if (key === "value" && tag !== "PROGRESS" && !tag.includes("-")) {
    el._value = value;
    const oldValue = tag === "OPTION" ? el.getAttribute("value") : el.value;
    const newValue = value == null ? "" : value;
    if (oldValue !== newValue) {
      el.value = newValue;
    }
    if (value == null) {
      el.removeAttribute(key);
    }
    return;
  }
  let needRemove = false;
  if (value === "" || value == null) {
    const type = typeof el[key];
    if (type === "boolean") {
      value = includeBooleanAttr(value);
    } else if (value == null && type === "string") {
      value = "";
      needRemove = true;
    } else if (type === "number") {
      value = 0;
      needRemove = true;
    }
  }
  try {
    el[key] = value;
  } catch (e) {
  }
  needRemove && el.removeAttribute(key);
}
function addEventListener(el, event, handler, options) {
  el.addEventListener(event, handler, options);
}
function removeEventListener(el, event, handler, options) {
  el.removeEventListener(event, handler, options);
}
function patchEvent(el, rawName, prevValue, nextValue, instance = null) {
  const invokers = el._vei || (el._vei = {});
  const existingInvoker = invokers[rawName];
  if (nextValue && existingInvoker) {
    existingInvoker.value = nextValue;
  } else {
    const [name, options] = parseName(rawName);
    if (nextValue) {
      const invoker = invokers[rawName] = createInvoker(nextValue, instance);
      addEventListener(el, name, invoker, options);
    } else if (existingInvoker) {
      removeEventListener(el, name, existingInvoker, options);
      invokers[rawName] = void 0;
    }
  }
}
const optionsModifierRE = /(?:Once|Passive|Capture)$/;
function parseName(name) {
  let options;
  if (optionsModifierRE.test(name)) {
    options = {};
    let m;
    while (m = name.match(optionsModifierRE)) {
      name = name.slice(0, name.length - m[0].length);
      options[m[0].toLowerCase()] = true;
    }
  }
  const event = name[2] === ":" ? name.slice(3) : hyphenate(name.slice(2));
  return [event, options];
}
let cachedNow = 0;
const p = /* @__PURE__ */ Promise.resolve();
const getNow = () => cachedNow || (p.then(() => cachedNow = 0), cachedNow = Date.now());
function createInvoker(initialValue, instance) {
  const invoker = (e) => {
    if (!e._vts) {
      e._vts = Date.now();
    } else if (e._vts <= invoker.attached) {
      return;
    }
    callWithAsyncErrorHandling(
      patchStopImmediatePropagation(e, invoker.value),
      instance,
      5,
      [e]
    );
  };
  invoker.value = initialValue;
  invoker.attached = getNow();
  return invoker;
}
function patchStopImmediatePropagation(e, value) {
  if (isArray$1(value)) {
    const originalStop = e.stopImmediatePropagation;
    e.stopImmediatePropagation = () => {
      originalStop.call(e);
      e._stopped = true;
    };
    return value.map((fn) => (e2) => !e2._stopped && fn && fn(e2));
  } else {
    return value;
  }
}
const nativeOnRE = /^on[a-z]/;
const patchProp = (el, key, prevValue, nextValue, isSVG = false, prevChildren, parentComponent, parentSuspense, unmountChildren) => {
  if (key === "class") {
    patchClass(el, nextValue, isSVG);
  } else if (key === "style") {
    patchStyle(el, prevValue, nextValue);
  } else if (isOn(key)) {
    if (!isModelListener(key)) {
      patchEvent(el, key, prevValue, nextValue, parentComponent);
    }
  } else if (key[0] === "." ? (key = key.slice(1), true) : key[0] === "^" ? (key = key.slice(1), false) : shouldSetAsProp(el, key, nextValue, isSVG)) {
    patchDOMProp(
      el,
      key,
      nextValue,
      prevChildren,
      parentComponent,
      parentSuspense,
      unmountChildren
    );
  } else {
    if (key === "true-value") {
      el._trueValue = nextValue;
    } else if (key === "false-value") {
      el._falseValue = nextValue;
    }
    patchAttr(el, key, nextValue, isSVG);
  }
};
function shouldSetAsProp(el, key, value, isSVG) {
  if (isSVG) {
    if (key === "innerHTML" || key === "textContent") {
      return true;
    }
    if (key in el && nativeOnRE.test(key) && isFunction(value)) {
      return true;
    }
    return false;
  }
  if (key === "spellcheck" || key === "draggable" || key === "translate") {
    return false;
  }
  if (key === "form") {
    return false;
  }
  if (key === "list" && el.tagName === "INPUT") {
    return false;
  }
  if (key === "type" && el.tagName === "TEXTAREA") {
    return false;
  }
  if (nativeOnRE.test(key) && isString(value)) {
    return false;
  }
  return key in el;
}
const TRANSITION = "transition";
const ANIMATION = "animation";
const Transition = (props2, { slots }) => h(BaseTransition, resolveTransitionProps(props2), slots);
Transition.displayName = "Transition";
const DOMTransitionPropsValidators = {
  name: String,
  type: String,
  css: {
    type: Boolean,
    default: true
  },
  duration: [String, Number, Object],
  enterFromClass: String,
  enterActiveClass: String,
  enterToClass: String,
  appearFromClass: String,
  appearActiveClass: String,
  appearToClass: String,
  leaveFromClass: String,
  leaveActiveClass: String,
  leaveToClass: String
};
const TransitionPropsValidators = Transition.props = /* @__PURE__ */ extend(
  {},
  BaseTransitionPropsValidators,
  DOMTransitionPropsValidators
);
const callHook = (hook, args = []) => {
  if (isArray$1(hook)) {
    hook.forEach((h2) => h2(...args));
  } else if (hook) {
    hook(...args);
  }
};
const hasExplicitCallback = (hook) => {
  return hook ? isArray$1(hook) ? hook.some((h2) => h2.length > 1) : hook.length > 1 : false;
};
function resolveTransitionProps(rawProps) {
  const baseProps = {};
  for (const key in rawProps) {
    if (!(key in DOMTransitionPropsValidators)) {
      baseProps[key] = rawProps[key];
    }
  }
  if (rawProps.css === false) {
    return baseProps;
  }
  const {
    name = "v",
    type,
    duration,
    enterFromClass = `${name}-enter-from`,
    enterActiveClass = `${name}-enter-active`,
    enterToClass = `${name}-enter-to`,
    appearFromClass = enterFromClass,
    appearActiveClass = enterActiveClass,
    appearToClass = enterToClass,
    leaveFromClass = `${name}-leave-from`,
    leaveActiveClass = `${name}-leave-active`,
    leaveToClass = `${name}-leave-to`
  } = rawProps;
  const durations = normalizeDuration(duration);
  const enterDuration = durations && durations[0];
  const leaveDuration = durations && durations[1];
  const {
    onBeforeEnter,
    onEnter,
    onEnterCancelled,
    onLeave,
    onLeaveCancelled,
    onBeforeAppear = onBeforeEnter,
    onAppear = onEnter,
    onAppearCancelled = onEnterCancelled
  } = baseProps;
  const finishEnter = (el, isAppear, done) => {
    removeTransitionClass(el, isAppear ? appearToClass : enterToClass);
    removeTransitionClass(el, isAppear ? appearActiveClass : enterActiveClass);
    done && done();
  };
  const finishLeave = (el, done) => {
    el._isLeaving = false;
    removeTransitionClass(el, leaveFromClass);
    removeTransitionClass(el, leaveToClass);
    removeTransitionClass(el, leaveActiveClass);
    done && done();
  };
  const makeEnterHook = (isAppear) => {
    return (el, done) => {
      const hook = isAppear ? onAppear : onEnter;
      const resolve2 = () => finishEnter(el, isAppear, done);
      callHook(hook, [el, resolve2]);
      nextFrame(() => {
        removeTransitionClass(el, isAppear ? appearFromClass : enterFromClass);
        addTransitionClass(el, isAppear ? appearToClass : enterToClass);
        if (!hasExplicitCallback(hook)) {
          whenTransitionEnds(el, type, enterDuration, resolve2);
        }
      });
    };
  };
  return extend(baseProps, {
    onBeforeEnter(el) {
      callHook(onBeforeEnter, [el]);
      addTransitionClass(el, enterFromClass);
      addTransitionClass(el, enterActiveClass);
    },
    onBeforeAppear(el) {
      callHook(onBeforeAppear, [el]);
      addTransitionClass(el, appearFromClass);
      addTransitionClass(el, appearActiveClass);
    },
    onEnter: makeEnterHook(false),
    onAppear: makeEnterHook(true),
    onLeave(el, done) {
      el._isLeaving = true;
      const resolve2 = () => finishLeave(el, done);
      addTransitionClass(el, leaveFromClass);
      forceReflow();
      addTransitionClass(el, leaveActiveClass);
      nextFrame(() => {
        if (!el._isLeaving) {
          return;
        }
        removeTransitionClass(el, leaveFromClass);
        addTransitionClass(el, leaveToClass);
        if (!hasExplicitCallback(onLeave)) {
          whenTransitionEnds(el, type, leaveDuration, resolve2);
        }
      });
      callHook(onLeave, [el, resolve2]);
    },
    onEnterCancelled(el) {
      finishEnter(el, false);
      callHook(onEnterCancelled, [el]);
    },
    onAppearCancelled(el) {
      finishEnter(el, true);
      callHook(onAppearCancelled, [el]);
    },
    onLeaveCancelled(el) {
      finishLeave(el);
      callHook(onLeaveCancelled, [el]);
    }
  });
}
function normalizeDuration(duration) {
  if (duration == null) {
    return null;
  } else if (isObject$1(duration)) {
    return [NumberOf(duration.enter), NumberOf(duration.leave)];
  } else {
    const n = NumberOf(duration);
    return [n, n];
  }
}
function NumberOf(val) {
  const res = toNumber(val);
  return res;
}
function addTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.add(c));
  (el._vtc || (el._vtc = /* @__PURE__ */ new Set())).add(cls);
}
function removeTransitionClass(el, cls) {
  cls.split(/\s+/).forEach((c) => c && el.classList.remove(c));
  const { _vtc } = el;
  if (_vtc) {
    _vtc.delete(cls);
    if (!_vtc.size) {
      el._vtc = void 0;
    }
  }
}
function nextFrame(cb) {
  requestAnimationFrame(() => {
    requestAnimationFrame(cb);
  });
}
let endId = 0;
function whenTransitionEnds(el, expectedType, explicitTimeout, resolve2) {
  const id = el._endId = ++endId;
  const resolveIfNotStale = () => {
    if (id === el._endId) {
      resolve2();
    }
  };
  if (explicitTimeout) {
    return setTimeout(resolveIfNotStale, explicitTimeout);
  }
  const { type, timeout: timeout2, propCount } = getTransitionInfo(el, expectedType);
  if (!type) {
    return resolve2();
  }
  const endEvent = type + "end";
  let ended = 0;
  const end = () => {
    el.removeEventListener(endEvent, onEnd);
    resolveIfNotStale();
  };
  const onEnd = (e) => {
    if (e.target === el && ++ended >= propCount) {
      end();
    }
  };
  setTimeout(() => {
    if (ended < propCount) {
      end();
    }
  }, timeout2 + 1);
  el.addEventListener(endEvent, onEnd);
}
function getTransitionInfo(el, expectedType) {
  const styles = window.getComputedStyle(el);
  const getStyleProperties = (key) => (styles[key] || "").split(", ");
  const transitionDelays = getStyleProperties(`${TRANSITION}Delay`);
  const transitionDurations = getStyleProperties(`${TRANSITION}Duration`);
  const transitionTimeout = getTimeout(transitionDelays, transitionDurations);
  const animationDelays = getStyleProperties(`${ANIMATION}Delay`);
  const animationDurations = getStyleProperties(`${ANIMATION}Duration`);
  const animationTimeout = getTimeout(animationDelays, animationDurations);
  let type = null;
  let timeout2 = 0;
  let propCount = 0;
  if (expectedType === TRANSITION) {
    if (transitionTimeout > 0) {
      type = TRANSITION;
      timeout2 = transitionTimeout;
      propCount = transitionDurations.length;
    }
  } else if (expectedType === ANIMATION) {
    if (animationTimeout > 0) {
      type = ANIMATION;
      timeout2 = animationTimeout;
      propCount = animationDurations.length;
    }
  } else {
    timeout2 = Math.max(transitionTimeout, animationTimeout);
    type = timeout2 > 0 ? transitionTimeout > animationTimeout ? TRANSITION : ANIMATION : null;
    propCount = type ? type === TRANSITION ? transitionDurations.length : animationDurations.length : 0;
  }
  const hasTransform = type === TRANSITION && /\b(transform|all)(,|$)/.test(
    getStyleProperties(`${TRANSITION}Property`).toString()
  );
  return {
    type,
    timeout: timeout2,
    propCount,
    hasTransform
  };
}
function getTimeout(delays, durations) {
  while (delays.length < durations.length) {
    delays = delays.concat(delays);
  }
  return Math.max(...durations.map((d, i) => toMs(d) + toMs(delays[i])));
}
function toMs(s) {
  return Number(s.slice(0, -1).replace(",", ".")) * 1e3;
}
function forceReflow() {
  return document.body.offsetHeight;
}
const positionMap = /* @__PURE__ */ new WeakMap();
const newPositionMap = /* @__PURE__ */ new WeakMap();
const TransitionGroupImpl = {
  name: "TransitionGroup",
  props: /* @__PURE__ */ extend({}, TransitionPropsValidators, {
    tag: String,
    moveClass: String
  }),
  setup(props2, { slots }) {
    const instance = getCurrentInstance();
    const state = useTransitionState();
    let prevChildren;
    let children;
    onUpdated(() => {
      if (!prevChildren.length) {
        return;
      }
      const moveClass = props2.moveClass || `${props2.name || "v"}-move`;
      if (!hasCSSTransform(
        prevChildren[0].el,
        instance.vnode.el,
        moveClass
      )) {
        return;
      }
      prevChildren.forEach(callPendingCbs);
      prevChildren.forEach(recordPosition);
      const movedChildren = prevChildren.filter(applyTranslation);
      forceReflow();
      movedChildren.forEach((c) => {
        const el = c.el;
        const style = el.style;
        addTransitionClass(el, moveClass);
        style.transform = style.webkitTransform = style.transitionDuration = "";
        const cb = el._moveCb = (e) => {
          if (e && e.target !== el) {
            return;
          }
          if (!e || /transform$/.test(e.propertyName)) {
            el.removeEventListener("transitionend", cb);
            el._moveCb = null;
            removeTransitionClass(el, moveClass);
          }
        };
        el.addEventListener("transitionend", cb);
      });
    });
    return () => {
      const rawProps = toRaw(props2);
      const cssTransitionProps = resolveTransitionProps(rawProps);
      let tag = rawProps.tag || Fragment;
      prevChildren = children;
      children = slots.default ? getTransitionRawChildren(slots.default()) : [];
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        if (child.key != null) {
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
        }
      }
      if (prevChildren) {
        for (let i = 0; i < prevChildren.length; i++) {
          const child = prevChildren[i];
          setTransitionHooks(
            child,
            resolveTransitionHooks(child, cssTransitionProps, state, instance)
          );
          positionMap.set(child, child.el.getBoundingClientRect());
        }
      }
      return createVNode(tag, null, children);
    };
  }
};
const removeMode = (props2) => delete props2.mode;
/* @__PURE__ */ removeMode(TransitionGroupImpl.props);
const TransitionGroup = TransitionGroupImpl;
function callPendingCbs(c) {
  const el = c.el;
  if (el._moveCb) {
    el._moveCb();
  }
  if (el._enterCb) {
    el._enterCb();
  }
}
function recordPosition(c) {
  newPositionMap.set(c, c.el.getBoundingClientRect());
}
function applyTranslation(c) {
  const oldPos = positionMap.get(c);
  const newPos = newPositionMap.get(c);
  const dx = oldPos.left - newPos.left;
  const dy = oldPos.top - newPos.top;
  if (dx || dy) {
    const s = c.el.style;
    s.transform = s.webkitTransform = `translate(${dx}px,${dy}px)`;
    s.transitionDuration = "0s";
    return c;
  }
}
function hasCSSTransform(el, root, moveClass) {
  const clone = el.cloneNode();
  if (el._vtc) {
    el._vtc.forEach((cls) => {
      cls.split(/\s+/).forEach((c) => c && clone.classList.remove(c));
    });
  }
  moveClass.split(/\s+/).forEach((c) => c && clone.classList.add(c));
  clone.style.display = "none";
  const container = root.nodeType === 1 ? root : root.parentNode;
  container.appendChild(clone);
  const { hasTransform } = getTransitionInfo(clone);
  container.removeChild(clone);
  return hasTransform;
}
const vShow = {
  beforeMount(el, { value }, { transition }) {
    el._vod = el.style.display === "none" ? "" : el.style.display;
    if (transition && value) {
      transition.beforeEnter(el);
    } else {
      setDisplay(el, value);
    }
  },
  mounted(el, { value }, { transition }) {
    if (transition && value) {
      transition.enter(el);
    }
  },
  updated(el, { value, oldValue }, { transition }) {
    if (!value === !oldValue)
      return;
    if (transition) {
      if (value) {
        transition.beforeEnter(el);
        setDisplay(el, true);
        transition.enter(el);
      } else {
        transition.leave(el, () => {
          setDisplay(el, false);
        });
      }
    } else {
      setDisplay(el, value);
    }
  },
  beforeUnmount(el, { value }) {
    setDisplay(el, value);
  }
};
function setDisplay(el, value) {
  el.style.display = value ? el._vod : "none";
}
const rendererOptions = /* @__PURE__ */ extend({ patchProp }, nodeOps);
let renderer;
function ensureRenderer() {
  return renderer || (renderer = createRenderer(rendererOptions));
}
const createApp = (...args) => {
  const app2 = ensureRenderer().createApp(...args);
  const { mount } = app2;
  app2.mount = (containerOrSelector) => {
    const container = normalizeContainer(containerOrSelector);
    if (!container)
      return;
    const component = app2._component;
    if (!isFunction(component) && !component.render && !component.template) {
      component.template = container.innerHTML;
    }
    container.innerHTML = "";
    const proxy = mount(container, false, container instanceof SVGElement);
    if (container instanceof Element) {
      container.removeAttribute("v-cloak");
      container.setAttribute("data-v-app", "");
    }
    return proxy;
  };
  return app2;
};
function normalizeContainer(container) {
  if (isString(container)) {
    const res = document.querySelector(container);
    return res;
  }
  return container;
}
let buf, bufIdx = 0;
const hexBytes = new Array(256);
for (let i = 0; i < 256; i++) {
  hexBytes[i] = (i + 256).toString(16).substring(1);
}
const randomBytes = (() => {
  const lib = typeof crypto !== "undefined" ? crypto : typeof window !== "undefined" ? window.crypto || window.msCrypto : void 0;
  if (lib !== void 0) {
    if (lib.randomBytes !== void 0) {
      return lib.randomBytes;
    }
    if (lib.getRandomValues !== void 0) {
      return (n) => {
        const bytes = new Uint8Array(n);
        lib.getRandomValues(bytes);
        return bytes;
      };
    }
  }
  return (n) => {
    const r = [];
    for (let i = n; i > 0; i--) {
      r.push(Math.floor(Math.random() * 256));
    }
    return r;
  };
})();
const BUFFER_SIZE = 4096;
function uid$2() {
  if (buf === void 0 || bufIdx + 16 > BUFFER_SIZE) {
    bufIdx = 0;
    buf = randomBytes(BUFFER_SIZE);
  }
  const b = Array.prototype.slice.call(buf, bufIdx, bufIdx += 16);
  b[6] = b[6] & 15 | 64;
  b[8] = b[8] & 63 | 128;
  return hexBytes[b[0]] + hexBytes[b[1]] + hexBytes[b[2]] + hexBytes[b[3]] + "-" + hexBytes[b[4]] + hexBytes[b[5]] + "-" + hexBytes[b[6]] + hexBytes[b[7]] + "-" + hexBytes[b[8]] + hexBytes[b[9]] + "-" + hexBytes[b[10]] + hexBytes[b[11]] + hexBytes[b[12]] + hexBytes[b[13]] + hexBytes[b[14]] + hexBytes[b[15]];
}
var events = { exports: {} };
var R = typeof Reflect === "object" ? Reflect : null;
var ReflectApply = R && typeof R.apply === "function" ? R.apply : function ReflectApply2(target2, receiver, args) {
  return Function.prototype.apply.call(target2, receiver, args);
};
var ReflectOwnKeys;
if (R && typeof R.ownKeys === "function") {
  ReflectOwnKeys = R.ownKeys;
} else if (Object.getOwnPropertySymbols) {
  ReflectOwnKeys = function ReflectOwnKeys2(target2) {
    return Object.getOwnPropertyNames(target2).concat(Object.getOwnPropertySymbols(target2));
  };
} else {
  ReflectOwnKeys = function ReflectOwnKeys2(target2) {
    return Object.getOwnPropertyNames(target2);
  };
}
function ProcessEmitWarning(warning) {
  if (console && console.warn)
    console.warn(warning);
}
var NumberIsNaN = Number.isNaN || function NumberIsNaN2(value) {
  return value !== value;
};
function EventEmitter() {
  EventEmitter.init.call(this);
}
events.exports = EventEmitter;
events.exports.once = once2;
EventEmitter.EventEmitter = EventEmitter;
EventEmitter.prototype._events = void 0;
EventEmitter.prototype._eventsCount = 0;
EventEmitter.prototype._maxListeners = void 0;
var defaultMaxListeners = 10;
function checkListener(listener) {
  if (typeof listener !== "function") {
    throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof listener);
  }
}
Object.defineProperty(EventEmitter, "defaultMaxListeners", {
  enumerable: true,
  get: function() {
    return defaultMaxListeners;
  },
  set: function(arg) {
    if (typeof arg !== "number" || arg < 0 || NumberIsNaN(arg)) {
      throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + arg + ".");
    }
    defaultMaxListeners = arg;
  }
});
EventEmitter.init = function() {
  if (this._events === void 0 || this._events === Object.getPrototypeOf(this)._events) {
    this._events = /* @__PURE__ */ Object.create(null);
    this._eventsCount = 0;
  }
  this._maxListeners = this._maxListeners || void 0;
};
EventEmitter.prototype.setMaxListeners = function setMaxListeners(n) {
  if (typeof n !== "number" || n < 0 || NumberIsNaN(n)) {
    throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + n + ".");
  }
  this._maxListeners = n;
  return this;
};
function _getMaxListeners(that) {
  if (that._maxListeners === void 0)
    return EventEmitter.defaultMaxListeners;
  return that._maxListeners;
}
EventEmitter.prototype.getMaxListeners = function getMaxListeners() {
  return _getMaxListeners(this);
};
EventEmitter.prototype.emit = function emit2(type) {
  var args = [];
  for (var i = 1; i < arguments.length; i++)
    args.push(arguments[i]);
  var doError = type === "error";
  var events2 = this._events;
  if (events2 !== void 0)
    doError = doError && events2.error === void 0;
  else if (!doError)
    return false;
  if (doError) {
    var er;
    if (args.length > 0)
      er = args[0];
    if (er instanceof Error) {
      throw er;
    }
    var err = new Error("Unhandled error." + (er ? " (" + er.message + ")" : ""));
    err.context = er;
    throw err;
  }
  var handler = events2[type];
  if (handler === void 0)
    return false;
  if (typeof handler === "function") {
    ReflectApply(handler, this, args);
  } else {
    var len = handler.length;
    var listeners2 = arrayClone(handler, len);
    for (var i = 0; i < len; ++i)
      ReflectApply(listeners2[i], this, args);
  }
  return true;
};
function _addListener(target2, type, listener, prepend) {
  var m;
  var events2;
  var existing;
  checkListener(listener);
  events2 = target2._events;
  if (events2 === void 0) {
    events2 = target2._events = /* @__PURE__ */ Object.create(null);
    target2._eventsCount = 0;
  } else {
    if (events2.newListener !== void 0) {
      target2.emit(
        "newListener",
        type,
        listener.listener ? listener.listener : listener
      );
      events2 = target2._events;
    }
    existing = events2[type];
  }
  if (existing === void 0) {
    existing = events2[type] = listener;
    ++target2._eventsCount;
  } else {
    if (typeof existing === "function") {
      existing = events2[type] = prepend ? [listener, existing] : [existing, listener];
    } else if (prepend) {
      existing.unshift(listener);
    } else {
      existing.push(listener);
    }
    m = _getMaxListeners(target2);
    if (m > 0 && existing.length > m && !existing.warned) {
      existing.warned = true;
      var w = new Error("Possible EventEmitter memory leak detected. " + existing.length + " " + String(type) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      w.name = "MaxListenersExceededWarning";
      w.emitter = target2;
      w.type = type;
      w.count = existing.length;
      ProcessEmitWarning(w);
    }
  }
  return target2;
}
EventEmitter.prototype.addListener = function addListener(type, listener) {
  return _addListener(this, type, listener, false);
};
EventEmitter.prototype.on = EventEmitter.prototype.addListener;
EventEmitter.prototype.prependListener = function prependListener(type, listener) {
  return _addListener(this, type, listener, true);
};
function onceWrapper() {
  if (!this.fired) {
    this.target.removeListener(this.type, this.wrapFn);
    this.fired = true;
    if (arguments.length === 0)
      return this.listener.call(this.target);
    return this.listener.apply(this.target, arguments);
  }
}
function _onceWrap(target2, type, listener) {
  var state = { fired: false, wrapFn: void 0, target: target2, type, listener };
  var wrapped = onceWrapper.bind(state);
  wrapped.listener = listener;
  state.wrapFn = wrapped;
  return wrapped;
}
EventEmitter.prototype.once = function once(type, listener) {
  checkListener(listener);
  this.on(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.prependOnceListener = function prependOnceListener(type, listener) {
  checkListener(listener);
  this.prependListener(type, _onceWrap(this, type, listener));
  return this;
};
EventEmitter.prototype.removeListener = function removeListener(type, listener) {
  var list, events2, position2, i, originalListener;
  checkListener(listener);
  events2 = this._events;
  if (events2 === void 0)
    return this;
  list = events2[type];
  if (list === void 0)
    return this;
  if (list === listener || list.listener === listener) {
    if (--this._eventsCount === 0)
      this._events = /* @__PURE__ */ Object.create(null);
    else {
      delete events2[type];
      if (events2.removeListener)
        this.emit("removeListener", type, list.listener || listener);
    }
  } else if (typeof list !== "function") {
    position2 = -1;
    for (i = list.length - 1; i >= 0; i--) {
      if (list[i] === listener || list[i].listener === listener) {
        originalListener = list[i].listener;
        position2 = i;
        break;
      }
    }
    if (position2 < 0)
      return this;
    if (position2 === 0)
      list.shift();
    else {
      spliceOne(list, position2);
    }
    if (list.length === 1)
      events2[type] = list[0];
    if (events2.removeListener !== void 0)
      this.emit("removeListener", type, originalListener || listener);
  }
  return this;
};
EventEmitter.prototype.off = EventEmitter.prototype.removeListener;
EventEmitter.prototype.removeAllListeners = function removeAllListeners(type) {
  var listeners2, events2, i;
  events2 = this._events;
  if (events2 === void 0)
    return this;
  if (events2.removeListener === void 0) {
    if (arguments.length === 0) {
      this._events = /* @__PURE__ */ Object.create(null);
      this._eventsCount = 0;
    } else if (events2[type] !== void 0) {
      if (--this._eventsCount === 0)
        this._events = /* @__PURE__ */ Object.create(null);
      else
        delete events2[type];
    }
    return this;
  }
  if (arguments.length === 0) {
    var keys = Object.keys(events2);
    var key;
    for (i = 0; i < keys.length; ++i) {
      key = keys[i];
      if (key === "removeListener")
        continue;
      this.removeAllListeners(key);
    }
    this.removeAllListeners("removeListener");
    this._events = /* @__PURE__ */ Object.create(null);
    this._eventsCount = 0;
    return this;
  }
  listeners2 = events2[type];
  if (typeof listeners2 === "function") {
    this.removeListener(type, listeners2);
  } else if (listeners2 !== void 0) {
    for (i = listeners2.length - 1; i >= 0; i--) {
      this.removeListener(type, listeners2[i]);
    }
  }
  return this;
};
function _listeners(target2, type, unwrap) {
  var events2 = target2._events;
  if (events2 === void 0)
    return [];
  var evlistener = events2[type];
  if (evlistener === void 0)
    return [];
  if (typeof evlistener === "function")
    return unwrap ? [evlistener.listener || evlistener] : [evlistener];
  return unwrap ? unwrapListeners(evlistener) : arrayClone(evlistener, evlistener.length);
}
EventEmitter.prototype.listeners = function listeners(type) {
  return _listeners(this, type, true);
};
EventEmitter.prototype.rawListeners = function rawListeners(type) {
  return _listeners(this, type, false);
};
EventEmitter.listenerCount = function(emitter, type) {
  if (typeof emitter.listenerCount === "function") {
    return emitter.listenerCount(type);
  } else {
    return listenerCount.call(emitter, type);
  }
};
EventEmitter.prototype.listenerCount = listenerCount;
function listenerCount(type) {
  var events2 = this._events;
  if (events2 !== void 0) {
    var evlistener = events2[type];
    if (typeof evlistener === "function") {
      return 1;
    } else if (evlistener !== void 0) {
      return evlistener.length;
    }
  }
  return 0;
}
EventEmitter.prototype.eventNames = function eventNames() {
  return this._eventsCount > 0 ? ReflectOwnKeys(this._events) : [];
};
function arrayClone(arr, n) {
  var copy = new Array(n);
  for (var i = 0; i < n; ++i)
    copy[i] = arr[i];
  return copy;
}
function spliceOne(list, index) {
  for (; index + 1 < list.length; index++)
    list[index] = list[index + 1];
  list.pop();
}
function unwrapListeners(arr) {
  var ret = new Array(arr.length);
  for (var i = 0; i < ret.length; ++i) {
    ret[i] = arr[i].listener || arr[i];
  }
  return ret;
}
function once2(emitter, name) {
  return new Promise(function(resolve2, reject) {
    function errorListener(err) {
      emitter.removeListener(name, resolver);
      reject(err);
    }
    function resolver() {
      if (typeof emitter.removeListener === "function") {
        emitter.removeListener("error", errorListener);
      }
      resolve2([].slice.call(arguments));
    }
    eventTargetAgnosticAddListener(emitter, name, resolver, { once: true });
    if (name !== "error") {
      addErrorHandlerIfEventEmitter(emitter, errorListener, { once: true });
    }
  });
}
function addErrorHandlerIfEventEmitter(emitter, handler, flags) {
  if (typeof emitter.on === "function") {
    eventTargetAgnosticAddListener(emitter, "error", handler, flags);
  }
}
function eventTargetAgnosticAddListener(emitter, name, listener, flags) {
  if (typeof emitter.on === "function") {
    if (flags.once) {
      emitter.once(name, listener);
    } else {
      emitter.on(name, listener);
    }
  } else if (typeof emitter.addEventListener === "function") {
    emitter.addEventListener(name, function wrapListener(arg) {
      if (flags.once) {
        emitter.removeEventListener(name, wrapListener);
      }
      listener(arg);
    });
  } else {
    throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof emitter);
  }
}
const typeSizes = {
  "undefined": () => 0,
  "boolean": () => 4,
  "number": () => 8,
  "string": (item) => 2 * item.length,
  "object": (item) => !item ? 0 : Object.keys(item).reduce((total, key) => sizeOf(key) + sizeOf(item[key]) + total, 0)
}, sizeOf = (value) => typeSizes[typeof value](value);
class Bridge extends events.exports.EventEmitter {
  constructor(wall) {
    super();
    this.setMaxListeners(Infinity);
    this.wall = wall;
    wall.listen((messages) => {
      if (Array.isArray(messages)) {
        messages.forEach((message) => this._emit(message));
      } else {
        this._emit(messages);
      }
    });
    this._sendingQueue = [];
    this._sending = false;
    this._maxMessageSize = 32 * 1024 * 1024;
  }
  send(event, payload) {
    return this._send([{ event, payload }]);
  }
  getEvents() {
    return this._events;
  }
  on(eventName, listener) {
    return super.on(eventName, (originalPayload) => {
      listener({
        ...originalPayload,
        respond: (payload) => this.send(originalPayload.eventResponseKey, payload)
      });
    });
  }
  _emit(message) {
    if (typeof message === "string") {
      this.emit(message);
    } else {
      this.emit(message.event, message.payload);
    }
  }
  _send(messages) {
    this._sendingQueue.push(messages);
    return this._nextSend();
  }
  _nextSend() {
    if (!this._sendingQueue.length || this._sending)
      return Promise.resolve();
    this._sending = true;
    const messages = this._sendingQueue.shift(), currentMessage = messages[0], eventListenerKey = `${currentMessage.event}.${uid$2()}`, eventResponseKey = eventListenerKey + ".result";
    return new Promise((resolve2, reject) => {
      let allChunks = [];
      const fn = (r) => {
        if (r !== void 0 && r._chunkSplit) {
          const chunkData = r._chunkSplit;
          allChunks = [...allChunks, ...r.data];
          if (chunkData.lastChunk) {
            this.off(eventResponseKey, fn);
            resolve2(allChunks);
          }
        } else {
          this.off(eventResponseKey, fn);
          resolve2(r);
        }
      };
      this.on(eventResponseKey, fn);
      try {
        const messagesToSend = messages.map((m) => {
          return {
            ...m,
            ...{
              payload: {
                data: m.payload,
                eventResponseKey
              }
            }
          };
        });
        this.wall.send(messagesToSend);
      } catch (err) {
        const errorMessage = "Message length exceeded maximum allowed length.";
        if (err.message === errorMessage) {
          if (!Array.isArray(currentMessage.payload))
            ;
          else {
            const objectSize = sizeOf(currentMessage);
            if (objectSize > this._maxMessageSize) {
              const chunksRequired = Math.ceil(objectSize / this._maxMessageSize), arrayItemCount = Math.ceil(currentMessage.payload.length / chunksRequired);
              let data = currentMessage.payload;
              for (let i = 0; i < chunksRequired; i++) {
                let take = Math.min(data.length, arrayItemCount);
                this.wall.send([{
                  event: currentMessage.event,
                  payload: {
                    _chunkSplit: {
                      count: chunksRequired,
                      lastChunk: i === chunksRequired - 1
                    },
                    data: data.splice(0, take)
                  }
                }]);
              }
            }
          }
        }
      }
      this._sending = false;
      setTimeout(() => {
        return this._nextSend();
      }, 16);
    });
  }
}
var robotoFont = "";
var materialIcons$1 = "";
var bootstrapIcons = "";
var bounce = "";
var flash = "";
var flip = "";
var headShake = "";
var heartBeat = "";
var hinge = "";
var jello = "";
var pulse = "";
var rubberBand = "";
var shake = "";
var shakeX = "";
var shakeY = "";
var swing = "";
var tada = "";
var wobble = "";
var backInDown = "";
var backInLeft = "";
var backInRight = "";
var backInUp = "";
var bounceIn = "";
var bounceInDown = "";
var bounceInLeft = "";
var bounceInRight = "";
var bounceInUp = "";
var fadeIn = "";
var fadeInBottomLeft = "";
var fadeInBottomRight = "";
var fadeInDown = "";
var fadeInDownBig = "";
var fadeInLeft = "";
var fadeInLeftBig = "";
var fadeInRight = "";
var fadeInRightBig = "";
var fadeInTopLeft = "";
var fadeInTopRight = "";
var fadeInUp = "";
var fadeInUpBig = "";
var flipInX = "";
var flipInY = "";
var jackInTheBox = "";
var lightSpeedInLeft = "";
var lightSpeedInRight = "";
var rollIn = "";
var rotateIn = "";
var rotateInDownLeft = "";
var rotateInDownRight = "";
var rotateInUpLeft = "";
var rotateInUpRight = "";
var slideInDown = "";
var slideInLeft = "";
var slideInRight = "";
var slideInUp = "";
var zoomIn = "";
var zoomInDown = "";
var zoomInLeft = "";
var zoomInRight = "";
var zoomInUp = "";
var backOutDown = "";
var backOutLeft = "";
var backOutRight = "";
var backOutUp = "";
var bounceOut = "";
var bounceOutDown = "";
var bounceOutLeft = "";
var bounceOutRight = "";
var bounceOutUp = "";
var fadeOut = "";
var fadeOutBottomLeft = "";
var fadeOutBottomRight = "";
var fadeOutDown = "";
var fadeOutDownBig = "";
var fadeOutLeft = "";
var fadeOutLeftBig = "";
var fadeOutRight = "";
var fadeOutRightBig = "";
var fadeOutTopLeft = "";
var fadeOutTopRight = "";
var fadeOutUp = "";
var fadeOutUpBig = "";
var flipOutX = "";
var flipOutY = "";
var lightSpeedOutLeft = "";
var lightSpeedOutRight = "";
var rollOut = "";
var rotateOut = "";
var rotateOutDownLeft = "";
var rotateOutDownRight = "";
var rotateOutUpLeft = "";
var rotateOutUpRight = "";
var slideOutDown = "";
var slideOutLeft = "";
var slideOutRight = "";
var slideOutUp = "";
var zoomOut = "";
var zoomOutDown = "";
var zoomOutLeft = "";
var zoomOutRight = "";
var zoomOutUp = "";
var quasar = "";
var app$1 = "";
function injectProp(target2, propName, get2, set2) {
  Object.defineProperty(target2, propName, {
    get: get2,
    set: set2,
    enumerable: true
  });
  return target2;
}
const isRuntimeSsrPreHydration = ref(
  false
);
let iosCorrection;
function getMatch(userAgent2, platformMatch) {
  const match = /(edg|edge|edga|edgios)\/([\w.]+)/.exec(userAgent2) || /(opr)[\/]([\w.]+)/.exec(userAgent2) || /(vivaldi)[\/]([\w.]+)/.exec(userAgent2) || /(chrome|crios)[\/]([\w.]+)/.exec(userAgent2) || /(version)(applewebkit)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent2) || /(webkit)[\/]([\w.]+).*(version)[\/]([\w.]+).*(safari)[\/]([\w.]+)/.exec(userAgent2) || /(firefox|fxios)[\/]([\w.]+)/.exec(userAgent2) || /(webkit)[\/]([\w.]+)/.exec(userAgent2) || /(opera)(?:.*version|)[\/]([\w.]+)/.exec(userAgent2) || [];
  return {
    browser: match[5] || match[3] || match[1] || "",
    version: match[2] || match[4] || "0",
    versionNumber: match[4] || match[2] || "0",
    platform: platformMatch[0] || ""
  };
}
function getPlatformMatch(userAgent2) {
  return /(ipad)/.exec(userAgent2) || /(ipod)/.exec(userAgent2) || /(windows phone)/.exec(userAgent2) || /(iphone)/.exec(userAgent2) || /(kindle)/.exec(userAgent2) || /(silk)/.exec(userAgent2) || /(android)/.exec(userAgent2) || /(win)/.exec(userAgent2) || /(mac)/.exec(userAgent2) || /(linux)/.exec(userAgent2) || /(cros)/.exec(userAgent2) || /(playbook)/.exec(userAgent2) || /(bb)/.exec(userAgent2) || /(blackberry)/.exec(userAgent2) || [];
}
const hasTouch = "ontouchstart" in window || window.navigator.maxTouchPoints > 0;
function applyIosCorrection(is) {
  iosCorrection = { is: { ...is } };
  delete is.mac;
  delete is.desktop;
  const platform = Math.min(window.innerHeight, window.innerWidth) > 414 ? "ipad" : "iphone";
  Object.assign(is, {
    mobile: true,
    ios: true,
    platform,
    [platform]: true
  });
}
function getPlatform(UA) {
  const userAgent2 = UA.toLowerCase(), platformMatch = getPlatformMatch(userAgent2), matched = getMatch(userAgent2, platformMatch), browser = {};
  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
    browser.versionNumber = parseInt(matched.versionNumber, 10);
  }
  if (matched.platform) {
    browser[matched.platform] = true;
  }
  const knownMobiles = browser.android || browser.ios || browser.bb || browser.blackberry || browser.ipad || browser.iphone || browser.ipod || browser.kindle || browser.playbook || browser.silk || browser["windows phone"];
  if (knownMobiles === true || userAgent2.indexOf("mobile") > -1) {
    browser.mobile = true;
    if (browser.edga || browser.edgios) {
      browser.edge = true;
      matched.browser = "edge";
    } else if (browser.crios) {
      browser.chrome = true;
      matched.browser = "chrome";
    } else if (browser.fxios) {
      browser.firefox = true;
      matched.browser = "firefox";
    }
  } else {
    browser.desktop = true;
  }
  if (browser.ipod || browser.ipad || browser.iphone) {
    browser.ios = true;
  }
  if (browser["windows phone"]) {
    browser.winphone = true;
    delete browser["windows phone"];
  }
  if (browser.chrome || browser.opr || browser.safari || browser.vivaldi || browser.mobile === true && browser.ios !== true && knownMobiles !== true) {
    browser.webkit = true;
  }
  if (browser.edg) {
    matched.browser = "edgechromium";
    browser.edgeChromium = true;
  }
  if (browser.safari && browser.blackberry || browser.bb) {
    matched.browser = "blackberry";
    browser.blackberry = true;
  }
  if (browser.safari && browser.playbook) {
    matched.browser = "playbook";
    browser.playbook = true;
  }
  if (browser.opr) {
    matched.browser = "opera";
    browser.opera = true;
  }
  if (browser.safari && browser.android) {
    matched.browser = "android";
    browser.android = true;
  }
  if (browser.safari && browser.kindle) {
    matched.browser = "kindle";
    browser.kindle = true;
  }
  if (browser.safari && browser.silk) {
    matched.browser = "silk";
    browser.silk = true;
  }
  if (browser.vivaldi) {
    matched.browser = "vivaldi";
    browser.vivaldi = true;
  }
  browser.name = matched.browser;
  browser.platform = matched.platform;
  {
    if (userAgent2.indexOf("electron") > -1) {
      browser.electron = true;
    } else if (document.location.href.indexOf("-extension://") > -1) {
      browser.bex = true;
    } else {
      if (window.Capacitor !== void 0) {
        browser.capacitor = true;
        browser.nativeMobile = true;
        browser.nativeMobileWrapper = "capacitor";
      } else if (window._cordovaNative !== void 0 || window.cordova !== void 0) {
        browser.cordova = true;
        browser.nativeMobile = true;
        browser.nativeMobileWrapper = "cordova";
      }
      if (hasTouch === true && browser.mac === true && (browser.desktop === true && browser.safari === true || browser.nativeMobile === true && browser.android !== true && browser.ios !== true && browser.ipad !== true)) {
        applyIosCorrection(browser);
      }
    }
  }
  return browser;
}
const userAgent = navigator.userAgent || navigator.vendor || window.opera;
const ssrClient = {
  has: {
    touch: false,
    webStorage: false
  },
  within: { iframe: false }
};
const client = {
  userAgent,
  is: getPlatform(userAgent),
  has: {
    touch: hasTouch
  },
  within: {
    iframe: window.self !== window.top
  }
};
const Platform = {
  install(opts) {
    const { $q } = opts;
    if (isRuntimeSsrPreHydration.value === true) {
      opts.onSSRHydrated.push(() => {
        Object.assign($q.platform, client);
        isRuntimeSsrPreHydration.value = false;
        iosCorrection = void 0;
      });
      $q.platform = reactive(this);
    } else {
      $q.platform = this;
    }
  }
};
{
  let hasWebStorage;
  injectProp(client.has, "webStorage", () => {
    if (hasWebStorage !== void 0) {
      return hasWebStorage;
    }
    try {
      if (window.localStorage) {
        hasWebStorage = true;
        return true;
      }
    } catch (e) {
    }
    hasWebStorage = false;
    return false;
  });
  client.is.ios === true && window.navigator.vendor.toLowerCase().indexOf("apple") === -1;
  if (isRuntimeSsrPreHydration.value === true) {
    Object.assign(Platform, client, iosCorrection, ssrClient);
  } else {
    Object.assign(Platform, client);
  }
}
var defineReactivePlugin = (state, plugin) => {
  const reactiveState = reactive(state);
  for (const name in state) {
    injectProp(
      plugin,
      name,
      () => reactiveState[name],
      (val) => {
        reactiveState[name] = val;
      }
    );
  }
  return plugin;
};
const listenOpts = {
  hasPassive: false,
  passiveCapture: true,
  notPassiveCapture: true
};
try {
  const opts = Object.defineProperty({}, "passive", {
    get() {
      Object.assign(listenOpts, {
        hasPassive: true,
        passive: { passive: true },
        notPassive: { passive: false },
        passiveCapture: { passive: true, capture: true },
        notPassiveCapture: { passive: false, capture: true }
      });
    }
  });
  window.addEventListener("qtest", null, opts);
  window.removeEventListener("qtest", null, opts);
} catch (e) {
}
function noop$2() {
}
function leftClick(e) {
  return e.button === 0;
}
function position(e) {
  if (e.touches && e.touches[0]) {
    e = e.touches[0];
  } else if (e.changedTouches && e.changedTouches[0]) {
    e = e.changedTouches[0];
  } else if (e.targetTouches && e.targetTouches[0]) {
    e = e.targetTouches[0];
  }
  return {
    top: e.clientY,
    left: e.clientX
  };
}
function getEventPath(e) {
  if (e.path) {
    return e.path;
  }
  if (e.composedPath) {
    return e.composedPath();
  }
  const path = [];
  let el = e.target;
  while (el) {
    path.push(el);
    if (el.tagName === "HTML") {
      path.push(document);
      path.push(window);
      return path;
    }
    el = el.parentElement;
  }
}
function stop(e) {
  e.stopPropagation();
}
function prevent(e) {
  e.cancelable !== false && e.preventDefault();
}
function stopAndPrevent(e) {
  e.cancelable !== false && e.preventDefault();
  e.stopPropagation();
}
function preventDraggable(el, status) {
  if (el === void 0 || status === true && el.__dragPrevented === true) {
    return;
  }
  const fn = status === true ? (el2) => {
    el2.__dragPrevented = true;
    el2.addEventListener("dragstart", prevent, listenOpts.notPassiveCapture);
  } : (el2) => {
    delete el2.__dragPrevented;
    el2.removeEventListener("dragstart", prevent, listenOpts.notPassiveCapture);
  };
  el.querySelectorAll("a, img").forEach(fn);
}
function addEvt(ctx, targetName, events2) {
  const name = `__q_${targetName}_evt`;
  ctx[name] = ctx[name] !== void 0 ? ctx[name].concat(events2) : events2;
  events2.forEach((evt) => {
    evt[0].addEventListener(evt[1], ctx[evt[2]], listenOpts[evt[3]]);
  });
}
function cleanEvt(ctx, targetName) {
  const name = `__q_${targetName}_evt`;
  if (ctx[name] !== void 0) {
    ctx[name].forEach((evt) => {
      evt[0].removeEventListener(evt[1], ctx[evt[2]], listenOpts[evt[3]]);
    });
    ctx[name] = void 0;
  }
}
function debounce(fn, wait = 250, immediate) {
  let timer = null;
  function debounced() {
    const args = arguments;
    const later = () => {
      timer = null;
      if (immediate !== true) {
        fn.apply(this, args);
      }
    };
    if (timer !== null) {
      clearTimeout(timer);
    } else if (immediate === true) {
      fn.apply(this, args);
    }
    timer = setTimeout(later, wait);
  }
  debounced.cancel = () => {
    timer !== null && clearTimeout(timer);
  };
  return debounced;
}
const SIZE_LIST = ["sm", "md", "lg", "xl"];
const { passive } = listenOpts;
var Screen = defineReactivePlugin({
  width: 0,
  height: 0,
  name: "xs",
  sizes: {
    sm: 600,
    md: 1024,
    lg: 1440,
    xl: 1920
  },
  lt: {
    sm: true,
    md: true,
    lg: true,
    xl: true
  },
  gt: {
    xs: false,
    sm: false,
    md: false,
    lg: false
  },
  xs: true,
  sm: false,
  md: false,
  lg: false,
  xl: false
}, {
  setSizes: noop$2,
  setDebounce: noop$2,
  install({ $q, onSSRHydrated }) {
    $q.screen = this;
    if (this.__installed === true) {
      if ($q.config.screen !== void 0) {
        if ($q.config.screen.bodyClasses === false) {
          document.body.classList.remove(`screen--${this.name}`);
        } else {
          this.__update(true);
        }
      }
      return;
    }
    const { visualViewport } = window;
    const target2 = visualViewport || window;
    const scrollingElement = document.scrollingElement || document.documentElement;
    const getSize = visualViewport === void 0 || client.is.mobile === true ? () => [
      Math.max(window.innerWidth, scrollingElement.clientWidth),
      Math.max(window.innerHeight, scrollingElement.clientHeight)
    ] : () => [
      visualViewport.width * visualViewport.scale + window.innerWidth - scrollingElement.clientWidth,
      visualViewport.height * visualViewport.scale + window.innerHeight - scrollingElement.clientHeight
    ];
    const classes = $q.config.screen !== void 0 && $q.config.screen.bodyClasses === true;
    this.__update = (force) => {
      const [w, h2] = getSize();
      if (h2 !== this.height) {
        this.height = h2;
      }
      if (w !== this.width) {
        this.width = w;
      } else if (force !== true) {
        return;
      }
      let s = this.sizes;
      this.gt.xs = w >= s.sm;
      this.gt.sm = w >= s.md;
      this.gt.md = w >= s.lg;
      this.gt.lg = w >= s.xl;
      this.lt.sm = w < s.sm;
      this.lt.md = w < s.md;
      this.lt.lg = w < s.lg;
      this.lt.xl = w < s.xl;
      this.xs = this.lt.sm;
      this.sm = this.gt.xs === true && this.lt.md === true;
      this.md = this.gt.sm === true && this.lt.lg === true;
      this.lg = this.gt.md === true && this.lt.xl === true;
      this.xl = this.gt.lg;
      s = this.xs === true && "xs" || this.sm === true && "sm" || this.md === true && "md" || this.lg === true && "lg" || "xl";
      if (s !== this.name) {
        if (classes === true) {
          document.body.classList.remove(`screen--${this.name}`);
          document.body.classList.add(`screen--${s}`);
        }
        this.name = s;
      }
    };
    let updateEvt, updateSizes = {}, updateDebounce = 16;
    this.setSizes = (sizes) => {
      SIZE_LIST.forEach((name) => {
        if (sizes[name] !== void 0) {
          updateSizes[name] = sizes[name];
        }
      });
    };
    this.setDebounce = (deb) => {
      updateDebounce = deb;
    };
    const start2 = () => {
      const style = getComputedStyle(document.body);
      if (style.getPropertyValue("--q-size-sm")) {
        SIZE_LIST.forEach((name) => {
          this.sizes[name] = parseInt(style.getPropertyValue(`--q-size-${name}`), 10);
        });
      }
      this.setSizes = (sizes) => {
        SIZE_LIST.forEach((name) => {
          if (sizes[name]) {
            this.sizes[name] = sizes[name];
          }
        });
        this.__update(true);
      };
      this.setDebounce = (delay) => {
        updateEvt !== void 0 && target2.removeEventListener("resize", updateEvt, passive);
        updateEvt = delay > 0 ? debounce(this.__update, delay) : this.__update;
        target2.addEventListener("resize", updateEvt, passive);
      };
      this.setDebounce(updateDebounce);
      if (Object.keys(updateSizes).length !== 0) {
        this.setSizes(updateSizes);
        updateSizes = void 0;
      } else {
        this.__update();
      }
      classes === true && this.name === "xs" && document.body.classList.add("screen--xs");
    };
    if (isRuntimeSsrPreHydration.value === true) {
      onSSRHydrated.push(start2);
    } else {
      start2();
    }
  }
});
const Plugin$4 = defineReactivePlugin({
  isActive: false,
  mode: false
}, {
  __media: void 0,
  set(val) {
    Plugin$4.mode = val;
    if (val === "auto") {
      if (Plugin$4.__media === void 0) {
        Plugin$4.__media = window.matchMedia("(prefers-color-scheme: dark)");
        Plugin$4.__updateMedia = () => {
          Plugin$4.set("auto");
        };
        Plugin$4.__media.addListener(Plugin$4.__updateMedia);
      }
      val = Plugin$4.__media.matches;
    } else if (Plugin$4.__media !== void 0) {
      Plugin$4.__media.removeListener(Plugin$4.__updateMedia);
      Plugin$4.__media = void 0;
    }
    Plugin$4.isActive = val === true;
    document.body.classList.remove(`body--${val === true ? "light" : "dark"}`);
    document.body.classList.add(`body--${val === true ? "dark" : "light"}`);
  },
  toggle() {
    {
      Plugin$4.set(Plugin$4.isActive === false);
    }
  },
  install({ $q, onSSRHydrated, ssrContext }) {
    const { dark } = $q.config;
    $q.dark = this;
    if (this.__installed === true && dark === void 0) {
      return;
    }
    this.isActive = dark === true;
    const initialVal = dark !== void 0 ? dark : false;
    if (isRuntimeSsrPreHydration.value === true) {
      const ssrSet = (val) => {
        this.__fromSSR = val;
      };
      const originalSet = this.set;
      this.set = ssrSet;
      ssrSet(initialVal);
      onSSRHydrated.push(() => {
        this.set = originalSet;
        this.set(this.__fromSSR);
      });
    } else {
      this.set(initialVal);
    }
  }
});
const getTrue = () => true;
function filterInvalidPath(path) {
  return typeof path === "string" && path !== "" && path !== "/" && path !== "#/";
}
function normalizeExitPath(path) {
  path.startsWith("#") === true && (path = path.substring(1));
  path.startsWith("/") === false && (path = "/" + path);
  path.endsWith("/") === true && (path = path.substring(0, path.length - 1));
  return "#" + path;
}
function getShouldExitFn(cfg) {
  if (cfg.backButtonExit === false) {
    return () => false;
  }
  if (cfg.backButtonExit === "*") {
    return getTrue;
  }
  const exitPaths = ["#/"];
  Array.isArray(cfg.backButtonExit) === true && exitPaths.push(
    ...cfg.backButtonExit.filter(filterInvalidPath).map(normalizeExitPath)
  );
  return () => exitPaths.includes(window.location.hash);
}
var History = {
  __history: [],
  add: noop$2,
  remove: noop$2,
  install({ $q }) {
    if (this.__installed === true) {
      return;
    }
    const { cordova, capacitor } = client.is;
    if (cordova !== true && capacitor !== true) {
      return;
    }
    const qConf = $q.config[cordova === true ? "cordova" : "capacitor"];
    if (qConf !== void 0 && qConf.backButton === false) {
      return;
    }
    if (capacitor === true && (window.Capacitor === void 0 || window.Capacitor.Plugins.App === void 0)) {
      return;
    }
    this.add = (entry) => {
      if (entry.condition === void 0) {
        entry.condition = getTrue;
      }
      this.__history.push(entry);
    };
    this.remove = (entry) => {
      const index = this.__history.indexOf(entry);
      if (index >= 0) {
        this.__history.splice(index, 1);
      }
    };
    const shouldExit = getShouldExitFn(
      Object.assign(
        { backButtonExit: true },
        qConf
      )
    );
    const backHandler = () => {
      if (this.__history.length) {
        const entry = this.__history[this.__history.length - 1];
        if (entry.condition() === true) {
          this.__history.pop();
          entry.handler();
        }
      } else if (shouldExit() === true) {
        navigator.app.exitApp();
      } else {
        window.history.back();
      }
    };
    if (cordova === true) {
      document.addEventListener("deviceready", () => {
        document.addEventListener("backbutton", backHandler, false);
      });
    } else {
      window.Capacitor.Plugins.App.addListener("backButton", backHandler);
    }
  }
};
var defaultLang = {
  isoName: "en-US",
  nativeName: "English (US)",
  label: {
    clear: "Clear",
    ok: "OK",
    cancel: "Cancel",
    close: "Close",
    set: "Set",
    select: "Select",
    reset: "Reset",
    remove: "Remove",
    update: "Update",
    create: "Create",
    search: "Search",
    filter: "Filter",
    refresh: "Refresh",
    expand: (label) => label ? `Expand "${label}"` : "Expand",
    collapse: (label) => label ? `Collapse "${label}"` : "Collapse"
  },
  date: {
    days: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
    daysShort: "Sun_Mon_Tue_Wed_Thu_Fri_Sat".split("_"),
    months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
    monthsShort: "Jan_Feb_Mar_Apr_May_Jun_Jul_Aug_Sep_Oct_Nov_Dec".split("_"),
    firstDayOfWeek: 0,
    format24h: false,
    pluralDay: "days"
  },
  table: {
    noData: "No data available",
    noResults: "No matching records found",
    loading: "Loading...",
    selectedRecords: (rows) => rows === 1 ? "1 record selected." : (rows === 0 ? "No" : rows) + " records selected.",
    recordsPerPage: "Records per page:",
    allRows: "All",
    pagination: (start2, end, total) => start2 + "-" + end + " of " + total,
    columns: "Columns"
  },
  editor: {
    url: "URL",
    bold: "Bold",
    italic: "Italic",
    strikethrough: "Strikethrough",
    underline: "Underline",
    unorderedList: "Unordered List",
    orderedList: "Ordered List",
    subscript: "Subscript",
    superscript: "Superscript",
    hyperlink: "Hyperlink",
    toggleFullscreen: "Toggle Fullscreen",
    quote: "Quote",
    left: "Left align",
    center: "Center align",
    right: "Right align",
    justify: "Justify align",
    print: "Print",
    outdent: "Decrease indentation",
    indent: "Increase indentation",
    removeFormat: "Remove formatting",
    formatting: "Formatting",
    fontSize: "Font Size",
    align: "Align",
    hr: "Insert Horizontal Rule",
    undo: "Undo",
    redo: "Redo",
    heading1: "Heading 1",
    heading2: "Heading 2",
    heading3: "Heading 3",
    heading4: "Heading 4",
    heading5: "Heading 5",
    heading6: "Heading 6",
    paragraph: "Paragraph",
    code: "Code",
    size1: "Very small",
    size2: "A bit small",
    size3: "Normal",
    size4: "Medium-large",
    size5: "Big",
    size6: "Very big",
    size7: "Maximum",
    defaultFont: "Default Font",
    viewSource: "View Source"
  },
  tree: {
    noNodes: "No nodes available",
    noResults: "No matching nodes found"
  }
};
function getLocale() {
  const val = Array.isArray(navigator.languages) === true && navigator.languages.length !== 0 ? navigator.languages[0] : navigator.language;
  if (typeof val === "string") {
    return val.split(/[-_]/).map((v, i) => i === 0 ? v.toLowerCase() : i > 1 || v.length < 4 ? v.toUpperCase() : v[0].toUpperCase() + v.slice(1).toLowerCase()).join("-");
  }
}
const Plugin$3 = defineReactivePlugin({
  __langPack: {}
}, {
  getLocale,
  set(langObject = defaultLang, ssrContext) {
    const lang = {
      ...langObject,
      rtl: langObject.rtl === true,
      getLocale
    };
    {
      lang.set = Plugin$3.set;
      if (Plugin$3.__langConfig === void 0 || Plugin$3.__langConfig.noHtmlAttrs !== true) {
        const el = document.documentElement;
        el.setAttribute("dir", lang.rtl === true ? "rtl" : "ltr");
        el.setAttribute("lang", lang.isoName);
      }
      Object.assign(Plugin$3.__langPack, lang);
      Plugin$3.props = lang;
      Plugin$3.isoName = lang.isoName;
      Plugin$3.nativeName = lang.nativeName;
    }
  },
  install({ $q, lang, ssrContext }) {
    {
      $q.lang = Plugin$3.__langPack;
      Plugin$3.__langConfig = $q.config.lang;
      if (this.__installed === true) {
        lang !== void 0 && this.set(lang);
      } else {
        this.set(lang || defaultLang);
      }
    }
  }
});
function setCssVar(propName, value, element = document.body) {
  if (typeof propName !== "string") {
    throw new TypeError("Expected a string as propName");
  }
  if (typeof value !== "string") {
    throw new TypeError("Expected a string as value");
  }
  if (!(element instanceof Element)) {
    throw new TypeError("Expected a DOM element");
  }
  element.style.setProperty(`--q-${propName}`, value);
}
let lastKeyCompositionStatus = false;
function onKeyDownComposition(evt) {
  lastKeyCompositionStatus = evt.isComposing === true;
}
function shouldIgnoreKey(evt) {
  return lastKeyCompositionStatus === true || evt !== Object(evt) || evt.isComposing === true || evt.qKeyEvent === true;
}
function isKeyCode(evt, keyCodes) {
  return shouldIgnoreKey(evt) === true ? false : [].concat(keyCodes).includes(evt.keyCode);
}
function getMobilePlatform(is) {
  if (is.ios === true)
    return "ios";
  if (is.android === true)
    return "android";
}
function getBodyClasses({ is, has: has2, within }, cfg) {
  const cls = [
    is.desktop === true ? "desktop" : "mobile",
    `${has2.touch === false ? "no-" : ""}touch`
  ];
  if (is.mobile === true) {
    const mobile = getMobilePlatform(is);
    mobile !== void 0 && cls.push("platform-" + mobile);
  }
  if (is.nativeMobile === true) {
    const type = is.nativeMobileWrapper;
    cls.push(type);
    cls.push("native-mobile");
    if (is.ios === true && (cfg[type] === void 0 || cfg[type].iosStatusBarPadding !== false)) {
      cls.push("q-ios-padding");
    }
  } else if (is.electron === true) {
    cls.push("electron");
  } else if (is.bex === true) {
    cls.push("bex");
  }
  within.iframe === true && cls.push("within-iframe");
  return cls;
}
function applyClientSsrCorrections() {
  const { is } = client;
  const classes = document.body.className;
  const classList = new Set(classes.replace(/ {2}/g, " ").split(" "));
  if (iosCorrection !== void 0) {
    classList.delete("desktop");
    classList.add("platform-ios");
    classList.add("mobile");
  } else if (is.nativeMobile !== true && is.electron !== true && is.bex !== true) {
    if (is.desktop === true) {
      classList.delete("mobile");
      classList.delete("platform-ios");
      classList.delete("platform-android");
      classList.add("desktop");
    } else if (is.mobile === true) {
      classList.delete("desktop");
      classList.add("mobile");
      const mobile = getMobilePlatform(is);
      if (mobile !== void 0) {
        classList.add(`platform-${mobile}`);
        classList.delete(`platform-${mobile === "ios" ? "android" : "ios"}`);
      } else {
        classList.delete("platform-ios");
        classList.delete("platform-android");
      }
    }
  }
  if (client.has.touch === true) {
    classList.delete("no-touch");
    classList.add("touch");
  }
  if (client.within.iframe === true) {
    classList.add("within-iframe");
  }
  const newCls = Array.from(classList).join(" ");
  if (classes !== newCls) {
    document.body.className = newCls;
  }
}
function setColors(brand) {
  for (const color in brand) {
    setCssVar(color, brand[color]);
  }
}
var Body = {
  install(opts) {
    if (this.__installed === true) {
      return;
    }
    if (isRuntimeSsrPreHydration.value === true) {
      applyClientSsrCorrections();
    } else {
      const { $q } = opts;
      $q.config.brand !== void 0 && setColors($q.config.brand);
      const cls = getBodyClasses(client, $q.config);
      document.body.classList.add.apply(document.body.classList, cls);
    }
    if (client.is.ios === true) {
      document.body.addEventListener("touchstart", noop$2);
    }
    window.addEventListener("keydown", onKeyDownComposition, true);
  }
};
var materialIcons = {
  name: "material-icons",
  type: {
    positive: "check_circle",
    negative: "warning",
    info: "info",
    warning: "priority_high"
  },
  arrow: {
    up: "arrow_upward",
    right: "arrow_forward",
    down: "arrow_downward",
    left: "arrow_back",
    dropdown: "arrow_drop_down"
  },
  chevron: {
    left: "chevron_left",
    right: "chevron_right"
  },
  colorPicker: {
    spectrum: "gradient",
    tune: "tune",
    palette: "style"
  },
  pullToRefresh: {
    icon: "refresh"
  },
  carousel: {
    left: "chevron_left",
    right: "chevron_right",
    up: "keyboard_arrow_up",
    down: "keyboard_arrow_down",
    navigationIcon: "lens"
  },
  chip: {
    remove: "cancel",
    selected: "check"
  },
  datetime: {
    arrowLeft: "chevron_left",
    arrowRight: "chevron_right",
    now: "access_time",
    today: "today"
  },
  editor: {
    bold: "format_bold",
    italic: "format_italic",
    strikethrough: "strikethrough_s",
    underline: "format_underlined",
    unorderedList: "format_list_bulleted",
    orderedList: "format_list_numbered",
    subscript: "vertical_align_bottom",
    superscript: "vertical_align_top",
    hyperlink: "link",
    toggleFullscreen: "fullscreen",
    quote: "format_quote",
    left: "format_align_left",
    center: "format_align_center",
    right: "format_align_right",
    justify: "format_align_justify",
    print: "print",
    outdent: "format_indent_decrease",
    indent: "format_indent_increase",
    removeFormat: "format_clear",
    formatting: "text_format",
    fontSize: "format_size",
    align: "format_align_left",
    hr: "remove",
    undo: "undo",
    redo: "redo",
    heading: "format_size",
    code: "code",
    size: "format_size",
    font: "font_download",
    viewSource: "code"
  },
  expansionItem: {
    icon: "keyboard_arrow_down",
    denseIcon: "arrow_drop_down"
  },
  fab: {
    icon: "add",
    activeIcon: "close"
  },
  field: {
    clear: "cancel",
    error: "error"
  },
  pagination: {
    first: "first_page",
    prev: "keyboard_arrow_left",
    next: "keyboard_arrow_right",
    last: "last_page"
  },
  rating: {
    icon: "grade"
  },
  stepper: {
    done: "check",
    active: "edit",
    error: "warning"
  },
  tabs: {
    left: "chevron_left",
    right: "chevron_right",
    up: "keyboard_arrow_up",
    down: "keyboard_arrow_down"
  },
  table: {
    arrowUp: "arrow_upward",
    warning: "warning",
    firstPage: "first_page",
    prevPage: "chevron_left",
    nextPage: "chevron_right",
    lastPage: "last_page"
  },
  tree: {
    icon: "play_arrow"
  },
  uploader: {
    done: "done",
    clear: "clear",
    add: "add_box",
    upload: "cloud_upload",
    removeQueue: "clear_all",
    removeUploaded: "done_all"
  }
};
const Plugin$2 = defineReactivePlugin({
  iconMapFn: null,
  __icons: {}
}, {
  set(setObject, ssrContext) {
    const def2 = { ...setObject, rtl: setObject.rtl === true };
    {
      def2.set = Plugin$2.set;
      Object.assign(Plugin$2.__icons, def2);
    }
  },
  install({ $q, iconSet, ssrContext }) {
    {
      if ($q.config.iconMapFn !== void 0) {
        this.iconMapFn = $q.config.iconMapFn;
      }
      $q.iconSet = this.__icons;
      injectProp($q, "iconMapFn", () => this.iconMapFn, (val) => {
        this.iconMapFn = val;
      });
      if (this.__installed === true) {
        iconSet !== void 0 && this.set(iconSet);
      } else {
        this.set(iconSet || materialIcons);
      }
    }
  }
});
const quasarKey = "_q_";
const layoutKey = "_q_l_";
const pageContainerKey = "_q_pc_";
const formKey = "_q_fo_";
const emptyRenderFn = () => {
};
const globalConfig = {};
let globalConfigIsFrozen = false;
function freezeGlobalConfig() {
  globalConfigIsFrozen = true;
}
function isDeepEqual(a, b) {
  if (a === b) {
    return true;
  }
  if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
    if (a.constructor !== b.constructor) {
      return false;
    }
    let length, i;
    if (a.constructor === Array) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (isDeepEqual(a[i], b[i]) !== true) {
          return false;
        }
      }
      return true;
    }
    if (a.constructor === Map) {
      if (a.size !== b.size) {
        return false;
      }
      let iter = a.entries();
      i = iter.next();
      while (i.done !== true) {
        if (b.has(i.value[0]) !== true) {
          return false;
        }
        i = iter.next();
      }
      iter = a.entries();
      i = iter.next();
      while (i.done !== true) {
        if (isDeepEqual(i.value[1], b.get(i.value[0])) !== true) {
          return false;
        }
        i = iter.next();
      }
      return true;
    }
    if (a.constructor === Set) {
      if (a.size !== b.size) {
        return false;
      }
      const iter = a.entries();
      i = iter.next();
      while (i.done !== true) {
        if (b.has(i.value[0]) !== true) {
          return false;
        }
        i = iter.next();
      }
      return true;
    }
    if (a.buffer != null && a.buffer.constructor === ArrayBuffer) {
      length = a.length;
      if (length !== b.length) {
        return false;
      }
      for (i = length; i-- !== 0; ) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    if (a.constructor === RegExp) {
      return a.source === b.source && a.flags === b.flags;
    }
    if (a.valueOf !== Object.prototype.valueOf) {
      return a.valueOf() === b.valueOf();
    }
    if (a.toString !== Object.prototype.toString) {
      return a.toString() === b.toString();
    }
    const keys = Object.keys(a).filter((key) => a[key] !== void 0);
    length = keys.length;
    if (length !== Object.keys(b).filter((key) => b[key] !== void 0).length) {
      return false;
    }
    for (i = length; i-- !== 0; ) {
      const key = keys[i];
      if (isDeepEqual(a[key], b[key]) !== true) {
        return false;
      }
    }
    return true;
  }
  return a !== a && b !== b;
}
function isObject(v) {
  return v !== null && typeof v === "object" && Array.isArray(v) !== true;
}
function isDate(v) {
  return Object.prototype.toString.call(v) === "[object Date]";
}
function isRegexp(v) {
  return Object.prototype.toString.call(v) === "[object RegExp]";
}
const autoInstalledPlugins = [
  Platform,
  Body,
  Plugin$4,
  Screen,
  History,
  Plugin$3,
  Plugin$2
];
function createChildApp(appCfg, parentApp) {
  const app2 = createApp(appCfg);
  app2.config.globalProperties = parentApp.config.globalProperties;
  const { reload, ...appContext } = parentApp._context;
  Object.assign(app2._context, appContext);
  return app2;
}
function installPlugins(pluginOpts, pluginList) {
  pluginList.forEach((Plugin2) => {
    Plugin2.install(pluginOpts);
    Plugin2.__installed = true;
  });
}
function prepareApp(app2, uiOpts, pluginOpts) {
  app2.config.globalProperties.$q = pluginOpts.$q;
  app2.provide(quasarKey, pluginOpts.$q);
  installPlugins(pluginOpts, autoInstalledPlugins);
  uiOpts.components !== void 0 && Object.values(uiOpts.components).forEach((c) => {
    if (isObject(c) === true && c.name !== void 0) {
      app2.component(c.name, c);
    }
  });
  uiOpts.directives !== void 0 && Object.values(uiOpts.directives).forEach((d) => {
    if (isObject(d) === true && d.name !== void 0) {
      app2.directive(d.name, d);
    }
  });
  uiOpts.plugins !== void 0 && installPlugins(
    pluginOpts,
    Object.values(uiOpts.plugins).filter(
      (p2) => typeof p2.install === "function" && autoInstalledPlugins.includes(p2) === false
    )
  );
  if (isRuntimeSsrPreHydration.value === true) {
    pluginOpts.$q.onSSRHydrated = () => {
      pluginOpts.onSSRHydrated.forEach((fn) => {
        fn();
      });
      pluginOpts.$q.onSSRHydrated = () => {
      };
    };
  }
}
var installQuasar = function(parentApp, opts = {}) {
  const $q = { version: "2.12.1" };
  if (globalConfigIsFrozen === false) {
    if (opts.config !== void 0) {
      Object.assign(globalConfig, opts.config);
    }
    $q.config = { ...globalConfig };
    freezeGlobalConfig();
  } else {
    $q.config = opts.config || {};
  }
  prepareApp(parentApp, opts, {
    parentApp,
    $q,
    lang: opts.lang,
    iconSet: opts.iconSet,
    onSSRHydrated: []
  });
};
var Quasar = {
  version: "2.12.1",
  install: installQuasar,
  lang: Plugin$3,
  iconSet: Plugin$2
};
var _export_sfc = (sfc, props2) => {
  const target2 = sfc.__vccOpts || sfc;
  for (const [key, val] of props2) {
    target2[key] = val;
  }
  return target2;
};
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  const _component_router_view = resolveComponent("router-view");
  return openBlock(), createBlock(_component_router_view);
}
var RootComponent = /* @__PURE__ */ _export_sfc(_sfc_main, [["render", _sfc_render]]);
function route(callback) {
  return callback;
}
function store(callback) {
  return callback;
}
var isVue2 = false;
/*!
  * pinia v2.1.4
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
let activePinia;
const setActivePinia = (pinia) => activePinia = pinia;
const piniaSymbol = Symbol();
function isPlainObject(o) {
  return o && typeof o === "object" && Object.prototype.toString.call(o) === "[object Object]" && typeof o.toJSON !== "function";
}
var MutationType;
(function(MutationType2) {
  MutationType2["direct"] = "direct";
  MutationType2["patchObject"] = "patch object";
  MutationType2["patchFunction"] = "patch function";
})(MutationType || (MutationType = {}));
function createPinia() {
  const scope = effectScope(true);
  const state = scope.run(() => ref({}));
  let _p = [];
  let toBeInstalled = [];
  const pinia = markRaw({
    install(app2) {
      setActivePinia(pinia);
      {
        pinia._a = app2;
        app2.provide(piniaSymbol, pinia);
        app2.config.globalProperties.$pinia = pinia;
        toBeInstalled.forEach((plugin) => _p.push(plugin));
        toBeInstalled = [];
      }
    },
    use(plugin) {
      if (!this._a && !isVue2) {
        toBeInstalled.push(plugin);
      } else {
        _p.push(plugin);
      }
      return this;
    },
    _p,
    _a: null,
    _e: scope,
    _s: /* @__PURE__ */ new Map(),
    state
  });
  return pinia;
}
const noop$1 = () => {
};
function addSubscription(subscriptions, callback, detached, onCleanup = noop$1) {
  subscriptions.push(callback);
  const removeSubscription = () => {
    const idx = subscriptions.indexOf(callback);
    if (idx > -1) {
      subscriptions.splice(idx, 1);
      onCleanup();
    }
  };
  if (!detached && getCurrentScope()) {
    onScopeDispose(removeSubscription);
  }
  return removeSubscription;
}
function triggerSubscriptions(subscriptions, ...args) {
  subscriptions.slice().forEach((callback) => {
    callback(...args);
  });
}
const fallbackRunWithContext = (fn) => fn();
function mergeReactiveObjects(target2, patchToApply) {
  if (target2 instanceof Map && patchToApply instanceof Map) {
    patchToApply.forEach((value, key) => target2.set(key, value));
  }
  if (target2 instanceof Set && patchToApply instanceof Set) {
    patchToApply.forEach(target2.add, target2);
  }
  for (const key in patchToApply) {
    if (!patchToApply.hasOwnProperty(key))
      continue;
    const subPatch = patchToApply[key];
    const targetValue = target2[key];
    if (isPlainObject(targetValue) && isPlainObject(subPatch) && target2.hasOwnProperty(key) && !isRef(subPatch) && !isReactive(subPatch)) {
      target2[key] = mergeReactiveObjects(targetValue, subPatch);
    } else {
      target2[key] = subPatch;
    }
  }
  return target2;
}
const skipHydrateSymbol = Symbol();
function shouldHydrate(obj) {
  return !isPlainObject(obj) || !obj.hasOwnProperty(skipHydrateSymbol);
}
const { assign: assign$1 } = Object;
function isComputed(o) {
  return !!(isRef(o) && o.effect);
}
function createOptionsStore(id, options, pinia, hot) {
  const { state, actions, getters } = options;
  const initialState = pinia.state.value[id];
  let store2;
  function setup() {
    if (!initialState && true) {
      {
        pinia.state.value[id] = state ? state() : {};
      }
    }
    const localState = toRefs(pinia.state.value[id]);
    return assign$1(localState, actions, Object.keys(getters || {}).reduce((computedGetters, name) => {
      computedGetters[name] = markRaw(computed(() => {
        setActivePinia(pinia);
        const store3 = pinia._s.get(id);
        return getters[name].call(store3, store3);
      }));
      return computedGetters;
    }, {}));
  }
  store2 = createSetupStore(id, setup, options, pinia, hot, true);
  return store2;
}
function createSetupStore($id, setup, options = {}, pinia, hot, isOptionsStore) {
  let scope;
  const optionsForPlugin = assign$1({ actions: {} }, options);
  const $subscribeOptions = {
    deep: true
  };
  let isListening;
  let isSyncListening;
  let subscriptions = [];
  let actionSubscriptions = [];
  let debuggerEvents;
  const initialState = pinia.state.value[$id];
  if (!isOptionsStore && !initialState && true) {
    {
      pinia.state.value[$id] = {};
    }
  }
  ref({});
  let activeListener;
  function $patch(partialStateOrMutator) {
    let subscriptionMutation;
    isListening = isSyncListening = false;
    if (typeof partialStateOrMutator === "function") {
      partialStateOrMutator(pinia.state.value[$id]);
      subscriptionMutation = {
        type: MutationType.patchFunction,
        storeId: $id,
        events: debuggerEvents
      };
    } else {
      mergeReactiveObjects(pinia.state.value[$id], partialStateOrMutator);
      subscriptionMutation = {
        type: MutationType.patchObject,
        payload: partialStateOrMutator,
        storeId: $id,
        events: debuggerEvents
      };
    }
    const myListenerId = activeListener = Symbol();
    nextTick().then(() => {
      if (activeListener === myListenerId) {
        isListening = true;
      }
    });
    isSyncListening = true;
    triggerSubscriptions(subscriptions, subscriptionMutation, pinia.state.value[$id]);
  }
  const $reset = isOptionsStore ? function $reset2() {
    const { state } = options;
    const newState = state ? state() : {};
    this.$patch(($state) => {
      assign$1($state, newState);
    });
  } : noop$1;
  function $dispose() {
    scope.stop();
    subscriptions = [];
    actionSubscriptions = [];
    pinia._s.delete($id);
  }
  function wrapAction(name, action) {
    return function() {
      setActivePinia(pinia);
      const args = Array.from(arguments);
      const afterCallbackList = [];
      const onErrorCallbackList = [];
      function after(callback) {
        afterCallbackList.push(callback);
      }
      function onError(callback) {
        onErrorCallbackList.push(callback);
      }
      triggerSubscriptions(actionSubscriptions, {
        args,
        name,
        store: store2,
        after,
        onError
      });
      let ret;
      try {
        ret = action.apply(this && this.$id === $id ? this : store2, args);
      } catch (error) {
        triggerSubscriptions(onErrorCallbackList, error);
        throw error;
      }
      if (ret instanceof Promise) {
        return ret.then((value) => {
          triggerSubscriptions(afterCallbackList, value);
          return value;
        }).catch((error) => {
          triggerSubscriptions(onErrorCallbackList, error);
          return Promise.reject(error);
        });
      }
      triggerSubscriptions(afterCallbackList, ret);
      return ret;
    };
  }
  const partialStore = {
    _p: pinia,
    $id,
    $onAction: addSubscription.bind(null, actionSubscriptions),
    $patch,
    $reset,
    $subscribe(callback, options2 = {}) {
      const removeSubscription = addSubscription(subscriptions, callback, options2.detached, () => stopWatcher());
      const stopWatcher = scope.run(() => watch(() => pinia.state.value[$id], (state) => {
        if (options2.flush === "sync" ? isSyncListening : isListening) {
          callback({
            storeId: $id,
            type: MutationType.direct,
            events: debuggerEvents
          }, state);
        }
      }, assign$1({}, $subscribeOptions, options2)));
      return removeSubscription;
    },
    $dispose
  };
  const store2 = reactive(partialStore);
  pinia._s.set($id, store2);
  const runWithContext = pinia._a && pinia._a.runWithContext || fallbackRunWithContext;
  const setupStore = pinia._e.run(() => {
    scope = effectScope();
    return runWithContext(() => scope.run(setup));
  });
  for (const key in setupStore) {
    const prop = setupStore[key];
    if (isRef(prop) && !isComputed(prop) || isReactive(prop)) {
      if (!isOptionsStore) {
        if (initialState && shouldHydrate(prop)) {
          if (isRef(prop)) {
            prop.value = initialState[key];
          } else {
            mergeReactiveObjects(prop, initialState[key]);
          }
        }
        {
          pinia.state.value[$id][key] = prop;
        }
      }
    } else if (typeof prop === "function") {
      const actionValue = wrapAction(key, prop);
      {
        setupStore[key] = actionValue;
      }
      optionsForPlugin.actions[key] = prop;
    } else
      ;
  }
  {
    assign$1(store2, setupStore);
    assign$1(toRaw(store2), setupStore);
  }
  Object.defineProperty(store2, "$state", {
    get: () => pinia.state.value[$id],
    set: (state) => {
      $patch(($state) => {
        assign$1($state, state);
      });
    }
  });
  pinia._p.forEach((extender) => {
    {
      assign$1(store2, scope.run(() => extender({
        store: store2,
        app: pinia._a,
        pinia,
        options: optionsForPlugin
      })));
    }
  });
  if (initialState && isOptionsStore && options.hydrate) {
    options.hydrate(store2.$state, initialState);
  }
  isListening = true;
  isSyncListening = true;
  return store2;
}
function defineStore(idOrOptions, setup, setupOptions) {
  let id;
  let options;
  const isSetupStore = typeof setup === "function";
  if (typeof idOrOptions === "string") {
    id = idOrOptions;
    options = isSetupStore ? setupOptions : setup;
  } else {
    options = idOrOptions;
    id = idOrOptions.id;
  }
  function useStore(pinia, hot) {
    const hasContext = hasInjectionContext();
    pinia = pinia || (hasContext ? inject(piniaSymbol, null) : null);
    if (pinia)
      setActivePinia(pinia);
    pinia = activePinia;
    if (!pinia._s.has(id)) {
      if (isSetupStore) {
        createSetupStore(id, setup, options, pinia);
      } else {
        createOptionsStore(id, options, pinia);
      }
    }
    const store2 = pinia._s.get(id);
    return store2;
  }
  useStore.$id = id;
  return useStore;
}
var createStore = store(() => {
  const pinia = createPinia();
  return pinia;
});
/*!
  * vue-router v4.2.2
  * (c) 2023 Eduardo San Martin Morote
  * @license MIT
  */
const isBrowser = typeof window !== "undefined";
function isESModule(obj) {
  return obj.__esModule || obj[Symbol.toStringTag] === "Module";
}
const assign = Object.assign;
function applyToParams(fn, params) {
  const newParams = {};
  for (const key in params) {
    const value = params[key];
    newParams[key] = isArray(value) ? value.map(fn) : fn(value);
  }
  return newParams;
}
const noop = () => {
};
const isArray = Array.isArray;
const TRAILING_SLASH_RE = /\/$/;
const removeTrailingSlash = (path) => path.replace(TRAILING_SLASH_RE, "");
function parseURL(parseQuery2, location2, currentLocation = "/") {
  let path, query = {}, searchString = "", hash = "";
  const hashPos = location2.indexOf("#");
  let searchPos = location2.indexOf("?");
  if (hashPos < searchPos && hashPos >= 0) {
    searchPos = -1;
  }
  if (searchPos > -1) {
    path = location2.slice(0, searchPos);
    searchString = location2.slice(searchPos + 1, hashPos > -1 ? hashPos : location2.length);
    query = parseQuery2(searchString);
  }
  if (hashPos > -1) {
    path = path || location2.slice(0, hashPos);
    hash = location2.slice(hashPos, location2.length);
  }
  path = resolveRelativePath(path != null ? path : location2, currentLocation);
  return {
    fullPath: path + (searchString && "?") + searchString + hash,
    path,
    query,
    hash
  };
}
function stringifyURL(stringifyQuery2, location2) {
  const query = location2.query ? stringifyQuery2(location2.query) : "";
  return location2.path + (query && "?") + query + (location2.hash || "");
}
function stripBase(pathname, base2) {
  if (!base2 || !pathname.toLowerCase().startsWith(base2.toLowerCase()))
    return pathname;
  return pathname.slice(base2.length) || "/";
}
function isSameRouteLocation(stringifyQuery2, a, b) {
  const aLastIndex = a.matched.length - 1;
  const bLastIndex = b.matched.length - 1;
  return aLastIndex > -1 && aLastIndex === bLastIndex && isSameRouteRecord$1(a.matched[aLastIndex], b.matched[bLastIndex]) && isSameRouteLocationParams$1(a.params, b.params) && stringifyQuery2(a.query) === stringifyQuery2(b.query) && a.hash === b.hash;
}
function isSameRouteRecord$1(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function isSameRouteLocationParams$1(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length)
    return false;
  for (const key in a) {
    if (!isSameRouteLocationParamsValue$1(a[key], b[key]))
      return false;
  }
  return true;
}
function isSameRouteLocationParamsValue$1(a, b) {
  return isArray(a) ? isEquivalentArray$1(a, b) : isArray(b) ? isEquivalentArray$1(b, a) : a === b;
}
function isEquivalentArray$1(a, b) {
  return isArray(b) ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function resolveRelativePath(to, from) {
  if (to.startsWith("/"))
    return to;
  if (!to)
    return from;
  const fromSegments = from.split("/");
  const toSegments = to.split("/");
  const lastToSegment = toSegments[toSegments.length - 1];
  if (lastToSegment === ".." || lastToSegment === ".") {
    toSegments.push("");
  }
  let position2 = fromSegments.length - 1;
  let toPosition;
  let segment;
  for (toPosition = 0; toPosition < toSegments.length; toPosition++) {
    segment = toSegments[toPosition];
    if (segment === ".")
      continue;
    if (segment === "..") {
      if (position2 > 1)
        position2--;
    } else
      break;
  }
  return fromSegments.slice(0, position2).join("/") + "/" + toSegments.slice(toPosition - (toPosition === toSegments.length ? 1 : 0)).join("/");
}
var NavigationType;
(function(NavigationType2) {
  NavigationType2["pop"] = "pop";
  NavigationType2["push"] = "push";
})(NavigationType || (NavigationType = {}));
var NavigationDirection;
(function(NavigationDirection2) {
  NavigationDirection2["back"] = "back";
  NavigationDirection2["forward"] = "forward";
  NavigationDirection2["unknown"] = "";
})(NavigationDirection || (NavigationDirection = {}));
function normalizeBase(base2) {
  if (!base2) {
    if (isBrowser) {
      const baseEl = document.querySelector("base");
      base2 = baseEl && baseEl.getAttribute("href") || "/";
      base2 = base2.replace(/^\w+:\/\/[^\/]+/, "");
    } else {
      base2 = "/";
    }
  }
  if (base2[0] !== "/" && base2[0] !== "#")
    base2 = "/" + base2;
  return removeTrailingSlash(base2);
}
const BEFORE_HASH_RE = /^[^#]+#/;
function createHref(base2, location2) {
  return base2.replace(BEFORE_HASH_RE, "#") + location2;
}
function getElementPosition(el, offset) {
  const docRect = document.documentElement.getBoundingClientRect();
  const elRect = el.getBoundingClientRect();
  return {
    behavior: offset.behavior,
    left: elRect.left - docRect.left - (offset.left || 0),
    top: elRect.top - docRect.top - (offset.top || 0)
  };
}
const computeScrollPosition = () => ({
  left: window.pageXOffset,
  top: window.pageYOffset
});
function scrollToPosition(position2) {
  let scrollToOptions;
  if ("el" in position2) {
    const positionEl = position2.el;
    const isIdSelector = typeof positionEl === "string" && positionEl.startsWith("#");
    const el = typeof positionEl === "string" ? isIdSelector ? document.getElementById(positionEl.slice(1)) : document.querySelector(positionEl) : positionEl;
    if (!el) {
      return;
    }
    scrollToOptions = getElementPosition(el, position2);
  } else {
    scrollToOptions = position2;
  }
  if ("scrollBehavior" in document.documentElement.style)
    window.scrollTo(scrollToOptions);
  else {
    window.scrollTo(scrollToOptions.left != null ? scrollToOptions.left : window.pageXOffset, scrollToOptions.top != null ? scrollToOptions.top : window.pageYOffset);
  }
}
function getScrollKey(path, delta) {
  const position2 = history.state ? history.state.position - delta : -1;
  return position2 + path;
}
const scrollPositions = /* @__PURE__ */ new Map();
function saveScrollPosition(key, scrollPosition) {
  scrollPositions.set(key, scrollPosition);
}
function getSavedScrollPosition(key) {
  const scroll = scrollPositions.get(key);
  scrollPositions.delete(key);
  return scroll;
}
let createBaseLocation = () => location.protocol + "//" + location.host;
function createCurrentLocation(base2, location2) {
  const { pathname, search, hash } = location2;
  const hashPos = base2.indexOf("#");
  if (hashPos > -1) {
    let slicePos = hash.includes(base2.slice(hashPos)) ? base2.slice(hashPos).length : 1;
    let pathFromHash = hash.slice(slicePos);
    if (pathFromHash[0] !== "/")
      pathFromHash = "/" + pathFromHash;
    return stripBase(pathFromHash, "");
  }
  const path = stripBase(pathname, base2);
  return path + search + hash;
}
function useHistoryListeners(base2, historyState, currentLocation, replace) {
  let listeners2 = [];
  let teardowns = [];
  let pauseState = null;
  const popStateHandler = ({ state }) => {
    const to = createCurrentLocation(base2, location);
    const from = currentLocation.value;
    const fromState = historyState.value;
    let delta = 0;
    if (state) {
      currentLocation.value = to;
      historyState.value = state;
      if (pauseState && pauseState === from) {
        pauseState = null;
        return;
      }
      delta = fromState ? state.position - fromState.position : 0;
    } else {
      replace(to);
    }
    listeners2.forEach((listener) => {
      listener(currentLocation.value, from, {
        delta,
        type: NavigationType.pop,
        direction: delta ? delta > 0 ? NavigationDirection.forward : NavigationDirection.back : NavigationDirection.unknown
      });
    });
  };
  function pauseListeners() {
    pauseState = currentLocation.value;
  }
  function listen(callback) {
    listeners2.push(callback);
    const teardown = () => {
      const index = listeners2.indexOf(callback);
      if (index > -1)
        listeners2.splice(index, 1);
    };
    teardowns.push(teardown);
    return teardown;
  }
  function beforeUnloadListener() {
    const { history: history2 } = window;
    if (!history2.state)
      return;
    history2.replaceState(assign({}, history2.state, { scroll: computeScrollPosition() }), "");
  }
  function destroy() {
    for (const teardown of teardowns)
      teardown();
    teardowns = [];
    window.removeEventListener("popstate", popStateHandler);
    window.removeEventListener("beforeunload", beforeUnloadListener);
  }
  window.addEventListener("popstate", popStateHandler);
  window.addEventListener("beforeunload", beforeUnloadListener, {
    passive: true
  });
  return {
    pauseListeners,
    listen,
    destroy
  };
}
function buildState(back, current, forward, replaced = false, computeScroll = false) {
  return {
    back,
    current,
    forward,
    replaced,
    position: window.history.length,
    scroll: computeScroll ? computeScrollPosition() : null
  };
}
function useHistoryStateNavigation(base2) {
  const { history: history2, location: location2 } = window;
  const currentLocation = {
    value: createCurrentLocation(base2, location2)
  };
  const historyState = { value: history2.state };
  if (!historyState.value) {
    changeLocation(currentLocation.value, {
      back: null,
      current: currentLocation.value,
      forward: null,
      position: history2.length - 1,
      replaced: true,
      scroll: null
    }, true);
  }
  function changeLocation(to, state, replace2) {
    const hashIndex = base2.indexOf("#");
    const url = hashIndex > -1 ? (location2.host && document.querySelector("base") ? base2 : base2.slice(hashIndex)) + to : createBaseLocation() + base2 + to;
    try {
      history2[replace2 ? "replaceState" : "pushState"](state, "", url);
      historyState.value = state;
    } catch (err) {
      {
        console.error(err);
      }
      location2[replace2 ? "replace" : "assign"](url);
    }
  }
  function replace(to, data) {
    const state = assign({}, history2.state, buildState(
      historyState.value.back,
      to,
      historyState.value.forward,
      true
    ), data, { position: historyState.value.position });
    changeLocation(to, state, true);
    currentLocation.value = to;
  }
  function push(to, data) {
    const currentState = assign(
      {},
      historyState.value,
      history2.state,
      {
        forward: to,
        scroll: computeScrollPosition()
      }
    );
    changeLocation(currentState.current, currentState, true);
    const state = assign({}, buildState(currentLocation.value, to, null), { position: currentState.position + 1 }, data);
    changeLocation(to, state, false);
    currentLocation.value = to;
  }
  return {
    location: currentLocation,
    state: historyState,
    push,
    replace
  };
}
function createWebHistory(base2) {
  base2 = normalizeBase(base2);
  const historyNavigation = useHistoryStateNavigation(base2);
  const historyListeners = useHistoryListeners(base2, historyNavigation.state, historyNavigation.location, historyNavigation.replace);
  function go(delta, triggerListeners = true) {
    if (!triggerListeners)
      historyListeners.pauseListeners();
    history.go(delta);
  }
  const routerHistory = assign({
    location: "",
    base: base2,
    go,
    createHref: createHref.bind(null, base2)
  }, historyNavigation, historyListeners);
  Object.defineProperty(routerHistory, "location", {
    enumerable: true,
    get: () => historyNavigation.location.value
  });
  Object.defineProperty(routerHistory, "state", {
    enumerable: true,
    get: () => historyNavigation.state.value
  });
  return routerHistory;
}
function createWebHashHistory(base2) {
  base2 = location.host ? base2 || location.pathname + location.search : "";
  if (!base2.includes("#"))
    base2 += "#";
  return createWebHistory(base2);
}
function isRouteLocation(route2) {
  return typeof route2 === "string" || route2 && typeof route2 === "object";
}
function isRouteName(name) {
  return typeof name === "string" || typeof name === "symbol";
}
const START_LOCATION_NORMALIZED = {
  path: "/",
  name: void 0,
  params: {},
  query: {},
  hash: "",
  fullPath: "/",
  matched: [],
  meta: {},
  redirectedFrom: void 0
};
const NavigationFailureSymbol = Symbol("");
var NavigationFailureType;
(function(NavigationFailureType2) {
  NavigationFailureType2[NavigationFailureType2["aborted"] = 4] = "aborted";
  NavigationFailureType2[NavigationFailureType2["cancelled"] = 8] = "cancelled";
  NavigationFailureType2[NavigationFailureType2["duplicated"] = 16] = "duplicated";
})(NavigationFailureType || (NavigationFailureType = {}));
function createRouterError(type, params) {
  {
    return assign(new Error(), {
      type,
      [NavigationFailureSymbol]: true
    }, params);
  }
}
function isNavigationFailure(error, type) {
  return error instanceof Error && NavigationFailureSymbol in error && (type == null || !!(error.type & type));
}
const BASE_PARAM_PATTERN = "[^/]+?";
const BASE_PATH_PARSER_OPTIONS = {
  sensitive: false,
  strict: false,
  start: true,
  end: true
};
const REGEX_CHARS_RE = /[.+*?^${}()[\]/\\]/g;
function tokensToParser(segments, extraOptions) {
  const options = assign({}, BASE_PATH_PARSER_OPTIONS, extraOptions);
  const score = [];
  let pattern = options.start ? "^" : "";
  const keys = [];
  for (const segment of segments) {
    const segmentScores = segment.length ? [] : [90];
    if (options.strict && !segment.length)
      pattern += "/";
    for (let tokenIndex = 0; tokenIndex < segment.length; tokenIndex++) {
      const token = segment[tokenIndex];
      let subSegmentScore = 40 + (options.sensitive ? 0.25 : 0);
      if (token.type === 0) {
        if (!tokenIndex)
          pattern += "/";
        pattern += token.value.replace(REGEX_CHARS_RE, "\\$&");
        subSegmentScore += 40;
      } else if (token.type === 1) {
        const { value, repeatable, optional, regexp } = token;
        keys.push({
          name: value,
          repeatable,
          optional
        });
        const re2 = regexp ? regexp : BASE_PARAM_PATTERN;
        if (re2 !== BASE_PARAM_PATTERN) {
          subSegmentScore += 10;
          try {
            new RegExp(`(${re2})`);
          } catch (err) {
            throw new Error(`Invalid custom RegExp for param "${value}" (${re2}): ` + err.message);
          }
        }
        let subPattern = repeatable ? `((?:${re2})(?:/(?:${re2}))*)` : `(${re2})`;
        if (!tokenIndex)
          subPattern = optional && segment.length < 2 ? `(?:/${subPattern})` : "/" + subPattern;
        if (optional)
          subPattern += "?";
        pattern += subPattern;
        subSegmentScore += 20;
        if (optional)
          subSegmentScore += -8;
        if (repeatable)
          subSegmentScore += -20;
        if (re2 === ".*")
          subSegmentScore += -50;
      }
      segmentScores.push(subSegmentScore);
    }
    score.push(segmentScores);
  }
  if (options.strict && options.end) {
    const i = score.length - 1;
    score[i][score[i].length - 1] += 0.7000000000000001;
  }
  if (!options.strict)
    pattern += "/?";
  if (options.end)
    pattern += "$";
  else if (options.strict)
    pattern += "(?:/|$)";
  const re = new RegExp(pattern, options.sensitive ? "" : "i");
  function parse(path) {
    const match = path.match(re);
    const params = {};
    if (!match)
      return null;
    for (let i = 1; i < match.length; i++) {
      const value = match[i] || "";
      const key = keys[i - 1];
      params[key.name] = value && key.repeatable ? value.split("/") : value;
    }
    return params;
  }
  function stringify(params) {
    let path = "";
    let avoidDuplicatedSlash = false;
    for (const segment of segments) {
      if (!avoidDuplicatedSlash || !path.endsWith("/"))
        path += "/";
      avoidDuplicatedSlash = false;
      for (const token of segment) {
        if (token.type === 0) {
          path += token.value;
        } else if (token.type === 1) {
          const { value, repeatable, optional } = token;
          const param = value in params ? params[value] : "";
          if (isArray(param) && !repeatable) {
            throw new Error(`Provided param "${value}" is an array but it is not repeatable (* or + modifiers)`);
          }
          const text = isArray(param) ? param.join("/") : param;
          if (!text) {
            if (optional) {
              if (segment.length < 2) {
                if (path.endsWith("/"))
                  path = path.slice(0, -1);
                else
                  avoidDuplicatedSlash = true;
              }
            } else
              throw new Error(`Missing required param "${value}"`);
          }
          path += text;
        }
      }
    }
    return path || "/";
  }
  return {
    re,
    score,
    keys,
    parse,
    stringify
  };
}
function compareScoreArray(a, b) {
  let i = 0;
  while (i < a.length && i < b.length) {
    const diff = b[i] - a[i];
    if (diff)
      return diff;
    i++;
  }
  if (a.length < b.length) {
    return a.length === 1 && a[0] === 40 + 40 ? -1 : 1;
  } else if (a.length > b.length) {
    return b.length === 1 && b[0] === 40 + 40 ? 1 : -1;
  }
  return 0;
}
function comparePathParserScore(a, b) {
  let i = 0;
  const aScore = a.score;
  const bScore = b.score;
  while (i < aScore.length && i < bScore.length) {
    const comp = compareScoreArray(aScore[i], bScore[i]);
    if (comp)
      return comp;
    i++;
  }
  if (Math.abs(bScore.length - aScore.length) === 1) {
    if (isLastScoreNegative(aScore))
      return 1;
    if (isLastScoreNegative(bScore))
      return -1;
  }
  return bScore.length - aScore.length;
}
function isLastScoreNegative(score) {
  const last = score[score.length - 1];
  return score.length > 0 && last[last.length - 1] < 0;
}
const ROOT_TOKEN = {
  type: 0,
  value: ""
};
const VALID_PARAM_RE = /[a-zA-Z0-9_]/;
function tokenizePath(path) {
  if (!path)
    return [[]];
  if (path === "/")
    return [[ROOT_TOKEN]];
  if (!path.startsWith("/")) {
    throw new Error(`Invalid path "${path}"`);
  }
  function crash(message) {
    throw new Error(`ERR (${state})/"${buffer}": ${message}`);
  }
  let state = 0;
  let previousState = state;
  const tokens = [];
  let segment;
  function finalizeSegment() {
    if (segment)
      tokens.push(segment);
    segment = [];
  }
  let i = 0;
  let char;
  let buffer = "";
  let customRe = "";
  function consumeBuffer() {
    if (!buffer)
      return;
    if (state === 0) {
      segment.push({
        type: 0,
        value: buffer
      });
    } else if (state === 1 || state === 2 || state === 3) {
      if (segment.length > 1 && (char === "*" || char === "+"))
        crash(`A repeatable param (${buffer}) must be alone in its segment. eg: '/:ids+.`);
      segment.push({
        type: 1,
        value: buffer,
        regexp: customRe,
        repeatable: char === "*" || char === "+",
        optional: char === "*" || char === "?"
      });
    } else {
      crash("Invalid state to consume buffer");
    }
    buffer = "";
  }
  function addCharToBuffer() {
    buffer += char;
  }
  while (i < path.length) {
    char = path[i++];
    if (char === "\\" && state !== 2) {
      previousState = state;
      state = 4;
      continue;
    }
    switch (state) {
      case 0:
        if (char === "/") {
          if (buffer) {
            consumeBuffer();
          }
          finalizeSegment();
        } else if (char === ":") {
          consumeBuffer();
          state = 1;
        } else {
          addCharToBuffer();
        }
        break;
      case 4:
        addCharToBuffer();
        state = previousState;
        break;
      case 1:
        if (char === "(") {
          state = 2;
        } else if (VALID_PARAM_RE.test(char)) {
          addCharToBuffer();
        } else {
          consumeBuffer();
          state = 0;
          if (char !== "*" && char !== "?" && char !== "+")
            i--;
        }
        break;
      case 2:
        if (char === ")") {
          if (customRe[customRe.length - 1] == "\\")
            customRe = customRe.slice(0, -1) + char;
          else
            state = 3;
        } else {
          customRe += char;
        }
        break;
      case 3:
        consumeBuffer();
        state = 0;
        if (char !== "*" && char !== "?" && char !== "+")
          i--;
        customRe = "";
        break;
      default:
        crash("Unknown state");
        break;
    }
  }
  if (state === 2)
    crash(`Unfinished custom RegExp for param "${buffer}"`);
  consumeBuffer();
  finalizeSegment();
  return tokens;
}
function createRouteRecordMatcher(record, parent, options) {
  const parser = tokensToParser(tokenizePath(record.path), options);
  const matcher = assign(parser, {
    record,
    parent,
    children: [],
    alias: []
  });
  if (parent) {
    if (!matcher.record.aliasOf === !parent.record.aliasOf)
      parent.children.push(matcher);
  }
  return matcher;
}
function createRouterMatcher(routes2, globalOptions) {
  const matchers = [];
  const matcherMap = /* @__PURE__ */ new Map();
  globalOptions = mergeOptions({ strict: false, end: true, sensitive: false }, globalOptions);
  function getRecordMatcher(name) {
    return matcherMap.get(name);
  }
  function addRoute(record, parent, originalRecord) {
    const isRootAdd = !originalRecord;
    const mainNormalizedRecord = normalizeRouteRecord(record);
    mainNormalizedRecord.aliasOf = originalRecord && originalRecord.record;
    const options = mergeOptions(globalOptions, record);
    const normalizedRecords = [
      mainNormalizedRecord
    ];
    if ("alias" in record) {
      const aliases = typeof record.alias === "string" ? [record.alias] : record.alias;
      for (const alias of aliases) {
        normalizedRecords.push(assign({}, mainNormalizedRecord, {
          components: originalRecord ? originalRecord.record.components : mainNormalizedRecord.components,
          path: alias,
          aliasOf: originalRecord ? originalRecord.record : mainNormalizedRecord
        }));
      }
    }
    let matcher;
    let originalMatcher;
    for (const normalizedRecord of normalizedRecords) {
      const { path } = normalizedRecord;
      if (parent && path[0] !== "/") {
        const parentPath = parent.record.path;
        const connectingSlash = parentPath[parentPath.length - 1] === "/" ? "" : "/";
        normalizedRecord.path = parent.record.path + (path && connectingSlash + path);
      }
      matcher = createRouteRecordMatcher(normalizedRecord, parent, options);
      if (originalRecord) {
        originalRecord.alias.push(matcher);
      } else {
        originalMatcher = originalMatcher || matcher;
        if (originalMatcher !== matcher)
          originalMatcher.alias.push(matcher);
        if (isRootAdd && record.name && !isAliasRecord(matcher))
          removeRoute(record.name);
      }
      if (mainNormalizedRecord.children) {
        const children = mainNormalizedRecord.children;
        for (let i = 0; i < children.length; i++) {
          addRoute(children[i], matcher, originalRecord && originalRecord.children[i]);
        }
      }
      originalRecord = originalRecord || matcher;
      if (matcher.record.components && Object.keys(matcher.record.components).length || matcher.record.name || matcher.record.redirect) {
        insertMatcher(matcher);
      }
    }
    return originalMatcher ? () => {
      removeRoute(originalMatcher);
    } : noop;
  }
  function removeRoute(matcherRef) {
    if (isRouteName(matcherRef)) {
      const matcher = matcherMap.get(matcherRef);
      if (matcher) {
        matcherMap.delete(matcherRef);
        matchers.splice(matchers.indexOf(matcher), 1);
        matcher.children.forEach(removeRoute);
        matcher.alias.forEach(removeRoute);
      }
    } else {
      const index = matchers.indexOf(matcherRef);
      if (index > -1) {
        matchers.splice(index, 1);
        if (matcherRef.record.name)
          matcherMap.delete(matcherRef.record.name);
        matcherRef.children.forEach(removeRoute);
        matcherRef.alias.forEach(removeRoute);
      }
    }
  }
  function getRoutes() {
    return matchers;
  }
  function insertMatcher(matcher) {
    let i = 0;
    while (i < matchers.length && comparePathParserScore(matcher, matchers[i]) >= 0 && (matcher.record.path !== matchers[i].record.path || !isRecordChildOf(matcher, matchers[i])))
      i++;
    matchers.splice(i, 0, matcher);
    if (matcher.record.name && !isAliasRecord(matcher))
      matcherMap.set(matcher.record.name, matcher);
  }
  function resolve2(location2, currentLocation) {
    let matcher;
    let params = {};
    let path;
    let name;
    if ("name" in location2 && location2.name) {
      matcher = matcherMap.get(location2.name);
      if (!matcher)
        throw createRouterError(1, {
          location: location2
        });
      name = matcher.record.name;
      params = assign(
        paramsFromLocation(
          currentLocation.params,
          matcher.keys.filter((k) => !k.optional).map((k) => k.name)
        ),
        location2.params && paramsFromLocation(location2.params, matcher.keys.map((k) => k.name))
      );
      path = matcher.stringify(params);
    } else if ("path" in location2) {
      path = location2.path;
      matcher = matchers.find((m) => m.re.test(path));
      if (matcher) {
        params = matcher.parse(path);
        name = matcher.record.name;
      }
    } else {
      matcher = currentLocation.name ? matcherMap.get(currentLocation.name) : matchers.find((m) => m.re.test(currentLocation.path));
      if (!matcher)
        throw createRouterError(1, {
          location: location2,
          currentLocation
        });
      name = matcher.record.name;
      params = assign({}, currentLocation.params, location2.params);
      path = matcher.stringify(params);
    }
    const matched = [];
    let parentMatcher = matcher;
    while (parentMatcher) {
      matched.unshift(parentMatcher.record);
      parentMatcher = parentMatcher.parent;
    }
    return {
      name,
      path,
      params,
      matched,
      meta: mergeMetaFields(matched)
    };
  }
  routes2.forEach((route2) => addRoute(route2));
  return { addRoute, resolve: resolve2, removeRoute, getRoutes, getRecordMatcher };
}
function paramsFromLocation(params, keys) {
  const newParams = {};
  for (const key of keys) {
    if (key in params)
      newParams[key] = params[key];
  }
  return newParams;
}
function normalizeRouteRecord(record) {
  return {
    path: record.path,
    redirect: record.redirect,
    name: record.name,
    meta: record.meta || {},
    aliasOf: void 0,
    beforeEnter: record.beforeEnter,
    props: normalizeRecordProps(record),
    children: record.children || [],
    instances: {},
    leaveGuards: /* @__PURE__ */ new Set(),
    updateGuards: /* @__PURE__ */ new Set(),
    enterCallbacks: {},
    components: "components" in record ? record.components || null : record.component && { default: record.component }
  };
}
function normalizeRecordProps(record) {
  const propsObject = {};
  const props2 = record.props || false;
  if ("component" in record) {
    propsObject.default = props2;
  } else {
    for (const name in record.components)
      propsObject[name] = typeof props2 === "boolean" ? props2 : props2[name];
  }
  return propsObject;
}
function isAliasRecord(record) {
  while (record) {
    if (record.record.aliasOf)
      return true;
    record = record.parent;
  }
  return false;
}
function mergeMetaFields(matched) {
  return matched.reduce((meta, record) => assign(meta, record.meta), {});
}
function mergeOptions(defaults2, partialOptions) {
  const options = {};
  for (const key in defaults2) {
    options[key] = key in partialOptions ? partialOptions[key] : defaults2[key];
  }
  return options;
}
function isRecordChildOf(record, parent) {
  return parent.children.some((child) => child === record || isRecordChildOf(record, child));
}
const HASH_RE = /#/g;
const AMPERSAND_RE = /&/g;
const SLASH_RE = /\//g;
const EQUAL_RE = /=/g;
const IM_RE = /\?/g;
const PLUS_RE = /\+/g;
const ENC_BRACKET_OPEN_RE = /%5B/g;
const ENC_BRACKET_CLOSE_RE = /%5D/g;
const ENC_CARET_RE = /%5E/g;
const ENC_BACKTICK_RE = /%60/g;
const ENC_CURLY_OPEN_RE = /%7B/g;
const ENC_PIPE_RE = /%7C/g;
const ENC_CURLY_CLOSE_RE = /%7D/g;
const ENC_SPACE_RE = /%20/g;
function commonEncode(text) {
  return encodeURI("" + text).replace(ENC_PIPE_RE, "|").replace(ENC_BRACKET_OPEN_RE, "[").replace(ENC_BRACKET_CLOSE_RE, "]");
}
function encodeHash(text) {
  return commonEncode(text).replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryValue(text) {
  return commonEncode(text).replace(PLUS_RE, "%2B").replace(ENC_SPACE_RE, "+").replace(HASH_RE, "%23").replace(AMPERSAND_RE, "%26").replace(ENC_BACKTICK_RE, "`").replace(ENC_CURLY_OPEN_RE, "{").replace(ENC_CURLY_CLOSE_RE, "}").replace(ENC_CARET_RE, "^");
}
function encodeQueryKey(text) {
  return encodeQueryValue(text).replace(EQUAL_RE, "%3D");
}
function encodePath(text) {
  return commonEncode(text).replace(HASH_RE, "%23").replace(IM_RE, "%3F");
}
function encodeParam(text) {
  return text == null ? "" : encodePath(text).replace(SLASH_RE, "%2F");
}
function decode$1(text) {
  try {
    return decodeURIComponent("" + text);
  } catch (err) {
  }
  return "" + text;
}
function parseQuery(search) {
  const query = {};
  if (search === "" || search === "?")
    return query;
  const hasLeadingIM = search[0] === "?";
  const searchParams = (hasLeadingIM ? search.slice(1) : search).split("&");
  for (let i = 0; i < searchParams.length; ++i) {
    const searchParam = searchParams[i].replace(PLUS_RE, " ");
    const eqPos = searchParam.indexOf("=");
    const key = decode$1(eqPos < 0 ? searchParam : searchParam.slice(0, eqPos));
    const value = eqPos < 0 ? null : decode$1(searchParam.slice(eqPos + 1));
    if (key in query) {
      let currentValue = query[key];
      if (!isArray(currentValue)) {
        currentValue = query[key] = [currentValue];
      }
      currentValue.push(value);
    } else {
      query[key] = value;
    }
  }
  return query;
}
function stringifyQuery(query) {
  let search = "";
  for (let key in query) {
    const value = query[key];
    key = encodeQueryKey(key);
    if (value == null) {
      if (value !== void 0) {
        search += (search.length ? "&" : "") + key;
      }
      continue;
    }
    const values = isArray(value) ? value.map((v) => v && encodeQueryValue(v)) : [value && encodeQueryValue(value)];
    values.forEach((value2) => {
      if (value2 !== void 0) {
        search += (search.length ? "&" : "") + key;
        if (value2 != null)
          search += "=" + value2;
      }
    });
  }
  return search;
}
function normalizeQuery(query) {
  const normalizedQuery = {};
  for (const key in query) {
    const value = query[key];
    if (value !== void 0) {
      normalizedQuery[key] = isArray(value) ? value.map((v) => v == null ? null : "" + v) : value == null ? value : "" + value;
    }
  }
  return normalizedQuery;
}
const matchedRouteKey = Symbol("");
const viewDepthKey = Symbol("");
const routerKey = Symbol("");
const routeLocationKey = Symbol("");
const routerViewLocationKey = Symbol("");
function useCallbacks() {
  let handlers2 = [];
  function add2(handler) {
    handlers2.push(handler);
    return () => {
      const i = handlers2.indexOf(handler);
      if (i > -1)
        handlers2.splice(i, 1);
    };
  }
  function reset() {
    handlers2 = [];
  }
  return {
    add: add2,
    list: () => handlers2,
    reset
  };
}
function guardToPromiseFn(guard, to, from, record, name) {
  const enterCallbackArray = record && (record.enterCallbacks[name] = record.enterCallbacks[name] || []);
  return () => new Promise((resolve2, reject) => {
    const next = (valid) => {
      if (valid === false) {
        reject(createRouterError(4, {
          from,
          to
        }));
      } else if (valid instanceof Error) {
        reject(valid);
      } else if (isRouteLocation(valid)) {
        reject(createRouterError(2, {
          from: to,
          to: valid
        }));
      } else {
        if (enterCallbackArray && record.enterCallbacks[name] === enterCallbackArray && typeof valid === "function") {
          enterCallbackArray.push(valid);
        }
        resolve2();
      }
    };
    const guardReturn = guard.call(record && record.instances[name], to, from, next);
    let guardCall = Promise.resolve(guardReturn);
    if (guard.length < 3)
      guardCall = guardCall.then(next);
    guardCall.catch((err) => reject(err));
  });
}
function extractComponentsGuards(matched, guardType, to, from) {
  const guards = [];
  for (const record of matched) {
    for (const name in record.components) {
      let rawComponent = record.components[name];
      if (guardType !== "beforeRouteEnter" && !record.instances[name])
        continue;
      if (isRouteComponent(rawComponent)) {
        const options = rawComponent.__vccOpts || rawComponent;
        const guard = options[guardType];
        guard && guards.push(guardToPromiseFn(guard, to, from, record, name));
      } else {
        let componentPromise = rawComponent();
        guards.push(() => componentPromise.then((resolved) => {
          if (!resolved)
            return Promise.reject(new Error(`Couldn't resolve component "${name}" at "${record.path}"`));
          const resolvedComponent = isESModule(resolved) ? resolved.default : resolved;
          record.components[name] = resolvedComponent;
          const options = resolvedComponent.__vccOpts || resolvedComponent;
          const guard = options[guardType];
          return guard && guardToPromiseFn(guard, to, from, record, name)();
        }));
      }
    }
  }
  return guards;
}
function isRouteComponent(component) {
  return typeof component === "object" || "displayName" in component || "props" in component || "__vccOpts" in component;
}
function useLink(props2) {
  const router = inject(routerKey);
  const currentRoute = inject(routeLocationKey);
  const route2 = computed(() => router.resolve(unref(props2.to)));
  const activeRecordIndex = computed(() => {
    const { matched } = route2.value;
    const { length } = matched;
    const routeMatched = matched[length - 1];
    const currentMatched = currentRoute.matched;
    if (!routeMatched || !currentMatched.length)
      return -1;
    const index = currentMatched.findIndex(isSameRouteRecord$1.bind(null, routeMatched));
    if (index > -1)
      return index;
    const parentRecordPath = getOriginalPath$1(matched[length - 2]);
    return length > 1 && getOriginalPath$1(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(isSameRouteRecord$1.bind(null, matched[length - 2])) : index;
  });
  const isActive = computed(() => activeRecordIndex.value > -1 && includesParams$1(currentRoute.params, route2.value.params));
  const isExactActive = computed(() => activeRecordIndex.value > -1 && activeRecordIndex.value === currentRoute.matched.length - 1 && isSameRouteLocationParams$1(currentRoute.params, route2.value.params));
  function navigate(e = {}) {
    if (guardEvent(e)) {
      return router[unref(props2.replace) ? "replace" : "push"](
        unref(props2.to)
      ).catch(noop);
    }
    return Promise.resolve();
  }
  return {
    route: route2,
    href: computed(() => route2.value.href),
    isActive,
    isExactActive,
    navigate
  };
}
const RouterLinkImpl = /* @__PURE__ */ defineComponent({
  name: "RouterLink",
  compatConfig: { MODE: 3 },
  props: {
    to: {
      type: [String, Object],
      required: true
    },
    replace: Boolean,
    activeClass: String,
    exactActiveClass: String,
    custom: Boolean,
    ariaCurrentValue: {
      type: String,
      default: "page"
    }
  },
  useLink,
  setup(props2, { slots }) {
    const link = reactive(useLink(props2));
    const { options } = inject(routerKey);
    const elClass = computed(() => ({
      [getLinkClass(props2.activeClass, options.linkActiveClass, "router-link-active")]: link.isActive,
      [getLinkClass(props2.exactActiveClass, options.linkExactActiveClass, "router-link-exact-active")]: link.isExactActive
    }));
    return () => {
      const children = slots.default && slots.default(link);
      return props2.custom ? children : h("a", {
        "aria-current": link.isExactActive ? props2.ariaCurrentValue : null,
        href: link.href,
        onClick: link.navigate,
        class: elClass.value
      }, children);
    };
  }
});
const RouterLink = RouterLinkImpl;
function guardEvent(e) {
  if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey)
    return;
  if (e.defaultPrevented)
    return;
  if (e.button !== void 0 && e.button !== 0)
    return;
  if (e.currentTarget && e.currentTarget.getAttribute) {
    const target2 = e.currentTarget.getAttribute("target");
    if (/\b_blank\b/i.test(target2))
      return;
  }
  if (e.preventDefault)
    e.preventDefault();
  return true;
}
function includesParams$1(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key];
    const outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue)
        return false;
    } else {
      if (!isArray(outerValue) || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i]))
        return false;
    }
  }
  return true;
}
function getOriginalPath$1(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
const getLinkClass = (propClass, globalClass, defaultClass) => propClass != null ? propClass : globalClass != null ? globalClass : defaultClass;
const RouterViewImpl = /* @__PURE__ */ defineComponent({
  name: "RouterView",
  inheritAttrs: false,
  props: {
    name: {
      type: String,
      default: "default"
    },
    route: Object
  },
  compatConfig: { MODE: 3 },
  setup(props2, { attrs, slots }) {
    const injectedRoute = inject(routerViewLocationKey);
    const routeToDisplay = computed(() => props2.route || injectedRoute.value);
    const injectedDepth = inject(viewDepthKey, 0);
    const depth = computed(() => {
      let initialDepth = unref(injectedDepth);
      const { matched } = routeToDisplay.value;
      let matchedRoute;
      while ((matchedRoute = matched[initialDepth]) && !matchedRoute.components) {
        initialDepth++;
      }
      return initialDepth;
    });
    const matchedRouteRef = computed(() => routeToDisplay.value.matched[depth.value]);
    provide(viewDepthKey, computed(() => depth.value + 1));
    provide(matchedRouteKey, matchedRouteRef);
    provide(routerViewLocationKey, routeToDisplay);
    const viewRef = ref();
    watch(() => [viewRef.value, matchedRouteRef.value, props2.name], ([instance, to, name], [oldInstance, from, oldName]) => {
      if (to) {
        to.instances[name] = instance;
        if (from && from !== to && instance && instance === oldInstance) {
          if (!to.leaveGuards.size) {
            to.leaveGuards = from.leaveGuards;
          }
          if (!to.updateGuards.size) {
            to.updateGuards = from.updateGuards;
          }
        }
      }
      if (instance && to && (!from || !isSameRouteRecord$1(to, from) || !oldInstance)) {
        (to.enterCallbacks[name] || []).forEach((callback) => callback(instance));
      }
    }, { flush: "post" });
    return () => {
      const route2 = routeToDisplay.value;
      const currentName = props2.name;
      const matchedRoute = matchedRouteRef.value;
      const ViewComponent = matchedRoute && matchedRoute.components[currentName];
      if (!ViewComponent) {
        return normalizeSlot(slots.default, { Component: ViewComponent, route: route2 });
      }
      const routePropsOption = matchedRoute.props[currentName];
      const routeProps = routePropsOption ? routePropsOption === true ? route2.params : typeof routePropsOption === "function" ? routePropsOption(route2) : routePropsOption : null;
      const onVnodeUnmounted = (vnode) => {
        if (vnode.component.isUnmounted) {
          matchedRoute.instances[currentName] = null;
        }
      };
      const component = h(ViewComponent, assign({}, routeProps, attrs, {
        onVnodeUnmounted,
        ref: viewRef
      }));
      return normalizeSlot(slots.default, { Component: component, route: route2 }) || component;
    };
  }
});
function normalizeSlot(slot, data) {
  if (!slot)
    return null;
  const slotContent = slot(data);
  return slotContent.length === 1 ? slotContent[0] : slotContent;
}
const RouterView = RouterViewImpl;
function createRouter$1(options) {
  const matcher = createRouterMatcher(options.routes, options);
  const parseQuery$1 = options.parseQuery || parseQuery;
  const stringifyQuery$1 = options.stringifyQuery || stringifyQuery;
  const routerHistory = options.history;
  const beforeGuards = useCallbacks();
  const beforeResolveGuards = useCallbacks();
  const afterGuards = useCallbacks();
  const currentRoute = shallowRef(START_LOCATION_NORMALIZED);
  let pendingLocation = START_LOCATION_NORMALIZED;
  if (isBrowser && options.scrollBehavior && "scrollRestoration" in history) {
    history.scrollRestoration = "manual";
  }
  const normalizeParams = applyToParams.bind(null, (paramValue) => "" + paramValue);
  const encodeParams = applyToParams.bind(null, encodeParam);
  const decodeParams = applyToParams.bind(null, decode$1);
  function addRoute(parentOrRoute, route2) {
    let parent;
    let record;
    if (isRouteName(parentOrRoute)) {
      parent = matcher.getRecordMatcher(parentOrRoute);
      record = route2;
    } else {
      record = parentOrRoute;
    }
    return matcher.addRoute(record, parent);
  }
  function removeRoute(name) {
    const recordMatcher = matcher.getRecordMatcher(name);
    if (recordMatcher) {
      matcher.removeRoute(recordMatcher);
    }
  }
  function getRoutes() {
    return matcher.getRoutes().map((routeMatcher) => routeMatcher.record);
  }
  function hasRoute(name) {
    return !!matcher.getRecordMatcher(name);
  }
  function resolve2(rawLocation, currentLocation) {
    currentLocation = assign({}, currentLocation || currentRoute.value);
    if (typeof rawLocation === "string") {
      const locationNormalized = parseURL(parseQuery$1, rawLocation, currentLocation.path);
      const matchedRoute2 = matcher.resolve({ path: locationNormalized.path }, currentLocation);
      const href3 = routerHistory.createHref(locationNormalized.fullPath);
      return assign(locationNormalized, matchedRoute2, {
        params: decodeParams(matchedRoute2.params),
        hash: decode$1(locationNormalized.hash),
        redirectedFrom: void 0,
        href: href3
      });
    }
    let matcherLocation;
    if ("path" in rawLocation) {
      matcherLocation = assign({}, rawLocation, {
        path: parseURL(parseQuery$1, rawLocation.path, currentLocation.path).path
      });
    } else {
      const targetParams = assign({}, rawLocation.params);
      for (const key in targetParams) {
        if (targetParams[key] == null) {
          delete targetParams[key];
        }
      }
      matcherLocation = assign({}, rawLocation, {
        params: encodeParams(targetParams)
      });
      currentLocation.params = encodeParams(currentLocation.params);
    }
    const matchedRoute = matcher.resolve(matcherLocation, currentLocation);
    const hash = rawLocation.hash || "";
    matchedRoute.params = normalizeParams(decodeParams(matchedRoute.params));
    const fullPath = stringifyURL(stringifyQuery$1, assign({}, rawLocation, {
      hash: encodeHash(hash),
      path: matchedRoute.path
    }));
    const href2 = routerHistory.createHref(fullPath);
    return assign({
      fullPath,
      hash,
      query: stringifyQuery$1 === stringifyQuery ? normalizeQuery(rawLocation.query) : rawLocation.query || {}
    }, matchedRoute, {
      redirectedFrom: void 0,
      href: href2
    });
  }
  function locationAsObject(to) {
    return typeof to === "string" ? parseURL(parseQuery$1, to, currentRoute.value.path) : assign({}, to);
  }
  function checkCanceledNavigation(to, from) {
    if (pendingLocation !== to) {
      return createRouterError(8, {
        from,
        to
      });
    }
  }
  function push(to) {
    return pushWithRedirect(to);
  }
  function replace(to) {
    return push(assign(locationAsObject(to), { replace: true }));
  }
  function handleRedirectRecord(to) {
    const lastMatched = to.matched[to.matched.length - 1];
    if (lastMatched && lastMatched.redirect) {
      const { redirect } = lastMatched;
      let newTargetLocation = typeof redirect === "function" ? redirect(to) : redirect;
      if (typeof newTargetLocation === "string") {
        newTargetLocation = newTargetLocation.includes("?") || newTargetLocation.includes("#") ? newTargetLocation = locationAsObject(newTargetLocation) : { path: newTargetLocation };
        newTargetLocation.params = {};
      }
      return assign({
        query: to.query,
        hash: to.hash,
        params: "path" in newTargetLocation ? {} : to.params
      }, newTargetLocation);
    }
  }
  function pushWithRedirect(to, redirectedFrom) {
    const targetLocation = pendingLocation = resolve2(to);
    const from = currentRoute.value;
    const data = to.state;
    const force = to.force;
    const replace2 = to.replace === true;
    const shouldRedirect = handleRedirectRecord(targetLocation);
    if (shouldRedirect)
      return pushWithRedirect(
        assign(locationAsObject(shouldRedirect), {
          state: typeof shouldRedirect === "object" ? assign({}, data, shouldRedirect.state) : data,
          force,
          replace: replace2
        }),
        redirectedFrom || targetLocation
      );
    const toLocation = targetLocation;
    toLocation.redirectedFrom = redirectedFrom;
    let failure;
    if (!force && isSameRouteLocation(stringifyQuery$1, from, targetLocation)) {
      failure = createRouterError(16, { to: toLocation, from });
      handleScroll(
        from,
        from,
        true,
        false
      );
    }
    return (failure ? Promise.resolve(failure) : navigate(toLocation, from)).catch((error) => isNavigationFailure(error) ? isNavigationFailure(error, 2) ? error : markAsReady(error) : triggerError(error, toLocation, from)).then((failure2) => {
      if (failure2) {
        if (isNavigationFailure(failure2, 2)) {
          return pushWithRedirect(
            assign({
              replace: replace2
            }, locationAsObject(failure2.to), {
              state: typeof failure2.to === "object" ? assign({}, data, failure2.to.state) : data,
              force
            }),
            redirectedFrom || toLocation
          );
        }
      } else {
        failure2 = finalizeNavigation(toLocation, from, true, replace2, data);
      }
      triggerAfterEach(toLocation, from, failure2);
      return failure2;
    });
  }
  function checkCanceledNavigationAndReject(to, from) {
    const error = checkCanceledNavigation(to, from);
    return error ? Promise.reject(error) : Promise.resolve();
  }
  function runWithContext(fn) {
    const app2 = installedApps.values().next().value;
    return app2 && typeof app2.runWithContext === "function" ? app2.runWithContext(fn) : fn();
  }
  function navigate(to, from) {
    let guards;
    const [leavingRecords, updatingRecords, enteringRecords] = extractChangingRecords(to, from);
    guards = extractComponentsGuards(leavingRecords.reverse(), "beforeRouteLeave", to, from);
    for (const record of leavingRecords) {
      record.leaveGuards.forEach((guard) => {
        guards.push(guardToPromiseFn(guard, to, from));
      });
    }
    const canceledNavigationCheck = checkCanceledNavigationAndReject.bind(null, to, from);
    guards.push(canceledNavigationCheck);
    return runGuardQueue(guards).then(() => {
      guards = [];
      for (const guard of beforeGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = extractComponentsGuards(updatingRecords, "beforeRouteUpdate", to, from);
      for (const record of updatingRecords) {
        record.updateGuards.forEach((guard) => {
          guards.push(guardToPromiseFn(guard, to, from));
        });
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const record of to.matched) {
        if (record.beforeEnter && !from.matched.includes(record)) {
          if (isArray(record.beforeEnter)) {
            for (const beforeEnter of record.beforeEnter)
              guards.push(guardToPromiseFn(beforeEnter, to, from));
          } else {
            guards.push(guardToPromiseFn(record.beforeEnter, to, from));
          }
        }
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      to.matched.forEach((record) => record.enterCallbacks = {});
      guards = extractComponentsGuards(enteringRecords, "beforeRouteEnter", to, from);
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).then(() => {
      guards = [];
      for (const guard of beforeResolveGuards.list()) {
        guards.push(guardToPromiseFn(guard, to, from));
      }
      guards.push(canceledNavigationCheck);
      return runGuardQueue(guards);
    }).catch((err) => isNavigationFailure(err, 8) ? err : Promise.reject(err));
  }
  function triggerAfterEach(to, from, failure) {
    for (const guard of afterGuards.list()) {
      runWithContext(() => guard(to, from, failure));
    }
  }
  function finalizeNavigation(toLocation, from, isPush, replace2, data) {
    const error = checkCanceledNavigation(toLocation, from);
    if (error)
      return error;
    const isFirstNavigation = from === START_LOCATION_NORMALIZED;
    const state = !isBrowser ? {} : history.state;
    if (isPush) {
      if (replace2 || isFirstNavigation)
        routerHistory.replace(toLocation.fullPath, assign({
          scroll: isFirstNavigation && state && state.scroll
        }, data));
      else
        routerHistory.push(toLocation.fullPath, data);
    }
    currentRoute.value = toLocation;
    handleScroll(toLocation, from, isPush, isFirstNavigation);
    markAsReady();
  }
  let removeHistoryListener;
  function setupListeners() {
    if (removeHistoryListener)
      return;
    removeHistoryListener = routerHistory.listen((to, _from, info) => {
      if (!router.listening)
        return;
      const toLocation = resolve2(to);
      const shouldRedirect = handleRedirectRecord(toLocation);
      if (shouldRedirect) {
        pushWithRedirect(assign(shouldRedirect, { replace: true }), toLocation).catch(noop);
        return;
      }
      pendingLocation = toLocation;
      const from = currentRoute.value;
      if (isBrowser) {
        saveScrollPosition(getScrollKey(from.fullPath, info.delta), computeScrollPosition());
      }
      navigate(toLocation, from).catch((error) => {
        if (isNavigationFailure(error, 4 | 8)) {
          return error;
        }
        if (isNavigationFailure(error, 2)) {
          pushWithRedirect(
            error.to,
            toLocation
          ).then((failure) => {
            if (isNavigationFailure(failure, 4 | 16) && !info.delta && info.type === NavigationType.pop) {
              routerHistory.go(-1, false);
            }
          }).catch(noop);
          return Promise.reject();
        }
        if (info.delta) {
          routerHistory.go(-info.delta, false);
        }
        return triggerError(error, toLocation, from);
      }).then((failure) => {
        failure = failure || finalizeNavigation(
          toLocation,
          from,
          false
        );
        if (failure) {
          if (info.delta && !isNavigationFailure(failure, 8)) {
            routerHistory.go(-info.delta, false);
          } else if (info.type === NavigationType.pop && isNavigationFailure(failure, 4 | 16)) {
            routerHistory.go(-1, false);
          }
        }
        triggerAfterEach(toLocation, from, failure);
      }).catch(noop);
    });
  }
  let readyHandlers = useCallbacks();
  let errorHandlers = useCallbacks();
  let ready;
  function triggerError(error, to, from) {
    markAsReady(error);
    const list = errorHandlers.list();
    if (list.length) {
      list.forEach((handler) => handler(error, to, from));
    } else {
      console.error(error);
    }
    return Promise.reject(error);
  }
  function isReady() {
    if (ready && currentRoute.value !== START_LOCATION_NORMALIZED)
      return Promise.resolve();
    return new Promise((resolve3, reject) => {
      readyHandlers.add([resolve3, reject]);
    });
  }
  function markAsReady(err) {
    if (!ready) {
      ready = !err;
      setupListeners();
      readyHandlers.list().forEach(([resolve3, reject]) => err ? reject(err) : resolve3());
      readyHandlers.reset();
    }
    return err;
  }
  function handleScroll(to, from, isPush, isFirstNavigation) {
    const { scrollBehavior } = options;
    if (!isBrowser || !scrollBehavior)
      return Promise.resolve();
    const scrollPosition = !isPush && getSavedScrollPosition(getScrollKey(to.fullPath, 0)) || (isFirstNavigation || !isPush) && history.state && history.state.scroll || null;
    return nextTick().then(() => scrollBehavior(to, from, scrollPosition)).then((position2) => position2 && scrollToPosition(position2)).catch((err) => triggerError(err, to, from));
  }
  const go = (delta) => routerHistory.go(delta);
  let started;
  const installedApps = /* @__PURE__ */ new Set();
  const router = {
    currentRoute,
    listening: true,
    addRoute,
    removeRoute,
    hasRoute,
    getRoutes,
    resolve: resolve2,
    options,
    push,
    replace,
    go,
    back: () => go(-1),
    forward: () => go(1),
    beforeEach: beforeGuards.add,
    beforeResolve: beforeResolveGuards.add,
    afterEach: afterGuards.add,
    onError: errorHandlers.add,
    isReady,
    install(app2) {
      const router2 = this;
      app2.component("RouterLink", RouterLink);
      app2.component("RouterView", RouterView);
      app2.config.globalProperties.$router = router2;
      Object.defineProperty(app2.config.globalProperties, "$route", {
        enumerable: true,
        get: () => unref(currentRoute)
      });
      if (isBrowser && !started && currentRoute.value === START_LOCATION_NORMALIZED) {
        started = true;
        push(routerHistory.location).catch((err) => {
        });
      }
      const reactiveRoute = {};
      for (const key in START_LOCATION_NORMALIZED) {
        reactiveRoute[key] = computed(() => currentRoute.value[key]);
      }
      app2.provide(routerKey, router2);
      app2.provide(routeLocationKey, reactive(reactiveRoute));
      app2.provide(routerViewLocationKey, currentRoute);
      const unmountApp = app2.unmount;
      installedApps.add(app2);
      app2.unmount = function() {
        installedApps.delete(app2);
        if (installedApps.size < 1) {
          pendingLocation = START_LOCATION_NORMALIZED;
          removeHistoryListener && removeHistoryListener();
          removeHistoryListener = null;
          currentRoute.value = START_LOCATION_NORMALIZED;
          started = false;
          ready = false;
        }
        unmountApp();
      };
    }
  };
  function runGuardQueue(guards) {
    return guards.reduce((promise, guard) => promise.then(() => runWithContext(guard)), Promise.resolve());
  }
  return router;
}
function extractChangingRecords(to, from) {
  const leavingRecords = [];
  const updatingRecords = [];
  const enteringRecords = [];
  const len = Math.max(from.matched.length, to.matched.length);
  for (let i = 0; i < len; i++) {
    const recordFrom = from.matched[i];
    if (recordFrom) {
      if (to.matched.find((record) => isSameRouteRecord$1(record, recordFrom)))
        updatingRecords.push(recordFrom);
      else
        leavingRecords.push(recordFrom);
    }
    const recordTo = to.matched[i];
    if (recordTo) {
      if (!from.matched.find((record) => isSameRouteRecord$1(record, recordTo))) {
        enteringRecords.push(recordTo);
      }
    }
  }
  return [leavingRecords, updatingRecords, enteringRecords];
}
function useRouter() {
  return inject(routerKey);
}
function useRoute() {
  return inject(routeLocationKey);
}
const scriptRel = function detectScriptRel() {
  const relList = document.createElement("link").relList;
  return relList && relList.supports && relList.supports("modulepreload") ? "modulepreload" : "preload";
}();
const seen = {};
const base = "";
const __vitePreload = function preload(baseModule, deps) {
  if (!deps || deps.length === 0) {
    return baseModule();
  }
  return Promise.all(deps.map((dep) => {
    dep = `${base}${dep}`;
    if (dep in seen)
      return;
    seen[dep] = true;
    const isCss = dep.endsWith(".css");
    const cssSelector = isCss ? '[rel="stylesheet"]' : "";
    if (document.querySelector(`link[href="${dep}"]${cssSelector}`)) {
      return;
    }
    const link = document.createElement("link");
    link.rel = isCss ? "stylesheet" : scriptRel;
    if (!isCss) {
      link.as = "script";
      link.crossOrigin = "";
    }
    link.href = dep;
    document.head.appendChild(link);
    if (isCss) {
      return new Promise((res, rej) => {
        link.addEventListener("load", res);
        link.addEventListener("error", () => rej(new Error(`Unable to preload CSS for ${dep}`)));
      });
    }
  })).then(() => baseModule());
};
const routes = [
  {
    path: "/",
    component: () => __vitePreload(() => import("./MainLayout.b1f90405.js"), true ? ["assets/MainLayout.b1f90405.js","assets/MainLayout.472c6aad.css","assets/use-quasar.56248db4.js","assets/ClosePopup.f41d8027.js","assets/index.7724e03e.js","assets/QScrollArea.5b3e1ba1.js","assets/curentDocStore.7a49504e.js"] : void 0),
    children: [
      { name: "home", path: "", component: () => __vitePreload(() => import("./IndexPage.29cbc059.js"), true ? ["assets/IndexPage.29cbc059.js","assets/IndexPage.f6fda03a.css","assets/QScrollArea.5b3e1ba1.js","assets/use-quasar.56248db4.js","assets/QSpinnerTail.ca388a63.js","assets/ClosePopup.f41d8027.js","assets/QPage.794cd743.js","assets/index.7724e03e.js","assets/CollectionComp.d4ca1cea.js","assets/CollectionComp.b65d2c51.css"] : void 0) },
      {
        name: "editChat",
        path: "/exportDocs",
        component: () => __vitePreload(() => import("./EXportDocs.951ea6f2.js"), true ? ["assets/EXportDocs.951ea6f2.js","assets/EXportDocs.24e8e333.css","assets/use-quasar.56248db4.js","assets/index.7724e03e.js","assets/QPage.794cd743.js","assets/QSpinnerTail.ca388a63.js","assets/curentDocStore.7a49504e.js"] : void 0)
      },
      {
        name: "collections",
        path: "/chat-collections",
        component: () => __vitePreload(() => import("./CollectionsPage.8231f256.js"), true ? ["assets/CollectionsPage.8231f256.js","assets/QPage.794cd743.js","assets/CollectionComp.d4ca1cea.js","assets/CollectionComp.b65d2c51.css","assets/ClosePopup.f41d8027.js","assets/use-quasar.56248db4.js"] : void 0)
      },
      { name: "collectionsItems", path: "/chat-collection/:collection", component: () => __vitePreload(() => import("./ViewChatCollection.a1dc61b3.js"), true ? ["assets/ViewChatCollection.a1dc61b3.js","assets/ViewChatCollection.e822a211.css","assets/use-quasar.56248db4.js","assets/ClosePopup.f41d8027.js","assets/index.7724e03e.js","assets/QPage.794cd743.js"] : void 0) }
    ]
  },
  {
    path: "/:catchAll(.*)*",
    component: () => __vitePreload(() => import("./ErrorNotFound.c648bca1.js"), true ? [] : void 0)
  }
];
var createRouter = route(function() {
  const createHistory = createWebHashHistory;
  const Router = createRouter$1({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,
    history: createHistory("")
  });
  return Router;
});
async function createQuasarApp(createAppFn, quasarUserOptions2) {
  const app2 = createAppFn(RootComponent);
  app2.use(Quasar, quasarUserOptions2);
  const store2 = typeof createStore === "function" ? await createStore({}) : createStore;
  app2.use(store2);
  const router = markRaw(
    typeof createRouter === "function" ? await createRouter({ store: store2 }) : createRouter
  );
  store2.use(({ store: store3 }) => {
    store3.router = router;
  });
  return {
    app: app2,
    store: store2,
    router
  };
}
function encode(value) {
  if (isDate(value) === true) {
    return "__q_date|" + value.toUTCString();
  }
  if (isRegexp(value) === true) {
    return "__q_expr|" + value.source;
  }
  if (typeof value === "number") {
    return "__q_numb|" + value;
  }
  if (typeof value === "boolean") {
    return "__q_bool|" + (value ? "1" : "0");
  }
  if (typeof value === "string") {
    return "__q_strn|" + value;
  }
  if (typeof value === "function") {
    return "__q_strn|" + value.toString();
  }
  if (value === Object(value)) {
    return "__q_objt|" + JSON.stringify(value);
  }
  return value;
}
function decode(value) {
  const length = value.length;
  if (length < 9) {
    return value;
  }
  const type = value.substring(0, 8);
  const source = value.substring(9);
  switch (type) {
    case "__q_date":
      return new Date(source);
    case "__q_expr":
      return new RegExp(source);
    case "__q_numb":
      return Number(source);
    case "__q_bool":
      return Boolean(source === "1");
    case "__q_strn":
      return "" + source;
    case "__q_objt":
      return JSON.parse(source);
    default:
      return value;
  }
}
function getEmptyStorage() {
  const getVal = () => null;
  return {
    has: () => false,
    getLength: () => 0,
    getItem: getVal,
    getIndex: getVal,
    getKey: getVal,
    getAll: () => {
    },
    getAllKeys: () => [],
    set: noop$2,
    remove: noop$2,
    clear: noop$2,
    isEmpty: () => true
  };
}
function getStorage(type) {
  const webStorage = window[type + "Storage"], get2 = (key) => {
    const item = webStorage.getItem(key);
    return item ? decode(item) : null;
  };
  return {
    has: (key) => webStorage.getItem(key) !== null,
    getLength: () => webStorage.length,
    getItem: get2,
    getIndex: (index) => {
      return index < webStorage.length ? get2(webStorage.key(index)) : null;
    },
    getKey: (index) => {
      return index < webStorage.length ? webStorage.key(index) : null;
    },
    getAll: () => {
      let key;
      const result = {}, len = webStorage.length;
      for (let i = 0; i < len; i++) {
        key = webStorage.key(i);
        result[key] = get2(key);
      }
      return result;
    },
    getAllKeys: () => {
      const result = [], len = webStorage.length;
      for (let i = 0; i < len; i++) {
        result.push(webStorage.key(i));
      }
      return result;
    },
    set: (key, value) => {
      webStorage.setItem(key, encode(value));
    },
    remove: (key) => {
      webStorage.removeItem(key);
    },
    clear: () => {
      webStorage.clear();
    },
    isEmpty: () => webStorage.length === 0
  };
}
const storage = client.has.webStorage === false ? getEmptyStorage() : getStorage("local");
const Plugin$1 = {
  install({ $q }) {
    $q.localStorage = storage;
  }
};
Object.assign(Plugin$1, storage);
const useSizeDefaults = {
  xs: 18,
  sm: 24,
  md: 32,
  lg: 38,
  xl: 46
};
const useSizeProps = {
  size: String
};
function useSize(props2, sizes = useSizeDefaults) {
  return computed(() => props2.size !== void 0 ? { fontSize: props2.size in sizes ? `${sizes[props2.size]}px` : props2.size } : null);
}
const createComponent = (raw) => markRaw(defineComponent(raw));
const createDirective = (raw) => markRaw(raw);
function hSlot(slot, otherwise) {
  return slot !== void 0 ? slot() || otherwise : otherwise;
}
function hUniqueSlot(slot, otherwise) {
  if (slot !== void 0) {
    const vnode = slot();
    if (vnode !== void 0 && vnode !== null) {
      return vnode.slice();
    }
  }
  return otherwise;
}
function hMergeSlot(slot, source) {
  return slot !== void 0 ? source.concat(slot()) : source;
}
function hMergeSlotSafely(slot, source) {
  if (slot === void 0) {
    return source;
  }
  return source !== void 0 ? source.concat(slot()) : slot();
}
function hDir(tag, data, children, key, condition, getDirsFn) {
  data.key = key + condition;
  const vnode = h(tag, data, children);
  return condition === true ? withDirectives(vnode, getDirsFn()) : vnode;
}
const defaultViewBox = "0 0 24 24";
const sameFn = (i) => i;
const ionFn = (i) => `ionicons ${i}`;
const libMap = {
  "mdi-": (i) => `mdi ${i}`,
  "icon-": sameFn,
  "bt-": (i) => `bt ${i}`,
  "eva-": (i) => `eva ${i}`,
  "ion-md": ionFn,
  "ion-ios": ionFn,
  "ion-logo": ionFn,
  "iconfont ": sameFn,
  "ti-": (i) => `themify-icon ${i}`,
  "bi-": (i) => `bootstrap-icons ${i}`
};
const matMap = {
  o_: "-outlined",
  r_: "-round",
  s_: "-sharp"
};
const symMap = {
  sym_o_: "-outlined",
  sym_r_: "-rounded",
  sym_s_: "-sharp"
};
const libRE = new RegExp("^(" + Object.keys(libMap).join("|") + ")");
const matRE = new RegExp("^(" + Object.keys(matMap).join("|") + ")");
const symRE = new RegExp("^(" + Object.keys(symMap).join("|") + ")");
const mRE = /^[Mm]\s?[-+]?\.?\d/;
const imgRE = /^img:/;
const svgUseRE = /^svguse:/;
const ionRE = /^ion-/;
const faRE = /^(fa-(sharp|solid|regular|light|brands|duotone|thin)|[lf]a[srlbdk]?) /;
var QIcon = createComponent({
  name: "QIcon",
  props: {
    ...useSizeProps,
    tag: {
      type: String,
      default: "i"
    },
    name: String,
    color: String,
    left: Boolean,
    right: Boolean
  },
  setup(props2, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const sizeStyle = useSize(props2);
    const classes = computed(
      () => "q-icon" + (props2.left === true ? " on-left" : "") + (props2.right === true ? " on-right" : "") + (props2.color !== void 0 ? ` text-${props2.color}` : "")
    );
    const type = computed(() => {
      let cls;
      let icon = props2.name;
      if (icon === "none" || !icon) {
        return { none: true };
      }
      if ($q.iconMapFn !== null) {
        const res = $q.iconMapFn(icon);
        if (res !== void 0) {
          if (res.icon !== void 0) {
            icon = res.icon;
            if (icon === "none" || !icon) {
              return { none: true };
            }
          } else {
            return {
              cls: res.cls,
              content: res.content !== void 0 ? res.content : " "
            };
          }
        }
      }
      if (mRE.test(icon) === true) {
        const [def2, viewBox = defaultViewBox] = icon.split("|");
        return {
          svg: true,
          viewBox,
          nodes: def2.split("&&").map((path) => {
            const [d, style, transform] = path.split("@@");
            return h("path", { style, d, transform });
          })
        };
      }
      if (imgRE.test(icon) === true) {
        return {
          img: true,
          src: icon.substring(4)
        };
      }
      if (svgUseRE.test(icon) === true) {
        const [def2, viewBox = defaultViewBox] = icon.split("|");
        return {
          svguse: true,
          src: def2.substring(7),
          viewBox
        };
      }
      let content = " ";
      const matches = icon.match(libRE);
      if (matches !== null) {
        cls = libMap[matches[1]](icon);
      } else if (faRE.test(icon) === true) {
        cls = icon;
      } else if (ionRE.test(icon) === true) {
        cls = `ionicons ion-${$q.platform.is.ios === true ? "ios" : "md"}${icon.substring(3)}`;
      } else if (symRE.test(icon) === true) {
        cls = "notranslate material-symbols";
        const matches2 = icon.match(symRE);
        if (matches2 !== null) {
          icon = icon.substring(6);
          cls += symMap[matches2[1]];
        }
        content = icon;
      } else {
        cls = "notranslate material-icons";
        const matches2 = icon.match(matRE);
        if (matches2 !== null) {
          icon = icon.substring(2);
          cls += matMap[matches2[1]];
        }
        content = icon;
      }
      return {
        cls,
        content
      };
    });
    return () => {
      const data = {
        class: classes.value,
        style: sizeStyle.value,
        "aria-hidden": "true",
        role: "presentation"
      };
      if (type.value.none === true) {
        return h(props2.tag, data, hSlot(slots.default));
      }
      if (type.value.img === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("img", { src: type.value.src })
        ]));
      }
      if (type.value.svg === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox || "0 0 24 24"
          }, type.value.nodes)
        ]));
      }
      if (type.value.svguse === true) {
        return h("span", data, hMergeSlot(slots.default, [
          h("svg", {
            viewBox: type.value.viewBox
          }, [
            h("use", { "xlink:href": type.value.src })
          ])
        ]));
      }
      if (type.value.cls !== void 0) {
        data.class += " " + type.value.cls;
      }
      return h(props2.tag, data, hMergeSlot(slots.default, [
        type.value.content
      ]));
    };
  }
});
var QAvatar = createComponent({
  name: "QAvatar",
  props: {
    ...useSizeProps,
    fontSize: String,
    color: String,
    textColor: String,
    icon: String,
    square: Boolean,
    rounded: Boolean
  },
  setup(props2, { slots }) {
    const sizeStyle = useSize(props2);
    const classes = computed(
      () => "q-avatar" + (props2.color ? ` bg-${props2.color}` : "") + (props2.textColor ? ` text-${props2.textColor} q-chip--colored` : "") + (props2.square === true ? " q-avatar--square" : props2.rounded === true ? " rounded-borders" : "")
    );
    const contentStyle = computed(() => props2.fontSize ? { fontSize: props2.fontSize } : null);
    return () => {
      const icon = props2.icon !== void 0 ? [h(QIcon, { name: props2.icon })] : void 0;
      return h("div", {
        class: classes.value,
        style: sizeStyle.value
      }, [
        h("div", {
          class: "q-avatar__content row flex-center overflow-hidden",
          style: contentStyle.value
        }, hMergeSlotSafely(slots.default, icon))
      ]);
    };
  }
});
const useSpinnerProps = {
  size: {
    type: [Number, String],
    default: "1em"
  },
  color: String
};
function useSpinner(props2) {
  return {
    cSize: computed(() => props2.size in useSizeDefaults ? `${useSizeDefaults[props2.size]}px` : props2.size),
    classes: computed(
      () => "q-spinner" + (props2.color ? ` text-${props2.color}` : "")
    )
  };
}
var QSpinner = createComponent({
  name: "QSpinner",
  props: {
    ...useSpinnerProps,
    thickness: {
      type: Number,
      default: 5
    }
  },
  setup(props2) {
    const { cSize, classes } = useSpinner(props2);
    return () => h("svg", {
      class: classes.value + " q-spinner-mat",
      width: cSize.value,
      height: cSize.value,
      viewBox: "25 25 50 50"
    }, [
      h("circle", {
        class: "path",
        cx: "50",
        cy: "50",
        r: "20",
        fill: "none",
        stroke: "currentColor",
        "stroke-width": props2.thickness,
        "stroke-miterlimit": "10"
      })
    ]);
  }
});
function height(el) {
  return el === window ? window.innerHeight : el.getBoundingClientRect().height;
}
function css(element, css2) {
  const style = element.style;
  for (const prop in css2) {
    style[prop] = css2[prop];
  }
}
function getElement(el) {
  if (el === void 0 || el === null) {
    return void 0;
  }
  if (typeof el === "string") {
    try {
      return document.querySelector(el) || void 0;
    } catch (err) {
      return void 0;
    }
  }
  const target2 = unref(el);
  if (target2) {
    return target2.$el || target2;
  }
}
function childHasFocus(el, focusedEl) {
  if (el === void 0 || el === null || el.contains(focusedEl) === true) {
    return true;
  }
  for (let next = el.nextElementSibling; next !== null; next = next.nextElementSibling) {
    if (next.contains(focusedEl)) {
      return true;
    }
  }
  return false;
}
function throttle(fn, limit = 250) {
  let wait = false, result;
  return function() {
    if (wait === false) {
      wait = true;
      setTimeout(() => {
        wait = false;
      }, limit);
      result = fn.apply(this, arguments);
    }
    return result;
  };
}
function showRipple(evt, el, ctx, forceCenter) {
  ctx.modifiers.stop === true && stop(evt);
  const color = ctx.modifiers.color;
  let center = ctx.modifiers.center;
  center = center === true || forceCenter === true;
  const node = document.createElement("span"), innerNode = document.createElement("span"), pos = position(evt), { left, top, width, height: height2 } = el.getBoundingClientRect(), diameter = Math.sqrt(width * width + height2 * height2), radius = diameter / 2, centerX = `${(width - diameter) / 2}px`, x = center ? centerX : `${pos.left - left - radius}px`, centerY = `${(height2 - diameter) / 2}px`, y = center ? centerY : `${pos.top - top - radius}px`;
  innerNode.className = "q-ripple__inner";
  css(innerNode, {
    height: `${diameter}px`,
    width: `${diameter}px`,
    transform: `translate3d(${x},${y},0) scale3d(.2,.2,1)`,
    opacity: 0
  });
  node.className = `q-ripple${color ? " text-" + color : ""}`;
  node.setAttribute("dir", "ltr");
  node.appendChild(innerNode);
  el.appendChild(node);
  const abort = () => {
    node.remove();
    clearTimeout(timer);
  };
  ctx.abort.push(abort);
  let timer = setTimeout(() => {
    innerNode.classList.add("q-ripple__inner--enter");
    innerNode.style.transform = `translate3d(${centerX},${centerY},0) scale3d(1,1,1)`;
    innerNode.style.opacity = 0.2;
    timer = setTimeout(() => {
      innerNode.classList.remove("q-ripple__inner--enter");
      innerNode.classList.add("q-ripple__inner--leave");
      innerNode.style.opacity = 0;
      timer = setTimeout(() => {
        node.remove();
        ctx.abort.splice(ctx.abort.indexOf(abort), 1);
      }, 275);
    }, 250);
  }, 50);
}
function updateModifiers(ctx, { modifiers, value, arg }) {
  const cfg = Object.assign({}, ctx.cfg.ripple, modifiers, value);
  ctx.modifiers = {
    early: cfg.early === true,
    stop: cfg.stop === true,
    center: cfg.center === true,
    color: cfg.color || arg,
    keyCodes: [].concat(cfg.keyCodes || 13)
  };
}
var Ripple = createDirective(
  {
    name: "ripple",
    beforeMount(el, binding) {
      const cfg = binding.instance.$.appContext.config.globalProperties.$q.config || {};
      if (cfg.ripple === false) {
        return;
      }
      const ctx = {
        cfg,
        enabled: binding.value !== false,
        modifiers: {},
        abort: [],
        start(evt) {
          if (ctx.enabled === true && evt.qSkipRipple !== true && evt.type === (ctx.modifiers.early === true ? "pointerdown" : "click")) {
            showRipple(evt, el, ctx, evt.qKeyEvent === true);
          }
        },
        keystart: throttle((evt) => {
          if (ctx.enabled === true && evt.qSkipRipple !== true && isKeyCode(evt, ctx.modifiers.keyCodes) === true && evt.type === `key${ctx.modifiers.early === true ? "down" : "up"}`) {
            showRipple(evt, el, ctx, true);
          }
        }, 300)
      };
      updateModifiers(ctx, binding);
      el.__qripple = ctx;
      addEvt(ctx, "main", [
        [el, "pointerdown", "start", "passive"],
        [el, "click", "start", "passive"],
        [el, "keydown", "keystart", "passive"],
        [el, "keyup", "keystart", "passive"]
      ]);
    },
    updated(el, binding) {
      if (binding.oldValue !== binding.value) {
        const ctx = el.__qripple;
        if (ctx !== void 0) {
          ctx.enabled = binding.value !== false;
          if (ctx.enabled === true && Object(binding.value) === binding.value) {
            updateModifiers(ctx, binding);
          }
        }
      }
    },
    beforeUnmount(el) {
      const ctx = el.__qripple;
      if (ctx !== void 0) {
        ctx.abort.forEach((fn) => {
          fn();
        });
        cleanEvt(ctx, "main");
        delete el._qripple;
      }
    }
  }
);
const alignMap = {
  left: "start",
  center: "center",
  right: "end",
  between: "between",
  around: "around",
  evenly: "evenly",
  stretch: "stretch"
};
const alignValues = Object.keys(alignMap);
const useAlignProps = {
  align: {
    type: String,
    validator: (v) => alignValues.includes(v)
  }
};
function useAlign(props2) {
  return computed(() => {
    const align = props2.align === void 0 ? props2.vertical === true ? "stretch" : "left" : props2.align;
    return `${props2.vertical === true ? "items" : "justify"}-${alignMap[align]}`;
  });
}
function getParentProxy(proxy) {
  if (Object(proxy.$parent) === proxy.$parent) {
    return proxy.$parent;
  }
  let { parent } = proxy.$;
  while (Object(parent) === parent) {
    if (Object(parent.proxy) === parent.proxy) {
      return parent.proxy;
    }
    parent = parent.parent;
  }
}
function vmHasRouter(vm2) {
  return vm2.appContext.config.globalProperties.$router !== void 0;
}
function vmIsDestroyed(vm2) {
  return vm2.isUnmounted === true || vm2.isDeactivated === true;
}
function getOriginalPath(record) {
  return record ? record.aliasOf ? record.aliasOf.path : record.path : "";
}
function isSameRouteRecord(a, b) {
  return (a.aliasOf || a) === (b.aliasOf || b);
}
function includesParams(outer, inner) {
  for (const key in inner) {
    const innerValue = inner[key], outerValue = outer[key];
    if (typeof innerValue === "string") {
      if (innerValue !== outerValue) {
        return false;
      }
    } else if (Array.isArray(outerValue) === false || outerValue.length !== innerValue.length || innerValue.some((value, i) => value !== outerValue[i])) {
      return false;
    }
  }
  return true;
}
function isEquivalentArray(a, b) {
  return Array.isArray(b) === true ? a.length === b.length && a.every((value, i) => value === b[i]) : a.length === 1 && a[0] === b;
}
function isSameRouteLocationParamsValue(a, b) {
  return Array.isArray(a) === true ? isEquivalentArray(a, b) : Array.isArray(b) === true ? isEquivalentArray(b, a) : a === b;
}
function isSameRouteLocationParams(a, b) {
  if (Object.keys(a).length !== Object.keys(b).length) {
    return false;
  }
  for (const key in a) {
    if (isSameRouteLocationParamsValue(a[key], b[key]) === false) {
      return false;
    }
  }
  return true;
}
const useRouterLinkProps = {
  to: [String, Object],
  replace: Boolean,
  exact: Boolean,
  activeClass: {
    type: String,
    default: "q-router-link--active"
  },
  exactActiveClass: {
    type: String,
    default: "q-router-link--exact-active"
  },
  href: String,
  target: String,
  disable: Boolean
};
function useRouterLink({ fallbackTag, useDisableForRouterLinkProps = true } = {}) {
  const vm2 = getCurrentInstance();
  const { props: props2, proxy, emit: emit3 } = vm2;
  const hasRouter = vmHasRouter(vm2);
  const hasHrefLink = computed(() => props2.disable !== true && props2.href !== void 0);
  const hasRouterLinkProps = useDisableForRouterLinkProps === true ? computed(
    () => hasRouter === true && props2.disable !== true && hasHrefLink.value !== true && props2.to !== void 0 && props2.to !== null && props2.to !== ""
  ) : computed(
    () => hasRouter === true && hasHrefLink.value !== true && props2.to !== void 0 && props2.to !== null && props2.to !== ""
  );
  const resolvedLink = computed(() => hasRouterLinkProps.value === true ? getLink(props2.to) : null);
  const hasRouterLink = computed(() => resolvedLink.value !== null);
  const hasLink = computed(() => hasHrefLink.value === true || hasRouterLink.value === true);
  const linkTag = computed(() => props2.type === "a" || hasLink.value === true ? "a" : props2.tag || fallbackTag || "div");
  const linkAttrs = computed(() => hasHrefLink.value === true ? {
    href: props2.href,
    target: props2.target
  } : hasRouterLink.value === true ? {
    href: resolvedLink.value.href,
    target: props2.target
  } : {});
  const linkActiveIndex = computed(() => {
    if (hasRouterLink.value === false) {
      return -1;
    }
    const { matched } = resolvedLink.value, { length } = matched, routeMatched = matched[length - 1];
    if (routeMatched === void 0) {
      return -1;
    }
    const currentMatched = proxy.$route.matched;
    if (currentMatched.length === 0) {
      return -1;
    }
    const index = currentMatched.findIndex(
      isSameRouteRecord.bind(null, routeMatched)
    );
    if (index > -1) {
      return index;
    }
    const parentRecordPath = getOriginalPath(matched[length - 2]);
    return length > 1 && getOriginalPath(routeMatched) === parentRecordPath && currentMatched[currentMatched.length - 1].path !== parentRecordPath ? currentMatched.findIndex(
      isSameRouteRecord.bind(null, matched[length - 2])
    ) : index;
  });
  const linkIsActive = computed(
    () => hasRouterLink.value === true && linkActiveIndex.value !== -1 && includesParams(proxy.$route.params, resolvedLink.value.params)
  );
  const linkIsExactActive = computed(
    () => linkIsActive.value === true && linkActiveIndex.value === proxy.$route.matched.length - 1 && isSameRouteLocationParams(proxy.$route.params, resolvedLink.value.params)
  );
  const linkClass = computed(() => hasRouterLink.value === true ? linkIsExactActive.value === true ? ` ${props2.exactActiveClass} ${props2.activeClass}` : props2.exact === true ? "" : linkIsActive.value === true ? ` ${props2.activeClass}` : "" : "");
  function getLink(to) {
    try {
      return proxy.$router.resolve(to);
    } catch (_) {
    }
    return null;
  }
  function navigateToRouterLink(e, { returnRouterError, to = props2.to, replace = props2.replace } = {}) {
    if (props2.disable === true) {
      e.preventDefault();
      return Promise.resolve(false);
    }
    if (e.metaKey || e.altKey || e.ctrlKey || e.shiftKey || e.button !== void 0 && e.button !== 0 || props2.target === "_blank") {
      return Promise.resolve(false);
    }
    e.preventDefault();
    const promise = proxy.$router[replace === true ? "replace" : "push"](to);
    return returnRouterError === true ? promise : promise.then(() => {
    }).catch(() => {
    });
  }
  function navigateOnClick(e) {
    if (hasRouterLink.value === true) {
      const go = (opts) => navigateToRouterLink(e, opts);
      emit3("click", e, go);
      e.defaultPrevented !== true && go();
    } else {
      emit3("click", e);
    }
  }
  return {
    hasRouterLink,
    hasHrefLink,
    hasLink,
    linkTag,
    resolvedLink,
    linkIsActive,
    linkIsExactActive,
    linkClass,
    linkAttrs,
    getLink,
    navigateToRouterLink,
    navigateOnClick
  };
}
const btnPadding = {
  none: 0,
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32
};
const defaultSizes = {
  xs: 8,
  sm: 10,
  md: 14,
  lg: 20,
  xl: 24
};
const formTypes = ["button", "submit", "reset"];
const mediaTypeRE = /[^\s]\/[^\s]/;
const btnDesignOptions = ["flat", "outline", "push", "unelevated"];
const getBtnDesign = (props2, defaultValue) => {
  if (props2.flat === true)
    return "flat";
  if (props2.outline === true)
    return "outline";
  if (props2.push === true)
    return "push";
  if (props2.unelevated === true)
    return "unelevated";
  return defaultValue;
};
const getBtnDesignAttr = (props2) => {
  const design = getBtnDesign(props2);
  return design !== void 0 ? { [design]: true } : {};
};
const useBtnProps = {
  ...useSizeProps,
  ...useRouterLinkProps,
  type: {
    type: String,
    default: "button"
  },
  label: [Number, String],
  icon: String,
  iconRight: String,
  ...btnDesignOptions.reduce(
    (acc, val) => (acc[val] = Boolean) && acc,
    {}
  ),
  square: Boolean,
  round: Boolean,
  rounded: Boolean,
  glossy: Boolean,
  size: String,
  fab: Boolean,
  fabMini: Boolean,
  padding: String,
  color: String,
  textColor: String,
  noCaps: Boolean,
  noWrap: Boolean,
  dense: Boolean,
  tabindex: [Number, String],
  ripple: {
    type: [Boolean, Object],
    default: true
  },
  align: {
    ...useAlignProps.align,
    default: "center"
  },
  stack: Boolean,
  stretch: Boolean,
  loading: {
    type: Boolean,
    default: null
  },
  disable: Boolean
};
function useBtn(props2) {
  const sizeStyle = useSize(props2, defaultSizes);
  const alignClass = useAlign(props2);
  const { hasRouterLink, hasLink, linkTag, linkAttrs, navigateOnClick } = useRouterLink({
    fallbackTag: "button"
  });
  const style = computed(() => {
    const obj = props2.fab === false && props2.fabMini === false ? sizeStyle.value : {};
    return props2.padding !== void 0 ? Object.assign({}, obj, {
      padding: props2.padding.split(/\s+/).map((v) => v in btnPadding ? btnPadding[v] + "px" : v).join(" "),
      minWidth: "0",
      minHeight: "0"
    }) : obj;
  });
  const isRounded = computed(
    () => props2.rounded === true || props2.fab === true || props2.fabMini === true
  );
  const isActionable = computed(
    () => props2.disable !== true && props2.loading !== true
  );
  const tabIndex = computed(() => isActionable.value === true ? props2.tabindex || 0 : -1);
  const design = computed(() => getBtnDesign(props2, "standard"));
  const attributes = computed(() => {
    const acc = { tabindex: tabIndex.value };
    if (hasLink.value === true) {
      Object.assign(acc, linkAttrs.value);
    } else if (formTypes.includes(props2.type) === true) {
      acc.type = props2.type;
    }
    if (linkTag.value === "a") {
      if (props2.disable === true) {
        acc["aria-disabled"] = "true";
      } else if (acc.href === void 0) {
        acc.role = "button";
      }
      if (hasRouterLink.value !== true && mediaTypeRE.test(props2.type) === true) {
        acc.type = props2.type;
      }
    } else if (props2.disable === true) {
      acc.disabled = "";
      acc["aria-disabled"] = "true";
    }
    if (props2.loading === true && props2.percentage !== void 0) {
      Object.assign(acc, {
        role: "progressbar",
        "aria-valuemin": 0,
        "aria-valuemax": 100,
        "aria-valuenow": props2.percentage
      });
    }
    return acc;
  });
  const classes = computed(() => {
    let colors;
    if (props2.color !== void 0) {
      if (props2.flat === true || props2.outline === true) {
        colors = `text-${props2.textColor || props2.color}`;
      } else {
        colors = `bg-${props2.color} text-${props2.textColor || "white"}`;
      }
    } else if (props2.textColor) {
      colors = `text-${props2.textColor}`;
    }
    const shape = props2.round === true ? "round" : `rectangle${isRounded.value === true ? " q-btn--rounded" : props2.square === true ? " q-btn--square" : ""}`;
    return `q-btn--${design.value} q-btn--${shape}` + (colors !== void 0 ? " " + colors : "") + (isActionable.value === true ? " q-btn--actionable q-focusable q-hoverable" : props2.disable === true ? " disabled" : "") + (props2.fab === true ? " q-btn--fab" : props2.fabMini === true ? " q-btn--fab-mini" : "") + (props2.noCaps === true ? " q-btn--no-uppercase" : "") + (props2.dense === true ? " q-btn--dense" : "") + (props2.stretch === true ? " no-border-radius self-stretch" : "") + (props2.glossy === true ? " glossy" : "") + (props2.square ? " q-btn--square" : "");
  });
  const innerClasses = computed(
    () => alignClass.value + (props2.stack === true ? " column" : " row") + (props2.noWrap === true ? " no-wrap text-no-wrap" : "") + (props2.loading === true ? " q-btn__content--hidden" : "")
  );
  return {
    classes,
    style,
    innerClasses,
    attributes,
    hasLink,
    linkTag,
    navigateOnClick,
    isActionable
  };
}
const { passiveCapture } = listenOpts;
let touchTarget = null, keyboardTarget = null, mouseTarget = null;
var QBtn = createComponent({
  name: "QBtn",
  props: {
    ...useBtnProps,
    percentage: Number,
    darkPercentage: Boolean,
    onTouchstart: [Function, Array]
  },
  emits: ["click", "keydown", "mousedown", "keyup"],
  setup(props2, { slots, emit: emit3 }) {
    const { proxy } = getCurrentInstance();
    const {
      classes,
      style,
      innerClasses,
      attributes,
      hasLink,
      linkTag,
      navigateOnClick,
      isActionable
    } = useBtn(props2);
    const rootRef = ref(null);
    const blurTargetRef = ref(null);
    let localTouchTargetEl = null, avoidMouseRipple, mouseTimer = null;
    const hasLabel = computed(
      () => props2.label !== void 0 && props2.label !== null && props2.label !== ""
    );
    const ripple = computed(() => props2.disable === true || props2.ripple === false ? false : {
      keyCodes: hasLink.value === true ? [13, 32] : [13],
      ...props2.ripple === true ? {} : props2.ripple
    });
    const rippleProps = computed(() => ({ center: props2.round }));
    const percentageStyle = computed(() => {
      const val = Math.max(0, Math.min(100, props2.percentage));
      return val > 0 ? { transition: "transform 0.6s", transform: `translateX(${val - 100}%)` } : {};
    });
    const onEvents = computed(() => {
      if (props2.loading === true) {
        return {
          onMousedown: onLoadingEvt,
          onTouchstart: onLoadingEvt,
          onClick: onLoadingEvt,
          onKeydown: onLoadingEvt,
          onKeyup: onLoadingEvt
        };
      }
      if (isActionable.value === true) {
        const acc = {
          onClick,
          onKeydown: onKeydown2,
          onMousedown
        };
        if (proxy.$q.platform.has.touch === true) {
          const suffix = props2.onTouchstart !== void 0 ? "" : "Passive";
          acc[`onTouchstart${suffix}`] = onTouchstart;
        }
        return acc;
      }
      return {
        onClick: stopAndPrevent
      };
    });
    const nodeProps = computed(() => ({
      ref: rootRef,
      class: "q-btn q-btn-item non-selectable no-outline " + classes.value,
      style: style.value,
      ...attributes.value,
      ...onEvents.value
    }));
    function onClick(e) {
      if (rootRef.value === null) {
        return;
      }
      if (e !== void 0) {
        if (e.defaultPrevented === true) {
          return;
        }
        const el = document.activeElement;
        if (props2.type === "submit" && el !== document.body && rootRef.value.contains(el) === false && el.contains(rootRef.value) === false) {
          rootRef.value.focus();
          const onClickCleanup = () => {
            document.removeEventListener("keydown", stopAndPrevent, true);
            document.removeEventListener("keyup", onClickCleanup, passiveCapture);
            rootRef.value !== null && rootRef.value.removeEventListener("blur", onClickCleanup, passiveCapture);
          };
          document.addEventListener("keydown", stopAndPrevent, true);
          document.addEventListener("keyup", onClickCleanup, passiveCapture);
          rootRef.value.addEventListener("blur", onClickCleanup, passiveCapture);
        }
      }
      navigateOnClick(e);
    }
    function onKeydown2(e) {
      if (rootRef.value === null) {
        return;
      }
      emit3("keydown", e);
      if (isKeyCode(e, [13, 32]) === true && keyboardTarget !== rootRef.value) {
        keyboardTarget !== null && cleanup();
        if (e.defaultPrevented !== true) {
          rootRef.value.focus();
          keyboardTarget = rootRef.value;
          rootRef.value.classList.add("q-btn--active");
          document.addEventListener("keyup", onPressEnd, true);
          rootRef.value.addEventListener("blur", onPressEnd, passiveCapture);
        }
        stopAndPrevent(e);
      }
    }
    function onTouchstart(e) {
      if (rootRef.value === null) {
        return;
      }
      emit3("touchstart", e);
      if (e.defaultPrevented === true) {
        return;
      }
      if (touchTarget !== rootRef.value) {
        touchTarget !== null && cleanup();
        touchTarget = rootRef.value;
        localTouchTargetEl = e.target;
        localTouchTargetEl.addEventListener("touchcancel", onPressEnd, passiveCapture);
        localTouchTargetEl.addEventListener("touchend", onPressEnd, passiveCapture);
      }
      avoidMouseRipple = true;
      mouseTimer !== null && clearTimeout(mouseTimer);
      mouseTimer = setTimeout(() => {
        mouseTimer = null;
        avoidMouseRipple = false;
      }, 200);
    }
    function onMousedown(e) {
      if (rootRef.value === null) {
        return;
      }
      e.qSkipRipple = avoidMouseRipple === true;
      emit3("mousedown", e);
      if (e.defaultPrevented !== true && mouseTarget !== rootRef.value) {
        mouseTarget !== null && cleanup();
        mouseTarget = rootRef.value;
        rootRef.value.classList.add("q-btn--active");
        document.addEventListener("mouseup", onPressEnd, passiveCapture);
      }
    }
    function onPressEnd(e) {
      if (rootRef.value === null) {
        return;
      }
      if (e !== void 0 && e.type === "blur" && document.activeElement === rootRef.value) {
        return;
      }
      if (e !== void 0 && e.type === "keyup") {
        if (keyboardTarget === rootRef.value && isKeyCode(e, [13, 32]) === true) {
          const evt = new MouseEvent("click", e);
          evt.qKeyEvent = true;
          e.defaultPrevented === true && prevent(evt);
          e.cancelBubble === true && stop(evt);
          rootRef.value.dispatchEvent(evt);
          stopAndPrevent(e);
          e.qKeyEvent = true;
        }
        emit3("keyup", e);
      }
      cleanup();
    }
    function cleanup(destroying) {
      const blurTarget = blurTargetRef.value;
      if (destroying !== true && (touchTarget === rootRef.value || mouseTarget === rootRef.value) && blurTarget !== null && blurTarget !== document.activeElement) {
        blurTarget.setAttribute("tabindex", -1);
        blurTarget.focus();
      }
      if (touchTarget === rootRef.value) {
        if (localTouchTargetEl !== null) {
          localTouchTargetEl.removeEventListener("touchcancel", onPressEnd, passiveCapture);
          localTouchTargetEl.removeEventListener("touchend", onPressEnd, passiveCapture);
        }
        touchTarget = localTouchTargetEl = null;
      }
      if (mouseTarget === rootRef.value) {
        document.removeEventListener("mouseup", onPressEnd, passiveCapture);
        mouseTarget = null;
      }
      if (keyboardTarget === rootRef.value) {
        document.removeEventListener("keyup", onPressEnd, true);
        rootRef.value !== null && rootRef.value.removeEventListener("blur", onPressEnd, passiveCapture);
        keyboardTarget = null;
      }
      rootRef.value !== null && rootRef.value.classList.remove("q-btn--active");
    }
    function onLoadingEvt(evt) {
      stopAndPrevent(evt);
      evt.qSkipRipple = true;
    }
    onBeforeUnmount(() => {
      cleanup(true);
    });
    Object.assign(proxy, { click: onClick });
    return () => {
      let inner = [];
      props2.icon !== void 0 && inner.push(
        h(QIcon, {
          name: props2.icon,
          left: props2.stack === false && hasLabel.value === true,
          role: "img",
          "aria-hidden": "true"
        })
      );
      hasLabel.value === true && inner.push(
        h("span", { class: "block" }, [props2.label])
      );
      inner = hMergeSlot(slots.default, inner);
      if (props2.iconRight !== void 0 && props2.round === false) {
        inner.push(
          h(QIcon, {
            name: props2.iconRight,
            right: props2.stack === false && hasLabel.value === true,
            role: "img",
            "aria-hidden": "true"
          })
        );
      }
      const child = [
        h("span", {
          class: "q-focus-helper",
          ref: blurTargetRef
        })
      ];
      if (props2.loading === true && props2.percentage !== void 0) {
        child.push(
          h("span", {
            class: "q-btn__progress absolute-full overflow-hidden" + (props2.darkPercentage === true ? " q-btn__progress--dark" : "")
          }, [
            h("span", {
              class: "q-btn__progress-indicator fit block",
              style: percentageStyle.value
            })
          ])
        );
      }
      child.push(
        h("span", {
          class: "q-btn__content text-center col items-center q-anchor--skip " + innerClasses.value
        }, inner)
      );
      props2.loading !== null && child.push(
        h(Transition, {
          name: "q-transition--fade"
        }, () => props2.loading === true ? [
          h("span", {
            key: "loading",
            class: "absolute-full flex flex-center"
          }, slots.loading !== void 0 ? slots.loading() : [h(QSpinner)])
        ] : null)
      );
      return withDirectives(
        h(
          linkTag.value,
          nodeProps.value,
          child
        ),
        [[
          Ripple,
          ripple.value,
          void 0,
          rippleProps.value
        ]]
      );
    };
  }
});
let portalIndex = 1;
let target = document.body;
function createGlobalNode(id, portalType) {
  const el = document.createElement("div");
  el.id = portalType !== void 0 ? `q-portal--${portalType}--${portalIndex++}` : id;
  if (globalConfig.globalNodes !== void 0) {
    const cls = globalConfig.globalNodes.class;
    if (cls !== void 0) {
      el.className = cls;
    }
  }
  target.appendChild(el);
  return el;
}
function removeGlobalNode(el) {
  el.remove();
}
let uid$1 = 0;
const defaults$1 = {};
const groups = {};
const notificationsList = {};
const positionClass$1 = {};
const emptyRE = /^\s*$/;
const notifRefs = [];
const positionList = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right",
  "top",
  "bottom",
  "left",
  "right",
  "center"
];
const badgePositions = [
  "top-left",
  "top-right",
  "bottom-left",
  "bottom-right"
];
const notifTypes = {
  positive: {
    icon: ($q) => $q.iconSet.type.positive,
    color: "positive"
  },
  negative: {
    icon: ($q) => $q.iconSet.type.negative,
    color: "negative"
  },
  warning: {
    icon: ($q) => $q.iconSet.type.warning,
    color: "warning",
    textColor: "dark"
  },
  info: {
    icon: ($q) => $q.iconSet.type.info,
    color: "info"
  },
  ongoing: {
    group: false,
    timeout: 0,
    spinner: true,
    color: "grey-8"
  }
};
function addNotification(config, $q, originalApi) {
  if (!config) {
    return logError("parameter required");
  }
  let Api;
  const notif = { textColor: "white" };
  if (config.ignoreDefaults !== true) {
    Object.assign(notif, defaults$1);
  }
  if (isObject(config) === false) {
    if (notif.type) {
      Object.assign(notif, notifTypes[notif.type]);
    }
    config = { message: config };
  }
  Object.assign(notif, notifTypes[config.type || notif.type], config);
  if (typeof notif.icon === "function") {
    notif.icon = notif.icon($q);
  }
  if (!notif.spinner) {
    notif.spinner = false;
  } else {
    if (notif.spinner === true) {
      notif.spinner = QSpinner;
    }
    notif.spinner = markRaw(notif.spinner);
  }
  notif.meta = {
    hasMedia: Boolean(notif.spinner !== false || notif.icon || notif.avatar),
    hasText: hasContent(notif.message) || hasContent(notif.caption)
  };
  if (notif.position) {
    if (positionList.includes(notif.position) === false) {
      return logError("wrong position", config);
    }
  } else {
    notif.position = "bottom";
  }
  if (notif.timeout === void 0) {
    notif.timeout = 5e3;
  } else {
    const t = parseInt(notif.timeout, 10);
    if (isNaN(t) || t < 0) {
      return logError("wrong timeout", config);
    }
    notif.timeout = t;
  }
  if (notif.timeout === 0) {
    notif.progress = false;
  } else if (notif.progress === true) {
    notif.meta.progressClass = "q-notification__progress" + (notif.progressClass ? ` ${notif.progressClass}` : "");
    notif.meta.progressStyle = {
      animationDuration: `${notif.timeout + 1e3}ms`
    };
  }
  const actions = (Array.isArray(config.actions) === true ? config.actions : []).concat(
    config.ignoreDefaults !== true && Array.isArray(defaults$1.actions) === true ? defaults$1.actions : []
  ).concat(
    notifTypes[config.type] !== void 0 && Array.isArray(notifTypes[config.type].actions) === true ? notifTypes[config.type].actions : []
  );
  const { closeBtn } = notif;
  closeBtn && actions.push({
    label: typeof closeBtn === "string" ? closeBtn : $q.lang.label.close
  });
  notif.actions = actions.map(({ handler, noDismiss, ...item }) => ({
    flat: true,
    ...item,
    onClick: typeof handler === "function" ? () => {
      handler();
      noDismiss !== true && dismiss();
    } : () => {
      dismiss();
    }
  }));
  if (notif.multiLine === void 0) {
    notif.multiLine = notif.actions.length > 1;
  }
  Object.assign(notif.meta, {
    class: `q-notification row items-stretch q-notification--${notif.multiLine === true ? "multi-line" : "standard"}` + (notif.color !== void 0 ? ` bg-${notif.color}` : "") + (notif.textColor !== void 0 ? ` text-${notif.textColor}` : "") + (notif.classes !== void 0 ? ` ${notif.classes}` : ""),
    wrapperClass: "q-notification__wrapper col relative-position border-radius-inherit " + (notif.multiLine === true ? "column no-wrap justify-center" : "row items-center"),
    contentClass: "q-notification__content row items-center" + (notif.multiLine === true ? "" : " col"),
    leftClass: notif.meta.hasText === true ? "additional" : "single",
    attrs: {
      role: "alert",
      ...notif.attrs
    }
  });
  if (notif.group === false) {
    notif.group = void 0;
    notif.meta.group = void 0;
  } else {
    if (notif.group === void 0 || notif.group === true) {
      notif.group = [
        notif.message,
        notif.caption,
        notif.multiline
      ].concat(
        notif.actions.map((props2) => `${props2.label}*${props2.icon}`)
      ).join("|");
    }
    notif.meta.group = notif.group + "|" + notif.position;
  }
  if (notif.actions.length === 0) {
    notif.actions = void 0;
  } else {
    notif.meta.actionsClass = "q-notification__actions row items-center " + (notif.multiLine === true ? "justify-end" : "col-auto") + (notif.meta.hasMedia === true ? " q-notification__actions--with-media" : "");
  }
  if (originalApi !== void 0) {
    if (originalApi.notif.meta.timer) {
      clearTimeout(originalApi.notif.meta.timer);
      originalApi.notif.meta.timer = void 0;
    }
    notif.meta.uid = originalApi.notif.meta.uid;
    const index = notificationsList[notif.position].value.indexOf(originalApi.notif);
    notificationsList[notif.position].value[index] = notif;
  } else {
    const original = groups[notif.meta.group];
    if (original === void 0) {
      notif.meta.uid = uid$1++;
      notif.meta.badge = 1;
      if (["left", "right", "center"].indexOf(notif.position) !== -1) {
        notificationsList[notif.position].value.splice(
          Math.floor(notificationsList[notif.position].value.length / 2),
          0,
          notif
        );
      } else {
        const action = notif.position.indexOf("top") > -1 ? "unshift" : "push";
        notificationsList[notif.position].value[action](notif);
      }
      if (notif.group !== void 0) {
        groups[notif.meta.group] = notif;
      }
    } else {
      if (original.meta.timer) {
        clearTimeout(original.meta.timer);
        original.meta.timer = void 0;
      }
      if (notif.badgePosition !== void 0) {
        if (badgePositions.includes(notif.badgePosition) === false) {
          return logError("wrong badgePosition", config);
        }
      } else {
        notif.badgePosition = `top-${notif.position.indexOf("left") > -1 ? "right" : "left"}`;
      }
      notif.meta.uid = original.meta.uid;
      notif.meta.badge = original.meta.badge + 1;
      notif.meta.badgeClass = `q-notification__badge q-notification__badge--${notif.badgePosition}` + (notif.badgeColor !== void 0 ? ` bg-${notif.badgeColor}` : "") + (notif.badgeTextColor !== void 0 ? ` text-${notif.badgeTextColor}` : "") + (notif.badgeClass ? ` ${notif.badgeClass}` : "");
      const index = notificationsList[notif.position].value.indexOf(original);
      notificationsList[notif.position].value[index] = groups[notif.meta.group] = notif;
    }
  }
  const dismiss = () => {
    removeNotification(notif);
    Api = void 0;
  };
  if (notif.timeout > 0) {
    notif.meta.timer = setTimeout(() => {
      notif.meta.timer = void 0;
      dismiss();
    }, notif.timeout + 1e3);
  }
  if (notif.group !== void 0) {
    return (props2) => {
      if (props2 !== void 0) {
        logError("trying to update a grouped one which is forbidden", config);
      } else {
        dismiss();
      }
    };
  }
  Api = {
    dismiss,
    config,
    notif
  };
  if (originalApi !== void 0) {
    Object.assign(originalApi, Api);
    return;
  }
  return (props2) => {
    if (Api !== void 0) {
      if (props2 === void 0) {
        Api.dismiss();
      } else {
        const newNotif = Object.assign({}, Api.config, props2, {
          group: false,
          position: notif.position
        });
        addNotification(newNotif, $q, Api);
      }
    }
  };
}
function removeNotification(notif) {
  if (notif.meta.timer) {
    clearTimeout(notif.meta.timer);
    notif.meta.timer = void 0;
  }
  const index = notificationsList[notif.position].value.indexOf(notif);
  if (index !== -1) {
    if (notif.group !== void 0) {
      delete groups[notif.meta.group];
    }
    const el = notifRefs["" + notif.meta.uid];
    if (el) {
      const { width, height: height2 } = getComputedStyle(el);
      el.style.left = `${el.offsetLeft}px`;
      el.style.width = width;
      el.style.height = height2;
    }
    notificationsList[notif.position].value.splice(index, 1);
    if (typeof notif.onDismiss === "function") {
      notif.onDismiss();
    }
  }
}
function hasContent(str) {
  return str !== void 0 && str !== null && emptyRE.test(str) !== true;
}
function logError(error, config) {
  console.error(`Notify: ${error}`, config);
  return false;
}
function getComponent() {
  return createComponent({
    name: "QNotifications",
    devtools: { hide: true },
    setup() {
      return () => h("div", { class: "q-notifications" }, positionList.map((pos) => {
        return h(TransitionGroup, {
          key: pos,
          class: positionClass$1[pos],
          tag: "div",
          name: `q-notification--${pos}`
        }, () => notificationsList[pos].value.map((notif) => {
          const meta = notif.meta;
          const mainChild = [];
          if (meta.hasMedia === true) {
            if (notif.spinner !== false) {
              mainChild.push(
                h(notif.spinner, {
                  class: "q-notification__spinner q-notification__spinner--" + meta.leftClass,
                  color: notif.spinnerColor,
                  size: notif.spinnerSize
                })
              );
            } else if (notif.icon) {
              mainChild.push(
                h(QIcon, {
                  class: "q-notification__icon q-notification__icon--" + meta.leftClass,
                  name: notif.icon,
                  color: notif.iconColor,
                  size: notif.iconSize,
                  role: "img"
                })
              );
            } else if (notif.avatar) {
              mainChild.push(
                h(QAvatar, {
                  class: "q-notification__avatar q-notification__avatar--" + meta.leftClass
                }, () => h("img", { src: notif.avatar, "aria-hidden": "true" }))
              );
            }
          }
          if (meta.hasText === true) {
            let msgChild;
            const msgData = { class: "q-notification__message col" };
            if (notif.html === true) {
              msgData.innerHTML = notif.caption ? `<div>${notif.message}</div><div class="q-notification__caption">${notif.caption}</div>` : notif.message;
            } else {
              const msgNode = [notif.message];
              msgChild = notif.caption ? [
                h("div", msgNode),
                h("div", { class: "q-notification__caption" }, [notif.caption])
              ] : msgNode;
            }
            mainChild.push(
              h("div", msgData, msgChild)
            );
          }
          const child = [
            h("div", { class: meta.contentClass }, mainChild)
          ];
          notif.progress === true && child.push(
            h("div", {
              key: `${meta.uid}|p|${meta.badge}`,
              class: meta.progressClass,
              style: meta.progressStyle
            })
          );
          notif.actions !== void 0 && child.push(
            h("div", {
              class: meta.actionsClass
            }, notif.actions.map((props2) => h(QBtn, props2)))
          );
          meta.badge > 1 && child.push(
            h("div", {
              key: `${meta.uid}|${meta.badge}`,
              class: notif.meta.badgeClass,
              style: notif.badgeStyle
            }, [meta.badge])
          );
          return h("div", {
            ref: (el) => {
              notifRefs["" + meta.uid] = el;
            },
            key: meta.uid,
            class: meta.class,
            ...meta.attrs
          }, [
            h("div", { class: meta.wrapperClass }, child)
          ]);
        }));
      }));
    }
  });
}
var Notify = {
  setDefaults(opts) {
    {
      isObject(opts) === true && Object.assign(defaults$1, opts);
    }
  },
  registerType(typeName, typeOpts) {
    if (isObject(typeOpts) === true) {
      notifTypes[typeName] = typeOpts;
    }
  },
  install({ $q, parentApp }) {
    $q.notify = this.create = (opts) => addNotification(opts, $q);
    $q.notify.setDefaults = this.setDefaults;
    $q.notify.registerType = this.registerType;
    if ($q.config.notify !== void 0) {
      this.setDefaults($q.config.notify);
    }
    if (this.__installed !== true) {
      positionList.forEach((pos) => {
        notificationsList[pos] = ref([]);
        const vert = ["left", "center", "right"].includes(pos) === true ? "center" : pos.indexOf("top") > -1 ? "top" : "bottom", align = pos.indexOf("left") > -1 ? "start" : pos.indexOf("right") > -1 ? "end" : "center", classes = ["left", "right"].includes(pos) ? `items-${pos === "left" ? "start" : "end"} justify-center` : pos === "center" ? "flex-center" : `items-${align}`;
        positionClass$1[pos] = `q-notifications__list q-notifications__list--${vert} fixed column no-wrap ${classes}`;
      });
      const el = createGlobalNode("q-notify");
      createChildApp(getComponent(), parentApp).mount(el);
    }
  }
};
function useHistory(showing, hide, hideOnRouteChange) {
  let historyEntry;
  function removeFromHistory() {
    if (historyEntry !== void 0) {
      History.remove(historyEntry);
      historyEntry = void 0;
    }
  }
  onBeforeUnmount(() => {
    showing.value === true && removeFromHistory();
  });
  return {
    removeFromHistory,
    addToHistory() {
      historyEntry = {
        condition: () => hideOnRouteChange.value === true,
        handler: hide
      };
      History.add(historyEntry);
    }
  };
}
function useTimeout() {
  let timer = null;
  const vm2 = getCurrentInstance();
  function removeTimeout() {
    if (timer !== null) {
      clearTimeout(timer);
      timer = null;
    }
  }
  onDeactivated(removeTimeout);
  onBeforeUnmount(removeTimeout);
  return {
    removeTimeout,
    registerTimeout(fn, delay) {
      removeTimeout();
      if (vmIsDestroyed(vm2) === false) {
        timer = setTimeout(fn, delay);
      }
    }
  };
}
function useTick() {
  let tickFn;
  const vm2 = getCurrentInstance();
  function removeTick() {
    tickFn = void 0;
  }
  onDeactivated(removeTick);
  onBeforeUnmount(removeTick);
  return {
    removeTick,
    registerTick(fn) {
      tickFn = fn;
      nextTick(() => {
        if (tickFn === fn) {
          vmIsDestroyed(vm2) === false && tickFn();
          tickFn = void 0;
        }
      });
    }
  };
}
const useModelToggleProps = {
  modelValue: {
    type: Boolean,
    default: null
  },
  "onUpdate:modelValue": [Function, Array]
};
const useModelToggleEmits = [
  "beforeShow",
  "show",
  "beforeHide",
  "hide"
];
function useModelToggle({
  showing,
  canShow,
  hideOnRouteChange,
  handleShow,
  handleHide,
  processOnMount
}) {
  const vm2 = getCurrentInstance();
  const { props: props2, emit: emit3, proxy } = vm2;
  let payload;
  function toggle(evt) {
    if (showing.value === true) {
      hide(evt);
    } else {
      show(evt);
    }
  }
  function show(evt) {
    if (props2.disable === true || evt !== void 0 && evt.qAnchorHandled === true || canShow !== void 0 && canShow(evt) !== true) {
      return;
    }
    const listener = props2["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit3("update:modelValue", true);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props2.modelValue === null || listener === false || false) {
      processShow(evt);
    }
  }
  function processShow(evt) {
    if (showing.value === true) {
      return;
    }
    showing.value = true;
    emit3("beforeShow", evt);
    if (handleShow !== void 0) {
      handleShow(evt);
    } else {
      emit3("show", evt);
    }
  }
  function hide(evt) {
    if (props2.disable === true) {
      return;
    }
    const listener = props2["onUpdate:modelValue"] !== void 0;
    if (listener === true && true) {
      emit3("update:modelValue", false);
      payload = evt;
      nextTick(() => {
        if (payload === evt) {
          payload = void 0;
        }
      });
    }
    if (props2.modelValue === null || listener === false || false) {
      processHide(evt);
    }
  }
  function processHide(evt) {
    if (showing.value === false) {
      return;
    }
    showing.value = false;
    emit3("beforeHide", evt);
    if (handleHide !== void 0) {
      handleHide(evt);
    } else {
      emit3("hide", evt);
    }
  }
  function processModelChange(val) {
    if (props2.disable === true && val === true) {
      if (props2["onUpdate:modelValue"] !== void 0) {
        emit3("update:modelValue", false);
      }
    } else if (val === true !== showing.value) {
      const fn = val === true ? processShow : processHide;
      fn(payload);
    }
  }
  watch(() => props2.modelValue, processModelChange);
  if (hideOnRouteChange !== void 0 && vmHasRouter(vm2) === true) {
    watch(() => proxy.$route.fullPath, () => {
      if (hideOnRouteChange.value === true && showing.value === true) {
        hide();
      }
    });
  }
  processOnMount === true && onMounted(() => {
    processModelChange(props2.modelValue);
  });
  const publicMethods = { show, hide, toggle };
  Object.assign(proxy, publicMethods);
  return publicMethods;
}
const useTransitionProps = {
  transitionShow: {
    type: String,
    default: "fade"
  },
  transitionHide: {
    type: String,
    default: "fade"
  },
  transitionDuration: {
    type: [String, Number],
    default: 300
  }
};
function useTransition(props2, defaultShowFn = () => {
}, defaultHideFn = () => {
}) {
  return {
    transitionProps: computed(() => {
      const show = `q-transition--${props2.transitionShow || defaultShowFn()}`;
      const hide = `q-transition--${props2.transitionHide || defaultHideFn()}`;
      return {
        appear: true,
        enterFromClass: `${show}-enter-from`,
        enterActiveClass: `${show}-enter-active`,
        enterToClass: `${show}-enter-to`,
        leaveFromClass: `${hide}-leave-from`,
        leaveActiveClass: `${hide}-leave-active`,
        leaveToClass: `${hide}-leave-to`
      };
    }),
    transitionStyle: computed(() => `--q-transition-duration: ${props2.transitionDuration}ms`)
  };
}
let queue = [];
let waitFlags = [];
function clearFlag(flag) {
  waitFlags = waitFlags.filter((entry) => entry !== flag);
}
function addFocusWaitFlag(flag) {
  clearFlag(flag);
  waitFlags.push(flag);
}
function removeFocusWaitFlag(flag) {
  clearFlag(flag);
  if (waitFlags.length === 0 && queue.length !== 0) {
    queue[queue.length - 1]();
    queue = [];
  }
}
function addFocusFn(fn) {
  if (waitFlags.length === 0) {
    fn();
  } else {
    queue.push(fn);
  }
}
function removeFocusFn(fn) {
  queue = queue.filter((entry) => entry !== fn);
}
const portalProxyList = [];
function getPortalProxy(el) {
  return portalProxyList.find(
    (proxy) => proxy.contentEl !== null && proxy.contentEl.contains(el)
  );
}
function closePortalMenus(proxy, evt) {
  do {
    if (proxy.$options.name === "QMenu") {
      proxy.hide(evt);
      if (proxy.$props.separateClosePopup === true) {
        return getParentProxy(proxy);
      }
    } else if (proxy.__qPortal === true) {
      const parent = getParentProxy(proxy);
      if (parent !== void 0 && parent.$options.name === "QPopupProxy") {
        proxy.hide(evt);
        return parent;
      } else {
        return proxy;
      }
    }
    proxy = getParentProxy(proxy);
  } while (proxy !== void 0 && proxy !== null);
}
function closePortals(proxy, evt, depth) {
  while (depth !== 0 && proxy !== void 0 && proxy !== null) {
    if (proxy.__qPortal === true) {
      depth--;
      if (proxy.$options.name === "QMenu") {
        proxy = closePortalMenus(proxy, evt);
        continue;
      }
      proxy.hide(evt);
    }
    proxy = getParentProxy(proxy);
  }
}
function isOnGlobalDialog(vm2) {
  vm2 = vm2.parent;
  while (vm2 !== void 0 && vm2 !== null) {
    if (vm2.type.name === "QGlobalDialog") {
      return true;
    }
    if (vm2.type.name === "QDialog" || vm2.type.name === "QMenu") {
      return false;
    }
    vm2 = vm2.parent;
  }
  return false;
}
function usePortal(vm2, innerRef, renderPortalContent, type) {
  const portalIsActive = ref(false);
  const portalIsAccessible = ref(false);
  let portalEl = null;
  const focusObj = {};
  const onGlobalDialog = type === "dialog" && isOnGlobalDialog(vm2);
  function showPortal(isReady) {
    if (isReady === true) {
      removeFocusWaitFlag(focusObj);
      portalIsAccessible.value = true;
      return;
    }
    portalIsAccessible.value = false;
    if (portalIsActive.value === false) {
      if (onGlobalDialog === false && portalEl === null) {
        portalEl = createGlobalNode(false, type);
      }
      portalIsActive.value = true;
      portalProxyList.push(vm2.proxy);
      addFocusWaitFlag(focusObj);
    }
  }
  function hidePortal(isReady) {
    portalIsAccessible.value = false;
    if (isReady !== true) {
      return;
    }
    removeFocusWaitFlag(focusObj);
    portalIsActive.value = false;
    const index = portalProxyList.indexOf(vm2.proxy);
    if (index !== -1) {
      portalProxyList.splice(index, 1);
    }
    if (portalEl !== null) {
      removeGlobalNode(portalEl);
      portalEl = null;
    }
  }
  onUnmounted(() => {
    hidePortal(true);
  });
  vm2.proxy.__qPortal = true;
  injectProp(vm2.proxy, "contentEl", () => innerRef.value);
  return {
    showPortal,
    hidePortal,
    portalIsActive,
    portalIsAccessible,
    renderPortal: () => onGlobalDialog === true ? renderPortalContent() : portalIsActive.value === true ? [h(Teleport, { to: portalEl }, renderPortalContent())] : void 0
  };
}
const scrollTargets = [null, document, document.body, document.scrollingElement, document.documentElement];
function getScrollTarget(el, targetEl) {
  let target2 = getElement(targetEl);
  if (target2 === void 0) {
    if (el === void 0 || el === null) {
      return window;
    }
    target2 = el.closest(".scroll,.scroll-y,.overflow-auto");
  }
  return scrollTargets.includes(target2) ? window : target2;
}
function getScrollHeight(el) {
  return (el === window ? document.body : el).scrollHeight;
}
function getVerticalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageYOffset || window.scrollY || document.body.scrollTop || 0 : scrollTarget.scrollTop;
}
function getHorizontalScrollPosition(scrollTarget) {
  return scrollTarget === window ? window.pageXOffset || window.scrollX || document.body.scrollLeft || 0 : scrollTarget.scrollLeft;
}
function animVerticalScrollTo(el, to, duration = 0) {
  const prevTime = arguments[3] === void 0 ? performance.now() : arguments[3];
  const pos = getVerticalScrollPosition(el);
  if (duration <= 0) {
    if (pos !== to) {
      setScroll(el, to);
    }
    return;
  }
  requestAnimationFrame((nowTime) => {
    const frameTime = nowTime - prevTime;
    const newPos = pos + (to - pos) / Math.max(frameTime, duration) * frameTime;
    setScroll(el, newPos);
    if (newPos !== to) {
      animVerticalScrollTo(el, to, duration - frameTime, nowTime);
    }
  });
}
function animHorizontalScrollTo(el, to, duration = 0) {
  const prevTime = arguments[3] === void 0 ? performance.now() : arguments[3];
  const pos = getHorizontalScrollPosition(el);
  if (duration <= 0) {
    if (pos !== to) {
      setHorizontalScroll(el, to);
    }
    return;
  }
  requestAnimationFrame((nowTime) => {
    const frameTime = nowTime - prevTime;
    const newPos = pos + (to - pos) / Math.max(frameTime, duration) * frameTime;
    setHorizontalScroll(el, newPos);
    if (newPos !== to) {
      animHorizontalScrollTo(el, to, duration - frameTime, nowTime);
    }
  });
}
function setScroll(scrollTarget, offset) {
  if (scrollTarget === window) {
    window.scrollTo(window.pageXOffset || window.scrollX || document.body.scrollLeft || 0, offset);
    return;
  }
  scrollTarget.scrollTop = offset;
}
function setHorizontalScroll(scrollTarget, offset) {
  if (scrollTarget === window) {
    window.scrollTo(offset, window.pageYOffset || window.scrollY || document.body.scrollTop || 0);
    return;
  }
  scrollTarget.scrollLeft = offset;
}
function setVerticalScrollPosition(scrollTarget, offset, duration) {
  if (duration) {
    animVerticalScrollTo(scrollTarget, offset, duration);
    return;
  }
  setScroll(scrollTarget, offset);
}
function setHorizontalScrollPosition(scrollTarget, offset, duration) {
  if (duration) {
    animHorizontalScrollTo(scrollTarget, offset, duration);
    return;
  }
  setHorizontalScroll(scrollTarget, offset);
}
let size;
function getScrollbarWidth() {
  if (size !== void 0) {
    return size;
  }
  const inner = document.createElement("p"), outer = document.createElement("div");
  css(inner, {
    width: "100%",
    height: "200px"
  });
  css(outer, {
    position: "absolute",
    top: "0px",
    left: "0px",
    visibility: "hidden",
    width: "200px",
    height: "150px",
    overflow: "hidden"
  });
  outer.appendChild(inner);
  document.body.appendChild(outer);
  const w1 = inner.offsetWidth;
  outer.style.overflow = "scroll";
  let w2 = inner.offsetWidth;
  if (w1 === w2) {
    w2 = outer.clientWidth;
  }
  outer.remove();
  size = w1 - w2;
  return size;
}
function hasScrollbar(el, onY = true) {
  if (!el || el.nodeType !== Node.ELEMENT_NODE) {
    return false;
  }
  return onY ? el.scrollHeight > el.clientHeight && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-y"])) : el.scrollWidth > el.clientWidth && (el.classList.contains("scroll") || el.classList.contains("overflow-auto") || ["auto", "scroll"].includes(window.getComputedStyle(el)["overflow-x"]));
}
let registered = 0, scrollPositionX, scrollPositionY, maxScrollTop, vpPendingUpdate = false, bodyLeft, bodyTop, href, closeTimer = null;
function onWheel(e) {
  if (shouldPreventScroll(e)) {
    stopAndPrevent(e);
  }
}
function shouldPreventScroll(e) {
  if (e.target === document.body || e.target.classList.contains("q-layout__backdrop")) {
    return true;
  }
  const path = getEventPath(e), shift = e.shiftKey && !e.deltaX, scrollY = !shift && Math.abs(e.deltaX) <= Math.abs(e.deltaY), delta = shift || scrollY ? e.deltaY : e.deltaX;
  for (let index = 0; index < path.length; index++) {
    const el = path[index];
    if (hasScrollbar(el, scrollY)) {
      return scrollY ? delta < 0 && el.scrollTop === 0 ? true : delta > 0 && el.scrollTop + el.clientHeight === el.scrollHeight : delta < 0 && el.scrollLeft === 0 ? true : delta > 0 && el.scrollLeft + el.clientWidth === el.scrollWidth;
    }
  }
  return true;
}
function onAppleScroll(e) {
  if (e.target === document) {
    document.scrollingElement.scrollTop = document.scrollingElement.scrollTop;
  }
}
function onAppleResize(evt) {
  if (vpPendingUpdate === true) {
    return;
  }
  vpPendingUpdate = true;
  requestAnimationFrame(() => {
    vpPendingUpdate = false;
    const { height: height2 } = evt.target, { clientHeight, scrollTop } = document.scrollingElement;
    if (maxScrollTop === void 0 || height2 !== window.innerHeight) {
      maxScrollTop = clientHeight - height2;
      document.scrollingElement.scrollTop = scrollTop;
    }
    if (scrollTop > maxScrollTop) {
      document.scrollingElement.scrollTop -= Math.ceil((scrollTop - maxScrollTop) / 8);
    }
  });
}
function apply(action) {
  const body = document.body, hasViewport = window.visualViewport !== void 0;
  if (action === "add") {
    const { overflowY, overflowX } = window.getComputedStyle(body);
    scrollPositionX = getHorizontalScrollPosition(window);
    scrollPositionY = getVerticalScrollPosition(window);
    bodyLeft = body.style.left;
    bodyTop = body.style.top;
    href = window.location.href;
    body.style.left = `-${scrollPositionX}px`;
    body.style.top = `-${scrollPositionY}px`;
    if (overflowX !== "hidden" && (overflowX === "scroll" || body.scrollWidth > window.innerWidth)) {
      body.classList.add("q-body--force-scrollbar-x");
    }
    if (overflowY !== "hidden" && (overflowY === "scroll" || body.scrollHeight > window.innerHeight)) {
      body.classList.add("q-body--force-scrollbar-y");
    }
    body.classList.add("q-body--prevent-scroll");
    document.qScrollPrevented = true;
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.scrollTo(0, 0);
        window.visualViewport.addEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.addEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
        window.scrollTo(0, 0);
      } else {
        window.addEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
  }
  if (client.is.desktop === true && client.is.mac === true) {
    window[`${action}EventListener`]("wheel", onWheel, listenOpts.notPassive);
  }
  if (action === "remove") {
    if (client.is.ios === true) {
      if (hasViewport === true) {
        window.visualViewport.removeEventListener("resize", onAppleResize, listenOpts.passiveCapture);
        window.visualViewport.removeEventListener("scroll", onAppleResize, listenOpts.passiveCapture);
      } else {
        window.removeEventListener("scroll", onAppleScroll, listenOpts.passiveCapture);
      }
    }
    body.classList.remove("q-body--prevent-scroll");
    body.classList.remove("q-body--force-scrollbar-x");
    body.classList.remove("q-body--force-scrollbar-y");
    document.qScrollPrevented = false;
    body.style.left = bodyLeft;
    body.style.top = bodyTop;
    if (window.location.href === href) {
      window.scrollTo(scrollPositionX, scrollPositionY);
    }
    maxScrollTop = void 0;
  }
}
function preventScroll(state) {
  let action = "add";
  if (state === true) {
    registered++;
    if (closeTimer !== null) {
      clearTimeout(closeTimer);
      closeTimer = null;
      return;
    }
    if (registered > 1) {
      return;
    }
  } else {
    if (registered === 0) {
      return;
    }
    registered--;
    if (registered > 0) {
      return;
    }
    action = "remove";
    if (client.is.ios === true && client.is.nativeMobile === true) {
      closeTimer !== null && clearTimeout(closeTimer);
      closeTimer = setTimeout(() => {
        apply(action);
        closeTimer = null;
      }, 100);
      return;
    }
  }
  apply(action);
}
function usePreventScroll() {
  let currentState;
  return {
    preventBodyScroll(state) {
      if (state !== currentState && (currentState !== void 0 || state === true)) {
        currentState = state;
        preventScroll(state);
      }
    }
  };
}
const handlers$1 = [];
let escDown;
function onKeydown(evt) {
  escDown = evt.keyCode === 27;
}
function onBlur() {
  if (escDown === true) {
    escDown = false;
  }
}
function onKeyup(evt) {
  if (escDown === true) {
    escDown = false;
    if (isKeyCode(evt, 27) === true) {
      handlers$1[handlers$1.length - 1](evt);
    }
  }
}
function update(action) {
  window[action]("keydown", onKeydown);
  window[action]("blur", onBlur);
  window[action]("keyup", onKeyup);
  escDown = false;
}
function addEscapeKey(fn) {
  if (client.is.desktop === true) {
    handlers$1.push(fn);
    if (handlers$1.length === 1) {
      update("addEventListener");
    }
  }
}
function removeEscapeKey(fn) {
  const index = handlers$1.indexOf(fn);
  if (index > -1) {
    handlers$1.splice(index, 1);
    if (handlers$1.length === 0) {
      update("removeEventListener");
    }
  }
}
const handlers = [];
function trigger(e) {
  handlers[handlers.length - 1](e);
}
function addFocusout(fn) {
  if (client.is.desktop === true) {
    handlers.push(fn);
    if (handlers.length === 1) {
      document.body.addEventListener("focusin", trigger);
    }
  }
}
function removeFocusout(fn) {
  const index = handlers.indexOf(fn);
  if (index > -1) {
    handlers.splice(index, 1);
    if (handlers.length === 0) {
      document.body.removeEventListener("focusin", trigger);
    }
  }
}
let maximizedModals = 0;
const positionClass = {
  standard: "fixed-full flex-center",
  top: "fixed-top justify-center",
  bottom: "fixed-bottom justify-center",
  right: "fixed-right items-center",
  left: "fixed-left items-center"
};
const defaultTransitions = {
  standard: ["scale", "scale"],
  top: ["slide-down", "slide-up"],
  bottom: ["slide-up", "slide-down"],
  right: ["slide-left", "slide-right"],
  left: ["slide-right", "slide-left"]
};
var QDialog = createComponent({
  name: "QDialog",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useTransitionProps,
    transitionShow: String,
    transitionHide: String,
    persistent: Boolean,
    autoClose: Boolean,
    allowFocusOutside: Boolean,
    noEscDismiss: Boolean,
    noBackdropDismiss: Boolean,
    noRouteDismiss: Boolean,
    noRefocus: Boolean,
    noFocus: Boolean,
    noShake: Boolean,
    seamless: Boolean,
    maximized: Boolean,
    fullWidth: Boolean,
    fullHeight: Boolean,
    square: Boolean,
    position: {
      type: String,
      default: "standard",
      validator: (val) => val === "standard" || ["top", "bottom", "left", "right"].includes(val)
    }
  },
  emits: [
    ...useModelToggleEmits,
    "shake",
    "click",
    "escapeKey"
  ],
  setup(props2, { slots, emit: emit3, attrs }) {
    const vm2 = getCurrentInstance();
    const innerRef = ref(null);
    const showing = ref(false);
    const animating = ref(false);
    let shakeTimeout = null, refocusTarget = null, isMaximized, avoidAutoClose;
    const hideOnRouteChange = computed(
      () => props2.persistent !== true && props2.noRouteDismiss !== true && props2.seamless !== true
    );
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout } = useTimeout();
    const { registerTick, removeTick } = useTick();
    const { transitionProps, transitionStyle } = useTransition(
      props2,
      () => defaultTransitions[props2.position][0],
      () => defaultTransitions[props2.position][1]
    );
    const { showPortal, hidePortal, portalIsAccessible, renderPortal } = usePortal(
      vm2,
      innerRef,
      renderPortalContent,
      "dialog"
    );
    const { hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide,
      processOnMount: true
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const classes = computed(
      () => `q-dialog__inner flex no-pointer-events q-dialog__inner--${props2.maximized === true ? "maximized" : "minimized"} q-dialog__inner--${props2.position} ${positionClass[props2.position]}` + (animating.value === true ? " q-dialog__inner--animating" : "") + (props2.fullWidth === true ? " q-dialog__inner--fullwidth" : "") + (props2.fullHeight === true ? " q-dialog__inner--fullheight" : "") + (props2.square === true ? " q-dialog__inner--square" : "")
    );
    const useBackdrop = computed(() => showing.value === true && props2.seamless !== true);
    const onEvents = computed(() => props2.autoClose === true ? { onClick: onAutoClose } : {});
    const rootClasses = computed(() => [
      `q-dialog fullscreen no-pointer-events q-dialog--${useBackdrop.value === true ? "modal" : "seamless"}`,
      attrs.class
    ]);
    watch(() => props2.maximized, (state) => {
      showing.value === true && updateMaximized(state);
    });
    watch(useBackdrop, (val) => {
      preventBodyScroll(val);
      if (val === true) {
        addFocusout(onFocusChange);
        addEscapeKey(onEscapeKey);
      } else {
        removeFocusout(onFocusChange);
        removeEscapeKey(onEscapeKey);
      }
    });
    function handleShow(evt) {
      addToHistory();
      refocusTarget = props2.noRefocus === false && document.activeElement !== null ? document.activeElement : null;
      updateMaximized(props2.maximized);
      showPortal();
      animating.value = true;
      if (props2.noFocus !== true) {
        document.activeElement !== null && document.activeElement.blur();
        registerTick(focus);
      } else {
        removeTick();
      }
      registerTimeout(() => {
        if (vm2.proxy.$q.platform.is.ios === true) {
          if (props2.seamless !== true && document.activeElement) {
            const { top, bottom } = document.activeElement.getBoundingClientRect(), { innerHeight } = window, height2 = window.visualViewport !== void 0 ? window.visualViewport.height : innerHeight;
            if (top > 0 && bottom > height2 / 2) {
              document.scrollingElement.scrollTop = Math.min(
                document.scrollingElement.scrollHeight - height2,
                bottom >= innerHeight ? Infinity : Math.ceil(document.scrollingElement.scrollTop + bottom - height2 / 2)
              );
            }
            document.activeElement.scrollIntoView();
          }
          avoidAutoClose = true;
          innerRef.value.click();
          avoidAutoClose = false;
        }
        showPortal(true);
        animating.value = false;
        emit3("show", evt);
      }, props2.transitionDuration);
    }
    function handleHide(evt) {
      removeTick();
      removeFromHistory();
      cleanup(true);
      animating.value = true;
      hidePortal();
      if (refocusTarget !== null) {
        ((evt && evt.type.indexOf("key") === 0 ? refocusTarget.closest('[tabindex]:not([tabindex^="-"])') : void 0) || refocusTarget).focus();
        refocusTarget = null;
      }
      registerTimeout(() => {
        hidePortal(true);
        animating.value = false;
        emit3("hide", evt);
      }, props2.transitionDuration);
    }
    function focus(selector) {
      addFocusFn(() => {
        let node = innerRef.value;
        if (node === null || node.contains(document.activeElement) === true) {
          return;
        }
        node = (selector !== "" ? node.querySelector(selector) : null) || node.querySelector("[autofocus][tabindex], [data-autofocus][tabindex]") || node.querySelector("[autofocus] [tabindex], [data-autofocus] [tabindex]") || node.querySelector("[autofocus], [data-autofocus]") || node;
        node.focus({ preventScroll: true });
      });
    }
    function shake2(focusTarget) {
      if (focusTarget && typeof focusTarget.focus === "function") {
        focusTarget.focus({ preventScroll: true });
      } else {
        focus();
      }
      emit3("shake");
      const node = innerRef.value;
      if (node !== null) {
        node.classList.remove("q-animate--scale");
        node.classList.add("q-animate--scale");
        shakeTimeout !== null && clearTimeout(shakeTimeout);
        shakeTimeout = setTimeout(() => {
          shakeTimeout = null;
          if (innerRef.value !== null) {
            node.classList.remove("q-animate--scale");
            focus();
          }
        }, 170);
      }
    }
    function onEscapeKey() {
      if (props2.seamless !== true) {
        if (props2.persistent === true || props2.noEscDismiss === true) {
          props2.maximized !== true && props2.noShake !== true && shake2();
        } else {
          emit3("escapeKey");
          hide();
        }
      }
    }
    function cleanup(hiding) {
      if (shakeTimeout !== null) {
        clearTimeout(shakeTimeout);
        shakeTimeout = null;
      }
      if (hiding === true || showing.value === true) {
        updateMaximized(false);
        if (props2.seamless !== true) {
          preventBodyScroll(false);
          removeFocusout(onFocusChange);
          removeEscapeKey(onEscapeKey);
        }
      }
      if (hiding !== true) {
        refocusTarget = null;
      }
    }
    function updateMaximized(active) {
      if (active === true) {
        if (isMaximized !== true) {
          maximizedModals < 1 && document.body.classList.add("q-body--dialog");
          maximizedModals++;
          isMaximized = true;
        }
      } else if (isMaximized === true) {
        if (maximizedModals < 2) {
          document.body.classList.remove("q-body--dialog");
        }
        maximizedModals--;
        isMaximized = false;
      }
    }
    function onAutoClose(e) {
      if (avoidAutoClose !== true) {
        hide(e);
        emit3("click", e);
      }
    }
    function onBackdropClick(e) {
      if (props2.persistent !== true && props2.noBackdropDismiss !== true) {
        hide(e);
      } else if (props2.noShake !== true) {
        shake2();
      }
    }
    function onFocusChange(evt) {
      if (props2.allowFocusOutside !== true && portalIsAccessible.value === true && childHasFocus(innerRef.value, evt.target) !== true) {
        focus('[tabindex]:not([tabindex="-1"])');
      }
    }
    Object.assign(vm2.proxy, {
      focus,
      shake: shake2,
      __updateRefocusTarget(target2) {
        refocusTarget = target2 || null;
      }
    });
    onBeforeUnmount(cleanup);
    function renderPortalContent() {
      return h("div", {
        role: "dialog",
        "aria-modal": useBackdrop.value === true ? "true" : "false",
        ...attrs,
        class: rootClasses.value
      }, [
        h(Transition, {
          name: "q-transition--fade",
          appear: true
        }, () => useBackdrop.value === true ? h("div", {
          class: "q-dialog__backdrop fixed-full",
          style: transitionStyle.value,
          "aria-hidden": "true",
          tabindex: -1,
          onClick: onBackdropClick
        }) : null),
        h(
          Transition,
          transitionProps.value,
          () => showing.value === true ? h("div", {
            ref: innerRef,
            class: classes.value,
            style: transitionStyle.value,
            tabindex: -1,
            ...onEvents.value
          }, hSlot(slots.default)) : null
        )
      ]);
    }
    return renderPortal;
  }
});
const useDarkProps = {
  dark: {
    type: Boolean,
    default: null
  }
};
function useDark(props2, $q) {
  return computed(() => props2.dark === null ? $q.dark.isActive : props2.dark);
}
var QCard = createComponent({
  name: "QCard",
  props: {
    ...useDarkProps,
    tag: {
      type: String,
      default: "div"
    },
    square: Boolean,
    flat: Boolean,
    bordered: Boolean
  },
  setup(props2, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props2, $q);
    const classes = computed(
      () => "q-card" + (isDark.value === true ? " q-card--dark q-dark" : "") + (props2.bordered === true ? " q-card--bordered" : "") + (props2.square === true ? " q-card--square no-border-radius" : "") + (props2.flat === true ? " q-card--flat no-shadow" : "")
    );
    return () => h(props2.tag, { class: classes.value }, hSlot(slots.default));
  }
});
var QCardSection = createComponent({
  name: "QCardSection",
  props: {
    tag: {
      type: String,
      default: "div"
    },
    horizontal: Boolean
  },
  setup(props2, { slots }) {
    const classes = computed(
      () => `q-card__section q-card__section--${props2.horizontal === true ? "horiz row no-wrap" : "vert"}`
    );
    return () => h(props2.tag, { class: classes.value }, hSlot(slots.default));
  }
});
var QCardActions = createComponent({
  name: "QCardActions",
  props: {
    ...useAlignProps,
    vertical: Boolean
  },
  setup(props2, { slots }) {
    const alignClass = useAlign(props2);
    const classes = computed(
      () => `q-card__actions ${alignClass.value} q-card__actions--${props2.vertical === true ? "vert column" : "horiz row"}`
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
const insetMap = {
  true: "inset",
  item: "item-inset",
  "item-thumbnail": "item-thumbnail-inset"
};
const margins = {
  xs: 2,
  sm: 4,
  md: 8,
  lg: 16,
  xl: 24
};
var QSeparator = createComponent({
  name: "QSeparator",
  props: {
    ...useDarkProps,
    spaced: [Boolean, String],
    inset: [Boolean, String],
    vertical: Boolean,
    color: String,
    size: String
  },
  setup(props2) {
    const vm2 = getCurrentInstance();
    const isDark = useDark(props2, vm2.proxy.$q);
    const orientation = computed(() => props2.vertical === true ? "vertical" : "horizontal");
    const orientClass = computed(() => ` q-separator--${orientation.value}`);
    const insetClass = computed(() => props2.inset !== false ? `${orientClass.value}-${insetMap[props2.inset]}` : "");
    const classes = computed(
      () => `q-separator${orientClass.value}${insetClass.value}` + (props2.color !== void 0 ? ` bg-${props2.color}` : "") + (isDark.value === true ? " q-separator--dark" : "")
    );
    const style = computed(() => {
      const acc = {};
      if (props2.size !== void 0) {
        acc[props2.vertical === true ? "width" : "height"] = props2.size;
      }
      if (props2.spaced !== false) {
        const size2 = props2.spaced === true ? `${margins.md}px` : props2.spaced in margins ? `${margins[props2.spaced]}px` : props2.spaced;
        const dir = props2.vertical === true ? ["Left", "Right"] : ["Top", "Bottom"];
        acc[`margin${dir[0]}`] = acc[`margin${dir[1]}`] = size2;
      }
      return acc;
    });
    return () => h("hr", {
      class: classes.value,
      style: style.value,
      "aria-orientation": orientation.value
    });
  }
});
function useFormChild({ validate, resetValidation, requiresQForm }) {
  const $form = inject(formKey, false);
  if ($form !== false) {
    const { props: props2, proxy } = getCurrentInstance();
    Object.assign(proxy, { validate, resetValidation });
    watch(() => props2.disable, (val) => {
      if (val === true) {
        typeof resetValidation === "function" && resetValidation();
        $form.unbindComponent(proxy);
      } else {
        $form.bindComponent(proxy);
      }
    });
    onMounted(() => {
      props2.disable !== true && $form.bindComponent(proxy);
    });
    onBeforeUnmount(() => {
      props2.disable !== true && $form.unbindComponent(proxy);
    });
  } else if (requiresQForm === true) {
    console.error("Parent QForm not found on useFormChild()!");
  }
}
const hex = /^#[0-9a-fA-F]{3}([0-9a-fA-F]{3})?$/, hexa = /^#[0-9a-fA-F]{4}([0-9a-fA-F]{4})?$/, hexOrHexa = /^#([0-9a-fA-F]{3}|[0-9a-fA-F]{4}|[0-9a-fA-F]{6}|[0-9a-fA-F]{8})$/, rgb = /^rgb\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5])\)$/, rgba = /^rgba\(((0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),){2}(0|[1-9][\d]?|1[\d]{0,2}|2[\d]?|2[0-4][\d]|25[0-5]),(0|0\.[0-9]+[1-9]|0\.[1-9]+|1)\)$/;
const testPattern = {
  date: (v) => /^-?[\d]+\/[0-1]\d\/[0-3]\d$/.test(v),
  time: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d$/.test(v),
  fulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d:[0-5]\d$/.test(v),
  timeOrFulltime: (v) => /^([0-1]?\d|2[0-3]):[0-5]\d(:[0-5]\d)?$/.test(v),
  email: (v) => /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v),
  hexColor: (v) => hex.test(v),
  hexaColor: (v) => hexa.test(v),
  hexOrHexaColor: (v) => hexOrHexa.test(v),
  rgbColor: (v) => rgb.test(v),
  rgbaColor: (v) => rgba.test(v),
  rgbOrRgbaColor: (v) => rgb.test(v) || rgba.test(v),
  hexOrRgbColor: (v) => hex.test(v) || rgb.test(v),
  hexaOrRgbaColor: (v) => hexa.test(v) || rgba.test(v),
  anyColor: (v) => hexOrHexa.test(v) || rgb.test(v) || rgba.test(v)
};
const lazyRulesValues = [true, false, "ondemand"];
const useValidateProps = {
  modelValue: {},
  error: {
    type: Boolean,
    default: null
  },
  errorMessage: String,
  noErrorIcon: Boolean,
  rules: Array,
  reactiveRules: Boolean,
  lazyRules: {
    type: [Boolean, String],
    validator: (v) => lazyRulesValues.includes(v)
  }
};
function useValidate(focused, innerLoading) {
  const { props: props2, proxy } = getCurrentInstance();
  const innerError = ref(false);
  const innerErrorMessage = ref(null);
  const isDirtyModel = ref(null);
  useFormChild({ validate, resetValidation });
  let validateIndex = 0, unwatchRules;
  const hasRules = computed(
    () => props2.rules !== void 0 && props2.rules !== null && props2.rules.length !== 0
  );
  const hasActiveRules = computed(
    () => props2.disable !== true && hasRules.value === true
  );
  const hasError = computed(
    () => props2.error === true || innerError.value === true
  );
  const errorMessage = computed(() => typeof props2.errorMessage === "string" && props2.errorMessage.length !== 0 ? props2.errorMessage : innerErrorMessage.value);
  watch(() => props2.modelValue, () => {
    validateIfNeeded();
  });
  watch(() => props2.reactiveRules, (val) => {
    if (val === true) {
      if (unwatchRules === void 0) {
        unwatchRules = watch(() => props2.rules, () => {
          validateIfNeeded(true);
        });
      }
    } else if (unwatchRules !== void 0) {
      unwatchRules();
      unwatchRules = void 0;
    }
  }, { immediate: true });
  watch(focused, (val) => {
    if (val === true) {
      if (isDirtyModel.value === null) {
        isDirtyModel.value = false;
      }
    } else if (isDirtyModel.value === false) {
      isDirtyModel.value = true;
      if (hasActiveRules.value === true && props2.lazyRules !== "ondemand" && innerLoading.value === false) {
        debouncedValidate();
      }
    }
  });
  function resetValidation() {
    validateIndex++;
    innerLoading.value = false;
    isDirtyModel.value = null;
    innerError.value = false;
    innerErrorMessage.value = null;
    debouncedValidate.cancel();
  }
  function validate(val = props2.modelValue) {
    if (hasActiveRules.value !== true) {
      return true;
    }
    const index = ++validateIndex;
    const setDirty = innerLoading.value !== true ? () => {
      isDirtyModel.value = true;
    } : () => {
    };
    const update2 = (err, msg) => {
      err === true && setDirty();
      innerError.value = err;
      innerErrorMessage.value = msg || null;
      innerLoading.value = false;
    };
    const promises = [];
    for (let i = 0; i < props2.rules.length; i++) {
      const rule = props2.rules[i];
      let res;
      if (typeof rule === "function") {
        res = rule(val, testPattern);
      } else if (typeof rule === "string" && testPattern[rule] !== void 0) {
        res = testPattern[rule](val);
      }
      if (res === false || typeof res === "string") {
        update2(true, res);
        return false;
      } else if (res !== true && res !== void 0) {
        promises.push(res);
      }
    }
    if (promises.length === 0) {
      update2(false);
      return true;
    }
    innerLoading.value = true;
    return Promise.all(promises).then(
      (res) => {
        if (res === void 0 || Array.isArray(res) === false || res.length === 0) {
          index === validateIndex && update2(false);
          return true;
        }
        const msg = res.find((r) => r === false || typeof r === "string");
        index === validateIndex && update2(msg !== void 0, msg);
        return msg === void 0;
      },
      (e) => {
        if (index === validateIndex) {
          console.error(e);
          update2(true);
        }
        return false;
      }
    );
  }
  function validateIfNeeded(changedRules) {
    if (hasActiveRules.value === true && props2.lazyRules !== "ondemand" && (isDirtyModel.value === true || props2.lazyRules !== true && changedRules !== true)) {
      debouncedValidate();
    }
  }
  const debouncedValidate = debounce(validate, 0);
  onBeforeUnmount(() => {
    unwatchRules !== void 0 && unwatchRules();
    debouncedValidate.cancel();
  });
  Object.assign(proxy, { resetValidation, validate });
  injectProp(proxy, "hasError", () => hasError.value);
  return {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    validate,
    resetValidation
  };
}
const listenerRE = /^on[A-Z]/;
function useSplitAttrs(attrs, vnode) {
  const acc = {
    listeners: ref({}),
    attributes: ref({})
  };
  function update2() {
    const attributes = {};
    const listeners2 = {};
    for (const key in attrs) {
      if (key !== "class" && key !== "style" && listenerRE.test(key) === false) {
        attributes[key] = attrs[key];
      }
    }
    for (const key in vnode.props) {
      if (listenerRE.test(key) === true) {
        listeners2[key] = vnode.props[key];
      }
    }
    acc.attributes.value = attributes;
    acc.listeners.value = listeners2;
  }
  onBeforeUpdate(update2);
  update2();
  return acc;
}
function getTargetUid(val) {
  return val === void 0 ? `f_${uid$2()}` : val;
}
function fieldValueIsFilled(val) {
  return val !== void 0 && val !== null && ("" + val).length !== 0;
}
const useFieldProps = {
  ...useDarkProps,
  ...useValidateProps,
  label: String,
  stackLabel: Boolean,
  hint: String,
  hideHint: Boolean,
  prefix: String,
  suffix: String,
  labelColor: String,
  color: String,
  bgColor: String,
  filled: Boolean,
  outlined: Boolean,
  borderless: Boolean,
  standout: [Boolean, String],
  square: Boolean,
  loading: Boolean,
  labelSlot: Boolean,
  bottomSlots: Boolean,
  hideBottomSpace: Boolean,
  rounded: Boolean,
  dense: Boolean,
  itemAligned: Boolean,
  counter: Boolean,
  clearable: Boolean,
  clearIcon: String,
  disable: Boolean,
  readonly: Boolean,
  autofocus: Boolean,
  for: String,
  maxlength: [Number, String]
};
const useFieldEmits = ["update:modelValue", "clear", "focus", "blur", "popupShow", "popupHide"];
function useFieldState() {
  const { props: props2, attrs, proxy, vnode } = getCurrentInstance();
  const isDark = useDark(props2, proxy.$q);
  return {
    isDark,
    editable: computed(
      () => props2.disable !== true && props2.readonly !== true
    ),
    innerLoading: ref(false),
    focused: ref(false),
    hasPopupOpen: false,
    splitAttrs: useSplitAttrs(attrs, vnode),
    targetUid: ref(getTargetUid(props2.for)),
    rootRef: ref(null),
    targetRef: ref(null),
    controlRef: ref(null)
  };
}
function useField(state) {
  const { props: props2, emit: emit3, slots, attrs, proxy } = getCurrentInstance();
  const { $q } = proxy;
  let focusoutTimer = null;
  if (state.hasValue === void 0) {
    state.hasValue = computed(() => fieldValueIsFilled(props2.modelValue));
  }
  if (state.emitValue === void 0) {
    state.emitValue = (value) => {
      emit3("update:modelValue", value);
    };
  }
  if (state.controlEvents === void 0) {
    state.controlEvents = {
      onFocusin: onControlFocusin,
      onFocusout: onControlFocusout
    };
  }
  Object.assign(state, {
    clearValue,
    onControlFocusin,
    onControlFocusout,
    focus
  });
  if (state.computedCounter === void 0) {
    state.computedCounter = computed(() => {
      if (props2.counter !== false) {
        const len = typeof props2.modelValue === "string" || typeof props2.modelValue === "number" ? ("" + props2.modelValue).length : Array.isArray(props2.modelValue) === true ? props2.modelValue.length : 0;
        const max = props2.maxlength !== void 0 ? props2.maxlength : props2.maxValues;
        return len + (max !== void 0 ? " / " + max : "");
      }
    });
  }
  const {
    isDirtyModel,
    hasRules,
    hasError,
    errorMessage,
    resetValidation
  } = useValidate(state.focused, state.innerLoading);
  const floatingLabel = state.floatingLabel !== void 0 ? computed(() => props2.stackLabel === true || state.focused.value === true || state.floatingLabel.value === true) : computed(() => props2.stackLabel === true || state.focused.value === true || state.hasValue.value === true);
  const shouldRenderBottom = computed(
    () => props2.bottomSlots === true || props2.hint !== void 0 || hasRules.value === true || props2.counter === true || props2.error !== null
  );
  const styleType = computed(() => {
    if (props2.filled === true) {
      return "filled";
    }
    if (props2.outlined === true) {
      return "outlined";
    }
    if (props2.borderless === true) {
      return "borderless";
    }
    if (props2.standout) {
      return "standout";
    }
    return "standard";
  });
  const classes = computed(
    () => `q-field row no-wrap items-start q-field--${styleType.value}` + (state.fieldClass !== void 0 ? ` ${state.fieldClass.value}` : "") + (props2.rounded === true ? " q-field--rounded" : "") + (props2.square === true ? " q-field--square" : "") + (floatingLabel.value === true ? " q-field--float" : "") + (hasLabel.value === true ? " q-field--labeled" : "") + (props2.dense === true ? " q-field--dense" : "") + (props2.itemAligned === true ? " q-field--item-aligned q-item-type" : "") + (state.isDark.value === true ? " q-field--dark" : "") + (state.getControl === void 0 ? " q-field--auto-height" : "") + (state.focused.value === true ? " q-field--focused" : "") + (hasError.value === true ? " q-field--error" : "") + (hasError.value === true || state.focused.value === true ? " q-field--highlighted" : "") + (props2.hideBottomSpace !== true && shouldRenderBottom.value === true ? " q-field--with-bottom" : "") + (props2.disable === true ? " q-field--disabled" : props2.readonly === true ? " q-field--readonly" : "")
  );
  const contentClass = computed(
    () => "q-field__control relative-position row no-wrap" + (props2.bgColor !== void 0 ? ` bg-${props2.bgColor}` : "") + (hasError.value === true ? " text-negative" : typeof props2.standout === "string" && props2.standout.length !== 0 && state.focused.value === true ? ` ${props2.standout}` : props2.color !== void 0 ? ` text-${props2.color}` : "")
  );
  const hasLabel = computed(
    () => props2.labelSlot === true || props2.label !== void 0
  );
  const labelClass = computed(
    () => "q-field__label no-pointer-events absolute ellipsis" + (props2.labelColor !== void 0 && hasError.value !== true ? ` text-${props2.labelColor}` : "")
  );
  const controlSlotScope = computed(() => ({
    id: state.targetUid.value,
    editable: state.editable.value,
    focused: state.focused.value,
    floatingLabel: floatingLabel.value,
    modelValue: props2.modelValue,
    emitValue: state.emitValue
  }));
  const attributes = computed(() => {
    const acc = {
      for: state.targetUid.value
    };
    if (props2.disable === true) {
      acc["aria-disabled"] = "true";
    } else if (props2.readonly === true) {
      acc["aria-readonly"] = "true";
    }
    return acc;
  });
  watch(() => props2.for, (val) => {
    state.targetUid.value = getTargetUid(val);
  });
  function focusHandler() {
    const el = document.activeElement;
    let target2 = state.targetRef !== void 0 && state.targetRef.value;
    if (target2 && (el === null || el.id !== state.targetUid.value)) {
      target2.hasAttribute("tabindex") === true || (target2 = target2.querySelector("[tabindex]"));
      if (target2 && target2 !== el) {
        target2.focus({ preventScroll: true });
      }
    }
  }
  function focus() {
    addFocusFn(focusHandler);
  }
  function blur() {
    removeFocusFn(focusHandler);
    const el = document.activeElement;
    if (el !== null && state.rootRef.value.contains(el)) {
      el.blur();
    }
  }
  function onControlFocusin(e) {
    if (focusoutTimer !== null) {
      clearTimeout(focusoutTimer);
      focusoutTimer = null;
    }
    if (state.editable.value === true && state.focused.value === false) {
      state.focused.value = true;
      emit3("focus", e);
    }
  }
  function onControlFocusout(e, then) {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
    focusoutTimer = setTimeout(() => {
      focusoutTimer = null;
      if (document.hasFocus() === true && (state.hasPopupOpen === true || state.controlRef === void 0 || state.controlRef.value === null || state.controlRef.value.contains(document.activeElement) !== false)) {
        return;
      }
      if (state.focused.value === true) {
        state.focused.value = false;
        emit3("blur", e);
      }
      then !== void 0 && then();
    });
  }
  function clearValue(e) {
    stopAndPrevent(e);
    if ($q.platform.is.mobile !== true) {
      const el = state.targetRef !== void 0 && state.targetRef.value || state.rootRef.value;
      el.focus();
    } else if (state.rootRef.value.contains(document.activeElement) === true) {
      document.activeElement.blur();
    }
    if (props2.type === "file") {
      state.inputRef.value.value = null;
    }
    emit3("update:modelValue", null);
    emit3("clear", props2.modelValue);
    nextTick(() => {
      resetValidation();
      if ($q.platform.is.mobile !== true) {
        isDirtyModel.value = false;
      }
    });
  }
  function getContent() {
    const node = [];
    slots.prepend !== void 0 && node.push(
      h("div", {
        class: "q-field__prepend q-field__marginal row no-wrap items-center",
        key: "prepend",
        onClick: prevent
      }, slots.prepend())
    );
    node.push(
      h("div", {
        class: "q-field__control-container col relative-position row no-wrap q-anchor--skip"
      }, getControlContainer())
    );
    hasError.value === true && props2.noErrorIcon === false && node.push(
      getInnerAppendNode("error", [
        h(QIcon, { name: $q.iconSet.field.error, color: "negative" })
      ])
    );
    if (props2.loading === true || state.innerLoading.value === true) {
      node.push(
        getInnerAppendNode(
          "inner-loading-append",
          slots.loading !== void 0 ? slots.loading() : [h(QSpinner, { color: props2.color })]
        )
      );
    } else if (props2.clearable === true && state.hasValue.value === true && state.editable.value === true) {
      node.push(
        getInnerAppendNode("inner-clearable-append", [
          h(QIcon, {
            class: "q-field__focusable-action",
            tag: "button",
            name: props2.clearIcon || $q.iconSet.field.clear,
            tabindex: 0,
            type: "button",
            "aria-hidden": null,
            role: null,
            onClick: clearValue
          })
        ])
      );
    }
    slots.append !== void 0 && node.push(
      h("div", {
        class: "q-field__append q-field__marginal row no-wrap items-center",
        key: "append",
        onClick: prevent
      }, slots.append())
    );
    state.getInnerAppend !== void 0 && node.push(
      getInnerAppendNode("inner-append", state.getInnerAppend())
    );
    state.getControlChild !== void 0 && node.push(
      state.getControlChild()
    );
    return node;
  }
  function getControlContainer() {
    const node = [];
    props2.prefix !== void 0 && props2.prefix !== null && node.push(
      h("div", {
        class: "q-field__prefix no-pointer-events row items-center"
      }, props2.prefix)
    );
    if (state.getShadowControl !== void 0 && state.hasShadow.value === true) {
      node.push(
        state.getShadowControl()
      );
    }
    if (state.getControl !== void 0) {
      node.push(state.getControl());
    } else if (slots.rawControl !== void 0) {
      node.push(slots.rawControl());
    } else if (slots.control !== void 0) {
      node.push(
        h("div", {
          ref: state.targetRef,
          class: "q-field__native row",
          tabindex: -1,
          ...state.splitAttrs.attributes.value,
          "data-autofocus": props2.autofocus === true || void 0
        }, slots.control(controlSlotScope.value))
      );
    }
    hasLabel.value === true && node.push(
      h("div", {
        class: labelClass.value
      }, hSlot(slots.label, props2.label))
    );
    props2.suffix !== void 0 && props2.suffix !== null && node.push(
      h("div", {
        class: "q-field__suffix no-pointer-events row items-center"
      }, props2.suffix)
    );
    return node.concat(hSlot(slots.default));
  }
  function getBottom() {
    let msg, key;
    if (hasError.value === true) {
      if (errorMessage.value !== null) {
        msg = [h("div", { role: "alert" }, errorMessage.value)];
        key = `q--slot-error-${errorMessage.value}`;
      } else {
        msg = hSlot(slots.error);
        key = "q--slot-error";
      }
    } else if (props2.hideHint !== true || state.focused.value === true) {
      if (props2.hint !== void 0) {
        msg = [h("div", props2.hint)];
        key = `q--slot-hint-${props2.hint}`;
      } else {
        msg = hSlot(slots.hint);
        key = "q--slot-hint";
      }
    }
    const hasCounter = props2.counter === true || slots.counter !== void 0;
    if (props2.hideBottomSpace === true && hasCounter === false && msg === void 0) {
      return;
    }
    const main = h("div", {
      key,
      class: "q-field__messages col"
    }, msg);
    return h("div", {
      class: "q-field__bottom row items-start q-field__bottom--" + (props2.hideBottomSpace !== true ? "animated" : "stale"),
      onClick: prevent
    }, [
      props2.hideBottomSpace === true ? main : h(Transition, { name: "q-transition--field-message" }, () => main),
      hasCounter === true ? h("div", {
        class: "q-field__counter"
      }, slots.counter !== void 0 ? slots.counter() : state.computedCounter.value) : null
    ]);
  }
  function getInnerAppendNode(key, content) {
    return content === null ? null : h("div", {
      key,
      class: "q-field__append q-field__marginal row no-wrap items-center q-anchor--skip"
    }, content);
  }
  let shouldActivate = false;
  onDeactivated(() => {
    shouldActivate = true;
  });
  onActivated(() => {
    shouldActivate === true && props2.autofocus === true && proxy.focus();
  });
  onMounted(() => {
    if (isRuntimeSsrPreHydration.value === true && props2.for === void 0) {
      state.targetUid.value = getTargetUid();
    }
    props2.autofocus === true && proxy.focus();
  });
  onBeforeUnmount(() => {
    focusoutTimer !== null && clearTimeout(focusoutTimer);
  });
  Object.assign(proxy, { focus, blur });
  return function renderField() {
    const labelAttrs = state.getControl === void 0 && slots.control === void 0 ? {
      ...state.splitAttrs.attributes.value,
      "data-autofocus": props2.autofocus === true || void 0,
      ...attributes.value
    } : attributes.value;
    return h("label", {
      ref: state.rootRef,
      class: [
        classes.value,
        attrs.class
      ],
      style: attrs.style,
      ...labelAttrs
    }, [
      slots.before !== void 0 ? h("div", {
        class: "q-field__before q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.before()) : null,
      h("div", {
        class: "q-field__inner relative-position col self-stretch"
      }, [
        h("div", {
          ref: state.controlRef,
          class: contentClass.value,
          tabindex: -1,
          ...state.controlEvents
        }, getContent()),
        shouldRenderBottom.value === true ? getBottom() : null
      ]),
      slots.after !== void 0 ? h("div", {
        class: "q-field__after q-field__marginal row no-wrap items-center",
        onClick: prevent
      }, slots.after()) : null
    ]);
  };
}
const NAMED_MASKS = {
  date: "####/##/##",
  datetime: "####/##/## ##:##",
  time: "##:##",
  fulltime: "##:##:##",
  phone: "(###) ### - ####",
  card: "#### #### #### ####"
};
const TOKENS = {
  "#": { pattern: "[\\d]", negate: "[^\\d]" },
  S: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]" },
  N: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]" },
  A: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  a: { pattern: "[a-zA-Z]", negate: "[^a-zA-Z]", transform: (v) => v.toLocaleLowerCase() },
  X: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleUpperCase() },
  x: { pattern: "[0-9a-zA-Z]", negate: "[^0-9a-zA-Z]", transform: (v) => v.toLocaleLowerCase() }
};
const KEYS = Object.keys(TOKENS);
KEYS.forEach((key) => {
  TOKENS[key].regex = new RegExp(TOKENS[key].pattern);
});
const tokenRegexMask = new RegExp("\\\\([^.*+?^${}()|([\\]])|([.*+?^${}()|[\\]])|([" + KEYS.join("") + "])|(.)", "g"), escRegex = /[.*+?^${}()|[\]\\]/g;
const MARKER = String.fromCharCode(1);
const useMaskProps = {
  mask: String,
  reverseFillMask: Boolean,
  fillMask: [Boolean, String],
  unmaskedValue: Boolean
};
function useMask(props2, emit3, emitValue, inputRef) {
  let maskMarked, maskReplaced, computedMask, computedUnmask, pastedTextStart, selectionAnchor;
  const hasMask = ref(null);
  const innerValue = ref(getInitialMaskedValue());
  function getIsTypeText() {
    return props2.autogrow === true || ["textarea", "text", "search", "url", "tel", "password"].includes(props2.type);
  }
  watch(() => props2.type + props2.autogrow, updateMaskInternals);
  watch(() => props2.mask, (v) => {
    if (v !== void 0) {
      updateMaskValue(innerValue.value, true);
    } else {
      const val = unmaskValue(innerValue.value);
      updateMaskInternals();
      props2.modelValue !== val && emit3("update:modelValue", val);
    }
  });
  watch(() => props2.fillMask + props2.reverseFillMask, () => {
    hasMask.value === true && updateMaskValue(innerValue.value, true);
  });
  watch(() => props2.unmaskedValue, () => {
    hasMask.value === true && updateMaskValue(innerValue.value);
  });
  function getInitialMaskedValue() {
    updateMaskInternals();
    if (hasMask.value === true) {
      const masked = maskValue(unmaskValue(props2.modelValue));
      return props2.fillMask !== false ? fillWithMask(masked) : masked;
    }
    return props2.modelValue;
  }
  function getPaddedMaskMarked(size2) {
    if (size2 < maskMarked.length) {
      return maskMarked.slice(-size2);
    }
    let pad = "", localMaskMarked = maskMarked;
    const padPos = localMaskMarked.indexOf(MARKER);
    if (padPos > -1) {
      for (let i = size2 - localMaskMarked.length; i > 0; i--) {
        pad += MARKER;
      }
      localMaskMarked = localMaskMarked.slice(0, padPos) + pad + localMaskMarked.slice(padPos);
    }
    return localMaskMarked;
  }
  function updateMaskInternals() {
    hasMask.value = props2.mask !== void 0 && props2.mask.length !== 0 && getIsTypeText();
    if (hasMask.value === false) {
      computedUnmask = void 0;
      maskMarked = "";
      maskReplaced = "";
      return;
    }
    const localComputedMask = NAMED_MASKS[props2.mask] === void 0 ? props2.mask : NAMED_MASKS[props2.mask], fillChar = typeof props2.fillMask === "string" && props2.fillMask.length !== 0 ? props2.fillMask.slice(0, 1) : "_", fillCharEscaped = fillChar.replace(escRegex, "\\$&"), unmask = [], extract = [], mask = [];
    let firstMatch = props2.reverseFillMask === true, unmaskChar = "", negateChar = "";
    localComputedMask.replace(tokenRegexMask, (_, char1, esc, token, char2) => {
      if (token !== void 0) {
        const c = TOKENS[token];
        mask.push(c);
        negateChar = c.negate;
        if (firstMatch === true) {
          extract.push("(?:" + negateChar + "+)?(" + c.pattern + "+)?(?:" + negateChar + "+)?(" + c.pattern + "+)?");
          firstMatch = false;
        }
        extract.push("(?:" + negateChar + "+)?(" + c.pattern + ")?");
      } else if (esc !== void 0) {
        unmaskChar = "\\" + (esc === "\\" ? "" : esc);
        mask.push(esc);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      } else {
        const c = char1 !== void 0 ? char1 : char2;
        unmaskChar = c === "\\" ? "\\\\\\\\" : c.replace(escRegex, "\\\\$&");
        mask.push(c);
        unmask.push("([^" + unmaskChar + "]+)?" + unmaskChar + "?");
      }
    });
    const unmaskMatcher = new RegExp(
      "^" + unmask.join("") + "(" + (unmaskChar === "" ? "." : "[^" + unmaskChar + "]") + "+)?" + (unmaskChar === "" ? "" : "[" + unmaskChar + "]*") + "$"
    ), extractLast = extract.length - 1, extractMatcher = extract.map((re, index) => {
      if (index === 0 && props2.reverseFillMask === true) {
        return new RegExp("^" + fillCharEscaped + "*" + re);
      } else if (index === extractLast) {
        return new RegExp(
          "^" + re + "(" + (negateChar === "" ? "." : negateChar) + "+)?" + (props2.reverseFillMask === true ? "$" : fillCharEscaped + "*")
        );
      }
      return new RegExp("^" + re);
    });
    computedMask = mask;
    computedUnmask = (val) => {
      const unmaskMatch = unmaskMatcher.exec(props2.reverseFillMask === true ? val : val.slice(0, mask.length + 1));
      if (unmaskMatch !== null) {
        val = unmaskMatch.slice(1).join("");
      }
      const extractMatch = [], extractMatcherLength = extractMatcher.length;
      for (let i = 0, str = val; i < extractMatcherLength; i++) {
        const m = extractMatcher[i].exec(str);
        if (m === null) {
          break;
        }
        str = str.slice(m.shift().length);
        extractMatch.push(...m);
      }
      if (extractMatch.length !== 0) {
        return extractMatch.join("");
      }
      return val;
    };
    maskMarked = mask.map((v) => typeof v === "string" ? v : MARKER).join("");
    maskReplaced = maskMarked.split(MARKER).join(fillChar);
  }
  function updateMaskValue(rawVal, updateMaskInternalsFlag, inputType) {
    const inp = inputRef.value, end = inp.selectionEnd, endReverse = inp.value.length - end, unmasked = unmaskValue(rawVal);
    updateMaskInternalsFlag === true && updateMaskInternals();
    const preMasked = maskValue(unmasked), masked = props2.fillMask !== false ? fillWithMask(preMasked) : preMasked, changed = innerValue.value !== masked;
    inp.value !== masked && (inp.value = masked);
    changed === true && (innerValue.value = masked);
    document.activeElement === inp && nextTick(() => {
      if (masked === maskReplaced) {
        const cursor = props2.reverseFillMask === true ? maskReplaced.length : 0;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (inputType === "insertFromPaste" && props2.reverseFillMask !== true) {
        const maxEnd = inp.selectionEnd;
        let cursor = end - 1;
        for (let i = pastedTextStart; i <= cursor && i < maxEnd; i++) {
          if (maskMarked[i] !== MARKER) {
            cursor++;
          }
        }
        moveCursor.right(inp, cursor);
        return;
      }
      if (["deleteContentBackward", "deleteContentForward"].indexOf(inputType) > -1) {
        const cursor = props2.reverseFillMask === true ? end === 0 ? masked.length > preMasked.length ? 1 : 0 : Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse) + 1)) + 1 : end;
        inp.setSelectionRange(cursor, cursor, "forward");
        return;
      }
      if (props2.reverseFillMask === true) {
        if (changed === true) {
          const cursor = Math.max(0, masked.length - (masked === maskReplaced ? 0 : Math.min(preMasked.length, endReverse + 1)));
          if (cursor === 1 && end === 1) {
            inp.setSelectionRange(cursor, cursor, "forward");
          } else {
            moveCursor.rightReverse(inp, cursor);
          }
        } else {
          const cursor = masked.length - endReverse;
          inp.setSelectionRange(cursor, cursor, "backward");
        }
      } else {
        if (changed === true) {
          const cursor = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, end) - 1);
          moveCursor.right(inp, cursor);
        } else {
          const cursor = end - 1;
          moveCursor.right(inp, cursor);
        }
      }
    });
    const val = props2.unmaskedValue === true ? unmaskValue(masked) : masked;
    String(props2.modelValue) !== val && emitValue(val, true);
  }
  function moveCursorForPaste(inp, start2, end) {
    const preMasked = maskValue(unmaskValue(inp.value));
    start2 = Math.max(0, maskMarked.indexOf(MARKER), Math.min(preMasked.length, start2));
    pastedTextStart = start2;
    inp.setSelectionRange(start2, end, "forward");
  }
  const moveCursor = {
    left(inp, cursor) {
      const noMarkBefore = maskMarked.slice(cursor - 1).indexOf(MARKER) === -1;
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          noMarkBefore === true && cursor++;
          break;
        }
      }
      if (i < 0 && maskMarked[cursor] !== void 0 && maskMarked[cursor] !== MARKER) {
        return moveCursor.right(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    right(inp, cursor) {
      const limit = inp.value.length;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (maskMarked[i] === MARKER) {
          cursor = i;
          break;
        } else if (maskMarked[i - 1] === MARKER) {
          cursor = i;
        }
      }
      if (i > limit && maskMarked[cursor - 1] !== void 0 && maskMarked[cursor - 1] !== MARKER) {
        return moveCursor.left(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    },
    leftReverse(inp, cursor) {
      const localMaskMarked = getPaddedMaskMarked(inp.value.length);
      let i = Math.max(0, cursor - 1);
      for (; i >= 0; i--) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          break;
        } else if (localMaskMarked[i] === MARKER) {
          cursor = i;
          if (i === 0) {
            break;
          }
        }
      }
      if (i < 0 && localMaskMarked[cursor] !== void 0 && localMaskMarked[cursor] !== MARKER) {
        return moveCursor.rightReverse(inp, 0);
      }
      cursor >= 0 && inp.setSelectionRange(cursor, cursor, "backward");
    },
    rightReverse(inp, cursor) {
      const limit = inp.value.length, localMaskMarked = getPaddedMaskMarked(limit), noMarkBefore = localMaskMarked.slice(0, cursor + 1).indexOf(MARKER) === -1;
      let i = Math.min(limit, cursor + 1);
      for (; i <= limit; i++) {
        if (localMaskMarked[i - 1] === MARKER) {
          cursor = i;
          cursor > 0 && noMarkBefore === true && cursor--;
          break;
        }
      }
      if (i > limit && localMaskMarked[cursor - 1] !== void 0 && localMaskMarked[cursor - 1] !== MARKER) {
        return moveCursor.leftReverse(inp, limit);
      }
      inp.setSelectionRange(cursor, cursor, "forward");
    }
  };
  function onMaskedClick(e) {
    emit3("click", e);
    selectionAnchor = void 0;
  }
  function onMaskedKeydown(e) {
    emit3("keydown", e);
    if (shouldIgnoreKey(e) === true) {
      return;
    }
    const inp = inputRef.value, start2 = inp.selectionStart, end = inp.selectionEnd;
    if (!e.shiftKey) {
      selectionAnchor = void 0;
    }
    if (e.keyCode === 37 || e.keyCode === 39) {
      if (e.shiftKey && selectionAnchor === void 0) {
        selectionAnchor = inp.selectionDirection === "forward" ? start2 : end;
      }
      const fn = moveCursor[(e.keyCode === 39 ? "right" : "left") + (props2.reverseFillMask === true ? "Reverse" : "")];
      e.preventDefault();
      fn(inp, selectionAnchor === start2 ? end : start2);
      if (e.shiftKey) {
        const cursor = inp.selectionStart;
        inp.setSelectionRange(Math.min(selectionAnchor, cursor), Math.max(selectionAnchor, cursor), "forward");
      }
    } else if (e.keyCode === 8 && props2.reverseFillMask !== true && start2 === end) {
      moveCursor.left(inp, start2);
      inp.setSelectionRange(inp.selectionStart, end, "backward");
    } else if (e.keyCode === 46 && props2.reverseFillMask === true && start2 === end) {
      moveCursor.rightReverse(inp, end);
      inp.setSelectionRange(start2, inp.selectionEnd, "forward");
    }
  }
  function maskValue(val) {
    if (val === void 0 || val === null || val === "") {
      return "";
    }
    if (props2.reverseFillMask === true) {
      return maskValueReverse(val);
    }
    const mask = computedMask;
    let valIndex = 0, output = "";
    for (let maskIndex = 0; maskIndex < mask.length; maskIndex++) {
      const valChar = val[valIndex], maskDef = mask[maskIndex];
      if (typeof maskDef === "string") {
        output += maskDef;
        valChar === maskDef && valIndex++;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        output += maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar;
        valIndex++;
      } else {
        return output;
      }
    }
    return output;
  }
  function maskValueReverse(val) {
    const mask = computedMask, firstTokenIndex = maskMarked.indexOf(MARKER);
    let valIndex = val.length - 1, output = "";
    for (let maskIndex = mask.length - 1; maskIndex >= 0 && valIndex > -1; maskIndex--) {
      const maskDef = mask[maskIndex];
      let valChar = val[valIndex];
      if (typeof maskDef === "string") {
        output = maskDef + output;
        valChar === maskDef && valIndex--;
      } else if (valChar !== void 0 && maskDef.regex.test(valChar)) {
        do {
          output = (maskDef.transform !== void 0 ? maskDef.transform(valChar) : valChar) + output;
          valIndex--;
          valChar = val[valIndex];
        } while (firstTokenIndex === maskIndex && valChar !== void 0 && maskDef.regex.test(valChar));
      } else {
        return output;
      }
    }
    return output;
  }
  function unmaskValue(val) {
    return typeof val !== "string" || computedUnmask === void 0 ? typeof val === "number" ? computedUnmask("" + val) : val : computedUnmask(val);
  }
  function fillWithMask(val) {
    if (maskReplaced.length - val.length <= 0) {
      return val;
    }
    return props2.reverseFillMask === true && val.length !== 0 ? maskReplaced.slice(0, -val.length) + val : val + maskReplaced.slice(val.length);
  }
  return {
    innerValue,
    hasMask,
    moveCursorForPaste,
    updateMaskValue,
    onMaskedKeydown,
    onMaskedClick
  };
}
const useFormProps = {
  name: String
};
function useFormInject(formAttrs = {}) {
  return (child, action, className) => {
    child[action](
      h("input", {
        class: "hidden" + (className || ""),
        ...formAttrs.value
      })
    );
  };
}
function useFormInputNameAttr(props2) {
  return computed(() => props2.name || props2.for);
}
function useFileFormDomProps(props2, typeGuard) {
  function getFormDomProps() {
    const model = props2.modelValue;
    try {
      const dt = "DataTransfer" in window ? new DataTransfer() : "ClipboardEvent" in window ? new ClipboardEvent("").clipboardData : void 0;
      if (Object(model) === model) {
        ("length" in model ? Array.from(model) : [model]).forEach((file) => {
          dt.items.add(file);
        });
      }
      return {
        files: dt.files
      };
    } catch (e) {
      return {
        files: void 0
      };
    }
  }
  return typeGuard === true ? computed(() => {
    if (props2.type !== "file") {
      return;
    }
    return getFormDomProps();
  }) : computed(getFormDomProps);
}
const isJapanese = /[\u3000-\u303f\u3040-\u309f\u30a0-\u30ff\uff00-\uff9f\u4e00-\u9faf\u3400-\u4dbf]/;
const isChinese = /[\u4e00-\u9fff\u3400-\u4dbf\u{20000}-\u{2a6df}\u{2a700}-\u{2b73f}\u{2b740}-\u{2b81f}\u{2b820}-\u{2ceaf}\uf900-\ufaff\u3300-\u33ff\ufe30-\ufe4f\uf900-\ufaff\u{2f800}-\u{2fa1f}]/u;
const isKorean = /[\u3131-\u314e\u314f-\u3163\uac00-\ud7a3]/;
const isPlainText = /[a-z0-9_ -]$/i;
function useKeyComposition(onInput) {
  return function onComposition(e) {
    if (e.type === "compositionend" || e.type === "change") {
      if (e.target.qComposing !== true) {
        return;
      }
      e.target.qComposing = false;
      onInput(e);
    } else if (e.type === "compositionupdate" && e.target.qComposing !== true && typeof e.data === "string") {
      const isComposing = client.is.firefox === true ? isPlainText.test(e.data) === false : isJapanese.test(e.data) === true || isChinese.test(e.data) === true || isKorean.test(e.data) === true;
      if (isComposing === true) {
        e.target.qComposing = true;
      }
    }
  };
}
var QInput = createComponent({
  name: "QInput",
  inheritAttrs: false,
  props: {
    ...useFieldProps,
    ...useMaskProps,
    ...useFormProps,
    modelValue: { required: false },
    shadowText: String,
    type: {
      type: String,
      default: "text"
    },
    debounce: [String, Number],
    autogrow: Boolean,
    inputClass: [Array, String, Object],
    inputStyle: [Array, String, Object]
  },
  emits: [
    ...useFieldEmits,
    "paste",
    "change",
    "keydown",
    "click",
    "animationend"
  ],
  setup(props2, { emit: emit3, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const temp = {};
    let emitCachedValue = NaN, typedNumber, stopValueWatcher, emitTimer = null, emitValueFn;
    const inputRef = ref(null);
    const nameProp = useFormInputNameAttr(props2);
    const {
      innerValue,
      hasMask,
      moveCursorForPaste,
      updateMaskValue,
      onMaskedKeydown,
      onMaskedClick
    } = useMask(props2, emit3, emitValue, inputRef);
    const formDomProps = useFileFormDomProps(props2, true);
    const hasValue = computed(() => fieldValueIsFilled(innerValue.value));
    const onComposition = useKeyComposition(onInput);
    const state = useFieldState();
    const isTextarea = computed(
      () => props2.type === "textarea" || props2.autogrow === true
    );
    const isTypeText = computed(
      () => isTextarea.value === true || ["text", "search", "url", "tel", "password"].includes(props2.type)
    );
    const onEvents = computed(() => {
      const evt = {
        ...state.splitAttrs.listeners.value,
        onInput,
        onPaste,
        onChange,
        onBlur: onFinishEditing,
        onFocus: stop
      };
      evt.onCompositionstart = evt.onCompositionupdate = evt.onCompositionend = onComposition;
      if (hasMask.value === true) {
        evt.onKeydown = onMaskedKeydown;
        evt.onClick = onMaskedClick;
      }
      if (props2.autogrow === true) {
        evt.onAnimationend = onAnimationend;
      }
      return evt;
    });
    const inputAttrs = computed(() => {
      const attrs2 = {
        tabindex: 0,
        "data-autofocus": props2.autofocus === true || void 0,
        rows: props2.type === "textarea" ? 6 : void 0,
        "aria-label": props2.label,
        name: nameProp.value,
        ...state.splitAttrs.attributes.value,
        id: state.targetUid.value,
        maxlength: props2.maxlength,
        disabled: props2.disable === true,
        readonly: props2.readonly === true
      };
      if (isTextarea.value === false) {
        attrs2.type = props2.type;
      }
      if (props2.autogrow === true) {
        attrs2.rows = 1;
      }
      return attrs2;
    });
    watch(() => props2.type, () => {
      if (inputRef.value) {
        inputRef.value.value = props2.modelValue;
      }
    });
    watch(() => props2.modelValue, (v) => {
      if (hasMask.value === true) {
        if (stopValueWatcher === true) {
          stopValueWatcher = false;
          if (String(v) === emitCachedValue) {
            return;
          }
        }
        updateMaskValue(v);
      } else if (innerValue.value !== v) {
        innerValue.value = v;
        if (props2.type === "number" && temp.hasOwnProperty("value") === true) {
          if (typedNumber === true) {
            typedNumber = false;
          } else {
            delete temp.value;
          }
        }
      }
      props2.autogrow === true && nextTick(adjustHeight);
    });
    watch(() => props2.autogrow, (val) => {
      if (val === true) {
        nextTick(adjustHeight);
      } else if (inputRef.value !== null && attrs.rows > 0) {
        inputRef.value.style.height = "auto";
      }
    });
    watch(() => props2.dense, () => {
      props2.autogrow === true && nextTick(adjustHeight);
    });
    function focus() {
      addFocusFn(() => {
        const el = document.activeElement;
        if (inputRef.value !== null && inputRef.value !== el && (el === null || el.id !== state.targetUid.value)) {
          inputRef.value.focus({ preventScroll: true });
        }
      });
    }
    function select() {
      inputRef.value !== null && inputRef.value.select();
    }
    function onPaste(e) {
      if (hasMask.value === true && props2.reverseFillMask !== true) {
        const inp = e.target;
        moveCursorForPaste(inp, inp.selectionStart, inp.selectionEnd);
      }
      emit3("paste", e);
    }
    function onInput(e) {
      if (!e || !e.target) {
        return;
      }
      if (props2.type === "file") {
        emit3("update:modelValue", e.target.files);
        return;
      }
      const val = e.target.value;
      if (e.target.qComposing === true) {
        temp.value = val;
        return;
      }
      if (hasMask.value === true) {
        updateMaskValue(val, false, e.inputType);
      } else {
        emitValue(val);
        if (isTypeText.value === true && e.target === document.activeElement) {
          const { selectionStart, selectionEnd } = e.target;
          if (selectionStart !== void 0 && selectionEnd !== void 0) {
            nextTick(() => {
              if (e.target === document.activeElement && val.indexOf(e.target.value) === 0) {
                e.target.setSelectionRange(selectionStart, selectionEnd);
              }
            });
          }
        }
      }
      props2.autogrow === true && adjustHeight();
    }
    function onAnimationend(e) {
      emit3("animationend", e);
      adjustHeight();
    }
    function emitValue(val, stopWatcher) {
      emitValueFn = () => {
        emitTimer = null;
        if (props2.type !== "number" && temp.hasOwnProperty("value") === true) {
          delete temp.value;
        }
        if (props2.modelValue !== val && emitCachedValue !== val) {
          emitCachedValue = val;
          stopWatcher === true && (stopValueWatcher = true);
          emit3("update:modelValue", val);
          nextTick(() => {
            emitCachedValue === val && (emitCachedValue = NaN);
          });
        }
        emitValueFn = void 0;
      };
      if (props2.type === "number") {
        typedNumber = true;
        temp.value = val;
      }
      if (props2.debounce !== void 0) {
        emitTimer !== null && clearTimeout(emitTimer);
        temp.value = val;
        emitTimer = setTimeout(emitValueFn, props2.debounce);
      } else {
        emitValueFn();
      }
    }
    function adjustHeight() {
      requestAnimationFrame(() => {
        const inp = inputRef.value;
        if (inp !== null) {
          const parentStyle = inp.parentNode.style;
          const { scrollTop } = inp;
          const { overflowY, maxHeight } = $q.platform.is.firefox === true ? {} : window.getComputedStyle(inp);
          const changeOverflow = overflowY !== void 0 && overflowY !== "scroll";
          changeOverflow === true && (inp.style.overflowY = "hidden");
          parentStyle.marginBottom = inp.scrollHeight - 1 + "px";
          inp.style.height = "1px";
          inp.style.height = inp.scrollHeight + "px";
          changeOverflow === true && (inp.style.overflowY = parseInt(maxHeight, 10) < inp.scrollHeight ? "auto" : "hidden");
          parentStyle.marginBottom = "";
          inp.scrollTop = scrollTop;
        }
      });
    }
    function onChange(e) {
      onComposition(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      emit3("change", e.target.value);
    }
    function onFinishEditing(e) {
      e !== void 0 && stop(e);
      if (emitTimer !== null) {
        clearTimeout(emitTimer);
        emitTimer = null;
      }
      emitValueFn !== void 0 && emitValueFn();
      typedNumber = false;
      stopValueWatcher = false;
      delete temp.value;
      props2.type !== "file" && setTimeout(() => {
        if (inputRef.value !== null) {
          inputRef.value.value = innerValue.value !== void 0 ? innerValue.value : "";
        }
      });
    }
    function getCurValue() {
      return temp.hasOwnProperty("value") === true ? temp.value : innerValue.value !== void 0 ? innerValue.value : "";
    }
    onBeforeUnmount(() => {
      onFinishEditing();
    });
    onMounted(() => {
      props2.autogrow === true && adjustHeight();
    });
    Object.assign(state, {
      innerValue,
      fieldClass: computed(
        () => `q-${isTextarea.value === true ? "textarea" : "input"}` + (props2.autogrow === true ? " q-textarea--autogrow" : "")
      ),
      hasShadow: computed(
        () => props2.type !== "file" && typeof props2.shadowText === "string" && props2.shadowText.length !== 0
      ),
      inputRef,
      emitValue,
      hasValue,
      floatingLabel: computed(
        () => hasValue.value === true && (props2.type !== "number" || isNaN(innerValue.value) === false) || fieldValueIsFilled(props2.displayValue)
      ),
      getControl: () => {
        return h(isTextarea.value === true ? "textarea" : "input", {
          ref: inputRef,
          class: [
            "q-field__native q-placeholder",
            props2.inputClass
          ],
          style: props2.inputStyle,
          ...inputAttrs.value,
          ...onEvents.value,
          ...props2.type !== "file" ? { value: getCurValue() } : formDomProps.value
        });
      },
      getShadowControl: () => {
        return h("div", {
          class: "q-field__native q-field__shadow absolute-bottom no-pointer-events" + (isTextarea.value === true ? "" : " text-no-wrap")
        }, [
          h("span", { class: "invisible" }, getCurValue()),
          h("span", props2.shadowText)
        ]);
      }
    });
    const renderFn = useField(state);
    Object.assign(proxy, {
      focus,
      select,
      getNativeElement: () => inputRef.value
    });
    injectProp(proxy, "nativeEl", () => inputRef.value);
    return renderFn;
  }
});
function useRefocusTarget(props2, rootRef) {
  const refocusRef = ref(null);
  const refocusTargetEl = computed(() => {
    if (props2.disable === true) {
      return null;
    }
    return h("span", {
      ref: refocusRef,
      class: "no-outline",
      tabindex: -1
    });
  });
  function refocusTarget(e) {
    const root = rootRef.value;
    if (e !== void 0 && e.type.indexOf("key") === 0) {
      if (root !== null && document.activeElement !== root && root.contains(document.activeElement) === true) {
        root.focus();
      }
    } else if (refocusRef.value !== null && (e === void 0 || root !== null && root.contains(e.target) === true)) {
      refocusRef.value.focus();
    }
  }
  return {
    refocusTargetEl,
    refocusTarget
  };
}
var optionSizes = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 60
};
const svg = h("svg", {
  key: "svg",
  class: "q-radio__bg absolute non-selectable",
  viewBox: "0 0 24 24"
}, [
  h("path", {
    d: "M12,22a10,10 0 0 1 -10,-10a10,10 0 0 1 10,-10a10,10 0 0 1 10,10a10,10 0 0 1 -10,10m0,-22a12,12 0 0 0 -12,12a12,12 0 0 0 12,12a12,12 0 0 0 12,-12a12,12 0 0 0 -12,-12"
  }),
  h("path", {
    class: "q-radio__check",
    d: "M12,6a6,6 0 0 0 -6,6a6,6 0 0 0 6,6a6,6 0 0 0 6,-6a6,6 0 0 0 -6,-6"
  })
]);
var QRadio = createComponent({
  name: "QRadio",
  props: {
    ...useDarkProps,
    ...useSizeProps,
    ...useFormProps,
    modelValue: { required: true },
    val: { required: true },
    label: String,
    leftLabel: Boolean,
    checkedIcon: String,
    uncheckedIcon: String,
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    disable: Boolean,
    tabindex: [String, Number]
  },
  emits: ["update:modelValue"],
  setup(props2, { slots, emit: emit3 }) {
    const { proxy } = getCurrentInstance();
    const isDark = useDark(props2, proxy.$q);
    const sizeStyle = useSize(props2, optionSizes);
    const rootRef = ref(null);
    const { refocusTargetEl, refocusTarget } = useRefocusTarget(props2, rootRef);
    const isTrue = computed(() => toRaw(props2.modelValue) === toRaw(props2.val));
    const classes = computed(
      () => "q-radio cursor-pointer no-outline row inline no-wrap items-center" + (props2.disable === true ? " disabled" : "") + (isDark.value === true ? " q-radio--dark" : "") + (props2.dense === true ? " q-radio--dense" : "") + (props2.leftLabel === true ? " reverse" : "")
    );
    const innerClass = computed(() => {
      const color = props2.color !== void 0 && (props2.keepColor === true || isTrue.value === true) ? ` text-${props2.color}` : "";
      return `q-radio__inner relative-position q-radio__inner--${isTrue.value === true ? "truthy" : "falsy"}${color}`;
    });
    const icon = computed(
      () => (isTrue.value === true ? props2.checkedIcon : props2.uncheckedIcon) || null
    );
    const tabindex = computed(() => props2.disable === true ? -1 : props2.tabindex || 0);
    const formAttrs = computed(() => {
      const prop = { type: "radio" };
      props2.name !== void 0 && Object.assign(prop, {
        ".checked": isTrue.value === true,
        "^checked": isTrue.value === true ? "checked" : void 0,
        name: props2.name,
        value: props2.val
      });
      return prop;
    });
    const injectFormInput = useFormInject(formAttrs);
    function onClick(e) {
      if (e !== void 0) {
        stopAndPrevent(e);
        refocusTarget(e);
      }
      if (props2.disable !== true && isTrue.value !== true) {
        emit3("update:modelValue", props2.val, e);
      }
    }
    function onKeydown2(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        stopAndPrevent(e);
      }
    }
    function onKeyup2(e) {
      if (e.keyCode === 13 || e.keyCode === 32) {
        onClick(e);
      }
    }
    Object.assign(proxy, { set: onClick });
    return () => {
      const content = icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-radio__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-radio__icon",
            name: icon.value
          })
        ])
      ] : [svg];
      props2.disable !== true && injectFormInput(
        content,
        "unshift",
        " q-radio__native q-ma-none q-pa-none"
      );
      const child = [
        h("div", {
          class: innerClass.value,
          style: sizeStyle.value,
          "aria-hidden": "true"
        }, content)
      ];
      if (refocusTargetEl.value !== null) {
        child.push(refocusTargetEl.value);
      }
      const label = props2.label !== void 0 ? hMergeSlot(slots.default, [props2.label]) : hSlot(slots.default);
      label !== void 0 && child.push(
        h("div", {
          class: "q-radio__label q-anchor--skip"
        }, label)
      );
      return h("div", {
        ref: rootRef,
        class: classes.value,
        tabindex: tabindex.value,
        role: "radio",
        "aria-label": props2.label,
        "aria-checked": isTrue.value === true ? "true" : "false",
        "aria-disabled": props2.disable === true ? "true" : void 0,
        onClick,
        onKeydown: onKeydown2,
        onKeyup: onKeyup2
      }, child);
    };
  }
});
const useCheckboxProps = {
  ...useDarkProps,
  ...useSizeProps,
  ...useFormProps,
  modelValue: {
    required: true,
    default: null
  },
  val: {},
  trueValue: { default: true },
  falseValue: { default: false },
  indeterminateValue: { default: null },
  checkedIcon: String,
  uncheckedIcon: String,
  indeterminateIcon: String,
  toggleOrder: {
    type: String,
    validator: (v) => v === "tf" || v === "ft"
  },
  toggleIndeterminate: Boolean,
  label: String,
  leftLabel: Boolean,
  color: String,
  keepColor: Boolean,
  dense: Boolean,
  disable: Boolean,
  tabindex: [String, Number]
};
const useCheckboxEmits = ["update:modelValue"];
function useCheckbox(type, getInner) {
  const { props: props2, slots, emit: emit3, proxy } = getCurrentInstance();
  const { $q } = proxy;
  const isDark = useDark(props2, $q);
  const rootRef = ref(null);
  const { refocusTargetEl, refocusTarget } = useRefocusTarget(props2, rootRef);
  const sizeStyle = useSize(props2, optionSizes);
  const modelIsArray = computed(
    () => props2.val !== void 0 && Array.isArray(props2.modelValue)
  );
  const index = computed(() => {
    const val = toRaw(props2.val);
    return modelIsArray.value === true ? props2.modelValue.findIndex((opt) => toRaw(opt) === val) : -1;
  });
  const isTrue = computed(() => modelIsArray.value === true ? index.value > -1 : toRaw(props2.modelValue) === toRaw(props2.trueValue));
  const isFalse = computed(() => modelIsArray.value === true ? index.value === -1 : toRaw(props2.modelValue) === toRaw(props2.falseValue));
  const isIndeterminate = computed(
    () => isTrue.value === false && isFalse.value === false
  );
  const tabindex = computed(() => props2.disable === true ? -1 : props2.tabindex || 0);
  const classes = computed(
    () => `q-${type} cursor-pointer no-outline row inline no-wrap items-center` + (props2.disable === true ? " disabled" : "") + (isDark.value === true ? ` q-${type}--dark` : "") + (props2.dense === true ? ` q-${type}--dense` : "") + (props2.leftLabel === true ? " reverse" : "")
  );
  const innerClass = computed(() => {
    const state = isTrue.value === true ? "truthy" : isFalse.value === true ? "falsy" : "indet";
    const color = props2.color !== void 0 && (props2.keepColor === true || (type === "toggle" ? isTrue.value === true : isFalse.value !== true)) ? ` text-${props2.color}` : "";
    return `q-${type}__inner relative-position non-selectable q-${type}__inner--${state}${color}`;
  });
  const formAttrs = computed(() => {
    const prop = { type: "checkbox" };
    props2.name !== void 0 && Object.assign(prop, {
      ".checked": isTrue.value,
      "^checked": isTrue.value === true ? "checked" : void 0,
      name: props2.name,
      value: modelIsArray.value === true ? props2.val : props2.trueValue
    });
    return prop;
  });
  const injectFormInput = useFormInject(formAttrs);
  const attributes = computed(() => {
    const attrs = {
      tabindex: tabindex.value,
      role: type === "toggle" ? "switch" : "checkbox",
      "aria-label": props2.label,
      "aria-checked": isIndeterminate.value === true ? "mixed" : isTrue.value === true ? "true" : "false"
    };
    if (props2.disable === true) {
      attrs["aria-disabled"] = "true";
    }
    return attrs;
  });
  function onClick(e) {
    if (e !== void 0) {
      stopAndPrevent(e);
      refocusTarget(e);
    }
    if (props2.disable !== true) {
      emit3("update:modelValue", getNextValue(), e);
    }
  }
  function getNextValue() {
    if (modelIsArray.value === true) {
      if (isTrue.value === true) {
        const val = props2.modelValue.slice();
        val.splice(index.value, 1);
        return val;
      }
      return props2.modelValue.concat([props2.val]);
    }
    if (isTrue.value === true) {
      if (props2.toggleOrder !== "ft" || props2.toggleIndeterminate === false) {
        return props2.falseValue;
      }
    } else if (isFalse.value === true) {
      if (props2.toggleOrder === "ft" || props2.toggleIndeterminate === false) {
        return props2.trueValue;
      }
    } else {
      return props2.toggleOrder !== "ft" ? props2.trueValue : props2.falseValue;
    }
    return props2.indeterminateValue;
  }
  function onKeydown2(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      stopAndPrevent(e);
    }
  }
  function onKeyup2(e) {
    if (e.keyCode === 13 || e.keyCode === 32) {
      onClick(e);
    }
  }
  const getInnerContent = getInner(isTrue, isIndeterminate);
  Object.assign(proxy, { toggle: onClick });
  return () => {
    const inner = getInnerContent();
    props2.disable !== true && injectFormInput(
      inner,
      "unshift",
      ` q-${type}__native absolute q-ma-none q-pa-none`
    );
    const child = [
      h("div", {
        class: innerClass.value,
        style: sizeStyle.value,
        "aria-hidden": "true"
      }, inner)
    ];
    if (refocusTargetEl.value !== null) {
      child.push(refocusTargetEl.value);
    }
    const label = props2.label !== void 0 ? hMergeSlot(slots.default, [props2.label]) : hSlot(slots.default);
    label !== void 0 && child.push(
      h("div", {
        class: `q-${type}__label q-anchor--skip`
      }, label)
    );
    return h("div", {
      ref: rootRef,
      class: classes.value,
      ...attributes.value,
      onClick,
      onKeydown: onKeydown2,
      onKeyup: onKeyup2
    }, child);
  };
}
const bgNode = h("div", {
  key: "svg",
  class: "q-checkbox__bg absolute"
}, [
  h("svg", {
    class: "q-checkbox__svg fit absolute-full",
    viewBox: "0 0 24 24"
  }, [
    h("path", {
      class: "q-checkbox__truthy",
      fill: "none",
      d: "M1.73,12.91 8.1,19.28 22.79,4.59"
    }),
    h("path", {
      class: "q-checkbox__indet",
      d: "M4,14H20V10H4"
    })
  ])
]);
var QCheckbox = createComponent({
  name: "QCheckbox",
  props: useCheckboxProps,
  emits: useCheckboxEmits,
  setup(props2) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props2.checkedIcon : isIndeterminate.value === true ? props2.indeterminateIcon : props2.uncheckedIcon) || null
      );
      return () => icon.value !== null ? [
        h("div", {
          key: "icon",
          class: "q-checkbox__icon-container absolute-full flex flex-center no-wrap"
        }, [
          h(QIcon, {
            class: "q-checkbox__icon",
            name: icon.value
          })
        ])
      ] : [bgNode];
    }
    return useCheckbox("checkbox", getInner);
  }
});
var QToggle = createComponent({
  name: "QToggle",
  props: {
    ...useCheckboxProps,
    icon: String,
    iconColor: String
  },
  emits: useCheckboxEmits,
  setup(props2) {
    function getInner(isTrue, isIndeterminate) {
      const icon = computed(
        () => (isTrue.value === true ? props2.checkedIcon : isIndeterminate.value === true ? props2.indeterminateIcon : props2.uncheckedIcon) || props2.icon
      );
      const color = computed(() => isTrue.value === true ? props2.iconColor : null);
      return () => [
        h("div", { class: "q-toggle__track" }),
        h(
          "div",
          {
            class: "q-toggle__thumb absolute flex flex-center no-wrap"
          },
          icon.value !== void 0 ? [
            h(QIcon, {
              name: icon.value,
              color: color.value
            })
          ] : void 0
        )
      ];
    }
    return useCheckbox("toggle", getInner);
  }
});
const components = {
  radio: QRadio,
  checkbox: QCheckbox,
  toggle: QToggle
};
const typeValues = Object.keys(components);
var QOptionGroup = createComponent({
  name: "QOptionGroup",
  props: {
    ...useDarkProps,
    modelValue: {
      required: true
    },
    options: {
      type: Array,
      validator: (opts) => opts.every((opt) => "value" in opt && "label" in opt)
    },
    name: String,
    type: {
      default: "radio",
      validator: (v) => typeValues.includes(v)
    },
    color: String,
    keepColor: Boolean,
    dense: Boolean,
    size: String,
    leftLabel: Boolean,
    inline: Boolean,
    disable: Boolean
  },
  emits: ["update:modelValue"],
  setup(props2, { emit: emit3, slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const arrayModel = Array.isArray(props2.modelValue);
    if (props2.type === "radio") {
      if (arrayModel === true) {
        console.error("q-option-group: model should not be array");
      }
    } else if (arrayModel === false) {
      console.error("q-option-group: model should be array in your case");
    }
    const isDark = useDark(props2, $q);
    const component = computed(() => components[props2.type]);
    const classes = computed(
      () => "q-option-group q-gutter-x-sm" + (props2.inline === true ? " q-option-group--inline" : "")
    );
    const attrs = computed(() => {
      const attrs2 = { role: "group" };
      if (props2.type === "radio") {
        attrs2.role = "radiogroup";
        if (props2.disable === true) {
          attrs2["aria-disabled"] = "true";
        }
      }
      return attrs2;
    });
    function onUpdateModelValue(value) {
      emit3("update:modelValue", value);
    }
    return () => h("div", {
      class: classes.value,
      ...attrs.value
    }, props2.options.map((opt, i) => {
      const child = slots["label-" + i] !== void 0 ? () => slots["label-" + i](opt) : slots.label !== void 0 ? () => slots.label(opt) : void 0;
      return h("div", [
        h(component.value, {
          modelValue: props2.modelValue,
          val: opt.value,
          name: opt.name === void 0 ? props2.name : opt.name,
          disable: props2.disable || opt.disable,
          label: child === void 0 ? opt.label : null,
          leftLabel: opt.leftLabel === void 0 ? props2.leftLabel : opt.leftLabel,
          color: opt.color === void 0 ? props2.color : opt.color,
          checkedIcon: opt.checkedIcon,
          uncheckedIcon: opt.uncheckedIcon,
          dark: opt.dark || isDark.value,
          size: opt.size === void 0 ? props2.size : opt.size,
          dense: props2.dense,
          keepColor: opt.keepColor === void 0 ? props2.keepColor : opt.keepColor,
          "onUpdate:modelValue": onUpdateModelValue
        }, child)
      ]);
    }));
  }
});
var DialogPlugin = createComponent({
  name: "DialogPlugin",
  props: {
    ...useDarkProps,
    title: String,
    message: String,
    prompt: Object,
    options: Object,
    progress: [Boolean, Object],
    html: Boolean,
    ok: {
      type: [String, Object, Boolean],
      default: true
    },
    cancel: [String, Object, Boolean],
    focus: {
      type: String,
      default: "ok",
      validator: (v) => ["ok", "cancel", "none"].includes(v)
    },
    stackButtons: Boolean,
    color: String,
    cardClass: [String, Array, Object],
    cardStyle: [String, Array, Object]
  },
  emits: ["ok", "hide"],
  setup(props2, { emit: emit3 }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const isDark = useDark(props2, $q);
    const dialogRef = ref(null);
    const model = ref(
      props2.prompt !== void 0 ? props2.prompt.model : props2.options !== void 0 ? props2.options.model : void 0
    );
    const classes = computed(
      () => "q-dialog-plugin" + (isDark.value === true ? " q-dialog-plugin--dark q-dark" : "") + (props2.progress !== false ? " q-dialog-plugin--progress" : "")
    );
    const vmColor = computed(
      () => props2.color || (isDark.value === true ? "amber" : "primary")
    );
    const spinner = computed(() => props2.progress === false ? null : isObject(props2.progress) === true ? {
      component: props2.progress.spinner || QSpinner,
      props: { color: props2.progress.color || vmColor.value }
    } : {
      component: QSpinner,
      props: { color: vmColor.value }
    });
    const hasForm = computed(
      () => props2.prompt !== void 0 || props2.options !== void 0
    );
    const formProps = computed(() => {
      if (hasForm.value !== true) {
        return {};
      }
      const { model: model2, isValid, items, ...formProps2 } = props2.prompt !== void 0 ? props2.prompt : props2.options;
      return formProps2;
    });
    const okLabel = computed(() => isObject(props2.ok) === true ? $q.lang.label.ok : props2.ok === true ? $q.lang.label.ok : props2.ok);
    const cancelLabel = computed(() => isObject(props2.cancel) === true ? $q.lang.label.cancel : props2.cancel === true ? $q.lang.label.cancel : props2.cancel);
    const okDisabled = computed(() => {
      if (props2.prompt !== void 0) {
        return props2.prompt.isValid !== void 0 && props2.prompt.isValid(model.value) !== true;
      }
      if (props2.options !== void 0) {
        return props2.options.isValid !== void 0 && props2.options.isValid(model.value) !== true;
      }
      return false;
    });
    const okProps = computed(() => ({
      color: vmColor.value,
      label: okLabel.value,
      ripple: false,
      disable: okDisabled.value,
      ...isObject(props2.ok) === true ? props2.ok : { flat: true },
      "data-autofocus": props2.focus === "ok" && hasForm.value !== true || void 0,
      onClick: onOk
    }));
    const cancelProps = computed(() => ({
      color: vmColor.value,
      label: cancelLabel.value,
      ripple: false,
      ...isObject(props2.cancel) === true ? props2.cancel : { flat: true },
      "data-autofocus": props2.focus === "cancel" && hasForm.value !== true || void 0,
      onClick: onCancel
    }));
    watch(() => props2.prompt && props2.prompt.model, onUpdateModel);
    watch(() => props2.options && props2.options.model, onUpdateModel);
    function show() {
      dialogRef.value.show();
    }
    function hide() {
      dialogRef.value.hide();
    }
    function onOk() {
      emit3("ok", toRaw(model.value));
      hide();
    }
    function onCancel() {
      hide();
    }
    function onDialogHide() {
      emit3("hide");
    }
    function onUpdateModel(val) {
      model.value = val;
    }
    function onInputKeyup(evt) {
      if (okDisabled.value !== true && props2.prompt.type !== "textarea" && isKeyCode(evt, 13) === true) {
        onOk();
      }
    }
    function getSection(classes2, text) {
      return props2.html === true ? h(QCardSection, {
        class: classes2,
        innerHTML: text
      }) : h(QCardSection, { class: classes2 }, () => text);
    }
    function getPrompt() {
      return [
        h(QInput, {
          color: vmColor.value,
          dense: true,
          autofocus: true,
          dark: isDark.value,
          ...formProps.value,
          modelValue: model.value,
          "onUpdate:modelValue": onUpdateModel,
          onKeyup: onInputKeyup
        })
      ];
    }
    function getOptions() {
      return [
        h(QOptionGroup, {
          color: vmColor.value,
          options: props2.options.items,
          dark: isDark.value,
          ...formProps.value,
          modelValue: model.value,
          "onUpdate:modelValue": onUpdateModel
        })
      ];
    }
    function getButtons() {
      const child = [];
      props2.cancel && child.push(
        h(QBtn, cancelProps.value)
      );
      props2.ok && child.push(
        h(QBtn, okProps.value)
      );
      return h(QCardActions, {
        class: props2.stackButtons === true ? "items-end" : "",
        vertical: props2.stackButtons,
        align: "right"
      }, () => child);
    }
    function getCardContent() {
      const child = [];
      props2.title && child.push(
        getSection("q-dialog__title", props2.title)
      );
      props2.progress !== false && child.push(
        h(
          QCardSection,
          { class: "q-dialog__progress" },
          () => h(spinner.value.component, spinner.value.props)
        )
      );
      props2.message && child.push(
        getSection("q-dialog__message", props2.message)
      );
      if (props2.prompt !== void 0) {
        child.push(
          h(
            QCardSection,
            { class: "scroll q-dialog-plugin__form" },
            getPrompt
          )
        );
      } else if (props2.options !== void 0) {
        child.push(
          h(QSeparator, { dark: isDark.value }),
          h(
            QCardSection,
            { class: "scroll q-dialog-plugin__form" },
            getOptions
          ),
          h(QSeparator, { dark: isDark.value })
        );
      }
      if (props2.ok || props2.cancel) {
        child.push(getButtons());
      }
      return child;
    }
    function getContent() {
      return [
        h(QCard, {
          class: [
            classes.value,
            props2.cardClass
          ],
          style: props2.cardStyle,
          dark: isDark.value
        }, getCardContent)
      ];
    }
    Object.assign(proxy, { show, hide });
    return () => h(QDialog, {
      ref: dialogRef,
      onHide: onDialogHide
    }, getContent);
  }
});
function merge(target2, source) {
  for (const key in source) {
    if (key !== "spinner" && Object(source[key]) === source[key]) {
      target2[key] = Object(target2[key]) !== target2[key] ? {} : { ...target2[key] };
      merge(target2[key], source[key]);
    } else {
      target2[key] = source[key];
    }
  }
}
function globalDialog(DefaultComponent, supportsCustomComponent, parentApp) {
  return (pluginProps) => {
    let DialogComponent, props2;
    const isCustom = supportsCustomComponent === true && pluginProps.component !== void 0;
    if (isCustom === true) {
      const { component, componentProps } = pluginProps;
      DialogComponent = typeof component === "string" ? parentApp.component(component) : component;
      props2 = componentProps || {};
    } else {
      const { class: klass, style, ...otherProps } = pluginProps;
      DialogComponent = DefaultComponent;
      props2 = otherProps;
      klass !== void 0 && (otherProps.cardClass = klass);
      style !== void 0 && (otherProps.cardStyle = style);
    }
    let vm2, emittedOK = false;
    const dialogRef = ref(null);
    const el = createGlobalNode(false, "dialog");
    const applyState = (cmd) => {
      if (dialogRef.value !== null && dialogRef.value[cmd] !== void 0) {
        dialogRef.value[cmd]();
        return;
      }
      const target2 = vm2.$.subTree;
      if (target2 && target2.component) {
        if (target2.component.proxy && target2.component.proxy[cmd]) {
          target2.component.proxy[cmd]();
          return;
        }
        if (target2.component.subTree && target2.component.subTree.component && target2.component.subTree.component.proxy && target2.component.subTree.component.proxy[cmd]) {
          target2.component.subTree.component.proxy[cmd]();
          return;
        }
      }
      console.error("[Quasar] Incorrectly defined Dialog component");
    };
    const okFns = [], cancelFns = [], API = {
      onOk(fn) {
        okFns.push(fn);
        return API;
      },
      onCancel(fn) {
        cancelFns.push(fn);
        return API;
      },
      onDismiss(fn) {
        okFns.push(fn);
        cancelFns.push(fn);
        return API;
      },
      hide() {
        applyState("hide");
        return API;
      },
      update(componentProps) {
        if (vm2 !== null) {
          if (isCustom === true) {
            Object.assign(props2, componentProps);
          } else {
            const { class: klass, style, ...cfg } = componentProps;
            klass !== void 0 && (cfg.cardClass = klass);
            style !== void 0 && (cfg.cardStyle = style);
            merge(props2, cfg);
          }
          vm2.$forceUpdate();
        }
        return API;
      }
    };
    const onOk = (data) => {
      emittedOK = true;
      okFns.forEach((fn) => {
        fn(data);
      });
    };
    const onHide = () => {
      app2.unmount(el);
      removeGlobalNode(el);
      app2 = null;
      vm2 = null;
      if (emittedOK !== true) {
        cancelFns.forEach((fn) => {
          fn();
        });
      }
    };
    let app2 = createChildApp({
      name: "QGlobalDialog",
      setup: () => () => h(DialogComponent, {
        ...props2,
        ref: dialogRef,
        onOk,
        onHide,
        onVnodeMounted(...args) {
          if (typeof props2.onVnodeMounted === "function") {
            props2.onVnodeMounted(...args);
          }
          nextTick(() => applyState("show"));
        }
      })
    }, parentApp);
    vm2 = app2.mount(el);
    return API;
  };
}
var Dialog = {
  install({ $q, parentApp }) {
    $q.dialog = globalDialog(DialogPlugin, true, parentApp);
    if (this.__installed !== true) {
      this.create = $q.dialog;
    }
  }
};
let app, vm, uid = 0, timeout = null, props = {}, activeGroups = {};
const originalDefaults = {
  group: "__default_quasar_group__",
  delay: 0,
  message: false,
  html: false,
  spinnerSize: 80,
  spinnerColor: "",
  messageColor: "",
  backgroundColor: "",
  boxClass: "",
  spinner: QSpinner,
  customClass: ""
};
const defaults = { ...originalDefaults };
function registerProps(opts) {
  if (opts && opts.group !== void 0 && activeGroups[opts.group] !== void 0) {
    return Object.assign(activeGroups[opts.group], opts);
  }
  const newProps = isObject(opts) === true && opts.ignoreDefaults === true ? { ...originalDefaults, ...opts } : { ...defaults, ...opts };
  activeGroups[newProps.group] = newProps;
  return newProps;
}
const Plugin = defineReactivePlugin({
  isActive: false
}, {
  show(opts) {
    props = registerProps(opts);
    const { group } = props;
    Plugin.isActive = true;
    if (app !== void 0) {
      props.uid = uid;
      vm.$forceUpdate();
    } else {
      props.uid = ++uid;
      timeout !== null && clearTimeout(timeout);
      timeout = setTimeout(() => {
        timeout = null;
        const el = createGlobalNode("q-loading");
        app = createChildApp({
          name: "QLoading",
          setup() {
            onMounted(() => {
              preventScroll(true);
            });
            function onAfterLeave() {
              if (Plugin.isActive !== true && app !== void 0) {
                preventScroll(false);
                app.unmount(el);
                removeGlobalNode(el);
                app = void 0;
                vm = void 0;
              }
            }
            function getContent() {
              if (Plugin.isActive !== true) {
                return null;
              }
              const content = [
                h(props.spinner, {
                  class: "q-loading__spinner",
                  color: props.spinnerColor,
                  size: props.spinnerSize
                })
              ];
              props.message && content.push(
                h("div", {
                  class: "q-loading__message" + (props.messageColor ? ` text-${props.messageColor}` : ""),
                  [props.html === true ? "innerHTML" : "textContent"]: props.message
                })
              );
              return h("div", {
                class: "q-loading fullscreen flex flex-center z-max " + props.customClass.trim(),
                key: props.uid
              }, [
                h("div", {
                  class: "q-loading__backdrop" + (props.backgroundColor ? ` bg-${props.backgroundColor}` : "")
                }),
                h("div", {
                  class: "q-loading__box column items-center " + props.boxClass
                }, content)
              ]);
            }
            return () => h(Transition, {
              name: "q-transition--fade",
              appear: true,
              onAfterLeave
            }, getContent);
          }
        }, Plugin.__parentApp);
        vm = app.mount(el);
      }, props.delay);
    }
    return (paramProps) => {
      if (paramProps === void 0 || Object(paramProps) !== paramProps) {
        Plugin.hide(group);
        return;
      }
      Plugin.show({ ...paramProps, group });
    };
  },
  hide(group) {
    if (Plugin.isActive === true) {
      if (group === void 0) {
        activeGroups = {};
      } else if (activeGroups[group] === void 0) {
        return;
      } else {
        delete activeGroups[group];
        const keys = Object.keys(activeGroups);
        if (keys.length !== 0) {
          const lastGroup = keys[keys.length - 1];
          Plugin.show({ group: lastGroup });
          return;
        }
      }
      if (timeout !== null) {
        clearTimeout(timeout);
        timeout = null;
      }
      Plugin.isActive = false;
    }
  },
  setDefaults(opts) {
    {
      isObject(opts) === true && Object.assign(defaults, opts);
    }
  },
  install({ $q, parentApp }) {
    $q.loading = this;
    {
      Plugin.__parentApp = parentApp;
      if ($q.config.loading !== void 0) {
        this.setDefaults($q.config.loading);
      }
    }
  }
});
var quasarUserOptions = { config: {}, plugins: { LocalStorage: Plugin$1, Notify, Dialog, Loading: Plugin } };
async function start({
  app: app2,
  router,
  store: store2
}) {
  app2.use(router);
  function connect() {
    const buildConnection = (id, cb) => {
      const port = chrome.runtime.connect({
        name: "app:" + id
      });
      let disconnected = false;
      port.onDisconnect.addListener(() => {
        disconnected = true;
      });
      let bridge = new Bridge({
        listen(fn) {
          port.onMessage.addListener(fn);
        },
        send(data) {
          if (!disconnected) {
            port.postMessage(data);
          }
        }
      });
      cb(bridge);
    };
    const fallbackConnection = (cb) => {
      const tabId = chrome.devtools ? chrome.devtools.inspectedWindow.tabId : uid$2();
      buildConnection(tabId, cb);
    };
    const shellConnect = (cb) => {
      if (chrome.tabs && !chrome.devtools) {
        chrome.tabs.getCurrent((tab) => {
          if (tab && tab.id) {
            buildConnection(tab.id, cb);
          } else {
            fallbackConnection(cb);
          }
        });
      } else {
        fallbackConnection(cb);
      }
    };
    shellConnect((bridge) => {
      window.QBexBridge = bridge;
      app2.config.globalProperties.$q.bex = window.QBexBridge;
      app2.mount("#q-app");
    });
  }
  if (chrome.runtime.id) {
    setTimeout(() => {
      connect();
    }, 300);
  }
}
createQuasarApp(createApp, quasarUserOptions).then(start);
export { QDialog as $, provide as A, pageContainerKey as B, getScrollbarWidth as C, reactive as D, onUnmounted as E, openBlock as F, createElementBlock as G, createVNode as H, withCtx as I, createBaseVNode as J, QBtn as K, QCardSection as L, Fragment as M, renderList as N, unref as O, QAvatar as P, QCardActions as Q, createTextVNode as R, toDisplayString as S, normalizeClass as T, createBlock as U, createCommentVNode as V, useRouter as W, resolveComponent as X, QIcon as Y, QSeparator as Z, QCard as _, computed as a, popScopeId as a$, useRouterLinkProps as a0, useRouterLink as a1, isKeyCode as a2, stopAndPrevent as a3, Platform as a4, prevent as a5, addEvt as a6, cleanEvt as a7, listenOpts as a8, portalProxyList as a9, debounce as aA, onDeactivated as aB, onActivated as aC, setVerticalScrollPosition as aD, setHorizontalScrollPosition as aE, getScrollHeight as aF, height as aG, useFieldProps as aH, useFieldEmits as aI, useField as aJ, useFieldState as aK, useSizeProps as aL, useSize as aM, hMergeSlotSafely as aN, Ripple as aO, onBeforeMount as aP, useFormProps as aQ, useFormInputNameAttr as aR, fieldValueIsFilled as aS, isDeepEqual as aT, onBeforeUpdate as aU, onUpdated as aV, useKeyComposition as aW, shouldIgnoreKey as aX, normalizeStyle as aY, _export_sfc as aZ, pushScopeId as a_, client as aa, useTransitionProps as ab, useTick as ac, useTransition as ad, usePortal as ae, addFocusout as af, position as ag, removeFocusout as ah, removeEscapeKey as ai, getScrollTarget as aj, closePortalMenus as ak, Transition as al, addFocusFn as am, addEscapeKey as an, childHasFocus as ao, quasarKey as ap, createDirective as aq, getPortalProxy as ar, closePortals as as, defineStore as at, noop$2 as au, leftClick as av, preventDraggable as aw, stop as ax, getVerticalScrollPosition as ay, getHorizontalScrollPosition as az, hSlot as b, useSpinnerProps as b0, useSpinner as b1, injectProp as b2, QInput as b3, vShow as b4, useBtnProps as b5, uid$2 as b6, getBtnDesignAttr as b7, vmHasRouter as b8, History as b9, useSplitAttrs as ba, useRoute as bb, isRef as bc, QToggle as bd, defineComponent as be, createComponent as c, hUniqueSlot as d, emptyRenderFn as e, isRuntimeSsrPreHydration as f, getCurrentInstance as g, h, inject as i, hMergeSlot as j, useDarkProps as k, layoutKey as l, useModelToggleEmits as m, useDark as n, onBeforeUnmount as o, useTimeout as p, useModelToggle as q, ref as r, useHistory as s, onMounted as t, useModelToggleProps as u, nextTick as v, watch as w, withDirectives as x, hDir as y, usePreventScroll as z };
