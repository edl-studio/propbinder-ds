import {
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  explicitEffect
} from "./chunk-WE5NZ3WV.js";
import {
  ChangeDetectorRef,
  Directive,
  computed,
  inject,
  setClassMetadata,
  signal,
  ɵɵProvidersFeature,
  ɵɵdefineDirective,
  ɵɵstyleMap
} from "./chunk-V52YD5AQ.js";

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

export {
  activeDescendantManager
};
//# sourceMappingURL=chunk-WGUN7FVU.js.map
