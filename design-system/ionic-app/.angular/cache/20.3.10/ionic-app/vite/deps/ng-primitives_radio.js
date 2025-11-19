import {
  NgpRovingFocusGroup,
  NgpRovingFocusItem,
  injectRovingFocusGroupState
} from "./chunk-HYOKO4OJ.js";
import {
  setupFormControl
} from "./chunk-T5OXJ2NG.js";
import {
  NgpFocusVisible,
  NgpHover,
  NgpPress
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
import "./chunk-GMOFOGO5.js";
import "./chunk-53KHQLJJ.js";
import "./chunk-RQY3LDOR.js";
import "./chunk-ILS3C6C2.js";
import {
  Directive,
  HostListener,
  booleanAttribute,
  computed,
  input,
  output,
  setClassMetadata,
  ɵɵHostDirectivesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵdomProperty,
  ɵɵlistener
} from "./chunk-JIIPHG5Y.js";
import "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-radio.mjs
var NgpRadioGroupStateToken = createStateToken("RadioGroup");
var provideRadioGroupState = createStateProvider(NgpRadioGroupStateToken);
var injectRadioGroupState = createStateInjector(NgpRadioGroupStateToken);
var radioGroupState = createState(NgpRadioGroupStateToken);
var _NgpRadioGroup = class _NgpRadioGroup {
  constructor() {
    this.rovingFocusGroupState = injectRovingFocusGroupState();
    this.id = input(uniqueId("ngp-radio-group"));
    this.value = input(null, {
      alias: "ngpRadioGroupValue"
    });
    this.valueChange = output({
      alias: "ngpRadioGroupValueChange"
    });
    this.disabled = input(false, {
      alias: "ngpRadioGroupDisabled",
      transform: booleanAttribute
    });
    this.orientation = input("horizontal", {
      alias: "ngpRadioGroupOrientation"
    });
    this.compareWith = input((a, b) => a === b, {
      alias: "ngpRadioGroupCompareWith"
    });
    this.state = radioGroupState(this);
    setupFormControl({
      id: this.state.id,
      disabled: this.state.disabled
    });
  }
  ngOnInit() {
    this.rovingFocusGroupState().orientation.set(this.state.orientation());
  }
  /**
   * Select a radio item.
   * @param value The value of the radio item to select.
   */
  select(value) {
    if (this.state.compareWith()(this.state.value(), value)) {
      return;
    }
    this.state.value.set(value);
    this.valueChange.emit(value);
  }
};
_NgpRadioGroup.ɵfac = function NgpRadioGroup_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpRadioGroup)();
};
_NgpRadioGroup.ɵdir = ɵɵdefineDirective({
  type: _NgpRadioGroup,
  selectors: [["", "ngpRadioGroup", ""]],
  hostAttrs: ["role", "radiogroup"],
  hostVars: 4,
  hostBindings: function NgpRadioGroup_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
      ɵɵattribute("aria-orientation", ctx.state.orientation())("data-orientation", ctx.state.orientation())("data-disabled", ctx.state.disabled() ? "" : null);
    }
  },
  inputs: {
    id: [1, "id"],
    value: [1, "ngpRadioGroupValue", "value"],
    disabled: [1, "ngpRadioGroupDisabled", "disabled"],
    orientation: [1, "ngpRadioGroupOrientation", "orientation"],
    compareWith: [1, "ngpRadioGroupCompareWith", "compareWith"]
  },
  outputs: {
    valueChange: "ngpRadioGroupValueChange"
  },
  features: [ɵɵProvidersFeature([provideRadioGroupState()]), ɵɵHostDirectivesFeature([{
    directive: NgpRovingFocusGroup,
    inputs: ["ngpRovingFocusGroupOrientation", "ngpRadioGroupOrientation", "ngpRovingFocusGroupDisabled", "ngpRadioGroupDisabled"]
  }])]
});
var NgpRadioGroup = _NgpRadioGroup;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpRadioGroup, [{
    type: Directive,
    args: [{
      selector: "[ngpRadioGroup]",
      providers: [provideRadioGroupState()],
      hostDirectives: [{
        directive: NgpRovingFocusGroup,
        inputs: ["ngpRovingFocusGroupOrientation:ngpRadioGroupOrientation", "ngpRovingFocusGroupDisabled:ngpRadioGroupDisabled"]
      }],
      host: {
        role: "radiogroup",
        "[id]": "id()",
        "[attr.aria-orientation]": "state.orientation()",
        "[attr.data-orientation]": "state.orientation()",
        "[attr.data-disabled]": 'state.disabled() ? "" : null'
      }
    }]
  }], () => [], null);
})();
var NgpRadioItemStateToken = createStateToken("RadioItem");
var provideRadioItemState = createStateProvider(NgpRadioItemStateToken);
var injectRadioItemState = createStateInjector(NgpRadioItemStateToken);
var radioItemState = createState(NgpRadioItemStateToken);
var _NgpRadioIndicator = class _NgpRadioIndicator {
  constructor() {
    this.radioGroupState = injectRadioGroupState();
    this.radioItemState = injectRadioItemState();
    this.checked = computed(() => this.radioGroupState().value() === this.radioItemState().value());
  }
};
_NgpRadioIndicator.ɵfac = function NgpRadioIndicator_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpRadioIndicator)();
};
_NgpRadioIndicator.ɵdir = ɵɵdefineDirective({
  type: _NgpRadioIndicator,
  selectors: [["", "ngpRadioIndicator", ""]],
  hostVars: 2,
  hostBindings: function NgpRadioIndicator_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("data-checked", ctx.checked() ? "" : null)("data-disabled", ctx.radioItemState().disabled() ? "" : null);
    }
  },
  features: [ɵɵHostDirectivesFeature([NgpHover, NgpPress])]
});
var NgpRadioIndicator = _NgpRadioIndicator;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpRadioIndicator, [{
    type: Directive,
    args: [{
      selector: "[ngpRadioIndicator]",
      host: {
        "[attr.data-checked]": 'checked() ? "" : null',
        "[attr.data-disabled]": 'radioItemState().disabled() ? "" : null'
      },
      hostDirectives: [NgpHover, NgpPress]
    }]
  }], null, null);
})();
var _NgpRadioItem = class _NgpRadioItem {
  constructor() {
    this.radioGroupState = injectRadioGroupState();
    this.value = input(void 0, {
      alias: "ngpRadioItemValue"
    });
    this.disabled = input(false, {
      alias: "ngpRadioItemDisabled",
      transform: booleanAttribute
    });
    this.checked = computed(() => this.radioGroupState().compareWith()(this.radioGroupState().value(), this.state.value()));
    this.state = radioItemState(this);
  }
  ngOnInit() {
    if (this.state.value() === void 0) {
      throw new Error("The `ngpRadioItem` directive requires a `value` input.");
    }
  }
  /**
   * When the item receives focus, select it.
   * @internal
   */
  onFocus() {
    this.radioGroupState().select(this.state.value());
  }
  /**
   * When the item receives a click, select it.
   * @internal
   */
  onClick() {
    this.radioGroupState().select(this.state.value());
  }
};
_NgpRadioItem.ɵfac = function NgpRadioItem_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpRadioItem)();
};
_NgpRadioItem.ɵdir = ɵɵdefineDirective({
  type: _NgpRadioItem,
  selectors: [["", "ngpRadioItem", ""]],
  hostAttrs: ["role", "radio"],
  hostVars: 3,
  hostBindings: function NgpRadioItem_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("focus", function NgpRadioItem_focus_HostBindingHandler() {
        return ctx.onFocus();
      })("click", function NgpRadioItem_click_HostBindingHandler() {
        return ctx.onClick();
      });
    }
    if (rf & 2) {
      ɵɵattribute("aria-checked", ctx.checked() ? "true" : "false")("data-disabled", ctx.state.disabled() ? "" : null)("data-checked", ctx.checked() ? "" : null);
    }
  },
  inputs: {
    value: [1, "ngpRadioItemValue", "value"],
    disabled: [1, "ngpRadioItemDisabled", "disabled"]
  },
  features: [ɵɵProvidersFeature([provideRadioItemState()]), ɵɵHostDirectivesFeature([NgpRovingFocusItem, NgpHover, NgpFocusVisible, NgpPress])]
});
var NgpRadioItem = _NgpRadioItem;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpRadioItem, [{
    type: Directive,
    args: [{
      selector: "[ngpRadioItem]",
      hostDirectives: [NgpRovingFocusItem, NgpHover, NgpFocusVisible, NgpPress],
      providers: [provideRadioItemState()],
      host: {
        role: "radio",
        "[attr.aria-checked]": 'checked() ? "true" : "false"',
        "[attr.data-disabled]": 'state.disabled() ? "" : null',
        "[attr.data-checked]": 'checked() ? "" : null'
      }
    }]
  }], null, {
    onFocus: [{
      type: HostListener,
      args: ["focus"]
    }],
    onClick: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
export {
  NgpRadioGroup,
  NgpRadioIndicator,
  NgpRadioItem,
  injectRadioGroupState,
  injectRadioItemState,
  provideRadioGroupState,
  provideRadioItemState
};
//# sourceMappingURL=ng-primitives_radio.js.map
