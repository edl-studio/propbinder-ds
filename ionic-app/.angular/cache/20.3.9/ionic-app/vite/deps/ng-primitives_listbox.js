import {
  NgpFocusTrap
} from "./chunk-VI7DYHDS.js";
import {
  createOverlay,
  injectOverlay,
  setupOverlayArrow
} from "./chunk-3IZ6YSMQ.js";
import {
  setupInteractions
} from "./chunk-X32LIKXQ.js";
import {
  ActiveDescendantKeyManager,
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  explicitEffect,
  injectElementRef,
  onDomRemoval,
  scrollIntoViewIfNeeded,
  setupFocusVisible
} from "./chunk-WE5NZ3WV.js";
import {
  safeTakeUntilDestroyed,
  uniqueId
} from "./chunk-FYRG6RZJ.js";
import "./chunk-O5JGTJFR.js";
import "./chunk-JQYZCTGU.js";
import "./chunk-ALQK544G.js";
import "./chunk-YLELG2JA.js";
import "./chunk-3WNF3QYK.js";
import "./chunk-Q4CR4ILL.js";
import "./chunk-BADZCE2L.js";
import "./chunk-7P4ZKDVH.js";
import {
  DestroyRef,
  Directive,
  HostListener,
  InjectionToken,
  Injector,
  ViewContainerRef,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  numberAttribute,
  output,
  setClassMetadata,
  signal,
  ɵɵHostDirectivesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵcontentQuerySignal,
  ɵɵdefineDirective,
  ɵɵdomProperty,
  ɵɵlistener,
  ɵɵqueryAdvance,
  ɵɵstyleProp
} from "./chunk-V52YD5AQ.js";
import {
  __async
} from "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-common.mjs
var NgpHeaderToken = new InjectionToken("NgpHeaderToken");
var _NgpHeader = class _NgpHeader {
  constructor() {
    this.id = input(uniqueId("ngp-header"));
    if (ngDevMode) {
      console.warn(`NgpHeader is deprecated and will be removed in a future version. Please use NgpListboxHeader instead.`);
    }
  }
};
_NgpHeader.ɵfac = function NgpHeader_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpHeader)();
};
_NgpHeader.ɵdir = ɵɵdefineDirective({
  type: _NgpHeader,
  selectors: [["", "ngpHeader", ""]],
  hostAttrs: ["role", "presentation"],
  hostVars: 1,
  hostBindings: function NgpHeader_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("id", ctx.id());
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpHeader"],
  features: [ɵɵProvidersFeature([{
    provide: NgpHeaderToken,
    useExisting: _NgpHeader
  }])]
});
var NgpHeader = _NgpHeader;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpHeader, [{
    type: Directive,
    args: [{
      selector: "[ngpHeader]",
      exportAs: "ngpHeader",
      providers: [{
        provide: NgpHeaderToken,
        useExisting: NgpHeader
      }],
      host: {
        role: "presentation",
        "[attr.id]": "id()"
      }
    }]
  }], () => [], null);
})();

