import {
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  fromMutationObserver,
  injectDimensions,
  injectElementRef
} from "./chunk-NOHFT6FW.js";
import {
  safeTakeUntilDestroyed,
  uniqueId
} from "./chunk-7VMOF35L.js";
import "./chunk-RQY3LDOR.js";
import "./chunk-YLELG2JA.js";
import "./chunk-ALQK544G.js";
import "./chunk-53KHQLJJ.js";
import "./chunk-ILS3C6C2.js";
import {
  Directive,
  HOST_TAG_NAME,
  HostListener,
  InjectionToken,
  afterRenderEffect,
  booleanAttribute,
  computed,
  debounceTime,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵdomProperty,
  ɵɵlistener
} from "./chunk-JIIPHG5Y.js";
import {
  __spreadValues
} from "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-accordion.mjs
var NgpAccordionItemStateToken = createStateToken("AccordionItem");
var provideAccordionItemState = createStateProvider(NgpAccordionItemStateToken);
var injectAccordionItemState = createStateInjector(NgpAccordionItemStateToken);
var accordionItemState = createState(NgpAccordionItemStateToken);
var NgpAccordionStateToken = createStateToken("Accordion");
var provideAccordionState = createStateProvider(NgpAccordionStateToken);
var injectAccordionState = createStateInjector(NgpAccordionStateToken);
var accordionState = createState(NgpAccordionStateToken);
var _NgpAccordionContent = class _NgpAccordionContent {
  constructor() {
    this.elementRef = injectElementRef();
    this.accordion = injectAccordionState();
    this.accordionItem = injectAccordionItemState();
    this.id = input(uniqueId("ngp-accordion-content"));
    this.dimensions = injectDimensions();
    this.hidden = computed(() => !this.accordionItem().open() && this.dimensions().height === 0 ? "until-found" : null);
    this.accordionItem().content.set(this);
    afterRenderEffect(() => this.updateDimensions());
    fromMutationObserver(this.elementRef.nativeElement, {
      childList: true,
      subtree: true,
      disabled: computed(() => !this.accordionItem().open())
    }).pipe(debounceTime(0), safeTakeUntilDestroyed()).subscribe(() => this.updateDimensions());
  }
  /**
   * Handle the beforematch event to automatically open the accordion item
   * when the browser's find-in-page functionality tries to reveal hidden content.
   */
  onBeforeMatch() {
    const isDisabled = this.accordion().disabled() || this.accordionItem().disabled();
    if (isDisabled) return;
    this.accordion().toggle(this.accordionItem().value());
  }
  updateDimensions() {
    if (this.accordionItem().open()) {
      this.elementRef.nativeElement.style.removeProperty("--ngp-accordion-content-width");
      this.elementRef.nativeElement.style.removeProperty("--ngp-accordion-content-height");
      this.elementRef.nativeElement.style.setProperty("--ngp-accordion-content-width", `${this.elementRef.nativeElement.scrollWidth}px`);
      this.elementRef.nativeElement.style.setProperty("--ngp-accordion-content-height", `${this.elementRef.nativeElement.scrollHeight}px`);
    }
  }
};
_NgpAccordionContent.ɵfac = function NgpAccordionContent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpAccordionContent)();
};
_NgpAccordionContent.ɵdir = ɵɵdefineDirective({
  type: _NgpAccordionContent,
  selectors: [["", "ngpAccordionContent", ""]],
  hostAttrs: ["role", "region"],
  hostVars: 6,
  hostBindings: function NgpAccordionContent_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("beforematch", function NgpAccordionContent_beforematch_HostBindingHandler() {
        return ctx.onBeforeMatch();
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
      ɵɵattribute("data-orientation", ctx.accordion().orientation())("data-open", ctx.accordionItem().open() ? "" : null)("data-closed", ctx.accordionItem().open() ? null : "")("aria-labelledby", ctx.accordionItem().triggerId())("hidden", ctx.hidden());
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpAccordionContent"]
});
var NgpAccordionContent = _NgpAccordionContent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpAccordionContent, [{
    type: Directive,
    args: [{
      selector: "[ngpAccordionContent]",
      exportAs: "ngpAccordionContent",
      host: {
        role: "region",
        "[id]": "id()",
        "[attr.data-orientation]": "accordion().orientation()",
        "[attr.data-open]": 'accordionItem().open() ? "" : null',
        "[attr.data-closed]": 'accordionItem().open() ? null : ""',
        "[attr.aria-labelledby]": "accordionItem().triggerId()",
        "(beforematch)": "onBeforeMatch()",
        "[attr.hidden]": "hidden()"
      }
    }]
  }], () => [], null);
})();
var _NgpAccordionItem = class _NgpAccordionItem {
  constructor() {
    this.accordion = injectAccordionState();
    this.value = input(uniqueId("ngp-accordion-item"), {
      alias: "ngpAccordionItemValue"
    });
    this.disabled = input(false, {
      alias: "ngpAccordionItemDisabled",
      transform: booleanAttribute
    });
    this.trigger = signal(void 0);
    this.content = signal(void 0);
    this.open = computed(() => this.accordion().isOpen(this.state.value()));
    this.triggerId = computed(() => this.trigger()?.id());
    this.contentId = computed(() => this.content()?.id());
    this.state = accordionItemState(this);
  }
};
_NgpAccordionItem.ɵfac = function NgpAccordionItem_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpAccordionItem)();
};
_NgpAccordionItem.ɵdir = ɵɵdefineDirective({
  type: _NgpAccordionItem,
  selectors: [["", "ngpAccordionItem", ""]],
  hostVars: 3,
  hostBindings: function NgpAccordionItem_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("data-orientation", ctx.accordion().orientation())("data-open", ctx.state.open() ? "" : null)("data-disabled", ctx.state.disabled() || ctx.accordion().disabled() ? "" : null);
    }
  },
  inputs: {
    value: [1, "ngpAccordionItemValue", "value"],
    disabled: [1, "ngpAccordionItemDisabled", "disabled"]
  },
  exportAs: ["ngpAccordionItem"],
  features: [ɵɵProvidersFeature([provideAccordionItemState()])]
});
var NgpAccordionItem = _NgpAccordionItem;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpAccordionItem, [{
    type: Directive,
    args: [{
      selector: "[ngpAccordionItem]",
      exportAs: "ngpAccordionItem",
      providers: [provideAccordionItemState()],
      host: {
        "[attr.data-orientation]": "accordion().orientation()",
        "[attr.data-open]": 'state.open() ? "" : null',
        "[attr.data-disabled]": 'state.disabled() || accordion().disabled() ? "" : null'
      }
    }]
  }], null, null);
})();
var _NgpAccordionTrigger = class _NgpAccordionTrigger {
  constructor() {
    this.tagName = inject(HOST_TAG_NAME);
    this.accordion = injectAccordionState();
    this.accordionItem = injectAccordionItemState();
    this.id = input(uniqueId("ngp-accordion-trigger"));
    this.accordionItem().trigger.set(this);
  }
  /**
   * Toggle the accordion item.
   */
  toggle() {
    if (this.accordionItem().disabled() || this.accordion().disabled()) {
      return;
    }
    this.accordion().toggle(this.accordionItem().value());
  }
};
_NgpAccordionTrigger.ɵfac = function NgpAccordionTrigger_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpAccordionTrigger)();
};
_NgpAccordionTrigger.ɵdir = ɵɵdefineDirective({
  type: _NgpAccordionTrigger,
  selectors: [["", "ngpAccordionTrigger", ""]],
  hostVars: 7,
  hostBindings: function NgpAccordionTrigger_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpAccordionTrigger_click_HostBindingHandler() {
        return ctx.toggle();
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
      ɵɵattribute("type", ctx.tagName === "button" ? "button" : null)("data-orientation", ctx.accordion().orientation())("data-open", ctx.accordionItem().open() ? "" : null)("data-disabled", ctx.accordionItem().disabled() || ctx.accordion().disabled() ? "" : null)("aria-controls", ctx.accordionItem().contentId())("aria-expanded", ctx.accordionItem().open());
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpAccordionTrigger"]
});
var NgpAccordionTrigger = _NgpAccordionTrigger;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpAccordionTrigger, [{
    type: Directive,
    args: [{
      selector: "[ngpAccordionTrigger]",
      exportAs: "ngpAccordionTrigger",
      host: {
        "[id]": "id()",
        "[attr.type]": 'tagName === "button" ? "button" : null',
        "[attr.data-orientation]": "accordion().orientation()",
        "[attr.data-open]": 'accordionItem().open() ? "" : null',
        "[attr.data-disabled]": 'accordionItem().disabled() || accordion().disabled() ? "" : null',
        "[attr.aria-controls]": "accordionItem().contentId()",
        "[attr.aria-expanded]": "accordionItem().open()"
      }
    }]
  }], () => [], {
    toggle: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var defaultAccordionConfig = {
  type: "single",
  collapsible: false,
  orientation: "vertical"
};
var NgpAccordionConfigToken = new InjectionToken("NgpAccordionConfigToken");
function provideAccordionConfig(config) {
  return [{
    provide: NgpAccordionConfigToken,
    useValue: __spreadValues(__spreadValues({}, defaultAccordionConfig), config)
  }];
}
function injectAccordionConfig() {
  return inject(NgpAccordionConfigToken, {
    optional: true
  }) ?? defaultAccordionConfig;
}
var _NgpAccordion = class _NgpAccordion {
  constructor() {
    this.config = injectAccordionConfig();
    this.type = input(this.config.type, {
      alias: "ngpAccordionType"
    });
    this.collapsible = input(this.config.collapsible, {
      alias: "ngpAccordionCollapsible",
      transform: booleanAttribute
    });
    this.value = input(null, {
      alias: "ngpAccordionValue"
    });
    this.valueChange = output({
      alias: "ngpAccordionValueChange"
    });
    this.disabled = input(false, {
      alias: "ngpAccordionDisabled",
      transform: booleanAttribute
    });
    this.orientation = input(this.config.orientation, {
      alias: "ngpAccordionOrientation"
    });
    this.state = accordionState(this);
  }
  /**
   * @param value The value to check.
   * @returns Whether the value is open.
   * @internal
   */
  isOpen(value) {
    if (this.state.type() === "multiple") {
      return this.state.value()?.includes(value) ?? false;
    }
    return this.state.value() === value;
  }
  toggle(value) {
    const isOpen = this.isOpen(value);
    if (this.state.type() === "single" && isOpen && !this.state.collapsible()) {
      return;
    }
    if (this.state.type() === "single") {
      const newValue = isOpen ? null : value;
      this.state.value.set(newValue);
      this.valueChange.emit(newValue);
      return;
    }
    let values = this.state.value() ?? [];
    if (isOpen) {
      values = values.filter((v) => v !== value);
    } else {
      values = [...values, value];
    }
    this.state.value.set(values);
    this.valueChange.emit(values);
  }
};
_NgpAccordion.ɵfac = function NgpAccordion_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpAccordion)();
};
_NgpAccordion.ɵdir = ɵɵdefineDirective({
  type: _NgpAccordion,
  selectors: [["", "ngpAccordion", ""]],
  hostVars: 2,
  hostBindings: function NgpAccordion_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("data-orientation", ctx.state.orientation())("data-disabled", ctx.state.disabled() ? "" : null);
    }
  },
  inputs: {
    type: [1, "ngpAccordionType", "type"],
    collapsible: [1, "ngpAccordionCollapsible", "collapsible"],
    value: [1, "ngpAccordionValue", "value"],
    disabled: [1, "ngpAccordionDisabled", "disabled"],
    orientation: [1, "ngpAccordionOrientation", "orientation"]
  },
  outputs: {
    valueChange: "ngpAccordionValueChange"
  },
  exportAs: ["ngpAccordion"],
  features: [ɵɵProvidersFeature([provideAccordionState()])]
});
var NgpAccordion = _NgpAccordion;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpAccordion, [{
    type: Directive,
    args: [{
      selector: "[ngpAccordion]",
      exportAs: "ngpAccordion",
      providers: [provideAccordionState()],
      host: {
        "[attr.data-orientation]": "state.orientation()",
        "[attr.data-disabled]": 'state.disabled() ? "" : null'
      }
    }]
  }], null, null);
})();
export {
  NgpAccordion,
  NgpAccordionContent,
  NgpAccordionItem,
  NgpAccordionTrigger,
  injectAccordionItemState,
  injectAccordionState,
  provideAccordionConfig,
  provideAccordionItemState,
  provideAccordionState
};
//# sourceMappingURL=ng-primitives_accordion.js.map
