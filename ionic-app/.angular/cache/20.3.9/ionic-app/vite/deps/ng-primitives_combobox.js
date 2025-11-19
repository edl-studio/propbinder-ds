import {
  activeDescendantManager
} from "./chunk-WGUN7FVU.js";
import {
  createOverlay
} from "./chunk-3IZ6YSMQ.js";
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
  injectElementRef,
  observeResize
} from "./chunk-WE5NZ3WV.js";
import {
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
  ɵɵstyleProp
} from "./chunk-V52YD5AQ.js";
import {
  __async,
  __spreadValues
} from "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-combobox.mjs
var NgpComboboxStateToken = createStateToken("Combobox");
var provideComboboxState = createStateProvider(NgpComboboxStateToken);
var injectComboboxState = createStateInjector(NgpComboboxStateToken);
var comboboxState = createState(NgpComboboxStateToken);
var _NgpComboboxButton = class _NgpComboboxButton {
  constructor() {
    this.state = injectComboboxState();
    this.elementRef = injectElementRef();
    this.id = input(uniqueId("ngp-combobox-button"));
    this.dropdownId = computed(() => this.state().dropdown()?.id());
    setupInteractions({
      hover: true,
      press: true,
      disabled: this.state().disabled
    });
    this.state().registerButton(this);
  }
  toggleDropdown() {
    return __async(this, null, function* () {
      yield this.state().toggleDropdown();
      this.state().input()?.focus();
    });
  }
};
_NgpComboboxButton.ɵfac = function NgpComboboxButton_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpComboboxButton)();
};
_NgpComboboxButton.ɵdir = ɵɵdefineDirective({
  type: _NgpComboboxButton,
  selectors: [["", "ngpComboboxButton", ""]],
  hostAttrs: ["type", "button", "tabindex", "-1", "aria-haspopup", "listbox"],
  hostVars: 7,
  hostBindings: function NgpComboboxButton_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpComboboxButton_click_HostBindingHandler() {
        return ctx.toggleDropdown();
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id())("disabled", ctx.state().disabled());
      ɵɵattribute("aria-controls", ctx.dropdownId())("aria-expanded", ctx.state().open())("data-open", ctx.state().open() ? "" : void 0)("data-disabled", ctx.state().disabled() ? "" : void 0)("data-multiple", ctx.state().multiple() ? "" : void 0);
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpComboboxButton"]
});
var NgpComboboxButton = _NgpComboboxButton;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpComboboxButton, [{
    type: Directive,
    args: [{
      selector: "[ngpComboboxButton]",
      exportAs: "ngpComboboxButton",
      host: {
        type: "button",
        tabindex: "-1",
        "aria-haspopup": "listbox",
        "[id]": "id()",
        "[attr.aria-controls]": "dropdownId()",
        "[attr.aria-expanded]": "state().open()",
        "[attr.data-open]": 'state().open() ? "" : undefined',
        "[attr.data-disabled]": 'state().disabled() ? "" : undefined',
        "[attr.data-multiple]": 'state().multiple() ? "" : undefined',
        "[disabled]": "state().disabled()"
      }
    }]
  }], () => [], {
    toggleDropdown: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _NgpComboboxDropdown = class _NgpComboboxDropdown {
  constructor() {
    this.state = injectComboboxState();
    this.comboboxDimensions = observeResize(() => this.state().elementRef.nativeElement);
    this.inputDimensions = observeResize(() => this.state().input()?.elementRef.nativeElement);
    this.buttonDimensions = observeResize(() => this.state().button()?.elementRef.nativeElement);
    this.elementRef = injectElementRef();
    this.id = input(uniqueId("ngp-combobox-dropdown"));
    this.state().registerDropdown(this);
  }
};
_NgpComboboxDropdown.ɵfac = function NgpComboboxDropdown_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpComboboxDropdown)();
};
_NgpComboboxDropdown.ɵdir = ɵɵdefineDirective({
  type: _NgpComboboxDropdown,
  selectors: [["", "ngpComboboxDropdown", ""]],
  hostAttrs: ["role", "listbox"],
  hostVars: 13,
  hostBindings: function NgpComboboxDropdown_HostBindings(rf, ctx) {
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      ɵɵdomProperty("id", ctx.id());
      ɵɵstyleProp("left", (tmp_1_0 = ctx.state().overlay()) == null ? null : (tmp_1_0 = tmp_1_0.position()) == null ? null : tmp_1_0.x, "px")("top", (tmp_2_0 = ctx.state().overlay()) == null ? null : (tmp_2_0 = tmp_2_0.position()) == null ? null : tmp_2_0.y, "px")("--ngp-combobox-transform-origin", (tmp_3_0 = ctx.state().overlay()) == null ? null : tmp_3_0.transformOrigin())("--ngp-combobox-width", ctx.comboboxDimensions().width, "px")("--ngp-combobox-input-width", ctx.inputDimensions().width, "px")("--ngp-combobox-button-width", ctx.buttonDimensions().width, "px");
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpComboboxDropdown"]
});
var NgpComboboxDropdown = _NgpComboboxDropdown;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpComboboxDropdown, [{
    type: Directive,
    args: [{
      selector: "[ngpComboboxDropdown]",
      exportAs: "ngpComboboxDropdown",
      host: {
        role: "listbox",
        "[id]": "id()",
        "[style.left.px]": "state().overlay()?.position()?.x",
        "[style.top.px]": "state().overlay()?.position()?.y",
        "[style.--ngp-combobox-transform-origin]": "state().overlay()?.transformOrigin()",
        "[style.--ngp-combobox-width.px]": "comboboxDimensions().width",
        "[style.--ngp-combobox-input-width.px]": "inputDimensions().width",
        "[style.--ngp-combobox-button-width.px]": "buttonDimensions().width"
      }
    }]
  }], () => [], null);
})();
var _NgpComboboxInput = class _NgpComboboxInput {
  constructor() {
    this.state = injectComboboxState();
    this.elementRef = injectElementRef();
    this.id = input(uniqueId("ngp-combobox-input"));
    this.dropdownId = computed(() => this.state().dropdown()?.id());
    this.activeDescendant = computed(() => this.state().activeDescendantManager.activeDescendant());
    this.pointerFocused = false;
    this.controlStatus = setupFormControl({
      id: this.id,
      disabled: this.state().disabled
    });
    setupInteractions({
      focus: true,
      hover: true,
      press: true,
      disabled: this.state().disabled
    });
    this.state().registerInput(this);
  }
  /** Handle keydown events for accessibility. */
  handleKeydown(event) {
    switch (event.key) {
      case "ArrowDown":
        if (this.state().open()) {
          this.state().activateNextOption();
        } else {
          this.state().openDropdown();
        }
        event.preventDefault();
        break;
      case "ArrowUp":
        if (this.state().open()) {
          this.state().activatePreviousOption();
        } else {
          this.state().openDropdown();
          this.state().activeDescendantManager.last();
        }
        event.preventDefault();
        break;
      case "Home":
        if (this.state().open()) {
          this.state().activeDescendantManager.first();
        }
        event.preventDefault();
        break;
      case "End":
        if (this.state().open()) {
          this.state().activeDescendantManager.last();
        }
        event.preventDefault();
        break;
      case "Enter":
        if (this.state().open()) {
          this.state().selectOption(this.state().activeDescendantManager.activeItem());
        }
        event.preventDefault();
        break;
      case "Escape":
        this.state().closeDropdown();
        event.preventDefault();
        break;
      case "Backspace":
        if (this.elementRef.nativeElement.value.length > 0) {
          this.state().openDropdown();
        }
        break;
      default:
        if (event.key.length > 1 || event.ctrlKey || event.metaKey || event.altKey) {
          return;
        }
        this.state().openDropdown();
    }
  }
  closeDropdown(event) {
    const relatedTarget = event.relatedTarget;
    if (relatedTarget && this.state().dropdown()?.elementRef.nativeElement.contains(relatedTarget)) {
      return;
    }
    if (relatedTarget && this.state().button()?.elementRef.nativeElement.contains(relatedTarget)) {
      return;
    }
    this.state().closeDropdown();
    event.preventDefault();
  }
  /**
   * Focus the input field
   * @internal
   */
  focus() {
    this.elementRef.nativeElement.focus();
  }
  highlightText() {
    if (this.pointerFocused) {
      this.pointerFocused = false;
      return;
    }
    this.elementRef.nativeElement.setSelectionRange(0, this.elementRef.nativeElement.value.length);
  }
  handlePointerDown() {
    this.pointerFocused = true;
  }
};
_NgpComboboxInput.ɵfac = function NgpComboboxInput_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpComboboxInput)();
};
_NgpComboboxInput.ɵdir = ɵɵdefineDirective({
  type: _NgpComboboxInput,
  selectors: [["input", "ngpComboboxInput", ""]],
  hostAttrs: ["role", "combobox", "type", "text", "autocomplete", "off", "autocorrect", "off", "spellcheck", "false", "aria-haspopup", "listbox", "aria-autocomplete", "list"],
  hostVars: 8,
  hostBindings: function NgpComboboxInput_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown", function NgpComboboxInput_keydown_HostBindingHandler($event) {
        return ctx.handleKeydown($event);
      })("blur", function NgpComboboxInput_blur_HostBindingHandler($event) {
        return ctx.closeDropdown($event);
      })("focus", function NgpComboboxInput_focus_HostBindingHandler($event) {
        return ctx.highlightText($event);
      })("pointerdown", function NgpComboboxInput_pointerdown_HostBindingHandler($event) {
        return ctx.handlePointerDown($event);
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id())("disabled", ctx.state().disabled());
      ɵɵattribute("aria-controls", ctx.state().open() ? ctx.dropdownId() : void 0)("aria-expanded", ctx.state().open())("data-open", ctx.state().open() ? "" : void 0)("data-disabled", ctx.state().disabled() ? "" : void 0)("data-multiple", ctx.state().multiple() ? "" : void 0)("aria-activedescendant", ctx.activeDescendant());
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpComboboxInput"]
});
var NgpComboboxInput = _NgpComboboxInput;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpComboboxInput, [{
    type: Directive,
    args: [{
      selector: "input[ngpComboboxInput]",
      exportAs: "ngpComboboxInput",
      host: {
        role: "combobox",
        type: "text",
        autocomplete: "off",
        autocorrect: "off",
        spellcheck: "false",
        "aria-haspopup": "listbox",
        "aria-autocomplete": "list",
        "[id]": "id()",
        "[attr.aria-controls]": "state().open() ? dropdownId() : undefined",
        "[attr.aria-expanded]": "state().open()",
        "[attr.data-open]": 'state().open() ? "" : undefined',
        "[attr.data-disabled]": 'state().disabled() ? "" : undefined',
        "[attr.data-multiple]": 'state().multiple() ? "" : undefined',
        "[attr.aria-activedescendant]": "activeDescendant()",
        "[disabled]": "state().disabled()"
      }
    }]
  }], () => [], {
    handleKeydown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }],
    closeDropdown: [{
      type: HostListener,
      args: ["blur", ["$event"]]
    }],
    highlightText: [{
      type: HostListener,
      args: ["focus", ["$event"]]
    }],
    handlePointerDown: [{
      type: HostListener,
      args: ["pointerdown", ["$event"]]
    }]
  });
})();
var _NgpComboboxOption = class _NgpComboboxOption {
  constructor() {
    this.state = injectComboboxState();
    this.elementRef = injectElementRef();
    this.id = input(uniqueId("ngp-combobox-option"));
    this.value = input(void 0, {
      alias: "ngpComboboxOptionValue"
    });
    this.disabled = input(false, {
      alias: "ngpComboboxOptionDisabled",
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
      throw new Error("ngpComboboxOption: The value input is required. Please provide a value for the option.");
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
_NgpComboboxOption.ɵfac = function NgpComboboxOption_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpComboboxOption)();
};
_NgpComboboxOption.ɵdir = ɵɵdefineDirective({
  type: _NgpComboboxOption,
  selectors: [["", "ngpComboboxOption", ""]],
  hostAttrs: ["role", "option"],
  hostVars: 6,
  hostBindings: function NgpComboboxOption_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpComboboxOption_click_HostBindingHandler() {
        return ctx.select();
      })("pointerenter", function NgpComboboxOption_pointerenter_HostBindingHandler() {
        return ctx.onPointerEnter();
      })("pointerleave", function NgpComboboxOption_pointerleave_HostBindingHandler() {
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
    value: [1, "ngpComboboxOptionValue", "value"],
    disabled: [1, "ngpComboboxOptionDisabled", "disabled"]
  },
  exportAs: ["ngpComboboxOption"]
});
var NgpComboboxOption = _NgpComboboxOption;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpComboboxOption, [{
    type: Directive,
    args: [{
      selector: "[ngpComboboxOption]",
      exportAs: "ngpComboboxOption",
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
var _NgpComboboxPortal = class _NgpComboboxPortal {
  constructor() {
    this.state = injectComboboxState();
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
_NgpComboboxPortal.ɵfac = function NgpComboboxPortal_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpComboboxPortal)();
};
_NgpComboboxPortal.ɵdir = ɵɵdefineDirective({
  type: _NgpComboboxPortal,
  selectors: [["", "ngpComboboxPortal", ""]],
  exportAs: ["ngpComboboxPortal"]
});
var NgpComboboxPortal = _NgpComboboxPortal;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpComboboxPortal, [{
    type: Directive,
    args: [{
      selector: "[ngpComboboxPortal]",
      exportAs: "ngpComboboxPortal"
    }]
  }], () => [], null);
})();
var defaultComboboxConfig = {
  placement: "bottom",
  container: "body"
};
var NgpComboboxConfigToken = new InjectionToken("NgpComboboxConfigToken");
function provideComboboxConfig(config) {
  return [{
    provide: NgpComboboxConfigToken,
    useValue: __spreadValues(__spreadValues({}, defaultComboboxConfig), config)
  }];
}
function injectComboboxConfig() {
  return inject(NgpComboboxConfigToken, {
    optional: true
  }) ?? defaultComboboxConfig;
}
var _NgpCombobox = class _NgpCombobox {
  constructor() {
    this.config = injectComboboxConfig();
    this.elementRef = injectElementRef();
    this.injector = inject(Injector);
    this.value = input(void 0, {
      alias: "ngpComboboxValue"
    });
    this.valueChange = output({
      alias: "ngpComboboxValueChange"
    });
    this.multiple = input(false, {
      alias: "ngpComboboxMultiple",
      transform: booleanAttribute
    });
    this.disabled = input(false, {
      alias: "ngpComboboxDisabled",
      transform: booleanAttribute
    });
    this.openChange = output({
      alias: "ngpComboboxOpenChange"
    });
    this.compareWith = input(Object.is, {
      alias: "ngpComboboxCompareWith"
    });
    this.placement = input(this.config.placement, {
      alias: "ngpComboboxDropdownPlacement"
    });
    this.container = input(this.config.container, {
      alias: "ngpComboboxDropdownContainer"
    });
    this.input = signal(void 0);
    this.button = signal(void 0);
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
    this.controlStatus = computed(() => this.input()?.controlStatus());
    this.state = comboboxState(this);
    setupInteractions({
      focus: true,
      focusWithin: true,
      hover: true,
      press: true,
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
      const value = [...this.state.value(), option.value()];
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
   * Register the dropdown portal with the combobox.
   * @param portal The dropdown portal.
   * @internal
   */
  registerPortal(portal) {
    this.portal.set(portal);
  }
  /**
   * Register the combobox input with the combobox.
   * @param input The combobox input.
   * @internal
   */
  registerInput(input2) {
    this.input.set(input2);
  }
  /**
   * Register the combobox button with the combobox.
   * @param button The combobox button.
   * @internal
   */
  registerButton(button) {
    this.button.set(button);
  }
  /**
   * Register the dropdown with the combobox.
   * @param dropdown The dropdown to register.
   * @internal
   */
  registerDropdown(dropdown) {
    this.dropdown.set(dropdown);
  }
  /**
   * Register an option with the combobox.
   * @param option The option to register.
   * @internal
   */
  registerOption(option) {
    this.options.update((options) => [...options, option]);
  }
  /**
   * Unregister an option from the combobox.
   * @param option The option to unregister.
   * @internal
   */
  unregisterOption(option) {
    this.options.update((options) => options.filter((o) => o !== option));
  }
};
_NgpCombobox.ɵfac = function NgpCombobox_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpCombobox)();
};
_NgpCombobox.ɵdir = ɵɵdefineDirective({
  type: _NgpCombobox,
  selectors: [["", "ngpCombobox", ""]],
  hostVars: 9,
  hostBindings: function NgpCombobox_HostBindings(rf, ctx) {
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      ɵɵattribute("data-open", ctx.state.open() ? "" : void 0)("data-disabled", ctx.state.disabled() ? "" : void 0)("data-multiple", ctx.state.multiple() ? "" : void 0)("data-invalid", ((tmp_3_0 = ctx.controlStatus()) == null ? null : tmp_3_0.invalid) ? "" : void 0)("data-valid", ((tmp_4_0 = ctx.controlStatus()) == null ? null : tmp_4_0.valid) ? "" : void 0)("data-touched", ((tmp_5_0 = ctx.controlStatus()) == null ? null : tmp_5_0.touched) ? "" : void 0)("data-pristine", ((tmp_6_0 = ctx.controlStatus()) == null ? null : tmp_6_0.pristine) ? "" : void 0)("data-dirty", ((tmp_7_0 = ctx.controlStatus()) == null ? null : tmp_7_0.dirty) ? "" : void 0)("data-pending", ((tmp_8_0 = ctx.controlStatus()) == null ? null : tmp_8_0.pending) ? "" : void 0);
    }
  },
  inputs: {
    value: [1, "ngpComboboxValue", "value"],
    multiple: [1, "ngpComboboxMultiple", "multiple"],
    disabled: [1, "ngpComboboxDisabled", "disabled"],
    compareWith: [1, "ngpComboboxCompareWith", "compareWith"],
    placement: [1, "ngpComboboxDropdownPlacement", "placement"],
    container: [1, "ngpComboboxDropdownContainer", "container"]
  },
  outputs: {
    valueChange: "ngpComboboxValueChange",
    openChange: "ngpComboboxOpenChange"
  },
  exportAs: ["ngpCombobox"],
  features: [ɵɵProvidersFeature([provideComboboxState()])]
});
var NgpCombobox = _NgpCombobox;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpCombobox, [{
    type: Directive,
    args: [{
      selector: "[ngpCombobox]",
      exportAs: "ngpCombobox",
      providers: [provideComboboxState()],
      host: {
        "[attr.data-open]": 'state.open() ? "" : undefined',
        "[attr.data-disabled]": 'state.disabled() ? "" : undefined',
        "[attr.data-multiple]": 'state.multiple() ? "" : undefined',
        "[attr.data-invalid]": 'controlStatus()?.invalid ? "" : undefined',
        "[attr.data-valid]": 'controlStatus()?.valid ? "" : undefined',
        "[attr.data-touched]": 'controlStatus()?.touched ? "" : undefined',
        "[attr.data-pristine]": 'controlStatus()?.pristine ? "" : undefined',
        "[attr.data-dirty]": 'controlStatus()?.dirty ? "" : undefined',
        "[attr.data-pending]": 'controlStatus()?.pending ? "" : undefined'
      }
    }]
  }], () => [], null);
})();
export {
  NgpCombobox,
  NgpComboboxButton,
  NgpComboboxDropdown,
  NgpComboboxInput,
  NgpComboboxOption,
  NgpComboboxPortal,
  injectComboboxState,
  provideComboboxConfig,
  provideComboboxState
};
//# sourceMappingURL=ng-primitives_combobox.js.map