// node_modules/ng-primitives/fesm2022/ng-primitives-popover.mjs
var defaultPopoverConfig = {
  offset: 4,
  placement: "bottom",
  showDelay: 0,
  hideDelay: 0,
  flip: true,
  container: "body",
  closeOnOutsideClick: true,
  closeOnEscape: true,
  scrollBehavior: "reposition"
};
var NgpPopoverConfigToken = new InjectionToken("NgpPopoverConfigToken");
function injectPopoverConfig() {
  return inject(NgpPopoverConfigToken, {
    optional: true
  }) ?? defaultPopoverConfig;
}
var _NgpPopoverArrow = class _NgpPopoverArrow {
  constructor() {
    setupOverlayArrow();
  }
};
_NgpPopoverArrow.ɵfac = function NgpPopoverArrow_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpPopoverArrow)();
};
_NgpPopoverArrow.ɵdir = ɵɵdefineDirective({
  type: _NgpPopoverArrow,
  selectors: [["", "ngpPopoverArrow", ""]],
  exportAs: ["ngpPopoverArrow"]
});
var NgpPopoverArrow = _NgpPopoverArrow;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpPopoverArrow, [{
    type: Directive,
    args: [{
      selector: "[ngpPopoverArrow]",
      exportAs: "ngpPopoverArrow"
    }]
  }], () => [], null);
})();
var NgpPopoverTriggerStateToken = createStateToken("PopoverTrigger");
var providePopoverTriggerState = createStateProvider(NgpPopoverTriggerStateToken);
var injectPopoverTriggerState = createStateInjector(NgpPopoverTriggerStateToken);
var popoverTriggerState = createState(NgpPopoverTriggerStateToken);
var _NgpPopoverTrigger = class _NgpPopoverTrigger {
  constructor() {
    this.trigger = injectElementRef();
    this.injector = inject(Injector);
    this.viewContainerRef = inject(ViewContainerRef);
    this.config = injectPopoverConfig();
    this.popover = input(void 0, {
      alias: "ngpPopoverTrigger"
    });
    this.disabled = input(false, {
      alias: "ngpPopoverTriggerDisabled",
      transform: booleanAttribute
    });
    this.placement = input(this.config.placement, {
      alias: "ngpPopoverTriggerPlacement"
    });
    this.offset = input(this.config.offset, {
      alias: "ngpPopoverTriggerOffset",
      transform: numberAttribute
    });
    this.showDelay = input(this.config.showDelay, {
      alias: "ngpPopoverTriggerShowDelay",
      transform: numberAttribute
    });
    this.hideDelay = input(this.config.hideDelay, {
      alias: "ngpPopoverTriggerHideDelay",
      transform: numberAttribute
    });
    this.flip = input(this.config.flip, {
      alias: "ngpPopoverTriggerFlip",
      transform: booleanAttribute
    });
    this.container = input(this.config.container, {
      alias: "ngpPopoverTriggerContainer"
    });
    this.closeOnOutsideClick = input(this.config.closeOnOutsideClick, {
      alias: "ngpPopoverTriggerCloseOnOutsideClick",
      transform: booleanAttribute
    });
    this.closeOnEscape = input(this.config.closeOnEscape, {
      alias: "ngpPopoverTriggerCloseOnEscape",
      transform: booleanAttribute
    });
    this.scrollBehavior = input(this.config.scrollBehavior, {
      alias: "ngpPopoverTriggerScrollBehavior"
    });
    this.context = input(void 0, {
      alias: "ngpPopoverTriggerContext"
    });
    this.overlay = signal(null);
    this.open = computed(() => this.overlay()?.isOpen() ?? false);
    this.openChange = output({
      alias: "ngpPopoverTriggerOpenChange"
    });
    this.state = popoverTriggerState(this);
  }
  ngOnDestroy() {
    this.overlay()?.destroy();
  }
  toggle(event) {
    if (this.state.disabled()) {
      return;
    }
    const origin = event.detail === 0 ? "keyboard" : "mouse";
    if (this.open()) {
      this.hide(origin);
    } else {
      this.show();
    }
  }
  /**
   * Show the popover.
   * @returns A promise that resolves when the popover has been shown
   */
  show() {
    return __async(this, null, function* () {
      if (this.state.disabled()) {
        return;
      }
      if (!this.overlay()) {
        this.createOverlay();
      }
      yield this.overlay()?.show();
      if (this.open()) {
        this.openChange.emit(true);
      }
    });
  }
  /**
   * @internal
   * Hide the popover.
   * @returns A promise that resolves when the popover has been hidden
   */
  hide(origin = "program") {
    return __async(this, null, function* () {
      if (this.state.disabled() || !this.open()) {
        return;
      }
      yield this.overlay()?.hide({
        origin
      });
      this.openChange.emit(false);
    });
  }
  /**
   * Create the overlay that will contain the popover
   */
  createOverlay() {
    const popover = this.state.popover();
    if (!popover) {
      throw new Error("Popover must be either a TemplateRef or a ComponentType");
    }
    const config = {
      content: popover,
      triggerElement: this.trigger.nativeElement,
      injector: this.injector,
      context: this.state.context,
      container: this.state.container(),
      placement: this.state.placement(),
      offset: this.state.offset(),
      flip: this.state.flip(),
      showDelay: this.state.showDelay(),
      hideDelay: this.state.hideDelay(),
      closeOnOutsideClick: this.state.closeOnOutsideClick(),
      closeOnEscape: this.state.closeOnEscape(),
      restoreFocus: true,
      scrollBehaviour: this.state.scrollBehavior(),
      viewContainerRef: this.viewContainerRef
    };
    this.overlay.set(createOverlay(config));
  }
};
_NgpPopoverTrigger.ɵfac = function NgpPopoverTrigger_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpPopoverTrigger)();
};
_NgpPopoverTrigger.ɵdir = ɵɵdefineDirective({
  type: _NgpPopoverTrigger,
  selectors: [["", "ngpPopoverTrigger", ""]],
  hostVars: 5,
  hostBindings: function NgpPopoverTrigger_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpPopoverTrigger_click_HostBindingHandler($event) {
        return ctx.toggle($event);
      });
    }
    if (rf & 2) {
      let tmp_4_0;
      ɵɵattribute("aria-expanded", ctx.open() ? "true" : "false")("data-open", ctx.open() ? "" : null)("data-placement", ctx.state.placement())("data-disabled", ctx.state.disabled() ? "" : null)("aria-describedby", (tmp_4_0 = ctx.overlay()) == null ? null : tmp_4_0.ariaDescribedBy());
    }
  },
  inputs: {
    popover: [1, "ngpPopoverTrigger", "popover"],
    disabled: [1, "ngpPopoverTriggerDisabled", "disabled"],
    placement: [1, "ngpPopoverTriggerPlacement", "placement"],
    offset: [1, "ngpPopoverTriggerOffset", "offset"],
    showDelay: [1, "ngpPopoverTriggerShowDelay", "showDelay"],
    hideDelay: [1, "ngpPopoverTriggerHideDelay", "hideDelay"],
    flip: [1, "ngpPopoverTriggerFlip", "flip"],
    container: [1, "ngpPopoverTriggerContainer", "container"],
    closeOnOutsideClick: [1, "ngpPopoverTriggerCloseOnOutsideClick", "closeOnOutsideClick"],
    closeOnEscape: [1, "ngpPopoverTriggerCloseOnEscape", "closeOnEscape"],
    scrollBehavior: [1, "ngpPopoverTriggerScrollBehavior", "scrollBehavior"],
    context: [1, "ngpPopoverTriggerContext", "context"]
  },
  outputs: {
    openChange: "ngpPopoverTriggerOpenChange"
  },
  exportAs: ["ngpPopoverTrigger"],
  features: [ɵɵProvidersFeature([providePopoverTriggerState({
    inherit: false
  })])]
});
var NgpPopoverTrigger = _NgpPopoverTrigger;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpPopoverTrigger, [{
    type: Directive,
    args: [{
      selector: "[ngpPopoverTrigger]",
      exportAs: "ngpPopoverTrigger",
      providers: [providePopoverTriggerState({
        inherit: false
      })],
      host: {
        "[attr.aria-expanded]": 'open() ? "true" : "false"',
        "[attr.data-open]": 'open() ? "" : null',
        "[attr.data-placement]": "state.placement()",
        "[attr.data-disabled]": 'state.disabled() ? "" : null',
        "[attr.aria-describedby]": "overlay()?.ariaDescribedBy()",
        "(click)": "toggle($event)"
      }
    }]
  }], null, null);
})();
var _NgpPopover = class _NgpPopover {
  constructor() {
    this.overlay = injectOverlay();
    this.id = input(this.overlay.id());
    explicitEffect([this.id], ([id]) => this.overlay.id.set(id));
  }
};
_NgpPopover.ɵfac = function NgpPopover_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpPopover)();
};
_NgpPopover.ɵdir = ɵɵdefineDirective({
  type: _NgpPopover,
  selectors: [["", "ngpPopover", ""]],
  hostAttrs: ["role", "dialog", "data-overlay", ""],
  hostVars: 10,
  hostBindings: function NgpPopover_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
      ɵɵattribute("data-placement", ctx.overlay.finalPlacement());
      ɵɵstyleProp("left", ctx.overlay.position().x, "px")("top", ctx.overlay.position().y, "px")("--ngp-popover-trigger-width", ctx.overlay.triggerWidth(), "px")("--ngp-popover-transform-origin", ctx.overlay.transformOrigin());
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpPopover"],
  features: [ɵɵHostDirectivesFeature([NgpFocusTrap])]
});
var NgpPopover = _NgpPopover;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpPopover, [{
    type: Directive,
    args: [{
      selector: "[ngpPopover]",
      exportAs: "ngpPopover",
      hostDirectives: [NgpFocusTrap],
      host: {
        role: "dialog",
        "[id]": "id()",
        "[style.left.px]": "overlay.position().x",
        "[style.top.px]": "overlay.position().y",
        "[style.--ngp-popover-trigger-width.px]": "overlay.triggerWidth()",
        "[style.--ngp-popover-transform-origin]": "overlay.transformOrigin()",
        "[attr.data-placement]": "overlay.finalPlacement()",
        "data-overlay": ""
      }
    }]
  }], () => [], null);
})();

