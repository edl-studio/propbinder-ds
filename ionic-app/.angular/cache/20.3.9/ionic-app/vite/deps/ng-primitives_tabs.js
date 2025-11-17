import {
  setupInteractions
} from "./chunk-A5LILIPV.js";
import {
  FocusMonitor,
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  explicitEffect
} from "./chunk-AHNVSUII.js";
import {
  uniqueId
} from "./chunk-VXVCWHF7.js";
import "./chunk-SQP3BRRN.js";
import "./chunk-YLELG2JA.js";
import "./chunk-NMFEGCZ7.js";
import "./chunk-ALQK544G.js";
import {
  Directionality
} from "./chunk-HLZNGV7I.js";
import "./chunk-7OMPJCAI.js";
import "./chunk-U3ZLLG7Y.js";
import "./chunk-7YT5CE2Y.js";
import {
  Directive,
  ElementRef,
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
} from "./chunk-5OFLYFBL.js";
import {
  __spreadValues
} from "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-roving-focus.mjs
var NgpRovingFocusGroupStateToken = createStateToken("RovingFocusGroup");
var provideRovingFocusGroupState = createStateProvider(NgpRovingFocusGroupStateToken);
var injectRovingFocusGroupState = createStateInjector(NgpRovingFocusGroupStateToken);
var rovingFocusGroupState = createState(NgpRovingFocusGroupStateToken);
var NgpRovingFocusGroupToken = new InjectionToken("NgpRovingFocusGroupToken");
function injectRovingFocusGroup() {
  return inject(NgpRovingFocusGroupToken);
}
function provideRovingFocusGroup(type, {
  inherit = true
} = {}) {
  return {
    provide: NgpRovingFocusGroupToken,
    // Roving focus groups may be nested, in this case, the parent group should be used
    useFactory: () => {
      if (!inherit) {
        return inject(type, {
          self: true
        });
      }
      return inject(NgpRovingFocusGroupToken, {
        skipSelf: true,
        optional: true
      }) ?? inject(type, {
        self: true
      });
    }
  };
}
var _NgpRovingFocusGroup = class _NgpRovingFocusGroup {
  constructor() {
    this.directionality = inject(Directionality);
    this.orientation = input("vertical", {
      alias: "ngpRovingFocusGroupOrientation"
    });
    this.wrap = input(true, {
      alias: "ngpRovingFocusGroupWrap",
      transform: booleanAttribute
    });
    this.homeEnd = input(true, {
      alias: "ngpRovingFocusGroupHomeEnd",
      transform: booleanAttribute
    });
    this.disabled = input(false, {
      alias: "ngpRovingFocusGroupDisabled",
      transform: booleanAttribute
    });
    this.items = signal([]);
    this.activeItem = signal(null);
    this.state = rovingFocusGroupState(this);
  }
  /**
   * Get the items in the roving focus group sorted by order.
   */
  get sortedItems() {
    return this.items().sort((a, b) => {
      return a.elementRef.nativeElement.compareDocumentPosition(b.elementRef.nativeElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
    });
  }
  /**
   * Register an item with the roving focus group.
   * @param item The item to register
   * @internal
   */
  register(item) {
    this.items.update((items) => [...items, item]);
    if (!this.activeItem()) {
      this.activeItem.set(item);
    }
  }
  /**
   * Unregister an item with the roving focus group.
   * @param item The item to unregister
   * @internal
   */
  unregister(item) {
    this.items.update((items) => items.filter((i) => i !== item));
    if (this.activeItem() === item) {
      this.activeItem.set(this.items()[0] ?? null);
    }
  }
  /**
   * Activate an item in the roving focus group.
   * @param item The item to activate
   * @param origin The origin of the focus change
   */
  setActiveItem(item, origin = "program") {
    this.activeItem.set(item);
    item?.focus(origin);
  }
  /**
   * Activate the first item in the roving focus group.
   * @param origin The origin of the focus change
   */
  activateFirstItem(origin) {
    const item = this.sortedItems.find((i) => !i.disabled()) ?? null;
    this.setActiveItem(item, origin);
  }
  /**
   * Activate the last item in the roving focus group.
   * @param origin The origin of the focus change
   */
  activateLastItem(origin) {
    const item = [...this.sortedItems].reverse().find((i) => !i.disabled()) ?? null;
    this.setActiveItem(item, origin);
  }
  /**
   * Activate the next item in the roving focus group.
   * @param origin The origin of the focus change
   */
  activateNextItem(origin) {
    const activeItem = this.activeItem();
    if (!activeItem) {
      this.activateFirstItem(origin);
      return;
    }
    const index = this.sortedItems.indexOf(activeItem);
    const item = this.sortedItems.slice(index + 1).find((i) => !i.disabled()) ?? null;
    if (!item && this.state.wrap()) {
      this.activateFirstItem(origin);
      return;
    }
    if (!item) {
      return;
    }
    this.setActiveItem(item, origin);
  }
  /**
   * Activate the previous item in the roving focus group.
   * @param origin The origin of the focus change
   */
  activatePreviousItem(origin) {
    const activeItem = this.activeItem();
    if (!activeItem) {
      this.activateLastItem(origin);
      return;
    }
    const index = this.sortedItems.indexOf(activeItem);
    const item = this.sortedItems.slice(0, index).reverse().find((i) => !i.disabled()) ?? null;
    if (!item && this.state.wrap()) {
      this.activateLastItem(origin);
      return;
    }
    if (!item) {
      return;
    }
    this.setActiveItem(item, origin);
  }
  /**
   * Handle keyboard navigation for the roving focus group.
   * @param event The keyboard event
   * @internal
   */
  onKeydown(event) {
    if (this.state.disabled()) {
      return;
    }
    switch (event.key) {
      case "ArrowUp":
        if (this.state.orientation() === "vertical") {
          event.preventDefault();
          this.activatePreviousItem("keyboard");
        }
        break;
      case "ArrowDown":
        if (this.state.orientation() === "vertical") {
          event.preventDefault();
          this.activateNextItem("keyboard");
        }
        break;
      case "ArrowLeft":
        if (this.state.orientation() === "horizontal") {
          event.preventDefault();
          if (this.directionality.value === "ltr") {
            this.activatePreviousItem("keyboard");
          } else {
            this.activateNextItem("keyboard");
          }
        }
        break;
      case "ArrowRight":
        if (this.state.orientation() === "horizontal") {
          event.preventDefault();
          if (this.directionality.value === "ltr") {
            this.activateNextItem("keyboard");
          } else {
            this.activatePreviousItem("keyboard");
          }
        }
        break;
      case "Home":
        if (this.state.homeEnd()) {
          event.preventDefault();
          this.activateFirstItem("keyboard");
        }
        break;
      case "End":
        if (this.state.homeEnd()) {
          event.preventDefault();
          this.activateLastItem("keyboard");
        }
        break;
    }
  }
};
_NgpRovingFocusGroup.ɵfac = function NgpRovingFocusGroup_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpRovingFocusGroup)();
};
_NgpRovingFocusGroup.ɵdir = ɵɵdefineDirective({
  type: _NgpRovingFocusGroup,
  selectors: [["", "ngpRovingFocusGroup", ""]],
  inputs: {
    orientation: [1, "ngpRovingFocusGroupOrientation", "orientation"],
    wrap: [1, "ngpRovingFocusGroupWrap", "wrap"],
    homeEnd: [1, "ngpRovingFocusGroupHomeEnd", "homeEnd"],
    disabled: [1, "ngpRovingFocusGroupDisabled", "disabled"]
  },
  exportAs: ["ngpRovingFocusGroup"],
  features: [ɵɵProvidersFeature([provideRovingFocusGroup(_NgpRovingFocusGroup), provideRovingFocusGroupState()])]
});
var NgpRovingFocusGroup = _NgpRovingFocusGroup;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpRovingFocusGroup, [{
    type: Directive,
    args: [{
      selector: "[ngpRovingFocusGroup]",
      exportAs: "ngpRovingFocusGroup",
      providers: [provideRovingFocusGroup(NgpRovingFocusGroup), provideRovingFocusGroupState()]
    }]
  }], null, null);
})();
var _NgpRovingFocusItem = class _NgpRovingFocusItem {
  constructor() {
    this.group = injectRovingFocusGroup();
    this.focusMonitor = inject(FocusMonitor);
    this.elementRef = inject(ElementRef);
    this.disabled = input(false, {
      alias: "ngpRovingFocusItemDisabled",
      transform: booleanAttribute
    });
    this.tabindex = computed(() => !this.group.disabled() && this.group.activeItem() === this ? 0 : -1);
  }
  /**
   * Initialize the roving focus item.
   */
  ngOnInit() {
    this.group.register(this);
  }
  /**
   * Clean up the roving focus item.
   */
  ngOnDestroy() {
    this.group.unregister(this);
  }
  /**
   * Forward the keydown event to the roving focus group.
   * @param event The keyboard event
   */
  onKeydown(event) {
    if (this.disabled()) {
      return;
    }
    this.group.onKeydown(event);
  }
  /**
   * Activate the roving focus item on click.
   */
  activate() {
    if (this.disabled()) {
      return;
    }
    this.group.setActiveItem(this, "mouse");
  }
  /**
   * Focus the roving focus item.
   * @param origin The origin of the focus
   */
  focus(origin) {
    this.focusMonitor.focusVia(this.elementRef, origin);
  }
};
_NgpRovingFocusItem.ɵfac = function NgpRovingFocusItem_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpRovingFocusItem)();
};
_NgpRovingFocusItem.ɵdir = ɵɵdefineDirective({
  type: _NgpRovingFocusItem,
  selectors: [["", "ngpRovingFocusItem", ""]],
  hostVars: 1,
  hostBindings: function NgpRovingFocusItem_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown", function NgpRovingFocusItem_keydown_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      })("click", function NgpRovingFocusItem_click_HostBindingHandler() {
        return ctx.activate();
      });
    }
    if (rf & 2) {
      ɵɵattribute("tabindex", ctx.tabindex());
    }
  },
  inputs: {
    disabled: [1, "ngpRovingFocusItemDisabled", "disabled"]
  },
  exportAs: ["ngpRovingFocusItem"]
});
var NgpRovingFocusItem = _NgpRovingFocusItem;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpRovingFocusItem, [{
    type: Directive,
    args: [{
      selector: "[ngpRovingFocusItem]",
      exportAs: "ngpRovingFocusItem",
      host: {
        "[attr.tabindex]": "tabindex()"
      }
    }]
  }], null, {
    onKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }],
    activate: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();

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
