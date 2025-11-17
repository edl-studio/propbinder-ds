import {
  createOverlay
} from "./chunk-IY3BRLSG.js";
import {
  setupFormControl
} from "./chunk-TTG4L5LE.js";
import {
  setupInteractions
} from "./chunk-A5LILIPV.js";
import {
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  explicitEffect,
  injectElementRef,
  observeResize
} from "./chunk-AHNVSUII.js";
import {
  uniqueId
} from "./chunk-VXVCWHF7.js";
import "./chunk-SQP3BRRN.js";
import "./chunk-YLELG2JA.js";
import "./chunk-NMFEGCZ7.js";
import "./chunk-MVS67VIT.js";
import "./chunk-ALQK544G.js";
import "./chunk-UHXM7YBJ.js";
import "./chunk-HLZNGV7I.js";
import "./chunk-7OMPJCAI.js";
import "./chunk-U3ZLLG7Y.js";
import "./chunk-7YT5CE2Y.js";
import {
  ChangeDetectorRef,
  Directive,
  HostListener,
  InjectionToken,
  Injector,
  TemplateRef,
  ViewContainerRef,
  afterRenderEffect,
  booleanAttribute,
  computed,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵdomProperty,
  ɵɵlistener,
  ɵɵstyleMap,
  ɵɵstyleProp
} from "./chunk-5OFLYFBL.js";
import {
  __async,
  __spreadValues
} from "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-a11y.mjs
function activeDescendantManager(options) {
  const sortedOptions = () => options.items().slice().sort((a, b) => {
    const aElement = a.elementRef.nativeElement;
    const bElement = b.elementRef.nativeElement;
    return aElement.compareDocumentPosition(bElement) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1;
  });
  const activeIndex = signal(0);
  const activeItem = computed(() => sortedOptions()?.[activeIndex()]);
  const disabled = computed(() => options.disabled?.() || options.items().every((item) => item.disabled?.()));
  explicitEffect([sortedOptions], ([items]) => {
    if (activeIndex() >= items.length || activeIndex() < 0) {
      activeIndex.set(items.findIndex((item) => !item.disabled?.()));
    }
    if (activeIndex() === -1 && items.length > 0) {
      activeIndex.set(0);
    }
    if (disabled() || items.length === 0) {
      activeIndex.set(-1);
    }
  });
  const activeDescendant = computed(() => {
    const item = activeItem();
    if (disabled() || !item) {
      return void 0;
    }
    return item.id();
  });
  const activate = (item) => {
    if (item === void 0) {
      activeIndex.set(-1);
      return;
    }
    if (disabled() || item.disabled?.()) {
      return;
    }
    activeIndex.set(sortedOptions().indexOf(item));
  };
  const first = () => {
    const item = sortedOptions().findIndex((item2) => !item2.disabled?.());
    if (item !== -1) {
      activeIndex.set(item);
    }
  };
  const last = () => {
    const item = sortedOptions().reverse().findIndex((item2) => !item2.disabled?.());
    if (item !== -1) {
      activeIndex.set(sortedOptions().length - 1 - item);
    }
  };
  const findNextIndex = (items, currentIndex, direction, wrap) => {
    let index = (currentIndex + direction + items.length) % items.length;
    while (index !== currentIndex) {
      const item = items[index];
      if (item && !item.disabled?.()) {
        return index;
      }
      index = (index + direction + items.length) % items.length;
      if (!wrap && (direction === 1 && index === 0 || direction === -1 && index === items.length - 1)) {
        break;
      }
    }
    return void 0;
  };
  const next = () => {
    const items = sortedOptions();
    const nextIndex = findNextIndex(items, activeIndex(), 1, options.wrap?.() ?? false);
    if (nextIndex !== void 0) {
      activeIndex.set(nextIndex);
    }
  };
  const previous = () => {
    const items = sortedOptions();
    const prevIndex = findNextIndex(items, activeIndex(), -1, options.wrap?.() ?? false);
    if (prevIndex !== void 0) {
      activeIndex.set(prevIndex);
    }
  };
  const reset = () => {
    activeIndex.set(-1);
  };
  return {
    activeDescendant,
    activeItem,
    activate,
    first,
    last,
    next,
    previous,
    reset
  };
}
var NgpVisuallyHiddenStateToken = createStateToken("VisuallyHidden");
var provideVisuallyHiddenState = createStateProvider(NgpVisuallyHiddenStateToken);
var injectVisuallyHiddenState = createStateInjector(NgpVisuallyHiddenStateToken);
var visuallyHiddenState = createState(NgpVisuallyHiddenStateToken);
var _NgpVisuallyHidden = class _NgpVisuallyHidden {
  constructor() {
    this.changeDetector = inject(ChangeDetectorRef);
    this.hidden = signal(true);
    this.style = computed(() => {
      if (!this.hidden()) {
        return {};
      }
      return {
        position: "absolute",
        width: "1px",
        height: "1px",
        margin: "-1px",
        padding: "0",
        overflow: "hidden",
        clip: "rect(0, 0, 0, 0)",
        whiteSpace: "nowrap",
        border: "0",
        wordWrap: "normal",
        outline: "0",
        "-webkit-appearance": "none",
        "-moz-appearance": "none",
        "inset-inline-start": "0"
      };
    });
    this.state = visuallyHiddenState(this);
  }
  /**
   * Set the element visibility.
   * @param visible
   */
  setVisibility(visible) {
    this.hidden.set(!visible);
    this.changeDetector.detectChanges();
  }
};
_NgpVisuallyHidden.ɵfac = function NgpVisuallyHidden_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpVisuallyHidden)();
};
_NgpVisuallyHidden.ɵdir = ɵɵdefineDirective({
  type: _NgpVisuallyHidden,
  selectors: [["", "ngpVisuallyHidden", ""]],
  hostVars: 2,
  hostBindings: function NgpVisuallyHidden_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵstyleMap(ctx.style());
    }
  },
  exportAs: ["ngpVisuallyHidden"],
  features: [ɵɵProvidersFeature([provideVisuallyHiddenState()])]
});
var NgpVisuallyHidden = _NgpVisuallyHidden;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpVisuallyHidden, [{
    type: Directive,
    args: [{
      selector: "[ngpVisuallyHidden]",
      exportAs: "ngpVisuallyHidden",
      providers: [provideVisuallyHiddenState()],
      host: {
        "[style]": "style()"
      }
    }]
  }], null, null);
})();

