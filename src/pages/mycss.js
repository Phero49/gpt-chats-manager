export const cssString = `kbd,
pre,
samp {
  font-family: Söhne Mono, Monaco, Andale Mono, Ubuntu Mono, monospace;
  font-size: 1em;
}

.prose :where(code):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-code);
  font-size: 0.875em;
  font-weight: 600;
}

.prose :where(a code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}

.prose :where(h1 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}

.prose :where(h2 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}

.prose :where(h3 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}

.prose :where(h4 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}

.prose :where(blockquote code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}

.prose :where(thead th code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}

.prose :where(table):not(:where([class~="not-prose"] *)) {
  font-size: 0.875em;
  line-height: 1.7142857;
  margin-bottom: 2em;
  margin-top: 2em;
  table-layout: auto;
  text-align: left;
  width: 100%;
}

.prose :where(thead):not(:where([class~="not-prose"] *)) {
  border-bottom-color: var(--tw-prose-th-borders);
  border-bottom-width: 1px;
}

.prose :where(thead th):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  padding-bottom: 0.5714286em;
  padding-left: 0.5714286em;
  padding-right: 0.5714286em;
  vertical-align: bottom;
}

.prose :where(tbody tr):not(:where([class~="not-prose"] *)) {
  border-bottom-color: var(--tw-prose-td-borders);
  border-bottom-width: 1px;
}

.prose :where(tbody tr:last-child):not(:where([class~="not-prose"] *)) {
  border-bottom-width: 0;
}

.prose :where(tbody td):not(:where([class~="not-prose"] *)) {
  vertical-align: baseline;
}

.prose :where(tfoot):not(:where([class~="not-prose"] *)) {
  border-top-color: var(--tw-prose-th-borders);
  border-top-width: 1px;
}

.prose :where(tfoot td):not(:where([class~="not-prose"] *)) {
  vertical-align: top;
}

::-webkit-backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  --tw-shadow: 0 0 transparent;
  --tw-shadow-colored: 0 0 transparent;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
}
::backdrop {
  --tw-border-spacing-x: 0;
  --tw-border-spacing-y: 0;
  --tw-translate-x: 0;
  --tw-translate-y: 0;
  --tw-rotate: 0;
  --tw-skew-x: 0;
  --tw-skew-y: 0;
  --tw-scale-x: 1;
  --tw-scale-y: 1;
  --tw-pan-x: ;
  --tw-pan-y: ;
  --tw-pinch-zoom: ;
  --tw-scroll-snap-strictness: proximity;
  --tw-ordinal: ;
  --tw-slashed-zero: ;
  --tw-numeric-figure: ;
  --tw-numeric-spacing: ;
  --tw-numeric-fraction: ;
  --tw-ring-inset: ;
  --tw-ring-offset-width: 0px;
  --tw-ring-offset-color: #fff;
  --tw-ring-color: rgba(59, 130, 246, 0.5);
  --tw-ring-offset-shadow: 0 0 transparent;
  --tw-ring-shadow: 0 0 transparent;
  --tw-shadow: 0 0 transparent;
  --tw-shadow-colored: 0 0 transparent;
  --tw-blur: ;
  --tw-brightness: ;
  --tw-contrast: ;
  --tw-grayscale: ;
  --tw-hue-rotate: ;
  --tw-invert: ;
  --tw-saturate: ;
  --tw-sepia: ;
  --tw-drop-shadow: ;
  --tw-backdrop-blur: ;
  --tw-backdrop-brightness: ;
  --tw-backdrop-contrast: ;
  --tw-backdrop-grayscale: ;
  --tw-backdrop-hue-rotate: ;
  --tw-backdrop-invert: ;
  --tw-backdrop-opacity: ;
  --tw-backdrop-saturate: ;
  --tw-backdrop-sepia: ;
}

.prose {
  --tw-prose-body: #374151;
  --tw-prose-headings: #111827;
  --tw-prose-lead: #4b5563;
  --tw-prose-links: #111827;
  --tw-prose-bold: #111827;
  --tw-prose-counters: #020202;
  --tw-prose-bullets: #020202;
  --tw-prose-hr: #e5e7eb;
  --tw-prose-quotes: #111827;
  --tw-prose-quote-borders: #e5e7eb;
  --tw-prose-captions: #6b7280;
  --tw-prose-code: #111827;
  --tw-prose-pre-code: #e5e7eb;
  --tw-prose-pre-bg: #1f2937;
  --tw-prose-th-borders: #d1d5db;
  --tw-prose-td-borders: #e5e7eb;
  --tw-prose-invert-body: #d1d5db;
  --tw-prose-invert-headings: #fff;
  --tw-prose-invert-lead: #9ca3af;
  --tw-prose-invert-links: #fff;
  --tw-prose-invert-bold: #fff;
  --tw-prose-invert-counters: #9ca3af;
  --tw-prose-invert-bullets: #4b5563;
  --tw-prose-invert-hr: #374151;
  --tw-prose-invert-quotes: #f3f4f6;
  --tw-prose-invert-quote-borders: #374151;
  --tw-prose-invert-captions: #9ca3af;
  --tw-prose-invert-code: #fff;
  --tw-prose-invert-pre-code: #d1d5db;
  --tw-prose-invert-pre-bg: rgba(0, 0, 0, 0.5);
  --tw-prose-invert-th-borders: #4b5563;
  --tw-prose-invert-td-borders: #374151;
  font-size: 1rem;
  line-height: 1.75;
}

code,
pre {
  font-family: Söhne Mono, Monaco, Andale Mono, Ubuntu Mono, monospace !important;
}
code[class="language-plaintext"] {
  white-space: pre-line;
}
code.hljs,
code[class*="language-"],
pre[class*="language-"] {
  word-wrap: normal;
  background: none;
  color: #fff;
  -webkit-hyphens: none;
  hyphens: none;
  line-height: 1.5;
  tab-size: 4;
  text-align: left;
  white-space: pre;
  word-break: normal;
  word-spacing: normal;
}
pre[class*="language-"] {
  border-radius: 0.3em;
  overflow: auto;
}
@media screen and (-ms-high-contrast: active) {
  code[class*="language-"],
  pre[class*="language-"] {
    background: window;
    color: windowText;
  }
  :not(pre) > code[class*="language-"],
  pre[class*="language-"] {
    background: window;
  }
  .token.important {
    background: highlight;
    color: window;
    font-weight: 400;
  }
  .token.atrule,
  .token.attr-value,
  .token.function,
  .token.keyword,
  .token.operator,
  .token.selector {
    font-weight: 700;
  }
  .token.attr-value,
  .token.comment,
  .token.doctype,
  .token.function,
  .token.keyword,
  .token.operator,
  .token.property,
  .token.string {
    color: highlight;
  }
  .token.attr-value,
  .token.url {
    font-weight: 400;
  }
}
.token.important {
  background: highlight;
  color: window;
  font-weight: 400;
}

:not(pre) > code.hljs,
:not(pre) > code[class*="language-"] {
  border-radius: 0.3em;
  padding: 0.1em;
  white-space: normal;
}
.\\!whitespace-pre {
  white-space: pre !important;
}
.whitespace-pre-line {
  white-space: pre-line;
}
.whitespace-pre-wrap {
  white-space: pre-wrap;
}
.hljs-comment {
  color: hsla(0, 0%, 100%, 0.5);
}
.hljs-meta {
  color: hsla(0, 0%, 100%, 0.6);
}
.hljs-built_in,
.hljs-class .hljs-title {
  color: #e9950c;
}
.hljs-doctag,
.hljs-formula,
.hljs-keyword,
.hljs-literal {
  color: #2e95d3;
}
.hljs-addition,
.hljs-attribute,
.hljs-meta-string,
.hljs-regexp,
.hljs-string {
  color: #00a67d;
}
.hljs-attr,
.hljs-number,
.hljs-selector-attr,
.hljs-selector-class,
.hljs-selector-pseudo,
.hljs-template-variable,
.hljs-type,
.hljs-variable {
  color: #df3079;
}
.hljs-bullet,
.hljs-link,
.hljs-selector-id,
.hljs-symbol,
.hljs-title {
  color: #f22c3d;
}
.overflow-y-auto {
  overflow-y: auto;
}
.token.cdata,
.token.comment,
.token.doctype,
.token.prolog {
  color: #a9aec1;
}
.token.punctuation {
  color: #fefefe;
}
.token.constant,
.token.deleted,
.token.property,
.token.symbol,
.token.tag {
  color: #ffa07a;
}
.token.boolean,
.token.number {
  color: #00e0e0;
}
.token.attr-name,
.token.builtin,
.token.char,
.token.inserted,
.token.selector,
.token.string {
  color: #abe338;
}
.language-css .token.string,
.style .token.string,
.token.entity,
.token.operator,
.token.url,
.token.variable {
  color: #00e0e0;
}
.token.atrule,
.token.attr-value,
.token.function {
  color: gold;
}
.token.keyword {
  color: #00e0e0;
}
.token.important,
.token.regex {
  color: gold;
}
.token.bold,
.token.important {
  font-weight: 700;
}
.token.italic {
  font-style: italic;
}
.p-4 {
  padding: 1rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}

.prose :where([class~="lead"]):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-lead);
  font-size: 1.25em;
  line-height: 1.6;
  margin-bottom: 1.2em;
  margin-top: 1.2em;
}
.prose :where(a):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-links);
  font-weight: 500;
  text-decoration: underline;
}
.prose :where(strong):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-bold);
  font-weight: 600;
}
.prose :where(a strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(blockquote strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(thead th strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(ol):not(:where([class~="not-prose"] *)) {
  list-style-type: decimal;
  margin-bottom: 1.25em;
  margin-top: 1.25em;
  padding-left: 1.625em;
}
.prose :where(ol[type="A"]):not(:where([class~="not-prose"] *)) {
  list-style-type: upper-alpha;
}
.prose :where(ol[type="a"]):not(:where([class~="not-prose"] *)) {
  list-style-type: lower-alpha;
}
.prose :where(ol[type="A s"]):not(:where([class~="not-prose"] *)) {
  list-style-type: upper-alpha;
}
.prose :where(ol[type="a s"]):not(:where([class~="not-prose"] *)) {
  list-style-type: lower-alpha;
}
.prose :where(ol[type="I"]):not(:where([class~="not-prose"] *)) {
  list-style-type: upper-roman;
}
.prose :where(ol[type="i"]):not(:where([class~="not-prose"] *)) {
  list-style-type: lower-roman;
}
.prose :where(ol[type="I s"]):not(:where([class~="not-prose"] *)) {
  list-style-type: upper-roman;
}
.prose :where(ol[type="i s"]):not(:where([class~="not-prose"] *)) {
  list-style-type: lower-roman;
}
.prose :where(ol[type="1"]):not(:where([class~="not-prose"] *)) {
  list-style-type: decimal;
}
.prose :where(ul):not(:where([class~="not-prose"] *)) {
  list-style-type: disc;
  margin-bottom: 1.25em;
  margin-top: 1.25em;
  padding-left: 1.625em;
}
.prose :where(ol > li):not(:where([class~="not-prose"] *))::marker {
  color: var(--tw-prose-counters);
  font-weight: 400;
}
.prose :where(ul > li):not(:where([class~="not-prose"] *))::marker {
  color: var(--tw-prose-bullets);
}
.prose :where(hr):not(:where([class~="not-prose"] *)) {
  border-color: var(--tw-prose-hr);
  border-top-width: 1px;
  margin-bottom: 3em;
  margin-top: 3em;
}
.prose :where(blockquote):not(:where([class~="not-prose"] *)) {
  border-left-color: var(--tw-prose-quote-borders);
  border-left-width: 0.25rem;
  color: var(--tw-prose-quotes);
  font-style: italic;
  font-style: normal;
  font-weight: 500;
  margin-bottom: 1.6em;
  margin-top: 1.6em;
  padding-left: 1em;
  quotes: "\\201C""\\201D""\\2018""\\2019";
}
.prose
  :where(blockquote p:first-of-type):not(:where([class~="not-prose"]
      *)):before {
  content: open-quote;
}
.prose
  :where(blockquote p:last-of-type):not(:where([class~="not-prose"] *)):after {
  content: close-quote;
}
.prose :where(h1):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-size: 2.25em;
  font-weight: 800;
  line-height: 1.1111111;
  margin-bottom: 0.8888889em;
  margin-top: 0;
}
.prose :where(h1 strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-weight: 900;
}
.prose :where(h2):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-size: 1.5em;
  font-weight: 700;
  line-height: 1.3333333;
  margin-bottom: 1em;
  margin-top: 2em;
}
.prose :where(h2 strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-weight: 800;
}
.prose :where(h3):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-size: 1.25em;
  font-weight: 600;
  line-height: 1.6;
  margin-bottom: 0.6em;
  margin-top: 1.6em;
}
.prose :where(h3 strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-weight: 700;
}
.prose :where(h4):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-headings);
  font-weight: 600;
  line-height: 1.5;
  margin-bottom: 0.5em;
  margin-top: 1.5em;
}
.prose :where(h4 strong):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-weight: 700;
}
.prose :where(img):not(:where([class~="not-prose"] *)) {
  margin-bottom: 2em;
  margin-top: 2em;
}
.prose :where(figure > *):not(:where([class~="not-prose"] *)) {
  margin-bottom: 0;
  margin-top: 0;
}
.prose :where(figcaption):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-captions);
  font-size: 0.875em;
  line-height: 1.4285714;
  margin-top: 0.8571429em;
}
.prose :where(code):not(:where([class~="not-prose"] *)) {
  color: var(--tw-prose-code);
  font-size: 0.875em;
  font-weight: 600;
}
.prose :where(code):not(:where([class~="not-prose"] *)):before {
  content: "\`";
}
.prose :where(code):not(:where([class~="not-prose"] *)):after {
  content: "\`";
}
.prose :where(a code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(h1 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(h2 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-size: 0.875em;
}
.prose :where(h3 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
  font-size: 0.9em;
}
.prose :where(h4 code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(blockquote code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(thead th code):not(:where([class~="not-prose"] *)) {
  color: inherit;
}
.prose :where(pre):not(:where([class~="not-prose"] *)) {
  background-color: transparent;
  border-radius: 0.375rem;
  color: currentColor;
  font-size: 0.875em;
  font-weight: 400;
  line-height: 1.7142857;
  margin: 0;
  overflow-x: auto;
  padding: 0;
}
.prose :where(pre code):not(:where([class~="not-prose"] *)) {
  background-color: transparent;
  border-radius: 0;
  border-width: 0;
  color: inherit;
  font-family: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  padding: 0;
}

.text-gray-200 {
  --tw-text-opacity: 1;
  color: rgba(217, 217, 227, var(--tw-text-opacity));
}
.bg-gray-800 {
  --tw-bg-opacity: 1;
  background-color: rgba(52, 53, 65, var(--tw-bg-opacity));
}`