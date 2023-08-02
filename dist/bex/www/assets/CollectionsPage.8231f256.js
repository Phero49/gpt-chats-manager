import { Q as QPage } from "./QPage.794cd743.js";
import { C as CollectionComp } from "./CollectionComp.d4ca1cea.js";
import { F as openBlock, U as createBlock, I as withCtx, J as createBaseVNode, H as createVNode } from "./index.d7888b57.js";
import "./ClosePopup.f41d8027.js";
import "./use-quasar.56248db4.js";
const _sfc_main = {
  __name: "CollectionsPage",
  setup(__props) {
    return (_ctx, _cache) => {
      return openBlock(), createBlock(QPage, { padding: "" }, {
        default: withCtx(() => [
          createBaseVNode("div", null, [
            createVNode(CollectionComp, { prewiew: false })
          ])
        ]),
        _: 1
      });
    };
  }
};
export { _sfc_main as default };
