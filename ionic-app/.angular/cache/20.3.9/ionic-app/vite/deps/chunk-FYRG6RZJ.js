import {
  NG_VALUE_ACCESSOR,
  NgControl
} from "./chunk-O5JGTJFR.js";
import {
  DestroyRef,
  EMPTY,
  NEVER,
  Observable,
  afterNextRender,
  afterRenderEffect,
  assertInInjectionContext,
  catchError,
  defaultIfEmpty,
  effect,
  inject,
  pipe,
  signal,
  takeUntil,
  untracked
} from "./chunk-V52YD5AQ.js";

// node_modules/@angular/core/fesm2022/rxjs-interop.mjs
function takeUntilDestroyed(destroyRef) {
  if (!destroyRef) {
    ngDevMode && assertInInjectionContext(takeUntilDestroyed);
    destroyRef = inject(DestroyRef);
  }
  const destroyed$ = new Observable((subscriber) => {
    if (destroyRef.destroyed) {
      subscriber.next();
      return;
    }
    const unregisterFn = destroyRef.onDestroy(subscriber.next.bind(subscriber));
    return unregisterFn;
  });
  return (source) => {
    return source.pipe(takeUntil(destroyed$));
  };
}

// node_modules/ng-primitives/fesm2022/ng-primitives-utils.mjs
function provideValueAccessor(type) {
  return { provide: NG_VALUE_ACCESSOR, useExisting: type, multi: true };
}
function safeTakeUntilDestroyed(destroyRef) {
  return pipe(takeUntil(NEVER.pipe(takeUntilDestroyed(destroyRef), catchError(() => EMPTY), defaultIfEmpty(null))));
}
function setStatusSignal(control, status) {
  if (!control?.control) {
    return;
  }
  status.set({
    valid: control?.control?.valid ?? null,
    invalid: control?.control?.invalid ?? null,
    pristine: control?.control?.pristine ?? null,
    dirty: control?.control?.dirty ?? null,
    touched: control?.control?.touched ?? null,
    pending: control?.control?.pending ?? null,
    disabled: control?.control?.disabled ?? null
  });
}
function subscribeToControlStatus(control, status, destroyRef) {
  if (!control?.control) {
    return;
  }
  control.control.events.pipe(safeTakeUntilDestroyed(destroyRef)).subscribe(() => setStatusSignal(control, status));
}
function controlStatus() {
  const control = inject(NgControl, { optional: true });
  const destroyRef = inject(DestroyRef);
  const status = signal({
    valid: null,
    invalid: null,
    pristine: null,
    dirty: null,
    touched: null,
    pending: null,
    disabled: null
  });
  if (!control?.control) {
    afterNextRender({
      write: () => {
        if (control?.control) {
          subscribeToControlStatus(control, status, destroyRef);
          setStatusSignal(control, status);
        }
      }
    });
    return status;
  }
  subscribeToControlStatus(control, status);
  return status;
}
function booleanAttributeBinding(element, attribute, value) {
  if (!value) {
    return;
  }
  afterRenderEffect({
    write: () => value() ? element.setAttribute(attribute, "") : element.removeAttribute(attribute)
  });
}
function injectDisposables() {
  const destroyRef = inject(DestroyRef);
  let isDestroyed = false;
  destroyRef.onDestroy(() => isDestroyed = true);
  return {
    /**
     * Set a timeout that will be cleared when the component is destroyed.
     * @param callback The callback to execute
     * @param delay The delay before the callback is executed
     * @returns A function to clear the timeout
     */
    setTimeout: (callback, delay) => {
      if (isDestroyed) {
        return () => {
        };
      }
      const id = setTimeout(callback, delay);
      const cleanup = () => clearTimeout(id);
      destroyRef.onDestroy(cleanup);
      return cleanup;
    },
    /**
     * Set an interval that will be cleared when the component is destroyed.
     * @param callback The callback to execute
     * @param delay The delay before the callback is executed
     * @param target
     * @param type
     * @param listener
     * @param options
     * @returns A function to clear the interval
     */
    addEventListener: (target, type, listener, options) => {
      if (isDestroyed) {
        return () => {
        };
      }
      target.addEventListener(type, listener, options);
      const cleanup = () => target.removeEventListener(type, listener, options);
      destroyRef.onDestroy(cleanup);
      return cleanup;
    },
    /**
     * Set an interval that will be cleared when the component is destroyed.
     * @param callback The callback to execute
     * @param delay The delay before the callback is executed
     * @returns A function to clear the interval
     */
    setInterval: (callback, delay) => {
      if (isDestroyed) {
        return () => {
        };
      }
      const id = setInterval(callback, delay);
      const cleanup = () => clearInterval(id);
      destroyRef.onDestroy(cleanup);
      return cleanup;
    },
    /**
     * Set a requestAnimationFrame that will be cleared when the component is destroyed.
     * @param callback The callback to execute
     * @returns A function to clear the requestAnimationFrame
     */
    requestAnimationFrame: (callback) => {
      if (isDestroyed) {
        return () => {
        };
      }
      const id = requestAnimationFrame(callback);
      const cleanup = () => cancelAnimationFrame(id);
      destroyRef.onDestroy(cleanup);
      return cleanup;
    }
  };
}
var uniqueIdMap = /* @__PURE__ */ new Map();
function uniqueId(prefix) {
  const id = uniqueIdMap.get(prefix) ?? 0;
  uniqueIdMap.set(prefix, id + 1);
  return `${prefix}-${id}`;
}
function isString(value) {
  return typeof value === "string";
}
function isNumber(value) {
  return typeof value === "number";
}
function isBoolean(value) {
  return typeof value === "boolean";
}
function isFunction(value) {
  return typeof value === "function";
}
function isObject(value) {
  return !!value && typeof value === "object" && !Array.isArray(value);
}
function isUndefined(value) {
  return typeof value === "undefined";
}
function onChange(source, fn, options) {
  const previousValue = signal(source());
  effect(() => {
    const value = source();
    if (value !== previousValue()) {
      untracked(() => fn(value, previousValue()));
      previousValue.set(value);
    }
  }, { injector: options?.injector });
  fn(source(), null);
}
function onBooleanChange(source, onTrue, onFalse, options) {
  onChange(source, (value) => value ? onTrue?.() : onFalse?.(), options);
}

export {
  provideValueAccessor,
  safeTakeUntilDestroyed,
  controlStatus,
  booleanAttributeBinding,
  injectDisposables,
  uniqueId,
  isString,
  isNumber,
  isBoolean,
  isFunction,
  isObject,
  isUndefined,
  onChange,
  onBooleanChange
};
/*! Bundled license information:

@angular/core/fesm2022/rxjs-interop.mjs:
  (**
   * @license Angular v20.3.11
   * (c) 2010-2025 Google LLC. https://angular.dev/
   * License: MIT
   *)
*/
//# sourceMappingURL=chunk-FYRG6RZJ.js.map
