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
  createStateToken
} from "./chunk-NOHFT6FW.js";
import {
  uniqueId
} from "./chunk-7VMOF35L.js";
import "./chunk-RQY3LDOR.js";
import "./chunk-YLELG2JA.js";
import "./chunk-ALQK544G.js";
import "./chunk-53KHQLJJ.js";
import "./chunk-ILS3C6C2.js";
import {
  Directive,
  booleanAttribute,
  input,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵdomProperty
} from "./chunk-JIIPHG5Y.js";
import "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-textarea.mjs
var NgpTextareaStateToken = createStateToken("Textarea");
var provideTextareaState = createStateProvider(NgpTextareaStateToken);
var injectTextareaState = createStateInjector(NgpTextareaStateToken);
var textareaState = createState(NgpTextareaStateToken);
var _NgpTextarea = class _NgpTextarea {
  constructor() {
    this.id = input(uniqueId("ngp-textarea"));
    this.disabled = input(false, {
      transform: booleanAttribute
    });
    this.state = textareaState(this);
    setupInteractions({
      hover: true,
      press: true,
      focus: true,
      disabled: this.state.disabled
    });
    setupFormControl({
      id: this.state.id,
      disabled: this.state.disabled
    });
  }
};
_NgpTextarea.ɵfac = function NgpTextarea_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpTextarea)();
};
_NgpTextarea.ɵdir = ɵɵdefineDirective({
  type: _NgpTextarea,
  selectors: [["", "ngpTextarea", ""]],
  hostVars: 2,
  hostBindings: function NgpTextarea_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
      ɵɵattribute("disabled", ctx.disabled() ? "" : null);
    }
  },
  inputs: {
    id: [1, "id"],
    disabled: [1, "disabled"]
  },
  exportAs: ["ngpTextarea"],
  features: [ɵɵProvidersFeature([provideTextareaState()])]
});
var NgpTextarea = _NgpTextarea;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpTextarea, [{
    type: Directive,
    args: [{
      selector: "[ngpTextarea]",
      exportAs: "ngpTextarea",
      providers: [provideTextareaState()],
      host: {
        "[id]": "id()",
        "[attr.disabled]": 'disabled() ? "" : null'
      }
    }]
  }], () => [], null);
})();
export {
  NgpTextarea,
  injectTextareaState,
  provideTextareaState
};
//# sourceMappingURL=ng-primitives_textarea.js.map
