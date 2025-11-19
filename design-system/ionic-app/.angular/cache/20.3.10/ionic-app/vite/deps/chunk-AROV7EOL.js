import {
  NgpOverlay
} from "./chunk-QDL3VOQ2.js";
import {
  FocusMonitor,
  InteractivityChecker,
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken
} from "./chunk-KHYMN57T.js";
import {
  safeTakeUntilDestroyed
} from "./chunk-7VMOF35L.js";
import {
  Directive,
  ElementRef,
  HostListener,
  Injector,
  NgZone,
  afterNextRender,
  booleanAttribute,
  inject,
  input,
  setClassMetadata,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵlistener
} from "./chunk-JIIPHG5Y.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-focus-trap.mjs
var NgpFocusTrapStateToken = createStateToken("FocusTrap");
var provideFocusTrapState = createStateProvider(NgpFocusTrapStateToken);
var injectFocusTrapState = createStateInjector(NgpFocusTrapStateToken);
var focusTrapState = createState(NgpFocusTrapStateToken);
var FocusTrap = class {
  constructor() {
    this.active = false;
  }
  /**
   * Activates the focus trap.
   */
  activate() {
    this.active = true;
  }
  /**
   * Deactivates the focus trap.
   */
  deactivate() {
    this.active = false;
  }
};
var FocusTrapStack = class {
  constructor() {
    this.stack = [];
  }
  /**
   * Adds a focus trap to the stack.
   */
  add(focusTrap) {
    this.stack.forEach((t) => t.deactivate());
    this.stack.push(focusTrap);
    focusTrap.activate();
  }
  /**
   * Removes a focus trap from the stack.
   */
  remove(focusTrap) {
    const index = this.stack.indexOf(focusTrap);
    if (index >= 0) {
      this.stack.splice(index, 1);
    }
    const previous = this.stack[this.stack.length - 1];
    if (previous) {
      previous.activate();
    }
  }
};
var focusTrapStack = new FocusTrapStack();
var _NgpFocusTrap = class _NgpFocusTrap {
  constructor() {
    this.overlay = inject(NgpOverlay, {
      optional: true
    });
    this.focusTrap = new FocusTrap();
    this.injector = inject(Injector);
    this.focusMonitor = inject(FocusMonitor);
    this.interactivityChecker = inject(InteractivityChecker);
    this.elementRef = inject(ElementRef);
    this.ngZone = inject(NgZone);
    this.mutationObserver = null;
    this.lastFocusedElement = null;
    this.disabled = input(false, {
      alias: "ngpFocusTrapDisabled",
      transform: booleanAttribute
    });
    this.state = focusTrapState(this);
    this.overlay?.closing.pipe(safeTakeUntilDestroyed()).subscribe(() => this.focusTrap.deactivate());
  }
  ngOnInit() {
    focusTrapStack.add(this.focusTrap);
    this.mutationObserver = new MutationObserver(this.handleMutations.bind(this));
    this.ngZone.runOutsideAngular(() => {
      this.mutationObserver.observe(this.elementRef.nativeElement, {
        childList: true,
        subtree: true
      });
      document.addEventListener("focusin", this.handleFocusIn.bind(this));
      document.addEventListener("focusout", this.handleFocusOut.bind(this));
    });
    const previouslyFocusedElement = document.activeElement;
    const hasFocusedCandidate = this.elementRef.nativeElement.contains(previouslyFocusedElement);
    if (!hasFocusedCandidate) {
      afterNextRender({
        write: () => {
          this.focusFirst();
          if (document.activeElement === previouslyFocusedElement) {
            this.focus(this.elementRef.nativeElement);
          }
        }
      }, {
        injector: this.injector
      });
    }
  }
  ngOnDestroy() {
    focusTrapStack.remove(this.focusTrap);
    this.mutationObserver?.disconnect();
    this.mutationObserver = null;
    this.focusTrap.deactivate();
  }
  handleFocusIn(event) {
    if (!this.focusTrap.active || this.state.disabled()) {
      return;
    }
    const target = event.target;
    if (this.elementRef.nativeElement.contains(target)) {
      this.lastFocusedElement = target;
    } else {
      this.focus(this.lastFocusedElement);
    }
  }
  /**
   * Handles the `focusout` event.
   */
  handleFocusOut(event) {
    if (!this.focusTrap.active || this.state.disabled() || event.relatedTarget === null) {
      return;
    }
    const relatedTarget = event.relatedTarget;
    if (!this.elementRef.nativeElement.contains(relatedTarget)) {
      this.focus(this.lastFocusedElement);
    }
  }
  /**
   * If the focused element gets removed from the DOM, browsers move focus back to the document.body.
   * We move focus to the container to keep focus trapped correctly.
   */
  handleMutations(mutations) {
    const focusedElement = document.activeElement;
    if (focusedElement !== document.body) {
      return;
    }
    for (const mutation of mutations) {
      if (mutation.removedNodes.length > 0) {
        this.focus(this.elementRef.nativeElement);
      }
    }
  }
  /**
   * Handles the `keydown` event.
   */
  handleKeyDown(event) {
    if (!this.focusTrap.active || this.state.disabled()) {
      return;
    }
    const isTabKey = event.key === "Tab" && !event.altKey && !event.ctrlKey && !event.metaKey;
    const focusedElement = document.activeElement;
    if (isTabKey && focusedElement) {
      const container = event.currentTarget;
      const [first, last] = this.getTabbableEdges(container);
      const hasTabbableElementsInside = first && last;
      if (!hasTabbableElementsInside) {
        if (focusedElement === container) {
          event.preventDefault();
        }
      } else {
        if (!event.shiftKey && focusedElement === last) {
          event.preventDefault();
          this.focus(first);
        } else if (event.shiftKey && focusedElement === first) {
          event.preventDefault();
          this.focus(last);
        }
      }
    }
  }
  /**
   * Returns the first and last tabbable elements inside a container.
   */
  getTabbableEdges(container) {
    const candidates = this.getTabbableCandidates(container);
    const first = this.findVisible(candidates);
    const last = this.findVisible(candidates.reverse());
    return [first, last];
  }
  /**
   * Returns a list of potential focusable elements inside a container.
   */
  getTabbableCandidates(container) {
    const nodes = [];
    const walker = document.createTreeWalker(container, NodeFilter.SHOW_ELEMENT, {
      acceptNode: (node) => this.interactivityChecker.isFocusable(node) ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_SKIP
    });
    while (walker.nextNode()) {
      nodes.push(walker.currentNode);
    }
    return nodes;
  }
  /**
   * Returns the first visible element in a list..
   */
  findVisible(elements) {
    return elements.find((element) => this.interactivityChecker.isVisible(element)) ?? null;
  }
  focus(element) {
    if (!element) {
      return;
    }
    this.focusMonitor.focusVia(element, this.focusMonitor._lastFocusOrigin, {
      preventScroll: true
    });
  }
  focusFirst() {
    const previouslyFocusedElement = document.activeElement;
    for (const candidate of this.getTabbableCandidates(this.elementRef.nativeElement)) {
      this.focus(candidate);
      if (document.activeElement !== previouslyFocusedElement) {
        return;
      }
    }
  }
};
_NgpFocusTrap.ɵfac = function NgpFocusTrap_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpFocusTrap)();
};
_NgpFocusTrap.ɵdir = ɵɵdefineDirective({
  type: _NgpFocusTrap,
  selectors: [["", "ngpFocusTrap", ""]],
  hostVars: 2,
  hostBindings: function NgpFocusTrap_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("keydown", function NgpFocusTrap_keydown_HostBindingHandler($event) {
        return ctx.handleKeyDown($event);
      });
    }
    if (rf & 2) {
      ɵɵattribute("tabindex", -1)("data-focus-trap", !ctx.disabled() ? "" : null);
    }
  },
  inputs: {
    disabled: [1, "ngpFocusTrapDisabled", "disabled"]
  },
  exportAs: ["ngpFocusTrap"],
  features: [ɵɵProvidersFeature([provideFocusTrapState()])]
});
var NgpFocusTrap = _NgpFocusTrap;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpFocusTrap, [{
    type: Directive,
    args: [{
      selector: "[ngpFocusTrap]",
      exportAs: "ngpFocusTrap",
      providers: [provideFocusTrapState()],
      host: {
        "[attr.tabindex]": "-1",
        "[attr.data-focus-trap]": '!disabled() ? "" : null'
      }
    }]
  }], () => [], {
    handleKeyDown: [{
      type: HostListener,
      args: ["keydown", ["$event"]]
    }]
  });
})();

export {
  NgpFocusTrap
};
//# sourceMappingURL=chunk-AROV7EOL.js.map
