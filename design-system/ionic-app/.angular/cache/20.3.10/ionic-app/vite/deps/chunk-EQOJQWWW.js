import {
  createState,
  createStateInjector,
  createStateProvider,
  createStateToken,
  explicitEffect,
  injectElementRef
} from "./chunk-NOHFT6FW.js";
import {
  controlStatus,
  onBooleanChange,
  onChange,
  uniqueId
} from "./chunk-7VMOF35L.js";
import {
  NgControl
} from "./chunk-RQY3LDOR.js";
import {
  Directive,
  ElementRef,
  HostListener,
  afterRenderEffect,
  booleanAttribute,
  computed,
  contentChild,
  effect,
  inject,
  input,
  setClassMetadata,
  signal,
  ɵɵNgOnChangesFeature,
  ɵɵProvidersFeature,
  ɵɵattribute,
  ɵɵcontentQuerySignal,
  ɵɵdefineDirective,
  ɵɵlistener,
  ɵɵqueryAdvance
} from "./chunk-JIIPHG5Y.js";
import {
  __spreadProps,
  __spreadValues
} from "./chunk-UK4S7V5W.js";

// node_modules/ng-primitives/fesm2022/ng-primitives-form-field.mjs
var NgpFormFieldStateToken = createStateToken("FormField");
var provideFormFieldState = createStateProvider(NgpFormFieldStateToken);
var injectFormFieldState = createStateInjector(NgpFormFieldStateToken);
var formFieldState = createState(NgpFormFieldStateToken);
var _NgpDescription = class _NgpDescription {
  constructor() {
    this.id = input(uniqueId("ngp-description"));
    this.formField = injectFormFieldState({
      optional: true
    });
    effect((onCleanup) => {
      this.formField()?.addDescription(this.id());
      onCleanup(() => this.formField()?.removeDescription(this.id()));
    });
  }
};
_NgpDescription.ɵfac = function NgpDescription_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpDescription)();
};
_NgpDescription.ɵdir = ɵɵdefineDirective({
  type: _NgpDescription,
  selectors: [["", "ngpDescription", ""]],
  hostVars: 8,
  hostBindings: function NgpDescription_HostBindings(rf, ctx) {
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      ɵɵattribute("id", ctx.id())("data-invalid", ((tmp_1_0 = ctx.formField()) == null ? null : tmp_1_0.invalid()) ? "" : null)("data-valid", ((tmp_2_0 = ctx.formField()) == null ? null : tmp_2_0.valid()) ? "" : null)("data-touched", ((tmp_3_0 = ctx.formField()) == null ? null : tmp_3_0.touched()) ? "" : null)("data-pristine", ((tmp_4_0 = ctx.formField()) == null ? null : tmp_4_0.pristine()) ? "" : null)("data-dirty", ((tmp_5_0 = ctx.formField()) == null ? null : tmp_5_0.dirty()) ? "" : null)("data-pending", ((tmp_6_0 = ctx.formField()) == null ? null : tmp_6_0.pending()) ? "" : null)("data-disabled", ((tmp_7_0 = ctx.formField()) == null ? null : tmp_7_0.disabled()) ? "" : null);
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpDescription"]
});
var NgpDescription = _NgpDescription;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpDescription, [{
    type: Directive,
    args: [{
      selector: "[ngpDescription]",
      exportAs: "ngpDescription",
      host: {
        "[attr.id]": "id()",
        "[attr.data-invalid]": 'formField()?.invalid() ? "" : null',
        "[attr.data-valid]": 'formField()?.valid() ? "" : null',
        "[attr.data-touched]": 'formField()?.touched() ? "" : null',
        "[attr.data-pristine]": 'formField()?.pristine() ? "" : null',
        "[attr.data-dirty]": 'formField()?.dirty() ? "" : null',
        "[attr.data-pending]": 'formField()?.pending() ? "" : null',
        "[attr.data-disabled]": 'formField()?.disabled() ? "" : null'
      }
    }]
  }], () => [], null);
})();
var _NgpError = class _NgpError {
  constructor() {
    this.formField = injectFormFieldState({
      optional: true
    });
    this.id = input(uniqueId("ngp-error"));
    this.validator = input(null, {
      alias: "ngpErrorValidator"
    });
    this.hasError = computed(() => {
      const errors = this.formField()?.errors() ?? [];
      const validator = this.validator();
      return validator ? errors?.includes(validator) : errors?.length > 0;
    });
    this.state = computed(() => this.hasError() ? "fail" : "pass");
    onBooleanChange(this.hasError, () => this.formField()?.addDescription(this.id()), () => this.formField()?.removeDescription(this.id()));
  }
  ngOnChanges(changes) {
    if ("id" in changes) {
      this.formField()?.removeDescription(changes["id"].previousValue);
    }
  }
  ngOnDestroy() {
    this.formField()?.removeDescription(this.id());
  }
};
_NgpError.ɵfac = function NgpError_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpError)();
};
_NgpError.ɵdir = ɵɵdefineDirective({
  type: _NgpError,
  selectors: [["", "ngpError", ""]],
  hostVars: 9,
  hostBindings: function NgpError_HostBindings(rf, ctx) {
    if (rf & 2) {
      let tmp_1_0;
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      ɵɵattribute("id", ctx.id())("data-invalid", ((tmp_1_0 = ctx.formField()) == null ? null : tmp_1_0.invalid()) ? "" : null)("data-valid", ((tmp_2_0 = ctx.formField()) == null ? null : tmp_2_0.valid()) ? "" : null)("data-touched", ((tmp_3_0 = ctx.formField()) == null ? null : tmp_3_0.touched()) ? "" : null)("data-pristine", ((tmp_4_0 = ctx.formField()) == null ? null : tmp_4_0.pristine()) ? "" : null)("data-dirty", ((tmp_5_0 = ctx.formField()) == null ? null : tmp_5_0.dirty()) ? "" : null)("data-pending", ((tmp_6_0 = ctx.formField()) == null ? null : tmp_6_0.pending()) ? "" : null)("data-disabled", ((tmp_7_0 = ctx.formField()) == null ? null : tmp_7_0.disabled()) ? "" : null)("data-validator", ctx.state());
    }
  },
  inputs: {
    id: [1, "id"],
    validator: [1, "ngpErrorValidator", "validator"]
  },
  exportAs: ["ngpError"],
  features: [ɵɵNgOnChangesFeature]
});
var NgpError = _NgpError;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpError, [{
    type: Directive,
    args: [{
      selector: "[ngpError]",
      exportAs: "ngpError",
      host: {
        "[attr.id]": "id()",
        "[attr.data-invalid]": 'formField()?.invalid() ? "" : null',
        "[attr.data-valid]": 'formField()?.valid() ? "" : null',
        "[attr.data-touched]": 'formField()?.touched() ? "" : null',
        "[attr.data-pristine]": 'formField()?.pristine() ? "" : null',
        "[attr.data-dirty]": 'formField()?.dirty() ? "" : null',
        "[attr.data-pending]": 'formField()?.pending() ? "" : null',
        "[attr.data-disabled]": 'formField()?.disabled() ? "" : null',
        "[attr.data-validator]": "state()"
      }
    }]
  }], () => [], null);
})();
var NgpFormControlStateToken = createStateToken("FormControl");
var provideFormControlState = createStateProvider(NgpFormControlStateToken);
var injectFormControlState = createStateInjector(NgpFormControlStateToken);
var formControlState = createState(NgpFormControlStateToken);
var _NgpFormControl = class _NgpFormControl {
  constructor() {
    this.id = input(uniqueId("ngp-form-control"));
    this.disabled = input(false, {
      alias: "ngpFormControlDisabled",
      transform: booleanAttribute
    });
    this.elementRef = injectElementRef();
    this.supportsDisabledAttribute = "disabled" in this.elementRef.nativeElement;
    this.state = formControlState(this);
    this.status = setupFormControl({
      id: this.state.id,
      disabled: this.state.disabled
    });
  }
};
_NgpFormControl.ɵfac = function NgpFormControl_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpFormControl)();
};
_NgpFormControl.ɵdir = ɵɵdefineDirective({
  type: _NgpFormControl,
  selectors: [["", "ngpFormControl", ""]],
  hostVars: 1,
  hostBindings: function NgpFormControl_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("disabled", ctx.supportsDisabledAttribute && ctx.status().disabled ? "" : null);
    }
  },
  inputs: {
    id: [1, "id"],
    disabled: [1, "ngpFormControlDisabled", "disabled"]
  },
  exportAs: ["ngpFormControl"],
  features: [ɵɵProvidersFeature([provideFormControlState()])]
});
var NgpFormControl = _NgpFormControl;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpFormControl, [{
    type: Directive,
    args: [{
      selector: "[ngpFormControl]",
      exportAs: "ngpFormControl",
      providers: [provideFormControlState()],
      host: {
        "[attr.disabled]": 'supportsDisabledAttribute && status().disabled ? "" : null'
      }
    }]
  }], () => [], null);
})();
function setupFormControl({
  id,
  disabled = signal(false)
}) {
  const element = injectElementRef().nativeElement;
  const formField = injectFormFieldState({
    optional: true
  });
  const status = controlStatus();
  const ariaLabelledBy = computed(() => formField()?.labels().join(" "));
  const ariaDescribedBy = computed(() => formField()?.descriptions().join(" "));
  explicitEffect([id], ([id2], onCleanup) => {
    formField()?.setFormControl(id2);
    onCleanup(() => formField()?.removeFormControl());
  });
  afterRenderEffect({
    write: () => {
      setAttribute(element, "id", id());
      setAttribute(element, "aria-labelledby", ariaLabelledBy());
      setAttribute(element, "aria-describedby", ariaDescribedBy());
      setStateAttribute(element, status().invalid, "data-invalid");
      setStateAttribute(element, status().valid, "data-valid");
      setStateAttribute(element, status().touched, "data-touched");
      setStateAttribute(element, status().pristine, "data-pristine");
      setStateAttribute(element, status().dirty, "data-dirty");
      setStateAttribute(element, status().pending, "data-pending");
      setStateAttribute(element, disabled() || status().disabled, "data-disabled");
    }
  });
  return computed(() => __spreadProps(__spreadValues({}, status()), {
    disabled: status().disabled || disabled()
  }));
}
function setAttribute(element, attribute, value) {
  if (value && value.length > 0) {
    element.setAttribute(attribute, value);
  } else {
    element.removeAttribute(attribute);
  }
}
function setStateAttribute(element, state, attribute) {
  if (state) {
    element.setAttribute(attribute, "");
  } else {
    element.removeAttribute(attribute);
  }
}
var _NgpFormField = class _NgpFormField {
  constructor() {
    this.labels = signal([]);
    this.descriptions = signal([]);
    this.formControl = signal(null);
    this.ngControl = contentChild(NgControl);
    this.errors = signal([]);
    this.pristine = signal(null);
    this.touched = signal(null);
    this.dirty = signal(null);
    this.valid = signal(null);
    this.invalid = signal(null);
    this.pending = signal(null);
    this.disabled = signal(null);
    this.state = formFieldState(this);
    onChange(this.ngControl, this.setupSubscriptions.bind(this));
  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
  /**
   * Setup a listener for the form control status.
   * @param control
   */
  setupSubscriptions(control) {
    this.subscription?.unsubscribe();
    this.updateStatus();
    const underlyingControl = control?.control;
    this.subscription = underlyingControl?.events?.subscribe(this.updateStatus.bind(this));
  }
  updateStatus() {
    const control = this.ngControl();
    if (!control) {
      return;
    }
    this.pristine.set(control.pristine);
    this.touched.set(control.touched);
    this.dirty.set(control.dirty);
    this.valid.set(control.valid);
    this.invalid.set(control.invalid);
    this.pending.set(control.pending);
    this.disabled.set(control.disabled);
    this.errors.set(control?.errors ? Object.keys(control.errors) : []);
  }
  /**
   * Register the id of the associated form control.
   * @param id
   * @internal
   */
  setFormControl(id) {
    this.formControl.set(id);
  }
  /**
   * Register a label with the form field.
   * @param label
   * @internal
   */
  addLabel(label) {
    this.labels.update((labels) => [...labels, label]);
  }
  /**
   * Register a description with the form field.
   * @param description
   * @internal
   */
  addDescription(description) {
    this.descriptions.update((descriptions) => [...descriptions, description]);
  }
  /**
   * Remove the associated form control.
   * @internal
   */
  removeFormControl() {
    this.formControl.set(null);
  }
  /**
   * Remove a label from the form field.
   * @param label
   * @internal
   */
  removeLabel(label) {
    this.labels.update((labels) => labels.filter((l) => l !== label));
  }
  /**
   * Remove a description from the form field.
   * @param description
   * @internal
   */
  removeDescription(description) {
    this.descriptions.update((descriptions) => descriptions.filter((d) => d !== description));
  }
};
_NgpFormField.ɵfac = function NgpFormField_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpFormField)();
};
_NgpFormField.ɵdir = ɵɵdefineDirective({
  type: _NgpFormField,
  selectors: [["", "ngpFormField", ""]],
  contentQueries: function NgpFormField_ContentQueries(rf, ctx, dirIndex) {
    if (rf & 1) {
      ɵɵcontentQuerySignal(dirIndex, ctx.ngControl, NgControl, 5);
    }
    if (rf & 2) {
      ɵɵqueryAdvance();
    }
  },
  hostVars: 7,
  hostBindings: function NgpFormField_HostBindings(rf, ctx) {
    if (rf & 2) {
      ɵɵattribute("data-invalid", ctx.invalid() ? "" : null)("data-valid", ctx.valid() ? "" : null)("data-touched", ctx.touched() ? "" : null)("data-pristine", ctx.pristine() ? "" : null)("data-dirty", ctx.dirty() ? "" : null)("data-pending", ctx.pending() ? "" : null)("data-disabled", ctx.disabled() ? "" : null);
    }
  },
  exportAs: ["ngpFormField"],
  features: [ɵɵProvidersFeature([provideFormFieldState()])]
});
var NgpFormField = _NgpFormField;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpFormField, [{
    type: Directive,
    args: [{
      selector: "[ngpFormField]",
      exportAs: "ngpFormField",
      providers: [provideFormFieldState()],
      host: {
        "[attr.data-invalid]": 'invalid() ? "" : null',
        "[attr.data-valid]": 'valid() ? "" : null',
        "[attr.data-touched]": 'touched() ? "" : null',
        "[attr.data-pristine]": 'pristine() ? "" : null',
        "[attr.data-dirty]": 'dirty() ? "" : null',
        "[attr.data-pending]": 'pending() ? "" : null',
        "[attr.data-disabled]": 'disabled() ? "" : null'
      }
    }]
  }], () => [], null);
})();
var _NgpLabel = class _NgpLabel {
  constructor() {
    this.id = input(uniqueId("ngp-label"));
    this.formField = injectFormFieldState({
      optional: true
    });
    this.htmlFor = computed(() => this.formField()?.formControl());
    this.elementRef = inject(ElementRef);
    this.isLabel = this.elementRef.nativeElement instanceof HTMLLabelElement;
    effect((onCleanup) => {
      this.formField()?.addLabel(this.id());
      onCleanup(() => this.formField()?.removeLabel(this.id()));
    });
  }
  onClick(event) {
    if (this.isLabel) {
      event.preventDefault();
    }
    const targetId = this.htmlFor();
    if (!targetId) {
      return;
    }
    const target = document.getElementById(targetId);
    if (!target) {
      return;
    }
    const disabled = target.getAttribute("disabled");
    const ariaDisabled = target.getAttribute("aria-disabled");
    if (disabled === "" || disabled === "true" || ariaDisabled === "true") {
      return;
    }
    if (target instanceof HTMLInputElement && (target.type === "radio" || target.type === "checkbox") || target.role === "radio" || target.role === "checkbox" || target.role === "switch") {
      target.click();
    }
    target.focus({
      preventScroll: true
    });
  }
};
_NgpLabel.ɵfac = function NgpLabel_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _NgpLabel)();
};
_NgpLabel.ɵdir = ɵɵdefineDirective({
  type: _NgpLabel,
  selectors: [["", "ngpLabel", ""]],
  hostVars: 9,
  hostBindings: function NgpLabel_HostBindings(rf, ctx) {
    if (rf & 1) {
      ɵɵlistener("click", function NgpLabel_click_HostBindingHandler($event) {
        return ctx.onClick($event);
      });
    }
    if (rf & 2) {
      let tmp_2_0;
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      ɵɵattribute("id", ctx.id())("for", ctx.htmlFor())("data-invalid", ((tmp_2_0 = ctx.formField()) == null ? null : tmp_2_0.invalid()) ? "" : null)("data-valid", ((tmp_3_0 = ctx.formField()) == null ? null : tmp_3_0.valid()) ? "" : null)("data-touched", ((tmp_4_0 = ctx.formField()) == null ? null : tmp_4_0.touched()) ? "" : null)("data-pristine", ((tmp_5_0 = ctx.formField()) == null ? null : tmp_5_0.pristine()) ? "" : null)("data-dirty", ((tmp_6_0 = ctx.formField()) == null ? null : tmp_6_0.dirty()) ? "" : null)("data-pending", ((tmp_7_0 = ctx.formField()) == null ? null : tmp_7_0.pending()) ? "" : null)("data-disabled", ((tmp_8_0 = ctx.formField()) == null ? null : tmp_8_0.disabled()) ? "" : null);
    }
  },
  inputs: {
    id: [1, "id"]
  },
  exportAs: ["ngpLabel"]
});
var NgpLabel = _NgpLabel;
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgpLabel, [{
    type: Directive,
    args: [{
      selector: "[ngpLabel]",
      exportAs: "ngpLabel",
      host: {
        "[attr.id]": "id()",
        "[attr.for]": "htmlFor()",
        "[attr.data-invalid]": 'formField()?.invalid() ? "" : null',
        "[attr.data-valid]": 'formField()?.valid() ? "" : null',
        "[attr.data-touched]": 'formField()?.touched() ? "" : null',
        "[attr.data-pristine]": 'formField()?.pristine() ? "" : null',
        "[attr.data-dirty]": 'formField()?.dirty() ? "" : null',
        "[attr.data-pending]": 'formField()?.pending() ? "" : null',
        "[attr.data-disabled]": 'formField()?.disabled() ? "" : null'
      }
    }]
  }], () => [], {
    onClick: [{
      type: HostListener,
      args: ["click", ["$event"]]
    }]
  });
})();

export {
  provideFormFieldState,
  injectFormFieldState,
  NgpDescription,
  NgpError,
  provideFormControlState,
  injectFormControlState,
  NgpFormControl,
  setupFormControl,
  NgpFormField,
  NgpLabel
};
//# sourceMappingURL=chunk-EQOJQWWW.js.map
