import {
  setupInteractions
} from "./chunk-X32LIKXQ.js";
import {
  setupFormControl
} from "./chunk-LICE2VAZ.js";
import {
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  injectElementRef
} from "./chunk-WE5NZ3WV.js";
import {
  uniqueId
} from "./chunk-FYRG6RZJ.js";
import "./chunk-O5JGTJFR.js";
import "./chunk-ALQK544G.js";
import "./chunk-YLELG2JA.js";
import "./chunk-BADZCE2L.js";
import "./chunk-7P4ZKDVH.js";
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
} from "./chunk-V52YD5AQ.js";
import "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-switch.mjs
var NgpSwitchStateToken = createStateToken("Switch");
var provideSwitchState = createStateProvider(NgpSwitchStateToken);
var injectSwitchState = createStateInjector(NgpSwitchStateToken);
var switchState = createState(NgpSwitchStateToken);
var _NgpSwitchThumb = class _NgpSwitchThumb {
  constructor() {
    this.state = injectSwitchState();
    setupInteractions({
      hover: true,
      focusVisible: true,
      press: true,
      disabled: this.state().disabled
    });
  }
};
_NgpSwitchThumb.ɵfac = function NgpSwitchThumb_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpSwitchThumb)();
};
_NgpSwitchThumb.ɵdir = ɵɵdefineDirective({
  type: _NgpSwitchThumb,
  selectors: [["", "ngpSwitchThumb", ""]],
  hostVars: 2,
  hostBindings: function NgpSwitchThumb_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("data-checked", ctx.state().checked() ? "" : null)("data-disabled", ctx.state().disabled() ? "" : null);
    }
  }
});
var NgpSwitchThumb = _NgpSwitchThumb;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpSwitchThumb, [{
    type: Directive,
    args: [{
      selector: "[ngpSwitchThumb]",
      host: {
        "[attr.data-checked]": 'state().checked() ? "" : null',
        "[attr.data-disabled]": 'state().disabled() ? "" : null'
      }
    }]
  }], () => [], null);
})();
var _NgpSwitch = class _NgpSwitch {
  constructor() {
    this.elementRef = injectElementRef();
    this.isButton = this.elementRef.nativeElement.tagName === "BUTTON";
    this.id = input(uniqueId("ngp-switch"));
    this.checked = input(false, {
      alias: "ngpSwitchChecked",
      transform: booleanAttribute
    });
    this.checkedChange = output({
      alias: "ngpSwitchCheckedChange"
    });
    this.disabled = input(false, {
      alias: "ngpSwitchDisabled",
      transform: booleanAttribute
    });
    this.state = switchState(this);
    setupInteractions({
      hover: true,
      press: true,
      focusVisible: true,
      disabled: this.state.disabled
    });
    setupFormControl({
      id: this.state.id,
      disabled: this.state.disabled
    });
  }
  /**
   * Toggle the checked state.
   */
  toggle() {
    if (this.state.disabled()) {
      return;
    }
    const checked = !this.state.checked();
    this.state.checked.set(checked);
    this.checkedChange.emit(checked);
  }
  /**
   * Handle the keydown event.
   */
  onKeyDown(event) {
    event.preventDefault();
    if (!this.isButton) {
      this.toggle();
    }
  }
};
_NgpSwitch.ɵfac = function NgpSwitch_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpSwitch)();
};
_NgpSwitch.ɵdir = ɵɵdefineDirective({
  type: _NgpSwitch,
  selectors: [["", "ngpSwitch", ""]],
  hostAttrs: ["role", "switch"],
  hostVars: 8,
  hostBindings: function NgpSwitch_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpSwitch_click_HostBindingHandler() {
        return ctx.toggle();
      })("keydown.space", function NgpSwitch_keydown_space_HostBindingHandler($event) {
        return ctx.onKeyDown($event);
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
      ɵɵattribute("type", ctx.isButton ? "button" : null)("aria-checked", ctx.state.checked())("data-checked", ctx.state.checked() ? "" : null)("disabled", ctx.isButton && ctx.state.disabled() ? "" : null)("data-disabled", ctx.state.disabled() ? "" : null)("aria-disabled", ctx.state.disabled())("tabindex", ctx.state.disabled() ? -1 : 0);
    }
  },
  inputs: {
    id: [1, "id"],
    checked: [1, "ngpSwitchChecked", "checked"],
    disabled: [1, "ngpSwitchDisabled", "disabled"]
  },
  outputs: {
    checkedChange: "ngpSwitchCheckedChange"
  },
  exportAs: ["ngpSwitch"],
  features: [ɵɵProvidersFeature([provideSwitchState()])]
});
var NgpSwitch = _NgpSwitch;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpSwitch, [{
    type: Directive,
    args: [{
      selector: "[ngpSwitch]",
      exportAs: "ngpSwitch",
      providers: [provideSwitchState()],
      host: {
        role: "switch",
        "[id]": "id()",
        "[attr.type]": 'isButton ? "button" : null',
        "[attr.aria-checked]": "state.checked()",
        "[attr.data-checked]": 'state.checked() ? "" : null',
        "[attr.disabled]": 'isButton && state.disabled() ? "" : null',
        "[attr.data-disabled]": 'state.disabled() ? "" : null',
        "[attr.aria-disabled]": "state.disabled()",
        "[attr.tabindex]": "state.disabled() ? -1 : 0"
      }
    }]
  }], () => [], {
    toggle: [{
      type: HostListener,
      args: ["click"]
    }],
    onKeyDown: [{
      type: HostListener,
      args: ["keydown.space", ["$event"]]
    }]
  });
})();
export {
  NgpSwitch,
  NgpSwitchThumb,
  injectSwitchState,
  provideSwitchState
};
//# sourceMappingURL=ng-primitives_switch.js.map
