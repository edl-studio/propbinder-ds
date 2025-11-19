import {
  setupFormControl
} from "./chunk-EQOJQWWW.js";
import {
  setupInteractions
} from "./chunk-VILYZIJE.js";
import {
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  injectElementRef,
  injectStyleInjector
} from "./chunk-NOHFT6FW.js";
import {
  safeTakeUntilDestroyed,
  uniqueId
} from "./chunk-7VMOF35L.js";
import "./chunk-RQY3LDOR.js";
import "./chunk-YLELG2JA.js";
import "./chunk-ALQK544G.js";
import "./chunk-53KHQLJJ.js";
import "./chunk-ILS3C6C2.js";
import {
  DestroyRef,
  Directive,
  HostListener,
  booleanAttribute,
  computed,
  fromEvent,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  ɵɵHostDirectivesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵdomProperty,
  ɵɵlistener
} from "./chunk-JIIPHG5Y.js";
import "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-autofill.mjs
var _NgpAutofill = class _NgpAutofill {
  constructor() {
    this.styleInjector = injectStyleInjector();
    this.autofilled = signal(false);
    this.autofillChange = output({
      alias: "ngpAutofill"
    });
    this.styleInjector.add("ngp-autofill", `
        @keyframes ngp-autofill-start { }
        @keyframes ngp-autofill-end {}

        [data-autofill]:-webkit-autofill {
          animation: ngp-autofill-start 0s 1ms;
        }

        [data-autofill]:not(:-webkit-autofill) {
          animation: ngp-autofill-end 0s 1ms;
        }
      `);
  }
  onAnimationStart(event) {
    if (event.animationName === "ngp-autofill-start") {
      this.autofilled.set(true);
      this.autofillChange.emit(true);
    }
    if (event.animationName === "ngp-autofill-end") {
      this.autofilled.set(false);
      this.autofillChange.emit(false);
    }
  }
};
_NgpAutofill.ɵfac = function NgpAutofill_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpAutofill)();
};
_NgpAutofill.ɵdir = ɵɵdefineDirective({
  type: _NgpAutofill,
  selectors: [["", "ngpAutofill", ""]],
  hostVars: 1,
  hostBindings: function NgpAutofill_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("animationstart", function NgpAutofill_animationstart_HostBindingHandler($event) {
        return ctx.onAnimationStart($event);
      });
    }
    if (rf & 2) {
      ɵɵattribute("data-autofill", ctx.autofilled() ? "" : null);
    }
  },
  outputs: {
    autofillChange: "ngpAutofill"
  },
  exportAs: ["ngpAutofill"]
});
var NgpAutofill = _NgpAutofill;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpAutofill, [{
    type: Directive,
    args: [{
      selector: "[ngpAutofill]",
      exportAs: "ngpAutofill",
      host: {
        "[attr.data-autofill]": 'autofilled() ? "" : null'
      }
    }]
  }], () => [], {
    onAnimationStart: [{
      type: HostListener,
      args: ["animationstart", ["$event"]]
    }]
  });
})();

