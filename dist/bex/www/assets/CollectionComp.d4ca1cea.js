import { c as createComponent, k as useDarkProps, n as useDark, a as computed, h, b as hSlot, g as getCurrentInstance, r as ref, w as watch, b2 as injectProp, $ as QDialog, aZ as _export_sfc, t as onMounted, F as openBlock, G as createElementBlock, J as createBaseVNode, M as Fragment, N as renderList, H as createVNode, I as withCtx, P as QAvatar, L as QCardSection, T as normalizeClass, S as toDisplayString, V as createCommentVNode, b3 as QInput, Y as QIcon, K as QBtn, _ as QCard, aY as normalizeStyle, x as withDirectives, U as createBlock, R as createTextVNode, Z as QSeparator, b4 as vShow, a_ as pushScopeId, a$ as popScopeId } from "./index.d7888b57.js";
import { Q as QList, a as QItemLabel, C as ClosePopup } from "./ClosePopup.f41d8027.js";
import { c as useAnchorProps, f as useAnchor, b as QMenu, u as useQuasar, Q as QItem, a as QItemSection } from "./use-quasar.56248db4.js";
var QBanner = createComponent({
  name: "QBanner",
  props: {
    ...useDarkProps,
    inlineActions: Boolean,
    dense: Boolean,
    rounded: Boolean
  },
  setup(props, { slots }) {
    const { proxy: { $q } } = getCurrentInstance();
    const isDark = useDark(props, $q);
    const classes = computed(
      () => "q-banner row items-center" + (props.dense === true ? " q-banner--dense" : "") + (isDark.value === true ? " q-banner--dark q-dark" : "") + (props.rounded === true ? " rounded-borders" : "")
    );
    const actionClass = computed(
      () => `q-banner__actions row items-center justify-end col-${props.inlineActions === true ? "auto" : "all"}`
    );
    return () => {
      const child = [
        h("div", {
          class: "q-banner__avatar col-auto row items-center self-start"
        }, hSlot(slots.avatar)),
        h("div", {
          class: "q-banner__content col text-body2"
        }, hSlot(slots.default))
      ];
      const actions = hSlot(slots.action);
      actions !== void 0 && child.push(
        h("div", { class: actionClass.value }, actions)
      );
      return h("div", {
        class: classes.value + (props.inlineActions === false && actions !== void 0 ? " q-banner--top-padding" : ""),
        role: "alert"
      }, child);
    };
  }
});
var QPopupProxy = createComponent({
  name: "QPopupProxy",
  props: {
    ...useAnchorProps,
    breakpoint: {
      type: [String, Number],
      default: 450
    }
  },
  emits: ["show", "hide"],
  setup(props, { slots, emit, attrs }) {
    const { proxy } = getCurrentInstance();
    const { $q } = proxy;
    const showing = ref(false);
    const popupRef = ref(null);
    const breakpoint = computed(() => parseInt(props.breakpoint, 10));
    const { canShow } = useAnchor({ showing });
    function getType() {
      return $q.screen.width < breakpoint.value || $q.screen.height < breakpoint.value ? "dialog" : "menu";
    }
    const type = ref(getType());
    const popupProps = computed(
      () => type.value === "menu" ? { maxHeight: "99vh" } : {}
    );
    watch(() => getType(), (val) => {
      if (showing.value !== true) {
        type.value = val;
      }
    });
    function onShow(evt) {
      showing.value = true;
      emit("show", evt);
    }
    function onHide(evt) {
      showing.value = false;
      type.value = getType();
      emit("hide", evt);
    }
    Object.assign(proxy, {
      show(evt) {
        canShow(evt) === true && popupRef.value.show(evt);
      },
      hide(evt) {
        popupRef.value.hide(evt);
      },
      toggle(evt) {
        popupRef.value.toggle(evt);
      }
    });
    injectProp(proxy, "currentComponent", () => ({
      type: type.value,
      ref: popupRef.value
    }));
    return () => {
      const data = {
        ref: popupRef,
        ...popupProps.value,
        ...attrs,
        onShow,
        onHide
      };
      let component;
      if (type.value === "dialog") {
        component = QDialog;
      } else {
        component = QMenu;
        Object.assign(data, {
          target: props.target,
          contextMenu: props.contextMenu,
          noParentEvent: true,
          separateClosePopup: true
        });
      }
      return h(component, data, slots.default);
    };
  }
});
var CollectionComp_vue_vue_type_style_index_0_scoped_true_lang = "";
const _withScopeId = (n) => (pushScopeId("data-v-4238d7a7"), n = n(), popScopeId(), n);
const _hoisted_1 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "row justify-between" }, [
  /* @__PURE__ */ createBaseVNode("div", { class: "text-h6 q-my-md text-capitalize" }, "chats collections")
], -1));
const _hoisted_2 = { class: "row justify-between items-center q-mx-lg q-px-md" };
const _hoisted_3 = {
  key: 0,
  class: ""
};
const _hoisted_4 = { class: "row" };
const _hoisted_5 = ["onMouseenter"];
const _hoisted_6 = { class: "q-mr-lg q-my-md" };
const _hoisted_7 = { class: "q-px-sm" };
const _hoisted_8 = ["onClick"];
const _hoisted_9 = { key: 1 };
const _hoisted_10 = { class: "row" };
const _hoisted_11 = ["onClick"];
const _hoisted_12 = { class: "text-right" };
const _hoisted_13 = { key: 1 };
const _hoisted_14 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", { class: "text-capitalize text-h6 text-bold text-grey" }, " No chat collections found ", -1));
const _hoisted_15 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, null, -1));
const _hoisted_16 = { class: "row justify-center items-center q-my-md" };
const _hoisted_17 = /* @__PURE__ */ _withScopeId(() => /* @__PURE__ */ createBaseVNode("div", null, null, -1));
const _hoisted_18 = { class: "text-center" };
const _sfc_main = {
  __name: "CollectionComp",
  props: {
    prewiew: {
      type: Boolean,
      default: true
    }
  },
  setup(__props) {
    const props = __props;
    const mouseOver = ref(null);
    const addColName = ref(false);
    const colNameErr = ref(false);
    const newCollectionName = ref();
    const $q = useQuasar();
    const collectionNames = ref([]);
    const edit = ref(null);
    const editName = ref();
    const submitChange = async (index) => {
      const { data } = await $q.bex.send("editCollection", {
        key: collectionNames.value[index],
        newName: editName.value
      });
      if (data) {
        edit.value = null;
        collectionNames.value[index] = editName.value;
      }
    };
    const deleteCollection = async (collectionName, index) => {
      const { data } = await $q.bex.send("deleteCollection", {
        key: collectionName
      });
      if (data) {
        collectionNames.value.splice(index, 1);
      }
    };
    const proxy = ref();
    const exportCollection = async (key) => {
      const { data } = await $q.bex.send("getCollectionItems", { key });
      if (data != null) {
        $q.loading.show();
        const a = document.createElement("a");
        const dataURI = "data:application/json;charset=utf-8," + encodeURIComponent(data);
        a.href = dataURI;
        a.download = `${key} chats_collection.json`;
        a.click();
        $q.loading.hide();
        $q.notify({
          message: "collection succefully exported",
          color: "green",
          badgeColor: "green",
          position: "bottom-left"
        });
      }
    };
    const createCollection = async () => {
      if (addColName.value) {
        const res = await $q.bex.send("createCollection", {
          collectionName: newCollectionName.value
        });
        if (res.data["error"] == false) {
          proxy.value.hide();
          if (collectionNames.value > 3) {
            collectionNames.value.pop();
            collectionNames.value.unshift(newCollectionName.value);
          } else {
            collectionNames.value.unshift(newCollectionName.value);
          }
          $q.notify({
            color: "green",
            position: "top-right",
            message: `${newCollectionName.value} collection was created succefully `,
            icon: "thumb_up"
          });
        } else {
          addColName.value = true;
          colNameErr.value = true;
          $q.notify({
            color: "red",
            message: `error ${newCollectionName.value} ${res.data["msg"]}`
          });
        }
      }
    };
    async function getCollections() {
      const { data, respond } = await $q.bex.send("getCollections", {
        all: props.prewiew ? false : true
      });
      collectionNames.value = data;
      respond();
    }
    onMounted(async () => {
      await getCollections();
    });
    return (_ctx, _cache) => {
      return openBlock(), createElementBlock(Fragment, null, [
        _hoisted_1,
        createBaseVNode("div", _hoisted_2, [
          createBaseVNode("div", null, [
            collectionNames.value.length > 0 ? (openBlock(), createElementBlock("div", _hoisted_3, [
              createBaseVNode("div", _hoisted_4, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(collectionNames.value, (colName, i) => {
                  return openBlock(), createElementBlock("div", {
                    key: i,
                    style: { "cursor": "grab", "position": "relative" },
                    onMouseenter: ($event) => mouseOver.value = i,
                    onMouseleave: _cache[1] || (_cache[1] = ($event) => mouseOver.value = null)
                  }, [
                    createBaseVNode("div", _hoisted_6, [
                      createVNode(QCard, {
                        class: "my-card length",
                        style: { "position": "absolute", "z-index": "-1" }
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_7, [
                            createBaseVNode("div", {
                              onClick: () => {
                                _ctx.$router.push(`/chat-collection/${colName}`);
                              },
                              class: "flex q-pt-sm flex-center"
                            }, [
                              createVNode(QAvatar, {
                                size: "50px",
                                "font-size": "40px",
                                color: "black",
                                "text-color": mouseOver.value == i ? "primary" : "white",
                                icon: "folder"
                              }, null, 8, ["text-color"])
                            ], 8, _hoisted_8),
                            createVNode(QCardSection, null, {
                              default: withCtx(() => [
                                edit.value == null || edit.value != i ? (openBlock(), createElementBlock("div", {
                                  key: 0,
                                  class: normalizeClass(["text-medium ellipsis text-center", mouseOver.value == i ? "white" : "black"])
                                }, toDisplayString(colName), 3)) : createCommentVNode("", true),
                                edit.value == i ? (openBlock(), createElementBlock("div", _hoisted_9, [
                                  createVNode(QInput, {
                                    modelValue: editName.value,
                                    "onUpdate:modelValue": _cache[0] || (_cache[0] = ($event) => editName.value = $event),
                                    type: "text",
                                    label: "editColName",
                                    dense: ""
                                  }, {
                                    append: withCtx(() => [
                                      createBaseVNode("div", null, [
                                        createVNode(QIcon, { name: "edit" })
                                      ])
                                    ]),
                                    _: 1
                                  }, 8, ["modelValue"]),
                                  createVNode(QBtn, {
                                    color: "green",
                                    icon: "send",
                                    class: "full-width",
                                    dense: "",
                                    size: "sm",
                                    unelevated: "",
                                    label: "save",
                                    onClick: ($event) => submitChange(i)
                                  }, null, 8, ["onClick"])
                                ])) : createCommentVNode("", true)
                              ]),
                              _: 2
                            }, 1024)
                          ])
                        ]),
                        _: 2
                      }, 1024),
                      createVNode(QCard, {
                        style: normalizeStyle([mouseOver.value == i ? "opacity:1;" : "opacity:0;", { "background-color": "rgba(8, 8, 8, 0)" }]),
                        class: "length"
                      }, {
                        default: withCtx(() => [
                          createBaseVNode("div", _hoisted_10, [
                            createBaseVNode("div", {
                              style: { "height": "120px" },
                              class: "col-grow",
                              onClick: () => {
                                _ctx.$router.push(`/chat-collection/${colName}`);
                              }
                            }, null, 8, _hoisted_11),
                            createBaseVNode("div", _hoisted_12, [
                              createVNode(QBtn, {
                                style: normalizeStyle([
                                  mouseOver.value == i ? " display:inline ;" : "display:none",
                                  { "margin": "0px" }
                                ]),
                                color: "black",
                                flat: "",
                                dense: "",
                                icon: "more_horiz"
                              }, {
                                default: withCtx(() => [
                                  createVNode(QMenu, {
                                    persistent: mouseOver.value == i
                                  }, {
                                    default: withCtx(() => [
                                      createVNode(QList, { style: { "min-width": "100px" } }, {
                                        default: withCtx(() => [
                                          withDirectives((openBlock(), createBlock(QItem, {
                                            onClick: ($event) => exportCollection(colName, i),
                                            clickable: ""
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(QItemSection, null, {
                                                default: withCtx(() => [
                                                  createVNode(QItemLabel, { caption: "" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" export collection ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])), [
                                            [ClosePopup]
                                          ]),
                                          withDirectives((openBlock(), createBlock(QItem, {
                                            onClick: ($event) => deleteCollection(colName, i),
                                            clickable: ""
                                          }, {
                                            default: withCtx(() => [
                                              createVNode(QItemSection, null, {
                                                default: withCtx(() => [
                                                  createVNode(QItemLabel, { caption: "" }, {
                                                    default: withCtx(() => [
                                                      createTextVNode(" delete collection ")
                                                    ]),
                                                    _: 1
                                                  })
                                                ]),
                                                _: 1
                                              })
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])), [
                                            [ClosePopup]
                                          ]),
                                          createVNode(QSeparator)
                                        ]),
                                        _: 2
                                      }, 1024)
                                    ]),
                                    _: 2
                                  }, 1032, ["persistent"])
                                ]),
                                _: 2
                              }, 1032, ["style"])
                            ])
                          ])
                        ]),
                        _: 2
                      }, 1032, ["style"])
                    ])
                  ], 40, _hoisted_5);
                }), 128))
              ])
            ])) : (openBlock(), createElementBlock("div", _hoisted_13, [
              createVNode(QCardSection, null, {
                default: withCtx(() => [
                  _hoisted_14
                ]),
                _: 1
              })
            ]))
          ]),
          createBaseVNode("div", null, [
            createVNode(QCard, {
              class: "my-card",
              flat: ""
            }, {
              default: withCtx(() => [
                _hoisted_15
              ]),
              _: 1
            })
          ])
        ]),
        createBaseVNode("div", _hoisted_16, [
          __props.prewiew ? (openBlock(), createBlock(QCardSection, { key: 0 }, {
            default: withCtx(() => [
              _hoisted_17,
              createBaseVNode("div", _hoisted_18, [
                withDirectives(createVNode(QBtn, {
                  color: "primary",
                  unelevated: "",
                  rounded: "",
                  icon: "add",
                  "no-caps": "",
                  label: "create a chat collection"
                }, null, 512), [
                  [vShow, !addColName.value]
                ])
              ]),
              createVNode(QPopupProxy, {
                ref_key: "proxy",
                ref: proxy,
                onBeforeShow: _cache[3] || (_cache[3] = ($event) => addColName.value = true),
                onBeforeHide: _cache[4] || (_cache[4] = () => {
                  addColName.value = false;
                  colNameErr.value = false;
                })
              }, {
                default: withCtx(() => [
                  createVNode(QBanner, null, {
                    default: withCtx(() => [
                      createBaseVNode("div", null, [
                        createVNode(QInput, {
                          autofocus: "",
                          modelValue: newCollectionName.value,
                          "onUpdate:modelValue": _cache[2] || (_cache[2] = ($event) => newCollectionName.value = $event),
                          type: "text",
                          error: colNameErr.value,
                          label: "collection name"
                        }, {
                          prepend: withCtx(() => [
                            createBaseVNode("div", null, [
                              createVNode(QIcon, { name: "folder" })
                            ])
                          ]),
                          _: 1
                        }, 8, ["modelValue", "error"])
                      ]),
                      createBaseVNode("div", null, [
                        createVNode(QBtn, {
                          color: "green",
                          rounded: "",
                          "icon-rigth": "send",
                          class: "full-width",
                          dense: "",
                          unelevated: "",
                          label: "create collection",
                          onClick: createCollection
                        })
                      ])
                    ]),
                    _: 1
                  })
                ]),
                _: 1
              }, 512)
            ]),
            _: 1
          })) : createCommentVNode("", true),
          createBaseVNode("div", null, [
            collectionNames.value.length > 0 && __props.prewiew ? (openBlock(), createBlock(QBtn, {
              key: 0,
              color: "black",
              "icon-right": "folder",
              "no-caps": "",
              unelevated: "",
              rounded: "",
              label: "view all collections",
              to: "/chat-collections"
            })) : createCommentVNode("", true)
          ])
        ])
      ], 64);
    };
  }
};
var CollectionComp = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-4238d7a7"]]);
export { CollectionComp as C };