// node_modules/ng-primitives/fesm2022/ng-primitives-select.mjs
var NgpNativeSelectStateToken = createStateToken("Select");
var provideNativeSelectState = createStateProvider(NgpNativeSelectStateToken);
var injectNativeSelectState = createStateInjector(NgpNativeSelectStateToken);
var selectNativeSelectState = createState(NgpNativeSelectStateToken);
var _NgpNativeSelect = class _NgpNativeSelect {
  constructor() {
    this.id = input(uniqueId("ngp-native-select"));
    this.disabled = input(false, {
      alias: "ngpNativeSelectDisabled",
      transform: booleanAttribute
    });
    this.state = selectNativeSelectState(this);
    setupInteractions({
      hover: true,
      press: true,
      focus: true,
      focusVisible: true,
      disabled: this.state.disabled
    });
    setupFormControl({
      id: this.state.id,
      disabled: this.state.disabled
    });
  }
};
_NgpNativeSelect.ɵfac = function NgpNativeSelect_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpNativeSelect)();
};
_NgpNativeSelect.ɵdir = ɵɵdefineDirective({
  type: _NgpNativeSelect,
  selectors: [["select", "ngpNativeSelect", ""]],
  hostVars: 1,
  hostBindings: function NgpNativeSelect_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("disabled", ctx.state.disabled() || null);
    }
  },
  inputs: {
    id: [1, "id"],
    disabled: [1, "ngpNativeSelectDisabled", "disabled"]
  },
  exportAs: ["ngpNativeSelect"],
  features: [ɵɵProvidersFeature([provideNativeSelectState()])]
});
var NgpNativeSelect = _NgpNativeSelect;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpNativeSelect, [{
    type: Directive,
    args: [{
      selector: "select[ngpNativeSelect]",
      exportAs: "ngpNativeSelect",
      providers: [provideNativeSelectState()],
      host: {
        "[attr.disabled]": "state.disabled() || null"
      }
    }]
  }], () => [], null);
})();
var NgpSelectStateToken = createStateToken("Select");
var provideSelectState = createStateProvider(NgpSelectStateToken);
var injectSelectState = createStateInjector(NgpSelectStateToken);
var selectState = createState(NgpSelectStateToken);
var _NgpSelectDropdown = class _NgpSelectDropdown {
  constructor() {
    this.state = injectSelectState();
    this.selectDimensions = observeResize(() => this.state().elementRef.nativeElement);
    this.elementRef = injectElementRef();
    this.id = input(uniqueId("ngp-select-dropdown"));
    this.state().registerDropdown(this);
  }
};
_NgpSelectDropdown.ɵfac = function NgpSelectDropdown_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpSelectDropdown)();
};
_NgpSelectDropdown.ɵdir = ɵɵdefineDirective({
  type: _NgpSelectDropdown,
  selectors: [["", "ngpSelectDropdown", ""]],
  hostAttrs: ["role", "listbox"],
  hostVars: 9,
  hostBindings: function NgpSelectDropdown_HostBindings(rf, ctx) {
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      ɵɵdomProperty("id", ctx.id());
      ɵɵstyleProp("left", (tmp_1_0 = ctx.state().overlay()) == null ? null : (tmp_1_0 = tmp_1_0.position()) == null ? null : tmp_1_0.x, "px")("top", (tmp_2_0 = ctx.state().overlay()) == null ? null : (tmp_2_0 = tmp_2_0.position()) == null ? null : tmp_2_0.y, "px")("--ngp-select-transform-origin", (tmp_3_0 = ctx.state().overlay()) == null ? null : tmp_3_0.transformOrigin())("--ngp-select-width", ctx.selectDimensions().width, "px");
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpSelectDropdown"]
});
var NgpSelectDropdown = _NgpSelectDropdown;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpSelectDropdown, [{
    type: Directive,
    args: [{
      selector: "[ngpSelectDropdown]",
      exportAs: "ngpSelectDropdown",
      host: {
        role: "listbox",
        "[id]": "id()",
        "[style.left.px]": "state().overlay()?.position()?.x",
        "[style.top.px]": "state().overlay()?.position()?.y",
        "[style.--ngp-select-transform-origin]": "state().overlay()?.transformOrigin()",
        "[style.--ngp-select-width.px]": "selectDimensions().width"
      }
    }]
  }], () => [], null);
})();
var _NgpSelectOption = class _NgpSelectOption {
  constructor() {
    this.state = injectSelectState();
    this.elementRef = injectElementRef();
    this.id = input(uniqueId("ngp-select-option"));
    this.value = input(void 0, {
      alias: "ngpSelectOptionValue"
    });
    this.disabled = input(false, {
      alias: "ngpSelectOptionDisabled",
      transform: booleanAttribute
    });
    this.active = computed(() => this.state().activeDescendantManager.activeDescendant() === this.id());
    this.selected = computed(() => {
      const value = this.value();
      if (!value) {
        return false;
      }
      if (this.state().multiple()) {
        return Array.isArray(value) && value.some((v) => this.state().compareWith()(v, this.state().value()));
      }
      return this.state().compareWith()(value, this.state().value());
    });
    this.state().registerOption(this);
    setupInteractions({
      hover: true,
      press: true,
      disabled: this.disabled
    });
  }
  ngOnInit() {
    if (this.value() === void 0) {
      throw new Error("ngpSelectOption: The value input is required. Please provide a value for the option.");
    }
  }
  ngOnDestroy() {
    this.state().unregisterOption(this);
  }
  /**
   * Select the option.
   * @internal
   */
  select() {
    if (this.disabled()) {
      return;
    }
    this.state().toggleOption(this);
  }
  /**
   * Scroll the option into view.
   * @internal
   */
  scrollIntoView() {
    this.elementRef.nativeElement.scrollIntoView({
      block: "nearest"
    });
  }
  /**
   * Whenever the pointer enters the option, activate it.
   * @internal
   */
  onPointerEnter() {
    this.state().activeDescendantManager.activate(this);
  }
  /**
   * Whenever the pointer leaves the option, deactivate it.
   * @internal
   */
  onPointerLeave() {
    this.state().activeDescendantManager.activate(void 0);
  }
};
_NgpSelectOption.ɵfac = function NgpSelectOption_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpSelectOption)();
};
_NgpSelectOption.ɵdir = ɵɵdefineDirective({
  type: _NgpSelectOption,
  selectors: [["", "ngpSelectOption", ""]],
  hostAttrs: ["role", "option"],
  hostVars: 6,
  hostBindings: function NgpSelectOption_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpSelectOption_click_HostBindingHandler() {
        return ctx.select();
      })("pointerenter", function NgpSelectOption_pointerenter_HostBindingHandler() {
        return ctx.onPointerEnter();
      })("pointerleave", function NgpSelectOption_pointerleave_HostBindingHandler() {
        return ctx.onPointerLeave();
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
      ɵɵattribute("tabindex", -1)("aria-selected", ctx.selected() ? "true" : void 0)("data-selected", ctx.selected() ? "" : void 0)("data-active", ctx.active() ? "" : void 0)("data-disabled", ctx.disabled() ? "" : void 0);
    }
  },
  inputs: {
    id: [1, "id"],
    value: [1, "ngpSelectOptionValue", "value"],
    disabled: [1, "ngpSelectOptionDisabled", "disabled"]
  },
  exportAs: ["ngpSelectOption"]
});
var NgpSelectOption = _NgpSelectOption;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpSelectOption, [{
    type: Directive,
    args: [{
      selector: "[ngpSelectOption]",
      exportAs: "ngpSelectOption",
      host: {
        role: "option",
        "[id]": "id()",
        "[attr.tabindex]": "-1",
        "[attr.aria-selected]": 'selected() ? "true" : undefined',
        "[attr.data-selected]": 'selected() ? "" : undefined',
        "[attr.data-active]": 'active() ? "" : undefined',
        "[attr.data-disabled]": 'disabled() ? "" : undefined',
        "(click)": "select()"
      }
    }]
  }], () => [], {
    onPointerEnter: [{
      type: HostListener,
      args: ["pointerenter"]
    }],
    onPointerLeave: [{
      type: HostListener,
      args: ["pointerleave"]
    }]
  });
})();
var _NgpSelectPortal = class _NgpSelectPortal {
  constructor() {
    this.state = injectSelectState();
    this.viewContainerRef = inject(ViewContainerRef);
    this.templateRef = inject(TemplateRef);
    this.injector = inject(Injector);
    this.overlay = signal(null);
    this.state().registerPortal(this);
  }
  /** Cleanup the portal. */
  ngOnDestroy() {
    this.overlay()?.destroy();
  }
  /**
   * Attach the portal.
   * @internal
   */
  show() {
    if (!this.overlay()) {
      this.createOverlay();
    }
    return this.overlay().show();
  }
  /**
   * Detach the portal.
   * @internal
   */
  detach() {
    return __async(this, null, function* () {
      this.overlay()?.hide();
    });
  }
  /**
   * Create the overlay that will contain the dropdown
   */
  createOverlay() {
    const config = {
      content: this.templateRef,
      viewContainerRef: this.viewContainerRef,
      triggerElement: this.state().elementRef.nativeElement,
      injector: this.injector,
      placement: this.state().placement(),
      closeOnOutsideClick: true,
      closeOnEscape: true,
      restoreFocus: false,
      scrollBehaviour: "reposition",
      container: this.state().container()
    };
    this.overlay.set(createOverlay(config));
  }
};
_NgpSelectPortal.ɵfac = function NgpSelectPortal_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpSelectPortal)();
};
_NgpSelectPortal.ɵdir = ɵɵdefineDirective({
  type: _NgpSelectPortal,
  selectors: [["", "ngpSelectPortal", ""]],
  exportAs: ["ngpSelectPortal"]
});
var NgpSelectPortal = _NgpSelectPortal;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpSelectPortal, [{
    type: Directive,
    args: [{
      selector: "[ngpSelectPortal]",
      exportAs: "ngpSelectPortal"
    }]
  }], () => [], null);
})();
var defaultSelectConfig = {
  placement: "bottom",
  container: "body"
};
var NgpSelectConfigToken = new InjectionToken("NgpSelectConfigToken");
function provideSelectConfig(config) {
  return [{
    provide: NgpSelectConfigToken,
    useValue: __spreadValues(__spreadValues({}, defaultSelectConfig), config)
  }];
}
function injectSelectConfig() {
  return inject(NgpSelectConfigToken, {
    optional: true
  }) ?? defaultSelectConfig;
}
var _NgpSelect = class _NgpSelect {
  constructor() {
    this.config = injectSelectConfig();
    this.elementRef = injectElementRef();
    this.injector = inject(Injector);
    this.id = input(uniqueId("ngp-select"));
    this.value = input(void 0, {
      alias: "ngpSelectValue"
    });
    this.valueChange = output({
      alias: "ngpSelectValueChange"
    });
    this.multiple = input(false, {
      alias: "ngpSelectMultiple",
      transform: booleanAttribute
    });
    this.disabled = input(false, {
      alias: "ngpSelectDisabled",
      transform: booleanAttribute
    });
    this.openChange = output({
      alias: "ngpSelectOpenChange"
    });
    this.compareWith = input(Object.is, {
      alias: "ngpSelectCompareWith"
    });
    this.placement = input(this.config.placement, {
      alias: "ngpSelectDropdownPlacement"
    });
    this.container = input(this.config.container, {
      alias: "ngpSelectDropdownContainer"
    });
    this.portal = signal(void 0);
    this.dropdown = signal(void 0);
    this.options = signal([]);
    this.overlay = computed(() => this.portal()?.overlay());
    this.open = computed(() => this.overlay()?.isOpen() ?? false);
    this.activeDescendantManager = activeDescendantManager({
      // we must wrap the signal in a computed to ensure it is not used before it is defined
      disabled: computed(() => this.state.disabled()),
      items: this.options
    });
    this.state = selectState(this);
    setupInteractions({
      focus: true,
      focusWithin: true,
      hover: true,
      press: true,
      disabled: this.state.disabled
    });
    setupFormControl({
      id: this.state.id,
      disabled: this.state.disabled
    });
    afterRenderEffect({
      write: () => {
        const isPositioned = this.portal()?.overlay()?.isPositioned() ?? false;
        const activeItem = this.activeDescendantManager.activeItem();
        if (!isPositioned || !activeItem) {
          return;
        }
        this.activeDescendantManager.activeItem()?.scrollIntoView?.();
      }
    });
  }
  /**
   * Open the dropdown.
   * @internal
   */
  openDropdown() {
    return __async(this, null, function* () {
      if (this.state.disabled() || this.open()) {
        return;
      }
      this.openChange.emit(true);
      yield this.portal()?.show();
      const selectedOption = this.options().find((option) => this.isOptionSelected(option));
      const targetOption = selectedOption ?? this.options()[0];
      if (!targetOption) {
        return;
      }
      this.activeDescendantManager.activate(targetOption);
    });
  }
  /**
   * Close the dropdown.
   * @internal
   */
  closeDropdown() {
    if (!this.open()) {
      return;
    }
    this.openChange.emit(false);
    this.portal()?.detach();
    this.activeDescendantManager.reset();
  }
  /**
   * Toggle the dropdown.
   * @internal
   */
  toggleDropdown() {
    return __async(this, null, function* () {
      if (this.open()) {
        this.closeDropdown();
      } else {
        yield this.openDropdown();
      }
    });
  }
  /**
   * Select an option.
   * @param option The option to select.
   * @internal
   */
  selectOption(option) {
    if (this.state.disabled()) {
      return;
    }
    if (!option) {
      this.state.value.set(void 0);
      this.closeDropdown();
      return;
    }
    if (this.state.multiple()) {
      if (this.isOptionSelected(option)) {
        return;
      }
      const value = [...this.state.value() ?? [], option.value()];
      this.state.value.set(value);
      this.valueChange.emit(value);
    } else {
      this.state.value.set(option.value());
      this.valueChange.emit(option.value());
      this.closeDropdown();
    }
  }
  /**
   * Deselect an option.
   * @param option The option to deselect.
   * @internal
   */
  deselectOption(option) {
    if (this.state.disabled() || !this.isOptionSelected(option) || !this.state.multiple()) {
      return;
    }
    const values = this.state.value() ?? [];
    const newValue = values.filter((v) => !this.state.compareWith()(v, option.value()));
    this.state.value.set(newValue);
    this.valueChange.emit(newValue);
  }
  /**
   * Toggle the selection of an option.
   * @param option The option to toggle.
   * @internal
   */
  toggleOption(option) {
    if (this.state.disabled()) {
      return;
    }
    if (!this.state.multiple()) {
      this.selectOption(option);
      return;
    }
    if (this.isOptionSelected(option)) {
      this.deselectOption(option);
    } else {
      this.selectOption(option);
    }
  }
  /**
   * Determine if an option is selected.
   * @param option The option to check.
   * @internal
   */
  isOptionSelected(option) {
    if (this.state.disabled()) {
      return false;
    }
    const value = this.state.value();
    if (!value) {
      return false;
    }
    if (this.state.multiple()) {
      return value && value.some((v) => this.state.compareWith()(option.value(), v));
    }
    return this.state.compareWith()(option.value(), value);
  }
  /**
   * Activate the next option in the list if there is one.
   * If there is no option currently active, activate the selected option or the first option.
   * @internal
   */
  activateNextOption() {
    if (this.state.disabled()) {
      return;
    }
    const options = this.options();
    if (options.length === 0) {
      return;
    }
    if (!this.activeDescendantManager.activeItem()) {
      const selectedOption = options.find((option) => this.isOptionSelected(option));
      const targetOption = selectedOption ?? options[0];
      this.activeDescendantManager.activate(targetOption);
      return;
    }
    this.activeDescendantManager.next();
  }
  /**
   * Activate the previous option in the list if there is one.
   * @internal
   */
  activatePreviousOption() {
    if (this.state.disabled()) {
      return;
    }
    const options = this.options();
    if (options.length === 0) {
      return;
    }
    if (!this.activeDescendantManager.activeItem()) {
      const selectedOption = options.find((option) => this.isOptionSelected(option));
      const targetOption = selectedOption ?? options[options.length - 1];
      this.activeDescendantManager.activate(targetOption);
      return;
    }
    this.activeDescendantManager.previous();
  }
  /**
   * Register the dropdown portal with the select.
   * @param portal The dropdown portal.
   * @internal
   */
  registerPortal(portal) {
    this.portal.set(portal);
  }
  /**
   * Register the dropdown with the select.
   * @param dropdown The dropdown to register.
   * @internal
   */
  registerDropdown(dropdown) {
    this.dropdown.set(dropdown);
  }
  /**
   * Register an option with the select.
   * @param option The option to register.
   * @internal
   */
  registerOption(option) {
    this.options.update((options) => [...options, option]);
  }
  /**
   * Unregister an option from the select.
   * @param option The option to unregister.
   * @internal
   */
  unregisterOption(option) {
    this.options.update((options) => options.filter((o) => o !== option));
  }
  /**
   * Focus the select.
   * @internal
   */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  /** Handle keydown events for accessibility. */
  handleKeydown(event) {
    switch (event.key) {
      case "ArrowDown":
        if (this.open()) {
          this.activateNextOption();
        } else {
          this.openDropdown();
        }
        event.preventDefault();
        break;
      case "ArrowUp":
        if (this.open()) {
          this.activatePreviousOption();
        } else {
          this.openDropdown();
          this.activeDescendantManager.last();
        }
        event.preventDefault();
        break;
      case "Home":
        if (this.open()) {
          this.activeDescendantManager.first();
        }
        event.preventDefault();
        break;
      case "End":
        if (this.open()) {
          this.activeDescendantManager.last();
        }
        event.preventDefault();
        break;
      case "Enter":
        if (this.open()) {
          this.selectOption(this.activeDescendantManager.activeItem());
        } else {
          this.openDropdown();
        }
        event.preventDefault();
        break;
      case " ":
        this.toggleDropdown();
        event.preventDefault();
        break;
    }
  }
  onBlur(event) {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget && this.dropdown()?.elementRef.nativeElement.contains(relatedTarget)) {
      return;
    }
    this.closeDropdown();
    event.preventDefault();
  }
};
_NgpSelect.ɵfac = function NgpSelect_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpSelect)();
};
_NgpSelect.ɵdir = ɵɵdefineDirective({
  type: _NgpSelect,
  selectors: [["", "ngpSelect", ""]],
  hostAttrs: ["role", "combobox"],
  hostVars: 8,
  hostBindings: function NgpSelect_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpSelect_click_HostBindingHandler() {
        return ctx.toggleDropdown();
      })("keydown", function NgpSelect_keydown_HostBindingHandler($event) {
        return ctx.handleKeydown($event);
      })("blur", function NgpSelect_blur_HostBindingHandler($event) {
        return ctx.onBlur($event);
      });
    }
    if (rf & 2) {
      let tmp_2_0;
      ɵɵdomProperty("id", ctx.state.id());
      ɵɵattribute("aria-expanded", ctx.state.open())("aria-controls", ctx.state.open() ? (tmp_2_0 = ctx.state.dropdown()) == null ? null : tmp_2_0.id() : void 0)("aria-activedescendant", ctx.state.open() ? ctx.activeDescendantManager.activeDescendant() : void 0)("tabindex", ctx.state.disabled() ? -1 : 0)("data-open", ctx.state.open() ? "" : void 0)("data-disabled", ctx.state.disabled() ? "" : void 0)("data-multiple", ctx.state.multiple() ? "" : void 0);
    }
  },
  inputs: {
    id: [1, "id"],
    value: [1, "ngpSelectValue", "value"],
    multiple: [1, "ngpSelectMultiple", "multiple"],
    disabled: [1, "ngpSelectDisabled", "disabled"],
    compareWith: [1, "ngpSelectCompareWith", "compareWith"],
    placement: [1, "ngpSelectDropdownPlacement", "placement"],
    container: [1, "ngpSelectDropdownContainer", "container"]
  },
  outputs: {
    valueChange: "ngpSelectValueChange",
    openChange: "ngpSelectOpenChange"
  },
  exportAs: ["ngpSelect"],
  features: [ɵɵProvidersFeature([provideSelectState()])]
});
var NgpSelect = _NgpSelect;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpSelect, [{
    type: Directive,
    args: [{
      selector: "[ngpSelect]",
      exportAs: "ngpSelect",
      providers: [provideSelectState()],
      host: {
        role: "combobox",
        "[id]": "state.id()",
        "[attr.aria-expanded]": "state.open()",
        "[attr.aria-controls]": "state.open() ? state.dropdown()?.id() : undefined",
        "[attr.aria-activedescendant]": "state.open() ? activeDescendantManager.activeDescendant() : undefined",
        "[attr.tabindex]": "state.disabled() ? -1 : 0",
        "[attr.data-open]": 'state.open() ? "" : undefined',
        "[attr.data-disabled]": 'state.disabled() ? "" : undefined',
        "[attr.data-multiple]": 'state.multiple() ? "" : undefined'
      }
    }]
  }], () => [], {
    toggleDropdown: [{
      type: HostListener,
      args: ["click"]
    }],
    handleKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }],
    onBlur: [{
      type: HostListener,
      args: ["blur", ["$event"]]
    }]
  });
})();
export {
  NgpNativeSelect,
  NgpSelect,
  NgpSelectDropdown,
  NgpSelectOption,
  NgpSelectPortal,
  injectNativeSelectState,
  injectSelectConfig,
  injectSelectState,
  provideNativeSelectState,
  provideSelectConfig,
  provideSelectState
};
//# sourceMappingURL=ng-primitives_select.js.map
