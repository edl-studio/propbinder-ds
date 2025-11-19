import {
  createOverlay,
  injectOverlay,
  injectOverlayContext,
  setupOverlayArrow
} from "./chunk-SMV444GZ.js";
import {
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  explicitEffect,
  setupHover,
  setupOverflowListener
} from "./chunk-NOHFT6FW.js";
import {
  isString
} from "./chunk-7VMOF35L.js";
import "./chunk-RQY3LDOR.js";
import "./chunk-YLELG2JA.js";
import "./chunk-ASRTBG6W.js";
import "./chunk-ALQK544G.js";
import "./chunk-DVKNGLUY.js";
import "./chunk-GMOFOGO5.js";
import "./chunk-53KHQLJJ.js";
import "./chunk-ILS3C6C2.js";
import {
  Component,
  Directive,
  ElementRef,
  InjectionToken,
  Injector,
  ViewContainerRef,
  booleanAttribute,
  computed,
  inject,
  input,
  numberAttribute,
  setClassMetadata,
  signal,
  ɵɵHostDirectivesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdefineDirective,
  ɵɵdomProperty,
  ɵɵlistener,
  ɵɵstyleProp,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-JIIPHG5Y.js";
import {
  __spreadValues
} from "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-tooltip.mjs
var defaultTooltipConfig = {
  offset: 4,
  placement: "top",
  showDelay: 0,
  hideDelay: 500,
  flip: true,
  container: "body",
  showOnOverflow: false,
  useTextContent: true
};
var NgpTooltipConfigToken = new InjectionToken("NgpTooltipConfigToken");
function provideTooltipConfig(config) {
  return [{
    provide: NgpTooltipConfigToken,
    useValue: __spreadValues(__spreadValues({}, defaultTooltipConfig), config)
  }];
}
function injectTooltipConfig() {
  return inject(NgpTooltipConfigToken, {
    optional: true
  }) ?? defaultTooltipConfig;
}
var _NgpTooltipArrow = class _NgpTooltipArrow {
  constructor() {
    setupOverlayArrow();
  }
};
_NgpTooltipArrow.ɵfac = function NgpTooltipArrow_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpTooltipArrow)();
};
_NgpTooltipArrow.ɵdir = ɵɵdefineDirective({
  type: _NgpTooltipArrow,
  selectors: [["", "ngpTooltipArrow", ""]],
  exportAs: ["ngpTooltipArrow"]
});
var NgpTooltipArrow = _NgpTooltipArrow;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpTooltipArrow, [{
    type: Directive,
    args: [{
      selector: "[ngpTooltipArrow]",
      exportAs: "ngpTooltipArrow"
    }]
  }], () => [], null);
})();
var _NgpTooltip = class _NgpTooltip {
  constructor() {
    this.overlay = injectOverlay();
    this.id = input(this.overlay.id());
    explicitEffect([this.id], ([id]) => this.overlay.id.set(id));
    setupHover({
      hoverStart: () => this.overlay.cancelPendingClose(),
      hoverEnd: () => this.overlay.hide()
    });
  }
};
_NgpTooltip.ɵfac = function NgpTooltip_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpTooltip)();
};
_NgpTooltip.ɵdir = ɵɵdefineDirective({
  type: _NgpTooltip,
  selectors: [["", "ngpTooltip", ""]],
  hostAttrs: ["role", "tooltip", "data-overlay", ""],
  hostVars: 10,
  hostBindings: function NgpTooltip_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
      ɵɵattribute("data-placement", ctx.overlay.finalPlacement());
      ɵɵstyleProp("left", ctx.overlay.position().x, "px")("top", ctx.overlay.position().y, "px")("--ngp-tooltip-trigger-width", ctx.overlay.triggerWidth(), "px")("--ngp-tooltip-transform-origin", ctx.overlay.transformOrigin());
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpTooltip"]
});
var NgpTooltip = _NgpTooltip;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpTooltip, [{
    type: Directive,
    args: [{
      selector: "[ngpTooltip]",
      exportAs: "ngpTooltip",
      host: {
        role: "tooltip",
        "[id]": "id()",
        "[style.left.px]": "overlay.position().x",
        "[style.top.px]": "overlay.position().y",
        "[style.--ngp-tooltip-trigger-width.px]": "overlay.triggerWidth()",
        "[style.--ngp-tooltip-transform-origin]": "overlay.transformOrigin()",
        "[attr.data-placement]": "overlay.finalPlacement()",
        "data-overlay": ""
      }
    }]
  }], () => [], null);
})();
var _NgpTooltipTextContentComponent = class _NgpTooltipTextContentComponent {
  constructor() {
    this.content = injectOverlayContext();
  }
};
_NgpTooltipTextContentComponent.ɵfac = function NgpTooltipTextContentComponent_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpTooltipTextContentComponent)();
};
_NgpTooltipTextContentComponent.ɵcmp = ɵɵdefineComponent({
  type: _NgpTooltipTextContentComponent,
  selectors: [["ng-component"]],
  hostAttrs: ["ngpTooltip", ""],
  features: [ɵɵHostDirectivesFeature([NgpTooltip])],
  decls: 1,
  vars: 1,
  template: function NgpTooltipTextContentComponent_Template(rf, ctx) {
    if (rf & 1) {
      ɵɵtext(0);
    }
    if (rf & 2) {
      ɵɵtextInterpolate(ctx.content());
    }
  },
  encapsulation: 2
});
var NgpTooltipTextContentComponent = _NgpTooltipTextContentComponent;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpTooltipTextContentComponent, [{
    type: Component,
    args: [{
      template: "{{ content() }}",
      hostDirectives: [NgpTooltip],
      host: {
        // Used only for styling, since the host directive isn’t added to the DOM.
        // This acts as the styling entry point.
        ngpTooltip: ""
      }
    }]
  }], null, null);
})();
var NgpTooltipTriggerStateToken = createStateToken("TooltipTrigger");
var provideTooltipTriggerState = createStateProvider(NgpTooltipTriggerStateToken);
var injectTooltipTriggerState = createStateInjector(NgpTooltipTriggerStateToken);
var tooltipTriggerState = createState(NgpTooltipTriggerStateToken);
var _NgpTooltipTrigger = class _NgpTooltipTrigger {
  constructor() {
    this.trigger = inject(ElementRef);
    this.injector = inject(Injector);
    this.viewContainerRef = inject(ViewContainerRef);
    this.config = injectTooltipConfig();
    this.tooltip = input(null, {
      alias: "ngpTooltipTrigger",
      transform: (value) => value && !isString(value) ? value : null
    });
    this.disabled = input(false, {
      alias: "ngpTooltipTriggerDisabled",
      transform: booleanAttribute
    });
    this.placement = input(this.config.placement, {
      alias: "ngpTooltipTriggerPlacement"
    });
    this.offset = input(this.config.offset, {
      alias: "ngpTooltipTriggerOffset",
      transform: numberAttribute
    });
    this.showDelay = input(this.config.showDelay, {
      alias: "ngpTooltipTriggerShowDelay",
      transform: numberAttribute
    });
    this.hideDelay = input(this.config.hideDelay, {
      alias: "ngpTooltipTriggerHideDelay",
      transform: numberAttribute
    });
    this.flip = input(this.config.flip, {
      alias: "ngpTooltipTriggerFlip",
      transform: booleanAttribute
    });
    this.container = input(this.config.container, {
      alias: "ngpTooltipTriggerContainer"
    });
    this.showOnOverflow = input(this.config.showOnOverflow, {
      alias: "ngpTooltipTriggerShowOnOverflow",
      transform: booleanAttribute
    });
    this.context = input(void 0, {
      alias: "ngpTooltipTriggerContext"
    });
    this.useTextContent = input(this.config.useTextContent, {
      alias: "ngpTooltipTriggerUseTextContent",
      transform: booleanAttribute
    });
    this.overlay = signal(null);
    this.tooltipId = signal(void 0);
    this.open = computed(() => this.overlay()?.isOpen() ?? false);
    this.state = tooltipTriggerState(this);
    this.hasOverflow = setupOverflowListener(this.trigger.nativeElement, {
      disabled: computed(() => !this.state.showOnOverflow())
    });
  }
  ngOnDestroy() {
    this.overlay()?.destroy();
  }
  /**
   * Show the tooltip.
   */
  show() {
    if (this.state.disabled() || this.open()) {
      this.overlay()?.cancelPendingClose();
      return;
    }
    if (this.state.showOnOverflow() && !this.hasOverflow()) {
      return;
    }
    if (!this.overlay()) {
      this.createOverlay();
    }
    this.overlay()?.show();
  }
  /**
   * Hide the tooltip.
   */
  hide() {
    if (this.state.disabled()) {
      return;
    }
    this.overlay()?.hide();
  }
  /**
   * Create the overlay that will contain the tooltip
   */
  createOverlay() {
    const shouldUseTextContent = this.state.useTextContent();
    let content = this.state.tooltip();
    let context = this.state.context;
    if (!content) {
      if (!shouldUseTextContent) {
        if (ngDevMode) {
          throw new Error("[ngpTooltipTrigger]: Tooltip must be a string, TemplateRef, or ComponentType. Alternatively, set useTextContent to true if none is provided.");
        }
        return;
      }
      const textContent = this.trigger.nativeElement.textContent?.trim() || "";
      if (ngDevMode && !textContent) {
        console.warn("[ngpTooltipTrigger]: useTextContent is enabled but trigger element has no text content");
        return;
      }
      content = NgpTooltipTextContentComponent;
      context = signal(textContent);
    } else if (isString(content)) {
      context = signal(content);
      content = NgpTooltipTextContentComponent;
    }
    const config = {
      content,
      triggerElement: this.trigger.nativeElement,
      injector: this.injector,
      context,
      container: this.state.container(),
      placement: this.state.placement(),
      offset: this.state.offset(),
      flip: this.state.flip(),
      showDelay: this.state.showDelay(),
      hideDelay: this.state.hideDelay(),
      closeOnEscape: true,
      closeOnOutsideClick: true,
      viewContainerRef: this.viewContainerRef
    };
    this.overlay.set(createOverlay(config));
  }
  /**
   * Set the tooltip id.
   */
  setTooltipId(id) {
    this.tooltipId.set(id);
  }
};
_NgpTooltipTrigger.ɵfac = function NgpTooltipTrigger_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpTooltipTrigger)();
};
_NgpTooltipTrigger.ɵdir = ɵɵdefineDirective({
  type: _NgpTooltipTrigger,
  selectors: [["", "ngpTooltipTrigger", ""]],
  hostVars: 3,
  hostBindings: function NgpTooltipTrigger_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("mouseenter", function NgpTooltipTrigger_mouseenter_HostBindingHandler() {
        return ctx.show();
      })("mouseleave", function NgpTooltipTrigger_mouseleave_HostBindingHandler() {
        return ctx.hide();
      })("focus", function NgpTooltipTrigger_focus_HostBindingHandler() {
        return ctx.show();
      })("blur", function NgpTooltipTrigger_blur_HostBindingHandler() {
        return ctx.hide();
      });
    }
    if (rf & 2) {
      let tmp_2_0;
      ɵɵattribute("data-open", ctx.open() ? "" : null)("data-disabled", ctx.state.disabled() ? "" : null)("aria-describedby", (tmp_2_0 = ctx.overlay()) == null ? null : tmp_2_0.ariaDescribedBy());
    }
  },
  inputs: {
    tooltip: [1, "ngpTooltipTrigger", "tooltip"],
    disabled: [1, "ngpTooltipTriggerDisabled", "disabled"],
    placement: [1, "ngpTooltipTriggerPlacement", "placement"],
    offset: [1, "ngpTooltipTriggerOffset", "offset"],
    showDelay: [1, "ngpTooltipTriggerShowDelay", "showDelay"],
    hideDelay: [1, "ngpTooltipTriggerHideDelay", "hideDelay"],
    flip: [1, "ngpTooltipTriggerFlip", "flip"],
    container: [1, "ngpTooltipTriggerContainer", "container"],
    showOnOverflow: [1, "ngpTooltipTriggerShowOnOverflow", "showOnOverflow"],
    context: [1, "ngpTooltipTriggerContext", "context"],
    useTextContent: [1, "ngpTooltipTriggerUseTextContent", "useTextContent"]
  },
  exportAs: ["ngpTooltipTrigger"],
  features: [ɵɵProvidersFeature([provideTooltipTriggerState()])]
});
var NgpTooltipTrigger = _NgpTooltipTrigger;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpTooltipTrigger, [{
    type: Directive,
    args: [{
      selector: "[ngpTooltipTrigger]",
      exportAs: "ngpTooltipTrigger",
      providers: [provideTooltipTriggerState()],
      host: {
        "[attr.data-open]": 'open() ? "" : null',
        "[attr.data-disabled]": 'state.disabled() ? "" : null',
        "[attr.aria-describedby]": "overlay()?.ariaDescribedBy()",
        "(mouseenter)": "show()",
        "(mouseleave)": "hide()",
        "(focus)": "show()",
        "(blur)": "hide()"
      }
    }]
  }], () => [], null);
})();
export {
  NgpTooltip,
  NgpTooltipArrow,
  NgpTooltipTrigger,
  injectOverlayContext as injectTooltipContext,
  injectTooltipTriggerState,
  provideTooltipConfig,
  provideTooltipTriggerState
};
//# sourceMappingURL=ng-primitives_tooltip.js.map
