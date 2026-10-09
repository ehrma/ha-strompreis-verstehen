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
const Pe = globalThis, Ge = Pe.ShadowRoot && (Pe.ShadyCSS === void 0 || Pe.ShadyCSS.nativeShadow) && "adoptedStyleSheets" in Document.prototype && "replace" in CSSStyleSheet.prototype, je = /* @__PURE__ */ Symbol(), tt = /* @__PURE__ */ new WeakMap();
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
const Kt = (r) => new Et(typeof r == "string" ? r : r + "", void 0, je), re = (r, ...e) => {
  const t = r.length === 1 ? r[0] : e.reduce((n, i, s) => n + ((o) => {
    if (o._$cssResult$ === !0) return o.cssText;
    if (typeof o == "number") return o;
    throw Error("Value passed to 'css' function must be a 'css' function result: " + o + ". Use 'unsafeCSS' to pass non-literal values, but take care to ensure page security.");
  })(i) + r[s + 1], r[0]);
  return new Et(t, r, je);
}, Xt = (r, e) => {
  if (Ge) r.adoptedStyleSheets = e.map((t) => t instanceof CSSStyleSheet ? t : t.styleSheet);
  else for (const t of e) {
    const n = document.createElement("style"), i = Pe.litNonce;
    i !== void 0 && n.setAttribute("nonce", i), n.textContent = t.cssText, r.appendChild(n);
  }
}, nt = Ge ? (r) => r : (r) => r instanceof CSSStyleSheet ? ((e) => {
  let t = "";
  for (const n of e.cssRules) t += n.cssText;
  return Kt(t);
})(r) : r;
const { is: qt, defineProperty: Qt, getOwnPropertyDescriptor: Yt, getOwnPropertyNames: Jt, getOwnPropertySymbols: en, getPrototypeOf: tn } = Object, Ce = globalThis, rt = Ce.trustedTypes, nn = rt ? rt.emptyScript : "", rn = Ce.reactiveElementPolyfillSupport, we = (r, e) => r, Le = { toAttribute(r, e) {
  switch (e) {
    case Boolean:
      r = r ? nn : null;
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
} }, At = (r, e) => !qt(r, e), st = { attribute: !0, type: String, converter: Le, reflect: !1, useDefault: !1, hasChanged: At };
Symbol.metadata ??= /* @__PURE__ */ Symbol("metadata"), Ce.litPropertyMetadata ??= /* @__PURE__ */ new WeakMap();
let le = class extends HTMLElement {
  static addInitializer(e) {
    this._$Ei(), (this.l ??= []).push(e);
  }
  static get observedAttributes() {
    return this.finalize(), this._$Eh && [...this._$Eh.keys()];
  }
  static createProperty(e, t = st) {
    if (t.state && (t.attribute = !1), this._$Ei(), this.prototype.hasOwnProperty(e) && ((t = Object.create(t)).wrapped = !0), this.elementProperties.set(e, t), !t.noAccessor) {
      const n = /* @__PURE__ */ Symbol(), i = this.getPropertyDescriptor(e, n, t);
      i !== void 0 && Qt(this.prototype, e, i);
    }
  }
  static getPropertyDescriptor(e, t, n) {
    const { get: i, set: s } = Yt(this.prototype, e) ?? { get() {
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
    if (this.hasOwnProperty(we("elementProperties"))) return;
    const e = tn(this);
    e.finalize(), e.l !== void 0 && (this.l = [...e.l]), this.elementProperties = new Map(e.elementProperties);
  }
  static finalize() {
    if (this.hasOwnProperty(we("finalized"))) return;
    if (this.finalized = !0, this._$Ei(), this.hasOwnProperty(we("properties"))) {
      const t = this.properties, n = [...Jt(t), ...en(t)];
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
    return Xt(e, this.constructor.elementStyles), e;
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
      const s = (n.converter?.toAttribute !== void 0 ? n.converter : Le).toAttribute(t, n.type);
      this._$Em = e, s == null ? this.removeAttribute(i) : this.setAttribute(i, s), this._$Em = null;
    }
  }
  _$AK(e, t) {
    const n = this.constructor, i = n._$Eh.get(e);
    if (i !== void 0 && this._$Em !== i) {
      const s = n.getPropertyOptions(i), o = typeof s.converter == "function" ? { fromAttribute: s.converter } : s.converter?.fromAttribute !== void 0 ? s.converter : Le;
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
le.elementStyles = [], le.shadowRootOptions = { mode: "open" }, le[we("elementProperties")] = /* @__PURE__ */ new Map(), le[we("finalized")] = /* @__PURE__ */ new Map(), rn?.({ ReactiveElement: le }), (Ce.reactiveElementVersions ??= []).push("2.1.2");
const Ze = globalThis, it = (r) => r, Te = Ze.trustedTypes, ot = Te ? Te.createPolicy("lit-html", { createHTML: (r) => r }) : void 0, Dt = "$lit$", Q = `lit$${Math.random().toFixed(9).slice(2)}$`, Pt = "?" + Q, sn = `<${Pt}>`, ne = document, xe = () => ne.createComment(""), ye = (r) => r === null || typeof r != "object" && typeof r != "function", Ve = Array.isArray, on = (r) => Ve(r) || typeof r?.[Symbol.iterator] == "function", Ue = `[ 	
\f\r]`, fe = /<(?:(!--|\/[^a-zA-Z])|(\/?[a-zA-Z][^>\s]*)|(\/?$))/g, at = /-->/g, lt = />/g, ee = RegExp(`>|${Ue}(?:([^\\s"'>=/]+)(${Ue}*=${Ue}*(?:[^ 	
\f\r"'\`<>=]|("|')|))|$)`, "g"), ct = /'/g, ht = /"/g, Tt = /^(?:script|style|textarea|title)$/i, zt = (r) => (e, ...t) => ({ _$litType$: r, strings: e, values: t }), g = zt(1), A = zt(2), he = /* @__PURE__ */ Symbol.for("lit-noChange"), f = /* @__PURE__ */ Symbol.for("lit-nothing"), dt = /* @__PURE__ */ new WeakMap(), te = ne.createTreeWalker(ne, 129);
function Ct(r, e) {
  if (!Ve(r) || !r.hasOwnProperty("raw")) throw Error("invalid template strings array");
  return ot !== void 0 ? ot.createHTML(e) : e;
}
const an = (r, e) => {
  const t = r.length - 1, n = [];
  let i, s = e === 2 ? "<svg>" : e === 3 ? "<math>" : "", o = fe;
  for (let c = 0; c < t; c++) {
    const l = r[c];
    let h, a, d = -1, u = 0;
    for (; u < l.length && (o.lastIndex = u, a = o.exec(l), a !== null); ) u = o.lastIndex, o === fe ? a[1] === "!--" ? o = at : a[1] !== void 0 ? o = lt : a[2] !== void 0 ? (Tt.test(a[2]) && (i = RegExp("</" + a[2], "g")), o = ee) : a[3] !== void 0 && (o = ee) : o === ee ? a[0] === ">" ? (o = i ?? fe, d = -1) : a[1] === void 0 ? d = -2 : (d = o.lastIndex - a[2].length, h = a[1], o = a[3] === void 0 ? ee : a[3] === '"' ? ht : ct) : o === ht || o === ct ? o = ee : o === at || o === lt ? o = fe : (o = ee, i = void 0);
    const x = o === ee && r[c + 1].startsWith("/>") ? " " : "";
    s += o === fe ? l + sn : d >= 0 ? (n.push(h), l.slice(0, d) + Dt + l.slice(d) + Q + x) : l + Q + (d === -2 ? c : x);
  }
  return [Ct(r, s + (r[t] || "<?>") + (e === 2 ? "</svg>" : e === 3 ? "</math>" : "")), n];
};
class ve {
  constructor({ strings: e, _$litType$: t }, n) {
    let i;
    this.parts = [];
    let s = 0, o = 0;
    const c = e.length - 1, l = this.parts, [h, a] = an(e, t);
    if (this.el = ve.createElement(h, n), te.currentNode = this.el.content, t === 2 || t === 3) {
      const d = this.el.content.firstChild;
      d.replaceWith(...d.childNodes);
    }
    for (; (i = te.nextNode()) !== null && l.length < c; ) {
      if (i.nodeType === 1) {
        if (i.hasAttributes()) for (const d of i.getAttributeNames()) if (d.endsWith(Dt)) {
          const u = a[o++], x = i.getAttribute(d).split(Q), $ = /([.?@])?(.*)/.exec(u);
          l.push({ type: 1, index: s, name: $[2], strings: x, ctor: $[1] === "." ? cn : $[1] === "?" ? hn : $[1] === "@" ? dn : Ie }), i.removeAttribute(d);
        } else d.startsWith(Q) && (l.push({ type: 6, index: s }), i.removeAttribute(d));
        if (Tt.test(i.tagName)) {
          const d = i.textContent.split(Q), u = d.length - 1;
          if (u > 0) {
            i.textContent = Te ? Te.emptyScript : "";
            for (let x = 0; x < u; x++) i.append(d[x], xe()), te.nextNode(), l.push({ type: 2, index: ++s });
            i.append(d[u], xe());
          }
        }
      } else if (i.nodeType === 8) if (i.data === Pt) l.push({ type: 2, index: s });
      else {
        let d = -1;
        for (; (d = i.data.indexOf(Q, d + 1)) !== -1; ) l.push({ type: 7, index: s }), d += Q.length - 1;
      }
      s++;
    }
  }
  static createElement(e, t) {
    const n = ne.createElement("template");
    return n.innerHTML = e, n;
  }
}
function de(r, e, t = r, n) {
  if (e === he) return e;
  let i = n !== void 0 ? t._$Co?.[n] : t._$Cl;
  const s = ye(e) ? void 0 : e._$litDirective$;
  return i?.constructor !== s && (i?._$AO?.(!1), s === void 0 ? i = void 0 : (i = new s(r), i._$AT(r, t, n)), n !== void 0 ? (t._$Co ??= [])[n] = i : t._$Cl = i), i !== void 0 && (e = de(r, i._$AS(r, e.values), i, n)), e;
}
class ln {
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
    const { el: { content: t }, parts: n } = this._$AD, i = (e?.creationScope ?? ne).importNode(t, !0);
    te.currentNode = i;
    let s = te.nextNode(), o = 0, c = 0, l = n[0];
    for (; l !== void 0; ) {
      if (o === l.index) {
        let h;
        l.type === 2 ? h = new ke(s, s.nextSibling, this, e) : l.type === 1 ? h = new l.ctor(s, l.name, l.strings, this, e) : l.type === 6 && (h = new un(s, this, e)), this._$AV.push(h), l = n[++c];
      }
      o !== l?.index && (s = te.nextNode(), o++);
    }
    return te.currentNode = ne, i;
  }
  p(e) {
    let t = 0;
    for (const n of this._$AV) n !== void 0 && (n.strings !== void 0 ? (n._$AI(e, n, t), t += n.strings.length - 2) : n._$AI(e[t])), t++;
  }
}
class ke {
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
    e = de(this, e, t), ye(e) ? e === f || e == null || e === "" ? (this._$AH !== f && this._$AR(), this._$AH = f) : e !== this._$AH && e !== he && this._(e) : e._$litType$ !== void 0 ? this.$(e) : e.nodeType !== void 0 ? this.T(e) : on(e) ? this.k(e) : this._(e);
  }
  O(e) {
    return this._$AA.parentNode.insertBefore(e, this._$AB);
  }
  T(e) {
    this._$AH !== e && (this._$AR(), this._$AH = this.O(e));
  }
  _(e) {
    this._$AH !== f && ye(this._$AH) ? this._$AA.nextSibling.data = e : this.T(ne.createTextNode(e)), this._$AH = e;
  }
  $(e) {
    const { values: t, _$litType$: n } = e, i = typeof n == "number" ? this._$AC(e) : (n.el === void 0 && (n.el = ve.createElement(Ct(n.h, n.h[0]), this.options)), n);
    if (this._$AH?._$AD === i) this._$AH.p(t);
    else {
      const s = new ln(i, this), o = s.u(this.options);
      s.p(t), this.T(o), this._$AH = s;
    }
  }
  _$AC(e) {
    let t = dt.get(e.strings);
    return t === void 0 && dt.set(e.strings, t = new ve(e)), t;
  }
  k(e) {
    Ve(this._$AH) || (this._$AH = [], this._$AR());
    const t = this._$AH;
    let n, i = 0;
    for (const s of e) i === t.length ? t.push(n = new ke(this.O(xe()), this.O(xe()), this, this.options)) : n = t[i], n._$AI(s), i++;
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
class Ie {
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
    let o = !1;
    if (s === void 0) e = de(this, e, t, 0), o = !ye(e) || e !== this._$AH && e !== he, o && (this._$AH = e);
    else {
      const c = e;
      let l, h;
      for (e = s[0], l = 0; l < s.length - 1; l++) h = de(this, c[n + l], t, l), h === he && (h = this._$AH[l]), o ||= !ye(h) || h !== this._$AH[l], h === f ? e = f : e !== f && (e += (h ?? "") + s[l + 1]), this._$AH[l] = h;
    }
    o && !i && this.j(e);
  }
  j(e) {
    e === f ? this.element.removeAttribute(this.name) : this.element.setAttribute(this.name, e ?? "");
  }
}
class cn extends Ie {
  constructor() {
    super(...arguments), this.type = 3;
  }
  j(e) {
    this.element[this.name] = e === f ? void 0 : e;
  }
}
class hn extends Ie {
  constructor() {
    super(...arguments), this.type = 4;
  }
  j(e) {
    this.element.toggleAttribute(this.name, !!e && e !== f);
  }
}
class dn extends Ie {
  constructor(e, t, n, i, s) {
    super(e, t, n, i, s), this.type = 5;
  }
  _$AI(e, t = this) {
    if ((e = de(this, e, t, 0) ?? f) === he) return;
    const n = this._$AH, i = e === f && n !== f || e.capture !== n.capture || e.once !== n.once || e.passive !== n.passive, s = e !== f && (n === f || i);
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
    de(this, e);
  }
}
const pn = Ze.litHtmlPolyfillSupport;
pn?.(ve, ke), (Ze.litHtmlVersions ??= []).push("3.3.3");
const mn = (r, e, t) => {
  const n = t?.renderBefore ?? e;
  let i = n._$litPart$;
  if (i === void 0) {
    const s = t?.renderBefore ?? null;
    n._$litPart$ = i = new ke(e.insertBefore(xe(), s), s, void 0, t ?? {});
  }
  return i._$AI(r), i;
};
const Ke = globalThis;
class be extends le {
  constructor() {
    super(...arguments), this.renderOptions = { host: this }, this._$Do = void 0;
  }
  createRenderRoot() {
    const e = super.createRenderRoot();
    return this.renderOptions.renderBefore ??= e.firstChild, e;
  }
  update(e) {
    const t = this.render();
    this.hasUpdated || (this.renderOptions.isConnected = this.isConnected), super.update(e), this._$Do = mn(t, this.renderRoot, this.renderOptions);
  }
  connectedCallback() {
    super.connectedCallback(), this._$Do?.setConnected(!0);
  }
  disconnectedCallback() {
    super.disconnectedCallback(), this._$Do?.setConnected(!1);
  }
  render() {
    return he;
  }
}
be._$litElement$ = !0, be.finalized = !0, Ke.litElementHydrateSupport?.({ LitElement: be });
const gn = Ke.litElementPolyfillSupport;
gn?.({ LitElement: be });
(Ke.litElementVersions ??= []).push("4.2.2");
const fn = [
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
Object.fromEntries(fn.map((r) => [r.key, r]));
const se = "Europe/Berlin", ut = /* @__PURE__ */ new Map();
function $n(r, e = se) {
  const t = e + JSON.stringify(r);
  let n = ut.get(t);
  return n || (n = new Intl.DateTimeFormat("de-DE", { timeZone: e, ...r }), ut.set(t, n)), n;
}
function Xe(r, e = se) {
  const t = $n({
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
function wn(r, e = se) {
  const t = Xe(r, e), n = Date.UTC(t.year, t.month - 1, t.day, t.hour, t.minute, t.second);
  return Math.round((n - r.getTime()) / 6e4);
}
function bn(r, e = se) {
  const t = Xe(r, e);
  return `${t.year}-${String(t.month).padStart(2, "0")}-${String(t.day).padStart(2, "0")}`;
}
function ie(r, e = se) {
  return Xe(r, e).hour;
}
function pt(r, e = 0, t = 0, n = se) {
  const [i, s, o] = r.split("-").map(Number), c = Date.UTC(i, s - 1, o, e, t);
  let l = new Date(c);
  for (let h = 0; h < 2; h++) {
    const a = wn(l, n);
    l = new Date(c - a * 6e4);
  }
  return l;
}
function It(r, e = se) {
  const t = pt(r, 0, 0, e), n = xn(r, 1);
  return { start: t, end: pt(n, 0, 0, e) };
}
function xn(r, e) {
  const [t, n, i] = r.split("-").map(Number);
  return new Date(Date.UTC(t, n - 1, i + e)).toISOString().slice(0, 10);
}
function yn(r, e = 0) {
  const t = 10 ** e;
  return Math.round(r * t) / t;
}
function Y(r, e = 0) {
  const t = yn(r, e).toFixed(e), [n, i] = t.split("."), s = n.startsWith("-"), c = (s ? n.slice(1) : n).replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return (s ? "-" : "") + c + (i ? "," + i : "");
}
function Z(r, e = 0) {
  return `${Y(r, e)} €/MWh`;
}
function vn(r, e = 1) {
  return `${Y(r / 10, e)} ct/kWh`;
}
const Wt = /(-?\d{1,3}(?:\.\d{3})*(?:,\d+)?) €\/MWh/g;
function kn(r) {
  return r.replace(Wt, (e, t) => vn(Number(t.replace(/\./g, "").replace(",", "."))));
}
function Sn(r, e) {
  let t = 0;
  return r.replace(Wt, (n, i) => Z(e(Number(i.replace(/\./g, "").replace(",", ".")), t++)));
}
const q = (...r) => ({ kind: "p", parts: r }), K = (r) => ({ strong: r });
q(K("Dynamischer Tarif"), " (zum Beispiel Tibber, Octopus oder Rabot): Ihr Preis folgt Stunde für Stunde der Börse."), q("Der Aufschlag ist alles, was zum Börsenpreis dazukommt, schon mit Mehrwertsteuer: Netzentgelt, Stromsteuer, Umlagen, Konzessionsabgabe und der Aufschlag Ihres Anbieters. Ein Beispiel: Kostet Strom an der Börse 8 ct/kWh und beträgt Ihr Aufschlag 20 ct/kWh, zahlen Sie 8 × 1,19 + 20 = 29,5 ct/kWh."), q("Mit einem zeitvariablen Netzentgelt (§14a EnWG, Modul 3, für Wärmepumpe oder Wallbox) gilt in bestimmten Stunden ein anderer Aufschlag. Dann rechnet die Seite in jeder Stunde mit dem Aufschlag, der zu dieser Uhrzeit gilt."), q(K("Zeitvariabler Tarif (HT/NT)"), ": Ihr Preis hängt nicht von der Börse ab, nur von der Uhrzeit. In einem Zeitfenster gilt dessen Preis, sonst der Preis außerhalb der Zeitfenster. Die Kurven zeigen dann Stufen, und ein teurer Abend an der Börse ändert nichts an Ihrem Preis."), q("Der Grundpreis pro Monat ist in keinem Stundenpreis enthalten, denn er hängt nicht davon ab, wann Sie Strom verbrauchen. Solange Sie keinen eigenen Tarif eintragen, rechnet die Seite mit bundesweiten Schätzwerten; welche das sind, steht unter ", { text: "Mein Preis", href: "/tarif" }, "."), K("Dynamischer Tarif"), K("Zeitvariabler Tarif (HT/NT)"), K("Aufschlag auf den Börsenpreis"), K("Preis außerhalb der Zeitfenster"), K("Speichern und überall anzeigen"), K("Speichern"), q("Nur auf dem Gerät, auf dem Sie ihn eintragen: im Speicher des Browsers oder der App. Es gibt kein Konto, und der Tarif wird nicht an den Server geschickt. Deshalb gilt er nur dort, wo Sie ihn eingetragen haben. ", K("Laptop, Handy-Browser und App brauchen ihn jeweils einzeln."), " Wer die Websitedaten im Browser löscht, löscht auch den Tarif; dann rechnet die Seite wieder mit den Schätzwerten."), q("In der App nutzen auch die Widgets auf dem Startbildschirm und der Preis-Alarm den gespeicherten Tarif. Die Angaben bleiben dabei auf dem Gerät."), q("Die Übersicht zeigt, was bei „Mein Preis“ Ihren Preis zeigt und was beim Börsenpreis bleibt. Was beim Börsenpreis bleibt, beschreibt den Markt oder kennt Ihren Tarif nicht, und ist auf der Seite so beschriftet.");
const _n = { validFrom: "2026-01-01", validTo: "2026-12-31" }, Mn = {
  haushaltsDurchschnitt: {
    ..._n
  }
}, En = Mn;
Number(En.haushaltsDurchschnitt.validFrom.slice(0, 4));
const mt = 36e5, gt = 9e5, An = [
  { key: "negativ", label: "negativ", upTo: 0 },
  { key: "sehr_guenstig", label: "sehr günstig", upTo: 80 },
  { key: "guenstig", label: "günstig", upTo: 130 },
  { key: "mittel", label: "mittel", upTo: 180 },
  { key: "teuer", label: "teuer", upTo: 230 },
  { key: "sehr_teuer", label: "sehr teuer", upTo: Number.POSITIVE_INFINITY }
];
function ue(r) {
  for (const e of An)
    if (r < e.upTo)
      return e.key;
  return "sehr_teuer";
}
function Dn(r, e = []) {
  const t = new Map(e.map((s) => [Date.parse(s.ts), s])), n = /* @__PURE__ */ new Map();
  for (const s of r) {
    if (s.price === null)
      continue;
    const o = Math.floor(Date.parse(s.ts) / mt) * mt, c = n.get(o) ?? { sum: 0, n: 0, neg: 0 };
    c.sum += s.price, c.n += 1, s.price < 0 && (c.neg += 1), n.set(o, c);
  }
  return [.../* @__PURE__ */ new Set([...n.keys(), ...t.keys()])].sort((s, o) => s - o).map((s) => {
    const o = t.get(s) ?? null, c = n.get(s), l = new Date(s);
    return { ts: l.toISOString(), ms: s, hour: o?.hour ?? ie(l), priceEurMwh: c ? c.sum / c.n : o.priceEurMwh, negativeQuarters: c?.neg ?? (o && o.priceEurMwh < 0 ? 4 : 0), explanation: o };
  });
}
function qe(r, e = [2, 3, 4]) {
  const t = r.filter((i) => i.price !== null).map((i) => ({ ms: Date.parse(i.ts), price: i.price })), n = [];
  for (const i of e) {
    const s = i * 4;
    let o = null;
    for (let c = 0; c + s <= t.length; c++) {
      if (t[c + s - 1].ms - t[c].ms !== (s - 1) * gt)
        continue;
      let l = 0;
      for (let a = c; a < c + s; a++)
        l += t[a].price;
      const h = l / s;
      (o === null || h < o.avg) && (o = { i: c, avg: h });
    }
    o && n.push({ hours: i, from: new Date(t[o.i].ms).toISOString(), to: new Date(t[o.i].ms + s * gt).toISOString(), avgEurMwh: o.avg });
  }
  return n;
}
function Pn(r, e) {
  const t = e === "teurer" ? " Insgesamt teurer als in den letzten 30 Tagen üblich." : e === "guenstiger" ? " Insgesamt günstiger als in den letzten 30 Tagen üblich." : e === "ueblich" ? " Insgesamt etwa wie üblich." : "";
  return `Zwischen ${Z(r.min)} um ${r.minHour} Uhr und ${Z(r.max)} um ${r.maxHour} Uhr, im Schnitt ${Z(r.avg)}.${t}`;
}
function Ot(r) {
  return `${r.fromHour}-${r.toHour} Uhr`;
}
const _e = (r) => {
  const e = new Date(r);
  return `${String(ie(e)).padStart(2, "0")}:${String(e.getUTCMinutes()).padStart(2, "0")}`;
};
function ft(r, e) {
  const t = r.verdict, n = e.verdict;
  if (!t || !n)
    return null;
  let i;
  if (Math.abs(n.avgEurMwh) < 5)
    i = `Morgen kostet Strom im Schnitt ${Z(t.avgEurMwh)}, heute ${Z(n.avgEurMwh)}.`;
  else {
    const l = (t.avgEurMwh - n.avgEurMwh) / Math.abs(n.avgEurMwh) * 100;
    i = Math.abs(l) < 3 ? `Morgen kostet Strom im Schnitt ${Z(t.avgEurMwh)}, etwa so viel wie heute (${Z(n.avgEurMwh)}).` : `Morgen kostet Strom im Schnitt ${Z(t.avgEurMwh)}, ${Y(Math.abs(l), 0)} % ${l > 0 ? "mehr" : "weniger"} als heute (${Z(n.avgEurMwh)}).`;
  }
  const s = r.windows.find((l) => l.hours === 3), o = e.windows.find((l) => l.hours === 3), c = s && o ? ` Die günstigsten drei Stunden: morgen ${_e(s.from)}-${_e(s.to)} Uhr (${Z(s.avgEurMwh)}), heute ${_e(o.from)}-${_e(o.to)} Uhr (${Z(o.avgEurMwh)}).` : "";
  return i + c;
}
function $t(r) {
  return r.shiftSavingEur === null || r.shiftSavingEur < 0.2 ? null : `10 kWh von ${r.maxHour} auf ${r.minHour} Uhr verschoben: rund ${Y(r.shiftSavingEur, 2)} € gespart.`;
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
  return r.map((t) => t.price === null ? t : { ...t, price: e(t.price, ie(new Date(t.ts))) });
}
const Tn = [
  [/Der Preis (lag|liegt) rund/g, "Der Börsenpreis $1 rund"],
  [/(€\/MWh|ct\/kWh) davon sind ein Knappheitsaufschlag/g, "$1 des Börsenpreises sind ein Knappheitsaufschlag"]
];
function zn(r) {
  return Tn.reduce((e, [t, n]) => e.replace(t, n), r);
}
const wt = 6.2, Cn = 6.4;
function In(r) {
  for (const e of [50, 100, 200, 500, 1e3, 2e3])
    if (r / e <= 6)
      return e;
  return 5e3;
}
function Wn(r, e, t = {}) {
  const n = t.width ?? 360, i = t.height ?? 214, s = t.top ?? 40, o = t.bottom ?? 34, c = t.left ?? 30, l = t.right ?? 8, h = { x: c, y: s, w: n - c - l, h: i - s - o }, a = Math.max(1, r.length), d = h.w / a, u = t.map ?? Qe, x = r.map((y) => u(y.priceEurMwh, y.hour)), $ = x.length ? Math.max(...x) : 100, k = x.length ? Math.min(...x) : 0, p = In(Math.max($, 50) * 1.15 - Math.min(0, k)), v = Math.max(p, Math.ceil($ * 1.15 / p) * p), S = k < 0 ? Math.floor(k / p) * p : 0, T = (y) => h.y + h.h - (y - S) / (v - S) * h.h, _ = T(Math.max(S, 0)), D = [];
  for (let y = S; y <= v + 1e-9; y += p)
    D.push({ y: T(y), label: Y(y / 10, 0) });
  const L = [];
  for (const y of [0, 6, 12, 18]) {
    const I = r.findIndex((B) => B.hour === y);
    I >= 0 && L.push({ x: h.x + I * d, label: String(y), anchor: y === 0 ? "start" : "middle" });
  }
  L.push({ x: h.x + h.w, label: "24", anchor: "end" });
  let G = "";
  r.length && (G = `M${oe(h.x)},${oe(T(x[0]))}`, r.forEach((y, I) => {
    const B = h.x + (I + 1) * d;
    G += ` H${oe(B)}`, I < r.length - 1 && (G += ` V${oe(T(x[I + 1]))}`);
  }));
  const w = r.length ? `${G} V${oe(_)} H${oe(h.x)} Z` : "", W = r.map((y, I) => ({ index: I, x: h.x + I * d, w: d, y: T(x[I]), level: ue(y.priceEurMwh), hour: y.hour })), O = e.map((y) => {
    const I = h.x + y.startIdx * d, B = (y.endIdx - y.startIdx) * d, b = y.name.length * Cn + 8 <= B;
    return { index: y.index, x: I, w: B, label: b ? y.name : B >= 18 ? String(y.index + 1) : null, name: y.name };
  }), j = [];
  if (r.length >= 2 && $ !== k) {
    const y = x.indexOf($), I = x.indexOf(k), B = (z) => h.x + (z + 0.5) * d, b = (z, M, R) => {
      const H = M.length * wt, C = B(z);
      return C - H / 2 < h.x ? { x: h.x + d * 0.2, y: R, text: M, anchor: "start" } : C + H / 2 > h.x + h.w ? { x: h.x + h.w - d * 0.2, y: R, text: M, anchor: "end" } : { x: C, y: R, text: M, anchor: "middle" };
    }, E = b(y, `▲ ${Y($ / 10, 1)} ct · ${r[y].hour} Uhr`, T($) - 7);
    j.push(E);
    const P = T(k), N = P + 16, U = b(I, `▼ ${Y(k / 10, 1)} ct · ${r[I].hour} Uhr`, N <= h.y + h.h - 2 ? N : P - 7);
    Math.abs(U.y - E.y) < 12 && Math.abs(U.x - E.x) < (U.text.length + E.text.length) * wt * 0.5 && (U.y = E.y + 13), j.push(U);
  }
  const V = t.now && t.now.index >= 0 && t.now.index < a ? { x: h.x + (t.now.index + Math.min(1, Math.max(0, t.now.fraction))) * d, label: t.now.label } : null;
  return { width: n, height: i, plot: h, slotW: d, yOf: T, yTicks: D, xTicks: L, areaPath: w, linePath: G, zeroY: S < 0 ? T(0) : null, baselineY: _, slots: W, bands: O, labels: j, now: V, yMax: v, yMin: S };
}
function oe(r) {
  return String(Math.round(r * 10) / 10);
}
const Me = [
  { key: "wind", label: "Wind" },
  { key: "solar", label: "Sonne" },
  { key: "bio", label: "Bio & Wasser" },
  { key: "coal", label: "Kohle" },
  { key: "gas", label: "Gas" },
  { key: "other", label: "Sonstige" },
  { key: "forecastRest", label: "Übrige" }
], ce = 9e5, On = 36e5;
function Ee(...r) {
  let e = 0, t = 0;
  for (const n of r)
    n !== null && (e += n, t++);
  return t ? e : null;
}
function Un(r) {
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
    const l = e[s - 1]?.[o] ?? null, h = s + 1 <= n ? e[s + 1]?.[o] ?? null : null;
    return l !== null && h !== null ? (l + h) / 2 : l ?? h;
  };
  return e.map((s, o) => {
    const c = Date.parse(s.ts), l = { wind: 0, solar: 0, bio: 0, coal: 0, gas: 0, other: 0, forecastRest: 0 };
    return o <= n && s.load != null ? {
      ms: c,
      actual: !0,
      forecast: !1,
      layers: {
        ...l,
        wind: Ee(i(o, "windOnshore"), i(o, "windOffshore")) ?? 0,
        solar: i(o, "solar") ?? 0,
        bio: Ee(i(o, "biomass"), i(o, "hydro"), i(o, "otherRenewable")) ?? 0,
        coal: Ee(i(o, "lignite"), i(o, "hardCoal")) ?? 0,
        gas: i(o, "gas") ?? 0,
        // nuclear only exists on days before April 2023; it is too small a layer today to name on its own
        other: Ee(i(o, "pumpedStorage"), i(o, "otherConventional"), i(o, "nuclear")) ?? 0
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
  const i = (l) => n.reduce((h, a) => h + l(a), 0) / n.length, s = n.filter((l) => l.actual), o = n.reduce((l, h) => l + (h.load ?? 0), 0), c = n.reduce((l, h) => l + h.layers.wind + h.layers.solar + h.layers.bio, 0);
  return {
    renewableShare: o > 0 ? c / o : null,
    windMw: i((l) => l.layers.wind),
    solarMw: i((l) => l.layers.solar),
    residualMw: i((l) => (l.load ?? 0) - l.layers.wind - l.layers.solar),
    gasMw: s.length ? s.reduce((l, h) => l + h.layers.gas, 0) / s.length : null,
    gasMaxMw: s.length ? Math.max(...s.map((l) => l.layers.gas)) : null,
    forecast: n.filter((l) => l.forecast).length > n.length / 2
  };
}
const Re = 5.6, Rn = 11;
function He(r, e, t, n = !0, i = !0) {
  const s = [];
  if (!r.length)
    return s;
  n && s.push([e(r[0].ms), t(r[0])]);
  for (const o of r)
    s.push([e(o.ms + ce / 2), t(o)]);
  return i && s.push([e(r[r.length - 1].ms + ce), t(r[r.length - 1])]), s;
}
function ae(r) {
  return String(Math.round(r * 10) / 10);
}
function Hn(r, e, t, n = {}) {
  const i = n.width ?? 360, s = n.height ?? 150, o = n.top ?? 18, c = n.bottom ?? 20, l = n.left ?? 30, h = n.right ?? 8, a = { x: l, y: o, w: i - l - h, h: s - o - c }, d = Math.max(ce, t - e), u = (b) => a.x + (b - e) / d * a.w, x = r.filter((b) => b !== null), $ = x.map((b) => Me.reduce((E, P) => E + b.layers[P.key], 0)), k = Math.max(0, ...$, ...x.map((b) => b.load ?? 0)), p = k > 6e4 ? 2e4 : 1e4, v = Math.max(p, Math.ceil(k * 1.06 / p) * p), S = (b) => a.y + a.h - b / v * a.h, T = [];
  let _ = [];
  for (const b of r)
    b && (!_.length || b.ms - _[_.length - 1].ms === ce) ? _.push(b) : (_.length && T.push(_), _ = b ? [b] : []);
  _.length && T.push(_);
  const D = [], L = [];
  Me.forEach((b, E) => {
    if (!x.some((M) => M.layers[b.key] > 0))
      return;
    const P = (M) => Me.slice(0, E).reduce((R, H) => R + M.layers[H.key], 0), N = (M) => P(M) + M.layers[b.key];
    let U = "", z = null;
    for (const M of T) {
      const R = He(M, u, (C) => S(N(C))), H = He(M, u, (C) => S(P(C))).reverse();
      U += `M${R.map(([C, J]) => `${ae(C)},${ae(J)}`).join(" L")} L${H.map(([C, J]) => `${ae(C)},${ae(J)}`).join(" L")} Z `;
      for (const C of M) {
        const J = S(P(C)) - S(N(C));
        (!z || J > z.band) && (z = { x: C, band: J });
      }
    }
    if (D.push({ key: b.key, label: b.label, path: U.trim() }), z && z.band >= Rn) {
      const M = b.label, R = M.length * Re, H = Math.min(a.x + a.w - R / 2 - 2, Math.max(a.x + R / 2 + 2, u(z.x.ms + ce / 2))), C = (S(P(z.x)) + S(N(z.x))) / 2 + 3.5;
      L.some((Oe) => Math.abs(Oe.y - C) < 12 && Math.abs(Oe.x - H) < (R + Oe.text.length * Re) / 2 + 4) || L.push({ key: b.key, x: H, y: C, text: M });
    }
  });
  let G = "", w = "";
  for (const b of T) {
    const E = b.filter((N) => N.load !== null);
    let P = 0;
    for (; P < E.length; ) {
      const N = E[P].actual;
      let U = P;
      for (; U + 1 < E.length && E[U + 1].actual === N; )
        U++;
      const z = E.slice(P, U + 1), M = He(z, u, (H) => S(H.load), P === 0, U === E.length - 1);
      if (P > 0) {
        const H = E[P - 1];
        M.unshift([u(H.ms + ce / 2), S(H.load)]);
      }
      const R = `M${M.map(([H, C]) => `${ae(H)},${ae(C)}`).join(" L")} `;
      N ? G += R : w += R, P = U + 1;
    }
  }
  const W = x.find((b) => b.forecast), O = x.some((b) => b.actual), j = W && O ? u(W.ms) : null, V = [0, v / 2, v].map((b) => ({ y: S(b), label: Y(b / 1e3, 0) })), y = [];
  for (let b = e; b < t; b += On) {
    const E = ie(new Date(b));
    E % 6 === 0 && (y.some((P) => P.label === String(E)) || y.push({ x: u(b), label: String(E), anchor: b === e ? "start" : "middle" }));
  }
  y.push({ x: a.x + a.w, label: "24", anchor: "end" });
  let I = null;
  const B = x.filter((b) => b.load !== null);
  if (B.length) {
    const b = O ? "Verbrauch" : "Erzeugung gesamt", E = b.length * Re, P = (z) => S(Me.reduce((M, R) => M + z.layers[R.key], 0)) - S(z.load), N = B.reduce((z, M) => P(M) > P(z) ? M : z, B[0]);
    I = { x: Math.min(a.x + a.w - E - 2, Math.max(a.x + 2, u(N.ms) - E / 2)), y: Math.max(a.y + 9, S(N.load) - 4), text: b };
  }
  return {
    width: i,
    height: s,
    plot: a,
    xOf: u,
    yOf: S,
    layers: D,
    loadPath: G.trim(),
    forecastLoadPath: w.trim(),
    forecastX: j,
    allForecast: x.length > 0 && !O,
    yTicks: V,
    xTicks: y,
    labels: L,
    loadLabel: I,
    hasData: x.length > 0
  };
}
const Ln = 9e5, Nn = [
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
], Bn = (r) => Math.round(r * 10) / 10;
function ze(r) {
  const e = Date.parse(r.start), t = [];
  for (let n = 0; n < r.slots; n++) {
    const i = { ts: new Date(e + n * Ln).toISOString(), price: r.price[n] ?? null };
    for (const o of Nn)
      i[o] = r.mix?.[o][n] ?? null;
    const s = i.windOnshore !== null || i.windOffshore !== null ? (i.windOnshore ?? 0) + (i.windOffshore ?? 0) : null;
    i.residual = i.load !== null && s !== null && i.solar !== null ? Bn(i.load - s - i.solar) : null, t.push(i);
  }
  return t;
}
const Ne = new Intl.NumberFormat("de-DE", { maximumFractionDigits: 0 }), Je = new Intl.NumberFormat("de-DE", { minimumFractionDigits: 1, maximumFractionDigits: 1 }), et = (r) => Ne.format(Math.round(r) + 0), Fn = (r) => Je.format(Math.abs(r) < 0.05 ? 0 : r), $e = (r) => `${Je.format(r / 1e3)} GW`, Rt = ["So", "Mo", "Di", "Mi", "Do", "Fr", "Sa"], Gn = ["Jan", "Feb", "Mär", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez"];
function Ht(r) {
  return r.split("-").map(Number);
}
function Lt(r) {
  const [e, t, n] = Ht(r);
  return `${Rt[new Date(Date.UTC(e, t - 1, n)).getUTCDay()]} ${n}. ${Gn[t - 1]}`;
}
function jn(r) {
  const [e, t, n] = Ht(r);
  return `${Rt[new Date(Date.UTC(e, t - 1, n)).getUTCDay()]} ${String(n).padStart(2, "0")}.${String(t).padStart(2, "0")}.`;
}
const Zn = (r) => `${r}-${(r + 1) % 24} Uhr`, Vn = new Intl.DateTimeFormat("de-DE", { hour: "2-digit", minute: "2-digit", hourCycle: "h23", timeZone: "Europe/Berlin" }), X = (r) => Vn.format(new Date(r)), Nt = (r) => `${X(r)}-${X(new Date(r).getTime() + 9e5)} Uhr`;
function Kn(r) {
  return r >= 1.85 ? `${Ne.format(Math.round(r))}× so teuer` : r >= 1.15 ? `${Je.format(r)}× so teuer` : r > 0.87 ? "etwa gleich" : `${Ne.format((1 - r) * 100)} % günstiger`;
}
const Xn = /^[^:]*?\d{1,2}-\d{1,2} Uhr: [\s\S]*?\. (?=[A-ZÄÖÜ])/, qn = (r) => r.replace(Xn, "");
function Qn(r, e, t) {
  const n = r % 24, i = e % 24;
  return n === i ? !1 : n < i ? t >= n && t < i : t >= n || t < i;
}
function Bt(r, e) {
  let t = r.base_ct;
  for (const n of r.windows) Qn(n.from_hour, n.to_hour, e) && (t = n.ct);
  return t;
}
function Yn(r) {
  let e = 0;
  for (let t = 0; t < 24; t++) e += Bt(r, t);
  return e / 24;
}
function Jn(r, e, t) {
  return (e.kind === "dynamic" ? r / 10 * (1 + e.vat / 100) : 0) + (t === null ? Yn(e) : Bt(e, t));
}
const er = { kind: "dynamic", base_ct: 19.69, vat: 19, windows: [] };
function tr(r, e) {
  const t = e ?? er, n = r !== "mein_preis", i = (a, d) => n ? a : Jn(a, t, d) * 10, s = (a) => a == null ? null : typeof a == "number" ? a : ie(new Date(a)), o = (a, d) => i(a, s(d)), c = r === "eur_mwh" ? "€/MWh" : "ct/kWh", l = (a) => r === "eur_mwh" ? et(a) : Fn(a / 10), h = (a) => `${l(a)} ${c}`;
  return {
    unit: r,
    suffix: c,
    isExchange: n,
    map: i,
    shown: o,
    number: (a, d) => l(o(a, d)),
    price: (a, d) => h(o(a, d)),
    shownNumber: l,
    shownPrice: h,
    text: (a, d) => {
      const u = d ? Sn(a, d) : n ? a : zn(a);
      return r === "eur_mwh" ? u : kn(u);
    },
    axisUnit: r === "eur_mwh" ? "€" : "ct"
  };
}
function We(r) {
  return `${r === "today" ? "Die Preise für heute fehlen noch." : "Die Preise für gestern fehlen noch."} Die Strombörse hat sie versteigert, aber SMARD (Bundesnetzagentur) hat sie bisher nicht veröffentlicht. Sie erscheinen hier, sobald sie da sind.`;
}
const Ft = "strompreis.ha.resolution.v1";
function nr() {
  try {
    return localStorage.getItem(Ft) === "quarter" ? "quarter" : "hour";
  } catch {
    return "hour";
  }
}
class rr extends EventTarget {
  constructor() {
    super(...arguments), this.home = null, this.tariff = null, this.stale = !1, this.error = null, this.loading = !0, this.day = "today", this.resolution = nr(), this.selectedMs = null, this.now = Date.now(), this.persist = !0, this.fixedDate = null, this.connection = null, this.clock = null;
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
const m = new rr(), sr = [
  { value: "ct_kwh", label: "Börsenpreis in ct/kWh" },
  { value: "mein_preis", label: "Mein Preis (Tarif aus der Integration)" },
  { value: "eur_mwh", label: "Börsenpreis in €/MWh" }
], Se = { name: "unit", selector: { select: { mode: "dropdown", options: sr } } }, me = { name: "title", selector: { text: {} } }, ge = {
  unit: "Preise anzeigen als",
  title: "Überschrift (leer: Standard)",
  show_verdict: "Tagesbild zeigen",
  show_strip: "Preisstreifen zeigen",
  show_switches: "Tag und Raster umschaltbar",
  show_text: "Texte zeigen"
}, ir = {
  negativ: "negativ",
  sehr_guenstig: "sehr günstig",
  guenstig: "günstig",
  mittel: "mittel",
  teuer: "teuer",
  sehr_teuer: "sehr teuer"
};
class F extends be {
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
    return tr(this.config?.unit ?? "ct_kwh", m.tariff);
  }
  /** a card in the integration's absence or before the first data: one line instead of an empty frame */
  placeholder() {
    return m.error === "not_loaded" ? this.frame(g`<p class="muted">Die Integration „Strompreis verstehen“ ist nicht eingerichtet.</p>`) : m.error === "no_data" ? this.frame(g`<p class="muted">Gerade keine Daten von „Strompreis verstehen“. Nächster Versuch in wenigen Minuten.</p>`) : m.error ? this.frame(g`<p class="muted">Keine Daten von „Strompreis verstehen“ (${m.error}).</p>`) : m.loading || !m.home ? this.frame(g`<div class="skeleton"></div>`) : null;
  }
  frame(e, t) {
    const n = this.config?.title ?? t;
    return g`<ha-card>
      <div class="card">
        ${n ? g`<h2 class="kicker">${n}</h2>` : f} ${e}
        ${m.stale ? g`<p class="note">Keine Verbindung zum Datendienst, angezeigt wird der letzte Stand.</p>` : f}
      </div>
    </ha-card>`;
  }
  static {
    this.styles = re`
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
const Be = 36e5, or = 9e5, xt = (r) => r;
function ar(r, e, t) {
  if (!t) return Dn(e, xt(r.hours));
  const n = new Map(xt(r.hours).map((s) => [Date.parse(s.ts), s])), i = [];
  for (const s of e) {
    if (s.price === null) continue;
    const o = Date.parse(s.ts);
    i.push({ ts: s.ts, ms: o, hour: ie(new Date(o)), priceEurMwh: s.price, negativeQuarters: s.price < 0 ? 4 : 0, explanation: n.get(Math.floor(o / Be) * Be) ?? null });
  }
  return i;
}
function lr(r, e) {
  return !e.length || !r.length ? [] : e.map((t) => {
    const n = Date.parse(t.from), i = Date.parse(t.to);
    let s = r.findIndex((c) => c.ms >= n), o = r.findIndex((c) => c.ms >= i);
    return s < 0 && (s = r.length), o < 0 && (o = r.length), { ...t, startIdx: s, endIdx: o };
  });
}
const yt = /* @__PURE__ */ new WeakMap();
function Gt(r) {
  const e = m.home;
  return e ? r === "yesterday" ? e.yesterday : r === "today" ? e.today : e.tomorrow : null;
}
function pe(r = m.day, e = Qe) {
  const t = Gt(r);
  if (!t || !t.hasPrices) return null;
  const n = m.resolution === "quarter";
  let i = yt.get(t);
  i || (i = { quarters: ze(t), grids: /* @__PURE__ */ new Map() }, yt.set(t, i));
  const { quarters: s, grids: o } = i, c = (_) => {
    let D = o.get(_);
    if (!D) {
      const L = ar(t, s, _);
      D = { slots: L, phases: lr(L, t.phases) }, o.set(_, D);
    }
    return D;
  }, { slots: l, phases: h } = c(n), a = n ? or : Be, d = (_) => l.findIndex((D) => _ >= D.ms && _ < D.ms + a), u = r === "today" && m.fixedDate === null ? d(m.now) : -1, x = u >= 0 ? (m.now - l[u].ms) / a : 0, $ = l.map((_) => e(_.priceEurMwh, _.hour)), k = $.reduce((_, D, L) => _ < 0 || D < $[_] ? L : _, -1), p = m.selectedMs !== null ? d(m.selectedMs) : -1, v = u >= 0 ? u : k, S = p >= 0 ? p : v >= 0 ? v : null, T = (_) => h.find((D) => _ >= D.startIdx && _ < D.endIdx) ?? null;
  return {
    key: r,
    day: t,
    quarters: s,
    slots: l,
    hourly: c(!1).slots,
    phases: h,
    fine: n,
    stepMs: a,
    nowIdx: u,
    nowFraction: x,
    idx: S,
    slot: S !== null ? l[S] ?? null : null,
    phase: S !== null ? T(S) : null,
    nowPhase: u >= 0 ? T(u) : null
  };
}
function Fe(r, e) {
  return r.fine ? Nt(e.ms) : Zn(e.hour);
}
function jt(r) {
  return `${Lt(r)} ${r.slice(0, 4)}`;
}
const vt = { yesterday: "Gestern", today: "Heute", tomorrow: "Morgen" };
class cr extends F {
  constructor() {
    super(...arguments), this.dragging = !1, this.resizeObserver = null, this.observed = null;
  }
  static getConfigForm() {
    return {
      schema: [Se, { name: "show_verdict", selector: { boolean: {} } }, { name: "show_strip", selector: { boolean: {} } }, { name: "show_switches", selector: { boolean: {} } }, me],
      computeLabel: (e) => ge[e.name]
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
    const t = m.home, n = m.day, i = pe(n, this.units.map), s = this.config, o = this.header(t.date, n);
    if (!i) {
      const c = n === "tomorrow" ? "Die Preise für morgen kommen nach der Auktion, meist gegen 13 Uhr." : m.fixedDate === null ? We(n) : "Für diesen Tag liegen keine Preise vor.";
      return this.frame(g`${o}<p class="muted small">${c}</p>`);
    }
    return this.frame(g`
      ${o} ${s.show_verdict !== !1 ? this.verdict(i) : f} ${this.chart(i)} ${s.show_strip !== !1 ? this.strip(i) : f}
    `);
  }
  header(e, t) {
    const n = t === "yesterday" ? m.home.yesterday.date : t === "tomorrow" ? m.home.tomorrow?.date ?? hr(e) : e, i = m.fixedDate !== null, s = g`<p class="kicker">${i ? jt(n) : g`${vt[t]} · ${Lt(n)}`}</p>`;
    if (this.config.show_switches === !1) return s;
    const o = !!m.home.tomorrow;
    return g`<div class="head">
      ${s}
      <div class="switches">
        ${i ? f : g`<div class="seg" role="group" aria-label="Tag">
          ${["yesterday", "today", "tomorrow"].map(
      (c) => g`<button type="button" aria-pressed=${c === t} @click=${() => m.set({ day: c })}>
                ${vt[c]}${c === "tomorrow" && o && t !== "tomorrow" ? g`<span class="dot" aria-label="Preise da"></span>` : f}
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
    if (!t) return f;
    const n = this.units;
    let i = t.detail, s = e.day.windows, o, c = null;
    if (n.isExchange)
      o = $t(t), e.key === "tomorrow" && (c = ft(e.day, m.home.today));
    else {
      const h = kt(e.hourly, e.quarters, n.map);
      s = h.windows;
      const a = h.stats;
      i = a ? Pn(a, t.vsUsual) : t.detail, o = a ? $t({ shiftSavingEur: t.flat ? null : Math.round((a.max - a.min) / 100 * 100) / 100, maxHour: a.maxHour, minHour: a.minHour }) : null;
      const d = e.key === "tomorrow" ? pe("today", n.map) : null, u = d?.day.verdict ? kt(d.hourly, d.quarters, n.map) : null;
      a && u?.stats && (c = ft({ verdict: { avgEurMwh: a.avg }, windows: s }, { verdict: { avgEurMwh: u.stats.avg }, windows: u.windows }));
    }
    const l = s.find((h) => h.hours === 3) ?? s[0] ?? null;
    return g`<div class="verdict">
      <p class="headline">${t.headline}</p>
      <p class="muted small">${n.text(i)}${o ? ` ${o}` : ""}</p>
      ${c ? g`<p class="small">${n.text(c)}</p>` : f}
      ${l && !t.flat ? g`<p class="best small">
            <span class="badge">Beste ${l.hours} Stunden</span>
            <button type="button" class="link" @click=${() => m.set({ selectedMs: Date.parse(l.from) })}>
              <b>${X(l.from)}-${X(l.to)} Uhr</b>, im Schnitt ${n.shownPrice(l.avgEurMwh)}
            </button>
          </p>` : f}
    </div>`;
  }
  chart(e) {
    const t = this.units, n = Wn(e.slots, e.phases, { map: t.map }), i = t.unit === "eur_mwh", s = (p) => i ? String(Math.round(Number(p.replace(/\./g, "").replace(",", ".")) * 10)) : p, o = (p) => i ? p.replace(/(-?[\d.]+,\d) ct/, (v, S) => `${Math.round(Number(S.replace(/\./g, "").replace(",", ".")) * 10)} €`) : p, c = e.idx !== null ? n.slots[e.idx] : void 0, l = e.phase, h = n.bands[n.bands.length - 1], a = e.nowIdx >= 0 ? n.plot.x + (e.nowIdx + e.nowFraction) * n.slotW : null, d = a !== null && a - 64 < n.plot.x, u = (p) => {
      const S = p.currentTarget.getBoundingClientRect(), T = (p.clientX - S.left) / S.width * n.width, _ = Math.floor((T - n.plot.x) / n.slotW), D = e.slots[_];
      D && _ !== e.idx && m.set({ selectedMs: D.ms });
    }, x = (p) => {
      p.pointerType === "mouse" && p.button !== 0 || (this.dragging = !0, p.currentTarget.setPointerCapture(p.pointerId), u(p));
    }, $ = (p) => this.dragging && u(p), k = () => this.dragging = !1;
    return g`<svg viewBox="0 0 ${n.width} ${n.height}" aria-hidden="true" @pointerdown=${x} @pointermove=${$} @pointerup=${k} @pointercancel=${k}>
      ${n.bands.map(
      (p) => {
        const v = !!l && l.index !== p.index;
        return A`<g>
          <g opacity=${v ? 0.45 : 1}>
            <line x1=${p.x + 1} x2=${p.x + p.w - 1} y1="24" y2="24" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
            <line x1=${p.x + 1} x2=${p.x + 1} y1="20" y2="28" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
          </g>
          ${p.label ? A`<text class="ribbon" x=${p.x + 4} y="16" fill=${v ? "var(--muted-ink)" : "var(--ink)"} font-size="10.5" font-weight="500" letter-spacing="0.08em">${p.label.toUpperCase()}</text>` : f}
        </g>`;
      }
    )}
      ${h ? A`<line x1=${h.x + h.w - 1} x2=${h.x + h.w - 1} y1="20" y2="28" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />` : f}
      ${l ? A`<rect x=${n.plot.x + l.startIdx * n.slotW} y=${n.plot.y - 6} width=${(l.endIdx - l.startIdx) * n.slotW} height=${n.plot.h + 6} fill="var(--soft)" />` : f}
      ${n.yTicks.map(
      (p) => A`<line x1=${n.plot.x} x2=${n.plot.x + n.plot.w} y1=${p.y} y2=${p.y} stroke="var(--rule)" stroke-width="1" vector-effect="non-scaling-stroke" />
          <text x=${n.plot.x - 5} y=${p.y + 3.5} text-anchor="end" fill="var(--muted-ink)" font-size="10">${s(p.label)}</text>`
    )}
      <text x=${n.plot.x - 5} y=${n.plot.y - 9} text-anchor="end" fill="var(--muted-ink)" font-size="10">${t.axisUnit}</text>
      ${n.xTicks.map((p) => A`<text x=${p.x} y=${n.plot.y + n.plot.h + 14} text-anchor=${p.anchor} fill="var(--muted-ink)" font-size="10">${p.label}</text>`)}
      <text x=${n.plot.x + n.plot.w} y=${n.plot.y + n.plot.h + 27} text-anchor="end" fill="var(--muted-ink)" font-size="10">Uhr</text>
      ${c ? A`<rect x=${c.x} y=${n.plot.y - 6} width=${c.w} height=${n.plot.h + 6} fill="var(--hl)" opacity="0.38" />` : f}
      ${n.areaPath ? A`<path d=${n.areaPath} fill="var(--soft)" stroke="none" />` : f}
      ${n.zeroY !== null ? A`<line x1=${n.plot.x} x2=${n.plot.x + n.plot.w} y1=${n.zeroY} y2=${n.zeroY} stroke="var(--ink)" stroke-width="1" opacity="0.5" vector-effect="non-scaling-stroke" />` : f}
      ${n.linePath ? A`<path d=${n.linePath} fill="none" stroke="var(--ink)" stroke-width="1.75" stroke-linejoin="round" vector-effect="non-scaling-stroke" />` : f}
      ${a !== null ? A`<line x1=${a} x2=${a} y1=${n.plot.y - 6} y2=${n.plot.y + n.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />
          <text x=${d ? a + 4 : a - 4} y=${n.plot.y + 2} text-anchor=${d ? "start" : "end"} fill="var(--ink)" font-size="10" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">jetzt ${X(m.now)}</text>` : f}
      ${n.labels.map((p) => A`<text class="anno" x=${p.x} y=${p.y} text-anchor=${p.anchor} fill="var(--ink)" font-size="11" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">${o(p.text)}</text>`)}
      ${c ? A`<circle cx=${c.x + c.w / 2} cy=${c.y} r="3.5" fill="var(--ink)" stroke="var(--halo)" stroke-width="2" vector-effect="non-scaling-stroke" />` : f}
    </svg>`;
  }
  strip(e) {
    const t = this.units, n = e.slots.length, i = e.slot, s = e.fine ? 1 : 2, o = (c) => {
      const l = Number(c.target.value), h = e.slots[l];
      h && m.set({ selectedMs: h.ms });
    };
    return g`<div class="strip">
      <div class="readout small">
        <span class="when"
          >${i ? Fe(e, i) : ""}${e.phase ? g`<span class="muted"> · ${e.phase.name}</span>` : f}
          ${e.idx !== null && e.idx === e.nowIdx ? g`<span class="badge">jetzt</span>` : f}</span
        >
        <b>${i ? t.price(i.priceEurMwh, i.hour) : ""}</b>
      </div>
      <div class="cells-wrap" data-count=${n}>
        <div class="cells" style="gap: ${s}px">
          ${e.slots.map(
      (c, l) => g`<span class="cell ${c.priceEurMwh < 0 ? "hatch" : ""}" style="background-color: var(--lvl-${ue(c.priceEurMwh)}); opacity: ${l === e.idx ? 1 : 0.85}"></span>`
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
        ${e.phases.slice(1).map((c) => g`<span class="phase-tick" style="left: ${c.startIdx / n * 100}%"></span>`)}
        ${e.nowIdx >= 0 ? g`<span class="now-tick" style="left: calc(${(e.nowIdx + 0.5) / n * 100}% - 1px)"></span>` : f}
      </div>
    </div>`;
  }
  static {
    this.styles = [
      F.styles,
      re`
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
  return { stats: Ut(r, t), windows: qe(Ye(e, t)) };
}
function St(r) {
  const e = Math.max(1, Number(r.dataset.count));
  r.style.setProperty("--bar", `${r.clientWidth / e}px`);
}
function hr(r) {
  const e = /* @__PURE__ */ new Date(`${r}T12:00:00Z`);
  return e.setUTCDate(e.getUTCDate() + 1), e.toISOString().slice(0, 10);
}
class dr extends F {
  static {
    this.properties = { ...F.properties, open: { state: !0 } };
  }
  static getConfigForm() {
    return { schema: [Se, me], computeLabel: (e) => ge[e.name] };
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
    const t = this.units, n = pe(void 0, t.map), i = n?.slot ?? null, s = i?.explanation ?? null;
    if (!n || !i) {
      const u = m.fixedDate === null && !m.home.today.hasPrices ? We("today") : "Für diesen Tag liegen keine Preise vor.";
      return this.frame(g`<p class="muted small">${u}</p>`);
    }
    const o = `${m.fixedDate !== null ? `${jt(m.fixedDate)}, ` : ""}${Fe(n, i)}${n.phase ? ` · ${n.phase.name}` : ""}`;
    if (!s)
      return this.frame(g`<p class="kicker">${o}</p>
        <p class="price">${t.price(i.priceEurMwh, i.hour)}</p>
        <p class="muted small">Für diese Stunde gibt es noch keine Erklärung. Sie folgt, sobald Erzeugungsdaten oder Prognosen da sind, meist am Abend.</p>`);
    const c = this.open?.ts === s.ts ? this.open.key : null, l = s.facts, h = l.drivers.filter((u) => u.direction !== "info"), a = h.find((u) => u.key === c) ?? null, d = t.isExchange ? l.priceVsMedianFactor : ur(s, t.map);
    return this.frame(g`
      <p class="kicker">${o}${s.basedOnActuals ? "" : " · Prognose"}</p>
      <div class="top">
        <span class="price">${t.price(i.priceEurMwh, i.hour)}</span>
        ${d != null ? g`<span class="small muted"><b class="ink">${Kn(d)}</b> wie sonst zu dieser Stunde</span>` : f}
      </div>
      <h3>${s.headline}</h3>
      <p class="text">${t.text(qn(s.text))}</p>
      ${h.length ? g`<div class="chips">
            ${h.map(
      (u) => g`<button type="button" class="chip ${u.direction} ${u.key === c ? "open" : ""}" aria-expanded=${u.key === c} @click=${() => this.open = u.key === c ? null : { ts: s.ts, key: u.key }}>
                  ${u.direction === "up" ? "▲" : "▼"} ${u.label}
                </button>`
    )}
          </div>
          ${a ? g`<p class="detail small">${t.text(a.detail)}</p>` : f}` : f}
      <p class="facts note">
        ${l.windMw != null ? g`<span>Wind <b class="ink">${$e(l.windMw)}</b>${l.windMedian30dMw != null ? ` (üblich ${$e(l.windMedian30dMw)})` : ""}</span>` : f}
        ${l.solarMw != null ? g`<span>Sonne <b class="ink">${$e(l.solarMw)}</b></span>` : f}
        ${l.residualMw != null ? g`<span>Restnachfrage <b class="ink">${$e(l.residualMw)}</b>${l.residualMedian30dMw != null ? ` (üblich ${$e(l.residualMedian30dMw)})` : ""}</span>` : f}
        <span>Preissetzer <b class="ink">${s.priceSetterLabel}</b> (Schätzung)</span>
      </p>
    `);
  }
  static {
    this.styles = [
      F.styles,
      re`
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
function ur(r, e) {
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
class mr extends F {
  constructor() {
    super(...arguments), this.dragging = !1, this.cache = null;
  }
  static getConfigForm() {
    return { schema: [me], computeLabel: (e) => ge[e.name] };
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
    const t = pe(), n = t?.day ?? Gt(m.day), s = m.day === "yesterday" || m.fixedDate !== null && m.fixedDate < bn(new Date(m.now)) ? "Woher der Strom kam" : "Woher der Strom kommt";
    if (!n) return this.frame(g`<p class="muted small">Für diesen Tag liegen keine Daten vor.</p>`, s);
    this.cache?.day !== n && (this.cache = { day: n, mq: Un(t?.quarters ?? ze(n)) });
    const o = this.cache.mq, c = It(n.date), l = c.start.getTime(), h = c.end.getTime(), a = Hn(o, l, h);
    if (!a.hasData && !t) return this.frame(g`<p class="muted small">Für diesen Tag liegen keine Daten vor.</p>`, s);
    if (!a.hasData)
      return this.frame(g`<p class="muted small">Die Erzeugung erscheint hier, sobald die Prognosen für Wind, Sonne und Erzeugung veröffentlicht sind, meist am Abend.</p>`, s);
    const d = t?.phase ?? null, u = bt(o, d ? Date.parse(d.from) : l, d ? Date.parse(d.to) : h);
    let x = "";
    if (u.renewableShare !== null) {
      const w = d ? `${d.name}, ${Ot(d)}` : "Ganzer Tag", W = et(u.renewableShare * 100), O = u.renewableShare > 1.005;
      x = u.forecast ? `${w}: laut Prognose ${O ? `mehr Wind und Sonne als Erzeugungsbedarf (${W} %)` : `${W} % aus Wind und Sonne`}` : `${w}: ${O ? `mehr Ökostrom als Verbrauch (${W} %)` : `${W} % erneuerbar`}${u.gasMaxMw !== null && u.gasMaxMw >= 500 ? `, Gas bis ${_t(u.gasMaxMw)}` : ""}`;
    }
    const $ = Math.max(1, t?.slots.length ?? 0), k = a.plot.w / $, p = t?.idx ?? null;
    let v = null;
    if (t?.slot && t.idx !== null) {
      const w = bt(o, t.slot.ms, t.slot.ms + t.stepMs);
      if (w.windMw !== null && w.solarMw !== null && w.residualMw !== null && w.residualMw > 0) {
        const W = a.plot.x + (t.idx + 0.5) / $ * a.plot.w, O = a.yOf(w.windMw + w.solarMw), j = a.yOf(w.windMw + w.solarMw + w.residualMw), V = `Rest ${_t(w.residualMw)}`, y = W + 6 + V.length * 5.6 < a.plot.x + a.plot.w;
        O - j >= 8 && (v = { x: W, y0: j, y1: O, text: V, tx: y ? W + 6 : W - 6, anchor: y ? "start" : "end" });
      }
    }
    const S = m.day === "today" && m.fixedDate === null && m.now >= l && m.now < h ? a.xOf(m.now) : null, T = (w) => {
      const O = w.currentTarget.getBoundingClientRect(), j = (w.clientX - O.left) / O.width * a.width, V = Math.floor((j - a.plot.x) / a.plot.w * $), y = t?.slots[V];
      y && V !== p && m.set({ selectedMs: y.ms });
    }, _ = (w) => {
      w.pointerType === "mouse" && w.button !== 0 || (this.dragging = !0, w.currentTarget.setPointerCapture(w.pointerId), T(w));
    }, D = (w) => this.dragging && T(w), L = () => this.dragging = !1, G = (w, W, O, j = "middle") => A`<text x=${w} y=${W} text-anchor=${j} fill="var(--ink)" font-size="10" font-weight="500" paint-order="stroke" stroke="var(--halo)" stroke-width="3">${O}</text>`;
    return this.frame(
      g`<p class="small line">${x}</p>
        <svg viewBox="0 0 ${a.width} ${a.height}" aria-hidden="true" @pointerdown=${_} @pointermove=${D} @pointerup=${L} @pointercancel=${L}>
          <defs>
            <pattern id="gas-hatch" width="4" height="4" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
              <rect width="4" height="4" fill="var(--src-gas)" />
              <rect width="1" height="4" fill="var(--src-gas-hatch)" />
            </pattern>
          </defs>
          ${d ? A`<rect x=${a.plot.x + d.startIdx * k} y=${a.plot.y} width=${(d.endIdx - d.startIdx) * k} height=${a.plot.h} fill="var(--soft)" />` : f}
          ${a.yTicks.map(
        (w) => A`<line x1=${a.plot.x} x2=${a.plot.x + a.plot.w} y1=${w.y} y2=${w.y} stroke="var(--rule)" stroke-width="1" vector-effect="non-scaling-stroke" />
              <text x=${a.plot.x - 5} y=${w.y + 3.5} text-anchor="end" fill="var(--muted-ink)" font-size="10">${w.label}</text>`
      )}
          <text x=${a.plot.x - 5} y=${a.plot.y - 8} text-anchor="end" fill="var(--muted-ink)" font-size="10">GW</text>
          ${a.layers.map((w) => A`<path d=${w.path} fill=${pr[w.key]} />`)}
          ${a.forecastX !== null ? A`<rect x=${a.forecastX} y=${a.plot.y} width=${a.plot.x + a.plot.w - a.forecastX} height=${a.plot.h} fill="var(--halo)" opacity="0.45" />
              <line x1=${a.forecastX} x2=${a.forecastX} y1=${a.plot.y - 4} y2=${a.plot.y + a.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />
              <text x=${a.forecastX + 4} y=${a.plot.y - 6} fill="var(--muted-ink)" font-size="10">Prognose</text>` : f}
          ${p !== null ? A`<rect x=${a.plot.x + p * k} y=${a.plot.y} width=${k} height=${a.plot.h} fill="var(--hl)" opacity="0.38" />` : f}
          ${a.loadPath ? A`<path d=${a.loadPath} fill="none" stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />` : f}
          ${a.forecastLoadPath ? A`<path d=${a.forecastLoadPath} fill="none" stroke="var(--ink)" stroke-width="1.25" stroke-dasharray="3 2" vector-effect="non-scaling-stroke" />` : f}
          ${S !== null ? A`<line x1=${S} x2=${S} y1=${a.plot.y} y2=${a.plot.y + a.plot.h} stroke="var(--ink)" stroke-width="1" stroke-dasharray="3 3" vector-effect="non-scaling-stroke" />` : f}
          ${a.labels.map((w) => G(w.x, w.y, w.text))} ${a.loadLabel ? G(a.loadLabel.x, a.loadLabel.y, a.loadLabel.text, "start") : f}
          ${v ? A`<line x1=${v.x} x2=${v.x} y1=${v.y0} y2=${v.y1} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              <line x1=${v.x - 3} x2=${v.x + 3} y1=${v.y0} y2=${v.y0} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              <line x1=${v.x - 3} x2=${v.x + 3} y1=${v.y1} y2=${v.y1} stroke="var(--ink)" stroke-width="1.25" vector-effect="non-scaling-stroke" />
              ${G(v.tx, (v.y0 + v.y1) / 2 + 3.5, v.text, v.anchor)}` : f}
          ${a.xTicks.map((w) => A`<text x=${w.x} y=${a.plot.y + a.plot.h + 14} text-anchor=${w.anchor} fill="var(--muted-ink)" font-size="10">${w.label}</text>`)}
        </svg>
        <p class="note">
          ${a.allForecast ? "Noch keine Messwerte: Wind, Sonne und die übrige Erzeugung sind Prognosen, die gestrichelte Linie die erwartete Gesamterzeugung." : "Erzeugung in GW: unten Wind und Sonne, darüber Bio, Kohle und Gas (schraffiert). Die Linie ist der Verbrauch; der Abstand zwischen Sonne und Linie ist die Restnachfrage."}
          ${a.forecastX !== null ? " Heller: Prognose." : ""}
        </p>`,
      s
    );
  }
  static {
    this.styles = [
      F.styles,
      re`
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
const Ae = 9e5, De = 36e5;
class gr extends F {
  constructor() {
    super(...arguments), this.cache = null;
  }
  static getConfigForm() {
    return { schema: [Se, { name: "show_strip", selector: { boolean: {} } }, me], computeLabel: (e) => ge[e.name] };
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
    (this.cache?.today !== t.today || this.cache?.tomorrow !== t.tomorrow) && (this.cache = { today: t.today, tomorrow: t.tomorrow, quarters: [...ze(t.today), ...t.tomorrow ? ze(t.tomorrow) : []] });
    const n = this.cache.quarters, i = m.now, s = n.find(($) => $.price !== null && i >= Date.parse($.ts) && i < Date.parse($.ts) + Ae), o = this.units;
    if (!s || s.price === null) {
      const $ = m.fixedDate === null && !t.today.hasPrices ? We("today") : "Noch keine Preise für jetzt.";
      return this.frame(g`<p class="muted small">${$}</p>`, "Strompreis");
    }
    const c = Math.floor(i / Ae) * Ae, l = n.filter(($) => Date.parse($.ts) >= c), [h] = qe(o.isExchange ? l : Ye(l, o.map), [3]), a = ue(s.price), d = t.tomorrow ? Date.parse(t.tomorrow.start) : 1 / 0, u = [], x = Date.parse(t.today.start) + t.today.slots * Ae;
    for (let $ = Math.floor(i / De) * De; $ < x; $ += De) {
      const k = n.filter((p) => p.price !== null && Date.parse(p.ts) >= $ && Date.parse(p.ts) < $ + De);
      k.length && u.push({ ms: $, price: k.reduce((p, v) => p + v.price, 0) / k.length });
    }
    return this.frame(g`
      <div class="top">
        <span class="kicker">${Nt(s.ts)}</span>
        <span class="level" style="--c: var(--lvl-${a})"><span class="swatch ${a === "negativ" ? "hatch" : ""}"></span>${ir[a]}</span>
      </div>
      <p class="price">${o.price(s.price, s.ts)}</p>
      ${this.config.show_strip !== !1 && u.length > 1 ? g`<div class="strip" aria-hidden="true">
              ${u.map(($, k) => g`<span class="cell ${$.price < 0 ? "hatch" : ""} ${k === 0 ? "now" : ""}" style="background: var(--lvl-${ue($.price)})"></span>`)}
            </div>
            <div class="axis note"><span>jetzt</span><span>24 Uhr</span></div>` : f}
      ${h ? g`<p class="small">
            Günstigste 3 Stunden ab jetzt: <b>${Date.parse(h.from) >= d ? "morgen " : ""}${X(h.from)}-${X(h.to)} Uhr</b>, im Schnitt
            ${o.shownPrice(h.avgEurMwh)}
          </p>` : f}
    `);
  }
  static {
    this.styles = [
      F.styles,
      re`
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
class $r extends F {
  static getConfigForm() {
    return { schema: [Se, me], computeLabel: (e) => ge[e.name] };
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
    const t = pe(void 0, this.units.map);
    if (!t || !t.phases.length) {
      const s = m.fixedDate === null && !m.home.today.hasPrices ? We("today") : "Noch keine Phasen für diesen Tag.";
      return this.frame(g`<p class="muted small">${s}</p>`, "Der Tag in Phasen");
    }
    const n = this.units, i = t.phases.some((s) => s.text === null);
    return this.frame(
      g`${i ? g`<p class="note">Die Erklärungen folgen, sobald Erzeugungsdaten oder Prognosen da sind.</p>` : f}
        <ol>
          ${t.phases.map((s) => {
        const o = t.phase?.index === s.index;
        let c, l, h = Date.parse(s.keyTs);
        const a = Date.parse(s.from), d = Date.parse(s.to), u = n.isExchange ? null : Ut(t.hourly.filter(($) => $.ms >= a && $.ms < d), n.map);
        if (!u)
          c = s.minEurMwh === s.maxEurMwh ? n.price(s.minEurMwh, s.keyHour) : `${n.number(s.minEurMwh, s.fromHour)} bis ${n.number(s.maxEurMwh, s.keyHour)} ${n.suffix}`, l = s.level === "high" ? `Am teuersten um ${s.keyHour} Uhr: ${n.price(s.maxEurMwh, s.keyHour)}` : s.level === "low" ? `Am günstigsten um ${s.keyHour} Uhr: ${n.price(s.minEurMwh, s.keyHour)}` : `Im Schnitt ${n.price(s.avgEurMwh, s.fromHour)}`;
        else {
          c = u.min === u.max ? n.shownPrice(u.min) : `${n.shownNumber(u.min)} bis ${n.shownNumber(u.max)} ${n.suffix}`, l = s.level === "high" ? `Am teuersten um ${u.maxHour} Uhr: ${n.shownPrice(u.max)}` : s.level === "low" ? `Am günstigsten um ${u.minHour} Uhr: ${n.shownPrice(u.min)}` : `Im Schnitt ${n.shownPrice(u.avg)}`;
          const $ = s.level === "high" ? u.maxHour : s.level === "low" ? u.minHour : null, k = $ !== null ? t.hourly.find((p) => p.ms >= a && p.ms < d && p.hour === $) : void 0;
          k && (h = k.ms);
        }
        const x = s.text ? u ? n.text(s.text, () => u.avg) : n.text(s.text) : null;
        return g`<li class=${o ? "active" : ""}>
              <button type="button" class="row link" aria-pressed=${o} @click=${() => m.set({ selectedMs: h })}>
                <span class="bar" style="background: var(--lvl-${ue(s.avgEurMwh)})"></span>
                <span class="name">
                  <span class="title">${s.name}${t.nowPhase?.index === s.index ? g` <span class="badge">jetzt</span>` : f}</span>
                  <span class="note">${Ot(s)}${s.forecast ? " · Prognose" : ""}</span>
                </span>
                <span class="range small">${c}</span>
              </button>
              <div class="body">
                ${x ? g`<p>${x}</p>` : f}
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
      F.styles,
      re`
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
class xr extends F {
  static getConfigForm() {
    return { schema: [Se, me], computeLabel: (e) => ge[e.name] };
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
      g`<div class="grid axis">
          <span></span>
          <div class="hours note">${[0, 6, 12, 18].map((o) => g`<span style="left: ${o / 24 * 100}%">${o}</span>`)}<span class="end">24 Uhr</span></div>
          <span class="note right">beste 3 h</span>
        </div>
        <ol>
          ${t.week.map((o) => {
        const c = i(o.date), l = c === "today" ? "Heute" : c === "tomorrow" ? "Morgen" : jn(o.date), h = Math.max(1, o.hourly.length), a = It(o.date).start.getTime(), d = yr(o, c, n), u = d ? { left: (Date.parse(d.from) - a) / wr / h * 100, width: d.hours / h * 100 } : null, x = o.hourly.some((k) => k !== null), $ = g`<span class="day ${o.date === s ? "current" : ""}">${l}</span>
              <span class="cells-wrap">
                <span class="cells">
                  ${o.hourly.map((k) => g`<span class="cell ${k !== null && k < 0 ? "hatch" : ""}" style="background: ${k === null ? "var(--soft)" : `var(--lvl-${ue(k)})`}"></span>`)}
                </span>
                ${u ? g`<span class="frame" style="left: ${u.left}%; width: ${u.width}%"></span>` : f}
              </span>
              <span class="small right">
                ${d ? g`${X(d.from)}-${X(d.to)} · ${n.shownNumber(d.avgEurMwh)} ${n.unit === "eur_mwh" ? "€/MWh" : "ct"}` : x ? "" : g`<span class="muted">noch keine Preise</span>`}
              </span>`;
        return g`<li class=${o.date === s ? "current" : ""}>
              ${c ? g`<button type="button" class="grid link" title="Diesen Tag in den anderen Karten zeigen" @click=${() => m.set({ day: c })}>${$}</button>` : g`<div class="grid">${$}</div>`}
            </li>`;
      })}
        </ol>
        <p class="note">Farben wie im Preisstreifen; der Rahmen markiert die günstigsten drei Stunden des Tages.</p>`,
      "Diese Woche"
    );
  }
  static {
    this.styles = [
      F.styles,
      re`
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
  const n = e ? pe(e, t.map) : null;
  if (n) return qe(Ye(n.quarters, t.map), [3])[0] ?? null;
  const i = r.window;
  if (!i) return null;
  let s = 0, o = 0;
  for (let c = Date.parse(i.from); c < Date.parse(i.to); c += br, o++) s += t.map(i.avgEurMwh, ie(new Date(c)));
  return { ...i, avgEurMwh: o ? s / o : t.shown(i.avgEurMwh) };
}
const Zt = [
  { type: "strompreis-now-card", element: gr, name: "Strompreis jetzt", description: "Preis der laufenden Viertelstunde, Preisstufe und die günstigsten 3 Stunden ab jetzt." },
  { type: "strompreis-day-card", element: cr, name: "Strompreis Tag", description: "Tagesbild, Preisverlauf mit Phasen und Preisstreifen für gestern, heute und morgen." },
  { type: "strompreis-phases-card", element: $r, name: "Strompreis Phasen", description: "Der Tag in Phasen, mit Erklärung zu jeder Phase." },
  { type: "strompreis-mix-card", element: mr, name: "Strompreis Woher der Strom kommt", description: "Erzeugung aus Wind, Sonne, Kohle und Gas, der Verbrauch und die Restnachfrage." },
  { type: "strompreis-hour-card", element: dr, name: "Strompreis Stunde im Detail", description: "Warum der Preis in der gewählten Stunde so ist." },
  { type: "strompreis-week-card", element: xr, name: "Strompreis Woche", description: "Die letzten sieben Tage, heute und morgen mit den günstigsten 3 Stunden." }
];
function Vt() {
  for (const r of Zt)
    if (!window.customElements.get(r.type))
      try {
        window.customElements.define(r.type, r.element);
      } catch (e) {
        console.warn(`strompreis-verstehen: ${r.type} could not be registered`, e);
      }
}
window.customCards ??= [];
for (const r of Zt)
  window.customCards.some((e) => e.type === r.type) || window.customCards.push({ type: r.type, name: r.name, description: r.description, preview: !0, documentationURL: "https://github.com/ehrma/ha-strompreis-verstehen" });
Vt();
let Mt = window.customElements;
const vr = Date.now(), kr = setInterval(() => {
  window.customElements !== Mt && (Mt = window.customElements, Vt()), Date.now() - vr > 6e4 && clearInterval(kr);
}, 50);
console.info("%c STROMPREIS-VERSTEHEN %c cards loaded ", "background:#f5c518;color:#15181c;font-weight:600", "");
