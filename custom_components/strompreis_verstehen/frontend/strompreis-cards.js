/*!
Third-party software in this build / Software Dritter in diesem Build
=====================================================================

@lit/reactive-element 2.1.2 (BSD-3-Clause)
https://lit.dev/

BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

----------------------------------------

lit-element 4.2.2 (BSD-3-Clause)
https://lit.dev/

BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.

----------------------------------------

lit-html 3.3.3 (BSD-3-Clause)
https://lit.dev/

BSD 3-Clause License

Copyright (c) 2017 Google LLC. All rights reserved.

Redistribution and use in source and binary forms, with or without
modification, are permitted provided that the following conditions are met:

1. Redistributions of source code must retain the above copyright notice, this
   list of conditions and the following disclaimer.

2. Redistributions in binary form must reproduce the above copyright notice,
   this list of conditions and the following disclaimer in the documentation
   and/or other materials provided with the distribution.

3. Neither the name of the copyright holder nor the names of its
   contributors may be used to endorse or promote products derived from
   this software without specific prior written permission.

THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE
FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/
const De = globalThis, Ge = De.ShadowRoot && (De.ShadyCSS === void 0 || De.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, je = /* @__PURE__ */ Symbol(), tt = /* @__PURE__ */ new WeakMap();
let Et = class {
  constructor(e, t, n) {
    if (this._$cssResult$ = !0, n !== je) throw Error("CSSResult is not constructable. Use `unsafeCSS` or `css` instead.");
    this.cssText = e, this.t = t;
  }
  get styleSheet() {
    let e = this.o;
    const t = this.t;
    if (Ge && e === void 0) {
      const n = t !== void 0 && t.length === 1;
      n && (e = tt.get(t)), e === void 0 && ((this.o = e = new CSSStyleSheet()).replaceSync(this.cssText), n && tt.set(t, e));
    }
    return e;
  }
  toString() {
    return this.cssText;
  }
};
const Vt = (r) => new Et(typeof r == "string" ? r : r + "", void 0, je), ne = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((n, i, s) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[s + 1], r[0]);
  return new Et(t, r, je);
}, Kt = (r, e) => {
  if (Ge) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), i = De.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = t.cssText, r.appendChild(n);
  }
}, nt = Ge ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return Vt(t);
})(r) : r;
const { is: qt, defineProperty: Xt, getOwnPropertyDescriptor: Qt, getOwnPropertyNames: Yt, getOwnPropertySymbols: Jt, getPrototypeOf: en } = Object, Te = globalThis, rt = Te.trustedTypes, tn = rt ? rt.emptyScript : "", nn = Te.reactiveElementPolyfillSupport, $e = (r, e) => r, He = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? tn : null;
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
} }, At = (r, e) => !qt(r, e), st = { attribute: !0, type: String, converter: He, reflect: !1, useDefault: !1, hasChanged: At };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Te.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let ae = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = st) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, n, t);
      i !== void 0 && Xt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: i, set: s } = Qt(this.prototype, e) ?? { get() {
      return this[t];
    }, set(o) {
      this[t] = o;
    } };
    return { get: i, set(o) {
      const c = i?.call(this);
      s?.call(this, o), this.requestUpdate(e, c, n);
    }, configurable: !0, enumerable: !0 };
  }
  static getPropertyOptions(e) {
    return this.elementProperties.get(e) ?? st;
  }
  static _$Ei() {
    if (this.hasOwnProperty($e("elementProperties"))) return;
    const e = en(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty($e("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty($e("properties"))) {
      const t = this.properties, n = [...Yt(t), ...Jt(t)];
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
      for (const i of n) t.unshift(nt(i));
    } else e !== void 0 && t.push(nt(e));
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
    return Kt(e, this.constructor.elementStyles), e;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : He).toAttribute(t, n.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const n = this.constructor, i = n._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = n.getPropertyOptions(i), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : He;
      this._$Em = i;
      const c = o.fromAttribute(t, s.type);
      this[i] = c ?? this._$Ej?.get(i) ?? c, this._$Em = null;
    }
  }
  requestUpdate(e, t, n, i = !1, s) {
    if (e !== void 0) {
      const o = this.constructor;
      if (i === !1 && (s = this[e]), n ??= o.getPropertyOptions(e), !((n.hasChanged ?? At)(s, t) || n.useDefault && n.reflect && s === this._$Ej?.get(e) && !this.hasAttribute(o._$Eu(e, n)))) return;
      this.C(e, t, n);
    }
    this.isUpdatePending === !1 && (this._$ES = this._$EP());
  }
  C(e, t, { useDefault: n, reflect: i, wrapped: s }, o) {
    n && !(this._$Ej ??= /* @__PURE__ */ new Map()).has(e) && (this._$Ej.set(e, o ?? t ?? this[e]), s !== !0 || o !== void 0) || (this._$AL.has(e) || (this.hasUpdated || n || (t = void 0), this._$AL.set(e, t)), i === !0 && this._$Em !== e && (this._$Eq ??= /* @__PURE__ */ new Set()).add(e));
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
        const { wrapped: o } = s, c = this[i];
        o !== !0 || this._$AL.has(i) || c === void 0 || this.C(i, void 0, s, c);
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
ae.elementStyles = [], ae.shadowRootOptions = { mode: "open" }, ae[$e("elementProperties")] = /* @__PURE__ */ new Map(), ae[$e("finalized")] = /* @__PURE__ */ new Map(), nn?.({ ReactiveElement: ae }), (Te.reactiveElementVersions ??= []).push("2.1.2");
const Ze = globalThis, it = (r) => r, Pe = Ze.trustedTypes, ot = Pe ? Pe.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Dt = "$lit$", X = `lit$${Math.random().toFixed(9).slice(2)}$`, Pt = "?" + X, rn = `<${Pt}>`, te = document, be = () => te.createComment(""), xe = (r) => r === null || typeof r != "object" && typeof r != "function", Ve = Array.isArray, sn = (r) => Ve(r) || typeof r?.[Symbol.iterator] == "function", Oe = `[ 	
\f\r]`, ge = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, at = /-->/g, lt = />/g, J = RegExp(`>|${Oe}(?:([^\\s"'>=/]+)(${Oe}*=${Oe}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ct = /'/g, ht = /"/g, Tt = /^(?:script|style|textarea|title)$/i, zt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), f = zt(1), A = zt(2), ce = /* @__PURE__ */ Symbol.for("lit-noChange"), g = /* @__PURE__ */ Symbol.for("lit-nothing"), ut = /* @__PURE__ */ new WeakMap(), ee = te.createTreeWalker(te, 129);
function Ct(r, e) {
  if (!Ve(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(e) : e;
}
const on = (r, e) => {
  const t = r.length - 1, n = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = ge;
  for (let c = 0; c < t; c++) {
    const l = r[c];
    let a, h, u = -1, d = 0;
    for (; d < l.length && (o.lastIndex = d, h = o.exec(l), h !== null); ) d = o.lastIndex, o === ge ? h[1] === "!--" ? o = at : h[1] !== void 0 ? o = lt : h[2] !== void 0 ? (Tt.test(h[2]) && (i = RegExp("</" + h[2], "g")), o = J) : h[3] !== void 0 && (o = J) : o === J ? h[0] === ">" ? (o = i ?? ge, u = -1) : h[1] === void 0 ? u = -2 : (u = o.lastIndex - h[2].length, a = h[1], o = h[3] === void 0 ? J : h[3] === '"' ? ht : ct) : o === ht || o === ct ? o = J : o === at || o === lt ? o = ge : (o = J, i = void 0);
    const y = o === J && r[c + 1].startsWith("/>") ? " " : "";
    s += o === ge ? l + rn : u >= 0 ? (n.push(a), l.slice(0, u) + Dt + l.slice(u) + X + y) : l + X + (u === -2 ? c : y);
  }
  return [Ct(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class ye {
  constructor({ strings: e, _$litType$: t }, n) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const c = e.length - 1, l = this.parts, [a, h] = on(e, t);
    if (this.el = ye.createElement(a, n), ee.currentNode = this.el.content, t === 2 || t === 3) {
      const u = this.el.content.firstChild;
      u.replaceWith(...u.childNodes);
    }
    for (; (i = ee.nextNode()) !== null && l.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const u of i.getAttributeNames()) if (u.endsWith(Dt)) {
          const d = h[o++], y = i.getAttribute(u).split(X), b = /([.?@])?(.*)/.exec(d);
          l.push({ type: 1, index: s, name: b[2], strings: y, ctor: b[1] === "." ? ln : b[1] === "?" ? cn : b[1] === "@" ? hn : ze }), i.removeAttribute(u);
        } else u.startsWith(X) && (l.push({ type: 6, index: s }), i.removeAttribute(u));
        if (Tt.test(i.tagName)) {
          const u = i.textContent.split(X), d = u.length - 1;
          if (d > 0) {
            i.textContent = Pe ? Pe.emptyScript : "";
            for (let y = 0; y < d; y++) i.append(u[y], be()), ee.nextNode(), l.push({ type: 2, index: ++s });
            i.append(u[d], be());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Pt) l.push({ type: 2, index: s });
      else {
        let u = -1;
        for (; (u = i.data.indexOf(X, u + 1)) !== -1; ) l.push({ type: 7, index: s }), u += X.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const n = te.createElement("template");
    return n.innerHTML = e, n;
  }
}
function he(r, e, t = r, n) {
  if (e === ce) return e;
  let i = n !== void 0 ? t._$Co?.[n] : t._$Cl;
  const s = xe(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== s && (i?._$AO?.(!1), s === void 0 ? i = void 0 : (i = new s(r), i._$AT(r, t, n)), n !== void 0 ? (t._$Co ??= [])[n] = i : t._$Cl = i), i !== void 0 && (e = he(r, i._$AS(r, e.values), i, n)), e;
}
class an {
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
    const { el: { content: t }, parts: n } = this._$AD, i = (e?.creationScope ?? te).importNode(t, !0);
    ee.currentNode = i;
    let s = ee.nextNode(), o = 0, c = 0, l = n[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let a;
        l.type === 2 ? a = new ve(s, s.nextSibling, this, e) : l.type === 1 ? a = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (a = new un(s, this, e)), this._$AV.push(a), l = n[++c];
      }
      o !== l?.index && (s = ee.nextNode(), o++);
    }
    return ee.currentNode = te, i;
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
    this.type = 2, this._$AH = g, this._$AN = void 0, this._$AA = e, this._$AB = t, this._$AM = n, this.options = i, this._$Cv = i?.isConnected ?? !0;
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
    e = he(this, e, t), xe(e) ? e === g || e == null || e === "" ? (this._$AH !== g && this._$AR(), this._$AH = g) : e !== this._$AH && e !== ce && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : sn(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== g && xe(this._$AH) ? this._$AA.nextSibling.data = e : this.T(te.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: n } = e, i = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ye.createElement(Ct(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const s = new an(i, this), o = s.u(this.options);
      s.p(t), this.T(o), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = ut.get(e.strings);
    return t === void 0 && ut.set(e.strings, t = new ye(e)), t;
  }
  k(e) {
    Ve(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, i = 0;
    for (const s of e) i === t.length ? t.push(n = new ve(this.O(be()), this.O(be()), this, this.options)) : n = t[i], n._$AI(s), i++;
    i < t.length && (this._$AR(n && n._$AB.nextSibling, i), t.length = i);
  }
  _$AR(e = this._$AA.nextSibling, t) {
    for (this._$AP?.(!1, !0, t); e !== this._$AB; ) {
      const n = it(e).nextSibling;
      it(e).remove(), e = n;
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
    this.type = 1, this._$AH = g, this._$AN = void 0, this.element = e, this.name = t, this._$AM = i, this.options = s, n.length > 2 || n[0] !== "" || n[1] !== "" ? (this._$AH = Array(n.length - 1).fill(new String()), this.strings = n) : this._$AH = g;
  }
  _$AI(e, t = this, n, i) {
    const s = this.strings;
    let o = !1;
    if (s === void 0) e = he(this, e, t, 0), o = !xe(e) || e !== this._$AH && e !== ce, o && (this._$AH = e);
    else {
      const c = e;
      let l, a;
      for (e = s[0], l = 0; l < s.length - 1; l++) a = he(this, c[n + l], t, l), a === ce && (a = this._$AH[l]), o ||= !xe(a) || a !== this._$AH[l], a === g ? e = g : e !== g && (e += (a ?? "") + s[l + 1]), this._$AH[l] = a;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === g ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class ln extends ze {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === g ? void 0 : e;
  }
}
class cn extends ze {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== g);
  }
}
class hn extends ze {
  constructor(e, t, n, i, s) {
    super(e, t, n, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = he(this, e, t, 0) ?? g) === ce) return;
    const n = this._$AH, i = e === g && n !== g || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== g && (n === g || i);
    i && this.element.removeEventListener(this.name, this, n), s && this.element.addEventListener(this.name, this, e), this._$AH = e;
  }
  handleEvent(e) {
    typeof this._$AH == "function" ? this._$AH.call(this.options?.host ?? this.element, e) : this._$AH.handleEvent(e);
  }
}
class un {
  constructor(e, t, n) {
    this.element = e, this.type = 6, this._$AN = void 0, this._$AM = t, this.options = n;
  }
  get _$AU() {
    return this._$AM._$AU;
  }
  _$AI(e) {
    he(this, e);
  }
}
const dn = Ze.litHtmlPolyfillSupport;
dn?.(ye, ve), (Ze.litHtmlVersions ??= []).push("3.3.3");
const pn = (r, e, t) => {
  const n = t?.renderBefore ?? e;
  let i = n._$litPart$;
  if (i === void 0) {
    const s = t?.renderBefore ?? null;
    n._$litPart$ = i = new ve(e.insertBefore(be(), s), s, void 0, t ?? {});
  }
  return i._$AI(r), i;
};
const Ke = globalThis;
class we extends ae {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = pn(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return ce;
  }
}
we._$litElement$ = !0, we.finalized = !0, Ke.litElementHydrateSupport?.({ LitElement: we });
const mn = Ke.litElementPolyfillSupport;
mn?.({ LitElement: we });
(Ke.litElementVersions ??= []).push("4.2.2");
const gn = [
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
Object.fromEntries(gn.map((r) => [r.key, r]));
const re = "Europe/Berlin", dt = /* @__PURE__ */ new Map();
function fn(r, e = re) {
  const t = e + JSON.stringify(r);
  let n = dt.get(t);
  return n || (n = new Intl.DateTimeFormat("de-DE", { timeZone: e, ...r }), dt.set(t, n)), n;
}
function qe(r, e = re) {
  const t = fn({
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
function $n(r, e = re) {
  const t = qe(r, e), n = Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, t.second);
  return Math.round((n - r.getTime()) / 6e4);
}
function wn(r, e = re) {
  const t = qe(r, e);
  return `${t.year}-${String(t.month).padStart(2, "0")}-${String(t.day).padStart(2, "0")}`;
}
function se(r, e = re) {
  return qe(r, e).hour;
}
function pt(r, e = 0, t = 0, n = re) {
  const [i, s, o] = r.split("-").map(Number), c = Date.UTC(i, s - 1, o, e, t);
  let l = new Date(c);
  for (let a = 0; a < 2; a++) {
    const h = $n(l, n);
    l = new Date(c - h * 6e4);
  }
  return l;
}
function It(r, e = re) {
  const t = pt(r, 0, 0, e), n = bn(r, 1);
  return { start: t, end: pt(n, 0, 0, e) };
}
function bn(r, e) {
  const [t, n, i] = r.split("-").map(Number);
  return new Date(Date.UTC(t, n - 1, i + e)).toISOString().slice(0, 10);
}
function xn(r, e = 0) {
  const t = 10 ** e;
  return Math.round(r * t) / t;
}
function Q(r, e = 0) {
  const t = xn(r, e).toFixed(e), [n, i] = t.split("."), s = n.startsWith("-"), c = (s ? n.slice(1) : n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (s ? "-" : "") + c + (i ? "," + i : "");
}
function F(r, e = 0) {
  return `${Q(r, e)} €/MWh`;
}
function yn(r, e = 1) {
  return `${Q(r / 10, e)} ct/kWh`;
}
const Wt = /(-?\d{1,3}(?:\.\d{3})*(?:,\d+)?) €\/MWh/g;
function vn(r) {
  return r.replace(Wt, (e, t) => yn(Number(t.replace(/\./g, "").replace(",", "."))));
}
function kn(r, e) {
  let t = 0;
  return r.replace(Wt, (n, i) => F(e(Number(i.replace(/\./g, "").replace(",", ".")), t++)));
}
const q = (...r) => ({ kind: "p", parts: r }), V = (r) => ({ strong: r });
q(V("Dynamischer Tarif"), " (zum Beispiel Tibber, Octopus oder Rabot): Ihr Preis folgt Stunde für Stunde der Börse."), q("Der Aufschlag ist alles, was zum Börsenpreis dazukommt, schon mit Mehrwertsteuer: Netzentgelt, Stromsteuer, Umlagen, Konzessionsabgabe und der Aufschlag Ihres Anbieters. Ein Beispiel: Kostet Strom an der Börse 8 ct/kWh und beträgt Ihr Aufschlag 20 ct/kWh, zahlen Sie 8 × 1,19 + 20 = 29,5 ct/kWh."), q("Mit einem zeitvariablen Netzentgelt (§14a EnWG, Modul 3, für Wärmepumpe oder Wallbox) gilt in bestimmten Stunden ein anderer Aufschlag. Dann rechnet die Seite in jeder Stunde mit dem Aufschlag, der zu dieser Uhrzeit gilt."), q(V("Zeitvariabler Tarif (HT/NT)"), ": Ihr Preis hängt nicht von der Börse ab, nur von der Uhrzeit. In einem Zeitfenster gilt dessen Preis, sonst der Preis außerhalb der Zeitfenster. Die Kurven zeigen dann Stufen, und ein teurer Abend an der Börse ändert nichts an Ihrem Preis."), q("Der Grundpreis pro Monat ist in keinem Stundenpreis enthalten, denn er hängt nicht davon ab, wann Sie Strom verbrauchen. Solange Sie keinen eigenen Tarif eintragen, rechnet die Seite mit bundesweiten Schätzwerten; welche das sind, steht unter ", { text: "Mein Preis", href: "/tarif" }, "."), V("Dynamischer Tarif"), V("Zeitvariabler Tarif (HT/NT)"), V("Aufschlag auf den Börsenpreis"), V("Preis außerhalb der Zeitfenster"), V("Speichern und überall anzeigen"), V("Speichern"), q("Nur auf dem Gerät, auf dem Sie ihn eintragen: im Speicher des Browsers oder der App. Es gibt kein Konto, und der Tarif wird nicht an den Server geschickt. Deshalb gilt er nur dort, wo Sie ihn eingetragen haben. ", V("Laptop, Handy-Browser und App brauchen ihn jeweils einzeln."), " Wer die Websitedaten im Browser löscht, löscht auch den Tarif; dann rechnet die Seite wieder mit den Schätzwerten."), q("In der App nutzen auch die Widgets auf dem Startbildschirm und der Preis-Alarm den gespeicherten Tarif. Die Angaben bleiben dabei auf dem Gerät."), q("Die Übersicht zeigt, was bei „Mein Preis“ Ihren Preis zeigt und was beim Börsenpreis bleibt. Was beim Börsenpreis bleibt, beschreibt den Markt oder kennt Ihren Tarif nicht, und ist auf der Seite so beschriftet.");
const Sn = { validFrom: "2026-01-01", validTo: "2026-12-31" }, _n = {
  haushaltsDurchschnitt: {
    ...Sn
  }
}, Mn = _n;
Number(Mn.haushaltsDurchschnitt.validFrom.slice(0, 4));
const mt = 36e5, gt = 9e5, En = [
  { key: "negativ", label: "negativ", upTo: 0 },
  { key: "sehr_guenstig", label: "sehr günstig", upTo: 80 },
  { key: "guenstig", label: "günstig", upTo: 130 },
  { key: "mittel", label: "mittel", upTo: 180 },
  { key: "teuer", label: "teuer", upTo: 230 },
  { key: "sehr_teuer", label: "sehr teuer", upTo: Number.POSITIVE_INFINITY }
];
function ue(r) {
  for (const e of En)
    if (r < e.upTo)
      return e.key;
  return "sehr_teuer";
}
function An(r, e = []) {
  const t = new Map(e.map((s) => [Date.parse(s.ts), s])), n = /* @__PURE__ */ new Map();
  for (const s of r) {
    if (s.price === null)
      continue;
    const o = Math.floor(Date.parse(s.ts) / mt) * mt, c = n.get(o) ?? { sum: 0, n: 0, neg: 0 };
    c.sum += s.price, c.n += 1, s.price < 0 && (c.neg += 1), n.set(o, c);
  }
  return [.../* @__PURE__ */ new Set([...n.keys(), ...t.keys()])].sort((s, o) => s - o).map((s) => {
    const o = t.get(s) ?? null, c = n.get(s), l = new Date(s);
    return { ts: l.toISOString(), ms: s, hour: o?.hour ?? se(l), priceEurMwh: c ? c.sum / c.n : o.priceEurMwh, negativeQuarters: c?.neg ?? (o && o.priceEurMwh < 0 ? 4 : 0), explanation: o };
  });
}
function Xe(r, e = [2, 3, 4]) {
  const t = r.filter((i) => i.price !== null).map((i) => ({ ms: Date.parse(i.ts), price: i.price })), n = [];
  for (const i of e) {
    const s = i * 4;
    let o = null;
    for (let c = 0; c + s <= t.length; c++) {
      if (t[c + s - 1].ms - t[c].ms !== (s - 1) * gt)
        continue;
      let l = 0;
      for (let h = c; h < c + s; h++)
        l += t[h].price;
      const a = l / s;
      (o === null || a < o.avg) && (o = { i: c, avg: a });
    }
    o && n.push({ hours: i, from: new Date(t[o.i].ms).toISOString(), to: new Date(t[o.i].ms + s * gt).toISOString(), avgEurMwh: o.avg });
  }
  return n;
}
function Dn(r, e) {
  const t = e === "teurer" ? " Insgesamt teurer als in den letzten 30 Tagen üblich." : e === "guenstiger" ? " Insgesamt günstiger als in den letzten 30 Tagen üblich." : e === "ueblich" ? " Insgesamt etwa wie üblich." : "";
  return `Zwischen ${F(r.min)} um ${r.minHour} Uhr und ${F(r.max)} um ${r.maxHour} Uhr, im Schnitt ${F(r.avg)}.${t}`;
}
function Ot(r) {
  return `${r.fromHour}-${r.toHour} Uhr`;
}
const Se = (r) => {
  const e = new Date(r);
  return `${String(se(e)).padStart(2, "0")}:${String(e.getUTCMinutes()).padStart(2, "0")}`;
};
function ft(r, e) {
  const t = r.verdict, n = e.verdict;
  if (!t || !n)
    return null;
  let i;
  if (Math.abs(n.avgEurMwh) < 5)
    i = `Morgen kostet Strom im Schnitt ${F(t.avgEurMwh)}, heute ${F(n.avgEurMwh)}.`;
  else {
    const l = (t.avgEurMwh - n.avgEurMwh) / Math.abs(n.avgEurMwh) * 100;
    i = Math.abs(l) < 3 ? `Morgen kostet Strom im Schnitt ${F(t.avgEurMwh)}, etwa so viel wie heute (${F(n.avgEurMwh)}).` : `Morgen kostet Strom im Schnitt ${F(t.avgEurMwh)}, ${Q(Math.abs(l), 0)} % ${l > 0 ? "mehr" : "weniger"} als heute (${F(n.avgEurMwh)}).`;
  }
  const s = r.windows.find((l) => l.hours === 3), o = e.windows.find((l) => l.hours === 3), c = s && o ? ` Die günstigsten drei Stunden: morgen ${Se(s.from)}-${Se(s.to)} Uhr (${F(s.avgEurMwh)}), heute ${Se(o.from)}-${Se(o.to)} Uhr (${F(o.avgEurMwh)}).` : "";
  return i + c;
}
function $t(r) {
  return r.shiftSavingEur === null || r.shiftSavingEur < 0.2 ? null : `10 kWh von ${r.maxHour} auf ${r.minHour} Uhr verschoben: rund ${Q(r.shiftSavingEur, 2)} € gespart.`;
}
const Qe = (r) => r;
function Ut(r, e = Qe) {
  if (r.length === 0)
    return null;
  let t = 1 / 0, n = -1 / 0, i = 0, s = 0, o = 0;
  for (const c of r) {
    const l = e(c.priceEurMwh, c.hour);
    o += l, l < t && (t = l, i = c.hour), l > n && (n = l, s = c.hour);
  }
  return { min: t, minHour: i, max: n, maxHour: s, avg: o / r.length };
}
function Ye(r, e) {
  return r.map((t) => t.price === null ? t : { ...t, price: e(t.price, se(new Date(t.ts))) });
}
const Pn = [
  [/Der Preis (lag|liegt) rund/g, "Der Börsenpreis $1 rund"],
  [/(€\/MWh|ct\/kWh) davon sind ein Knappheitsaufschlag/g, "$1 des Börsenpreises sind ein Knappheitsaufschlag"]
];
function Tn(r) {
  return Pn.reduce((e, [t, n]) => e.replace(t, n), r);
}
const wt = 6.2, zn = 6.4;
function Cn(r) {
  for (const e of [50, 100, 200, 500, 1e3, 2e3])
    if (r / e <= 6)
      return e;
  return 5e3;
}
function In(r, e, t = {}) {
  const n = t.width ?? 360, i = t.height ?? 214, s = t.top ?? 40, o = t.bottom ?? 34, c = t.left ?? 30, l = t.right ?? 8, a = { x: c, y: s, w: n - c - l, h: i - s - o }, h = Math.max(1, r.length), u = a.w / h, d = t.map ?? Qe, y = r.map((k) => d(k.priceEurMwh, k.hour)), b = y.length ? Math.max(...y) : 100, w = y.length ? Math.min(...y) : 0, p = Cn(Math.max(b, 50) * 1.15 - Math.min(0, w)), z = Math.max(p, Math.ceil(b * 1.15 / p) * p), S = w < 0 ? Math.floor(w / p) * p : 0, P = (k) => a.y + a.h - (k - S) / (z - S) * a.h, v = P(Math.max(S, 0)), M = [];
  for (let k = S; k <= z + 1e-9; k += p)
    M.push({ y: P(k), label: Q(k / 10, 0) });
  const $ = [];
  for (const k of [0, 6, 12, 18]) {
    const W = r.findIndex((N) => N.hour === k);
    W >= 0 && $.push({ x: a.x + W * u, label: String(k), anchor: k === 0 ? "start" : "middle" });
  }
  $.push({ x: a.x + a.w, label: "24", anchor: "end" });
  let T = "";
  r.length && (T = `M${ie(a.x)},${ie(P(y[0]))}`, r.forEach((k, W) => {
    const N = a.x + (W + 1) * u;
    T += ` H${ie(N)}`, W < r.length - 1 && (T += ` V${ie(P(y[W + 1]))}`);
  }));
  const H = r.length ? `${T} V${ie(v)} H${ie(a.x)} Z` : "", G = r.map((k, W) => ({ index: W, x: a.x + W * u, w: u, y: P(y[W]), level: ue(k.priceEurMwh), hour: k.hour })), j = e.map((k) => {
    const W = a.x + k.startIdx * u, N = (k.endIdx - k.startIdx) * u, x = k.name.length * zn + 8 <= N;
    return { index: k.index, x: W, w: N, label: x ? k.name : N >= 18 ? String(k.index + 1) : null, name: k.name };
  }), Z = [];
  if (r.length >= 2 && b !== w) {
    const k = y.indexOf(b), W = y.indexOf(w), N = (C) => a.x + (C + 0.5) * u, x = (C, _, U) => {
      const R = _.length * wt, I = N(C);
      return I - R / 2 < a.x ? { x: a.x + u * 0.2, y: U, text: _, anchor: "start" } : I + R / 2 > a.x + a.w ? { x: a.x + a.w - u * 0.2, y: U, text: _, anchor: "end" } : { x: I, y: U, text: _, anchor: "middle" };
    }, E = x(k, `▲ ${Q(b / 10, 1)} ct · ${r[k].hour} Uhr`, P(b) - 7);
    Z.push(E);
    const D = P(w), L = D + 16, O = x(W, `▼ ${Q(w / 10, 1)} ct · ${r[W].hour} Uhr`, L <= a.y + a.h - 2 ? L : D - 7);
    Math.abs(O.y - E.y) < 12 && Math.abs(O.x - E.x) < (O.text.length + E.text.length) * wt * 0.5 && (O.y = E.y + 13), Z.push(O);
  }
  const Ie = t.now && t.now.index >= 0 && t.now.index < h ? { x: a.x + (t.now.index + Math.min(1, Math.max(0, t.now.fraction))) * u, label: t.now.label } : null;
  return { width: n, height: i, plot: a, slotW: u, yOf: P, yTicks: M, xTicks: $, areaPath: H, linePath: T, zeroY: S < 0 ? P(0) : null, baselineY: v, slots: G, bands: j, labels: Z, now: Ie, yMax: z, yMin: S };
}
function ie(r) {
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
], le = 9e5, Wn = 36e5;
function Me(...r) {
  let e = 0, t = 0;
  for (const n of r)
    n !== null && (e += n, t++);
  return t ? e : null;
}
function On(r) {
  const e = r, t = (s) => {
    const o = e[s];
    return o.load != null && o.windOnshore != null && o.windOffshore != null && o.solar != null && o.lignite != null && o.hardCoal != null && o.gas != null;
  };
  let n = -1;
  for (let s = 0; s < e.length; s++)
    t(s) && (n = s);
  const i = (s, o) => {
    const c = e[s][o];
    if (c !== null)
      return c;
    const l = e[s - 1]?.[o] ?? null, a = s + 1 <= n ? e[s + 1]?.[o] ?? null : null;
    return l !== null && a !== null ? (l + a) / 2 : l ?? a;
  };
  return e.map((s, o) => {
    const c = Date.parse(s.ts), l = { wind: 0, solar: 0, bio: 0, coal: 0, gas: 0, other: 0, forecastRest: 0 };
    return o <= n && s.load != null ? {
      ms: c,
      actual: !0,
      forecast: !1,
      layers: {
        ...l,
        wind: Me(i(o, "windOnshore"), i(o, "windOffshore")) ?? 0,
        solar: i(o, "solar") ?? 0,
        bio: Me(i(o, "biomass"), i(o, "hydro"), i(o, "otherRenewable")) ?? 0,
        coal: Me(i(o, "lignite"), i(o, "hardCoal")) ?? 0,
        gas: i(o, "gas") ?? 0,
        // nuclear only exists on days before April 2023; it is too small a layer today to name on its own
        other: Me(i(o, "pumpedStorage"), i(o, "otherConventional"), i(o, "nuclear")) ?? 0
      },
      load: s.load
    } : s.forecastGeneration != null && s.forecastWind != null && s.forecastSolar != null ? {
      ms: c,
      actual: !1,
      forecast: !0,
      layers: { ...l, wind: s.forecastWind, solar: s.forecastSolar, forecastRest: Math.max(0, s.forecastGeneration - s.forecastWind - s.forecastSolar) },
      load: s.forecastGeneration
    } : null;
  });
}
function bt(r, e, t) {
  const n = r.filter((l) => l !== null && l.ms >= e && l.ms < t);
  if (!n.length)
    return { renewableShare: null, windMw: null, solarMw: null, residualMw: null, gasMw: null, gasMaxMw: null, forecast: !1 };
  const i = (l) => n.reduce((a, h) => a + l(h), 0) / n.length, s = n.filter((l) => l.actual), o = n.reduce((l, a) => l + (a.load ?? 0), 0), c = n.reduce((l, a) => l + a.layers.wind + a.layers.solar + a.layers.bio, 0);
  return {
    renewableShare: o > 0 ? c / o : null,
    windMw: i((l) => l.layers.wind),
    solarMw: i((l) => l.layers.solar),
    residualMw: i((l) => (l.load ?? 0) - l.layers.wind - l.layers.solar),
    gasMw: s.length ? s.reduce((l, a) => l + a.layers.gas, 0) / s.length : null,
    gasMaxMw: s.length ? Math.max(...s.map((l) => l.layers.gas)) : null,
    forecast: n.filter((l) => l.forecast).length > n.length / 2
  };
}
const Ue = 5.6, Un = 11;
function Re(r, e, t, n = !0, i = !0) {
  const s = [];
  if (!r.length)
    return s;
  n && s.push([e(r[0].ms), t(r[0])]);
  for (const o of r)
    s.push([e(o.ms + le / 2), t(o)]);
  return i && s.push([e(r[r.length - 1].ms + le), t(r[r.length - 1])]), s;
}
function oe(r) {
  return String(Math.round(r * 10) / 10);
}
function Rn(r, e, t, n = {}) {
  const i = n.width ?? 360, s = n.height ?? 150, o = n.top ?? 18, c = n.bottom ?? 20, l = n.left ?? 30, a = n.right ?? 8, h = { x: l, y: o, w: i - l - a, h: s - o - c }, u = Math.max(le, t - e), d = (x) => h.x + (x - e) / u * h.w, y = r.filter((x) => x !== null), b = y.map((x) => _e.reduce((E, D) => E + x.layers[D.key], 0)), w = Math.max(0, ...b, ...y.map((x) => x.load ?? 0)), p = w > 6e4 ? 2e4 : 1e4, z = Math.max(p, Math.ceil(w * 1.06 / p) * p), S = (x) => h.y + h.h - x / z * h.h, P = [];
  let v = [];
  for (const x of r)
    x && (!v.length || x.ms - v[v.length - 1].ms === le) ? v.push(x) : (v.length && P.push(v), v = x ? [x] : []);
  v.length && P.push(v);
  const M = [], $ = [];
  _e.forEach((x, E) => {
    if (!y.some((_) => _.layers[x.key] > 0))
      return;
    const D = (_) => _e.slice(0, E).reduce((U, R) => U + _.layers[R.key], 0), L = (_) => D(_) + _.layers[x.key];
    let O = "", C = null;
    for (const _ of P) {
      const U = Re(_, d, (I) => S(L(I))), R = Re(_, d, (I) => S(D(I))).reverse();
      O += `M${U.map(([I, Y]) => `${oe(I)},${oe(Y)}`).join(" L")} L${R.map(([I, Y]) => `${oe(I)},${oe(Y)}`).join(" L")} Z `;
      for (const I of _) {
        const Y = S(D(I)) - S(L(I));
        (!C || Y > C.band) && (C = { x: I, band: Y });
      }
    }
    if (M.push({ key: x.key, label: x.label, path: O.trim() }), C && C.band >= Un) {
      const _ = x.label, U = _.length * Ue, R = Math.min(h.x + h.w - U / 2 - 2, Math.max(h.x + U / 2 + 2, d(C.x.ms + le / 2))), I = (S(D(C.x)) + S(L(C.x))) / 2 + 3.5;
      $.some((We) => Math.abs(We.y - I) < 12 && Math.abs(We.x - R) < (U + We.text.length * Ue) / 2 + 4) || $.push({ key: x.key, x: R, y: I, text: _ });
    }
  });
  let T = "", H = "";
  for (const x of P) {
    const E = x.filter((L) => L.load !== null);
    let D = 0;
    for (; D < E.length; ) {
      const L = E[D].actual;
      let O = D;
      for (; O + 1 < E.length && E[O + 1].actual === L; )
        O++;
      const C = E.slice(D, O + 1), _ = Re(C, d, (R) => S(R.load), D === 0, O === E.length - 1);
      if (D > 0) {
        const R = E[D - 1];
        _.unshift([d(R.ms + le / 2), S(R.load)]);
      }
      const U = `M${_.map(([R, I]) => `${oe(R)},${oe(I)}`).join(" L")} `;
      L ? T += U : H += U, D = O + 1;
    }
  }
  const G = y.find((x) => x.forecast), j = y.some((x) => x.actual), Z = G && j ? d(G.ms) : null, Ie = [0, z / 2, z].map((x) => ({ y: S(x), label: Q(x / 1e3, 0) })), k = [];
  for (let x = e; x < t; x += Wn) {
    const E = se(new Date(x));
    E % 6 === 0 && (k.some((D) => D.label === String(E)) || k.push({ x: d(x), label: String(E), anchor: x === e ? "start" : "middle" }));
  }
  k.push({ x: h.x + h.w, label: "24", anchor: "end" });
  let W = null;
  const N = y.filter((x) => x.load !== null);
  if (N.length) {
    const x = j ? "Verbrauch" : "Erzeugung gesamt", E = x.length * Ue, D = (C) => S(_e.reduce((_, U) => _ + C.layers[U.key], 0)) - S(C.load), L = N.reduce((C, _) => D(_) > D(C) ? _ : C, N[0]);
    W = { x: Math.min(h.x + h.w - E - 2, Math.max(h.x + 2, d(L.ms) - E / 2)), y: Math.max(h.y + 9, S(L.load) - 4), text: x };
  }
  return {
    width: i,
    height: s,
    plot: h,
    xOf: d,
    yOf: S,
    layers: M,
    loadPath: T.trim(),
    forecastLoadPath: H.trim(),
    forecastX: Z,
    allForecast: y.length > 0 && !j,
    yTicks: Ie,
    xTicks: k,
    labels: $,
    loadLabel: W,
    hasData: y.length > 0
  };
}
const Hn = 9e5, Ln = [
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
], Nn = (r) => Math.round(r * 10) / 10;
function Le(r) {
  const e = Date.parse(r.start), t = [];
  for (let n = 0; n < r.slots; n++) {
    const i = { ts: new Date(e + n * Hn).toISOString(), price: r.price[n] ?? null };
    for (const o of Ln)
      i[o] = r.mix?.[o][n] ?? null;
    const s = i.windOnshore !== null || i.windOffshore !== null ? (i.windOnshore ?? 0) + (i.windOffshore ?? 0) : null;
    i.residual = i.load !== null && s !== null && i.solar !== null ? Nn(i.load - s - i.solar) : null, t.push(i);
  }
  return t;
}
const Ne = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }), Je = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }), et = (r) => Ne.format(Math.round(r) + 0), Bn = (r) => Je.format(Math.abs(r) < 0.05 ? 0 : r), fe = (r) => `${Je.format(r / 1e3)} GW`, Rt = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], Fn = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
function Ht(r) {
  return r.split("-").map(Number);
}
function Lt(r) {
  const [e, t, n] = Ht(r);
  return `${Rt[new Date(Date.UTC(e, t - 1, n)).getUTCDay()]} ${n}. ${Fn[t - 1]}`;
}
function Gn(r) {
  const [e, t, n] = Ht(r);
  return `${Rt[new Date(Date.UTC(e, t - 1, n)).getUTCDay()]} ${String(n).padStart(2, "0")}.${String(t).padStart(2, "0")}.`;
}
const jn = (r) => `${r}-${(r + 1) % 24} Uhr`, Zn = new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Europe/Berlin" }), K = (r) => Zn.format(new Date(r)), Nt = (r) => `${K(r)}-${K(new Date(r).getTime() + 9e5)} Uhr`;
function Vn(r) {
  return r >= 1.85 ? `${Ne.format(Math.round(r))}× so teuer` : r >= 1.15 ? `${Je.format(r)}× so teuer` : r > 0.87 ? "etwa gleich" : `${Ne.format((1 - r) * 100)} % günstiger`;
}
const Kn = /^[^:]*?\d{1,2}-\d{1,2} Uhr: [\s\S]*?\. (?=[A-ZÄÖÜ])/, qn = (r) => r.replace(Kn, "");
function Xn(r, e, t) {
  const n = r % 24, i = e % 24;
  return n === i ? !1 : n < i ? t >= n && t < i : t >= n || t < i;
}
function Bt(r, e) {
  let t = r.base_ct;
  for (const n of r.windows) Xn(n.from_hour, n.to_hour, e) && (t = n.ct);
  return t;
}
function Qn(r) {
  let e = 0;
  for (let t = 0; t < 24; t++) e += Bt(r, t);
  return e / 24;
}
function Yn(r, e, t) {
  return (e.kind === "dynamic" ? r / 10 * (1 + e.vat / 100) : 0) + (t === null ? Qn(e) : Bt(e, t));
}
const Jn = { kind: "dynamic", base_ct: 19.69, vat: 19, windows: [] };
function er(r, e) {
  const t = e ?? Jn, n = r !== "mein_preis", i = (h, u) => n ? h : Yn(h, t, u) * 10, s = (h) => h == null ? null : typeof h == "number" ? h : se(new Date(h)), o = (h, u) => i(h, s(u)), c = r === "eur_mwh" ? "€/MWh" : "ct/kWh", l = (h) => r === "eur_mwh" ? et(h) : Bn(h / 10), a = (h) => `${l(h)} ${c}`;
  return {
    unit: r,
    suffix: c,
    isExchange: n,
    map: i,
    shown: o,
    number: (h, u) => l(o(h, u)),
    price: (h, u) => a(o(h, u)),
    shownNumber: l,
    shownPrice: a,
    text: (h, u) => {
      const d = u ? kn(h, u) : n ? h : Tn(h);
      return r === "eur_mwh" ? d : vn(d);
    },
    axisUnit: r === "eur_mwh" ? "€" : "ct"
  };
}
function Ce(r) {
  return `${r === "today" ? "Die Preise für heute fehlen noch." : "Die Preise für gestern fehlen noch."} Die Strombörse hat sie versteigert, aber SMARD (Bundesnetzagentur) hat sie bisher nicht veröffentlicht. Sie erscheinen hier, sobald sie da sind.`;
}
const Ft = "strompreis.ha.resolution.v1";
function tr() {
  try {
    return localStorage.getItem(Ft) === "quarter" ? "quarter" : "hour";
  } catch {
    return "hour";
  }
}
class nr extends EventTarget {
  constructor() {
    super(...arguments), this.home = null, this.tariff = null, this.stale = !1, this.error = null, this.loading = !0, this.day = "today", this.resolution = tr(), this.selectedMs = null, this.now = Date.now(), this.persist = !0, this.fixedDate = null, this.connection = null, this.clock = null;
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
        localStorage.setItem(Ft, e.resolution);
      } catch {
      }
    this.changed();
  }
  changed() {
    this.dispatchEvent(new Event("change"));
  }
}
const m = new nr(), rr = [
  { value: "ct_kwh", label: "Börsenpreis in ct/kWh" },
  { value: "mein_preis", label: "Mein Preis (Tarif aus der Integration)" },
  { value: "eur_mwh", label: "Börsenpreis in €/MWh" }
], ke = { name: "unit", selector: { select: { mode: "dropdown", options: rr } } }, pe = { name: "title", selector: { text: {} } }, me = {
  unit: "Preise anzeigen als",
  title: "Überschrift (leer: Standard)",
  show_verdict: "Tagesbild zeigen",
  show_strip: "Preisstreifen zeigen",
  show_switches: "Tag und Raster umschaltbar",
  show_text: "Texte zeigen"
}, sr = {
  negativ: "negativ",
  sehr_guenstig: "sehr günstig",
  guenstig: "günstig",
  mittel: "mittel",
  teuer: "teuer",
  sehr_teuer: "sehr teuer"
};
class B extends we {
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
    this._hass = e, m.connect(e);
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
    super.connectedCallback(), m.addEventListener("change", this.onStore), this.sizeObserver.observe(this);
  }
  disconnectedCallback() {
    m.removeEventListener("change", this.onStore), this.sizeObserver.disconnect(), super.disconnectedCallback();
  }
  get units() {
    return er(this.config?.unit ?? "ct_kwh", m.tariff);
  }
  /** a card in the integration's absence or before the first data: one line instead of an empty frame */
  placeholder() {
    return m.error === "not_loaded" ? this.frame(f`<p class="muted">Die Integration „Strompreis verstehen“ ist nicht eingerichtet.</p>`) : m.error === "no_data" ? this.frame(f`<p class="muted">Gerade keine Daten von „Strompreis verstehen“. Nächster Versuch in wenigen Minuten.</p>`) : m.error ? this.frame(f`<p class="muted">Keine Daten von „Strompreis verstehen“ (${m.error}).</p>`) : m.loading || !m.home ? this.frame(f`<div class="skeleton"></div>`) : null;
  }
  frame(e, t) {
    const n = this.config?.title ?? t;
    return f`<ha-card>
      <div class="card">
        ${n ? f`<h2 class="kicker">${n}</h2>` : g} ${e}
        ${m.stale ? f`<p class="note">Keine Verbindung zum Datendienst, angezeigt wird der letzte Stand.</p>` : g}
      </div>
    </ha-card>`;
  }
  static {
    this.styles = ne`
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
const Be = 36e5, ir = 9e5, xt = (r) => r;
function or(r, e, t) {
  if (!t) return An(e, xt(r.hours));
  const n = new Map(xt(r.hours).map((s) => [Date.parse(s.ts), s])), i = [];
  for (const s of e) {
    if (s.price === null) continue;
    const o = Date.parse(s.ts);
    i.push({ ts: s.ts, ms: o, hour: se(new Date(o)), priceEurMwh: s.price, negativeQuarters: s.price < 0 ? 4 : 0, explanation: n.get(Math.floor(o / Be) * Be) ?? null });
  }
  return i;
}
function ar(r, e) {
  return !e.length || !r.length ? [] : e.map((t) => {
    const n = Date.parse(t.from), i = Date.parse(t.to);
    let s = r.findIndex((c) => c.ms >= n), o = r.findIndex((c) => c.ms >= i);
    return s < 0 && (s = r.length), o < 0 && (o = r.length), { ...t, startIdx: s, endIdx: o };
  });
}
const yt = /* @__PURE__ */ new WeakMap();
function lr(r) {
  const e = m.home;
  return e ? r === "yesterday" ? e.yesterday : r === "today" ? e.today : e.tomorrow : null;
}
function de(r = m.day, e = Qe) {
  const t = lr(r);
  if (!t || !t.hasPrices) return null;
  const n = m.resolution === "quarter";
  let i = yt.get(t);
  i || (i = { quarters: Le(t), grids: /* @__PURE__ */ new Map() }, yt.set(t, i));
  const { quarters: s, grids: o } = i, c = (v) => {
    let M = o.get(v);
    if (!M) {
      const $ = or(t, s, v);
      M = { slots: $, phases: ar($, t.phases) }, o.set(v, M);
    }
    return M;
  }, { slots: l, phases: a } = c(n), h = n ? ir : Be, u = (v) => l.findIndex((M) => v >= M.ms && v < M.ms + h), d = r === "today" && m.fixedDate === null ? u(m.now) : -1, y = d >= 0 ? (m.now - l[d].ms) / h : 0, b = l.map((v) => e(v.priceEurMwh, v.hour)), w = b.reduce((v, M, $) => v < 0 || M < b[v] ? $ : v, -1), p = m.selectedMs !== null ? u(m.selectedMs) : -1, z = d >= 0 ? d : w, S = p >= 0 ? p : z >= 0 ? z : null, P = (v) => a.find((M) => v >= M.startIdx && v < M.endIdx) ?? null;
  return {
    key: r,
    day: t,
    quarters: s,
    slots: l,
    hourly: c(!1).slots,
    phases: a,
    fine: n,
    stepMs: h,
    nowIdx: d,
    nowFraction: y,
    idx: S,
    slot: S !== null ? l[S] ?? null : null,
    phase: S !== null ? P(S) : null,
    nowPhase: d >= 0 ? P(d) : null
  };
}
function Fe(r, e) {
  return r.fine ? Nt(e.ms) : jn(e.hour);
}
function Gt(r) {
  return `${Lt(r)} ${r.slice(0, 4)}`;
}
const vt = { yesterday: "Gestern", today: "Heute", tomorrow: "Morgen" };
class cr extends B {
  constructor() {
    super(...arguments), this.dragging = !1, this.resizeObserver = null, this.observed = null;
  }
  static getConfigForm() {
    return {
      schema: [ke, { name: "show_verdict", selector: { boolean: {} } }, { name: "show_strip", selector: { boolean: {} } }, { name: "show_switches", selector: { boolean: {} } }, pe],
      computeLabel: (e) => me[e.name]
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
    e && (St(e), e !== this.observed && (this.resizeObserver ??= new ResizeObserver((t) => t.forEach((n) => St(n.target))), this.resizeObserver.disconnect(), this.resizeObserver.observe(e), this.observed = e));
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
    const t = m.home, n = m.day, i = de(n, this.units.map), s = this.config, o = this.header(t.date, n);
    if (!i) {
      const c = n === "tomorrow" ? "Die Preise für morgen kommen nach der Auktion, meist gegen 13 Uhr." : m.fixedDate === null ? Ce(n) : "Für diesen Tag liegen keine Preise vor.";
      return this.frame(f`${o}<p class="muted small">${c}</p>`);
    }
    return this.frame(f`
      ${o} ${s.show_verdict !== !1 ? this.verdict(i) : g} ${this.chart(i)} ${s.show_strip !== !1 ? this.strip(i) : g}
    `);
  }
  header(e, t) {
    const n = t === "yesterday" ? m.home.yesterday.date : t === "tomorrow" ? m.home.tomorrow?.date ?? hr(e) : e, i = m.fixedDate !== null, s = f`<p class="kicker">${i ? Gt(n) : f`${vt[t]} · ${Lt(n)}`}</p>`;
    if (this.config.show_switches === !1) return s;
    const o = !!m.home.tomorrow;
    return f`<div class="head">
      ${s}
      <div class="switches">
        ${i ? g : f`<div class="seg" role="group" aria-label="Tag">
          ${["yesterday", "today", "tomorrow"].map(
      (c) => f`<button type="button" aria-pressed=${c === t} @click=${() => m.set({ day: c })}>
                ${vt[c]}${c === "tomorrow" && o && t !== "tomorrow" ? f`<span class="dot" aria-label="Preise da"></span>` : g}
              </button>`
    )}
        </div>`}
        <div class="seg" role="group" aria-label="Raster">
          <button type="button" aria-pressed=${m.resolution === "hour"} @click=${() => m.set({ resolution: "hour" })}>1 h</button>
          <button type="button" aria-pressed=${m.resolution === "quarter"} @click=${() => m.set({ resolution: "quarter" })}>15 min</button>
        </div>
      </div>
    </div>`;
  }
  verdict(e) {
    const t = e.day.verdict;
    if (!t) return g;
    const n = this.units;
    let i = t.detail, s = e.day.windows, o, c = null;
    if (n.isExchange)
      o = $t(t), e.key === "tomorrow" && (c = ft(e.day, m.home.today));
    else {
      const a = kt(e.hourly, e.quarters, n.map);
      s = a.windows;
      const h = a.stats;
      i = h ? Dn(h, t.vsUsual) : t.detail, o = h ? $t({ shiftSavingEur: t.flat ? null : Math.round((h.max - h.min) / 100 * 100) / 100, maxHour: h.maxHour, minHour: h.minHour }) : null;
      const u = e.key === "tomorrow" ? de("today", n.map) : null, d = u?.day.verdict ? kt(u.hourly, u.quarters, n.map) : null;
      h && d?.stats && (c = ft({ verdict: { avgEurMwh: h.avg }, windows: s }, { verdict: { avgEurMwh: d.stats.avg }, windows: d.windows }));
    }
    const l = s.find((a) => a.hours === 3) ?? s[0] ?? null;
    return f`<div class="verdict">
      <p class="headline">${t.headline}</p>
      <p class="muted small">${n.text(i)}${o ? ` ${o}` : ""}</p>
      ${c ? f`<p class="small">${n.text(c)}</p>` : g}
      ${l && !t.flat ? f`<p class="best small">
            <span class="badge">Beste ${l.hours} Stunden</span>
            <button type="button" class="link" @click=${() => m.set({ selectedMs: Date.parse(l.from) })}>
              <b>${K(l.from)}-${K(l.to)} Uhr</b>, im Schnitt ${n.shownPrice(l.avgEurMwh)}
            </button>
          </p>` : g}
    </div>`;
  }
  chart(e) {
    const t = this.units, n = In(e.slots, e.phases, { map: t.map }), i = t.unit === "eur_mwh", s = (p) => i ? String(Math.round(Number(p.replace(/\./g, "").replace(",", ".")) * 10)) : p, o = (p) => i ? p.replace(/(-?[\d.]+,\d) ct/, (z, S) => `${Math.round(Number(S.replace(/\./g, "").replace(",", ".")) * 10)} €`) : p, c = e.idx !== null ? n.slots[e.idx] : void 0, l = e.phase, a = n.bands[n.bands.length - 1], h = e.nowIdx >= 0 ? n.plot.x + (e.nowIdx + e.nowFraction) * n.slotW : null, u = h !== null && h - 64 < n.plot.x, d = (p) => {
      const S = p.currentTarget.getBoundingClientRect(), P = (p.clientX - S.left) / S.width * n.width, v = Math.floor((P - n.plot.x) / n.slotW), M = e.slots[v];
      M && v !== e.idx && m.set({ selectedMs: M.ms });
    }, y = (p) => {
      p.pointerType === "mouse" && p.button !== 0 || (this.dragging = !0, p.currentTarget.setPointerCapture(p.pointerId), d(p));
    }, b = (p) => this.dragging && d(p), w = () => this.dragging = !1;
    return f`<svg viewBox="0 0 ${n.width} ${n.height}" aria-hidden="true" @pointerdown=${y} @pointermove=${b} @pointerup=${w} @pointercancel=${w}>
      ${n.bands.map(
      (p) => {
        const z = !!l && l.index !== p.index;
        return A`<g>
          <g opacity=${z ? 0.45 : 1}>
            <line x1=${p.x + 1} x2=${p.x + p.w - 1} y1="24" y2="24" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
            <line x1=${p.x + 1} x2=${p.x + 1} y1="20" y2="28" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
          </g>
          ${p.label ? A`<text class="ribbon" x=${p.x + 4} y="16" fill=${z ? "var(--muted-ink)" : "var(--ink)"} font-size="10.5" font-weight="500" letter-spacing="0.08em">${p.label.toUpperCase()}</text>` : g}
        </g>`;
      }
    )}
      ${a ? A`<line x1=${a.x + a.w - 1} x2=${a.x + a.w - 1} y1="20" y2="28" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />` : g}
      ${l ? A`<rect x=${n.plot.x + l.startIdx * n.slotW} y=${n.plot.y - 6} width=${(l.endIdx - l.startIdx) * n.slotW} height=${n.plot.h + 6} fill="var(--soft)" />` : g}
      ${n.yTicks.map(
      (p) => A`<line x1=${n.plot.x} x2=${n.plot.x + n.plot.w} y1=${p.y} y2=${p.y} stroke="var(--rule)" stroke-width="1" vector-effect="non-scaling-stroke" />
          <text x=${n.plot.x - 5} y=${p.y + 3.5} text-anchor="end" fill="var(--muted-ink)" font-size="10">${s(p.label)}</text>`
    )}
      <text x=${n.plot.x - 5} y=${n.plot.y - 9} text-anchor="end" fill="var(--muted-ink)" font-size="10">${t.axisUnit}</text>
      ${n.xTicks.map((p) => A`<text x=${p.x} y=${n.plot.y + n.plot.h + 14} text-anchor=${p.anchor} fill="var(--muted-ink)" font-size="10">${p.label}</text>`)}
      <text x=${n.plot.x + n.plot.w} y=${n.plot.y + n.plot.h + 27} text-anchor="end" fill="var(--muted-ink)" font-size="10">Uhr</text>
      ${c ? A`<rect x=${c.x} y=${n.plot.y - 6} width=${c.w} height=${n.plot.h + 6} fill="var(--hl)" opacity="0.38" />` : g}
      ${n.areaPath ? A`<path d=${n.areaPath} fill="var(--soft)" stroke="none" />` : g}
      ${n.zeroY !== null ? A`<line x1=${n.plot.x} x2=${n.plot.x + n.plot.w} y1=${n.zeroY} y2=${n.zeroY} stroke="var(--ink)" stroke-width="1" opacity="0.5" vector-effect="non-scaling-stroke" />` : g}
      ${n.linePath ? A`<path d=${n.linePath} fill="none" stroke="var(--ink)" stroke-width="1.75" stroke-linejoin="round" vector-effect="non-scaling-stroke" />` : g}
      ${h !== null ? A`<line x1=${h} x2=${h} y1=${n.plot.y - 6} y2=${n.plot.y + n.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />
          <text x=${u ? h + 4 : h - 4} y=${n.plot.y + 2} text-anchor=${u ? "start" : "end"} fill="var(--ink)" font-size="10" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">jetzt ${K(m.now)}</text>` : g}
      ${n.labels.map((p) => A`<text class="anno" x=${p.x} y=${p.y} text-anchor=${p.anchor} fill="var(--ink)" font-size="11" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">${o(p.text)}</text>`)}
      ${c ? A`<circle cx=${c.x + c.w / 2} cy=${c.y} r="3.5" fill="var(--ink)" stroke="var(--halo)" stroke-width="2" vector-effect="non-scaling-stroke" />` : g}
    </svg>`;
  }
  strip(e) {
    const t = this.units, n = e.slots.length, i = e.slot, s = e.fine ? 1 : 2, o = (c) => {
      const l = Number(c.target.value), a = e.slots[l];
      a && m.set({ selectedMs: a.ms });
    };
    return f`<div class="strip">
      <div class="readout small">
        <span class="when"
          >${i ? Fe(e, i) : ""}${e.phase ? f`<span class="muted"> · ${e.phase.name}</span>` : g}
          ${e.idx !== null && e.idx === e.nowIdx ? f`<span class="badge">jetzt</span>` : g}</span
        >
        <b>${i ? t.price(i.priceEurMwh, i.hour) : ""}</b>
      </div>
      <div class="cells-wrap" data-count=${n}>
        <div class="cells" style="gap: ${s}px">
          ${e.slots.map(
      (c, l) => f`<span class="cell ${c.priceEurMwh < 0 ? "hatch" : ""}" style="background-color: var(--lvl-${ue(c.priceEurMwh)}); opacity: ${l === e.idx ? 1 : 0.85}"></span>`
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
          aria-valuetext=${i ? `${Fe(e, i)}, ${t.price(i.priceEurMwh, i.hour)}` : ""}
          @input=${o}
        />
      </div>
      <div class="ticks" aria-hidden="true">
        ${e.phases.slice(1).map((c) => f`<span class="phase-tick" style="left: ${c.startIdx / n * 100}%"></span>`)}
        ${e.nowIdx >= 0 ? f`<span class="now-tick" style="left: calc(${(e.nowIdx + 0.5) / n * 100}% - 1px)"></span>` : g}
      </div>
    </div>`;
  }
  static {
    this.styles = [
      B.styles,
      ne`
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
function kt(r, e, t) {
  return { stats: Ut(r, t), windows: Xe(Ye(e, t)) };
}
function St(r) {
  const e = Math.max(1, Number(r.dataset.count));
  r.style.setProperty("--bar", `${r.clientWidth / e}px`);
}
function hr(r) {
  const e = /* @__PURE__ */ new Date(`${r}T12:00:00Z`);
  return e.setUTCDate(e.getUTCDate() + 1), e.toISOString().slice(0, 10);
}
class ur extends B {
  static {
    this.properties = { ...B.properties, open: { state: !0 } };
  }
  static getConfigForm() {
    return { schema: [ke, pe], computeLabel: (e) => me[e.name] };
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
    const t = this.units, n = de(void 0, t.map), i = n?.slot ?? null, s = i?.explanation ?? null;
    if (!n || !i) {
      const d = m.fixedDate === null && !m.home.today.hasPrices ? Ce("today") : "Für diesen Tag liegen keine Preise vor.";
      return this.frame(f`<p class="muted small">${d}</p>`);
    }
    const o = `${m.fixedDate !== null ? `${Gt(m.fixedDate)}, ` : ""}${Fe(n, i)}${n.phase ? ` · ${n.phase.name}` : ""}`;
    if (!s)
      return this.frame(f`<p class="kicker">${o}</p>
        <p class="price">${t.price(i.priceEurMwh, i.hour)}</p>
        <p class="muted small">Für diese Stunde gibt es noch keine Erklärung. Sie folgt, sobald Erzeugungsdaten oder Prognosen da sind, meist am Abend.</p>`);
    const c = this.open?.ts === s.ts ? this.open.key : null, l = s.facts, a = l.drivers.filter((d) => d.direction !== "info"), h = a.find((d) => d.key === c) ?? null, u = t.isExchange ? l.priceVsMedianFactor : dr(s, t.map);
    return this.frame(f`
      <p class="kicker">${o}${s.basedOnActuals ? "" : " · Prognose"}</p>
      <div class="top">
        <span class="price">${t.price(i.priceEurMwh, i.hour)}</span>
        ${u != null ? f`<span class="small muted"><b class="ink">${Vn(u)}</b> wie sonst zu dieser Stunde</span>` : g}
      </div>
      <h3>${s.headline}</h3>
      <p class="text">${t.text(qn(s.text))}</p>
      ${a.length ? f`<div class="chips">
            ${a.map(
      (d) => f`<button type="button" class="chip ${d.direction} ${d.key === c ? "open" : ""}" aria-expanded=${d.key === c} @click=${() => this.open = d.key === c ? null : { ts: s.ts, key: d.key }}>
                  ${d.direction === "up" ? "▲" : "▼"} ${d.label}
                </button>`
    )}
          </div>
          ${h ? f`<p class="detail small">${t.text(h.detail)}</p>` : g}` : g}
      <p class="facts note">
        ${l.windMw != null ? f`<span>Wind <b class="ink">${fe(l.windMw)}</b>${l.windMedian30dMw != null ? ` (üblich ${fe(l.windMedian30dMw)})` : ""}</span>` : g}
        ${l.solarMw != null ? f`<span>Sonne <b class="ink">${fe(l.solarMw)}</b></span>` : g}
        ${l.residualMw != null ? f`<span>Restnachfrage <b class="ink">${fe(l.residualMw)}</b>${l.residualMedian30dMw != null ? ` (üblich ${fe(l.residualMedian30dMw)})` : ""}</span>` : g}
        <span>Preissetzer <b class="ink">${s.priceSetterLabel}</b> (Schätzung)</span>
      </p>
    `);
  }
  static {
    this.styles = [
      B.styles,
      ne`
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
function dr(r, e) {
  const t = r.facts.priceVsMedianFactor, n = r.facts.priceMedian30dEurMwh ?? (t != null && Math.abs(t) >= 0.1 ? r.priceEurMwh / t : null);
  if (n === null || n <= 5) return null;
  const i = e(n, r.hour);
  return i > 5 ? e(r.priceEurMwh, r.hour) / i : null;
}
const pr = {
  wind: "var(--src-wind)",
  solar: "var(--src-solar)",
  bio: "var(--src-bio)",
  coal: "var(--src-coal)",
  gas: "url(#gas-hatch)",
  other: "var(--src-other)",
  forecastRest: "var(--src-other)"
}, _t = (r) => `${et(r / 1e3)} GW`;
class mr extends B {
  constructor() {
    super(...arguments), this.dragging = !1, this.cache = null;
  }
  static getConfigForm() {
    return { schema: [pe], computeLabel: (e) => me[e.name] };
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
    const t = de(), i = m.day === "yesterday" || m.fixedDate !== null && m.fixedDate < wn(new Date(m.now)) ? "Woher der Strom kam" : "Woher der Strom kommt";
    if (!t) return this.frame(f`<p class="muted small">Für diesen Tag liegen keine Daten vor.</p>`, i);
    this.cache?.quarters !== t.quarters && (this.cache = { quarters: t.quarters, mq: On(t.quarters) });
    const s = this.cache.mq, o = It(t.day.date), c = o.start.getTime(), l = o.end.getTime(), a = Rn(s, c, l);
    if (!a.hasData)
      return this.frame(f`<p class="muted small">Die Erzeugung erscheint hier, sobald die Prognosen für Wind, Sonne und Erzeugung veröffentlicht sind, meist am Abend.</p>`, i);
    const h = t.phase, u = bt(s, h ? Date.parse(h.from) : c, h ? Date.parse(h.to) : l);
    let d = "";
    if (u.renewableShare !== null) {
      const $ = h ? `${h.name}, ${Ot(h)}` : "Ganzer Tag", T = et(u.renewableShare * 100), H = u.renewableShare > 1.005;
      d = u.forecast ? `${$}: laut Prognose ${H ? `mehr Wind und Sonne als Erzeugungsbedarf (${T} %)` : `${T} % aus Wind und Sonne`}` : `${$}: ${H ? `mehr Ökostrom als Verbrauch (${T} %)` : `${T} % erneuerbar`}${u.gasMaxMw !== null && u.gasMaxMw >= 500 ? `, Gas bis ${_t(u.gasMaxMw)}` : ""}`;
    }
    const y = Math.max(1, t.slots.length), b = a.plot.w / y;
    let w = null;
    if (t.slot && t.idx !== null) {
      const $ = bt(s, t.slot.ms, t.slot.ms + t.stepMs);
      if ($.windMw !== null && $.solarMw !== null && $.residualMw !== null && $.residualMw > 0) {
        const T = a.plot.x + (t.idx + 0.5) / y * a.plot.w, H = a.yOf($.windMw + $.solarMw), G = a.yOf($.windMw + $.solarMw + $.residualMw), j = `Rest ${_t($.residualMw)}`, Z = T + 6 + j.length * 5.6 < a.plot.x + a.plot.w;
        H - G >= 8 && (w = { x: T, y0: G, y1: H, text: j, tx: Z ? T + 6 : T - 6, anchor: Z ? "start" : "end" });
      }
    }
    const p = m.day === "today" && m.fixedDate === null && m.now >= c && m.now < l ? a.xOf(m.now) : null, z = ($) => {
      const H = $.currentTarget.getBoundingClientRect(), G = ($.clientX - H.left) / H.width * a.width, j = Math.floor((G - a.plot.x) / a.plot.w * y), Z = t.slots[j];
      Z && j !== t.idx && m.set({ selectedMs: Z.ms });
    }, S = ($) => {
      $.pointerType === "mouse" && $.button !== 0 || (this.dragging = !0, $.currentTarget.setPointerCapture($.pointerId), z($));
    }, P = ($) => this.dragging && z($), v = () => this.dragging = !1, M = ($, T, H, G = "middle") => A`<text x=${$} y=${T} text-anchor=${G} fill="var(--ink)" font-size="10" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">${H}</text>`;
    return this.frame(
      f`<p class="small line">${d}</p>
        <svg viewBox="0 0 ${a.width} ${a.height}" aria-hidden="true" @pointerdown=${S} @pointermove=${P} @pointerup=${v} @pointercancel=${v}>
          <defs>
            <pattern id="gas-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="4" height="4" fill="var(--src-gas)" />
              <rect width="1" height="4" fill="var(--src-gas-hatch)" />
            </pattern>
          </defs>
          ${h ? A`<rect x=${a.plot.x + h.startIdx * b} y=${a.plot.y} width=${(h.endIdx - h.startIdx) * b} height=${a.plot.h} fill="var(--soft)" />` : g}
          ${a.yTicks.map(
        ($) => A`<line x1=${a.plot.x} x2=${a.plot.x + a.plot.w} y1=${$.y} y2=${$.y} stroke="var(--rule)" stroke-width="1" vector-effect="non-scaling-stroke" />
              <text x=${a.plot.x - 5} y=${$.y + 3.5} text-anchor="end" fill="var(--muted-ink)" font-size="10">${$.label}</text>`
      )}
          <text x=${a.plot.x - 5} y=${a.plot.y - 8} text-anchor="end" fill="var(--muted-ink)" font-size="10">GW</text>
          ${a.layers.map(($) => A`<path d=${$.path} fill=${pr[$.key]} />`)}
          ${a.forecastX !== null ? A`<rect x=${a.forecastX} y=${a.plot.y} width=${a.plot.x + a.plot.w - a.forecastX} height=${a.plot.h} fill="var(--halo)" opacity="0.45" />
              <line x1=${a.forecastX} x2=${a.forecastX} y1=${a.plot.y - 4} y2=${a.plot.y + a.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />
              <text x=${a.forecastX + 4} y=${a.plot.y - 6} fill="var(--muted-ink)" font-size="10">Prognose</text>` : g}
          ${t.idx !== null ? A`<rect x=${a.plot.x + t.idx * b} y=${a.plot.y} width=${b} height=${a.plot.h} fill="var(--hl)" opacity="0.38" />` : g}
          ${a.loadPath ? A`<path d=${a.loadPath} fill="none" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />` : g}
          ${a.forecastLoadPath ? A`<path d=${a.forecastLoadPath} fill="none" stroke="var(--ink)" stroke-width="1.25" stroke-dasharray="3 2" vector-effect="non-scaling-stroke" />` : g}
          ${p !== null ? A`<line x1=${p} x2=${p} y1=${a.plot.y} y2=${a.plot.y + a.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />` : g}
          ${a.labels.map(($) => M($.x, $.y, $.text))} ${a.loadLabel ? M(a.loadLabel.x, a.loadLabel.y, a.loadLabel.text, "start") : g}
          ${w ? A`<line x1=${w.x} x2=${w.x} y1=${w.y0} y2=${w.y1} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              <line x1=${w.x - 3} x2=${w.x + 3} y1=${w.y0} y2=${w.y0} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              <line x1=${w.x - 3} x2=${w.x + 3} y1=${w.y1} y2=${w.y1} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              ${M(w.tx, (w.y0 + w.y1) / 2 + 3.5, w.text, w.anchor)}` : g}
          ${a.xTicks.map(($) => A`<text x=${$.x} y=${a.plot.y + a.plot.h + 14} text-anchor=${$.anchor} fill="var(--muted-ink)" font-size="10">${$.label}</text>`)}
        </svg>
        <p class="note">
          ${a.allForecast ? "Noch keine Messwerte: Wind, Sonne und die übrige Erzeugung sind Prognosen, die gestrichelte Linie die erwartete Gesamterzeugung." : "Erzeugung in GW: unten Wind und Sonne, darüber Bio, Kohle und Gas (schraffiert). Die Linie ist der Verbrauch; der Abstand zwischen Sonne und Linie ist die Restnachfrage."}
          ${a.forecastX !== null ? " Heller: Prognose." : ""}
        </p>`,
      i
    );
  }
  static {
    this.styles = [
      B.styles,
      ne`
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
class gr extends B {
  constructor() {
    super(...arguments), this.cache = null;
  }
  static getConfigForm() {
    return { schema: [ke, { name: "show_strip", selector: { boolean: {} } }, pe], computeLabel: (e) => me[e.name] };
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
    const t = m.home;
    (this.cache?.today !== t.today || this.cache?.tomorrow !== t.tomorrow) && (this.cache = { today: t.today, tomorrow: t.tomorrow, quarters: [...Le(t.today), ...t.tomorrow ? Le(t.tomorrow) : []] });
    const n = this.cache.quarters, i = m.now, s = n.find((b) => b.price !== null && i >= Date.parse(b.ts) && i < Date.parse(b.ts) + Ee), o = this.units;
    if (!s || s.price === null) {
      const b = m.fixedDate === null && !t.today.hasPrices ? Ce("today") : "Noch keine Preise für jetzt.";
      return this.frame(f`<p class="muted small">${b}</p>`, "Strompreis");
    }
    const c = Math.floor(i / Ee) * Ee, l = n.filter((b) => Date.parse(b.ts) >= c), [a] = Xe(o.isExchange ? l : Ye(l, o.map), [3]), h = ue(s.price), u = t.tomorrow ? Date.parse(t.tomorrow.start) : 1 / 0, d = [], y = Date.parse(t.today.start) + t.today.slots * Ee;
    for (let b = Math.floor(i / Ae) * Ae; b < y; b += Ae) {
      const w = n.filter((p) => p.price !== null && Date.parse(p.ts) >= b && Date.parse(p.ts) < b + Ae);
      w.length && d.push({ ms: b, price: w.reduce((p, z) => p + z.price, 0) / w.length });
    }
    return this.frame(f`
      <div class="top">
        <span class="kicker">${Nt(s.ts)}</span>
        <span class="level" style="--c: var(--lvl-${h})"><span class="swatch ${h === "negativ" ? "hatch" : ""}"></span>${sr[h]}</span>
      </div>
      <p class="price">${o.price(s.price, s.ts)}</p>
      ${this.config.show_strip !== !1 && d.length > 1 ? f`<div class="strip" aria-hidden="true">
              ${d.map((b, w) => f`<span class="cell ${b.price < 0 ? "hatch" : ""} ${w === 0 ? "now" : ""}" style="background: var(--lvl-${ue(b.price)})"></span>`)}
            </div>
            <div class="axis note"><span>jetzt</span><span>24 Uhr</span></div>` : g}
      ${a ? f`<p class="small">
            Günstigste 3 Stunden ab jetzt: <b>${Date.parse(a.from) >= u ? "morgen " : ""}${K(a.from)}-${K(a.to)} Uhr</b>, im Schnitt
            ${o.shownPrice(a.avgEurMwh)}
          </p>` : g}
    `);
  }
  static {
    this.styles = [
      B.styles,
      ne`
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
const fr = ["", "einer Phase", "zwei Phasen", "drei Phasen", "vier Phasen", "fünf Phasen"];
class $r extends B {
  static getConfigForm() {
    return { schema: [ke, pe], computeLabel: (e) => me[e.name] };
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
    const t = de(void 0, this.units.map);
    if (!t || !t.phases.length) {
      const s = m.fixedDate === null && !m.home.today.hasPrices ? Ce("today") : "Noch keine Phasen für diesen Tag.";
      return this.frame(f`<p class="muted small">${s}</p>`, "Der Tag in Phasen");
    }
    const n = this.units, i = t.phases.some((s) => s.text === null);
    return this.frame(
      f`${i ? f`<p class="note">Die Erklärungen folgen, sobald Erzeugungsdaten oder Prognosen da sind.</p>` : g}
        <ol>
          ${t.phases.map((s) => {
        const o = t.phase?.index === s.index;
        let c, l, a = Date.parse(s.keyTs);
        const h = Date.parse(s.from), u = Date.parse(s.to), d = n.isExchange ? null : Ut(t.hourly.filter((b) => b.ms >= h && b.ms < u), n.map);
        if (!d)
          c = s.minEurMwh === s.maxEurMwh ? n.price(s.minEurMwh, s.keyHour) : `${n.number(s.minEurMwh, s.fromHour)} bis ${n.number(s.maxEurMwh, s.keyHour)} ${n.suffix}`, l = s.level === "high" ? `Am teuersten um ${s.keyHour} Uhr: ${n.price(s.maxEurMwh, s.keyHour)}` : s.level === "low" ? `Am günstigsten um ${s.keyHour} Uhr: ${n.price(s.minEurMwh, s.keyHour)}` : `Im Schnitt ${n.price(s.avgEurMwh, s.fromHour)}`;
        else {
          c = d.min === d.max ? n.shownPrice(d.min) : `${n.shownNumber(d.min)} bis ${n.shownNumber(d.max)} ${n.suffix}`, l = s.level === "high" ? `Am teuersten um ${d.maxHour} Uhr: ${n.shownPrice(d.max)}` : s.level === "low" ? `Am günstigsten um ${d.minHour} Uhr: ${n.shownPrice(d.min)}` : `Im Schnitt ${n.shownPrice(d.avg)}`;
          const b = s.level === "high" ? d.maxHour : s.level === "low" ? d.minHour : null, w = b !== null ? t.hourly.find((p) => p.ms >= h && p.ms < u && p.hour === b) : void 0;
          w && (a = w.ms);
        }
        const y = s.text ? d ? n.text(s.text, () => d.avg) : n.text(s.text) : null;
        return f`<li class=${o ? "active" : ""}>
              <button type="button" class="row link" aria-pressed=${o} @click=${() => m.set({ selectedMs: a })}>
                <span class="bar" style="background: var(--lvl-${ue(s.avgEurMwh)})"></span>
                <span class="name">
                  <span class="title">${s.name}${t.nowPhase?.index === s.index ? f` <span class="badge">jetzt</span>` : g}</span>
                  <span class="note">${Ot(s)}${s.forecast ? " · Prognose" : ""}</span>
                </span>
                <span class="range small">${c}</span>
              </button>
              <div class="body">
                ${y ? f`<p>${y}</p>` : g}
                <p class="key small muted">${l}</p>
              </div>
            </li>`;
      })}
        </ol>`,
      `Der Tag in ${fr[t.phases.length] ?? `${t.phases.length} Phasen`}`
    );
  }
  static {
    this.styles = [
      B.styles,
      ne`
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
const wr = 36e5, br = 9e5;
class xr extends B {
  static getConfigForm() {
    return { schema: [ke, pe], computeLabel: (e) => me[e.name] };
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
    const t = m.home, n = this.units, i = (o) => o === t.date ? "today" : o === t.yesterday.date ? "yesterday" : o === t.tomorrow?.date ? "tomorrow" : null, s = m.home ? m.day === "today" ? t.date : m.day === "yesterday" ? t.yesterday.date : t.tomorrow?.date : null;
    return this.frame(
      f`<div class="grid axis">
          <span></span>
          <div class="hours note">${[0, 6, 12, 18].map((o) => f`<span style="left: ${o / 24 * 100}%">${o}</span>`)}<span class="end">24 Uhr</span></div>
          <span class="note right">beste 3 h</span>
        </div>
        <ol>
          ${t.week.map((o) => {
        const c = i(o.date), l = c === "today" ? "Heute" : c === "tomorrow" ? "Morgen" : Gn(o.date), a = Math.max(1, o.hourly.length), h = It(o.date).start.getTime(), u = yr(o, c, n), d = u ? { left: (Date.parse(u.from) - h) / wr / a * 100, width: u.hours / a * 100 } : null, y = o.hourly.some((w) => w !== null), b = f`<span class="day ${o.date === s ? "current" : ""}">${l}</span>
              <span class="cells-wrap">
                <span class="cells">
                  ${o.hourly.map((w) => f`<span class="cell ${w !== null && w < 0 ? "hatch" : ""}" style="background: ${w === null ? "var(--soft)" : `var(--lvl-${ue(w)})`}"></span>`)}
                </span>
                ${d ? f`<span class="frame" style="left: ${d.left}%; width: ${d.width}%"></span>` : g}
              </span>
              <span class="small right">
                ${u ? f`${K(u.from)}-${K(u.to)} · ${n.shownNumber(u.avgEurMwh)} ${n.unit === "eur_mwh" ? "€/MWh" : "ct"}` : y ? "" : f`<span class="muted">noch keine Preise</span>`}
              </span>`;
        return f`<li class=${o.date === s ? "current" : ""}>
              ${c ? f`<button type="button" class="grid link" title="Diesen Tag in den anderen Karten zeigen" @click=${() => m.set({ day: c })}>${b}</button>` : f`<div class="grid">${b}</div>`}
            </li>`;
      })}
        </ol>
        <p class="note">Farben wie im Preisstreifen; der Rahmen markiert die günstigsten drei Stunden des Tages.</p>`,
      "Diese Woche"
    );
  }
  static {
    this.styles = [
      B.styles,
      ne`
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
function yr(r, e, t) {
  if (t.isExchange) return r.window;
  const n = e ? de(e, t.map) : null;
  if (n) return Xe(Ye(n.quarters, t.map), [3])[0] ?? null;
  const i = r.window;
  if (!i) return null;
  let s = 0, o = 0;
  for (let c = Date.parse(i.from); c < Date.parse(i.to); c += br, o++) s += t.map(i.avgEurMwh, se(new Date(c)));
  return { ...i, avgEurMwh: o ? s / o : t.shown(i.avgEurMwh) };
}
const jt = [
  { type: "strompreis-now-card", element: gr, name: "Strompreis jetzt", description: "Preis der laufenden Viertelstunde, Preisstufe und die günstigsten 3 Stunden ab jetzt." },
  { type: "strompreis-day-card", element: cr, name: "Strompreis Tag", description: "Tagesbild, Preisverlauf mit Phasen und Preisstreifen für gestern, heute und morgen." },
  { type: "strompreis-phases-card", element: $r, name: "Strompreis Phasen", description: "Der Tag in Phasen, mit Erklärung zu jeder Phase." },
  { type: "strompreis-mix-card", element: mr, name: "Strompreis Woher der Strom kommt", description: "Erzeugung aus Wind, Sonne, Kohle und Gas, der Verbrauch und die Restnachfrage." },
  { type: "strompreis-hour-card", element: ur, name: "Strompreis Stunde im Detail", description: "Warum der Preis in der gewählten Stunde so ist." },
  { type: "strompreis-week-card", element: xr, name: "Strompreis Woche", description: "Die letzten sieben Tage, heute und morgen mit den günstigsten 3 Stunden." }
];
function Zt() {
  for (const r of jt)
    if (!window.customElements.get(r.type))
      try {
        window.customElements.define(r.type, r.element);
      } catch (e) {
        console.warn(`strompreis-verstehen: ${r.type} could not be registered`, e);
      }
}
window.customCards ??= [];
for (const r of jt)
  window.customCards.some((e) => e.type === r.type) || window.customCards.push({ type: r.type, name: r.name, description: r.description, preview: !0, documentationURL: "https://github.com/ehrma/ha-strompreis-verstehen" });
Zt();
let Mt = window.customElements;
const vr = Date.now(), kr = setInterval(() => {
  window.customElements !== Mt && (Mt = window.customElements, Zt()), Date.now() - vr > 6e4 && clearInterval(kr);
}, 50);
console.info("%c STROMPREIS-VERSTEHEN %c cards loaded ", "background:#f5c518;color:#15181c;font-weight:600", "");
