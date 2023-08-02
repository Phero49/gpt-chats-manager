import { u as useQuasar, b as QMenu, Q as QItem, a as QItemSection } from "./use-quasar.56248db4.js";
import { Q as QList, C as ClosePopup, a as QItemLabel } from "./ClosePopup.f41d8027.js";
import { aZ as _export_sfc, W as useRouter, bb as useRoute, r as ref, t as onMounted, F as openBlock, U as createBlock, I as withCtx, J as createBaseVNode, S as toDisplayString, H as createVNode, G as createElementBlock, N as renderList, M as Fragment, L as QCardSection, _ as QCard, K as QBtn, x as withDirectives, R as createTextVNode, Y as QIcon } from "./index.d7888b57.js";
import { l as load, Q as QTooltip } from "./index.7724e03e.js";
import { Q as QPage } from "./QPage.794cd743.js";
var ViewChatCollection_vue_vue_type_style_index_0_scoped_true_lang = "";
const _hoisted_1 = {
  class: "text-center text-capitalize text-center q-py-md q-my-sm text-h6",
  style: { "text-size-adjust": "100%" }
};
const _hoisted_2 = { class: "row items-start q-gutter-y-lg" };
const _hoisted_3 = { class: "text-right" };
const _hoisted_4 = ["onClick"];
const _hoisted_5 = { class: "text-grey-8" };
const _hoisted_6 = { class: "q-mx-md" };
const _hoisted_7 = ["href"];
const _sfc_main = {
  __name: "ViewChatCollection",
  setup(__props) {
    const router = useRouter();
    const route = useRoute();
    const { collection } = route.params;
    const $q = useQuasar();
    const chats = ref({});
    function open(url) {
      router.push(`/exportDocs?url=${url}`);
    }
    const removeFromCollection = async (collectionName, url) => {
      const { data: singleChat } = await $q.bex.send("getSingleChat", {
        key: url
      });
      const { data } = await $q.bex.send("removeFromCollection", {
        collectionName,
        url
      });
      const set = /* @__PURE__ */ new Set();
      Array.from(singleChat["associatedCollections"]).forEach((value) => {
        set.add(value);
      });
      set.delete(collectionName);
      singleChat["associatedCollections"] = set;
      if (data) {
        await $q.bex.send("saveChats", singleChat);
        console.log(chats.value);
        delete chats.value[url];
      }
    };
    const collectionItem = async () => {
      if (collection != void 0) {
        const { data } = await $q.bex.send("getCollectionItems", {
          key: collection
        });
        chats.value = data;
        console.log(data);
      }
    };
    onMounted(async () => {
      await collectionItem();
    });
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { padding: "" }, {
        default: withCtx(() => [
          createBaseVNode("div", null, [
            createBaseVNode("div", _hoisted_1, toDisplayString(_ctx.$route.params.collection) + " Collection ", 1)
          ]),
          createVNode(QCardSection, null, {
            default: withCtx(() => [
              createBaseVNode("div", _hoisted_2, [
                (openBlock(true), createElementBlock(Fragment, null, renderList(Object.keys(chats.value), (key, index) => {
                  return openBlock(), createElementBlock("div", {
                    class: "col-4",
                    key: index
                  }, [
                    createVNode(QCard, { class: "rounded q-ma-md" }, {
                      default: withCtx(() => [
                        createBaseVNode("div", _hoisted_3, [
                          createVNode(QBtn, {
                            color: "black",
                            icon: "more_horiz",
                            size: "sm",
                            flat: ""
                          }, {
                            default: withCtx(() => [
                              createVNode(QMenu, null, {
                                default: withCtx(() => [
                                  createVNode(QList, {
                                    style: { "min-width": "100px" },
                                    dense: "",
                                    separator: ""
                                  }, {
                                    default: withCtx(() => [
                                      withDirectives((openBlock(), createBlock(QItem, { clickable: "" }, {
                                        default: withCtx(() => [
                                          createVNode(QItemSection, {
                                            onClick: ($event) => removeFromCollection(
                                              _ctx.$route.params.collection,
                                              key,
                                              index
                                            )
                                          }, {
                                            default: withCtx(() => [
                                              createTextVNode(" remove from collection ")
                                            ]),
                                            _: 2
                                          }, 1032, ["onClick"])
                                        ]),
                                        _: 2
                                      }, 1024)), [
                                        [ClosePopup]
                                      ]),
                                      withDirectives((openBlock(), createBlock(QItem, {
                                        clickable: "",
                                        onClick: ($event) => _ctx.deleteChat(key)
                                      }, {
                                        default: withCtx(() => [
                                          createVNode(QItemSection, null, {
                                            default: withCtx(() => [
                                              createTextVNode(" Delete ")
                                            ]),
                                            _: 1
                                          })
                                        ]),
                                        _: 2
                                      }, 1032, ["onClick"])), [
                                        [ClosePopup]
                                      ])
                                    ]),
                                    _: 2
                                  }, 1024)
                                ]),
                                _: 2
                              }, 1024)
                            ]),
                            _: 2
                          }, 1024)
                        ]),
                        createVNode(QCardSection, { class: "text-subtitle1 text-weight-medium text-black text-center" }, {
                          default: withCtx(() => [
                            createBaseVNode("div", {
                              id: "goTo",
                              onClick: ($event) => open(key)
                            }, [
                              createVNode(QItemLabel, { lines: "1" }, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(load(
                                    `${chats.value[key]["title"] != void 0 ? chats.value[key]["title"] : "null"}`
                                  ).text()), 1)
                                ]),
                                _: 2
                              }, 1024),
                              createVNode(QTooltip, null, {
                                default: withCtx(() => [
                                  createTextVNode(toDisplayString(load(
                                    `${chats.value[key]["title"] != void 0 ? chats.value[key]["title"] : "null"}`
                                  ).text()), 1)
                                ]),
                                _: 2
                              }, 1024)
                            ], 8, _hoisted_4),
                            createBaseVNode("div", _hoisted_5, [
                              createBaseVNode("small", null, [
                                createVNode(QIcon, { name: "bi-watch" }),
                                createBaseVNode("span", _hoisted_6, toDisplayString(new Date(chats.value[key]["date"]).toLocaleTimeString()), 1)
                              ])
                            ])
                          ]),
                          _: 2
                        }, 1024),
                        createVNode(QCardSection, null, {
                          default: withCtx(() => [
                            createBaseVNode("a", {
                              href: key,
                              style: { "text-decoration": "none" },
                              class: "text-blue text-subtitle1 text-center",
                              target: "_blank"
                            }, "Go to chat", 8, _hoisted_7)
                          ]),
                          _: 2
                        }, 1024)
                      ]),
                      _: 2
                    }, 1024)
                  ]);
                }), 128))
              ])
            ]),
            _: 1
          })
        ]),
        _: 1
      });
    };
  }
};
var ViewChatCollection = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-1296dca7"]]);
export { ViewChatCollection as default };
