const Se = globalThis, Ne = Se.ShadowRoot && (Se.ShadyCSS === void 0 || Se.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, Fe = /* @__PURE__ */ Symbol(), Ze = /* @__PURE__ */ new WeakMap();
let $t = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== Fe) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ne && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = Ze.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && Ze.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Pt = (s) => new $t(typeof s == "string" ? s : s + "", void 0, Fe), ee = (s, ...e) => {
  const t = s.length === 1 ? s[0] : e.reduce((n, o, r) => n + ((i) => {
    if (i._$cssResult$ === !0) return i.cssText;
    if (typeof i == "number") return i;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + i + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(o) + s[r + 1], s[0]);
  return new $t(t, s, Fe);
}, Tt = (s, e) => {
  if (Ne) s.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), o = Se.litNonce;
    o !== void 0 && n.setAttribute("nonce", o), n.textContent = t.cssText, s.appendChild(n);
  }
}, Ke = Ne ? (s) => s : (s) => s instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return Pt(t);
})(s) : s;
const { is: zt, defineProperty: Ot, getOwnPropertyDescriptor: Ut, getOwnPropertyNames: Rt, getOwnPropertySymbols: Wt, getPrototypeOf: Lt } = Object, Ae = globalThis, Xe = Ae.trustedTypes, It = Xe ? Xe.emptyScript : "", Ht = Ae.reactiveElementPolyfillSupport, pe = (s, e) => s, Re = { toAttribute(s, e) {
  switch (e) {
    case Boolean:
      s = s ? It : null;
      break;
    case Object:
    case Array:
      s = s == null ? s : JSON.stringify(s);
  }
  return s;
}, fromAttribute(s, e) {
  let t = s;
  switch (e) {
    case Boolean:
      t = s !== null;
      break;
    case Number:
      t = s === null ? null : Number(s);
      break;
    case Object:
    case Array:
      try {
        t = JSON.parse(s);
      } catch {
        t = null;
      }
  }
  return t;
} }, wt = (s, e) => !zt(s, e), Ye = { attribute: !0, type: String, converter: Re, reflect: !1, useDefault: !1, hasChanged: wt };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ae.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let se = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = Ye) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), o = this.getPropertyDescriptor(e, n, t);
      o !== void 0 && Ot(this.prototype, e, o);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: o, set: r } = Ut(this.prototype, e) ?? { get() {
      return this[t];
    }, set(i) {
      this[t] = i;
    } };
    return { get: o, set(i) {
      const l = o?.call(this);
      r?.call(this, i), this.requestUpdate(e, l, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? Ye;
  }
  static _$Ei() {
    if (this.hasOwnProperty(pe("elementProperties"))) return;
    const e = Lt(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(pe("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(pe("properties"))) {
      const t = this.properties, n = [...Rt(t), ...Wt(t)];
      for (const o of n) this.createProperty(o, t[o]);
    }
    const e = this[Symbol.metadata];
    if (e !== null) {
      const t = litPropertyMetadata.get(e);
      if (t !== void 0) for (const [n, o] of t) this.elementProperties.set(n, o);
    }
    this._$Eh = /* @__PURE__ */ new Map();
    for (const [t, n] of this.elementProperties) {
      const o = this._$Eu(t, n);
      o !== void 0 && this._$Eh.set(o, t);
    }
    this.elementStyles = this.finalizeStyles(this.styles);
  }
  static finalizeStyles(e) {
    const t = [];
    if (Array.isArray(e)) {
      const n = new Set(e.flat(1 / 0).reverse());
      for (const o of n) t.unshift(Ke(o));
    } else e !== void 0 && t.push(Ke(e));
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
    return Tt(e, this.constructor.elementStyles), e;
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
    const n = this.constructor.elementProperties.get(e), o = this.constructor._$Eu(e, n);
    if (o !== void 0 && n.reflect === !0) {
      const r = (n.converter?.toAttribute !== void 0 ? n.converter : Re).toAttribute(t, n.type);
      this._$Em = e, r == null ? this.removeAttribute(o) : this.setAttribute(o, r), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const n = this.constructor, o = n._$Eh.get(e);
    if (o !== void 0 && this._$Em !== o) {
      const r = n.getPropertyOptions(o), i = typeof r.converter == "function" ? { fromAttribute: r.converter } : r.converter?.fromAttribute !== void 0 ? r.converter : Re;
      this._$Em = o;
      const l = i.fromAttribute(t, r.type);
      this[o] = l ?? this._$Ej?.get(o) ?? l, this._$Em = null;
    }
  }
  requestUpdate(e, t, n, o = !1, r) {
    if (e !== void 0) {
      const i = this.constructor;
      if (o === !1 && (r = this[e]), n ??= i.getPropertyOptions(e), !((n.hasChanged ?? wt)(r, t) || n.useDefault && n.reflect && r === this._$Ej?.get(e) && !this.hasAttribute(i._$Eu(e, n)))) return;
      this.C(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: n, reflect: o, wrapped: r }, i) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, i ?? t ?? this[e]), r !== !0 || i !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), o === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        for (const [o, r] of this._$Ep) this[o] = r;
        this._$Ep = void 0;
      }
      const n = this.constructor.elementProperties;
      if (n.size > 0) for (const [o, r] of n) {
        const { wrapped: i } = r, l = this[o];
        i !== !0 || this._$AL.has(o) || l === void 0 || this.C(o, void 0, r, l);
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
se.elementStyles = [], se.shadowRootOptions = { mode: "open" }, se[pe("elementProperties")] = /* @__PURE__ */ new Map(), se[pe("finalized")] = /* @__PURE__ */ new Map(), Ht?.({ ReactiveElement: se }), (Ae.reactiveElementVersions ??= []).push("2.1.2");
const Be = globalThis, Qe = (s) => s, Ee = Be.trustedTypes, Je = Ee ? Ee.createPolicy("lit-html", { createHTML: (s) => s }) : void 0, xt = "$lit$", Z = `lit$${Math.random().toFixed(9).slice(2)}$`, yt = "?" + Z, Nt = `<${yt}>`, J = document, fe = () => J.createComment(""), me = (s) => s === null || typeof s != "object" && typeof s != "function", je = Array.isArray, Ft = (s) => je(s) || typeof s?.[Symbol.iterator] == "function", ze = `[ 	
\f\r]`, de = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, et = /-->/g, tt = />/g, Y = RegExp(`>|${ze}(?:([^\\s"'>=/]+)(${ze}*=${ze}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), nt = /'/g, st = /"/g, bt = /^(?:script|style|textarea|title)$/i, vt = (s) => (e, ...t) => ({ _$litType$: s, strings: e, values: t }), f = vt(1), S = vt(2), oe = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), rt = /* @__PURE__ */ new WeakMap(), Q = J.createTreeWalker(J, 129);
function kt(s, e) {
  if (!je(s) || !s.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return Je !== void 0 ? Je.createHTML(e) : e;
}
const Bt = (s, e) => {
  const t = s.length - 1, n = [];
  let o, r = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", i = de;
  for (let l = 0; l < t; l++) {
    const a = s[l];
    let c, h, u = -1, w = 0;
    for (; w < a.length && (i.lastIndex = w, h = i.exec(a), h !== null); ) w = i.lastIndex, i === de ? h[1] === "!--" ? i = et : h[1] !== void 0 ? i = tt : h[2] !== void 0 ? (bt.test(h[2]) && (o = RegExp("</" + h[2], "g")), i = Y) : h[3] !== void 0 && (i = Y) : i === Y ? h[0] === ">" ? (i = o ?? de, u = -1) : h[1] === void 0 ? u = -2 : (u = i.lastIndex - h[2].length, c = h[1], i = h[3] === void 0 ? Y : h[3] === '"' ? st : nt) : i === st || i === nt ? i = Y : i === et || i === tt ? i = de : (i = Y, o = void 0);
    const y = i === Y && s[l + 1].startsWith("/>") ? " " : "";
    r += i === de ? a + Nt : u >= 0 ? (n.push(c), a.slice(0, u) + xt + a.slice(u) + Z + y) : a + Z + (u === -2 ? l : y);
  }
  return [kt(s, r + (s[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class $e {
  constructor({ strings: e, _$litType$: t }, n) {
    let o;
    this.parts = [];
    let r = 0, i = 0;
    const l = e.length - 1, a = this.parts, [c, h] = Bt(e, t);
    if (this.el = $e.createElement(c, n), Q.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (o = Q.nextNode()) !== null && a.length < l; ) {
      if (o.nodeType === 1) {
        if (o.hasAttributes()) for (const u of o.getAttributeNames()) if (u.endsWith(xt)) {
          const w = h[i++], y = o.getAttribute(u).split(Z), p = /([.?@])?(.*)/.exec(w);
          a.push({ type: 1, index: r, name: p[2], strings: y, ctor: p[1] === "." ? Gt : p[1] === "?" ? Vt : p[1] === "@" ? qt : De }), o.removeAttribute(u);
        } else u.startsWith(Z) && (a.push({ type: 6, index: r }), o.removeAttribute(u));
        if (bt.test(o.tagName)) {
          const u = o.textContent.split(Z), w = u.length - 1;
          if (w > 0) {
            o.textContent = Ee ? Ee.emptyScript : "";
            for (let y = 0; y < w; y++) o.append(u[y], fe()), Q.nextNode(), a.push({ type: 2, index: ++r });
            o.append(u[w], fe());
          }
        }
      } else if (o.nodeType === 8) if (o.data === yt) a.push({ type: 2, index: r });
      else {
        let u = -1;
        for (; (u = o.data.indexOf(Z, u + 1)) !== -1; ) a.push({ type: 7, index: r }), u += Z.length - 1;
      }
      r++;
    }
  }
  static createElement(e, t) {
    const n = J.createElement("template");
    return n.innerHTML = e, n;
  }
}
function ie(s, e, t = s, n) {
  if (e === oe) return e;
  let o = n !== void 0 ? t._$Co?.[n] : t._$Cl;
  const r = me(e) ? void 0 : e._$litDirective$;
  return o?.constructor !== r && (o?._$AO?.(!1), r === void 0 ? o = void 0 : (o = new r(s), o._$AT(s, t, n)), n !== void 0 ? (t._$Co ??= [])[n] = o : t._$Cl = o), o !== void 0 && (e = ie(s, o._$AS(s, e.values), o, n)), e;
}
class jt {
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
    const { el: { content: t }, parts: n } = this._$AD, o = (e?.creationScope ?? J).importNode(t, !0);
    Q.currentNode = o;
    let r = Q.nextNode(), i = 0, l = 0, a = n[0];
    for (; a !== void 0; ) {
      if (i === a.index) {
        let c;
        a.type === 2 ? c = new we(r, r.nextSibling, this, e) : a.type === 1 ? c = new a.ctor(r, a.name, a.strings, this, e) : a.type === 6 && (c = new Zt(r, this, e)), this._$AV.push(c), a = n[++l];
      }
      i !== a?.index && (r = Q.nextNode(), i++);
    }
    return Q.currentNode = J, o;
  }
  p(e) {
    let t = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++;
  }
}
class we {
  get _$AU() {
    return this._$AM?._$AU ?? this._$Cv;
  }
  constructor(e, t, n, o) {
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = o, this._$Cv = o?.isConnected ?? !0;
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
    e = ie(this, e, t), me(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== oe && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : Ft(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && me(this._$AH) ? this._$AA.nextSibling.data = e : this.T(J.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: n } = e, o = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = $e.createElement(kt(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === o) this._$AH.p(t);
    else {
      const r = new jt(o, this), i = r.u(this.options);
      r.p(t), this.T(i), this._$AH = r;
    }
  }
  _$AC(e) {
    let t = rt.get(e.strings);
    return t === void 0 && rt.set(e.strings, t = new $e(e)), t;
  }
  k(e) {
    je(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, o = 0;
    for (const r of e) o === t.length ? t.push(n = new we(this.O(fe()), this.O(fe()), this, this.options)) : n = t[o], n._$AI(r), o++;
    o < t.length && (this._$AR(n && n._$AB.nextSibling, o), t.length = o);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const n = Qe(e).nextSibling;
      Qe(e).remove(), e = n;
    }
  }
  setConnected(e) {
    this._$AM === void 0 && (this._$Cv = e, this._$AP?.(e));
  }
}
class De {
  get tagName() {
    return this.element.tagName;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  constructor(e, t, n, o, r) {
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = o, this.options = r, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = g;
  }
  _$AI(e, t = this, n, o) {
    const r = this.strings;
    let i = !1;
    if (r === void 0) e = ie(this, e, t, 0), i = !me(e) || e !== this._$AH && e !== oe, i && (this._$AH = e);
    else {
      const l = e;
      let a, c;
      for (e = r[0], a = 0; a < r.length - 1; a++) c = ie(this, l[n + a], t, a), c === oe && (c = this._$AH[a]), i ||= !me(c) || c !== this._$AH[a], c === g ? e = g : e !== g && (e += (c ?? "") + r[a + 1]), this._$AH[a] = c;
    }
    i && !o && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class Gt extends De {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class Vt extends De {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class qt extends De {
  constructor(e, t, n, o, r) {
    super(e, t, n, o, r), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = ie(this, e, t, 0) ?? g) === oe) return;
    const n = this._$AH, o = e === g && n !== g || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, r = e !== g && (n === g || o);
    o && this.element.removeEventListener(this.name, this, n), r && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class Zt {
  constructor(e, t, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    ie(this, e);
  }
}
const Kt = Be.litHtmlPolyfillSupport;
Kt?.($e, we), (Be.litHtmlVersions ??= []).push("3.3.3");
const Xt = (s, e, t) => {
  const n = t?.renderBefore ?? e;
  let o = n._$litPart$;
  if (o === void 0) {
    const r = t?.renderBefore ?? null;
    n._$litPart$ = o = new we(e.insertBefore(fe(), r), r, void 0, t ?? {});
  }
  return o._$AI(s), o;
};
const Ge = globalThis;
class ge extends se {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = Xt(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return oe;
  }
}
ge._$litElement$ = !0, ge.finalized = !0, Ge.litElementHydrateSupport?.({ LitElement: ge });
const Yt = Ge.litElementPolyfillSupport;
Yt?.({ LitElement: ge });
(Ge.litElementVersions ??= []).push("4.2.2");
const Qt = [
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
Object.fromEntries(Qt.map((s) => [s.key, s]));
const le = "Europe/Berlin", ot = /* @__PURE__ */ new Map();
function Jt(s, e = le) {
  const t = e + JSON.stringify(s);
  let n = ot.get(t);
  return n || (n = new Intl.DateTimeFormat("de-DE", { timeZone: e, ...s }), ot.set(t, n)), n;
}
function _t(s, e = le) {
  const t = Jt({
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hourCycle: "h23"
  }, e).formatToParts(s), n = (o) => Number(t.find((r) => r.type === o)?.value);
  return {
    year: n("year"),
    month: n("month"),
    day: n("day"),
    hour: n("hour") === 24 ? 0 : n("hour"),
    minute: n("minute"),
    second: n("second")
  };
}
function en(s, e = le) {
  const t = _t(s, e), n = Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, t.second);
  return Math.round((n - s.getTime()) / 6e4);
}
function xe(s, e = le) {
  return _t(s, e).hour;
}
function it(s, e = 0, t = 0, n = le) {
  const [o, r, i] = s.split("-").map(Number), l = Date.UTC(o, r - 1, i, e, t);
  let a = new Date(l);
  for (let c = 0; c < 2; c++) {
    const h = en(a, n);
    a = new Date(l - h * 6e4);
  }
  return a;
}
function Mt(s, e = le) {
  const t = it(s, 0, 0, e), n = tn(s, 1);
  return { start: t, end: it(n, 0, 0, e) };
}
function tn(s, e) {
  const [t, n, o] = s.split("-").map(Number);
  return new Date(Date.UTC(t, n - 1, o + e)).toISOString().slice(0, 10);
}
function nn(s, e = 0) {
  const t = 10 ** e;
  return Math.round(s * t) / t;
}
function K(s, e = 0) {
  const t = nn(s, e).toFixed(e), [n, o] = t.split("."), r = n.startsWith("-"), l = (r ? n.slice(1) : n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (r ? "-" : "") + l + (o ? "," + o : "");
}
function q(s, e = 0) {
  return `${K(s, e)} €/MWh`;
}
function sn(s, e = 1) {
  return `${K(s / 10, e)} ct/kWh`;
}
const rn = /(-?\d{1,3}(?:\.\d{3})*(?:,\d+)?) €\/MWh/g;
function on(s) {
  return s.replace(rn, (e, t) => sn(Number(t.replace(/\./g, "").replace(",", "."))));
}
const at = 36e5, lt = 9e5, an = [
  { key: "negativ", label: "negativ", upTo: 0 },
  { key: "sehr_guenstig", label: "sehr günstig", upTo: 80 },
  { key: "guenstig", label: "günstig", upTo: 130 },
  { key: "mittel", label: "mittel", upTo: 180 },
  { key: "teuer", label: "teuer", upTo: 230 },
  { key: "sehr_teuer", label: "sehr teuer", upTo: Number.POSITIVE_INFINITY }
];
function ae(s) {
  for (const e of an)
    if (s < e.upTo)
      return e.key;
  return "sehr_teuer";
}
function ln(s, e = []) {
  const t = new Map(e.map((r) => [Date.parse(r.ts), r])), n = /* @__PURE__ */ new Map();
  for (const r of s) {
    if (r.price === null)
      continue;
    const i = Math.floor(Date.parse(r.ts) / at) * at, l = n.get(i) ?? { sum: 0, n: 0, neg: 0 };
    l.sum += r.price, l.n += 1, r.price < 0 && (l.neg += 1), n.set(i, l);
  }
  return [.../* @__PURE__ */ new Set([...n.keys(), ...t.keys()])].sort((r, i) => r - i).map((r) => {
    const i = t.get(r) ?? null, l = n.get(r), a = new Date(r);
    return { ts: a.toISOString(), ms: r, hour: i?.hour ?? xe(a), priceEurMwh: l ? l.sum / l.n : i.priceEurMwh, negativeQuarters: l?.neg ?? (i && i.priceEurMwh < 0 ? 4 : 0), explanation: i };
  });
}
function cn(s, e = [2, 3, 4]) {
  const t = s.filter((o) => o.price !== null).map((o) => ({ ms: Date.parse(o.ts), price: o.price })), n = [];
  for (const o of e) {
    const r = o * 4;
    let i = null;
    for (let l = 0; l + r <= t.length; l++) {
      if (t[l + r - 1].ms - t[l].ms !== (r - 1) * lt)
        continue;
      let a = 0;
      for (let h = l; h < l + r; h++)
        a += t[h].price;
      const c = a / r;
      (i === null || c < i.avg) && (i = { i: l, avg: c });
    }
    i && n.push({ hours: o, from: new Date(t[i.i].ms).toISOString(), to: new Date(t[i.i].ms + r * lt).toISOString(), avgEurMwh: i.avg });
  }
  return n;
}
function St(s) {
  return `${s.fromHour}-${s.toHour} Uhr`;
}
const be = (s) => {
  const e = new Date(s);
  return `${String(xe(e)).padStart(2, "0")}:${String(e.getUTCMinutes()).padStart(2, "0")}`;
};
function hn(s, e) {
  const t = s.verdict, n = e.verdict;
  if (!t || !n)
    return null;
  let o;
  if (Math.abs(n.avgEurMwh) < 5)
    o = `Morgen kostet Strom im Schnitt ${q(t.avgEurMwh)}, heute ${q(n.avgEurMwh)}.`;
  else {
    const a = (t.avgEurMwh - n.avgEurMwh) / Math.abs(n.avgEurMwh) * 100;
    o = Math.abs(a) < 3 ? `Morgen kostet Strom im Schnitt ${q(t.avgEurMwh)}, etwa so viel wie heute (${q(n.avgEurMwh)}).` : `Morgen kostet Strom im Schnitt ${q(t.avgEurMwh)}, ${K(Math.abs(a), 0)} % ${a > 0 ? "mehr" : "weniger"} als heute (${q(n.avgEurMwh)}).`;
  }
  const r = s.windows.find((a) => a.hours === 3), i = e.windows.find((a) => a.hours === 3), l = r && i ? ` Die günstigsten drei Stunden: morgen ${be(r.from)}-${be(r.to)} Uhr (${q(r.avgEurMwh)}), heute ${be(i.from)}-${be(i.to)} Uhr (${q(i.avgEurMwh)}).` : "";
  return o + l;
}
function dn(s) {
  return s.shiftSavingEur === null || s.shiftSavingEur < 0.2 ? null : `10 kWh von ${s.maxHour} auf ${s.minHour} Uhr verschoben: rund ${K(s.shiftSavingEur, 2)} € gespart.`;
}
const ct = 6.2, un = 6.4;
function pn(s) {
  for (const e of [50, 100, 200, 500, 1e3, 2e3])
    if (s / e <= 6)
      return e;
  return 5e3;
}
function gn(s, e, t = {}) {
  const n = t.width ?? 360, o = t.height ?? 214, r = t.top ?? 40, i = t.bottom ?? 34, l = t.left ?? 30, a = t.right ?? 8, c = { x: l, y: r, w: n - l - a, h: o - r - i }, h = Math.max(1, s.length), u = c.w / h, w = s.map((k) => k.priceEurMwh), y = w.length ? Math.max(...w) : 100, p = w.length ? Math.min(...w) : 0, b = pn(Math.max(y, 50) * 1.15 - Math.min(0, p)), d = Math.max(b, Math.ceil(y * 1.15 / b) * b), M = p < 0 ? Math.floor(p / b) * b : 0, v = (k) => c.y + c.h - (k - M) / (d - M) * c.h, N = v(Math.max(M, 0)), P = [];
  for (let k = M; k <= d + 1e-9; k += b)
    P.push({ y: v(k), label: K(k / 10, 0) });
  const m = [];
  for (const k of [0, 6, 12, 18]) {
    const T = s.findIndex((F) => F.hour === k);
    T >= 0 && m.push({ x: c.x + T * u, label: String(k), anchor: k === 0 ? "start" : "middle" });
  }
  m.push({ x: c.x + c.w, label: "24", anchor: "end" });
  let A = "";
  s.length && (A = `M${te(c.x)},${te(v(w[0]))}`, s.forEach((k, T) => {
    const F = c.x + (T + 1) * u;
    A += ` H${te(F)}`, T < s.length - 1 && (A += ` V${te(v(w[T + 1]))}`);
  }));
  const R = s.length ? `${A} V${te(N)} H${te(c.x)} Z` : "", B = s.map((k, T) => ({ index: T, x: c.x + T * u, w: u, y: v(k.priceEurMwh), level: ae(k.priceEurMwh), hour: k.hour })), j = e.map((k) => {
    const T = c.x + k.startIdx * u, F = (k.endIdx - k.startIdx) * u, V = k.name.length * un + 8 <= F;
    return { index: k.index, x: T, w: F, label: V ? k.name : F >= 18 ? String(k.index + 1) : null, name: k.name };
  }), I = [];
  if (s.length >= 2 && y !== p) {
    const k = w.indexOf(y), T = w.indexOf(p), F = (L) => c.x + (L + 0.5) * u, V = (L, C, _) => {
      const W = C.length * ct, O = F(L);
      return O - W / 2 < c.x ? { x: c.x + u * 0.2, y: _, text: C, anchor: "start" } : O + W / 2 > c.x + c.w ? { x: c.x + c.w - u * 0.2, y: _, text: C, anchor: "end" } : { x: O, y: _, text: C, anchor: "middle" };
    }, $ = V(k, `▲ ${K(y / 10, 1)} ct · ${s[k].hour} Uhr`, v(y) - 7);
    I.push($);
    const D = v(p), E = D + 16, z = V(T, `▼ ${K(p / 10, 1)} ct · ${s[T].hour} Uhr`, E <= c.y + c.h - 2 ? E : D - 7);
    Math.abs(z.y - $.y) < 12 && Math.abs(z.x - $.x) < (z.text.length + $.text.length) * ct * 0.5 && (z.y = $.y + 13), I.push(z);
  }
  const Pe = t.now && t.now.index >= 0 && t.now.index < h ? { x: c.x + (t.now.index + Math.min(1, Math.max(0, t.now.fraction))) * u, label: t.now.label } : null;
  return { width: n, height: o, plot: c, slotW: u, yOf: v, yTicks: P, xTicks: m, areaPath: R, linePath: A, zeroY: M < 0 ? v(0) : null, baselineY: N, slots: B, bands: j, labels: I, now: Pe, yMax: d, yMin: M };
}
function te(s) {
  return String(Math.round(s * 10) / 10);
}
const ve = [
  { key: "wind", label: "Wind" },
  { key: "solar", label: "Sonne" },
  { key: "bio", label: "Bio & Wasser" },
  { key: "coal", label: "Kohle" },
  { key: "gas", label: "Gas" },
  { key: "other", label: "Sonstige" },
  { key: "forecastRest", label: "Übrige" }
], re = 9e5, fn = 36e5;
function ke(...s) {
  let e = 0, t = 0;
  for (const n of s)
    n !== null && (e += n, t++);
  return t ? e : null;
}
function mn(s) {
  const e = s, t = (r) => {
    const i = e[r];
    return i.load != null && i.windOnshore != null && i.windOffshore != null && i.solar != null && i.lignite != null && i.hardCoal != null && i.gas != null;
  };
  let n = -1;
  for (let r = 0; r < e.length; r++)
    t(r) && (n = r);
  const o = (r, i) => {
    const l = e[r][i];
    if (l !== null)
      return l;
    const a = e[r - 1]?.[i] ?? null, c = r + 1 <= n ? e[r + 1]?.[i] ?? null : null;
    return a !== null && c !== null ? (a + c) / 2 : a ?? c;
  };
  return e.map((r, i) => {
    const l = Date.parse(r.ts), a = { wind: 0, solar: 0, bio: 0, coal: 0, gas: 0, other: 0, forecastRest: 0 };
    return i <= n && r.load != null ? {
      ms: l,
      actual: !0,
      forecast: !1,
      layers: {
        ...a,
        wind: ke(o(i, "windOnshore"), o(i, "windOffshore")) ?? 0,
        solar: o(i, "solar") ?? 0,
        bio: ke(o(i, "biomass"), o(i, "hydro"), o(i, "otherRenewable")) ?? 0,
        coal: ke(o(i, "lignite"), o(i, "hardCoal")) ?? 0,
        gas: o(i, "gas") ?? 0,
        // nuclear only exists on days before April 2023; it is too small a layer today to name on its own
        other: ke(o(i, "pumpedStorage"), o(i, "otherConventional"), o(i, "nuclear")) ?? 0
      },
      load: r.load
    } : r.forecastGeneration != null && r.forecastWind != null && r.forecastSolar != null ? {
      ms: l,
      actual: !1,
      forecast: !0,
      layers: { ...a, wind: r.forecastWind, solar: r.forecastSolar, forecastRest: Math.max(0, r.forecastGeneration - r.forecastWind - r.forecastSolar) },
      load: r.forecastGeneration
    } : null;
  });
}
function ht(s, e, t) {
  const n = s.filter((a) => a !== null && a.ms >= e && a.ms < t);
  if (!n.length)
    return { renewableShare: null, windMw: null, solarMw: null, residualMw: null, gasMw: null, gasMaxMw: null, forecast: !1 };
  const o = (a) => n.reduce((c, h) => c + a(h), 0) / n.length, r = n.filter((a) => a.actual), i = n.reduce((a, c) => a + (c.load ?? 0), 0), l = n.reduce((a, c) => a + c.layers.wind + c.layers.solar + c.layers.bio, 0);
  return {
    renewableShare: i > 0 ? l / i : null,
    windMw: o((a) => a.layers.wind),
    solarMw: o((a) => a.layers.solar),
    residualMw: o((a) => (a.load ?? 0) - a.layers.wind - a.layers.solar),
    gasMw: r.length ? r.reduce((a, c) => a + c.layers.gas, 0) / r.length : null,
    gasMaxMw: r.length ? Math.max(...r.map((a) => a.layers.gas)) : null,
    forecast: n.filter((a) => a.forecast).length > n.length / 2
  };
}
const Oe = 5.6, $n = 11;
function Ue(s, e, t, n = !0, o = !0) {
  const r = [];
  if (!s.length)
    return r;
  n && r.push([e(s[0].ms), t(s[0])]);
  for (const i of s)
    r.push([e(i.ms + re / 2), t(i)]);
  return o && r.push([e(s[s.length - 1].ms + re), t(s[s.length - 1])]), r;
}
function ne(s) {
  return String(Math.round(s * 10) / 10);
}
function wn(s, e, t, n = {}) {
  const o = n.width ?? 360, r = n.height ?? 150, i = n.top ?? 18, l = n.bottom ?? 20, a = n.left ?? 30, c = n.right ?? 8, h = { x: a, y: i, w: o - a - c, h: r - i - l }, u = Math.max(re, t - e), w = ($) => h.x + ($ - e) / u * h.w, y = s.filter(($) => $ !== null), p = y.map(($) => ve.reduce((D, E) => D + $.layers[E.key], 0)), b = Math.max(0, ...p, ...y.map(($) => $.load ?? 0)), d = b > 6e4 ? 2e4 : 1e4, M = Math.max(d, Math.ceil(b * 1.06 / d) * d), v = ($) => h.y + h.h - $ / M * h.h, N = [];
  let P = [];
  for (const $ of s)
    $ && (!P.length || $.ms - P[P.length - 1].ms === re) ? P.push($) : (P.length && N.push(P), P = $ ? [$] : []);
  P.length && N.push(P);
  const m = [], A = [];
  ve.forEach(($, D) => {
    if (!y.some((_) => _.layers[$.key] > 0))
      return;
    const E = (_) => ve.slice(0, D).reduce((W, O) => W + _.layers[O.key], 0), z = (_) => E(_) + _.layers[$.key];
    let L = "", C = null;
    for (const _ of N) {
      const W = Ue(_, w, (U) => v(z(U))), O = Ue(_, w, (U) => v(E(U))).reverse();
      L += `M${W.map(([U, X]) => `${ne(U)},${ne(X)}`).join(" L")} L${O.map(([U, X]) => `${ne(U)},${ne(X)}`).join(" L")} Z `;
      for (const U of _) {
        const X = v(E(U)) - v(z(U));
        (!C || X > C.band) && (C = { x: U, band: X });
      }
    }
    if (m.push({ key: $.key, label: $.label, path: L.trim() }), C && C.band >= $n) {
      const _ = $.label, W = _.length * Oe, O = Math.min(h.x + h.w - W / 2 - 2, Math.max(h.x + W / 2 + 2, w(C.x.ms + re / 2))), U = (v(E(C.x)) + v(z(C.x))) / 2 + 3.5;
      A.some((Te) => Math.abs(Te.y - U) < 12 && Math.abs(Te.x - O) < (W + Te.text.length * Oe) / 2 + 4) || A.push({ key: $.key, x: O, y: U, text: _ });
    }
  });
  let R = "", B = "";
  for (const $ of N) {
    const D = $.filter((z) => z.load !== null);
    let E = 0;
    for (; E < D.length; ) {
      const z = D[E].actual;
      let L = E;
      for (; L + 1 < D.length && D[L + 1].actual === z; )
        L++;
      const C = D.slice(E, L + 1), _ = Ue(C, w, (O) => v(O.load), E === 0, L === D.length - 1);
      if (E > 0) {
        const O = D[E - 1];
        _.unshift([w(O.ms + re / 2), v(O.load)]);
      }
      const W = `M${_.map(([O, U]) => `${ne(O)},${ne(U)}`).join(" L")} `;
      z ? R += W : B += W, E = L + 1;
    }
  }
  const j = y.find(($) => $.forecast), I = y.some(($) => $.actual), Pe = j && I ? w(j.ms) : null, k = [0, M / 2, M].map(($) => ({ y: v($), label: K($ / 1e3, 0) })), T = [];
  for (let $ = e; $ < t; $ += fn) {
    const D = xe(new Date($));
    D % 6 === 0 && (T.some((E) => E.label === String(D)) || T.push({ x: w($), label: String(D), anchor: $ === e ? "start" : "middle" }));
  }
  T.push({ x: h.x + h.w, label: "24", anchor: "end" });
  let F = null;
  const V = y.filter(($) => $.load !== null);
  if (V.length) {
    const $ = I ? "Verbrauch" : "Erzeugung gesamt", D = $.length * Oe, E = (C) => v(ve.reduce((_, W) => _ + C.layers[W.key], 0)) - v(C.load), z = V.reduce((C, _) => E(_) > E(C) ? _ : C, V[0]);
    F = { x: Math.min(h.x + h.w - D - 2, Math.max(h.x + 2, w(z.ms) - D / 2)), y: Math.max(h.y + 9, v(z.load) - 4), text: $ };
  }
  return {
    width: o,
    height: r,
    plot: h,
    xOf: w,
    yOf: v,
    layers: m,
    loadPath: R.trim(),
    forecastLoadPath: B.trim(),
    forecastX: Pe,
    allForecast: y.length > 0 && !I,
    yTicks: k,
    xTicks: T,
    labels: A,
    loadLabel: F,
    hasData: y.length > 0
  };
}
const xn = 9e5, yn = [
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
], bn = (s) => Math.round(s * 10) / 10;
function We(s) {
  const e = Date.parse(s.start), t = [];
  for (let n = 0; n < s.slots; n++) {
    const o = { ts: new Date(e + n * xn).toISOString(), price: s.price[n] ?? null };
    for (const i of yn)
      o[i] = s.mix?.[i][n] ?? null;
    const r = o.windOnshore !== null || o.windOffshore !== null ? (o.windOnshore ?? 0) + (o.windOffshore ?? 0) : null;
    o.residual = o.load !== null && r !== null && o.solar !== null ? bn(o.load - r - o.solar) : null, t.push(o);
  }
  return t;
}
const Le = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }), Ve = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }), qe = (s) => Le.format(Math.round(s) + 0), dt = (s) => Ve.format(Math.abs(s) < 0.05 ? 0 : s), ue = (s) => `${Ve.format(s / 1e3)} GW`, Et = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], vn = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
function At(s) {
  return s.split("-").map(Number);
}
function kn(s) {
  const [e, t, n] = At(s);
  return `${Et[new Date(Date.UTC(e, t - 1, n)).getUTCDay()]} ${n}. ${vn[t - 1]}`;
}
function _n(s) {
  const [e, t, n] = At(s);
  return `${Et[new Date(Date.UTC(e, t - 1, n)).getUTCDay()]} ${String(n).padStart(2, "0")}.${String(t).padStart(2, "0")}.`;
}
const Mn = (s) => `${s}-${(s + 1) % 24} Uhr`, Sn = new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Europe/Berlin" }), G = (s) => Sn.format(new Date(s)), Dt = (s) => `${G(s)}-${G(new Date(s).getTime() + 9e5)} Uhr`;
function En(s) {
  return s >= 1.85 ? `${Le.format(Math.round(s))}× so teuer` : s >= 1.15 ? `${Ve.format(s)}× so teuer` : s > 0.87 ? "etwa gleich" : `${Le.format((1 - s) * 100)} % günstiger`;
}
const An = /^[^:]*?\d{1,2}-\d{1,2} Uhr: [\s\S]*?\. (?=[A-ZÄÖÜ])/, Dn = (s) => s.replace(An, "");
function Cn(s, e, t) {
  const n = s % 24, o = e % 24;
  return n === o ? !1 : n < o ? t >= n && t < o : t >= n || t < o;
}
function Pn(s, e, t) {
  let n = e.base_ct;
  for (const r of e.windows) Cn(r.from_hour, r.to_hour, t) && (n = r.ct);
  return (e.kind === "dynamic" ? s / 10 * (1 + e.vat / 100) : 0) + n;
}
const Tn = { kind: "dynamic", base_ct: 19.69, vat: 19, windows: [] };
function zn(s, e) {
  const t = e ?? Tn, n = (i) => typeof i == "number" ? i : xe(new Date(i)), o = (i, l) => s === "eur_mwh" ? qe(i) : dt(s === "mein_preis" ? Pn(i, t, n(l)) : i / 10), r = s === "eur_mwh" ? "€/MWh" : "ct/kWh";
  return {
    unit: s,
    suffix: r,
    number: o,
    price: (i, l) => `${o(i, l)} ${r}`,
    text: (i) => s === "eur_mwh" ? i : on(i),
    axisUnit: s === "eur_mwh" ? "€" : "ct"
  };
}
const Ct = "strompreis.ha.resolution.v1";
function On() {
  try {
    return localStorage.getItem(Ct) === "quarter" ? "quarter" : "hour";
  } catch {
    return "hour";
  }
}
class Un extends EventTarget {
  constructor() {
    super(...arguments), this.home = null, this.tariff = null, this.stale = !1, this.error = null, this.loading = !0, this.day = "today", this.resolution = On(), this.selectedMs = null, this.now = Date.now(), this.connection = null, this.clock = null;
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
    if (e.day !== void 0 && e.day !== this.day && (this.selectedMs = null), Object.assign(this, e), e.resolution)
      try {
        localStorage.setItem(Ct, e.resolution);
      } catch {
      }
    this.changed();
  }
  changed() {
    this.dispatchEvent(new Event("change"));
  }
}
const x = new Un(), Rn = [
  { value: "ct_kwh", label: "Börsenpreis in ct/kWh" },
  { value: "mein_preis", label: "Mein Preis (Tarif aus der Integration)" },
  { value: "eur_mwh", label: "Börsenpreis in €/MWh" }
], ye = { name: "unit", selector: { select: { mode: "dropdown", options: Rn } } }, ce = { name: "title", selector: { text: {} } }, he = {
  unit: "Preise anzeigen als",
  title: "Überschrift (leer: Standard)",
  show_verdict: "Tagesbild zeigen",
  show_strip: "Preisstreifen zeigen",
  show_switches: "Tag und Raster umschaltbar",
  show_text: "Texte zeigen"
}, Wn = {
  negativ: "negativ",
  sehr_guenstig: "sehr günstig",
  guenstig: "günstig",
  mittel: "mittel",
  teuer: "teuer",
  sehr_teuer: "sehr teuer"
};
class H extends ge {
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
    this._hass = e, x.connect(e);
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
    super.connectedCallback(), x.addEventListener("change", this.onStore), this.sizeObserver.observe(this);
  }
  disconnectedCallback() {
    x.removeEventListener("change", this.onStore), this.sizeObserver.disconnect(), super.disconnectedCallback();
  }
  get units() {
    return zn(this.config?.unit ?? "ct_kwh", x.tariff);
  }
  /** a card in the integration's absence or before the first data: one line instead of an empty frame */
  placeholder() {
    return x.error === "not_loaded" ? this.frame(f`<p class="muted">Die Integration „Strompreis verstehen“ ist nicht eingerichtet.</p>`) : x.error ? this.frame(f`<p class="muted">Keine Daten von „Strompreis verstehen“ (${x.error}).</p>`) : x.loading || !x.home ? this.frame(f`<div class="skeleton"></div>`) : null;
  }
  frame(e, t) {
    const n = this.config?.title ?? t;
    return f`<ha-card>
      <div class="card">
        ${n ? f`<h2 class="kicker">${n}</h2>` : g} ${e}
        ${x.stale ? f`<p class="note">Keine Verbindung zum Datendienst, angezeigt wird der letzte Stand.</p>` : g}
      </div>
    </ha-card>`;
  }
  static {
    this.styles = ee`
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
const Ie = 36e5, Ln = 9e5, ut = (s) => s;
function In(s, e, t) {
  if (!t) return ln(e, ut(s.hours));
  const n = new Map(ut(s.hours).map((r) => [Date.parse(r.ts), r])), o = [];
  for (const r of e) {
    if (r.price === null) continue;
    const i = Date.parse(r.ts);
    o.push({ ts: r.ts, ms: i, hour: xe(new Date(i)), priceEurMwh: r.price, negativeQuarters: r.price < 0 ? 4 : 0, explanation: n.get(Math.floor(i / Ie) * Ie) ?? null });
  }
  return o;
}
function Hn(s, e) {
  return !e.length || !s.length ? [] : e.map((t) => {
    const n = Date.parse(t.from), o = Date.parse(t.to);
    let r = s.findIndex((l) => l.ms >= n), i = s.findIndex((l) => l.ms >= o);
    return r < 0 && (r = s.length), i < 0 && (i = s.length), { ...t, startIdx: r, endIdx: i };
  });
}
const pt = /* @__PURE__ */ new WeakMap();
function Nn(s) {
  const e = x.home;
  return e ? s === "yesterday" ? e.yesterday : s === "today" ? e.today : e.tomorrow : null;
}
function Ce(s = x.day) {
  const e = Nn(s);
  if (!e || !e.hasPrices) return null;
  const t = x.resolution === "quarter";
  let n = pt.get(e);
  n || (n = { quarters: We(e), grids: /* @__PURE__ */ new Map() }, pt.set(e, n));
  let o = n.grids.get(t);
  if (!o) {
    const d = In(e, n.quarters, t);
    o = { slots: d, phases: Hn(d, e.phases) }, n.grids.set(t, o);
  }
  const { slots: r, phases: i } = o, l = t ? Ln : Ie, a = (d) => r.findIndex((M) => d >= M.ms && d < M.ms + l), c = s === "today" ? a(x.now) : -1, h = c >= 0 ? (x.now - r[c].ms) / l : 0, u = r.reduce((d, M, v) => d < 0 || M.priceEurMwh < r[d].priceEurMwh ? v : d, -1), w = x.selectedMs !== null ? a(x.selectedMs) : -1, y = c >= 0 ? c : u, p = w >= 0 ? w : y >= 0 ? y : null, b = (d) => i.find((M) => d >= M.startIdx && d < M.endIdx) ?? null;
  return {
    key: s,
    day: e,
    quarters: n.quarters,
    slots: r,
    phases: i,
    fine: t,
    stepMs: l,
    nowIdx: c,
    nowFraction: h,
    idx: p,
    slot: p !== null ? r[p] ?? null : null,
    phase: p !== null ? b(p) : null,
    nowPhase: c >= 0 ? b(c) : null
  };
}
function He(s, e) {
  return s.fine ? Dt(e.ms) : Mn(e.hour);
}
const gt = { yesterday: "Gestern", today: "Heute", tomorrow: "Morgen" };
class Fn extends H {
  constructor() {
    super(...arguments), this.dragging = !1, this.resizeObserver = null, this.observed = null;
  }
  static getConfigForm() {
    return {
      schema: [ye, { name: "show_verdict", selector: { boolean: {} } }, { name: "show_strip", selector: { boolean: {} } }, { name: "show_switches", selector: { boolean: {} } }, ce],
      computeLabel: (e) => he[e.name]
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
    e && (ft(e), e !== this.observed && (this.resizeObserver ??= new ResizeObserver((t) => t.forEach((n) => ft(n.target))), this.resizeObserver.disconnect(), this.resizeObserver.observe(e), this.observed = e));
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
    const t = x.home, n = x.day, o = Ce(n), r = this.config, i = this.header(t.date, n);
    if (!o) {
      const l = n === "tomorrow" ? "Die Preise für morgen kommen nach der Auktion, meist gegen 13 Uhr." : "Für diesen Tag liegen keine Preise vor.";
      return this.frame(f`${i}<p class="muted small">${l}</p>`);
    }
    return this.frame(f`
      ${i} ${r.show_verdict !== !1 ? this.verdict(o) : g} ${this.chart(o)} ${r.show_strip !== !1 ? this.strip(o) : g}
    `);
  }
  header(e, t) {
    const n = t === "yesterday" ? x.home.yesterday.date : t === "tomorrow" ? x.home.tomorrow?.date ?? Bn(e) : e, o = f`<p class="kicker">${gt[t]} · ${kn(n)}</p>`;
    if (this.config.show_switches === !1) return o;
    const r = !!x.home.tomorrow;
    return f`<div class="head">
      ${o}
      <div class="switches">
        <div class="seg" role="group" aria-label="Tag">
          ${["yesterday", "today", "tomorrow"].map(
      (i) => f`<button type="button" aria-pressed=${i === t} @click=${() => x.set({ day: i })}>
                ${gt[i]}${i === "tomorrow" && r && t !== "tomorrow" ? f`<span class="dot" aria-label="Preise da"></span>` : g}
              </button>`
    )}
        </div>
        <div class="seg" role="group" aria-label="Raster">
          <button type="button" aria-pressed=${x.resolution === "hour"} @click=${() => x.set({ resolution: "hour" })}>1 h</button>
          <button type="button" aria-pressed=${x.resolution === "quarter"} @click=${() => x.set({ resolution: "quarter" })}>15 min</button>
        </div>
      </div>
    </div>`;
  }
  verdict(e) {
    const t = e.day.verdict;
    if (!t) return g;
    const n = this.units, o = e.day.windows.find((a) => a.hours === 3) ?? e.day.windows[0] ?? null, r = n.unit === "mein_preis" ? null : dn(t), i = x.home.today, l = e.key === "tomorrow" && n.unit !== "mein_preis" ? hn(e.day, i) : null;
    return f`<div class="verdict">
      <p class="headline">${t.headline}</p>
      <p class="muted small">${n.text(t.detail)}${r ? ` ${r}` : ""}</p>
      ${l ? f`<p class="small">${n.text(l)}</p>` : g}
      ${o && !t.flat ? f`<p class="best small">
            <span class="badge">Beste ${o.hours} Stunden</span>
            <button type="button" class="link" @click=${() => x.set({ selectedMs: Date.parse(o.from) })}>
              <b>${G(o.from)}-${G(o.to)} Uhr</b>, im Schnitt ${n.price(o.avgEurMwh, o.from)}
            </button>
          </p>` : g}
    </div>`;
  }
  chart(e) {
    const t = this.units, n = gn(e.slots, e.phases), o = t.unit === "eur_mwh", r = (d) => o ? String(Math.round(Number(d.replace(/\./g, "").replace(",", ".")) * 10)) : d, i = (d) => o ? d.replace(/(-?[\d.]+,\d) ct/, (M, v) => `${Math.round(Number(v.replace(/\./g, "").replace(",", ".")) * 10)} €`) : d, l = e.idx !== null ? n.slots[e.idx] : void 0, a = e.phase, c = n.bands[n.bands.length - 1], h = e.nowIdx >= 0 ? n.plot.x + (e.nowIdx + e.nowFraction) * n.slotW : null, u = h !== null && h - 64 < n.plot.x, w = (d) => {
      const v = d.currentTarget.getBoundingClientRect(), N = (d.clientX - v.left) / v.width * n.width, P = Math.floor((N - n.plot.x) / n.slotW), m = e.slots[P];
      m && P !== e.idx && x.set({ selectedMs: m.ms });
    }, y = (d) => {
      d.pointerType === "mouse" && d.button !== 0 || (this.dragging = !0, d.currentTarget.setPointerCapture(d.pointerId), w(d));
    }, p = (d) => this.dragging && w(d), b = () => this.dragging = !1;
    return f`<svg viewBox="0 0 ${n.width} ${n.height}" aria-hidden="true" @pointerdown=${y} @pointermove=${p} @pointerup=${b} @pointercancel=${b}>
      ${n.bands.map(
      (d) => S`<g opacity=${a && a.index !== d.index ? 0.45 : 1}>
          <line x1=${d.x + 1} x2=${d.x + d.w - 1} y1="24" y2="24" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
          <line x1=${d.x + 1} x2=${d.x + 1} y1="20" y2="28" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
          ${d.label ? S`<text class="ribbon" x=${d.x + 4} y="16" fill="var(--ink)" font-size="10.5" font-weight="500" letter-spacing="0.08em">${d.label.toUpperCase()}</text>` : g}
        </g>`
    )}
      ${c ? S`<line x1=${c.x + c.w - 1} x2=${c.x + c.w - 1} y1="20" y2="28" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />` : g}
      ${a ? S`<rect x=${n.plot.x + a.startIdx * n.slotW} y=${n.plot.y - 6} width=${(a.endIdx - a.startIdx) * n.slotW} height=${n.plot.h + 6} fill="var(--soft)" />` : g}
      ${n.yTicks.map(
      (d) => S`<line x1=${n.plot.x} x2=${n.plot.x + n.plot.w} y1=${d.y} y2=${d.y} stroke="var(--rule)" stroke-width="1" vector-effect="non-scaling-stroke" />
          <text x=${n.plot.x - 5} y=${d.y + 3.5} text-anchor="end" fill="var(--muted-ink)" font-size="10">${r(d.label)}</text>`
    )}
      <text x=${n.plot.x - 5} y=${n.plot.y - 9} text-anchor="end" fill="var(--muted-ink)" font-size="10">${t.axisUnit}</text>
      ${n.xTicks.map((d) => S`<text x=${d.x} y=${n.plot.y + n.plot.h + 14} text-anchor=${d.anchor} fill="var(--muted-ink)" font-size="10">${d.label}</text>`)}
      <text x=${n.plot.x + n.plot.w} y=${n.plot.y + n.plot.h + 27} text-anchor="end" fill="var(--muted-ink)" font-size="10">Uhr</text>
      ${l ? S`<rect x=${l.x} y=${n.plot.y - 6} width=${l.w} height=${n.plot.h + 6} fill="var(--hl)" opacity="0.38" />` : g}
      ${n.areaPath ? S`<path d=${n.areaPath} fill="var(--soft)" stroke="none" />` : g}
      ${n.zeroY !== null ? S`<line x1=${n.plot.x} x2=${n.plot.x + n.plot.w} y1=${n.zeroY} y2=${n.zeroY} stroke="var(--ink)" stroke-width="1" opacity="0.5" vector-effect="non-scaling-stroke" />` : g}
      ${n.linePath ? S`<path d=${n.linePath} fill="none" stroke="var(--ink)" stroke-width="1.75" stroke-linejoin="round" vector-effect="non-scaling-stroke" />` : g}
      ${h !== null ? S`<line x1=${h} x2=${h} y1=${n.plot.y - 6} y2=${n.plot.y + n.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />
          <text x=${u ? h + 4 : h - 4} y=${n.plot.y + 2} text-anchor=${u ? "start" : "end"} fill="var(--ink)" font-size="10" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">jetzt ${G(x.now)}</text>` : g}
      ${n.labels.map((d) => S`<text class="anno" x=${d.x} y=${d.y} text-anchor=${d.anchor} fill="var(--ink)" font-size="11" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">${i(d.text)}</text>`)}
      ${l ? S`<circle cx=${l.x + l.w / 2} cy=${l.y} r="3.5" fill="var(--ink)" stroke="var(--halo)" stroke-width="2" vector-effect="non-scaling-stroke" />` : g}
    </svg>`;
  }
  strip(e) {
    const t = this.units, n = e.slots.length, o = e.slot, r = e.fine ? 1 : 2, i = (l) => {
      const a = Number(l.target.value), c = e.slots[a];
      c && x.set({ selectedMs: c.ms });
    };
    return f`<div class="strip">
      <div class="readout small">
        <span class="when"
          >${o ? He(e, o) : ""}${e.phase ? f`<span class="muted"> · ${e.phase.name}</span>` : g}
          ${e.idx !== null && e.idx === e.nowIdx ? f`<span class="badge">jetzt</span>` : g}</span
        >
        <b>${o ? t.price(o.priceEurMwh, o.hour) : ""}</b>
      </div>
      <div class="cells-wrap" data-count=${n}>
        <div class="cells" style="gap: ${r}px">
          ${e.slots.map(
      (l, a) => f`<span class="cell ${l.priceEurMwh < 0 ? "hatch" : ""}" style="background-color: var(--lvl-${ae(l.priceEurMwh)}); opacity: ${a === e.idx ? 1 : 0.85}"></span>`
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
          aria-valuetext=${o ? `${He(e, o)}, ${t.price(o.priceEurMwh, o.hour)}` : ""}
          @input=${i}
        />
      </div>
      <div class="ticks" aria-hidden="true">
        ${e.phases.slice(1).map((l) => f`<span class="phase-tick" style="left: ${l.startIdx / n * 100}%"></span>`)}
        ${e.nowIdx >= 0 ? f`<span class="now-tick" style="left: calc(${(e.nowIdx + 0.5) / n * 100}% - 1px)"></span>` : g}
      </div>
    </div>`;
  }
  static {
    this.styles = [
      H.styles,
      ee`
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
function ft(s) {
  const e = Math.max(1, Number(s.dataset.count));
  s.style.setProperty("--bar", `${s.clientWidth / e}px`);
}
function Bn(s) {
  const e = /* @__PURE__ */ new Date(`${s}T12:00:00Z`);
  return e.setUTCDate(e.getUTCDate() + 1), e.toISOString().slice(0, 10);
}
class jn extends H {
  static {
    this.properties = { ...H.properties, open: { state: !0 } };
  }
  static getConfigForm() {
    return { schema: [ye, ce], computeLabel: (e) => he[e.name] };
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
    const t = Ce(), n = t?.slot ?? null, o = n?.explanation ?? null;
    if (!t || !n) return this.frame(f`<p class="muted small">Für diesen Tag liegen keine Preise vor.</p>`);
    const r = this.units, i = `${He(t, n)}${t.phase ? ` · ${t.phase.name}` : ""}`;
    if (!o)
      return this.frame(f`<p class="kicker">${i}</p>
        <p class="price">${r.price(n.priceEurMwh, n.hour)}</p>
        <p class="muted small">Für diese Stunde gibt es noch keine Erklärung. Sie folgt, sobald Erzeugungsdaten oder Prognosen da sind, meist am Abend.</p>`);
    const l = this.open?.ts === o.ts ? this.open.key : null, a = o.facts, c = a.drivers.filter((u) => u.direction !== "info"), h = c.find((u) => u.key === l) ?? null;
    return this.frame(f`
      <p class="kicker">${i}${o.basedOnActuals ? "" : " · Prognose"}</p>
      <div class="top">
        <span class="price">${r.price(n.priceEurMwh, n.hour)}</span>
        ${r.unit !== "mein_preis" && a.priceVsMedianFactor != null ? f`<span class="small muted"><b class="ink">${En(a.priceVsMedianFactor)}</b> wie sonst zu dieser Stunde</span>` : g}
      </div>
      <h3>${o.headline}</h3>
      <p class="text">${r.text(Dn(o.text))}</p>
      ${c.length ? f`<div class="chips">
            ${c.map(
      (u) => f`<button type="button" class="chip ${u.direction} ${u.key === l ? "open" : ""}" aria-expanded=${u.key === l} @click=${() => this.open = u.key === l ? null : { ts: o.ts, key: u.key }}>
                  ${u.direction === "up" ? "▲" : "▼"} ${u.label}
                </button>`
    )}
          </div>
          ${h ? f`<p class="detail small">${r.text(h.detail)}</p>` : g}` : g}
      <p class="facts note">
        ${a.windMw != null ? f`<span>Wind <b class="ink">${ue(a.windMw)}</b>${a.windMedian30dMw != null ? ` (üblich ${ue(a.windMedian30dMw)})` : ""}</span>` : g}
        ${a.solarMw != null ? f`<span>Sonne <b class="ink">${ue(a.solarMw)}</b></span>` : g}
        ${a.residualMw != null ? f`<span>Restnachfrage <b class="ink">${ue(a.residualMw)}</b>${a.residualMedian30dMw != null ? ` (üblich ${ue(a.residualMedian30dMw)})` : ""}</span>` : g}
        <span>Preissetzer <b class="ink">${o.priceSetterLabel}</b> (Schätzung)</span>
      </p>
    `);
  }
  static {
    this.styles = [
      H.styles,
      ee`
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
const Gn = {
  wind: "var(--src-wind)",
  solar: "var(--src-solar)",
  bio: "var(--src-bio)",
  coal: "var(--src-coal)",
  gas: "url(#gas-hatch)",
  other: "var(--src-other)",
  forecastRest: "var(--src-other)"
}, mt = (s) => `${qe(s / 1e3)} GW`;
class Vn extends H {
  constructor() {
    super(...arguments), this.dragging = !1, this.cache = null;
  }
  static getConfigForm() {
    return { schema: [ce], computeLabel: (e) => he[e.name] };
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
    const t = Ce(), n = x.day === "yesterday" ? "Woher der Strom kam" : "Woher der Strom kommt";
    if (!t) return this.frame(f`<p class="muted small">Für diesen Tag liegen keine Daten vor.</p>`, n);
    this.cache?.quarters !== t.quarters && (this.cache = { quarters: t.quarters, mq: mn(t.quarters) });
    const o = this.cache.mq, r = Mt(t.day.date), i = r.start.getTime(), l = r.end.getTime(), a = wn(o, i, l);
    if (!a.hasData)
      return this.frame(f`<p class="muted small">Die Erzeugung erscheint hier, sobald die Prognosen für Wind, Sonne und Erzeugung veröffentlicht sind, meist am Abend.</p>`, n);
    const c = t.phase, h = ht(o, c ? Date.parse(c.from) : i, c ? Date.parse(c.to) : l);
    let u = "";
    if (h.renewableShare !== null) {
      const m = c ? `${c.name}, ${St(c)}` : "Ganzer Tag", A = qe(h.renewableShare * 100), R = h.renewableShare > 1.005;
      u = h.forecast ? `${m}: laut Prognose ${R ? `mehr Wind und Sonne als Erzeugungsbedarf (${A} %)` : `${A} % aus Wind und Sonne`}` : `${m}: ${R ? `mehr Ökostrom als Verbrauch (${A} %)` : `${A} % erneuerbar`}${h.gasMaxMw !== null && h.gasMaxMw >= 500 ? `, Gas bis ${mt(h.gasMaxMw)}` : ""}`;
    }
    const w = Math.max(1, t.slots.length), y = a.plot.w / w;
    let p = null;
    if (t.slot && t.idx !== null) {
      const m = ht(o, t.slot.ms, t.slot.ms + t.stepMs);
      if (m.windMw !== null && m.solarMw !== null && m.residualMw !== null && m.residualMw > 0) {
        const A = a.plot.x + (t.idx + 0.5) / w * a.plot.w, R = a.yOf(m.windMw + m.solarMw), B = a.yOf(m.windMw + m.solarMw + m.residualMw), j = `Rest ${mt(m.residualMw)}`, I = A + 6 + j.length * 5.6 < a.plot.x + a.plot.w;
        R - B >= 8 && (p = { x: A, y0: B, y1: R, text: j, tx: I ? A + 6 : A - 6, anchor: I ? "start" : "end" });
      }
    }
    const b = x.day === "today" && x.now >= i && x.now < l ? a.xOf(x.now) : null, d = (m) => {
      const R = m.currentTarget.getBoundingClientRect(), B = (m.clientX - R.left) / R.width * a.width, j = Math.floor((B - a.plot.x) / a.plot.w * w), I = t.slots[j];
      I && j !== t.idx && x.set({ selectedMs: I.ms });
    }, M = (m) => {
      m.pointerType === "mouse" && m.button !== 0 || (this.dragging = !0, m.currentTarget.setPointerCapture(m.pointerId), d(m));
    }, v = (m) => this.dragging && d(m), N = () => this.dragging = !1, P = (m, A, R, B = "middle") => S`<text x=${m} y=${A} text-anchor=${B} fill="var(--ink)" font-size="10" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">${R}</text>`;
    return this.frame(
      f`<p class="small line">${u}</p>
        <svg viewBox="0 0 ${a.width} ${a.height}" aria-hidden="true" @pointerdown=${M} @pointermove=${v} @pointerup=${N} @pointercancel=${N}>
          <defs>
            <pattern id="gas-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="4" height="4" fill="var(--src-gas)" />
              <rect width="1" height="4" fill="var(--src-gas-hatch)" />
            </pattern>
          </defs>
          ${c ? S`<rect x=${a.plot.x + c.startIdx * y} y=${a.plot.y} width=${(c.endIdx - c.startIdx) * y} height=${a.plot.h} fill="var(--soft)" />` : g}
          ${a.yTicks.map(
        (m) => S`<line x1=${a.plot.x} x2=${a.plot.x + a.plot.w} y1=${m.y} y2=${m.y} stroke="var(--rule)" stroke-width="1" vector-effect="non-scaling-stroke" />
              <text x=${a.plot.x - 5} y=${m.y + 3.5} text-anchor="end" fill="var(--muted-ink)" font-size="10">${m.label}</text>`
      )}
          <text x=${a.plot.x - 5} y=${a.plot.y - 8} text-anchor="end" fill="var(--muted-ink)" font-size="10">GW</text>
          ${a.layers.map((m) => S`<path d=${m.path} fill=${Gn[m.key]} />`)}
          ${a.forecastX !== null ? S`<rect x=${a.forecastX} y=${a.plot.y} width=${a.plot.x + a.plot.w - a.forecastX} height=${a.plot.h} fill="var(--halo)" opacity="0.45" />
              <line x1=${a.forecastX} x2=${a.forecastX} y1=${a.plot.y - 4} y2=${a.plot.y + a.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />
              <text x=${a.forecastX + 4} y=${a.plot.y - 6} fill="var(--muted-ink)" font-size="10">Prognose</text>` : g}
          ${t.idx !== null ? S`<rect x=${a.plot.x + t.idx * y} y=${a.plot.y} width=${y} height=${a.plot.h} fill="var(--hl)" opacity="0.38" />` : g}
          ${a.loadPath ? S`<path d=${a.loadPath} fill="none" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />` : g}
          ${a.forecastLoadPath ? S`<path d=${a.forecastLoadPath} fill="none" stroke="var(--ink)" stroke-width="1.25" stroke-dasharray="3 2" vector-effect="non-scaling-stroke" />` : g}
          ${b !== null ? S`<line x1=${b} x2=${b} y1=${a.plot.y} y2=${a.plot.y + a.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />` : g}
          ${a.labels.map((m) => P(m.x, m.y, m.text))} ${a.loadLabel ? P(a.loadLabel.x, a.loadLabel.y, a.loadLabel.text, "start") : g}
          ${p ? S`<line x1=${p.x} x2=${p.x} y1=${p.y0} y2=${p.y1} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              <line x1=${p.x - 3} x2=${p.x + 3} y1=${p.y0} y2=${p.y0} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              <line x1=${p.x - 3} x2=${p.x + 3} y1=${p.y1} y2=${p.y1} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              ${P(p.tx, (p.y0 + p.y1) / 2 + 3.5, p.text, p.anchor)}` : g}
          ${a.xTicks.map((m) => S`<text x=${m.x} y=${a.plot.y + a.plot.h + 14} text-anchor=${m.anchor} fill="var(--muted-ink)" font-size="10">${m.label}</text>`)}
        </svg>
        <p class="note">
          ${a.allForecast ? "Noch keine Messwerte: Wind, Sonne und die übrige Erzeugung sind Prognosen, die gestrichelte Linie die erwartete Gesamterzeugung." : "Erzeugung in GW: unten Wind und Sonne, darüber Bio, Kohle und Gas (schraffiert). Die Linie ist der Verbrauch; der Abstand zwischen Sonne und Linie ist die Restnachfrage."}
          ${a.forecastX !== null ? " Heller: Prognose." : ""}
        </p>`,
      n
    );
  }
  static {
    this.styles = [
      H.styles,
      ee`
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
const _e = 9e5, Me = 36e5;
class qn extends H {
  constructor() {
    super(...arguments), this.cache = null;
  }
  static getConfigForm() {
    return { schema: [ye, { name: "show_strip", selector: { boolean: {} } }, ce], computeLabel: (e) => he[e.name] };
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
    const t = x.home;
    (this.cache?.today !== t.today || this.cache?.tomorrow !== t.tomorrow) && (this.cache = { today: t.today, tomorrow: t.tomorrow, quarters: [...We(t.today), ...t.tomorrow ? We(t.tomorrow) : []] });
    const n = this.cache.quarters, o = x.now, r = n.find((p) => p.price !== null && o >= Date.parse(p.ts) && o < Date.parse(p.ts) + _e), i = this.units;
    if (!r || r.price === null) return this.frame(f`<p class="muted small">Noch keine Preise für jetzt.</p>`, "Strompreis");
    const l = Math.floor(o / _e) * _e, a = n.filter((p) => Date.parse(p.ts) >= l), [c] = cn(a, [3]), h = ae(r.price), u = t.tomorrow ? Date.parse(t.tomorrow.start) : 1 / 0, w = [], y = Date.parse(t.today.start) + t.today.slots * _e;
    for (let p = Math.floor(o / Me) * Me; p < y; p += Me) {
      const b = n.filter((d) => d.price !== null && Date.parse(d.ts) >= p && Date.parse(d.ts) < p + Me);
      b.length && w.push({ ms: p, price: b.reduce((d, M) => d + M.price, 0) / b.length });
    }
    return this.frame(f`
      <div class="top">
        <span class="kicker">${Dt(r.ts)}</span>
        <span class="level" style="--c: var(--lvl-${h})"><span class="swatch ${h === "negativ" ? "hatch" : ""}"></span>${Wn[h]}</span>
      </div>
      <p class="price">${i.price(r.price, r.ts)}</p>
      ${this.config.show_strip !== !1 && w.length > 1 ? f`<div class="strip" aria-hidden="true">
              ${w.map((p, b) => f`<span class="cell ${p.price < 0 ? "hatch" : ""} ${b === 0 ? "now" : ""}" style="background: var(--lvl-${ae(p.price)})"></span>`)}
            </div>
            <div class="axis note"><span>jetzt</span><span>24 Uhr</span></div>` : g}
      ${c ? f`<p class="small">
            Günstigste 3 Stunden ab jetzt: <b>${Date.parse(c.from) >= u ? "morgen " : ""}${G(c.from)}-${G(c.to)} Uhr</b>, im Schnitt
            ${i.price(c.avgEurMwh, c.from)}
          </p>` : g}
    `);
  }
  static {
    this.styles = [
      H.styles,
      ee`
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
const Zn = ["", "einer Phase", "zwei Phasen", "drei Phasen", "vier Phasen", "fünf Phasen"];
class Kn extends H {
  static getConfigForm() {
    return { schema: [ye, ce], computeLabel: (e) => he[e.name] };
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
    const t = Ce();
    if (!t || !t.phases.length) return this.frame(f`<p class="muted small">Noch keine Phasen für diesen Tag.</p>`, "Der Tag in Phasen");
    const n = this.units, o = t.phases.some((r) => r.text === null);
    return this.frame(
      f`${o ? f`<p class="note">Die Erklärungen folgen, sobald Erzeugungsdaten oder Prognosen da sind.</p>` : g}
        <ol>
          ${t.phases.map((r) => {
        const i = t.phase?.index === r.index, l = r.minEurMwh === r.maxEurMwh ? n.price(r.minEurMwh, r.keyHour) : `${n.number(r.minEurMwh, r.fromHour)} bis ${n.number(r.maxEurMwh, r.keyHour)} ${n.suffix}`, a = r.level === "high" ? `Am teuersten um ${r.keyHour} Uhr: ${n.price(r.maxEurMwh, r.keyHour)}` : r.level === "low" ? `Am günstigsten um ${r.keyHour} Uhr: ${n.price(r.minEurMwh, r.keyHour)}` : `Im Schnitt ${n.price(r.avgEurMwh, r.fromHour)}`;
        return f`<li class=${i ? "active" : ""}>
              <button type="button" class="row link" aria-pressed=${i} @click=${() => x.set({ selectedMs: Date.parse(r.keyTs) })}>
                <span class="bar" style="background: var(--lvl-${ae(r.avgEurMwh)})"></span>
                <span class="name">
                  <span class="title">${r.name}${t.nowPhase?.index === r.index ? f` <span class="badge">jetzt</span>` : g}</span>
                  <span class="note">${St(r)}${r.forecast ? " · Prognose" : ""}</span>
                </span>
                <span class="range small">${l}</span>
              </button>
              <div class="body">
                ${r.text ? f`<p>${n.text(r.text)}</p>` : g}
                <p class="key small muted">${a}</p>
              </div>
            </li>`;
      })}
        </ol>`,
      `Der Tag in ${Zn[t.phases.length] ?? `${t.phases.length} Phasen`}`
    );
  }
  static {
    this.styles = [
      H.styles,
      ee`
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
const Xn = 36e5;
class Yn extends H {
  static getConfigForm() {
    return { schema: [ye, ce], computeLabel: (e) => he[e.name] };
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
    const t = x.home, n = this.units, o = (i) => i === t.date ? "today" : i === t.yesterday.date ? "yesterday" : i === t.tomorrow?.date ? "tomorrow" : null, r = x.home ? x.day === "today" ? t.date : x.day === "yesterday" ? t.yesterday.date : t.tomorrow?.date : null;
    return this.frame(
      f`<div class="grid axis">
          <span></span>
          <div class="hours note">${[0, 6, 12, 18].map((i) => f`<span style="left: ${i / 24 * 100}%">${i}</span>`)}<span class="end">24 Uhr</span></div>
          <span class="note right">beste 3 h</span>
        </div>
        <ol>
          ${t.week.map((i) => {
        const l = o(i.date), a = l === "today" ? "Heute" : l === "tomorrow" ? "Morgen" : _n(i.date), c = Math.max(1, i.hourly.length), h = Mt(i.date).start.getTime(), u = i.window, w = u ? { left: (Date.parse(u.from) - h) / Xn / c * 100, width: u.hours / c * 100 } : null, y = i.hourly.some((b) => b !== null), p = f`<span class="day ${i.date === r ? "current" : ""}">${a}</span>
              <span class="cells-wrap">
                <span class="cells">
                  ${i.hourly.map((b) => f`<span class="cell ${b !== null && b < 0 ? "hatch" : ""}" style="background: ${b === null ? "var(--soft)" : `var(--lvl-${ae(b)})`}"></span>`)}
                </span>
                ${w ? f`<span class="frame" style="left: ${w.left}%; width: ${w.width}%"></span>` : g}
              </span>
              <span class="small right">
                ${u ? f`${G(u.from)}-${G(u.to)} · ${n.number(u.avgEurMwh, u.from)} ${n.unit === "eur_mwh" ? "€/MWh" : "ct"}` : y ? "" : f`<span class="muted">noch keine Preise</span>`}
              </span>`;
        return f`<li class=${i.date === r ? "current" : ""}>
              ${l ? f`<button type="button" class="grid link" title="Diesen Tag in den anderen Karten zeigen" @click=${() => x.set({ day: l })}>${p}</button>` : f`<div class="grid">${p}</div>`}
            </li>`;
      })}
        </ol>
        <p class="note">Farben wie im Preisstreifen; der Rahmen markiert die günstigsten drei Stunden des Tages.</p>`,
      "Diese Woche"
    );
  }
  static {
    this.styles = [
      H.styles,
      ee`
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
const Qn = [
  { type: "strompreis-now-card", element: qn, name: "Strompreis jetzt", description: "Preis der laufenden Viertelstunde, Preisstufe und die günstigsten 3 Stunden ab jetzt." },
  { type: "strompreis-day-card", element: Fn, name: "Strompreis Tag", description: "Tagesbild, Preisverlauf mit Phasen und Preisstreifen für gestern, heute und morgen." },
  { type: "strompreis-phases-card", element: Kn, name: "Strompreis Phasen", description: "Der Tag in Phasen, mit Erklärung zu jeder Phase." },
  { type: "strompreis-mix-card", element: Vn, name: "Strompreis Woher der Strom kommt", description: "Erzeugung aus Wind, Sonne, Kohle und Gas, der Verbrauch und die Restnachfrage." },
  { type: "strompreis-hour-card", element: jn, name: "Strompreis Stunde im Detail", description: "Warum der Preis in der gewählten Stunde so ist." },
  { type: "strompreis-week-card", element: Yn, name: "Strompreis Woche", description: "Die letzten sieben Tage, heute und morgen mit den günstigsten 3 Stunden." }
];
window.customCards ??= [];
for (const s of Qn)
  customElements.get(s.type) || customElements.define(s.type, s.element), window.customCards.some((e) => e.type === s.type) || window.customCards.push({ type: s.type, name: s.name, description: s.description, preview: !0, documentationURL: "https://github.com/ehrma/ha-strompreis-verstehen" });
console.info("%c STROMPREIS-VERSTEHEN %c cards loaded ", "background:#f5c518;color:#15181c;font-weight:600", "");