// node_modules/ng-primitives/fesm2022/ng-primitives-listbox.mjs
var _NgpListboxHeader = class _NgpListboxHeader {
  constructor() {
    this.id = input(uniqueId("ngp-listbox-header"));
  }
};
_NgpListboxHeader.ɵfac = function NgpListboxHeader_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpListboxHeader)();
};
_NgpListboxHeader.ɵdir = ɵɵdefineDirective({
  type: _NgpListboxHeader,
  selectors: [["", "ngpListboxHeader", ""]],
  hostAttrs: ["role", "presentation"],
  hostVars: 1,
  hostBindings: function NgpListboxHeader_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("id", ctx.id());
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpListboxHeader"],
  features: [ɵɵProvidersFeature([{
    provide: NgpHeaderToken,
    useExisting: _NgpListboxHeader
  }])]
});
var NgpListboxHeader = _NgpListboxHeader;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpListboxHeader, [{
    type: Directive,
    args: [{
      selector: "[ngpListboxHeader]",
      exportAs: "ngpListboxHeader",
      host: {
        role: "presentation",
        "[attr.id]": "id()"
      },
      // temporary until we remove NgpHeader completely - this prevents breaking changes
      providers: [{
        provide: NgpHeaderToken,
        useExisting: NgpListboxHeader
      }]
    }]
  }], null, null);
})();
var NgpListboxStateToken = createStateToken("Listbox");
var provideListboxState = createStateProvider(NgpListboxStateToken);
var injectListboxState = createStateInjector(NgpListboxStateToken, {
  deferred: true
});
var listboxState = createState(NgpListboxStateToken);
var _NgpListboxOption = class _NgpListboxOption {
  /**
   * @internal
   * Whether the option is disabled - this is used by the `Highlightable` interface.
   */
  get disabled() {
    return this._disabled();
  }
  constructor() {
    this.listbox = injectListboxState();
    this.elementRef = injectElementRef();
    this.id = input(uniqueId("ngp-listbox-option"));
    this.value = input.required({
      alias: "ngpListboxOptionValue"
    });
    this.optionDisabled = input(false, {
      alias: "ngpListboxOptionDisabled",
      transform: booleanAttribute
    });
    this.active = signal(false);
    this.selected = computed(() => this.listbox()?.isSelected(this.value()));
    this._disabled = computed(() => this.optionDisabled() || (this.listbox()?.disabled() ?? false));
    setupInteractions({
      hover: true,
      press: true,
      focusVisible: true,
      focus: true,
      disabled: this._disabled
    });
    effect(() => this.listbox()?.addOption(this));
    onDomRemoval(this.elementRef.nativeElement, () => {
      this.listbox()?.removeOption(this);
      this.setInactiveStyles();
    });
  }
  ngOnDestroy() {
    this.listbox()?.removeOption(this);
  }
  /**
   * @internal
   * Sets the active state of the option.
   */
  setActiveStyles() {
    this.active.set(true);
    scrollIntoViewIfNeeded(this.elementRef.nativeElement);
  }
  /**
   * @internal
   * Sets the inactive state of the option.
   */
  setInactiveStyles() {
    this.active.set(false);
  }
  /**
   * @internal
   * Gets the label of the option, used by the `Highlightable` interface.
   */
  getLabel() {
    return this.elementRef.nativeElement.textContent ?? "";
  }
  /**
   * @internal
   * Selects the option.
   */
  select(origin) {
    this.listbox()?.selectOption(this.value(), origin);
  }
  /**
   * @internal
   * Activate the current options.
   */
  activate() {
    if (this._disabled()) {
      return;
    }
    this.listbox()?.activateOption(this.value());
  }
};
_NgpListboxOption.ɵfac = function NgpListboxOption_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpListboxOption)();
};
_NgpListboxOption.ɵdir = ɵɵdefineDirective({
  type: _NgpListboxOption,
  selectors: [["", "ngpListboxOption", ""]],
  hostAttrs: ["role", "option"],
  hostVars: 5,
  hostBindings: function NgpListboxOption_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpListboxOption_click_HostBindingHandler() {
        return ctx.select("mouse");
      })("mouseenter", function NgpListboxOption_mouseenter_HostBindingHandler() {
        return ctx.activate();
      })("keydown.enter", function NgpListboxOption_keydown_enter_HostBindingHandler() {
        return ctx.select("keyboard");
      })("keydown.space", function NgpListboxOption_keydown_space_HostBindingHandler() {
        return ctx.select("keyboard");
      });
    }
    if (rf & 2) {
      let tmp_2_0;
      ɵɵattribute("id", ctx.id())("aria-disabled", ctx.optionDisabled())("data-active", ((tmp_2_0 = ctx.listbox()) == null ? null : tmp_2_0.isFocused()) && ctx.active() ? "" : void 0)("data-selected", ctx.selected() ? "" : void 0)("data-disabled", ctx.optionDisabled() ? "" : void 0);
    }
  },
  inputs: {
    id: [1, "id"],
    value: [1, "ngpListboxOptionValue", "value"],
    optionDisabled: [1, "ngpListboxOptionDisabled", "optionDisabled"]
  },
  exportAs: ["ngpListboxOption"]
});
var NgpListboxOption = _NgpListboxOption;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpListboxOption, [{
    type: Directive,
    args: [{
      selector: "[ngpListboxOption]",
      exportAs: "ngpListboxOption",
      host: {
        role: "option",
        "[attr.id]": "id()",
        "[attr.aria-disabled]": "optionDisabled()",
        "[attr.data-active]": 'listbox()?.isFocused() && active() ? "" : undefined',
        "[attr.data-selected]": 'selected() ? "" : undefined',
        "[attr.data-disabled]": 'optionDisabled() ? "" : undefined',
        "(click)": 'select("mouse")',
        "(mouseenter)": "activate()",
        "(keydown.enter)": 'select("keyboard")',
        "(keydown.space)": 'select("keyboard")'
      }
    }]
  }], () => [], null);
})();
var _NgpListboxSection = class _NgpListboxSection {
  constructor() {
    this.header = contentChild(NgpHeaderToken, {
      descendants: true
    });
  }
};
_NgpListboxSection.ɵfac = function NgpListboxSection_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpListboxSection)();
};
_NgpListboxSection.ɵdir = ɵɵdefineDirective({
  type: _NgpListboxSection,
  selectors: [["", "ngpListboxSection", ""]],
  contentQueries: function NgpListboxSection_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuerySignal(dirIndex, ctx.header, NgpHeaderToken, 5);
    }
    if (rf & 2) {
      ɵɵqueryAdvance();
    }
  },
  hostAttrs: ["role", "group"],
  hostVars: 1,
  hostBindings: function NgpListboxSection_HostBindings(rf, ctx) {
    if (rf & 2) {
      let tmp_0_0;
      ɵɵattribute("aria-labelledby", (tmp_0_0 = ctx.header()) == null ? null : tmp_0_0.id());
    }
  },
  exportAs: ["ngpListboxSection"]
});
var NgpListboxSection = _NgpListboxSection;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpListboxSection, [{
    type: Directive,
    args: [{
      selector: "[ngpListboxSection]",
      exportAs: "ngpListboxSection",
      host: {
        role: "group",
        "[attr.aria-labelledby]": "header()?.id()"
      }
    }]
  }], null, null);
})();
var _NgpListboxTrigger = class _NgpListboxTrigger {
  constructor() {
    this.popoverTrigger = injectPopoverTriggerState();
  }
  /**
   * When the up or down arrow key is pressed, open the popover.
   */
  openPopover(event) {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      this.popoverTrigger().show();
      event.preventDefault();
    }
  }
};
_NgpListboxTrigger.ɵfac = function NgpListboxTrigger_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpListboxTrigger)();
};
_NgpListboxTrigger.ɵdir = ɵɵdefineDirective({
  type: _NgpListboxTrigger,
  selectors: [["", "ngpListboxTrigger", ""]],
  hostBindings: function NgpListboxTrigger_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown", function NgpListboxTrigger_keydown_HostBindingHandler($event) {
        return ctx.openPopover($event);
      });
    }
  },
  exportAs: ["ngpListboxTrigger"]
});
var NgpListboxTrigger = _NgpListboxTrigger;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpListboxTrigger, [{
    type: Directive,
    args: [{
      selector: "[ngpListboxTrigger]",
      exportAs: "ngpListboxTrigger"
    }]
  }], null, {
    openPopover: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
var _NgpListbox = class _NgpListbox {
  constructor() {
    this.injector = inject(Injector);
    this.destroyRef = inject(DestroyRef);
    this.popoverTrigger = injectPopoverTriggerState({
      optional: true
    });
    this.id = input(uniqueId("ngp-listbox"));
    this.mode = input("single", {
      alias: "ngpListboxMode"
    });
    this.value = input([], {
      alias: "ngpListboxValue"
    });
    this.valueChange = output({
      alias: "ngpListboxValueChange"
    });
    this.disabled = input(false, {
      alias: "ngpListboxDisabled",
      transform: booleanAttribute
    });
    this.compareWith = input((a, b) => a === b, {
      alias: "ngpListboxCompareWith"
    });
    this.tabindex = computed(() => this.state.disabled() ? -1 : 0);
    this.options = signal([]);
    this.keyManager = new ActiveDescendantKeyManager(this.options, this.injector);
    this.activeDescendant = signal(void 0);
    this.isFocused = signal(false);
    this.state = listboxState(this);
    setupFocusVisible({
      disabled: this.state.disabled
    });
  }
  ngAfterContentInit() {
    this.keyManager.withHomeAndEnd().withTypeAhead().withVerticalOrientation();
    this.keyManager.change.pipe(safeTakeUntilDestroyed(this.destroyRef)).subscribe(() => this.activeDescendant.set(this.keyManager.activeItem?.id()));
    this.updateActiveItem();
    explicitEffect([this.options], () => this.updateActiveItem(), {
      injector: this.injector
    });
  }
  updateActiveItem() {
    const selectedOption = this.options().find((o) => o.selected());
    if (selectedOption) {
      this.keyManager.setActiveItem(selectedOption);
    } else {
      this.keyManager.setFirstItemActive();
    }
  }
  onKeydown(event) {
    this.keyManager.onKeydown(event);
    if (event.key === "Enter" || event.key === " ") {
      this.keyManager.activeItem?.select("keyboard");
    }
    if (event.key === "ArrowDown" || event.key === "ArrowUp" || event.key === "Enter" || event.key === " ") {
      event.preventDefault();
    }
  }
  /**
   * @internal
   * Selects an option in the listbox.
   */
  selectOption(value, origin) {
    if (this.state.mode() === "single") {
      const newValue = [value];
      this.state.value.set(newValue);
      this.valueChange.emit(newValue);
    } else {
      if (this.isSelected(value)) {
        const newValue = this.state.value().filter((v) => !this.state.compareWith()(v, value));
        this.state.value.set(newValue);
        this.valueChange.emit(newValue);
      } else {
        const newValue = [...this.state.value(), value];
        this.state.value.set(newValue);
        this.valueChange.emit(newValue);
      }
    }
    const option = this.options().find((o) => this.state.compareWith()(o.value(), value));
    if (option) {
      this.keyManager.setActiveItem(option);
    }
    if (this.state.mode() !== "multiple") {
      this.popoverTrigger()?.hide(origin);
    }
  }
  /**
   * @internal
   * Determine if an option is selected using the compareWith function.
   */
  isSelected(value) {
    return this.state.value().some((v) => this.state.compareWith()(v, value));
  }
  /**
   * @internal
   * Activate an option in the listbox.
   */
  activateOption(value) {
    const option = this.options().find((o) => this.state.compareWith()(o.value(), value));
    if (option) {
      this.keyManager.setActiveItem(option);
    }
  }
  /**
   * Registers an option with the listbox.
   * @internal
   */
  addOption(option) {
    if (!this.options().includes(option)) {
      this.options.update((options) => [...options, option]);
    }
  }
  /**
   * Deregisters an option with the listbox.
   * @internal
   */
  removeOption(option) {
    this.options.update((options) => options.filter((o) => o !== option));
  }
};
_NgpListbox.ɵfac = function NgpListbox_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpListbox)();
};
_NgpListbox.ɵdir = ɵɵdefineDirective({
  type: _NgpListbox,
  selectors: [["", "ngpListbox", ""]],
  hostAttrs: ["role", "listbox"],
  hostVars: 5,
  hostBindings: function NgpListbox_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("focusin", function NgpListbox_focusin_HostBindingHandler() {
        return ctx.isFocused.set(true);
      })("focusout", function NgpListbox_focusout_HostBindingHandler() {
        return ctx.isFocused.set(false);
      })("keydown", function NgpListbox_keydown_HostBindingHandler($event) {
        return ctx.onKeydown($event);
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.state.id());
      ɵɵattribute("tabindex", ctx.tabindex())("aria-disabled", ctx.state.disabled())("aria-multiselectable", ctx.state.mode() === "multiple")("aria-activedescendant", ctx.activeDescendant());
    }
  },
  inputs: {
    id: [1, "id"],
    mode: [1, "ngpListboxMode", "mode"],
    value: [1, "ngpListboxValue", "value"],
    disabled: [1, "ngpListboxDisabled", "disabled"],
    compareWith: [1, "ngpListboxCompareWith", "compareWith"]
  },
  outputs: {
    valueChange: "ngpListboxValueChange"
  },
  exportAs: ["ngpListbox"],
  features: [ɵɵProvidersFeature([provideListboxState()])]
});
var NgpListbox = _NgpListbox;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpListbox, [{
    type: Directive,
    args: [{
      selector: "[ngpListbox]",
      exportAs: "ngpListbox",
      providers: [provideListboxState()],
      host: {
        "[id]": "state.id()",
        role: "listbox",
        "[attr.tabindex]": "tabindex()",
        "[attr.aria-disabled]": "state.disabled()",
        "[attr.aria-multiselectable]": 'state.mode() === "multiple"',
        "[attr.aria-activedescendant]": "activeDescendant()",
        "(focusin)": "isFocused.set(true)",
        "(focusout)": "isFocused.set(false)"
      }
    }]
  }], () => [], {
    onKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();
export {
  NgpListbox,
  NgpListboxHeader,
  NgpListboxOption,
  NgpListboxSection,
  NgpListboxTrigger,
  injectListboxState,
  provideListboxState
};
//# sourceMappingURL=ng-primitives_listbox.js.map