// node_modules/ng-primitives/fesm2022/ng-primitives-search.mjs
var NgpSearchStateToken = createStateToken("Search");
var provideSearchState = createStateProvider(NgpSearchStateToken);
var injectSearchState = createStateInjector(NgpSearchStateToken);
var searchState = createState(NgpSearchStateToken);
var _NgpSearchClear = class _NgpSearchClear {
  constructor() {
    this.search = injectSearchState();
  }
  /**
   * Clear the input field.
   */
  clear() {
    this.search().clear();
  }
};
_NgpSearchClear.ɵfac = function NgpSearchClear_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpSearchClear)();
};
_NgpSearchClear.ɵdir = ɵɵdefineDirective({
  type: _NgpSearchClear,
  selectors: [["", "ngpSearchClear", ""]],
  hostVars: 2,
  hostBindings: function NgpSearchClear_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpSearchClear_click_HostBindingHandler() {
        return ctx.clear();
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("tabIndex", -1);
      ɵɵattribute("data-empty", ctx.search().empty() ? "" : null);
    }
  },
  exportAs: ["ngpSearchClear"]
});
var NgpSearchClear = _NgpSearchClear;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpSearchClear, [{
    type: Directive,
    args: [{
      selector: "[ngpSearchClear]",
      exportAs: "ngpSearchClear",
      host: {
        "[tabindex]": "-1",
        "[attr.data-empty]": 'search().empty() ? "" : null'
      }
    }]
  }], null, {
    clear: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _NgpSearch = class _NgpSearch {
  constructor() {
    this.destroyRef = inject(DestroyRef);
    this.input = signal(null);
    this.value = signal("");
    this.empty = computed(() => this.value() === "");
    this.state = searchState(this);
  }
  clear() {
    const input2 = this.input();
    if (!input2) {
      return;
    }
    input2.value = "";
    input2.dispatchEvent(new Event("input", {
      bubbles: true
    }));
  }
  /**
   * Register the input field.
   * @param input The input field.
   * @internal
   */
  registerInput(input2) {
    this.input.set(input2);
    this.value.set(input2.value);
    fromEvent(input2, "input").pipe(safeTakeUntilDestroyed(this.destroyRef)).subscribe(() => this.value.set(input2.value));
  }
};
_NgpSearch.ɵfac = function NgpSearch_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpSearch)();
};
_NgpSearch.ɵdir = ɵɵdefineDirective({
  type: _NgpSearch,
  selectors: [["", "ngpSearch", ""]],
  hostVars: 1,
  hostBindings: function NgpSearch_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown.escape", function NgpSearch_keydown_escape_HostBindingHandler() {
        return ctx.clear();
      });
    }
    if (rf & 2) {
      ɵɵattribute("data-empty", ctx.empty() ? "" : null);
    }
  },
  exportAs: ["ngpSearch"],
  features: [ɵɵProvidersFeature([provideSearchState()])]
});
var NgpSearch = _NgpSearch;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpSearch, [{
    type: Directive,
    args: [{
      selector: "[ngpSearch]",
      exportAs: "ngpSearch",
      providers: [provideSearchState()],
      host: {
        "[attr.data-empty]": 'empty() ? "" : null'
      }
    }]
  }], null, {
    clear: [{
      type: HostListener,
      args: ["keydown.escape"]
    }]
  });
})();

// node_modules/ng-primitives/fesm2022/ng-primitives-input.mjs
var NgpInputStateToken = createStateToken("Input");
var provideInputState = createStateProvider(NgpInputStateToken);
var injectInputState = createStateInjector(NgpInputStateToken);
var inputState = createState(NgpInputStateToken);
var _NgpInput = class _NgpInput {
  constructor() {
    this.id = input(uniqueId("ngp-input"));
    this.searchState = injectSearchState({
      optional: true
    });
    this.elementRef = injectElementRef();
    this.disabled = input(false, {
      transform: booleanAttribute
    });
    this.state = inputState(this);
    setupInteractions({
      hover: true,
      press: true,
      focus: true,
      disabled: this.state.disabled
    });
    this.status = setupFormControl({
      id: this.state.id,
      disabled: this.state.disabled
    });
    this.searchState()?.registerInput(this.elementRef.nativeElement);
  }
};
_NgpInput.ɵfac = function NgpInput_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpInput)();
};
_NgpInput.ɵdir = ɵɵdefineDirective({
  type: _NgpInput,
  selectors: [["input", "ngpInput", ""]],
  hostVars: 2,
  hostBindings: function NgpInput_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("id", ctx.id())("disabled", ctx.status().disabled ? "" : null);
    }
  },
  inputs: {
    id: [1, "id"],
    disabled: [1, "disabled"]
  },
  exportAs: ["ngpInput"],
  features: [ɵɵProvidersFeature([provideInputState()]), ɵɵHostDirectivesFeature([NgpAutofill])]
});
var NgpInput = _NgpInput;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpInput, [{
    type: Directive,
    args: [{
      selector: "input[ngpInput]",
      exportAs: "ngpInput",
      providers: [provideInputState()],
      hostDirectives: [NgpAutofill],
      host: {
        "[attr.id]": "id()",
        "[attr.disabled]": 'status().disabled ? "" : null'
      }
    }]
  }], () => [], null);
})();
export {
  NgpInput,
  injectInputState,
  provideInputState
};
//# sourceMappingURL=ng-primitives_input.js.map
