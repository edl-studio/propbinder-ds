import {
  setupFormControl
} from "./chunk-T5OXJ2NG.js";
import {
  setupInteractions
} from "./chunk-DATWMZSA.js";
import {
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken
} from "./chunk-KHYMN57T.js";
import {
  uniqueId
} from "./chunk-7VMOF35L.js";
import "./chunk-YLELG2JA.js";
import "./chunk-ALQK544G.js";
import "./chunk-53KHQLJJ.js";
import "./chunk-RQY3LDOR.js";
import "./chunk-ILS3C6C2.js";
import {
  Directive,
  HostListener,
  booleanAttribute,
  input,
  output,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵdomProperty,
  ɵɵlistener
} from "./chunk-JIIPHG5Y.js";
import "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-checkbox.mjs
var NgpCheckboxStateToken = createStateToken("Checkbox");
var provideCheckboxState = createStateProvider(NgpCheckboxStateToken);
var injectCheckboxState = createStateInjector(NgpCheckboxStateToken);
var checkboxState = createState(NgpCheckboxStateToken);
var _NgpCheckbox = class _NgpCheckbox {
  constructor() {
    this.id = input(uniqueId("ngp-checkbox"));
    this.checked = input(false, {
      alias: "ngpCheckboxChecked",
      transform: booleanAttribute
    });
    this.checkedChange = output({
      alias: "ngpCheckboxCheckedChange"
    });
    this.indeterminate = input(false, {
      alias: "ngpCheckboxIndeterminate",
      transform: booleanAttribute
    });
    this.indeterminateChange = output({
      alias: "ngpCheckboxIndeterminateChange"
    });
    this.required = input(false, {
      alias: "ngpCheckboxRequired",
      transform: booleanAttribute
    });
    this.disabled = input(false, {
      alias: "ngpCheckboxDisabled",
      transform: booleanAttribute
    });
    this.state = checkboxState(this);
    setupFormControl({
      id: this.state.id,
      disabled: this.state.disabled
    });
    setupInteractions({
      hover: true,
      press: true,
      focusVisible: true,
      disabled: this.state.disabled
    });
  }
  onEnter(event) {
    event.preventDefault();
  }
  toggle(event) {
    if (this.state.disabled()) {
      return;
    }
    event?.preventDefault();
    const checked = this.state.indeterminate() ? true : !this.state.checked();
    this.state.checked.set(checked);
    this.checkedChange.emit(checked);
    if (this.state.indeterminate()) {
      this.state.indeterminate.set(false);
      this.indeterminateChange.emit(false);
    }
  }
};
_NgpCheckbox.ɵfac = function NgpCheckbox_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpCheckbox)();
};
_NgpCheckbox.ɵdir = ɵɵdefineDirective({
  type: _NgpCheckbox,
  selectors: [["", "ngpCheckbox", ""]],
  hostAttrs: ["role", "checkbox"],
  hostVars: 5,
  hostBindings: function NgpCheckbox_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown.enter", function NgpCheckbox_keydown_enter_HostBindingHandler($event) {
        return ctx.onEnter($event);
      })("click", function NgpCheckbox_click_HostBindingHandler($event) {
        return ctx.toggle($event);
      })("keydown.space", function NgpCheckbox_keydown_space_HostBindingHandler($event) {
        return ctx.toggle($event);
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("tabIndex", ctx.state.disabled() ? -1 : 0);
      ɵɵattribute("aria-checked", ctx.state.indeterminate() ? "mixed" : ctx.state.checked())("data-checked", ctx.state.checked() ? "" : null)("data-indeterminate", ctx.state.indeterminate() ? "" : null)("aria-disabled", ctx.state.disabled());
    }
  },
  inputs: {
    id: [1, "id"],
    checked: [1, "ngpCheckboxChecked", "checked"],
    indeterminate: [1, "ngpCheckboxIndeterminate", "indeterminate"],
    required: [1, "ngpCheckboxRequired", "required"],
    disabled: [1, "ngpCheckboxDisabled", "disabled"]
  },
  outputs: {
    checkedChange: "ngpCheckboxCheckedChange",
    indeterminateChange: "ngpCheckboxIndeterminateChange"
  },
  features: [ɵɵProvidersFeature([provideCheckboxState()])]
});
var NgpCheckbox = _NgpCheckbox;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpCheckbox, [{
    type: Directive,
    args: [{
      selector: "[ngpCheckbox]",
      providers: [provideCheckboxState()],
      host: {
        role: "checkbox",
        "[attr.aria-checked]": 'state.indeterminate() ? "mixed" : state.checked()',
        "[attr.data-checked]": 'state.checked() ? "" : null',
        "[attr.data-indeterminate]": 'state.indeterminate() ? "" : null',
        "[attr.aria-disabled]": "state.disabled()",
        "[tabindex]": "state.disabled() ? -1 : 0"
      }
    }]
  }], () => [], {
    onEnter: [{
      type: HostListener,
      args: ["keydown.enter", ["$event"]]
    }],
    toggle: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }, {
      type: HostListener,
      args: ["keydown.space", ["$event"]]
    }]
  });
})();
export {
  NgpCheckbox,
  injectCheckboxState,
  provideCheckboxState
};
//# sourceMappingURL=ng-primitives_checkbox.js.map
