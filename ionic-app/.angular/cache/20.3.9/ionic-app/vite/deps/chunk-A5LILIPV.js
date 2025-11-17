import {
  injectElementRef,
  setupFocus,
  setupFocusVisible,
  setupHover,
  setupPress
} from "./chunk-AHNVSUII.js";
import {
  injectDisposables
} from "./chunk-VXVCWHF7.js";
import {
  Directive,
  HostListener,
  booleanAttribute,
  input,
  output,
  setClassMetadata,
  signal,
  ɵɵattribute,
  ɵɵdefineDirective,
  ɵɵlistener
} from "./chunk-5OFLYFBL.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-interactions.mjs
var _NgpFocusVisible = class _NgpFocusVisible {
  constructor() {
    this.disabled = input(false, {
      alias: "ngpFocusVisibleDisabled",
      transform: booleanAttribute
    });
    this.focusChange = output({
      alias: "ngpFocusVisible"
    });
    setupFocusVisible({
      disabled: this.disabled,
      focusChange: (value) => this.focusChange.emit(value)
    });
  }
};
_NgpFocusVisible.ɵfac = function NgpFocusVisible_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpFocusVisible)();
};
_NgpFocusVisible.ɵdir = ɵɵdefineDirective({
  type: _NgpFocusVisible,
  selectors: [["", "ngpFocusVisible", ""]],
  inputs: {
    disabled: [1, "ngpFocusVisibleDisabled", "disabled"]
  },
  outputs: {
    focusChange: "ngpFocusVisible"
  },
  exportAs: ["ngpFocusVisible"]
});
var NgpFocusVisible = _NgpFocusVisible;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpFocusVisible, [{
    type: Directive,
    args: [{
      selector: "[ngpFocusVisible]",
      exportAs: "ngpFocusVisible"
    }]
  }], () => [], null);
})();
var _NgpFocus = class _NgpFocus {
  constructor() {
    this.disabled = input(false, {
      alias: "ngpFocusDisabled",
      transform: booleanAttribute
    });
    this.focus = output({
      alias: "ngpFocus"
    });
    setupFocus({
      disabled: this.disabled,
      focus: () => this.focus.emit(true),
      blur: () => this.focus.emit(false)
    });
  }
};
_NgpFocus.ɵfac = function NgpFocus_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpFocus)();
};
_NgpFocus.ɵdir = ɵɵdefineDirective({
  type: _NgpFocus,
  selectors: [["", "ngpFocus", ""]],
  inputs: {
    disabled: [1, "ngpFocusDisabled", "disabled"]
  },
  outputs: {
    focus: "ngpFocus"
  },
  exportAs: ["ngpFocus"]
});
var NgpFocus = _NgpFocus;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpFocus, [{
    type: Directive,
    args: [{
      selector: "[ngpFocus]",
      exportAs: "ngpFocus"
    }]
  }], () => [], null);
})();
var _NgpHover = class _NgpHover {
  /**
   * Setup the hover state.
   */
  constructor() {
    this.disabled = input(false, {
      alias: "ngpHoverDisabled",
      transform: booleanAttribute
    });
    this.hoverStart = output({
      alias: "ngpHoverStart"
    });
    this.hoverEnd = output({
      alias: "ngpHoverEnd"
    });
    this.hoverChange = output({
      alias: "ngpHover"
    });
    setupHover({
      hoverStart: () => {
        this.hoverStart.emit();
        this.hoverChange.emit(true);
      },
      hoverEnd: () => {
        this.hoverEnd.emit();
        this.hoverChange.emit(false);
      },
      disabled: this.disabled
    });
  }
};
_NgpHover.ɵfac = function NgpHover_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpHover)();
};
_NgpHover.ɵdir = ɵɵdefineDirective({
  type: _NgpHover,
  selectors: [["", "ngpHover", ""]],
  inputs: {
    disabled: [1, "ngpHoverDisabled", "disabled"]
  },
  outputs: {
    hoverStart: "ngpHoverStart",
    hoverEnd: "ngpHoverEnd",
    hoverChange: "ngpHover"
  },
  exportAs: ["ngpHover"]
});
var NgpHover = _NgpHover;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpHover, [{
    type: Directive,
    args: [{
      selector: "[ngpHover]",
      exportAs: "ngpHover"
    }]
  }], () => [], null);
})();
var _NgpMove = class _NgpMove {
  constructor() {
    this.disposables = injectDisposables();
    this.disabled = input(false, {
      alias: "ngpMoveDisabled",
      transform: booleanAttribute
    });
    this.start = output({
      alias: "ngpMoveStart"
    });
    this.move = output({
      alias: "ngpMove"
    });
    this.end = output({
      alias: "ngpMoveEnd"
    });
    this.isMoving = signal(false);
    this.x = null;
    this.y = null;
    this.pointerId = null;
    this.disposableListeners = [];
  }
  /**
   * Handle a move start.
   */
  onMoveStart(event, pointerType) {
    this.start.emit({
      pointerType,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      altKey: event.altKey
    });
    this.isMoving.set(true);
  }
  /**
   * Handle a move event.
   */
  onMove(event, pointerType, deltaX, deltaY) {
    if (deltaX === 0 && deltaY === 0) {
      return;
    }
    this.move.emit({
      deltaX,
      deltaY,
      pointerType,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      altKey: event.altKey
    });
  }
  /**
   * Handle a move end.
   */
  onMoveEnd(event, pointerType) {
    this.end.emit({
      pointerType,
      shiftKey: event.shiftKey,
      ctrlKey: event.ctrlKey,
      metaKey: event.metaKey,
      altKey: event.altKey
    });
    this.isMoving.set(false);
  }
  /**
   * Handle the pointer down event.
   */
  onPointerDown(event) {
    if (event.button !== 0 || this.pointerId !== null || this.disabled()) {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.onMoveStart(event, event.pointerType);
    this.pointerId = event.pointerId;
    this.x = event.pageX;
    this.y = event.pageY;
    const pointerMove = this.disposables.addEventListener(window, "pointermove", this.onPointerMove.bind(this), false);
    const pointerUp = this.disposables.addEventListener(window, "pointerup", this.onPointerUp.bind(this), false);
    const pointerCancel = this.disposables.addEventListener(window, "pointercancel", this.onPointerUp.bind(this), false);
    this.disposableListeners = [pointerMove, pointerUp, pointerCancel];
  }
  /**
   * Handle the pointer up event.
   */
  onPointerUp(event) {
    if (this.pointerId !== event.pointerId) {
      return;
    }
    const pointerType = event.pointerType ?? "mouse";
    this.onMoveEnd(event, pointerType);
    this.pointerId = null;
    this.disposableListeners.forEach((dispose) => dispose());
  }
  /**
   * Handle the pointer move event.
   */
  onPointerMove(event) {
    if (this.pointerId !== event.pointerId) {
      return;
    }
    this.onMove(event, event.pointerType, event.pageX - (this.x ?? 0), event.pageY - (this.y ?? 0));
    this.x = event.pageX;
    this.y = event.pageY;
  }
  triggerKeyboardMove(event, deltaX, deltaY) {
    if (this.disabled()) {
      return;
    }
    this.onMoveStart(event, "keyboard");
    this.onMove(event, "keyboard", deltaX, deltaY);
    this.onMoveEnd(event, "keyboard");
  }
  onArrowUp(event) {
    event.preventDefault();
    event.stopPropagation();
    this.triggerKeyboardMove(event, 0, -1);
  }
  onArrowDown(event) {
    event.preventDefault();
    event.stopPropagation();
    this.triggerKeyboardMove(event, 0, 1);
  }
  onArrowLeft(event) {
    event.preventDefault();
    event.stopPropagation();
    this.triggerKeyboardMove(event, -1, 0);
  }
  onArrowRight(event) {
    event.preventDefault();
    event.stopPropagation();
    this.triggerKeyboardMove(event, 1, 0);
  }
};
_NgpMove.ɵfac = function NgpMove_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpMove)();
};
_NgpMove.ɵdir = ɵɵdefineDirective({
  type: _NgpMove,
  selectors: [["", "ngpMove", ""]],
  hostVars: 1,
  hostBindings: function NgpMove_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("pointerdown", function NgpMove_pointerdown_HostBindingHandler($event) {
        return ctx.onPointerDown($event);
      })("keydown.ArrowUp", function NgpMove_keydown_ArrowUp_HostBindingHandler($event) {
        return ctx.onArrowUp($event);
      })("keydown.ArrowDown", function NgpMove_keydown_ArrowDown_HostBindingHandler($event) {
        return ctx.onArrowDown($event);
      })("keydown.ArrowLeft", function NgpMove_keydown_ArrowLeft_HostBindingHandler($event) {
        return ctx.onArrowLeft($event);
      })("keydown.ArrowRight", function NgpMove_keydown_ArrowRight_HostBindingHandler($event) {
        return ctx.onArrowRight($event);
      });
    }
    if (rf & 2) {
      ɵɵattribute("data-move", ctx.isMoving() ? "" : null);
    }
  },
  inputs: {
    disabled: [1, "ngpMoveDisabled", "disabled"]
  },
  outputs: {
    start: "ngpMoveStart",
    move: "ngpMove",
    end: "ngpMoveEnd"
  },
  exportAs: ["ngpMove"]
});
var NgpMove = _NgpMove;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpMove, [{
    type: Directive,
    args: [{
      selector: "[ngpMove]",
      exportAs: "ngpMove",
      host: {
        "[attr.data-move]": 'isMoving() ? "" : null'
      }
    }]
  }], null, {
    onPointerDown: [{
      type: HostListener,
      args: ["pointerdown", ["$event"]]
    }],
    onArrowUp: [{
      type: HostListener,
      args: ["keydown.ArrowUp", ["$event"]]
    }],
    onArrowDown: [{
      type: HostListener,
      args: ["keydown.ArrowDown", ["$event"]]
    }],
    onArrowLeft: [{
      type: HostListener,
      args: ["keydown.ArrowLeft", ["$event"]]
    }],
    onArrowRight: [{
      type: HostListener,
      args: ["keydown.ArrowRight", ["$event"]]
    }]
  });
})();
var _NgpPress = class _NgpPress {
  constructor() {
    this.disabled = input(false, {
      alias: "ngpPressDisabled",
      transform: booleanAttribute
    });
    this.pressStart = output({
      alias: "ngpPressStart"
    });
    this.pressEnd = output({
      alias: "ngpPressEnd"
    });
    this.pressChange = output({
      alias: "ngpPress"
    });
    setupPress({
      pressStart: () => {
        this.pressStart.emit();
        this.pressChange.emit(true);
      },
      pressEnd: () => {
        this.pressEnd.emit();
        this.pressChange.emit(false);
      },
      disabled: this.disabled
    });
  }
};
_NgpPress.ɵfac = function NgpPress_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpPress)();
};
_NgpPress.ɵdir = ɵɵdefineDirective({
  type: _NgpPress,
  selectors: [["", "ngpPress", ""]],
  inputs: {
    disabled: [1, "ngpPressDisabled", "disabled"]
  },
  outputs: {
    pressStart: "ngpPressStart",
    pressEnd: "ngpPressEnd",
    pressChange: "ngpPress"
  },
  exportAs: ["ngpPress"]
});
var NgpPress = _NgpPress;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpPress, [{
    type: Directive,
    args: [{
      selector: "[ngpPress]",
      exportAs: "ngpPress"
    }]
  }], () => [], null);
})();
function hasInteraction(element, interaction) {
  const hasInteraction2 = `__ngp-${interaction}` in element;
  if (!hasInteraction2) {
    element[`__ngp-${interaction}`] = true;
  }
  return hasInteraction2;
}
function setupInteractions({
  focus,
  hover,
  press,
  focusWithin,
  focusVisible,
  disabled = signal(false)
}) {
  const elementRef = injectElementRef();
  if (hasInteraction(elementRef.nativeElement, "interactions")) {
    return;
  }
  if (hover) {
    setupHover({
      disabled
    });
  }
  if (press) {
    setupPress({
      disabled
    });
  }
  if (focus) {
    setupFocus({
      focusWithin,
      disabled
    });
  }
  if (focusVisible) {
    setupFocusVisible({
      disabled
    });
  }
}

export {
  setupInteractions
};
//# sourceMappingURL=chunk-A5LILIPV.js.map
