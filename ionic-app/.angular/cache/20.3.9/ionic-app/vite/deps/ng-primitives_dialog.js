import {
  NgpFocusTrap
} from "./chunk-VI7DYHDS.js";
import "./chunk-3IZ6YSMQ.js";
import {
  FocusMonitor,
  NgpExitAnimation,
  NgpExitAnimationManager,
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken
} from "./chunk-WE5NZ3WV.js";
import {
  onChange,
  uniqueId
} from "./chunk-FYRG6RZJ.js";
import "./chunk-O5JGTJFR.js";
import {
  ComponentPortal,
  Overlay,
  OverlayConfig,
  OverlayContainer,
  TemplatePortal
} from "./chunk-JQYZCTGU.js";
import {
  hasModifierKey
} from "./chunk-ALQK544G.js";
import "./chunk-YLELG2JA.js";
import "./chunk-3WNF3QYK.js";
import "./chunk-Q4CR4ILL.js";
import "./chunk-BADZCE2L.js";
import "./chunk-7P4ZKDVH.js";
import {
  ApplicationRef,
  DOCUMENT,
  Directive,
  HostListener,
  Injectable,
  InjectionToken,
  Injector,
  Subject,
  TemplateRef,
  ViewContainerRef,
  booleanAttribute,
  defer,
  inject,
  input,
  isDevMode,
  output,
  setClassMetadata,
  signal,
  startWith,
  ɵɵHostDirectivesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵdefineInjectable,
  ɵɵdomProperty,
  ɵɵlistener
} from "./chunk-V52YD5AQ.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-dialog.mjs
var defaultDialogConfig = {
  role: "dialog",
  modal: true,
  closeOnNavigation: true,
  closeOnEscape: true,
  closeOnClick: true
};
var NgpDialogConfigToken = new InjectionToken("NgpDialogConfigToken");
function provideDialogConfig(config) {
  return [{
    provide: NgpDialogConfigToken,
    useValue: __spreadValues(__spreadValues({}, defaultDialogConfig), config)
  }];
}
function injectDialogConfig() {
  return inject(NgpDialogConfigToken, {
    optional: true
  }) ?? defaultDialogConfig;
}
var NgpDialogStateToken = createStateToken("Dialog");
var provideDialogState = createStateProvider(NgpDialogStateToken);
var injectDialogState = createStateInjector(NgpDialogStateToken);
var dialogState = createState(NgpDialogStateToken);
var _NgpDialogDescription = class _NgpDialogDescription {
  constructor() {
    this.dialog = injectDialogState();
    this.id = input(uniqueId("ngp-dialog-description"));
    onChange(this.id, (id, prevId) => {
      if (prevId) {
        this.dialog().removeDescribedBy(prevId);
      }
      if (id) {
        this.dialog().setDescribedBy(id);
      }
    });
  }
  ngOnDestroy() {
    this.dialog().removeDescribedBy(this.id());
  }
};
_NgpDialogDescription.ɵfac = function NgpDialogDescription_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDialogDescription)();
};
_NgpDialogDescription.ɵdir = ɵɵdefineDirective({
  type: _NgpDialogDescription,
  selectors: [["", "ngpDialogDescription", ""]],
  hostVars: 1,
  hostBindings: function NgpDialogDescription_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpDialogDescription"]
});
var NgpDialogDescription = _NgpDialogDescription;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDialogDescription, [{
    type: Directive,
    args: [{
      selector: "[ngpDialogDescription]",
      exportAs: "ngpDialogDescription",
      host: {
        "[id]": "id()"
      }
    }]
  }], () => [], null);
})();
var NgpDialogRef = class {
  constructor(overlayRef, config) {
    this.overlayRef = overlayRef;
    this.config = config;
    this.closed = new Subject();
    this.closing = false;
    this.data = config.data;
    this.keydownEvents = overlayRef.keydownEvents();
    this.outsidePointerEvents = overlayRef.outsidePointerEvents();
    this.id = config.id;
    this.closeOnEscape = config.closeOnEscape ?? true;
    this.keydownEvents.subscribe((event) => {
      if (event.key === "Escape" && !this.disableClose && this.closeOnEscape !== false && !hasModifierKey(event)) {
        event.preventDefault();
        this.close(void 0, "keyboard");
      }
    });
    this.detachSubscription = overlayRef.detachments().subscribe(() => this.close());
  }
  /**
   * Close the dialog.
   * @param result Optional result to return to the dialog opener.
   * @param options Additional options to customize the closing behavior.
   */
  close(result, focusOrigin) {
    return __async(this, null, function* () {
      if (this.closing) {
        return;
      }
      this.closing = true;
      const exitAnimationManager = this.injector?.get(NgpExitAnimationManager, void 0, {
        optional: true
      });
      if (exitAnimationManager) {
        yield exitAnimationManager.exit();
      }
      this.overlayRef.dispose();
      this.detachSubscription.unsubscribe();
      this.closed.next({
        focusOrigin,
        result
      });
      this.closed.complete();
    });
  }
  /** Updates the position of the dialog based on the current position strategy. */
  updatePosition() {
    this.overlayRef.updatePosition();
    return this;
  }
};
function injectDialogRef() {
  return inject(NgpDialogRef);
}
var _NgpDialogOverlay = class _NgpDialogOverlay {
  constructor() {
    this.config = injectDialogConfig();
    this.dialogRef = injectDialogRef();
    this.closeOnClick = input(this.config.closeOnClick, {
      alias: "ngpDialogOverlayCloseOnClick",
      transform: booleanAttribute
    });
  }
  close() {
    if (this.closeOnClick()) {
      this.dialogRef.close(void 0, "mouse");
    }
  }
};
_NgpDialogOverlay.ɵfac = function NgpDialogOverlay_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDialogOverlay)();
};
_NgpDialogOverlay.ɵdir = ɵɵdefineDirective({
  type: _NgpDialogOverlay,
  selectors: [["", "ngpDialogOverlay", ""]],
  hostBindings: function NgpDialogOverlay_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpDialogOverlay_click_HostBindingHandler() {
        return ctx.close();
      });
    }
  },
  inputs: {
    closeOnClick: [1, "ngpDialogOverlayCloseOnClick", "closeOnClick"]
  },
  exportAs: ["ngpDialogOverlay"],
  features: [ɵɵHostDirectivesFeature([NgpExitAnimation])]
});
var NgpDialogOverlay = _NgpDialogOverlay;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDialogOverlay, [{
    type: Directive,
    args: [{
      selector: "[ngpDialogOverlay]",
      exportAs: "ngpDialogOverlay",
      hostDirectives: [NgpExitAnimation]
    }]
  }], null, {
    close: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _NgpDialogTitle = class _NgpDialogTitle {
  constructor() {
    this.dialog = injectDialogState();
    this.id = input(uniqueId("ngp-dialog-title"));
    onChange(this.id, (id, prevId) => {
      if (prevId) {
        this.dialog().removeLabelledBy(prevId);
      }
      if (id) {
        this.dialog().setLabelledBy(id);
      }
    });
  }
  ngOnDestroy() {
    this.dialog().removeLabelledBy(this.id());
  }
};
_NgpDialogTitle.ɵfac = function NgpDialogTitle_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDialogTitle)();
};
_NgpDialogTitle.ɵdir = ɵɵdefineDirective({
  type: _NgpDialogTitle,
  selectors: [["", "ngpDialogTitle", ""]],
  hostVars: 1,
  hostBindings: function NgpDialogTitle_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpDialogTitle"]
});
var NgpDialogTitle = _NgpDialogTitle;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDialogTitle, [{
    type: Directive,
    args: [{
      selector: "[ngpDialogTitle]",
      exportAs: "ngpDialogTitle",
      host: {
        "[id]": "id()"
      }
    }]
  }], () => [], null);
})();
var _NgpDialogManager = class _NgpDialogManager {
  constructor() {
    this.applicationRef = inject(ApplicationRef);
    this.document = inject(DOCUMENT);
    this.overlay = inject(Overlay);
    this.focusMonitor = inject(FocusMonitor);
    this.defaultOptions = injectDialogConfig();
    this.parentDialogManager = inject(_NgpDialogManager, {
      optional: true,
      skipSelf: true
    });
    this.overlayContainer = inject(OverlayContainer);
    this.scrollStrategy = this.defaultOptions.scrollStrategy ?? this.overlay.scrollStrategies.block();
    this.openDialogsAtThisLevel = [];
    this.afterAllClosedAtThisLevel = new Subject();
    this.afterOpenedAtThisLevel = new Subject();
    this.ariaHiddenElements = /* @__PURE__ */ new Map();
    this.afterAllClosed = defer(() => this.openDialogs.length ? this.getAfterAllClosed() : this.getAfterAllClosed().pipe(startWith(void 0)));
  }
  /** Keeps track of the currently-open dialogs. */
  get openDialogs() {
    return this.parentDialogManager ? this.parentDialogManager.openDialogs : this.openDialogsAtThisLevel;
  }
  /** Stream that emits when a dialog has been opened. */
  get afterOpened() {
    return this.parentDialogManager ? this.parentDialogManager.afterOpened : this.afterOpenedAtThisLevel;
  }
  /**
   * Opens a modal dialog containing the given template.
   */
  open(templateRefOrComponentType, config) {
    const activeElement = this.document.activeElement;
    const viewContainerRef = this.applicationRef.components[0]?.injector.get(ViewContainerRef) ?? config?.viewContainerRef ?? config?.injector?.get(ViewContainerRef);
    const defaults = this.defaultOptions;
    config = __spreadValues(__spreadProps(__spreadValues({}, defaults), {
      viewContainerRef
    }), config);
    config.id = config.id ?? uniqueId("ngp-dialog");
    if (config.id && this.getDialogById(config.id) && isDevMode()) {
      throw Error(`Dialog with id "${config.id}" exists already. The dialog id must be unique.`);
    }
    const overlayConfig = this.getOverlayConfig(config);
    const overlayRef = this.overlay.create(overlayConfig);
    const dialogRef = new NgpDialogRef(overlayRef, config);
    const injector = this.createInjector(config, dialogRef, void 0);
    dialogRef.injector = injector;
    const context = {
      $implicit: dialogRef,
      close: dialogRef.close.bind(dialogRef)
    };
    if (templateRefOrComponentType instanceof TemplateRef) {
      overlayRef.attach(new TemplatePortal(templateRefOrComponentType, config.viewContainerRef, context, injector));
    } else {
      overlayRef.attach(new ComponentPortal(templateRefOrComponentType, config.viewContainerRef, injector));
    }
    if (!this.openDialogs.length) {
      this.hideNonDialogContentFromAssistiveTechnology();
    }
    this.openDialogs.push(dialogRef);
    this.afterOpened.next(dialogRef);
    dialogRef.closed.subscribe((closeResult) => {
      this.removeOpenDialog(dialogRef, true);
      if (activeElement instanceof HTMLElement && this.document.body.contains(activeElement)) {
        this.focusMonitor.focusVia(activeElement, closeResult.focusOrigin ?? this.focusMonitor._lastFocusOrigin);
      }
    });
    return dialogRef;
  }
  /**
   * Closes all of the currently-open dialogs.
   */
  closeAll() {
    reverseForEach(this.openDialogs, (dialog) => dialog.close());
  }
  /**
   * Finds an open dialog by its id.
   * @param id ID to use when looking up the dialog.
   */
  getDialogById(id) {
    return this.openDialogs.find((dialog) => dialog.id === id);
  }
  ngOnDestroy() {
    reverseForEach(this.openDialogsAtThisLevel, (dialog) => {
      this.removeOpenDialog(dialog, false);
    });
    reverseForEach(this.openDialogsAtThisLevel, (dialog) => dialog.close());
    this.afterAllClosedAtThisLevel.complete();
    this.afterOpenedAtThisLevel.complete();
    this.openDialogsAtThisLevel = [];
  }
  /**
   * Creates an overlay config from a dialog config.
   */
  getOverlayConfig(config) {
    const state = new OverlayConfig({
      positionStrategy: this.overlay.position().global().centerHorizontally().centerVertically(),
      scrollStrategy: config.scrollStrategy || this.scrollStrategy,
      hasBackdrop: false,
      disposeOnNavigation: config.closeOnNavigation
    });
    return state;
  }
  /**
   * Creates a custom injector to be used inside the dialog. This allows a component loaded inside
   * of a dialog to close itself and, optionally, to return a value.
   */
  createInjector(config, dialogRef, fallbackInjector) {
    const userInjector = config.injector || config.viewContainerRef?.injector;
    const providers = [{
      provide: NgpDialogRef,
      useValue: dialogRef
    }, {
      provide: NgpExitAnimationManager,
      useClass: NgpExitAnimationManager
    }];
    return Injector.create({
      parent: userInjector || fallbackInjector,
      providers
    });
  }
  /**
   * Removes a dialog from the array of open dialogs.
   */
  removeOpenDialog(dialogRef, emitEvent) {
    const index = this.openDialogs.indexOf(dialogRef);
    if (index > -1) {
      this.openDialogs.splice(index, 1);
      if (!this.openDialogs.length) {
        this.ariaHiddenElements.forEach((previousValue, element) => {
          if (previousValue) {
            element.setAttribute("aria-hidden", previousValue);
          } else {
            element.removeAttribute("aria-hidden");
          }
        });
        this.ariaHiddenElements.clear();
        if (emitEvent) {
          this.getAfterAllClosed().next();
        }
      }
    }
  }
  /** Hides all of the content that isn't an overlay from assistive technology. */
  hideNonDialogContentFromAssistiveTechnology() {
    const overlayContainer = this.overlayContainer.getContainerElement();
    if (overlayContainer.parentElement) {
      const siblings = overlayContainer.parentElement.children;
      for (let i = siblings.length - 1; i > -1; i--) {
        const sibling = siblings[i];
        if (sibling !== overlayContainer && sibling.nodeName !== "SCRIPT" && sibling.nodeName !== "STYLE" && !sibling.hasAttribute("aria-live")) {
          this.ariaHiddenElements.set(sibling, sibling.getAttribute("aria-hidden"));
          sibling.setAttribute("aria-hidden", "true");
        }
      }
    }
  }
  getAfterAllClosed() {
    const parent = this.parentDialogManager;
    return parent ? parent.getAfterAllClosed() : this.afterAllClosedAtThisLevel;
  }
};
_NgpDialogManager.ɵfac = function NgpDialogManager_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDialogManager)();
};
_NgpDialogManager.ɵprov = ɵɵdefineInjectable({
  token: _NgpDialogManager,
  factory: _NgpDialogManager.ɵfac,
  providedIn: "root"
});
var NgpDialogManager = _NgpDialogManager;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDialogManager, [{
    type: Injectable,
    args: [{
      providedIn: "root"
    }]
  }], null, null);
})();
function reverseForEach(items, callback) {
  let i = items.length;
  while (i--) {
    callback(items[i]);
  }
}
var _NgpDialogTrigger = class _NgpDialogTrigger {
  constructor() {
    this.config = injectDialogConfig();
    this.dialogManager = inject(NgpDialogManager);
    this.template = input.required({
      alias: "ngpDialogTrigger"
    });
    this.closed = output({
      alias: "ngpDialogTriggerClosed"
    });
    this.closeOnEscape = input(this.config.closeOnEscape, {
      alias: "ngpDialogTriggerCloseOnEscape"
    });
    this.dialogRef = null;
  }
  launch() {
    this.dialogRef = this.dialogManager.open(this.template(), {
      closeOnEscape: this.closeOnEscape()
    });
    this.dialogRef.closed.subscribe(({
      result
    }) => {
      this.closed.emit(result);
      return this.dialogRef = null;
    });
  }
};
_NgpDialogTrigger.ɵfac = function NgpDialogTrigger_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDialogTrigger)();
};
_NgpDialogTrigger.ɵdir = ɵɵdefineDirective({
  type: _NgpDialogTrigger,
  selectors: [["", "ngpDialogTrigger", ""]],
  hostBindings: function NgpDialogTrigger_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpDialogTrigger_click_HostBindingHandler() {
        return ctx.launch();
      });
    }
  },
  inputs: {
    template: [1, "ngpDialogTrigger", "template"],
    closeOnEscape: [1, "ngpDialogTriggerCloseOnEscape", "closeOnEscape"]
  },
  outputs: {
    closed: "ngpDialogTriggerClosed"
  },
  exportAs: ["ngpDialogTrigger"]
});
var NgpDialogTrigger = _NgpDialogTrigger;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDialogTrigger, [{
    type: Directive,
    args: [{
      selector: "[ngpDialogTrigger]",
      exportAs: "ngpDialogTrigger"
    }]
  }], null, {
    launch: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _NgpDialog = class _NgpDialog {
  constructor() {
    this.config = injectDialogConfig();
    this.dialogRef = injectDialogRef();
    this.id = input(uniqueId("ngp-dialog"));
    this.role = input(this.config.role, {
      alias: "ngpDialogRole"
    });
    this.modal = input(this.config.modal ?? false, {
      alias: "ngpDialogModal",
      transform: booleanAttribute
    });
    this.labelledBy = signal([]);
    this.describedBy = signal([]);
    this.state = dialogState(this);
  }
  ngOnDestroy() {
    this.close();
  }
  /** Close the dialog. */
  close(result) {
    this.dialogRef.close(result);
  }
  /** Stop click events from propagating to the overlay */
  onClick(event) {
    event.stopPropagation();
  }
  /** @internal register a labelledby id */
  setLabelledBy(id) {
    this.labelledBy.update((ids) => [...ids, id]);
  }
  /** @internal register a describedby id */
  setDescribedBy(id) {
    this.describedBy.update((ids) => [...ids, id]);
  }
  /** @internal remove a labelledby id */
  removeLabelledBy(id) {
    this.labelledBy.update((ids) => ids.filter((i) => i !== id));
  }
  /** @internal remove a describedby id */
  removeDescribedBy(id) {
    this.describedBy.update((ids) => ids.filter((i) => i !== id));
  }
};
_NgpDialog.ɵfac = function NgpDialog_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDialog)();
};
_NgpDialog.ɵdir = ɵɵdefineDirective({
  type: _NgpDialog,
  selectors: [["", "ngpDialog", ""]],
  hostAttrs: ["tabindex", "-1"],
  hostVars: 5,
  hostBindings: function NgpDialog_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpDialog_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.state.id());
      ɵɵattribute("role", ctx.state.role())("aria-modal", ctx.state.modal())("aria-labelledby", ctx.labelledBy().join(" "))("aria-describedby", ctx.describedBy().join(" "));
    }
  },
  inputs: {
    id: [1, "id"],
    role: [1, "ngpDialogRole", "role"],
    modal: [1, "ngpDialogModal", "modal"]
  },
  exportAs: ["ngpDialog"],
  features: [ɵɵProvidersFeature([provideDialogState()]), ɵɵHostDirectivesFeature([NgpFocusTrap, NgpExitAnimation])]
});
var NgpDialog = _NgpDialog;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDialog, [{
    type: Directive,
    args: [{
      selector: "[ngpDialog]",
      exportAs: "ngpDialog",
      providers: [provideDialogState()],
      hostDirectives: [NgpFocusTrap, NgpExitAnimation],
      host: {
        tabindex: "-1",
        "[id]": "state.id()",
        "[attr.role]": "state.role()",
        "[attr.aria-modal]": "state.modal()",
        "[attr.aria-labelledby]": 'labelledBy().join(" ")',
        "[attr.aria-describedby]": 'describedBy().join(" ")'
      }
    }]
  }], null, {
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();
export {
  NgpDialog,
  NgpDialogDescription,
  NgpDialogManager,
  NgpDialogOverlay,
  NgpDialogRef,
  NgpDialogTitle,
  NgpDialogTrigger,
  injectDialogRef,
  injectDialogState,
  provideDialogConfig,
  provideDialogState
};
//# sourceMappingURL=ng-primitives_dialog.js.map
