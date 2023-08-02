import { c as createComponent, a as computed, h, b as hSlot, i as inject, e as emptyRenderFn, r as ref, w as watch, o as onBeforeUnmount, d as hUniqueSlot, g as getCurrentInstance, l as layoutKey, f as isRuntimeSsrPreHydration, j as hMergeSlot, u as useModelToggleProps, k as useDarkProps, m as useModelToggleEmits, n as useDark, p as useTimeout, q as useModelToggle, s as useHistory, t as onMounted, v as nextTick, x as withDirectives, y as hDir, z as usePreventScroll, A as provide, B as pageContainerKey, C as getScrollbarWidth, D as reactive, E as onUnmounted, F as openBlock, G as createElementBlock, H as createVNode, I as withCtx, J as createBaseVNode, Q as QCardActions, K as QBtn, L as QCardSection, M as Fragment, N as renderList, O as unref, P as QAvatar, R as createTextVNode, S as toDisplayString, T as normalizeClass, U as createBlock, V as createCommentVNode, W as useRouter, X as resolveComponent, Y as QIcon, Z as QSeparator, _ as QCard, $ as QDialog } from "./index.d7888b57.js";
import { u as useQuasar, Q as QItem, a as QItemSection, b as QMenu } from "./use-quasar.56248db4.js";
import { Q as QList, a as QItemLabel, C as ClosePopup } from "./ClosePopup.f41d8027.js";
import { Q as QTooltip, l as load } from "./index.7724e03e.js";
import { Q as QResizeObserver, T as TouchPan, b as between, a as QScrollObserver, c as QScrollArea, r as recent } from "./QScrollArea.5b3e1ba1.js";
import { d as docStore } from "./curentDocStore.7a49504e.js";
var QToolbarTitle = createComponent({
  name: "QToolbarTitle",
  props: {
    shrink: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-toolbar__title ellipsis" + (props.shrink === true ? " col-shrink" : "")
    );
    return () => h("div", { class: classes.value }, hSlot(slots.default));
  }
});
var QToolbar = createComponent({
  name: "QToolbar",
  props: {
    inset: Boolean
  },
  setup(props, { slots }) {
    const classes = computed(
      () => "q-toolbar row no-wrap items-center" + (props.inset === true ? " q-toolbar--inset" : "")
    );
    return () => h("div", { class: classes.value, role: "toolbar" }, hSlot(slots.default));
  }
});
var QHeader = createComponent({
  name: "QHeader",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    revealOffset: {
      type: Number,
      default: 250
    },
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QHeader needs to be child of QLayout");
      return emptyRenderFn;
    }
    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("H") > -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0;
      }
      const offset2 = size.value - $layout.scroll.value.position;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-header q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-top" + (props.bordered === true ? " q-header--bordered" : "") + (hidden.value === true ? " q-header--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.top, css = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css;
    });
    function updateLayout(prop, val) {
      $layout.update("header", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size, height);
      updateLayout("size", height);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch($layout.scroll, (scroll) => {
      props.reveal === true && updateLocal(
        revealed,
        scroll.direction === "up" || scroll.position <= props.revealOffset || scroll.position - scroll.inflectionPoint < 100
      );
    });
    const instance = {};
    $layout.instances.header = instance;
    props.modelValue === true && updateLayout("size", size.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.header === instance) {
        $layout.instances.header = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hUniqueSlot(slots.default, []);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      child.push(
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      );
      return h("header", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
var QFooter = createComponent({
  name: "QFooter",
  props: {
    modelValue: {
      type: Boolean,
      default: true
    },
    reveal: Boolean,
    bordered: Boolean,
    elevated: Boolean,
    heightHint: {
      type: [String, Number],
      default: 50
    }
  },
  emits: ["reveal", "focusin"],
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QFooter needs to be child of QLayout");
      return emptyRenderFn;
    }
    const size = ref(parseInt(props.heightHint, 10));
    const revealed = ref(true);
    const windowHeight = ref(
      isRuntimeSsrPreHydration.value === true || $layout.isContainer.value === true ? 0 : window.innerHeight
    );
    const fixed = computed(
      () => props.reveal === true || $layout.view.value.indexOf("F") > -1 || $q.platform.is.ios && $layout.isContainer.value === true
    );
    const containerHeight = computed(() => $layout.isContainer.value === true ? $layout.containerHeight.value : windowHeight.value);
    const offset = computed(() => {
      if (props.modelValue !== true) {
        return 0;
      }
      if (fixed.value === true) {
        return revealed.value === true ? size.value : 0;
      }
      const offset2 = $layout.scroll.value.position + containerHeight.value + size.value - $layout.height.value;
      return offset2 > 0 ? offset2 : 0;
    });
    const hidden = computed(
      () => props.modelValue !== true || fixed.value === true && revealed.value !== true
    );
    const revealOnFocus = computed(
      () => props.modelValue === true && hidden.value === true && props.reveal === true
    );
    const classes = computed(
      () => "q-footer q-layout__section--marginal " + (fixed.value === true ? "fixed" : "absolute") + "-bottom" + (props.bordered === true ? " q-footer--bordered" : "") + (hidden.value === true ? " q-footer--hidden" : "") + (props.modelValue !== true ? " q-layout--prevent-focus" + (fixed.value !== true ? " hidden" : "") : "")
    );
    const style = computed(() => {
      const view = $layout.rows.value.bottom, css = {};
      if (view[0] === "l" && $layout.left.space === true) {
        css[$q.lang.rtl === true ? "right" : "left"] = `${$layout.left.size}px`;
      }
      if (view[2] === "r" && $layout.right.space === true) {
        css[$q.lang.rtl === true ? "left" : "right"] = `${$layout.right.size}px`;
      }
      return css;
    });
    function updateLayout(prop, val) {
      $layout.update("footer", prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function onResize({ height }) {
      updateLocal(size, height);
      updateLayout("size", height);
    }
    function updateRevealed() {
      if (props.reveal !== true) {
        return;
      }
      const { direction, position, inflectionPoint } = $layout.scroll.value;
      updateLocal(revealed, direction === "up" || position - inflectionPoint < 100 || $layout.height.value - containerHeight.value - position - size.value < 300);
    }
    function onFocusin(evt) {
      if (revealOnFocus.value === true) {
        updateLocal(revealed, true);
      }
      emit("focusin", evt);
    }
    watch(() => props.modelValue, (val) => {
      updateLayout("space", val);
      updateLocal(revealed, true);
      $layout.animate();
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(() => props.reveal, (val) => {
      val === false && updateLocal(revealed, props.modelValue);
    });
    watch(revealed, (val) => {
      $layout.animate();
      emit("reveal", val);
    });
    watch([size, $layout.scroll, $layout.height], updateRevealed);
    watch(() => $q.screen.height, (val) => {
      $layout.isContainer.value !== true && updateLocal(windowHeight, val);
    });
    const instance = {};
    $layout.instances.footer = instance;
    props.modelValue === true && updateLayout("size", size.value);
    updateLayout("space", props.modelValue);
    updateLayout("offset", offset.value);
    onBeforeUnmount(() => {
      if ($layout.instances.footer === instance) {
        $layout.instances.footer = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = hMergeSlot(slots.default, [
        h(QResizeObserver, {
          debounce: 0,
          onResize
        })
      ]);
      props.elevated === true && child.push(
        h("div", {
          class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
        })
      );
      return h("footer", {
        class: classes.value,
        style: style.value,
        onFocusin
      }, child);
    };
  }
});
const duration = 150;
var QDrawer = createComponent({
  name: "QDrawer",
  inheritAttrs: false,
  props: {
    ...useModelToggleProps,
    ...useDarkProps,
    side: {
      type: String,
      default: "left",
      validator: (v) => ["left", "right"].includes(v)
    },
    width: {
      type: Number,
      default: 300
    },
    mini: Boolean,
    miniToOverlay: Boolean,
    miniWidth: {
      type: Number,
      default: 57
    },
    noMiniAnimation: Boolean,
    breakpoint: {
      type: Number,
      default: 1023
    },
    showIfAbove: Boolean,
    behavior: {
      type: String,
      validator: (v) => ["default", "desktop", "mobile"].includes(v),
      default: "default"
    },
    bordered: Boolean,
    elevated: Boolean,
    overlay: Boolean,
    persistent: Boolean,
    noSwipeOpen: Boolean,
    noSwipeClose: Boolean,
    noSwipeBackdrop: Boolean
  },
  emits: [
    ...useModelToggleEmits,
    "onLayout",
    "miniState"
  ],
  setup(props, { slots, emit, attrs }) {
    const vm = getCurrentInstance();
    const { proxy: { $q } } = vm;
    const isDark = useDark(props, $q);
    const { preventBodyScroll } = usePreventScroll();
    const { registerTimeout, removeTimeout } = useTimeout();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QDrawer needs to be child of QLayout");
      return emptyRenderFn;
    }
    let lastDesktopState, timerMini = null, layoutTotalWidthWatcher;
    const belowBreakpoint = ref(
      props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint
    );
    const isMini = computed(
      () => props.mini === true && belowBreakpoint.value !== true
    );
    const size = computed(() => isMini.value === true ? props.miniWidth : props.width);
    const showing = ref(
      props.showIfAbove === true && belowBreakpoint.value === false ? true : props.modelValue === true
    );
    const hideOnRouteChange = computed(
      () => props.persistent !== true && (belowBreakpoint.value === true || onScreenOverlay.value === true)
    );
    function handleShow(evt, noEvent) {
      addToHistory();
      evt !== false && $layout.animate();
      applyPosition(0);
      if (belowBreakpoint.value === true) {
        const otherInstance = $layout.instances[otherSide.value];
        if (otherInstance !== void 0 && otherInstance.belowBreakpoint === true) {
          otherInstance.hide(false);
        }
        applyBackdrop(1);
        $layout.isContainer.value !== true && preventBodyScroll(true);
      } else {
        applyBackdrop(0);
        evt !== false && setScrollable(false);
      }
      registerTimeout(() => {
        evt !== false && setScrollable(true);
        noEvent !== true && emit("show", evt);
      }, duration);
    }
    function handleHide(evt, noEvent) {
      removeFromHistory();
      evt !== false && $layout.animate();
      applyBackdrop(0);
      applyPosition(stateDirection.value * size.value);
      cleanup();
      if (noEvent !== true) {
        registerTimeout(() => {
          emit("hide", evt);
        }, duration);
      } else {
        removeTimeout();
      }
    }
    const { show, hide } = useModelToggle({
      showing,
      hideOnRouteChange,
      handleShow,
      handleHide
    });
    const { addToHistory, removeFromHistory } = useHistory(showing, hide, hideOnRouteChange);
    const instance = {
      belowBreakpoint,
      hide
    };
    const rightSide = computed(() => props.side === "right");
    const stateDirection = computed(
      () => ($q.lang.rtl === true ? -1 : 1) * (rightSide.value === true ? 1 : -1)
    );
    const flagBackdropBg = ref(0);
    const flagPanning = ref(false);
    const flagMiniAnimate = ref(false);
    const flagContentPosition = ref(
      size.value * stateDirection.value
    );
    const otherSide = computed(() => rightSide.value === true ? "left" : "right");
    const offset = computed(() => showing.value === true && belowBreakpoint.value === false && props.overlay === false ? props.miniToOverlay === true ? props.miniWidth : size.value : 0);
    const fixed = computed(
      () => props.overlay === true || props.miniToOverlay === true || $layout.view.value.indexOf(rightSide.value ? "R" : "L") > -1 || $q.platform.is.ios === true && $layout.isContainer.value === true
    );
    const onLayout = computed(
      () => props.overlay === false && showing.value === true && belowBreakpoint.value === false
    );
    const onScreenOverlay = computed(
      () => props.overlay === true && showing.value === true && belowBreakpoint.value === false
    );
    const backdropClass = computed(
      () => "fullscreen q-drawer__backdrop" + (showing.value === false && flagPanning.value === false ? " hidden" : "")
    );
    const backdropStyle = computed(() => ({
      backgroundColor: `rgba(0,0,0,${flagBackdropBg.value * 0.4})`
    }));
    const headerSlot = computed(() => rightSide.value === true ? $layout.rows.value.top[2] === "r" : $layout.rows.value.top[0] === "l");
    const footerSlot = computed(() => rightSide.value === true ? $layout.rows.value.bottom[2] === "r" : $layout.rows.value.bottom[0] === "l");
    const aboveStyle = computed(() => {
      const css = {};
      if ($layout.header.space === true && headerSlot.value === false) {
        if (fixed.value === true) {
          css.top = `${$layout.header.offset}px`;
        } else if ($layout.header.space === true) {
          css.top = `${$layout.header.size}px`;
        }
      }
      if ($layout.footer.space === true && footerSlot.value === false) {
        if (fixed.value === true) {
          css.bottom = `${$layout.footer.offset}px`;
        } else if ($layout.footer.space === true) {
          css.bottom = `${$layout.footer.size}px`;
        }
      }
      return css;
    });
    const style = computed(() => {
      const style2 = {
        width: `${size.value}px`,
        transform: `translateX(${flagContentPosition.value}px)`
      };
      return belowBreakpoint.value === true ? style2 : Object.assign(style2, aboveStyle.value);
    });
    const contentClass = computed(
      () => "q-drawer__content fit " + ($layout.isContainer.value !== true ? "scroll" : "overflow-auto")
    );
    const classes = computed(
      () => `q-drawer q-drawer--${props.side}` + (flagMiniAnimate.value === true ? " q-drawer--mini-animate" : "") + (props.bordered === true ? " q-drawer--bordered" : "") + (isDark.value === true ? " q-drawer--dark q-dark" : "") + (flagPanning.value === true ? " no-transition" : showing.value === true ? "" : " q-layout--prevent-focus") + (belowBreakpoint.value === true ? " fixed q-drawer--on-top q-drawer--mobile q-drawer--top-padding" : ` q-drawer--${isMini.value === true ? "mini" : "standard"}` + (fixed.value === true || onLayout.value !== true ? " fixed" : "") + (props.overlay === true || props.miniToOverlay === true ? " q-drawer--on-top" : "") + (headerSlot.value === true ? " q-drawer--top-padding" : ""))
    );
    const openDirective = computed(() => {
      const dir = $q.lang.rtl === true ? props.side : otherSide.value;
      return [[
        TouchPan,
        onOpenPan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const contentCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true
        }
      ]];
    });
    const backdropCloseDirective = computed(() => {
      const dir = $q.lang.rtl === true ? otherSide.value : props.side;
      return [[
        TouchPan,
        onClosePan,
        void 0,
        {
          [dir]: true,
          mouse: true,
          mouseAllDir: true
        }
      ]];
    });
    function updateBelowBreakpoint() {
      updateLocal(belowBreakpoint, props.behavior === "mobile" || props.behavior !== "desktop" && $layout.totalWidth.value <= props.breakpoint);
    }
    watch(belowBreakpoint, (val) => {
      if (val === true) {
        lastDesktopState = showing.value;
        showing.value === true && hide(false);
      } else if (props.overlay === false && props.behavior !== "mobile" && lastDesktopState !== false) {
        if (showing.value === true) {
          applyPosition(0);
          applyBackdrop(0);
          cleanup();
        } else {
          show(false);
        }
      }
    });
    watch(() => props.side, (newSide, oldSide) => {
      if ($layout.instances[oldSide] === instance) {
        $layout.instances[oldSide] = void 0;
        $layout[oldSide].space = false;
        $layout[oldSide].offset = 0;
      }
      $layout.instances[newSide] = instance;
      $layout[newSide].size = size.value;
      $layout[newSide].space = onLayout.value;
      $layout[newSide].offset = offset.value;
    });
    watch($layout.totalWidth, () => {
      if ($layout.isContainer.value === true || document.qScrollPrevented !== true) {
        updateBelowBreakpoint();
      }
    });
    watch(
      () => props.behavior + props.breakpoint,
      updateBelowBreakpoint
    );
    watch($layout.isContainer, (val) => {
      showing.value === true && preventBodyScroll(val !== true);
      val === true && updateBelowBreakpoint();
    });
    watch($layout.scrollbarWidth, () => {
      applyPosition(showing.value === true ? 0 : void 0);
    });
    watch(offset, (val) => {
      updateLayout("offset", val);
    });
    watch(onLayout, (val) => {
      emit("onLayout", val);
      updateLayout("space", val);
    });
    watch(rightSide, () => {
      applyPosition();
    });
    watch(size, (val) => {
      applyPosition();
      updateSizeOnLayout(props.miniToOverlay, val);
    });
    watch(() => props.miniToOverlay, (val) => {
      updateSizeOnLayout(val, size.value);
    });
    watch(() => $q.lang.rtl, () => {
      applyPosition();
    });
    watch(() => props.mini, () => {
      if (props.noMiniAnimation)
        return;
      if (props.modelValue === true) {
        animateMini();
        $layout.animate();
      }
    });
    watch(isMini, (val) => {
      emit("miniState", val);
    });
    function applyPosition(position) {
      if (position === void 0) {
        nextTick(() => {
          position = showing.value === true ? 0 : size.value;
          applyPosition(stateDirection.value * position);
        });
      } else {
        if ($layout.isContainer.value === true && rightSide.value === true && (belowBreakpoint.value === true || Math.abs(position) === size.value)) {
          position += stateDirection.value * $layout.scrollbarWidth.value;
        }
        flagContentPosition.value = position;
      }
    }
    function applyBackdrop(x) {
      flagBackdropBg.value = x;
    }
    function setScrollable(v) {
      const action = v === true ? "remove" : $layout.isContainer.value !== true ? "add" : "";
      action !== "" && document.body.classList[action]("q-body--drawer-toggle");
    }
    function animateMini() {
      timerMini !== null && clearTimeout(timerMini);
      if (vm.proxy && vm.proxy.$el) {
        vm.proxy.$el.classList.add("q-drawer--mini-animate");
      }
      flagMiniAnimate.value = true;
      timerMini = setTimeout(() => {
        timerMini = null;
        flagMiniAnimate.value = false;
        if (vm && vm.proxy && vm.proxy.$el) {
          vm.proxy.$el.classList.remove("q-drawer--mini-animate");
        }
      }, 150);
    }
    function onOpenPan(evt) {
      if (showing.value !== false) {
        return;
      }
      const width = size.value, position = between(evt.distance.x, 0, width);
      if (evt.isFinal === true) {
        const opened = position >= Math.min(75, width);
        if (opened === true) {
          show();
        } else {
          $layout.animate();
          applyBackdrop(0);
          applyPosition(stateDirection.value * width);
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(
        ($q.lang.rtl === true ? rightSide.value !== true : rightSide.value) ? Math.max(width - position, 0) : Math.min(0, position - width)
      );
      applyBackdrop(
        between(position / width, 0, 1)
      );
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function onClosePan(evt) {
      if (showing.value !== true) {
        return;
      }
      const width = size.value, dir = evt.direction === props.side, position = ($q.lang.rtl === true ? dir !== true : dir) ? between(evt.distance.x, 0, width) : 0;
      if (evt.isFinal === true) {
        const opened = Math.abs(position) < Math.min(75, width);
        if (opened === true) {
          $layout.animate();
          applyBackdrop(1);
          applyPosition(0);
        } else {
          hide();
        }
        flagPanning.value = false;
        return;
      }
      applyPosition(stateDirection.value * position);
      applyBackdrop(between(1 - position / width, 0, 1));
      if (evt.isFirst === true) {
        flagPanning.value = true;
      }
    }
    function cleanup() {
      preventBodyScroll(false);
      setScrollable(true);
    }
    function updateLayout(prop, val) {
      $layout.update(props.side, prop, val);
    }
    function updateLocal(prop, val) {
      if (prop.value !== val) {
        prop.value = val;
      }
    }
    function updateSizeOnLayout(miniToOverlay, size2) {
      updateLayout("size", miniToOverlay === true ? props.miniWidth : size2);
    }
    $layout.instances[props.side] = instance;
    updateSizeOnLayout(props.miniToOverlay, size.value);
    updateLayout("space", onLayout.value);
    updateLayout("offset", offset.value);
    if (props.showIfAbove === true && props.modelValue !== true && showing.value === true && props["onUpdate:modelValue"] !== void 0) {
      emit("update:modelValue", true);
    }
    onMounted(() => {
      emit("onLayout", onLayout.value);
      emit("miniState", isMini.value);
      lastDesktopState = props.showIfAbove === true;
      const fn = () => {
        const action = showing.value === true ? handleShow : handleHide;
        action(false, true);
      };
      if ($layout.totalWidth.value !== 0) {
        nextTick(fn);
        return;
      }
      layoutTotalWidthWatcher = watch($layout.totalWidth, () => {
        layoutTotalWidthWatcher();
        layoutTotalWidthWatcher = void 0;
        if (showing.value === false && props.showIfAbove === true && belowBreakpoint.value === false) {
          show(false);
        } else {
          fn();
        }
      });
    });
    onBeforeUnmount(() => {
      layoutTotalWidthWatcher !== void 0 && layoutTotalWidthWatcher();
      if (timerMini !== null) {
        clearTimeout(timerMini);
        timerMini = null;
      }
      showing.value === true && cleanup();
      if ($layout.instances[props.side] === instance) {
        $layout.instances[props.side] = void 0;
        updateLayout("size", 0);
        updateLayout("offset", 0);
        updateLayout("space", false);
      }
    });
    return () => {
      const child = [];
      if (belowBreakpoint.value === true) {
        props.noSwipeOpen === false && child.push(
          withDirectives(
            h("div", {
              key: "open",
              class: `q-drawer__opener fixed-${props.side}`,
              "aria-hidden": "true"
            }),
            openDirective.value
          )
        );
        child.push(
          hDir(
            "div",
            {
              ref: "backdrop",
              class: backdropClass.value,
              style: backdropStyle.value,
              "aria-hidden": "true",
              onClick: hide
            },
            void 0,
            "backdrop",
            props.noSwipeBackdrop !== true && showing.value === true,
            () => backdropCloseDirective.value
          )
        );
      }
      const mini = isMini.value === true && slots.mini !== void 0;
      const content = [
        h(
          "div",
          {
            ...attrs,
            key: "" + mini,
            class: [
              contentClass.value,
              attrs.class
            ]
          },
          mini === true ? slots.mini() : hSlot(slots.default)
        )
      ];
      if (props.elevated === true && showing.value === true) {
        content.push(
          h("div", {
            class: "q-layout__shadow absolute-full overflow-hidden no-pointer-events"
          })
        );
      }
      child.push(
        hDir(
          "aside",
          { ref: "content", class: classes.value, style: style.value },
          content,
          "contentclose",
          props.noSwipeClose !== true && belowBreakpoint.value === true,
          () => contentCloseDirective.value
        )
      );
      return h("div", { class: "q-drawer-container" }, child);
    };
  }
});
var QPageContainer = createComponent({
  name: "QPageContainer",
  setup(_, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const $layout = inject(layoutKey, emptyRenderFn);
    if ($layout === emptyRenderFn) {
      console.error("QPageContainer needs to be child of QLayout");
      return emptyRenderFn;
    }
    provide(pageContainerKey, true);
    const style = computed(() => {
      const css = {};
      if ($layout.header.space === true) {
        css.paddingTop = `${$layout.header.size}px`;
      }
      if ($layout.right.space === true) {
        css[`padding${$q.lang.rtl === true ? "Left" : "Right"}`] = `${$layout.right.size}px`;
      }
      if ($layout.footer.space === true) {
        css.paddingBottom = `${$layout.footer.size}px`;
      }
      if ($layout.left.space === true) {
        css[`padding${$q.lang.rtl === true ? "Right" : "Left"}`] = `${$layout.left.size}px`;
      }
      return css;
    });
    return () => h("div", {
      class: "q-page-container",
      style: style.value
    }, hSlot(slots.default));
  }
});
var QLayout = createComponent({
  name: "QLayout",
  props: {
    container: Boolean,
    view: {
      type: String,
      default: "hhh lpr fff",
      validator: (v) => /^(h|l)h(h|r) lpr (f|l)f(f|r)$/.test(v.toLowerCase())
    },
    onScroll: Function,
    onScrollHeight: Function,
    onResize: Function
  },
  setup(props, { slots, emit }) {
    const { proxy: { $q } } = getCurrentInstance();
    const rootRef = ref(null);
    const height = ref($q.screen.height);
    const width = ref(props.container === true ? 0 : $q.screen.width);
    const scroll = ref({ position: 0, direction: "down", inflectionPoint: 0 });
    const containerHeight = ref(0);
    const scrollbarWidth = ref(isRuntimeSsrPreHydration.value === true ? 0 : getScrollbarWidth());
    const classes = computed(
      () => "q-layout q-layout--" + (props.container === true ? "containerized" : "standard")
    );
    const style = computed(() => props.container === false ? { minHeight: $q.screen.height + "px" } : null);
    const targetStyle = computed(() => scrollbarWidth.value !== 0 ? { [$q.lang.rtl === true ? "left" : "right"]: `${scrollbarWidth.value}px` } : null);
    const targetChildStyle = computed(() => scrollbarWidth.value !== 0 ? {
      [$q.lang.rtl === true ? "right" : "left"]: 0,
      [$q.lang.rtl === true ? "left" : "right"]: `-${scrollbarWidth.value}px`,
      width: `calc(100% + ${scrollbarWidth.value}px)`
    } : null);
    function onPageScroll(data) {
      if (props.container === true || document.qScrollPrevented !== true) {
        const info = {
          position: data.position.top,
          direction: data.direction,
          directionChanged: data.directionChanged,
          inflectionPoint: data.inflectionPoint.top,
          delta: data.delta.top
        };
        scroll.value = info;
        props.onScroll !== void 0 && emit("scroll", info);
      }
    }
    function onPageResize(data) {
      const { height: newHeight, width: newWidth } = data;
      let resized = false;
      if (height.value !== newHeight) {
        resized = true;
        height.value = newHeight;
        props.onScrollHeight !== void 0 && emit("scrollHeight", newHeight);
        updateScrollbarWidth();
      }
      if (width.value !== newWidth) {
        resized = true;
        width.value = newWidth;
      }
      if (resized === true && props.onResize !== void 0) {
        emit("resize", data);
      }
    }
    function onContainerResize({ height: height2 }) {
      if (containerHeight.value !== height2) {
        containerHeight.value = height2;
        updateScrollbarWidth();
      }
    }
    function updateScrollbarWidth() {
      if (props.container === true) {
        const width2 = height.value > containerHeight.value ? getScrollbarWidth() : 0;
        if (scrollbarWidth.value !== width2) {
          scrollbarWidth.value = width2;
        }
      }
    }
    let animateTimer = null;
    const $layout = {
      instances: {},
      view: computed(() => props.view),
      isContainer: computed(() => props.container),
      rootRef,
      height,
      containerHeight,
      scrollbarWidth,
      totalWidth: computed(() => width.value + scrollbarWidth.value),
      rows: computed(() => {
        const rows = props.view.toLowerCase().split(" ");
        return {
          top: rows[0].split(""),
          middle: rows[1].split(""),
          bottom: rows[2].split("")
        };
      }),
      header: reactive({ size: 0, offset: 0, space: false }),
      right: reactive({ size: 300, offset: 0, space: false }),
      footer: reactive({ size: 0, offset: 0, space: false }),
      left: reactive({ size: 300, offset: 0, space: false }),
      scroll,
      animate() {
        if (animateTimer !== null) {
          clearTimeout(animateTimer);
        } else {
          document.body.classList.add("q-body--layout-animate");
        }
        animateTimer = setTimeout(() => {
          animateTimer = null;
          document.body.classList.remove("q-body--layout-animate");
        }, 155);
      },
      update(part, prop, val) {
        $layout[part][prop] = val;
      }
    };
    provide(layoutKey, $layout);
    if (getScrollbarWidth() > 0) {
      let restoreScrollbar = function() {
        timer = null;
        el.classList.remove("hide-scrollbar");
      }, hideScrollbar = function() {
        if (timer === null) {
          if (el.scrollHeight > $q.screen.height) {
            return;
          }
          el.classList.add("hide-scrollbar");
        } else {
          clearTimeout(timer);
        }
        timer = setTimeout(restoreScrollbar, 300);
      }, updateScrollEvent = function(action) {
        if (timer !== null && action === "remove") {
          clearTimeout(timer);
          restoreScrollbar();
        }
        window[`${action}EventListener`]("resize", hideScrollbar);
      };
      let timer = null;
      const el = document.body;
      watch(
        () => props.container !== true ? "add" : "remove",
        updateScrollEvent
      );
      props.container !== true && updateScrollEvent("add");
      onUnmounted(() => {
        updateScrollEvent("remove");
      });
    }
    return () => {
      const content = hMergeSlot(slots.default, [
        h(QScrollObserver, { onScroll: onPageScroll }),
        h(QResizeObserver, { onResize: onPageResize })
      ]);
      const layout = h("div", {
        class: classes.value,
        style: style.value,
        ref: props.container === true ? void 0 : rootRef,
        tabindex: -1
      }, content);
      if (props.container === true) {
        return h("div", {
          class: "q-layout-container overflow-hidden",
          ref: rootRef
        }, [
          h(QResizeObserver, { onResize: onContainerResize }),
          h("div", {
            class: "absolute-full",
            style: targetStyle.value
          }, [
            h("div", {
              class: "scroll",
              style: targetChildStyle.value
            }, [layout])
          ])
        ]);
      }
      return layout;
    };
  }
});
function makeEven(i) {
  if (i == 0 || i >= 2) {
    return i * 2;
  } else {
    return i + 1;
  }
}
function reverseEven(i) {
  if (i == 0 || i >= 2) {
    return i / 2;
  } else {
    return i - 1;
  }
}
const _hoisted_1$1 = { class: "row justify-between items-center" };
const _hoisted_2$1 = /* @__PURE__ */ createBaseVNode("div", { class: "text-body1 text-weight-medium text-center" }, "Chat outline", -1);
const _hoisted_3$1 = ["onDragstart", "onDrop", "id"];
const _sfc_main$1 = {
  __name: "chatOutline",
  setup(__props) {
    const $q = useQuasar();
    const store = docStore();
    const selectedItem = ref(0);
    function resetIds(startAt) {
      const parentNode = document.querySelector("#editorContent");
      const children = parentNode.children;
      for (let index = 0; index < children.length; index++) {
        if (startAt == void 0) {
          const element = children[index];
          element.id = `group-${makeEven(index)}`;
        } else {
          if (index == startAt) {
            const element = children[index];
            element.id = `group-${makeEven(index)}`;
          }
        }
      }
    }
    const removedContent = ref([]);
    function deleteQueston(index) {
      if (store.contents.length > 1) {
        const group_id = makeEven(index);
        const content = store.contents.splice(index, 1);
        const parentNode = document.querySelector("#editorContent");
        const response = parentNode.querySelector(`#group-${group_id}`);
        const removedEl = {
          element: response.innerHTML,
          content: content[0],
          index
        };
        removedContent.value.unshift(removedEl);
        response.remove();
        resetIds();
      } else {
        $q.notify({
          message: "sorry atleast one question should be left",
          position: "top-left",
          color: "red"
        });
      }
    }
    function undo() {
      const undoElement = removedContent.value.splice(0, 1);
      const { content, element, index } = undoElement[0];
      store.contents.splice(index, 0, content);
      const parentNode = document.querySelector("#editorContent");
      const removedId = makeEven(index);
      const newDiv = document.createElement("div");
      newDiv.id = `group-${removedId}`;
      newDiv.innerHTML = element;
      const children = parentNode.children;
      for (let elementIndex = 0; elementIndex < children.length; elementIndex++) {
        const thisElement = children[elementIndex];
        thisElement.id = `group-${makeEven(elementIndex)}`;
        if (index == elementIndex) {
          parentNode.insertBefore(newDiv, thisElement);
        }
      }
    }
    function onDragEnter(index) {
      draggedItemIndex.value = index;
    }
    function isInview() {
      const options = {
        root: null,
        rootMargin: "0px",
        threshold: 0.3
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elementInView = entry.target;
            const id = elementInView.id.split("-")[1];
            selectedItem.value = reverseEven(id);
          }
        });
      }, options);
      var editorContent = document.querySelector("#editorContent");
      const editorContentObserver = new MutationObserver((entries, observer2) => {
        var editorContentEl = document.querySelector("#editorContent");
        if (editorContentEl != null) {
          observer2.disconnect();
          editorContent = editorContentEl;
        }
      });
      var editor = document.querySelector(".q-editor__content");
      editorContentObserver.observe(editor, { childList: true, subtree: true });
      if (editorContent == null) {
        isInview();
      } else {
        for (const child of editorContent.children) {
          observer.observe(child);
        }
      }
    }
    function scrollTo(index) {
      selectedItem.value = index;
      const element = document.querySelector(`#group-${makeEven(index)}`);
      element.scrollIntoView({ behavior: "auto", inline: "start" });
      element.classList.add("bg-yellow-4");
      setTimeout(() => {
        element.classList.remove("bg-yellow-4");
      }, 3e3);
    }
    const draggedItemIndex = ref();
    function onDrop(index) {
      let draggedItem = store.contents.splice(draggedItemIndex.value, 1)[0];
      store.contents.splice(index, 0, draggedItem);
      const parentNode = document.querySelector("#editorContent");
      const children = Array.from(parentNode.children);
      if (children.length > 1) {
        scrollTo(draggedItemIndex.value);
        setTimeout(() => {
          resetIds();
        }, 200);
      }
    }
    onMounted(() => {
      setTimeout(() => {
        resetIds();
        isInview();
      }, 1e3);
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        createVNode(QCardSection, null, {
          default: withCtx(() => [
            createBaseVNode("div", _hoisted_1$1, [
              _hoisted_2$1,
              createBaseVNode("div", null, [
                createVNode(QCardActions, { align: "right" }, {
                  default: withCtx(() => [
                    createVNode(QBtn, {
                      flat: "",
                      icon: "undo",
                      onClick: undo,
                      size: "sm",
                      disable: removedContent.value.length < 1
                    }, null, 8, ["disable"])
                  ]),
                  _: 1
                })
              ])
            ])
          ]),
          _: 1
        }),
        createVNode(QScrollArea, { class: "fit" }, {
          default: withCtx(() => [
            createVNode(QList, { style: { "width": "300px" } }, {
              default: withCtx(() => [
                createBaseVNode("div", {
                  id: "container",
                  onClick: _cache[1] || (_cache[1] = (e) => {
                    e.preventDefault();
                  })
                }, [
                  (openBlock(true), createElementBlock(Fragment, null, renderList(unref(store).contents, (item, index) => {
                    return openBlock(), createElementBlock("div", {
                      draggable: true,
                      key: index,
                      dropzone: "move",
                      "aria-dropeffect": "popup",
                      onDragover: _cache[0] || (_cache[0] = (e) => {
                        e.preventDefault();
                      }),
                      onDragstart: ($event) => onDragEnter(index, $event),
                      onDrop: ($event) => onDrop(index, $event),
                      id: `item-${index}`
                    }, [
                      createVNode(QItem, {
                        clickable: "",
                        class: "b"
                      }, {
                        default: withCtx(() => [
                          createVNode(QItemSection, {
                            top: "",
                            avatar: "",
                            onClick: ($event) => scrollTo(index)
                          }, {
                            default: withCtx(() => [
                              createVNode(QAvatar, {
                                color: selectedItem.value == index ? "primary" : "black",
                                size: "sm",
                                "text-color": "white"
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(index + 1), 1)
                                ]),
                                _: 2
                              }, 1032, ["color"])
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          createVNode(QItemSection, {
                            onClick: ($event) => scrollTo(index)
                          }, {
                            default: withCtx(() => [
                              createVNode(QItemLabel, {
                                lines: "2",
                                class: normalizeClass(["text-subtitle1 headings", selectedItem.value == index ? "text-primary" : ""]),
                                caption: ""
                              }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(item), 1)
                                ]),
                                _: 2
                              }, 1032, ["class"])
                            ]),
                            _: 2
                          }, 1032, ["onClick"]),
                          selectedItem.value == index ? (openBlock(), createBlock(QItemSection, {
                            key: 0,
                            side: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(QBtn, {
                                round: "",
                                dense: "",
                                size: "sm",
                                flat: "",
                                color: "red",
                                icon: "delete",
                                onClick: ($event) => deleteQueston(index)
                              }, null, 8, ["onClick"])
                            ]),
                            _: 2
                          }, 1024)) : createCommentVNode("", true)
                        ]),
                        _: 2
                      }, 1024)
                    ], 40, _hoisted_3$1);
                  }), 128))
                ])
              ]),
              _: 1
            })
          ]),
          _: 1
        })
      ], 64);
    };
  }
};
var MainLayout_vue_vue_type_style_index_0_lang = "";
const _hoisted_1 = { class: "q-py-sm" };
const _hoisted_2 = { class: "text-center q-py-sm text-subtitle1 text-capitalize text-black" };
const _hoisted_3 = {
  class: "text-body1 q-px-sm q-py-sm q-mb-sm row justify-between shadow-1 items-center bg-black",
  style: { "border-radius": "6px" }
};
const _hoisted_4 = /* @__PURE__ */ createBaseVNode("div", null, "Recently opened chats", -1);
const _hoisted_5 = /* @__PURE__ */ createBaseVNode("span", { class: "q-ml-sm" }, "Your are about to delete all data on this extension are you sure ", -1);
const _sfc_main = {
  __name: "MainLayout",
  setup(__props) {
    async function exportdb() {
      $q.loading.show();
      const { data } = await $q.bex.send("exportdb");
      const a = document.createElement("a");
      const dataURI = "data:application/json;charset=utf-8," + encodeURIComponent(data);
      a.href = dataURI;
      a.download = "chats-manager.json";
      a.click();
      $q.loading.hide();
      $q.notify({
        message: "data succefully exported",
        color: "green",
        badgeColor: "green",
        position: "bottom-left"
      });
    }
    const confirmDelete = ref(false);
    async function deletedb() {
      await $q.bex.send("deletedb");
      confirmDelete.value = false;
      router.push("/");
    }
    const recentStore = recent();
    const store = docStore();
    const router = useRouter();
    const $q = useQuasar();
    const chatContents = store.contents;
    const saveChat = async (chatStructure) => {
      const chatContents2 = chatStructure;
      await $q.bex.send("saveChats", {
        key: chatContents2.url,
        content: chatContents2
      });
      router.push(`/exportDocs?url=${chatStructure.url}`);
    };
    $q.bex.once("get_chat", async ({ data }) => {
      try {
        const set = /* @__PURE__ */ new Set();
        var chatStructure = {
          associatedCollections: set,
          contents: [],
          htmlString: "",
          title: "",
          date: null,
          url: "",
          numberOfQuestions: 0
        };
        if (data != null) {
          if (data.chat) {
            const newChatData = data;
            chatContents.value = data.askedQuestions;
            const title = `${data.title}`;
            store.$reset();
            chatStructure.url = newChatData.chat_url;
            chatStructure.title = title;
            const { data: chatData } = await $q.bex.send("getSingleChat", {
              key: chatStructure.url
            });
            const oldChatData = chatData;
            if (oldChatData === null) {
              var date = new Date().toLocaleDateString();
              date = new Date(date).getTime();
              chatStructure.date = date;
              chatStructure.contents = newChatData.askedQuestions;
              chatStructure.htmlString = newChatData.chat.join("");
              chatStructure.numberOfQuestions = chatStructure.contents.length;
              chatStructure.date = date;
              await saveChat(chatStructure);
            } else {
              chatStructure = oldChatData;
              var { numberOfQuestions } = chatStructure;
              const newQuestionNumber = newChatData.askedQuestions.length;
              const questionNumberDiffernce = newQuestionNumber - numberOfQuestions;
              if (questionNumberDiffernce > 0) {
                numberOfQuestions -= 1;
                const newContent = newChatData.askedQuestions.splice(numberOfQuestions);
                const additionalChats = newChatData.chat.splice(numberOfQuestions);
                chatStructure.contents = chatStructure.contents.concat(newContent);
                const additionalChatsString = additionalChats.join("");
                chatStructure.htmlString = chatStructure.htmlString + additionalChatsString;
                chatStructure.numberOfQuestions += questionNumberDiffernce;
                await saveChat(chatStructure);
              } else {
                router.push(`/exportDocs?url=${chatStructure.url}`);
              }
            }
          }
        } else {
          $q.dialog({
            message: `Error: Something went wrong. 
      Make sure your chat link ends with something 
      like c/5551925e-61ba-45f2-b5da-10258fc664de and
       not something like model=text-davinci-002-render-sha . 
       if it ends with model=text-davinci-002-render-sha refresh your chat page `,
            dark: true
          });
        }
      } catch (error) {
      }
    });
    onUnmounted(() => {
      $q.bex.off("get_chat");
    });
    const leftDrawerOpen = ref(false);
    return (_ctx, _cache) => {
      const _component_router_view = resolveComponent("router-view");
      return openBlock(), createBlock(QLayout, { view: "lHh LpR lff" }, {
        default: withCtx(() => [
          _ctx.$route.name != "editChat" ? (openBlock(), createBlock(QHeader, {
            key: 0,
            elevated: "",
            class: "bg-white"
          }, {
            default: withCtx(() => [
              createVNode(QToolbar, null, {
                default: withCtx(() => [
                  !leftDrawerOpen.value ? (openBlock(), createBlock(QBtn, {
                    key: 0,
                    color: "black",
                    flat: "",
                    icon: "menu",
                    onClick: _cache[0] || (_cache[0] = ($event) => leftDrawerOpen.value = !leftDrawerOpen.value)
                  })) : createCommentVNode("", true),
                  createVNode(QToolbarTitle, { class: "text-black" }, {
                    default: withCtx(() => [
                      createVNode(QIcon, { name: "work_history" }),
                      createTextVNode(" Chats Manager ")
                    ]),
                    _: 1
                  }),
                  createBaseVNode("div", null, [
                    createVNode(QBtn, {
                      "no-caps": "",
                      icon: "chat_bubble",
                      to: "/",
                      color: _ctx.$route.path == "/" ? "green" : "black",
                      label: "my chats ",
                      flat: ""
                    }, null, 8, ["color"])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QBtn, {
                      color: "black",
                      "no-caps": "",
                      label: "exportdb",
                      dense: "",
                      flat: "",
                      onClick: exportdb
                    })
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QBtn, {
                      color: "black",
                      "no-caps": "",
                      dense: "",
                      label: "import",
                      flat: ""
                    }, {
                      default: withCtx(() => [
                        createVNode(QMenu, null, {
                          default: withCtx(() => [
                            createVNode(QList, { style: { "min-width": "100px" } }, {
                              default: withCtx(() => [
                                withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QItemSection, null, {
                                      default: withCtx(() => [
                                        createTextVNode("import database")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })), [
                                  [ClosePopup]
                                ]),
                                createVNode(QSeparator),
                                withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                                  default: withCtx(() => [
                                    createVNode(QItemSection, null, {
                                      default: withCtx(() => [
                                        createTextVNode("import collection")
                                      ]),
                                      _: 1
                                    })
                                  ]),
                                  _: 1
                                })), [
                                  [ClosePopup]
                                ])
                              ]),
                              _: 1
                            })
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QBtn, {
                      flat: "",
                      href: "/",
                      label: "about",
                      "no-caps": "",
                      color: _ctx.$route.path == "/help" ? "green" : "black"
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, null, {
                          default: withCtx(() => [
                            createTextVNode(" more about this app")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    }, 8, ["color"])
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QBtn, {
                      flat: "",
                      href: "https://gpt-chat-manger.web.app/feedback\n",
                      color: "black",
                      label: "feedback",
                      "no-caps": ""
                    }, {
                      default: withCtx(() => [
                        createVNode(QTooltip, null, {
                          default: withCtx(() => [
                            createTextVNode(" give you feedback")
                          ]),
                          _: 1
                        })
                      ]),
                      _: 1
                    })
                  ]),
                  createBaseVNode("div", null, [
                    createVNode(QBtn, {
                      color: "red",
                      unelevated: "",
                      "no-caps": "",
                      label: "delete dabase ",
                      onClick: _cache[1] || (_cache[1] = ($event) => confirmDelete.value = true)
                    })
                  ])
                ]),
                _: 1
              })
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.$route.path == "/" ? (openBlock(), createBlock(QFooter, {
            key: 1,
            elevated: false,
            "height-hint": 20,
            class: "bg-black transparent"
          }, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_1, [
                createBaseVNode("div", null, [
                  createVNode(QCardActions, { align: "center" }, {
                    default: withCtx(() => [
                      createVNode(QBtn, {
                        color: "black",
                        round: "",
                        icon: "bi-twitter",
                        flat: "",
                        href: "https://twitter.com/PempheroMk13763"
                      }, {
                        default: withCtx(() => [
                          createVNode(QTooltip, null, {
                            default: withCtx(() => [
                              createTextVNode(" follow me on twitter ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(QBtn, {
                        color: "blue-8",
                        href: "https://www.linkedin.com/in/pemphero-mkuka-447022230/",
                        round: "",
                        icon: "bi-linkedin",
                        flat: ""
                      }, {
                        default: withCtx(() => [
                          createVNode(QTooltip, null, {
                            default: withCtx(() => [
                              createTextVNode(" follow me on linked ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      }),
                      createVNode(QBtn, {
                        color: "black",
                        round: "",
                        icon: "bi-github",
                        flat: "",
                        href: "https://github.com/Phero49"
                      }, {
                        default: withCtx(() => [
                          createVNode(QTooltip, null, {
                            default: withCtx(() => [
                              createTextVNode(" follow me on facebook ")
                            ]),
                            _: 1
                          })
                        ]),
                        _: 1
                      })
                    ]),
                    _: 1
                  })
                ]),
                createBaseVNode("div", _hoisted_2, [
                  createBaseVNode("div", null, [
                    createVNode(QIcon, { name: "copyright" }),
                    createTextVNode("pemphero mkuka")
                  ])
                ])
              ])
            ]),
            _: 1
          })) : createCommentVNode("", true),
          _ctx.$route.name !== "collectionsItems" && _ctx.$route.name !== "collections" ? (openBlock(), createBlock(QDrawer, {
            key: 2,
            bordered: "",
            modelValue: leftDrawerOpen.value,
            "onUpdate:modelValue": _cache[3] || (_cache[3] = ($event) => leftDrawerOpen.value = $event),
            "show-if-above": "",
            class: normalizeClass(_ctx.$route.path === "/" ? "bg-grey-10" : "")
          }, {
            default: withCtx(() => [
              _ctx.$route.name == "editChat" ? (openBlock(), createBlock(_sfc_main$1, { key: 0 })) : createCommentVNode("", true),
              _ctx.$route.path === "/" ? (openBlock(), createBlock(QList, {
                key: 1,
                separator: "",
                class: "text-white q-px-sm"
              }, {
                default: withCtx(() => [
                  createBaseVNode("div", _hoisted_3, [
                    _hoisted_4,
                    createBaseVNode("div", null, [
                      createVNode(QBtn, {
                        color: "white",
                        icon: "close",
                        round: "",
                        flat: "",
                        onClick: _cache[2] || (_cache[2] = ($event) => leftDrawerOpen.value = false)
                      })
                    ])
                  ]),
                  (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(unref(recentStore).recent), (key, i) => {
                    return openBlock(), createBlock(QItem, {
                      to: `/exportDocs?url=${key}`,
                      key: i
                    }, {
                      default: withCtx(() => [
                        createVNode(QItemLabel, {
                          lines: "1",
                          class: "text-white",
                          caption: ""
                        }, {
                          default: withCtx(() => [
                            createTextVNode(toDisplayString(load(unref(recentStore).recent[key]).text()), 1)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1032, ["to"]);
                  }), 128))
                ]),
                _: 1
              })) : createCommentVNode("", true)
            ]),
            _: 1
          }, 8, ["modelValue", "class"])) : createCommentVNode("", true),
          createVNode(QPageContainer, null, {
            default: withCtx(() => [
              createVNode(_component_router_view)
            ]),
            _: 1
          }),
          createVNode(QDialog, {
            modelValue: confirmDelete.value,
            "onUpdate:modelValue": _cache[4] || (_cache[4] = ($event) => confirmDelete.value = $event),
            persistent: ""
          }, {
            default: withCtx(() => [
              createVNode(QCard, null, {
                default: withCtx(() => [
                  createVNode(QCardSection, { class: "row items-center" }, {
                    default: withCtx(() => [
                      createVNode(QAvatar, {
                        icon: "warning",
                        color: "red",
                        "text-color": "white"
                      }),
                      _hoisted_5
                    ]),
                    _: 1
                  }),
                  createVNode(QCardActions, { align: "right" }, {
                    default: withCtx(() => [
                      withDirectives(createVNode(QBtn, {
                        flat: "",
                        label: "Cancel",
                        color: "primary"
                      }, null, 512), [
                        [ClosePopup]
                      ]),
                      createVNode(QBtn, {
                        flat: "",
                        label: "Yes",
                        color: "red",
                        onClick: deletedb
                      })
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              })
            ]),
            _: 1
          }, 8, ["modelValue"])
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
