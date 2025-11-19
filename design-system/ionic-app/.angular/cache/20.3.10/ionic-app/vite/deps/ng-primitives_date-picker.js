import {
  setupInteractions
} from "./chunk-VILYZIJE.js";
import {
  FocusMonitor,
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  explicitEffect,
  injectElementRef
} from "./chunk-NOHFT6FW.js";
import {
  booleanAttributeBinding,
  uniqueId
} from "./chunk-7VMOF35L.js";
import "./chunk-RQY3LDOR.js";
import "./chunk-YLELG2JA.js";
import "./chunk-ALQK544G.js";
import "./chunk-53KHQLJJ.js";
import "./chunk-ILS3C6C2.js";
import {
  Directive,
  ElementRef,
  HostListener,
  InjectionToken,
  Injector,
  TemplateRef,
  ViewContainerRef,
  afterNextRender,
  booleanAttribute,
  computed,
  contentChild,
  inject,
  input,
  numberAttribute,
  output,
  setClassMetadata,
  signal,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵcontentQuerySignal,
  ɵɵdefineDirective,
  ɵɵdomProperty,
  ɵɵlistener,
  ɵɵqueryAdvance
} from "./chunk-JIIPHG5Y.js";
import {
  __spreadValues
} from "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-button.mjs
var NgpButtonStateToken = createStateToken("Button");
var provideButtonState = createStateProvider(NgpButtonStateToken);
var injectButtonState = createStateInjector(NgpButtonStateToken);
var buttonState = createState(NgpButtonStateToken);
function setupButton({
  disabled
}) {
  const elementRef = injectElementRef();
  const isButton = elementRef.nativeElement.tagName.toLowerCase() === "button";
  setupInteractions({
    hover: true,
    press: true,
    focusVisible: true,
    disabled
  });
  booleanAttributeBinding(elementRef.nativeElement, "data-disabled", disabled);
  if (isButton) {
    booleanAttributeBinding(elementRef.nativeElement, "disabled", disabled);
  }
}
var _NgpButton = class _NgpButton {
  constructor() {
    this.disabled = input(false, {
      transform: booleanAttribute
    });
    this.state = buttonState(this);
    setupButton({
      disabled: this.state.disabled
    });
  }
};
_NgpButton.ɵfac = function NgpButton_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpButton)();
};
_NgpButton.ɵdir = ɵɵdefineDirective({
  type: _NgpButton,
  selectors: [["", "ngpButton", ""]],
  inputs: {
    disabled: [1, "disabled"]
  },
  exportAs: ["ngpButton"],
  features: [ɵɵProvidersFeature([provideButtonState({
    inherit: false
  })])]
});
var NgpButton = _NgpButton;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpButton, [{
    type: Directive,
    args: [{
      selector: "[ngpButton]",
      exportAs: "ngpButton",
      providers: [provideButtonState({
        inherit: false
      })]
    }]
  }], () => [], null);
})();

// node_modules/ng-primitives/fesm2022/ng-primitives-date-time.mjs
var NgpNativeDateAdapter = class {
  /**
   * Create a new date time object.
   */
  create({ day, hour, minute, month, second, year, millisecond }) {
    const now = /* @__PURE__ */ new Date();
    return new Date(year ?? now.getFullYear(), month ? month - 1 : now.getMonth(), day ?? now.getDate(), hour ?? now.getHours(), minute ?? now.getMinutes(), second ?? now.getSeconds(), millisecond ?? now.getMilliseconds());
  }
  /**
   * Create a new date with the current date and time.
   */
  now() {
    return /* @__PURE__ */ new Date();
  }
  /**
   * Set the year of the date time object based on a duration.
   */
  set(date, values) {
    return new Date(values.year ?? date.getFullYear(), values.month ?? date.getMonth(), values.day ?? date.getDate(), values.hour ?? date.getHours(), values.minute ?? date.getMinutes(), values.second ?? date.getSeconds(), values.millisecond ?? date.getMilliseconds());
  }
  /**
   * Add a duration to the date time object.
   */
  add(date, duration) {
    return new Date(date.getFullYear() + (duration.years ?? 0), date.getMonth() + (duration.months ?? 0), date.getDate() + (duration.days ?? 0), date.getHours() + (duration.hours ?? 0), date.getMinutes() + (duration.minutes ?? 0), date.getSeconds() + (duration.seconds ?? 0), date.getMilliseconds() + (duration.milliseconds ?? 0));
  }
  /**
   * Subtract a duration from the date time object
   */
  subtract(date, duration) {
    return new Date(date.getFullYear() - (duration.years ?? 0), date.getMonth() - (duration.months ?? 0), date.getDate() - (duration.days ?? 0), date.getHours() - (duration.hours ?? 0), date.getMinutes() - (duration.minutes ?? 0), date.getSeconds() - (duration.seconds ?? 0), date.getMilliseconds() - (duration.milliseconds ?? 0));
  }
  /**
   * Compare two date time objects
   */
  compare(a, b) {
    const diff = a.getTime() - b.getTime();
    return diff === 0 ? 0 : diff > 0 ? 1 : -1;
  }
  /**
   * Determine if two date time objects are equal.
   */
  isEqual(a, b) {
    return a.getTime() === b.getTime();
  }
  /**
   * Determine if a date time object is before another.
   */
  isBefore(a, b) {
    return a.getTime() < b.getTime();
  }
  /**
   * Determine if a date time object is after another.
   */
  isAfter(a, b) {
    return a.getTime() > b.getTime();
  }
  /**
   * Determine if two date objects are on the same day.
   */
  isSameDay(a, b) {
    return this.isSameYear(a, b) && this.isSameMonth(a, b) && a.getDate() === b.getDate();
  }
  /**
   * Determine if two date objects are on the same month.
   */
  isSameMonth(a, b) {
    return this.isSameYear(a, b) && a.getMonth() === b.getMonth();
  }
  /**
   * Determine if two date objects are on the same year.
   */
  isSameYear(a, b) {
    return a.getFullYear() === b.getFullYear();
  }
  /**
   * Get the year.
   */
  getYear(date) {
    return date.getFullYear();
  }
  /**
   * Get the month.
   */
  getMonth(date) {
    return date.getMonth();
  }
  /**
   * Get the day of the week as a number (1-7).
   * - `1` = Monday
   * - `2` = Tuesday
   * - `3` = Wednesday
   * - `4` = Thursday
   * - `5` = Friday
   * - `6` = Saturday
   * - `7` = Sunday
   */
  getDay(date) {
    return date.getDay() === 0 ? 7 : date.getDay();
  }
  /**
   * Get the date.
   */
  getDate(date) {
    return date.getDate();
  }
  /**
   * Get the hours.
   */
  getHours(date) {
    return date.getHours();
  }
  /**
   * Get the minutes.
   */
  getMinutes(date) {
    return date.getMinutes();
  }
  /**
   * Get the seconds.
   */
  getSeconds(date) {
    return date.getSeconds();
  }
  /**
   * Get the milliseconds.
   */
  getMilliseconds(date) {
    return date.getMilliseconds();
  }
  /**
   * Get the first day of the month.
   */
  startOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth(), 1);
  }
  /**
   * Get the last day of the month.
   */
  endOfMonth(date) {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0);
  }
  /**
   * Get the start of the day.
   */
  startOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
  /**
   * Get the end of the day.
   */
  endOfDay(date) {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate(), 23, 59, 59, 999);
  }
};
var NgpDateAdapterToken = new InjectionToken("NgpDateAdapterToken");
function injectDateAdapter() {
  return inject(NgpDateAdapterToken, { optional: true }) || new NgpNativeDateAdapter();
}

