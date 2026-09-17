const Pe = globalThis, Fe = Pe.ShadowRoot && (Pe.ShadyCSS === void 0 || Pe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Ge = /* @__PURE__ */ Symbol(), Je = /* @__PURE__ */ new WeakMap();
let _t = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== Ge) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Fe && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = Je.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Je.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Gt = (r) => new _t(typeof r == "string" ? r : r + "", void 0, Ge), te = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((n, i, s) => n + ((a) => {
    if (a._$cssResult$ === !0) return a.cssText;
    if (typeof a == "number") return a;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + a + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[s + 1], r[0]);
  return new _t(t, r, Ge);
}, jt = (r, e) => {
  if (Fe) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), i = Pe.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = t.cssText, r.appendChild(n);
  }
}, et = Fe ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return Gt(t);
})(r) : r;
const { is: Zt, defineProperty: Vt, getOwnPropertyDescriptor: Kt, getOwnPropertyNames: qt, getOwnPropertySymbols: Xt, getPrototypeOf: Qt } = Object, De = globalThis, tt = De.trustedTypes, Yt = tt ? tt.emptyScript : "", Jt = De.reactiveElementPolyfillSupport, $e = (r, e) => r, Re = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? Yt : null;
      break;
    case Object:
    case Array:
      r = r == null ? r : JSON.stringify(r);
  }
  return r;
}, fromAttribute(r, e) {
  let t = r;
  switch (e) {
    case Boolean:
      t = r !== null;
      break;
    case Number:
      t = r === null ? null : Number(r);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(r);
      } catch {
        t = null;
      }
  }
  return t;
} }, Mt = (r, e) => !Zt(r, e), nt = { attribute: !0, type: String, converter: Re, reflect: !1, useDefault: !1, hasChanged: Mt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), De.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ie = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = nt) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, n, t);
      i !== void 0 && Vt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: i, set: s } = Kt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(a) {
      this[t] = a;
    } };
    return { get: i, set(a) {
      const l = i?.call(this);
      s?.call(this, a), this.requestUpdate(e, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? nt;
  }
  static _$Ei() {
    if (this.hasOwnProperty($e("elementProperties"))) return;
    const e = Qt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($e("properties"))) {
      const t = this.properties, n = [...qt(t), ...Xt(t)];
      for (const i of n) this.createProperty(i, t[i]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [n, i] of t) this.elementProperties.set(n, i);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, n] of this.elementProperties) {
      const i = this._$Eu(t, n);
      i !== void 0 && this._$Eh.set(i, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const i of n) t.unshift(et(i));
    } else e !== void 0 && t.push(et(e));
    return t;
  }
  static _$Eu(e, t) {
    const n = t.attribute;
    return n === !1 ? void 0 : typeof n == "string" ? n : typeof e == "string" ? e.toLowerCase() : void 0;
  }
  constructor() {
    super(), this._$Ep = void 0, this.isUpdatePending = !1, this.hasUpdated = !1, this._$Em = null, this._$Ev();
  }
  _$Ev() {
    this._$ES = new Promise((e) => this.enableUpdating = e), this._$AL = /* @__PURE__ */ new Map(), this._$E_(), this.requestUpdate(), this.constructor.l?.forEach((e) => e(this));
  }
  addController(e) {
    (this._$EO ??= /* @__PURE__ */ new Set()).add(e), this.renderRoot !== void 0 && this.isConnected && e.hostConnected?.();
  }
  removeController(e) {
    this._$EO?.delete(e);
  }
  _$E_() {
    const e = /* @__PURE__ */ new Map(), t = this.constructor.elementProperties;
    for (const n of t.keys()) this.hasOwnProperty(n) && (e.set(n, this[n]), delete this[n]);
    e.size > 0 && (this._$Ep = e);
  }
  createRenderRoot() {
    const e = this.shadowRoot ?? this.attachShadow(this.constructor.shadowRootOptions);
    return jt(e, this.constructor.elementStyles), e;
  }
  connectedCallback() {
    this.renderRoot ??= this.createRenderRoot(), this.enableUpdating(!0), this._$EO?.forEach((e) => e.hostConnected?.());
  }
  enableUpdating(e) {
  }
  disconnectedCallback() {
    this._$EO?.forEach((e) => e.hostDisconnected?.());
  }
  attributeChangedCallback(e, t, n) {
    this._$AK(e, n);
  }
  _$ET(e, t) {
    const n = this.constructor.elementProperties.get(e), i = this.constructor._$Eu(e, n);
    if (i !== void 0 && n.reflect === !0) {
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Re).toAttribute(t, n.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const n = this.constructor, i = n._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = n.getPropertyOptions(i), a = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Re;
      this._$Em = i;
      const l = a.fromAttribute(t, s.type);
      this[i] = l ?? this._$Ej?.get(i) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, n, i = !1, s) {
    if (e !== void 0) {
      const a = this.constructor;
      if (i === !1 && (s = this[e]), n ??= a.getPropertyOptions(e), !((n.hasChanged ?? Mt)(s, t) || n.useDefault && n.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(a._$Eu(e, n)))) return;
      this.C(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: n, reflect: i, wrapped: s }, a) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, a ?? t ?? this[e]), s !== !0 || a !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
  }
  async _$EP() {
    this.isUpdatePending = !0;
    try {
      await this._$ES;
    } catch (t) {
      Promise.reject(t);
    }
    const e = this.scheduleUpdate();
    return e != null && await e, !this.isUpdatePending;
  }
  scheduleUpdate() {
    return this.performUpdate();
  }
  performUpdate() {
    if (!this.isUpdatePending) return;
    if (!this.hasUpdated) {
      if (this.renderRoot ??= this.createRenderRoot(), this._$Ep) {
        for (const [i, s] of this._$Ep) this[i] = s;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [i, s] of n) {
        const { wrapped: a } = s, l = this[i];
        a !== !0 || this._$AL.has(i) || l === void 0 || this.C(i, void 0, s, l);
      }
    }
    let e = !1;
    const t = this._$AL;
    try {
      e = this.shouldUpdate(t), e ? (this.willUpdate(t), this._$EO?.forEach((n) => n.hostUpdate?.()), this.update(t)) : this._$EM();
    } catch (n) {
      throw e = !1, this._$EM(), n;
    }
    e && this._$AE(t);
  }
  willUpdate(e) {
  }
  _$AE(e) {
    this._$EO?.forEach((t) => t.hostUpdated?.()), this.hasUpdated || (this.hasUpdated = !0, this.firstUpdated(e)), this.updated(e);
  }
  _$EM() {
    this._$AL = /* @__PURE__ */ new Map(), this.isUpdatePending = !1;
  }
  get updateComplete() {
    return this.getUpdateComplete();
  }
  getUpdateComplete() {
    return this._$ES;
  }
  shouldUpdate(e) {
    return !0;
  }
  update(e) {
    this._$Eq &&= this._$Eq.forEach((t) => this._$ET(t, this[t])), this._$EM();
  }
  updated(e) {
  }
  firstUpdated(e) {
  }
};
ie.elementStyles = [], ie.shadowRootOptions = { mode: "open" }, ie[$e("elementProperties")] = /* @__PURE__ */ new Map(), ie[$e("finalized")] = /* @__PURE__ */ new Map(), Jt?.({ ReactiveElement: ie }), (De.reactiveElementVersions ??= []).push("2.1.2");
const je = globalThis, rt = (r) => r, Te = je.trustedTypes, st = Te ? Te.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Et = "$lit$", q = `lit$${Math.random().toFixed(9).slice(2)}$`, At = "?" + q, en = `<${At}>`, ee = document, be = () => ee.createComment(""), xe = (r) => r === null || typeof r != "object" && typeof r != "function", Ze = Array.isArray, tn = (r) => Ze(r) || typeof r?.[Symbol.iterator] == "function", We = `[ 	
\f\r]`, ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, it = /-->/g, ot = />/g, Y = RegExp(`>|${We}(?:([^\\s"'>=/]+)(${We}*=${We}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), at = /'/g, lt = /"/g, Pt = /^(?:script|style|textarea|title)$/i, Tt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), $ = Tt(1), A = Tt(2), ae = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), ct = /* @__PURE__ */ new WeakMap(), J = ee.createTreeWalker(ee, 129);
function Dt(r, e) {
  if (!Ze(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return st !== void 0 ? st.createHTML(e) : e;
}
const nn = (r, e) => {
  const t = r.length - 1, n = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", a = ge;
  for (let l = 0; l < t; l++) {
    const o = r[l];
    let c, h, d = -1, u = 0;
    for (; u < o.length && (a.lastIndex = u, h = a.exec(o), h !== null); ) u = a.lastIndex, a === ge ? h[1] === "!--" ? a = it : h[1] !== void 0 ? a = ot : h[2] !== void 0 ? (Pt.test(h[2]) && (i = RegExp("</" + h[2], "g")), a = Y) : h[3] !== void 0 && (a = Y) : a === Y ? h[0] === ">" ? (a = i ?? ge, d = -1) : h[1] === void 0 ? d = -2 : (d = a.lastIndex - h[2].length, c = h[1], a = h[3] === void 0 ? Y : h[3] === '"' ? lt : at) : a === lt || a === at ? a = Y : a === it || a === ot ? a = ge : (a = Y, i = void 0);
    const x = a === Y && r[l + 1].startsWith("/>") ? " " : "";
    s += a === ge ? o + en : d >= 0 ? (n.push(c), o.slice(0, d) + Et + o.slice(d) + q + x) : o + q + (d === -2 ? l : x);
  }
  return [Dt(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class ye {
  constructor({ strings: e, _$litType$: t }, n) {
    let i;
    this.parts = [];
    let s = 0, a = 0;
    const l = e.length - 1, o = this.parts, [c, h] = nn(e, t);
    if (this.el = ye.createElement(c, n), J.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = J.nextNode()) !== null && o.length < l; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Et)) {
          const u = h[a++], x = i.getAttribute(d).split(q), g = /([.?@])?(.*)/.exec(u);
          o.push({ type: 1, index: s, name: g[2], strings: x, ctor: g[1] === "." ? sn : g[1] === "?" ? on : g[1] === "@" ? an : ze }), i.removeAttribute(d);
        } else d.startsWith(q) && (o.push({ type: 6, index: s }), i.removeAttribute(d));
        if (Pt.test(i.tagName)) {
          const d = i.textContent.split(q), u = d.length - 1;
          if (u > 0) {
            i.textContent = Te ? Te.emptyScript : "";
            for (let x = 0; x < u; x++) i.append(d[x], be()), J.nextNode(), o.push({ type: 2, index: ++s });
            i.append(d[u], be());
          }
        }
      } else if (i.nodeType === 8) if (i.data === At) o.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(q, d + 1)) !== -1; ) o.push({ type: 7, index: s }), d += q.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const n = ee.createElement("template");
    return n.innerHTML = e, n;
  }
}
function le(r, e, t = r, n) {
  if (e === ae) return e;
  let i = n !== void 0 ? t._$Co?.[n] : t._$Cl;
  const s = xe(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== s && (i?._$AO?.(!1), s === void 0 ? i = void 0 : (i = new s(r), i._$AT(r, t, n)), n !== void 0 ? (t._$Co ??= [])[n] = i : t._$Cl = i), i !== void 0 && (e = le(r, i._$AS(r, e.values), i, n)), e;
}
class rn {
  constructor(e, t) {
    this._$AV = [], this._$AN = void 0, this._$AD = e, this._$AM = t;
  }
  get parentNode() {
    return this._$AM.parentNode;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  u(e) {
    const { el: { content: t }, parts: n } = this._$AD, i = (e?.creationScope ?? ee).importNode(t, !0);
    J.currentNode = i;
    let s = J.nextNode(), a = 0, l = 0, o = n[0];
    for (; o !== void 0; ) {
      if (a === o.index) {
        let c;
        o.type === 2 ? c = new ve(s, s.nextSibling, this, e) : o.type === 1 ? c = new o.ctor(s, o.name, o.strings, this, e) : o.type === 6 && (c = new ln(s, this, e)), this._$AV.push(c), o = n[++l];
      }
      a !== o?.index && (s = J.nextNode(), a++);
    }
    return J.currentNode = ee, i;
  }
  p(e) {
    let t = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++;
  }
}
class ve {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, n, i) {
    this.type = 2, this._$AH = f, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = i, this._$Cv = i?.isConnected ?? !0;
  }
  get parentNode() {
    let e = this._$AA.parentNode;
    const t = this._$AM;
    return t !== void 0 && e?.nodeType === 11 && (e = t.parentNode), e;
  }
  get startNode() {
    return this._$AA;
  }
  get endNode() {
    return this._$AB;
  }
  _$AI(e, t = this) {
    e = le(this, e, t), xe(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== ae && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : tn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && xe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ee.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: n } = e, i = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ye.createElement(Dt(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const s = new rn(i, this), a = s.u(this.options);
      s.p(t), this.T(a), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = ct.get(e.strings);
    return t === void 0 && ct.set(e.strings, t = new ye(e)), t;
  }
  k(e) {
    Ze(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, i = 0;
    for (const s of e) i === t.length ? t.push(n = new ve(this.O(be()), this.O(be()), this, this.options)) : n = t[i], n._$AI(s), i++;
    i < t.length && (this._$AR(n && n._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const n = rt(e).nextSibling;
      rt(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class ze {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, n, i, s) {
    this.type = 1, this._$AH = f, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = f;
  }
  _$AI(e, t = this, n, i) {
    const s = this.strings;
    let a = !1;
    if (s === void 0) e = le(this, e, t, 0), a = !xe(e) || e !== this._$AH && e !== ae, a && (this._$AH = e);
    else {
      const l = e;
      let o, c;
      for (e = s[0], o = 0; o < s.length - 1; o++) c = le(this, l[n + o], t, o), c === ae && (c = this._$AH[o]), a ||= !xe(c) || c !== this._$AH[o], c === f ? e = f : e !== f && (e += (c ?? "") + s[o + 1]), this._$AH[o] = c;
    }
    a && !i && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class sn extends ze {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class on extends ze {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class an extends ze {
  constructor(e, t, n, i, s) {
    super(e, t, n, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = le(this, e, t, 0) ?? f) === ae) return;
    const n = this._$AH, i = e === f && n !== f || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== f && (n === f || i);
    i && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class ln {
  constructor(e, t, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    le(this, e);
  }
}
const cn = je.litHtmlPolyfillSupport;
cn?.(ye, ve), (je.litHtmlVersions ??= []).push("3.3.3");
const hn = (r, e, t) => {
  const n = t?.renderBefore ?? e;
  let i = n._$litPart$;
  if (i === void 0) {
    const s = t?.renderBefore ?? null;
    n._$litPart$ = i = new ve(e.insertBefore(be(), s), s, void 0, t ?? {});
  }
  return i._$AI(r), i;
};
const Ve = globalThis;
class we extends ie {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = hn(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ae;
  }
}
we._$litElement$ = !0, we.finalized = !0, Ve.litElementHydrateSupport?.({ LitElement: we });
const un = Ve.litElementPolyfillSupport;
un?.({ LitElement: we });
(Ve.litElementVersions ??= []).push("4.2.2");
const dn = [
  { key: "price", smardFilter: 4169, region: "DE-LU", unit: "EUR/MWh", label: "Day-Ahead-Preis DE/LU", kind: "price" },
  { key: "load", smardFilter: 410, region: "DE", unit: "MW", label: "Stromverbrauch (Netzlast)", kind: "actual", perControlZone: !0 },
  { key: "residual_load_smard", smardFilter: 4359, region: "DE", unit: "MW", label: "Residuallast (SMARD)", kind: "actual", schedule: "daily" },
  { key: "pumped_storage_load", smardFilter: 4387, region: "DE", unit: "MW", label: "Pumpspeicher (Verbrauch)", kind: "actual", schedule: "daily" },
  { key: "wind_onshore", smardFilter: 4067, region: "DE", unit: "MW", label: "Wind an Land", kind: "actual", perControlZone: !0 },
  { key: "wind_offshore", smardFilter: 1225, region: "DE", unit: "MW", label: "Wind auf See", kind: "actual", perControlZone: !0 },
  { key: "solar", smardFilter: 4068, region: "DE", unit: "MW", label: "Solar", kind: "actual", perControlZone: !0 },
  { key: "biomass", smardFilter: 4066, region: "DE", unit: "MW", label: "Biomasse", kind: "actual" },
  { key: "hydro", smardFilter: 1226, region: "DE", unit: "MW", label: "Wasserkraft", kind: "actual" },
  { key: "other_renewable", smardFilter: 1228, region: "DE", unit: "MW", label: "Sonstige Erneuerbare", kind: "actual" },
  { key: "nuclear", smardFilter: 1224, region: "DE", unit: "MW", label: "Kernenergie", kind: "actual" },
  { key: "lignite", smardFilter: 1223, region: "DE", unit: "MW", label: "Braunkohle", kind: "actual" },
  { key: "hard_coal", smardFilter: 4069, region: "DE", unit: "MW", label: "Steinkohle", kind: "actual" },
  { key: "gas", smardFilter: 4071, region: "DE", unit: "MW", label: "Erdgas", kind: "actual" },
  { key: "pumped_storage", smardFilter: 4070, region: "DE", unit: "MW", label: "Pumpspeicher", kind: "actual" },
  { key: "other_conventional", smardFilter: 1227, region: "DE", unit: "MW", label: "Sonstige Konventionelle", kind: "actual" },
  // Day-ahead generation forecasts. IDs verified against SMARD's own download-center column headers
  // (2026-09-14): 122 = "Gesamt" (total generation), 715 = "Sonstige" (everything but wind and PV),
  // 123 = "Wind Onshore", 3791 = "Wind Offshore", 125 = "Photovoltaik". SMARD publishes no separate
  // load forecast at this resolution; total generation minus wind and PV (= 715) is tomorrow's residual.
  { key: "forecast_generation_total", smardFilter: 122, region: "DE", unit: "MW", label: "Prognose Erzeugung gesamt", kind: "forecast" },
  { key: "forecast_conventional", smardFilter: 715, region: "DE", unit: "MW", label: "Prognose sonstige Erzeugung (ohne Wind und Solar)", kind: "forecast" },
  { key: "forecast_wind_onshore", smardFilter: 123, region: "DE", unit: "MW", label: "Prognose Wind an Land", kind: "forecast", perControlZone: !0, zoneSchedule: "daily" },
  { key: "forecast_wind_offshore", smardFilter: 3791, region: "DE", unit: "MW", label: "Prognose Wind auf See", kind: "forecast", perControlZone: !0, zoneSchedule: "daily" },
  { key: "forecast_solar", smardFilter: 125, region: "DE", unit: "MW", label: "Prognose Solar", kind: "forecast", perControlZone: !0, zoneSchedule: "daily" }
];
Object.fromEntries(dn.map((r) => [r.key, r]));
const ue = "Europe/Berlin", ht = /* @__PURE__ */ new Map();
function pn(r, e = ue) {
  const t = e + JSON.stringify(r);
  let n = ht.get(t);
  return n || (n = new Intl.DateTimeFormat("de-DE", { timeZone: e, ...r }), ht.set(t, n)), n;
}
function zt(r, e = ue) {
  const t = pn({
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }, e).formatToParts(r), n = (i) => Number(t.find((s) => s.type === i)?.value);
  return {
    year: n("year"),
    month: n("month"),
    day: n("day"),
    hour: n("hour") === 24 ? 0 : n("hour"),
    minute: n("minute"),
    second: n("second")
  };
}
function mn(r, e = ue) {
  const t = zt(r, e), n = Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, t.second);
  return Math.round((n - r.getTime()) / 6e4);
}
function ne(r, e = ue) {
  return zt(r, e).hour;
}
function ut(r, e = 0, t = 0, n = ue) {
  const [i, s, a] = r.split("-").map(Number), l = Date.UTC(i, s - 1, a, e, t);
  let o = new Date(l);
  for (let c = 0; c < 2; c++) {
    const h = mn(o, n);
    o = new Date(l - h * 6e4);
  }
  return o;
}
function Ct(r, e = ue) {
  const t = ut(r, 0, 0, e), n = gn(r, 1);
  return { start: t, end: ut(n, 0, 0, e) };
}
function gn(r, e) {
  const [t, n, i] = r.split("-").map(Number);
  return new Date(Date.UTC(t, n - 1, i + e)).toISOString().slice(0, 10);
}
function fn(r, e = 0) {
  const t = 10 ** e;
  return Math.round(r * t) / t;
}
function X(r, e = 0) {
  const t = fn(r, e).toFixed(e), [n, i] = t.split("."), s = n.startsWith("-"), l = (s ? n.slice(1) : n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (s ? "-" : "") + l + (i ? "," + i : "");
}
function B(r, e = 0) {
  return `${X(r, e)} €/MWh`;
}
function $n(r, e = 1) {
  return `${X(r / 10, e)} ct/kWh`;
}
const It = /(-?\d{1,3}(?:\.\d{3})*(?:,\d+)?) €\/MWh/g;
function wn(r) {
  return r.replace(It, (e, t) => $n(Number(t.replace(/\./g, "").replace(",", "."))));
}
function bn(r, e) {
  let t = 0;
  return r.replace(It, (n, i) => B(e(Number(i.replace(/\./g, "").replace(",", ".")), t++)));
}
const K = (...r) => ({ kind: "p", parts: r }), Z = (r) => ({ strong: r });
K(Z("Dynamischer Tarif"), " (zum Beispiel Tibber, Octopus oder Rabot): Ihr Preis folgt Stunde für Stunde der Börse."), K("Der Aufschlag ist alles, was zum Börsenpreis dazukommt, schon mit Mehrwertsteuer: Netzentgelt, Stromsteuer, Umlagen, Konzessionsabgabe und der Aufschlag Ihres Anbieters. Ein Beispiel: Kostet Strom an der Börse 8 ct/kWh und beträgt Ihr Aufschlag 20 ct/kWh, zahlen Sie 8 × 1,19 + 20 = 29,5 ct/kWh."), K("Mit einem zeitvariablen Netzentgelt (§14a EnWG, Modul 3, für Wärmepumpe oder Wallbox) gilt in bestimmten Stunden ein anderer Aufschlag. Dann rechnet die Seite in jeder Stunde mit dem Aufschlag, der zu dieser Uhrzeit gilt."), K(Z("Zeitvariabler Tarif (HT/NT)"), ": Ihr Preis hängt nicht von der Börse ab, nur von der Uhrzeit. In einem Zeitfenster gilt dessen Preis, sonst der Preis außerhalb der Zeitfenster. Die Kurven zeigen dann Stufen, und ein teurer Abend an der Börse ändert nichts an Ihrem Preis."), K("Der Grundpreis pro Monat ist in keinem Stundenpreis enthalten, denn er hängt nicht davon ab, wann Sie Strom verbrauchen. Solange Sie keinen eigenen Tarif eintragen, rechnet die Seite mit bundesweiten Schätzwerten; welche das sind, steht unter ", { text: "Mein Preis", href: "/tarif" }, "."), Z("Dynamischer Tarif"), Z("Zeitvariabler Tarif (HT/NT)"), Z("Aufschlag auf den Börsenpreis"), Z("Preis außerhalb der Zeitfenster"), Z("Speichern und überall anzeigen"), Z("Speichern"), K("Nur auf dem Gerät, auf dem Sie ihn eintragen: im Speicher des Browsers oder der App. Es gibt kein Konto, und der Tarif wird nicht an den Server geschickt. Deshalb gilt er nur dort, wo Sie ihn eingetragen haben. ", Z("Laptop, Handy-Browser und App brauchen ihn jeweils einzeln."), " Wer die Websitedaten im Browser löscht, löscht auch den Tarif; dann rechnet die Seite wieder mit den Schätzwerten."), K("In der App nutzen auch die Widgets auf dem Startbildschirm und der Preis-Alarm den gespeicherten Tarif. Die Angaben bleiben dabei auf dem Gerät."), K("Die Übersicht zeigt, was bei „Mein Preis“ Ihren Preis zeigt und was beim Börsenpreis bleibt. Was beim Börsenpreis bleibt, beschreibt den Markt oder kennt Ihren Tarif nicht, und ist auf der Seite so beschriftet.");
const dt = 36e5, pt = 9e5, xn = [
  { key: "negativ", label: "negativ", upTo: 0 },
  { key: "sehr_guenstig", label: "sehr günstig", upTo: 80 },
  { key: "guenstig", label: "günstig", upTo: 130 },
  { key: "mittel", label: "mittel", upTo: 180 },
  { key: "teuer", label: "teuer", upTo: 230 },
  { key: "sehr_teuer", label: "sehr teuer", upTo: Number.POSITIVE_INFINITY }
];
function ce(r) {
  for (const e of xn)
    if (r < e.upTo)
      return e.key;
  return "sehr_teuer";
}
function yn(r, e = []) {
  const t = new Map(e.map((s) => [Date.parse(s.ts), s])), n = /* @__PURE__ */ new Map();
  for (const s of r) {
    if (s.price === null)
      continue;
    const a = Math.floor(Date.parse(s.ts) / dt) * dt, l = n.get(a) ?? { sum: 0, n: 0, neg: 0 };
    l.sum += s.price, l.n += 1, s.price < 0 && (l.neg += 1), n.set(a, l);
  }
  return [.../* @__PURE__ */ new Set([...n.keys(), ...t.keys()])].sort((s, a) => s - a).map((s) => {
    const a = t.get(s) ?? null, l = n.get(s), o = new Date(s);
    return { ts: o.toISOString(), ms: s, hour: a?.hour ?? ne(o), priceEurMwh: l ? l.sum / l.n : a.priceEurMwh, negativeQuarters: l?.neg ?? (a && a.priceEurMwh < 0 ? 4 : 0), explanation: a };
  });
}
function Ke(r, e = [2, 3, 4]) {
  const t = r.filter((i) => i.price !== null).map((i) => ({ ms: Date.parse(i.ts), price: i.price })), n = [];
  for (const i of e) {
    const s = i * 4;
    let a = null;
    for (let l = 0; l + s <= t.length; l++) {
      if (t[l + s - 1].ms - t[l].ms !== (s - 1) * pt)
        continue;
      let o = 0;
      for (let h = l; h < l + s; h++)
        o += t[h].price;
      const c = o / s;
      (a === null || c < a.avg) && (a = { i: l, avg: c });
    }
    a && n.push({ hours: i, from: new Date(t[a.i].ms).toISOString(), to: new Date(t[a.i].ms + s * pt).toISOString(), avgEurMwh: a.avg });
  }
  return n;
}
function vn(r, e) {
  const t = e === "teurer" ? " Insgesamt teurer als in den letzten 30 Tagen üblich." : e === "guenstiger" ? " Insgesamt günstiger als in den letzten 30 Tagen üblich." : e === "ueblich" ? " Insgesamt etwa wie üblich." : "";
  return `Zwischen ${B(r.min)} um ${r.minHour} Uhr und ${B(r.max)} um ${r.maxHour} Uhr, im Schnitt ${B(r.avg)}.${t}`;
}
function Wt(r) {
  return `${r.fromHour}-${r.toHour} Uhr`;
}
const Se = (r) => {
  const e = new Date(r);
  return `${String(ne(e)).padStart(2, "0")}:${String(e.getUTCMinutes()).padStart(2, "0")}`;
};
function mt(r, e) {
  const t = r.verdict, n = e.verdict;
  if (!t || !n)
    return null;
  let i;
  if (Math.abs(n.avgEurMwh) < 5)
    i = `Morgen kostet Strom im Schnitt ${B(t.avgEurMwh)}, heute ${B(n.avgEurMwh)}.`;
  else {
    const o = (t.avgEurMwh - n.avgEurMwh) / Math.abs(n.avgEurMwh) * 100;
    i = Math.abs(o) < 3 ? `Morgen kostet Strom im Schnitt ${B(t.avgEurMwh)}, etwa so viel wie heute (${B(n.avgEurMwh)}).` : `Morgen kostet Strom im Schnitt ${B(t.avgEurMwh)}, ${X(Math.abs(o), 0)} % ${o > 0 ? "mehr" : "weniger"} als heute (${B(n.avgEurMwh)}).`;
  }
  const s = r.windows.find((o) => o.hours === 3), a = e.windows.find((o) => o.hours === 3), l = s && a ? ` Die günstigsten drei Stunden: morgen ${Se(s.from)}-${Se(s.to)} Uhr (${B(s.avgEurMwh)}), heute ${Se(a.from)}-${Se(a.to)} Uhr (${B(a.avgEurMwh)}).` : "";
  return i + l;
}
function gt(r) {
  return r.shiftSavingEur === null || r.shiftSavingEur < 0.2 ? null : `10 kWh von ${r.maxHour} auf ${r.minHour} Uhr verschoben: rund ${X(r.shiftSavingEur, 2)} € gespart.`;
}
const qe = (r) => r;
function Ot(r, e = qe) {
  if (r.length === 0)
    return null;
  let t = 1 / 0, n = -1 / 0, i = 0, s = 0, a = 0;
  for (const l of r) {
    const o = e(l.priceEurMwh, l.hour);
    a += o, o < t && (t = o, i = l.hour), o > n && (n = o, s = l.hour);
  }
  return { min: t, minHour: i, max: n, maxHour: s, avg: a / r.length };
}
function Xe(r, e) {
  return r.map((t) => t.price === null ? t : { ...t, price: e(t.price, ne(new Date(t.ts))) });
}
const kn = [
  [/Der Preis (lag|liegt) rund/g, "Der Börsenpreis $1 rund"],
  [/(€\/MWh|ct\/kWh) davon sind ein Knappheitsaufschlag/g, "$1 des Börsenpreises sind ein Knappheitsaufschlag"]
];
function Sn(r) {
  return kn.reduce((e, [t, n]) => e.replace(t, n), r);
}
const ft = 6.2, _n = 6.4;
function Mn(r) {
  for (const e of [50, 100, 200, 500, 1e3, 2e3])
    if (r / e <= 6)
      return e;
  return 5e3;
}
function En(r, e, t = {}) {
  const n = t.width ?? 360, i = t.height ?? 214, s = t.top ?? 40, a = t.bottom ?? 34, l = t.left ?? 30, o = t.right ?? 8, c = { x: l, y: s, w: n - l - o, h: i - s - a }, h = Math.max(1, r.length), d = c.w / h, u = t.map ?? qe, x = r.map((k) => u(k.priceEurMwh, k.hour)), g = x.length ? Math.max(...x) : 100, v = x.length ? Math.min(...x) : 0, p = Mn(Math.max(g, 50) * 1.15 - Math.min(0, v)), W = Math.max(p, Math.ceil(g * 1.15 / p) * p), S = v < 0 ? Math.floor(v / p) * p : 0, T = (k) => c.y + c.h - (k - S) / (W - S) * c.h, y = T(Math.max(S, 0)), m = [];
  for (let k = S; k <= W + 1e-9; k += p)
    m.push({ y: T(k), label: X(k / 10, 0) });
  const M = [];
  for (const k of [0, 6, 12, 18]) {
    const I = r.findIndex((L) => L.hour === k);
    I >= 0 && M.push({ x: c.x + I * d, label: String(k), anchor: k === 0 ? "start" : "middle" });
  }
  M.push({ x: c.x + c.w, label: "24", anchor: "end" });
  let C = "";
  r.length && (C = `M${re(c.x)},${re(T(x[0]))}`, r.forEach((k, I) => {
    const L = c.x + (I + 1) * d;
    C += ` H${re(L)}`, I < r.length - 1 && (C += ` V${re(T(x[I + 1]))}`);
  }));
  const F = r.length ? `${C} V${re(y)} H${re(c.x)} Z` : "", j = r.map((k, I) => ({ index: I, x: c.x + I * d, w: d, y: T(x[I]), level: ce(k.priceEurMwh), hour: k.hour })), G = e.map((k) => {
    const I = c.x + k.startIdx * d, L = (k.endIdx - k.startIdx) * d, w = k.name.length * _n + 8 <= L;
    return { index: k.index, x: I, w: L, label: w ? k.name : L >= 18 ? String(k.index + 1) : null, name: k.name };
  }), me = [];
  if (r.length >= 2 && g !== v) {
    const k = x.indexOf(g), I = x.indexOf(v), L = (D) => c.x + (D + 0.5) * d, w = (D, _, U) => {
      const R = _.length * ft, z = L(D);
      return z - R / 2 < c.x ? { x: c.x + d * 0.2, y: U, text: _, anchor: "start" } : z + R / 2 > c.x + c.w ? { x: c.x + c.w - d * 0.2, y: U, text: _, anchor: "end" } : { x: z, y: U, text: _, anchor: "middle" };
    }, E = w(k, `▲ ${X(g / 10, 1)} ct · ${r[k].hour} Uhr`, T(g) - 7);
    me.push(E);
    const P = T(v), H = P + 16, O = w(I, `▼ ${X(v / 10, 1)} ct · ${r[I].hour} Uhr`, H <= c.y + c.h - 2 ? H : P - 7);
    Math.abs(O.y - E.y) < 12 && Math.abs(O.x - E.x) < (O.text.length + E.text.length) * ft * 0.5 && (O.y = E.y + 13), me.push(O);
  }
  const Ce = t.now && t.now.index >= 0 && t.now.index < h ? { x: c.x + (t.now.index + Math.min(1, Math.max(0, t.now.fraction))) * d, label: t.now.label } : null;
  return { width: n, height: i, plot: c, slotW: d, yOf: T, yTicks: m, xTicks: M, areaPath: F, linePath: C, zeroY: S < 0 ? T(0) : null, baselineY: y, slots: j, bands: G, labels: me, now: Ce, yMax: W, yMin: S };
}
function re(r) {
  return String(Math.round(r * 10) / 10);
}
const _e = [
  { key: "wind", label: "Wind" },
  { key: "solar", label: "Sonne" },
  { key: "bio", label: "Bio & Wasser" },
  { key: "coal", label: "Kohle" },
  { key: "gas", label: "Gas" },
  { key: "other", label: "Sonstige" },
  { key: "forecastRest", label: "Übrige" }
], oe = 9e5, An = 36e5;
function Me(...r) {
  let e = 0, t = 0;
  for (const n of r)
    n !== null && (e += n, t++);
  return t ? e : null;
}
function Pn(r) {
  const e = r, t = (s) => {
    const a = e[s];
    return a.load != null && a.windOnshore != null && a.windOffshore != null && a.solar != null && a.lignite != null && a.hardCoal != null && a.gas != null;
  };
  let n = -1;
  for (let s = 0; s < e.length; s++)
    t(s) && (n = s);
  const i = (s, a) => {
    const l = e[s][a];
    if (l !== null)
      return l;
    const o = e[s - 1]?.[a] ?? null, c = s + 1 <= n ? e[s + 1]?.[a] ?? null : null;
    return o !== null && c !== null ? (o + c) / 2 : o ?? c;
  };
  return e.map((s, a) => {
    const l = Date.parse(s.ts), o = { wind: 0, solar: 0, bio: 0, coal: 0, gas: 0, other: 0, forecastRest: 0 };
    return a <= n && s.load != null ? {
      ms: l,
      actual: !0,
      forecast: !1,
      layers: {
        ...o,
        wind: Me(i(a, "windOnshore"), i(a, "windOffshore")) ?? 0,
        solar: i(a, "solar") ?? 0,
        bio: Me(i(a, "biomass"), i(a, "hydro"), i(a, "otherRenewable")) ?? 0,
        coal: Me(i(a, "lignite"), i(a, "hardCoal")) ?? 0,
        gas: i(a, "gas") ?? 0,
        // nuclear only exists on days before April 2023; it is too small a layer today to name on its own
        other: Me(i(a, "pumpedStorage"), i(a, "otherConventional"), i(a, "nuclear")) ?? 0
      },
      load: s.load
    } : s.forecastGeneration != null && s.forecastWind != null && s.forecastSolar != null ? {
      ms: l,
      actual: !1,
      forecast: !0,
      layers: { ...o, wind: s.forecastWind, solar: s.forecastSolar, forecastRest: Math.max(0, s.forecastGeneration - s.forecastWind - s.forecastSolar) },
      load: s.forecastGeneration
    } : null;
  });
}
function $t(r, e, t) {
  const n = r.filter((o) => o !== null && o.ms >= e && o.ms < t);
  if (!n.length)
    return { renewableShare: null, windMw: null, solarMw: null, residualMw: null, gasMw: null, gasMaxMw: null, forecast: !1 };
  const i = (o) => n.reduce((c, h) => c + o(h), 0) / n.length, s = n.filter((o) => o.actual), a = n.reduce((o, c) => o + (c.load ?? 0), 0), l = n.reduce((o, c) => o + c.layers.wind + c.layers.solar + c.layers.bio, 0);
  return {
    renewableShare: a > 0 ? l / a : null,
    windMw: i((o) => o.layers.wind),
    solarMw: i((o) => o.layers.solar),
    residualMw: i((o) => (o.load ?? 0) - o.layers.wind - o.layers.solar),
    gasMw: s.length ? s.reduce((o, c) => o + c.layers.gas, 0) / s.length : null,
    gasMaxMw: s.length ? Math.max(...s.map((o) => o.layers.gas)) : null,
    forecast: n.filter((o) => o.forecast).length > n.length / 2
  };
}
const Oe = 5.6, Tn = 11;
function Ue(r, e, t, n = !0, i = !0) {
  const s = [];
  if (!r.length)
    return s;
  n && s.push([e(r[0].ms), t(r[0])]);
  for (const a of r)
    s.push([e(a.ms + oe / 2), t(a)]);
  return i && s.push([e(r[r.length - 1].ms + oe), t(r[r.length - 1])]), s;
}
function se(r) {
  return String(Math.round(r * 10) / 10);
}
function Dn(r, e, t, n = {}) {
  const i = n.width ?? 360, s = n.height ?? 150, a = n.top ?? 18, l = n.bottom ?? 20, o = n.left ?? 30, c = n.right ?? 8, h = { x: o, y: a, w: i - o - c, h: s - a - l }, d = Math.max(oe, t - e), u = (w) => h.x + (w - e) / d * h.w, x = r.filter((w) => w !== null), g = x.map((w) => _e.reduce((E, P) => E + w.layers[P.key], 0)), v = Math.max(0, ...g, ...x.map((w) => w.load ?? 0)), p = v > 6e4 ? 2e4 : 1e4, W = Math.max(p, Math.ceil(v * 1.06 / p) * p), S = (w) => h.y + h.h - w / W * h.h, T = [];
  let y = [];
  for (const w of r)
    w && (!y.length || w.ms - y[y.length - 1].ms === oe) ? y.push(w) : (y.length && T.push(y), y = w ? [w] : []);
  y.length && T.push(y);
  const m = [], M = [];
  _e.forEach((w, E) => {
    if (!x.some((_) => _.layers[w.key] > 0))
      return;
    const P = (_) => _e.slice(0, E).reduce((U, R) => U + _.layers[R.key], 0), H = (_) => P(_) + _.layers[w.key];
    let O = "", D = null;
    for (const _ of T) {
      const U = Ue(_, u, (z) => S(H(z))), R = Ue(_, u, (z) => S(P(z))).reverse();
      O += `M${U.map(([z, Q]) => `${se(z)},${se(Q)}`).join(" L")} L${R.map(([z, Q]) => `${se(z)},${se(Q)}`).join(" L")} Z `;
      for (const z of _) {
        const Q = S(P(z)) - S(H(z));
        (!D || Q > D.band) && (D = { x: z, band: Q });
      }
    }
    if (m.push({ key: w.key, label: w.label, path: O.trim() }), D && D.band >= Tn) {
      const _ = w.label, U = _.length * Oe, R = Math.min(h.x + h.w - U / 2 - 2, Math.max(h.x + U / 2 + 2, u(D.x.ms + oe / 2))), z = (S(P(D.x)) + S(H(D.x))) / 2 + 3.5;
      M.some((Ie) => Math.abs(Ie.y - z) < 12 && Math.abs(Ie.x - R) < (U + Ie.text.length * Oe) / 2 + 4) || M.push({ key: w.key, x: R, y: z, text: _ });
    }
  });
  let C = "", F = "";
  for (const w of T) {
    const E = w.filter((H) => H.load !== null);
    let P = 0;
    for (; P < E.length; ) {
      const H = E[P].actual;
      let O = P;
      for (; O + 1 < E.length && E[O + 1].actual === H; )
        O++;
      const D = E.slice(P, O + 1), _ = Ue(D, u, (R) => S(R.load), P === 0, O === E.length - 1);
      if (P > 0) {
        const R = E[P - 1];
        _.unshift([u(R.ms + oe / 2), S(R.load)]);
      }
      const U = `M${_.map(([R, z]) => `${se(R)},${se(z)}`).join(" L")} `;
      H ? C += U : F += U, P = O + 1;
    }
  }
  const j = x.find((w) => w.forecast), G = x.some((w) => w.actual), me = j && G ? u(j.ms) : null, Ce = [0, W / 2, W].map((w) => ({ y: S(w), label: X(w / 1e3, 0) })), k = [];
  for (let w = e; w < t; w += An) {
    const E = ne(new Date(w));
    E % 6 === 0 && (k.some((P) => P.label === String(E)) || k.push({ x: u(w), label: String(E), anchor: w === e ? "start" : "middle" }));
  }
  k.push({ x: h.x + h.w, label: "24", anchor: "end" });
  let I = null;
  const L = x.filter((w) => w.load !== null);
  if (L.length) {
    const w = G ? "Verbrauch" : "Erzeugung gesamt", E = w.length * Oe, P = (D) => S(_e.reduce((_, U) => _ + D.layers[U.key], 0)) - S(D.load), H = L.reduce((D, _) => P(_) > P(D) ? _ : D, L[0]);
    I = { x: Math.min(h.x + h.w - E - 2, Math.max(h.x + 2, u(H.ms) - E / 2)), y: Math.max(h.y + 9, S(H.load) - 4), text: w };
  }
  return {
    width: i,
    height: s,
    plot: h,
    xOf: u,
    yOf: S,
    layers: m,
    loadPath: C.trim(),
    forecastLoadPath: F.trim(),
    forecastX: me,
    allForecast: x.length > 0 && !G,
    yTicks: Ce,
    xTicks: k,
    labels: M,
    loadLabel: I,
    hasData: x.length > 0
  };
}
const zn = 9e5, Cn = [
  "load",
  "windOnshore",
  "windOffshore",
  "solar",
  "biomass",
  "hydro",
  "otherRenewable",
  "nuclear",
  "lignite",
  "hardCoal",
  "gas",
  "pumpedStorage",
  "otherConventional",
  "forecastGeneration",
  "forecastWind",
  "forecastSolar"
], In = (r) => Math.round(r * 10) / 10;
function He(r) {
  const e = Date.parse(r.start), t = [];
  for (let n = 0; n < r.slots; n++) {
    const i = { ts: new Date(e + n * zn).toISOString(), price: r.price[n] ?? null };
    for (const a of Cn)
      i[a] = r.mix?.[a][n] ?? null;
    const s = i.windOnshore !== null || i.windOffshore !== null ? (i.windOnshore ?? 0) + (i.windOffshore ?? 0) : null;
    i.residual = i.load !== null && s !== null && i.solar !== null ? In(i.load - s - i.solar) : null, t.push(i);
  }
  return t;
}
const Le = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }), Qe = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }), Ye = (r) => Le.format(Math.round(r) + 0), Wn = (r) => Qe.format(Math.abs(r) < 0.05 ? 0 : r), fe = (r) => `${Qe.format(r / 1e3)} GW`, Ut = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], On = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
function Rt(r) {
  return r.split("-").map(Number);
}
function Un(r) {
  const [e, t, n] = Rt(r);
  return `${Ut[new Date(Date.UTC(e, t - 1, n)).getUTCDay()]} ${n}. ${On[t - 1]}`;
}
function Rn(r) {
  const [e, t, n] = Rt(r);
  return `${Ut[new Date(Date.UTC(e, t - 1, n)).getUTCDay()]} ${String(n).padStart(2, "0")}.${String(t).padStart(2, "0")}.`;
}
const Hn = (r) => `${r}-${(r + 1) % 24} Uhr`, Ln = new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Europe/Berlin" }), V = (r) => Ln.format(new Date(r)), Ht = (r) => `${V(r)}-${V(new Date(r).getTime() + 9e5)} Uhr`;
function Nn(r) {
  return r >= 1.85 ? `${Le.format(Math.round(r))}× so teuer` : r >= 1.15 ? `${Qe.format(r)}× so teuer` : r > 0.87 ? "etwa gleich" : `${Le.format((1 - r) * 100)} % günstiger`;
}
const Bn = /^[^:]*?\d{1,2}-\d{1,2} Uhr: [\s\S]*?\. (?=[A-ZÄÖÜ])/, Fn = (r) => r.replace(Bn, "");
function Gn(r, e, t) {
  const n = r % 24, i = e % 24;
  return n === i ? !1 : n < i ? t >= n && t < i : t >= n || t < i;
}
function Lt(r, e) {
  let t = r.base_ct;
  for (const n of r.windows) Gn(n.from_hour, n.to_hour, e) && (t = n.ct);
  return t;
}
function jn(r) {
  let e = 0;
  for (let t = 0; t < 24; t++) e += Lt(r, t);
  return e / 24;
}
function Zn(r, e, t) {
  return (e.kind === "dynamic" ? r / 10 * (1 + e.vat / 100) : 0) + (t === null ? jn(e) : Lt(e, t));
}
const Vn = { kind: "dynamic", base_ct: 19.69, vat: 19, windows: [] };
function Kn(r, e) {
  const t = e ?? Vn, n = r !== "mein_preis", i = (h, d) => n ? h : Zn(h, t, d) * 10, s = (h) => h == null ? null : typeof h == "number" ? h : ne(new Date(h)), a = (h, d) => i(h, s(d)), l = r === "eur_mwh" ? "€/MWh" : "ct/kWh", o = (h) => r === "eur_mwh" ? Ye(h) : Wn(h / 10), c = (h) => `${o(h)} ${l}`;
  return {
    unit: r,
    suffix: l,
    isExchange: n,
    map: i,
    shown: a,
    number: (h, d) => o(a(h, d)),
    price: (h, d) => c(a(h, d)),
    shownNumber: o,
    shownPrice: c,
    text: (h, d) => {
      const u = d ? bn(h, d) : n ? h : Sn(h);
      return r === "eur_mwh" ? u : wn(u);
    },
    axisUnit: r === "eur_mwh" ? "€" : "ct"
  };
}
const Nt = "strompreis.ha.resolution.v1";
function qn() {
  try {
    return localStorage.getItem(Nt) === "quarter" ? "quarter" : "hour";
  } catch {
    return "hour";
  }
}
class Xn extends EventTarget {
  constructor() {
    super(...arguments), this.home = null, this.tariff = null, this.stale = !1, this.error = null, this.loading = !0, this.day = "today", this.resolution = qn(), this.selectedMs = null, this.now = Date.now(), this.persist = !0, this.connection = null, this.clock = null;
  }
  connect(e) {
    this.connection !== e.connection && (this.connection = e.connection, this.loading = !0, e.connection.subscribeMessage((t) => {
      this.home = t.home, this.tariff = t.tariff, this.stale = !t.last_update_success, this.error = t.home ? null : "no_data", this.loading = !1, this.changed();
    }, { type: "strompreis_verstehen/subscribe" }).catch((t) => {
      this.error = t?.code === "unknown_command" ? "not_loaded" : t?.message ?? "error", this.loading = !1, this.changed();
    }), this.clock ??= setInterval(() => {
      this.now = Date.now(), this.changed();
    }, 3e4));
  }
  set(e) {
    if (e.day !== void 0 && e.day !== this.day && (this.selectedMs = null), Object.assign(this, e), e.resolution && this.persist)
      try {
        localStorage.setItem(Nt, e.resolution);
      } catch {
      }
    this.changed();
  }
  changed() {
    this.dispatchEvent(new Event("change"));
  }
}
const b = new Xn(), Qn = [
  { value: "ct_kwh", label: "Börsenpreis in ct/kWh" },
  { value: "mein_preis", label: "Mein Preis (Tarif aus der Integration)" },
  { value: "eur_mwh", label: "Börsenpreis in €/MWh" }
], ke = { name: "unit", selector: { select: { mode: "dropdown", options: Qn } } }, de = { name: "title", selector: { text: {} } }, pe = {
  unit: "Preise anzeigen als",
  title: "Überschrift (leer: Standard)",
  show_verdict: "Tagesbild zeigen",
  show_strip: "Preisstreifen zeigen",
  show_switches: "Tag und Raster umschaltbar",
  show_text: "Texte zeigen"
}, Yn = {
  negativ: "negativ",
  sehr_guenstig: "sehr günstig",
  guenstig: "günstig",
  mittel: "mittel",
  teuer: "teuer",
  sehr_teuer: "sehr teuer"
};
class N extends we {
  constructor() {
    super(...arguments), this._hass = null, this.onStore = () => this.requestUpdate(), this.sizeObserver = new ResizeObserver(([e]) => {
      const t = (e?.contentRect.width ?? 360) - 32;
      this.style.setProperty("--k", String(Math.min(1.1, Math.max(0.45, 360 / Math.max(1, t)))));
    });
  }
  static {
    this.properties = {
      config: { state: !0 },
      dark: { type: Boolean, reflect: !0 }
    };
  }
  set hass(e) {
    this._hass = e, b.connect(e);
    const t = !!e.themes?.darkMode;
    t !== this.dark && (this.dark = t);
  }
  get hass() {
    return this._hass;
  }
  setConfig(e) {
    if (!e) throw new Error("Keine Konfiguration");
    this.config = e;
  }
  getCardSize() {
    return 4;
  }
  connectedCallback() {
    super.connectedCallback(), b.addEventListener("change", this.onStore), this.sizeObserver.observe(this);
  }
  disconnectedCallback() {
    b.removeEventListener("change", this.onStore), this.sizeObserver.disconnect(), super.disconnectedCallback();
  }
  get units() {
    return Kn(this.config?.unit ?? "ct_kwh", b.tariff);
  }
  /** a card in the integration's absence or before the first data: one line instead of an empty frame */
  placeholder() {
    return b.error === "not_loaded" ? this.frame($`<p class="muted">Die Integration „Strompreis verstehen“ ist nicht eingerichtet.</p>`) : b.error === "no_data" ? this.frame($`<p class="muted">Gerade keine Daten von „Strompreis verstehen“. Nächster Versuch in wenigen Minuten.</p>`) : b.error ? this.frame($`<p class="muted">Keine Daten von „Strompreis verstehen“ (${b.error}).</p>`) : b.loading || !b.home ? this.frame($`<div class="skeleton"></div>`) : null;
  }
  frame(e, t) {
    const n = this.config?.title ?? t;
    return $`<ha-card>
      <div class="card">
        ${n ? $`<h2 class="kicker">${n}</h2>` : f} ${e}
        ${b.stale ? $`<p class="note">Keine Verbindung zum Datendienst, angezeigt wird der letzte Stand.</p>` : f}
      </div>
    </ha-card>`;
  }
  static {
    this.styles = te`
    :host {
      --ink: var(--primary-text-color, #15181c);
      --muted-ink: var(--secondary-text-color, #5a6068);
      --rule: color-mix(in srgb, var(--ink) 14%, transparent);
      --soft: color-mix(in srgb, var(--ink) 7%, transparent);
      --tint: color-mix(in srgb, var(--ink) 5%, transparent);
      --hl: #f5c518;
      --hl-ink: #15181c;
      --halo: var(--ha-card-background, var(--card-background-color, #fff));
      --lvl-negativ: #1d4e89;
      --lvl-sehr_guenstig: #3b7fc4;
      --lvl-guenstig: #9cc3e6;
      --lvl-mittel: #d9d4c7;
      --lvl-teuer: #f0a04b;
      --lvl-sehr_teuer: #c2410c;
      --src-wind: #5fa8b8;
      --src-solar: #dcc43a;
      --src-bio: #2f7a52;
      --src-coal: #5b6066;
      --src-gas: #b9b3aa;
      --src-gas-hatch: #15181c;
      --src-other: #cfd2d0;
      display: block;
    }
    :host([dark]) {
      --lvl-negativ: #a8c4ff;
      --lvl-sehr_guenstig: #4f95dc;
      --lvl-guenstig: #2c5a88;
      --lvl-mittel: #46443f;
      --lvl-teuer: #94561f;
      --lvl-sehr_teuer: #f08a4a;
      --src-wind: #7cc6d2;
      --src-solar: #efd65e;
      --src-bio: #4fa877;
      --src-coal: #9aa0a6;
      --src-gas: #6b655c;
      --src-gas-hatch: #e9ebe8;
      --src-other: #3a3e43;
    }
    ha-card {
      overflow: hidden;
    }
    .card {
      padding: 16px;
      color: var(--ink);
      font-variant-numeric: tabular-nums;
    }
    .card > * + * {
      margin-top: 12px;
    }
    h2,
    h3,
    p {
      margin: 0;
    }
    .kicker {
      font-size: 0.75rem;
      font-weight: 600;
      letter-spacing: 0.12em;
      text-transform: uppercase;
      color: var(--muted-ink);
    }
    .muted {
      color: var(--muted-ink);
    }
    .small {
      font-size: 0.8125rem;
    }
    .note {
      font-size: 0.75rem;
      color: var(--muted-ink);
    }
    .badge {
      display: inline-block;
      background: var(--hl);
      color: var(--hl-ink);
      border-radius: 3px;
      padding: 2px 5px;
      font-size: 0.65rem;
      font-weight: 600;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height: 1.2;
      vertical-align: 2px;
    }
    .skeleton {
      height: 120px;
      border-radius: 8px;
      background: var(--soft);
    }
    .hatch {
      background-image: repeating-linear-gradient(135deg, var(--halo) 0 1px, transparent 1px 5px);
    }
    .seg {
      display: inline-flex;
      border: 1px solid var(--rule);
      border-radius: 6px;
      overflow: hidden;
    }
    .seg button {
      font: inherit;
      font-size: 0.8125rem;
      color: var(--ink);
      background: transparent;
      border: 0;
      padding: 4px 10px;
      cursor: pointer;
      position: relative;
    }
    .seg button + button {
      border-left: 1px solid var(--rule);
    }
    .seg button[aria-pressed="true"] {
      background: var(--ink);
      color: var(--halo);
    }
    .seg button:disabled {
      color: var(--muted-ink);
      cursor: default;
    }
    .dot {
      position: absolute;
      top: 3px;
      right: 3px;
      width: 5px;
      height: 5px;
      border-radius: 50%;
      background: var(--hl);
    }
    svg text {
      font-size: calc(10px * var(--k, 1));
    }
    svg text.ribbon {
      font-size: calc(10.5px * var(--k, 1));
    }
    svg text.anno {
      font-size: calc(11px * var(--k, 1));
    }
    svg {
      display: block;
      width: 100%;
      height: auto;
      user-select: none;
      touch-action: pan-y;
      cursor: crosshair;
    }
    button.link {
      font: inherit;
      color: inherit;
      background: none;
      border: 0;
      padding: 0;
      cursor: pointer;
      text-align: inherit;
    }
  `;
  }
}
const Ne = 36e5, Jn = 9e5, wt = (r) => r;
function er(r, e, t) {
  if (!t) return yn(e, wt(r.hours));
  const n = new Map(wt(r.hours).map((s) => [Date.parse(s.ts), s])), i = [];
  for (const s of e) {
    if (s.price === null) continue;
    const a = Date.parse(s.ts);
    i.push({ ts: s.ts, ms: a, hour: ne(new Date(a)), priceEurMwh: s.price, negativeQuarters: s.price < 0 ? 4 : 0, explanation: n.get(Math.floor(a / Ne) * Ne) ?? null });
  }
  return i;
}
function tr(r, e) {
  return !e.length || !r.length ? [] : e.map((t) => {
    const n = Date.parse(t.from), i = Date.parse(t.to);
    let s = r.findIndex((l) => l.ms >= n), a = r.findIndex((l) => l.ms >= i);
    return s < 0 && (s = r.length), a < 0 && (a = r.length), { ...t, startIdx: s, endIdx: a };
  });
}
const bt = /* @__PURE__ */ new WeakMap();
function nr(r) {
  const e = b.home;
  return e ? r === "yesterday" ? e.yesterday : r === "today" ? e.today : e.tomorrow : null;
}
function he(r = b.day, e = qe) {
  const t = nr(r);
  if (!t || !t.hasPrices) return null;
  const n = b.resolution === "quarter";
  let i = bt.get(t);
  i || (i = { quarters: He(t), grids: /* @__PURE__ */ new Map() }, bt.set(t, i));
  const { quarters: s, grids: a } = i, l = (y) => {
    let m = a.get(y);
    if (!m) {
      const M = er(t, s, y);
      m = { slots: M, phases: tr(M, t.phases) }, a.set(y, m);
    }
    return m;
  }, { slots: o, phases: c } = l(n), h = n ? Jn : Ne, d = (y) => o.findIndex((m) => y >= m.ms && y < m.ms + h), u = r === "today" ? d(b.now) : -1, x = u >= 0 ? (b.now - o[u].ms) / h : 0, g = o.map((y) => e(y.priceEurMwh, y.hour)), v = g.reduce((y, m, M) => y < 0 || m < g[y] ? M : y, -1), p = b.selectedMs !== null ? d(b.selectedMs) : -1, W = u >= 0 ? u : v, S = p >= 0 ? p : W >= 0 ? W : null, T = (y) => c.find((m) => y >= m.startIdx && y < m.endIdx) ?? null;
  return {
    key: r,
    day: t,
    quarters: s,
    slots: o,
    hourly: l(!1).slots,
    phases: c,
    fine: n,
    stepMs: h,
    nowIdx: u,
    nowFraction: x,
    idx: S,
    slot: S !== null ? o[S] ?? null : null,
    phase: S !== null ? T(S) : null,
    nowPhase: u >= 0 ? T(u) : null
  };
}
function Be(r, e) {
  return r.fine ? Ht(e.ms) : Hn(e.hour);
}
const xt = { yesterday: "Gestern", today: "Heute", tomorrow: "Morgen" };
class rr extends N {
  constructor() {
    super(...arguments), this.dragging = !1, this.resizeObserver = null, this.observed = null;
  }
  static getConfigForm() {
    return {
      schema: [ke, { name: "show_verdict", selector: { boolean: {} } }, { name: "show_strip", selector: { boolean: {} } }, { name: "show_switches", selector: { boolean: {} } }, de],
      computeLabel: (e) => pe[e.name]
    };
  }
  static getStubConfig() {
    return { unit: "ct_kwh", show_verdict: !0, show_strip: !0, show_switches: !0 };
  }
  getCardSize() {
    return 8;
  }
  /** the slider's thumb is one cell wide; a thumb cannot take a percentage, so it is measured */
  updated() {
    const e = this.renderRoot.querySelector(".cells-wrap");
    e && (vt(e), e !== this.observed && (this.resizeObserver ??= new ResizeObserver((t) => t.forEach((n) => vt(n.target))), this.resizeObserver.disconnect(), this.resizeObserver.observe(e), this.observed = e));
  }
  disconnectedCallback() {
    this.resizeObserver?.disconnect(), this.observed = null, super.disconnectedCallback();
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  render() {
    const e = this.placeholder();
    if (e) return e;
    const t = b.home, n = b.day, i = he(n, this.units.map), s = this.config, a = this.header(t.date, n);
    if (!i) {
      const l = n === "tomorrow" ? "Die Preise für morgen kommen nach der Auktion, meist gegen 13 Uhr." : "Für diesen Tag liegen keine Preise vor.";
      return this.frame($`${a}<p class="muted small">${l}</p>`);
    }
    return this.frame($`
      ${a} ${s.show_verdict !== !1 ? this.verdict(i) : f} ${this.chart(i)} ${s.show_strip !== !1 ? this.strip(i) : f}
    `);
  }
  header(e, t) {
    const n = t === "yesterday" ? b.home.yesterday.date : t === "tomorrow" ? b.home.tomorrow?.date ?? sr(e) : e, i = $`<p class="kicker">${xt[t]} · ${Un(n)}</p>`;
    if (this.config.show_switches === !1) return i;
    const s = !!b.home.tomorrow;
    return $`<div class="head">
      ${i}
      <div class="switches">
        <div class="seg" role="group" aria-label="Tag">
          ${["yesterday", "today", "tomorrow"].map(
      (a) => $`<button type="button" aria-pressed=${a === t} @click=${() => b.set({ day: a })}>
                ${xt[a]}${a === "tomorrow" && s && t !== "tomorrow" ? $`<span class="dot" aria-label="Preise da"></span>` : f}
              </button>`
    )}
        </div>
        <div class="seg" role="group" aria-label="Raster">
          <button type="button" aria-pressed=${b.resolution === "hour"} @click=${() => b.set({ resolution: "hour" })}>1 h</button>
          <button type="button" aria-pressed=${b.resolution === "quarter"} @click=${() => b.set({ resolution: "quarter" })}>15 min</button>
        </div>
      </div>
    </div>`;
  }
  verdict(e) {
    const t = e.day.verdict;
    if (!t) return f;
    const n = this.units;
    let i = t.detail, s = e.day.windows, a, l = null;
    if (n.isExchange)
      a = gt(t), e.key === "tomorrow" && (l = mt(e.day, b.home.today));
    else {
      const c = yt(e.hourly, e.quarters, n.map);
      s = c.windows;
      const h = c.stats;
      i = h ? vn(h, t.vsUsual) : t.detail, a = h ? gt({ shiftSavingEur: t.flat ? null : Math.round((h.max - h.min) / 100 * 100) / 100, maxHour: h.maxHour, minHour: h.minHour }) : null;
      const d = e.key === "tomorrow" ? he("today", n.map) : null, u = d?.day.verdict ? yt(d.hourly, d.quarters, n.map) : null;
      h && u?.stats && (l = mt({ verdict: { avgEurMwh: h.avg }, windows: s }, { verdict: { avgEurMwh: u.stats.avg }, windows: u.windows }));
    }
    const o = s.find((c) => c.hours === 3) ?? s[0] ?? null;
    return $`<div class="verdict">
      <p class="headline">${t.headline}</p>
      <p class="muted small">${n.text(i)}${a ? ` ${a}` : ""}</p>
      ${l ? $`<p class="small">${n.text(l)}</p>` : f}
      ${o && !t.flat ? $`<p class="best small">
            <span class="badge">Beste ${o.hours} Stunden</span>
            <button type="button" class="link" @click=${() => b.set({ selectedMs: Date.parse(o.from) })}>
              <b>${V(o.from)}-${V(o.to)} Uhr</b>, im Schnitt ${n.shownPrice(o.avgEurMwh)}
            </button>
          </p>` : f}
    </div>`;
  }
  chart(e) {
    const t = this.units, n = En(e.slots, e.phases, { map: t.map }), i = t.unit === "eur_mwh", s = (p) => i ? String(Math.round(Number(p.replace(/\./g, "").replace(",", ".")) * 10)) : p, a = (p) => i ? p.replace(/(-?[\d.]+,\d) ct/, (W, S) => `${Math.round(Number(S.replace(/\./g, "").replace(",", ".")) * 10)} €`) : p, l = e.idx !== null ? n.slots[e.idx] : void 0, o = e.phase, c = n.bands[n.bands.length - 1], h = e.nowIdx >= 0 ? n.plot.x + (e.nowIdx + e.nowFraction) * n.slotW : null, d = h !== null && h - 64 < n.plot.x, u = (p) => {
      const S = p.currentTarget.getBoundingClientRect(), T = (p.clientX - S.left) / S.width * n.width, y = Math.floor((T - n.plot.x) / n.slotW), m = e.slots[y];
      m && y !== e.idx && b.set({ selectedMs: m.ms });
    }, x = (p) => {
      p.pointerType === "mouse" && p.button !== 0 || (this.dragging = !0, p.currentTarget.setPointerCapture(p.pointerId), u(p));
    }, g = (p) => this.dragging && u(p), v = () => this.dragging = !1;
    return $`<svg viewBox="0 0 ${n.width} ${n.height}" aria-hidden="true" @pointerdown=${x} @pointermove=${g} @pointerup=${v} @pointercancel=${v}>
      ${n.bands.map(
      (p) => A`<g opacity=${o && o.index !== p.index ? 0.45 : 1}>
          <line x1=${p.x + 1} x2=${p.x + p.w - 1} y1="24" y2="24" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
          <line x1=${p.x + 1} x2=${p.x + 1} y1="20" y2="28" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
          ${p.label ? A`<text class="ribbon" x=${p.x + 4} y="16" fill="var(--ink)" font-size="10.5" font-weight="500" letter-spacing="0.08em">${p.label.toUpperCase()}</text>` : f}
        </g>`
    )}
      ${c ? A`<line x1=${c.x + c.w - 1} x2=${c.x + c.w - 1} y1="20" y2="28" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />` : f}
      ${o ? A`<rect x=${n.plot.x + o.startIdx * n.slotW} y=${n.plot.y - 6} width=${(o.endIdx - o.startIdx) * n.slotW} height=${n.plot.h + 6} fill="var(--soft)" />` : f}
      ${n.yTicks.map(
      (p) => A`<line x1=${n.plot.x} x2=${n.plot.x + n.plot.w} y1=${p.y} y2=${p.y} stroke="var(--rule)" stroke-width="1" vector-effect="non-scaling-stroke" />
          <text x=${n.plot.x - 5} y=${p.y + 3.5} text-anchor="end" fill="var(--muted-ink)" font-size="10">${s(p.label)}</text>`
    )}
      <text x=${n.plot.x - 5} y=${n.plot.y - 9} text-anchor="end" fill="var(--muted-ink)" font-size="10">${t.axisUnit}</text>
      ${n.xTicks.map((p) => A`<text x=${p.x} y=${n.plot.y + n.plot.h + 14} text-anchor=${p.anchor} fill="var(--muted-ink)" font-size="10">${p.label}</text>`)}
      <text x=${n.plot.x + n.plot.w} y=${n.plot.y + n.plot.h + 27} text-anchor="end" fill="var(--muted-ink)" font-size="10">Uhr</text>
      ${l ? A`<rect x=${l.x} y=${n.plot.y - 6} width=${l.w} height=${n.plot.h + 6} fill="var(--hl)" opacity="0.38" />` : f}
      ${n.areaPath ? A`<path d=${n.areaPath} fill="var(--soft)" stroke="none" />` : f}
      ${n.zeroY !== null ? A`<line x1=${n.plot.x} x2=${n.plot.x + n.plot.w} y1=${n.zeroY} y2=${n.zeroY} stroke="var(--ink)" stroke-width="1" opacity="0.5" vector-effect="non-scaling-stroke" />` : f}
      ${n.linePath ? A`<path d=${n.linePath} fill="none" stroke="var(--ink)" stroke-width="1.75" stroke-linejoin="round" vector-effect="non-scaling-stroke" />` : f}
      ${h !== null ? A`<line x1=${h} x2=${h} y1=${n.plot.y - 6} y2=${n.plot.y + n.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />
          <text x=${d ? h + 4 : h - 4} y=${n.plot.y + 2} text-anchor=${d ? "start" : "end"} fill="var(--ink)" font-size="10" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">jetzt ${V(b.now)}</text>` : f}
      ${n.labels.map((p) => A`<text class="anno" x=${p.x} y=${p.y} text-anchor=${p.anchor} fill="var(--ink)" font-size="11" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">${a(p.text)}</text>`)}
      ${l ? A`<circle cx=${l.x + l.w / 2} cy=${l.y} r="3.5" fill="var(--ink)" stroke="var(--halo)" stroke-width="2" vector-effect="non-scaling-stroke" />` : f}
    </svg>`;
  }
  strip(e) {
    const t = this.units, n = e.slots.length, i = e.slot, s = e.fine ? 1 : 2, a = (l) => {
      const o = Number(l.target.value), c = e.slots[o];
      c && b.set({ selectedMs: c.ms });
    };
    return $`<div class="strip">
      <div class="readout small">
        <span class="when"
          >${i ? Be(e, i) : ""}${e.phase ? $`<span class="muted"> · ${e.phase.name}</span>` : f}
          ${e.idx !== null && e.idx === e.nowIdx ? $`<span class="badge">jetzt</span>` : f}</span
        >
        <b>${i ? t.price(i.priceEurMwh, i.hour) : ""}</b>
      </div>
      <div class="cells-wrap" data-count=${n}>
        <div class="cells" style="gap: ${s}px">
          ${e.slots.map(
      (l, o) => $`<span class="cell ${l.priceEurMwh < 0 ? "hatch" : ""}" style="background-color: var(--lvl-${ce(l.priceEurMwh)}); opacity: ${o === e.idx ? 1 : 0.85}"></span>`
    )}
        </div>
        <input
          class="range ${e.fine ? "fine" : ""}"
          type="range"
          min="0"
          max=${Math.max(0, n - 1)}
          step="1"
          .value=${String(e.idx ?? 0)}
          aria-label="Zeit"
          aria-valuetext=${i ? `${Be(e, i)}, ${t.price(i.priceEurMwh, i.hour)}` : ""}
          @input=${a}
        />
      </div>
      <div class="ticks" aria-hidden="true">
        ${e.phases.slice(1).map((l) => $`<span class="phase-tick" style="left: ${l.startIdx / n * 100}%"></span>`)}
        ${e.nowIdx >= 0 ? $`<span class="now-tick" style="left: calc(${(e.nowIdx + 0.5) / n * 100}% - 1px)"></span>` : f}
      </div>
    </div>`;
  }
  static {
    this.styles = [
      N.styles,
      te`
      .head {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: space-between;
        gap: 8px;
      }
      .switches {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .verdict > * + * {
        margin-top: 6px;
      }
      .headline {
        font-size: 1.6rem;
        font-weight: 700;
        line-height: 1.1;
        letter-spacing: -0.005em;
      }
      .best {
        display: flex;
        flex-wrap: wrap;
        align-items: baseline;
        gap: 4px 8px;
        border-top: 1px solid var(--rule);
        border-bottom: 1px solid var(--rule);
        padding: 8px 0;
      }
      .readout {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
        padding: 0 2px;
      }
      .when {
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .cells-wrap {
        position: relative;
        height: 24px;
        margin-top: 4px;
      }
      .cells {
        position: absolute;
        inset: 0;
        display: flex;
      }
      .cell {
        flex: 1;
        min-width: 0;
        border-radius: 1px;
      }
      .range {
        -webkit-appearance: none;
        appearance: none;
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        margin: 0;
        background: transparent;
        cursor: pointer;
        touch-action: pan-y;
      }
      .range::-webkit-slider-runnable-track {
        height: 100%;
        background: transparent;
        border: 0;
      }
      .range::-moz-range-track {
        height: 100%;
        background: transparent;
        border: 0;
      }
      .range::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: var(--bar);
        height: 24px;
        border-radius: 2px;
        border: 2px solid var(--ink);
        background: transparent;
        box-sizing: border-box;
      }
      .range::-moz-range-thumb {
        width: var(--bar);
        height: 24px;
        border-radius: 2px;
        border: 2px solid var(--ink);
        background: transparent;
        box-sizing: border-box;
      }
      .range.fine::-webkit-slider-thumb {
        border: 0;
        border-radius: 1px;
        background: var(--ink);
      }
      .range.fine::-moz-range-thumb {
        border: 0;
        border-radius: 1px;
        background: var(--ink);
      }
      .ticks {
        position: relative;
        height: 8px;
        margin-top: 0 !important;
      }
      .phase-tick {
        position: absolute;
        top: 0;
        height: 8px;
        border-left: 1px solid color-mix(in srgb, var(--ink) 60%, transparent);
      }
      .now-tick {
        position: absolute;
        top: 0;
        height: 8px;
        width: 2px;
        background: var(--hl);
      }
    `
    ];
  }
}
function yt(r, e, t) {
  return { stats: Ot(r, t), windows: Ke(Xe(e, t)) };
}
function vt(r) {
  const e = Math.max(1, Number(r.dataset.count));
  r.style.setProperty("--bar", `${r.clientWidth / e}px`);
}
function sr(r) {
  const e = /* @__PURE__ */ new Date(`${r}T12:00:00Z`);
  return e.setUTCDate(e.getUTCDate() + 1), e.toISOString().slice(0, 10);
}
class ir extends N {
  static {
    this.properties = { ...N.properties, open: { state: !0 } };
  }
  static getConfigForm() {
    return { schema: [ke, de], computeLabel: (e) => pe[e.name] };
  }
  static getStubConfig() {
    return { unit: "ct_kwh" };
  }
  getCardSize() {
    return 5;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  render() {
    const e = this.placeholder();
    if (e) return e;
    const t = this.units, n = he(void 0, t.map), i = n?.slot ?? null, s = i?.explanation ?? null;
    if (!n || !i) return this.frame($`<p class="muted small">Für diesen Tag liegen keine Preise vor.</p>`);
    const a = `${Be(n, i)}${n.phase ? ` · ${n.phase.name}` : ""}`;
    if (!s)
      return this.frame($`<p class="kicker">${a}</p>
        <p class="price">${t.price(i.priceEurMwh, i.hour)}</p>
        <p class="muted small">Für diese Stunde gibt es noch keine Erklärung. Sie folgt, sobald Erzeugungsdaten oder Prognosen da sind, meist am Abend.</p>`);
    const l = this.open?.ts === s.ts ? this.open.key : null, o = s.facts, c = o.drivers.filter((u) => u.direction !== "info"), h = c.find((u) => u.key === l) ?? null, d = t.isExchange ? o.priceVsMedianFactor : or(s, t.map);
    return this.frame($`
      <p class="kicker">${a}${s.basedOnActuals ? "" : " · Prognose"}</p>
      <div class="top">
        <span class="price">${t.price(i.priceEurMwh, i.hour)}</span>
        ${d != null ? $`<span class="small muted"><b class="ink">${Nn(d)}</b> wie sonst zu dieser Stunde</span>` : f}
      </div>
      <h3>${s.headline}</h3>
      <p class="text">${t.text(Fn(s.text))}</p>
      ${c.length ? $`<div class="chips">
            ${c.map(
      (u) => $`<button type="button" class="chip ${u.direction} ${u.key === l ? "open" : ""}" aria-expanded=${u.key === l} @click=${() => this.open = u.key === l ? null : { ts: s.ts, key: u.key }}>
                  ${u.direction === "up" ? "▲" : "▼"} ${u.label}
                </button>`
    )}
          </div>
          ${h ? $`<p class="detail small">${t.text(h.detail)}</p>` : f}` : f}
      <p class="facts note">
        ${o.windMw != null ? $`<span>Wind <b class="ink">${fe(o.windMw)}</b>${o.windMedian30dMw != null ? ` (üblich ${fe(o.windMedian30dMw)})` : ""}</span>` : f}
        ${o.solarMw != null ? $`<span>Sonne <b class="ink">${fe(o.solarMw)}</b></span>` : f}
        ${o.residualMw != null ? $`<span>Restnachfrage <b class="ink">${fe(o.residualMw)}</b>${o.residualMedian30dMw != null ? ` (üblich ${fe(o.residualMedian30dMw)})` : ""}</span>` : f}
        <span>Preissetzer <b class="ink">${s.priceSetterLabel}</b> (Schätzung)</span>
      </p>
    `);
  }
  static {
    this.styles = [
      N.styles,
      te`
      .top {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-end;
        gap: 4px 12px;
      }
      .price {
        font-size: 2.2rem;
        font-weight: 700;
        line-height: 1;
      }
      .ink {
        color: var(--ink);
        font-weight: 600;
      }
      h3 {
        margin: 0;
        font-size: 1.15rem;
        font-weight: 600;
        line-height: 1.3;
      }
      .text {
        line-height: 1.55;
        font-size: 0.95rem;
      }
      .chips {
        display: flex;
        flex-wrap: wrap;
        gap: 6px;
      }
      .chip {
        font: inherit;
        font-size: 0.8125rem;
        color: #15181c;
        border: 0;
        border-radius: 999px;
        padding: 4px 10px;
        cursor: pointer;
      }
      .chip.up {
        background: var(--lvl-teuer);
      }
      .chip.down {
        background: var(--lvl-guenstig);
      }
      :host([dark]) .chip {
        color: #e9ebe8;
      }
      .chip.open {
        outline: 2px solid color-mix(in srgb, var(--ink) 50%, transparent);
        outline-offset: 1px;
      }
      .detail {
        background: var(--soft);
        border-radius: 8px;
        padding: 8px 12px;
      }
      .facts {
        display: flex;
        flex-wrap: wrap;
        gap: 4px 16px;
      }
    `
    ];
  }
}
function or(r, e) {
  const t = r.facts.priceVsMedianFactor, n = r.facts.priceMedian30dEurMwh ?? (t != null && Math.abs(t) >= 0.1 ? r.priceEurMwh / t : null);
  if (n === null || n <= 5) return null;
  const i = e(n, r.hour);
  return i > 5 ? e(r.priceEurMwh, r.hour) / i : null;
}
const ar = {
  wind: "var(--src-wind)",
  solar: "var(--src-solar)",
  bio: "var(--src-bio)",
  coal: "var(--src-coal)",
  gas: "url(#gas-hatch)",
  other: "var(--src-other)",
  forecastRest: "var(--src-other)"
}, kt = (r) => `${Ye(r / 1e3)} GW`;
class lr extends N {
  constructor() {
    super(...arguments), this.dragging = !1, this.cache = null;
  }
  static getConfigForm() {
    return { schema: [de], computeLabel: (e) => pe[e.name] };
  }
  static getStubConfig() {
    return {};
  }
  getCardSize() {
    return 5;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  render() {
    const e = this.placeholder();
    if (e) return e;
    const t = he(), n = b.day === "yesterday" ? "Woher der Strom kam" : "Woher der Strom kommt";
    if (!t) return this.frame($`<p class="muted small">Für diesen Tag liegen keine Daten vor.</p>`, n);
    this.cache?.quarters !== t.quarters && (this.cache = { quarters: t.quarters, mq: Pn(t.quarters) });
    const i = this.cache.mq, s = Ct(t.day.date), a = s.start.getTime(), l = s.end.getTime(), o = Dn(i, a, l);
    if (!o.hasData)
      return this.frame($`<p class="muted small">Die Erzeugung erscheint hier, sobald die Prognosen für Wind, Sonne und Erzeugung veröffentlicht sind, meist am Abend.</p>`, n);
    const c = t.phase, h = $t(i, c ? Date.parse(c.from) : a, c ? Date.parse(c.to) : l);
    let d = "";
    if (h.renewableShare !== null) {
      const m = c ? `${c.name}, ${Wt(c)}` : "Ganzer Tag", M = Ye(h.renewableShare * 100), C = h.renewableShare > 1.005;
      d = h.forecast ? `${m}: laut Prognose ${C ? `mehr Wind und Sonne als Erzeugungsbedarf (${M} %)` : `${M} % aus Wind und Sonne`}` : `${m}: ${C ? `mehr Ökostrom als Verbrauch (${M} %)` : `${M} % erneuerbar`}${h.gasMaxMw !== null && h.gasMaxMw >= 500 ? `, Gas bis ${kt(h.gasMaxMw)}` : ""}`;
    }
    const u = Math.max(1, t.slots.length), x = o.plot.w / u;
    let g = null;
    if (t.slot && t.idx !== null) {
      const m = $t(i, t.slot.ms, t.slot.ms + t.stepMs);
      if (m.windMw !== null && m.solarMw !== null && m.residualMw !== null && m.residualMw > 0) {
        const M = o.plot.x + (t.idx + 0.5) / u * o.plot.w, C = o.yOf(m.windMw + m.solarMw), F = o.yOf(m.windMw + m.solarMw + m.residualMw), j = `Rest ${kt(m.residualMw)}`, G = M + 6 + j.length * 5.6 < o.plot.x + o.plot.w;
        C - F >= 8 && (g = { x: M, y0: F, y1: C, text: j, tx: G ? M + 6 : M - 6, anchor: G ? "start" : "end" });
      }
    }
    const v = b.day === "today" && b.now >= a && b.now < l ? o.xOf(b.now) : null, p = (m) => {
      const C = m.currentTarget.getBoundingClientRect(), F = (m.clientX - C.left) / C.width * o.width, j = Math.floor((F - o.plot.x) / o.plot.w * u), G = t.slots[j];
      G && j !== t.idx && b.set({ selectedMs: G.ms });
    }, W = (m) => {
      m.pointerType === "mouse" && m.button !== 0 || (this.dragging = !0, m.currentTarget.setPointerCapture(m.pointerId), p(m));
    }, S = (m) => this.dragging && p(m), T = () => this.dragging = !1, y = (m, M, C, F = "middle") => A`<text x=${m} y=${M} text-anchor=${F} fill="var(--ink)" font-size="10" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">${C}</text>`;
    return this.frame(
      $`<p class="small line">${d}</p>
        <svg viewBox="0 0 ${o.width} ${o.height}" aria-hidden="true" @pointerdown=${W} @pointermove=${S} @pointerup=${T} @pointercancel=${T}>
          <defs>
            <pattern id="gas-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="4" height="4" fill="var(--src-gas)" />
              <rect width="1" height="4" fill="var(--src-gas-hatch)" />
            </pattern>
          </defs>
          ${c ? A`<rect x=${o.plot.x + c.startIdx * x} y=${o.plot.y} width=${(c.endIdx - c.startIdx) * x} height=${o.plot.h} fill="var(--soft)" />` : f}
          ${o.yTicks.map(
        (m) => A`<line x1=${o.plot.x} x2=${o.plot.x + o.plot.w} y1=${m.y} y2=${m.y} stroke="var(--rule)" stroke-width="1" vector-effect="non-scaling-stroke" />
              <text x=${o.plot.x - 5} y=${m.y + 3.5} text-anchor="end" fill="var(--muted-ink)" font-size="10">${m.label}</text>`
      )}
          <text x=${o.plot.x - 5} y=${o.plot.y - 8} text-anchor="end" fill="var(--muted-ink)" font-size="10">GW</text>
          ${o.layers.map((m) => A`<path d=${m.path} fill=${ar[m.key]} />`)}
          ${o.forecastX !== null ? A`<rect x=${o.forecastX} y=${o.plot.y} width=${o.plot.x + o.plot.w - o.forecastX} height=${o.plot.h} fill="var(--halo)" opacity="0.45" />
              <line x1=${o.forecastX} x2=${o.forecastX} y1=${o.plot.y - 4} y2=${o.plot.y + o.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />
              <text x=${o.forecastX + 4} y=${o.plot.y - 6} fill="var(--muted-ink)" font-size="10">Prognose</text>` : f}
          ${t.idx !== null ? A`<rect x=${o.plot.x + t.idx * x} y=${o.plot.y} width=${x} height=${o.plot.h} fill="var(--hl)" opacity="0.38" />` : f}
          ${o.loadPath ? A`<path d=${o.loadPath} fill="none" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />` : f}
          ${o.forecastLoadPath ? A`<path d=${o.forecastLoadPath} fill="none" stroke="var(--ink)" stroke-width="1.25" stroke-dasharray="3 2" vector-effect="non-scaling-stroke" />` : f}
          ${v !== null ? A`<line x1=${v} x2=${v} y1=${o.plot.y} y2=${o.plot.y + o.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />` : f}
          ${o.labels.map((m) => y(m.x, m.y, m.text))} ${o.loadLabel ? y(o.loadLabel.x, o.loadLabel.y, o.loadLabel.text, "start") : f}
          ${g ? A`<line x1=${g.x} x2=${g.x} y1=${g.y0} y2=${g.y1} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              <line x1=${g.x - 3} x2=${g.x + 3} y1=${g.y0} y2=${g.y0} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              <line x1=${g.x - 3} x2=${g.x + 3} y1=${g.y1} y2=${g.y1} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              ${y(g.tx, (g.y0 + g.y1) / 2 + 3.5, g.text, g.anchor)}` : f}
          ${o.xTicks.map((m) => A`<text x=${m.x} y=${o.plot.y + o.plot.h + 14} text-anchor=${m.anchor} fill="var(--muted-ink)" font-size="10">${m.label}</text>`)}
        </svg>
        <p class="note">
          ${o.allForecast ? "Noch keine Messwerte: Wind, Sonne und die übrige Erzeugung sind Prognosen, die gestrichelte Linie die erwartete Gesamterzeugung." : "Erzeugung in GW: unten Wind und Sonne, darüber Bio, Kohle und Gas (schraffiert). Die Linie ist der Verbrauch; der Abstand zwischen Sonne und Linie ist die Restnachfrage."}
          ${o.forecastX !== null ? " Heller: Prognose." : ""}
        </p>`,
      n
    );
  }
  static {
    this.styles = [
      N.styles,
      te`
      .line {
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        min-height: 1.25em;
      }
    `
    ];
  }
}
const Ee = 9e5, Ae = 36e5;
class cr extends N {
  constructor() {
    super(...arguments), this.cache = null;
  }
  static getConfigForm() {
    return { schema: [ke, { name: "show_strip", selector: { boolean: {} } }, de], computeLabel: (e) => pe[e.name] };
  }
  static getStubConfig() {
    return { unit: "ct_kwh", show_strip: !0 };
  }
  getCardSize() {
    return 3;
  }
  getGridOptions() {
    return { columns: 6, min_columns: 3 };
  }
  render() {
    const e = this.placeholder();
    if (e) return e;
    const t = b.home;
    (this.cache?.today !== t.today || this.cache?.tomorrow !== t.tomorrow) && (this.cache = { today: t.today, tomorrow: t.tomorrow, quarters: [...He(t.today), ...t.tomorrow ? He(t.tomorrow) : []] });
    const n = this.cache.quarters, i = b.now, s = n.find((g) => g.price !== null && i >= Date.parse(g.ts) && i < Date.parse(g.ts) + Ee), a = this.units;
    if (!s || s.price === null) return this.frame($`<p class="muted small">Noch keine Preise für jetzt.</p>`, "Strompreis");
    const l = Math.floor(i / Ee) * Ee, o = n.filter((g) => Date.parse(g.ts) >= l), [c] = Ke(a.isExchange ? o : Xe(o, a.map), [3]), h = ce(s.price), d = t.tomorrow ? Date.parse(t.tomorrow.start) : 1 / 0, u = [], x = Date.parse(t.today.start) + t.today.slots * Ee;
    for (let g = Math.floor(i / Ae) * Ae; g < x; g += Ae) {
      const v = n.filter((p) => p.price !== null && Date.parse(p.ts) >= g && Date.parse(p.ts) < g + Ae);
      v.length && u.push({ ms: g, price: v.reduce((p, W) => p + W.price, 0) / v.length });
    }
    return this.frame($`
      <div class="top">
        <span class="kicker">${Ht(s.ts)}</span>
        <span class="level" style="--c: var(--lvl-${h})"><span class="swatch ${h === "negativ" ? "hatch" : ""}"></span>${Yn[h]}</span>
      </div>
      <p class="price">${a.price(s.price, s.ts)}</p>
      ${this.config.show_strip !== !1 && u.length > 1 ? $`<div class="strip" aria-hidden="true">
              ${u.map((g, v) => $`<span class="cell ${g.price < 0 ? "hatch" : ""} ${v === 0 ? "now" : ""}" style="background: var(--lvl-${ce(g.price)})"></span>`)}
            </div>
            <div class="axis note"><span>jetzt</span><span>24 Uhr</span></div>` : f}
      ${c ? $`<p class="small">
            Günstigste 3 Stunden ab jetzt: <b>${Date.parse(c.from) >= d ? "morgen " : ""}${V(c.from)}-${V(c.to)} Uhr</b>, im Schnitt
            ${a.shownPrice(c.avgEurMwh)}
          </p>` : f}
    `);
  }
  static {
    this.styles = [
      N.styles,
      te`
      .top {
        display: flex;
        justify-content: space-between;
        align-items: baseline;
        gap: 8px;
      }
      .card > .price {
        margin-top: 4px;
      }
      .price {
        font-size: 2rem;
        font-weight: 700;
        line-height: 1.1;
      }
      .level {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        font-size: 0.8125rem;
      }
      .swatch {
        width: 12px;
        height: 12px;
        border-radius: 2px;
        background: var(--c);
      }
      .strip {
        display: flex;
        gap: 2px;
        height: 16px;
      }
      .cell {
        flex: 1;
        min-width: 0;
        border-radius: 1px;
        opacity: 0.85;
      }
      .cell.now {
        opacity: 1;
        outline: 2px solid var(--ink);
        outline-offset: -2px;
      }
      .axis {
        display: flex;
        justify-content: space-between;
        margin-top: 2px !important;
      }
    `
    ];
  }
}
const hr = ["", "einer Phase", "zwei Phasen", "drei Phasen", "vier Phasen", "fünf Phasen"];
class ur extends N {
  static getConfigForm() {
    return { schema: [ke, de], computeLabel: (e) => pe[e.name] };
  }
  static getStubConfig() {
    return { unit: "ct_kwh" };
  }
  getCardSize() {
    return 6;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  render() {
    const e = this.placeholder();
    if (e) return e;
    const t = he(void 0, this.units.map);
    if (!t || !t.phases.length) return this.frame($`<p class="muted small">Noch keine Phasen für diesen Tag.</p>`, "Der Tag in Phasen");
    const n = this.units, i = t.phases.some((s) => s.text === null);
    return this.frame(
      $`${i ? $`<p class="note">Die Erklärungen folgen, sobald Erzeugungsdaten oder Prognosen da sind.</p>` : f}
        <ol>
          ${t.phases.map((s) => {
        const a = t.phase?.index === s.index;
        let l, o, c = Date.parse(s.keyTs);
        const h = Date.parse(s.from), d = Date.parse(s.to), u = n.isExchange ? null : Ot(t.hourly.filter((g) => g.ms >= h && g.ms < d), n.map);
        if (!u)
          l = s.minEurMwh === s.maxEurMwh ? n.price(s.minEurMwh, s.keyHour) : `${n.number(s.minEurMwh, s.fromHour)} bis ${n.number(s.maxEurMwh, s.keyHour)} ${n.suffix}`, o = s.level === "high" ? `Am teuersten um ${s.keyHour} Uhr: ${n.price(s.maxEurMwh, s.keyHour)}` : s.level === "low" ? `Am günstigsten um ${s.keyHour} Uhr: ${n.price(s.minEurMwh, s.keyHour)}` : `Im Schnitt ${n.price(s.avgEurMwh, s.fromHour)}`;
        else {
          l = u.min === u.max ? n.shownPrice(u.min) : `${n.shownNumber(u.min)} bis ${n.shownNumber(u.max)} ${n.suffix}`, o = s.level === "high" ? `Am teuersten um ${u.maxHour} Uhr: ${n.shownPrice(u.max)}` : s.level === "low" ? `Am günstigsten um ${u.minHour} Uhr: ${n.shownPrice(u.min)}` : `Im Schnitt ${n.shownPrice(u.avg)}`;
          const g = s.level === "high" ? u.maxHour : s.level === "low" ? u.minHour : null, v = g !== null ? t.hourly.find((p) => p.ms >= h && p.ms < d && p.hour === g) : void 0;
          v && (c = v.ms);
        }
        const x = s.text ? u ? n.text(s.text, () => u.avg) : n.text(s.text) : null;
        return $`<li class=${a ? "active" : ""}>
              <button type="button" class="row link" aria-pressed=${a} @click=${() => b.set({ selectedMs: c })}>
                <span class="bar" style="background: var(--lvl-${ce(s.avgEurMwh)})"></span>
                <span class="name">
                  <span class="title">${s.name}${t.nowPhase?.index === s.index ? $` <span class="badge">jetzt</span>` : f}</span>
                  <span class="note">${Wt(s)}${s.forecast ? " · Prognose" : ""}</span>
                </span>
                <span class="range small">${l}</span>
              </button>
              <div class="body">
                ${x ? $`<p>${x}</p>` : f}
                <p class="key small muted">${o}</p>
              </div>
            </li>`;
      })}
        </ol>`,
      `Der Tag in ${hr[t.phases.length] ?? `${t.phases.length} Phasen`}`
    );
  }
  static {
    this.styles = [
      N.styles,
      te`
      ol {
        list-style: none;
        margin: 8px 0 0;
        padding: 0;
        border-top: 1px solid var(--rule);
      }
      li {
        border-bottom: 1px solid var(--rule);
        border-left: 3px solid transparent;
      }
      li.active {
        border-left-color: var(--ink);
        background: var(--tint);
      }
      .row {
        width: 100%;
        display: grid;
        grid-template-columns: auto 1fr auto;
        gap: 0 10px;
        align-items: center;
        padding: 10px 8px 4px;
      }
      .bar {
        width: 6px;
        height: 32px;
        border-radius: 2px;
      }
      .name {
        min-width: 0;
        display: flex;
        flex-direction: column;
      }
      .title {
        font-size: 1.05rem;
        font-weight: 600;
        line-height: 1.2;
      }
      .range {
        text-align: right;
      }
      .body {
        padding: 0 8px 8px 24px;
        font-size: 0.9rem;
        line-height: 1.5;
      }
      .key {
        margin-top: 4px;
      }
    `
    ];
  }
}
const dr = 36e5, pr = 9e5;
class mr extends N {
  static getConfigForm() {
    return { schema: [ke, de], computeLabel: (e) => pe[e.name] };
  }
  static getStubConfig() {
    return { unit: "ct_kwh" };
  }
  getCardSize() {
    return 6;
  }
  getGridOptions() {
    return { columns: 12, min_columns: 6 };
  }
  render() {
    const e = this.placeholder();
    if (e) return e;
    const t = b.home, n = this.units, i = (a) => a === t.date ? "today" : a === t.yesterday.date ? "yesterday" : a === t.tomorrow?.date ? "tomorrow" : null, s = b.home ? b.day === "today" ? t.date : b.day === "yesterday" ? t.yesterday.date : t.tomorrow?.date : null;
    return this.frame(
      $`<div class="grid axis">
          <span></span>
          <div class="hours note">${[0, 6, 12, 18].map((a) => $`<span style="left: ${a / 24 * 100}%">${a}</span>`)}<span class="end">24 Uhr</span></div>
          <span class="note right">beste 3 h</span>
        </div>
        <ol>
          ${t.week.map((a) => {
        const l = i(a.date), o = l === "today" ? "Heute" : l === "tomorrow" ? "Morgen" : Rn(a.date), c = Math.max(1, a.hourly.length), h = Ct(a.date).start.getTime(), d = gr(a, l, n), u = d ? { left: (Date.parse(d.from) - h) / dr / c * 100, width: d.hours / c * 100 } : null, x = a.hourly.some((v) => v !== null), g = $`<span class="day ${a.date === s ? "current" : ""}">${o}</span>
              <span class="cells-wrap">
                <span class="cells">
                  ${a.hourly.map((v) => $`<span class="cell ${v !== null && v < 0 ? "hatch" : ""}" style="background: ${v === null ? "var(--soft)" : `var(--lvl-${ce(v)})`}"></span>`)}
                </span>
                ${u ? $`<span class="frame" style="left: ${u.left}%; width: ${u.width}%"></span>` : f}
              </span>
              <span class="small right">
                ${d ? $`${V(d.from)}-${V(d.to)} · ${n.shownNumber(d.avgEurMwh)} ${n.unit === "eur_mwh" ? "€/MWh" : "ct"}` : x ? "" : $`<span class="muted">noch keine Preise</span>`}
              </span>`;
        return $`<li class=${a.date === s ? "current" : ""}>
              ${l ? $`<button type="button" class="grid link" title="Diesen Tag in den anderen Karten zeigen" @click=${() => b.set({ day: l })}>${g}</button>` : $`<div class="grid">${g}</div>`}
            </li>`;
      })}
        </ol>
        <p class="note">Farben wie im Preisstreifen; der Rahmen markiert die günstigsten drei Stunden des Tages.</p>`,
      "Diese Woche"
    );
  }
  static {
    this.styles = [
      N.styles,
      te`
      .grid {
        width: 100%;
        display: grid;
        grid-template-columns: 4.5rem 1fr minmax(6.5rem, auto);
        gap: 0 8px;
        align-items: center;
      }
      .axis {
        align-items: end;
      }
      .hours {
        position: relative;
        height: 16px;
      }
      .hours span {
        position: absolute;
        transform: translateX(-50%);
      }
      .hours .end {
        right: 0;
        transform: none;
      }
      .right {
        text-align: right;
        white-space: nowrap;
      }
      ol {
        list-style: none;
        margin: 0;
        padding: 0;
        border-top: 1px solid var(--rule);
      }
      li {
        border-bottom: 1px solid var(--rule);
      }
      li .grid {
        min-height: 36px;
        padding: 4px 2px;
      }
      li.current {
        background: var(--tint);
      }
      .day {
        font-size: 0.875rem;
      }
      .day.current {
        font-weight: 600;
      }
      .cells-wrap {
        position: relative;
        display: block;
        height: 20px;
      }
      .cells {
        position: absolute;
        inset: 0;
        display: flex;
        gap: 1px;
      }
      .cell {
        flex: 1;
        min-width: 0;
        border-radius: 1px;
      }
      .frame {
        position: absolute;
        top: -2px;
        bottom: -2px;
        border: 2px solid var(--ink);
        border-radius: 2px;
        pointer-events: none;
        box-sizing: border-box;
      }
    `
    ];
  }
}
function gr(r, e, t) {
  if (t.isExchange) return r.window;
  const n = e ? he(e, t.map) : null;
  if (n) return Ke(Xe(n.quarters, t.map), [3])[0] ?? null;
  const i = r.window;
  if (!i) return null;
  let s = 0, a = 0;
  for (let l = Date.parse(i.from); l < Date.parse(i.to); l += pr, a++) s += t.map(i.avgEurMwh, ne(new Date(l)));
  return { ...i, avgEurMwh: a ? s / a : t.shown(i.avgEurMwh) };
}
const Bt = [
  { type: "strompreis-now-card", element: cr, name: "Strompreis jetzt", description: "Preis der laufenden Viertelstunde, Preisstufe und die günstigsten 3 Stunden ab jetzt." },
  { type: "strompreis-day-card", element: rr, name: "Strompreis Tag", description: "Tagesbild, Preisverlauf mit Phasen und Preisstreifen für gestern, heute und morgen." },
  { type: "strompreis-phases-card", element: ur, name: "Strompreis Phasen", description: "Der Tag in Phasen, mit Erklärung zu jeder Phase." },
  { type: "strompreis-mix-card", element: lr, name: "Strompreis Woher der Strom kommt", description: "Erzeugung aus Wind, Sonne, Kohle und Gas, der Verbrauch und die Restnachfrage." },
  { type: "strompreis-hour-card", element: ir, name: "Strompreis Stunde im Detail", description: "Warum der Preis in der gewählten Stunde so ist." },
  { type: "strompreis-week-card", element: mr, name: "Strompreis Woche", description: "Die letzten sieben Tage, heute und morgen mit den günstigsten 3 Stunden." }
];
function Ft() {
  for (const r of Bt)
    if (!window.customElements.get(r.type))
      try {
        window.customElements.define(r.type, r.element);
      } catch (e) {
        console.warn(`strompreis-verstehen: ${r.type} could not be registered`, e);
      }
}
window.customCards ??= [];
for (const r of Bt)
  window.customCards.some((e) => e.type === r.type) || window.customCards.push({ type: r.type, name: r.name, description: r.description, preview: !0, documentationURL: "https://github.com/ehrma/ha-strompreis-verstehen" });
Ft();
let St = window.customElements;
const fr = Date.now(), $r = setInterval(() => {
  window.customElements !== St && (St = window.customElements, Ft()), Date.now() - fr > 6e4 && clearInterval($r);
}, 50);
console.info("%c STROMPREIS-VERSTEHEN %c cards loaded ", "background:#f5c518;color:#15181c;font-weight:600", "");
