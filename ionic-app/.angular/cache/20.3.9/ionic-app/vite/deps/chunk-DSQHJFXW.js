import {
  FocusMonitor,
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken
} from "./chunk-WE5NZ3WV.js";
import {
  Directionality
} from "./chunk-Q4CR4ILL.js";
import {
  Directive,
  ElementRef,
  HostListener,
  InjectionToken,
  booleanAttribute,
  computed,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵlistener
} from "./chunk-V52YD5AQ.js";

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

export {
  injectRovingFocusGroupState,
  NgpRovingFocusGroup,
  NgpRovingFocusItem
};
//# sourceMappingURL=chunk-DSQHJFXW.js.map