// node_modules/ng-primitives/fesm2022/ng-primitives-date-picker.mjs
var defaultDatePickerConfig = {
  firstDayOfWeek: 7
};
var NgpDatePickerConfigToken = new InjectionToken("NgpDatePickerConfigToken");
function provideDatePickerConfig(config) {
  return [{
    provide: NgpDatePickerConfigToken,
    useValue: __spreadValues(__spreadValues({}, defaultDatePickerConfig), config)
  }];
}
function injectDatePickerConfig() {
  return inject(NgpDatePickerConfigToken, {
    optional: true
  }) ?? defaultDatePickerConfig;
}
var NgpDatePickerRowRenderToken = new InjectionToken("NgpDatePickerRowRenderToken");
function injectDatePickerRowRender() {
  return inject(NgpDatePickerRowRenderToken);
}
var NgpDatePickerWeekToken = new InjectionToken("NgpDatePickerWeekToken");
function injectDatePickerWeek() {
  return inject(NgpDatePickerWeekToken);
}
var NgpDatePickerCellRenderToken = new InjectionToken("NgpDatePickerCellRenderToken");
function injectDatePickerCellRender() {
  return inject(NgpDatePickerCellRenderToken);
}
var NgpDatePickerCellDateToken = new InjectionToken("NgpDatePickerCellDateToken");
function injectDatePickerCellDate() {
  return inject(NgpDatePickerCellDateToken);
}
var _NgpDatePickerCellRender = class _NgpDatePickerCellRender {
  // Make sure the template checker knows the type of the context with which the
  // template of this directive will be rendered
  static ngTemplateContextGuard(_, context) {
    return true;
  }
  constructor() {
    this.templateRef = inject(TemplateRef);
    this.viewContainerRef = inject(ViewContainerRef);
    this.dates = injectDatePickerWeek();
    this.viewRefs = [];
    this.renderDates();
  }
  /**
   * Render the dates in the week.
   */
  renderDates() {
    this.viewRefs.forEach((viewRef) => viewRef.destroy());
    for (const date of this.dates) {
      const viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, {
        $implicit: date
      }, {
        injector: Injector.create({
          parent: this.viewContainerRef.injector,
          providers: [{
            provide: NgpDatePickerCellDateToken,
            useValue: date
          }]
        })
      });
      this.viewRefs.push(viewRef);
    }
  }
  /**
   * Destroy the view refs.
   */
  ngOnDestroy() {
    this.viewRefs.forEach((viewRef) => viewRef.destroy());
  }
};
_NgpDatePickerCellRender.ɵfac = function NgpDatePickerCellRender_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDatePickerCellRender)();
};
_NgpDatePickerCellRender.ɵdir = ɵɵdefineDirective({
  type: _NgpDatePickerCellRender,
  selectors: [["", "ngpDatePickerCellRender", ""]],
  exportAs: ["ngpDatePickerCellRender"],
  features: [ɵɵProvidersFeature([{
    provide: NgpDatePickerCellRenderToken,
    useExisting: _NgpDatePickerCellRender
  }])]
});
var NgpDatePickerCellRender = _NgpDatePickerCellRender;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDatePickerCellRender, [{
    type: Directive,
    args: [{
      selector: "[ngpDatePickerCellRender]",
      exportAs: "ngpDatePickerCellRender",
      providers: [{
        provide: NgpDatePickerCellRenderToken,
        useExisting: NgpDatePickerCellRender
      }]
    }]
  }], () => [], null);
})();
var NgpDatePickerDateButtonToken = new InjectionToken("NgpDatePickerDateButtonToken");
function injectDatePickerDateButton() {
  return inject(NgpDatePickerDateButtonToken);
}
var NgpDateRangePickerStateToken = createStateToken("DateRangePicker");
var provideDateRangePickerState = createStateProvider(NgpDateRangePickerStateToken);
var injectDateRangePickerState = createStateInjector(NgpDateRangePickerStateToken);
var dateRangePickerState = createState(NgpDateRangePickerStateToken);
var NgpDatePickerStateToken = createStateToken("DatePicker");
var provideDatePickerState = createStateProvider(NgpDatePickerStateToken);
var injectDatePickerState = createStateInjector(NgpDatePickerStateToken);
var datePickerState = createState(NgpDatePickerStateToken);
function injectDateControllerState() {
  const datePickerState2 = injectDatePickerState({
    optional: true
  });
  const dateRangePickerState2 = injectDateRangePickerState({
    optional: true
  });
  if (datePickerState2()) {
    return datePickerState2;
  } else if (dateRangePickerState2()) {
    return dateRangePickerState2;
  } else {
    throw new Error("No date picker or date range picker state found");
  }
}
var _NgpDatePickerCell = class _NgpDatePickerCell {
  constructor() {
    this.state = injectDateControllerState();
    this.datePickerButton = contentChild(NgpDatePickerDateButtonToken, {
      descendants: true
    });
    this.labelId = computed(() => this.state().label()?.id());
  }
};
_NgpDatePickerCell.ɵfac = function NgpDatePickerCell_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDatePickerCell)();
};
_NgpDatePickerCell.ɵdir = ɵɵdefineDirective({
  type: _NgpDatePickerCell,
  selectors: [["", "ngpDatePickerCell", ""]],
  contentQueries: function NgpDatePickerCell_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuerySignal(dirIndex, ctx.datePickerButton, NgpDatePickerDateButtonToken, 5);
    }
    if (rf & 2) {
      ɵɵqueryAdvance();
    }
  },
  hostAttrs: ["role", "gridcell"],
  hostVars: 5,
  hostBindings: function NgpDatePickerCell_HostBindings(rf, ctx) {
    if (rf & 2) {
      let tmp_0_0;
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      ɵɵattribute("data-selected", ((tmp_0_0 = ctx.datePickerButton()) == null ? null : tmp_0_0.selected()) ? "" : null)("aria-selected", (tmp_1_0 = ctx.datePickerButton()) == null ? null : tmp_1_0.selected())("aria-disabled", (tmp_2_0 = ctx.datePickerButton()) == null ? null : tmp_2_0.disabled())("data-disabled", ((tmp_3_0 = ctx.datePickerButton()) == null ? null : tmp_3_0.disabled()) ? "" : null)("aria-labelledby", ctx.labelId());
    }
  },
  exportAs: ["ngpDatePickerCell"]
});
var NgpDatePickerCell = _NgpDatePickerCell;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDatePickerCell, [{
    type: Directive,
    args: [{
      selector: "[ngpDatePickerCell]",
      exportAs: "ngpDatePickerCell",
      host: {
        role: "gridcell",
        "[attr.data-selected]": 'datePickerButton()?.selected() ? "" : null',
        "[attr.aria-selected]": "datePickerButton()?.selected()",
        "[attr.aria-disabled]": "datePickerButton()?.disabled()",
        "[attr.data-disabled]": 'datePickerButton()?.disabled() ? "" : null',
        "[attr.aria-labelledby]": "labelId()"
      }
    }]
  }], null, null);
})();
var _NgpDatePickerDateButton = class _NgpDatePickerDateButton {
  constructor() {
    this.elementRef = inject(ElementRef);
    this.focusMonitor = inject(FocusMonitor);
    this.state = injectDateControllerState();
    this.dateAdapter = injectDateAdapter();
    this.date = injectDatePickerCellDate();
    this.focused = computed(() => this.dateAdapter.isSameDay(this.date, this.state().focusedDate()));
    this.selected = computed(() => this.state().isSelected(this.date));
    this.start = computed(() => this.state().isStartOfRange(this.date));
    this.end = computed(() => this.state().isEndOfRange(this.date));
    this.betweenRange = computed(() => this.state().isBetweenRange(this.date));
    this.outside = computed(() => !this.dateAdapter.isSameMonth(this.date, this.state().focusedDate()));
    this.today = computed(() => this.dateAdapter.isSameDay(this.date, this.dateAdapter.now()));
    this.disabled = computed(() => {
      const min = this.state().min();
      const max = this.state().max();
      if (this.state().disabled() || this.state().dateDisabled()(this.date)) {
        return true;
      }
      if (min && this.dateAdapter.compare(this.dateAdapter.startOfDay(this.date), min) < 0) {
        return true;
      }
      if (max && this.dateAdapter.compare(this.dateAdapter.startOfDay(this.date), max) > 0) {
        return true;
      }
      return false;
    });
    this.isButton = this.elementRef.nativeElement.tagName === "BUTTON";
    this.state().registerButton(this);
    setupButton({
      disabled: this.disabled
    });
  }
  ngOnDestroy() {
    this.state().unregisterButton(this);
  }
  /**
   * When the button is clicked, select the date.
   */
  select(event) {
    if (this.disabled()) {
      return;
    }
    if (event) {
      event.preventDefault();
      event.stopPropagation();
    }
    this.state().select(this.date);
    this.state().setFocusedDate(this.date, "mouse", "forward");
  }
  /**
   * Focus if this is the current focused date.
   * @internal
   */
  focus() {
    if (this.dateAdapter.isSameDay(this.date, this.state().focusedDate())) {
      this.focusMonitor.focusVia(this.elementRef, "keyboard");
    }
  }
  /**
   * Focus the previous cell.
   */
  focusPrevious(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.getDirection() === "rtl") {
      this.focusDate(this.dateAdapter.add(this.state().focusedDate(), {
        days: 1
      }), "forward");
    } else {
      this.focusDate(this.dateAdapter.subtract(this.state().focusedDate(), {
        days: 1
      }), "backward");
    }
  }
  /**
   * Focus the next cell.
   */
  focusNext(event) {
    event.preventDefault();
    event.stopPropagation();
    if (this.getDirection() === "rtl") {
      this.focusDate(this.dateAdapter.subtract(this.state().focusedDate(), {
        days: 1
      }), "backward");
    } else {
      this.focusDate(this.dateAdapter.add(this.state().focusedDate(), {
        days: 1
      }), "forward");
    }
  }
  /**
   * Focus the above cell.
   */
  focusAbove(event) {
    event.preventDefault();
    event.stopPropagation();
    this.focusDate(this.dateAdapter.subtract(this.state().focusedDate(), {
      days: 7
    }), "backward");
  }
  /**
   * Focus the below cell.
   */
  focusBelow(event) {
    event.preventDefault();
    event.stopPropagation();
    this.focusDate(this.dateAdapter.add(this.state().focusedDate(), {
      days: 7
    }), "forward");
  }
  /**
   * Focus the first date of the month.
   */
  focusFirst(event) {
    event.preventDefault();
    event.stopPropagation();
    this.focusDate(this.dateAdapter.startOfMonth(this.state().focusedDate()), "forward");
  }
  /**
   * Focus the last date of the month.
   */
  focusLast(event) {
    event.preventDefault();
    event.stopPropagation();
    this.focusDate(this.dateAdapter.endOfMonth(this.state().focusedDate()), "backward");
  }
  /**
   * Focus the same date in the previous month.
   */
  focusPreviousMonth(event) {
    event.preventDefault();
    event.stopPropagation();
    const date = this.dateAdapter.getDate(this.state().focusedDate());
    let previousMonthTarget = this.dateAdapter.startOfMonth(this.state().focusedDate());
    previousMonthTarget = this.dateAdapter.subtract(previousMonthTarget, {
      months: 1
    });
    const lastDay = this.dateAdapter.endOfMonth(previousMonthTarget);
    if (date > this.dateAdapter.getDate(lastDay)) {
      this.focusDate(lastDay, "forward");
      return;
    } else {
      this.focusDate(this.dateAdapter.set(previousMonthTarget, {
        day: date
      }), "forward");
    }
  }
  /**
   * Focus the same date in the next month.
   */
  focusNextMonth(event) {
    event.preventDefault();
    event.stopPropagation();
    const date = this.dateAdapter.getDate(this.state().focusedDate());
    let nextMonthTarget = this.dateAdapter.startOfMonth(this.state().focusedDate());
    nextMonthTarget = this.dateAdapter.add(nextMonthTarget, {
      months: 1
    });
    const lastDay = this.dateAdapter.endOfMonth(nextMonthTarget);
    if (date > this.dateAdapter.getDate(lastDay)) {
      this.focusDate(lastDay, "backward");
      return;
    } else {
      this.focusDate(this.dateAdapter.set(nextMonthTarget, {
        day: date
      }), "backward");
    }
  }
  focusDate(date, direction) {
    this.state().setFocusedDate(date, "keyboard", direction);
  }
  /**
   * Get the direction of the element.
   */
  getDirection() {
    return getComputedStyle(this.elementRef.nativeElement).direction === "rtl" ? "rtl" : "ltr";
  }
};
_NgpDatePickerDateButton.ɵfac = function NgpDatePickerDateButton_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDatePickerDateButton)();
};
_NgpDatePickerDateButton.ɵdir = ɵɵdefineDirective({
  type: _NgpDatePickerDateButton,
  selectors: [["", "ngpDatePickerDateButton", ""]],
  hostVars: 9,
  hostBindings: function NgpDatePickerDateButton_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpDatePickerDateButton_click_HostBindingHandler() {
        return ctx.select();
      })("keydown.enter", function NgpDatePickerDateButton_keydown_enter_HostBindingHandler($event) {
        return ctx.select($event);
      })("keydown.space", function NgpDatePickerDateButton_keydown_space_HostBindingHandler($event) {
        return ctx.select($event);
      })("keydown.arrowLeft", function NgpDatePickerDateButton_keydown_arrowLeft_HostBindingHandler($event) {
        return ctx.focusPrevious($event);
      })("keydown.arrowRight", function NgpDatePickerDateButton_keydown_arrowRight_HostBindingHandler($event) {
        return ctx.focusNext($event);
      })("keydown.arrowUp", function NgpDatePickerDateButton_keydown_arrowUp_HostBindingHandler($event) {
        return ctx.focusAbove($event);
      })("keydown.arrowDown", function NgpDatePickerDateButton_keydown_arrowDown_HostBindingHandler($event) {
        return ctx.focusBelow($event);
      })("keydown.home", function NgpDatePickerDateButton_keydown_home_HostBindingHandler($event) {
        return ctx.focusFirst($event);
      })("keydown.end", function NgpDatePickerDateButton_keydown_end_HostBindingHandler($event) {
        return ctx.focusLast($event);
      })("keydown.pageUp", function NgpDatePickerDateButton_keydown_pageUp_HostBindingHandler($event) {
        return ctx.focusPreviousMonth($event);
      })("keydown.pageDown", function NgpDatePickerDateButton_keydown_pageDown_HostBindingHandler($event) {
        return ctx.focusNextMonth($event);
      });
    }
    if (rf & 2) {
      ɵɵattribute("role", !ctx.isButton ? "button" : null)("tabindex", ctx.focused() ? 0 : -1)("data-selected", ctx.selected() ? "" : null)("aria-disabled", ctx.disabled())("data-outside-month", ctx.outside() ? "" : null)("data-today", ctx.today() ? "" : null)("data-range-start", ctx.start() ? "" : null)("data-range-end", ctx.end() ? "" : null)("data-range-between", ctx.betweenRange() ? "" : null);
    }
  },
  exportAs: ["ngpDatePickerDateButton"],
  features: [ɵɵProvidersFeature([{
    provide: NgpDatePickerDateButtonToken,
    useExisting: _NgpDatePickerDateButton
  }])]
});
var NgpDatePickerDateButton = _NgpDatePickerDateButton;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDatePickerDateButton, [{
    type: Directive,
    args: [{
      selector: "[ngpDatePickerDateButton]",
      exportAs: "ngpDatePickerDateButton",
      providers: [{
        provide: NgpDatePickerDateButtonToken,
        useExisting: NgpDatePickerDateButton
      }],
      host: {
        "[attr.role]": '!isButton ? "button" : null',
        "[attr.tabindex]": "focused() ? 0 : -1",
        "[attr.data-selected]": 'selected() ? "" : null',
        "[attr.aria-disabled]": "disabled()",
        "[attr.data-outside-month]": 'outside() ? "" : null',
        "[attr.data-today]": 'today() ? "" : null',
        "[attr.data-range-start]": 'start() ? "" : null',
        "[attr.data-range-end]": 'end() ? "" : null',
        "[attr.data-range-between]": 'betweenRange() ? "" : null'
      }
    }]
  }], () => [], {
    select: [{
      type: HostListener,
      args: ["click"]
    }, {
      type: HostListener,
      args: ["keydown.enter", ["$event"]]
    }, {
      type: HostListener,
      args: ["keydown.space", ["$event"]]
    }],
    focusPrevious: [{
      type: HostListener,
      args: ["keydown.arrowLeft", ["$event"]]
    }],
    focusNext: [{
      type: HostListener,
      args: ["keydown.arrowRight", ["$event"]]
    }],
    focusAbove: [{
      type: HostListener,
      args: ["keydown.arrowUp", ["$event"]]
    }],
    focusBelow: [{
      type: HostListener,
      args: ["keydown.arrowDown", ["$event"]]
    }],
    focusFirst: [{
      type: HostListener,
      args: ["keydown.home", ["$event"]]
    }],
    focusLast: [{
      type: HostListener,
      args: ["keydown.end", ["$event"]]
    }],
    focusPreviousMonth: [{
      type: HostListener,
      args: ["keydown.pageUp", ["$event"]]
    }],
    focusNextMonth: [{
      type: HostListener,
      args: ["keydown.pageDown", ["$event"]]
    }]
  });
})();
var _NgpDatePickerGrid = class _NgpDatePickerGrid {
  constructor() {
    this.state = injectDateControllerState();
    this.labelId = computed(() => this.state().label()?.id());
  }
};
_NgpDatePickerGrid.ɵfac = function NgpDatePickerGrid_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDatePickerGrid)();
};
_NgpDatePickerGrid.ɵdir = ɵɵdefineDirective({
  type: _NgpDatePickerGrid,
  selectors: [["", "ngpDatePickerGrid", ""]],
  hostAttrs: ["role", "grid"],
  hostVars: 2,
  hostBindings: function NgpDatePickerGrid_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("aria-labelledby", ctx.labelId())("data-disabled", ctx.state().disabled() ? "" : null);
    }
  },
  exportAs: ["ngpDatePickerGrid"]
});
var NgpDatePickerGrid = _NgpDatePickerGrid;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDatePickerGrid, [{
    type: Directive,
    args: [{
      selector: "[ngpDatePickerGrid]",
      exportAs: "ngpDatePickerGrid",
      host: {
        role: "grid",
        "[attr.aria-labelledby]": "labelId()",
        "[attr.data-disabled]": 'state().disabled() ? "" : null'
      }
    }]
  }], null, null);
})();
var NgpDatePickerLabelToken = new InjectionToken("NgpDatePickerLabelToken");
function injectDatePickerLabel() {
  return inject(NgpDatePickerLabelToken);
}
var _NgpDatePickerLabel = class _NgpDatePickerLabel {
  constructor() {
    this.state = injectDateControllerState();
    this.id = input(uniqueId("ngp-date-picker-label"));
    this.ariaLive = input("polite", {
      alias: "aria-live"
    });
  }
};
_NgpDatePickerLabel.ɵfac = function NgpDatePickerLabel_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDatePickerLabel)();
};
_NgpDatePickerLabel.ɵdir = ɵɵdefineDirective({
  type: _NgpDatePickerLabel,
  selectors: [["", "ngpDatePickerLabel", ""]],
  hostVars: 3,
  hostBindings: function NgpDatePickerLabel_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵdomProperty("id", ctx.id());
      ɵɵattribute("aria-live", ctx.ariaLive())("data-disabled", ctx.state().disabled() ? "" : null);
    }
  },
  inputs: {
    id: [1, "id"],
    ariaLive: [1, "aria-live", "ariaLive"]
  },
  exportAs: ["ngpDatePickerLabel"],
  features: [ɵɵProvidersFeature([{
    provide: NgpDatePickerLabelToken,
    useExisting: _NgpDatePickerLabel
  }])]
});
var NgpDatePickerLabel = _NgpDatePickerLabel;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDatePickerLabel, [{
    type: Directive,
    args: [{
      selector: "[ngpDatePickerLabel]",
      exportAs: "ngpDatePickerLabel",
      providers: [{
        provide: NgpDatePickerLabelToken,
        useExisting: NgpDatePickerLabel
      }],
      host: {
        "[id]": "id()",
        "[attr.aria-live]": "ariaLive()",
        "[attr.data-disabled]": 'state().disabled() ? "" : null'
      }
    }]
  }], null, null);
})();
var _NgpDatePickerNextMonth = class _NgpDatePickerNextMonth {
  constructor() {
    this.elementRef = inject(ElementRef);
    this.dateAdapter = injectDateAdapter();
    this.state = injectDateControllerState();
    this.isButton = this.elementRef.nativeElement.tagName.toLowerCase() === "button";
    this.disabled = computed(() => {
      if (this.state().disabled()) {
        return true;
      }
      const maxDate = this.state().max();
      const lastDay = this.dateAdapter.set(this.dateAdapter.endOfMonth(this.state().focusedDate()), {
        hour: 23,
        minute: 59,
        second: 59,
        millisecond: 999
      });
      if (maxDate && this.dateAdapter.compare(maxDate, lastDay) <= 0) {
        return true;
      }
      return false;
    });
    setupButton({
      disabled: this.disabled
    });
  }
  /**
   * Navigate to the next month.
   */
  navigateToNextMonth() {
    if (this.disabled()) {
      return;
    }
    let date = this.state().focusedDate();
    date = this.dateAdapter.add(date, {
      months: 1
    });
    date = this.dateAdapter.set(date, {
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    this.state().setFocusedDate(date, "mouse", "forward");
  }
};
_NgpDatePickerNextMonth.ɵfac = function NgpDatePickerNextMonth_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDatePickerNextMonth)();
};
_NgpDatePickerNextMonth.ɵdir = ɵɵdefineDirective({
  type: _NgpDatePickerNextMonth,
  selectors: [["", "ngpDatePickerNextMonth", ""]],
  hostVars: 2,
  hostBindings: function NgpDatePickerNextMonth_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpDatePickerNextMonth_click_HostBindingHandler() {
        return ctx.navigateToNextMonth();
      });
    }
    if (rf & 2) {
      ɵɵattribute("aria-disabled", ctx.disabled())("type", ctx.isButton ? "button" : null);
    }
  },
  exportAs: ["ngpDatePickerNextMonth"]
});
var NgpDatePickerNextMonth = _NgpDatePickerNextMonth;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDatePickerNextMonth, [{
    type: Directive,
    args: [{
      selector: "[ngpDatePickerNextMonth]",
      exportAs: "ngpDatePickerNextMonth",
      host: {
        "[attr.aria-disabled]": "disabled()",
        "[attr.type]": 'isButton ? "button" : null'
      }
    }]
  }], () => [], {
    navigateToNextMonth: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var _NgpDatePickerPreviousMonth = class _NgpDatePickerPreviousMonth {
  constructor() {
    this.elementRef = inject(ElementRef);
    this.dateAdapter = injectDateAdapter();
    this.state = injectDateControllerState();
    this.isButton = this.elementRef.nativeElement.tagName.toLowerCase() === "button";
    this.disabled = computed(() => {
      if (this.state().disabled()) {
        return true;
      }
      const minDate = this.state().min();
      const firstDay = this.dateAdapter.set(this.dateAdapter.startOfMonth(this.state().focusedDate()), {
        hour: 0,
        minute: 0,
        second: 0,
        millisecond: 0
      });
      if (minDate && this.dateAdapter.compare(minDate, firstDay) >= 0) {
        return true;
      }
      return false;
    });
    setupButton({
      disabled: this.disabled
    });
  }
  /**
   * Navigate to the previous month.
   */
  navigateToPreviouMonth() {
    if (this.disabled()) {
      return;
    }
    let date = this.state().focusedDate();
    date = this.dateAdapter.subtract(date, {
      months: 1
    });
    date = this.dateAdapter.set(date, {
      day: 1,
      hour: 0,
      minute: 0,
      second: 0,
      millisecond: 0
    });
    this.state().setFocusedDate(date, "mouse", "backward");
  }
};
_NgpDatePickerPreviousMonth.ɵfac = function NgpDatePickerPreviousMonth_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDatePickerPreviousMonth)();
};
_NgpDatePickerPreviousMonth.ɵdir = ɵɵdefineDirective({
  type: _NgpDatePickerPreviousMonth,
  selectors: [["", "ngpDatePickerPreviousMonth", ""]],
  hostVars: 2,
  hostBindings: function NgpDatePickerPreviousMonth_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpDatePickerPreviousMonth_click_HostBindingHandler() {
        return ctx.navigateToPreviouMonth();
      });
    }
    if (rf & 2) {
      ɵɵattribute("aria-disabled", ctx.disabled())("type", ctx.isButton ? "button" : null);
    }
  },
  exportAs: ["ngpDatePickerPreviousMonth"]
});
var NgpDatePickerPreviousMonth = _NgpDatePickerPreviousMonth;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDatePickerPreviousMonth, [{
    type: Directive,
    args: [{
      selector: "[ngpDatePickerPreviousMonth]",
      exportAs: "ngpDatePickerPreviousMonth",
      host: {
        "[attr.aria-disabled]": "disabled()",
        "[attr.type]": 'isButton ? "button" : null'
      }
    }]
  }], () => [], {
    navigateToPreviouMonth: [{
      type: HostListener,
      args: ["click"]
    }]
  });
})();
var DAYS_PER_WEEK = 7;
var _NgpDatePickerRowRender = class _NgpDatePickerRowRender {
  constructor() {
    this.dateAdapter = injectDateAdapter();
    this.state = injectDateControllerState();
    this.templateRef = inject(TemplateRef);
    this.viewContainerRef = inject(ViewContainerRef);
    this.days = computed(() => {
      const month = this.state().focusedDate();
      const days = [];
      let firstDay = this.dateAdapter.startOfMonth(month);
      let lastDay = this.dateAdapter.endOfMonth(month);
      const firstDayOfWeekOffset = this.getFirstDayOfWeekOffset(firstDay);
      const lastDayOfWeekOffset = this.getLastDayOfWeekOffset(lastDay);
      firstDay = this.dateAdapter.subtract(firstDay, {
        days: firstDayOfWeekOffset
      });
      lastDay = this.dateAdapter.add(lastDay, {
        days: lastDayOfWeekOffset
      });
      while (firstDay <= lastDay) {
        days.push(firstDay);
        firstDay = this.dateAdapter.add(firstDay, {
          days: 1
        });
      }
      return days;
    });
    this.weeks = computed(() => {
      const days = this.days();
      const weeks = [];
      for (let i = 0; i < days.length; i += 7) {
        weeks.push(days.slice(i, i + 7));
      }
      return weeks;
    });
    this.viewRefs = [];
    this.previousMonth = null;
    explicitEffect([this.state().focusedDate, this.state().firstDayOfWeek], () => this.renderRows());
  }
  ngOnDestroy() {
    this.destroyRows();
  }
  /**
   * Render the row.
   */
  renderRows() {
    if (this.previousMonth && this.dateAdapter.isSameMonth(this.previousMonth, this.state().focusedDate())) {
      return;
    }
    this.previousMonth = this.state().focusedDate();
    const weeks = this.weeks();
    this.destroyRows();
    for (const week of weeks) {
      const viewRef = this.viewContainerRef.createEmbeddedView(this.templateRef, null, {
        injector: Injector.create({
          parent: this.viewContainerRef.injector,
          providers: [{
            provide: NgpDatePickerWeekToken,
            useValue: week
          }]
        })
      });
      this.viewRefs.push(viewRef);
    }
  }
  /**
   * Destroy the row.
   */
  destroyRows() {
    for (const viewRef of this.viewRefs) {
      viewRef.destroy();
    }
    this.viewRefs.length = 0;
  }
  /**
   * Get the offset of the first day of the week.
   * @param firstCalendarDay The first day of the calendar without the offset.
   * @returns The offset of the first day of the week.
   *
   * @internal
   */
  getFirstDayOfWeekOffset(firstCalendarDay) {
    return (DAYS_PER_WEEK + this.dateAdapter.getDay(firstCalendarDay) - this.state().firstDayOfWeek()) % DAYS_PER_WEEK;
  }
  /**
   * Get the offset of the last day of the week.
   * @param lastCalendarDay The last day of the calendar without the offset.
   * @returns The offset of the last day of the week.
   *
   * @internal
   */
  getLastDayOfWeekOffset(lastCalendarDay) {
    const lastDay = this.dateAdapter.getDay(lastCalendarDay);
    const firstDay = this.state().firstDayOfWeek();
    return (DAYS_PER_WEEK + firstDay + DAYS_PER_WEEK - 1 - lastDay) % DAYS_PER_WEEK;
  }
};
_NgpDatePickerRowRender.ɵfac = function NgpDatePickerRowRender_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDatePickerRowRender)();
};
_NgpDatePickerRowRender.ɵdir = ɵɵdefineDirective({
  type: _NgpDatePickerRowRender,
  selectors: [["", "ngpDatePickerRowRender", ""]],
  exportAs: ["ngpDatePickerRowRender"],
  features: [ɵɵProvidersFeature([{
    provide: NgpDatePickerRowRenderToken,
    useExisting: _NgpDatePickerRowRender
  }])]
});
var NgpDatePickerRowRender = _NgpDatePickerRowRender;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDatePickerRowRender, [{
    type: Directive,
    args: [{
      selector: "[ngpDatePickerRowRender]",
      exportAs: "ngpDatePickerRowRender",
      providers: [{
        provide: NgpDatePickerRowRenderToken,
        useExisting: NgpDatePickerRowRender
      }]
    }]
  }], () => [], null);
})();
function transformToFirstDayOfWeekNumber(firstDayOfWeek) {
  if (!firstDayOfWeek) {
    return 7;
  }
  return numberAttribute(firstDayOfWeek);
}
var _NgpDatePicker = class _NgpDatePicker {
  constructor() {
    this.dateAdapter = injectDateAdapter();
    this.config = injectDatePickerConfig();
    this.injector = inject(Injector);
    this.min = input(void 0, {
      alias: "ngpDatePickerMin"
    });
    this.max = input(void 0, {
      alias: "ngpDatePickerMax"
    });
    this.disabled = input(false, {
      alias: "ngpDatePickerDisabled",
      transform: booleanAttribute
    });
    this.dateDisabled = input(() => false, {
      alias: "ngpDatePickerDateDisabled"
    });
    this.firstDayOfWeek = input(transformToFirstDayOfWeekNumber(this.config.firstDayOfWeek), {
      alias: "ngpDatePickerFirstDayOfWeek",
      transform: transformToFirstDayOfWeekNumber
    });
    this.date = input(void 0, {
      alias: "ngpDatePickerDate"
    });
    this.dateChange = output({
      alias: "ngpDatePickerDateChange"
    });
    this.focusedDate = input(this.dateAdapter.now(), {
      alias: "ngpDatePickerFocusedDate"
    });
    this.focusedDateChange = output({
      alias: "ngpDatePickerFocusedDateChange"
    });
    this.label = contentChild(NgpDatePickerLabelToken, {
      descendants: true
    });
    this.buttons = signal([]);
    this.state = datePickerState(this);
  }
  /**
   * Set the focused date.
   * @param date The date to focus.
   * @internal
   */
  setFocusedDate(date, origin = "mouse", direction) {
    if (this.state.disabled()) {
      return;
    }
    const min = this.state.min();
    const max = this.state.max();
    if (min && this.dateAdapter.isBefore(date, min)) {
      date = min;
    }
    if (max && this.dateAdapter.isAfter(date, max)) {
      date = max;
    }
    if (this.state.dateDisabled()(date)) {
      let nextDate = this.dateAdapter.add(date, {
        days: direction === "forward" ? 1 : -1
      });
      while (this.state.dateDisabled()(nextDate) || min && this.dateAdapter.isBefore(nextDate, min) || max && this.dateAdapter.isAfter(nextDate, max)) {
        nextDate = this.dateAdapter.add(nextDate, {
          days: direction === "forward" ? 1 : -1
        });
      }
      date = nextDate;
    }
    this.state.focusedDate.set(date);
    this.focusedDateChange.emit(date);
    if (origin === "keyboard") {
      afterNextRender({
        write: () => this.buttons().forEach((button) => button.focus())
      }, {
        injector: this.injector
      });
    }
  }
  /**
   * Register a date button.
   * @param button The date button to register.
   * @internal
   */
  registerButton(button) {
    this.buttons.update((buttons) => [...buttons, button]);
  }
  /**
   * Unregister a date button.
   * @param button The date button to unregister.
   * @internal
   */
  unregisterButton(button) {
    this.buttons.update((buttons) => buttons.filter((b) => b !== button));
  }
  /**
   * Select a date.
   * @param date The date to select.
   * @internal
   */
  select(date) {
    this.state.date.set(date);
    this.dateChange.emit(date);
  }
  /**
   * Determine if a date is selected.
   * @param date The date to check.
   * @returns True if the date is selected, false otherwise.
   * @internal
   */
  isSelected(date) {
    const selected = this.state.date();
    if (!selected) {
      return false;
    }
    return this.dateAdapter.isSameDay(date, selected);
  }
  /**
   * Determine if a date is the start of a range. In a date picker, this is always false.
   * @param date The date to check.
   * @returns Always false.
   * @internal
   */
  isStartOfRange(_) {
    return false;
  }
  /**
   * Determine if a date is the end of a range. In a date picker, this is always false.
   * @param date The date to check.
   * @returns Always false.
   * @internal
   */
  isEndOfRange(_) {
    return false;
  }
  /**
   * Determine if a date is between the start and end dates. In a date picker, this is always false.
   * @param date The date to check.
   * @returns True if the date is between the start and end dates, false otherwise.
   * @internal
   */
  isBetweenRange(_) {
    return false;
  }
};
_NgpDatePicker.ɵfac = function NgpDatePicker_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDatePicker)();
};
_NgpDatePicker.ɵdir = ɵɵdefineDirective({
  type: _NgpDatePicker,
  selectors: [["", "ngpDatePicker", ""]],
  contentQueries: function NgpDatePicker_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuerySignal(dirIndex, ctx.label, NgpDatePickerLabelToken, 5);
    }
    if (rf & 2) {
      ɵɵqueryAdvance();
    }
  },
  hostVars: 1,
  hostBindings: function NgpDatePicker_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("data-disabled", ctx.state.disabled() ? "" : null);
    }
  },
  inputs: {
    min: [1, "ngpDatePickerMin", "min"],
    max: [1, "ngpDatePickerMax", "max"],
    disabled: [1, "ngpDatePickerDisabled", "disabled"],
    dateDisabled: [1, "ngpDatePickerDateDisabled", "dateDisabled"],
    firstDayOfWeek: [1, "ngpDatePickerFirstDayOfWeek", "firstDayOfWeek"],
    date: [1, "ngpDatePickerDate", "date"],
    focusedDate: [1, "ngpDatePickerFocusedDate", "focusedDate"]
  },
  outputs: {
    dateChange: "ngpDatePickerDateChange",
    focusedDateChange: "ngpDatePickerFocusedDateChange"
  },
  exportAs: ["ngpDatePicker"],
  features: [ɵɵProvidersFeature([provideDatePickerState()])]
});
var NgpDatePicker = _NgpDatePicker;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDatePicker, [{
    type: Directive,
    args: [{
      selector: "[ngpDatePicker]",
      exportAs: "ngpDatePicker",
      providers: [provideDatePickerState()],
      host: {
        "[attr.data-disabled]": 'state.disabled() ? "" : null'
      }
    }]
  }], null, null);
})();
var _NgpDateRangePicker = class _NgpDateRangePicker {
  constructor() {
    this.dateAdapter = injectDateAdapter();
    this.config = injectDatePickerConfig();
    this.injector = inject(Injector);
    this.min = input(void 0, {
      alias: "ngpDateRangePickerMin"
    });
    this.max = input(void 0, {
      alias: "ngpDateRangePickerMax"
    });
    this.disabled = input(false, {
      alias: "ngpDateRangePickerDisabled",
      transform: booleanAttribute
    });
    this.dateDisabled = input(() => false, {
      alias: "ngpDateRangePickerDateDisabled"
    });
    this.firstDayOfWeek = input(transformToFirstDayOfWeekNumber(this.config.firstDayOfWeek), {
      alias: "ngpDateRangePickerFirstDayOfWeek",
      transform: transformToFirstDayOfWeekNumber
    });
    this.startDate = input(void 0, {
      alias: "ngpDateRangePickerStartDate"
    });
    this.startDateChange = output({
      alias: "ngpDateRangePickerStartDateChange"
    });
    this.endDate = input(void 0, {
      alias: "ngpDateRangePickerEndDate"
    });
    this.endDateChange = output({
      alias: "ngpDateRangePickerEndDateChange"
    });
    this.focusedDate = input(this.dateAdapter.now(), {
      alias: "ngpDateRangePickerFocusedDate"
    });
    this.focusedDateChange = output({
      alias: "ngpDateRangePickerFocusedDateChange"
    });
    this.label = contentChild(NgpDatePickerLabelToken, {
      descendants: true
    });
    this.buttons = signal([]);
    this.state = dateRangePickerState(this);
  }
  /**
   * Set the focused date.
   * @param date The date to focus.
   * @internal
   */
  setFocusedDate(date, origin = "mouse", direction) {
    if (this.state.disabled()) {
      return;
    }
    const min = this.state.min();
    const max = this.state.max();
    if (min && this.dateAdapter.isBefore(date, min)) {
      date = min;
    }
    if (max && this.dateAdapter.isAfter(date, max)) {
      date = max;
    }
    if (this.state.dateDisabled()(date)) {
      let nextDate = this.dateAdapter.add(date, {
        days: direction === "forward" ? 1 : -1
      });
      while (this.state.dateDisabled()(nextDate) || min && this.dateAdapter.isBefore(nextDate, min) || max && this.dateAdapter.isAfter(nextDate, max)) {
        nextDate = this.dateAdapter.add(nextDate, {
          days: direction === "forward" ? 1 : -1
        });
      }
      date = nextDate;
    }
    this.state.focusedDate.set(date);
    this.focusedDateChange.emit(date);
    if (origin === "keyboard") {
      afterNextRender({
        write: () => this.buttons().forEach((button) => button.focus())
      }, {
        injector: this.injector
      });
    }
  }
  /**
   * Register a date button.
   * @param button The date button to register.
   * @internal
   */
  registerButton(button) {
    this.buttons.update((buttons) => [...buttons, button]);
  }
  /**
   * Unregister a date button.
   * @param button The date button to unregister.
   * @internal
   */
  unregisterButton(button) {
    this.buttons.update((buttons) => buttons.filter((b) => b !== button));
  }
  /**
   * Select a date.
   * @param date The date to select.
   * @internal
   */
  /**
   * Handles the selection of a date within the date range picker.
   *
   * Selection logic:
   * - If neither a start date nor an end date is selected:
   *   - Sets the selected date as the start date.
   * - If a start date is selected but no end date:
   *   - If the selected date is after the start date, sets it as the end date.
   *   - If the selected date is before the start date, sets the selected date as the start date
   *     and the previous start date as the end date.
   *   - If the selected date is the same as the start date, sets the selected date as the end date
   *     to select a single date.
   * - If both start and end dates are already selected:
   *   - Resets the selection, setting the selected date as the new start date and clearing the end date.
   *
   * @param date The date to select.
   */
  select(date) {
    const start = this.state.startDate();
    const end = this.state.endDate();
    if (!start && !end) {
      this.state.startDate.set(date);
      this.startDateChange.emit(date);
      return;
    }
    if (start && !end) {
      if (this.dateAdapter.isAfter(date, start)) {
        this.state.endDate.set(date);
        this.endDateChange.emit(date);
      } else if (this.dateAdapter.isBefore(date, start)) {
        this.state.startDate.set(date);
        this.state.endDate.set(start);
        this.startDateChange.emit(date);
        this.endDateChange.emit(start);
      } else if (this.dateAdapter.isSameDay(date, start)) {
        this.state.endDate.set(date);
        this.endDateChange.emit(date);
      }
      return;
    }
    this.state.startDate.set(date);
    this.startDateChange.emit(date);
    this.state.endDate.set(void 0);
    this.endDateChange.emit(void 0);
  }
  /**
   * Determine if a date is selected. A date is selected if it is either the start date or the end date.
   * @param date The date to check.
   * @returns True if the date is selected, false otherwise.
   * @internal
   */
  isSelected(date) {
    const start = this.state.startDate();
    const end = this.state.endDate();
    if (!start && !end) {
      return false;
    }
    const isStartSelected = start ? this.dateAdapter.isSameDay(date, start) : false;
    const isEndSelected = end ? this.dateAdapter.isSameDay(date, end) : false;
    return isStartSelected || isEndSelected;
  }
  /**
   * Determine if a date is the start of a range.
   * @param date The date to check.
   * @returns Always false.
   * @internal
   */
  isStartOfRange(date) {
    const start = this.state.startDate();
    return start ? this.dateAdapter.isSameDay(date, start) : false;
  }
  /**
   * Determine if a date is the end of a range.
   * @param date The date to check.
   * @returns Always false.
   * @internal
   */
  isEndOfRange(date) {
    const end = this.state.endDate();
    return end ? this.dateAdapter.isSameDay(date, end) : false;
  }
  /**
   * Determine if a date is between the start and end dates.
   * @param date The date to check.
   * @returns True if the date is between the start and end dates, false otherwise.
   * @internal
   */
  isBetweenRange(date) {
    const start = this.state.startDate();
    const end = this.state.endDate();
    if (!start || !end) {
      return false;
    }
    return this.dateAdapter.isAfter(date, start) && this.dateAdapter.isBefore(date, end);
  }
};
_NgpDateRangePicker.ɵfac = function NgpDateRangePicker_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDateRangePicker)();
};
_NgpDateRangePicker.ɵdir = ɵɵdefineDirective({
  type: _NgpDateRangePicker,
  selectors: [["", "ngpDateRangePicker", ""]],
  contentQueries: function NgpDateRangePicker_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuerySignal(dirIndex, ctx.label, NgpDatePickerLabelToken, 5);
    }
    if (rf & 2) {
      ɵɵqueryAdvance();
    }
  },
  hostVars: 1,
  hostBindings: function NgpDateRangePicker_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("data-disabled", ctx.state.disabled() ? "" : null);
    }
  },
  inputs: {
    min: [1, "ngpDateRangePickerMin", "min"],
    max: [1, "ngpDateRangePickerMax", "max"],
    disabled: [1, "ngpDateRangePickerDisabled", "disabled"],
    dateDisabled: [1, "ngpDateRangePickerDateDisabled", "dateDisabled"],
    firstDayOfWeek: [1, "ngpDateRangePickerFirstDayOfWeek", "firstDayOfWeek"],
    startDate: [1, "ngpDateRangePickerStartDate", "startDate"],
    endDate: [1, "ngpDateRangePickerEndDate", "endDate"],
    focusedDate: [1, "ngpDateRangePickerFocusedDate", "focusedDate"]
  },
  outputs: {
    startDateChange: "ngpDateRangePickerStartDateChange",
    endDateChange: "ngpDateRangePickerEndDateChange",
    focusedDateChange: "ngpDateRangePickerFocusedDateChange"
  },
  exportAs: ["ngpDateRangePicker"],
  features: [ɵɵProvidersFeature([provideDateRangePickerState()])]
});
var NgpDateRangePicker = _NgpDateRangePicker;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDateRangePicker, [{
    type: Directive,
    args: [{
      selector: "[ngpDateRangePicker]",
      exportAs: "ngpDateRangePicker",
      providers: [provideDateRangePickerState()],
      host: {
        "[attr.data-disabled]": 'state.disabled() ? "" : null'
      }
    }]
  }], null, null);
})();
export {
  NgpDatePicker,
  NgpDatePickerCell,
  NgpDatePickerCellRender,
  NgpDatePickerCellRenderToken,
  NgpDatePickerDateButton,
  NgpDatePickerDateButtonToken,
  NgpDatePickerGrid,
  NgpDatePickerLabel,
  NgpDatePickerLabelToken,
  NgpDatePickerNextMonth,
  NgpDatePickerPreviousMonth,
  NgpDatePickerRowRender,
  NgpDatePickerRowRenderToken,
  NgpDateRangePicker,
  injectDatePickerCellDate,
  injectDatePickerCellRender,
  injectDatePickerConfig,
  injectDatePickerDateButton,
  injectDatePickerLabel,
  injectDatePickerRowRender,
  injectDatePickerState,
  injectDatePickerWeek,
  injectDateRangePickerState,
  provideDatePickerConfig,
  provideDatePickerState,
  provideDateRangePickerState,
  transformToFirstDayOfWeekNumber
};
//# sourceMappingURL=ng-primitives_date-picker.js.map
