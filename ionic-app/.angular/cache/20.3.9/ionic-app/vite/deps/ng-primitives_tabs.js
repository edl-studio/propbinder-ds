import {
  NgpRovingFocusGroup,
  NgpRovingFocusItem,
  injectRovingFocusGroupState
} from "./chunk-DSQHJFXW.js";
import {
  setupInteractions
} from "./chunk-X32LIKXQ.js";
import {
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  explicitEffect
} from "./chunk-WE5NZ3WV.js";
import {
  uniqueId
} from "./chunk-FYRG6RZJ.js";
import "./chunk-O5JGTJFR.js";
import "./chunk-ALQK544G.js";
import "./chunk-YLELG2JA.js";
import "./chunk-Q4CR4ILL.js";
import "./chunk-BADZCE2L.js";
import "./chunk-7P4ZKDVH.js";
import {
  Directive,
  HOST_TAG_NAME,
  HostListener,
  InjectionToken,
  booleanAttribute,
  computed,
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
} from "./chunk-V52YD5AQ.js";
import {
  __spreadValues
} from "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-tabs.mjs
var defaultTabsConfig = {
  orientation: "horizontal",
  activateOnFocus: true,
  wrap: true
};
var NgpTabsConfigToken = new InjectionToken("NgpTabsConfigToken");
function provideTabsConfig(config) {
  return [{
    provide: NgpTabsConfigToken,
    useValue: __spreadValues(__spreadValues({}, defaultTabsConfig), config)
  }];
}
function injectTabsConfig() {
  return inject(NgpTabsConfigToken, {
    optional: true
  }) ?? defaultTabsConfig;
}
var NgpTabsetStateToken = createStateToken("Tabset");
var provideTabsetState = createStateProvider(NgpTabsetStateToken);
var injectTabsetState = createStateInjector(NgpTabsetStateToken);
var tabsetState = createState(NgpTabsetStateToken);
var _NgpTabButton = class _NgpTabButton {
  constructor() {
    this.tagName = inject(HOST_TAG_NAME);
    this.state = injectTabsetState();
    this.value = input(void 0, {
      alias: "ngpTabButtonValue"
    });
    this.disabled = input(false, {
      alias: "ngpTabButtonDisabled",
      transform: booleanAttribute
    });
    this.id = input();
    this.buttonId = computed(() => this.id() ?? `${this.state().id()}-button-${this.value()}`);
    this.ariaControls = computed(() => `${this.state().id()}-panel-${this.value()}`);
    this.active = computed(() => this.state().selectedTab() === this.value());
    this.state().registerTab(this);
    setupInteractions({
      hover: true,
      press: true,
      focusVisible: true,
      disabled: this.disabled
    });
  }
  ngOnInit() {
    if (this.value() === void 0) {
      throw new Error("ngpTabButton: value is required");
    }
  }
  ngOnDestroy() {
    this.state().unregisterTab(this);
  }
  /**
   * Select the tab this trigger controls
   */
  select() {
    if (this.disabled() === false) {
      this.state().select(this.value());
    }
  }
  /**
   * On focus select the tab this trigger controls if activateOnFocus is true
   */
  activateOnFocus() {
    if (this.state().activateOnFocus()) {
      this.select();
    }
  }
};
_NgpTabButton.ɵfac = function NgpTabButton_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpTabButton)();
};
_NgpTabButton.ɵdir = ɵɵdefineDirective({
  type: _NgpTabButton,
  selectors: [["", "ngpTabButton", ""]],
  hostAttrs: ["role", "tab"],
  hostVars: 6,
  hostBindings: function NgpTabButton_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpTabButton_click_HostBindingHandler() {
        return ctx.select();
      })("focus", function NgpTabButton_focus_HostBindingHandler() {
        return ctx.activateOnFocus();
      });
    }
    if (rf & 2) {
      ɵɵattribute("id", ctx.buttonId())("aria-controls", ctx.ariaControls())("data-active", ctx.active() ? "" : null)("data-disabled", ctx.disabled() ? "" : null)("disabled", ctx.tagName === "button" && ctx.disabled() ? "" : null)("data-orientation", ctx.state().orientation());
    }
  },
  inputs: {
    value: [1, "ngpTabButtonValue", "value"],
    disabled: [1, "ngpTabButtonDisabled", "disabled"],
    id: [1, "id"]
  },
  exportAs: ["ngpTabButton"],
  features: [ɵɵHostDirectivesFeature([{
    directive: NgpRovingFocusItem,
    inputs: ["ngpRovingFocusItemDisabled", "ngpTabButtonDisabled"]
  }])]
});
var NgpTabButton = _NgpTabButton;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpTabButton, [{
    type: Directive,
    args: [{
      selector: "[ngpTabButton]",
      exportAs: "ngpTabButton",
      host: {
        role: "tab",
        "[attr.id]": "buttonId()",
        "[attr.aria-controls]": "ariaControls()",
        "[attr.data-active]": 'active() ? "" : null',
        "[attr.data-disabled]": 'disabled() ? "" : null',
        "[attr.disabled]": 'tagName === "button" && disabled() ? "" : null',
        "[attr.data-orientation]": "state().orientation()"
      },
      hostDirectives: [{
        directive: NgpRovingFocusItem,
        inputs: ["ngpRovingFocusItemDisabled: ngpTabButtonDisabled"]
      }]
    }]
  }], () => [], {
    select: [{
      type: HostListener,
      args: ["click"]
    }],
    activateOnFocus: [{
      type: HostListener,
      args: ["focus"]
    }]
  });
})();
var _NgpTabList = class _NgpTabList {
  constructor() {
    this.state = injectTabsetState();
  }
};
_NgpTabList.ɵfac = function NgpTabList_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpTabList)();
};
_NgpTabList.ɵdir = ɵɵdefineDirective({
  type: _NgpTabList,
  selectors: [["", "ngpTabList", ""]],
  hostAttrs: ["role", "tablist"],
  hostVars: 2,
  hostBindings: function NgpTabList_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("aria-orientation", ctx.state().orientation())("data-orientation", ctx.state().orientation());
    }
  },
  exportAs: ["ngpTabList"]
});
var NgpTabList = _NgpTabList;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpTabList, [{
    type: Directive,
    args: [{
      selector: "[ngpTabList]",
      exportAs: "ngpTabList",
      host: {
        role: "tablist",
        "[attr.aria-orientation]": "state().orientation()",
        "[attr.data-orientation]": "state().orientation()"
      }
    }]
  }], null, null);
})();
var NgpTabPanelToken = new InjectionToken("NgpTabPanelToken");
function injectTabPanel() {
  return inject(NgpTabPanelToken);
}
var _NgpTabPanel = class _NgpTabPanel {
  constructor() {
    this.state = injectTabsetState();
    this.value = input(void 0, {
      alias: "ngpTabPanelValue"
    });
    this.id = input();
    this.panelId = computed(() => this.id() ?? `${this.state().id()}-panel-${this.value()}`);
    this.labelledBy = computed(() => `${this.state().id()}-button-${this.value()}`);
    this.active = computed(() => this.state().selectedTab() === this.value());
  }
  ngOnInit() {
    if (this.value() === void 0) {
      throw new Error("ngpTabPanel: value is required");
    }
  }
};
_NgpTabPanel.ɵfac = function NgpTabPanel_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpTabPanel)();
};
_NgpTabPanel.ɵdir = ɵɵdefineDirective({
  type: _NgpTabPanel,
  selectors: [["", "ngpTabPanel", ""]],
  hostAttrs: ["role", "tabpanel", "tabIndex", "0"],
  hostVars: 4,
  hostBindings: function NgpTabPanel_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.panelId());
      ɵɵattribute("aria-labelledby", ctx.labelledBy())("data-active", ctx.active() ? "" : null)("data-orientation", ctx.state().orientation());
    }
  },
  inputs: {
    value: [1, "ngpTabPanelValue", "value"],
    id: [1, "id"]
  },
  exportAs: ["ngpTabPanel"],
  features: [ɵɵProvidersFeature([{
    provide: NgpTabPanelToken,
    useExisting: _NgpTabPanel
  }])]
});
var NgpTabPanel = _NgpTabPanel;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpTabPanel, [{
    type: Directive,
    args: [{
      selector: "[ngpTabPanel]",
      exportAs: "ngpTabPanel",
      providers: [{
        provide: NgpTabPanelToken,
        useExisting: NgpTabPanel
      }],
      host: {
        role: "tabpanel",
        tabIndex: "0",
        "[id]": "panelId()",
        "[attr.aria-labelledby]": "labelledBy()",
        "[attr.data-active]": 'active() ? "" : null',
        "[attr.data-orientation]": "state().orientation()"
      }
    }]
  }], null, null);
})();
var _NgpTabset = class _NgpTabset {
  constructor() {
    this.config = injectTabsConfig();
    this.rovingFocusGroupState = injectRovingFocusGroupState();
    this.id = input(uniqueId("ngp-tabset"));
    this.value = input(void 0, {
      alias: "ngpTabsetValue"
    });
    this.valueChange = output({
      alias: "ngpTabsetValueChange"
    });
    this.orientation = input(this.config.orientation, {
      alias: "ngpTabsetOrientation"
    });
    this.activateOnFocus = input(this.config.activateOnFocus, {
      alias: "ngpTabsetActivateOnFocus",
      transform: booleanAttribute
    });
    this.buttons = signal([]);
    this.selectedTab = computed(() => {
      const buttons = this.buttons();
      if (buttons.length === 0 || buttons.some((button) => button.value() === this.state.value())) {
        return this.state.value();
      }
      return buttons.find((button) => !button.disabled())?.value();
    });
    this.state = tabsetState(this);
    explicitEffect([this.state.orientation], ([orientation]) => this.rovingFocusGroupState().orientation.set(orientation));
  }
  /**
   * Select a tab by its value
   * @param value The value of the tab to select
   */
  select(value) {
    if (this.state.value() === value) {
      return;
    }
    this.state.value.set(value);
    this.valueChange.emit(value);
  }
  /**
   * @internal
   * Register a tab with the tabset
   */
  registerTab(tab) {
    this.buttons.update((buttons) => [...buttons, tab]);
  }
  /**
   * @internal
   * Unregister a tab with the tabset
   */
  unregisterTab(tab) {
    this.buttons.update((buttons) => buttons.filter((button) => button !== tab));
  }
};
_NgpTabset.ɵfac = function NgpTabset_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpTabset)();
};
_NgpTabset.ɵdir = ɵɵdefineDirective({
  type: _NgpTabset,
  selectors: [["", "ngpTabset", ""]],
  hostVars: 2,
  hostBindings: function NgpTabset_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("id", ctx.state.id())("data-orientation", ctx.state.orientation());
    }
  },
  inputs: {
    id: [1, "id"],
    value: [1, "ngpTabsetValue", "value"],
    orientation: [1, "ngpTabsetOrientation", "orientation"],
    activateOnFocus: [1, "ngpTabsetActivateOnFocus", "activateOnFocus"]
  },
  outputs: {
    valueChange: "ngpTabsetValueChange"
  },
  exportAs: ["ngpTabset"],
  features: [ɵɵProvidersFeature([provideTabsetState()]), ɵɵHostDirectivesFeature([NgpRovingFocusGroup])]
});
var NgpTabset = _NgpTabset;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpTabset, [{
    type: Directive,
    args: [{
      selector: "[ngpTabset]",
      exportAs: "ngpTabset",
      providers: [provideTabsetState()],
      hostDirectives: [NgpRovingFocusGroup],
      host: {
        "[attr.id]": "state.id()",
        "[attr.data-orientation]": "state.orientation()"
      }
    }]
  }], () => [], null);
})();
export {
  NgpTabButton,
  NgpTabList,
  NgpTabPanel,
  NgpTabPanelToken,
  NgpTabset,
  injectTabPanel,
  injectTabsetState,
  provideTabsConfig,
  provideTabsetState
};
//# sourceMappingURL=ng-primitives_tabs.js.map
