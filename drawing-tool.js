!(function (t, e) {
  "object" == typeof exports && "object" == typeof module
    ? (module.exports = e(require("jquery")))
    : "function" == typeof define && define.amd
    ? define(["jquery"], e)
    : "object" == typeof exports
    ? (exports.DrawingTool = e(require("jquery")))
    : (t.DrawingTool = e(t.jQuery));
})(window, function (t) {
  return (function (t) {
    var e = {};
    function i(n) {
      if (e[n]) return e[n].exports;
      var r = (e[n] = { i: n, l: !1, exports: {} });
      return t[n].call(r.exports, r, r.exports, i), (r.l = !0), r.exports;
    }
    return (
      (i.m = t),
      (i.c = e),
      (i.d = function (t, e, n) {
        i.o(t, e) || Object.defineProperty(t, e, { enumerable: !0, get: n });
      }),
      (i.r = function (t) {
        "undefined" != typeof Symbol &&
          Symbol.toStringTag &&
          Object.defineProperty(t, Symbol.toStringTag, { value: "Module" }),
          Object.defineProperty(t, "__esModule", { value: !0 });
      }),
      (i.t = function (t, e) {
        if ((1 & e && (t = i(t)), 8 & e)) return t;
        if (4 & e && "object" == typeof t && t && t.__esModule) return t;
        var n = Object.create(null);
        if (
          (i.r(n),
          Object.defineProperty(n, "default", { enumerable: !0, value: t }),
          2 & e && "string" != typeof t)
        )
          for (var r in t)
            i.d(
              n,
              r,
              function (e) {
                return t[e];
              }.bind(null, r)
            );
        return n;
      }),
      (i.n = function (t) {
        var e =
          t && t.__esModule
            ? function () {
                return t.default;
              }
            : function () {
                return t;
              };
        return i.d(e, "a", e), e;
      }),
      (i.o = function (t, e) {
        return Object.prototype.hasOwnProperty.call(t, e);
      }),
      (i.p = ""),
      i((i.s = 13))
    );
  })([
    function (t, e) {
      t.exports = function (t, e) {
        (t.prototype = Object.create(e.prototype)),
          (t.prototype.constructor = t),
          (t.super = e.prototype);
      };
    },
    function (e, i) {
      e.exports = t;
    },
    function (t, e, i) {
      (function (t) {
        /*! Fabric.js Copyright 2008-2015, Printio (Juriy Zaytsev, Maxim Chernyak) */
        var n,
          r,
          s,
          o,
          a,
          h,
          c,
          l,
          u,
          g,
          f,
          d,
          p,
          C,
          A,
          v,
          m,
          I,
          w,
          y,
          M,
          b = b || { version: "3.6.3" };
        if (
          ((e.fabric = b),
          "undefined" != typeof document && "undefined" != typeof window)
        )
          document instanceof
          ("undefined" != typeof HTMLDocument ? HTMLDocument : Document)
            ? (b.document = document)
            : (b.document = document.implementation.createHTMLDocument("")),
            (b.window = window);
        else {
          var x = new (i(20).JSDOM)(
            decodeURIComponent(
              "%3C!DOCTYPE%20html%3E%3Chtml%3E%3Chead%3E%3C%2Fhead%3E%3Cbody%3E%3C%2Fbody%3E%3C%2Fhtml%3E"
            ),
            {
              features: { FetchExternalResources: ["img"] },
              resources: "usable",
            }
          ).window;
          (b.document = x.document),
            (b.jsdomImplForWrapper = i(21).implForWrapper),
            (b.nodeCanvas = i(22).Canvas),
            (b.window = x),
            (DOMParser = b.window.DOMParser);
        }
        function D(t, e) {
          var i = t.canvas,
            n = e.targetCanvas,
            r = n.getContext("2d");
          r.translate(0, n.height), r.scale(1, -1);
          var s = i.height - n.height;
          r.drawImage(i, 0, s, n.width, n.height, 0, 0, n.width, n.height);
        }
        function _(t, e) {
          var i = e.targetCanvas.getContext("2d"),
            n = e.destinationWidth,
            r = e.destinationHeight,
            s = n * r * 4,
            o = new Uint8Array(this.imageBuffer, 0, s),
            a = new Uint8ClampedArray(this.imageBuffer, 0, s);
          t.readPixels(0, 0, n, r, t.RGBA, t.UNSIGNED_BYTE, o);
          var h = new ImageData(a, n, r);
          i.putImageData(h, 0, 0);
        }
        (b.isTouchSupported =
          "ontouchstart" in b.window ||
          "ontouchstart" in b.document ||
          (b.window &&
            b.window.navigator &&
            b.window.navigator.maxTouchPoints > 0)),
          (b.isLikelyNode = void 0 !== t && "undefined" == typeof window),
          (b.SHARED_ATTRIBUTES = [
            "display",
            "transform",
            "fill",
            "fill-opacity",
            "fill-rule",
            "opacity",
            "stroke",
            "stroke-dasharray",
            "stroke-linecap",
            "stroke-dashoffset",
            "stroke-linejoin",
            "stroke-miterlimit",
            "stroke-opacity",
            "stroke-width",
            "id",
            "paint-order",
            "vector-effect",
            "instantiated_by_use",
            "clip-path",
          ]),
          (b.DPI = 96),
          (b.reNum = "(?:[-+]?(?:\\d+|\\d*\\.\\d+)(?:[eE][-+]?\\d+)?)"),
          (b.rePathCommand =
            /([-+]?((\d+\.\d+)|((\d+)|(\.\d+)))(?:[eE][-+]?\d+)?)/gi),
          (b.reNonWord = /[ \n\.,;!\?\-]/),
          (b.fontPaths = {}),
          (b.iMatrix = [1, 0, 0, 1, 0, 0]),
          (b.svgNS = "http://www.w3.org/2000/svg"),
          (b.perfLimitSizeTotal = 2097152),
          (b.maxCacheSideLimit = 4096),
          (b.minCacheSideLimit = 256),
          (b.charWidthsCache = {}),
          (b.textureSize = 2048),
          (b.disableStyleCopyPaste = !1),
          (b.enableGLFiltering = !0),
          (b.devicePixelRatio =
            b.window.devicePixelRatio ||
            b.window.webkitDevicePixelRatio ||
            b.window.mozDevicePixelRatio ||
            1),
          (b.browserShadowBlurConstant = 1),
          (b.arcToSegmentsCache = {}),
          (b.boundsOfCurveCache = {}),
          (b.cachesBoundsOfCurve = !0),
          (b.forceGLPutImageData = !1),
          (b.initFilterBackend = function () {
            return b.enableGLFiltering &&
              b.isWebglSupported &&
              b.isWebglSupported(b.textureSize)
              ? (console.log("max texture size: " + b.maxTextureSize),
                new b.WebglFilterBackend({ tileSize: b.textureSize }))
              : b.Canvas2dFilterBackend
              ? new b.Canvas2dFilterBackend()
              : void 0;
          }),
          "undefined" != typeof document &&
            "undefined" != typeof window &&
            (window.fabric = b),
          (function () {
            function t(t, e) {
              if (this.__eventListeners[t]) {
                var i = this.__eventListeners[t];
                e ? (i[i.indexOf(e)] = !1) : b.util.array.fill(i, !1);
              }
            }
            function e(t, e) {
              if (
                (this.__eventListeners || (this.__eventListeners = {}),
                1 === arguments.length)
              )
                for (var i in t) this.on(i, t[i]);
              else
                this.__eventListeners[t] || (this.__eventListeners[t] = []),
                  this.__eventListeners[t].push(e);
              return this;
            }
            function i(e, i) {
              if (!this.__eventListeners) return this;
              if (0 === arguments.length)
                for (e in this.__eventListeners) t.call(this, e);
              else if (
                1 === arguments.length &&
                "object" == typeof arguments[0]
              )
                for (var n in e) t.call(this, n, e[n]);
              else t.call(this, e, i);
              return this;
            }
            function n(t, e) {
              if (!this.__eventListeners) return this;
              var i = this.__eventListeners[t];
              if (!i) return this;
              for (var n = 0, r = i.length; n < r; n++)
                i[n] && i[n].call(this, e || {});
              return (
                (this.__eventListeners[t] = i.filter(function (t) {
                  return !1 !== t;
                })),
                this
              );
            }
            b.Observable = {
              observe: e,
              stopObserving: i,
              fire: n,
              on: e,
              off: i,
              trigger: n,
            };
          })(),
          (b.Collection = {
            _objects: [],
            add: function () {
              if (
                (this._objects.push.apply(this._objects, arguments),
                this._onObjectAdded)
              )
                for (var t = 0, e = arguments.length; t < e; t++)
                  this._onObjectAdded(arguments[t]);
              return this.renderOnAddRemove && this.requestRenderAll(), this;
            },
            insertAt: function (t, e, i) {
              var n = this._objects;
              return (
                i ? (n[e] = t) : n.splice(e, 0, t),
                this._onObjectAdded && this._onObjectAdded(t),
                this.renderOnAddRemove && this.requestRenderAll(),
                this
              );
            },
            remove: function () {
              for (
                var t, e = this._objects, i = !1, n = 0, r = arguments.length;
                n < r;
                n++
              )
                -1 !== (t = e.indexOf(arguments[n])) &&
                  ((i = !0),
                  e.splice(t, 1),
                  this._onObjectRemoved && this._onObjectRemoved(arguments[n]));
              return (
                this.renderOnAddRemove && i && this.requestRenderAll(), this
              );
            },
            forEachObject: function (t, e) {
              for (var i = this.getObjects(), n = 0, r = i.length; n < r; n++)
                t.call(e, i[n], n, i);
              return this;
            },
            getObjects: function (t) {
              return void 0 === t
                ? this._objects.concat()
                : this._objects.filter(function (e) {
                    return e.type === t;
                  });
            },
            item: function (t) {
              return this._objects[t];
            },
            isEmpty: function () {
              return 0 === this._objects.length;
            },
            size: function () {
              return this._objects.length;
            },
            contains: function (t) {
              return this._objects.indexOf(t) > -1;
            },
            complexity: function () {
              return this._objects.reduce(function (t, e) {
                return (t += e.complexity ? e.complexity() : 0);
              }, 0);
            },
          }),
          (b.CommonMethods = {
            _setOptions: function (t) {
              for (var e in t) this.set(e, t[e]);
            },
            _initGradient: function (t, e) {
              !t ||
                !t.colorStops ||
                t instanceof b.Gradient ||
                this.set(e, new b.Gradient(t));
            },
            _initPattern: function (t, e, i) {
              !t || !t.source || t instanceof b.Pattern
                ? i && i()
                : this.set(e, new b.Pattern(t, i));
            },
            _initClipping: function (t) {
              if (t.clipTo && "string" == typeof t.clipTo) {
                var e = b.util.getFunctionBody(t.clipTo);
                void 0 !== e && (this.clipTo = new Function("ctx", e));
              }
            },
            _setObject: function (t) {
              for (var e in t) this._set(e, t[e]);
            },
            set: function (t, e) {
              return (
                "object" == typeof t
                  ? this._setObject(t)
                  : "function" == typeof e && "clipTo" !== t
                  ? this._set(t, e(this.get(t)))
                  : this._set(t, e),
                this
              );
            },
            _set: function (t, e) {
              this[t] = e;
            },
            toggle: function (t) {
              var e = this.get(t);
              return "boolean" == typeof e && this.set(t, !e), this;
            },
            get: function (t) {
              return this[t];
            },
          }),
          (n = e),
          (r = Math.sqrt),
          (s = Math.atan2),
          (o = Math.pow),
          (a = Math.PI / 180),
          (h = Math.PI / 2),
          (b.util = {
            cos: function (t) {
              if (0 === t) return 1;
              switch ((t < 0 && (t = -t), t / h)) {
                case 1:
                case 3:
                  return 0;
                case 2:
                  return -1;
              }
              return Math.cos(t);
            },
            sin: function (t) {
              if (0 === t) return 0;
              var e = 1;
              switch ((t < 0 && (e = -1), t / h)) {
                case 1:
                  return e;
                case 2:
                  return 0;
                case 3:
                  return -e;
              }
              return Math.sin(t);
            },
            removeFromArray: function (t, e) {
              var i = t.indexOf(e);
              return -1 !== i && t.splice(i, 1), t;
            },
            getRandomInt: function (t, e) {
              return Math.floor(Math.random() * (e - t + 1)) + t;
            },
            degreesToRadians: function (t) {
              return t * a;
            },
            radiansToDegrees: function (t) {
              return t / a;
            },
            rotatePoint: function (t, e, i) {
              t.subtractEquals(e);
              var n = b.util.rotateVector(t, i);
              return new b.Point(n.x, n.y).addEquals(e);
            },
            rotateVector: function (t, e) {
              var i = b.util.sin(e),
                n = b.util.cos(e);
              return { x: t.x * n - t.y * i, y: t.x * i + t.y * n };
            },
            transformPoint: function (t, e, i) {
              return i
                ? new b.Point(e[0] * t.x + e[2] * t.y, e[1] * t.x + e[3] * t.y)
                : new b.Point(
                    e[0] * t.x + e[2] * t.y + e[4],
                    e[1] * t.x + e[3] * t.y + e[5]
                  );
            },
            makeBoundingBoxFromPoints: function (t, e) {
              if (e)
                for (var i = 0; i < t.length; i++)
                  t[i] = b.util.transformPoint(t[i], e);
              var n = [t[0].x, t[1].x, t[2].x, t[3].x],
                r = b.util.array.min(n),
                s = b.util.array.max(n) - r,
                o = [t[0].y, t[1].y, t[2].y, t[3].y],
                a = b.util.array.min(o);
              return {
                left: r,
                top: a,
                width: s,
                height: b.util.array.max(o) - a,
              };
            },
            invertTransform: function (t) {
              var e = 1 / (t[0] * t[3] - t[1] * t[2]),
                i = [e * t[3], -e * t[1], -e * t[2], e * t[0]],
                n = b.util.transformPoint({ x: t[4], y: t[5] }, i, !0);
              return (i[4] = -n.x), (i[5] = -n.y), i;
            },
            toFixed: function (t, e) {
              return parseFloat(Number(t).toFixed(e));
            },
            parseUnit: function (t, e) {
              var i = /\D{0,2}$/.exec(t),
                n = parseFloat(t);
              switch ((e || (e = b.Text.DEFAULT_SVG_FONT_SIZE), i[0])) {
                case "mm":
                  return (n * b.DPI) / 25.4;
                case "cm":
                  return (n * b.DPI) / 2.54;
                case "in":
                  return n * b.DPI;
                case "pt":
                  return (n * b.DPI) / 72;
                case "pc":
                  return ((n * b.DPI) / 72) * 12;
                case "em":
                  return n * e;
                default:
                  return n;
              }
            },
            falseFunction: function () {
              return !1;
            },
            getKlass: function (t, e) {
              return (
                (t = b.util.string.camelize(
                  t.charAt(0).toUpperCase() + t.slice(1)
                )),
                b.util.resolveNamespace(e)[t]
              );
            },
            getSvgAttributes: function (t) {
              var e = ["instantiated_by_use", "style", "id", "class"];
              switch (t) {
                case "linearGradient":
                  e = e.concat([
                    "x1",
                    "y1",
                    "x2",
                    "y2",
                    "gradientUnits",
                    "gradientTransform",
                  ]);
                  break;
                case "radialGradient":
                  e = e.concat([
                    "gradientUnits",
                    "gradientTransform",
                    "cx",
                    "cy",
                    "r",
                    "fx",
                    "fy",
                    "fr",
                  ]);
                  break;
                case "stop":
                  e = e.concat(["offset", "stop-color", "stop-opacity"]);
              }
              return e;
            },
            resolveNamespace: function (t) {
              if (!t) return b;
              var e,
                i = t.split("."),
                r = i.length,
                s = n || b.window;
              for (e = 0; e < r; ++e) s = s[i[e]];
              return s;
            },
            loadImage: function (t, e, i, n) {
              if (t) {
                var r = b.util.createImage(),
                  s = function () {
                    e && e.call(i, r), (r = r.onload = r.onerror = null);
                  };
                (r.onload = s),
                  (r.onerror = function () {
                    b.log("Error loading " + r.src),
                      e && e.call(i, null, !0),
                      (r = r.onload = r.onerror = null);
                  }),
                  0 !== t.indexOf("data") && n && (r.crossOrigin = n),
                  "data:image/svg" === t.substring(0, 14) &&
                    ((r.onload = null), b.util.loadImageInDom(r, s)),
                  (r.src = t);
              } else e && e.call(i, t);
            },
            loadImageInDom: function (t, e) {
              var i = b.document.createElement("div");
              (i.style.width = i.style.height = "1px"),
                (i.style.left = i.style.top = "-100%"),
                (i.style.position = "absolute"),
                i.appendChild(t),
                b.document.querySelector("body").appendChild(i),
                (t.onload = function () {
                  e(), i.parentNode.removeChild(i), (i = null);
                });
            },
            enlivenObjects: function (t, e, i, n) {
              var r = [],
                s = 0,
                o = (t = t || []).length;
              function a() {
                ++s === o &&
                  e &&
                  e(
                    r.filter(function (t) {
                      return t;
                    })
                  );
              }
              o
                ? t.forEach(function (t, e) {
                    t && t.type
                      ? b.util
                          .getKlass(t.type, i)
                          .fromObject(t, function (i, s) {
                            s || (r[e] = i), n && n(t, i, s), a();
                          })
                      : a();
                  })
                : e && e(r);
            },
            enlivenPatterns: function (t, e) {
              function i() {
                ++r === s && e && e(n);
              }
              var n = [],
                r = 0,
                s = (t = t || []).length;
              s
                ? t.forEach(function (t, e) {
                    t && t.source
                      ? new b.Pattern(t, function (t) {
                          (n[e] = t), i();
                        })
                      : ((n[e] = t), i());
                  })
                : e && e(n);
            },
            groupSVGElements: function (t, e, i) {
              var n;
              return t && 1 === t.length
                ? t[0]
                : (e &&
                    (e.width && e.height
                      ? (e.centerPoint = { x: e.width / 2, y: e.height / 2 })
                      : (delete e.width, delete e.height)),
                  (n = new b.Group(t, e)),
                  void 0 !== i && (n.sourcePath = i),
                  n);
            },
            populateWithProperties: function (t, e, i) {
              if (i && "[object Array]" === Object.prototype.toString.call(i))
                for (var n = 0, r = i.length; n < r; n++)
                  i[n] in t && (e[i[n]] = t[i[n]]);
            },
            drawDashedLine: function (t, e, i, n, o, a) {
              var h = n - e,
                c = o - i,
                l = r(h * h + c * c),
                u = s(c, h),
                g = a.length,
                f = 0,
                d = !0;
              for (
                t.save(), t.translate(e, i), t.moveTo(0, 0), t.rotate(u), e = 0;
                l > e;

              )
                (e += a[f++ % g]) > l && (e = l),
                  t[d ? "lineTo" : "moveTo"](e, 0),
                  (d = !d);
              t.restore();
            },
            createCanvasElement: function () {
              return b.document.createElement("canvas");
            },
            copyCanvasElement: function (t) {
              var e = b.util.createCanvasElement();
              return (
                (e.width = t.width),
                (e.height = t.height),
                e.getContext("2d").drawImage(t, 0, 0),
                e
              );
            },
            toDataURL: function (t, e, i) {
              return t.toDataURL("image/" + e, i);
            },
            createImage: function () {
              return b.document.createElement("img");
            },
            clipContext: function (t, e) {
              e.save(), e.beginPath(), t.clipTo(e), e.clip();
            },
            multiplyTransformMatrices: function (t, e, i) {
              return [
                t[0] * e[0] + t[2] * e[1],
                t[1] * e[0] + t[3] * e[1],
                t[0] * e[2] + t[2] * e[3],
                t[1] * e[2] + t[3] * e[3],
                i ? 0 : t[0] * e[4] + t[2] * e[5] + t[4],
                i ? 0 : t[1] * e[4] + t[3] * e[5] + t[5],
              ];
            },
            qrDecompose: function (t) {
              var e = s(t[1], t[0]),
                i = o(t[0], 2) + o(t[1], 2),
                n = r(i),
                h = (t[0] * t[3] - t[2] * t[1]) / n,
                c = s(t[0] * t[2] + t[1] * t[3], i);
              return {
                angle: e / a,
                scaleX: n,
                scaleY: h,
                skewX: c / a,
                skewY: 0,
                translateX: t[4],
                translateY: t[5],
              };
            },
            calcRotateMatrix: function (t) {
              if (!t.angle) return b.iMatrix.concat();
              var e = b.util.degreesToRadians(t.angle),
                i = b.util.cos(e),
                n = b.util.sin(e);
              return [i, n, -n, i, 0, 0];
            },
            calcDimensionsMatrix: function (t) {
              var e = void 0 === t.scaleX ? 1 : t.scaleX,
                i = void 0 === t.scaleY ? 1 : t.scaleY,
                n = [t.flipX ? -e : e, 0, 0, t.flipY ? -i : i, 0, 0],
                r = b.util.multiplyTransformMatrices,
                s = b.util.degreesToRadians;
              return (
                t.skewX && (n = r(n, [1, 0, Math.tan(s(t.skewX)), 1], !0)),
                t.skewY && (n = r(n, [1, Math.tan(s(t.skewY)), 0, 1], !0)),
                n
              );
            },
            composeMatrix: function (t) {
              var e = [1, 0, 0, 1, t.translateX || 0, t.translateY || 0],
                i = b.util.multiplyTransformMatrices;
              return (
                t.angle && (e = i(e, b.util.calcRotateMatrix(t))),
                (t.scaleX ||
                  t.scaleY ||
                  t.skewX ||
                  t.skewY ||
                  t.flipX ||
                  t.flipY) &&
                  (e = i(e, b.util.calcDimensionsMatrix(t))),
                e
              );
            },
            customTransformMatrix: function (t, e, i) {
              return b.util.composeMatrix({ scaleX: t, scaleY: e, skewX: i });
            },
            resetObjectTransform: function (t) {
              (t.scaleX = 1),
                (t.scaleY = 1),
                (t.skewX = 0),
                (t.skewY = 0),
                (t.flipX = !1),
                (t.flipY = !1),
                t.rotate(0);
            },
            saveObjectTransform: function (t) {
              return {
                scaleX: t.scaleX,
                scaleY: t.scaleY,
                skewX: t.skewX,
                skewY: t.skewY,
                angle: t.angle,
                left: t.left,
                flipX: t.flipX,
                flipY: t.flipY,
                top: t.top,
              };
            },
            getFunctionBody: function (t) {
              return (String(t).match(/function[^{]*\{([\s\S]*)\}/) || {})[1];
            },
            isTransparent: function (t, e, i, n) {
              n > 0 && (e > n ? (e -= n) : (e = 0), i > n ? (i -= n) : (i = 0));
              var r,
                s = !0,
                o = t.getImageData(e, i, 2 * n || 1, 2 * n || 1),
                a = o.data.length;
              for (r = 3; r < a && !1 != (s = o.data[r] <= 0); r += 4);
              return (o = null), s;
            },
            parsePreserveAspectRatioAttribute: function (t) {
              var e,
                i = "meet",
                n = t.split(" ");
              return (
                n &&
                  n.length &&
                  ("meet" !== (i = n.pop()) && "slice" !== i
                    ? ((e = i), (i = "meet"))
                    : n.length && (e = n.pop())),
                {
                  meetOrSlice: i,
                  alignX: "none" !== e ? e.slice(1, 4) : "none",
                  alignY: "none" !== e ? e.slice(5, 8) : "none",
                }
              );
            },
            clearFabricFontCache: function (t) {
              (t = (t || "").toLowerCase())
                ? b.charWidthsCache[t] && delete b.charWidthsCache[t]
                : (b.charWidthsCache = {});
            },
            limitDimsByArea: function (t, e) {
              var i = Math.sqrt(e * t),
                n = Math.floor(e / i);
              return { x: Math.floor(i), y: n };
            },
            capValue: function (t, e, i) {
              return Math.max(t, Math.min(e, i));
            },
            findScaleToFit: function (t, e) {
              return Math.min(e.width / t.width, e.height / t.height);
            },
            findScaleToCover: function (t, e) {
              return Math.max(e.width / t.width, e.height / t.height);
            },
            matrixToSVG: function (t) {
              return (
                "matrix(" +
                t
                  .map(function (t) {
                    return b.util.toFixed(t, b.Object.NUM_FRACTION_DIGITS);
                  })
                  .join(" ") +
                ")"
              );
            },
          }),
          (function () {
            var t = Array.prototype.join;
            function e(e, r, s, o, a, h, c) {
              var l = t.call(arguments);
              if (b.arcToSegmentsCache[l]) return b.arcToSegmentsCache[l];
              var u = Math.PI,
                g = (c * u) / 180,
                f = b.util.sin(g),
                d = b.util.cos(g),
                p = 0,
                C = 0,
                A = -d * e * 0.5 - f * r * 0.5,
                v = -d * r * 0.5 + f * e * 0.5,
                m = (s = Math.abs(s)) * s,
                I = (o = Math.abs(o)) * o,
                w = v * v,
                y = A * A,
                M = m * I - m * w - I * y,
                x = 0;
              if (M < 0) {
                var D = Math.sqrt(1 - M / (m * I));
                (s *= D), (o *= D);
              } else x = (a === h ? -1 : 1) * Math.sqrt(M / (m * w + I * y));
              var _ = (x * s * v) / o,
                T = (-x * o * A) / s,
                S = d * _ - f * T + 0.5 * e,
                O = f * _ + d * T + 0.5 * r,
                j = n(1, 0, (A - _) / s, (v - T) / o),
                P = n((A - _) / s, (v - T) / o, (-A - _) / s, (-v - T) / o);
              0 === h && P > 0
                ? (P -= 2 * u)
                : 1 === h && P < 0 && (P += 2 * u);
              for (
                var L = Math.ceil(Math.abs((P / u) * 2)),
                  k = [],
                  N = P / L,
                  E =
                    ((8 / 3) * Math.sin(N / 4) * Math.sin(N / 4)) /
                    Math.sin(N / 2),
                  z = j + N,
                  R = 0;
                R < L;
                R++
              )
                (k[R] = i(j, z, d, f, s, o, S, O, E, p, C)),
                  (p = k[R][4]),
                  (C = k[R][5]),
                  (j = z),
                  (z += N);
              return (b.arcToSegmentsCache[l] = k), k;
            }
            function i(t, e, i, n, r, s, o, a, h, c, l) {
              var u = b.util.cos(t),
                g = b.util.sin(t),
                f = b.util.cos(e),
                d = b.util.sin(e),
                p = i * r * f - n * s * d + o,
                C = n * r * f + i * s * d + a;
              return [
                c + h * (-i * r * g - n * s * u),
                l + h * (-n * r * g + i * s * u),
                p + h * (i * r * d + n * s * f),
                C + h * (n * r * d - i * s * f),
                p,
                C,
              ];
            }
            function n(t, e, i, n) {
              var r = Math.atan2(e, t),
                s = Math.atan2(n, i);
              return s >= r ? s - r : 2 * Math.PI - (r - s);
            }
            function r(e, i, n, r, s, o, a, h) {
              var c;
              if (
                b.cachesBoundsOfCurve &&
                ((c = t.call(arguments)), b.boundsOfCurveCache[c])
              )
                return b.boundsOfCurveCache[c];
              var l,
                u,
                g,
                f,
                d,
                p,
                C,
                A,
                v = Math.sqrt,
                m = Math.min,
                I = Math.max,
                w = Math.abs,
                y = [],
                M = [[], []];
              (u = 6 * e - 12 * n + 6 * s),
                (l = -3 * e + 9 * n - 9 * s + 3 * a),
                (g = 3 * n - 3 * e);
              for (var x = 0; x < 2; ++x)
                if (
                  (x > 0 &&
                    ((u = 6 * i - 12 * r + 6 * o),
                    (l = -3 * i + 9 * r - 9 * o + 3 * h),
                    (g = 3 * r - 3 * i)),
                  w(l) < 1e-12)
                ) {
                  if (w(u) < 1e-12) continue;
                  0 < (f = -g / u) && f < 1 && y.push(f);
                } else
                  (C = u * u - 4 * g * l) < 0 ||
                    (0 < (d = (-u + (A = v(C))) / (2 * l)) &&
                      d < 1 &&
                      y.push(d),
                    0 < (p = (-u - A) / (2 * l)) && p < 1 && y.push(p));
              for (var D, _, T, S = y.length, O = S; S--; )
                (D =
                  (T = 1 - (f = y[S])) * T * T * e +
                  3 * T * T * f * n +
                  3 * T * f * f * s +
                  f * f * f * a),
                  (M[0][S] = D),
                  (_ =
                    T * T * T * i +
                    3 * T * T * f * r +
                    3 * T * f * f * o +
                    f * f * f * h),
                  (M[1][S] = _);
              (M[0][O] = e),
                (M[1][O] = i),
                (M[0][O + 1] = a),
                (M[1][O + 1] = h);
              var j = [
                { x: m.apply(null, M[0]), y: m.apply(null, M[1]) },
                { x: I.apply(null, M[0]), y: I.apply(null, M[1]) },
              ];
              return b.cachesBoundsOfCurve && (b.boundsOfCurveCache[c] = j), j;
            }
            (b.util.drawArc = function (t, i, n, r) {
              for (
                var s = r[0],
                  o = r[1],
                  a = r[2],
                  h = r[3],
                  c = r[4],
                  l = [[], [], [], []],
                  u = e(r[5] - i, r[6] - n, s, o, h, c, a),
                  g = 0,
                  f = u.length;
                g < f;
                g++
              )
                (l[g][0] = u[g][0] + i),
                  (l[g][1] = u[g][1] + n),
                  (l[g][2] = u[g][2] + i),
                  (l[g][3] = u[g][3] + n),
                  (l[g][4] = u[g][4] + i),
                  (l[g][5] = u[g][5] + n),
                  t.bezierCurveTo.apply(t, l[g]);
            }),
              (b.util.getBoundsOfArc = function (t, i, n, s, o, a, h, c, l) {
                for (
                  var u,
                    g = 0,
                    f = 0,
                    d = [],
                    p = e(c - t, l - i, n, s, a, h, o),
                    C = 0,
                    A = p.length;
                  C < A;
                  C++
                )
                  (u = r(
                    g,
                    f,
                    p[C][0],
                    p[C][1],
                    p[C][2],
                    p[C][3],
                    p[C][4],
                    p[C][5]
                  )),
                    d.push({ x: u[0].x + t, y: u[0].y + i }),
                    d.push({ x: u[1].x + t, y: u[1].y + i }),
                    (g = p[C][4]),
                    (f = p[C][5]);
                return d;
              }),
              (b.util.getBoundsOfCurve = r);
          })(),
          (function () {
            var t = Array.prototype.slice;
            function e(t, e, i) {
              if (t && 0 !== t.length) {
                var n = t.length - 1,
                  r = e ? t[n][e] : t[n];
                if (e) for (; n--; ) i(t[n][e], r) && (r = t[n][e]);
                else for (; n--; ) i(t[n], r) && (r = t[n]);
                return r;
              }
            }
            b.util.array = {
              fill: function (t, e) {
                for (var i = t.length; i--; ) t[i] = e;
                return t;
              },
              invoke: function (e, i) {
                for (
                  var n = t.call(arguments, 2), r = [], s = 0, o = e.length;
                  s < o;
                  s++
                )
                  r[s] = n.length ? e[s][i].apply(e[s], n) : e[s][i].call(e[s]);
                return r;
              },
              min: function (t, i) {
                return e(t, i, function (t, e) {
                  return t < e;
                });
              },
              max: function (t, i) {
                return e(t, i, function (t, e) {
                  return t >= e;
                });
              },
            };
          })(),
          (function () {
            function t(e, i, n) {
              if (n)
                if (!b.isLikelyNode && i instanceof Element) e = i;
                else if (i instanceof Array) {
                  e = [];
                  for (var r = 0, s = i.length; r < s; r++)
                    e[r] = t({}, i[r], n);
                } else if (i && "object" == typeof i)
                  for (var o in i)
                    "canvas" === o
                      ? (e[o] = t({}, i[o]))
                      : i.hasOwnProperty(o) && (e[o] = t({}, i[o], n));
                else e = i;
              else for (var o in i) e[o] = i[o];
              return e;
            }
            (b.util.object = {
              extend: t,
              clone: function (e, i) {
                return t({}, e, i);
              },
            }),
              b.util.object.extend(b.util, b.Observable);
          })(),
          (function () {
            function t(t, e) {
              var i = t.charCodeAt(e);
              if (isNaN(i)) return "";
              if (i < 55296 || i > 57343) return t.charAt(e);
              if (55296 <= i && i <= 56319) {
                if (t.length <= e + 1)
                  throw "High surrogate without following low surrogate";
                var n = t.charCodeAt(e + 1);
                if (56320 > n || n > 57343)
                  throw "High surrogate without following low surrogate";
                return t.charAt(e) + t.charAt(e + 1);
              }
              if (0 === e)
                throw "Low surrogate without preceding high surrogate";
              var r = t.charCodeAt(e - 1);
              if (55296 > r || r > 56319)
                throw "Low surrogate without preceding high surrogate";
              return !1;
            }
            b.util.string = {
              camelize: function (t) {
                return t.replace(/-+(.)?/g, function (t, e) {
                  return e ? e.toUpperCase() : "";
                });
              },
              capitalize: function (t, e) {
                return (
                  t.charAt(0).toUpperCase() +
                  (e ? t.slice(1) : t.slice(1).toLowerCase())
                );
              },
              escapeXml: function (t) {
                return t
                  .replace(/&/g, "&amp;")
                  .replace(/"/g, "&quot;")
                  .replace(/'/g, "&apos;")
                  .replace(/</g, "&lt;")
                  .replace(/>/g, "&gt;");
              },
              graphemeSplit: function (e) {
                var i,
                  n = 0,
                  r = [];
                for (n = 0; n < e.length; n++)
                  !1 !== (i = t(e, n)) && r.push(i);
                return r;
              },
            };
          })(),
          (function () {
            var t = Array.prototype.slice,
              e = function () {},
              i = (function () {
                for (var t in { toString: 1 }) if ("toString" === t) return !1;
                return !0;
              })(),
              n = function (t, e, n) {
                for (var r in e)
                  r in t.prototype &&
                  "function" == typeof t.prototype[r] &&
                  (e[r] + "").indexOf("callSuper") > -1
                    ? (t.prototype[r] = (function (t) {
                        return function () {
                          var i = this.constructor.superclass;
                          this.constructor.superclass = n;
                          var r = e[t].apply(this, arguments);
                          if (
                            ((this.constructor.superclass = i),
                            "initialize" !== t)
                          )
                            return r;
                        };
                      })(r))
                    : (t.prototype[r] = e[r]),
                    i &&
                      (e.toString !== Object.prototype.toString &&
                        (t.prototype.toString = e.toString),
                      e.valueOf !== Object.prototype.valueOf &&
                        (t.prototype.valueOf = e.valueOf));
              };
            function r() {}
            function s(e) {
              for (var i = null, n = this; n.constructor.superclass; ) {
                var r = n.constructor.superclass.prototype[e];
                if (n[e] !== r) {
                  i = r;
                  break;
                }
                n = n.constructor.superclass.prototype;
              }
              return i
                ? arguments.length > 1
                  ? i.apply(this, t.call(arguments, 1))
                  : i.call(this)
                : console.log(
                    "tried to callSuper " +
                      e +
                      ", method not found in prototype chain",
                    this
                  );
            }
            b.util.createClass = function () {
              var i = null,
                o = t.call(arguments, 0);
              function a() {
                this.initialize.apply(this, arguments);
              }
              "function" == typeof o[0] && (i = o.shift()),
                (a.superclass = i),
                (a.subclasses = []),
                i &&
                  ((r.prototype = i.prototype),
                  (a.prototype = new r()),
                  i.subclasses.push(a));
              for (var h = 0, c = o.length; h < c; h++) n(a, o[h], i);
              return (
                a.prototype.initialize || (a.prototype.initialize = e),
                (a.prototype.constructor = a),
                (a.prototype.callSuper = s),
                a
              );
            };
          })(),
          (c = !!b.document.createElement("div").attachEvent),
          (b.util.addListener = function (t, e, i, n) {
            t && t.addEventListener(e, i, !c && n);
          }),
          (b.util.removeListener = function (t, e, i, n) {
            t && t.removeEventListener(e, i, !c && n);
          }),
          (b.util.getPointer = function (t) {
            var e = t.target,
              i = b.util.getScrollLeftTop(e),
              n = (function (t) {
                var e = t.changedTouches;
                return e && e[0] ? e[0] : t;
              })(t);
            return { x: n.clientX + i.left, y: n.clientY + i.top };
          }),
          (l = b.document.createElement("div")),
          (u = "string" == typeof l.style.opacity),
          (g = "string" == typeof l.style.filter),
          (f = /alpha\s*\(\s*opacity\s*=\s*([^\)]+)\)/),
          (d = function (t) {
            return t;
          }),
          u
            ? (d = function (t, e) {
                return (t.style.opacity = e), t;
              })
            : g &&
              (d = function (t, e) {
                var i = t.style;
                return (
                  t.currentStyle && !t.currentStyle.hasLayout && (i.zoom = 1),
                  f.test(i.filter)
                    ? ((e =
                        e >= 0.9999 ? "" : "alpha(opacity=" + 100 * e + ")"),
                      (i.filter = i.filter.replace(f, e)))
                    : (i.filter += " alpha(opacity=" + 100 * e + ")"),
                  t
                );
              }),
          (b.util.setStyle = function (t, e) {
            var i = t.style;
            if (!i) return t;
            if ("string" == typeof e)
              return (
                (t.style.cssText += ";" + e),
                e.indexOf("opacity") > -1
                  ? d(t, e.match(/opacity:\s*(\d?\.?\d*)/)[1])
                  : t
              );
            for (var n in e)
              "opacity" === n
                ? d(t, e[n])
                : (i[
                    "float" === n || "cssFloat" === n
                      ? void 0 === i.styleFloat
                        ? "cssFloat"
                        : "styleFloat"
                      : n
                  ] = e[n]);
            return t;
          }),
          (function () {
            var t = Array.prototype.slice;
            var e,
              i,
              n,
              r,
              s = function (e) {
                return t.call(e, 0);
              };
            try {
              e = s(b.document.childNodes) instanceof Array;
            } catch (t) {}
            function o(t, e) {
              var i = b.document.createElement(t);
              for (var n in e)
                "class" === n
                  ? (i.className = e[n])
                  : "for" === n
                  ? (i.htmlFor = e[n])
                  : i.setAttribute(n, e[n]);
              return i;
            }
            function a(t) {
              for (
                var e = 0,
                  i = 0,
                  n = b.document.documentElement,
                  r = b.document.body || { scrollLeft: 0, scrollTop: 0 };
                t &&
                (t.parentNode || t.host) &&
                ((t = t.parentNode || t.host) === b.document
                  ? ((e = r.scrollLeft || n.scrollLeft || 0),
                    (i = r.scrollTop || n.scrollTop || 0))
                  : ((e += t.scrollLeft || 0), (i += t.scrollTop || 0)),
                1 !== t.nodeType || "fixed" !== t.style.position);

              );
              return { left: e, top: i };
            }
            e ||
              (s = function (t) {
                for (var e = new Array(t.length), i = t.length; i--; )
                  e[i] = t[i];
                return e;
              }),
              (i =
                b.document.defaultView &&
                b.document.defaultView.getComputedStyle
                  ? function (t, e) {
                      var i = b.document.defaultView.getComputedStyle(t, null);
                      return i ? i[e] : void 0;
                    }
                  : function (t, e) {
                      var i = t.style[e];
                      return !i && t.currentStyle && (i = t.currentStyle[e]), i;
                    }),
              (n = b.document.documentElement.style),
              (r =
                "userSelect" in n
                  ? "userSelect"
                  : "MozUserSelect" in n
                  ? "MozUserSelect"
                  : "WebkitUserSelect" in n
                  ? "WebkitUserSelect"
                  : "KhtmlUserSelect" in n
                  ? "KhtmlUserSelect"
                  : ""),
              (b.util.makeElementUnselectable = function (t) {
                return (
                  void 0 !== t.onselectstart &&
                    (t.onselectstart = b.util.falseFunction),
                  r
                    ? (t.style[r] = "none")
                    : "string" == typeof t.unselectable &&
                      (t.unselectable = "on"),
                  t
                );
              }),
              (b.util.makeElementSelectable = function (t) {
                return (
                  void 0 !== t.onselectstart && (t.onselectstart = null),
                  r
                    ? (t.style[r] = "")
                    : "string" == typeof t.unselectable &&
                      (t.unselectable = ""),
                  t
                );
              }),
              (b.util.getScript = function (t, e) {
                var i = b.document.getElementsByTagName("head")[0],
                  n = b.document.createElement("script"),
                  r = !0;
                (n.onload = n.onreadystatechange =
                  function (t) {
                    if (r) {
                      if (
                        "string" == typeof this.readyState &&
                        "loaded" !== this.readyState &&
                        "complete" !== this.readyState
                      )
                        return;
                      (r = !1),
                        e(t || b.window.event),
                        (n = n.onload = n.onreadystatechange = null);
                    }
                  }),
                  (n.src = t),
                  i.appendChild(n);
              }),
              (b.util.getById = function (t) {
                return "string" == typeof t ? b.document.getElementById(t) : t;
              }),
              (b.util.toArray = s),
              (b.util.makeElement = o),
              (b.util.addClass = function (t, e) {
                t &&
                  -1 === (" " + t.className + " ").indexOf(" " + e + " ") &&
                  (t.className += (t.className ? " " : "") + e);
              }),
              (b.util.wrapElement = function (t, e, i) {
                return (
                  "string" == typeof e && (e = o(e, i)),
                  t.parentNode && t.parentNode.replaceChild(e, t),
                  e.appendChild(t),
                  e
                );
              }),
              (b.util.getScrollLeftTop = a),
              (b.util.getElementOffset = function (t) {
                var e,
                  n,
                  r = t && t.ownerDocument,
                  s = { left: 0, top: 0 },
                  o = { left: 0, top: 0 },
                  h = {
                    borderLeftWidth: "left",
                    borderTopWidth: "top",
                    paddingLeft: "left",
                    paddingTop: "top",
                  };
                if (!r) return o;
                for (var c in h) o[h[c]] += parseInt(i(t, c), 10) || 0;
                return (
                  (e = r.documentElement),
                  void 0 !== t.getBoundingClientRect &&
                    (s = t.getBoundingClientRect()),
                  (n = a(t)),
                  {
                    left: s.left + n.left - (e.clientLeft || 0) + o.left,
                    top: s.top + n.top - (e.clientTop || 0) + o.top,
                  }
                );
              }),
              (b.util.getElementStyle = i),
              (b.util.getNodeCanvas = function (t) {
                var e = b.jsdomImplForWrapper(t);
                return e._canvas || e._image;
              }),
              (b.util.cleanUpJsdomNode = function (t) {
                if (b.isLikelyNode) {
                  var e = b.jsdomImplForWrapper(t);
                  e &&
                    ((e._image = null),
                    (e._canvas = null),
                    (e._currentSrc = null),
                    (e._attributes = null),
                    (e._classList = null));
                }
              });
          })(),
          (function () {
            function t() {}
            b.util.request = function (e, i) {
              i || (i = {});
              var n = i.method ? i.method.toUpperCase() : "GET",
                r = i.onComplete || function () {},
                s = new b.window.XMLHttpRequest(),
                o = i.body || i.parameters;
              return (
                (s.onreadystatechange = function () {
                  4 === s.readyState && (r(s), (s.onreadystatechange = t));
                }),
                "GET" === n &&
                  ((o = null),
                  "string" == typeof i.parameters &&
                    (e = (function (t, e) {
                      return t + (/\?/.test(t) ? "&" : "?") + e;
                    })(e, i.parameters))),
                s.open(n, e, !0),
                ("POST" !== n && "PUT" !== n) ||
                  s.setRequestHeader(
                    "Content-Type",
                    "application/x-www-form-urlencoded"
                  ),
                s.send(o),
                s
              );
            };
          })(),
          (b.log = console.log),
          (b.warn = console.warn),
          (function () {
            function t() {
              return !1;
            }
            function e(t, e, i, n) {
              return -i * Math.cos((t / n) * (Math.PI / 2)) + i + e;
            }
            var i =
                b.window.requestAnimationFrame ||
                b.window.webkitRequestAnimationFrame ||
                b.window.mozRequestAnimationFrame ||
                b.window.oRequestAnimationFrame ||
                b.window.msRequestAnimationFrame ||
                function (t) {
                  return b.window.setTimeout(t, 1e3 / 60);
                },
              n = b.window.cancelAnimationFrame || b.window.clearTimeout;
            function r() {
              return i.apply(b.window, arguments);
            }
            (b.util.animate = function (i) {
              r(function (n) {
                i || (i = {});
                var s,
                  o = n || +new Date(),
                  a = i.duration || 500,
                  h = o + a,
                  c = i.onChange || t,
                  l = i.abort || t,
                  u = i.onComplete || t,
                  g = i.easing || e,
                  f = "startValue" in i ? i.startValue : 0,
                  d = "endValue" in i ? i.endValue : 100,
                  p = i.byValue || d - f;
                i.onStart && i.onStart(),
                  (function t(e) {
                    var i = (s = e || +new Date()) > h ? a : s - o,
                      n = i / a,
                      C = g(i, f, p, a),
                      A = Math.abs((C - f) / p);
                    if (!l())
                      return s > h
                        ? (c(d, 1, 1), void u(d, 1, 1))
                        : (c(C, A, n), void r(t));
                    u(d, 1, 1);
                  })(o);
              });
            }),
              (b.util.requestAnimFrame = r),
              (b.util.cancelAnimFrame = function () {
                return n.apply(b.window, arguments);
              });
          })(),
          (b.util.animateColor = function (t, e, i, n) {
            var r = new b.Color(t).getSource(),
              s = new b.Color(e).getSource();
            (n = n || {}),
              b.util.animate(
                b.util.object.extend(n, {
                  duration: i || 500,
                  startValue: r,
                  endValue: s,
                  byValue: s,
                  easing: function (t, e, i, r) {
                    var s,
                      o,
                      a,
                      h,
                      c = n.colorEasing
                        ? n.colorEasing(t, r)
                        : 1 - Math.cos((t / r) * (Math.PI / 2));
                    return (
                      (s = e),
                      (o = i),
                      (a = c),
                      (h =
                        "rgba(" +
                        parseInt(s[0] + a * (o[0] - s[0]), 10) +
                        "," +
                        parseInt(s[1] + a * (o[1] - s[1]), 10) +
                        "," +
                        parseInt(s[2] + a * (o[2] - s[2]), 10)),
                      (h +=
                        "," +
                        (s && o ? parseFloat(s[3] + a * (o[3] - s[3])) : 1)),
                      (h += ")")
                    );
                  },
                })
              );
          }),
          (function () {
            function t(t, e, i, n) {
              return (
                t < Math.abs(e)
                  ? ((t = e), (n = i / 4))
                  : (n =
                      0 === e && 0 === t
                        ? (i / (2 * Math.PI)) * Math.asin(1)
                        : (i / (2 * Math.PI)) * Math.asin(e / t)),
                { a: t, c: e, p: i, s: n }
              );
            }
            function e(t, e, i) {
              return (
                t.a *
                Math.pow(2, 10 * (e -= 1)) *
                Math.sin(((e * i - t.s) * (2 * Math.PI)) / t.p)
              );
            }
            function i(t, e, i, r) {
              return i - n(r - t, 0, i, r) + e;
            }
            function n(t, e, i, n) {
              return (t /= n) < 1 / 2.75
                ? i * (7.5625 * t * t) + e
                : t < 2 / 2.75
                ? i * (7.5625 * (t -= 1.5 / 2.75) * t + 0.75) + e
                : t < 2.5 / 2.75
                ? i * (7.5625 * (t -= 2.25 / 2.75) * t + 0.9375) + e
                : i * (7.5625 * (t -= 2.625 / 2.75) * t + 0.984375) + e;
            }
            b.util.ease = {
              easeInQuad: function (t, e, i, n) {
                return i * (t /= n) * t + e;
              },
              easeOutQuad: function (t, e, i, n) {
                return -i * (t /= n) * (t - 2) + e;
              },
              easeInOutQuad: function (t, e, i, n) {
                return (t /= n / 2) < 1
                  ? (i / 2) * t * t + e
                  : (-i / 2) * (--t * (t - 2) - 1) + e;
              },
              easeInCubic: function (t, e, i, n) {
                return i * (t /= n) * t * t + e;
              },
              easeOutCubic: function (t, e, i, n) {
                return i * ((t = t / n - 1) * t * t + 1) + e;
              },
              easeInOutCubic: function (t, e, i, n) {
                return (t /= n / 2) < 1
                  ? (i / 2) * t * t * t + e
                  : (i / 2) * ((t -= 2) * t * t + 2) + e;
              },
              easeInQuart: function (t, e, i, n) {
                return i * (t /= n) * t * t * t + e;
              },
              easeOutQuart: function (t, e, i, n) {
                return -i * ((t = t / n - 1) * t * t * t - 1) + e;
              },
              easeInOutQuart: function (t, e, i, n) {
                return (t /= n / 2) < 1
                  ? (i / 2) * t * t * t * t + e
                  : (-i / 2) * ((t -= 2) * t * t * t - 2) + e;
              },
              easeInQuint: function (t, e, i, n) {
                return i * (t /= n) * t * t * t * t + e;
              },
              easeOutQuint: function (t, e, i, n) {
                return i * ((t = t / n - 1) * t * t * t * t + 1) + e;
              },
              easeInOutQuint: function (t, e, i, n) {
                return (t /= n / 2) < 1
                  ? (i / 2) * t * t * t * t * t + e
                  : (i / 2) * ((t -= 2) * t * t * t * t + 2) + e;
              },
              easeInSine: function (t, e, i, n) {
                return -i * Math.cos((t / n) * (Math.PI / 2)) + i + e;
              },
              easeOutSine: function (t, e, i, n) {
                return i * Math.sin((t / n) * (Math.PI / 2)) + e;
              },
              easeInOutSine: function (t, e, i, n) {
                return (-i / 2) * (Math.cos((Math.PI * t) / n) - 1) + e;
              },
              easeInExpo: function (t, e, i, n) {
                return 0 === t ? e : i * Math.pow(2, 10 * (t / n - 1)) + e;
              },
              easeOutExpo: function (t, e, i, n) {
                return t === n
                  ? e + i
                  : i * (1 - Math.pow(2, (-10 * t) / n)) + e;
              },
              easeInOutExpo: function (t, e, i, n) {
                return 0 === t
                  ? e
                  : t === n
                  ? e + i
                  : (t /= n / 2) < 1
                  ? (i / 2) * Math.pow(2, 10 * (t - 1)) + e
                  : (i / 2) * (2 - Math.pow(2, -10 * --t)) + e;
              },
              easeInCirc: function (t, e, i, n) {
                return -i * (Math.sqrt(1 - (t /= n) * t) - 1) + e;
              },
              easeOutCirc: function (t, e, i, n) {
                return i * Math.sqrt(1 - (t = t / n - 1) * t) + e;
              },
              easeInOutCirc: function (t, e, i, n) {
                return (t /= n / 2) < 1
                  ? (-i / 2) * (Math.sqrt(1 - t * t) - 1) + e
                  : (i / 2) * (Math.sqrt(1 - (t -= 2) * t) + 1) + e;
              },
              easeInElastic: function (i, n, r, s) {
                var o = 0;
                return 0 === i
                  ? n
                  : 1 === (i /= s)
                  ? n + r
                  : (o || (o = 0.3 * s), -e(t(r, r, o, 1.70158), i, s) + n);
              },
              easeOutElastic: function (e, i, n, r) {
                var s = 0;
                if (0 === e) return i;
                if (1 === (e /= r)) return i + n;
                s || (s = 0.3 * r);
                var o = t(n, n, s, 1.70158);
                return (
                  o.a *
                    Math.pow(2, -10 * e) *
                    Math.sin(((e * r - o.s) * (2 * Math.PI)) / o.p) +
                  o.c +
                  i
                );
              },
              easeInOutElastic: function (i, n, r, s) {
                var o = 0;
                if (0 === i) return n;
                if (2 === (i /= s / 2)) return n + r;
                o || (o = s * (0.3 * 1.5));
                var a = t(r, r, o, 1.70158);
                return i < 1
                  ? -0.5 * e(a, i, s) + n
                  : a.a *
                      Math.pow(2, -10 * (i -= 1)) *
                      Math.sin(((i * s - a.s) * (2 * Math.PI)) / a.p) *
                      0.5 +
                      a.c +
                      n;
              },
              easeInBack: function (t, e, i, n, r) {
                return (
                  void 0 === r && (r = 1.70158),
                  i * (t /= n) * t * ((r + 1) * t - r) + e
                );
              },
              easeOutBack: function (t, e, i, n, r) {
                return (
                  void 0 === r && (r = 1.70158),
                  i * ((t = t / n - 1) * t * ((r + 1) * t + r) + 1) + e
                );
              },
              easeInOutBack: function (t, e, i, n, r) {
                return (
                  void 0 === r && (r = 1.70158),
                  (t /= n / 2) < 1
                    ? (i / 2) * (t * t * ((1 + (r *= 1.525)) * t - r)) + e
                    : (i / 2) *
                        ((t -= 2) * t * ((1 + (r *= 1.525)) * t + r) + 2) +
                      e
                );
              },
              easeInBounce: i,
              easeOutBounce: n,
              easeInOutBounce: function (t, e, r, s) {
                return t < s / 2
                  ? 0.5 * i(2 * t, 0, r, s) + e
                  : 0.5 * n(2 * t - s, 0, r, s) + 0.5 * r + e;
              },
            };
          })(),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.object.extend,
              n = e.util.object.clone,
              r = e.util.toFixed,
              s = e.util.parseUnit,
              o = e.util.multiplyTransformMatrices,
              a = {
                cx: "left",
                x: "left",
                r: "radius",
                cy: "top",
                y: "top",
                display: "visible",
                visibility: "visible",
                transform: "transformMatrix",
                "fill-opacity": "fillOpacity",
                "fill-rule": "fillRule",
                "font-family": "fontFamily",
                "font-size": "fontSize",
                "font-style": "fontStyle",
                "font-weight": "fontWeight",
                "letter-spacing": "charSpacing",
                "paint-order": "paintFirst",
                "stroke-dasharray": "strokeDashArray",
                "stroke-dashoffset": "strokeDashOffset",
                "stroke-linecap": "strokeLineCap",
                "stroke-linejoin": "strokeLineJoin",
                "stroke-miterlimit": "strokeMiterLimit",
                "stroke-opacity": "strokeOpacity",
                "stroke-width": "strokeWidth",
                "text-decoration": "textDecoration",
                "text-anchor": "textAnchor",
                opacity: "opacity",
                "clip-path": "clipPath",
                "clip-rule": "clipRule",
                "vector-effect": "strokeUniform",
              },
              h = { stroke: "strokeOpacity", fill: "fillOpacity" };
            function c(t) {
              return t in a ? a[t] : t;
            }
            function l(t, i, n, r) {
              var a,
                h = "[object Array]" === Object.prototype.toString.call(i);
              if (("fill" !== t && "stroke" !== t) || "none" !== i)
                if ("vector-effect" === t) i = "non-scaling-stroke" === i;
                else if ("strokeDashArray" === t)
                  i =
                    "none" === i
                      ? null
                      : i.replace(/,/g, " ").split(/\s+/).map(parseFloat);
                else if ("transformMatrix" === t)
                  i =
                    n && n.transformMatrix
                      ? o(n.transformMatrix, e.parseTransformAttribute(i))
                      : e.parseTransformAttribute(i);
                else if ("visible" === t)
                  (i = "none" !== i && "hidden" !== i),
                    n && !1 === n.visible && (i = !1);
                else if ("opacity" === t)
                  (i = parseFloat(i)),
                    n && void 0 !== n.opacity && (i *= n.opacity);
                else if ("textAnchor" === t)
                  i = "start" === i ? "left" : "end" === i ? "right" : "center";
                else if ("charSpacing" === t) a = (s(i, r) / r) * 1e3;
                else if ("paintFirst" === t) {
                  var c = i.indexOf("fill"),
                    l = i.indexOf("stroke");
                  i = "fill";
                  ((c > -1 && l > -1 && l < c) || (-1 === c && l > -1)) &&
                    (i = "stroke");
                } else {
                  if ("href" === t || "xlink:href" === t) return i;
                  a = h ? i.map(s) : s(i, r);
                }
              else i = "";
              return !h && isNaN(a) ? i : a;
            }
            function u(t) {
              return new RegExp("^(" + t.join("|") + ")\\b", "i");
            }
            function g(t, e) {
              var i,
                n,
                r,
                s,
                o = [];
              for (r = 0, s = e.length; r < s; r++)
                (i = e[r]),
                  (n = t.getElementsByTagName(i)),
                  (o = o.concat(Array.prototype.slice.call(n)));
              return o;
            }
            function f(t, e) {
              var i,
                n = !0;
              return (
                (i = d(t, e.pop())) &&
                  e.length &&
                  (n = (function (t, e) {
                    var i,
                      n = !0;
                    for (
                      ;
                      t.parentNode && 1 === t.parentNode.nodeType && e.length;

                    )
                      n && (i = e.pop()), (t = t.parentNode), (n = d(t, i));
                    return 0 === e.length;
                  })(t, e)),
                i && n && 0 === e.length
              );
            }
            function d(t, e) {
              var i,
                n,
                r = t.nodeName,
                s = t.getAttribute("class"),
                o = t.getAttribute("id");
              if (
                ((i = new RegExp("^" + r, "i")),
                (e = e.replace(i, "")),
                o &&
                  e.length &&
                  ((i = new RegExp("#" + o + "(?![a-zA-Z\\-]+)", "i")),
                  (e = e.replace(i, ""))),
                s && e.length)
              )
                for (n = (s = s.split(" ")).length; n--; )
                  (i = new RegExp("\\." + s[n] + "(?![a-zA-Z\\-]+)", "i")),
                    (e = e.replace(i, ""));
              return 0 === e.length;
            }
            function p(t, e) {
              var i;
              if ((t.getElementById && (i = t.getElementById(e)), i)) return i;
              var n,
                r,
                s,
                o = t.getElementsByTagName("*");
              for (r = 0, s = o.length; r < s; r++)
                if (e === (n = o[r]).getAttribute("id")) return n;
            }
            (e.svgValidTagNamesRegEx = u([
              "path",
              "circle",
              "polygon",
              "polyline",
              "ellipse",
              "rect",
              "line",
              "image",
              "text",
            ])),
              (e.svgViewBoxElementsRegEx = u([
                "symbol",
                "image",
                "marker",
                "pattern",
                "view",
                "svg",
              ])),
              (e.svgInvalidAncestorsRegEx = u([
                "pattern",
                "defs",
                "symbol",
                "metadata",
                "clipPath",
                "mask",
                "desc",
              ])),
              (e.svgValidParentsRegEx = u([
                "symbol",
                "g",
                "a",
                "svg",
                "clipPath",
                "defs",
              ])),
              (e.cssRules = {}),
              (e.gradientDefs = {}),
              (e.clipPaths = {}),
              (e.parseTransformAttribute = (function () {
                function t(t, i, n) {
                  t[n] = Math.tan(e.util.degreesToRadians(i[0]));
                }
                var i = e.iMatrix,
                  n = e.reNum,
                  r = "(?:\\s+,?\\s*|,\\s*)",
                  s =
                    "(?:" +
                    ("(?:(matrix)\\s*\\(\\s*(" +
                      n +
                      ")" +
                      r +
                      "(" +
                      n +
                      ")" +
                      r +
                      "(" +
                      n +
                      ")" +
                      r +
                      "(" +
                      n +
                      ")" +
                      r +
                      "(" +
                      n +
                      ")" +
                      r +
                      "(" +
                      n +
                      ")\\s*\\))") +
                    "|" +
                    ("(?:(translate)\\s*\\(\\s*(" +
                      n +
                      ")(?:" +
                      r +
                      "(" +
                      n +
                      "))?\\s*\\))") +
                    "|" +
                    ("(?:(scale)\\s*\\(\\s*(" +
                      n +
                      ")(?:" +
                      r +
                      "(" +
                      n +
                      "))?\\s*\\))") +
                    "|" +
                    ("(?:(rotate)\\s*\\(\\s*(" +
                      n +
                      ")(?:" +
                      r +
                      "(" +
                      n +
                      ")" +
                      r +
                      "(" +
                      n +
                      "))?\\s*\\))") +
                    "|" +
                    ("(?:(skewX)\\s*\\(\\s*(" + n + ")\\s*\\))") +
                    "|" +
                    ("(?:(skewY)\\s*\\(\\s*(" + n + ")\\s*\\))") +
                    ")",
                  o = new RegExp(
                    "^\\s*(?:" +
                      ("(?:" + s + "(?:" + r + "*" + s + ")*)") +
                      "?)\\s*$"
                  ),
                  a = new RegExp(s, "g");
                return function (n) {
                  var r = i.concat(),
                    h = [];
                  if (!n || (n && !o.test(n))) return r;
                  n.replace(a, function (n) {
                    var o = new RegExp(s).exec(n).filter(function (t) {
                        return !!t;
                      }),
                      a = o[1],
                      c = o.slice(2).map(parseFloat);
                    switch (a) {
                      case "translate":
                        !(function (t, e) {
                          (t[4] = e[0]), 2 === e.length && (t[5] = e[1]);
                        })(r, c);
                        break;
                      case "rotate":
                        (c[0] = e.util.degreesToRadians(c[0])),
                          (function (t, i) {
                            var n = e.util.cos(i[0]),
                              r = e.util.sin(i[0]),
                              s = 0,
                              o = 0;
                            3 === i.length && ((s = i[1]), (o = i[2])),
                              (t[0] = n),
                              (t[1] = r),
                              (t[2] = -r),
                              (t[3] = n),
                              (t[4] = s - (n * s - r * o)),
                              (t[5] = o - (r * s + n * o));
                          })(r, c);
                        break;
                      case "scale":
                        !(function (t, e) {
                          var i = e[0],
                            n = 2 === e.length ? e[1] : e[0];
                          (t[0] = i), (t[3] = n);
                        })(r, c);
                        break;
                      case "skewX":
                        t(r, c, 2);
                        break;
                      case "skewY":
                        t(r, c, 1);
                        break;
                      case "matrix":
                        r = c;
                    }
                    h.push(r.concat()), (r = i.concat());
                  });
                  for (var c = h[0]; h.length > 1; )
                    h.shift(), (c = e.util.multiplyTransformMatrices(c, h[0]));
                  return c;
                };
              })());
            var C = new RegExp(
              "^\\s*(" +
                e.reNum +
                "+)\\s*,?\\s*(" +
                e.reNum +
                "+)\\s*,?\\s*(" +
                e.reNum +
                "+)\\s*,?\\s*(" +
                e.reNum +
                "+)\\s*$"
            );
            function A(t) {
              var i,
                n,
                r,
                o,
                a,
                h,
                c = t.getAttribute("viewBox"),
                l = 1,
                u = 1,
                g = t.getAttribute("width"),
                f = t.getAttribute("height"),
                d = t.getAttribute("x") || 0,
                p = t.getAttribute("y") || 0,
                A = t.getAttribute("preserveAspectRatio") || "",
                v =
                  !c ||
                  !e.svgViewBoxElementsRegEx.test(t.nodeName) ||
                  !(c = c.match(C)),
                m = !g || !f || "100%" === g || "100%" === f,
                I = v && m,
                w = {},
                y = "",
                M = 0,
                b = 0;
              if (((w.width = 0), (w.height = 0), (w.toBeParsed = I), I))
                return w;
              if (v) return (w.width = s(g)), (w.height = s(f)), w;
              if (
                ((i = -parseFloat(c[1])),
                (n = -parseFloat(c[2])),
                (r = parseFloat(c[3])),
                (o = parseFloat(c[4])),
                (w.minX = i),
                (w.minY = n),
                (w.viewBoxWidth = r),
                (w.viewBoxHeight = o),
                m
                  ? ((w.width = r), (w.height = o))
                  : ((w.width = s(g)),
                    (w.height = s(f)),
                    (l = w.width / r),
                    (u = w.height / o)),
                "none" !==
                  (A = e.util.parsePreserveAspectRatioAttribute(A)).alignX &&
                  ("meet" === A.meetOrSlice && (u = l = l > u ? u : l),
                  "slice" === A.meetOrSlice && (u = l = l > u ? l : u),
                  (M = w.width - r * l),
                  (b = w.height - o * l),
                  "Mid" === A.alignX && (M /= 2),
                  "Mid" === A.alignY && (b /= 2),
                  "Min" === A.alignX && (M = 0),
                  "Min" === A.alignY && (b = 0)),
                1 === l && 1 === u && 0 === i && 0 === n && 0 === d && 0 === p)
              )
                return w;
              if (
                ((d || p) && (y = " translate(" + s(d) + " " + s(p) + ") "),
                (a =
                  y +
                  " matrix(" +
                  l +
                  " 0 0 " +
                  u +
                  " " +
                  (i * l + M) +
                  " " +
                  (n * u + b) +
                  ") "),
                (w.viewboxTransform = e.parseTransformAttribute(a)),
                "svg" === t.nodeName)
              ) {
                for (
                  h = t.ownerDocument.createElementNS(e.svgNS, "g");
                  t.firstChild;

                )
                  h.appendChild(t.firstChild);
                t.appendChild(h);
              } else a = (h = t).getAttribute("transform") + a;
              return h.setAttribute("transform", a), w;
            }
            function v(t, e) {
              var i = p(t, e.getAttribute("xlink:href").substr(1));
              if (
                (i && i.getAttribute("xlink:href") && v(t, i),
                [
                  "gradientTransform",
                  "x1",
                  "x2",
                  "y1",
                  "y2",
                  "gradientUnits",
                  "cx",
                  "cy",
                  "r",
                  "fx",
                  "fy",
                ].forEach(function (t) {
                  i &&
                    !e.hasAttribute(t) &&
                    i.hasAttribute(t) &&
                    e.setAttribute(t, i.getAttribute(t));
                }),
                !e.children.length)
              )
                for (var n = i.cloneNode(!0); n.firstChild; )
                  e.appendChild(n.firstChild);
              e.removeAttribute("xlink:href");
            }
            e.parseSVGDocument = function (t, i, r, s) {
              if (t) {
                !(function (t) {
                  for (
                    var i = g(t, ["use", "svg:use"]), n = 0;
                    i.length && n < i.length;

                  ) {
                    var r,
                      s,
                      o,
                      a,
                      h = i[n],
                      c = (
                        h.getAttribute("xlink:href") || h.getAttribute("href")
                      ).substr(1),
                      l = h.getAttribute("x") || 0,
                      u = h.getAttribute("y") || 0,
                      f = p(t, c).cloneNode(!0),
                      d =
                        (f.getAttribute("transform") || "") +
                        " translate(" +
                        l +
                        ", " +
                        u +
                        ")",
                      C = i.length,
                      v = e.svgNS;
                    if ((A(f), /^svg$/i.test(f.nodeName))) {
                      var m = f.ownerDocument.createElementNS(v, "g");
                      for (s = 0, a = (o = f.attributes).length; s < a; s++)
                        (r = o.item(s)),
                          m.setAttributeNS(v, r.nodeName, r.nodeValue);
                      for (; f.firstChild; ) m.appendChild(f.firstChild);
                      f = m;
                    }
                    for (s = 0, a = (o = h.attributes).length; s < a; s++)
                      "x" !== (r = o.item(s)).nodeName &&
                        "y" !== r.nodeName &&
                        "xlink:href" !== r.nodeName &&
                        "href" !== r.nodeName &&
                        ("transform" === r.nodeName
                          ? (d = r.nodeValue + " " + d)
                          : f.setAttribute(r.nodeName, r.nodeValue));
                    f.setAttribute("transform", d),
                      f.setAttribute("instantiated_by_use", "1"),
                      f.removeAttribute("id"),
                      h.parentNode.replaceChild(f, h),
                      i.length === C && n++;
                  }
                })(t);
                var o,
                  a,
                  h = e.Object.__uid++,
                  c = A(t),
                  l = e.util.toArray(t.getElementsByTagName("*"));
                if (
                  ((c.crossOrigin = s && s.crossOrigin),
                  (c.svgUid = h),
                  0 === l.length && e.isLikelyNode)
                ) {
                  var u = [];
                  for (
                    o = 0,
                      a = (l = t.selectNodes('//*[name(.)!="svg"]')).length;
                    o < a;
                    o++
                  )
                    u[o] = l[o];
                  l = u;
                }
                var f = l.filter(function (t) {
                  return (
                    A(t),
                    e.svgValidTagNamesRegEx.test(
                      t.nodeName.replace("svg:", "")
                    ) &&
                      !(function (t, e) {
                        for (; t && (t = t.parentNode); )
                          if (
                            t.nodeName &&
                            e.test(t.nodeName.replace("svg:", "")) &&
                            !t.getAttribute("instantiated_by_use")
                          )
                            return !0;
                        return !1;
                      })(t, e.svgInvalidAncestorsRegEx)
                  );
                });
                if (!f || (f && !f.length)) i && i([], {});
                else {
                  var d = {};
                  l
                    .filter(function (t) {
                      return "clipPath" === t.nodeName.replace("svg:", "");
                    })
                    .forEach(function (t) {
                      var i = t.getAttribute("id");
                      d[i] = e.util
                        .toArray(t.getElementsByTagName("*"))
                        .filter(function (t) {
                          return e.svgValidTagNamesRegEx.test(
                            t.nodeName.replace("svg:", "")
                          );
                        });
                    }),
                    (e.gradientDefs[h] = e.getGradientDefs(t)),
                    (e.cssRules[h] = e.getCSSRules(t)),
                    (e.clipPaths[h] = d),
                    e.parseElements(
                      f,
                      function (t, n) {
                        i &&
                          (i(t, c, n, l),
                          delete e.gradientDefs[h],
                          delete e.cssRules[h],
                          delete e.clipPaths[h]);
                      },
                      n(c),
                      r,
                      s
                    );
                }
              }
            };
            var m = new RegExp(
              "(normal|italic)?\\s*(normal|small-caps)?\\s*(normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900)?\\s*(" +
                e.reNum +
                "(?:px|cm|mm|em|pt|pc|in)*)(?:\\/(normal|" +
                e.reNum +
                "))?\\s+(.*)"
            );
            i(e, {
              parseFontDeclaration: function (t, e) {
                var i = t.match(m);
                if (i) {
                  var n = i[1],
                    r = i[3],
                    o = i[4],
                    a = i[5],
                    h = i[6];
                  n && (e.fontStyle = n),
                    r &&
                      (e.fontWeight = isNaN(parseFloat(r)) ? r : parseFloat(r)),
                    o && (e.fontSize = s(o)),
                    h && (e.fontFamily = h),
                    a && (e.lineHeight = "normal" === a ? 1 : a);
                }
              },
              getGradientDefs: function (t) {
                var e,
                  i = g(t, [
                    "linearGradient",
                    "radialGradient",
                    "svg:linearGradient",
                    "svg:radialGradient",
                  ]),
                  n = 0,
                  r = {};
                for (n = i.length; n--; )
                  (e = i[n]).getAttribute("xlink:href") && v(t, e),
                    (r[e.getAttribute("id")] = e);
                return r;
              },
              parseAttributes: function (t, n, o) {
                if (t) {
                  var a,
                    u,
                    g,
                    d = {};
                  void 0 === o && (o = t.getAttribute("svgUid")),
                    t.parentNode &&
                      e.svgValidParentsRegEx.test(t.parentNode.nodeName) &&
                      (d = e.parseAttributes(t.parentNode, n, o));
                  var p = n.reduce(function (e, i) {
                      return (a = t.getAttribute(i)) && (e[i] = a), e;
                    }, {}),
                    C = i(
                      (function (t, i) {
                        var n = {};
                        for (var r in e.cssRules[i])
                          if (f(t, r.split(" ")))
                            for (var s in e.cssRules[i][r])
                              n[s] = e.cssRules[i][r][s];
                        return n;
                      })(t, o),
                      e.parseStyleAttribute(t)
                    );
                  (p = i(p, C)),
                    C["clip-path"] &&
                      t.setAttribute("clip-path", C["clip-path"]),
                    (u = g = d.fontSize || e.Text.DEFAULT_SVG_FONT_SIZE),
                    p["font-size"] &&
                      (p["font-size"] = u = s(p["font-size"], g));
                  var A,
                    v,
                    m = {};
                  for (var I in p) (v = l((A = c(I)), p[I], d, u)), (m[A] = v);
                  m && m.font && e.parseFontDeclaration(m.font, m);
                  var w = i(d, m);
                  return e.svgValidParentsRegEx.test(t.nodeName)
                    ? w
                    : (function (t) {
                        for (var i in h)
                          if (void 0 !== t[h[i]] && "" !== t[i]) {
                            if (void 0 === t[i]) {
                              if (!e.Object.prototype[i]) continue;
                              t[i] = e.Object.prototype[i];
                            }
                            if (0 !== t[i].indexOf("url(")) {
                              var n = new e.Color(t[i]);
                              t[i] = n
                                .setAlpha(r(n.getAlpha() * t[h[i]], 2))
                                .toRgba();
                            }
                          }
                        return t;
                      })(w);
                }
              },
              parseElements: function (t, i, n, r, s) {
                new e.ElementsParser(t, i, n, r, s).parse();
              },
              parseStyleAttribute: function (t) {
                var e = {},
                  i = t.getAttribute("style");
                return i
                  ? ("string" == typeof i
                      ? (function (t, e) {
                          var i, n;
                          t.replace(/;\s*$/, "")
                            .split(";")
                            .forEach(function (t) {
                              var r = t.split(":");
                              (i = r[0].trim().toLowerCase()),
                                (n = r[1].trim()),
                                (e[i] = n);
                            });
                        })(i, e)
                      : (function (t, e) {
                          var i, n;
                          for (var r in t)
                            void 0 !== t[r] &&
                              ((i = r.toLowerCase()), (n = t[r]), (e[i] = n));
                        })(i, e),
                    e)
                  : e;
              },
              parsePointsAttribute: function (t) {
                if (!t) return null;
                var e,
                  i,
                  n = [];
                for (
                  e = 0,
                    i = (t = (t = t.replace(/,/g, " ").trim()).split(/\s+/))
                      .length;
                  e < i;
                  e += 2
                )
                  n.push({ x: parseFloat(t[e]), y: parseFloat(t[e + 1]) });
                return n;
              },
              getCSSRules: function (t) {
                var i,
                  n,
                  r = t.getElementsByTagName("style"),
                  s = {};
                for (i = 0, n = r.length; i < n; i++) {
                  var o = r[i].textContent || "";
                  "" !== (o = o.replace(/\/\*[\s\S]*?\*\//g, "")).trim() &&
                    o
                      .match(/[^{]*\{[\s\S]*?\}/g)
                      .map(function (t) {
                        return t.trim();
                      })
                      .forEach(function (t) {
                        var r = t.match(/([\s\S]*?)\s*\{([^}]*)\}/),
                          o = {},
                          a = r[2]
                            .trim()
                            .replace(/;$/, "")
                            .split(/\s*;\s*/);
                        for (i = 0, n = a.length; i < n; i++) {
                          var h = a[i].split(/\s*:\s*/),
                            c = h[0],
                            l = h[1];
                          o[c] = l;
                        }
                        (t = r[1]).split(",").forEach(function (t) {
                          "" !== (t = t.replace(/^svg/i, "").trim()) &&
                            (s[t]
                              ? e.util.object.extend(s[t], o)
                              : (s[t] = e.util.object.clone(o)));
                        });
                      });
                }
                return s;
              },
              loadSVGFromURL: function (t, i, n, r) {
                (t = t.replace(/^\n\s*/, "").trim()),
                  new e.util.request(t, {
                    method: "get",
                    onComplete: function (t) {
                      var s = t.responseXML;
                      s &&
                        !s.documentElement &&
                        e.window.ActiveXObject &&
                        t.responseText &&
                        (((s = new ActiveXObject("Microsoft.XMLDOM")).async =
                          "false"),
                        s.loadXML(
                          t.responseText.replace(
                            /<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i,
                            ""
                          )
                        ));
                      if (!s || !s.documentElement) return i && i(null), !1;
                      e.parseSVGDocument(
                        s.documentElement,
                        function (t, e, n, r) {
                          i && i(t, e, n, r);
                        },
                        n,
                        r
                      );
                    },
                  });
              },
              loadSVGFromString: function (t, i, n, r) {
                var s;
                if (((t = t.trim()), void 0 !== e.window.DOMParser)) {
                  var o = new e.window.DOMParser();
                  o &&
                    o.parseFromString &&
                    (s = o.parseFromString(t, "text/xml"));
                } else
                  e.window.ActiveXObject &&
                    (((s = new ActiveXObject("Microsoft.XMLDOM")).async =
                      "false"),
                    s.loadXML(
                      t.replace(/<!DOCTYPE[\s\S]*?(\[[\s\S]*\])*?>/i, "")
                    ));
                e.parseSVGDocument(
                  s.documentElement,
                  function (t, e, n, r) {
                    i(t, e, n, r);
                  },
                  n,
                  r
                );
              },
            });
          })(e),
          (b.ElementsParser = function (t, e, i, n, r, s) {
            (this.elements = t),
              (this.callback = e),
              (this.options = i),
              (this.reviver = n),
              (this.svgUid = (i && i.svgUid) || 0),
              (this.parsingOptions = r),
              (this.regexUrl = /^url\(['"]?#([^'"]+)['"]?\)/g),
              (this.doc = s);
          }),
          ((p = b.ElementsParser.prototype).parse = function () {
            (this.instances = new Array(this.elements.length)),
              (this.numElements = this.elements.length),
              this.createObjects();
          }),
          (p.createObjects = function () {
            var t = this;
            this.elements.forEach(function (e, i) {
              e.setAttribute("svgUid", t.svgUid), t.createObject(e, i);
            });
          }),
          (p.findTag = function (t) {
            return b[b.util.string.capitalize(t.tagName.replace("svg:", ""))];
          }),
          (p.createObject = function (t, e) {
            var i = this.findTag(t);
            if (i && i.fromElement)
              try {
                i.fromElement(t, this.createCallback(e, t), this.options);
              } catch (t) {
                b.log(t);
              }
            else this.checkIfDone();
          }),
          (p.createCallback = function (t, e) {
            var i = this;
            return function (n) {
              var r;
              i.resolveGradient(n, e, "fill"),
                i.resolveGradient(n, e, "stroke"),
                n instanceof b.Image &&
                  n._originalElement &&
                  (r = n.parsePreserveAspectRatioAttribute(e)),
                n._removeTransformMatrix(r),
                i.resolveClipPath(n, e),
                i.reviver && i.reviver(e, n),
                (i.instances[t] = n),
                i.checkIfDone();
            };
          }),
          (p.extractPropertyDefinition = function (t, e, i) {
            var n = t[e],
              r = this.regexUrl;
            if (r.test(n)) {
              r.lastIndex = 0;
              var s = r.exec(n)[1];
              return (r.lastIndex = 0), b[i][this.svgUid][s];
            }
          }),
          (p.resolveGradient = function (t, e, i) {
            var n = this.extractPropertyDefinition(t, i, "gradientDefs");
            if (n) {
              var r = e.getAttribute(i + "-opacity"),
                s = b.Gradient.fromElement(n, t, r, this.options);
              t.set(i, s);
            }
          }),
          (p.createClipPathCallback = function (t, e) {
            return function (t) {
              t._removeTransformMatrix(), (t.fillRule = t.clipRule), e.push(t);
            };
          }),
          (p.resolveClipPath = function (t, e) {
            var i,
              n,
              r,
              s,
              o = this.extractPropertyDefinition(t, "clipPath", "clipPaths");
            if (o) {
              (r = []), (n = b.util.invertTransform(t.calcTransformMatrix()));
              for (
                var a = o[0].parentNode, h = e;
                h.parentNode && h.getAttribute("clip-path") !== t.clipPath;

              )
                h = h.parentNode;
              h.parentNode.appendChild(a);
              for (var c = 0; c < o.length; c++)
                (i = o[c]),
                  this.findTag(i).fromElement(
                    i,
                    this.createClipPathCallback(t, r),
                    this.options
                  );
              (o = 1 === r.length ? r[0] : new b.Group(r)),
                (s = b.util.multiplyTransformMatrices(
                  n,
                  o.calcTransformMatrix()
                )),
                o.clipPath && this.resolveClipPath(o, h);
              var l = b.util.qrDecompose(s);
              (o.flipX = !1),
                (o.flipY = !1),
                o.set("scaleX", l.scaleX),
                o.set("scaleY", l.scaleY),
                (o.angle = l.angle),
                (o.skewX = l.skewX),
                (o.skewY = 0),
                o.setPositionByOrigin(
                  { x: l.translateX, y: l.translateY },
                  "center",
                  "center"
                ),
                (t.clipPath = o);
            } else delete t.clipPath;
          }),
          (p.checkIfDone = function () {
            0 == --this.numElements &&
              ((this.instances = this.instances.filter(function (t) {
                return null != t;
              })),
              this.callback(this.instances, this.elements));
          }),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {});
            function i(t, e) {
              (this.x = t), (this.y = e);
            }
            e.Point
              ? e.warn("fabric.Point is already defined")
              : ((e.Point = i),
                (i.prototype = {
                  type: "point",
                  constructor: i,
                  add: function (t) {
                    return new i(this.x + t.x, this.y + t.y);
                  },
                  addEquals: function (t) {
                    return (this.x += t.x), (this.y += t.y), this;
                  },
                  scalarAdd: function (t) {
                    return new i(this.x + t, this.y + t);
                  },
                  scalarAddEquals: function (t) {
                    return (this.x += t), (this.y += t), this;
                  },
                  subtract: function (t) {
                    return new i(this.x - t.x, this.y - t.y);
                  },
                  subtractEquals: function (t) {
                    return (this.x -= t.x), (this.y -= t.y), this;
                  },
                  scalarSubtract: function (t) {
                    return new i(this.x - t, this.y - t);
                  },
                  scalarSubtractEquals: function (t) {
                    return (this.x -= t), (this.y -= t), this;
                  },
                  multiply: function (t) {
                    return new i(this.x * t, this.y * t);
                  },
                  multiplyEquals: function (t) {
                    return (this.x *= t), (this.y *= t), this;
                  },
                  divide: function (t) {
                    return new i(this.x / t, this.y / t);
                  },
                  divideEquals: function (t) {
                    return (this.x /= t), (this.y /= t), this;
                  },
                  eq: function (t) {
                    return this.x === t.x && this.y === t.y;
                  },
                  lt: function (t) {
                    return this.x < t.x && this.y < t.y;
                  },
                  lte: function (t) {
                    return this.x <= t.x && this.y <= t.y;
                  },
                  gt: function (t) {
                    return this.x > t.x && this.y > t.y;
                  },
                  gte: function (t) {
                    return this.x >= t.x && this.y >= t.y;
                  },
                  lerp: function (t, e) {
                    return (
                      void 0 === e && (e = 0.5),
                      (e = Math.max(Math.min(1, e), 0)),
                      new i(
                        this.x + (t.x - this.x) * e,
                        this.y + (t.y - this.y) * e
                      )
                    );
                  },
                  distanceFrom: function (t) {
                    var e = this.x - t.x,
                      i = this.y - t.y;
                    return Math.sqrt(e * e + i * i);
                  },
                  midPointFrom: function (t) {
                    return this.lerp(t);
                  },
                  min: function (t) {
                    return new i(Math.min(this.x, t.x), Math.min(this.y, t.y));
                  },
                  max: function (t) {
                    return new i(Math.max(this.x, t.x), Math.max(this.y, t.y));
                  },
                  toString: function () {
                    return this.x + "," + this.y;
                  },
                  setXY: function (t, e) {
                    return (this.x = t), (this.y = e), this;
                  },
                  setX: function (t) {
                    return (this.x = t), this;
                  },
                  setY: function (t) {
                    return (this.y = t), this;
                  },
                  setFromPoint: function (t) {
                    return (this.x = t.x), (this.y = t.y), this;
                  },
                  swap: function (t) {
                    var e = this.x,
                      i = this.y;
                    (this.x = t.x), (this.y = t.y), (t.x = e), (t.y = i);
                  },
                  clone: function () {
                    return new i(this.x, this.y);
                  },
                }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {});
            function i(t) {
              (this.status = t), (this.points = []);
            }
            e.Intersection
              ? e.warn("fabric.Intersection is already defined")
              : ((e.Intersection = i),
                (e.Intersection.prototype = {
                  constructor: i,
                  appendPoint: function (t) {
                    return this.points.push(t), this;
                  },
                  appendPoints: function (t) {
                    return (this.points = this.points.concat(t)), this;
                  },
                }),
                (e.Intersection.intersectLineLine = function (t, n, r, s) {
                  var o,
                    a = (s.x - r.x) * (t.y - r.y) - (s.y - r.y) * (t.x - r.x),
                    h = (n.x - t.x) * (t.y - r.y) - (n.y - t.y) * (t.x - r.x),
                    c = (s.y - r.y) * (n.x - t.x) - (s.x - r.x) * (n.y - t.y);
                  if (0 !== c) {
                    var l = a / c,
                      u = h / c;
                    0 <= l && l <= 1 && 0 <= u && u <= 1
                      ? (o = new i("Intersection")).appendPoint(
                          new e.Point(
                            t.x + l * (n.x - t.x),
                            t.y + l * (n.y - t.y)
                          )
                        )
                      : (o = new i());
                  } else
                    o = new i(0 === a || 0 === h ? "Coincident" : "Parallel");
                  return o;
                }),
                (e.Intersection.intersectLinePolygon = function (t, e, n) {
                  var r,
                    s,
                    o,
                    a,
                    h = new i(),
                    c = n.length;
                  for (a = 0; a < c; a++)
                    (r = n[a]),
                      (s = n[(a + 1) % c]),
                      (o = i.intersectLineLine(t, e, r, s)),
                      h.appendPoints(o.points);
                  return h.points.length > 0 && (h.status = "Intersection"), h;
                }),
                (e.Intersection.intersectPolygonPolygon = function (t, e) {
                  var n,
                    r = new i(),
                    s = t.length;
                  for (n = 0; n < s; n++) {
                    var o = t[n],
                      a = t[(n + 1) % s],
                      h = i.intersectLinePolygon(o, a, e);
                    r.appendPoints(h.points);
                  }
                  return r.points.length > 0 && (r.status = "Intersection"), r;
                }),
                (e.Intersection.intersectPolygonRectangle = function (t, n, r) {
                  var s = n.min(r),
                    o = n.max(r),
                    a = new e.Point(o.x, s.y),
                    h = new e.Point(s.x, o.y),
                    c = i.intersectLinePolygon(s, a, t),
                    l = i.intersectLinePolygon(a, o, t),
                    u = i.intersectLinePolygon(o, h, t),
                    g = i.intersectLinePolygon(h, s, t),
                    f = new i();
                  return (
                    f.appendPoints(c.points),
                    f.appendPoints(l.points),
                    f.appendPoints(u.points),
                    f.appendPoints(g.points),
                    f.points.length > 0 && (f.status = "Intersection"),
                    f
                  );
                }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {});
            function i(t) {
              t ? this._tryParsingColor(t) : this.setSource([0, 0, 0, 1]);
            }
            function n(t, e, i) {
              return (
                i < 0 && (i += 1),
                i > 1 && (i -= 1),
                i < 1 / 6
                  ? t + 6 * (e - t) * i
                  : i < 0.5
                  ? e
                  : i < 2 / 3
                  ? t + (e - t) * (2 / 3 - i) * 6
                  : t
              );
            }
            e.Color
              ? e.warn("fabric.Color is already defined.")
              : ((e.Color = i),
                (e.Color.prototype = {
                  _tryParsingColor: function (t) {
                    var e;
                    t in i.colorNameMap && (t = i.colorNameMap[t]),
                      "transparent" === t && (e = [255, 255, 255, 0]),
                      e || (e = i.sourceFromHex(t)),
                      e || (e = i.sourceFromRgb(t)),
                      e || (e = i.sourceFromHsl(t)),
                      e || (e = [0, 0, 0, 1]),
                      e && this.setSource(e);
                  },
                  _rgbToHsl: function (t, i, n) {
                    (t /= 255), (i /= 255), (n /= 255);
                    var r,
                      s,
                      o,
                      a = e.util.array.max([t, i, n]),
                      h = e.util.array.min([t, i, n]);
                    if (((o = (a + h) / 2), a === h)) r = s = 0;
                    else {
                      var c = a - h;
                      switch (
                        ((s = o > 0.5 ? c / (2 - a - h) : c / (a + h)), a)
                      ) {
                        case t:
                          r = (i - n) / c + (i < n ? 6 : 0);
                          break;
                        case i:
                          r = (n - t) / c + 2;
                          break;
                        case n:
                          r = (t - i) / c + 4;
                      }
                      r /= 6;
                    }
                    return [
                      Math.round(360 * r),
                      Math.round(100 * s),
                      Math.round(100 * o),
                    ];
                  },
                  getSource: function () {
                    return this._source;
                  },
                  setSource: function (t) {
                    this._source = t;
                  },
                  toRgb: function () {
                    var t = this.getSource();
                    return "rgb(" + t[0] + "," + t[1] + "," + t[2] + ")";
                  },
                  toRgba: function () {
                    var t = this.getSource();
                    return (
                      "rgba(" +
                      t[0] +
                      "," +
                      t[1] +
                      "," +
                      t[2] +
                      "," +
                      t[3] +
                      ")"
                    );
                  },
                  toHsl: function () {
                    var t = this.getSource(),
                      e = this._rgbToHsl(t[0], t[1], t[2]);
                    return "hsl(" + e[0] + "," + e[1] + "%," + e[2] + "%)";
                  },
                  toHsla: function () {
                    var t = this.getSource(),
                      e = this._rgbToHsl(t[0], t[1], t[2]);
                    return (
                      "hsla(" +
                      e[0] +
                      "," +
                      e[1] +
                      "%," +
                      e[2] +
                      "%," +
                      t[3] +
                      ")"
                    );
                  },
                  toHex: function () {
                    var t,
                      e,
                      i,
                      n = this.getSource();
                    return (
                      (t = 1 === (t = n[0].toString(16)).length ? "0" + t : t),
                      (e = 1 === (e = n[1].toString(16)).length ? "0" + e : e),
                      (i = 1 === (i = n[2].toString(16)).length ? "0" + i : i),
                      t.toUpperCase() + e.toUpperCase() + i.toUpperCase()
                    );
                  },
                  toHexa: function () {
                    var t,
                      e = this.getSource();
                    return (
                      (t =
                        1 ===
                        (t = (t = Math.round(255 * e[3])).toString(16)).length
                          ? "0" + t
                          : t),
                      this.toHex() + t.toUpperCase()
                    );
                  },
                  getAlpha: function () {
                    return this.getSource()[3];
                  },
                  setAlpha: function (t) {
                    var e = this.getSource();
                    return (e[3] = t), this.setSource(e), this;
                  },
                  toGrayscale: function () {
                    var t = this.getSource(),
                      e = parseInt(
                        (0.3 * t[0] + 0.59 * t[1] + 0.11 * t[2]).toFixed(0),
                        10
                      ),
                      i = t[3];
                    return this.setSource([e, e, e, i]), this;
                  },
                  toBlackWhite: function (t) {
                    var e = this.getSource(),
                      i = (0.3 * e[0] + 0.59 * e[1] + 0.11 * e[2]).toFixed(0),
                      n = e[3];
                    return (
                      (t = t || 127),
                      (i = Number(i) < Number(t) ? 0 : 255),
                      this.setSource([i, i, i, n]),
                      this
                    );
                  },
                  overlayWith: function (t) {
                    t instanceof i || (t = new i(t));
                    var e,
                      n = [],
                      r = this.getAlpha(),
                      s = this.getSource(),
                      o = t.getSource();
                    for (e = 0; e < 3; e++)
                      n.push(Math.round(0.5 * s[e] + 0.5 * o[e]));
                    return (n[3] = r), this.setSource(n), this;
                  },
                }),
                (e.Color.reRGBa =
                  /^rgba?\(\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*,\s*(\d{1,3}(?:\.\d+)?\%?)\s*(?:\s*,\s*((?:\d*\.?\d+)?)\s*)?\)$/i),
                (e.Color.reHSLa =
                  /^hsla?\(\s*(\d{1,3})\s*,\s*(\d{1,3}\%)\s*,\s*(\d{1,3}\%)\s*(?:\s*,\s*(\d+(?:\.\d+)?)\s*)?\)$/i),
                (e.Color.reHex =
                  /^#?([0-9a-f]{8}|[0-9a-f]{6}|[0-9a-f]{4}|[0-9a-f]{3})$/i),
                (e.Color.colorNameMap = {
                  aliceblue: "#F0F8FF",
                  antiquewhite: "#FAEBD7",
                  aqua: "#00FFFF",
                  aquamarine: "#7FFFD4",
                  azure: "#F0FFFF",
                  beige: "#F5F5DC",
                  bisque: "#FFE4C4",
                  black: "#000000",
                  blanchedalmond: "#FFEBCD",
                  blue: "#0000FF",
                  blueviolet: "#8A2BE2",
                  brown: "#A52A2A",
                  burlywood: "#DEB887",
                  cadetblue: "#5F9EA0",
                  chartreuse: "#7FFF00",
                  chocolate: "#D2691E",
                  coral: "#FF7F50",
                  cornflowerblue: "#6495ED",
                  cornsilk: "#FFF8DC",
                  crimson: "#DC143C",
                  cyan: "#00FFFF",
                  darkblue: "#00008B",
                  darkcyan: "#008B8B",
                  darkgoldenrod: "#B8860B",
                  darkgray: "#A9A9A9",
                  darkgrey: "#A9A9A9",
                  darkgreen: "#006400",
                  darkkhaki: "#BDB76B",
                  darkmagenta: "#8B008B",
                  darkolivegreen: "#556B2F",
                  darkorange: "#FF8C00",
                  darkorchid: "#9932CC",
                  darkred: "#8B0000",
                  darksalmon: "#E9967A",
                  darkseagreen: "#8FBC8F",
                  darkslateblue: "#483D8B",
                  darkslategray: "#2F4F4F",
                  darkslategrey: "#2F4F4F",
                  darkturquoise: "#00CED1",
                  darkviolet: "#9400D3",
                  deeppink: "#FF1493",
                  deepskyblue: "#00BFFF",
                  dimgray: "#696969",
                  dimgrey: "#696969",
                  dodgerblue: "#1E90FF",
                  firebrick: "#B22222",
                  floralwhite: "#FFFAF0",
                  forestgreen: "#228B22",
                  fuchsia: "#FF00FF",
                  gainsboro: "#DCDCDC",
                  ghostwhite: "#F8F8FF",
                  gold: "#FFD700",
                  goldenrod: "#DAA520",
                  gray: "#808080",
                  grey: "#808080",
                  green: "#008000",
                  greenyellow: "#ADFF2F",
                  honeydew: "#F0FFF0",
                  hotpink: "#FF69B4",
                  indianred: "#CD5C5C",
                  indigo: "#4B0082",
                  ivory: "#FFFFF0",
                  khaki: "#F0E68C",
                  lavender: "#E6E6FA",
                  lavenderblush: "#FFF0F5",
                  lawngreen: "#7CFC00",
                  lemonchiffon: "#FFFACD",
                  lightblue: "#ADD8E6",
                  lightcoral: "#F08080",
                  lightcyan: "#E0FFFF",
                  lightgoldenrodyellow: "#FAFAD2",
                  lightgray: "#D3D3D3",
                  lightgrey: "#D3D3D3",
                  lightgreen: "#90EE90",
                  lightpink: "#FFB6C1",
                  lightsalmon: "#FFA07A",
                  lightseagreen: "#20B2AA",
                  lightskyblue: "#87CEFA",
                  lightslategray: "#778899",
                  lightslategrey: "#778899",
                  lightsteelblue: "#B0C4DE",
                  lightyellow: "#FFFFE0",
                  lime: "#00FF00",
                  limegreen: "#32CD32",
                  linen: "#FAF0E6",
                  magenta: "#FF00FF",
                  maroon: "#800000",
                  mediumaquamarine: "#66CDAA",
                  mediumblue: "#0000CD",
                  mediumorchid: "#BA55D3",
                  mediumpurple: "#9370DB",
                  mediumseagreen: "#3CB371",
                  mediumslateblue: "#7B68EE",
                  mediumspringgreen: "#00FA9A",
                  mediumturquoise: "#48D1CC",
                  mediumvioletred: "#C71585",
                  midnightblue: "#191970",
                  mintcream: "#F5FFFA",
                  mistyrose: "#FFE4E1",
                  moccasin: "#FFE4B5",
                  navajowhite: "#FFDEAD",
                  navy: "#000080",
                  oldlace: "#FDF5E6",
                  olive: "#808000",
                  olivedrab: "#6B8E23",
                  orange: "#FFA500",
                  orangered: "#FF4500",
                  orchid: "#DA70D6",
                  palegoldenrod: "#EEE8AA",
                  palegreen: "#98FB98",
                  paleturquoise: "#AFEEEE",
                  palevioletred: "#DB7093",
                  papayawhip: "#FFEFD5",
                  peachpuff: "#FFDAB9",
                  peru: "#CD853F",
                  pink: "#FFC0CB",
                  plum: "#DDA0DD",
                  powderblue: "#B0E0E6",
                  purple: "#800080",
                  rebeccapurple: "#663399",
                  red: "#FF0000",
                  rosybrown: "#BC8F8F",
                  royalblue: "#4169E1",
                  saddlebrown: "#8B4513",
                  salmon: "#FA8072",
                  sandybrown: "#F4A460",
                  seagreen: "#2E8B57",
                  seashell: "#FFF5EE",
                  sienna: "#A0522D",
                  silver: "#C0C0C0",
                  skyblue: "#87CEEB",
                  slateblue: "#6A5ACD",
                  slategray: "#708090",
                  slategrey: "#708090",
                  snow: "#FFFAFA",
                  springgreen: "#00FF7F",
                  steelblue: "#4682B4",
                  tan: "#D2B48C",
                  teal: "#008080",
                  thistle: "#D8BFD8",
                  tomato: "#FF6347",
                  turquoise: "#40E0D0",
                  violet: "#EE82EE",
                  wheat: "#F5DEB3",
                  white: "#FFFFFF",
                  whitesmoke: "#F5F5F5",
                  yellow: "#FFFF00",
                  yellowgreen: "#9ACD32",
                }),
                (e.Color.fromRgb = function (t) {
                  return i.fromSource(i.sourceFromRgb(t));
                }),
                (e.Color.sourceFromRgb = function (t) {
                  var e = t.match(i.reRGBa);
                  if (e) {
                    var n =
                        (parseInt(e[1], 10) / (/%$/.test(e[1]) ? 100 : 1)) *
                        (/%$/.test(e[1]) ? 255 : 1),
                      r =
                        (parseInt(e[2], 10) / (/%$/.test(e[2]) ? 100 : 1)) *
                        (/%$/.test(e[2]) ? 255 : 1),
                      s =
                        (parseInt(e[3], 10) / (/%$/.test(e[3]) ? 100 : 1)) *
                        (/%$/.test(e[3]) ? 255 : 1);
                    return [
                      parseInt(n, 10),
                      parseInt(r, 10),
                      parseInt(s, 10),
                      e[4] ? parseFloat(e[4]) : 1,
                    ];
                  }
                }),
                (e.Color.fromRgba = i.fromRgb),
                (e.Color.fromHsl = function (t) {
                  return i.fromSource(i.sourceFromHsl(t));
                }),
                (e.Color.sourceFromHsl = function (t) {
                  var e = t.match(i.reHSLa);
                  if (e) {
                    var r,
                      s,
                      o,
                      a = (((parseFloat(e[1]) % 360) + 360) % 360) / 360,
                      h = parseFloat(e[2]) / (/%$/.test(e[2]) ? 100 : 1),
                      c = parseFloat(e[3]) / (/%$/.test(e[3]) ? 100 : 1);
                    if (0 === h) r = s = o = c;
                    else {
                      var l = c <= 0.5 ? c * (h + 1) : c + h - c * h,
                        u = 2 * c - l;
                      (r = n(u, l, a + 1 / 3)),
                        (s = n(u, l, a)),
                        (o = n(u, l, a - 1 / 3));
                    }
                    return [
                      Math.round(255 * r),
                      Math.round(255 * s),
                      Math.round(255 * o),
                      e[4] ? parseFloat(e[4]) : 1,
                    ];
                  }
                }),
                (e.Color.fromHsla = i.fromHsl),
                (e.Color.fromHex = function (t) {
                  return i.fromSource(i.sourceFromHex(t));
                }),
                (e.Color.sourceFromHex = function (t) {
                  if (t.match(i.reHex)) {
                    var e = t.slice(t.indexOf("#") + 1),
                      n = 3 === e.length || 4 === e.length,
                      r = 8 === e.length || 4 === e.length,
                      s = n ? e.charAt(0) + e.charAt(0) : e.substring(0, 2),
                      o = n ? e.charAt(1) + e.charAt(1) : e.substring(2, 4),
                      a = n ? e.charAt(2) + e.charAt(2) : e.substring(4, 6),
                      h = r
                        ? n
                          ? e.charAt(3) + e.charAt(3)
                          : e.substring(6, 8)
                        : "FF";
                    return [
                      parseInt(s, 16),
                      parseInt(o, 16),
                      parseInt(a, 16),
                      parseFloat((parseInt(h, 16) / 255).toFixed(2)),
                    ];
                  }
                }),
                (e.Color.fromSource = function (t) {
                  var e = new i();
                  return e.setSource(t), e;
                }));
          })(e),
          (function () {
            function t(t, e) {
              var i,
                n,
                r,
                s,
                o = t.getAttribute("style"),
                a = t.getAttribute("offset") || 0;
              if (
                ((a =
                  (a = parseFloat(a) / (/%$/.test(a) ? 100 : 1)) < 0
                    ? 0
                    : a > 1
                    ? 1
                    : a),
                o)
              ) {
                var h = o.split(/\s*;\s*/);
                for ("" === h[h.length - 1] && h.pop(), s = h.length; s--; ) {
                  var c = h[s].split(/\s*:\s*/),
                    l = c[0].trim(),
                    u = c[1].trim();
                  "stop-color" === l
                    ? (i = u)
                    : "stop-opacity" === l && (r = u);
                }
              }
              return (
                i || (i = t.getAttribute("stop-color") || "rgb(0,0,0)"),
                r || (r = t.getAttribute("stop-opacity")),
                (n = (i = new b.Color(i)).getAlpha()),
                (r = isNaN(parseFloat(r)) ? 1 : parseFloat(r)),
                (r *= n * e),
                { offset: a, color: i.toRgb(), opacity: r }
              );
            }
            var e = b.util.object.clone;
            function i(t, e, i, n) {
              var r, s;
              Object.keys(e).forEach(function (t) {
                "Infinity" === (r = e[t])
                  ? (s = 1)
                  : "-Infinity" === r
                  ? (s = 0)
                  : ((s = parseFloat(e[t], 10)),
                    "string" == typeof r &&
                      /^(\d+\.\d+)%|(\d+)%$/.test(r) &&
                      ((s *= 0.01),
                      "pixels" === n &&
                        (("x1" !== t && "x2" !== t && "r2" !== t) ||
                          (s *= i.viewBoxWidth || i.width),
                        ("y1" !== t && "y2" !== t) ||
                          (s *= i.viewBoxHeight || i.height)))),
                  (e[t] = s);
              });
            }
            (b.Gradient = b.util.createClass({
              offsetX: 0,
              offsetY: 0,
              gradientTransform: null,
              gradientUnits: "pixels",
              type: "linear",
              initialize: function (t) {
                t || (t = {}), t.coords || (t.coords = {});
                var e,
                  i = this;
                Object.keys(t).forEach(function (e) {
                  i[e] = t[e];
                }),
                  this.id
                    ? (this.id += "_" + b.Object.__uid++)
                    : (this.id = b.Object.__uid++),
                  (e = {
                    x1: t.coords.x1 || 0,
                    y1: t.coords.y1 || 0,
                    x2: t.coords.x2 || 0,
                    y2: t.coords.y2 || 0,
                  }),
                  "radial" === this.type &&
                    ((e.r1 = t.coords.r1 || 0), (e.r2 = t.coords.r2 || 0)),
                  (this.coords = e),
                  (this.colorStops = t.colorStops.slice());
              },
              addColorStop: function (t) {
                for (var e in t) {
                  var i = new b.Color(t[e]);
                  this.colorStops.push({
                    offset: parseFloat(e),
                    color: i.toRgb(),
                    opacity: i.getAlpha(),
                  });
                }
                return this;
              },
              toObject: function (t) {
                var e = {
                  type: this.type,
                  coords: this.coords,
                  colorStops: this.colorStops,
                  offsetX: this.offsetX,
                  offsetY: this.offsetY,
                  gradientUnits: this.gradientUnits,
                  gradientTransform: this.gradientTransform
                    ? this.gradientTransform.concat()
                    : this.gradientTransform,
                };
                return b.util.populateWithProperties(this, e, t), e;
              },
              toSVG: function (t, i) {
                var n,
                  r,
                  s,
                  o,
                  a = e(this.coords, !0),
                  h = ((i = i || {}), e(this.colorStops, !0)),
                  c = a.r1 > a.r2,
                  l = this.gradientTransform
                    ? this.gradientTransform.concat()
                    : b.iMatrix.concat(),
                  u = -this.offsetX,
                  g = -this.offsetY,
                  f = !!i.additionalTransform,
                  d =
                    "pixels" === this.gradientUnits
                      ? "userSpaceOnUse"
                      : "objectBoundingBox";
                if (
                  (h.sort(function (t, e) {
                    return t.offset - e.offset;
                  }),
                  "objectBoundingBox" === d
                    ? ((u /= t.width), (g /= t.height))
                    : ((u += t.width / 2), (g += t.height / 2)),
                  "path" === t.type &&
                    ((u -= t.pathOffset.x), (g -= t.pathOffset.y)),
                  (l[4] -= u),
                  (l[5] -= g),
                  (o = 'id="SVGID_' + this.id + '" gradientUnits="' + d + '"'),
                  (o +=
                    ' gradientTransform="' +
                    (f ? i.additionalTransform + " " : "") +
                    b.util.matrixToSVG(l) +
                    '" '),
                  "linear" === this.type
                    ? (s = [
                        "<linearGradient ",
                        o,
                        ' x1="',
                        a.x1,
                        '" y1="',
                        a.y1,
                        '" x2="',
                        a.x2,
                        '" y2="',
                        a.y2,
                        '">\n',
                      ])
                    : "radial" === this.type &&
                      (s = [
                        "<radialGradient ",
                        o,
                        ' cx="',
                        c ? a.x1 : a.x2,
                        '" cy="',
                        c ? a.y1 : a.y2,
                        '" r="',
                        c ? a.r1 : a.r2,
                        '" fx="',
                        c ? a.x2 : a.x1,
                        '" fy="',
                        c ? a.y2 : a.y1,
                        '">\n',
                      ]),
                  "radial" === this.type)
                ) {
                  if (c)
                    for (
                      (h = h.concat()).reverse(), n = 0, r = h.length;
                      n < r;
                      n++
                    )
                      h[n].offset = 1 - h[n].offset;
                  var p = Math.min(a.r1, a.r2);
                  if (p > 0) {
                    var C = p / Math.max(a.r1, a.r2);
                    for (n = 0, r = h.length; n < r; n++)
                      h[n].offset += C * (1 - h[n].offset);
                  }
                }
                for (n = 0, r = h.length; n < r; n++) {
                  var A = h[n];
                  s.push(
                    "<stop ",
                    'offset="',
                    100 * A.offset + "%",
                    '" style="stop-color:',
                    A.color,
                    void 0 !== A.opacity ? ";stop-opacity: " + A.opacity : ";",
                    '"/>\n'
                  );
                }
                return (
                  s.push(
                    "linear" === this.type
                      ? "</linearGradient>\n"
                      : "</radialGradient>\n"
                  ),
                  s.join("")
                );
              },
              toLive: function (t, e) {
                var i,
                  n,
                  r,
                  s = b.util.object.clone(this.coords),
                  o = s.x1,
                  a = s.y1,
                  h = s.x2,
                  c = s.y2,
                  l = this.colorStops;
                if (this.type) {
                  for (
                    e instanceof b.Text &&
                      "percentage" === this.gradientUnits &&
                      ((o *= e.width),
                      (a *= e.height),
                      (h *= e.width),
                      (c *= e.height)),
                      "linear" === this.type
                        ? (i = t.createLinearGradient(o, a, h, c))
                        : "radial" === this.type &&
                          (i = t.createRadialGradient(o, a, s.r1, h, c, s.r2)),
                      n = 0,
                      r = l.length;
                    n < r;
                    n++
                  ) {
                    var u = l[n].color,
                      g = l[n].opacity,
                      f = l[n].offset;
                    void 0 !== g && (u = new b.Color(u).setAlpha(g).toRgba()),
                      i.addColorStop(f, u);
                  }
                  return i;
                }
              },
            })),
              b.util.object.extend(b.Gradient, {
                fromElement: function (e, n, r, s) {
                  var o = parseFloat(r) / (/%$/.test(r) ? 100 : 1);
                  (o = o < 0 ? 0 : o > 1 ? 1 : o), isNaN(o) && (o = 1);
                  var a,
                    h,
                    c,
                    l,
                    u = e.getElementsByTagName("stop"),
                    g =
                      "userSpaceOnUse" === e.getAttribute("gradientUnits")
                        ? "pixels"
                        : "percentage",
                    f = e.getAttribute("gradientTransform") || "",
                    d = [],
                    p = 0,
                    C = 0;
                  for (
                    "linearGradient" === e.nodeName ||
                    "LINEARGRADIENT" === e.nodeName
                      ? ((a = "linear"),
                        (h = (function (t) {
                          return {
                            x1: t.getAttribute("x1") || 0,
                            y1: t.getAttribute("y1") || 0,
                            x2: t.getAttribute("x2") || "100%",
                            y2: t.getAttribute("y2") || 0,
                          };
                        })(e)))
                      : ((a = "radial"),
                        (h = (function (t) {
                          return {
                            x1:
                              t.getAttribute("fx") ||
                              t.getAttribute("cx") ||
                              "50%",
                            y1:
                              t.getAttribute("fy") ||
                              t.getAttribute("cy") ||
                              "50%",
                            r1: 0,
                            x2: t.getAttribute("cx") || "50%",
                            y2: t.getAttribute("cy") || "50%",
                            r2: t.getAttribute("r") || "50%",
                          };
                        })(e))),
                      c = u.length;
                    c--;

                  )
                    d.push(t(u[c], o));
                  return (
                    (l = b.parseTransformAttribute(f)),
                    i(n, h, s, g),
                    "pixels" === g && ((p = -n.left), (C = -n.top)),
                    new b.Gradient({
                      id: e.getAttribute("id"),
                      type: a,
                      coords: h,
                      colorStops: d,
                      gradientUnits: g,
                      gradientTransform: l,
                      offsetX: p,
                      offsetY: C,
                    })
                  );
                },
                forObject: function (t, e) {
                  return (
                    e || (e = {}),
                    i(t, e.coords, e.gradientUnits, {
                      viewBoxWidth: 100,
                      viewBoxHeight: 100,
                    }),
                    new b.Gradient(e)
                  );
                },
              });
          })(),
          (function () {
            "use strict";
            var t = b.util.toFixed;
            b.Pattern = b.util.createClass({
              repeat: "repeat",
              offsetX: 0,
              offsetY: 0,
              crossOrigin: "",
              patternTransform: null,
              initialize: function (t, e) {
                if (
                  (t || (t = {}),
                  (this.id = b.Object.__uid++),
                  this.setOptions(t),
                  !t.source || (t.source && "string" != typeof t.source))
                )
                  e && e(this);
                else if (void 0 !== b.util.getFunctionBody(t.source))
                  (this.source = new Function(
                    b.util.getFunctionBody(t.source)
                  )),
                    e && e(this);
                else {
                  var i = this;
                  (this.source = b.util.createImage()),
                    b.util.loadImage(
                      t.source,
                      function (t) {
                        (i.source = t), e && e(i);
                      },
                      null,
                      this.crossOrigin
                    );
                }
              },
              toObject: function (e) {
                var i,
                  n,
                  r = b.Object.NUM_FRACTION_DIGITS;
                return (
                  "function" == typeof this.source
                    ? (i = String(this.source))
                    : "string" == typeof this.source.src
                    ? (i = this.source.src)
                    : "object" == typeof this.source &&
                      this.source.toDataURL &&
                      (i = this.source.toDataURL()),
                  (n = {
                    type: "pattern",
                    source: i,
                    repeat: this.repeat,
                    crossOrigin: this.crossOrigin,
                    offsetX: t(this.offsetX, r),
                    offsetY: t(this.offsetY, r),
                    patternTransform: this.patternTransform
                      ? this.patternTransform.concat()
                      : null,
                  }),
                  b.util.populateWithProperties(this, n, e),
                  n
                );
              },
              toSVG: function (t) {
                var e =
                    "function" == typeof this.source
                      ? this.source()
                      : this.source,
                  i = e.width / t.width,
                  n = e.height / t.height,
                  r = this.offsetX / t.width,
                  s = this.offsetY / t.height,
                  o = "";
                return (
                  ("repeat-x" !== this.repeat && "no-repeat" !== this.repeat) ||
                    ((n = 1), s && (n += Math.abs(s))),
                  ("repeat-y" !== this.repeat && "no-repeat" !== this.repeat) ||
                    ((i = 1), r && (i += Math.abs(r))),
                  e.src ? (o = e.src) : e.toDataURL && (o = e.toDataURL()),
                  '<pattern id="SVGID_' +
                    this.id +
                    '" x="' +
                    r +
                    '" y="' +
                    s +
                    '" width="' +
                    i +
                    '" height="' +
                    n +
                    '">\n<image x="0" y="0" width="' +
                    e.width +
                    '" height="' +
                    e.height +
                    '" xlink:href="' +
                    o +
                    '"></image>\n</pattern>\n'
                );
              },
              setOptions: function (t) {
                for (var e in t) this[e] = t[e];
              },
              toLive: function (t) {
                var e =
                  "function" == typeof this.source
                    ? this.source()
                    : this.source;
                if (!e) return "";
                if (void 0 !== e.src) {
                  if (!e.complete) return "";
                  if (0 === e.naturalWidth || 0 === e.naturalHeight) return "";
                }
                return t.createPattern(e, this.repeat);
              },
            });
          })(),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.toFixed;
            e.Shadow
              ? e.warn("fabric.Shadow is already defined.")
              : ((e.Shadow = e.util.createClass({
                  color: "rgb(0,0,0)",
                  blur: 0,
                  offsetX: 0,
                  offsetY: 0,
                  affectStroke: !1,
                  includeDefaultValues: !0,
                  nonScaling: !1,
                  initialize: function (t) {
                    for (var i in ("string" == typeof t &&
                      (t = this._parseShadow(t)),
                    t))
                      this[i] = t[i];
                    this.id = e.Object.__uid++;
                  },
                  _parseShadow: function (t) {
                    var i = t.trim(),
                      n = e.Shadow.reOffsetsAndBlur.exec(i) || [];
                    return {
                      color: (
                        i.replace(e.Shadow.reOffsetsAndBlur, "") || "rgb(0,0,0)"
                      ).trim(),
                      offsetX: parseInt(n[1], 10) || 0,
                      offsetY: parseInt(n[2], 10) || 0,
                      blur: parseInt(n[3], 10) || 0,
                    };
                  },
                  toString: function () {
                    return [
                      this.offsetX,
                      this.offsetY,
                      this.blur,
                      this.color,
                    ].join("px ");
                  },
                  toSVG: function (t) {
                    var n = 40,
                      r = 40,
                      s = e.Object.NUM_FRACTION_DIGITS,
                      o = e.util.rotateVector(
                        { x: this.offsetX, y: this.offsetY },
                        e.util.degreesToRadians(-t.angle)
                      ),
                      a = new e.Color(this.color);
                    return (
                      t.width &&
                        t.height &&
                        ((n =
                          100 * i((Math.abs(o.x) + this.blur) / t.width, s) +
                          20),
                        (r =
                          100 * i((Math.abs(o.y) + this.blur) / t.height, s) +
                          20)),
                      t.flipX && (o.x *= -1),
                      t.flipY && (o.y *= -1),
                      '<filter id="SVGID_' +
                        this.id +
                        '" y="-' +
                        r +
                        '%" height="' +
                        (100 + 2 * r) +
                        '%" x="-' +
                        n +
                        '%" width="' +
                        (100 + 2 * n) +
                        '%" >\n\t<feGaussianBlur in="SourceAlpha" stdDeviation="' +
                        i(this.blur ? this.blur / 2 : 0, s) +
                        '"></feGaussianBlur>\n\t<feOffset dx="' +
                        i(o.x, s) +
                        '" dy="' +
                        i(o.y, s) +
                        '" result="oBlur" ></feOffset>\n\t<feFlood flood-color="' +
                        a.toRgb() +
                        '" flood-opacity="' +
                        a.getAlpha() +
                        '"/>\n\t<feComposite in2="oBlur" operator="in" />\n\t<feMerge>\n\t\t<feMergeNode></feMergeNode>\n\t\t<feMergeNode in="SourceGraphic"></feMergeNode>\n\t</feMerge>\n</filter>\n'
                    );
                  },
                  toObject: function () {
                    if (this.includeDefaultValues)
                      return {
                        color: this.color,
                        blur: this.blur,
                        offsetX: this.offsetX,
                        offsetY: this.offsetY,
                        affectStroke: this.affectStroke,
                        nonScaling: this.nonScaling,
                      };
                    var t = {},
                      i = e.Shadow.prototype;
                    return (
                      [
                        "color",
                        "blur",
                        "offsetX",
                        "offsetY",
                        "affectStroke",
                        "nonScaling",
                      ].forEach(function (e) {
                        this[e] !== i[e] && (t[e] = this[e]);
                      }, this),
                      t
                    );
                  },
                })),
                (e.Shadow.reOffsetsAndBlur =
                  /(?:\s|^)(-?\d+(?:px)?(?:\s?|$))?(-?\d+(?:px)?(?:\s?|$))?(\d+(?:px)?)?(?:\s?|$)(?:$|\s)/));
          })(e),
          (function () {
            "use strict";
            if (b.StaticCanvas)
              b.warn("fabric.StaticCanvas is already defined.");
            else {
              var t = b.util.object.extend,
                e = b.util.getElementOffset,
                i = b.util.removeFromArray,
                n = b.util.toFixed,
                r = b.util.transformPoint,
                s = b.util.invertTransform,
                o = b.util.getNodeCanvas,
                a = b.util.createCanvasElement,
                h = new Error("Could not initialize `canvas` element");
              (b.StaticCanvas = b.util.createClass(b.CommonMethods, {
                initialize: function (t, e) {
                  e || (e = {}),
                    (this.renderAndResetBound = this.renderAndReset.bind(this)),
                    (this.requestRenderAllBound =
                      this.requestRenderAll.bind(this)),
                    this._initStatic(t, e);
                },
                backgroundColor: "",
                backgroundImage: null,
                overlayColor: "",
                overlayImage: null,
                includeDefaultValues: !0,
                stateful: !1,
                renderOnAddRemove: !0,
                clipTo: null,
                controlsAboveOverlay: !1,
                allowTouchScrolling: !1,
                imageSmoothingEnabled: !0,
                viewportTransform: b.iMatrix.concat(),
                backgroundVpt: !0,
                overlayVpt: !0,
                onBeforeScaleRotate: function () {},
                enableRetinaScaling: !0,
                vptCoords: {},
                skipOffscreen: !0,
                clipPath: void 0,
                _initStatic: function (t, e) {
                  var i = this.requestRenderAllBound;
                  (this._objects = []),
                    this._createLowerCanvas(t),
                    this._initOptions(e),
                    this._setImageSmoothing(),
                    this.interactive || this._initRetinaScaling(),
                    e.overlayImage && this.setOverlayImage(e.overlayImage, i),
                    e.backgroundImage &&
                      this.setBackgroundImage(e.backgroundImage, i),
                    e.backgroundColor &&
                      this.setBackgroundColor(e.backgroundColor, i),
                    e.overlayColor && this.setOverlayColor(e.overlayColor, i),
                    this.calcOffset();
                },
                _isRetinaScaling: function () {
                  return 1 !== b.devicePixelRatio && this.enableRetinaScaling;
                },
                getRetinaScaling: function () {
                  return this._isRetinaScaling() ? b.devicePixelRatio : 1;
                },
                _initRetinaScaling: function () {
                  if (this._isRetinaScaling()) {
                    var t = b.devicePixelRatio;
                    this.__initRetinaScaling(
                      t,
                      this.lowerCanvasEl,
                      this.contextContainer
                    ),
                      this.upperCanvasEl &&
                        this.__initRetinaScaling(
                          t,
                          this.upperCanvasEl,
                          this.contextTop
                        );
                  }
                },
                __initRetinaScaling: function (t, e, i) {
                  e.setAttribute("width", this.width * t),
                    e.setAttribute("height", this.height * t),
                    i.scale(t, t);
                },
                calcOffset: function () {
                  return (this._offset = e(this.lowerCanvasEl)), this;
                },
                setOverlayImage: function (t, e, i) {
                  return this.__setBgOverlayImage("overlayImage", t, e, i);
                },
                setBackgroundImage: function (t, e, i) {
                  return this.__setBgOverlayImage("backgroundImage", t, e, i);
                },
                setOverlayColor: function (t, e) {
                  return this.__setBgOverlayColor("overlayColor", t, e);
                },
                setBackgroundColor: function (t, e) {
                  return this.__setBgOverlayColor("backgroundColor", t, e);
                },
                _setImageSmoothing: function () {
                  var t = this.getContext();
                  (t.imageSmoothingEnabled =
                    t.imageSmoothingEnabled ||
                    t.webkitImageSmoothingEnabled ||
                    t.mozImageSmoothingEnabled ||
                    t.msImageSmoothingEnabled ||
                    t.oImageSmoothingEnabled),
                    (t.imageSmoothingEnabled = this.imageSmoothingEnabled);
                },
                __setBgOverlayImage: function (t, e, i, n) {
                  return (
                    "string" == typeof e
                      ? b.util.loadImage(
                          e,
                          function (e) {
                            if (e) {
                              var r = new b.Image(e, n);
                              (this[t] = r), (r.canvas = this);
                            }
                            i && i(e);
                          },
                          this,
                          n && n.crossOrigin
                        )
                      : (n && e.setOptions(n),
                        (this[t] = e),
                        e && (e.canvas = this),
                        i && i(e)),
                    this
                  );
                },
                __setBgOverlayColor: function (t, e, i) {
                  return (
                    (this[t] = e),
                    this._initGradient(e, t),
                    this._initPattern(e, t, i),
                    this
                  );
                },
                _createCanvasElement: function () {
                  var t = a();
                  if (!t) throw h;
                  if ((t.style || (t.style = {}), void 0 === t.getContext))
                    throw h;
                  return t;
                },
                _initOptions: function (t) {
                  var e = this.lowerCanvasEl;
                  this._setOptions(t),
                    (this.width = this.width || parseInt(e.width, 10) || 0),
                    (this.height = this.height || parseInt(e.height, 10) || 0),
                    this.lowerCanvasEl.style &&
                      ((e.width = this.width),
                      (e.height = this.height),
                      (e.style.width = this.width + "px"),
                      (e.style.height = this.height + "px"),
                      (this.viewportTransform =
                        this.viewportTransform.slice()));
                },
                _createLowerCanvas: function (t) {
                  t && t.getContext
                    ? (this.lowerCanvasEl = t)
                    : (this.lowerCanvasEl =
                        b.util.getById(t) || this._createCanvasElement()),
                    b.util.addClass(this.lowerCanvasEl, "lower-canvas"),
                    this.interactive &&
                      this._applyCanvasStyle(this.lowerCanvasEl),
                    (this.contextContainer =
                      this.lowerCanvasEl.getContext("2d"));
                },
                getWidth: function () {
                  return this.width;
                },
                getHeight: function () {
                  return this.height;
                },
                setWidth: function (t, e) {
                  return this.setDimensions({ width: t }, e);
                },
                setHeight: function (t, e) {
                  return this.setDimensions({ height: t }, e);
                },
                setDimensions: function (t, e) {
                  var i;
                  for (var n in ((e = e || {}), t))
                    (i = t[n]),
                      e.cssOnly ||
                        (this._setBackstoreDimension(n, t[n]),
                        (i += "px"),
                        (this.hasLostContext = !0)),
                      e.backstoreOnly || this._setCssDimension(n, i);
                  return (
                    this._isCurrentlyDrawing &&
                      this.freeDrawingBrush &&
                      this.freeDrawingBrush._setBrushStyles(),
                    this._initRetinaScaling(),
                    this._setImageSmoothing(),
                    this.calcOffset(),
                    e.cssOnly || this.requestRenderAll(),
                    this
                  );
                },
                _setBackstoreDimension: function (t, e) {
                  return (
                    (this.lowerCanvasEl[t] = e),
                    this.upperCanvasEl && (this.upperCanvasEl[t] = e),
                    this.cacheCanvasEl && (this.cacheCanvasEl[t] = e),
                    (this[t] = e),
                    this
                  );
                },
                _setCssDimension: function (t, e) {
                  return (
                    (this.lowerCanvasEl.style[t] = e),
                    this.upperCanvasEl && (this.upperCanvasEl.style[t] = e),
                    this.wrapperEl && (this.wrapperEl.style[t] = e),
                    this
                  );
                },
                getZoom: function () {
                  return this.viewportTransform[0];
                },
                setViewportTransform: function (t) {
                  var e,
                    i,
                    n,
                    r = this._activeObject;
                  for (
                    this.viewportTransform = t, i = 0, n = this._objects.length;
                    i < n;
                    i++
                  )
                    (e = this._objects[i]).group || e.setCoords(!1, !0);
                  return (
                    r && "activeSelection" === r.type && r.setCoords(!1, !0),
                    this.calcViewportBoundaries(),
                    this.renderOnAddRemove && this.requestRenderAll(),
                    this
                  );
                },
                zoomToPoint: function (t, e) {
                  var i = t,
                    n = this.viewportTransform.slice(0);
                  (t = r(t, s(this.viewportTransform))), (n[0] = e), (n[3] = e);
                  var o = r(t, n);
                  return (
                    (n[4] += i.x - o.x),
                    (n[5] += i.y - o.y),
                    this.setViewportTransform(n)
                  );
                },
                setZoom: function (t) {
                  return this.zoomToPoint(new b.Point(0, 0), t), this;
                },
                absolutePan: function (t) {
                  var e = this.viewportTransform.slice(0);
                  return (
                    (e[4] = -t.x), (e[5] = -t.y), this.setViewportTransform(e)
                  );
                },
                relativePan: function (t) {
                  return this.absolutePan(
                    new b.Point(
                      -t.x - this.viewportTransform[4],
                      -t.y - this.viewportTransform[5]
                    )
                  );
                },
                getElement: function () {
                  return this.lowerCanvasEl;
                },
                _onObjectAdded: function (t) {
                  this.stateful && t.setupState(),
                    t._set("canvas", this),
                    t.setCoords(),
                    this.fire("object:added", { target: t }),
                    t.fire("added");
                },
                _onObjectRemoved: function (t) {
                  this.fire("object:removed", { target: t }),
                    t.fire("removed"),
                    delete t.canvas;
                },
                clearContext: function (t) {
                  return t.clearRect(0, 0, this.width, this.height), this;
                },
                getContext: function () {
                  return this.contextContainer;
                },
                clear: function () {
                  return (
                    (this._objects.length = 0),
                    (this.backgroundImage = null),
                    (this.overlayImage = null),
                    (this.backgroundColor = ""),
                    (this.overlayColor = ""),
                    this._hasITextHandlers &&
                      (this.off("mouse:up", this._mouseUpITextHandler),
                      (this._iTextInstances = null),
                      (this._hasITextHandlers = !1)),
                    this.clearContext(this.contextContainer),
                    this.fire("canvas:cleared"),
                    this.renderOnAddRemove && this.requestRenderAll(),
                    this
                  );
                },
                renderAll: function () {
                  var t = this.contextContainer;
                  return this.renderCanvas(t, this._objects), this;
                },
                renderAndReset: function () {
                  (this.isRendering = 0), this.renderAll();
                },
                requestRenderAll: function () {
                  return (
                    this.isRendering ||
                      (this.isRendering = b.util.requestAnimFrame(
                        this.renderAndResetBound
                      )),
                    this
                  );
                },
                calcViewportBoundaries: function () {
                  var t = {},
                    e = this.width,
                    i = this.height,
                    n = s(this.viewportTransform);
                  return (
                    (t.tl = r({ x: 0, y: 0 }, n)),
                    (t.br = r({ x: e, y: i }, n)),
                    (t.tr = new b.Point(t.br.x, t.tl.y)),
                    (t.bl = new b.Point(t.tl.x, t.br.y)),
                    (this.vptCoords = t),
                    t
                  );
                },
                cancelRequestedRender: function () {
                  this.isRendering &&
                    (b.util.cancelAnimFrame(this.isRendering),
                    (this.isRendering = 0));
                },
                renderCanvas: function (t, e) {
                  var i = this.viewportTransform,
                    n = this.clipPath;
                  this.cancelRequestedRender(),
                    this.calcViewportBoundaries(),
                    this.clearContext(t),
                    this.fire("before:render", { ctx: t }),
                    this.clipTo && b.util.clipContext(this, t),
                    this._renderBackground(t),
                    t.save(),
                    t.transform(i[0], i[1], i[2], i[3], i[4], i[5]),
                    this._renderObjects(t, e),
                    t.restore(),
                    !this.controlsAboveOverlay &&
                      this.interactive &&
                      this.drawControls(t),
                    this.clipTo && t.restore(),
                    n &&
                      ((n.canvas = this),
                      n.shouldCache(),
                      (n._transformDone = !0),
                      n.renderCache({ forClipping: !0 }),
                      this.drawClipPathOnCanvas(t)),
                    this._renderOverlay(t),
                    this.controlsAboveOverlay &&
                      this.interactive &&
                      this.drawControls(t),
                    this.fire("after:render", { ctx: t });
                },
                drawClipPathOnCanvas: function (t) {
                  var e = this.viewportTransform,
                    i = this.clipPath;
                  t.save(),
                    t.transform(e[0], e[1], e[2], e[3], e[4], e[5]),
                    (t.globalCompositeOperation = "destination-in"),
                    i.transform(t),
                    t.scale(1 / i.zoomX, 1 / i.zoomY),
                    t.drawImage(
                      i._cacheCanvas,
                      -i.cacheTranslationX,
                      -i.cacheTranslationY
                    ),
                    t.restore();
                },
                _renderObjects: function (t, e) {
                  var i, n;
                  for (i = 0, n = e.length; i < n; ++i) e[i] && e[i].render(t);
                },
                _renderBackgroundOrOverlay: function (t, e) {
                  var i = this[e + "Color"],
                    n = this[e + "Image"],
                    r = this.viewportTransform,
                    s = this[e + "Vpt"];
                  if (i || n) {
                    if (i) {
                      t.save(),
                        t.beginPath(),
                        t.moveTo(0, 0),
                        t.lineTo(this.width, 0),
                        t.lineTo(this.width, this.height),
                        t.lineTo(0, this.height),
                        t.closePath(),
                        (t.fillStyle = i.toLive ? i.toLive(t, this) : i),
                        s && t.transform(r[0], r[1], r[2], r[3], r[4], r[5]),
                        t.transform(1, 0, 0, 1, i.offsetX || 0, i.offsetY || 0);
                      var o = i.gradientTransform || i.patternTransform;
                      o && t.transform(o[0], o[1], o[2], o[3], o[4], o[5]),
                        t.fill(),
                        t.restore();
                    }
                    n &&
                      (t.save(),
                      s && t.transform(r[0], r[1], r[2], r[3], r[4], r[5]),
                      n.render(t),
                      t.restore());
                  }
                },
                _renderBackground: function (t) {
                  this._renderBackgroundOrOverlay(t, "background");
                },
                _renderOverlay: function (t) {
                  this._renderBackgroundOrOverlay(t, "overlay");
                },
                getCenter: function () {
                  return { top: this.height / 2, left: this.width / 2 };
                },
                centerObjectH: function (t) {
                  return this._centerObject(
                    t,
                    new b.Point(this.getCenter().left, t.getCenterPoint().y)
                  );
                },
                centerObjectV: function (t) {
                  return this._centerObject(
                    t,
                    new b.Point(t.getCenterPoint().x, this.getCenter().top)
                  );
                },
                centerObject: function (t) {
                  var e = this.getCenter();
                  return this._centerObject(t, new b.Point(e.left, e.top));
                },
                viewportCenterObject: function (t) {
                  var e = this.getVpCenter();
                  return this._centerObject(t, e);
                },
                viewportCenterObjectH: function (t) {
                  var e = this.getVpCenter();
                  return (
                    this._centerObject(
                      t,
                      new b.Point(e.x, t.getCenterPoint().y)
                    ),
                    this
                  );
                },
                viewportCenterObjectV: function (t) {
                  var e = this.getVpCenter();
                  return this._centerObject(
                    t,
                    new b.Point(t.getCenterPoint().x, e.y)
                  );
                },
                getVpCenter: function () {
                  var t = this.getCenter(),
                    e = s(this.viewportTransform);
                  return r({ x: t.left, y: t.top }, e);
                },
                _centerObject: function (t, e) {
                  return (
                    t.setPositionByOrigin(e, "center", "center"),
                    t.setCoords(),
                    this.renderOnAddRemove && this.requestRenderAll(),
                    this
                  );
                },
                toDatalessJSON: function (t) {
                  return this.toDatalessObject(t);
                },
                toObject: function (t) {
                  return this._toObjectMethod("toObject", t);
                },
                toDatalessObject: function (t) {
                  return this._toObjectMethod("toDatalessObject", t);
                },
                _toObjectMethod: function (e, i) {
                  var n = this.clipPath,
                    r = { version: b.version, objects: this._toObjects(e, i) };
                  return (
                    n && (r.clipPath = this._toObject(this.clipPath, e, i)),
                    t(r, this.__serializeBgOverlay(e, i)),
                    b.util.populateWithProperties(this, r, i),
                    r
                  );
                },
                _toObjects: function (t, e) {
                  return this._objects
                    .filter(function (t) {
                      return !t.excludeFromExport;
                    })
                    .map(function (i) {
                      return this._toObject(i, t, e);
                    }, this);
                },
                _toObject: function (t, e, i) {
                  var n;
                  this.includeDefaultValues ||
                    ((n = t.includeDefaultValues),
                    (t.includeDefaultValues = !1));
                  var r = t[e](i);
                  return (
                    this.includeDefaultValues || (t.includeDefaultValues = n), r
                  );
                },
                __serializeBgOverlay: function (t, e) {
                  var i = {},
                    n = this.backgroundImage,
                    r = this.overlayImage;
                  return (
                    this.backgroundColor &&
                      (i.background = this.backgroundColor.toObject
                        ? this.backgroundColor.toObject(e)
                        : this.backgroundColor),
                    this.overlayColor &&
                      (i.overlay = this.overlayColor.toObject
                        ? this.overlayColor.toObject(e)
                        : this.overlayColor),
                    n &&
                      !n.excludeFromExport &&
                      (i.backgroundImage = this._toObject(n, t, e)),
                    r &&
                      !r.excludeFromExport &&
                      (i.overlayImage = this._toObject(r, t, e)),
                    i
                  );
                },
                svgViewportTransformation: !0,
                toSVG: function (t, e) {
                  t || (t = {}), (t.reviver = e);
                  var i = [];
                  return (
                    this._setSVGPreamble(i, t),
                    this._setSVGHeader(i, t),
                    this.clipPath &&
                      i.push(
                        '<g clip-path="url(#' +
                          this.clipPath.clipPathId +
                          ')" >\n'
                      ),
                    this._setSVGBgOverlayColor(i, "background"),
                    this._setSVGBgOverlayImage(i, "backgroundImage", e),
                    this._setSVGObjects(i, e),
                    this.clipPath && i.push("</g>\n"),
                    this._setSVGBgOverlayColor(i, "overlay"),
                    this._setSVGBgOverlayImage(i, "overlayImage", e),
                    i.push("</svg>"),
                    i.join("")
                  );
                },
                _setSVGPreamble: function (t, e) {
                  e.suppressPreamble ||
                    t.push(
                      '<?xml version="1.0" encoding="',
                      e.encoding || "UTF-8",
                      '" standalone="no" ?>\n',
                      '<!DOCTYPE svg PUBLIC "-//W3C//DTD SVG 1.1//EN" ',
                      '"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd">\n'
                    );
                },
                _setSVGHeader: function (t, e) {
                  var i,
                    r = e.width || this.width,
                    s = e.height || this.height,
                    o = 'viewBox="0 0 ' + this.width + " " + this.height + '" ',
                    a = b.Object.NUM_FRACTION_DIGITS;
                  e.viewBox
                    ? (o =
                        'viewBox="' +
                        e.viewBox.x +
                        " " +
                        e.viewBox.y +
                        " " +
                        e.viewBox.width +
                        " " +
                        e.viewBox.height +
                        '" ')
                    : this.svgViewportTransformation &&
                      ((i = this.viewportTransform),
                      (o =
                        'viewBox="' +
                        n(-i[4] / i[0], a) +
                        " " +
                        n(-i[5] / i[3], a) +
                        " " +
                        n(this.width / i[0], a) +
                        " " +
                        n(this.height / i[3], a) +
                        '" ')),
                    t.push(
                      "<svg ",
                      'xmlns="http://www.w3.org/2000/svg" ',
                      'xmlns:xlink="http://www.w3.org/1999/xlink" ',
                      'version="1.1" ',
                      'width="',
                      r,
                      '" ',
                      'height="',
                      s,
                      '" ',
                      o,
                      'xml:space="preserve">\n',
                      "<desc>Created with Fabric.js ",
                      b.version,
                      "</desc>\n",
                      "<defs>\n",
                      this.createSVGFontFacesMarkup(),
                      this.createSVGRefElementsMarkup(),
                      this.createSVGClipPathMarkup(e),
                      "</defs>\n"
                    );
                },
                createSVGClipPathMarkup: function (t) {
                  var e = this.clipPath;
                  return e
                    ? ((e.clipPathId = "CLIPPATH_" + b.Object.__uid++),
                      '<clipPath id="' +
                        e.clipPathId +
                        '" >\n' +
                        this.clipPath.toClipPathSVG(t.reviver) +
                        "</clipPath>\n")
                    : "";
                },
                createSVGRefElementsMarkup: function () {
                  var t = this;
                  return ["background", "overlay"]
                    .map(function (e) {
                      var i = t[e + "Color"];
                      if (i && i.toLive) {
                        var n = t[e + "Vpt"],
                          r = t.viewportTransform,
                          s = {
                            width: t.width / (n ? r[0] : 1),
                            height: t.height / (n ? r[3] : 1),
                          };
                        return i.toSVG(s, {
                          additionalTransform: n ? b.util.matrixToSVG(r) : "",
                        });
                      }
                    })
                    .join("");
                },
                createSVGFontFacesMarkup: function () {
                  var t,
                    e,
                    i,
                    n,
                    r,
                    s,
                    o,
                    a,
                    h = "",
                    c = {},
                    l = b.fontPaths,
                    u = [];
                  for (
                    this._objects.forEach(function t(e) {
                      u.push(e), e._objects && e._objects.forEach(t);
                    }),
                      o = 0,
                      a = u.length;
                    o < a;
                    o++
                  )
                    if (
                      ((e = (t = u[o]).fontFamily),
                      -1 !== t.type.indexOf("text") &&
                        !c[e] &&
                        l[e] &&
                        ((c[e] = !0), t.styles))
                    )
                      for (r in (i = t.styles))
                        for (s in (n = i[r]))
                          !c[(e = n[s].fontFamily)] && l[e] && (c[e] = !0);
                  for (var g in c)
                    h += [
                      "\t\t@font-face {\n",
                      "\t\t\tfont-family: '",
                      g,
                      "';\n",
                      "\t\t\tsrc: url('",
                      l[g],
                      "');\n",
                      "\t\t}\n",
                    ].join("");
                  return (
                    h &&
                      (h = [
                        '\t<style type="text/css">',
                        "<![CDATA[\n",
                        h,
                        "]]>",
                        "</style>\n",
                      ].join("")),
                    h
                  );
                },
                _setSVGObjects: function (t, e) {
                  var i,
                    n,
                    r,
                    s = this._objects;
                  for (n = 0, r = s.length; n < r; n++)
                    (i = s[n]).excludeFromExport || this._setSVGObject(t, i, e);
                },
                _setSVGObject: function (t, e, i) {
                  t.push(e.toSVG(i));
                },
                _setSVGBgOverlayImage: function (t, e, i) {
                  this[e] &&
                    !this[e].excludeFromExport &&
                    this[e].toSVG &&
                    t.push(this[e].toSVG(i));
                },
                _setSVGBgOverlayColor: function (t, e) {
                  var i = this[e + "Color"],
                    n = this.viewportTransform,
                    r = this.width,
                    s = this.height;
                  if (i)
                    if (i.toLive) {
                      var o = i.repeat,
                        a = b.util.invertTransform(n),
                        h = this[e + "Vpt"] ? b.util.matrixToSVG(a) : "";
                      t.push(
                        '<rect transform="' + h + " translate(",
                        r / 2,
                        ",",
                        s / 2,
                        ')"',
                        ' x="',
                        i.offsetX - r / 2,
                        '" y="',
                        i.offsetY - s / 2,
                        '" ',
                        'width="',
                        "repeat-y" === o || "no-repeat" === o
                          ? i.source.width
                          : r,
                        '" height="',
                        "repeat-x" === o || "no-repeat" === o
                          ? i.source.height
                          : s,
                        '" fill="url(#SVGID_' + i.id + ')"',
                        "></rect>\n"
                      );
                    } else
                      t.push(
                        '<rect x="0" y="0" width="100%" height="100%" ',
                        'fill="',
                        i,
                        '"',
                        "></rect>\n"
                      );
                },
                sendToBack: function (t) {
                  if (!t) return this;
                  var e,
                    n,
                    r,
                    s = this._activeObject;
                  if (t === s && "activeSelection" === t.type)
                    for (e = (r = s._objects).length; e--; )
                      (n = r[e]), i(this._objects, n), this._objects.unshift(n);
                  else i(this._objects, t), this._objects.unshift(t);
                  return (
                    this.renderOnAddRemove && this.requestRenderAll(), this
                  );
                },
                bringToFront: function (t) {
                  if (!t) return this;
                  var e,
                    n,
                    r,
                    s = this._activeObject;
                  if (t === s && "activeSelection" === t.type)
                    for (r = s._objects, e = 0; e < r.length; e++)
                      (n = r[e]), i(this._objects, n), this._objects.push(n);
                  else i(this._objects, t), this._objects.push(t);
                  return (
                    this.renderOnAddRemove && this.requestRenderAll(), this
                  );
                },
                sendBackwards: function (t, e) {
                  if (!t) return this;
                  var n,
                    r,
                    s,
                    o,
                    a,
                    h = this._activeObject,
                    c = 0;
                  if (t === h && "activeSelection" === t.type)
                    for (a = h._objects, n = 0; n < a.length; n++)
                      (r = a[n]),
                        (s = this._objects.indexOf(r)) > 0 + c &&
                          ((o = s - 1),
                          i(this._objects, r),
                          this._objects.splice(o, 0, r)),
                        c++;
                  else
                    0 !== (s = this._objects.indexOf(t)) &&
                      ((o = this._findNewLowerIndex(t, s, e)),
                      i(this._objects, t),
                      this._objects.splice(o, 0, t));
                  return (
                    this.renderOnAddRemove && this.requestRenderAll(), this
                  );
                },
                _findNewLowerIndex: function (t, e, i) {
                  var n, r;
                  if (i)
                    for (n = e, r = e - 1; r >= 0; --r) {
                      if (
                        t.intersectsWithObject(this._objects[r]) ||
                        t.isContainedWithinObject(this._objects[r]) ||
                        this._objects[r].isContainedWithinObject(t)
                      ) {
                        n = r;
                        break;
                      }
                    }
                  else n = e - 1;
                  return n;
                },
                bringForward: function (t, e) {
                  if (!t) return this;
                  var n,
                    r,
                    s,
                    o,
                    a,
                    h = this._activeObject,
                    c = 0;
                  if (t === h && "activeSelection" === t.type)
                    for (n = (a = h._objects).length; n--; )
                      (r = a[n]),
                        (s = this._objects.indexOf(r)) <
                          this._objects.length - 1 - c &&
                          ((o = s + 1),
                          i(this._objects, r),
                          this._objects.splice(o, 0, r)),
                        c++;
                  else
                    (s = this._objects.indexOf(t)) !==
                      this._objects.length - 1 &&
                      ((o = this._findNewUpperIndex(t, s, e)),
                      i(this._objects, t),
                      this._objects.splice(o, 0, t));
                  return (
                    this.renderOnAddRemove && this.requestRenderAll(), this
                  );
                },
                _findNewUpperIndex: function (t, e, i) {
                  var n, r, s;
                  if (i)
                    for (
                      n = e, r = e + 1, s = this._objects.length;
                      r < s;
                      ++r
                    ) {
                      if (
                        t.intersectsWithObject(this._objects[r]) ||
                        t.isContainedWithinObject(this._objects[r]) ||
                        this._objects[r].isContainedWithinObject(t)
                      ) {
                        n = r;
                        break;
                      }
                    }
                  else n = e + 1;
                  return n;
                },
                moveTo: function (t, e) {
                  return (
                    i(this._objects, t),
                    this._objects.splice(e, 0, t),
                    this.renderOnAddRemove && this.requestRenderAll()
                  );
                },
                dispose: function () {
                  return (
                    this.isRendering &&
                      (b.util.cancelAnimFrame(this.isRendering),
                      (this.isRendering = 0)),
                    this.forEachObject(function (t) {
                      t.dispose && t.dispose();
                    }),
                    (this._objects = []),
                    this.backgroundImage &&
                      this.backgroundImage.dispose &&
                      this.backgroundImage.dispose(),
                    (this.backgroundImage = null),
                    this.overlayImage &&
                      this.overlayImage.dispose &&
                      this.overlayImage.dispose(),
                    (this.overlayImage = null),
                    (this._iTextInstances = null),
                    (this.contextContainer = null),
                    b.util.cleanUpJsdomNode(this.lowerCanvasEl),
                    (this.lowerCanvasEl = void 0),
                    this
                  );
                },
                toString: function () {
                  return (
                    "#<fabric.Canvas (" +
                    this.complexity() +
                    "): { objects: " +
                    this._objects.length +
                    " }>"
                  );
                },
              })),
                t(b.StaticCanvas.prototype, b.Observable),
                t(b.StaticCanvas.prototype, b.Collection),
                t(b.StaticCanvas.prototype, b.DataURLExporter),
                t(b.StaticCanvas, {
                  EMPTY_JSON: '{"objects": [], "background": "white"}',
                  supports: function (t) {
                    var e = a();
                    if (!e || !e.getContext) return null;
                    var i = e.getContext("2d");
                    if (!i) return null;
                    switch (t) {
                      case "setLineDash":
                        return void 0 !== i.setLineDash;
                      default:
                        return null;
                    }
                  },
                }),
                (b.StaticCanvas.prototype.toJSON =
                  b.StaticCanvas.prototype.toObject),
                b.isLikelyNode &&
                  ((b.StaticCanvas.prototype.createPNGStream = function () {
                    var t = o(this.lowerCanvasEl);
                    return t && t.createPNGStream();
                  }),
                  (b.StaticCanvas.prototype.createJPEGStream = function (t) {
                    var e = o(this.lowerCanvasEl);
                    return e && e.createJPEGStream(t);
                  }));
            }
          })(),
          (b.BaseBrush = b.util.createClass({
            color: "rgb(0, 0, 0)",
            width: 1,
            shadow: null,
            strokeLineCap: "round",
            strokeLineJoin: "round",
            strokeMiterLimit: 10,
            strokeDashArray: null,
            setShadow: function (t) {
              return (this.shadow = new b.Shadow(t)), this;
            },
            _setBrushStyles: function () {
              var t = this.canvas.contextTop;
              (t.strokeStyle = this.color),
                (t.lineWidth = this.width),
                (t.lineCap = this.strokeLineCap),
                (t.miterLimit = this.strokeMiterLimit),
                (t.lineJoin = this.strokeLineJoin),
                b.StaticCanvas.supports("setLineDash") &&
                  t.setLineDash(this.strokeDashArray || []);
            },
            _saveAndTransform: function (t) {
              var e = this.canvas.viewportTransform;
              t.save(), t.transform(e[0], e[1], e[2], e[3], e[4], e[5]);
            },
            _setShadow: function () {
              if (this.shadow) {
                var t = this.canvas,
                  e = this.shadow,
                  i = t.contextTop,
                  n = t.getZoom();
                t && t._isRetinaScaling() && (n *= b.devicePixelRatio),
                  (i.shadowColor = e.color),
                  (i.shadowBlur = e.blur * n),
                  (i.shadowOffsetX = e.offsetX * n),
                  (i.shadowOffsetY = e.offsetY * n);
              }
            },
            needsFullRender: function () {
              return new b.Color(this.color).getAlpha() < 1 || !!this.shadow;
            },
            _resetShadow: function () {
              var t = this.canvas.contextTop;
              (t.shadowColor = ""),
                (t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0);
            },
          })),
          (b.PencilBrush = b.util.createClass(b.BaseBrush, {
            decimate: 0.4,
            initialize: function (t) {
              (this.canvas = t), (this._points = []);
            },
            _drawSegment: function (t, e, i) {
              var n = e.midPointFrom(i);
              return t.quadraticCurveTo(e.x, e.y, n.x, n.y), n;
            },
            onMouseDown: function (t, e) {
              this.canvas._isMainEvent(e.e) &&
                (this._prepareForDrawing(t),
                this._captureDrawingPath(t),
                this._render());
            },
            onMouseMove: function (t, e) {
              if (
                this.canvas._isMainEvent(e.e) &&
                this._captureDrawingPath(t) &&
                this._points.length > 1
              )
                if (this.needsFullRender())
                  this.canvas.clearContext(this.canvas.contextTop),
                    this._render();
                else {
                  var i = this._points,
                    n = i.length,
                    r = this.canvas.contextTop;
                  this._saveAndTransform(r),
                    this.oldEnd &&
                      (r.beginPath(), r.moveTo(this.oldEnd.x, this.oldEnd.y)),
                    (this.oldEnd = this._drawSegment(
                      r,
                      i[n - 2],
                      i[n - 1],
                      !0
                    )),
                    r.stroke(),
                    r.restore();
                }
            },
            onMouseUp: function (t) {
              return (
                !this.canvas._isMainEvent(t.e) ||
                ((this.oldEnd = void 0), this._finalizeAndAddPath(), !1)
              );
            },
            _prepareForDrawing: function (t) {
              var e = new b.Point(t.x, t.y);
              this._reset(),
                this._addPoint(e),
                this.canvas.contextTop.moveTo(e.x, e.y);
            },
            _addPoint: function (t) {
              return !(
                (this._points.length > 1 &&
                  t.eq(this._points[this._points.length - 1])) ||
                (this._points.push(t), 0)
              );
            },
            _reset: function () {
              (this._points = []), this._setBrushStyles(), this._setShadow();
            },
            _captureDrawingPath: function (t) {
              var e = new b.Point(t.x, t.y);
              return this._addPoint(e);
            },
            _render: function () {
              var t,
                e,
                i = this.canvas.contextTop,
                n = this._points[0],
                r = this._points[1];
              if (
                (this._saveAndTransform(i),
                i.beginPath(),
                2 === this._points.length && n.x === r.x && n.y === r.y)
              ) {
                var s = this.width / 1e3;
                (n = new b.Point(n.x, n.y)),
                  (r = new b.Point(r.x, r.y)),
                  (n.x -= s),
                  (r.x += s);
              }
              for (
                i.moveTo(n.x, n.y), t = 1, e = this._points.length;
                t < e;
                t++
              )
                this._drawSegment(i, n, r),
                  (n = this._points[t]),
                  (r = this._points[t + 1]);
              i.lineTo(n.x, n.y), i.stroke(), i.restore();
            },
            convertPointsToSVGPath: function (t) {
              var e,
                i = [],
                n = this.width / 1e3,
                r = new b.Point(t[0].x, t[0].y),
                s = new b.Point(t[1].x, t[1].y),
                o = t.length,
                a = 1,
                h = 0,
                c = o > 2;
              for (
                c &&
                  ((a = t[2].x < s.x ? -1 : t[2].x === s.x ? 0 : 1),
                  (h = t[2].y < s.y ? -1 : t[2].y === s.y ? 0 : 1)),
                  i.push("M ", r.x - a * n, " ", r.y - h * n, " "),
                  e = 1;
                e < o;
                e++
              ) {
                if (!r.eq(s)) {
                  var l = r.midPointFrom(s);
                  i.push("Q ", r.x, " ", r.y, " ", l.x, " ", l.y, " ");
                }
                (r = t[e]), e + 1 < t.length && (s = t[e + 1]);
              }
              return (
                c &&
                  ((a = r.x > t[e - 2].x ? 1 : r.x === t[e - 2].x ? 0 : -1),
                  (h = r.y > t[e - 2].y ? 1 : r.y === t[e - 2].y ? 0 : -1)),
                i.push("L ", r.x + a * n, " ", r.y + h * n),
                i
              );
            },
            createPath: function (t) {
              var e = new b.Path(t, {
                fill: null,
                stroke: this.color,
                strokeWidth: this.width,
                strokeLineCap: this.strokeLineCap,
                strokeMiterLimit: this.strokeMiterLimit,
                strokeLineJoin: this.strokeLineJoin,
                strokeDashArray: this.strokeDashArray,
              });
              return (
                this.shadow &&
                  ((this.shadow.affectStroke = !0), e.setShadow(this.shadow)),
                e
              );
            },
            decimatePoints: function (t, e) {
              if (t.length <= 2) return t;
              var i,
                n = this.canvas.getZoom(),
                r = Math.pow(e / n, 2),
                s = t.length - 1,
                o = t[0],
                a = [o];
              for (i = 1; i < s; i++)
                Math.pow(o.x - t[i].x, 2) + Math.pow(o.y - t[i].y, 2) >= r &&
                  ((o = t[i]), a.push(o));
              return 1 === a.length && a.push(new b.Point(a[0].x, a[0].y)), a;
            },
            _finalizeAndAddPath: function () {
              this.canvas.contextTop.closePath(),
                this.decimate &&
                  (this._points = this.decimatePoints(
                    this._points,
                    this.decimate
                  ));
              var t = this.convertPointsToSVGPath(this._points).join("");
              if ("M 0 0 Q 0 0 0 0 L 0 0" !== t) {
                var e = this.createPath(t);
                this.canvas.clearContext(this.canvas.contextTop),
                  this.canvas.add(e),
                  this.canvas.requestRenderAll(),
                  e.setCoords(),
                  this._resetShadow(),
                  this.canvas.fire("path:created", { path: e });
              } else this.canvas.requestRenderAll();
            },
          })),
          (b.CircleBrush = b.util.createClass(b.BaseBrush, {
            width: 10,
            initialize: function (t) {
              (this.canvas = t), (this.points = []);
            },
            drawDot: function (t) {
              var e = this.addPoint(t),
                i = this.canvas.contextTop;
              this._saveAndTransform(i), this.dot(i, e), i.restore();
            },
            dot: function (t, e) {
              (t.fillStyle = e.fill),
                t.beginPath(),
                t.arc(e.x, e.y, e.radius, 0, 2 * Math.PI, !1),
                t.closePath(),
                t.fill();
            },
            onMouseDown: function (t) {
              (this.points.length = 0),
                this.canvas.clearContext(this.canvas.contextTop),
                this._setShadow(),
                this.drawDot(t);
            },
            _render: function () {
              var t,
                e,
                i = this.canvas.contextTop,
                n = this.points;
              for (this._saveAndTransform(i), t = 0, e = n.length; t < e; t++)
                this.dot(i, n[t]);
              i.restore();
            },
            onMouseMove: function (t) {
              this.needsFullRender()
                ? (this.canvas.clearContext(this.canvas.contextTop),
                  this.addPoint(t),
                  this._render())
                : this.drawDot(t);
            },
            onMouseUp: function () {
              var t,
                e,
                i = this.canvas.renderOnAddRemove;
              this.canvas.renderOnAddRemove = !1;
              var n = [];
              for (t = 0, e = this.points.length; t < e; t++) {
                var r = this.points[t],
                  s = new b.Circle({
                    radius: r.radius,
                    left: r.x,
                    top: r.y,
                    originX: "center",
                    originY: "center",
                    fill: r.fill,
                  });
                this.shadow && s.setShadow(this.shadow), n.push(s);
              }
              var o = new b.Group(n);
              (o.canvas = this.canvas),
                this.canvas.add(o),
                this.canvas.fire("path:created", { path: o }),
                this.canvas.clearContext(this.canvas.contextTop),
                this._resetShadow(),
                (this.canvas.renderOnAddRemove = i),
                this.canvas.requestRenderAll();
            },
            addPoint: function (t) {
              var e = new b.Point(t.x, t.y),
                i =
                  b.util.getRandomInt(
                    Math.max(0, this.width - 20),
                    this.width + 20
                  ) / 2,
                n = new b.Color(this.color)
                  .setAlpha(b.util.getRandomInt(0, 100) / 100)
                  .toRgba();
              return (e.radius = i), (e.fill = n), this.points.push(e), e;
            },
          })),
          (b.SprayBrush = b.util.createClass(b.BaseBrush, {
            width: 10,
            density: 20,
            dotWidth: 1,
            dotWidthVariance: 1,
            randomOpacity: !1,
            optimizeOverlapping: !0,
            initialize: function (t) {
              (this.canvas = t), (this.sprayChunks = []);
            },
            onMouseDown: function (t) {
              (this.sprayChunks.length = 0),
                this.canvas.clearContext(this.canvas.contextTop),
                this._setShadow(),
                this.addSprayChunk(t),
                this.render(this.sprayChunkPoints);
            },
            onMouseMove: function (t) {
              this.addSprayChunk(t), this.render(this.sprayChunkPoints);
            },
            onMouseUp: function () {
              var t = this.canvas.renderOnAddRemove;
              this.canvas.renderOnAddRemove = !1;
              for (var e = [], i = 0, n = this.sprayChunks.length; i < n; i++)
                for (
                  var r = this.sprayChunks[i], s = 0, o = r.length;
                  s < o;
                  s++
                ) {
                  var a = new b.Rect({
                    width: r[s].width,
                    height: r[s].width,
                    left: r[s].x + 1,
                    top: r[s].y + 1,
                    originX: "center",
                    originY: "center",
                    fill: this.color,
                  });
                  e.push(a);
                }
              this.optimizeOverlapping && (e = this._getOptimizedRects(e));
              var h = new b.Group(e);
              this.shadow && h.setShadow(this.shadow),
                this.canvas.add(h),
                this.canvas.fire("path:created", { path: h }),
                this.canvas.clearContext(this.canvas.contextTop),
                this._resetShadow(),
                (this.canvas.renderOnAddRemove = t),
                this.canvas.requestRenderAll();
            },
            _getOptimizedRects: function (t) {
              var e,
                i,
                n,
                r = {};
              for (i = 0, n = t.length; i < n; i++)
                r[(e = t[i].left + "" + t[i].top)] || (r[e] = t[i]);
              var s = [];
              for (e in r) s.push(r[e]);
              return s;
            },
            render: function (t) {
              var e,
                i,
                n = this.canvas.contextTop;
              for (
                n.fillStyle = this.color,
                  this._saveAndTransform(n),
                  e = 0,
                  i = t.length;
                e < i;
                e++
              ) {
                var r = t[e];
                void 0 !== r.opacity && (n.globalAlpha = r.opacity),
                  n.fillRect(r.x, r.y, r.width, r.width);
              }
              n.restore();
            },
            _render: function () {
              var t,
                e,
                i = this.canvas.contextTop;
              for (
                i.fillStyle = this.color,
                  this._saveAndTransform(i),
                  t = 0,
                  e = this.sprayChunks.length;
                t < e;
                t++
              )
                this.render(this.sprayChunks[t]);
              i.restore();
            },
            addSprayChunk: function (t) {
              this.sprayChunkPoints = [];
              var e,
                i,
                n,
                r,
                s = this.width / 2;
              for (r = 0; r < this.density; r++) {
                (e = b.util.getRandomInt(t.x - s, t.x + s)),
                  (i = b.util.getRandomInt(t.y - s, t.y + s)),
                  (n = this.dotWidthVariance
                    ? b.util.getRandomInt(
                        Math.max(1, this.dotWidth - this.dotWidthVariance),
                        this.dotWidth + this.dotWidthVariance
                      )
                    : this.dotWidth);
                var o = new b.Point(e, i);
                (o.width = n),
                  this.randomOpacity &&
                    (o.opacity = b.util.getRandomInt(0, 100) / 100),
                  this.sprayChunkPoints.push(o);
              }
              this.sprayChunks.push(this.sprayChunkPoints);
            },
          })),
          (b.PatternBrush = b.util.createClass(b.PencilBrush, {
            getPatternSrc: function () {
              var t = b.util.createCanvasElement(),
                e = t.getContext("2d");
              return (
                (t.width = t.height = 25),
                (e.fillStyle = this.color),
                e.beginPath(),
                e.arc(10, 10, 10, 0, 2 * Math.PI, !1),
                e.closePath(),
                e.fill(),
                t
              );
            },
            getPatternSrcFunction: function () {
              return String(this.getPatternSrc).replace(
                "this.color",
                '"' + this.color + '"'
              );
            },
            getPattern: function () {
              return this.canvas.contextTop.createPattern(
                this.source || this.getPatternSrc(),
                "repeat"
              );
            },
            _setBrushStyles: function () {
              this.callSuper("_setBrushStyles"),
                (this.canvas.contextTop.strokeStyle = this.getPattern());
            },
            createPath: function (t) {
              var e = this.callSuper("createPath", t),
                i = e._getLeftTopCoords().scalarAdd(e.strokeWidth / 2);
              return (
                (e.stroke = new b.Pattern({
                  source: this.source || this.getPatternSrcFunction(),
                  offsetX: -i.x,
                  offsetY: -i.y,
                })),
                e
              );
            },
          })),
          (function () {
            var t = b.util.getPointer,
              e = b.util.degreesToRadians,
              i = b.util.radiansToDegrees,
              n = Math.atan2,
              r = Math.abs,
              s = b.StaticCanvas.supports("setLineDash");
            for (var o in ((b.Canvas = b.util.createClass(b.StaticCanvas, {
              initialize: function (t, e) {
                e || (e = {}),
                  (this.renderAndResetBound = this.renderAndReset.bind(this)),
                  (this.requestRenderAllBound =
                    this.requestRenderAll.bind(this)),
                  this._initStatic(t, e),
                  this._initInteractive(),
                  this._createCacheCanvas();
              },
              uniScaleTransform: !1,
              uniScaleKey: "shiftKey",
              centeredScaling: !1,
              centeredRotation: !1,
              centeredKey: "altKey",
              altActionKey: "shiftKey",
              interactive: !0,
              selection: !0,
              selectionKey: "shiftKey",
              altSelectionKey: null,
              selectionColor: "rgba(100, 100, 255, 0.3)",
              selectionDashArray: [],
              selectionBorderColor: "rgba(255, 255, 255, 0.3)",
              selectionLineWidth: 1,
              selectionFullyContained: !1,
              hoverCursor: "move",
              moveCursor: "move",
              defaultCursor: "default",
              freeDrawingCursor: "crosshair",
              rotationCursor: "crosshair",
              notAllowedCursor: "not-allowed",
              containerClass: "canvas-container",
              perPixelTargetFind: !1,
              targetFindTolerance: 0,
              skipTargetFind: !1,
              isDrawingMode: !1,
              preserveObjectStacking: !1,
              snapAngle: 0,
              snapThreshold: null,
              stopContextMenu: !1,
              fireRightClick: !1,
              fireMiddleClick: !1,
              targets: [],
              _hoveredTarget: null,
              _hoveredTargets: [],
              _initInteractive: function () {
                (this._currentTransform = null),
                  (this._groupSelector = null),
                  this._initWrapperElement(),
                  this._createUpperCanvas(),
                  this._initEventListeners(),
                  this._initRetinaScaling(),
                  (this.freeDrawingBrush =
                    b.PencilBrush && new b.PencilBrush(this)),
                  this.calcOffset();
              },
              _chooseObjectsToRender: function () {
                var t,
                  e,
                  i,
                  n = this.getActiveObjects();
                if (n.length > 0 && !this.preserveObjectStacking) {
                  (e = []), (i = []);
                  for (var r = 0, s = this._objects.length; r < s; r++)
                    (t = this._objects[r]),
                      -1 === n.indexOf(t) ? e.push(t) : i.push(t);
                  n.length > 1 && (this._activeObject._objects = i),
                    e.push.apply(e, i);
                } else e = this._objects;
                return e;
              },
              renderAll: function () {
                !this.contextTopDirty ||
                  this._groupSelector ||
                  this.isDrawingMode ||
                  (this.clearContext(this.contextTop),
                  (this.contextTopDirty = !1)),
                  this.hasLostContext && this.renderTopLayer(this.contextTop);
                var t = this.contextContainer;
                return (
                  this.renderCanvas(t, this._chooseObjectsToRender()), this
                );
              },
              renderTopLayer: function (t) {
                t.save(),
                  this.isDrawingMode &&
                    this._isCurrentlyDrawing &&
                    (this.freeDrawingBrush && this.freeDrawingBrush._render(),
                    (this.contextTopDirty = !0)),
                  this.selection &&
                    this._groupSelector &&
                    (this._drawSelection(t), (this.contextTopDirty = !0)),
                  t.restore();
              },
              renderTop: function () {
                var t = this.contextTop;
                return (
                  this.clearContext(t),
                  this.renderTopLayer(t),
                  this.fire("after:render"),
                  this
                );
              },
              _resetCurrentTransform: function () {
                var t = this._currentTransform;
                t.target.set({
                  scaleX: t.original.scaleX,
                  scaleY: t.original.scaleY,
                  skewX: t.original.skewX,
                  skewY: t.original.skewY,
                  left: t.original.left,
                  top: t.original.top,
                }),
                  this._shouldCenterTransform(t.target)
                    ? ("center" !== t.originX &&
                        ("right" === t.originX
                          ? (t.mouseXSign = -1)
                          : (t.mouseXSign = 1)),
                      "center" !== t.originY &&
                        ("bottom" === t.originY
                          ? (t.mouseYSign = -1)
                          : (t.mouseYSign = 1)),
                      (t.originX = "center"),
                      (t.originY = "center"))
                    : ((t.originX = t.original.originX),
                      (t.originY = t.original.originY));
              },
              containsPoint: function (t, e, i) {
                var n,
                  r = i || this.getPointer(t, !0);
                return (
                  (n =
                    e.group &&
                    e.group === this._activeObject &&
                    "activeSelection" === e.group.type
                      ? this._normalizePointer(e.group, r)
                      : { x: r.x, y: r.y }),
                  e.containsPoint(n) || e._findTargetCorner(r)
                );
              },
              _normalizePointer: function (t, e) {
                var i = t.calcTransformMatrix(),
                  n = b.util.invertTransform(i),
                  r = this.restorePointerVpt(e);
                return b.util.transformPoint(r, n);
              },
              isTargetTransparent: function (t, e, i) {
                if (
                  t.shouldCache() &&
                  t._cacheCanvas &&
                  t !== this._activeObject
                ) {
                  var n = this._normalizePointer(t, { x: e, y: i }),
                    r = Math.max(t.cacheTranslationX + n.x * t.zoomX, 0),
                    s = Math.max(t.cacheTranslationY + n.y * t.zoomY, 0);
                  return b.util.isTransparent(
                    t._cacheContext,
                    Math.round(r),
                    Math.round(s),
                    this.targetFindTolerance
                  );
                }
                var o = this.contextCache,
                  a = t.selectionBackgroundColor,
                  h = this.viewportTransform;
                return (
                  (t.selectionBackgroundColor = ""),
                  this.clearContext(o),
                  o.save(),
                  o.transform(h[0], h[1], h[2], h[3], h[4], h[5]),
                  t.render(o),
                  o.restore(),
                  t === this._activeObject &&
                    t._renderControls(
                      o,
                      { hasBorders: !1, transparentCorners: !1 },
                      { hasBorders: !1 }
                    ),
                  (t.selectionBackgroundColor = a),
                  b.util.isTransparent(o, e, i, this.targetFindTolerance)
                );
              },
              _isSelectionKeyPressed: function (t) {
                return "[object Array]" ===
                  Object.prototype.toString.call(this.selectionKey)
                  ? !!this.selectionKey.find(function (e) {
                      return !0 === t[e];
                    })
                  : t[this.selectionKey];
              },
              _shouldClearSelection: function (t, e) {
                var i = this.getActiveObjects(),
                  n = this._activeObject;
                return (
                  !e ||
                  (e &&
                    n &&
                    i.length > 1 &&
                    -1 === i.indexOf(e) &&
                    n !== e &&
                    !this._isSelectionKeyPressed(t)) ||
                  (e && !e.evented) ||
                  (e && !e.selectable && n && n !== e)
                );
              },
              _shouldCenterTransform: function (t) {
                if (t) {
                  var e,
                    i = this._currentTransform;
                  return (
                    "scale" === i.action ||
                    "scaleX" === i.action ||
                    "scaleY" === i.action
                      ? (e = this.centeredScaling || t.centeredScaling)
                      : "rotate" === i.action &&
                        (e = this.centeredRotation || t.centeredRotation),
                    e ? !i.altKey : i.altKey
                  );
                }
              },
              _getOriginFromCorner: function (t, e) {
                var i = { x: t.originX, y: t.originY };
                return (
                  "ml" === e || "tl" === e || "bl" === e
                    ? (i.x = "right")
                    : ("mr" !== e && "tr" !== e && "br" !== e) ||
                      (i.x = "left"),
                  "tl" === e || "mt" === e || "tr" === e
                    ? (i.y = "bottom")
                    : ("bl" !== e && "mb" !== e && "br" !== e) || (i.y = "top"),
                  i
                );
              },
              _getActionFromCorner: function (t, e, i) {
                if (!e || !t) return "drag";
                switch (e) {
                  case "mtr":
                    return "rotate";
                  case "ml":
                  case "mr":
                    return i[this.altActionKey] ? "skewY" : "scaleX";
                  case "mt":
                  case "mb":
                    return i[this.altActionKey] ? "skewX" : "scaleY";
                  default:
                    return "scale";
                }
              },
              _setupCurrentTransform: function (t, i, n) {
                if (i) {
                  var r = this.getPointer(t),
                    s = i._findTargetCorner(this.getPointer(t, !0)),
                    o = this._getActionFromCorner(n, s, t, i),
                    a = this._getOriginFromCorner(i, s);
                  (this._currentTransform = {
                    target: i,
                    action: o,
                    corner: s,
                    scaleX: i.scaleX,
                    scaleY: i.scaleY,
                    skewX: i.skewX,
                    skewY: i.skewY,
                    offsetX: r.x - i.left,
                    offsetY: r.y - i.top,
                    originX: a.x,
                    originY: a.y,
                    ex: r.x,
                    ey: r.y,
                    lastX: r.x,
                    lastY: r.y,
                    theta: e(i.angle),
                    width: i.width * i.scaleX,
                    mouseXSign: 1,
                    mouseYSign: 1,
                    shiftKey: t.shiftKey,
                    altKey: t[this.centeredKey],
                    original: b.util.saveObjectTransform(i),
                  }),
                    (this._currentTransform.original.originX = a.x),
                    (this._currentTransform.original.originY = a.y),
                    this._resetCurrentTransform(),
                    this._beforeTransform(t);
                }
              },
              _translateObject: function (t, e) {
                var i = this._currentTransform,
                  n = i.target,
                  r = t - i.offsetX,
                  s = e - i.offsetY,
                  o = !n.get("lockMovementX") && n.left !== r,
                  a = !n.get("lockMovementY") && n.top !== s;
                return o && n.set("left", r), a && n.set("top", s), o || a;
              },
              _changeSkewTransformOrigin: function (t, e, i) {
                var n = "originX",
                  r = { 0: "center" },
                  s = e.target.skewX,
                  o = "left",
                  a = "right",
                  h = "mt" === e.corner || "ml" === e.corner ? 1 : -1,
                  c = 1;
                (t = t > 0 ? 1 : -1),
                  "y" === i &&
                    ((s = e.target.skewY),
                    (o = "top"),
                    (a = "bottom"),
                    (n = "originY")),
                  (r[-1] = o),
                  (r[1] = a),
                  e.target.flipX && (c *= -1),
                  e.target.flipY && (c *= -1),
                  0 === s
                    ? ((e.skewSign = -h * t * c), (e[n] = r[-t]))
                    : ((s = s > 0 ? 1 : -1),
                      (e.skewSign = s),
                      (e[n] = r[s * h * c]));
              },
              _skewObject: function (t, e, i) {
                var n,
                  r = this._currentTransform,
                  s = r.target,
                  o = s.get("lockSkewingX"),
                  a = s.get("lockSkewingY");
                if ((o && "x" === i) || (a && "y" === i)) return !1;
                var h,
                  c,
                  l = s.getCenterPoint(),
                  u = s.toLocalPoint(new b.Point(t, e), "center", "center")[i],
                  g = s.toLocalPoint(
                    new b.Point(r.lastX, r.lastY),
                    "center",
                    "center"
                  )[i],
                  f = s._getTransformedDimensions();
                return (
                  this._changeSkewTransformOrigin(u - g, r, i),
                  (h = s.toLocalPoint(new b.Point(t, e), r.originX, r.originY)[
                    i
                  ]),
                  (c = s.translateToOriginPoint(l, r.originX, r.originY)),
                  (n = this._setObjectSkew(h, r, i, f)),
                  (r.lastX = t),
                  (r.lastY = e),
                  s.setPositionByOrigin(c, r.originX, r.originY),
                  n
                );
              },
              _setObjectSkew: function (t, e, i, n) {
                var r,
                  s,
                  o,
                  a,
                  h,
                  c,
                  l,
                  u,
                  g,
                  f,
                  d = e.target,
                  p = e.skewSign;
                return (
                  "x" === i
                    ? ((h = "y"), (c = "Y"), (l = "X"), (g = 0), (f = d.skewY))
                    : ((h = "x"), (c = "X"), (l = "Y"), (g = d.skewX), (f = 0)),
                  (a = d._getTransformedDimensions(g, f)),
                  (u = 2 * Math.abs(t) - a[i]) <= 2
                    ? (r = 0)
                    : ((r =
                        p *
                        Math.atan(
                          u / d["scale" + l] / (a[h] / d["scale" + c])
                        )),
                      (r = b.util.radiansToDegrees(r))),
                  (s = d["skew" + l] !== r),
                  d.set("skew" + l, r),
                  0 !== d["skew" + c] &&
                    ((o = d._getTransformedDimensions()),
                    (r = (n[h] / o[h]) * d["scale" + c]),
                    d.set("scale" + c, r)),
                  s
                );
              },
              _scaleObject: function (t, e, i) {
                var n = this._currentTransform,
                  r = n.target,
                  s = r.lockScalingX,
                  o = r.lockScalingY,
                  a = r.lockScalingFlip;
                if (s && o) return !1;
                var h,
                  c = r.translateToOriginPoint(
                    r.getCenterPoint(),
                    n.originX,
                    n.originY
                  ),
                  l = r.toLocalPoint(new b.Point(t, e), n.originX, n.originY),
                  u = r._getTransformedDimensions();
                return (
                  this._setLocalMouse(l, n),
                  (h = this._setObjectScale(l, n, s, o, i, a, u)),
                  r.setPositionByOrigin(c, n.originX, n.originY),
                  h
                );
              },
              _setObjectScale: function (t, e, i, n, r, s, o) {
                var a = e.target,
                  h = !1,
                  c = !1,
                  l = !1,
                  u = (t.x * a.scaleX) / o.x,
                  g = (t.y * a.scaleY) / o.y,
                  f = a.scaleX !== u,
                  d = a.scaleY !== g;
                if (
                  ((e.newScaleX = u),
                  (e.newScaleY = g),
                  b.Textbox && "x" === r && a instanceof b.Textbox)
                ) {
                  var p = a.width * (t.x / o.x);
                  return (
                    p >= a.getMinWidth() &&
                    ((l = p !== a.width), a.set("width", p), l)
                  );
                }
                return (
                  s && u <= 0 && u < a.scaleX && ((h = !0), (t.x = 0)),
                  s && g <= 0 && g < a.scaleY && ((c = !0), (t.y = 0)),
                  "equally" !== r || i || n
                    ? r
                      ? "x" !== r || a.get("lockUniScaling")
                        ? "y" !== r ||
                          a.get("lockUniScaling") ||
                          c ||
                          n ||
                          (a.set("scaleY", g) && (l = d))
                        : h || i || (a.set("scaleX", u) && (l = f))
                      : (h || i || (a.set("scaleX", u) && (l = l || f)),
                        c || n || (a.set("scaleY", g) && (l = l || d)))
                    : (l = this._scaleObjectEqually(t, a, e, o)),
                  h || c || this._flipObject(e, r),
                  l
                );
              },
              _scaleObjectEqually: function (t, e, i, n) {
                var r,
                  s,
                  o,
                  a = t.y + t.x,
                  h =
                    (n.y * i.original.scaleY) / e.scaleY +
                    (n.x * i.original.scaleX) / e.scaleX,
                  c = t.x < 0 ? -1 : 1,
                  l = t.y < 0 ? -1 : 1;
                return (
                  (s = c * Math.abs((i.original.scaleX * a) / h)),
                  (o = l * Math.abs((i.original.scaleY * a) / h)),
                  (r = s !== e.scaleX || o !== e.scaleY),
                  e.set("scaleX", s),
                  e.set("scaleY", o),
                  r
                );
              },
              _flipObject: function (t, e) {
                t.newScaleX < 0 &&
                  "y" !== e &&
                  ("left" === t.originX
                    ? (t.originX = "right")
                    : "right" === t.originX && (t.originX = "left")),
                  t.newScaleY < 0 &&
                    "x" !== e &&
                    ("top" === t.originY
                      ? (t.originY = "bottom")
                      : "bottom" === t.originY && (t.originY = "top"));
              },
              _setLocalMouse: function (t, e) {
                var i = e.target,
                  n = this.getZoom(),
                  s = i.padding / n;
                "right" === e.originX
                  ? (t.x *= -1)
                  : "center" === e.originX &&
                    ((t.x *= 2 * e.mouseXSign),
                    t.x < 0 && (e.mouseXSign = -e.mouseXSign)),
                  "bottom" === e.originY
                    ? (t.y *= -1)
                    : "center" === e.originY &&
                      ((t.y *= 2 * e.mouseYSign),
                      t.y < 0 && (e.mouseYSign = -e.mouseYSign)),
                  r(t.x) > s ? (t.x < 0 ? (t.x += s) : (t.x -= s)) : (t.x = 0),
                  r(t.y) > s ? (t.y < 0 ? (t.y += s) : (t.y -= s)) : (t.y = 0);
              },
              _rotateObject: function (t, e) {
                var r = this._currentTransform,
                  s = r.target,
                  o = s.translateToOriginPoint(
                    s.getCenterPoint(),
                    r.originX,
                    r.originY
                  );
                if (s.lockRotation) return !1;
                var a = n(r.ey - o.y, r.ex - o.x),
                  h = n(e - o.y, t - o.x),
                  c = i(h - a + r.theta),
                  l = !0;
                if (s.snapAngle > 0) {
                  var u = s.snapAngle,
                    g = s.snapThreshold || u,
                    f = Math.ceil(c / u) * u,
                    d = Math.floor(c / u) * u;
                  Math.abs(c - d) < g
                    ? (c = d)
                    : Math.abs(c - f) < g && (c = f);
                }
                return (
                  c < 0 && (c = 360 + c),
                  (c %= 360),
                  s.angle === c
                    ? (l = !1)
                    : ((s.angle = c),
                      s.setPositionByOrigin(o, r.originX, r.originY)),
                  l
                );
              },
              setCursor: function (t) {
                this.upperCanvasEl.style.cursor = t;
              },
              _drawSelection: function (t) {
                var e = this._groupSelector,
                  i = e.left,
                  n = e.top,
                  o = r(i),
                  a = r(n);
                if (
                  (this.selectionColor &&
                    ((t.fillStyle = this.selectionColor),
                    t.fillRect(
                      e.ex - (i > 0 ? 0 : -i),
                      e.ey - (n > 0 ? 0 : -n),
                      o,
                      a
                    )),
                  this.selectionLineWidth && this.selectionBorderColor)
                )
                  if (
                    ((t.lineWidth = this.selectionLineWidth),
                    (t.strokeStyle = this.selectionBorderColor),
                    this.selectionDashArray.length > 1 && !s)
                  ) {
                    var h = e.ex + 0.5 - (i > 0 ? 0 : o),
                      c = e.ey + 0.5 - (n > 0 ? 0 : a);
                    t.beginPath(),
                      b.util.drawDashedLine(
                        t,
                        h,
                        c,
                        h + o,
                        c,
                        this.selectionDashArray
                      ),
                      b.util.drawDashedLine(
                        t,
                        h,
                        c + a - 1,
                        h + o,
                        c + a - 1,
                        this.selectionDashArray
                      ),
                      b.util.drawDashedLine(
                        t,
                        h,
                        c,
                        h,
                        c + a,
                        this.selectionDashArray
                      ),
                      b.util.drawDashedLine(
                        t,
                        h + o - 1,
                        c,
                        h + o - 1,
                        c + a,
                        this.selectionDashArray
                      ),
                      t.closePath(),
                      t.stroke();
                  } else
                    b.Object.prototype._setLineDash.call(
                      this,
                      t,
                      this.selectionDashArray
                    ),
                      t.strokeRect(
                        e.ex + 0.5 - (i > 0 ? 0 : o),
                        e.ey + 0.5 - (n > 0 ? 0 : a),
                        o,
                        a
                      );
              },
              findTarget: function (t, e) {
                if (!this.skipTargetFind) {
                  var i,
                    n,
                    r = this.getPointer(t, !0),
                    s = this._activeObject,
                    o = this.getActiveObjects();
                  if (
                    ((this.targets = []),
                    o.length > 1 &&
                      !e &&
                      s === this._searchPossibleTargets([s], r))
                  )
                    return s;
                  if (1 === o.length && s._findTargetCorner(r)) return s;
                  if (
                    1 === o.length &&
                    s === this._searchPossibleTargets([s], r)
                  ) {
                    if (!this.preserveObjectStacking) return s;
                    (i = s), (n = this.targets), (this.targets = []);
                  }
                  var a = this._searchPossibleTargets(this._objects, r);
                  return (
                    t[this.altSelectionKey] &&
                      a &&
                      i &&
                      a !== i &&
                      ((a = i), (this.targets = n)),
                    a
                  );
                }
              },
              _checkTarget: function (t, e, i) {
                if (
                  e &&
                  e.visible &&
                  e.evented &&
                  this.containsPoint(null, e, t)
                ) {
                  if (
                    (!this.perPixelTargetFind && !e.perPixelTargetFind) ||
                    e.isEditing
                  )
                    return !0;
                  if (!this.isTargetTransparent(e, i.x, i.y)) return !0;
                }
              },
              _searchPossibleTargets: function (t, e) {
                for (var i, n, r = t.length; r--; ) {
                  var s = t[r],
                    o =
                      s.group && "activeSelection" !== s.group.type
                        ? this._normalizePointer(s.group, e)
                        : e;
                  if (this._checkTarget(o, s, e)) {
                    (i = t[r]).subTargetCheck &&
                      i instanceof b.Group &&
                      (n = this._searchPossibleTargets(i._objects, e)) &&
                      this.targets.push(n);
                    break;
                  }
                }
                return i;
              },
              restorePointerVpt: function (t) {
                return b.util.transformPoint(
                  t,
                  b.util.invertTransform(this.viewportTransform)
                );
              },
              getPointer: function (e, i) {
                if (this._absolutePointer && !i) return this._absolutePointer;
                if (this._pointer && i) return this._pointer;
                var n,
                  r = t(e),
                  s = this.upperCanvasEl,
                  o = s.getBoundingClientRect(),
                  a = o.width || 0,
                  h = o.height || 0;
                (a && h) ||
                  ("top" in o &&
                    "bottom" in o &&
                    (h = Math.abs(o.top - o.bottom)),
                  "right" in o &&
                    "left" in o &&
                    (a = Math.abs(o.right - o.left))),
                  this.calcOffset(),
                  (r.x = r.x - this._offset.left),
                  (r.y = r.y - this._offset.top),
                  i || (r = this.restorePointerVpt(r));
                var c = this.getRetinaScaling();
                return (
                  1 !== c && ((r.x /= c), (r.y /= c)),
                  (n =
                    0 === a || 0 === h
                      ? { width: 1, height: 1 }
                      : { width: s.width / a, height: s.height / h }),
                  { x: r.x * n.width, y: r.y * n.height }
                );
              },
              _createUpperCanvas: function () {
                var t = this.lowerCanvasEl.className.replace(
                    /\s*lower-canvas\s*/,
                    ""
                  ),
                  e = this.lowerCanvasEl,
                  i = this.upperCanvasEl;
                i
                  ? (i.className = "")
                  : ((i = this._createCanvasElement()),
                    (this.upperCanvasEl = i)),
                  b.util.addClass(i, "upper-canvas " + t),
                  this.wrapperEl.appendChild(i),
                  this._copyCanvasStyle(e, i),
                  this._applyCanvasStyle(i),
                  (this.contextTop = i.getContext("2d"));
              },
              _createCacheCanvas: function () {
                (this.cacheCanvasEl = this._createCanvasElement()),
                  this.cacheCanvasEl.setAttribute("width", this.width),
                  this.cacheCanvasEl.setAttribute("height", this.height),
                  (this.contextCache = this.cacheCanvasEl.getContext("2d"));
              },
              _initWrapperElement: function () {
                (this.wrapperEl = b.util.wrapElement(
                  this.lowerCanvasEl,
                  "div",
                  { class: this.containerClass }
                )),
                  b.util.setStyle(this.wrapperEl, {
                    width: this.width + "px",
                    height: this.height + "px",
                    position: "relative",
                  }),
                  b.util.makeElementUnselectable(this.wrapperEl);
              },
              _applyCanvasStyle: function (t) {
                var e = this.width || t.width,
                  i = this.height || t.height;
                b.util.setStyle(t, {
                  position: "absolute",
                  width: e + "px",
                  height: i + "px",
                  left: 0,
                  top: 0,
                  "touch-action": this.allowTouchScrolling
                    ? "manipulation"
                    : "none",
                  "-ms-touch-action": this.allowTouchScrolling
                    ? "manipulation"
                    : "none",
                }),
                  (t.width = e),
                  (t.height = i),
                  b.util.makeElementUnselectable(t);
              },
              _copyCanvasStyle: function (t, e) {
                e.style.cssText = t.style.cssText;
              },
              getSelectionContext: function () {
                return this.contextTop;
              },
              getSelectionElement: function () {
                return this.upperCanvasEl;
              },
              getActiveObject: function () {
                return this._activeObject;
              },
              getActiveObjects: function () {
                var t = this._activeObject;
                return t
                  ? "activeSelection" === t.type && t._objects
                    ? t._objects.slice(0)
                    : [t]
                  : [];
              },
              _onObjectRemoved: function (t) {
                t === this._activeObject &&
                  (this.fire("before:selection:cleared", { target: t }),
                  this._discardActiveObject(),
                  this.fire("selection:cleared", { target: t }),
                  t.fire("deselected")),
                  t === this._hoveredTarget &&
                    ((this._hoveredTarget = null), (this._hoveredTargets = [])),
                  this.callSuper("_onObjectRemoved", t);
              },
              _fireSelectionEvents: function (t, e) {
                var i = !1,
                  n = this.getActiveObjects(),
                  r = [],
                  s = [],
                  o = { e: e };
                t.forEach(function (t) {
                  -1 === n.indexOf(t) &&
                    ((i = !0), t.fire("deselected", o), s.push(t));
                }),
                  n.forEach(function (e) {
                    -1 === t.indexOf(e) &&
                      ((i = !0), e.fire("selected", o), r.push(e));
                  }),
                  t.length > 0 && n.length > 0
                    ? ((o.selected = r),
                      (o.deselected = s),
                      (o.updated = r[0] || s[0]),
                      (o.target = this._activeObject),
                      i && this.fire("selection:updated", o))
                    : n.length > 0
                    ? (1 === n.length &&
                        ((o.target = r[0]), this.fire("object:selected", o)),
                      (o.selected = r),
                      (o.target = this._activeObject),
                      this.fire("selection:created", o))
                    : t.length > 0 &&
                      ((o.deselected = s), this.fire("selection:cleared", o));
              },
              setActiveObject: function (t, e) {
                var i = this.getActiveObjects();
                return (
                  this._setActiveObject(t, e),
                  this._fireSelectionEvents(i, e),
                  this
                );
              },
              _setActiveObject: function (t, e) {
                return (
                  this._activeObject !== t &&
                  !!this._discardActiveObject(e, t) &&
                  !t.onSelect({ e: e }) &&
                  ((this._activeObject = t), !0)
                );
              },
              _discardActiveObject: function (t, e) {
                var i = this._activeObject;
                if (i) {
                  if (i.onDeselect({ e: t, object: e })) return !1;
                  this._activeObject = null;
                }
                return !0;
              },
              discardActiveObject: function (t) {
                var e = this.getActiveObjects(),
                  i = this.getActiveObject();
                return (
                  e.length &&
                    this.fire("before:selection:cleared", { target: i, e: t }),
                  this._discardActiveObject(t),
                  this._fireSelectionEvents(e, t),
                  this
                );
              },
              dispose: function () {
                var t = this.wrapperEl;
                return (
                  this.removeListeners(),
                  t.removeChild(this.upperCanvasEl),
                  t.removeChild(this.lowerCanvasEl),
                  (this.contextCache = null),
                  (this.contextTop = null),
                  ["upperCanvasEl", "cacheCanvasEl"].forEach(
                    function (t) {
                      b.util.cleanUpJsdomNode(this[t]), (this[t] = void 0);
                    }.bind(this)
                  ),
                  t.parentNode &&
                    t.parentNode.replaceChild(
                      this.lowerCanvasEl,
                      this.wrapperEl
                    ),
                  delete this.wrapperEl,
                  b.StaticCanvas.prototype.dispose.call(this),
                  this
                );
              },
              clear: function () {
                return (
                  this.discardActiveObject(),
                  this.clearContext(this.contextTop),
                  this.callSuper("clear")
                );
              },
              drawControls: function (t) {
                var e = this._activeObject;
                e && e._renderControls(t);
              },
              _toObject: function (t, e, i) {
                var n = this._realizeGroupTransformOnObject(t),
                  r = this.callSuper("_toObject", t, e, i);
                return this._unwindGroupTransformOnObject(t, n), r;
              },
              _realizeGroupTransformOnObject: function (t) {
                if (
                  t.group &&
                  "activeSelection" === t.group.type &&
                  this._activeObject === t.group
                ) {
                  var e = {};
                  return (
                    [
                      "angle",
                      "flipX",
                      "flipY",
                      "left",
                      "scaleX",
                      "scaleY",
                      "skewX",
                      "skewY",
                      "top",
                    ].forEach(function (i) {
                      e[i] = t[i];
                    }),
                    this._activeObject.realizeTransform(t),
                    e
                  );
                }
                return null;
              },
              _unwindGroupTransformOnObject: function (t, e) {
                e && t.set(e);
              },
              _setSVGObject: function (t, e, i) {
                var n = this._realizeGroupTransformOnObject(e);
                this.callSuper("_setSVGObject", t, e, i),
                  this._unwindGroupTransformOnObject(e, n);
              },
              setViewportTransform: function (t) {
                this.renderOnAddRemove &&
                  this._activeObject &&
                  this._activeObject.isEditing &&
                  this._activeObject.clearContextTop(),
                  b.StaticCanvas.prototype.setViewportTransform.call(this, t);
              },
            })),
            b.StaticCanvas))
              "prototype" !== o && (b.Canvas[o] = b.StaticCanvas[o]);
          })(),
          (function () {
            var t = { mt: 0, tr: 1, mr: 2, br: 3, mb: 4, bl: 5, ml: 6, tl: 7 },
              e = b.util.addListener,
              i = b.util.removeListener,
              n = { passive: !1 };
            function r(t, e) {
              return t.button && t.button === e - 1;
            }
            b.util.object.extend(b.Canvas.prototype, {
              cursorMap: [
                "n-resize",
                "ne-resize",
                "e-resize",
                "se-resize",
                "s-resize",
                "sw-resize",
                "w-resize",
                "nw-resize",
              ],
              mainTouchId: null,
              _initEventListeners: function () {
                this.removeListeners(),
                  this._bindEvents(),
                  this.addOrRemove(e, "add");
              },
              _getEventPrefix: function () {
                return this.enablePointerEvents ? "pointer" : "mouse";
              },
              addOrRemove: function (t, e) {
                var i = this.upperCanvasEl,
                  r = this._getEventPrefix();
                t(b.window, "resize", this._onResize),
                  t(i, r + "down", this._onMouseDown),
                  t(i, r + "move", this._onMouseMove, n),
                  t(i, r + "out", this._onMouseOut),
                  t(i, r + "enter", this._onMouseEnter),
                  t(i, "wheel", this._onMouseWheel),
                  t(i, "contextmenu", this._onContextMenu),
                  t(i, "dblclick", this._onDoubleClick),
                  t(i, "dragover", this._onDragOver),
                  t(i, "dragenter", this._onDragEnter),
                  t(i, "dragleave", this._onDragLeave),
                  t(i, "drop", this._onDrop),
                  this.enablePointerEvents ||
                    t(i, "touchstart", this._onTouchStart, n),
                  "undefined" != typeof eventjs &&
                    e in eventjs &&
                    (eventjs[e](i, "gesture", this._onGesture),
                    eventjs[e](i, "drag", this._onDrag),
                    eventjs[e](i, "orientation", this._onOrientationChange),
                    eventjs[e](i, "shake", this._onShake),
                    eventjs[e](i, "longpress", this._onLongPress));
              },
              removeListeners: function () {
                this.addOrRemove(i, "remove");
                var t = this._getEventPrefix();
                i(b.document, t + "up", this._onMouseUp),
                  i(b.document, "touchend", this._onTouchEnd, n),
                  i(b.document, t + "move", this._onMouseMove, n),
                  i(b.document, "touchmove", this._onMouseMove, n);
              },
              _bindEvents: function () {
                this.eventsBound ||
                  ((this._onMouseDown = this._onMouseDown.bind(this)),
                  (this._onTouchStart = this._onTouchStart.bind(this)),
                  (this._onMouseMove = this._onMouseMove.bind(this)),
                  (this._onMouseUp = this._onMouseUp.bind(this)),
                  (this._onTouchEnd = this._onTouchEnd.bind(this)),
                  (this._onResize = this._onResize.bind(this)),
                  (this._onGesture = this._onGesture.bind(this)),
                  (this._onDrag = this._onDrag.bind(this)),
                  (this._onShake = this._onShake.bind(this)),
                  (this._onLongPress = this._onLongPress.bind(this)),
                  (this._onOrientationChange =
                    this._onOrientationChange.bind(this)),
                  (this._onMouseWheel = this._onMouseWheel.bind(this)),
                  (this._onMouseOut = this._onMouseOut.bind(this)),
                  (this._onMouseEnter = this._onMouseEnter.bind(this)),
                  (this._onContextMenu = this._onContextMenu.bind(this)),
                  (this._onDoubleClick = this._onDoubleClick.bind(this)),
                  (this._onDragOver = this._onDragOver.bind(this)),
                  (this._onDragEnter = this._simpleEventHandler.bind(
                    this,
                    "dragenter"
                  )),
                  (this._onDragLeave = this._simpleEventHandler.bind(
                    this,
                    "dragleave"
                  )),
                  (this._onDrop = this._simpleEventHandler.bind(this, "drop")),
                  (this.eventsBound = !0));
              },
              _onGesture: function (t, e) {
                this.__onTransformGesture && this.__onTransformGesture(t, e);
              },
              _onDrag: function (t, e) {
                this.__onDrag && this.__onDrag(t, e);
              },
              _onMouseWheel: function (t) {
                this.__onMouseWheel(t);
              },
              _onMouseOut: function (t) {
                var e = this._hoveredTarget;
                this.fire("mouse:out", { target: e, e: t }),
                  (this._hoveredTarget = null),
                  e && e.fire("mouseout", { e: t });
                var i = this;
                this._hoveredTargets.forEach(function (n) {
                  i.fire("mouse:out", { target: e, e: t }),
                    n && e.fire("mouseout", { e: t });
                }),
                  (this._hoveredTargets = []),
                  this._iTextInstances &&
                    this._iTextInstances.forEach(function (t) {
                      t.isEditing && t.hiddenTextarea.focus();
                    });
              },
              _onMouseEnter: function (t) {
                this.currentTransform ||
                  this.findTarget(t) ||
                  (this.fire("mouse:over", { target: null, e: t }),
                  (this._hoveredTarget = null),
                  (this._hoveredTargets = []));
              },
              _onOrientationChange: function (t, e) {
                this.__onOrientationChange && this.__onOrientationChange(t, e);
              },
              _onShake: function (t, e) {
                this.__onShake && this.__onShake(t, e);
              },
              _onLongPress: function (t, e) {
                this.__onLongPress && this.__onLongPress(t, e);
              },
              _onDragOver: function (t) {
                t.preventDefault();
                var e = this._simpleEventHandler("dragover", t);
                this._fireEnterLeaveEvents(e, t);
              },
              _onContextMenu: function (t) {
                return (
                  this.stopContextMenu &&
                    (t.stopPropagation(), t.preventDefault()),
                  !1
                );
              },
              _onDoubleClick: function (t) {
                this._cacheTransformEventData(t),
                  this._handleEvent(t, "dblclick"),
                  this._resetTransformEventData(t);
              },
              getPointerId: function (t) {
                var e = t.changedTouches;
                return e
                  ? e[0] && e[0].identifier
                  : this.enablePointerEvents
                  ? t.pointerId
                  : -1;
              },
              _isMainEvent: function (t) {
                return (
                  !0 === t.isPrimary ||
                  (!1 !== t.isPrimary &&
                    (("touchend" === t.type && 0 === t.touches.length) ||
                      !t.changedTouches ||
                      t.changedTouches[0].identifier === this.mainTouchId))
                );
              },
              _onTouchStart: function (t) {
                t.preventDefault(),
                  null === this.mainTouchId &&
                    (this.mainTouchId = this.getPointerId(t)),
                  this.__onMouseDown(t),
                  this._resetTransformEventData();
                var r = this.upperCanvasEl,
                  s = this._getEventPrefix();
                e(b.document, "touchend", this._onTouchEnd, n),
                  e(b.document, "touchmove", this._onMouseMove, n),
                  i(r, s + "down", this._onMouseDown);
              },
              _onMouseDown: function (t) {
                this.__onMouseDown(t), this._resetTransformEventData();
                var r = this.upperCanvasEl,
                  s = this._getEventPrefix();
                i(r, s + "move", this._onMouseMove, n),
                  e(b.document, s + "up", this._onMouseUp),
                  e(b.document, s + "move", this._onMouseMove, n);
              },
              _onTouchEnd: function (t) {
                if (!(t.touches.length > 0)) {
                  this.__onMouseUp(t),
                    this._resetTransformEventData(),
                    (this.mainTouchId = null);
                  var r = this._getEventPrefix();
                  i(b.document, "touchend", this._onTouchEnd, n),
                    i(b.document, "touchmove", this._onMouseMove, n);
                  var s = this;
                  this._willAddMouseDown &&
                    clearTimeout(this._willAddMouseDown),
                    (this._willAddMouseDown = setTimeout(function () {
                      e(s.upperCanvasEl, r + "down", s._onMouseDown),
                        (s._willAddMouseDown = 0);
                    }, 400));
                }
              },
              _onMouseUp: function (t) {
                this.__onMouseUp(t), this._resetTransformEventData();
                var r = this.upperCanvasEl,
                  s = this._getEventPrefix();
                this._isMainEvent(t) &&
                  (i(b.document, s + "up", this._onMouseUp),
                  i(b.document, s + "move", this._onMouseMove, n),
                  e(r, s + "move", this._onMouseMove, n));
              },
              _onMouseMove: function (t) {
                !this.allowTouchScrolling &&
                  t.preventDefault &&
                  t.preventDefault(),
                  this.__onMouseMove(t);
              },
              _onResize: function () {
                this.calcOffset();
              },
              _shouldRender: function (t) {
                var e = this._activeObject;
                return (
                  !!(!!e != !!t || (e && t && e !== t)) ||
                  (e && e.isEditing, !1)
                );
              },
              __onMouseUp: function (t) {
                var e,
                  i = this._currentTransform,
                  n = this._groupSelector,
                  s = !1,
                  o = !n || (0 === n.left && 0 === n.top);
                if (
                  (this._cacheTransformEventData(t),
                  (e = this._target),
                  this._handleEvent(t, "up:before"),
                  !r(t, 3))
                )
                  return r(t, 2)
                    ? (this.fireMiddleClick && this._handleEvent(t, "up", 2, o),
                      void this._resetTransformEventData())
                    : void (this.isDrawingMode && this._isCurrentlyDrawing
                        ? this._onMouseUpInDrawingMode(t)
                        : this._isMainEvent(t) &&
                          (i &&
                            (this._finalizeCurrentTransform(t),
                            (s = i.actionPerformed)),
                          o ||
                            (this._maybeGroupObjects(t),
                            s || (s = this._shouldRender(e))),
                          e && (e.isMoving = !1),
                          this._setCursorFromEvent(t, e),
                          this._handleEvent(t, "up", 1, o),
                          (this._groupSelector = null),
                          (this._currentTransform = null),
                          e && (e.__corner = 0),
                          s ? this.requestRenderAll() : o || this.renderTop()));
                this.fireRightClick && this._handleEvent(t, "up", 3, o);
              },
              _simpleEventHandler: function (t, e) {
                var i = this.findTarget(e),
                  n = this.targets,
                  r = { e: e, target: i, subTargets: n };
                if ((this.fire(t, r), i && i.fire(t, r), !n)) return i;
                for (var s = 0; s < n.length; s++) n[s].fire(t, r);
                return i;
              },
              _handleEvent: function (t, e, i, n) {
                var r = this._target,
                  s = this.targets || [],
                  o = {
                    e: t,
                    target: r,
                    subTargets: s,
                    button: i || 1,
                    isClick: n || !1,
                    pointer: this._pointer,
                    absolutePointer: this._absolutePointer,
                    transform: this._currentTransform,
                  };
                this.fire("mouse:" + e, o), r && r.fire("mouse" + e, o);
                for (var a = 0; a < s.length; a++) s[a].fire("mouse" + e, o);
              },
              _finalizeCurrentTransform: function (t) {
                var e,
                  i = this._currentTransform,
                  n = i.target,
                  r = { e: t, target: n, transform: i };
                n._scaling && (n._scaling = !1),
                  n.setCoords(),
                  (i.actionPerformed ||
                    (this.stateful && n.hasStateChanged())) &&
                    (i.actionPerformed &&
                      ((e = this._addEventOptions(r, i)), this._fire(e, r)),
                    this._fire("modified", r));
              },
              _addEventOptions: function (t, e) {
                var i, n;
                switch (e.action) {
                  case "scaleX":
                    (i = "scaled"), (n = "x");
                    break;
                  case "scaleY":
                    (i = "scaled"), (n = "y");
                    break;
                  case "skewX":
                    (i = "skewed"), (n = "x");
                    break;
                  case "skewY":
                    (i = "skewed"), (n = "y");
                    break;
                  case "scale":
                    (i = "scaled"), (n = "equally");
                    break;
                  case "rotate":
                    i = "rotated";
                    break;
                  case "drag":
                    i = "moved";
                }
                return (t.by = n), i;
              },
              _onMouseDownInDrawingMode: function (t) {
                (this._isCurrentlyDrawing = !0),
                  this.getActiveObject() &&
                    this.discardActiveObject(t).requestRenderAll(),
                  this.clipTo && b.util.clipContext(this, this.contextTop);
                var e = this.getPointer(t);
                this.freeDrawingBrush.onMouseDown(e, { e: t, pointer: e }),
                  this._handleEvent(t, "down");
              },
              _onMouseMoveInDrawingMode: function (t) {
                if (this._isCurrentlyDrawing) {
                  var e = this.getPointer(t);
                  this.freeDrawingBrush.onMouseMove(e, { e: t, pointer: e });
                }
                this.setCursor(this.freeDrawingCursor),
                  this._handleEvent(t, "move");
              },
              _onMouseUpInDrawingMode: function (t) {
                this.clipTo && this.contextTop.restore();
                var e = this.getPointer(t);
                (this._isCurrentlyDrawing = this.freeDrawingBrush.onMouseUp({
                  e: t,
                  pointer: e,
                })),
                  this._handleEvent(t, "up");
              },
              __onMouseDown: function (t) {
                this._cacheTransformEventData(t),
                  this._handleEvent(t, "down:before");
                var e = this._target;
                if (r(t, 3))
                  this.fireRightClick && this._handleEvent(t, "down", 3);
                else if (r(t, 2))
                  this.fireMiddleClick && this._handleEvent(t, "down", 2);
                else if (this.isDrawingMode) this._onMouseDownInDrawingMode(t);
                else if (this._isMainEvent(t) && !this._currentTransform) {
                  var i = this._pointer;
                  this._previousPointer = i;
                  var n = this._shouldRender(e),
                    s = this._shouldGroup(t, e);
                  if (
                    (this._shouldClearSelection(t, e)
                      ? this.discardActiveObject(t)
                      : s &&
                        (this._handleGrouping(t, e), (e = this._activeObject)),
                    !this.selection ||
                      (e &&
                        (e.selectable ||
                          e.isEditing ||
                          e === this._activeObject)) ||
                      (this._groupSelector = {
                        ex: i.x,
                        ey: i.y,
                        top: 0,
                        left: 0,
                      }),
                    e)
                  ) {
                    var o = e === this._activeObject;
                    e.selectable && this.setActiveObject(e, t),
                      e !== this._activeObject ||
                        (!e.__corner && s) ||
                        this._setupCurrentTransform(t, e, o);
                  }
                  this._handleEvent(t, "down"),
                    (n || s) && this.requestRenderAll();
                }
              },
              _resetTransformEventData: function () {
                (this._target = null),
                  (this._pointer = null),
                  (this._absolutePointer = null);
              },
              _cacheTransformEventData: function (t) {
                this._resetTransformEventData(),
                  (this._pointer = this.getPointer(t, !0)),
                  (this._absolutePointer = this.restorePointerVpt(
                    this._pointer
                  )),
                  (this._target = this._currentTransform
                    ? this._currentTransform.target
                    : this.findTarget(t) || null);
              },
              _beforeTransform: function (t) {
                var e = this._currentTransform;
                this.stateful && e.target.saveState(),
                  this.fire("before:transform", { e: t, transform: e }),
                  e.corner && this.onBeforeScaleRotate(e.target);
              },
              __onMouseMove: function (t) {
                var e, i;
                if (
                  (this._handleEvent(t, "move:before"),
                  this._cacheTransformEventData(t),
                  this.isDrawingMode)
                )
                  this._onMouseMoveInDrawingMode(t);
                else if (this._isMainEvent(t)) {
                  var n = this._groupSelector;
                  n
                    ? ((i = this._pointer),
                      (n.left = i.x - n.ex),
                      (n.top = i.y - n.ey),
                      this.renderTop())
                    : this._currentTransform
                    ? this._transformObject(t)
                    : ((e = this.findTarget(t) || null),
                      this._setCursorFromEvent(t, e),
                      this._fireOverOutEvents(e, t)),
                    this._handleEvent(t, "move"),
                    this._resetTransformEventData();
                }
              },
              _fireOverOutEvents: function (t, e) {
                var i = this._hoveredTarget,
                  n = this._hoveredTargets,
                  r = this.targets,
                  s = Math.max(n.length, r.length);
                this.fireSyntheticInOutEvents(t, e, {
                  oldTarget: i,
                  evtOut: "mouseout",
                  canvasEvtOut: "mouse:out",
                  evtIn: "mouseover",
                  canvasEvtIn: "mouse:over",
                });
                for (var o = 0; o < s; o++)
                  this.fireSyntheticInOutEvents(r[o], e, {
                    oldTarget: n[o],
                    evtOut: "mouseout",
                    evtIn: "mouseover",
                  });
                (this._hoveredTarget = t),
                  (this._hoveredTargets = this.targets.concat());
              },
              _fireEnterLeaveEvents: function (t, e) {
                var i = this._draggedoverTarget,
                  n = this._hoveredTargets,
                  r = this.targets,
                  s = Math.max(n.length, r.length);
                this.fireSyntheticInOutEvents(t, e, {
                  oldTarget: i,
                  evtOut: "dragleave",
                  evtIn: "dragenter",
                });
                for (var o = 0; o < s; o++)
                  this.fireSyntheticInOutEvents(r[o], e, {
                    oldTarget: n[o],
                    evtOut: "dragleave",
                    evtIn: "dragenter",
                  });
                this._draggedoverTarget = t;
              },
              fireSyntheticInOutEvents: function (t, e, i) {
                var n,
                  r,
                  s,
                  o = i.oldTarget,
                  a = o !== t,
                  h = i.canvasEvtIn,
                  c = i.canvasEvtOut;
                a &&
                  ((n = { e: e, target: t, previousTarget: o }),
                  (r = { e: e, target: o, nextTarget: t })),
                  (s = t && a),
                  o && a && (c && this.fire(c, r), o.fire(i.evtOut, r)),
                  s && (h && this.fire(h, n), t.fire(i.evtIn, n));
              },
              __onMouseWheel: function (t) {
                this._cacheTransformEventData(t),
                  this._handleEvent(t, "wheel"),
                  this._resetTransformEventData();
              },
              _transformObject: function (t) {
                var e = this.getPointer(t),
                  i = this._currentTransform;
                (i.reset = !1),
                  (i.target.isMoving = !0),
                  (i.shiftKey = t.shiftKey),
                  (i.altKey = t[this.centeredKey]),
                  this._beforeScaleTransform(t, i),
                  this._performTransformAction(t, i, e),
                  i.actionPerformed && this.requestRenderAll();
              },
              _performTransformAction: function (t, e, i) {
                var n = i.x,
                  r = i.y,
                  s = e.action,
                  o = !1,
                  a = { target: e.target, e: t, transform: e, pointer: i };
                "rotate" === s
                  ? (o = this._rotateObject(n, r)) && this._fire("rotating", a)
                  : "scale" === s
                  ? (o = this._onScale(t, e, n, r)) && this._fire("scaling", a)
                  : "scaleX" === s
                  ? (o = this._scaleObject(n, r, "x")) &&
                    this._fire("scaling", a)
                  : "scaleY" === s
                  ? (o = this._scaleObject(n, r, "y")) &&
                    this._fire("scaling", a)
                  : "skewX" === s
                  ? (o = this._skewObject(n, r, "x")) &&
                    this._fire("skewing", a)
                  : "skewY" === s
                  ? (o = this._skewObject(n, r, "y")) &&
                    this._fire("skewing", a)
                  : (o = this._translateObject(n, r)) &&
                    (this._fire("moving", a),
                    this.setCursor(a.target.moveCursor || this.moveCursor)),
                  (e.actionPerformed = e.actionPerformed || o);
              },
              _fire: function (t, e) {
                this.fire("object:" + t, e), e.target.fire(t, e);
              },
              _beforeScaleTransform: function (t, e) {
                if (
                  "scale" === e.action ||
                  "scaleX" === e.action ||
                  "scaleY" === e.action
                ) {
                  var i = this._shouldCenterTransform(e.target);
                  ((i && ("center" !== e.originX || "center" !== e.originY)) ||
                    (!i && "center" === e.originX && "center" === e.originY)) &&
                    (this._resetCurrentTransform(), (e.reset = !0));
                }
              },
              _onScale: function (t, e, i, n) {
                return this._isUniscalePossible(t, e.target)
                  ? ((e.currentAction = "scale"), this._scaleObject(i, n))
                  : (e.reset ||
                      "scale" !== e.currentAction ||
                      this._resetCurrentTransform(),
                    (e.currentAction = "scaleEqually"),
                    this._scaleObject(i, n, "equally"));
              },
              _isUniscalePossible: function (t, e) {
                return (
                  (t[this.uniScaleKey] || this.uniScaleTransform) &&
                  !e.get("lockUniScaling")
                );
              },
              _setCursorFromEvent: function (t, e) {
                if (!e) return this.setCursor(this.defaultCursor), !1;
                var i = e.hoverCursor || this.hoverCursor,
                  n =
                    this._activeObject &&
                    "activeSelection" === this._activeObject.type
                      ? this._activeObject
                      : null,
                  r =
                    (!n || !n.contains(e)) &&
                    e._findTargetCorner(this.getPointer(t, !0));
                r
                  ? this.setCursor(this.getCornerCursor(r, e, t))
                  : (e.subTargetCheck &&
                      this.targets
                        .concat()
                        .reverse()
                        .map(function (t) {
                          i = t.hoverCursor || i;
                        }),
                    this.setCursor(i));
              },
              getCornerCursor: function (e, i, n) {
                return this.actionIsDisabled(e, i, n)
                  ? this.notAllowedCursor
                  : e in t
                  ? this._getRotatedCornerCursor(e, i, n)
                  : "mtr" === e && i.hasRotatingPoint
                  ? this.rotationCursor
                  : this.defaultCursor;
              },
              actionIsDisabled: function (t, e, i) {
                return "mt" === t || "mb" === t
                  ? i[this.altActionKey]
                    ? e.lockSkewingX
                    : e.lockScalingY
                  : "ml" === t || "mr" === t
                  ? i[this.altActionKey]
                    ? e.lockSkewingY
                    : e.lockScalingX
                  : "mtr" === t
                  ? e.lockRotation
                  : this._isUniscalePossible(i, e)
                  ? e.lockScalingX && e.lockScalingY
                  : e.lockScalingX || e.lockScalingY;
              },
              _getRotatedCornerCursor: function (e, i, n) {
                var r = Math.round((i.angle % 360) / 45);
                return (
                  r < 0 && (r += 8),
                  (r += t[e]),
                  n[this.altActionKey] && t[e] % 2 == 0 && (r += 2),
                  (r %= 8),
                  this.cursorMap[r]
                );
              },
            });
          })(),
          (C = Math.min),
          (A = Math.max),
          b.util.object.extend(b.Canvas.prototype, {
            _shouldGroup: function (t, e) {
              var i = this._activeObject;
              return (
                i &&
                this._isSelectionKeyPressed(t) &&
                e &&
                e.selectable &&
                this.selection &&
                (i !== e || "activeSelection" === i.type) &&
                !e.onSelect({ e: t })
              );
            },
            _handleGrouping: function (t, e) {
              var i = this._activeObject;
              i.__corner ||
                ((e !== i || ((e = this.findTarget(t, !0)) && e.selectable)) &&
                  (i && "activeSelection" === i.type
                    ? this._updateActiveSelection(e, t)
                    : this._createActiveSelection(e, t)));
            },
            _updateActiveSelection: function (t, e) {
              var i = this._activeObject,
                n = i._objects.slice(0);
              i.contains(t)
                ? (i.removeWithUpdate(t),
                  (this._hoveredTarget = t),
                  (this._hoveredTargets = this.targets.concat()),
                  1 === i.size() && this._setActiveObject(i.item(0), e))
                : (i.addWithUpdate(t),
                  (this._hoveredTarget = i),
                  (this._hoveredTargets = this.targets.concat())),
                this._fireSelectionEvents(n, e);
            },
            _createActiveSelection: function (t, e) {
              var i = this.getActiveObjects(),
                n = this._createGroup(t);
              (this._hoveredTarget = n),
                this._setActiveObject(n, e),
                this._fireSelectionEvents(i, e);
            },
            _createGroup: function (t) {
              var e = this._objects,
                i =
                  e.indexOf(this._activeObject) < e.indexOf(t)
                    ? [this._activeObject, t]
                    : [t, this._activeObject];
              return (
                this._activeObject.isEditing &&
                  this._activeObject.exitEditing(),
                new b.ActiveSelection(i, { canvas: this })
              );
            },
            _groupSelectedObjects: function (t) {
              var e,
                i = this._collectObjects(t);
              1 === i.length
                ? this.setActiveObject(i[0], t)
                : i.length > 1 &&
                  ((e = new b.ActiveSelection(i.reverse(), { canvas: this })),
                  this.setActiveObject(e, t));
            },
            _collectObjects: function (t) {
              for (
                var e,
                  i = [],
                  n = this._groupSelector.ex,
                  r = this._groupSelector.ey,
                  s = n + this._groupSelector.left,
                  o = r + this._groupSelector.top,
                  a = new b.Point(C(n, s), C(r, o)),
                  h = new b.Point(A(n, s), A(r, o)),
                  c = !this.selectionFullyContained,
                  l = n === s && r === o,
                  u = this._objects.length;
                u-- &&
                !(
                  (e = this._objects[u]) &&
                  e.selectable &&
                  e.visible &&
                  ((c && e.intersectsWithRect(a, h)) ||
                    e.isContainedWithinRect(a, h) ||
                    (c && e.containsPoint(a)) ||
                    (c && e.containsPoint(h))) &&
                  (i.push(e), l)
                );

              );
              return (
                i.length > 1 &&
                  (i = i.filter(function (e) {
                    return !e.onSelect({ e: t });
                  })),
                i
              );
            },
            _maybeGroupObjects: function (t) {
              this.selection &&
                this._groupSelector &&
                this._groupSelectedObjects(t),
                this.setCursor(this.defaultCursor),
                (this._groupSelector = null);
            },
          }),
          b.util.object.extend(b.StaticCanvas.prototype, {
            toDataURL: function (t) {
              t || (t = {});
              var e = t.format || "png",
                i = t.quality || 1,
                n =
                  (t.multiplier || 1) *
                  (t.enableRetinaScaling ? this.getRetinaScaling() : 1),
                r = this.toCanvasElement(n, t);
              return b.util.toDataURL(r, e, i);
            },
            toCanvasElement: function (t, e) {
              t = t || 1;
              var i = ((e = e || {}).width || this.width) * t,
                n = (e.height || this.height) * t,
                r = this.getZoom(),
                s = this.width,
                o = this.height,
                a = r * t,
                h = this.viewportTransform,
                c = (h[4] - (e.left || 0)) * t,
                l = (h[5] - (e.top || 0)) * t,
                u = this.interactive,
                g = [a, 0, 0, a, c, l],
                f = this.enableRetinaScaling,
                d = b.util.createCanvasElement(),
                p = this.contextTop;
              return (
                (d.width = i),
                (d.height = n),
                (this.contextTop = null),
                (this.enableRetinaScaling = !1),
                (this.interactive = !1),
                (this.viewportTransform = g),
                (this.width = i),
                (this.height = n),
                this.calcViewportBoundaries(),
                this.renderCanvas(d.getContext("2d"), this._objects),
                (this.viewportTransform = h),
                (this.width = s),
                (this.height = o),
                this.calcViewportBoundaries(),
                (this.interactive = u),
                (this.enableRetinaScaling = f),
                (this.contextTop = p),
                d
              );
            },
          }),
          b.util.object.extend(b.StaticCanvas.prototype, {
            loadFromDatalessJSON: function (t, e, i) {
              return this.loadFromJSON(t, e, i);
            },
            loadFromJSON: function (t, e, i) {
              if (t) {
                var n =
                    "string" == typeof t
                      ? JSON.parse(t)
                      : b.util.object.clone(t),
                  r = this,
                  s = n.clipPath,
                  o = this.renderOnAddRemove;
                return (
                  (this.renderOnAddRemove = !1),
                  delete n.clipPath,
                  this._enlivenObjects(
                    n.objects,
                    function (t) {
                      r.clear(),
                        r._setBgOverlay(n, function () {
                          s
                            ? r._enlivenObjects([s], function (i) {
                                (r.clipPath = i[0]),
                                  r.__setupCanvas.call(r, n, t, o, e);
                              })
                            : r.__setupCanvas.call(r, n, t, o, e);
                        });
                    },
                    i
                  ),
                  this
                );
              }
            },
            __setupCanvas: function (t, e, i, n) {
              var r = this;
              e.forEach(function (t, e) {
                r.insertAt(t, e);
              }),
                (this.renderOnAddRemove = i),
                delete t.objects,
                delete t.backgroundImage,
                delete t.overlayImage,
                delete t.background,
                delete t.overlay,
                this._setOptions(t),
                this.renderAll(),
                n && n();
            },
            _setBgOverlay: function (t, e) {
              var i = {
                backgroundColor: !1,
                overlayColor: !1,
                backgroundImage: !1,
                overlayImage: !1,
              };
              if (
                t.backgroundImage ||
                t.overlayImage ||
                t.background ||
                t.overlay
              ) {
                var n = function () {
                  i.backgroundImage &&
                    i.overlayImage &&
                    i.backgroundColor &&
                    i.overlayColor &&
                    e &&
                    e();
                };
                this.__setBgOverlay("backgroundImage", t.backgroundImage, i, n),
                  this.__setBgOverlay("overlayImage", t.overlayImage, i, n),
                  this.__setBgOverlay("backgroundColor", t.background, i, n),
                  this.__setBgOverlay("overlayColor", t.overlay, i, n);
              } else e && e();
            },
            __setBgOverlay: function (t, e, i, n) {
              var r = this;
              if (!e) return (i[t] = !0), void (n && n());
              "backgroundImage" === t || "overlayImage" === t
                ? b.util.enlivenObjects([e], function (e) {
                    (r[t] = e[0]), (i[t] = !0), n && n();
                  })
                : this["set" + b.util.string.capitalize(t, !0)](e, function () {
                    (i[t] = !0), n && n();
                  });
            },
            _enlivenObjects: function (t, e, i) {
              t && 0 !== t.length
                ? b.util.enlivenObjects(
                    t,
                    function (t) {
                      e && e(t);
                    },
                    null,
                    i
                  )
                : e && e([]);
            },
            _toDataURL: function (t, e) {
              this.clone(function (i) {
                e(i.toDataURL(t));
              });
            },
            _toDataURLWithMultiplier: function (t, e, i) {
              this.clone(function (n) {
                i(n.toDataURLWithMultiplier(t, e));
              });
            },
            clone: function (t, e) {
              var i = JSON.stringify(this.toJSON(e));
              this.cloneWithoutData(function (e) {
                e.loadFromJSON(i, function () {
                  t && t(e);
                });
              });
            },
            cloneWithoutData: function (t) {
              var e = b.util.createCanvasElement();
              (e.width = this.width), (e.height = this.height);
              var i = new b.Canvas(e);
              (i.clipTo = this.clipTo),
                this.backgroundImage
                  ? (i.setBackgroundImage(
                      this.backgroundImage.src,
                      function () {
                        i.renderAll(), t && t(i);
                      }
                    ),
                    (i.backgroundImageOpacity = this.backgroundImageOpacity),
                    (i.backgroundImageStretch = this.backgroundImageStretch))
                  : t && t(i);
            },
          }),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.object.extend,
              n = e.util.object.clone,
              r = e.util.toFixed,
              s = e.util.string.capitalize,
              o = e.util.degreesToRadians,
              a = e.StaticCanvas.supports("setLineDash"),
              h = !e.isLikelyNode;
            e.Object ||
              ((e.Object = e.util.createClass(e.CommonMethods, {
                type: "object",
                originX: "left",
                originY: "top",
                top: 0,
                left: 0,
                width: 0,
                height: 0,
                scaleX: 1,
                scaleY: 1,
                flipX: !1,
                flipY: !1,
                opacity: 1,
                angle: 0,
                skewX: 0,
                skewY: 0,
                cornerSize: 13,
                transparentCorners: !0,
                hoverCursor: null,
                moveCursor: null,
                padding: 0,
                borderColor: "rgba(102,153,255,0.75)",
                borderDashArray: null,
                cornerColor: "rgba(102,153,255,0.5)",
                cornerStrokeColor: null,
                cornerStyle: "rect",
                cornerDashArray: null,
                centeredScaling: !1,
                centeredRotation: !0,
                fill: "rgb(0,0,0)",
                fillRule: "nonzero",
                globalCompositeOperation: "source-over",
                backgroundColor: "",
                selectionBackgroundColor: "",
                stroke: null,
                strokeWidth: 1,
                strokeDashArray: null,
                strokeDashOffset: 0,
                strokeLineCap: "butt",
                strokeLineJoin: "miter",
                strokeMiterLimit: 4,
                shadow: null,
                borderOpacityWhenMoving: 0.4,
                borderScaleFactor: 1,
                transformMatrix: null,
                minScaleLimit: 0,
                selectable: !0,
                evented: !0,
                visible: !0,
                hasControls: !0,
                hasBorders: !0,
                hasRotatingPoint: !0,
                rotatingPointOffset: 40,
                perPixelTargetFind: !1,
                includeDefaultValues: !0,
                clipTo: null,
                lockMovementX: !1,
                lockMovementY: !1,
                lockRotation: !1,
                lockScalingX: !1,
                lockScalingY: !1,
                lockUniScaling: !1,
                lockSkewingX: !1,
                lockSkewingY: !1,
                lockScalingFlip: !1,
                excludeFromExport: !1,
                objectCaching: h,
                statefullCache: !1,
                noScaleCache: !0,
                strokeUniform: !1,
                dirty: !0,
                __corner: 0,
                paintFirst: "fill",
                stateProperties:
                  "top left width height scaleX scaleY flipX flipY originX originY transformMatrix stroke strokeWidth strokeDashArray strokeLineCap strokeDashOffset strokeLineJoin strokeMiterLimit angle opacity fill globalCompositeOperation shadow clipTo visible backgroundColor skewX skewY fillRule paintFirst clipPath strokeUniform".split(
                    " "
                  ),
                cacheProperties:
                  "fill stroke strokeWidth strokeDashArray width height paintFirst strokeUniform strokeLineCap strokeDashOffset strokeLineJoin strokeMiterLimit backgroundColor clipPath".split(
                    " "
                  ),
                clipPath: void 0,
                inverted: !1,
                absolutePositioned: !1,
                initialize: function (t) {
                  t && this.setOptions(t);
                },
                _createCacheCanvas: function () {
                  (this._cacheProperties = {}),
                    (this._cacheCanvas = e.util.createCanvasElement()),
                    (this._cacheContext = this._cacheCanvas.getContext("2d")),
                    this._updateCacheCanvas(),
                    (this.dirty = !0);
                },
                _limitCacheSize: function (t) {
                  var i = e.perfLimitSizeTotal,
                    n = t.width,
                    r = t.height,
                    s = e.maxCacheSideLimit,
                    o = e.minCacheSideLimit;
                  if (n <= s && r <= s && n * r <= i)
                    return n < o && (t.width = o), r < o && (t.height = o), t;
                  var a = n / r,
                    h = e.util.limitDimsByArea(a, i),
                    c = e.util.capValue,
                    l = c(o, h.x, s),
                    u = c(o, h.y, s);
                  return (
                    n > l &&
                      ((t.zoomX /= n / l), (t.width = l), (t.capped = !0)),
                    r > u &&
                      ((t.zoomY /= r / u), (t.height = u), (t.capped = !0)),
                    t
                  );
                },
                _getCacheCanvasDimensions: function () {
                  var t = this.getTotalObjectScaling(),
                    e = this._getTransformedDimensions(0, 0),
                    i = (e.x * t.scaleX) / this.scaleX,
                    n = (e.y * t.scaleY) / this.scaleY;
                  return {
                    width: i + 2,
                    height: n + 2,
                    zoomX: t.scaleX,
                    zoomY: t.scaleY,
                    x: i,
                    y: n,
                  };
                },
                _updateCacheCanvas: function () {
                  var t = this.canvas;
                  if (this.noScaleCache && t && t._currentTransform) {
                    var i = t._currentTransform.target,
                      n = t._currentTransform.action;
                    if (this === i && n.slice && "scale" === n.slice(0, 5))
                      return !1;
                  }
                  var r,
                    s,
                    o = this._cacheCanvas,
                    a = this._limitCacheSize(this._getCacheCanvasDimensions()),
                    h = e.minCacheSideLimit,
                    c = a.width,
                    l = a.height,
                    u = a.zoomX,
                    g = a.zoomY,
                    f = c !== this.cacheWidth || l !== this.cacheHeight,
                    d = this.zoomX !== u || this.zoomY !== g,
                    p = f || d,
                    C = 0,
                    A = 0,
                    v = !1;
                  if (f) {
                    var m = this._cacheCanvas.width,
                      I = this._cacheCanvas.height,
                      w = c > m || l > I;
                    (v = w || ((c < 0.9 * m || l < 0.9 * I) && m > h && I > h)),
                      w &&
                        !a.capped &&
                        (c > h || l > h) &&
                        ((C = 0.1 * c), (A = 0.1 * l));
                  }
                  return (
                    !!p &&
                    (v
                      ? ((o.width = Math.ceil(c + C)),
                        (o.height = Math.ceil(l + A)))
                      : (this._cacheContext.setTransform(1, 0, 0, 1, 0, 0),
                        this._cacheContext.clearRect(0, 0, o.width, o.height)),
                    (r = a.x / 2),
                    (s = a.y / 2),
                    (this.cacheTranslationX = Math.round(o.width / 2 - r) + r),
                    (this.cacheTranslationY = Math.round(o.height / 2 - s) + s),
                    (this.cacheWidth = c),
                    (this.cacheHeight = l),
                    this._cacheContext.translate(
                      this.cacheTranslationX,
                      this.cacheTranslationY
                    ),
                    this._cacheContext.scale(u, g),
                    (this.zoomX = u),
                    (this.zoomY = g),
                    !0)
                  );
                },
                setOptions: function (t) {
                  this._setOptions(t),
                    this._initGradient(t.fill, "fill"),
                    this._initGradient(t.stroke, "stroke"),
                    this._initClipping(t),
                    this._initPattern(t.fill, "fill"),
                    this._initPattern(t.stroke, "stroke");
                },
                transform: function (t) {
                  var e;
                  (e =
                    this.group && !this.group._transformDone
                      ? this.calcTransformMatrix()
                      : this.calcOwnMatrix()),
                    t.transform(e[0], e[1], e[2], e[3], e[4], e[5]);
                },
                toObject: function (t) {
                  var i = e.Object.NUM_FRACTION_DIGITS,
                    n = {
                      type: this.type,
                      version: e.version,
                      originX: this.originX,
                      originY: this.originY,
                      left: r(this.left, i),
                      top: r(this.top, i),
                      width: r(this.width, i),
                      height: r(this.height, i),
                      fill:
                        this.fill && this.fill.toObject
                          ? this.fill.toObject()
                          : this.fill,
                      stroke:
                        this.stroke && this.stroke.toObject
                          ? this.stroke.toObject()
                          : this.stroke,
                      strokeWidth: r(this.strokeWidth, i),
                      strokeDashArray: this.strokeDashArray
                        ? this.strokeDashArray.concat()
                        : this.strokeDashArray,
                      strokeLineCap: this.strokeLineCap,
                      strokeDashOffset: this.strokeDashOffset,
                      strokeLineJoin: this.strokeLineJoin,
                      strokeMiterLimit: r(this.strokeMiterLimit, i),
                      scaleX: r(this.scaleX, i),
                      scaleY: r(this.scaleY, i),
                      angle: r(this.angle, i),
                      flipX: this.flipX,
                      flipY: this.flipY,
                      opacity: r(this.opacity, i),
                      shadow:
                        this.shadow && this.shadow.toObject
                          ? this.shadow.toObject()
                          : this.shadow,
                      visible: this.visible,
                      clipTo: this.clipTo && String(this.clipTo),
                      backgroundColor: this.backgroundColor,
                      fillRule: this.fillRule,
                      paintFirst: this.paintFirst,
                      globalCompositeOperation: this.globalCompositeOperation,
                      transformMatrix: this.transformMatrix
                        ? this.transformMatrix.concat()
                        : null,
                      skewX: r(this.skewX, i),
                      skewY: r(this.skewY, i),
                    };
                  return (
                    this.clipPath &&
                      ((n.clipPath = this.clipPath.toObject(t)),
                      (n.clipPath.inverted = this.clipPath.inverted),
                      (n.clipPath.absolutePositioned =
                        this.clipPath.absolutePositioned)),
                    e.util.populateWithProperties(this, n, t),
                    this.includeDefaultValues ||
                      (n = this._removeDefaultValues(n)),
                    n
                  );
                },
                toDatalessObject: function (t) {
                  return this.toObject(t);
                },
                _removeDefaultValues: function (t) {
                  var i = e.util.getKlass(t.type).prototype;
                  return (
                    i.stateProperties.forEach(function (e) {
                      "left" !== e &&
                        "top" !== e &&
                        (t[e] === i[e] && delete t[e],
                        "[object Array]" ===
                          Object.prototype.toString.call(t[e]) &&
                          "[object Array]" ===
                            Object.prototype.toString.call(i[e]) &&
                          0 === t[e].length &&
                          0 === i[e].length &&
                          delete t[e]);
                    }),
                    t
                  );
                },
                toString: function () {
                  return "#<fabric." + s(this.type) + ">";
                },
                getObjectScaling: function () {
                  var t = e.util.qrDecompose(this.calcTransformMatrix());
                  return {
                    scaleX: Math.abs(t.scaleX),
                    scaleY: Math.abs(t.scaleY),
                  };
                },
                getTotalObjectScaling: function () {
                  var t = this.getObjectScaling(),
                    e = t.scaleX,
                    i = t.scaleY;
                  if (this.canvas) {
                    var n = this.canvas.getZoom(),
                      r = this.canvas.getRetinaScaling();
                    (e *= n * r), (i *= n * r);
                  }
                  return { scaleX: e, scaleY: i };
                },
                getObjectOpacity: function () {
                  var t = this.opacity;
                  return this.group && (t *= this.group.getObjectOpacity()), t;
                },
                _set: function (t, i) {
                  var n = "scaleX" === t || "scaleY" === t,
                    r = this[t] !== i,
                    s = !1;
                  return (
                    n && (i = this._constrainScale(i)),
                    "scaleX" === t && i < 0
                      ? ((this.flipX = !this.flipX), (i *= -1))
                      : "scaleY" === t && i < 0
                      ? ((this.flipY = !this.flipY), (i *= -1))
                      : "shadow" !== t || !i || i instanceof e.Shadow
                      ? "dirty" === t &&
                        this.group &&
                        this.group.set("dirty", i)
                      : (i = new e.Shadow(i)),
                    (this[t] = i),
                    r &&
                      ((s = this.group && this.group.isOnACache()),
                      this.cacheProperties.indexOf(t) > -1
                        ? ((this.dirty = !0), s && this.group.set("dirty", !0))
                        : s &&
                          this.stateProperties.indexOf(t) > -1 &&
                          this.group.set("dirty", !0)),
                    this
                  );
                },
                setOnGroup: function () {},
                getViewportTransform: function () {
                  return this.canvas && this.canvas.viewportTransform
                    ? this.canvas.viewportTransform
                    : e.iMatrix.concat();
                },
                isNotVisible: function () {
                  return (
                    0 === this.opacity ||
                    (0 === this.width &&
                      0 === this.height &&
                      0 === this.strokeWidth) ||
                    !this.visible
                  );
                },
                render: function (t) {
                  this.isNotVisible() ||
                    (this.canvas &&
                      this.canvas.skipOffscreen &&
                      !this.group &&
                      !this.isOnScreen()) ||
                    (t.save(),
                    this._setupCompositeOperation(t),
                    this.drawSelectionBackground(t),
                    this.transform(t),
                    this._setOpacity(t),
                    this._setShadow(t, this),
                    this.transformMatrix &&
                      t.transform.apply(t, this.transformMatrix),
                    this.clipTo && e.util.clipContext(this, t),
                    this.shouldCache()
                      ? (this.renderCache(), this.drawCacheOnCanvas(t))
                      : (this._removeCacheCanvas(),
                        (this.dirty = !1),
                        this.drawObject(t),
                        this.objectCaching &&
                          this.statefullCache &&
                          this.saveState({ propertySet: "cacheProperties" })),
                    this.clipTo && t.restore(),
                    t.restore());
                },
                renderCache: function (t) {
                  (t = t || {}),
                    this._cacheCanvas || this._createCacheCanvas(),
                    this.isCacheDirty() &&
                      (this.statefullCache &&
                        this.saveState({ propertySet: "cacheProperties" }),
                      this.drawObject(this._cacheContext, t.forClipping),
                      (this.dirty = !1));
                },
                _removeCacheCanvas: function () {
                  (this._cacheCanvas = null),
                    (this.cacheWidth = 0),
                    (this.cacheHeight = 0);
                },
                hasStroke: function () {
                  return (
                    this.stroke &&
                    "transparent" !== this.stroke &&
                    0 !== this.strokeWidth
                  );
                },
                hasFill: function () {
                  return this.fill && "transparent" !== this.fill;
                },
                needsItsOwnCache: function () {
                  return (
                    !(
                      "stroke" !== this.paintFirst ||
                      !this.hasFill() ||
                      !this.hasStroke() ||
                      "object" != typeof this.shadow
                    ) || !!this.clipPath
                  );
                },
                shouldCache: function () {
                  return (
                    (this.ownCaching =
                      this.needsItsOwnCache() ||
                      (this.objectCaching &&
                        (!this.group || !this.group.isOnACache()))),
                    this.ownCaching
                  );
                },
                willDrawShadow: function () {
                  return (
                    !!this.shadow &&
                    (0 !== this.shadow.offsetX || 0 !== this.shadow.offsetY)
                  );
                },
                drawClipPathOnCache: function (t) {
                  var i = this.clipPath;
                  if (
                    (t.save(),
                    i.inverted
                      ? (t.globalCompositeOperation = "destination-out")
                      : (t.globalCompositeOperation = "destination-in"),
                    i.absolutePositioned)
                  ) {
                    var n = e.util.invertTransform(this.calcTransformMatrix());
                    t.transform(n[0], n[1], n[2], n[3], n[4], n[5]);
                  }
                  i.transform(t),
                    t.scale(1 / i.zoomX, 1 / i.zoomY),
                    t.drawImage(
                      i._cacheCanvas,
                      -i.cacheTranslationX,
                      -i.cacheTranslationY
                    ),
                    t.restore();
                },
                drawObject: function (t, e) {
                  var i = this.fill,
                    n = this.stroke;
                  e
                    ? ((this.fill = "black"),
                      (this.stroke = ""),
                      this._setClippingProperties(t))
                    : (this._renderBackground(t),
                      this._setStrokeStyles(t, this),
                      this._setFillStyles(t, this)),
                    this._render(t),
                    this._drawClipPath(t),
                    (this.fill = i),
                    (this.stroke = n);
                },
                _drawClipPath: function (t) {
                  var e = this.clipPath;
                  e &&
                    ((e.canvas = this.canvas),
                    e.shouldCache(),
                    (e._transformDone = !0),
                    e.renderCache({ forClipping: !0 }),
                    this.drawClipPathOnCache(t));
                },
                drawCacheOnCanvas: function (t) {
                  t.scale(1 / this.zoomX, 1 / this.zoomY),
                    t.drawImage(
                      this._cacheCanvas,
                      -this.cacheTranslationX,
                      -this.cacheTranslationY
                    );
                },
                isCacheDirty: function (t) {
                  if (this.isNotVisible()) return !1;
                  if (this._cacheCanvas && !t && this._updateCacheCanvas())
                    return !0;
                  if (
                    this.dirty ||
                    (this.clipPath && this.clipPath.absolutePositioned) ||
                    (this.statefullCache &&
                      this.hasStateChanged("cacheProperties"))
                  ) {
                    if (this._cacheCanvas && !t) {
                      var e = this.cacheWidth / this.zoomX,
                        i = this.cacheHeight / this.zoomY;
                      this._cacheContext.clearRect(-e / 2, -i / 2, e, i);
                    }
                    return !0;
                  }
                  return !1;
                },
                _renderBackground: function (t) {
                  if (this.backgroundColor) {
                    var e = this._getNonTransformedDimensions();
                    (t.fillStyle = this.backgroundColor),
                      t.fillRect(-e.x / 2, -e.y / 2, e.x, e.y),
                      this._removeShadow(t);
                  }
                },
                _setOpacity: function (t) {
                  this.group && !this.group._transformDone
                    ? (t.globalAlpha = this.getObjectOpacity())
                    : (t.globalAlpha *= this.opacity);
                },
                _setStrokeStyles: function (t, e) {
                  e.stroke &&
                    ((t.lineWidth = e.strokeWidth),
                    (t.lineCap = e.strokeLineCap),
                    (t.lineDashOffset = e.strokeDashOffset),
                    (t.lineJoin = e.strokeLineJoin),
                    (t.miterLimit = e.strokeMiterLimit),
                    (t.strokeStyle = e.stroke.toLive
                      ? e.stroke.toLive(t, this)
                      : e.stroke));
                },
                _setFillStyles: function (t, e) {
                  e.fill &&
                    (t.fillStyle = e.fill.toLive
                      ? e.fill.toLive(t, this)
                      : e.fill);
                },
                _setClippingProperties: function (t) {
                  (t.globalAlpha = 1),
                    (t.strokeStyle = "transparent"),
                    (t.fillStyle = "#000000");
                },
                _setLineDash: function (t, e, i) {
                  e &&
                    0 !== e.length &&
                    (1 & e.length && e.push.apply(e, e),
                    a ? t.setLineDash(e) : i && i(t));
                },
                _renderControls: function (t, i) {
                  var n,
                    r,
                    s,
                    a = this.getViewportTransform(),
                    h = this.calcTransformMatrix();
                  (r =
                    void 0 !== (i = i || {}).hasBorders
                      ? i.hasBorders
                      : this.hasBorders),
                    (s =
                      void 0 !== i.hasControls
                        ? i.hasControls
                        : this.hasControls),
                    (h = e.util.multiplyTransformMatrices(a, h)),
                    (n = e.util.qrDecompose(h)),
                    t.save(),
                    t.translate(n.translateX, n.translateY),
                    (t.lineWidth = 1 * this.borderScaleFactor),
                    this.group ||
                      (t.globalAlpha = this.isMoving
                        ? this.borderOpacityWhenMoving
                        : 1),
                    i.forActiveSelection
                      ? (t.rotate(o(n.angle)),
                        r && this.drawBordersInGroup(t, n, i))
                      : (t.rotate(o(this.angle)), r && this.drawBorders(t, i)),
                    s && this.drawControls(t, i),
                    t.restore();
                },
                _setShadow: function (t) {
                  if (this.shadow) {
                    var i,
                      n = this.shadow,
                      r = this.canvas,
                      s = (r && r.viewportTransform[0]) || 1,
                      o = (r && r.viewportTransform[3]) || 1;
                    (i = n.nonScaling
                      ? { scaleX: 1, scaleY: 1 }
                      : this.getObjectScaling()),
                      r &&
                        r._isRetinaScaling() &&
                        ((s *= e.devicePixelRatio), (o *= e.devicePixelRatio)),
                      (t.shadowColor = n.color),
                      (t.shadowBlur =
                        (n.blur *
                          e.browserShadowBlurConstant *
                          (s + o) *
                          (i.scaleX + i.scaleY)) /
                        4),
                      (t.shadowOffsetX = n.offsetX * s * i.scaleX),
                      (t.shadowOffsetY = n.offsetY * o * i.scaleY);
                  }
                },
                _removeShadow: function (t) {
                  this.shadow &&
                    ((t.shadowColor = ""),
                    (t.shadowBlur = t.shadowOffsetX = t.shadowOffsetY = 0));
                },
                _applyPatternGradientTransform: function (t, e) {
                  if (!e || !e.toLive) return { offsetX: 0, offsetY: 0 };
                  var i = e.gradientTransform || e.patternTransform,
                    n = -this.width / 2 + e.offsetX || 0,
                    r = -this.height / 2 + e.offsetY || 0;
                  return (
                    "percentage" === e.gradientUnits
                      ? t.transform(this.width, 0, 0, this.height, n, r)
                      : t.transform(1, 0, 0, 1, n, r),
                    i && t.transform(i[0], i[1], i[2], i[3], i[4], i[5]),
                    { offsetX: n, offsetY: r }
                  );
                },
                _renderPaintInOrder: function (t) {
                  "stroke" === this.paintFirst
                    ? (this._renderStroke(t), this._renderFill(t))
                    : (this._renderFill(t), this._renderStroke(t));
                },
                _render: function () {},
                _renderFill: function (t) {
                  this.fill &&
                    (t.save(),
                    this._applyPatternGradientTransform(t, this.fill),
                    "evenodd" === this.fillRule ? t.fill("evenodd") : t.fill(),
                    t.restore());
                },
                _renderStroke: function (t) {
                  if (this.stroke && 0 !== this.strokeWidth) {
                    if (
                      (this.shadow &&
                        !this.shadow.affectStroke &&
                        this._removeShadow(t),
                      t.save(),
                      this.strokeUniform && this.group)
                    ) {
                      var e = this.getObjectScaling();
                      t.scale(1 / e.scaleX, 1 / e.scaleY);
                    } else
                      this.strokeUniform &&
                        t.scale(1 / this.scaleX, 1 / this.scaleY);
                    this._setLineDash(
                      t,
                      this.strokeDashArray,
                      this._renderDashedStroke
                    ),
                      this.stroke.toLive &&
                      "percentage" === this.stroke.gradientUnits
                        ? this._applyPatternForTransformedGradient(
                            t,
                            this.stroke
                          )
                        : this._applyPatternGradientTransform(t, this.stroke),
                      t.stroke(),
                      t.restore();
                  }
                },
                _applyPatternForTransformedGradient: function (t, i) {
                  var n,
                    r = this._limitCacheSize(this._getCacheCanvasDimensions()),
                    s = e.util.createCanvasElement(),
                    o = this.canvas.getRetinaScaling(),
                    a = r.x / this.scaleX / o,
                    h = r.y / this.scaleY / o;
                  (s.width = a),
                    (s.height = h),
                    (n = s.getContext("2d")).beginPath(),
                    n.moveTo(0, 0),
                    n.lineTo(a, 0),
                    n.lineTo(a, h),
                    n.lineTo(0, h),
                    n.closePath(),
                    n.translate(a / 2, h / 2),
                    n.scale(
                      r.zoomX / this.scaleX / o,
                      r.zoomY / this.scaleY / o
                    ),
                    this._applyPatternGradientTransform(n, i),
                    (n.fillStyle = i.toLive(t)),
                    n.fill(),
                    t.translate(
                      -this.width / 2 - this.strokeWidth / 2,
                      -this.height / 2 - this.strokeWidth / 2
                    ),
                    t.scale(
                      (o * this.scaleX) / r.zoomX,
                      (o * this.scaleY) / r.zoomY
                    ),
                    (t.strokeStyle = n.createPattern(s, "no-repeat"));
                },
                _findCenterFromElement: function () {
                  return {
                    x: this.left + this.width / 2,
                    y: this.top + this.height / 2,
                  };
                },
                _assignTransformMatrixProps: function () {
                  if (this.transformMatrix) {
                    var t = e.util.qrDecompose(this.transformMatrix);
                    (this.flipX = !1),
                      (this.flipY = !1),
                      this.set("scaleX", t.scaleX),
                      this.set("scaleY", t.scaleY),
                      (this.angle = t.angle),
                      (this.skewX = t.skewX),
                      (this.skewY = 0);
                  }
                },
                _removeTransformMatrix: function (t) {
                  var i = this._findCenterFromElement();
                  this.transformMatrix &&
                    (this._assignTransformMatrixProps(),
                    (i = e.util.transformPoint(i, this.transformMatrix))),
                    (this.transformMatrix = null),
                    t &&
                      ((this.scaleX *= t.scaleX),
                      (this.scaleY *= t.scaleY),
                      (this.cropX = t.cropX),
                      (this.cropY = t.cropY),
                      (i.x += t.offsetLeft),
                      (i.y += t.offsetTop),
                      (this.width = t.width),
                      (this.height = t.height)),
                    this.setPositionByOrigin(i, "center", "center");
                },
                clone: function (t, i) {
                  var n = this.toObject(i);
                  this.constructor.fromObject
                    ? this.constructor.fromObject(n, t)
                    : e.Object._fromObject("Object", n, t);
                },
                cloneAsImage: function (t, i) {
                  var n = this.toCanvasElement(i);
                  return t && t(new e.Image(n)), this;
                },
                toCanvasElement: function (t) {
                  t || (t = {});
                  var i = e.util,
                    n = i.saveObjectTransform(this),
                    r = this.group,
                    s = this.shadow,
                    o = Math.abs,
                    a =
                      (t.multiplier || 1) *
                      (t.enableRetinaScaling ? e.devicePixelRatio : 1);
                  delete this.group,
                    t.withoutTransform && i.resetObjectTransform(this),
                    t.withoutShadow && (this.shadow = null);
                  var h,
                    c,
                    l,
                    u,
                    g = e.util.createCanvasElement(),
                    f = this.getBoundingRect(!0, !0),
                    d = this.shadow,
                    p = { x: 0, y: 0 };
                  d &&
                    ((c = d.blur),
                    (h = d.nonScaling
                      ? { scaleX: 1, scaleY: 1 }
                      : this.getObjectScaling()),
                    (p.x = 2 * Math.round(o(d.offsetX) + c) * o(h.scaleX)),
                    (p.y = 2 * Math.round(o(d.offsetY) + c) * o(h.scaleY))),
                    (l = f.width + p.x),
                    (u = f.height + p.y),
                    (g.width = Math.ceil(l)),
                    (g.height = Math.ceil(u));
                  var C = new e.StaticCanvas(g, {
                    enableRetinaScaling: !1,
                    renderOnAddRemove: !1,
                    skipOffscreen: !1,
                  });
                  "jpeg" === t.format && (C.backgroundColor = "#fff"),
                    this.setPositionByOrigin(
                      new e.Point(C.width / 2, C.height / 2),
                      "center",
                      "center"
                    );
                  var A = this.canvas;
                  C.add(this);
                  var v = C.toCanvasElement(a || 1, t);
                  return (
                    (this.shadow = s),
                    this.set("canvas", A),
                    r && (this.group = r),
                    this.set(n).setCoords(),
                    (C._objects = []),
                    C.dispose(),
                    (C = null),
                    v
                  );
                },
                toDataURL: function (t) {
                  return (
                    t || (t = {}),
                    e.util.toDataURL(
                      this.toCanvasElement(t),
                      t.format || "png",
                      t.quality || 1
                    )
                  );
                },
                isType: function (t) {
                  return this.type === t;
                },
                complexity: function () {
                  return 1;
                },
                toJSON: function (t) {
                  return this.toObject(t);
                },
                setGradient: function (t, i) {
                  i || (i = {});
                  var n = { colorStops: [] };
                  return (
                    (n.type = i.type || (i.r1 || i.r2 ? "radial" : "linear")),
                    (n.coords = { x1: i.x1, y1: i.y1, x2: i.x2, y2: i.y2 }),
                    (n.gradientUnits = i.gradientUnits || "pixels"),
                    (i.r1 || i.r2) &&
                      ((n.coords.r1 = i.r1), (n.coords.r2 = i.r2)),
                    (n.gradientTransform = i.gradientTransform),
                    e.Gradient.prototype.addColorStop.call(n, i.colorStops),
                    this.set(t, e.Gradient.forObject(this, n))
                  );
                },
                setPatternFill: function (t, i) {
                  return this.set("fill", new e.Pattern(t, i));
                },
                setShadow: function (t) {
                  return this.set("shadow", t ? new e.Shadow(t) : null);
                },
                setColor: function (t) {
                  return this.set("fill", t), this;
                },
                rotate: function (t) {
                  var e =
                    ("center" !== this.originX || "center" !== this.originY) &&
                    this.centeredRotation;
                  return (
                    e && this._setOriginToCenter(),
                    this.set("angle", t),
                    e && this._resetOrigin(),
                    this
                  );
                },
                centerH: function () {
                  return this.canvas && this.canvas.centerObjectH(this), this;
                },
                viewportCenterH: function () {
                  return (
                    this.canvas && this.canvas.viewportCenterObjectH(this), this
                  );
                },
                centerV: function () {
                  return this.canvas && this.canvas.centerObjectV(this), this;
                },
                viewportCenterV: function () {
                  return (
                    this.canvas && this.canvas.viewportCenterObjectV(this), this
                  );
                },
                center: function () {
                  return this.canvas && this.canvas.centerObject(this), this;
                },
                viewportCenter: function () {
                  return (
                    this.canvas && this.canvas.viewportCenterObject(this), this
                  );
                },
                getLocalPointer: function (t, i) {
                  i = i || this.canvas.getPointer(t);
                  var n = new e.Point(i.x, i.y),
                    r = this._getLeftTopCoords();
                  return (
                    this.angle &&
                      (n = e.util.rotatePoint(n, r, o(-this.angle))),
                    { x: n.x - r.x, y: n.y - r.y }
                  );
                },
                _setupCompositeOperation: function (t) {
                  this.globalCompositeOperation &&
                    (t.globalCompositeOperation =
                      this.globalCompositeOperation);
                },
              })),
              e.util.createAccessors && e.util.createAccessors(e.Object),
              i(e.Object.prototype, e.Observable),
              (e.Object.NUM_FRACTION_DIGITS = 2),
              (e.Object._fromObject = function (t, i, r, s) {
                var o = e[t];
                (i = n(i, !0)),
                  e.util.enlivenPatterns([i.fill, i.stroke], function (t) {
                    void 0 !== t[0] && (i.fill = t[0]),
                      void 0 !== t[1] && (i.stroke = t[1]),
                      e.util.enlivenObjects([i.clipPath], function (t) {
                        i.clipPath = t[0];
                        var e = s ? new o(i[s], i) : new o(i);
                        r && r(e);
                      });
                  });
              }),
              (e.Object.__uid = 0));
          })(e),
          (v = b.util.degreesToRadians),
          (m = { left: -0.5, center: 0, right: 0.5 }),
          (I = { top: -0.5, center: 0, bottom: 0.5 }),
          b.util.object.extend(b.Object.prototype, {
            translateToGivenOrigin: function (t, e, i, n, r) {
              var s,
                o,
                a,
                h = t.x,
                c = t.y;
              return (
                "string" == typeof e ? (e = m[e]) : (e -= 0.5),
                "string" == typeof n ? (n = m[n]) : (n -= 0.5),
                "string" == typeof i ? (i = I[i]) : (i -= 0.5),
                "string" == typeof r ? (r = I[r]) : (r -= 0.5),
                (o = r - i),
                ((s = n - e) || o) &&
                  ((a = this._getTransformedDimensions()),
                  (h = t.x + s * a.x),
                  (c = t.y + o * a.y)),
                new b.Point(h, c)
              );
            },
            translateToCenterPoint: function (t, e, i) {
              var n = this.translateToGivenOrigin(t, e, i, "center", "center");
              return this.angle ? b.util.rotatePoint(n, t, v(this.angle)) : n;
            },
            translateToOriginPoint: function (t, e, i) {
              var n = this.translateToGivenOrigin(t, "center", "center", e, i);
              return this.angle ? b.util.rotatePoint(n, t, v(this.angle)) : n;
            },
            getCenterPoint: function () {
              var t = new b.Point(this.left, this.top);
              return this.translateToCenterPoint(t, this.originX, this.originY);
            },
            getPointByOrigin: function (t, e) {
              var i = this.getCenterPoint();
              return this.translateToOriginPoint(i, t, e);
            },
            toLocalPoint: function (t, e, i) {
              var n,
                r,
                s = this.getCenterPoint();
              return (
                (n =
                  void 0 !== e && void 0 !== i
                    ? this.translateToGivenOrigin(s, "center", "center", e, i)
                    : new b.Point(this.left, this.top)),
                (r = new b.Point(t.x, t.y)),
                this.angle && (r = b.util.rotatePoint(r, s, -v(this.angle))),
                r.subtractEquals(n)
              );
            },
            setPositionByOrigin: function (t, e, i) {
              var n = this.translateToCenterPoint(t, e, i),
                r = this.translateToOriginPoint(n, this.originX, this.originY);
              this.set("left", r.x), this.set("top", r.y);
            },
            adjustPosition: function (t) {
              var e,
                i,
                n = v(this.angle),
                r = this.getScaledWidth(),
                s = b.util.cos(n) * r,
                o = b.util.sin(n) * r;
              (e =
                "string" == typeof this.originX
                  ? m[this.originX]
                  : this.originX - 0.5),
                (i = "string" == typeof t ? m[t] : t - 0.5),
                (this.left += s * (i - e)),
                (this.top += o * (i - e)),
                this.setCoords(),
                (this.originX = t);
            },
            _setOriginToCenter: function () {
              (this._originalOriginX = this.originX),
                (this._originalOriginY = this.originY);
              var t = this.getCenterPoint();
              (this.originX = "center"),
                (this.originY = "center"),
                (this.left = t.x),
                (this.top = t.y);
            },
            _resetOrigin: function () {
              var t = this.translateToOriginPoint(
                this.getCenterPoint(),
                this._originalOriginX,
                this._originalOriginY
              );
              (this.originX = this._originalOriginX),
                (this.originY = this._originalOriginY),
                (this.left = t.x),
                (this.top = t.y),
                (this._originalOriginX = null),
                (this._originalOriginY = null);
            },
            _getLeftTopCoords: function () {
              return this.translateToOriginPoint(
                this.getCenterPoint(),
                "left",
                "top"
              );
            },
          }),
          (function () {
            var t = b.util.degreesToRadians,
              e = b.util.multiplyTransformMatrices,
              i = b.util.transformPoint;
            b.util.object.extend(b.Object.prototype, {
              oCoords: null,
              aCoords: null,
              ownMatrixCache: null,
              matrixCache: null,
              getCoords: function (t, e) {
                this.oCoords || this.setCoords();
                var i = t ? this.aCoords : this.oCoords;
                return (function (t) {
                  return [
                    new b.Point(t.tl.x, t.tl.y),
                    new b.Point(t.tr.x, t.tr.y),
                    new b.Point(t.br.x, t.br.y),
                    new b.Point(t.bl.x, t.bl.y),
                  ];
                })(e ? this.calcCoords(t) : i);
              },
              intersectsWithRect: function (t, e, i, n) {
                var r = this.getCoords(i, n);
                return (
                  "Intersection" ===
                  b.Intersection.intersectPolygonRectangle(r, t, e).status
                );
              },
              intersectsWithObject: function (t, e, i) {
                return (
                  "Intersection" ===
                    b.Intersection.intersectPolygonPolygon(
                      this.getCoords(e, i),
                      t.getCoords(e, i)
                    ).status ||
                  t.isContainedWithinObject(this, e, i) ||
                  this.isContainedWithinObject(t, e, i)
                );
              },
              isContainedWithinObject: function (t, e, i) {
                for (
                  var n = this.getCoords(e, i),
                    r = 0,
                    s = t._getImageLines(
                      i ? t.calcCoords(e) : e ? t.aCoords : t.oCoords
                    );
                  r < 4;
                  r++
                )
                  if (!t.containsPoint(n[r], s)) return !1;
                return !0;
              },
              isContainedWithinRect: function (t, e, i, n) {
                var r = this.getBoundingRect(i, n);
                return (
                  r.left >= t.x &&
                  r.left + r.width <= e.x &&
                  r.top >= t.y &&
                  r.top + r.height <= e.y
                );
              },
              containsPoint: function (t, e, i, n) {
                e =
                  e ||
                  this._getImageLines(
                    n ? this.calcCoords(i) : i ? this.aCoords : this.oCoords
                  );
                var r = this._findCrossPoints(t, e);
                return 0 !== r && r % 2 == 1;
              },
              isOnScreen: function (t) {
                if (!this.canvas) return !1;
                for (
                  var e,
                    i = this.canvas.vptCoords.tl,
                    n = this.canvas.vptCoords.br,
                    r = this.getCoords(!0, t),
                    s = 0;
                  s < 4;
                  s++
                )
                  if (
                    (e = r[s]).x <= n.x &&
                    e.x >= i.x &&
                    e.y <= n.y &&
                    e.y >= i.y
                  )
                    return !0;
                return (
                  !!this.intersectsWithRect(i, n, !0, t) ||
                  this._containsCenterOfCanvas(i, n, t)
                );
              },
              _containsCenterOfCanvas: function (t, e, i) {
                var n = { x: (t.x + e.x) / 2, y: (t.y + e.y) / 2 };
                return !!this.containsPoint(n, null, !0, i);
              },
              isPartiallyOnScreen: function (t) {
                if (!this.canvas) return !1;
                var e = this.canvas.vptCoords.tl,
                  i = this.canvas.vptCoords.br;
                return (
                  !!this.intersectsWithRect(e, i, !0, t) ||
                  this._containsCenterOfCanvas(e, i, t)
                );
              },
              _getImageLines: function (t) {
                return {
                  topline: { o: t.tl, d: t.tr },
                  rightline: { o: t.tr, d: t.br },
                  bottomline: { o: t.br, d: t.bl },
                  leftline: { o: t.bl, d: t.tl },
                };
              },
              _findCrossPoints: function (t, e) {
                var i,
                  n,
                  r,
                  s = 0;
                for (var o in e)
                  if (
                    !(
                      ((r = e[o]).o.y < t.y && r.d.y < t.y) ||
                      (r.o.y >= t.y && r.d.y >= t.y) ||
                      (r.o.x === r.d.x && r.o.x >= t.x
                        ? (n = r.o.x)
                        : (0,
                          (i = (r.d.y - r.o.y) / (r.d.x - r.o.x)),
                          (n =
                            -(t.y - 0 * t.x - (r.o.y - i * r.o.x)) / (0 - i))),
                      n >= t.x && (s += 1),
                      2 !== s)
                    )
                  )
                    break;
                return s;
              },
              getBoundingRect: function (t, e) {
                var i = this.getCoords(t, e);
                return b.util.makeBoundingBoxFromPoints(i);
              },
              getScaledWidth: function () {
                return this._getTransformedDimensions().x;
              },
              getScaledHeight: function () {
                return this._getTransformedDimensions().y;
              },
              _constrainScale: function (t) {
                return Math.abs(t) < this.minScaleLimit
                  ? t < 0
                    ? -this.minScaleLimit
                    : this.minScaleLimit
                  : 0 === t
                  ? 1e-4
                  : t;
              },
              scale: function (t) {
                return (
                  this._set("scaleX", t),
                  this._set("scaleY", t),
                  this.setCoords()
                );
              },
              scaleToWidth: function (t, e) {
                var i = this.getBoundingRect(e).width / this.getScaledWidth();
                return this.scale(t / this.width / i);
              },
              scaleToHeight: function (t, e) {
                var i = this.getBoundingRect(e).height / this.getScaledHeight();
                return this.scale(t / this.height / i);
              },
              calcCoords: function (n) {
                var r = this._calcRotateMatrix(),
                  s = this._calcTranslateMatrix(),
                  o = e(s, r),
                  a = this.getViewportTransform(),
                  h = n ? o : e(a, o),
                  c = this._getTransformedDimensions(),
                  l = c.x / 2,
                  u = c.y / 2,
                  g = i({ x: -l, y: -u }, h),
                  f = i({ x: l, y: -u }, h),
                  d = i({ x: -l, y: u }, h),
                  p = i({ x: l, y: u }, h);
                if (!n) {
                  var C = this.padding,
                    A = t(this.angle),
                    v = b.util.cos(A),
                    m = b.util.sin(A),
                    I = v * C,
                    w = m * C,
                    y = I + w,
                    M = I - w;
                  C &&
                    ((g.x -= M),
                    (g.y -= y),
                    (f.x += y),
                    (f.y -= M),
                    (d.x -= y),
                    (d.y += M),
                    (p.x += M),
                    (p.y += y));
                  var x = new b.Point((g.x + d.x) / 2, (g.y + d.y) / 2),
                    D = new b.Point((f.x + g.x) / 2, (f.y + g.y) / 2),
                    _ = new b.Point((p.x + f.x) / 2, (p.y + f.y) / 2),
                    T = new b.Point((p.x + d.x) / 2, (p.y + d.y) / 2),
                    S = new b.Point(
                      D.x + m * this.rotatingPointOffset,
                      D.y - v * this.rotatingPointOffset
                    );
                }
                var O = { tl: g, tr: f, br: p, bl: d };
                return (
                  n ||
                    ((O.ml = x),
                    (O.mt = D),
                    (O.mr = _),
                    (O.mb = T),
                    (O.mtr = S)),
                  O
                );
              },
              setCoords: function (t, e) {
                return (
                  (this.oCoords = this.calcCoords(t)),
                  e || (this.aCoords = this.calcCoords(!0)),
                  t || (this._setCornerCoords && this._setCornerCoords()),
                  this
                );
              },
              _calcRotateMatrix: function () {
                return b.util.calcRotateMatrix(this);
              },
              _calcTranslateMatrix: function () {
                var t = this.getCenterPoint();
                return [1, 0, 0, 1, t.x, t.y];
              },
              transformMatrixKey: function (t) {
                var e = "";
                return (
                  !t &&
                    this.group &&
                    (e = this.group.transformMatrixKey(t) + "_"),
                  e +
                    this.top +
                    "_" +
                    this.left +
                    "_" +
                    this.scaleX +
                    "_" +
                    this.scaleY +
                    "_" +
                    this.skewX +
                    "_" +
                    this.skewY +
                    "_" +
                    this.angle +
                    "_" +
                    this.originX +
                    "_" +
                    this.originY +
                    "_" +
                    this.width +
                    "_" +
                    this.height +
                    "_" +
                    this.strokeWidth +
                    this.flipX +
                    this.flipY
                );
              },
              calcTransformMatrix: function (t) {
                if (t) return this.calcOwnMatrix();
                var i = this.transformMatrixKey(),
                  n = this.matrixCache || (this.matrixCache = {});
                if (n.key === i) return n.value;
                var r = this.calcOwnMatrix();
                return (
                  this.group && (r = e(this.group.calcTransformMatrix(), r)),
                  (n.key = i),
                  (n.value = r),
                  r
                );
              },
              calcOwnMatrix: function () {
                var t = this.transformMatrixKey(!0),
                  e = this.ownMatrixCache || (this.ownMatrixCache = {});
                if (e.key === t) return e.value;
                var i = this._calcTranslateMatrix();
                return (
                  (this.translateX = i[4]),
                  (this.translateY = i[5]),
                  (e.key = t),
                  (e.value = b.util.composeMatrix(this)),
                  e.value
                );
              },
              _calcDimensionsTransformMatrix: function (t, e, i) {
                return b.util.calcDimensionsMatrix({
                  skewX: t,
                  skewY: e,
                  scaleX: this.scaleX * (i && this.flipX ? -1 : 1),
                  scaleY: this.scaleY * (i && this.flipY ? -1 : 1),
                });
              },
              _getNonTransformedDimensions: function () {
                var t = this.strokeWidth;
                return { x: this.width + t, y: this.height + t };
              },
              _getTransformedDimensions: function (t, e) {
                void 0 === t && (t = this.skewX),
                  void 0 === e && (e = this.skewY);
                var i,
                  n,
                  r = this._getNonTransformedDimensions(),
                  s = 0 === t && 0 === e;
                if (
                  (this.strokeUniform
                    ? ((i = this.width), (n = this.height))
                    : ((i = r.x), (n = r.y)),
                  s)
                )
                  return this._finalizeDimensions(
                    i * this.scaleX,
                    n * this.scaleY
                  );
                var o = [
                    { x: -(i /= 2), y: -(n /= 2) },
                    { x: i, y: -n },
                    { x: -i, y: n },
                    { x: i, y: n },
                  ],
                  a = b.util.calcDimensionsMatrix({
                    scaleX: this.scaleX,
                    scaleY: this.scaleY,
                    skewX: t,
                    skewY: e,
                  }),
                  h = b.util.makeBoundingBoxFromPoints(o, a);
                return this._finalizeDimensions(h.width, h.height);
              },
              _finalizeDimensions: function (t, e) {
                return this.strokeUniform
                  ? { x: t + this.strokeWidth, y: e + this.strokeWidth }
                  : { x: t, y: e };
              },
              _calculateCurrentDimensions: function () {
                var t = this.getViewportTransform(),
                  e = this._getTransformedDimensions();
                return b.util
                  .transformPoint(e, t, !0)
                  .scalarAdd(2 * this.padding);
              },
            });
          })(),
          b.util.object.extend(b.Object.prototype, {
            sendToBack: function () {
              return (
                this.group
                  ? b.StaticCanvas.prototype.sendToBack.call(this.group, this)
                  : this.canvas && this.canvas.sendToBack(this),
                this
              );
            },
            bringToFront: function () {
              return (
                this.group
                  ? b.StaticCanvas.prototype.bringToFront.call(this.group, this)
                  : this.canvas && this.canvas.bringToFront(this),
                this
              );
            },
            sendBackwards: function (t) {
              return (
                this.group
                  ? b.StaticCanvas.prototype.sendBackwards.call(
                      this.group,
                      this,
                      t
                    )
                  : this.canvas && this.canvas.sendBackwards(this, t),
                this
              );
            },
            bringForward: function (t) {
              return (
                this.group
                  ? b.StaticCanvas.prototype.bringForward.call(
                      this.group,
                      this,
                      t
                    )
                  : this.canvas && this.canvas.bringForward(this, t),
                this
              );
            },
            moveTo: function (t) {
              return (
                this.group && "activeSelection" !== this.group.type
                  ? b.StaticCanvas.prototype.moveTo.call(this.group, this, t)
                  : this.canvas && this.canvas.moveTo(this, t),
                this
              );
            },
          }),
          (function () {
            function t(t, e) {
              if (e) {
                if (e.toLive) return t + ": url(#SVGID_" + e.id + "); ";
                var i = new b.Color(e),
                  n = t + ": " + i.toRgb() + "; ",
                  r = i.getAlpha();
                return (
                  1 !== r && (n += t + "-opacity: " + r.toString() + "; "), n
                );
              }
              return t + ": none; ";
            }
            var e = b.util.toFixed;
            b.util.object.extend(b.Object.prototype, {
              getSvgStyles: function (e) {
                var i = this.fillRule ? this.fillRule : "nonzero",
                  n = this.strokeWidth ? this.strokeWidth : "0",
                  r = this.strokeDashArray
                    ? this.strokeDashArray.join(" ")
                    : "none",
                  s = this.strokeDashOffset ? this.strokeDashOffset : "0",
                  o = this.strokeLineCap ? this.strokeLineCap : "butt",
                  a = this.strokeLineJoin ? this.strokeLineJoin : "miter",
                  h = this.strokeMiterLimit ? this.strokeMiterLimit : "4",
                  c = void 0 !== this.opacity ? this.opacity : "1",
                  l = this.visible ? "" : " visibility: hidden;",
                  u = e ? "" : this.getSvgFilter(),
                  g = t("fill", this.fill);
                return [
                  t("stroke", this.stroke),
                  "stroke-width: ",
                  n,
                  "; ",
                  "stroke-dasharray: ",
                  r,
                  "; ",
                  "stroke-linecap: ",
                  o,
                  "; ",
                  "stroke-dashoffset: ",
                  s,
                  "; ",
                  "stroke-linejoin: ",
                  a,
                  "; ",
                  "stroke-miterlimit: ",
                  h,
                  "; ",
                  g,
                  "fill-rule: ",
                  i,
                  "; ",
                  "opacity: ",
                  c,
                  ";",
                  u,
                  l,
                ].join("");
              },
              getSvgSpanStyles: function (e, i) {
                var n = e.fontFamily
                    ? "font-family: " +
                      (-1 === e.fontFamily.indexOf("'") &&
                      -1 === e.fontFamily.indexOf('"')
                        ? "'" + e.fontFamily + "'"
                        : e.fontFamily) +
                      "; "
                    : "",
                  r = e.strokeWidth
                    ? "stroke-width: " + e.strokeWidth + "; "
                    : "",
                  s =
                    ((n = n),
                    e.fontSize ? "font-size: " + e.fontSize + "px; " : ""),
                  o = e.fontStyle ? "font-style: " + e.fontStyle + "; " : "",
                  a = e.fontWeight ? "font-weight: " + e.fontWeight + "; " : "",
                  h = e.fill ? t("fill", e.fill) : "",
                  c = e.stroke ? t("stroke", e.stroke) : "",
                  l = this.getSvgTextDecoration(e);
                return (
                  l && (l = "text-decoration: " + l + "; "),
                  [
                    c,
                    r,
                    n,
                    s,
                    o,
                    a,
                    l,
                    h,
                    e.deltaY ? "baseline-shift: " + -e.deltaY + "; " : "",
                    i ? "white-space: pre; " : "",
                  ].join("")
                );
              },
              getSvgTextDecoration: function (t) {
                return ["overline", "underline", "line-through"]
                  .filter(function (e) {
                    return t[e.replace("-", "")];
                  })
                  .join(" ");
              },
              getSvgFilter: function () {
                return this.shadow
                  ? "filter: url(#SVGID_" + this.shadow.id + ");"
                  : "";
              },
              getSvgCommons: function () {
                return [
                  this.id ? 'id="' + this.id + '" ' : "",
                  this.clipPath
                    ? 'clip-path="url(#' + this.clipPath.clipPathId + ')" '
                    : "",
                ].join("");
              },
              getSvgTransform: function (t, e) {
                var i = t ? this.calcTransformMatrix() : this.calcOwnMatrix();
                return (
                  'transform="' +
                  b.util.matrixToSVG(i) +
                  (e || "") +
                  this.getSvgTransformMatrix() +
                  '" '
                );
              },
              getSvgTransformMatrix: function () {
                return this.transformMatrix
                  ? " " + b.util.matrixToSVG(this.transformMatrix)
                  : "";
              },
              _setSVGBg: function (t) {
                if (this.backgroundColor) {
                  var i = b.Object.NUM_FRACTION_DIGITS;
                  t.push(
                    "\t\t<rect ",
                    this._getFillAttributes(this.backgroundColor),
                    ' x="',
                    e(-this.width / 2, i),
                    '" y="',
                    e(-this.height / 2, i),
                    '" width="',
                    e(this.width, i),
                    '" height="',
                    e(this.height, i),
                    '"></rect>\n'
                  );
                }
              },
              toSVG: function (t) {
                return this._createBaseSVGMarkup(this._toSVG(t), {
                  reviver: t,
                });
              },
              toClipPathSVG: function (t) {
                return (
                  "\t" +
                  this._createBaseClipPathSVGMarkup(this._toSVG(t), {
                    reviver: t,
                  })
                );
              },
              _createBaseClipPathSVGMarkup: function (t, e) {
                var i = (e = e || {}).reviver,
                  n = e.additionalTransform || "",
                  r = [this.getSvgTransform(!0, n), this.getSvgCommons()].join(
                    ""
                  ),
                  s = t.indexOf("COMMON_PARTS");
                return (t[s] = r), i ? i(t.join("")) : t.join("");
              },
              _createBaseSVGMarkup: function (t, e) {
                var i,
                  n,
                  r = (e = e || {}).noStyle,
                  s = e.reviver,
                  o = r ? "" : 'style="' + this.getSvgStyles() + '" ',
                  a = e.withShadow
                    ? 'style="' + this.getSvgFilter() + '" '
                    : "",
                  h = this.clipPath,
                  c = this.strokeUniform
                    ? 'vector-effect="non-scaling-stroke" '
                    : "",
                  l = h && h.absolutePositioned,
                  u = this.stroke,
                  g = this.fill,
                  f = this.shadow,
                  d = [],
                  p = t.indexOf("COMMON_PARTS"),
                  C = e.additionalTransform;
                return (
                  h &&
                    ((h.clipPathId = "CLIPPATH_" + b.Object.__uid++),
                    (n =
                      '<clipPath id="' +
                      h.clipPathId +
                      '" >\n' +
                      h.toClipPathSVG(s) +
                      "</clipPath>\n")),
                  l && d.push("<g ", a, this.getSvgCommons(), " >\n"),
                  d.push(
                    "<g ",
                    this.getSvgTransform(!1),
                    l ? "" : a + this.getSvgCommons(),
                    " >\n"
                  ),
                  (i = [
                    o,
                    c,
                    r ? "" : this.addPaintOrder(),
                    " ",
                    C ? 'transform="' + C + '" ' : "",
                  ].join("")),
                  (t[p] = i),
                  g && g.toLive && d.push(g.toSVG(this)),
                  u && u.toLive && d.push(u.toSVG(this)),
                  f && d.push(f.toSVG(this)),
                  h && d.push(n),
                  d.push(t.join("")),
                  d.push("</g>\n"),
                  l && d.push("</g>\n"),
                  s ? s(d.join("")) : d.join("")
                );
              },
              addPaintOrder: function () {
                return "fill" !== this.paintFirst
                  ? ' paint-order="' + this.paintFirst + '" '
                  : "";
              },
            });
          })(),
          (function () {
            var t = b.util.object.extend;
            function e(e, i, n) {
              var r = {};
              n.forEach(function (t) {
                r[t] = e[t];
              }),
                t(e[i], r, !0);
            }
            b.util.object.extend(b.Object.prototype, {
              hasStateChanged: function (t) {
                var e = "_" + (t = t || "stateProperties");
                return (
                  Object.keys(this[e]).length < this[t].length ||
                  !(function t(e, i, n) {
                    if (e === i) return !0;
                    if (Array.isArray(e)) {
                      if (!Array.isArray(i) || e.length !== i.length) return !1;
                      for (var r = 0, s = e.length; r < s; r++)
                        if (!t(e[r], i[r])) return !1;
                      return !0;
                    }
                    if (e && "object" == typeof e) {
                      var o,
                        a = Object.keys(e);
                      if (
                        !i ||
                        "object" != typeof i ||
                        (!n && a.length !== Object.keys(i).length)
                      )
                        return !1;
                      for (r = 0, s = a.length; r < s; r++)
                        if ("canvas" !== (o = a[r]) && !t(e[o], i[o]))
                          return !1;
                      return !0;
                    }
                  })(this[e], this, !0)
                );
              },
              saveState: function (t) {
                var i = (t && t.propertySet) || "stateProperties",
                  n = "_" + i;
                return this[n]
                  ? (e(this, n, this[i]),
                    t && t.stateProperties && e(this, n, t.stateProperties),
                    this)
                  : this.setupState(t);
              },
              setupState: function (t) {
                var e = (t = t || {}).propertySet || "stateProperties";
                return (
                  (t.propertySet = e),
                  (this["_" + e] = {}),
                  this.saveState(t),
                  this
                );
              },
            });
          })(),
          (function () {
            var t = b.util.degreesToRadians;
            b.util.object.extend(b.Object.prototype, {
              _controlsVisibility: null,
              _findTargetCorner: function (t) {
                if (
                  !this.hasControls ||
                  this.group ||
                  !this.canvas ||
                  this.canvas._activeObject !== this
                )
                  return !1;
                var e,
                  i,
                  n = t.x,
                  r = t.y;
                for (var s in ((this.__corner = 0), this.oCoords))
                  if (
                    this.isControlVisible(s) &&
                    ("mtr" !== s || this.hasRotatingPoint) &&
                    (!this.get("lockUniScaling") ||
                      ("mt" !== s && "mr" !== s && "mb" !== s && "ml" !== s)) &&
                    ((i = this._getImageLines(this.oCoords[s].corner)),
                    0 !== (e = this._findCrossPoints({ x: n, y: r }, i)) &&
                      e % 2 == 1)
                  )
                    return (this.__corner = s), s;
                return !1;
              },
              _setCornerCoords: function () {
                var e,
                  i,
                  n = this.oCoords,
                  r = t(45 - this.angle),
                  s = 0.707106 * this.cornerSize,
                  o = s * b.util.cos(r),
                  a = s * b.util.sin(r);
                for (var h in n)
                  (e = n[h].x),
                    (i = n[h].y),
                    (n[h].corner = {
                      tl: { x: e - a, y: i - o },
                      tr: { x: e + o, y: i - a },
                      bl: { x: e - o, y: i + a },
                      br: { x: e + a, y: i + o },
                    });
              },
              drawSelectionBackground: function (e) {
                if (
                  !this.selectionBackgroundColor ||
                  (this.canvas && !this.canvas.interactive) ||
                  (this.canvas && this.canvas._activeObject !== this)
                )
                  return this;
                e.save();
                var i = this.getCenterPoint(),
                  n = this._calculateCurrentDimensions(),
                  r = this.canvas.viewportTransform;
                return (
                  e.translate(i.x, i.y),
                  e.scale(1 / r[0], 1 / r[3]),
                  e.rotate(t(this.angle)),
                  (e.fillStyle = this.selectionBackgroundColor),
                  e.fillRect(-n.x / 2, -n.y / 2, n.x, n.y),
                  e.restore(),
                  this
                );
              },
              drawBorders: function (t, e) {
                e = e || {};
                var i = this._calculateCurrentDimensions(),
                  n = this.borderScaleFactor,
                  r = i.x + n,
                  s = i.y + n,
                  o =
                    void 0 !== e.hasRotatingPoint
                      ? e.hasRotatingPoint
                      : this.hasRotatingPoint,
                  a =
                    void 0 !== e.hasControls ? e.hasControls : this.hasControls,
                  h =
                    void 0 !== e.rotatingPointOffset
                      ? e.rotatingPointOffset
                      : this.rotatingPointOffset;
                if (
                  (t.save(),
                  (t.strokeStyle = e.borderColor || this.borderColor),
                  this._setLineDash(
                    t,
                    e.borderDashArray || this.borderDashArray,
                    null
                  ),
                  t.strokeRect(-r / 2, -s / 2, r, s),
                  o && this.isControlVisible("mtr") && a)
                ) {
                  var c = -s / 2;
                  t.beginPath(), t.moveTo(0, c), t.lineTo(0, c - h), t.stroke();
                }
                return t.restore(), this;
              },
              drawBordersInGroup: function (t, e, i) {
                i = i || {};
                var n = { x: this.width, y: this.height },
                  r = b.util.composeMatrix({
                    scaleX: e.scaleX,
                    scaleY: e.scaleY,
                    skewX: e.skewX,
                  }),
                  s = b.util.transformPoint(n, r),
                  o = this.strokeWidth,
                  a = this.borderScaleFactor,
                  h =
                    s.x +
                    o *
                      (this.strokeUniform ? this.canvas.getZoom() : e.scaleX) +
                    a,
                  c =
                    s.y +
                    o *
                      (this.strokeUniform ? this.canvas.getZoom() : e.scaleY) +
                    a;
                return (
                  t.save(),
                  this._setLineDash(
                    t,
                    i.borderDashArray || this.borderDashArray,
                    null
                  ),
                  (t.strokeStyle = i.borderColor || this.borderColor),
                  t.strokeRect(-h / 2, -c / 2, h, c),
                  t.restore(),
                  this
                );
              },
              drawControls: function (t, e) {
                e = e || {};
                var i = this._calculateCurrentDimensions(),
                  n = i.x,
                  r = i.y,
                  s = e.cornerSize || this.cornerSize,
                  o = -(n + s) / 2,
                  a = -(r + s) / 2,
                  h =
                    void 0 !== e.transparentCorners
                      ? e.transparentCorners
                      : this.transparentCorners,
                  c =
                    void 0 !== e.hasRotatingPoint
                      ? e.hasRotatingPoint
                      : this.hasRotatingPoint,
                  l = h ? "stroke" : "fill";
                return (
                  t.save(),
                  (t.strokeStyle = t.fillStyle =
                    e.cornerColor || this.cornerColor),
                  this.transparentCorners ||
                    (t.strokeStyle =
                      e.cornerStrokeColor || this.cornerStrokeColor),
                  this._setLineDash(
                    t,
                    e.cornerDashArray || this.cornerDashArray,
                    null
                  ),
                  this._drawControl("tl", t, l, o, a, e),
                  this._drawControl("tr", t, l, o + n, a, e),
                  this._drawControl("bl", t, l, o, a + r, e),
                  this._drawControl("br", t, l, o + n, a + r, e),
                  this.get("lockUniScaling") ||
                    (this._drawControl("mt", t, l, o + n / 2, a, e),
                    this._drawControl("mb", t, l, o + n / 2, a + r, e),
                    this._drawControl("mr", t, l, o + n, a + r / 2, e),
                    this._drawControl("ml", t, l, o, a + r / 2, e)),
                  c &&
                    this._drawControl(
                      "mtr",
                      t,
                      l,
                      o + n / 2,
                      a - this.rotatingPointOffset,
                      e
                    ),
                  t.restore(),
                  this
                );
              },
              _drawControl: function (t, e, i, n, r, s) {
                if (((s = s || {}), this.isControlVisible(t))) {
                  var o = this.cornerSize,
                    a = !this.transparentCorners && this.cornerStrokeColor;
                  switch (s.cornerStyle || this.cornerStyle) {
                    case "circle":
                      e.beginPath(),
                        e.arc(n + o / 2, r + o / 2, o / 2, 0, 2 * Math.PI, !1),
                        e[i](),
                        a && e.stroke();
                      break;
                    default:
                      this.transparentCorners || e.clearRect(n, r, o, o),
                        e[i + "Rect"](n, r, o, o),
                        a && e.strokeRect(n, r, o, o);
                  }
                }
              },
              isControlVisible: function (t) {
                return this._getControlsVisibility()[t];
              },
              setControlVisible: function (t, e) {
                return (this._getControlsVisibility()[t] = e), this;
              },
              setControlsVisibility: function (t) {
                for (var e in (t || (t = {}), t))
                  this.setControlVisible(e, t[e]);
                return this;
              },
              _getControlsVisibility: function () {
                return (
                  this._controlsVisibility ||
                    (this._controlsVisibility = {
                      tl: !0,
                      tr: !0,
                      br: !0,
                      bl: !0,
                      ml: !0,
                      mt: !0,
                      mr: !0,
                      mb: !0,
                      mtr: !0,
                    }),
                  this._controlsVisibility
                );
              },
              onDeselect: function () {},
              onSelect: function () {},
            });
          })(),
          b.util.object.extend(b.StaticCanvas.prototype, {
            FX_DURATION: 500,
            fxCenterObjectH: function (t, e) {
              var i = function () {},
                n = (e = e || {}).onComplete || i,
                r = e.onChange || i,
                s = this;
              return (
                b.util.animate({
                  startValue: t.left,
                  endValue: this.getCenter().left,
                  duration: this.FX_DURATION,
                  onChange: function (e) {
                    t.set("left", e), s.requestRenderAll(), r();
                  },
                  onComplete: function () {
                    t.setCoords(), n();
                  },
                }),
                this
              );
            },
            fxCenterObjectV: function (t, e) {
              var i = function () {},
                n = (e = e || {}).onComplete || i,
                r = e.onChange || i,
                s = this;
              return (
                b.util.animate({
                  startValue: t.top,
                  endValue: this.getCenter().top,
                  duration: this.FX_DURATION,
                  onChange: function (e) {
                    t.set("top", e), s.requestRenderAll(), r();
                  },
                  onComplete: function () {
                    t.setCoords(), n();
                  },
                }),
                this
              );
            },
            fxRemove: function (t, e) {
              var i = function () {},
                n = (e = e || {}).onComplete || i,
                r = e.onChange || i,
                s = this;
              return (
                b.util.animate({
                  startValue: t.opacity,
                  endValue: 0,
                  duration: this.FX_DURATION,
                  onChange: function (e) {
                    t.set("opacity", e), s.requestRenderAll(), r();
                  },
                  onComplete: function () {
                    s.remove(t), n();
                  },
                }),
                this
              );
            },
          }),
          b.util.object.extend(b.Object.prototype, {
            animate: function () {
              if (arguments[0] && "object" == typeof arguments[0]) {
                var t,
                  e,
                  i = [];
                for (t in arguments[0]) i.push(t);
                for (var n = 0, r = i.length; n < r; n++)
                  (t = i[n]),
                    (e = n !== r - 1),
                    this._animate(t, arguments[0][t], arguments[1], e);
              } else this._animate.apply(this, arguments);
              return this;
            },
            _animate: function (t, e, i, n) {
              var r,
                s = this;
              (e = e.toString()),
                (i = i ? b.util.object.clone(i) : {}),
                ~t.indexOf(".") && (r = t.split("."));
              var o = r ? this.get(r[0])[r[1]] : this.get(t);
              "from" in i || (i.from = o),
                (e = ~e.indexOf("=")
                  ? o + parseFloat(e.replace("=", ""))
                  : parseFloat(e)),
                b.util.animate({
                  startValue: i.from,
                  endValue: e,
                  byValue: i.by,
                  easing: i.easing,
                  duration: i.duration,
                  abort:
                    i.abort &&
                    function () {
                      return i.abort.call(s);
                    },
                  onChange: function (e, o, a) {
                    r ? (s[r[0]][r[1]] = e) : s.set(t, e),
                      n || (i.onChange && i.onChange(e, o, a));
                  },
                  onComplete: function (t, e, r) {
                    n || (s.setCoords(), i.onComplete && i.onComplete(t, e, r));
                  },
                });
            },
          }),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.object.extend,
              n = e.util.object.clone,
              r = { x1: 1, x2: 1, y1: 1, y2: 1 },
              s = e.StaticCanvas.supports("setLineDash");
            function o(t, e) {
              var i = t.origin,
                n = t.axis1,
                r = t.axis2,
                s = t.dimension,
                o = e.nearest,
                a = e.center,
                h = e.farthest;
              return function () {
                switch (this.get(i)) {
                  case o:
                    return Math.min(this.get(n), this.get(r));
                  case a:
                    return (
                      Math.min(this.get(n), this.get(r)) + 0.5 * this.get(s)
                    );
                  case h:
                    return Math.max(this.get(n), this.get(r));
                }
              };
            }
            e.Line
              ? e.warn("fabric.Line is already defined")
              : ((e.Line = e.util.createClass(e.Object, {
                  type: "line",
                  x1: 0,
                  y1: 0,
                  x2: 0,
                  y2: 0,
                  cacheProperties: e.Object.prototype.cacheProperties.concat(
                    "x1",
                    "x2",
                    "y1",
                    "y2"
                  ),
                  initialize: function (t, e) {
                    t || (t = [0, 0, 0, 0]),
                      this.callSuper("initialize", e),
                      this.set("x1", t[0]),
                      this.set("y1", t[1]),
                      this.set("x2", t[2]),
                      this.set("y2", t[3]),
                      this._setWidthHeight(e);
                  },
                  _setWidthHeight: function (t) {
                    t || (t = {}),
                      (this.width = Math.abs(this.x2 - this.x1)),
                      (this.height = Math.abs(this.y2 - this.y1)),
                      (this.left =
                        "left" in t ? t.left : this._getLeftToOriginX()),
                      (this.top = "top" in t ? t.top : this._getTopToOriginY());
                  },
                  _set: function (t, e) {
                    return (
                      this.callSuper("_set", t, e),
                      void 0 !== r[t] && this._setWidthHeight(),
                      this
                    );
                  },
                  _getLeftToOriginX: o(
                    {
                      origin: "originX",
                      axis1: "x1",
                      axis2: "x2",
                      dimension: "width",
                    },
                    { nearest: "left", center: "center", farthest: "right" }
                  ),
                  _getTopToOriginY: o(
                    {
                      origin: "originY",
                      axis1: "y1",
                      axis2: "y2",
                      dimension: "height",
                    },
                    { nearest: "top", center: "center", farthest: "bottom" }
                  ),
                  _render: function (t) {
                    if (
                      (t.beginPath(),
                      !this.strokeDashArray || (this.strokeDashArray && s))
                    ) {
                      var e = this.calcLinePoints();
                      t.moveTo(e.x1, e.y1), t.lineTo(e.x2, e.y2);
                    }
                    t.lineWidth = this.strokeWidth;
                    var i = t.strokeStyle;
                    (t.strokeStyle = this.stroke || t.fillStyle),
                      this.stroke && this._renderStroke(t),
                      (t.strokeStyle = i);
                  },
                  _renderDashedStroke: function (t) {
                    var i = this.calcLinePoints();
                    t.beginPath(),
                      e.util.drawDashedLine(
                        t,
                        i.x1,
                        i.y1,
                        i.x2,
                        i.y2,
                        this.strokeDashArray
                      ),
                      t.closePath();
                  },
                  _findCenterFromElement: function () {
                    return {
                      x: (this.x1 + this.x2) / 2,
                      y: (this.y1 + this.y2) / 2,
                    };
                  },
                  toObject: function (t) {
                    return i(
                      this.callSuper("toObject", t),
                      this.calcLinePoints()
                    );
                  },
                  _getNonTransformedDimensions: function () {
                    var t = this.callSuper("_getNonTransformedDimensions");
                    return (
                      "butt" === this.strokeLineCap &&
                        (0 === this.width && (t.y -= this.strokeWidth),
                        0 === this.height && (t.x -= this.strokeWidth)),
                      t
                    );
                  },
                  calcLinePoints: function () {
                    var t = this.x1 <= this.x2 ? -1 : 1,
                      e = this.y1 <= this.y2 ? -1 : 1,
                      i = t * this.width * 0.5,
                      n = e * this.height * 0.5;
                    return {
                      x1: i,
                      x2: t * this.width * -0.5,
                      y1: n,
                      y2: e * this.height * -0.5,
                    };
                  },
                  _toSVG: function () {
                    var t = this.calcLinePoints();
                    return [
                      "<line ",
                      "COMMON_PARTS",
                      'x1="',
                      t.x1,
                      '" y1="',
                      t.y1,
                      '" x2="',
                      t.x2,
                      '" y2="',
                      t.y2,
                      '" />\n',
                    ];
                  },
                })),
                (e.Line.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(
                  "x1 y1 x2 y2".split(" ")
                )),
                (e.Line.fromElement = function (t, n, r) {
                  r = r || {};
                  var s = e.parseAttributes(t, e.Line.ATTRIBUTE_NAMES),
                    o = [s.x1 || 0, s.y1 || 0, s.x2 || 0, s.y2 || 0];
                  n(new e.Line(o, i(s, r)));
                }),
                (e.Line.fromObject = function (t, i) {
                  var r = n(t, !0);
                  (r.points = [t.x1, t.y1, t.x2, t.y2]),
                    e.Object._fromObject(
                      "Line",
                      r,
                      function (t) {
                        delete t.points, i && i(t);
                      },
                      "points"
                    );
                }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = Math.PI;
            e.Circle
              ? e.warn("fabric.Circle is already defined.")
              : ((e.Circle = e.util.createClass(e.Object, {
                  type: "circle",
                  radius: 0,
                  startAngle: 0,
                  endAngle: 2 * i,
                  cacheProperties: e.Object.prototype.cacheProperties.concat(
                    "radius",
                    "startAngle",
                    "endAngle"
                  ),
                  _set: function (t, e) {
                    return (
                      this.callSuper("_set", t, e),
                      "radius" === t && this.setRadius(e),
                      this
                    );
                  },
                  toObject: function (t) {
                    return this.callSuper(
                      "toObject",
                      ["radius", "startAngle", "endAngle"].concat(t)
                    );
                  },
                  _toSVG: function () {
                    var t,
                      n = (this.endAngle - this.startAngle) % (2 * i);
                    if (0 === n)
                      t = [
                        "<circle ",
                        "COMMON_PARTS",
                        'cx="0" cy="0" ',
                        'r="',
                        this.radius,
                        '" />\n',
                      ];
                    else {
                      var r = e.util.cos(this.startAngle) * this.radius,
                        s = e.util.sin(this.startAngle) * this.radius,
                        o = e.util.cos(this.endAngle) * this.radius,
                        a = e.util.sin(this.endAngle) * this.radius,
                        h = n > i ? "1" : "0";
                      t = [
                        '<path d="M ' + r + " " + s,
                        " A " + this.radius + " " + this.radius,
                        " 0 ",
                        +h + " 1",
                        " " + o + " " + a,
                        '" ',
                        "COMMON_PARTS",
                        " />\n",
                      ];
                    }
                    return t;
                  },
                  _render: function (t) {
                    t.beginPath(),
                      t.arc(
                        0,
                        0,
                        this.radius,
                        this.startAngle,
                        this.endAngle,
                        !1
                      ),
                      this._renderPaintInOrder(t);
                  },
                  getRadiusX: function () {
                    return this.get("radius") * this.get("scaleX");
                  },
                  getRadiusY: function () {
                    return this.get("radius") * this.get("scaleY");
                  },
                  setRadius: function (t) {
                    return (
                      (this.radius = t),
                      this.set("width", 2 * t).set("height", 2 * t)
                    );
                  },
                })),
                (e.Circle.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(
                  "cx cy r".split(" ")
                )),
                (e.Circle.fromElement = function (t, i) {
                  var n,
                    r = e.parseAttributes(t, e.Circle.ATTRIBUTE_NAMES);
                  if (!("radius" in (n = r) && n.radius >= 0))
                    throw new Error(
                      "value of `r` attribute is required and can not be negative"
                    );
                  (r.left = (r.left || 0) - r.radius),
                    (r.top = (r.top || 0) - r.radius),
                    i(new e.Circle(r));
                }),
                (e.Circle.fromObject = function (t, i) {
                  return e.Object._fromObject("Circle", t, i);
                }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {});
            e.Triangle
              ? e.warn("fabric.Triangle is already defined")
              : ((e.Triangle = e.util.createClass(e.Object, {
                  type: "triangle",
                  width: 100,
                  height: 100,
                  _render: function (t) {
                    var e = this.width / 2,
                      i = this.height / 2;
                    t.beginPath(),
                      t.moveTo(-e, i),
                      t.lineTo(0, -i),
                      t.lineTo(e, i),
                      t.closePath(),
                      this._renderPaintInOrder(t);
                  },
                  _renderDashedStroke: function (t) {
                    var i = this.width / 2,
                      n = this.height / 2;
                    t.beginPath(),
                      e.util.drawDashedLine(
                        t,
                        -i,
                        n,
                        0,
                        -n,
                        this.strokeDashArray
                      ),
                      e.util.drawDashedLine(
                        t,
                        0,
                        -n,
                        i,
                        n,
                        this.strokeDashArray
                      ),
                      e.util.drawDashedLine(
                        t,
                        i,
                        n,
                        -i,
                        n,
                        this.strokeDashArray
                      ),
                      t.closePath();
                  },
                  _toSVG: function () {
                    var t = this.width / 2,
                      e = this.height / 2;
                    return [
                      "<polygon ",
                      "COMMON_PARTS",
                      'points="',
                      [-t + " " + e, "0 " + -e, t + " " + e].join(","),
                      '" />',
                    ];
                  },
                })),
                (e.Triangle.fromObject = function (t, i) {
                  return e.Object._fromObject("Triangle", t, i);
                }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = 2 * Math.PI;
            e.Ellipse
              ? e.warn("fabric.Ellipse is already defined.")
              : ((e.Ellipse = e.util.createClass(e.Object, {
                  type: "ellipse",
                  rx: 0,
                  ry: 0,
                  cacheProperties: e.Object.prototype.cacheProperties.concat(
                    "rx",
                    "ry"
                  ),
                  initialize: function (t) {
                    this.callSuper("initialize", t),
                      this.set("rx", (t && t.rx) || 0),
                      this.set("ry", (t && t.ry) || 0);
                  },
                  _set: function (t, e) {
                    switch ((this.callSuper("_set", t, e), t)) {
                      case "rx":
                        (this.rx = e), this.set("width", 2 * e);
                        break;
                      case "ry":
                        (this.ry = e), this.set("height", 2 * e);
                    }
                    return this;
                  },
                  getRx: function () {
                    return this.get("rx") * this.get("scaleX");
                  },
                  getRy: function () {
                    return this.get("ry") * this.get("scaleY");
                  },
                  toObject: function (t) {
                    return this.callSuper("toObject", ["rx", "ry"].concat(t));
                  },
                  _toSVG: function () {
                    return [
                      "<ellipse ",
                      "COMMON_PARTS",
                      'cx="0" cy="0" ',
                      'rx="',
                      this.rx,
                      '" ry="',
                      this.ry,
                      '" />\n',
                    ];
                  },
                  _render: function (t) {
                    t.beginPath(),
                      t.save(),
                      t.transform(1, 0, 0, this.ry / this.rx, 0, 0),
                      t.arc(0, 0, this.rx, 0, i, !1),
                      t.restore(),
                      this._renderPaintInOrder(t);
                  },
                })),
                (e.Ellipse.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(
                  "cx cy rx ry".split(" ")
                )),
                (e.Ellipse.fromElement = function (t, i) {
                  var n = e.parseAttributes(t, e.Ellipse.ATTRIBUTE_NAMES);
                  (n.left = (n.left || 0) - n.rx),
                    (n.top = (n.top || 0) - n.ry),
                    i(new e.Ellipse(n));
                }),
                (e.Ellipse.fromObject = function (t, i) {
                  return e.Object._fromObject("Ellipse", t, i);
                }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.object.extend;
            e.Rect
              ? e.warn("fabric.Rect is already defined")
              : ((e.Rect = e.util.createClass(e.Object, {
                  stateProperties: e.Object.prototype.stateProperties.concat(
                    "rx",
                    "ry"
                  ),
                  type: "rect",
                  rx: 0,
                  ry: 0,
                  cacheProperties: e.Object.prototype.cacheProperties.concat(
                    "rx",
                    "ry"
                  ),
                  initialize: function (t) {
                    this.callSuper("initialize", t), this._initRxRy();
                  },
                  _initRxRy: function () {
                    this.rx && !this.ry
                      ? (this.ry = this.rx)
                      : this.ry && !this.rx && (this.rx = this.ry);
                  },
                  _render: function (t) {
                    var e = this.rx ? Math.min(this.rx, this.width / 2) : 0,
                      i = this.ry ? Math.min(this.ry, this.height / 2) : 0,
                      n = this.width,
                      r = this.height,
                      s = -this.width / 2,
                      o = -this.height / 2,
                      a = 0 !== e || 0 !== i,
                      h = 0.4477152502;
                    t.beginPath(),
                      t.moveTo(s + e, o),
                      t.lineTo(s + n - e, o),
                      a &&
                        t.bezierCurveTo(
                          s + n - h * e,
                          o,
                          s + n,
                          o + h * i,
                          s + n,
                          o + i
                        ),
                      t.lineTo(s + n, o + r - i),
                      a &&
                        t.bezierCurveTo(
                          s + n,
                          o + r - h * i,
                          s + n - h * e,
                          o + r,
                          s + n - e,
                          o + r
                        ),
                      t.lineTo(s + e, o + r),
                      a &&
                        t.bezierCurveTo(
                          s + h * e,
                          o + r,
                          s,
                          o + r - h * i,
                          s,
                          o + r - i
                        ),
                      t.lineTo(s, o + i),
                      a &&
                        t.bezierCurveTo(s, o + h * i, s + h * e, o, s + e, o),
                      t.closePath(),
                      this._renderPaintInOrder(t);
                  },
                  _renderDashedStroke: function (t) {
                    var i = -this.width / 2,
                      n = -this.height / 2,
                      r = this.width,
                      s = this.height;
                    t.beginPath(),
                      e.util.drawDashedLine(
                        t,
                        i,
                        n,
                        i + r,
                        n,
                        this.strokeDashArray
                      ),
                      e.util.drawDashedLine(
                        t,
                        i + r,
                        n,
                        i + r,
                        n + s,
                        this.strokeDashArray
                      ),
                      e.util.drawDashedLine(
                        t,
                        i + r,
                        n + s,
                        i,
                        n + s,
                        this.strokeDashArray
                      ),
                      e.util.drawDashedLine(
                        t,
                        i,
                        n + s,
                        i,
                        n,
                        this.strokeDashArray
                      ),
                      t.closePath();
                  },
                  toObject: function (t) {
                    return this.callSuper("toObject", ["rx", "ry"].concat(t));
                  },
                  _toSVG: function () {
                    return [
                      "<rect ",
                      "COMMON_PARTS",
                      'x="',
                      -this.width / 2,
                      '" y="',
                      -this.height / 2,
                      '" rx="',
                      this.rx,
                      '" ry="',
                      this.ry,
                      '" width="',
                      this.width,
                      '" height="',
                      this.height,
                      '" />\n',
                    ];
                  },
                })),
                (e.Rect.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(
                  "x y rx ry width height".split(" ")
                )),
                (e.Rect.fromElement = function (t, n, r) {
                  if (!t) return n(null);
                  r = r || {};
                  var s = e.parseAttributes(t, e.Rect.ATTRIBUTE_NAMES);
                  (s.left = s.left || 0),
                    (s.top = s.top || 0),
                    (s.height = s.height || 0),
                    (s.width = s.width || 0);
                  var o = new e.Rect(i(r ? e.util.object.clone(r) : {}, s));
                  (o.visible = o.visible && o.width > 0 && o.height > 0), n(o);
                }),
                (e.Rect.fromObject = function (t, i) {
                  return e.Object._fromObject("Rect", t, i);
                }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.object.extend,
              n = e.util.array.min,
              r = e.util.array.max,
              s = e.util.toFixed;
            e.Polyline
              ? e.warn("fabric.Polyline is already defined")
              : ((e.Polyline = e.util.createClass(e.Object, {
                  type: "polyline",
                  points: null,
                  cacheProperties:
                    e.Object.prototype.cacheProperties.concat("points"),
                  initialize: function (t, e) {
                    (e = e || {}),
                      (this.points = t || []),
                      this.callSuper("initialize", e),
                      this._setPositionDimensions(e);
                  },
                  _setPositionDimensions: function (t) {
                    var e,
                      i = this._calcDimensions(t);
                    (this.width = i.width),
                      (this.height = i.height),
                      t.fromSVG ||
                        (e = this.translateToGivenOrigin(
                          {
                            x: i.left - this.strokeWidth / 2,
                            y: i.top - this.strokeWidth / 2,
                          },
                          "left",
                          "top",
                          this.originX,
                          this.originY
                        )),
                      void 0 === t.left &&
                        (this.left = t.fromSVG ? i.left : e.x),
                      void 0 === t.top && (this.top = t.fromSVG ? i.top : e.y),
                      (this.pathOffset = {
                        x: i.left + this.width / 2,
                        y: i.top + this.height / 2,
                      });
                  },
                  _calcDimensions: function () {
                    var t = this.points,
                      e = n(t, "x") || 0,
                      i = n(t, "y") || 0;
                    return {
                      left: e,
                      top: i,
                      width: (r(t, "x") || 0) - e,
                      height: (r(t, "y") || 0) - i,
                    };
                  },
                  toObject: function (t) {
                    return i(this.callSuper("toObject", t), {
                      points: this.points.concat(),
                    });
                  },
                  _toSVG: function () {
                    for (
                      var t = [],
                        i = this.pathOffset.x,
                        n = this.pathOffset.y,
                        r = e.Object.NUM_FRACTION_DIGITS,
                        o = 0,
                        a = this.points.length;
                      o < a;
                      o++
                    )
                      t.push(
                        s(this.points[o].x - i, r),
                        ",",
                        s(this.points[o].y - n, r),
                        " "
                      );
                    return [
                      "<" + this.type + " ",
                      "COMMON_PARTS",
                      'points="',
                      t.join(""),
                      '" />\n',
                    ];
                  },
                  commonRender: function (t) {
                    var e,
                      i = this.points.length,
                      n = this.pathOffset.x,
                      r = this.pathOffset.y;
                    if (!i || isNaN(this.points[i - 1].y)) return !1;
                    t.beginPath(),
                      t.moveTo(this.points[0].x - n, this.points[0].y - r);
                    for (var s = 0; s < i; s++)
                      (e = this.points[s]), t.lineTo(e.x - n, e.y - r);
                    return !0;
                  },
                  _render: function (t) {
                    this.commonRender(t) && this._renderPaintInOrder(t);
                  },
                  _renderDashedStroke: function (t) {
                    var i, n;
                    t.beginPath();
                    for (var r = 0, s = this.points.length; r < s; r++)
                      (i = this.points[r]),
                        (n = this.points[r + 1] || i),
                        e.util.drawDashedLine(
                          t,
                          i.x,
                          i.y,
                          n.x,
                          n.y,
                          this.strokeDashArray
                        );
                  },
                  complexity: function () {
                    return this.get("points").length;
                  },
                })),
                (e.Polyline.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat()),
                (e.Polyline.fromElementGenerator = function (t) {
                  return function (n, r, s) {
                    if (!n) return r(null);
                    s || (s = {});
                    var o = e.parsePointsAttribute(n.getAttribute("points")),
                      a = e.parseAttributes(n, e[t].ATTRIBUTE_NAMES);
                    (a.fromSVG = !0), r(new e[t](o, i(a, s)));
                  };
                }),
                (e.Polyline.fromElement =
                  e.Polyline.fromElementGenerator("Polyline")),
                (e.Polyline.fromObject = function (t, i) {
                  return e.Object._fromObject("Polyline", t, i, "points");
                }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {});
            e.Polygon
              ? e.warn("fabric.Polygon is already defined")
              : ((e.Polygon = e.util.createClass(e.Polyline, {
                  type: "polygon",
                  _render: function (t) {
                    this.commonRender(t) &&
                      (t.closePath(), this._renderPaintInOrder(t));
                  },
                  _renderDashedStroke: function (t) {
                    this.callSuper("_renderDashedStroke", t), t.closePath();
                  },
                })),
                (e.Polygon.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat()),
                (e.Polygon.fromElement =
                  e.Polyline.fromElementGenerator("Polygon")),
                (e.Polygon.fromObject = function (t, i) {
                  return e.Object._fromObject("Polygon", t, i, "points");
                }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.array.min,
              n = e.util.array.max,
              r = e.util.object.extend,
              s = Object.prototype.toString,
              o = e.util.drawArc,
              a = e.util.toFixed,
              h = { m: 2, l: 2, h: 1, v: 1, c: 6, s: 4, q: 4, t: 2, a: 7 },
              c = { m: "l", M: "L" };
            e.Path
              ? e.warn("fabric.Path is already defined")
              : ((e.Path = e.util.createClass(e.Object, {
                  type: "path",
                  path: null,
                  cacheProperties: e.Object.prototype.cacheProperties.concat(
                    "path",
                    "fillRule"
                  ),
                  stateProperties:
                    e.Object.prototype.stateProperties.concat("path"),
                  initialize: function (t, i) {
                    (i = i || {}),
                      this.callSuper("initialize", i),
                      t || (t = []);
                    var n = "[object Array]" === s.call(t);
                    (this.path = n
                      ? t
                      : t.match && t.match(/[mzlhvcsqta][^mzlhvcsqta]*/gi)),
                      this.path &&
                        (n || (this.path = this._parsePath()),
                        e.Polyline.prototype._setPositionDimensions.call(
                          this,
                          i
                        ));
                  },
                  _renderPathCommands: function (t) {
                    var e,
                      i,
                      n,
                      r = null,
                      s = 0,
                      a = 0,
                      h = 0,
                      c = 0,
                      l = 0,
                      u = 0,
                      g = -this.pathOffset.x,
                      f = -this.pathOffset.y;
                    t.beginPath();
                    for (var d = 0, p = this.path.length; d < p; ++d) {
                      switch ((e = this.path[d])[0]) {
                        case "l":
                          (h += e[1]), (c += e[2]), t.lineTo(h + g, c + f);
                          break;
                        case "L":
                          (h = e[1]), (c = e[2]), t.lineTo(h + g, c + f);
                          break;
                        case "h":
                          (h += e[1]), t.lineTo(h + g, c + f);
                          break;
                        case "H":
                          (h = e[1]), t.lineTo(h + g, c + f);
                          break;
                        case "v":
                          (c += e[1]), t.lineTo(h + g, c + f);
                          break;
                        case "V":
                          (c = e[1]), t.lineTo(h + g, c + f);
                          break;
                        case "m":
                          (s = h += e[1]),
                            (a = c += e[2]),
                            t.moveTo(h + g, c + f);
                          break;
                        case "M":
                          (s = h = e[1]),
                            (a = c = e[2]),
                            t.moveTo(h + g, c + f);
                          break;
                        case "c":
                          (i = h + e[5]),
                            (n = c + e[6]),
                            (l = h + e[3]),
                            (u = c + e[4]),
                            t.bezierCurveTo(
                              h + e[1] + g,
                              c + e[2] + f,
                              l + g,
                              u + f,
                              i + g,
                              n + f
                            ),
                            (h = i),
                            (c = n);
                          break;
                        case "C":
                          (h = e[5]),
                            (c = e[6]),
                            (l = e[3]),
                            (u = e[4]),
                            t.bezierCurveTo(
                              e[1] + g,
                              e[2] + f,
                              l + g,
                              u + f,
                              h + g,
                              c + f
                            );
                          break;
                        case "s":
                          (i = h + e[3]),
                            (n = c + e[4]),
                            null === r[0].match(/[CcSs]/)
                              ? ((l = h), (u = c))
                              : ((l = 2 * h - l), (u = 2 * c - u)),
                            t.bezierCurveTo(
                              l + g,
                              u + f,
                              h + e[1] + g,
                              c + e[2] + f,
                              i + g,
                              n + f
                            ),
                            (l = h + e[1]),
                            (u = c + e[2]),
                            (h = i),
                            (c = n);
                          break;
                        case "S":
                          (i = e[3]),
                            (n = e[4]),
                            null === r[0].match(/[CcSs]/)
                              ? ((l = h), (u = c))
                              : ((l = 2 * h - l), (u = 2 * c - u)),
                            t.bezierCurveTo(
                              l + g,
                              u + f,
                              e[1] + g,
                              e[2] + f,
                              i + g,
                              n + f
                            ),
                            (h = i),
                            (c = n),
                            (l = e[1]),
                            (u = e[2]);
                          break;
                        case "q":
                          (i = h + e[3]),
                            (n = c + e[4]),
                            (l = h + e[1]),
                            (u = c + e[2]),
                            t.quadraticCurveTo(l + g, u + f, i + g, n + f),
                            (h = i),
                            (c = n);
                          break;
                        case "Q":
                          (i = e[3]),
                            (n = e[4]),
                            t.quadraticCurveTo(
                              e[1] + g,
                              e[2] + f,
                              i + g,
                              n + f
                            ),
                            (h = i),
                            (c = n),
                            (l = e[1]),
                            (u = e[2]);
                          break;
                        case "t":
                          (i = h + e[1]),
                            (n = c + e[2]),
                            null === r[0].match(/[QqTt]/)
                              ? ((l = h), (u = c))
                              : ((l = 2 * h - l), (u = 2 * c - u)),
                            t.quadraticCurveTo(l + g, u + f, i + g, n + f),
                            (h = i),
                            (c = n);
                          break;
                        case "T":
                          (i = e[1]),
                            (n = e[2]),
                            null === r[0].match(/[QqTt]/)
                              ? ((l = h), (u = c))
                              : ((l = 2 * h - l), (u = 2 * c - u)),
                            t.quadraticCurveTo(l + g, u + f, i + g, n + f),
                            (h = i),
                            (c = n);
                          break;
                        case "a":
                          o(t, h + g, c + f, [
                            e[1],
                            e[2],
                            e[3],
                            e[4],
                            e[5],
                            e[6] + h + g,
                            e[7] + c + f,
                          ]),
                            (h += e[6]),
                            (c += e[7]);
                          break;
                        case "A":
                          o(t, h + g, c + f, [
                            e[1],
                            e[2],
                            e[3],
                            e[4],
                            e[5],
                            e[6] + g,
                            e[7] + f,
                          ]),
                            (h = e[6]),
                            (c = e[7]);
                          break;
                        case "z":
                        case "Z":
                          (h = s), (c = a), t.closePath();
                      }
                      r = e;
                    }
                  },
                  _render: function (t) {
                    this._renderPathCommands(t), this._renderPaintInOrder(t);
                  },
                  toString: function () {
                    return (
                      "#<fabric.Path (" +
                      this.complexity() +
                      '): { "top": ' +
                      this.top +
                      ', "left": ' +
                      this.left +
                      " }>"
                    );
                  },
                  toObject: function (t) {
                    return r(this.callSuper("toObject", t), {
                      path: this.path.map(function (t) {
                        return t.slice();
                      }),
                    });
                  },
                  toDatalessObject: function (t) {
                    var e = this.toObject(["sourcePath"].concat(t));
                    return e.sourcePath && delete e.path, e;
                  },
                  _toSVG: function () {
                    return [
                      "<path ",
                      "COMMON_PARTS",
                      'd="',
                      this.path
                        .map(function (t) {
                          return t.join(" ");
                        })
                        .join(" "),
                      '" stroke-linecap="round" ',
                      "/>\n",
                    ];
                  },
                  _getOffsetTransform: function () {
                    var t = e.Object.NUM_FRACTION_DIGITS;
                    return (
                      " translate(" +
                      a(-this.pathOffset.x, t) +
                      ", " +
                      a(-this.pathOffset.y, t) +
                      ")"
                    );
                  },
                  toClipPathSVG: function (t) {
                    var e = this._getOffsetTransform();
                    return (
                      "\t" +
                      this._createBaseClipPathSVGMarkup(this._toSVG(), {
                        reviver: t,
                        additionalTransform: e,
                      })
                    );
                  },
                  toSVG: function (t) {
                    var e = this._getOffsetTransform();
                    return this._createBaseSVGMarkup(this._toSVG(), {
                      reviver: t,
                      additionalTransform: e,
                    });
                  },
                  complexity: function () {
                    return this.path.length;
                  },
                  _parsePath: function () {
                    for (
                      var t,
                        i,
                        n,
                        r,
                        s,
                        o = [],
                        a = [],
                        l = e.rePathCommand,
                        u = 0,
                        g = this.path.length;
                      u < g;
                      u++
                    ) {
                      for (
                        r = (t = this.path[u]).slice(1).trim(), a.length = 0;
                        (n = l.exec(r));

                      )
                        a.push(n[0]);
                      s = [t.charAt(0)];
                      for (var f = 0, d = a.length; f < d; f++)
                        (i = parseFloat(a[f])), isNaN(i) || s.push(i);
                      var p = s[0],
                        C = h[p.toLowerCase()],
                        A = c[p] || p;
                      if (s.length - 1 > C)
                        for (var v = 1, m = s.length; v < m; v += C)
                          o.push([p].concat(s.slice(v, v + C))), (p = A);
                      else o.push(s);
                    }
                    return o;
                  },
                  _calcDimensions: function () {
                    for (
                      var t,
                        r,
                        s,
                        o,
                        a = [],
                        h = [],
                        c = null,
                        l = 0,
                        u = 0,
                        g = 0,
                        f = 0,
                        d = 0,
                        p = 0,
                        C = 0,
                        A = this.path.length;
                      C < A;
                      ++C
                    ) {
                      switch ((t = this.path[C])[0]) {
                        case "l":
                          (g += t[1]), (f += t[2]), (o = []);
                          break;
                        case "L":
                          (g = t[1]), (f = t[2]), (o = []);
                          break;
                        case "h":
                          (g += t[1]), (o = []);
                          break;
                        case "H":
                          (g = t[1]), (o = []);
                          break;
                        case "v":
                          (f += t[1]), (o = []);
                          break;
                        case "V":
                          (f = t[1]), (o = []);
                          break;
                        case "m":
                          (l = g += t[1]), (u = f += t[2]), (o = []);
                          break;
                        case "M":
                          (l = g = t[1]), (u = f = t[2]), (o = []);
                          break;
                        case "c":
                          (r = g + t[5]),
                            (s = f + t[6]),
                            (d = g + t[3]),
                            (p = f + t[4]),
                            (o = e.util.getBoundsOfCurve(
                              g,
                              f,
                              g + t[1],
                              f + t[2],
                              d,
                              p,
                              r,
                              s
                            )),
                            (g = r),
                            (f = s);
                          break;
                        case "C":
                          (d = t[3]),
                            (p = t[4]),
                            (o = e.util.getBoundsOfCurve(
                              g,
                              f,
                              t[1],
                              t[2],
                              d,
                              p,
                              t[5],
                              t[6]
                            )),
                            (g = t[5]),
                            (f = t[6]);
                          break;
                        case "s":
                          (r = g + t[3]),
                            (s = f + t[4]),
                            null === c[0].match(/[CcSs]/)
                              ? ((d = g), (p = f))
                              : ((d = 2 * g - d), (p = 2 * f - p)),
                            (o = e.util.getBoundsOfCurve(
                              g,
                              f,
                              d,
                              p,
                              g + t[1],
                              f + t[2],
                              r,
                              s
                            )),
                            (d = g + t[1]),
                            (p = f + t[2]),
                            (g = r),
                            (f = s);
                          break;
                        case "S":
                          (r = t[3]),
                            (s = t[4]),
                            null === c[0].match(/[CcSs]/)
                              ? ((d = g), (p = f))
                              : ((d = 2 * g - d), (p = 2 * f - p)),
                            (o = e.util.getBoundsOfCurve(
                              g,
                              f,
                              d,
                              p,
                              t[1],
                              t[2],
                              r,
                              s
                            )),
                            (g = r),
                            (f = s),
                            (d = t[1]),
                            (p = t[2]);
                          break;
                        case "q":
                          (r = g + t[3]),
                            (s = f + t[4]),
                            (d = g + t[1]),
                            (p = f + t[2]),
                            (o = e.util.getBoundsOfCurve(
                              g,
                              f,
                              d,
                              p,
                              d,
                              p,
                              r,
                              s
                            )),
                            (g = r),
                            (f = s);
                          break;
                        case "Q":
                          (d = t[1]),
                            (p = t[2]),
                            (o = e.util.getBoundsOfCurve(
                              g,
                              f,
                              d,
                              p,
                              d,
                              p,
                              t[3],
                              t[4]
                            )),
                            (g = t[3]),
                            (f = t[4]);
                          break;
                        case "t":
                          (r = g + t[1]),
                            (s = f + t[2]),
                            null === c[0].match(/[QqTt]/)
                              ? ((d = g), (p = f))
                              : ((d = 2 * g - d), (p = 2 * f - p)),
                            (o = e.util.getBoundsOfCurve(
                              g,
                              f,
                              d,
                              p,
                              d,
                              p,
                              r,
                              s
                            )),
                            (g = r),
                            (f = s);
                          break;
                        case "T":
                          (r = t[1]),
                            (s = t[2]),
                            null === c[0].match(/[QqTt]/)
                              ? ((d = g), (p = f))
                              : ((d = 2 * g - d), (p = 2 * f - p)),
                            (o = e.util.getBoundsOfCurve(
                              g,
                              f,
                              d,
                              p,
                              d,
                              p,
                              r,
                              s
                            )),
                            (g = r),
                            (f = s);
                          break;
                        case "a":
                          (o = e.util.getBoundsOfArc(
                            g,
                            f,
                            t[1],
                            t[2],
                            t[3],
                            t[4],
                            t[5],
                            t[6] + g,
                            t[7] + f
                          )),
                            (g += t[6]),
                            (f += t[7]);
                          break;
                        case "A":
                          (o = e.util.getBoundsOfArc(
                            g,
                            f,
                            t[1],
                            t[2],
                            t[3],
                            t[4],
                            t[5],
                            t[6],
                            t[7]
                          )),
                            (g = t[6]),
                            (f = t[7]);
                          break;
                        case "z":
                        case "Z":
                          (g = l), (f = u);
                      }
                      (c = t),
                        o.forEach(function (t) {
                          a.push(t.x), h.push(t.y);
                        }),
                        a.push(g),
                        h.push(f);
                    }
                    var v = i(a) || 0,
                      m = i(h) || 0;
                    return {
                      left: v,
                      top: m,
                      width: (n(a) || 0) - v,
                      height: (n(h) || 0) - m,
                    };
                  },
                })),
                (e.Path.fromObject = function (t, i) {
                  if ("string" == typeof t.sourcePath) {
                    var n = t.sourcePath;
                    e.loadSVGFromURL(n, function (e) {
                      var n = e[0];
                      n.setOptions(t), i && i(n);
                    });
                  } else e.Object._fromObject("Path", t, i, "path");
                }),
                (e.Path.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(["d"])),
                (e.Path.fromElement = function (t, i, n) {
                  var s = e.parseAttributes(t, e.Path.ATTRIBUTE_NAMES);
                  (s.fromSVG = !0), i(new e.Path(s.d, r(s, n)));
                }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.array.min,
              n = e.util.array.max;
            e.Group ||
              ((e.Group = e.util.createClass(e.Object, e.Collection, {
                type: "group",
                strokeWidth: 0,
                subTargetCheck: !1,
                cacheProperties: [],
                useSetOnGroup: !1,
                initialize: function (t, e, i) {
                  (e = e || {}),
                    (this._objects = []),
                    i && this.callSuper("initialize", e),
                    (this._objects = t || []);
                  for (var n = this._objects.length; n--; )
                    this._objects[n].group = this;
                  if (i) this._updateObjectsACoords();
                  else {
                    var r = e && e.centerPoint;
                    void 0 !== e.originX && (this.originX = e.originX),
                      void 0 !== e.originY && (this.originY = e.originY),
                      r || this._calcBounds(),
                      this._updateObjectsCoords(r),
                      delete e.centerPoint,
                      this.callSuper("initialize", e);
                  }
                  this.setCoords();
                },
                _updateObjectsACoords: function () {
                  for (var t = this._objects.length; t--; )
                    this._objects[t].setCoords(!0, !0);
                },
                _updateObjectsCoords: function (t) {
                  t = t || this.getCenterPoint();
                  for (var e = this._objects.length; e--; )
                    this._updateObjectCoords(this._objects[e], t);
                },
                _updateObjectCoords: function (t, e) {
                  var i = t.left,
                    n = t.top;
                  t.set({ left: i - e.x, top: n - e.y }),
                    (t.group = this),
                    t.setCoords(!0, !0);
                },
                toString: function () {
                  return "#<fabric.Group: (" + this.complexity() + ")>";
                },
                addWithUpdate: function (t) {
                  return (
                    this._restoreObjectsState(),
                    e.util.resetObjectTransform(this),
                    t &&
                      (this._objects.push(t),
                      (t.group = this),
                      t._set("canvas", this.canvas)),
                    this._calcBounds(),
                    this._updateObjectsCoords(),
                    this.setCoords(),
                    (this.dirty = !0),
                    this
                  );
                },
                removeWithUpdate: function (t) {
                  return (
                    this._restoreObjectsState(),
                    e.util.resetObjectTransform(this),
                    this.remove(t),
                    this._calcBounds(),
                    this._updateObjectsCoords(),
                    this.setCoords(),
                    (this.dirty = !0),
                    this
                  );
                },
                _onObjectAdded: function (t) {
                  (this.dirty = !0),
                    (t.group = this),
                    t._set("canvas", this.canvas);
                },
                _onObjectRemoved: function (t) {
                  (this.dirty = !0), delete t.group;
                },
                _set: function (t, i) {
                  var n = this._objects.length;
                  if (this.useSetOnGroup)
                    for (; n--; ) this._objects[n].setOnGroup(t, i);
                  if ("canvas" === t) for (; n--; ) this._objects[n]._set(t, i);
                  e.Object.prototype._set.call(this, t, i);
                },
                toObject: function (t) {
                  var i = this.includeDefaultValues,
                    n = this._objects.map(function (e) {
                      var n = e.includeDefaultValues;
                      e.includeDefaultValues = i;
                      var r = e.toObject(t);
                      return (e.includeDefaultValues = n), r;
                    }),
                    r = e.Object.prototype.toObject.call(this, t);
                  return (r.objects = n), r;
                },
                toDatalessObject: function (t) {
                  var i,
                    n = this.sourcePath;
                  if (n) i = n;
                  else {
                    var r = this.includeDefaultValues;
                    i = this._objects.map(function (e) {
                      var i = e.includeDefaultValues;
                      e.includeDefaultValues = r;
                      var n = e.toDatalessObject(t);
                      return (e.includeDefaultValues = i), n;
                    });
                  }
                  var s = e.Object.prototype.toDatalessObject.call(this, t);
                  return (s.objects = i), s;
                },
                render: function (t) {
                  (this._transformDone = !0),
                    this.callSuper("render", t),
                    (this._transformDone = !1);
                },
                shouldCache: function () {
                  var t = e.Object.prototype.shouldCache.call(this);
                  if (t)
                    for (var i = 0, n = this._objects.length; i < n; i++)
                      if (this._objects[i].willDrawShadow())
                        return (this.ownCaching = !1), !1;
                  return t;
                },
                willDrawShadow: function () {
                  if (e.Object.prototype.willDrawShadow.call(this)) return !0;
                  for (var t = 0, i = this._objects.length; t < i; t++)
                    if (this._objects[t].willDrawShadow()) return !0;
                  return !1;
                },
                isOnACache: function () {
                  return (
                    this.ownCaching || (this.group && this.group.isOnACache())
                  );
                },
                drawObject: function (t) {
                  for (var e = 0, i = this._objects.length; e < i; e++)
                    this._objects[e].render(t);
                  this._drawClipPath(t);
                },
                isCacheDirty: function (t) {
                  if (this.callSuper("isCacheDirty", t)) return !0;
                  if (!this.statefullCache) return !1;
                  for (var e = 0, i = this._objects.length; e < i; e++)
                    if (this._objects[e].isCacheDirty(!0)) {
                      if (this._cacheCanvas) {
                        var n = this.cacheWidth / this.zoomX,
                          r = this.cacheHeight / this.zoomY;
                        this._cacheContext.clearRect(-n / 2, -r / 2, n, r);
                      }
                      return !0;
                    }
                  return !1;
                },
                _restoreObjectsState: function () {
                  return (
                    this._objects.forEach(this._restoreObjectState, this), this
                  );
                },
                realizeTransform: function (t) {
                  var i = t.calcTransformMatrix(),
                    n = e.util.qrDecompose(i),
                    r = new e.Point(n.translateX, n.translateY);
                  return (
                    (t.flipX = !1),
                    (t.flipY = !1),
                    t.set("scaleX", n.scaleX),
                    t.set("scaleY", n.scaleY),
                    (t.skewX = n.skewX),
                    (t.skewY = n.skewY),
                    (t.angle = n.angle),
                    t.setPositionByOrigin(r, "center", "center"),
                    t
                  );
                },
                _restoreObjectState: function (t) {
                  return (
                    this.realizeTransform(t),
                    t.setCoords(),
                    delete t.group,
                    this
                  );
                },
                destroy: function () {
                  return (
                    this._objects.forEach(function (t) {
                      t.set("dirty", !0);
                    }),
                    this._restoreObjectsState()
                  );
                },
                toActiveSelection: function () {
                  if (this.canvas) {
                    var t = this._objects,
                      i = this.canvas;
                    this._objects = [];
                    var n = this.toObject();
                    delete n.objects;
                    var r = new e.ActiveSelection([]);
                    return (
                      r.set(n),
                      (r.type = "activeSelection"),
                      i.remove(this),
                      t.forEach(function (t) {
                        (t.group = r), (t.dirty = !0), i.add(t);
                      }),
                      (r.canvas = i),
                      (r._objects = t),
                      (i._activeObject = r),
                      r.setCoords(),
                      r
                    );
                  }
                },
                ungroupOnCanvas: function () {
                  return this._restoreObjectsState();
                },
                setObjectsCoords: function () {
                  return (
                    this.forEachObject(function (t) {
                      t.setCoords(!0, !0);
                    }),
                    this
                  );
                },
                _calcBounds: function (t) {
                  for (
                    var e,
                      i,
                      n,
                      r = [],
                      s = [],
                      o = ["tr", "br", "bl", "tl"],
                      a = 0,
                      h = this._objects.length,
                      c = o.length;
                    a < h;
                    ++a
                  )
                    for (
                      (e = this._objects[a]).setCoords(!0), n = 0;
                      n < c;
                      n++
                    )
                      (i = o[n]),
                        r.push(e.oCoords[i].x),
                        s.push(e.oCoords[i].y);
                  this._getBounds(r, s, t);
                },
                _getBounds: function (t, r, s) {
                  var o = new e.Point(i(t), i(r)),
                    a = new e.Point(n(t), n(r)),
                    h = o.y || 0,
                    c = o.x || 0,
                    l = a.x - o.x || 0,
                    u = a.y - o.y || 0;
                  (this.width = l),
                    (this.height = u),
                    s ||
                      this.setPositionByOrigin({ x: c, y: h }, "left", "top");
                },
                _toSVG: function (t) {
                  for (
                    var e = ["<g ", "COMMON_PARTS", " >\n"],
                      i = 0,
                      n = this._objects.length;
                    i < n;
                    i++
                  )
                    e.push("\t\t", this._objects[i].toSVG(t));
                  return e.push("</g>\n"), e;
                },
                getSvgStyles: function () {
                  var t =
                      void 0 !== this.opacity && 1 !== this.opacity
                        ? "opacity: " + this.opacity + ";"
                        : "",
                    e = this.visible ? "" : " visibility: hidden;";
                  return [t, this.getSvgFilter(), e].join("");
                },
                toClipPathSVG: function (t) {
                  for (var e = [], i = 0, n = this._objects.length; i < n; i++)
                    e.push("\t", this._objects[i].toClipPathSVG(t));
                  return this._createBaseClipPathSVGMarkup(e, { reviver: t });
                },
              })),
              (e.Group.fromObject = function (t, i) {
                var n = t.objects,
                  r = e.util.object.clone(t, !0);
                delete r.objects,
                  "string" != typeof n
                    ? e.util.enlivenObjects(n, function (n) {
                        e.util.enlivenObjects([t.clipPath], function (r) {
                          var s = e.util.object.clone(t, !0);
                          (s.clipPath = r[0]),
                            delete s.objects,
                            i && i(new e.Group(n, s, !0));
                        });
                      })
                    : e.loadSVGFromURL(n, function (s) {
                        var o = e.util.groupSVGElements(s, t, n);
                        o.set(r), i && i(o);
                      });
              }));
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {});
            e.ActiveSelection ||
              ((e.ActiveSelection = e.util.createClass(e.Group, {
                type: "activeSelection",
                initialize: function (t, i) {
                  (i = i || {}), (this._objects = t || []);
                  for (var n = this._objects.length; n--; )
                    this._objects[n].group = this;
                  i.originX && (this.originX = i.originX),
                    i.originY && (this.originY = i.originY),
                    this._calcBounds(),
                    this._updateObjectsCoords(),
                    e.Object.prototype.initialize.call(this, i),
                    this.setCoords();
                },
                toGroup: function () {
                  var t = this._objects.concat();
                  this._objects = [];
                  var i = e.Object.prototype.toObject.call(this),
                    n = new e.Group([]);
                  if (
                    (delete i.type,
                    n.set(i),
                    t.forEach(function (t) {
                      t.canvas.remove(t), (t.group = n);
                    }),
                    (n._objects = t),
                    !this.canvas)
                  )
                    return n;
                  var r = this.canvas;
                  return r.add(n), (r._activeObject = n), n.setCoords(), n;
                },
                onDeselect: function () {
                  return this.destroy(), !1;
                },
                toString: function () {
                  return (
                    "#<fabric.ActiveSelection: (" + this.complexity() + ")>"
                  );
                },
                shouldCache: function () {
                  return !1;
                },
                isOnACache: function () {
                  return !1;
                },
                _renderControls: function (t, e, i) {
                  t.save(),
                    (t.globalAlpha = this.isMoving
                      ? this.borderOpacityWhenMoving
                      : 1),
                    this.callSuper("_renderControls", t, e),
                    void 0 === (i = i || {}).hasControls &&
                      (i.hasControls = !1),
                    void 0 === i.hasRotatingPoint && (i.hasRotatingPoint = !1),
                    (i.forActiveSelection = !0);
                  for (var n = 0, r = this._objects.length; n < r; n++)
                    this._objects[n]._renderControls(t, i);
                  t.restore();
                },
              })),
              (e.ActiveSelection.fromObject = function (t, i) {
                e.util.enlivenObjects(t.objects, function (n) {
                  delete t.objects, i && i(new e.ActiveSelection(n, t, !0));
                });
              }));
          })(e),
          (function (t) {
            "use strict";
            var e = b.util.object.extend;
            t.fabric || (t.fabric = {}),
              t.fabric.Image
                ? b.warn("fabric.Image is already defined.")
                : ((b.Image = b.util.createClass(b.Object, {
                    type: "image",
                    crossOrigin: "",
                    strokeWidth: 0,
                    srcFromAttribute: !1,
                    _lastScaleX: 1,
                    _lastScaleY: 1,
                    _filterScalingX: 1,
                    _filterScalingY: 1,
                    minimumScaleTrigger: 0.5,
                    stateProperties: b.Object.prototype.stateProperties.concat(
                      "cropX",
                      "cropY"
                    ),
                    cacheKey: "",
                    cropX: 0,
                    cropY: 0,
                    initialize: function (t, e) {
                      e || (e = {}),
                        (this.filters = []),
                        (this.cacheKey = "texture" + b.Object.__uid++),
                        this.callSuper("initialize", e),
                        this._initElement(t, e);
                    },
                    getElement: function () {
                      return this._element || {};
                    },
                    setElement: function (t, e) {
                      return (
                        this.removeTexture(this.cacheKey),
                        this.removeTexture(this.cacheKey + "_filtered"),
                        (this._element = t),
                        (this._originalElement = t),
                        this._initConfig(e),
                        0 !== this.filters.length && this.applyFilters(),
                        this.resizeFilter && this.applyResizeFilters(),
                        this
                      );
                    },
                    removeTexture: function (t) {
                      var e = b.filterBackend;
                      e && e.evictCachesForKey && e.evictCachesForKey(t);
                    },
                    dispose: function () {
                      this.removeTexture(this.cacheKey),
                        this.removeTexture(this.cacheKey + "_filtered"),
                        (this._cacheContext = void 0),
                        [
                          "_originalElement",
                          "_element",
                          "_filteredEl",
                          "_cacheCanvas",
                        ].forEach(
                          function (t) {
                            b.util.cleanUpJsdomNode(this[t]),
                              (this[t] = void 0);
                          }.bind(this)
                        );
                    },
                    setCrossOrigin: function (t) {
                      return (
                        (this.crossOrigin = t),
                        (this._element.crossOrigin = t),
                        this
                      );
                    },
                    getOriginalSize: function () {
                      var t = this.getElement();
                      return {
                        width: t.naturalWidth || t.width,
                        height: t.naturalHeight || t.height,
                      };
                    },
                    _stroke: function (t) {
                      if (this.stroke && 0 !== this.strokeWidth) {
                        var e = this.width / 2,
                          i = this.height / 2;
                        t.beginPath(),
                          t.moveTo(-e, -i),
                          t.lineTo(e, -i),
                          t.lineTo(e, i),
                          t.lineTo(-e, i),
                          t.lineTo(-e, -i),
                          t.closePath();
                      }
                    },
                    _renderDashedStroke: function (t) {
                      var e = -this.width / 2,
                        i = -this.height / 2,
                        n = this.width,
                        r = this.height;
                      t.save(),
                        this._setStrokeStyles(t, this),
                        t.beginPath(),
                        b.util.drawDashedLine(
                          t,
                          e,
                          i,
                          e + n,
                          i,
                          this.strokeDashArray
                        ),
                        b.util.drawDashedLine(
                          t,
                          e + n,
                          i,
                          e + n,
                          i + r,
                          this.strokeDashArray
                        ),
                        b.util.drawDashedLine(
                          t,
                          e + n,
                          i + r,
                          e,
                          i + r,
                          this.strokeDashArray
                        ),
                        b.util.drawDashedLine(
                          t,
                          e,
                          i + r,
                          e,
                          i,
                          this.strokeDashArray
                        ),
                        t.closePath(),
                        t.restore();
                    },
                    toObject: function (t) {
                      var i = [];
                      this.filters.forEach(function (t) {
                        t && i.push(t.toObject());
                      });
                      var n = e(
                        this.callSuper(
                          "toObject",
                          ["crossOrigin", "cropX", "cropY"].concat(t)
                        ),
                        { src: this.getSrc(), filters: i }
                      );
                      return (
                        this.resizeFilter &&
                          (n.resizeFilter = this.resizeFilter.toObject()),
                        n
                      );
                    },
                    hasCrop: function () {
                      return (
                        this.cropX ||
                        this.cropY ||
                        this.width < this._element.width ||
                        this.height < this._element.height
                      );
                    },
                    _toSVG: function () {
                      var t,
                        e = [],
                        i = [],
                        n = -this.width / 2,
                        r = -this.height / 2,
                        s = "";
                      if (this.hasCrop()) {
                        var o = b.Object.__uid++;
                        e.push(
                          '<clipPath id="imageCrop_' + o + '">\n',
                          '\t<rect x="' +
                            n +
                            '" y="' +
                            r +
                            '" width="' +
                            this.width +
                            '" height="' +
                            this.height +
                            '" />\n',
                          "</clipPath>\n"
                        ),
                          (s = ' clip-path="url(#imageCrop_' + o + ')" ');
                      }
                      if (
                        (i.push(
                          "\t<image ",
                          "COMMON_PARTS",
                          'xlink:href="',
                          this.getSvgSrc(!0),
                          '" x="',
                          n - this.cropX,
                          '" y="',
                          r - this.cropY,
                          '" width="',
                          this._element.width || this._element.naturalWidth,
                          '" height="',
                          this._element.height || this._element.height,
                          '"',
                          s,
                          "></image>\n"
                        ),
                        this.stroke || this.strokeDashArray)
                      ) {
                        var a = this.fill;
                        (this.fill = null),
                          (t = [
                            "\t<rect ",
                            'x="',
                            n,
                            '" y="',
                            r,
                            '" width="',
                            this.width,
                            '" height="',
                            this.height,
                            '" style="',
                            this.getSvgStyles(),
                            '"/>\n',
                          ]),
                          (this.fill = a);
                      }
                      return (e =
                        "fill" !== this.paintFirst
                          ? e.concat(t, i)
                          : e.concat(i, t));
                    },
                    getSrc: function (t) {
                      var e = t ? this._element : this._originalElement;
                      return e
                        ? e.toDataURL
                          ? e.toDataURL()
                          : this.srcFromAttribute
                          ? e.getAttribute("src")
                          : e.src
                        : this.src || "";
                    },
                    setSrc: function (t, e, i) {
                      return (
                        b.util.loadImage(
                          t,
                          function (t) {
                            this.setElement(t, i),
                              this._setWidthHeight(),
                              e && e(this);
                          },
                          this,
                          i && i.crossOrigin
                        ),
                        this
                      );
                    },
                    toString: function () {
                      return (
                        '#<fabric.Image: { src: "' + this.getSrc() + '" }>'
                      );
                    },
                    applyResizeFilters: function () {
                      var t = this.resizeFilter,
                        e = this.minimumScaleTrigger,
                        i = this.getTotalObjectScaling(),
                        n = i.scaleX,
                        r = i.scaleY,
                        s = this._filteredEl || this._originalElement;
                      if (
                        (this.group && this.set("dirty", !0),
                        !t || (n > e && r > e))
                      )
                        return (
                          (this._element = s),
                          (this._filterScalingX = 1),
                          (this._filterScalingY = 1),
                          (this._lastScaleX = n),
                          void (this._lastScaleY = r)
                        );
                      b.filterBackend ||
                        (b.filterBackend = b.initFilterBackend());
                      var o = b.util.createCanvasElement(),
                        a = this._filteredEl
                          ? this.cacheKey + "_filtered"
                          : this.cacheKey,
                        h = s.width,
                        c = s.height;
                      (o.width = h),
                        (o.height = c),
                        (this._element = o),
                        (this._lastScaleX = t.scaleX = n),
                        (this._lastScaleY = t.scaleY = r),
                        b.filterBackend.applyFilters(
                          [t],
                          s,
                          h,
                          c,
                          this._element,
                          a
                        ),
                        (this._filterScalingX =
                          o.width / this._originalElement.width),
                        (this._filterScalingY =
                          o.height / this._originalElement.height);
                    },
                    applyFilters: function (t) {
                      if (
                        ((t = (t = t || this.filters || []).filter(function (
                          t
                        ) {
                          return t && !t.isNeutralState();
                        })),
                        this.set("dirty", !0),
                        this.removeTexture(this.cacheKey + "_filtered"),
                        0 === t.length)
                      )
                        return (
                          (this._element = this._originalElement),
                          (this._filteredEl = null),
                          (this._filterScalingX = 1),
                          (this._filterScalingY = 1),
                          this
                        );
                      var e = this._originalElement,
                        i = e.naturalWidth || e.width,
                        n = e.naturalHeight || e.height;
                      if (this._element === this._originalElement) {
                        var r = b.util.createCanvasElement();
                        (r.width = i),
                          (r.height = n),
                          (this._element = r),
                          (this._filteredEl = r);
                      } else
                        (this._element = this._filteredEl),
                          this._filteredEl
                            .getContext("2d")
                            .clearRect(0, 0, i, n),
                          (this._lastScaleX = 1),
                          (this._lastScaleY = 1);
                      return (
                        b.filterBackend ||
                          (b.filterBackend = b.initFilterBackend()),
                        b.filterBackend.applyFilters(
                          t,
                          this._originalElement,
                          i,
                          n,
                          this._element,
                          this.cacheKey
                        ),
                        (this._originalElement.width === this._element.width &&
                          this._originalElement.height ===
                            this._element.height) ||
                          ((this._filterScalingX =
                            this._element.width / this._originalElement.width),
                          (this._filterScalingY =
                            this._element.height /
                            this._originalElement.height)),
                        this
                      );
                    },
                    _render: function (t) {
                      !0 !== this.isMoving &&
                        this.resizeFilter &&
                        this._needsResize() &&
                        this.applyResizeFilters(),
                        this._stroke(t),
                        this._renderPaintInOrder(t);
                    },
                    shouldCache: function () {
                      return this.needsItsOwnCache();
                    },
                    _renderFill: function (t) {
                      var e = this._element,
                        i = this.width,
                        n = this.height,
                        r = Math.min(
                          e.naturalWidth || e.width,
                          i * this._filterScalingX
                        ),
                        s = Math.min(
                          e.naturalHeight || e.height,
                          n * this._filterScalingY
                        ),
                        o = -i / 2,
                        a = -n / 2,
                        h = Math.max(0, this.cropX * this._filterScalingX),
                        c = Math.max(0, this.cropY * this._filterScalingY);
                      e && t.drawImage(e, h, c, r, s, o, a, i, n);
                    },
                    _needsResize: function () {
                      var t = this.getTotalObjectScaling();
                      return (
                        t.scaleX !== this._lastScaleX ||
                        t.scaleY !== this._lastScaleY
                      );
                    },
                    _resetWidthHeight: function () {
                      this.set(this.getOriginalSize());
                    },
                    _initElement: function (t, e) {
                      this.setElement(b.util.getById(t), e),
                        b.util.addClass(this.getElement(), b.Image.CSS_CANVAS);
                    },
                    _initConfig: function (t) {
                      t || (t = {}),
                        this.setOptions(t),
                        this._setWidthHeight(t),
                        this._element &&
                          this.crossOrigin &&
                          (this._element.crossOrigin = this.crossOrigin);
                    },
                    _initFilters: function (t, e) {
                      t && t.length
                        ? b.util.enlivenObjects(
                            t,
                            function (t) {
                              e && e(t);
                            },
                            "fabric.Image.filters"
                          )
                        : e && e();
                    },
                    _setWidthHeight: function (t) {
                      t || (t = {});
                      var e = this.getElement();
                      (this.width = t.width || e.naturalWidth || e.width || 0),
                        (this.height =
                          t.height || e.naturalHeight || e.height || 0);
                    },
                    parsePreserveAspectRatioAttribute: function () {
                      var t,
                        e = b.util.parsePreserveAspectRatioAttribute(
                          this.preserveAspectRatio || ""
                        ),
                        i = this._element.width,
                        n = this._element.height,
                        r = 1,
                        s = 1,
                        o = 0,
                        a = 0,
                        h = 0,
                        c = 0,
                        l = this.width,
                        u = this.height,
                        g = { width: l, height: u };
                      return (
                        !e || ("none" === e.alignX && "none" === e.alignY)
                          ? ((r = l / i), (s = u / n))
                          : ("meet" === e.meetOrSlice &&
                              ((t =
                                (l -
                                  i *
                                    (r = s =
                                      b.util.findScaleToFit(
                                        this._element,
                                        g
                                      ))) /
                                2),
                              "Min" === e.alignX && (o = -t),
                              "Max" === e.alignX && (o = t),
                              (t = (u - n * s) / 2),
                              "Min" === e.alignY && (a = -t),
                              "Max" === e.alignY && (a = t)),
                            "slice" === e.meetOrSlice &&
                              ((t =
                                i -
                                l /
                                  (r = s =
                                    b.util.findScaleToCover(this._element, g))),
                              "Mid" === e.alignX && (h = t / 2),
                              "Max" === e.alignX && (h = t),
                              (t = n - u / s),
                              "Mid" === e.alignY && (c = t / 2),
                              "Max" === e.alignY && (c = t),
                              (i = l / r),
                              (n = u / s))),
                        {
                          width: i,
                          height: n,
                          scaleX: r,
                          scaleY: s,
                          offsetLeft: o,
                          offsetTop: a,
                          cropX: h,
                          cropY: c,
                        }
                      );
                    },
                  })),
                  (b.Image.CSS_CANVAS = "canvas-img"),
                  (b.Image.prototype.getSvgSrc = b.Image.prototype.getSrc),
                  (b.Image.fromObject = function (t, e) {
                    var i = b.util.object.clone(t);
                    b.util.loadImage(
                      i.src,
                      function (t, n) {
                        n
                          ? e && e(null, n)
                          : b.Image.prototype._initFilters.call(
                              i,
                              i.filters,
                              function (n) {
                                (i.filters = n || []),
                                  b.Image.prototype._initFilters.call(
                                    i,
                                    [i.resizeFilter],
                                    function (n) {
                                      (i.resizeFilter = n[0]),
                                        b.util.enlivenObjects(
                                          [i.clipPath],
                                          function (n) {
                                            i.clipPath = n[0];
                                            var r = new b.Image(t, i);
                                            e(r);
                                          }
                                        );
                                    }
                                  );
                              }
                            );
                      },
                      null,
                      i.crossOrigin
                    );
                  }),
                  (b.Image.fromURL = function (t, e, i) {
                    b.util.loadImage(
                      t,
                      function (t) {
                        e && e(new b.Image(t, i));
                      },
                      null,
                      i && i.crossOrigin
                    );
                  }),
                  (b.Image.ATTRIBUTE_NAMES = b.SHARED_ATTRIBUTES.concat(
                    "x y width height preserveAspectRatio xlink:href crossOrigin".split(
                      " "
                    )
                  )),
                  (b.Image.fromElement = function (t, i, n) {
                    var r = b.parseAttributes(t, b.Image.ATTRIBUTE_NAMES);
                    b.Image.fromURL(
                      r["xlink:href"],
                      i,
                      e(n ? b.util.object.clone(n) : {}, r)
                    );
                  }));
          })(e),
          b.util.object.extend(b.Object.prototype, {
            _getAngleValueForStraighten: function () {
              var t = this.angle % 360;
              return t > 0
                ? 90 * Math.round((t - 1) / 90)
                : 90 * Math.round(t / 90);
            },
            straighten: function () {
              return this.rotate(this._getAngleValueForStraighten()), this;
            },
            fxStraighten: function (t) {
              var e = function () {},
                i = (t = t || {}).onComplete || e,
                n = t.onChange || e,
                r = this;
              return (
                b.util.animate({
                  startValue: this.get("angle"),
                  endValue: this._getAngleValueForStraighten(),
                  duration: this.FX_DURATION,
                  onChange: function (t) {
                    r.rotate(t), n();
                  },
                  onComplete: function () {
                    r.setCoords(), i();
                  },
                }),
                this
              );
            },
          }),
          b.util.object.extend(b.StaticCanvas.prototype, {
            straightenObject: function (t) {
              return t.straighten(), this.requestRenderAll(), this;
            },
            fxStraightenObject: function (t) {
              return (
                t.fxStraighten({ onChange: this.requestRenderAllBound }), this
              );
            },
          }),
          (function () {
            "use strict";
            function t(t, e) {
              var i = "precision " + e + " float;\nvoid main(){}",
                n = t.createShader(t.FRAGMENT_SHADER);
              return (
                t.shaderSource(n, i),
                t.compileShader(n),
                !!t.getShaderParameter(n, t.COMPILE_STATUS)
              );
            }
            function e(t) {
              t && t.tileSize && (this.tileSize = t.tileSize),
                this.setupGLContext(this.tileSize, this.tileSize),
                this.captureGPUInfo();
            }
            (b.isWebglSupported = function (e) {
              if (b.isLikelyNode) return !1;
              e = e || b.WebglFilterBackend.prototype.tileSize;
              var i = document.createElement("canvas"),
                n = i.getContext("webgl") || i.getContext("experimental-webgl"),
                r = !1;
              if (n) {
                (b.maxTextureSize = n.getParameter(n.MAX_TEXTURE_SIZE)),
                  (r = b.maxTextureSize >= e);
                for (var s = ["highp", "mediump", "lowp"], o = 0; o < 3; o++)
                  if (t(n, s[o])) {
                    b.webGlPrecision = s[o];
                    break;
                  }
              }
              return (this.isSupported = r), r;
            }),
              (b.WebglFilterBackend = e),
              (e.prototype = {
                tileSize: 2048,
                resources: {},
                setupGLContext: function (t, e) {
                  this.dispose(),
                    this.createWebGLCanvas(t, e),
                    (this.aPosition = new Float32Array([
                      0, 0, 0, 1, 1, 0, 1, 1,
                    ])),
                    this.chooseFastestCopyGLTo2DMethod(t, e);
                },
                chooseFastestCopyGLTo2DMethod: function (t, e) {
                  var i,
                    n = void 0 !== window.performance;
                  try {
                    new ImageData(1, 1), (i = !0);
                  } catch (t) {
                    i = !1;
                  }
                  var r = "undefined" != typeof ArrayBuffer,
                    s = "undefined" != typeof Uint8ClampedArray;
                  if (n && i && r && s) {
                    var o = b.util.createCanvasElement(),
                      a = new ArrayBuffer(t * e * 4);
                    if (b.forceGLPutImageData)
                      return (this.imageBuffer = a), void (this.copyGLTo2D = _);
                    var h,
                      c,
                      l = {
                        imageBuffer: a,
                        destinationWidth: t,
                        destinationHeight: e,
                        targetCanvas: o,
                      };
                    (o.width = t),
                      (o.height = e),
                      (h = window.performance.now()),
                      D.call(l, this.gl, l),
                      (c = window.performance.now() - h),
                      (h = window.performance.now()),
                      _.call(l, this.gl, l),
                      c > window.performance.now() - h
                        ? ((this.imageBuffer = a), (this.copyGLTo2D = _))
                        : (this.copyGLTo2D = D);
                  }
                },
                createWebGLCanvas: function (t, e) {
                  var i = b.util.createCanvasElement();
                  (i.width = t), (i.height = e);
                  var n = {
                      alpha: !0,
                      premultipliedAlpha: !1,
                      depth: !1,
                      stencil: !1,
                      antialias: !1,
                    },
                    r = i.getContext("webgl", n);
                  r || (r = i.getContext("experimental-webgl", n)),
                    r &&
                      (r.clearColor(0, 0, 0, 0),
                      (this.canvas = i),
                      (this.gl = r));
                },
                applyFilters: function (t, e, i, n, r, s) {
                  var o,
                    a = this.gl;
                  s && (o = this.getCachedTexture(s, e));
                  var h = {
                      originalWidth: e.width || e.originalWidth,
                      originalHeight: e.height || e.originalHeight,
                      sourceWidth: i,
                      sourceHeight: n,
                      destinationWidth: i,
                      destinationHeight: n,
                      context: a,
                      sourceTexture: this.createTexture(a, i, n, !o && e),
                      targetTexture: this.createTexture(a, i, n),
                      originalTexture:
                        o || this.createTexture(a, i, n, !o && e),
                      passes: t.length,
                      webgl: !0,
                      aPosition: this.aPosition,
                      programCache: this.programCache,
                      pass: 0,
                      filterBackend: this,
                      targetCanvas: r,
                    },
                    c = a.createFramebuffer();
                  return (
                    a.bindFramebuffer(a.FRAMEBUFFER, c),
                    t.forEach(function (t) {
                      t && t.applyTo(h);
                    }),
                    (function (t) {
                      var e = t.targetCanvas,
                        i = e.width,
                        n = e.height,
                        r = t.destinationWidth,
                        s = t.destinationHeight;
                      (i === r && n === s) || ((e.width = r), (e.height = s));
                    })(h),
                    this.copyGLTo2D(a, h),
                    a.bindTexture(a.TEXTURE_2D, null),
                    a.deleteTexture(h.sourceTexture),
                    a.deleteTexture(h.targetTexture),
                    a.deleteFramebuffer(c),
                    r.getContext("2d").setTransform(1, 0, 0, 1, 0, 0),
                    h
                  );
                },
                dispose: function () {
                  this.canvas && ((this.canvas = null), (this.gl = null)),
                    this.clearWebGLCaches();
                },
                clearWebGLCaches: function () {
                  (this.programCache = {}), (this.textureCache = {});
                },
                createTexture: function (t, e, i, n) {
                  var r = t.createTexture();
                  return (
                    t.bindTexture(t.TEXTURE_2D, r),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_MAG_FILTER,
                      t.NEAREST
                    ),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_MIN_FILTER,
                      t.NEAREST
                    ),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_WRAP_S,
                      t.CLAMP_TO_EDGE
                    ),
                    t.texParameteri(
                      t.TEXTURE_2D,
                      t.TEXTURE_WRAP_T,
                      t.CLAMP_TO_EDGE
                    ),
                    n
                      ? t.texImage2D(
                          t.TEXTURE_2D,
                          0,
                          t.RGBA,
                          t.RGBA,
                          t.UNSIGNED_BYTE,
                          n
                        )
                      : t.texImage2D(
                          t.TEXTURE_2D,
                          0,
                          t.RGBA,
                          e,
                          i,
                          0,
                          t.RGBA,
                          t.UNSIGNED_BYTE,
                          null
                        ),
                    r
                  );
                },
                getCachedTexture: function (t, e) {
                  if (this.textureCache[t]) return this.textureCache[t];
                  var i = this.createTexture(this.gl, e.width, e.height, e);
                  return (this.textureCache[t] = i), i;
                },
                evictCachesForKey: function (t) {
                  this.textureCache[t] &&
                    (this.gl.deleteTexture(this.textureCache[t]),
                    delete this.textureCache[t]);
                },
                copyGLTo2D: D,
                captureGPUInfo: function () {
                  if (this.gpuInfo) return this.gpuInfo;
                  var t = this.gl,
                    e = { renderer: "", vendor: "" };
                  if (!t) return e;
                  var i = t.getExtension("WEBGL_debug_renderer_info");
                  if (i) {
                    var n = t.getParameter(i.UNMASKED_RENDERER_WEBGL),
                      r = t.getParameter(i.UNMASKED_VENDOR_WEBGL);
                    n && (e.renderer = n.toLowerCase()),
                      r && (e.vendor = r.toLowerCase());
                  }
                  return (this.gpuInfo = e), e;
                },
              });
          })(),
          (function () {
            "use strict";
            var t = function () {};
            function e() {}
            (b.Canvas2dFilterBackend = e),
              (e.prototype = {
                evictCachesForKey: t,
                dispose: t,
                clearWebGLCaches: t,
                resources: {},
                applyFilters: function (t, e, i, n, r) {
                  var s = r.getContext("2d");
                  s.drawImage(e, 0, 0, i, n);
                  var o = {
                    sourceWidth: i,
                    sourceHeight: n,
                    imageData: s.getImageData(0, 0, i, n),
                    originalEl: e,
                    originalImageData: s.getImageData(0, 0, i, n),
                    canvasEl: r,
                    ctx: s,
                    filterBackend: this,
                  };
                  return (
                    t.forEach(function (t) {
                      t.applyTo(o);
                    }),
                    (o.imageData.width === i && o.imageData.height === n) ||
                      ((r.width = o.imageData.width),
                      (r.height = o.imageData.height)),
                    s.putImageData(o.imageData, 0, 0),
                    o
                  );
                },
              });
          })(),
          (b.Image = b.Image || {}),
          (b.Image.filters = b.Image.filters || {}),
          (b.Image.filters.BaseFilter = b.util.createClass({
            type: "BaseFilter",
            vertexSource:
              "attribute vec2 aPosition;\nvarying vec2 vTexCoord;\nvoid main() {\nvTexCoord = aPosition;\ngl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);\n}",
            fragmentSource:
              "precision highp float;\nvarying vec2 vTexCoord;\nuniform sampler2D uTexture;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\n}",
            initialize: function (t) {
              t && this.setOptions(t);
            },
            setOptions: function (t) {
              for (var e in t) this[e] = t[e];
            },
            createProgram: function (t, e, i) {
              (e = e || this.fragmentSource),
                (i = i || this.vertexSource),
                "highp" !== b.webGlPrecision &&
                  (e = e.replace(
                    /precision highp float/g,
                    "precision " + b.webGlPrecision + " float"
                  ));
              var n = t.createShader(t.VERTEX_SHADER);
              if (
                (t.shaderSource(n, i),
                t.compileShader(n),
                !t.getShaderParameter(n, t.COMPILE_STATUS))
              )
                throw new Error(
                  "Vertex shader compile error for " +
                    this.type +
                    ": " +
                    t.getShaderInfoLog(n)
                );
              var r = t.createShader(t.FRAGMENT_SHADER);
              if (
                (t.shaderSource(r, e),
                t.compileShader(r),
                !t.getShaderParameter(r, t.COMPILE_STATUS))
              )
                throw new Error(
                  "Fragment shader compile error for " +
                    this.type +
                    ": " +
                    t.getShaderInfoLog(r)
                );
              var s = t.createProgram();
              if (
                (t.attachShader(s, n),
                t.attachShader(s, r),
                t.linkProgram(s),
                !t.getProgramParameter(s, t.LINK_STATUS))
              )
                throw new Error(
                  'Shader link error for "${this.type}" ' +
                    t.getProgramInfoLog(s)
                );
              var o = this.getAttributeLocations(t, s),
                a = this.getUniformLocations(t, s) || {};
              return (
                (a.uStepW = t.getUniformLocation(s, "uStepW")),
                (a.uStepH = t.getUniformLocation(s, "uStepH")),
                { program: s, attributeLocations: o, uniformLocations: a }
              );
            },
            getAttributeLocations: function (t, e) {
              return { aPosition: t.getAttribLocation(e, "aPosition") };
            },
            getUniformLocations: function () {
              return {};
            },
            sendAttributeData: function (t, e, i) {
              var n = e.aPosition,
                r = t.createBuffer();
              t.bindBuffer(t.ARRAY_BUFFER, r),
                t.enableVertexAttribArray(n),
                t.vertexAttribPointer(n, 2, t.FLOAT, !1, 0, 0),
                t.bufferData(t.ARRAY_BUFFER, i, t.STATIC_DRAW);
            },
            _setupFrameBuffer: function (t) {
              var e,
                i,
                n = t.context;
              t.passes > 1
                ? ((e = t.destinationWidth),
                  (i = t.destinationHeight),
                  (t.sourceWidth === e && t.sourceHeight === i) ||
                    (n.deleteTexture(t.targetTexture),
                    (t.targetTexture = t.filterBackend.createTexture(n, e, i))),
                  n.framebufferTexture2D(
                    n.FRAMEBUFFER,
                    n.COLOR_ATTACHMENT0,
                    n.TEXTURE_2D,
                    t.targetTexture,
                    0
                  ))
                : (n.bindFramebuffer(n.FRAMEBUFFER, null), n.finish());
            },
            _swapTextures: function (t) {
              t.passes--, t.pass++;
              var e = t.targetTexture;
              (t.targetTexture = t.sourceTexture), (t.sourceTexture = e);
            },
            isNeutralState: function () {
              var t = this.mainParameter,
                e = b.Image.filters[this.type].prototype;
              if (t) {
                if (Array.isArray(e[t])) {
                  for (var i = e[t].length; i--; )
                    if (this[t][i] !== e[t][i]) return !1;
                  return !0;
                }
                return e[t] === this[t];
              }
              return !1;
            },
            applyTo: function (t) {
              t.webgl
                ? (this._setupFrameBuffer(t),
                  this.applyToWebGL(t),
                  this._swapTextures(t))
                : this.applyTo2d(t);
            },
            retrieveShader: function (t) {
              return (
                t.programCache.hasOwnProperty(this.type) ||
                  (t.programCache[this.type] = this.createProgram(t.context)),
                t.programCache[this.type]
              );
            },
            applyToWebGL: function (t) {
              var e = t.context,
                i = this.retrieveShader(t);
              0 === t.pass && t.originalTexture
                ? e.bindTexture(e.TEXTURE_2D, t.originalTexture)
                : e.bindTexture(e.TEXTURE_2D, t.sourceTexture),
                e.useProgram(i.program),
                this.sendAttributeData(e, i.attributeLocations, t.aPosition),
                e.uniform1f(i.uniformLocations.uStepW, 1 / t.sourceWidth),
                e.uniform1f(i.uniformLocations.uStepH, 1 / t.sourceHeight),
                this.sendUniformData(e, i.uniformLocations),
                e.viewport(0, 0, t.destinationWidth, t.destinationHeight),
                e.drawArrays(e.TRIANGLE_STRIP, 0, 4);
            },
            bindAdditionalTexture: function (t, e, i) {
              t.activeTexture(i),
                t.bindTexture(t.TEXTURE_2D, e),
                t.activeTexture(t.TEXTURE0);
            },
            unbindAdditionalTexture: function (t, e) {
              t.activeTexture(e),
                t.bindTexture(t.TEXTURE_2D, null),
                t.activeTexture(t.TEXTURE0);
            },
            getMainParameter: function () {
              return this[this.mainParameter];
            },
            setMainParameter: function (t) {
              this[this.mainParameter] = t;
            },
            sendUniformData: function () {},
            createHelpLayer: function (t) {
              if (!t.helpLayer) {
                var e = document.createElement("canvas");
                (e.width = t.sourceWidth),
                  (e.height = t.sourceHeight),
                  (t.helpLayer = e);
              }
            },
            toObject: function () {
              var t = { type: this.type },
                e = this.mainParameter;
              return e && (t[e] = this[e]), t;
            },
            toJSON: function () {
              return this.toObject();
            },
          })),
          (b.Image.filters.BaseFilter.fromObject = function (t, e) {
            var i = new b.Image.filters[t.type](t);
            return e && e(i), i;
          }),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.ColorMatrix = n(i.BaseFilter, {
              type: "ColorMatrix",
              fragmentSource:
                "precision highp float;\nuniform sampler2D uTexture;\nvarying vec2 vTexCoord;\nuniform mat4 uColorMatrix;\nuniform vec4 uConstants;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor *= uColorMatrix;\ncolor += uConstants;\ngl_FragColor = color;\n}",
              matrix: [
                1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
              ],
              mainParameter: "matrix",
              colorsOnly: !0,
              initialize: function (t) {
                this.callSuper("initialize", t),
                  (this.matrix = this.matrix.slice(0));
              },
              applyTo2d: function (t) {
                var e,
                  i,
                  n,
                  r,
                  s,
                  o = t.imageData.data,
                  a = o.length,
                  h = this.matrix,
                  c = this.colorsOnly;
                for (s = 0; s < a; s += 4)
                  (e = o[s]),
                    (i = o[s + 1]),
                    (n = o[s + 2]),
                    c
                      ? ((o[s] = e * h[0] + i * h[1] + n * h[2] + 255 * h[4]),
                        (o[s + 1] =
                          e * h[5] + i * h[6] + n * h[7] + 255 * h[9]),
                        (o[s + 2] =
                          e * h[10] + i * h[11] + n * h[12] + 255 * h[14]))
                      : ((r = o[s + 3]),
                        (o[s] =
                          e * h[0] +
                          i * h[1] +
                          n * h[2] +
                          r * h[3] +
                          255 * h[4]),
                        (o[s + 1] =
                          e * h[5] +
                          i * h[6] +
                          n * h[7] +
                          r * h[8] +
                          255 * h[9]),
                        (o[s + 2] =
                          e * h[10] +
                          i * h[11] +
                          n * h[12] +
                          r * h[13] +
                          255 * h[14]),
                        (o[s + 3] =
                          e * h[15] +
                          i * h[16] +
                          n * h[17] +
                          r * h[18] +
                          255 * h[19]));
              },
              getUniformLocations: function (t, e) {
                return {
                  uColorMatrix: t.getUniformLocation(e, "uColorMatrix"),
                  uConstants: t.getUniformLocation(e, "uConstants"),
                };
              },
              sendUniformData: function (t, e) {
                var i = this.matrix,
                  n = [
                    i[0],
                    i[1],
                    i[2],
                    i[3],
                    i[5],
                    i[6],
                    i[7],
                    i[8],
                    i[10],
                    i[11],
                    i[12],
                    i[13],
                    i[15],
                    i[16],
                    i[17],
                    i[18],
                  ],
                  r = [i[4], i[9], i[14], i[19]];
                t.uniformMatrix4fv(e.uColorMatrix, !1, n),
                  t.uniform4fv(e.uConstants, r);
              },
            })),
              (e.Image.filters.ColorMatrix.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.Brightness = n(i.BaseFilter, {
              type: "Brightness",
              fragmentSource:
                "precision highp float;\nuniform sampler2D uTexture;\nuniform float uBrightness;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb += uBrightness;\ngl_FragColor = color;\n}",
              brightness: 0,
              mainParameter: "brightness",
              applyTo2d: function (t) {
                if (0 !== this.brightness) {
                  var e,
                    i = t.imageData.data,
                    n = i.length,
                    r = Math.round(255 * this.brightness);
                  for (e = 0; e < n; e += 4)
                    (i[e] = i[e] + r),
                      (i[e + 1] = i[e + 1] + r),
                      (i[e + 2] = i[e + 2] + r);
                }
              },
              getUniformLocations: function (t, e) {
                return { uBrightness: t.getUniformLocation(e, "uBrightness") };
              },
              sendUniformData: function (t, e) {
                t.uniform1f(e.uBrightness, this.brightness);
              },
            })),
              (e.Image.filters.Brightness.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.object.extend,
              n = e.Image.filters,
              r = e.util.createClass;
            (n.Convolute = r(n.BaseFilter, {
              type: "Convolute",
              opaque: !1,
              matrix: [0, 0, 0, 0, 1, 0, 0, 0, 0],
              fragmentSource: {
                Convolute_3_1:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[9];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 3.0; h+=1.0) {\nfor (float w = 0.0; w < 3.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 1), uStepH * (h - 1));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 3.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
                Convolute_3_0:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[9];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 3.0; h+=1.0) {\nfor (float w = 0.0; w < 3.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 1.0), uStepH * (h - 1.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 3.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",
                Convolute_5_1:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[25];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 5.0; h+=1.0) {\nfor (float w = 0.0; w < 5.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 5.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
                Convolute_5_0:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[25];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 5.0; h+=1.0) {\nfor (float w = 0.0; w < 5.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 2.0), uStepH * (h - 2.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 5.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",
                Convolute_7_1:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[49];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 7.0; h+=1.0) {\nfor (float w = 0.0; w < 7.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 7.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
                Convolute_7_0:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[49];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 7.0; h+=1.0) {\nfor (float w = 0.0; w < 7.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 3.0), uStepH * (h - 3.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 7.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",
                Convolute_9_1:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[81];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 0);\nfor (float h = 0.0; h < 9.0; h+=1.0) {\nfor (float w = 0.0; w < 9.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));\ncolor += texture2D(uTexture, vTexCoord + matrixPos) * uMatrix[int(h * 9.0 + w)];\n}\n}\ngl_FragColor = color;\n}",
                Convolute_9_0:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform float uMatrix[81];\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = vec4(0, 0, 0, 1);\nfor (float h = 0.0; h < 9.0; h+=1.0) {\nfor (float w = 0.0; w < 9.0; w+=1.0) {\nvec2 matrixPos = vec2(uStepW * (w - 4.0), uStepH * (h - 4.0));\ncolor.rgb += texture2D(uTexture, vTexCoord + matrixPos).rgb * uMatrix[int(h * 9.0 + w)];\n}\n}\nfloat alpha = texture2D(uTexture, vTexCoord).a;\ngl_FragColor = color;\ngl_FragColor.a = alpha;\n}",
              },
              retrieveShader: function (t) {
                var e = Math.sqrt(this.matrix.length),
                  i = this.type + "_" + e + "_" + (this.opaque ? 1 : 0),
                  n = this.fragmentSource[i];
                return (
                  t.programCache.hasOwnProperty(i) ||
                    (t.programCache[i] = this.createProgram(t.context, n)),
                  t.programCache[i]
                );
              },
              applyTo2d: function (t) {
                var e,
                  i,
                  n,
                  r,
                  s,
                  o,
                  a,
                  h,
                  c,
                  l,
                  u,
                  g,
                  f,
                  d = t.imageData,
                  p = d.data,
                  C = this.matrix,
                  A = Math.round(Math.sqrt(C.length)),
                  v = Math.floor(A / 2),
                  m = d.width,
                  I = d.height,
                  w = t.ctx.createImageData(m, I),
                  y = w.data,
                  M = this.opaque ? 1 : 0;
                for (u = 0; u < I; u++)
                  for (l = 0; l < m; l++) {
                    for (
                      s = 4 * (u * m + l), e = 0, i = 0, n = 0, r = 0, f = 0;
                      f < A;
                      f++
                    )
                      for (g = 0; g < A; g++)
                        (o = l + g - v),
                          (a = u + f - v) < 0 ||
                            a >= I ||
                            o < 0 ||
                            o >= m ||
                            ((h = 4 * (a * m + o)),
                            (c = C[f * A + g]),
                            (e += p[h] * c),
                            (i += p[h + 1] * c),
                            (n += p[h + 2] * c),
                            M || (r += p[h + 3] * c));
                    (y[s] = e),
                      (y[s + 1] = i),
                      (y[s + 2] = n),
                      (y[s + 3] = M ? p[s + 3] : r);
                  }
                t.imageData = w;
              },
              getUniformLocations: function (t, e) {
                return {
                  uMatrix: t.getUniformLocation(e, "uMatrix"),
                  uOpaque: t.getUniformLocation(e, "uOpaque"),
                  uHalfSize: t.getUniformLocation(e, "uHalfSize"),
                  uSize: t.getUniformLocation(e, "uSize"),
                };
              },
              sendUniformData: function (t, e) {
                t.uniform1fv(e.uMatrix, this.matrix);
              },
              toObject: function () {
                return i(this.callSuper("toObject"), {
                  opaque: this.opaque,
                  matrix: this.matrix,
                });
              },
            })),
              (e.Image.filters.Convolute.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.Grayscale = n(i.BaseFilter, {
              type: "Grayscale",
              fragmentSource: {
                average:
                  "precision highp float;\nuniform sampler2D uTexture;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat average = (color.r + color.b + color.g) / 3.0;\ngl_FragColor = vec4(average, average, average, color.a);\n}",
                lightness:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform int uMode;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 col = texture2D(uTexture, vTexCoord);\nfloat average = (max(max(col.r, col.g),col.b) + min(min(col.r, col.g),col.b)) / 2.0;\ngl_FragColor = vec4(average, average, average, col.a);\n}",
                luminosity:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform int uMode;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 col = texture2D(uTexture, vTexCoord);\nfloat average = 0.21 * col.r + 0.72 * col.g + 0.07 * col.b;\ngl_FragColor = vec4(average, average, average, col.a);\n}",
              },
              mode: "average",
              mainParameter: "mode",
              applyTo2d: function (t) {
                var e,
                  i,
                  n = t.imageData.data,
                  r = n.length,
                  s = this.mode;
                for (e = 0; e < r; e += 4)
                  "average" === s
                    ? (i = (n[e] + n[e + 1] + n[e + 2]) / 3)
                    : "lightness" === s
                    ? (i =
                        (Math.min(n[e], n[e + 1], n[e + 2]) +
                          Math.max(n[e], n[e + 1], n[e + 2])) /
                        2)
                    : "luminosity" === s &&
                      (i = 0.21 * n[e] + 0.72 * n[e + 1] + 0.07 * n[e + 2]),
                    (n[e] = i),
                    (n[e + 1] = i),
                    (n[e + 2] = i);
              },
              retrieveShader: function (t) {
                var e = this.type + "_" + this.mode;
                if (!t.programCache.hasOwnProperty(e)) {
                  var i = this.fragmentSource[this.mode];
                  t.programCache[e] = this.createProgram(t.context, i);
                }
                return t.programCache[e];
              },
              getUniformLocations: function (t, e) {
                return { uMode: t.getUniformLocation(e, "uMode") };
              },
              sendUniformData: function (t, e) {
                t.uniform1i(e.uMode, 1);
              },
              isNeutralState: function () {
                return !1;
              },
            })),
              (e.Image.filters.Grayscale.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.Invert = n(i.BaseFilter, {
              type: "Invert",
              fragmentSource:
                "precision highp float;\nuniform sampler2D uTexture;\nuniform int uInvert;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nif (uInvert == 1) {\ngl_FragColor = vec4(1.0 - color.r,1.0 -color.g,1.0 -color.b,color.a);\n} else {\ngl_FragColor = color;\n}\n}",
              invert: !0,
              mainParameter: "invert",
              applyTo2d: function (t) {
                var e,
                  i = t.imageData.data,
                  n = i.length;
                for (e = 0; e < n; e += 4)
                  (i[e] = 255 - i[e]),
                    (i[e + 1] = 255 - i[e + 1]),
                    (i[e + 2] = 255 - i[e + 2]);
              },
              isNeutralState: function () {
                return !this.invert;
              },
              getUniformLocations: function (t, e) {
                return { uInvert: t.getUniformLocation(e, "uInvert") };
              },
              sendUniformData: function (t, e) {
                t.uniform1i(e.uInvert, this.invert);
              },
            })),
              (e.Image.filters.Invert.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.object.extend,
              n = e.Image.filters,
              r = e.util.createClass;
            (n.Noise = r(n.BaseFilter, {
              type: "Noise",
              fragmentSource:
                "precision highp float;\nuniform sampler2D uTexture;\nuniform float uStepH;\nuniform float uNoise;\nuniform float uSeed;\nvarying vec2 vTexCoord;\nfloat rand(vec2 co, float seed, float vScale) {\nreturn fract(sin(dot(co.xy * vScale ,vec2(12.9898 , 78.233))) * 43758.5453 * (seed + 0.01) / 2.0);\n}\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ncolor.rgb += (0.5 - rand(vTexCoord, uSeed, 0.1 / uStepH)) * uNoise;\ngl_FragColor = color;\n}",
              mainParameter: "noise",
              noise: 0,
              applyTo2d: function (t) {
                if (0 !== this.noise) {
                  var e,
                    i,
                    n = t.imageData.data,
                    r = n.length,
                    s = this.noise;
                  for (e = 0, r = n.length; e < r; e += 4)
                    (i = (0.5 - Math.random()) * s),
                      (n[e] += i),
                      (n[e + 1] += i),
                      (n[e + 2] += i);
                }
              },
              getUniformLocations: function (t, e) {
                return {
                  uNoise: t.getUniformLocation(e, "uNoise"),
                  uSeed: t.getUniformLocation(e, "uSeed"),
                };
              },
              sendUniformData: function (t, e) {
                t.uniform1f(e.uNoise, this.noise / 255),
                  t.uniform1f(e.uSeed, Math.random());
              },
              toObject: function () {
                return i(this.callSuper("toObject"), { noise: this.noise });
              },
            })),
              (e.Image.filters.Noise.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.Pixelate = n(i.BaseFilter, {
              type: "Pixelate",
              blocksize: 4,
              mainParameter: "blocksize",
              fragmentSource:
                "precision highp float;\nuniform sampler2D uTexture;\nuniform float uBlocksize;\nuniform float uStepW;\nuniform float uStepH;\nvarying vec2 vTexCoord;\nvoid main() {\nfloat blockW = uBlocksize * uStepW;\nfloat blockH = uBlocksize * uStepW;\nint posX = int(vTexCoord.x / blockW);\nint posY = int(vTexCoord.y / blockH);\nfloat fposX = float(posX);\nfloat fposY = float(posY);\nvec2 squareCoords = vec2(fposX * blockW, fposY * blockH);\nvec4 color = texture2D(uTexture, squareCoords);\ngl_FragColor = color;\n}",
              applyTo2d: function (t) {
                var e,
                  i,
                  n,
                  r,
                  s,
                  o,
                  a,
                  h,
                  c,
                  l,
                  u,
                  g = t.imageData,
                  f = g.data,
                  d = g.height,
                  p = g.width;
                for (i = 0; i < d; i += this.blocksize)
                  for (n = 0; n < p; n += this.blocksize)
                    for (
                      r = f[(e = 4 * i * p + 4 * n)],
                        s = f[e + 1],
                        o = f[e + 2],
                        a = f[e + 3],
                        l = Math.min(i + this.blocksize, d),
                        u = Math.min(n + this.blocksize, p),
                        h = i;
                      h < l;
                      h++
                    )
                      for (c = n; c < u; c++)
                        (f[(e = 4 * h * p + 4 * c)] = r),
                          (f[e + 1] = s),
                          (f[e + 2] = o),
                          (f[e + 3] = a);
              },
              isNeutralState: function () {
                return 1 === this.blocksize;
              },
              getUniformLocations: function (t, e) {
                return {
                  uBlocksize: t.getUniformLocation(e, "uBlocksize"),
                  uStepW: t.getUniformLocation(e, "uStepW"),
                  uStepH: t.getUniformLocation(e, "uStepH"),
                };
              },
              sendUniformData: function (t, e) {
                t.uniform1f(e.uBlocksize, this.blocksize);
              },
            })),
              (e.Image.filters.Pixelate.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.object.extend,
              n = e.Image.filters,
              r = e.util.createClass;
            (n.RemoveColor = r(n.BaseFilter, {
              type: "RemoveColor",
              color: "#FFFFFF",
              fragmentSource:
                "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uLow;\nuniform vec4 uHigh;\nvarying vec2 vTexCoord;\nvoid main() {\ngl_FragColor = texture2D(uTexture, vTexCoord);\nif(all(greaterThan(gl_FragColor.rgb,uLow.rgb)) && all(greaterThan(uHigh.rgb,gl_FragColor.rgb))) {\ngl_FragColor.a = 0.0;\n}\n}",
              distance: 0.02,
              useAlpha: !1,
              applyTo2d: function (t) {
                var i,
                  n,
                  r,
                  s,
                  o = t.imageData.data,
                  a = 255 * this.distance,
                  h = new e.Color(this.color).getSource(),
                  c = [h[0] - a, h[1] - a, h[2] - a],
                  l = [h[0] + a, h[1] + a, h[2] + a];
                for (i = 0; i < o.length; i += 4)
                  (n = o[i]),
                    (r = o[i + 1]),
                    (s = o[i + 2]),
                    n > c[0] &&
                      r > c[1] &&
                      s > c[2] &&
                      n < l[0] &&
                      r < l[1] &&
                      s < l[2] &&
                      (o[i + 3] = 0);
              },
              getUniformLocations: function (t, e) {
                return {
                  uLow: t.getUniformLocation(e, "uLow"),
                  uHigh: t.getUniformLocation(e, "uHigh"),
                };
              },
              sendUniformData: function (t, i) {
                var n = new e.Color(this.color).getSource(),
                  r = parseFloat(this.distance),
                  s = [
                    0 + n[0] / 255 - r,
                    0 + n[1] / 255 - r,
                    0 + n[2] / 255 - r,
                    1,
                  ],
                  o = [n[0] / 255 + r, n[1] / 255 + r, n[2] / 255 + r, 1];
                t.uniform4fv(i.uLow, s), t.uniform4fv(i.uHigh, o);
              },
              toObject: function () {
                return i(this.callSuper("toObject"), {
                  color: this.color,
                  distance: this.distance,
                });
              },
            })),
              (e.Image.filters.RemoveColor.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass,
              r = {
                Brownie: [
                  0.5997, 0.34553, -0.27082, 0, 0.186, -0.0377, 0.86095,
                  0.15059, 0, -0.1449, 0.24113, -0.07441, 0.44972, 0, -0.02965,
                  0, 0, 0, 1, 0,
                ],
                Vintage: [
                  0.62793, 0.32021, -0.03965, 0, 0.03784, 0.02578, 0.64411,
                  0.03259, 0, 0.02926, 0.0466, -0.08512, 0.52416, 0, 0.02023, 0,
                  0, 0, 1, 0,
                ],
                Kodachrome: [
                  1.12855, -0.39673, -0.03992, 0, 0.24991, -0.16404, 1.08352,
                  -0.05498, 0, 0.09698, -0.16786, -0.56034, 1.60148, 0, 0.13972,
                  0, 0, 0, 1, 0,
                ],
                Technicolor: [
                  1.91252, -0.85453, -0.09155, 0, 0.04624, -0.30878, 1.76589,
                  -0.10601, 0, -0.27589, -0.2311, -0.75018, 1.84759, 0, 0.12137,
                  0, 0, 0, 1, 0,
                ],
                Polaroid: [
                  1.438, -0.062, -0.062, 0, 0, -0.122, 1.378, -0.122, 0, 0,
                  -0.016, -0.016, 1.483, 0, 0, 0, 0, 0, 1, 0,
                ],
                Sepia: [
                  0.393, 0.769, 0.189, 0, 0, 0.349, 0.686, 0.168, 0, 0, 0.272,
                  0.534, 0.131, 0, 0, 0, 0, 0, 1, 0,
                ],
                BlackWhite: [
                  1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0, -1, 1.5, 1.5, 1.5, 0,
                  -1, 0, 0, 0, 1, 0,
                ],
              };
            for (var s in r)
              (i[s] = n(i.ColorMatrix, {
                type: s,
                matrix: r[s],
                mainParameter: !1,
                colorsOnly: !0,
              })),
                (e.Image.filters[s].fromObject =
                  e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric,
              i = e.Image.filters,
              n = e.util.createClass;
            (i.BlendColor = n(i.BaseFilter, {
              type: "BlendColor",
              color: "#F95C63",
              mode: "multiply",
              alpha: 1,
              fragmentSource: {
                multiply: "gl_FragColor.rgb *= uColor.rgb;\n",
                screen:
                  "gl_FragColor.rgb = 1.0 - (1.0 - gl_FragColor.rgb) * (1.0 - uColor.rgb);\n",
                add: "gl_FragColor.rgb += uColor.rgb;\n",
                diff: "gl_FragColor.rgb = abs(gl_FragColor.rgb - uColor.rgb);\n",
                subtract: "gl_FragColor.rgb -= uColor.rgb;\n",
                lighten:
                  "gl_FragColor.rgb = max(gl_FragColor.rgb, uColor.rgb);\n",
                darken:
                  "gl_FragColor.rgb = min(gl_FragColor.rgb, uColor.rgb);\n",
                exclusion:
                  "gl_FragColor.rgb += uColor.rgb - 2.0 * (uColor.rgb * gl_FragColor.rgb);\n",
                overlay:
                  "if (uColor.r < 0.5) {\ngl_FragColor.r *= 2.0 * uColor.r;\n} else {\ngl_FragColor.r = 1.0 - 2.0 * (1.0 - gl_FragColor.r) * (1.0 - uColor.r);\n}\nif (uColor.g < 0.5) {\ngl_FragColor.g *= 2.0 * uColor.g;\n} else {\ngl_FragColor.g = 1.0 - 2.0 * (1.0 - gl_FragColor.g) * (1.0 - uColor.g);\n}\nif (uColor.b < 0.5) {\ngl_FragColor.b *= 2.0 * uColor.b;\n} else {\ngl_FragColor.b = 1.0 - 2.0 * (1.0 - gl_FragColor.b) * (1.0 - uColor.b);\n}\n",
                tint: "gl_FragColor.rgb *= (1.0 - uColor.a);\ngl_FragColor.rgb += uColor.rgb;\n",
              },
              buildSource: function (t) {
                return (
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\ngl_FragColor = color;\nif (color.a > 0.0) {\n" +
                  this.fragmentSource[t] +
                  "}\n}"
                );
              },
              retrieveShader: function (t) {
                var e,
                  i = this.type + "_" + this.mode;
                return (
                  t.programCache.hasOwnProperty(i) ||
                    ((e = this.buildSource(this.mode)),
                    (t.programCache[i] = this.createProgram(t.context, e))),
                  t.programCache[i]
                );
              },
              applyTo2d: function (t) {
                var i,
                  n,
                  r,
                  s,
                  o,
                  a,
                  h,
                  c = t.imageData.data,
                  l = c.length,
                  u = 1 - this.alpha;
                (i = (h = new e.Color(this.color).getSource())[0] * this.alpha),
                  (n = h[1] * this.alpha),
                  (r = h[2] * this.alpha);
                for (var g = 0; g < l; g += 4)
                  switch (
                    ((s = c[g]), (o = c[g + 1]), (a = c[g + 2]), this.mode)
                  ) {
                    case "multiply":
                      (c[g] = (s * i) / 255),
                        (c[g + 1] = (o * n) / 255),
                        (c[g + 2] = (a * r) / 255);
                      break;
                    case "screen":
                      (c[g] = 255 - ((255 - s) * (255 - i)) / 255),
                        (c[g + 1] = 255 - ((255 - o) * (255 - n)) / 255),
                        (c[g + 2] = 255 - ((255 - a) * (255 - r)) / 255);
                      break;
                    case "add":
                      (c[g] = s + i), (c[g + 1] = o + n), (c[g + 2] = a + r);
                      break;
                    case "diff":
                    case "difference":
                      (c[g] = Math.abs(s - i)),
                        (c[g + 1] = Math.abs(o - n)),
                        (c[g + 2] = Math.abs(a - r));
                      break;
                    case "subtract":
                      (c[g] = s - i), (c[g + 1] = o - n), (c[g + 2] = a - r);
                      break;
                    case "darken":
                      (c[g] = Math.min(s, i)),
                        (c[g + 1] = Math.min(o, n)),
                        (c[g + 2] = Math.min(a, r));
                      break;
                    case "lighten":
                      (c[g] = Math.max(s, i)),
                        (c[g + 1] = Math.max(o, n)),
                        (c[g + 2] = Math.max(a, r));
                      break;
                    case "overlay":
                      (c[g] =
                        i < 128
                          ? (2 * s * i) / 255
                          : 255 - (2 * (255 - s) * (255 - i)) / 255),
                        (c[g + 1] =
                          n < 128
                            ? (2 * o * n) / 255
                            : 255 - (2 * (255 - o) * (255 - n)) / 255),
                        (c[g + 2] =
                          r < 128
                            ? (2 * a * r) / 255
                            : 255 - (2 * (255 - a) * (255 - r)) / 255);
                      break;
                    case "exclusion":
                      (c[g] = i + s - (2 * i * s) / 255),
                        (c[g + 1] = n + o - (2 * n * o) / 255),
                        (c[g + 2] = r + a - (2 * r * a) / 255);
                      break;
                    case "tint":
                      (c[g] = i + s * u),
                        (c[g + 1] = n + o * u),
                        (c[g + 2] = r + a * u);
                  }
              },
              getUniformLocations: function (t, e) {
                return { uColor: t.getUniformLocation(e, "uColor") };
              },
              sendUniformData: function (t, i) {
                var n = new e.Color(this.color).getSource();
                (n[0] = (this.alpha * n[0]) / 255),
                  (n[1] = (this.alpha * n[1]) / 255),
                  (n[2] = (this.alpha * n[2]) / 255),
                  (n[3] = this.alpha),
                  t.uniform4fv(i.uColor, n);
              },
              toObject: function () {
                return {
                  type: this.type,
                  color: this.color,
                  mode: this.mode,
                  alpha: this.alpha,
                };
              },
            })),
              (e.Image.filters.BlendColor.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric,
              i = e.Image.filters,
              n = e.util.createClass;
            (i.BlendImage = n(i.BaseFilter, {
              type: "BlendImage",
              image: null,
              mode: "multiply",
              alpha: 1,
              vertexSource:
                "attribute vec2 aPosition;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nuniform mat3 uTransformMatrix;\nvoid main() {\nvTexCoord = aPosition;\nvTexCoord2 = (uTransformMatrix * vec3(aPosition, 1.0)).xy;\ngl_Position = vec4(aPosition * 2.0 - 1.0, 0.0, 1.0);\n}",
              fragmentSource: {
                multiply:
                  "precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uImage;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec4 color2 = texture2D(uImage, vTexCoord2);\ncolor.rgba *= color2.rgba;\ngl_FragColor = color;\n}",
                mask: "precision highp float;\nuniform sampler2D uTexture;\nuniform sampler2D uImage;\nuniform vec4 uColor;\nvarying vec2 vTexCoord;\nvarying vec2 vTexCoord2;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec4 color2 = texture2D(uImage, vTexCoord2);\ncolor.a = color2.a;\ngl_FragColor = color;\n}",
              },
              retrieveShader: function (t) {
                var e = this.type + "_" + this.mode,
                  i = this.fragmentSource[this.mode];
                return (
                  t.programCache.hasOwnProperty(e) ||
                    (t.programCache[e] = this.createProgram(t.context, i)),
                  t.programCache[e]
                );
              },
              applyToWebGL: function (t) {
                var e = t.context,
                  i = this.createTexture(t.filterBackend, this.image);
                this.bindAdditionalTexture(e, i, e.TEXTURE1),
                  this.callSuper("applyToWebGL", t),
                  this.unbindAdditionalTexture(e, e.TEXTURE1);
              },
              createTexture: function (t, e) {
                return t.getCachedTexture(e.cacheKey, e._element);
              },
              calculateMatrix: function () {
                var t = this.image,
                  e = t._element.width,
                  i = t._element.height;
                return [
                  1 / t.scaleX,
                  0,
                  0,
                  0,
                  1 / t.scaleY,
                  0,
                  -t.left / e,
                  -t.top / i,
                  1,
                ];
              },
              applyTo2d: function (t) {
                var i,
                  n,
                  r,
                  s,
                  o,
                  a,
                  h,
                  c,
                  l,
                  u,
                  g,
                  f = t.imageData,
                  d = t.filterBackend.resources,
                  p = f.data,
                  C = p.length,
                  A = f.width,
                  v = f.height,
                  m = this.image;
                d.blendImage || (d.blendImage = e.util.createCanvasElement()),
                  (u = (l = d.blendImage).getContext("2d")),
                  l.width !== A || l.height !== v
                    ? ((l.width = A), (l.height = v))
                    : u.clearRect(0, 0, A, v),
                  u.setTransform(m.scaleX, 0, 0, m.scaleY, m.left, m.top),
                  u.drawImage(m._element, 0, 0, A, v),
                  (g = u.getImageData(0, 0, A, v).data);
                for (var I = 0; I < C; I += 4)
                  switch (
                    ((o = p[I]),
                    (a = p[I + 1]),
                    (h = p[I + 2]),
                    (c = p[I + 3]),
                    (i = g[I]),
                    (n = g[I + 1]),
                    (r = g[I + 2]),
                    (s = g[I + 3]),
                    this.mode)
                  ) {
                    case "multiply":
                      (p[I] = (o * i) / 255),
                        (p[I + 1] = (a * n) / 255),
                        (p[I + 2] = (h * r) / 255),
                        (p[I + 3] = (c * s) / 255);
                      break;
                    case "mask":
                      p[I + 3] = s;
                  }
              },
              getUniformLocations: function (t, e) {
                return {
                  uTransformMatrix: t.getUniformLocation(e, "uTransformMatrix"),
                  uImage: t.getUniformLocation(e, "uImage"),
                };
              },
              sendUniformData: function (t, e) {
                var i = this.calculateMatrix();
                t.uniform1i(e.uImage, 1),
                  t.uniformMatrix3fv(e.uTransformMatrix, !1, i);
              },
              toObject: function () {
                return {
                  type: this.type,
                  image: this.image && this.image.toObject(),
                  mode: this.mode,
                  alpha: this.alpha,
                };
              },
            })),
              (e.Image.filters.BlendImage.fromObject = function (t, i) {
                e.Image.fromObject(t.image, function (n) {
                  var r = e.util.object.clone(t);
                  (r.image = n), i(new e.Image.filters.BlendImage(r));
                });
              });
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = Math.pow,
              n = Math.floor,
              r = Math.sqrt,
              s = Math.abs,
              o = Math.round,
              a = Math.sin,
              h = Math.ceil,
              c = e.Image.filters,
              l = e.util.createClass;
            (c.Resize = l(c.BaseFilter, {
              type: "Resize",
              resizeType: "hermite",
              scaleX: 1,
              scaleY: 1,
              lanczosLobes: 3,
              getUniformLocations: function (t, e) {
                return {
                  uDelta: t.getUniformLocation(e, "uDelta"),
                  uTaps: t.getUniformLocation(e, "uTaps"),
                };
              },
              sendUniformData: function (t, e) {
                t.uniform2fv(
                  e.uDelta,
                  this.horizontal ? [1 / this.width, 0] : [0, 1 / this.height]
                ),
                  t.uniform1fv(e.uTaps, this.taps);
              },
              retrieveShader: function (t) {
                var e = this.getFilterWindow(),
                  i = this.type + "_" + e;
                if (!t.programCache.hasOwnProperty(i)) {
                  var n = this.generateShader(e);
                  t.programCache[i] = this.createProgram(t.context, n);
                }
                return t.programCache[i];
              },
              getFilterWindow: function () {
                var t = this.tempScale;
                return Math.ceil(this.lanczosLobes / t);
              },
              getTaps: function () {
                for (
                  var t = this.lanczosCreate(this.lanczosLobes),
                    e = this.tempScale,
                    i = this.getFilterWindow(),
                    n = new Array(i),
                    r = 1;
                  r <= i;
                  r++
                )
                  n[r - 1] = t(r * e);
                return n;
              },
              generateShader: function (t) {
                for (
                  var e = new Array(t), i = this.fragmentSourceTOP, n = 1;
                  n <= t;
                  n++
                )
                  e[n - 1] = n + ".0 * uDelta";
                return (
                  (i += "uniform float uTaps[" + t + "];\n"),
                  (i += "void main() {\n"),
                  (i += "  vec4 color = texture2D(uTexture, vTexCoord);\n"),
                  (i += "  float sum = 1.0;\n"),
                  e.forEach(function (t, e) {
                    (i +=
                      "  color += texture2D(uTexture, vTexCoord + " +
                      t +
                      ") * uTaps[" +
                      e +
                      "];\n"),
                      (i +=
                        "  color += texture2D(uTexture, vTexCoord - " +
                        t +
                        ") * uTaps[" +
                        e +
                        "];\n"),
                      (i += "  sum += 2.0 * uTaps[" + e + "];\n");
                  }),
                  (i += "  gl_FragColor = color / sum;\n"),
                  (i += "}")
                );
              },
              fragmentSourceTOP:
                "precision highp float;\nuniform sampler2D uTexture;\nuniform vec2 uDelta;\nvarying vec2 vTexCoord;\n",
              applyTo: function (t) {
                t.webgl
                  ? (t.passes++,
                    (this.width = t.sourceWidth),
                    (this.horizontal = !0),
                    (this.dW = Math.round(this.width * this.scaleX)),
                    (this.dH = t.sourceHeight),
                    (this.tempScale = this.dW / this.width),
                    (this.taps = this.getTaps()),
                    (t.destinationWidth = this.dW),
                    this._setupFrameBuffer(t),
                    this.applyToWebGL(t),
                    this._swapTextures(t),
                    (t.sourceWidth = t.destinationWidth),
                    (this.height = t.sourceHeight),
                    (this.horizontal = !1),
                    (this.dH = Math.round(this.height * this.scaleY)),
                    (this.tempScale = this.dH / this.height),
                    (this.taps = this.getTaps()),
                    (t.destinationHeight = this.dH),
                    this._setupFrameBuffer(t),
                    this.applyToWebGL(t),
                    this._swapTextures(t),
                    (t.sourceHeight = t.destinationHeight))
                  : this.applyTo2d(t);
              },
              isNeutralState: function () {
                return 1 === this.scaleX && 1 === this.scaleY;
              },
              lanczosCreate: function (t) {
                return function (e) {
                  if (e >= t || e <= -t) return 0;
                  if (e < 1.1920929e-7 && e > -1.1920929e-7) return 1;
                  var i = (e *= Math.PI) / t;
                  return ((a(e) / e) * a(i)) / i;
                };
              },
              applyTo2d: function (t) {
                var e = t.imageData,
                  i = this.scaleX,
                  n = this.scaleY;
                (this.rcpScaleX = 1 / i), (this.rcpScaleY = 1 / n);
                var r,
                  s = e.width,
                  a = e.height,
                  h = o(s * i),
                  c = o(a * n);
                "sliceHack" === this.resizeType
                  ? (r = this.sliceByTwo(t, s, a, h, c))
                  : "hermite" === this.resizeType
                  ? (r = this.hermiteFastResize(t, s, a, h, c))
                  : "bilinear" === this.resizeType
                  ? (r = this.bilinearFiltering(t, s, a, h, c))
                  : "lanczos" === this.resizeType &&
                    (r = this.lanczosResize(t, s, a, h, c)),
                  (t.imageData = r);
              },
              sliceByTwo: function (t, i, r, s, o) {
                var a,
                  h,
                  c = t.imageData,
                  l = !1,
                  u = !1,
                  g = 0.5 * i,
                  f = 0.5 * r,
                  d = e.filterBackend.resources,
                  p = 0,
                  C = 0,
                  A = i,
                  v = 0;
                for (
                  d.sliceByTwo ||
                    (d.sliceByTwo = document.createElement("canvas")),
                    ((a = d.sliceByTwo).width < 1.5 * i || a.height < r) &&
                      ((a.width = 1.5 * i), (a.height = r)),
                    (h = a.getContext("2d")).clearRect(0, 0, 1.5 * i, r),
                    h.putImageData(c, 0, 0),
                    s = n(s),
                    o = n(o);
                  !l || !u;

                )
                  (i = g),
                    (r = f),
                    s < n(0.5 * g) ? (g = n(0.5 * g)) : ((g = s), (l = !0)),
                    o < n(0.5 * f) ? (f = n(0.5 * f)) : ((f = o), (u = !0)),
                    h.drawImage(a, p, C, i, r, A, v, g, f),
                    (p = A),
                    (C = v),
                    (v += f);
                return h.getImageData(p, C, s, o);
              },
              lanczosResize: function (t, e, o, a, c) {
                var l = t.imageData.data,
                  u = t.ctx.createImageData(a, c),
                  g = u.data,
                  f = this.lanczosCreate(this.lanczosLobes),
                  d = this.rcpScaleX,
                  p = this.rcpScaleY,
                  C = 2 / this.rcpScaleX,
                  A = 2 / this.rcpScaleY,
                  v = h((d * this.lanczosLobes) / 2),
                  m = h((p * this.lanczosLobes) / 2),
                  I = {},
                  w = {},
                  y = {};
                return (function t(h) {
                  var M, b, x, D, _, T, S, O, j, P, L;
                  for (w.x = (h + 0.5) * d, y.x = n(w.x), M = 0; M < c; M++) {
                    for (
                      w.y = (M + 0.5) * p,
                        y.y = n(w.y),
                        _ = 0,
                        T = 0,
                        S = 0,
                        O = 0,
                        j = 0,
                        b = y.x - v;
                      b <= y.x + v;
                      b++
                    )
                      if (!(b < 0 || b >= e)) {
                        (P = n(1e3 * s(b - w.x))), I[P] || (I[P] = {});
                        for (var k = y.y - m; k <= y.y + m; k++)
                          k < 0 ||
                            k >= o ||
                            ((L = n(1e3 * s(k - w.y))),
                            I[P][L] ||
                              (I[P][L] = f(r(i(P * C, 2) + i(L * A, 2)) / 1e3)),
                            (x = I[P][L]) > 0 &&
                              ((_ += x),
                              (T += x * l[(D = 4 * (k * e + b))]),
                              (S += x * l[D + 1]),
                              (O += x * l[D + 2]),
                              (j += x * l[D + 3])));
                      }
                    (g[(D = 4 * (M * a + h))] = T / _),
                      (g[D + 1] = S / _),
                      (g[D + 2] = O / _),
                      (g[D + 3] = j / _);
                  }
                  return ++h < a ? t(h) : u;
                })(0);
              },
              bilinearFiltering: function (t, e, i, r, s) {
                var o,
                  a,
                  h,
                  c,
                  l,
                  u,
                  g,
                  f,
                  d,
                  p = 0,
                  C = this.rcpScaleX,
                  A = this.rcpScaleY,
                  v = 4 * (e - 1),
                  m = t.imageData.data,
                  I = t.ctx.createImageData(r, s),
                  w = I.data;
                for (h = 0; h < s; h++)
                  for (c = 0; c < r; c++)
                    for (
                      l = C * c - (o = n(C * c)),
                        u = A * h - (a = n(A * h)),
                        d = 4 * (a * e + o),
                        g = 0;
                      g < 4;
                      g++
                    )
                      (f =
                        m[d + g] * (1 - l) * (1 - u) +
                        m[d + 4 + g] * l * (1 - u) +
                        m[d + v + g] * u * (1 - l) +
                        m[d + v + 4 + g] * l * u),
                        (w[p++] = f);
                return I;
              },
              hermiteFastResize: function (t, e, i, o, a) {
                for (
                  var c = this.rcpScaleX,
                    l = this.rcpScaleY,
                    u = h(c / 2),
                    g = h(l / 2),
                    f = t.imageData.data,
                    d = t.ctx.createImageData(o, a),
                    p = d.data,
                    C = 0;
                  C < a;
                  C++
                )
                  for (var A = 0; A < o; A++) {
                    for (
                      var v = 4 * (A + C * o),
                        m = 0,
                        I = 0,
                        w = 0,
                        y = 0,
                        M = 0,
                        b = 0,
                        x = 0,
                        D = (C + 0.5) * l,
                        _ = n(C * l);
                      _ < (C + 1) * l;
                      _++
                    )
                      for (
                        var T = s(D - (_ + 0.5)) / g,
                          S = (A + 0.5) * c,
                          O = T * T,
                          j = n(A * c);
                        j < (A + 1) * c;
                        j++
                      ) {
                        var P = s(S - (j + 0.5)) / u,
                          L = r(O + P * P);
                        (L > 1 && L < -1) ||
                          ((m = 2 * L * L * L - 3 * L * L + 1) > 0 &&
                            ((x += m * f[(P = 4 * (j + _ * e)) + 3]),
                            (w += m),
                            f[P + 3] < 255 && (m = (m * f[P + 3]) / 250),
                            (y += m * f[P]),
                            (M += m * f[P + 1]),
                            (b += m * f[P + 2]),
                            (I += m)));
                      }
                    (p[v] = y / I),
                      (p[v + 1] = M / I),
                      (p[v + 2] = b / I),
                      (p[v + 3] = x / w);
                  }
                return d;
              },
              toObject: function () {
                return {
                  type: this.type,
                  scaleX: this.scaleX,
                  scaleY: this.scaleY,
                  resizeType: this.resizeType,
                  lanczosLobes: this.lanczosLobes,
                };
              },
            })),
              (e.Image.filters.Resize.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.Contrast = n(i.BaseFilter, {
              type: "Contrast",
              fragmentSource:
                "precision highp float;\nuniform sampler2D uTexture;\nuniform float uContrast;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat contrastF = 1.015 * (uContrast + 1.0) / (1.0 * (1.015 - uContrast));\ncolor.rgb = contrastF * (color.rgb - 0.5) + 0.5;\ngl_FragColor = color;\n}",
              contrast: 0,
              mainParameter: "contrast",
              applyTo2d: function (t) {
                if (0 !== this.contrast) {
                  var e,
                    i = t.imageData.data,
                    n = i.length,
                    r = Math.floor(255 * this.contrast),
                    s = (259 * (r + 255)) / (255 * (259 - r));
                  for (e = 0; e < n; e += 4)
                    (i[e] = s * (i[e] - 128) + 128),
                      (i[e + 1] = s * (i[e + 1] - 128) + 128),
                      (i[e + 2] = s * (i[e + 2] - 128) + 128);
                }
              },
              getUniformLocations: function (t, e) {
                return { uContrast: t.getUniformLocation(e, "uContrast") };
              },
              sendUniformData: function (t, e) {
                t.uniform1f(e.uContrast, this.contrast);
              },
            })),
              (e.Image.filters.Contrast.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.Saturation = n(i.BaseFilter, {
              type: "Saturation",
              fragmentSource:
                "precision highp float;\nuniform sampler2D uTexture;\nuniform float uSaturation;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nfloat rgMax = max(color.r, color.g);\nfloat rgbMax = max(rgMax, color.b);\ncolor.r += rgbMax != color.r ? (rgbMax - color.r) * uSaturation : 0.00;\ncolor.g += rgbMax != color.g ? (rgbMax - color.g) * uSaturation : 0.00;\ncolor.b += rgbMax != color.b ? (rgbMax - color.b) * uSaturation : 0.00;\ngl_FragColor = color;\n}",
              saturation: 0,
              mainParameter: "saturation",
              applyTo2d: function (t) {
                if (0 !== this.saturation) {
                  var e,
                    i,
                    n = t.imageData.data,
                    r = n.length,
                    s = -this.saturation;
                  for (e = 0; e < r; e += 4)
                    (i = Math.max(n[e], n[e + 1], n[e + 2])),
                      (n[e] += i !== n[e] ? (i - n[e]) * s : 0),
                      (n[e + 1] += i !== n[e + 1] ? (i - n[e + 1]) * s : 0),
                      (n[e + 2] += i !== n[e + 2] ? (i - n[e + 2]) * s : 0);
                }
              },
              getUniformLocations: function (t, e) {
                return { uSaturation: t.getUniformLocation(e, "uSaturation") };
              },
              sendUniformData: function (t, e) {
                t.uniform1f(e.uSaturation, -this.saturation);
              },
            })),
              (e.Image.filters.Saturation.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.Blur = n(i.BaseFilter, {
              type: "Blur",
              fragmentSource:
                "precision highp float;\nuniform sampler2D uTexture;\nuniform vec2 uDelta;\nvarying vec2 vTexCoord;\nconst float nSamples = 15.0;\nvec3 v3offset = vec3(12.9898, 78.233, 151.7182);\nfloat random(vec3 scale) {\nreturn fract(sin(dot(gl_FragCoord.xyz, scale)) * 43758.5453);\n}\nvoid main() {\nvec4 color = vec4(0.0);\nfloat total = 0.0;\nfloat offset = random(v3offset);\nfor (float t = -nSamples; t <= nSamples; t++) {\nfloat percent = (t + offset - 0.5) / nSamples;\nfloat weight = 1.0 - abs(percent);\ncolor += texture2D(uTexture, vTexCoord + uDelta * percent) * weight;\ntotal += weight;\n}\ngl_FragColor = color / total;\n}",
              blur: 0,
              mainParameter: "blur",
              applyTo: function (t) {
                t.webgl
                  ? ((this.aspectRatio = t.sourceWidth / t.sourceHeight),
                    t.passes++,
                    this._setupFrameBuffer(t),
                    (this.horizontal = !0),
                    this.applyToWebGL(t),
                    this._swapTextures(t),
                    this._setupFrameBuffer(t),
                    (this.horizontal = !1),
                    this.applyToWebGL(t),
                    this._swapTextures(t))
                  : this.applyTo2d(t);
              },
              applyTo2d: function (t) {
                t.imageData = this.simpleBlur(t);
              },
              simpleBlur: function (t) {
                var i,
                  n,
                  r = t.filterBackend.resources,
                  s = t.imageData.width,
                  o = t.imageData.height;
                r.blurLayer1 ||
                  ((r.blurLayer1 = e.util.createCanvasElement()),
                  (r.blurLayer2 = e.util.createCanvasElement())),
                  (i = r.blurLayer1),
                  (n = r.blurLayer2),
                  (i.width === s && i.height === o) ||
                    ((n.width = i.width = s), (n.height = i.height = o));
                var a,
                  h,
                  c,
                  l,
                  u = i.getContext("2d"),
                  g = n.getContext("2d"),
                  f = 0.06 * this.blur * 0.5;
                for (
                  u.putImageData(t.imageData, 0, 0),
                    g.clearRect(0, 0, s, o),
                    l = -15;
                  l <= 15;
                  l++
                )
                  (c = f * (h = l / 15) * s + (a = (Math.random() - 0.5) / 4)),
                    (g.globalAlpha = 1 - Math.abs(h)),
                    g.drawImage(i, c, a),
                    u.drawImage(n, 0, 0),
                    (g.globalAlpha = 1),
                    g.clearRect(0, 0, n.width, n.height);
                for (l = -15; l <= 15; l++)
                  (c = f * (h = l / 15) * o + (a = (Math.random() - 0.5) / 4)),
                    (g.globalAlpha = 1 - Math.abs(h)),
                    g.drawImage(i, a, c),
                    u.drawImage(n, 0, 0),
                    (g.globalAlpha = 1),
                    g.clearRect(0, 0, n.width, n.height);
                t.ctx.drawImage(i, 0, 0);
                var d = t.ctx.getImageData(0, 0, i.width, i.height);
                return (
                  (u.globalAlpha = 1), u.clearRect(0, 0, i.width, i.height), d
                );
              },
              getUniformLocations: function (t, e) {
                return { delta: t.getUniformLocation(e, "uDelta") };
              },
              sendUniformData: function (t, e) {
                var i = this.chooseRightDelta();
                t.uniform2fv(e.delta, i);
              },
              chooseRightDelta: function () {
                var t,
                  e = 1,
                  i = [0, 0];
                return (
                  this.horizontal
                    ? this.aspectRatio > 1 && (e = 1 / this.aspectRatio)
                    : this.aspectRatio < 1 && (e = this.aspectRatio),
                  (t = e * this.blur * 0.12),
                  this.horizontal ? (i[0] = t) : (i[1] = t),
                  i
                );
              },
            })),
              (i.Blur.fromObject = e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.Gamma = n(i.BaseFilter, {
              type: "Gamma",
              fragmentSource:
                "precision highp float;\nuniform sampler2D uTexture;\nuniform vec3 uGamma;\nvarying vec2 vTexCoord;\nvoid main() {\nvec4 color = texture2D(uTexture, vTexCoord);\nvec3 correction = (1.0 / uGamma);\ncolor.r = pow(color.r, correction.r);\ncolor.g = pow(color.g, correction.g);\ncolor.b = pow(color.b, correction.b);\ngl_FragColor = color;\ngl_FragColor.rgb *= color.a;\n}",
              gamma: [1, 1, 1],
              mainParameter: "gamma",
              initialize: function (t) {
                (this.gamma = [1, 1, 1]),
                  i.BaseFilter.prototype.initialize.call(this, t);
              },
              applyTo2d: function (t) {
                var e,
                  i = t.imageData.data,
                  n = this.gamma,
                  r = i.length,
                  s = 1 / n[0],
                  o = 1 / n[1],
                  a = 1 / n[2];
                for (
                  this.rVals ||
                    ((this.rVals = new Uint8Array(256)),
                    (this.gVals = new Uint8Array(256)),
                    (this.bVals = new Uint8Array(256))),
                    e = 0,
                    r = 256;
                  e < r;
                  e++
                )
                  (this.rVals[e] = 255 * Math.pow(e / 255, s)),
                    (this.gVals[e] = 255 * Math.pow(e / 255, o)),
                    (this.bVals[e] = 255 * Math.pow(e / 255, a));
                for (e = 0, r = i.length; e < r; e += 4)
                  (i[e] = this.rVals[i[e]]),
                    (i[e + 1] = this.gVals[i[e + 1]]),
                    (i[e + 2] = this.bVals[i[e + 2]]);
              },
              getUniformLocations: function (t, e) {
                return { uGamma: t.getUniformLocation(e, "uGamma") };
              },
              sendUniformData: function (t, e) {
                t.uniform3fv(e.uGamma, this.gamma);
              },
            })),
              (e.Image.filters.Gamma.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.Composed = n(i.BaseFilter, {
              type: "Composed",
              subFilters: [],
              initialize: function (t) {
                this.callSuper("initialize", t),
                  (this.subFilters = this.subFilters.slice(0));
              },
              applyTo: function (t) {
                (t.passes += this.subFilters.length - 1),
                  this.subFilters.forEach(function (e) {
                    e.applyTo(t);
                  });
              },
              toObject: function () {
                return e.util.object.extend(this.callSuper("toObject"), {
                  subFilters: this.subFilters.map(function (t) {
                    return t.toObject();
                  }),
                });
              },
              isNeutralState: function () {
                return !this.subFilters.some(function (t) {
                  return !t.isNeutralState();
                });
              },
            })),
              (e.Image.filters.Composed.fromObject = function (t, i) {
                var n = (t.subFilters || []).map(function (t) {
                    return new e.Image.filters[t.type](t);
                  }),
                  r = new e.Image.filters.Composed({ subFilters: n });
                return i && i(r), r;
              });
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.Image.filters,
              n = e.util.createClass;
            (i.HueRotation = n(i.ColorMatrix, {
              type: "HueRotation",
              rotation: 0,
              mainParameter: "rotation",
              calculateMatrix: function () {
                var t = this.rotation * Math.PI,
                  i = e.util.cos(t),
                  n = e.util.sin(t),
                  r = Math.sqrt(1 / 3) * n,
                  s = 1 - i;
                (this.matrix = [
                  1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0,
                ]),
                  (this.matrix[0] = i + s / 3),
                  (this.matrix[1] = (1 / 3) * s - r),
                  (this.matrix[2] = (1 / 3) * s + r),
                  (this.matrix[5] = (1 / 3) * s + r),
                  (this.matrix[6] = i + (1 / 3) * s),
                  (this.matrix[7] = (1 / 3) * s - r),
                  (this.matrix[10] = (1 / 3) * s - r),
                  (this.matrix[11] = (1 / 3) * s + r),
                  (this.matrix[12] = i + (1 / 3) * s);
              },
              isNeutralState: function (t) {
                return (
                  this.calculateMatrix(),
                  i.BaseFilter.prototype.isNeutralState.call(this, t)
                );
              },
              applyTo: function (t) {
                this.calculateMatrix(),
                  i.BaseFilter.prototype.applyTo.call(this, t);
              },
            })),
              (e.Image.filters.HueRotation.fromObject =
                e.Image.filters.BaseFilter.fromObject);
          })(e),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {}),
              i = e.util.object.clone;
            e.Text
              ? e.warn("fabric.Text is already defined")
              : ((e.Text = e.util.createClass(e.Object, {
                  _dimensionAffectingProps: [
                    "fontSize",
                    "fontWeight",
                    "fontFamily",
                    "fontStyle",
                    "lineHeight",
                    "text",
                    "charSpacing",
                    "textAlign",
                    "styles",
                  ],
                  _reNewline: /\r?\n/,
                  _reSpacesAndTabs: /[ \t\r]/g,
                  _reSpaceAndTab: /[ \t\r]/,
                  _reWords: /\S+/g,
                  type: "text",
                  fontSize: 40,
                  fontWeight: "normal",
                  fontFamily: "Times New Roman",
                  underline: !1,
                  overline: !1,
                  linethrough: !1,
                  textAlign: "left",
                  fontStyle: "normal",
                  lineHeight: 1.16,
                  superscript: { size: 0.6, baseline: -0.35 },
                  subscript: { size: 0.6, baseline: 0.11 },
                  textBackgroundColor: "",
                  stateProperties: e.Object.prototype.stateProperties.concat(
                    "fontFamily",
                    "fontWeight",
                    "fontSize",
                    "text",
                    "underline",
                    "overline",
                    "linethrough",
                    "textAlign",
                    "fontStyle",
                    "lineHeight",
                    "textBackgroundColor",
                    "charSpacing",
                    "styles"
                  ),
                  cacheProperties: e.Object.prototype.cacheProperties.concat(
                    "fontFamily",
                    "fontWeight",
                    "fontSize",
                    "text",
                    "underline",
                    "overline",
                    "linethrough",
                    "textAlign",
                    "fontStyle",
                    "lineHeight",
                    "textBackgroundColor",
                    "charSpacing",
                    "styles"
                  ),
                  stroke: null,
                  shadow: null,
                  _fontSizeFraction: 0.222,
                  offsets: {
                    underline: 0.1,
                    linethrough: -0.315,
                    overline: -0.88,
                  },
                  _fontSizeMult: 1.13,
                  charSpacing: 0,
                  styles: null,
                  _measuringContext: null,
                  deltaY: 0,
                  _styleProperties: [
                    "stroke",
                    "strokeWidth",
                    "fill",
                    "fontFamily",
                    "fontSize",
                    "fontWeight",
                    "fontStyle",
                    "underline",
                    "overline",
                    "linethrough",
                    "deltaY",
                    "textBackgroundColor",
                  ],
                  __charBounds: [],
                  CACHE_FONT_SIZE: 400,
                  MIN_TEXT_WIDTH: 2,
                  initialize: function (t, e) {
                    (this.styles = (e && e.styles) || {}),
                      (this.text = t),
                      (this.__skipDimension = !0),
                      this.callSuper("initialize", e),
                      (this.__skipDimension = !1),
                      this.initDimensions(),
                      this.setCoords(),
                      this.setupState({
                        propertySet: "_dimensionAffectingProps",
                      });
                  },
                  getMeasuringContext: function () {
                    return (
                      e._measuringContext ||
                        (e._measuringContext =
                          (this.canvas && this.canvas.contextCache) ||
                          e.util.createCanvasElement().getContext("2d")),
                      e._measuringContext
                    );
                  },
                  _splitText: function () {
                    var t = this._splitTextIntoLines(this.text);
                    return (
                      (this.textLines = t.lines),
                      (this._textLines = t.graphemeLines),
                      (this._unwrappedTextLines = t._unwrappedLines),
                      (this._text = t.graphemeText),
                      t
                    );
                  },
                  initDimensions: function () {
                    this.__skipDimension ||
                      (this._splitText(),
                      this._clearCache(),
                      (this.width =
                        this.calcTextWidth() ||
                        this.cursorWidth ||
                        this.MIN_TEXT_WIDTH),
                      -1 !== this.textAlign.indexOf("justify") &&
                        this.enlargeSpaces(),
                      (this.height = this.calcTextHeight()),
                      this.saveState({
                        propertySet: "_dimensionAffectingProps",
                      }));
                  },
                  enlargeSpaces: function () {
                    for (
                      var t,
                        e,
                        i,
                        n,
                        r,
                        s,
                        o,
                        a = 0,
                        h = this._textLines.length;
                      a < h;
                      a++
                    )
                      if (
                        ("justify" === this.textAlign ||
                          (a !== h - 1 && !this.isEndOfWrapping(a))) &&
                        ((n = 0),
                        (r = this._textLines[a]),
                        (e = this.getLineWidth(a)) < this.width &&
                          (o = this.textLines[a].match(this._reSpacesAndTabs)))
                      ) {
                        (i = o.length), (t = (this.width - e) / i);
                        for (var c = 0, l = r.length; c <= l; c++)
                          (s = this.__charBounds[a][c]),
                            this._reSpaceAndTab.test(r[c])
                              ? ((s.width += t),
                                (s.kernedWidth += t),
                                (s.left += n),
                                (n += t))
                              : (s.left += n);
                      }
                  },
                  isEndOfWrapping: function (t) {
                    return t === this._textLines.length - 1;
                  },
                  missingNewlineOffset: function () {
                    return 1;
                  },
                  toString: function () {
                    return (
                      "#<fabric.Text (" +
                      this.complexity() +
                      '): { "text": "' +
                      this.text +
                      '", "fontFamily": "' +
                      this.fontFamily +
                      '" }>'
                    );
                  },
                  _getCacheCanvasDimensions: function () {
                    var t = this.callSuper("_getCacheCanvasDimensions"),
                      e = this.fontSize;
                    return (
                      (t.width += e * t.zoomX), (t.height += e * t.zoomY), t
                    );
                  },
                  _render: function (t) {
                    this._setTextStyles(t),
                      this._renderTextLinesBackground(t),
                      this._renderTextDecoration(t, "underline"),
                      this._renderText(t),
                      this._renderTextDecoration(t, "overline"),
                      this._renderTextDecoration(t, "linethrough");
                  },
                  _renderText: function (t) {
                    "stroke" === this.paintFirst
                      ? (this._renderTextStroke(t), this._renderTextFill(t))
                      : (this._renderTextFill(t), this._renderTextStroke(t));
                  },
                  _setTextStyles: function (t, e, i) {
                    (t.textBaseline = "alphabetic"),
                      (t.font = this._getFontDeclaration(e, i));
                  },
                  calcTextWidth: function () {
                    for (
                      var t = this.getLineWidth(0),
                        e = 1,
                        i = this._textLines.length;
                      e < i;
                      e++
                    ) {
                      var n = this.getLineWidth(e);
                      n > t && (t = n);
                    }
                    return t;
                  },
                  _renderTextLine: function (t, e, i, n, r, s) {
                    this._renderChars(t, e, i, n, r, s);
                  },
                  _renderTextLinesBackground: function (t) {
                    if (
                      this.textBackgroundColor ||
                      this.styleHas("textBackgroundColor")
                    ) {
                      for (
                        var e,
                          i,
                          n,
                          r,
                          s,
                          o,
                          a = 0,
                          h = t.fillStyle,
                          c = this._getLeftOffset(),
                          l = this._getTopOffset(),
                          u = 0,
                          g = 0,
                          f = 0,
                          d = this._textLines.length;
                        f < d;
                        f++
                      )
                        if (
                          ((e = this.getHeightOfLine(f)),
                          this.textBackgroundColor ||
                            this.styleHas("textBackgroundColor", f))
                        ) {
                          (n = this._textLines[f]),
                            (i = this._getLineLeftOffset(f)),
                            (g = 0),
                            (u = 0),
                            (r = this.getValueOfPropertyAt(
                              f,
                              0,
                              "textBackgroundColor"
                            ));
                          for (var p = 0, C = n.length; p < C; p++)
                            (s = this.__charBounds[f][p]),
                              (o = this.getValueOfPropertyAt(
                                f,
                                p,
                                "textBackgroundColor"
                              )) !== r
                                ? ((t.fillStyle = r),
                                  r &&
                                    t.fillRect(
                                      c + i + u,
                                      l + a,
                                      g,
                                      e / this.lineHeight
                                    ),
                                  (u = s.left),
                                  (g = s.width),
                                  (r = o))
                                : (g += s.kernedWidth);
                          o &&
                            ((t.fillStyle = o),
                            t.fillRect(
                              c + i + u,
                              l + a,
                              g,
                              e / this.lineHeight
                            )),
                            (a += e);
                        } else a += e;
                      (t.fillStyle = h), this._removeShadow(t);
                    }
                  },
                  getFontCache: function (t) {
                    var i = t.fontFamily.toLowerCase();
                    e.charWidthsCache[i] || (e.charWidthsCache[i] = {});
                    var n = e.charWidthsCache[i],
                      r =
                        t.fontStyle.toLowerCase() +
                        "_" +
                        (t.fontWeight + "").toLowerCase();
                    return n[r] || (n[r] = {}), n[r];
                  },
                  _applyCharStyles: function (t, e, i, n, r) {
                    this._setFillStyles(e, r),
                      this._setStrokeStyles(e, r),
                      (e.font = this._getFontDeclaration(r));
                  },
                  _measureChar: function (t, e, i, n) {
                    var r,
                      s,
                      o,
                      a,
                      h = this.getFontCache(e),
                      c = i + t,
                      l =
                        this._getFontDeclaration(e) ===
                        this._getFontDeclaration(n),
                      u = e.fontSize / this.CACHE_FONT_SIZE;
                    if (
                      (i && void 0 !== h[i] && (o = h[i]),
                      void 0 !== h[t] && (a = r = h[t]),
                      l && void 0 !== h[c] && (a = (s = h[c]) - o),
                      void 0 === r || void 0 === o || void 0 === s)
                    ) {
                      var g = this.getMeasuringContext();
                      this._setTextStyles(g, e, !0);
                    }
                    return (
                      void 0 === r &&
                        ((a = r = g.measureText(t).width), (h[t] = r)),
                      void 0 === o &&
                        l &&
                        i &&
                        ((o = g.measureText(i).width), (h[i] = o)),
                      l &&
                        void 0 === s &&
                        ((s = g.measureText(c).width), (h[c] = s), (a = s - o)),
                      { width: r * u, kernedWidth: a * u }
                    );
                  },
                  getHeightOfChar: function (t, e) {
                    return this.getValueOfPropertyAt(t, e, "fontSize");
                  },
                  measureLine: function (t) {
                    var e = this._measureLine(t);
                    return (
                      0 !== this.charSpacing &&
                        (e.width -= this._getWidthOfCharSpacing()),
                      e.width < 0 && (e.width = 0),
                      e
                    );
                  },
                  _measureLine: function (t) {
                    var e,
                      i,
                      n,
                      r,
                      s = 0,
                      o = this._textLines[t],
                      a = new Array(o.length);
                    for (this.__charBounds[t] = a, e = 0; e < o.length; e++)
                      (i = o[e]),
                        (r = this._getGraphemeBox(i, t, e, n)),
                        (a[e] = r),
                        (s += r.kernedWidth),
                        (n = i);
                    return (
                      (a[e] = {
                        left: r ? r.left + r.width : 0,
                        width: 0,
                        kernedWidth: 0,
                        height: this.fontSize,
                      }),
                      { width: s, numOfSpaces: 0 }
                    );
                  },
                  _getGraphemeBox: function (t, e, i, n, r) {
                    var s,
                      o = this.getCompleteStyleDeclaration(e, i),
                      a = n ? this.getCompleteStyleDeclaration(e, i - 1) : {},
                      h = this._measureChar(t, o, n, a),
                      c = h.kernedWidth,
                      l = h.width;
                    0 !== this.charSpacing &&
                      ((l += s = this._getWidthOfCharSpacing()), (c += s));
                    var u = {
                      width: l,
                      left: 0,
                      height: o.fontSize,
                      kernedWidth: c,
                      deltaY: o.deltaY,
                    };
                    if (i > 0 && !r) {
                      var g = this.__charBounds[e][i - 1];
                      u.left = g.left + g.width + h.kernedWidth - h.width;
                    }
                    return u;
                  },
                  getHeightOfLine: function (t) {
                    if (this.__lineHeights[t]) return this.__lineHeights[t];
                    for (
                      var e = this._textLines[t],
                        i = this.getHeightOfChar(t, 0),
                        n = 1,
                        r = e.length;
                      n < r;
                      n++
                    )
                      i = Math.max(this.getHeightOfChar(t, n), i);
                    return (this.__lineHeights[t] =
                      i * this.lineHeight * this._fontSizeMult);
                  },
                  calcTextHeight: function () {
                    for (
                      var t, e = 0, i = 0, n = this._textLines.length;
                      i < n;
                      i++
                    )
                      (t = this.getHeightOfLine(i)),
                        (e += i === n - 1 ? t / this.lineHeight : t);
                    return e;
                  },
                  _getLeftOffset: function () {
                    return -this.width / 2;
                  },
                  _getTopOffset: function () {
                    return -this.height / 2;
                  },
                  _applyPatternGradientTransform: function (t, e) {
                    if (!e || !e.toLive) return { offsetX: 0, offsetY: 0 };
                    var i = -this.width / 2 + e.offsetX || 0,
                      n = -this.height / 2 + e.offsetY || 0;
                    return (
                      t.transform(1, 0, 0, 1, i, n), { offsetX: i, offsetY: n }
                    );
                  },
                  _renderTextCommon: function (t, e) {
                    t.save();
                    for (
                      var i = 0,
                        n = this._getLeftOffset(),
                        r = this._getTopOffset(),
                        s = this._applyPatternGradientTransform(
                          t,
                          "fillText" === e ? this.fill : this.stroke
                        ),
                        o = 0,
                        a = this._textLines.length;
                      o < a;
                      o++
                    ) {
                      var h = this.getHeightOfLine(o),
                        c = h / this.lineHeight,
                        l = this._getLineLeftOffset(o);
                      this._renderTextLine(
                        e,
                        t,
                        this._textLines[o],
                        n + l - s.offsetX,
                        r + i + c - s.offsetY,
                        o
                      ),
                        (i += h);
                    }
                    t.restore();
                  },
                  _renderTextFill: function (t) {
                    (this.fill || this.styleHas("fill")) &&
                      this._renderTextCommon(t, "fillText");
                  },
                  _renderTextStroke: function (t) {
                    ((this.stroke && 0 !== this.strokeWidth) ||
                      !this.isEmptyStyles()) &&
                      (this.shadow &&
                        !this.shadow.affectStroke &&
                        this._removeShadow(t),
                      t.save(),
                      this._setLineDash(t, this.strokeDashArray),
                      t.beginPath(),
                      this._renderTextCommon(t, "strokeText"),
                      t.closePath(),
                      t.restore());
                  },
                  _renderChars: function (t, e, i, n, r, s) {
                    var o,
                      a,
                      h,
                      c,
                      l = this.getHeightOfLine(s),
                      u = -1 !== this.textAlign.indexOf("justify"),
                      g = "",
                      f = 0,
                      d = !u && 0 === this.charSpacing && this.isEmptyStyles(s);
                    if (
                      (e.save(),
                      (r -= (l * this._fontSizeFraction) / this.lineHeight),
                      d)
                    )
                      return (
                        this._renderChar(
                          t,
                          e,
                          s,
                          0,
                          this.textLines[s],
                          n,
                          r,
                          l
                        ),
                        void e.restore()
                      );
                    for (var p = 0, C = i.length - 1; p <= C; p++)
                      (c = p === C || this.charSpacing),
                        (g += i[p]),
                        (h = this.__charBounds[s][p]),
                        0 === f
                          ? ((n += h.kernedWidth - h.width), (f += h.width))
                          : (f += h.kernedWidth),
                        u && !c && this._reSpaceAndTab.test(i[p]) && (c = !0),
                        c ||
                          ((o = o || this.getCompleteStyleDeclaration(s, p)),
                          (a = this.getCompleteStyleDeclaration(s, p + 1)),
                          (c = this._hasStyleChanged(o, a))),
                        c &&
                          (this._renderChar(t, e, s, p, g, n, r, l),
                          (g = ""),
                          (o = a),
                          (n += f),
                          (f = 0));
                    e.restore();
                  },
                  _renderChar: function (t, e, i, n, r, s, o) {
                    var a = this._getStyleDeclaration(i, n),
                      h = this.getCompleteStyleDeclaration(i, n),
                      c = "fillText" === t && h.fill,
                      l = "strokeText" === t && h.stroke && h.strokeWidth;
                    (l || c) &&
                      (a && e.save(),
                      this._applyCharStyles(t, e, i, n, h),
                      a && a.textBackgroundColor && this._removeShadow(e),
                      a && a.deltaY && (o += a.deltaY),
                      c && e.fillText(r, s, o),
                      l && e.strokeText(r, s, o),
                      a && e.restore());
                  },
                  setSuperscript: function (t, e) {
                    return this._setScript(t, e, this.superscript);
                  },
                  setSubscript: function (t, e) {
                    return this._setScript(t, e, this.subscript);
                  },
                  _setScript: function (t, e, i) {
                    var n = this.get2DCursorLocation(t, !0),
                      r = this.getValueOfPropertyAt(
                        n.lineIndex,
                        n.charIndex,
                        "fontSize"
                      ),
                      s = this.getValueOfPropertyAt(
                        n.lineIndex,
                        n.charIndex,
                        "deltaY"
                      ),
                      o = { fontSize: r * i.size, deltaY: s + r * i.baseline };
                    return this.setSelectionStyles(o, t, e), this;
                  },
                  _hasStyleChanged: function (t, e) {
                    return (
                      t.fill !== e.fill ||
                      t.stroke !== e.stroke ||
                      t.strokeWidth !== e.strokeWidth ||
                      t.fontSize !== e.fontSize ||
                      t.fontFamily !== e.fontFamily ||
                      t.fontWeight !== e.fontWeight ||
                      t.fontStyle !== e.fontStyle ||
                      t.deltaY !== e.deltaY
                    );
                  },
                  _hasStyleChangedForSvg: function (t, e) {
                    return (
                      this._hasStyleChanged(t, e) ||
                      t.overline !== e.overline ||
                      t.underline !== e.underline ||
                      t.linethrough !== e.linethrough
                    );
                  },
                  _getLineLeftOffset: function (t) {
                    var e = this.getLineWidth(t);
                    return "center" === this.textAlign
                      ? (this.width - e) / 2
                      : "right" === this.textAlign
                      ? this.width - e
                      : "justify-center" === this.textAlign &&
                        this.isEndOfWrapping(t)
                      ? (this.width - e) / 2
                      : "justify-right" === this.textAlign &&
                        this.isEndOfWrapping(t)
                      ? this.width - e
                      : 0;
                  },
                  _clearCache: function () {
                    (this.__lineWidths = []),
                      (this.__lineHeights = []),
                      (this.__charBounds = []);
                  },
                  _shouldClearDimensionCache: function () {
                    var t = this._forceClearCache;
                    return (
                      t ||
                        (t = this.hasStateChanged("_dimensionAffectingProps")),
                      t && ((this.dirty = !0), (this._forceClearCache = !1)),
                      t
                    );
                  },
                  getLineWidth: function (t) {
                    return this.__lineWidths[t]
                      ? this.__lineWidths[t]
                      : ((e =
                          "" === this._textLines[t]
                            ? 0
                            : this.measureLine(t).width),
                        (this.__lineWidths[t] = e),
                        e);
                    var e;
                  },
                  _getWidthOfCharSpacing: function () {
                    return 0 !== this.charSpacing
                      ? (this.fontSize * this.charSpacing) / 1e3
                      : 0;
                  },
                  getValueOfPropertyAt: function (t, e, i) {
                    var n = this._getStyleDeclaration(t, e);
                    return n && void 0 !== n[i] ? n[i] : this[i];
                  },
                  _renderTextDecoration: function (t, e) {
                    if (this[e] || this.styleHas(e)) {
                      for (
                        var i,
                          n,
                          r,
                          s,
                          o,
                          a,
                          h,
                          c,
                          l,
                          u,
                          g,
                          f,
                          d,
                          p,
                          C,
                          A,
                          v = this._getLeftOffset(),
                          m = this._getTopOffset(),
                          I = this._getWidthOfCharSpacing(),
                          w = 0,
                          y = this._textLines.length;
                        w < y;
                        w++
                      )
                        if (
                          ((i = this.getHeightOfLine(w)),
                          this[e] || this.styleHas(e, w))
                        ) {
                          (h = this._textLines[w]),
                            (p = i / this.lineHeight),
                            (s = this._getLineLeftOffset(w)),
                            (u = 0),
                            (g = 0),
                            (c = this.getValueOfPropertyAt(w, 0, e)),
                            (A = this.getValueOfPropertyAt(w, 0, "fill")),
                            (l = m + p * (1 - this._fontSizeFraction)),
                            (n = this.getHeightOfChar(w, 0)),
                            (o = this.getValueOfPropertyAt(w, 0, "deltaY"));
                          for (var M = 0, b = h.length; M < b; M++)
                            (f = this.__charBounds[w][M]),
                              (d = this.getValueOfPropertyAt(w, M, e)),
                              (C = this.getValueOfPropertyAt(w, M, "fill")),
                              (r = this.getHeightOfChar(w, M)),
                              (a = this.getValueOfPropertyAt(w, M, "deltaY")),
                              (d !== c || C !== A || r !== n || a !== o) &&
                              g > 0
                                ? ((t.fillStyle = A),
                                  c &&
                                    A &&
                                    t.fillRect(
                                      v + s + u,
                                      l + this.offsets[e] * n + o,
                                      g,
                                      this.fontSize / 15
                                    ),
                                  (u = f.left),
                                  (g = f.width),
                                  (c = d),
                                  (A = C),
                                  (n = r),
                                  (o = a))
                                : (g += f.kernedWidth);
                          (t.fillStyle = C),
                            d &&
                              C &&
                              t.fillRect(
                                v + s + u,
                                l + this.offsets[e] * n + o,
                                g - I,
                                this.fontSize / 15
                              ),
                            (m += i);
                        } else m += i;
                      this._removeShadow(t);
                    }
                  },
                  _getFontDeclaration: function (t, i) {
                    var n = t || this,
                      r = this.fontFamily,
                      s = e.Text.genericFonts.indexOf(r.toLowerCase()) > -1,
                      o =
                        void 0 === r ||
                        r.indexOf("'") > -1 ||
                        r.indexOf(",") > -1 ||
                        r.indexOf('"') > -1 ||
                        s
                          ? n.fontFamily
                          : '"' + n.fontFamily + '"';
                    return [
                      e.isLikelyNode ? n.fontWeight : n.fontStyle,
                      e.isLikelyNode ? n.fontStyle : n.fontWeight,
                      i ? this.CACHE_FONT_SIZE + "px" : n.fontSize + "px",
                      o,
                    ].join(" ");
                  },
                  render: function (t) {
                    this.visible &&
                      ((this.canvas &&
                        this.canvas.skipOffscreen &&
                        !this.group &&
                        !this.isOnScreen()) ||
                        (this._shouldClearDimensionCache() &&
                          this.initDimensions(),
                        this.callSuper("render", t)));
                  },
                  _splitTextIntoLines: function (t) {
                    for (
                      var i = t.split(this._reNewline),
                        n = new Array(i.length),
                        r = ["\n"],
                        s = [],
                        o = 0;
                      o < i.length;
                      o++
                    )
                      (n[o] = e.util.string.graphemeSplit(i[o])),
                        (s = s.concat(n[o], r));
                    return (
                      s.pop(),
                      {
                        _unwrappedLines: n,
                        lines: i,
                        graphemeText: s,
                        graphemeLines: n,
                      }
                    );
                  },
                  toObject: function (t) {
                    var e = [
                        "text",
                        "fontSize",
                        "fontWeight",
                        "fontFamily",
                        "fontStyle",
                        "lineHeight",
                        "underline",
                        "overline",
                        "linethrough",
                        "textAlign",
                        "textBackgroundColor",
                        "charSpacing",
                      ].concat(t),
                      n = this.callSuper("toObject", e);
                    return (n.styles = i(this.styles, !0)), n;
                  },
                  set: function (t, e) {
                    this.callSuper("set", t, e);
                    var i = !1;
                    if ("object" == typeof t)
                      for (var n in t)
                        i =
                          i || -1 !== this._dimensionAffectingProps.indexOf(n);
                    else i = -1 !== this._dimensionAffectingProps.indexOf(t);
                    return i && (this.initDimensions(), this.setCoords()), this;
                  },
                  complexity: function () {
                    return 1;
                  },
                })),
                (e.Text.ATTRIBUTE_NAMES = e.SHARED_ATTRIBUTES.concat(
                  "x y dx dy font-family font-style font-weight font-size letter-spacing text-decoration text-anchor".split(
                    " "
                  )
                )),
                (e.Text.DEFAULT_SVG_FONT_SIZE = 16),
                (e.Text.fromElement = function (t, n, r) {
                  if (!t) return n(null);
                  var s = e.parseAttributes(t, e.Text.ATTRIBUTE_NAMES),
                    o = s.textAnchor || "left";
                  if (
                    (((r = e.util.object.extend(r ? i(r) : {}, s)).top =
                      r.top || 0),
                    (r.left = r.left || 0),
                    s.textDecoration)
                  ) {
                    var a = s.textDecoration;
                    -1 !== a.indexOf("underline") && (r.underline = !0),
                      -1 !== a.indexOf("overline") && (r.overline = !0),
                      -1 !== a.indexOf("line-through") && (r.linethrough = !0),
                      delete r.textDecoration;
                  }
                  "dx" in s && (r.left += s.dx),
                    "dy" in s && (r.top += s.dy),
                    "fontSize" in r ||
                      (r.fontSize = e.Text.DEFAULT_SVG_FONT_SIZE);
                  var h = "";
                  "textContent" in t
                    ? (h = t.textContent)
                    : "firstChild" in t &&
                      null !== t.firstChild &&
                      "data" in t.firstChild &&
                      null !== t.firstChild.data &&
                      (h = t.firstChild.data),
                    (h = h.replace(/^\s+|\s+$|\n+/g, "").replace(/\s+/g, " "));
                  var c = r.strokeWidth;
                  r.strokeWidth = 0;
                  var l = new e.Text(h, r),
                    u = l.getScaledHeight() / l.height,
                    g =
                      ((l.height + l.strokeWidth) * l.lineHeight - l.height) *
                      u,
                    f = l.getScaledHeight() + g,
                    d = 0;
                  "center" === o && (d = l.getScaledWidth() / 2),
                    "right" === o && (d = l.getScaledWidth()),
                    l.set({
                      left: l.left - d,
                      top:
                        l.top -
                        (f - l.fontSize * (0.07 + l._fontSizeFraction)) /
                          l.lineHeight,
                      strokeWidth: void 0 !== c ? c : 1,
                    }),
                    n(l);
                }),
                (e.Text.fromObject = function (t, i) {
                  return e.Object._fromObject("Text", t, i, "text");
                }),
                (e.Text.genericFonts = [
                  "sans-serif",
                  "serif",
                  "cursive",
                  "fantasy",
                  "monospace",
                ]),
                e.util.createAccessors && e.util.createAccessors(e.Text));
          })(e),
          b.util.object.extend(b.Text.prototype, {
            isEmptyStyles: function (t) {
              if (!this.styles) return !0;
              if (void 0 !== t && !this.styles[t]) return !0;
              var e = void 0 === t ? this.styles : { line: this.styles[t] };
              for (var i in e)
                for (var n in e[i]) for (var r in e[i][n]) return !1;
              return !0;
            },
            styleHas: function (t, e) {
              if (!this.styles || !t || "" === t) return !1;
              if (void 0 !== e && !this.styles[e]) return !1;
              var i = void 0 === e ? this.styles : { 0: this.styles[e] };
              for (var n in i)
                for (var r in i[n]) if (void 0 !== i[n][r][t]) return !0;
              return !1;
            },
            cleanStyle: function (t) {
              if (!this.styles || !t || "" === t) return !1;
              var e,
                i,
                n = this.styles,
                r = 0,
                s = !0,
                o = 0;
              for (var a in n) {
                for (var h in ((e = 0), n[a])) {
                  var c;
                  r++,
                    (c = n[a][h]).hasOwnProperty(t)
                      ? (i ? c[t] !== i && (s = !1) : (i = c[t]),
                        c[t] === this[t] && delete c[t])
                      : (s = !1),
                    0 !== Object.keys(c).length ? e++ : delete n[a][h];
                }
                0 === e && delete n[a];
              }
              for (var l = 0; l < this._textLines.length; l++)
                o += this._textLines[l].length;
              s && r === o && ((this[t] = i), this.removeStyle(t));
            },
            removeStyle: function (t) {
              if (this.styles && t && "" !== t) {
                var e,
                  i,
                  n,
                  r = this.styles;
                for (i in r) {
                  for (n in (e = r[i]))
                    delete e[n][t],
                      0 === Object.keys(e[n]).length && delete e[n];
                  0 === Object.keys(e).length && delete r[i];
                }
              }
            },
            _extendStyles: function (t, e) {
              var i = this.get2DCursorLocation(t);
              this._getLineStyle(i.lineIndex) ||
                this._setLineStyle(i.lineIndex),
                this._getStyleDeclaration(i.lineIndex, i.charIndex) ||
                  this._setStyleDeclaration(i.lineIndex, i.charIndex, {}),
                b.util.object.extend(
                  this._getStyleDeclaration(i.lineIndex, i.charIndex),
                  e
                );
            },
            get2DCursorLocation: function (t, e) {
              void 0 === t && (t = this.selectionStart);
              for (
                var i = e ? this._unwrappedTextLines : this._textLines,
                  n = i.length,
                  r = 0;
                r < n;
                r++
              ) {
                if (t <= i[r].length) return { lineIndex: r, charIndex: t };
                t -= i[r].length + this.missingNewlineOffset(r);
              }
              return {
                lineIndex: r - 1,
                charIndex: i[r - 1].length < t ? i[r - 1].length : t,
              };
            },
            getSelectionStyles: function (t, e, i) {
              void 0 === t && (t = this.selectionStart || 0),
                void 0 === e && (e = this.selectionEnd || t);
              for (var n = [], r = t; r < e; r++)
                n.push(this.getStyleAtPosition(r, i));
              return n;
            },
            getStyleAtPosition: function (t, e) {
              var i = this.get2DCursorLocation(t);
              return (
                (e
                  ? this.getCompleteStyleDeclaration(i.lineIndex, i.charIndex)
                  : this._getStyleDeclaration(i.lineIndex, i.charIndex)) || {}
              );
            },
            setSelectionStyles: function (t, e, i) {
              void 0 === e && (e = this.selectionStart || 0),
                void 0 === i && (i = this.selectionEnd || e);
              for (var n = e; n < i; n++) this._extendStyles(n, t);
              return (this._forceClearCache = !0), this;
            },
            _getStyleDeclaration: function (t, e) {
              var i = this.styles && this.styles[t];
              return i ? i[e] : null;
            },
            getCompleteStyleDeclaration: function (t, e) {
              for (
                var i, n = this._getStyleDeclaration(t, e) || {}, r = {}, s = 0;
                s < this._styleProperties.length;
                s++
              )
                r[(i = this._styleProperties[s])] =
                  void 0 === n[i] ? this[i] : n[i];
              return r;
            },
            _setStyleDeclaration: function (t, e, i) {
              this.styles[t][e] = i;
            },
            _deleteStyleDeclaration: function (t, e) {
              delete this.styles[t][e];
            },
            _getLineStyle: function (t) {
              return !!this.styles[t];
            },
            _setLineStyle: function (t) {
              this.styles[t] = {};
            },
            _deleteLineStyle: function (t) {
              delete this.styles[t];
            },
          }),
          (function () {
            function t(t) {
              t.textDecoration &&
                (t.textDecoration.indexOf("underline") > -1 &&
                  (t.underline = !0),
                t.textDecoration.indexOf("line-through") > -1 &&
                  (t.linethrough = !0),
                t.textDecoration.indexOf("overline") > -1 && (t.overline = !0),
                delete t.textDecoration);
            }
            (b.IText = b.util.createClass(b.Text, b.Observable, {
              type: "i-text",
              selectionStart: 0,
              selectionEnd: 0,
              selectionColor: "rgba(17,119,255,0.3)",
              isEditing: !1,
              editable: !0,
              editingBorderColor: "rgba(102,153,255,0.25)",
              cursorWidth: 2,
              cursorColor: "#333",
              cursorDelay: 1e3,
              cursorDuration: 600,
              caching: !0,
              _reSpace: /\s|\n/,
              _currentCursorOpacity: 0,
              _selectionDirection: null,
              _abortCursorAnimation: !1,
              __widthOfSpace: [],
              inCompositionMode: !1,
              initialize: function (t, e) {
                this.callSuper("initialize", t, e), this.initBehavior();
              },
              setSelectionStart: function (t) {
                (t = Math.max(t, 0)), this._updateAndFire("selectionStart", t);
              },
              setSelectionEnd: function (t) {
                (t = Math.min(t, this.text.length)),
                  this._updateAndFire("selectionEnd", t);
              },
              _updateAndFire: function (t, e) {
                this[t] !== e && (this._fireSelectionChanged(), (this[t] = e)),
                  this._updateTextarea();
              },
              _fireSelectionChanged: function () {
                this.fire("selection:changed"),
                  this.canvas &&
                    this.canvas.fire("text:selection:changed", {
                      target: this,
                    });
              },
              initDimensions: function () {
                this.isEditing && this.initDelayedCursor(),
                  this.clearContextTop(),
                  this.callSuper("initDimensions");
              },
              render: function (t) {
                this.clearContextTop(),
                  this.callSuper("render", t),
                  (this.cursorOffsetCache = {}),
                  this.renderCursorOrSelection();
              },
              _render: function (t) {
                this.callSuper("_render", t);
              },
              clearContextTop: function (t) {
                if (this.isEditing && this.canvas && this.canvas.contextTop) {
                  var e = this.canvas.contextTop,
                    i = this.canvas.viewportTransform;
                  e.save(),
                    e.transform(i[0], i[1], i[2], i[3], i[4], i[5]),
                    this.transform(e),
                    this.transformMatrix &&
                      e.transform.apply(e, this.transformMatrix),
                    this._clearTextArea(e),
                    t || e.restore();
                }
              },
              renderCursorOrSelection: function () {
                if (this.isEditing && this.canvas && this.canvas.contextTop) {
                  var t = this._getCursorBoundaries(),
                    e = this.canvas.contextTop;
                  this.clearContextTop(!0),
                    this.selectionStart === this.selectionEnd
                      ? this.renderCursor(t, e)
                      : this.renderSelection(t, e),
                    e.restore();
                }
              },
              _clearTextArea: function (t) {
                var e = this.width + 4,
                  i = this.height + 4;
                t.clearRect(-e / 2, -i / 2, e, i);
              },
              _getCursorBoundaries: function (t) {
                void 0 === t && (t = this.selectionStart);
                var e = this._getLeftOffset(),
                  i = this._getTopOffset(),
                  n = this._getCursorBoundariesOffsets(t);
                return {
                  left: e,
                  top: i,
                  leftOffset: n.left,
                  topOffset: n.top,
                };
              },
              _getCursorBoundariesOffsets: function (t) {
                if (this.cursorOffsetCache && "top" in this.cursorOffsetCache)
                  return this.cursorOffsetCache;
                var e,
                  i,
                  n,
                  r,
                  s = 0,
                  o = 0,
                  a = this.get2DCursorLocation(t);
                (n = a.charIndex), (i = a.lineIndex);
                for (var h = 0; h < i; h++) s += this.getHeightOfLine(h);
                e = this._getLineLeftOffset(i);
                var c = this.__charBounds[i][n];
                return (
                  c && (o = c.left),
                  0 !== this.charSpacing &&
                    n === this._textLines[i].length &&
                    (o -= this._getWidthOfCharSpacing()),
                  (r = { top: s, left: e + (o > 0 ? o : 0) }),
                  (this.cursorOffsetCache = r),
                  this.cursorOffsetCache
                );
              },
              renderCursor: function (t, e) {
                var i = this.get2DCursorLocation(),
                  n = i.lineIndex,
                  r = i.charIndex > 0 ? i.charIndex - 1 : 0,
                  s = this.getValueOfPropertyAt(n, r, "fontSize"),
                  o = this.scaleX * this.canvas.getZoom(),
                  a = this.cursorWidth / o,
                  h = t.topOffset,
                  c = this.getValueOfPropertyAt(n, r, "deltaY");
                (h +=
                  ((1 - this._fontSizeFraction) * this.getHeightOfLine(n)) /
                    this.lineHeight -
                  s * (1 - this._fontSizeFraction)),
                  this.inCompositionMode && this.renderSelection(t, e),
                  (e.fillStyle = this.getValueOfPropertyAt(n, r, "fill")),
                  (e.globalAlpha = this.__isMousedown
                    ? 1
                    : this._currentCursorOpacity),
                  e.fillRect(
                    t.left + t.leftOffset - a / 2,
                    h + t.top + c,
                    a,
                    s
                  );
              },
              renderSelection: function (t, e) {
                for (
                  var i = this.inCompositionMode
                      ? this.hiddenTextarea.selectionStart
                      : this.selectionStart,
                    n = this.inCompositionMode
                      ? this.hiddenTextarea.selectionEnd
                      : this.selectionEnd,
                    r = -1 !== this.textAlign.indexOf("justify"),
                    s = this.get2DCursorLocation(i),
                    o = this.get2DCursorLocation(n),
                    a = s.lineIndex,
                    h = o.lineIndex,
                    c = s.charIndex < 0 ? 0 : s.charIndex,
                    l = o.charIndex < 0 ? 0 : o.charIndex,
                    u = a;
                  u <= h;
                  u++
                ) {
                  var g,
                    f = this._getLineLeftOffset(u) || 0,
                    d = this.getHeightOfLine(u),
                    p = 0,
                    C = 0;
                  if (
                    (u === a && (p = this.__charBounds[a][c].left),
                    u >= a && u < h)
                  )
                    C =
                      r && !this.isEndOfWrapping(u)
                        ? this.width
                        : this.getLineWidth(u) || 5;
                  else if (u === h)
                    if (0 === l) C = this.__charBounds[h][l].left;
                    else {
                      var A = this._getWidthOfCharSpacing();
                      C =
                        this.__charBounds[h][l - 1].left +
                        this.__charBounds[h][l - 1].width -
                        A;
                    }
                  (g = d),
                    (this.lineHeight < 1 || (u === h && this.lineHeight > 1)) &&
                      (d /= this.lineHeight),
                    this.inCompositionMode
                      ? ((e.fillStyle = this.compositionColor || "black"),
                        e.fillRect(
                          t.left + f + p,
                          t.top + t.topOffset + d,
                          C - p,
                          1
                        ))
                      : ((e.fillStyle = this.selectionColor),
                        e.fillRect(
                          t.left + f + p,
                          t.top + t.topOffset,
                          C - p,
                          d
                        )),
                    (t.topOffset += g);
                }
              },
              getCurrentCharFontSize: function () {
                var t = this._getCurrentCharIndex();
                return this.getValueOfPropertyAt(t.l, t.c, "fontSize");
              },
              getCurrentCharColor: function () {
                var t = this._getCurrentCharIndex();
                return this.getValueOfPropertyAt(t.l, t.c, "fill");
              },
              _getCurrentCharIndex: function () {
                var t = this.get2DCursorLocation(this.selectionStart, !0),
                  e = t.charIndex > 0 ? t.charIndex - 1 : 0;
                return { l: t.lineIndex, c: e };
              },
            })),
              (b.IText.fromObject = function (e, i) {
                if ((t(e), e.styles))
                  for (var n in e.styles)
                    for (var r in e.styles[n]) t(e.styles[n][r]);
                b.Object._fromObject("IText", e, i, "text");
              });
          })(),
          (w = b.util.object.clone),
          b.util.object.extend(b.IText.prototype, {
            initBehavior: function () {
              this.initAddedHandler(),
                this.initRemovedHandler(),
                this.initCursorSelectionHandlers(),
                this.initDoubleClickSimulation(),
                (this.mouseMoveHandler = this.mouseMoveHandler.bind(this));
            },
            onDeselect: function () {
              this.isEditing && this.exitEditing(), (this.selected = !1);
            },
            initAddedHandler: function () {
              var t = this;
              this.on("added", function () {
                var e = t.canvas;
                e &&
                  (e._hasITextHandlers ||
                    ((e._hasITextHandlers = !0), t._initCanvasHandlers(e)),
                  (e._iTextInstances = e._iTextInstances || []),
                  e._iTextInstances.push(t));
              });
            },
            initRemovedHandler: function () {
              var t = this;
              this.on("removed", function () {
                var e = t.canvas;
                e &&
                  ((e._iTextInstances = e._iTextInstances || []),
                  b.util.removeFromArray(e._iTextInstances, t),
                  0 === e._iTextInstances.length &&
                    ((e._hasITextHandlers = !1), t._removeCanvasHandlers(e)));
              });
            },
            _initCanvasHandlers: function (t) {
              (t._mouseUpITextHandler = function () {
                t._iTextInstances &&
                  t._iTextInstances.forEach(function (t) {
                    t.__isMousedown = !1;
                  });
              }),
                t.on("mouse:up", t._mouseUpITextHandler);
            },
            _removeCanvasHandlers: function (t) {
              t.off("mouse:up", t._mouseUpITextHandler);
            },
            _tick: function () {
              this._currentTickState = this._animateCursor(
                this,
                1,
                this.cursorDuration,
                "_onTickComplete"
              );
            },
            _animateCursor: function (t, e, i, n) {
              var r;
              return (
                (r = {
                  isAborted: !1,
                  abort: function () {
                    this.isAborted = !0;
                  },
                }),
                t.animate("_currentCursorOpacity", e, {
                  duration: i,
                  onComplete: function () {
                    r.isAborted || t[n]();
                  },
                  onChange: function () {
                    t.canvas &&
                      t.selectionStart === t.selectionEnd &&
                      t.renderCursorOrSelection();
                  },
                  abort: function () {
                    return r.isAborted;
                  },
                }),
                r
              );
            },
            _onTickComplete: function () {
              var t = this;
              this._cursorTimeout1 && clearTimeout(this._cursorTimeout1),
                (this._cursorTimeout1 = setTimeout(function () {
                  t._currentTickCompleteState = t._animateCursor(
                    t,
                    0,
                    this.cursorDuration / 2,
                    "_tick"
                  );
                }, 100));
            },
            initDelayedCursor: function (t) {
              var e = this,
                i = t ? 0 : this.cursorDelay;
              this.abortCursorAnimation(),
                (this._currentCursorOpacity = 1),
                (this._cursorTimeout2 = setTimeout(function () {
                  e._tick();
                }, i));
            },
            abortCursorAnimation: function () {
              var t = this._currentTickState || this._currentTickCompleteState,
                e = this.canvas;
              this._currentTickState && this._currentTickState.abort(),
                this._currentTickCompleteState &&
                  this._currentTickCompleteState.abort(),
                clearTimeout(this._cursorTimeout1),
                clearTimeout(this._cursorTimeout2),
                (this._currentCursorOpacity = 0),
                t && e && e.clearContext(e.contextTop || e.contextContainer);
            },
            selectAll: function () {
              return (
                (this.selectionStart = 0),
                (this.selectionEnd = this._text.length),
                this._fireSelectionChanged(),
                this._updateTextarea(),
                this
              );
            },
            getSelectedText: function () {
              return this._text
                .slice(this.selectionStart, this.selectionEnd)
                .join("");
            },
            findWordBoundaryLeft: function (t) {
              var e = 0,
                i = t - 1;
              if (this._reSpace.test(this._text[i]))
                for (; this._reSpace.test(this._text[i]); ) e++, i--;
              for (; /\S/.test(this._text[i]) && i > -1; ) e++, i--;
              return t - e;
            },
            findWordBoundaryRight: function (t) {
              var e = 0,
                i = t;
              if (this._reSpace.test(this._text[i]))
                for (; this._reSpace.test(this._text[i]); ) e++, i++;
              for (; /\S/.test(this._text[i]) && i < this._text.length; )
                e++, i++;
              return t + e;
            },
            findLineBoundaryLeft: function (t) {
              for (var e = 0, i = t - 1; !/\n/.test(this._text[i]) && i > -1; )
                e++, i--;
              return t - e;
            },
            findLineBoundaryRight: function (t) {
              for (
                var e = 0, i = t;
                !/\n/.test(this._text[i]) && i < this._text.length;

              )
                e++, i++;
              return t + e;
            },
            searchWordBoundary: function (t, e) {
              for (
                var i = this._text,
                  n = this._reSpace.test(i[t]) ? t - 1 : t,
                  r = i[n],
                  s = b.reNonWord;
                !s.test(r) && n > 0 && n < i.length;

              )
                r = i[(n += e)];
              return s.test(r) && (n += 1 === e ? 0 : 1), n;
            },
            selectWord: function (t) {
              t = t || this.selectionStart;
              var e = this.searchWordBoundary(t, -1),
                i = this.searchWordBoundary(t, 1);
              (this.selectionStart = e),
                (this.selectionEnd = i),
                this._fireSelectionChanged(),
                this._updateTextarea(),
                this.renderCursorOrSelection();
            },
            selectLine: function (t) {
              t = t || this.selectionStart;
              var e = this.findLineBoundaryLeft(t),
                i = this.findLineBoundaryRight(t);
              return (
                (this.selectionStart = e),
                (this.selectionEnd = i),
                this._fireSelectionChanged(),
                this._updateTextarea(),
                this
              );
            },
            enterEditing: function (t) {
              if (!this.isEditing && this.editable)
                return (
                  this.canvas &&
                    (this.canvas.calcOffset(),
                    this.exitEditingOnOthers(this.canvas)),
                  (this.isEditing = !0),
                  this.initHiddenTextarea(t),
                  this.hiddenTextarea.focus(),
                  (this.hiddenTextarea.value = this.text),
                  this._updateTextarea(),
                  this._saveEditingProps(),
                  this._setEditingProps(),
                  (this._textBeforeEdit = this.text),
                  this._tick(),
                  this.fire("editing:entered"),
                  this._fireSelectionChanged(),
                  this.canvas
                    ? (this.canvas.fire("text:editing:entered", {
                        target: this,
                      }),
                      this.initMouseMoveHandler(),
                      this.canvas.requestRenderAll(),
                      this)
                    : this
                );
            },
            exitEditingOnOthers: function (t) {
              t._iTextInstances &&
                t._iTextInstances.forEach(function (t) {
                  (t.selected = !1), t.isEditing && t.exitEditing();
                });
            },
            initMouseMoveHandler: function () {
              this.canvas.on("mouse:move", this.mouseMoveHandler);
            },
            mouseMoveHandler: function (t) {
              if (this.__isMousedown && this.isEditing) {
                var e = this.getSelectionStartFromPointer(t.e),
                  i = this.selectionStart,
                  n = this.selectionEnd;
                ((e === this.__selectionStartOnMouseDown && i !== n) ||
                  (i !== e && n !== e)) &&
                  (e > this.__selectionStartOnMouseDown
                    ? ((this.selectionStart = this.__selectionStartOnMouseDown),
                      (this.selectionEnd = e))
                    : ((this.selectionStart = e),
                      (this.selectionEnd = this.__selectionStartOnMouseDown)),
                  (this.selectionStart === i && this.selectionEnd === n) ||
                    (this.restartCursorIfNeeded(),
                    this._fireSelectionChanged(),
                    this._updateTextarea(),
                    this.renderCursorOrSelection()));
              }
            },
            _setEditingProps: function () {
              (this.hoverCursor = "text"),
                this.canvas &&
                  (this.canvas.defaultCursor = this.canvas.moveCursor = "text"),
                (this.borderColor = this.editingBorderColor),
                (this.hasControls = this.selectable = !1),
                (this.lockMovementX = this.lockMovementY = !0);
            },
            fromStringToGraphemeSelection: function (t, e, i) {
              var n = i.slice(0, t),
                r = b.util.string.graphemeSplit(n).length;
              if (t === e) return { selectionStart: r, selectionEnd: r };
              var s = i.slice(t, e);
              return {
                selectionStart: r,
                selectionEnd: r + b.util.string.graphemeSplit(s).length,
              };
            },
            fromGraphemeToStringSelection: function (t, e, i) {
              var n = i.slice(0, t).join("").length;
              return t === e
                ? { selectionStart: n, selectionEnd: n }
                : {
                    selectionStart: n,
                    selectionEnd: n + i.slice(t, e).join("").length,
                  };
            },
            _updateTextarea: function () {
              if (((this.cursorOffsetCache = {}), this.hiddenTextarea)) {
                if (!this.inCompositionMode) {
                  var t = this.fromGraphemeToStringSelection(
                    this.selectionStart,
                    this.selectionEnd,
                    this._text
                  );
                  (this.hiddenTextarea.selectionStart = t.selectionStart),
                    (this.hiddenTextarea.selectionEnd = t.selectionEnd);
                }
                this.updateTextareaPosition();
              }
            },
            updateFromTextArea: function () {
              if (this.hiddenTextarea) {
                (this.cursorOffsetCache = {}),
                  (this.text = this.hiddenTextarea.value),
                  this._shouldClearDimensionCache() &&
                    (this.initDimensions(), this.setCoords());
                var t = this.fromStringToGraphemeSelection(
                  this.hiddenTextarea.selectionStart,
                  this.hiddenTextarea.selectionEnd,
                  this.hiddenTextarea.value
                );
                (this.selectionEnd = this.selectionStart = t.selectionEnd),
                  this.inCompositionMode ||
                    (this.selectionStart = t.selectionStart),
                  this.updateTextareaPosition();
              }
            },
            updateTextareaPosition: function () {
              if (this.selectionStart === this.selectionEnd) {
                var t = this._calcTextareaPosition();
                (this.hiddenTextarea.style.left = t.left),
                  (this.hiddenTextarea.style.top = t.top);
              }
            },
            _calcTextareaPosition: function () {
              if (!this.canvas) return { x: 1, y: 1 };
              var t = this.inCompositionMode
                  ? this.compositionStart
                  : this.selectionStart,
                e = this._getCursorBoundaries(t),
                i = this.get2DCursorLocation(t),
                n = i.lineIndex,
                r = i.charIndex,
                s =
                  this.getValueOfPropertyAt(n, r, "fontSize") * this.lineHeight,
                o = e.leftOffset,
                a = this.calcTransformMatrix(),
                h = { x: e.left + o, y: e.top + e.topOffset + s },
                c = this.canvas.getRetinaScaling(),
                l = this.canvas.upperCanvasEl,
                u = l.width / c,
                g = l.height / c,
                f = u - s,
                d = g - s,
                p = l.clientWidth / u,
                C = l.clientHeight / g;
              return (
                (h = b.util.transformPoint(h, a)),
                ((h = b.util.transformPoint(
                  h,
                  this.canvas.viewportTransform
                )).x *= p),
                (h.y *= C),
                h.x < 0 && (h.x = 0),
                h.x > f && (h.x = f),
                h.y < 0 && (h.y = 0),
                h.y > d && (h.y = d),
                (h.x += this.canvas._offset.left),
                (h.y += this.canvas._offset.top),
                {
                  left: h.x + "px",
                  top: h.y + "px",
                  fontSize: s + "px",
                  charHeight: s,
                }
              );
            },
            _saveEditingProps: function () {
              this._savedProps = {
                hasControls: this.hasControls,
                borderColor: this.borderColor,
                lockMovementX: this.lockMovementX,
                lockMovementY: this.lockMovementY,
                hoverCursor: this.hoverCursor,
                selectable: this.selectable,
                defaultCursor: this.canvas && this.canvas.defaultCursor,
                moveCursor: this.canvas && this.canvas.moveCursor,
              };
            },
            _restoreEditingProps: function () {
              this._savedProps &&
                ((this.hoverCursor = this._savedProps.hoverCursor),
                (this.hasControls = this._savedProps.hasControls),
                (this.borderColor = this._savedProps.borderColor),
                (this.selectable = this._savedProps.selectable),
                (this.lockMovementX = this._savedProps.lockMovementX),
                (this.lockMovementY = this._savedProps.lockMovementY),
                this.canvas &&
                  ((this.canvas.defaultCursor = this._savedProps.defaultCursor),
                  (this.canvas.moveCursor = this._savedProps.moveCursor)));
            },
            exitEditing: function () {
              var t = this._textBeforeEdit !== this.text,
                e = this.hiddenTextarea;
              return (
                (this.selected = !1),
                (this.isEditing = !1),
                (this.selectionEnd = this.selectionStart),
                e &&
                  (e.blur && e.blur(),
                  e.parentNode && e.parentNode.removeChild(e)),
                (this.hiddenTextarea = null),
                this.abortCursorAnimation(),
                this._restoreEditingProps(),
                (this._currentCursorOpacity = 0),
                this._shouldClearDimensionCache() &&
                  (this.initDimensions(), this.setCoords()),
                this.fire("editing:exited"),
                t && this.fire("modified"),
                this.canvas &&
                  (this.canvas.off("mouse:move", this.mouseMoveHandler),
                  this.canvas.fire("text:editing:exited", { target: this }),
                  t && this.canvas.fire("object:modified", { target: this })),
                this
              );
            },
            _removeExtraneousStyles: function () {
              for (var t in this.styles)
                this._textLines[t] || delete this.styles[t];
            },
            removeStyleFromTo: function (t, e) {
              var i,
                n,
                r = this.get2DCursorLocation(t, !0),
                s = this.get2DCursorLocation(e, !0),
                o = r.lineIndex,
                a = r.charIndex,
                h = s.lineIndex,
                c = s.charIndex;
              if (o !== h) {
                if (this.styles[o])
                  for (i = a; i < this._unwrappedTextLines[o].length; i++)
                    delete this.styles[o][i];
                if (this.styles[h])
                  for (i = c; i < this._unwrappedTextLines[h].length; i++)
                    (n = this.styles[h][i]) &&
                      (this.styles[o] || (this.styles[o] = {}),
                      (this.styles[o][a + i - c] = n));
                for (i = o + 1; i <= h; i++) delete this.styles[i];
                this.shiftLineStyles(h, o - h);
              } else if (this.styles[o]) {
                n = this.styles[o];
                var l,
                  u,
                  g = c - a;
                for (i = a; i < c; i++) delete n[i];
                for (u in this.styles[o])
                  (l = parseInt(u, 10)) >= c &&
                    ((n[l - g] = n[u]), delete n[u]);
              }
            },
            shiftLineStyles: function (t, e) {
              var i = w(this.styles);
              for (var n in this.styles) {
                var r = parseInt(n, 10);
                r > t &&
                  ((this.styles[r + e] = i[r]),
                  i[r - e] || delete this.styles[r]);
              }
            },
            restartCursorIfNeeded: function () {
              (this._currentTickState &&
                !this._currentTickState.isAborted &&
                this._currentTickCompleteState &&
                !this._currentTickCompleteState.isAborted) ||
                this.initDelayedCursor();
            },
            insertNewlineStyleObject: function (t, e, i, n) {
              var r,
                s = {},
                o = !1;
              for (var a in (i || (i = 1),
              this.shiftLineStyles(t, i),
              this.styles[t] && (r = this.styles[t][0 === e ? e : e - 1]),
              this.styles[t])) {
                var h = parseInt(a, 10);
                h >= e &&
                  ((o = !0),
                  (s[h - e] = this.styles[t][a]),
                  delete this.styles[t][a]);
              }
              for (
                o ? (this.styles[t + i] = s) : delete this.styles[t + i];
                i > 1;

              )
                i--,
                  n && n[i]
                    ? (this.styles[t + i] = { 0: w(n[i]) })
                    : r
                    ? (this.styles[t + i] = { 0: w(r) })
                    : delete this.styles[t + i];
              this._forceClearCache = !0;
            },
            insertCharStyleObject: function (t, e, i, n) {
              this.styles || (this.styles = {});
              var r = this.styles[t],
                s = r ? w(r) : {};
              for (var o in (i || (i = 1), s)) {
                var a = parseInt(o, 10);
                a >= e && ((r[a + i] = s[a]), s[a - i] || delete r[a]);
              }
              if (((this._forceClearCache = !0), n))
                for (; i--; )
                  Object.keys(n[i]).length &&
                    (this.styles[t] || (this.styles[t] = {}),
                    (this.styles[t][e + i] = w(n[i])));
              else if (r)
                for (var h = r[e ? e - 1 : 1]; h && i--; )
                  this.styles[t][e + i] = w(h);
            },
            insertNewStyleBlock: function (t, e, i) {
              for (
                var n = this.get2DCursorLocation(e, !0), r = [0], s = 0, o = 0;
                o < t.length;
                o++
              )
                "\n" === t[o] ? (r[++s] = 0) : r[s]++;
              for (
                r[0] > 0 &&
                  (this.insertCharStyleObject(
                    n.lineIndex,
                    n.charIndex,
                    r[0],
                    i
                  ),
                  (i = i && i.slice(r[0] + 1))),
                  s &&
                    this.insertNewlineStyleObject(
                      n.lineIndex,
                      n.charIndex + r[0],
                      s
                    ),
                  o = 1;
                o < s;
                o++
              )
                r[o] > 0
                  ? this.insertCharStyleObject(n.lineIndex + o, 0, r[o], i)
                  : i && (this.styles[n.lineIndex + o][0] = i[0]),
                  (i = i && i.slice(r[o] + 1));
              r[o] > 0 &&
                this.insertCharStyleObject(n.lineIndex + o, 0, r[o], i);
            },
            setSelectionStartEndWithShift: function (t, e, i) {
              i <= t
                ? (e === t
                    ? (this._selectionDirection = "left")
                    : "right" === this._selectionDirection &&
                      ((this._selectionDirection = "left"),
                      (this.selectionEnd = t)),
                  (this.selectionStart = i))
                : i > t && i < e
                ? "right" === this._selectionDirection
                  ? (this.selectionEnd = i)
                  : (this.selectionStart = i)
                : (e === t
                    ? (this._selectionDirection = "right")
                    : "left" === this._selectionDirection &&
                      ((this._selectionDirection = "right"),
                      (this.selectionStart = e)),
                  (this.selectionEnd = i));
            },
            setSelectionInBoundaries: function () {
              var t = this.text.length;
              this.selectionStart > t
                ? (this.selectionStart = t)
                : this.selectionStart < 0 && (this.selectionStart = 0),
                this.selectionEnd > t
                  ? (this.selectionEnd = t)
                  : this.selectionEnd < 0 && (this.selectionEnd = 0);
            },
          }),
          b.util.object.extend(b.IText.prototype, {
            initDoubleClickSimulation: function () {
              (this.__lastClickTime = +new Date()),
                (this.__lastLastClickTime = +new Date()),
                (this.__lastPointer = {}),
                this.on("mousedown", this.onMouseDown);
            },
            onMouseDown: function (t) {
              if (this.canvas) {
                this.__newClickTime = +new Date();
                var e = t.pointer;
                this.isTripleClick(e) &&
                  (this.fire("tripleclick", t), this._stopEvent(t.e)),
                  (this.__lastLastClickTime = this.__lastClickTime),
                  (this.__lastClickTime = this.__newClickTime),
                  (this.__lastPointer = e),
                  (this.__lastIsEditing = this.isEditing),
                  (this.__lastSelected = this.selected);
              }
            },
            isTripleClick: function (t) {
              return (
                this.__newClickTime - this.__lastClickTime < 500 &&
                this.__lastClickTime - this.__lastLastClickTime < 500 &&
                this.__lastPointer.x === t.x &&
                this.__lastPointer.y === t.y
              );
            },
            _stopEvent: function (t) {
              t.preventDefault && t.preventDefault(),
                t.stopPropagation && t.stopPropagation();
            },
            initCursorSelectionHandlers: function () {
              this.initMousedownHandler(),
                this.initMouseupHandler(),
                this.initClicks();
            },
            doubleClickHandler: function (t) {
              this.isEditing &&
                this.selectWord(this.getSelectionStartFromPointer(t.e));
            },
            tripleClickHandler: function (t) {
              this.isEditing &&
                this.selectLine(this.getSelectionStartFromPointer(t.e));
            },
            initClicks: function () {
              this.on("mousedblclick", this.doubleClickHandler),
                this.on("tripleclick", this.tripleClickHandler);
            },
            _mouseDownHandler: function (t) {
              !this.canvas ||
                !this.editable ||
                (t.e.button && 1 !== t.e.button) ||
                ((this.__isMousedown = !0),
                this.selected && this.setCursorByClick(t.e),
                this.isEditing &&
                  ((this.__selectionStartOnMouseDown = this.selectionStart),
                  this.selectionStart === this.selectionEnd &&
                    this.abortCursorAnimation(),
                  this.renderCursorOrSelection()));
            },
            _mouseDownHandlerBefore: function (t) {
              !this.canvas ||
                !this.editable ||
                (t.e.button && 1 !== t.e.button) ||
                (this.selected = this === this.canvas._activeObject);
            },
            initMousedownHandler: function () {
              this.on("mousedown", this._mouseDownHandler),
                this.on("mousedown:before", this._mouseDownHandlerBefore);
            },
            initMouseupHandler: function () {
              this.on("mouseup", this.mouseUpHandler);
            },
            mouseUpHandler: function (t) {
              if (
                ((this.__isMousedown = !1),
                !(
                  !this.editable ||
                  this.group ||
                  (t.transform && t.transform.actionPerformed) ||
                  (t.e.button && 1 !== t.e.button)
                ))
              ) {
                if (this.canvas) {
                  var e = this.canvas._activeObject;
                  if (e && e !== this) return;
                }
                this.__lastSelected && !this.__corner
                  ? ((this.selected = !1),
                    (this.__lastSelected = !1),
                    this.enterEditing(t.e),
                    this.selectionStart === this.selectionEnd
                      ? this.initDelayedCursor(!0)
                      : this.renderCursorOrSelection())
                  : (this.selected = !0);
              }
            },
            setCursorByClick: function (t) {
              var e = this.getSelectionStartFromPointer(t),
                i = this.selectionStart,
                n = this.selectionEnd;
              t.shiftKey
                ? this.setSelectionStartEndWithShift(i, n, e)
                : ((this.selectionStart = e), (this.selectionEnd = e)),
                this.isEditing &&
                  (this._fireSelectionChanged(), this._updateTextarea());
            },
            getSelectionStartFromPointer: function (t) {
              for (
                var e = this.getLocalPointer(t),
                  i = 0,
                  n = 0,
                  r = 0,
                  s = 0,
                  o = 0,
                  a = 0,
                  h = this._textLines.length;
                a < h && r <= e.y;
                a++
              )
                (r += this.getHeightOfLine(a) * this.scaleY),
                  (o = a),
                  a > 0 &&
                    (s +=
                      this._textLines[a - 1].length +
                      this.missingNewlineOffset(a - 1));
              n = this._getLineLeftOffset(o) * this.scaleX;
              for (
                var c = 0, l = this._textLines[o].length;
                c < l &&
                ((i = n),
                (n += this.__charBounds[o][c].kernedWidth * this.scaleX) <=
                  e.x);
                c++
              )
                s++;
              return this._getNewSelectionStartFromOffset(e, i, n, s, l);
            },
            _getNewSelectionStartFromOffset: function (t, e, i, n, r) {
              var s = t.x - e,
                o = i - t.x,
                a = n + (o > s || o < 0 ? 0 : 1);
              return (
                this.flipX && (a = r - a),
                a > this._text.length && (a = this._text.length),
                a
              );
            },
          }),
          b.util.object.extend(b.IText.prototype, {
            initHiddenTextarea: function () {
              (this.hiddenTextarea = b.document.createElement("textarea")),
                this.hiddenTextarea.setAttribute("autocapitalize", "off"),
                this.hiddenTextarea.setAttribute("autocorrect", "off"),
                this.hiddenTextarea.setAttribute("autocomplete", "off"),
                this.hiddenTextarea.setAttribute("spellcheck", "false"),
                this.hiddenTextarea.setAttribute(
                  "data-fabric-hiddentextarea",
                  ""
                ),
                this.hiddenTextarea.setAttribute("wrap", "off");
              var t = this._calcTextareaPosition();
              (this.hiddenTextarea.style.cssText =
                "position: absolute; top: " +
                t.top +
                "; left: " +
                t.left +
                "; z-index: -999; opacity: 0; width: 1px; height: 1px; font-size: 1px; paddingｰtop: " +
                t.fontSize +
                ";"),
                b.document.body.appendChild(this.hiddenTextarea),
                b.util.addListener(
                  this.hiddenTextarea,
                  "keydown",
                  this.onKeyDown.bind(this)
                ),
                b.util.addListener(
                  this.hiddenTextarea,
                  "keyup",
                  this.onKeyUp.bind(this)
                ),
                b.util.addListener(
                  this.hiddenTextarea,
                  "input",
                  this.onInput.bind(this)
                ),
                b.util.addListener(
                  this.hiddenTextarea,
                  "copy",
                  this.copy.bind(this)
                ),
                b.util.addListener(
                  this.hiddenTextarea,
                  "cut",
                  this.copy.bind(this)
                ),
                b.util.addListener(
                  this.hiddenTextarea,
                  "paste",
                  this.paste.bind(this)
                ),
                b.util.addListener(
                  this.hiddenTextarea,
                  "compositionstart",
                  this.onCompositionStart.bind(this)
                ),
                b.util.addListener(
                  this.hiddenTextarea,
                  "compositionupdate",
                  this.onCompositionUpdate.bind(this)
                ),
                b.util.addListener(
                  this.hiddenTextarea,
                  "compositionend",
                  this.onCompositionEnd.bind(this)
                ),
                !this._clickHandlerInitialized &&
                  this.canvas &&
                  (b.util.addListener(
                    this.canvas.upperCanvasEl,
                    "click",
                    this.onClick.bind(this)
                  ),
                  (this._clickHandlerInitialized = !0));
            },
            keysMap: {
              9: "exitEditing",
              27: "exitEditing",
              33: "moveCursorUp",
              34: "moveCursorDown",
              35: "moveCursorRight",
              36: "moveCursorLeft",
              37: "moveCursorLeft",
              38: "moveCursorUp",
              39: "moveCursorRight",
              40: "moveCursorDown",
            },
            ctrlKeysMapUp: { 67: "copy", 88: "cut" },
            ctrlKeysMapDown: { 65: "selectAll" },
            onClick: function () {
              this.hiddenTextarea && this.hiddenTextarea.focus();
            },
            onKeyDown: function (t) {
              if (this.isEditing && !this.inCompositionMode) {
                if (t.keyCode in this.keysMap) this[this.keysMap[t.keyCode]](t);
                else {
                  if (
                    !(t.keyCode in this.ctrlKeysMapDown) ||
                    (!t.ctrlKey && !t.metaKey)
                  )
                    return;
                  this[this.ctrlKeysMapDown[t.keyCode]](t);
                }
                t.stopImmediatePropagation(),
                  t.preventDefault(),
                  t.keyCode >= 33 && t.keyCode <= 40
                    ? (this.clearContextTop(), this.renderCursorOrSelection())
                    : this.canvas && this.canvas.requestRenderAll();
              }
            },
            onKeyUp: function (t) {
              !this.isEditing || this._copyDone || this.inCompositionMode
                ? (this._copyDone = !1)
                : t.keyCode in this.ctrlKeysMapUp &&
                  (t.ctrlKey || t.metaKey) &&
                  (this[this.ctrlKeysMapUp[t.keyCode]](t),
                  t.stopImmediatePropagation(),
                  t.preventDefault(),
                  this.canvas && this.canvas.requestRenderAll());
            },
            onInput: function (t) {
              var e = this.fromPaste;
              if (
                ((this.fromPaste = !1),
                t && t.stopPropagation(),
                this.isEditing)
              ) {
                var i,
                  n,
                  r = this._splitTextIntoLines(
                    this.hiddenTextarea.value
                  ).graphemeText,
                  s = this._text.length,
                  o = r.length,
                  a = o - s;
                if ("" === this.hiddenTextarea.value)
                  return (
                    (this.styles = {}),
                    this.updateFromTextArea(),
                    this.fire("changed"),
                    void (
                      this.canvas &&
                      (this.canvas.fire("text:changed", { target: this }),
                      this.canvas.requestRenderAll())
                    )
                  );
                var h = this.fromStringToGraphemeSelection(
                    this.hiddenTextarea.selectionStart,
                    this.hiddenTextarea.selectionEnd,
                    this.hiddenTextarea.value
                  ),
                  c = this.selectionStart > h.selectionStart;
                this.selectionStart !== this.selectionEnd
                  ? ((i = this._text.slice(
                      this.selectionStart,
                      this.selectionEnd
                    )),
                    (a += this.selectionEnd - this.selectionStart))
                  : o < s &&
                    (i = c
                      ? this._text.slice(
                          this.selectionEnd + a,
                          this.selectionEnd
                        )
                      : this._text.slice(
                          this.selectionStart,
                          this.selectionStart - a
                        )),
                  (n = r.slice(h.selectionEnd - a, h.selectionEnd)),
                  i &&
                    i.length &&
                    (this.selectionStart !== this.selectionEnd
                      ? this.removeStyleFromTo(
                          this.selectionStart,
                          this.selectionEnd
                        )
                      : c
                      ? this.removeStyleFromTo(
                          this.selectionEnd - i.length,
                          this.selectionEnd
                        )
                      : this.removeStyleFromTo(
                          this.selectionEnd,
                          this.selectionEnd + i.length
                        )),
                  n.length &&
                    (e &&
                    n.join("") === b.copiedText &&
                    !b.disableStyleCopyPaste
                      ? this.insertNewStyleBlock(
                          n,
                          this.selectionStart,
                          b.copiedTextStyle
                        )
                      : this.insertNewStyleBlock(n, this.selectionStart)),
                  this.updateFromTextArea(),
                  this.fire("changed"),
                  this.canvas &&
                    (this.canvas.fire("text:changed", { target: this }),
                    this.canvas.requestRenderAll());
              }
            },
            onCompositionStart: function () {
              this.inCompositionMode = !0;
            },
            onCompositionEnd: function () {
              this.inCompositionMode = !1;
            },
            onCompositionUpdate: function (t) {
              (this.compositionStart = t.target.selectionStart),
                (this.compositionEnd = t.target.selectionEnd),
                this.updateTextareaPosition();
            },
            copy: function () {
              this.selectionStart !== this.selectionEnd &&
                ((b.copiedText = this.getSelectedText()),
                b.disableStyleCopyPaste
                  ? (b.copiedTextStyle = null)
                  : (b.copiedTextStyle = this.getSelectionStyles(
                      this.selectionStart,
                      this.selectionEnd,
                      !0
                    )),
                (this._copyDone = !0));
            },
            paste: function () {
              this.fromPaste = !0;
            },
            _getClipboardData: function (t) {
              return (t && t.clipboardData) || b.window.clipboardData;
            },
            _getWidthBeforeCursor: function (t, e) {
              var i,
                n = this._getLineLeftOffset(t);
              return (
                e > 0 &&
                  (n += (i = this.__charBounds[t][e - 1]).left + i.width),
                n
              );
            },
            getDownCursorOffset: function (t, e) {
              var i = this._getSelectionForOffset(t, e),
                n = this.get2DCursorLocation(i),
                r = n.lineIndex;
              if (
                r === this._textLines.length - 1 ||
                t.metaKey ||
                34 === t.keyCode
              )
                return this._text.length - i;
              var s = n.charIndex,
                o = this._getWidthBeforeCursor(r, s),
                a = this._getIndexOnLine(r + 1, o);
              return (
                this._textLines[r].slice(s).length +
                a +
                1 +
                this.missingNewlineOffset(r)
              );
            },
            _getSelectionForOffset: function (t, e) {
              return t.shiftKey &&
                this.selectionStart !== this.selectionEnd &&
                e
                ? this.selectionEnd
                : this.selectionStart;
            },
            getUpCursorOffset: function (t, e) {
              var i = this._getSelectionForOffset(t, e),
                n = this.get2DCursorLocation(i),
                r = n.lineIndex;
              if (0 === r || t.metaKey || 33 === t.keyCode) return -i;
              var s = n.charIndex,
                o = this._getWidthBeforeCursor(r, s),
                a = this._getIndexOnLine(r - 1, o),
                h = this._textLines[r].slice(0, s),
                c = this.missingNewlineOffset(r - 1);
              return -this._textLines[r - 1].length + a - h.length + (1 - c);
            },
            _getIndexOnLine: function (t, e) {
              for (
                var i,
                  n,
                  r = this._textLines[t],
                  s = this._getLineLeftOffset(t),
                  o = 0,
                  a = 0,
                  h = r.length;
                a < h;
                a++
              )
                if ((s += i = this.__charBounds[t][a].width) > e) {
                  n = !0;
                  var c = s - i,
                    l = s,
                    u = Math.abs(c - e);
                  o = Math.abs(l - e) < u ? a : a - 1;
                  break;
                }
              return n || (o = r.length - 1), o;
            },
            moveCursorDown: function (t) {
              (this.selectionStart >= this._text.length &&
                this.selectionEnd >= this._text.length) ||
                this._moveCursorUpOrDown("Down", t);
            },
            moveCursorUp: function (t) {
              (0 === this.selectionStart && 0 === this.selectionEnd) ||
                this._moveCursorUpOrDown("Up", t);
            },
            _moveCursorUpOrDown: function (t, e) {
              var i = this["get" + t + "CursorOffset"](
                e,
                "right" === this._selectionDirection
              );
              e.shiftKey
                ? this.moveCursorWithShift(i)
                : this.moveCursorWithoutShift(i),
                0 !== i &&
                  (this.setSelectionInBoundaries(),
                  this.abortCursorAnimation(),
                  (this._currentCursorOpacity = 1),
                  this.initDelayedCursor(),
                  this._fireSelectionChanged(),
                  this._updateTextarea());
            },
            moveCursorWithShift: function (t) {
              var e =
                "left" === this._selectionDirection
                  ? this.selectionStart + t
                  : this.selectionEnd + t;
              return (
                this.setSelectionStartEndWithShift(
                  this.selectionStart,
                  this.selectionEnd,
                  e
                ),
                0 !== t
              );
            },
            moveCursorWithoutShift: function (t) {
              return (
                t < 0
                  ? ((this.selectionStart += t),
                    (this.selectionEnd = this.selectionStart))
                  : ((this.selectionEnd += t),
                    (this.selectionStart = this.selectionEnd)),
                0 !== t
              );
            },
            moveCursorLeft: function (t) {
              (0 === this.selectionStart && 0 === this.selectionEnd) ||
                this._moveCursorLeftOrRight("Left", t);
            },
            _move: function (t, e, i) {
              var n;
              if (t.altKey) n = this["findWordBoundary" + i](this[e]);
              else {
                if (!t.metaKey && 35 !== t.keyCode && 36 !== t.keyCode)
                  return (this[e] += "Left" === i ? -1 : 1), !0;
                n = this["findLineBoundary" + i](this[e]);
              }
              if (void 0 !== typeof n && this[e] !== n)
                return (this[e] = n), !0;
            },
            _moveLeft: function (t, e) {
              return this._move(t, e, "Left");
            },
            _moveRight: function (t, e) {
              return this._move(t, e, "Right");
            },
            moveCursorLeftWithoutShift: function (t) {
              var e = !0;
              return (
                (this._selectionDirection = "left"),
                this.selectionEnd === this.selectionStart &&
                  0 !== this.selectionStart &&
                  (e = this._moveLeft(t, "selectionStart")),
                (this.selectionEnd = this.selectionStart),
                e
              );
            },
            moveCursorLeftWithShift: function (t) {
              return "right" === this._selectionDirection &&
                this.selectionStart !== this.selectionEnd
                ? this._moveLeft(t, "selectionEnd")
                : 0 !== this.selectionStart
                ? ((this._selectionDirection = "left"),
                  this._moveLeft(t, "selectionStart"))
                : void 0;
            },
            moveCursorRight: function (t) {
              (this.selectionStart >= this._text.length &&
                this.selectionEnd >= this._text.length) ||
                this._moveCursorLeftOrRight("Right", t);
            },
            _moveCursorLeftOrRight: function (t, e) {
              var i = "moveCursor" + t + "With";
              (this._currentCursorOpacity = 1),
                e.shiftKey ? (i += "Shift") : (i += "outShift"),
                this[i](e) &&
                  (this.abortCursorAnimation(),
                  this.initDelayedCursor(),
                  this._fireSelectionChanged(),
                  this._updateTextarea());
            },
            moveCursorRightWithShift: function (t) {
              return "left" === this._selectionDirection &&
                this.selectionStart !== this.selectionEnd
                ? this._moveRight(t, "selectionStart")
                : this.selectionEnd !== this._text.length
                ? ((this._selectionDirection = "right"),
                  this._moveRight(t, "selectionEnd"))
                : void 0;
            },
            moveCursorRightWithoutShift: function (t) {
              var e = !0;
              return (
                (this._selectionDirection = "right"),
                this.selectionStart === this.selectionEnd
                  ? ((e = this._moveRight(t, "selectionStart")),
                    (this.selectionEnd = this.selectionStart))
                  : (this.selectionStart = this.selectionEnd),
                e
              );
            },
            removeChars: function (t, e) {
              void 0 === e && (e = t + 1),
                this.removeStyleFromTo(t, e),
                this._text.splice(t, e - t),
                (this.text = this._text.join("")),
                this.set("dirty", !0),
                this._shouldClearDimensionCache() &&
                  (this.initDimensions(), this.setCoords()),
                this._removeExtraneousStyles();
            },
            insertChars: function (t, e, i, n) {
              void 0 === n && (n = i), n > i && this.removeStyleFromTo(i, n);
              var r = b.util.string.graphemeSplit(t);
              this.insertNewStyleBlock(r, i, e),
                (this._text = [].concat(
                  this._text.slice(0, i),
                  r,
                  this._text.slice(n)
                )),
                (this.text = this._text.join("")),
                this.set("dirty", !0),
                this._shouldClearDimensionCache() &&
                  (this.initDimensions(), this.setCoords()),
                this._removeExtraneousStyles();
            },
          }),
          (y = b.util.toFixed),
          (M = /  +/g),
          b.util.object.extend(b.Text.prototype, {
            _toSVG: function () {
              var t = this._getSVGLeftTopOffsets(),
                e = this._getSVGTextAndBg(t.textTop, t.textLeft);
              return this._wrapSVGTextAndBg(e);
            },
            toSVG: function (t) {
              return this._createBaseSVGMarkup(this._toSVG(), {
                reviver: t,
                noStyle: !0,
                withShadow: !0,
              });
            },
            _getSVGLeftTopOffsets: function () {
              return {
                textLeft: -this.width / 2,
                textTop: -this.height / 2,
                lineTop: this.getHeightOfLine(0),
              };
            },
            _wrapSVGTextAndBg: function (t) {
              var e = this.getSvgTextDecoration(this);
              return [
                t.textBgRects.join(""),
                '\t\t<text xml:space="preserve" ',
                this.fontFamily
                  ? 'font-family="' + this.fontFamily.replace(/"/g, "'") + '" '
                  : "",
                this.fontSize ? 'font-size="' + this.fontSize + '" ' : "",
                this.fontStyle ? 'font-style="' + this.fontStyle + '" ' : "",
                this.fontWeight ? 'font-weight="' + this.fontWeight + '" ' : "",
                e ? 'text-decoration="' + e + '" ' : "",
                'style="',
                this.getSvgStyles(!0),
                '"',
                this.addPaintOrder(),
                " >",
                t.textSpans.join(""),
                "</text>\n",
              ];
            },
            _getSVGTextAndBg: function (t, e) {
              var i,
                n = [],
                r = [],
                s = t;
              this._setSVGBg(r);
              for (var o = 0, a = this._textLines.length; o < a; o++)
                (i = this._getLineLeftOffset(o)),
                  (this.textBackgroundColor ||
                    this.styleHas("textBackgroundColor", o)) &&
                    this._setSVGTextLineBg(r, o, e + i, s),
                  this._setSVGTextLineText(n, o, e + i, s),
                  (s += this.getHeightOfLine(o));
              return { textSpans: n, textBgRects: r };
            },
            _createTextCharSpan: function (t, e, i, n) {
              var r = t !== t.trim() || t.match(M),
                s = this.getSvgSpanStyles(e, r),
                o = s ? 'style="' + s + '"' : "",
                a = e.deltaY,
                h = "",
                c = b.Object.NUM_FRACTION_DIGITS;
              return (
                a && (h = ' dy="' + y(a, c) + '" '),
                [
                  '<tspan x="',
                  y(i, c),
                  '" y="',
                  y(n, c),
                  '" ',
                  h,
                  o,
                  ">",
                  b.util.string.escapeXml(t),
                  "</tspan>",
                ].join("")
              );
            },
            _setSVGTextLineText: function (t, e, i, n) {
              var r,
                s,
                o,
                a,
                h,
                c = this.getHeightOfLine(e),
                l = -1 !== this.textAlign.indexOf("justify"),
                u = "",
                g = 0,
                f = this._textLines[e];
              n += (c * (1 - this._fontSizeFraction)) / this.lineHeight;
              for (var d = 0, p = f.length - 1; d <= p; d++)
                (h = d === p || this.charSpacing),
                  (u += f[d]),
                  (o = this.__charBounds[e][d]),
                  0 === g
                    ? ((i += o.kernedWidth - o.width), (g += o.width))
                    : (g += o.kernedWidth),
                  l && !h && this._reSpaceAndTab.test(f[d]) && (h = !0),
                  h ||
                    ((r = r || this.getCompleteStyleDeclaration(e, d)),
                    (s = this.getCompleteStyleDeclaration(e, d + 1)),
                    (h = this._hasStyleChangedForSvg(r, s))),
                  h &&
                    ((a = this._getStyleDeclaration(e, d) || {}),
                    t.push(this._createTextCharSpan(u, a, i, n)),
                    (u = ""),
                    (r = s),
                    (i += g),
                    (g = 0));
            },
            _pushTextBgRect: function (t, e, i, n, r, s) {
              var o = b.Object.NUM_FRACTION_DIGITS;
              t.push(
                "\t\t<rect ",
                this._getFillAttributes(e),
                ' x="',
                y(i, o),
                '" y="',
                y(n, o),
                '" width="',
                y(r, o),
                '" height="',
                y(s, o),
                '"></rect>\n'
              );
            },
            _setSVGTextLineBg: function (t, e, i, n) {
              for (
                var r,
                  s,
                  o = this._textLines[e],
                  a = this.getHeightOfLine(e) / this.lineHeight,
                  h = 0,
                  c = 0,
                  l = this.getValueOfPropertyAt(e, 0, "textBackgroundColor"),
                  u = 0,
                  g = o.length;
                u < g;
                u++
              )
                (r = this.__charBounds[e][u]),
                  (s = this.getValueOfPropertyAt(
                    e,
                    u,
                    "textBackgroundColor"
                  )) !== l
                    ? (l && this._pushTextBgRect(t, l, i + c, n, h, a),
                      (c = r.left),
                      (h = r.width),
                      (l = s))
                    : (h += r.kernedWidth);
              s && this._pushTextBgRect(t, s, i + c, n, h, a);
            },
            _getFillAttributes: function (t) {
              var e = t && "string" == typeof t ? new b.Color(t) : "";
              return e && e.getSource() && 1 !== e.getAlpha()
                ? 'opacity="' +
                    e.getAlpha() +
                    '" fill="' +
                    e.setAlpha(1).toRgb() +
                    '"'
                : 'fill="' + t + '"';
            },
            _getSVGLineTopOffset: function (t) {
              for (var e, i = 0, n = 0; n < t; n++)
                i += this.getHeightOfLine(n);
              return (
                (e = this.getHeightOfLine(n)),
                {
                  lineTop: i,
                  offset:
                    ((this._fontSizeMult - this._fontSizeFraction) * e) /
                    (this.lineHeight * this._fontSizeMult),
                }
              );
            },
            getSvgStyles: function (t) {
              return (
                b.Object.prototype.getSvgStyles.call(this, t) +
                " white-space: pre;"
              );
            },
          }),
          (function (t) {
            "use strict";
            var e = t.fabric || (t.fabric = {});
            (e.Textbox = e.util.createClass(e.IText, e.Observable, {
              type: "textbox",
              minWidth: 20,
              dynamicMinWidth: 2,
              __cachedLines: null,
              lockScalingFlip: !0,
              noScaleCache: !1,
              _dimensionAffectingProps:
                e.Text.prototype._dimensionAffectingProps.concat("width"),
              _wordJoiners: /[ \t\r]/,
              splitByGrapheme: !1,
              initDimensions: function () {
                this.__skipDimension ||
                  (this.isEditing && this.initDelayedCursor(),
                  this.clearContextTop(),
                  this._clearCache(),
                  (this.dynamicMinWidth = 0),
                  (this._styleMap = this._generateStyleMap(this._splitText())),
                  this.dynamicMinWidth > this.width &&
                    this._set("width", this.dynamicMinWidth),
                  -1 !== this.textAlign.indexOf("justify") &&
                    this.enlargeSpaces(),
                  (this.height = this.calcTextHeight()),
                  this.saveState({ propertySet: "_dimensionAffectingProps" }));
              },
              _generateStyleMap: function (t) {
                for (
                  var e = 0, i = 0, n = 0, r = {}, s = 0;
                  s < t.graphemeLines.length;
                  s++
                )
                  "\n" === t.graphemeText[n] && s > 0
                    ? ((i = 0), n++, e++)
                    : !this.splitByGrapheme &&
                      this._reSpaceAndTab.test(t.graphemeText[n]) &&
                      s > 0 &&
                      (i++, n++),
                    (r[s] = { line: e, offset: i }),
                    (n += t.graphemeLines[s].length),
                    (i += t.graphemeLines[s].length);
                return r;
              },
              styleHas: function (t, i) {
                if (this._styleMap && !this.isWrapping) {
                  var n = this._styleMap[i];
                  n && (i = n.line);
                }
                return e.Text.prototype.styleHas.call(this, t, i);
              },
              isEmptyStyles: function (t) {
                if (!this.styles) return !0;
                var e,
                  i,
                  n = 0,
                  r = !1,
                  s = this._styleMap[t],
                  o = this._styleMap[t + 1];
                for (var a in (s && ((t = s.line), (n = s.offset)),
                o && ((r = o.line === t), (e = o.offset)),
                (i = void 0 === t ? this.styles : { line: this.styles[t] })))
                  for (var h in i[a])
                    if (h >= n && (!r || h < e))
                      for (var c in i[a][h]) return !1;
                return !0;
              },
              _getStyleDeclaration: function (t, e) {
                if (this._styleMap && !this.isWrapping) {
                  var i = this._styleMap[t];
                  if (!i) return null;
                  (t = i.line), (e = i.offset + e);
                }
                return this.callSuper("_getStyleDeclaration", t, e);
              },
              _setStyleDeclaration: function (t, e, i) {
                var n = this._styleMap[t];
                (t = n.line), (e = n.offset + e), (this.styles[t][e] = i);
              },
              _deleteStyleDeclaration: function (t, e) {
                var i = this._styleMap[t];
                (t = i.line), (e = i.offset + e), delete this.styles[t][e];
              },
              _getLineStyle: function (t) {
                var e = this._styleMap[t];
                return !!this.styles[e.line];
              },
              _setLineStyle: function (t) {
                var e = this._styleMap[t];
                this.styles[e.line] = {};
              },
              _wrapText: function (t, e) {
                var i,
                  n = [];
                for (this.isWrapping = !0, i = 0; i < t.length; i++)
                  n = n.concat(this._wrapLine(t[i], i, e));
                return (this.isWrapping = !1), n;
              },
              _measureWord: function (t, e, i) {
                var n,
                  r = 0;
                i = i || 0;
                for (var s = 0, o = t.length; s < o; s++) {
                  (r += this._getGraphemeBox(
                    t[s],
                    e,
                    s + i,
                    n,
                    !0
                  ).kernedWidth),
                    (n = t[s]);
                }
                return r;
              },
              _wrapLine: function (t, i, n, r) {
                var s = 0,
                  o = this.splitByGrapheme,
                  a = [],
                  h = [],
                  c = o
                    ? e.util.string.graphemeSplit(t)
                    : t.split(this._wordJoiners),
                  l = "",
                  u = 0,
                  g = o ? "" : " ",
                  f = 0,
                  d = 0,
                  p = 0,
                  C = !0,
                  A = o ? 0 : this._getWidthOfCharSpacing();
                r = r || 0;
                0 === c.length && c.push([]), (n -= r);
                for (var v = 0; v < c.length; v++)
                  (l = o ? c[v] : e.util.string.graphemeSplit(c[v])),
                    (f = this._measureWord(l, i, u)),
                    (u += l.length),
                    (s += d + f - A) >= n && !C
                      ? (a.push(h), (h = []), (s = f), (C = !0))
                      : (s += A),
                    C || o || h.push(g),
                    (h = h.concat(l)),
                    (d = this._measureWord([g], i, u)),
                    u++,
                    (C = !1),
                    f > p && (p = f);
                return (
                  v && a.push(h),
                  p + r > this.dynamicMinWidth &&
                    (this.dynamicMinWidth = p - A + r),
                  a
                );
              },
              isEndOfWrapping: function (t) {
                return (
                  !this._styleMap[t + 1] ||
                  this._styleMap[t + 1].line !== this._styleMap[t].line
                );
              },
              missingNewlineOffset: function (t) {
                return this.splitByGrapheme
                  ? this.isEndOfWrapping(t)
                    ? 1
                    : 0
                  : 1;
              },
              _splitTextIntoLines: function (t) {
                for (
                  var i = e.Text.prototype._splitTextIntoLines.call(this, t),
                    n = this._wrapText(i.lines, this.width),
                    r = new Array(n.length),
                    s = 0;
                  s < n.length;
                  s++
                )
                  r[s] = n[s].join("");
                return (i.lines = r), (i.graphemeLines = n), i;
              },
              getMinWidth: function () {
                return Math.max(this.minWidth, this.dynamicMinWidth);
              },
              _removeExtraneousStyles: function () {
                var t = {};
                for (var e in this._styleMap)
                  this._textLines[e] && (t[this._styleMap[e].line] = 1);
                for (var e in this.styles) t[e] || delete this.styles[e];
              },
              toObject: function (t) {
                return this.callSuper(
                  "toObject",
                  ["minWidth", "splitByGrapheme"].concat(t)
                );
              },
            })),
              (e.Textbox.fromObject = function (t, i) {
                return e.Object._fromObject("Textbox", t, i, "text");
              });
          })(e);
      }).call(this, i(15).Buffer);
    },
    function (t, e, i) {
      var n = i(1);
      function r(t, e, i, r) {
        (this.ui = e),
          (this.dt = i),
          (this.name = t.name),
          (this.palette = t.palette),
          (this.onInit = t.onInit),
          (this._locked = !1),
          (this.icon = t.icon && t.icon.default),
          (this.$element = n("<div>")
            .addClass("dt-btn")
            .addClass(t.classes)
            .addClass(r)
            .attr("title", t.tooltip)
            .appendTo(e.getPalette(t.palette).$element)),
          this.icon
            ? (this.$icon = n("<img>")
                .attr("src", this.icon)
                .addClass("icon")
                .appendTo(this.$element))
            : (this.$label = n("<span>").text(t.label).appendTo(this.$element)),
          t.onClick &&
            this.$element.on(
              "mousedown touchstart",
              function (n) {
                this._locked ||
                  (t.onClick.call(this, n, e, i), n.preventDefault());
              }.bind(this)
            ),
          t.onLongPress &&
            this.$element.longPress(
              function (n) {
                this._locked ||
                  (t.onLongPress.call(this, n, e, i), n.preventDefault());
              }.bind(this)
            ),
          t.onStateChange &&
            i.on(
              "state:changed",
              function (e) {
                t.onStateChange.call(this, e);
              }.bind(this)
            ),
          t.onToolChange &&
            i.on(
              "tool:changed",
              function (e) {
                t.onToolChange.call(this, e);
              }.bind(this)
            ),
          t.onStampChange &&
            i.on(
              "stamp:changed",
              function (e) {
                t.onStampChange.call(this, e);
              }.bind(this)
            ),
          t.activatesTool &&
            (this.$element.on(
              "mousedown touchstart",
              function (e) {
                this._locked ||
                  (i.chooseTool(t.activatesTool), e.preventDefault());
              }.bind(this)
            ),
            i.on(
              "tool:changed",
              function (e) {
                e === t.activatesTool
                  ? this.$element.addClass("dt-active")
                  : this.$element.removeClass("dt-active");
              }.bind(this)
            )),
          t.reflectsTools &&
            i.on(
              "tool:changed",
              function (i) {
                -1 !== t.reflectsTools.indexOf(i)
                  ? (this.setActive(!0), this.setIcon(e.getButton(i)))
                  : (this.setActive(!1),
                    this.$element.removeClass("dt-active"));
              }.bind(this)
            );
      }
      i(34),
        (r.prototype.setIcon = function (t) {
          t.icon && this.$icon
            ? this.$icon.attr("src", t.icon)
            : this.$label.text(t.label);
        }),
        (r.prototype.click = function () {
          this.$element.triggerHandler("mousedown");
        }),
        (r.prototype.setActive = function (t) {
          t
            ? this.$element.addClass("dt-active")
            : this.$element.removeClass("dt-active");
        }),
        (r.prototype.setLocked = function (t) {
          t
            ? this.$element.addClass("dt-locked")
            : this.$element.removeClass("dt-locked"),
            (this._locked = t);
        }),
        (t.exports = r);
    },
    function (t, e, i) {
      var n = i(0),
        r = i(5);
      i(6);
      function s(t, e) {
        r.call(this, t, e);
        var i = this;
        this.addEventListener("mouse:down", function (t) {
          i.mouseDown(t);
        }),
          this.addEventListener("mouse:move", function (t) {
            i.mouseMove(t);
          }),
          this.addEventListener("mouse:up", function (t) {
            i.mouseUp(t);
          }),
          (this.down = !1),
          (this._firstAction = !1),
          (this._locked = !0);
      }
      n(s, r),
        (s.prototype.minSize = 7),
        (s.prototype.defSize = 30),
        (s.prototype.activate = function (t) {
          s.super.activate.call(this),
            (this.down = !1),
            (this.canvas.defaultCursor = "crosshair"),
            t || this.master.clearSelection();
        }),
        (s.prototype.activateAgain = function () {}),
        (s.prototype.deactivate = function () {
          s.super.deactivate.call(this),
            (this.canvas.defaultCursor = "default");
        }),
        (s.prototype.exit = function () {
          (this.down = !1), this.master.changeOutOfTool();
        }),
        (s.prototype.mouseDown = function (t) {
          (this.down = !0),
            this._locked ||
              this._firstAction ||
              void 0 === t.target ||
              this.exit();
        }),
        (s.prototype.mouseMove = function (t) {}),
        (s.prototype.mouseUp = function (t) {
          this.down = !1;
        }),
        (s.prototype.actionComplete = function (t) {
          t &&
            ((t.selectable = !this._locked),
            (t.perPixelTargetFind = this.canvas._isPerPixelTargetFindAllowed)),
            this._locked ||
              (this._firstAction &&
                ((this._firstAction = !1), this._setAllObjectsSelectable(!0)));
        }),
        (s.prototype.setCentralOrigin = function (t, e) {
          var i = t.stroke ? t.strokeWidth : 0,
            n = t.left + (t.width + i) / 2,
            r = t.top + (t.height + i) / 2;
          t.set({ left: n, top: r, originX: "center", originY: "center" });
        }),
        (s.prototype.convertToPositiveDimensions = function (t) {
          return (
            t.width < 0 && ((t.left = t.left + t.width), (t.width = -t.width)),
            t.height < 0 &&
              ((t.top = t.top + t.height), (t.height = -t.height)),
            t
          );
        }),
        (s.prototype.moveObjectLeftTop = function (t) {
          var e = t.stroke ? t.strokeWidth : 0,
            i = t.left - (t.width + e) / 2,
            n = t.top - (t.height + e) / 2;
          t.set({ left: i, top: n });
        }),
        (s.prototype._setFirstActionMode = function () {
          (this._firstAction = !0), this._setAllObjectsSelectable(!1);
        }),
        (s.prototype._setAllObjectsSelectable = function (t) {
          for (var e = this.canvas.getObjects(), i = e.length - 1; i >= 0; i--)
            e[i].selectable = t;
        }),
        (t.exports = s);
    },
    function (t, e) {
      function i(t, e) {
        (this.name = t || "Tool"),
          (this.master = e),
          (this.canvas = e.canvas),
          (this.active = !1),
          (this.singleUse = !1),
          (this._listeners = []),
          (this._stateListeners = []);
      }
      (i.prototype.setActive = function (t) {
        if (!this.singleUse)
          return (
            this.active === t ||
              ((this.active = t),
              !0 === t ? this.activate() : this.deactivate()),
            t
          );
        console.warn("This is a single use tool. It was not activated.");
      }),
        (i.prototype.activate = function () {
          for (var t = 0; t < this._listeners.length; t++) {
            var e = this._listeners[t].trigger,
              i = this._listeners[t].action;
            this.canvas.on(e, i);
          }
        }),
        (i.prototype.activateAgain = function () {}),
        (i.prototype.use = function () {}),
        (i.prototype.deactivate = function () {
          for (var t = 0; t < this._listeners.length; t++) {
            var e = this._listeners[t].trigger;
            this._listeners[t].action;
            this.canvas.off(e);
          }
        }),
        (i.prototype.addEventListener = function (t, e) {
          this._listeners.push({ trigger: t, action: e });
        }),
        (i.prototype.removeEventListener = function (t) {
          for (var e = 0; e < this._listeners.length; e++)
            if (t == this._listeners[e].trigger)
              return this._listeners.splice(e, 1);
        }),
        (t.exports = i);
    },
    function (t, e) {
      t.exports = {
        dist: function (t, e) {
          var i = Math.pow(t, 2),
            n = Math.pow(e, 2);
          return Math.sqrt(i + n);
        },
      };
    },
    function (t, e, i) {
      var n = i(2).fabric,
        r = i(0),
        s = i(5),
        o = i(8),
        a = {
          cornerSize: n.isTouchSupported ? 22 : 12,
          transparentCorners: !1,
        };
      function h(t, e) {
        s.call(this, t, e),
          this.canvas.on(
            "object:selected",
            function (t) {
              t.target.set(a),
                this.canvas.renderAll(),
                this._setLastObject(t.target);
            }.bind(this)
          ),
          (this._lastObject = null),
          this.canvas.on(
            "object:added",
            function (t) {
              this._setLastObject(t.target);
            }.bind(this)
          ),
          this.canvas.on(
            "object:removed",
            function (t) {
              this._checkLastObject(t.target);
            }.bind(this)
          ),
          this.master.$element.on(
            "keydown",
            function (t) {
              65 === t.keyCode &&
                (t.ctrlKey || t.metaKey) &&
                (this.selectAll(), t.preventDefault());
            }.bind(this)
          ),
          (o.controlPointColor = "#bcd2ff"),
          (o.cornerSize = a.cornerSize);
      }
      r(h, s),
        (h.BASIC_SELECTION_PROPERTIES = a),
        (h.prototype.activate = function () {
          h.super.activate.call(this),
            this.setSelectable(!0),
            this.selectLastObject(),
            n.Annotations.addAllControlPoints(this.canvas);
        }),
        (h.prototype.activateAgain = function () {
          n.Annotations.addAllControlPoints(this.canvas);
        }),
        (h.prototype.deactivate = function () {
          h.super.deactivate.call(this),
            this.setSelectable(!1),
            n.Annotations.removeAllControlPoints(this.canvas);
        }),
        (h.prototype.setSelectable = function (t) {
          this.canvas.selection = t;
          for (var e = this.canvas.getObjects(), i = e.length - 1; i >= 0; i--)
            e[i].selectable = t;
        }),
        (h.prototype.selectAll = function () {
          this.master.chooseTool("select"),
            this.master.select(this.canvas.getObjects());
        }),
        (h.prototype.selectLastObject = function () {
          this._lastObject && this.canvas.setActiveObject(this._lastObject);
        }),
        (h.prototype._setLastObject = function (t) {
          (t._dt_sourceObj && t.annotationId) || (this._lastObject = t);
        }),
        (h.prototype._checkLastObject = function (t) {
          if (t === this._lastObject) {
            var e = this.canvas.getObjects();
            this._lastObject = e[e.length - 1];
          }
        }),
        (t.exports = h);
    },
    function (t, e, i) {
      var n = i(2).fabric,
        r = ["line", "arrow"],
        s = null;
      function o(t) {
        t.lineCustomControlPointsEnabled ||
          (t.on("object:selected", function (t) {
            var e = t.target;
            s && h(s) && !a(e, s) && l.call(s),
              a(e, s) || ((s = e), h(e) && !e.annotationId && c.call(e));
          }),
          t.on("selection:cleared", function (t) {
            s && h(s) && l.call(s), (s = null);
          }),
          (t.lineCustomControlPointsEnabled = !0));
      }
      function a(t, e) {
        return (
          e &&
          e._dt_controlPoints &&
          (e._dt_controlPoints[0] === t || e._dt_controlPoints[1] === t)
        );
      }
      function h(t) {
        for (var e = 0; e < r.length; e++) if (t.type === r[e]) return !0;
        return !1;
      }
      function c() {
        this.set({ hasControls: !1, hasBorders: !1 });
        var t = o.cornerSize;
        (this._dt_controlPoints = [v(t, this, 0), v(t, this, 1)]),
          (this.hasCustomControlPoints = !0),
          p.call(this),
          this.on("moving", u),
          this.on("removed", g),
          this.canvas.renderAll();
      }
      function l() {
        (this._dt_controlPoints[0]._dt_sourceObj = null),
          (this._dt_controlPoints[1]._dt_sourceObj = null),
          this.canvas.remove(this._dt_controlPoints[1]),
          this.canvas.remove(this._dt_controlPoints[0]),
          (this._dt_controlPoints = void 0),
          (this.hasCustomControlPoints = !1),
          this.off("moving"),
          this.off("removed");
      }
      function u() {
        p.call(this);
      }
      function g() {
        this._dt_controlPoints && this._dt_controlPoints[0].remove();
      }
      function f() {
        var t = this._dt_sourceObj;
        t.set("x" + (this.id + 1), this.left),
          t.set("y" + (this.id + 1), this.top),
          t.setCoords(),
          t.canvas.renderAll();
      }
      function d() {
        var t,
          e = this._dt_sourceObj;
        e &&
          (((t =
            e._dt_controlPoints[0] !== this
              ? e._dt_controlPoints[0]
              : e._dt_controlPoints[1]).line = null),
          t.remove(),
          e.remove());
      }
      function p() {
        C.call(this),
          A.call(this),
          this._dt_controlPoints[0].set("left", this.get("x1")),
          this._dt_controlPoints[0].set("top", this.get("y1")),
          this._dt_controlPoints[1].set("left", this.get("x2")),
          this._dt_controlPoints[1].set("top", this.get("y2")),
          this._dt_controlPoints[0].setCoords(),
          this._dt_controlPoints[1].setCoords();
      }
      function C() {
        var t = this.get("x1") + 0.5 * (this.get("x2") - this.get("x1")),
          e = this.get("y1") + 0.5 * (this.get("y2") - this.get("y1")),
          i = this.left - t,
          n = this.top - e;
        this.set("x1", i + this.x1),
          this.set("y1", n + this.y1),
          this.set("x2", i + this.x2),
          this.set("y2", n + this.y2);
      }
      function A() {
        if (0 !== this.get("angle")) {
          var t = (this.get("angle") / 180) * Math.PI,
            e = this.get("left"),
            i = this.get("top"),
            n = s(this.get("x1"), this.get("y1"), e, i, t),
            r = s(this.get("x2"), this.get("y2"), e, i, t);
          this.set({ x1: n[0], y1: n[1], x2: r[0], y2: r[1], angle: 0 });
        }
        function s(t, e, i, n, r) {
          var s = Math.cos(r),
            o = Math.sin(r);
          return [s * (t - i) - o * (e - n) + i, o * (t - i) + s * (e - n) + n];
        }
      }
      function v(t, e, i) {
        var r = new n.Rect({
          width: t,
          height: t,
          strokeWidth: 0,
          stroke: o.controlPointColor,
          fill: o.controlPointColor,
          hasControls: !1,
          hasBorders: !1,
          originX: "center",
          originY: "center",
          _dt_sourceObj: e,
          id: i,
          isControlPoint: !0,
        });
        return e.canvas.add(r), r.on("moving", f), r.on("removed", d), r;
      }
      (o.controlPointColor = "#bcd2ff"), (o.cornerSize = 12), (t.exports = o);
    },
    function (t, e, i) {
      var n = i(1),
        r = i(2).fabric,
        s = i(0),
        o = i(4),
        a = (i(7), i(6)),
        h = i(8);
      function c(t, e, i, n) {
        o.call(this, t, e),
          (i = i || "line"),
          (this._lineKlass = r.util.getKlass(i)),
          (this._lineOptions = n),
          h(this.canvas);
      }
      i(24),
        s(c, o),
        (c.prototype.mouseDown = function (t) {
          if ((c.super.mouseDown.call(this, t), this.active)) {
            var e = this.canvas.getPointer(t.e),
              i = e.x,
              r = e.y;
            (this.curr = new this._lineKlass(
              [i, r, i, r],
              n.extend(
                !0,
                {
                  originX: "center",
                  originY: "center",
                  selectable: !1,
                  stroke: this.master.state.stroke,
                  strokeWidth: this.master.state.strokeWidth,
                  objectCaching: !1,
                },
                this._lineOptions
              )
            )),
              this.canvas.add(this.curr);
          }
        }),
        (c.prototype.mouseMove = function (t) {
          if ((c.super.mouseMove.call(this, t), !1 !== this.down)) {
            var e = this.canvas.getPointer(t.e),
              i = e.x,
              n = e.y;
            this.curr.set("x2", i),
              this.curr.set("y2", n),
              this.canvas.renderAll();
          }
        }),
        (c.prototype.mouseUp = function (t) {
          c.super.mouseUp.call(this, t),
            this._processNewShape(this.curr),
            this.canvas.renderAll(),
            this.actionComplete(this.curr),
            (this.curr = void 0),
            this.master.pushToHistory();
        }),
        (c.prototype._processNewShape = function (t) {
          var e = t.get("x1"),
            i = t.get("y1"),
            n = t.get("x2"),
            r = t.get("y2");
          a.dist(e - n, i - r) < this.minSize &&
            ((n = e + this.defSize),
            (r = i + this.defSize),
            t.set("x2", n),
            t.set("y2", r)),
            t.setCoords();
        }),
        (t.exports = c);
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NTUuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE4NTUuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTExLjQzIDE5LjE5NUwxMS40MyAxNy41MzQgOS4yODEgMTcuMTY1IDkuMjgxIDEuOTY0IDEzLjYzMiAxLjk2NCAxNC4wMjcgNC42MjcgMTUuOTUyIDQuNjI3IDE1Ljk1MiAwIDAgMCAwIDQuNjI3IDEuOTUxIDQuNjI3IDIuMzMzIDEuOTY0IDYuNjg0IDEuOTY0IDYuNjg0IDE3LjE2NSA0LjUzNSAxNy41MzQgNC41MzUgMTkuMTk1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NTUuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE4NTUuMDAwMDAwLCA5NDIuMDAwMDAwKSB0cmFuc2xhdGUoMTAuMDIwMDAwLCA4LjQwMDAwMCkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MDkuMDAwMDAwLCAtODkyLjAwMDAwMCkgdHJhbnNsYXRlKDE4MDkuMDAwMDAwLCA4OTIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE4IDBMMTkuNDE0IDEuNDE0IDEuNDE0IDE5LjQxNCAwIDE4eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MDkuMDAwMDAwLCAtODkyLjAwMDAwMCkgdHJhbnNsYXRlKDE4MDkuMDAwMDAwLCA4OTIuMDAwMDAwKSB0cmFuc2xhdGUoOC4yOTI4OTMsIDguMjUwMDAwKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwNDcuMDAwMDAwLCAtODkzLjAwMDAwMCkgdHJhbnNsYXRlKDIwNDcuMDAwMDAwLCA4OTMuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzU0NTQ1NCIgZD0iTTEwIDBjNS41MjMgMCAxMCA0LjQ3NyAxMCAxMHMtNC40NzcgMTAtMTAgMTBTMCAxNS41MjMgMCAxMCA0LjQ3NyAwIDEwIDB6bTAgMmMtNC40MTggMC04IDMuNTgyLTggOHMzLjU4MiA4IDggOCA4LTMuNTgyIDgtOC0zLjU4Mi04LTgtOHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDQ3LjAwMDAwMCwgLTg5My4wMDAwMDApIHRyYW5zbGF0ZSgyMDQ3LjAwMDAwMCwgODkzLjAwMDAwMCkgdHJhbnNsYXRlKDguMDAwMDAwLCA4LjAwMDAwMCkiLz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xMCAyYy00LjQxOCAwLTggMy41ODItOCA4czMuNTgyIDggOCA4IDgtMy41ODIgOC04LTMuNTgyLTgtOC04eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwNDcuMDAwMDAwLCAtODkzLjAwMDAwMCkgdHJhbnNsYXRlKDIwNDcuMDAwMDAwLCA4OTMuMDAwMDAwKSB0cmFuc2xhdGUoOC4wMDAwMDAsIDguMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      var n = i(14);
      t.exports = n;
    },
    function (t, e, i) {
      var n = i(1),
        r = i(2).fabric,
        s = i(23),
        o = i(7),
        a = i(9),
        h = i(25),
        c = i(26),
        l = i(27),
        u = i(28),
        g = i(29),
        f = i(30),
        d = i(31),
        p = i(33),
        C = i(85),
        A = i(86),
        v = i(87),
        m = i(88);
      i(89);
      var I = {
          width: 800,
          height: 603,
          parseSVG: !0,
          startWithHistoryPaused: !1,
        },
        w = { stroke: "#3f3f3f", fill: "", strokeWidth: 8, fontSize: 27 },
        y = "drawing:changed",
        M = "state:changed",
        b = "tool:changed",
        x = "stamp:changed",
        D = "undo:possible",
        _ = "undo:impossible",
        T = "redo:possible",
        S = "redo:impossible",
        O = ["lockUniScaling", "objectCaching"];
      function j(t, e, i) {
        (this.selector = t),
          (this.options = n.extend(!0, {}, I, e)),
          (this.state = n.extend(!0, {}, w, i)),
          (this._dispatch = new s({
            wildcard: !0,
            newListener: !1,
            maxListeners: 100,
            delimiter: ":",
          })),
          this._initDOM(),
          this._initFabricJS(),
          this._setDimensions(this.options.width, this.options.height),
          this._initStores(),
          this._initTools(),
          this._initStateHistory(),
          this.canvasOnly() || new p(this),
          (this.historyPaused = this.options.startWithHistoryPaused),
          v(this.canvas),
          m(this.canvas),
          this._fireStateChanged(),
          this.chooseTool("select"),
          this.pushToHistory(),
          this.options.backgroundImage &&
            this._setBackgroundImage(this.options.backgroundImage),
          e.onDrawingChanged &&
            this._dispatch.on(y, () => {
              e.onDrawingChanged();
            });
      }
      (j.prototype.ADDITIONAL_PROPS_TO_SERIALIZE = O),
        (j.prototype.proxy = function (t) {
          return (this.options.proxy && this.options.proxy(t)) || t;
        }),
        (j.prototype.clear = function (t) {
          this.canvas.clear(),
            t && this.canvas.setBackgroundImage(null),
            this.canvas.renderAll(),
            this.pushToHistory();
        }),
        (j.prototype.clearSelection = function () {
          this.canvas.discardActiveObject(), this.canvas.renderAll();
        }),
        (j.prototype.save = function () {
          var t = this.getSelection(),
            e = !1;
          t &&
            (t.hasCustomControlPoints || t.length > 0) &&
            (this.clearSelection(), (e = !0));
          var i = this.canvas.toJSON(O);
          r.Annotations && (i = r.Annotations.removeControlPointsFromJSON(i));
          var n = JSON.stringify({
            version: 1,
            dt: {
              width: this.canvas.getWidth(),
              height: this.canvas.getHeight(),
            },
            canvas: i,
          });
          return e && this.select(t), this.notifySave(n), n;
        }),
        (j.prototype.load = function (t, e, i) {
          if (!t)
            return (
              this.canvas.clear(),
              this.canvas.setBackgroundImage(null),
              this.canvas.renderAll(),
              void c.call(this)
            );
          var s = {};
          s = "string" == typeof t || t instanceof String ? JSON.parse(t) : t;
          var o = (s = A(s)).dt;
          this._setDimensions(o.width, o.height);
          var a = n.Deferred(),
            h = s.canvas;
          function c() {
            this.tools.select.activateAgain(),
              this.tools.select.setSelectable(this.tools.select.active),
              i || this.pushToHistory(),
              "function" == typeof e && e();
          }
          r.Annotations && (h = r.Annotations.disableControlsInJSON(h)),
            this.canvas.loadFromJSON(h, a.resolve.bind(a)),
            n.when(a).done(c.bind(this));
        }),
        (j.prototype.canvasOnly = function () {
          const t = this.options.buttons;
          return void 0 !== t && (null === t || 0 === t.length);
        }),
        (j.prototype.pauseHistory = function () {
          this.historyPaused = !0;
        }),
        (j.prototype.unpauseHistory = function () {
          this.historyPaused = !1;
        }),
        (j.prototype.pushToHistory = function () {
          this.historyPaused ||
            (this._history.saveState(),
            this._fireHistoryEvents(),
            this._fireDrawingChanged());
        }),
        (j.prototype.undo = function () {
          this._history.undo(() => {
            this._fireDrawingChanged();
          }),
            this._fireHistoryEvents();
        }),
        (j.prototype.redo = function () {
          this._history.redo(() => {
            this._fireDrawingChanged();
          }),
            this._fireHistoryEvents();
        }),
        (j.prototype.resetHistory = function () {
          this._history.reset(),
            this._history.saveState(),
            this._fireHistoryEvents();
        }),
        (j.prototype._fireHistoryEvents = function () {
          this._history.canUndo()
            ? this._dispatch.emit(D)
            : this._dispatch.emit(_),
            this._history.canRedo()
              ? this._dispatch.emit(T)
              : this._dispatch.emit(S);
        }),
        (j.prototype._fireDrawingChanged = function () {
          this._dispatch.emit(y);
        }),
        (j.prototype.setStrokeColor = function (t) {
          (this.state.stroke = t), this._fireStateChanged();
        }),
        (j.prototype.setStrokeWidth = function (t) {
          (this.state.strokeWidth = t), this._fireStateChanged();
        }),
        (j.prototype.setFontSize = function (t) {
          (this.state.fontSize = t), this._fireStateChanged();
        }),
        (j.prototype.setFillColor = function (t) {
          (this.state.fill = t), this._fireStateChanged();
        }),
        (j.prototype.setSelectionStrokeColor = function (t) {
          this.getSelection() &&
            (this.forEachSelectedObject(
              function (e) {
                this._setObjectProp(e, "stroke", t);
              }.bind(this)
            ),
            this.canvas.renderAll(),
            this.pushToHistory());
        }),
        (j.prototype.setSelectionFillColor = function (t) {
          this.getSelection() &&
            (this.forEachSelectedObject(
              function (e) {
                this._setObjectProp(e, "fill", t);
              }.bind(this)
            ),
            this.canvas.renderAll(),
            this.pushToHistory());
        }),
        (j.prototype.setSelectionStrokeWidth = function (t) {
          this.getSelection() &&
            (this.forEachSelectedObject(
              function (e) {
                this._setObjectProp(e, "strokeWidth", t);
              }.bind(this)
            ),
            this.canvas.renderAll(),
            this.pushToHistory());
        }),
        (j.prototype.setSelectionFontSize = function (t) {
          this.getSelection() &&
            (this.forEachSelectedObject(
              function (e) {
                "i-text" === e.type && this._setObjectProp(e, "fontSize", t);
              }.bind(this)
            ),
            this.canvas.renderAll(),
            this.pushToHistory());
        }),
        (j.prototype.sendSelectionToFront = function () {
          this.getSelection() &&
            (this._sendSelectionTo("front"), this.pushToHistory());
        }),
        (j.prototype.sendSelectionToBack = function () {
          this.getSelection() &&
            (this._sendSelectionTo("back"), this.pushToHistory());
        }),
        (j.prototype.forEachSelectedObject = function (t) {
          this.canvas.getActiveObjects().forEach(t);
        }),
        (j.prototype._setObjectProp = function (t, e, i) {
          if ("i-text" === t.type)
            if ("stroke" === e) e = "fill";
            else {
              if ("fill" === e) return;
              if ("strokeWidth" === e) return;
            }
          t.set(e, i);
        }),
        (j.prototype._sendSelectionTo = function (t) {
          this.canvas.getActiveObjects().forEach(function e(i) {
            if (i._dt_sourceObj) return void e(i._dt_sourceObj);
            "front" === t
              ? (i.bringToFront(),
                i._dt_controlPoints &&
                  i._dt_controlPoints.forEach(function (t) {
                    t.bringToFront();
                  }))
              : (i._dt_controlPoints &&
                  i._dt_controlPoints.forEach(function (t) {
                    t.sendToBack();
                  }),
                i.sendToBack());
          });
        }),
        (j.prototype.setBackgroundImage = function (t, e, i) {
          var n = "string" == typeof t ? t : t.src,
            r = "object" == typeof t ? t : null;
          this._setBackgroundImage(
            n,
            r,
            function () {
              switch (e) {
                case "resizeBackgroundToCanvas":
                  this.resizeBackgroundToCanvas();
                  break;
                case "resizeCanvasToBackground":
                  this.resizeCanvasToBackground();
                  break;
                case "shrinkBackgroundToCanvas":
                  this.shrinkBackgroundToCanvas();
              }
              this.pushToHistory(), "function" == typeof i && i();
            }.bind(this)
          );
        }),
        (j.prototype.resizeBackgroundToCanvas = function () {
          if (this.canvas.backgroundImage) {
            var t = this.canvas.backgroundImage;
            t.set({
              scaleX: this.canvas.width / t.width,
              scaleY: this.canvas.height / t.height,
            }),
              this.canvas.renderAll(),
              this.pushToHistory();
          }
        }),
        (j.prototype.shrinkBackgroundToCanvas = function () {
          if (this.canvas.backgroundImage) {
            var t = this.canvas.backgroundImage,
              e = this.canvas.width / t.width,
              i = this.canvas.height / t.height,
              n = Math.min(e, i);
            n < 1 &&
              (t.set({ scaleX: n, scaleY: n }),
              this.canvas.renderAll(),
              this.pushToHistory());
          }
        }),
        (j.prototype.resizeCanvasToBackground = function () {
          if (this.canvas.backgroundImage) {
            var t = this.canvas.backgroundImage;
            this._setDimensions(t.width, t.height),
              t.set({ scaleX: 1, scaleY: 1 }),
              "center" === t.originX &&
                t.set({
                  top: this.canvas.height / 2,
                  left: this.canvas.width / 2,
                }),
              this.canvas.renderAll(),
              this.pushToHistory();
          }
        }),
        (j.prototype.setDimensions = function (t, e) {
          this._setDimensions(t, e), this.pushToHistory();
        }),
        (j.prototype.calcOffset = function () {
          this.canvas.calcOffset();
        }),
        (j.prototype.chooseTool = function (t) {
          var e = this.tools[t];
          e &&
            (this.currentTool !== e
              ? !0 !== e.singleUse
                ? (void 0 !== this.currentTool &&
                    this.currentTool.setActive(!1),
                  (this.currentTool = e),
                  this.currentTool.setActive(!0),
                  this._dispatch.emit(b, t),
                  this.canvas.renderAll())
                : e.use()
              : this.currentTool.activateAgain());
        }),
        (j.prototype.changeOutOfTool = function () {
          this.chooseTool("select");
        }),
        (j.prototype.on = function () {
          this._dispatch.on.apply(this._dispatch, arguments);
        }),
        (j.prototype.off = function () {
          this._dispatch.off.apply(this._dispatch, arguments);
        }),
        (j.prototype.select = function (t) {
          if ((this.clearSelection(), t))
            if ((1 === t.length && (t = t[0]), t.length)) {
              var e = new r.ActiveSelection(t, {
                originX: "center",
                originY: "center",
                canvas: this.canvas,
              });
              this.canvas.setActiveObject(e), this.canvas.requestRenderAll();
            } else this.canvas.setActiveObject(t);
        }),
        (j.prototype.getSelection = function () {
          var t = this.canvas.getActiveObjects();
          if (t.length > 1) return t;
          if (1 === t.length) {
            var e = t[0];
            return e.isControlPoint ? e._dt_sourceObj : e;
          }
        }),
        (j.prototype._fireStateChanged = function () {
          this._dispatch.emit(M, this.state);
        }),
        (j.prototype._setBackgroundImage = function (t, e, i) {
          var s;
          s =
            "object" != typeof _opions || _opions.position
              ? e && "top-left" === e.position
                ? {
                    originX: "left",
                    originY: "top",
                    top: 0,
                    left: 0,
                    crossOrigin: "anonymous",
                  }
                : {
                    originX: "center",
                    originY: "center",
                    top: this.canvas.height / 2,
                    left: this.canvas.width / 2,
                    crossOrigin: "anonymous",
                  }
              : e;
          var o = this;
          function a() {
            r.util.loadImage(t, h, null, s.crossOrigin);
          }
          function h(t) {
            if (("anonymous" === s.crossOrigin || "" === s.crossOrigin) && !t)
              return (
                delete (s = n.extend(!0, {}, s)).crossOrigin,
                console.log(
                  "Background could not be loaded due to lack of CORS headers. Trying to load it again without CORS support."
                ),
                void a()
              );
            o.canvas.setBackgroundImage(new r.Image(t, s), c);
          }
          function c() {
            "function" == typeof i && i(), o.canvas.renderAll();
          }
          t
            ? ((t = this.proxy(t)), a())
            : this.canvas.setBackgroundImage(null, c);
        }),
        (j.prototype._initTools = function () {
          this.tools = {
            select: new o("Selection Tool", this),
            line: new a("Line Tool", this),
            arrow: new a("Arrow Tool", this, "arrow"),
            doubleArrow: new a("Double Arrow Tool", this, "arrow", {
              doubleArrowhead: !0,
            }),
            rect: new h("Rectangle Tool", this, "rect"),
            ellipse: new h("Ellipse Tool", this, "ellipse"),
            square: new h("Square Tool", this, "square"),
            circle: new h("Circle Tool", this, "circle"),
            free: new c("Free Draw Tool", this),
            stamp: new u("Stamp Tool", this, this.options.parseSVG),
            text: new l("Text Tool", this),
            trash: new g("Delete Tool", this),
            clone: new f("Clone Tool", this),
            annotation: new d("Annotation Tool", this),
          };
        }),
        (j.prototype._initDOM = function () {
          n(this.selector).empty(),
            (this.$element = n('<div class="dt-container">').appendTo(
              this.selector
            ));
          var t = n('<div class="dt-canvas-container">')
            .attr("tabindex", 0)
            .appendTo(this.$element);
          this.canvasOnly() || t.addClass("with-border"),
            this.options.canvasScale &&
              t.css({
                "transform-origin": "top left",
                transform: `scale(${this.options.canvasScale})`,
              }),
            (this.$canvas = n("<canvas>").appendTo(t));
        }),
        (j.prototype._initFabricJS = function () {
          (this.canvas = new r.Canvas(this.$canvas[0], {
            preserveObjectStacking: !0,
          })),
            (this.canvas.targetFindTolerance = 12),
            (this.canvas._isPerPixelTargetFindAllowed =
              !r.isTouchSupported && this.options.parseSVG),
            this.canvas.setBackgroundColor("#fff");
        }),
        (j.prototype._setDimensions = function (t, e) {
          this.canvas.setDimensions({ width: t, height: e });
          var i = window.devicePixelRatio || 1;
          if (1 !== i) {
            var r = this.canvas.getElement();
            n(r)
              .attr("width", t * i)
              .attr("height", e * i)
              .css("width", t)
              .css("height", e),
              r.getContext("2d").scale(i, i);
          }
        }),
        (j.prototype._initStateHistory = function () {
          (this._history = new C(this)),
            this.canvas.on(
              "object:modified",
              function () {
                this.pushToHistory();
              }.bind(this)
            );
        }),
        (j.prototype._initStores = function () {
          this.stores = [];
        }),
        (j.prototype.addStore = function (t) {
          var e = this.load.bind(this);
          -1 == this.stores.indexOf(t) &&
            (t.setLoadFunction(e), this.stores.push(t));
        }),
        (j.prototype.notifySave = function (t) {
          for (var e = null, i = this.stores || [], n = 0; n < i.length; n++)
            if ("function" == typeof (e = i[n]).save)
              try {
                e.save(t);
              } catch (t) {
                console.error("unable to call `save(serializedJson)` on store"),
                  console.error(t);
              }
            else
              console.error(
                "store does not implement required `save(serializedJson)` function!"
              );
        }),
        (j.prototype.setStampObject = function (t, e) {
          this.tools.stamp.setStampObject(t),
            this._dispatch.emit(x, { stamp: t, imgSrc: e });
        }),
        (t.exports = j);
    },
    function (t, e, i) {
      "use strict";
      (function (t) {
        /*!
         * The buffer module from node.js, for the browser.
         *
         * @author   Feross Aboukhadijeh <http://feross.org>
         * @license  MIT
         */
        var n = i(17),
          r = i(18),
          s = i(19);
        function o() {
          return h.TYPED_ARRAY_SUPPORT ? 2147483647 : 1073741823;
        }
        function a(t, e) {
          if (o() < e) throw new RangeError("Invalid typed array length");
          return (
            h.TYPED_ARRAY_SUPPORT
              ? ((t = new Uint8Array(e)).__proto__ = h.prototype)
              : (null === t && (t = new h(e)), (t.length = e)),
            t
          );
        }
        function h(t, e, i) {
          if (!(h.TYPED_ARRAY_SUPPORT || this instanceof h))
            return new h(t, e, i);
          if ("number" == typeof t) {
            if ("string" == typeof e)
              throw new Error(
                "If encoding is specified then the first argument must be a string"
              );
            return u(this, t);
          }
          return c(this, t, e, i);
        }
        function c(t, e, i, n) {
          if ("number" == typeof e)
            throw new TypeError('"value" argument must not be a number');
          return "undefined" != typeof ArrayBuffer && e instanceof ArrayBuffer
            ? (function (t, e, i, n) {
                if ((e.byteLength, i < 0 || e.byteLength < i))
                  throw new RangeError("'offset' is out of bounds");
                if (e.byteLength < i + (n || 0))
                  throw new RangeError("'length' is out of bounds");
                e =
                  void 0 === i && void 0 === n
                    ? new Uint8Array(e)
                    : void 0 === n
                    ? new Uint8Array(e, i)
                    : new Uint8Array(e, i, n);
                h.TYPED_ARRAY_SUPPORT
                  ? ((t = e).__proto__ = h.prototype)
                  : (t = g(t, e));
                return t;
              })(t, e, i, n)
            : "string" == typeof e
            ? (function (t, e, i) {
                ("string" == typeof i && "" !== i) || (i = "utf8");
                if (!h.isEncoding(i))
                  throw new TypeError(
                    '"encoding" must be a valid string encoding'
                  );
                var n = 0 | d(e, i),
                  r = (t = a(t, n)).write(e, i);
                r !== n && (t = t.slice(0, r));
                return t;
              })(t, e, i)
            : (function (t, e) {
                if (h.isBuffer(e)) {
                  var i = 0 | f(e.length);
                  return 0 === (t = a(t, i)).length || e.copy(t, 0, 0, i), t;
                }
                if (e) {
                  if (
                    ("undefined" != typeof ArrayBuffer &&
                      e.buffer instanceof ArrayBuffer) ||
                    "length" in e
                  )
                    return "number" != typeof e.length || (n = e.length) != n
                      ? a(t, 0)
                      : g(t, e);
                  if ("Buffer" === e.type && s(e.data)) return g(t, e.data);
                }
                var n;
                throw new TypeError(
                  "First argument must be a string, Buffer, ArrayBuffer, Array, or array-like object."
                );
              })(t, e);
        }
        function l(t) {
          if ("number" != typeof t)
            throw new TypeError('"size" argument must be a number');
          if (t < 0)
            throw new RangeError('"size" argument must not be negative');
        }
        function u(t, e) {
          if ((l(e), (t = a(t, e < 0 ? 0 : 0 | f(e))), !h.TYPED_ARRAY_SUPPORT))
            for (var i = 0; i < e; ++i) t[i] = 0;
          return t;
        }
        function g(t, e) {
          var i = e.length < 0 ? 0 : 0 | f(e.length);
          t = a(t, i);
          for (var n = 0; n < i; n += 1) t[n] = 255 & e[n];
          return t;
        }
        function f(t) {
          if (t >= o())
            throw new RangeError(
              "Attempt to allocate Buffer larger than maximum size: 0x" +
                o().toString(16) +
                " bytes"
            );
          return 0 | t;
        }
        function d(t, e) {
          if (h.isBuffer(t)) return t.length;
          if (
            "undefined" != typeof ArrayBuffer &&
            "function" == typeof ArrayBuffer.isView &&
            (ArrayBuffer.isView(t) || t instanceof ArrayBuffer)
          )
            return t.byteLength;
          "string" != typeof t && (t = "" + t);
          var i = t.length;
          if (0 === i) return 0;
          for (var n = !1; ; )
            switch (e) {
              case "ascii":
              case "latin1":
              case "binary":
                return i;
              case "utf8":
              case "utf-8":
              case void 0:
                return F(t).length;
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return 2 * i;
              case "hex":
                return i >>> 1;
              case "base64":
                return B(t).length;
              default:
                if (n) return F(t).length;
                (e = ("" + e).toLowerCase()), (n = !0);
            }
        }
        function p(t, e, i) {
          var n = !1;
          if (((void 0 === e || e < 0) && (e = 0), e > this.length)) return "";
          if (((void 0 === i || i > this.length) && (i = this.length), i <= 0))
            return "";
          if ((i >>>= 0) <= (e >>>= 0)) return "";
          for (t || (t = "utf8"); ; )
            switch (t) {
              case "hex":
                return S(this, e, i);
              case "utf8":
              case "utf-8":
                return D(this, e, i);
              case "ascii":
                return _(this, e, i);
              case "latin1":
              case "binary":
                return T(this, e, i);
              case "base64":
                return x(this, e, i);
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return O(this, e, i);
              default:
                if (n) throw new TypeError("Unknown encoding: " + t);
                (t = (t + "").toLowerCase()), (n = !0);
            }
        }
        function C(t, e, i) {
          var n = t[e];
          (t[e] = t[i]), (t[i] = n);
        }
        function A(t, e, i, n, r) {
          if (0 === t.length) return -1;
          if (
            ("string" == typeof i
              ? ((n = i), (i = 0))
              : i > 2147483647
              ? (i = 2147483647)
              : i < -2147483648 && (i = -2147483648),
            (i = +i),
            isNaN(i) && (i = r ? 0 : t.length - 1),
            i < 0 && (i = t.length + i),
            i >= t.length)
          ) {
            if (r) return -1;
            i = t.length - 1;
          } else if (i < 0) {
            if (!r) return -1;
            i = 0;
          }
          if (("string" == typeof e && (e = h.from(e, n)), h.isBuffer(e)))
            return 0 === e.length ? -1 : v(t, e, i, n, r);
          if ("number" == typeof e)
            return (
              (e &= 255),
              h.TYPED_ARRAY_SUPPORT &&
              "function" == typeof Uint8Array.prototype.indexOf
                ? r
                  ? Uint8Array.prototype.indexOf.call(t, e, i)
                  : Uint8Array.prototype.lastIndexOf.call(t, e, i)
                : v(t, [e], i, n, r)
            );
          throw new TypeError("val must be string, number or Buffer");
        }
        function v(t, e, i, n, r) {
          var s,
            o = 1,
            a = t.length,
            h = e.length;
          if (
            void 0 !== n &&
            ("ucs2" === (n = String(n).toLowerCase()) ||
              "ucs-2" === n ||
              "utf16le" === n ||
              "utf-16le" === n)
          ) {
            if (t.length < 2 || e.length < 2) return -1;
            (o = 2), (a /= 2), (h /= 2), (i /= 2);
          }
          function c(t, e) {
            return 1 === o ? t[e] : t.readUInt16BE(e * o);
          }
          if (r) {
            var l = -1;
            for (s = i; s < a; s++)
              if (c(t, s) === c(e, -1 === l ? 0 : s - l)) {
                if ((-1 === l && (l = s), s - l + 1 === h)) return l * o;
              } else -1 !== l && (s -= s - l), (l = -1);
          } else
            for (i + h > a && (i = a - h), s = i; s >= 0; s--) {
              for (var u = !0, g = 0; g < h; g++)
                if (c(t, s + g) !== c(e, g)) {
                  u = !1;
                  break;
                }
              if (u) return s;
            }
          return -1;
        }
        function m(t, e, i, n) {
          i = Number(i) || 0;
          var r = t.length - i;
          n ? (n = Number(n)) > r && (n = r) : (n = r);
          var s = e.length;
          if (s % 2 != 0) throw new TypeError("Invalid hex string");
          n > s / 2 && (n = s / 2);
          for (var o = 0; o < n; ++o) {
            var a = parseInt(e.substr(2 * o, 2), 16);
            if (isNaN(a)) return o;
            t[i + o] = a;
          }
          return o;
        }
        function I(t, e, i, n) {
          return H(F(e, t.length - i), t, i, n);
        }
        function w(t, e, i, n) {
          return H(
            (function (t) {
              for (var e = [], i = 0; i < t.length; ++i)
                e.push(255 & t.charCodeAt(i));
              return e;
            })(e),
            t,
            i,
            n
          );
        }
        function y(t, e, i, n) {
          return w(t, e, i, n);
        }
        function M(t, e, i, n) {
          return H(B(e), t, i, n);
        }
        function b(t, e, i, n) {
          return H(
            (function (t, e) {
              for (
                var i, n, r, s = [], o = 0;
                o < t.length && !((e -= 2) < 0);
                ++o
              )
                (i = t.charCodeAt(o)),
                  (n = i >> 8),
                  (r = i % 256),
                  s.push(r),
                  s.push(n);
              return s;
            })(e, t.length - i),
            t,
            i,
            n
          );
        }
        function x(t, e, i) {
          return 0 === e && i === t.length
            ? n.fromByteArray(t)
            : n.fromByteArray(t.slice(e, i));
        }
        function D(t, e, i) {
          i = Math.min(t.length, i);
          for (var n = [], r = e; r < i; ) {
            var s,
              o,
              a,
              h,
              c = t[r],
              l = null,
              u = c > 239 ? 4 : c > 223 ? 3 : c > 191 ? 2 : 1;
            if (r + u <= i)
              switch (u) {
                case 1:
                  c < 128 && (l = c);
                  break;
                case 2:
                  128 == (192 & (s = t[r + 1])) &&
                    (h = ((31 & c) << 6) | (63 & s)) > 127 &&
                    (l = h);
                  break;
                case 3:
                  (s = t[r + 1]),
                    (o = t[r + 2]),
                    128 == (192 & s) &&
                      128 == (192 & o) &&
                      (h = ((15 & c) << 12) | ((63 & s) << 6) | (63 & o)) >
                        2047 &&
                      (h < 55296 || h > 57343) &&
                      (l = h);
                  break;
                case 4:
                  (s = t[r + 1]),
                    (o = t[r + 2]),
                    (a = t[r + 3]),
                    128 == (192 & s) &&
                      128 == (192 & o) &&
                      128 == (192 & a) &&
                      (h =
                        ((15 & c) << 18) |
                        ((63 & s) << 12) |
                        ((63 & o) << 6) |
                        (63 & a)) > 65535 &&
                      h < 1114112 &&
                      (l = h);
              }
            null === l
              ? ((l = 65533), (u = 1))
              : l > 65535 &&
                ((l -= 65536),
                n.push(((l >>> 10) & 1023) | 55296),
                (l = 56320 | (1023 & l))),
              n.push(l),
              (r += u);
          }
          return (function (t) {
            var e = t.length;
            if (e <= 4096) return String.fromCharCode.apply(String, t);
            var i = "",
              n = 0;
            for (; n < e; )
              i += String.fromCharCode.apply(String, t.slice(n, (n += 4096)));
            return i;
          })(n);
        }
        (e.Buffer = h),
          (e.SlowBuffer = function (t) {
            +t != t && (t = 0);
            return h.alloc(+t);
          }),
          (e.INSPECT_MAX_BYTES = 50),
          (h.TYPED_ARRAY_SUPPORT =
            void 0 !== t.TYPED_ARRAY_SUPPORT
              ? t.TYPED_ARRAY_SUPPORT
              : (function () {
                  try {
                    var t = new Uint8Array(1);
                    return (
                      (t.__proto__ = {
                        __proto__: Uint8Array.prototype,
                        foo: function () {
                          return 42;
                        },
                      }),
                      42 === t.foo() &&
                        "function" == typeof t.subarray &&
                        0 === t.subarray(1, 1).byteLength
                    );
                  } catch (t) {
                    return !1;
                  }
                })()),
          (e.kMaxLength = o()),
          (h.poolSize = 8192),
          (h._augment = function (t) {
            return (t.__proto__ = h.prototype), t;
          }),
          (h.from = function (t, e, i) {
            return c(null, t, e, i);
          }),
          h.TYPED_ARRAY_SUPPORT &&
            ((h.prototype.__proto__ = Uint8Array.prototype),
            (h.__proto__ = Uint8Array),
            "undefined" != typeof Symbol &&
              Symbol.species &&
              h[Symbol.species] === h &&
              Object.defineProperty(h, Symbol.species, {
                value: null,
                configurable: !0,
              })),
          (h.alloc = function (t, e, i) {
            return (function (t, e, i, n) {
              return (
                l(e),
                e <= 0
                  ? a(t, e)
                  : void 0 !== i
                  ? "string" == typeof n
                    ? a(t, e).fill(i, n)
                    : a(t, e).fill(i)
                  : a(t, e)
              );
            })(null, t, e, i);
          }),
          (h.allocUnsafe = function (t) {
            return u(null, t);
          }),
          (h.allocUnsafeSlow = function (t) {
            return u(null, t);
          }),
          (h.isBuffer = function (t) {
            return !(null == t || !t._isBuffer);
          }),
          (h.compare = function (t, e) {
            if (!h.isBuffer(t) || !h.isBuffer(e))
              throw new TypeError("Arguments must be Buffers");
            if (t === e) return 0;
            for (
              var i = t.length, n = e.length, r = 0, s = Math.min(i, n);
              r < s;
              ++r
            )
              if (t[r] !== e[r]) {
                (i = t[r]), (n = e[r]);
                break;
              }
            return i < n ? -1 : n < i ? 1 : 0;
          }),
          (h.isEncoding = function (t) {
            switch (String(t).toLowerCase()) {
              case "hex":
              case "utf8":
              case "utf-8":
              case "ascii":
              case "latin1":
              case "binary":
              case "base64":
              case "ucs2":
              case "ucs-2":
              case "utf16le":
              case "utf-16le":
                return !0;
              default:
                return !1;
            }
          }),
          (h.concat = function (t, e) {
            if (!s(t))
              throw new TypeError(
                '"list" argument must be an Array of Buffers'
              );
            if (0 === t.length) return h.alloc(0);
            var i;
            if (void 0 === e)
              for (e = 0, i = 0; i < t.length; ++i) e += t[i].length;
            var n = h.allocUnsafe(e),
              r = 0;
            for (i = 0; i < t.length; ++i) {
              var o = t[i];
              if (!h.isBuffer(o))
                throw new TypeError(
                  '"list" argument must be an Array of Buffers'
                );
              o.copy(n, r), (r += o.length);
            }
            return n;
          }),
          (h.byteLength = d),
          (h.prototype._isBuffer = !0),
          (h.prototype.swap16 = function () {
            var t = this.length;
            if (t % 2 != 0)
              throw new RangeError("Buffer size must be a multiple of 16-bits");
            for (var e = 0; e < t; e += 2) C(this, e, e + 1);
            return this;
          }),
          (h.prototype.swap32 = function () {
            var t = this.length;
            if (t % 4 != 0)
              throw new RangeError("Buffer size must be a multiple of 32-bits");
            for (var e = 0; e < t; e += 4)
              C(this, e, e + 3), C(this, e + 1, e + 2);
            return this;
          }),
          (h.prototype.swap64 = function () {
            var t = this.length;
            if (t % 8 != 0)
              throw new RangeError("Buffer size must be a multiple of 64-bits");
            for (var e = 0; e < t; e += 8)
              C(this, e, e + 7),
                C(this, e + 1, e + 6),
                C(this, e + 2, e + 5),
                C(this, e + 3, e + 4);
            return this;
          }),
          (h.prototype.toString = function () {
            var t = 0 | this.length;
            return 0 === t
              ? ""
              : 0 === arguments.length
              ? D(this, 0, t)
              : p.apply(this, arguments);
          }),
          (h.prototype.equals = function (t) {
            if (!h.isBuffer(t))
              throw new TypeError("Argument must be a Buffer");
            return this === t || 0 === h.compare(this, t);
          }),
          (h.prototype.inspect = function () {
            var t = "",
              i = e.INSPECT_MAX_BYTES;
            return (
              this.length > 0 &&
                ((t = this.toString("hex", 0, i).match(/.{2}/g).join(" ")),
                this.length > i && (t += " ... ")),
              "<Buffer " + t + ">"
            );
          }),
          (h.prototype.compare = function (t, e, i, n, r) {
            if (!h.isBuffer(t))
              throw new TypeError("Argument must be a Buffer");
            if (
              (void 0 === e && (e = 0),
              void 0 === i && (i = t ? t.length : 0),
              void 0 === n && (n = 0),
              void 0 === r && (r = this.length),
              e < 0 || i > t.length || n < 0 || r > this.length)
            )
              throw new RangeError("out of range index");
            if (n >= r && e >= i) return 0;
            if (n >= r) return -1;
            if (e >= i) return 1;
            if (this === t) return 0;
            for (
              var s = (r >>>= 0) - (n >>>= 0),
                o = (i >>>= 0) - (e >>>= 0),
                a = Math.min(s, o),
                c = this.slice(n, r),
                l = t.slice(e, i),
                u = 0;
              u < a;
              ++u
            )
              if (c[u] !== l[u]) {
                (s = c[u]), (o = l[u]);
                break;
              }
            return s < o ? -1 : o < s ? 1 : 0;
          }),
          (h.prototype.includes = function (t, e, i) {
            return -1 !== this.indexOf(t, e, i);
          }),
          (h.prototype.indexOf = function (t, e, i) {
            return A(this, t, e, i, !0);
          }),
          (h.prototype.lastIndexOf = function (t, e, i) {
            return A(this, t, e, i, !1);
          }),
          (h.prototype.write = function (t, e, i, n) {
            if (void 0 === e) (n = "utf8"), (i = this.length), (e = 0);
            else if (void 0 === i && "string" == typeof e)
              (n = e), (i = this.length), (e = 0);
            else {
              if (!isFinite(e))
                throw new Error(
                  "Buffer.write(string, encoding, offset[, length]) is no longer supported"
                );
              (e |= 0),
                isFinite(i)
                  ? ((i |= 0), void 0 === n && (n = "utf8"))
                  : ((n = i), (i = void 0));
            }
            var r = this.length - e;
            if (
              ((void 0 === i || i > r) && (i = r),
              (t.length > 0 && (i < 0 || e < 0)) || e > this.length)
            )
              throw new RangeError("Attempt to write outside buffer bounds");
            n || (n = "utf8");
            for (var s = !1; ; )
              switch (n) {
                case "hex":
                  return m(this, t, e, i);
                case "utf8":
                case "utf-8":
                  return I(this, t, e, i);
                case "ascii":
                  return w(this, t, e, i);
                case "latin1":
                case "binary":
                  return y(this, t, e, i);
                case "base64":
                  return M(this, t, e, i);
                case "ucs2":
                case "ucs-2":
                case "utf16le":
                case "utf-16le":
                  return b(this, t, e, i);
                default:
                  if (s) throw new TypeError("Unknown encoding: " + n);
                  (n = ("" + n).toLowerCase()), (s = !0);
              }
          }),
          (h.prototype.toJSON = function () {
            return {
              type: "Buffer",
              data: Array.prototype.slice.call(this._arr || this, 0),
            };
          });
        function _(t, e, i) {
          var n = "";
          i = Math.min(t.length, i);
          for (var r = e; r < i; ++r) n += String.fromCharCode(127 & t[r]);
          return n;
        }
        function T(t, e, i) {
          var n = "";
          i = Math.min(t.length, i);
          for (var r = e; r < i; ++r) n += String.fromCharCode(t[r]);
          return n;
        }
        function S(t, e, i) {
          var n = t.length;
          (!e || e < 0) && (e = 0), (!i || i < 0 || i > n) && (i = n);
          for (var r = "", s = e; s < i; ++s) r += G(t[s]);
          return r;
        }
        function O(t, e, i) {
          for (var n = t.slice(e, i), r = "", s = 0; s < n.length; s += 2)
            r += String.fromCharCode(n[s] + 256 * n[s + 1]);
          return r;
        }
        function j(t, e, i) {
          if (t % 1 != 0 || t < 0) throw new RangeError("offset is not uint");
          if (t + e > i)
            throw new RangeError("Trying to access beyond buffer length");
        }
        function P(t, e, i, n, r, s) {
          if (!h.isBuffer(t))
            throw new TypeError('"buffer" argument must be a Buffer instance');
          if (e > r || e < s)
            throw new RangeError('"value" argument is out of bounds');
          if (i + n > t.length) throw new RangeError("Index out of range");
        }
        function L(t, e, i, n) {
          e < 0 && (e = 65535 + e + 1);
          for (var r = 0, s = Math.min(t.length - i, 2); r < s; ++r)
            t[i + r] =
              (e & (255 << (8 * (n ? r : 1 - r)))) >>> (8 * (n ? r : 1 - r));
        }
        function k(t, e, i, n) {
          e < 0 && (e = 4294967295 + e + 1);
          for (var r = 0, s = Math.min(t.length - i, 4); r < s; ++r)
            t[i + r] = (e >>> (8 * (n ? r : 3 - r))) & 255;
        }
        function N(t, e, i, n, r, s) {
          if (i + n > t.length) throw new RangeError("Index out of range");
          if (i < 0) throw new RangeError("Index out of range");
        }
        function E(t, e, i, n, s) {
          return s || N(t, 0, i, 4), r.write(t, e, i, n, 23, 4), i + 4;
        }
        function z(t, e, i, n, s) {
          return s || N(t, 0, i, 8), r.write(t, e, i, n, 52, 8), i + 8;
        }
        (h.prototype.slice = function (t, e) {
          var i,
            n = this.length;
          if (
            ((t = ~~t) < 0 ? (t += n) < 0 && (t = 0) : t > n && (t = n),
            (e = void 0 === e ? n : ~~e) < 0
              ? (e += n) < 0 && (e = 0)
              : e > n && (e = n),
            e < t && (e = t),
            h.TYPED_ARRAY_SUPPORT)
          )
            (i = this.subarray(t, e)).__proto__ = h.prototype;
          else {
            var r = e - t;
            i = new h(r, void 0);
            for (var s = 0; s < r; ++s) i[s] = this[s + t];
          }
          return i;
        }),
          (h.prototype.readUIntLE = function (t, e, i) {
            (t |= 0), (e |= 0), i || j(t, e, this.length);
            for (var n = this[t], r = 1, s = 0; ++s < e && (r *= 256); )
              n += this[t + s] * r;
            return n;
          }),
          (h.prototype.readUIntBE = function (t, e, i) {
            (t |= 0), (e |= 0), i || j(t, e, this.length);
            for (var n = this[t + --e], r = 1; e > 0 && (r *= 256); )
              n += this[t + --e] * r;
            return n;
          }),
          (h.prototype.readUInt8 = function (t, e) {
            return e || j(t, 1, this.length), this[t];
          }),
          (h.prototype.readUInt16LE = function (t, e) {
            return e || j(t, 2, this.length), this[t] | (this[t + 1] << 8);
          }),
          (h.prototype.readUInt16BE = function (t, e) {
            return e || j(t, 2, this.length), (this[t] << 8) | this[t + 1];
          }),
          (h.prototype.readUInt32LE = function (t, e) {
            return (
              e || j(t, 4, this.length),
              (this[t] | (this[t + 1] << 8) | (this[t + 2] << 16)) +
                16777216 * this[t + 3]
            );
          }),
          (h.prototype.readUInt32BE = function (t, e) {
            return (
              e || j(t, 4, this.length),
              16777216 * this[t] +
                ((this[t + 1] << 16) | (this[t + 2] << 8) | this[t + 3])
            );
          }),
          (h.prototype.readIntLE = function (t, e, i) {
            (t |= 0), (e |= 0), i || j(t, e, this.length);
            for (var n = this[t], r = 1, s = 0; ++s < e && (r *= 256); )
              n += this[t + s] * r;
            return n >= (r *= 128) && (n -= Math.pow(2, 8 * e)), n;
          }),
          (h.prototype.readIntBE = function (t, e, i) {
            (t |= 0), (e |= 0), i || j(t, e, this.length);
            for (var n = e, r = 1, s = this[t + --n]; n > 0 && (r *= 256); )
              s += this[t + --n] * r;
            return s >= (r *= 128) && (s -= Math.pow(2, 8 * e)), s;
          }),
          (h.prototype.readInt8 = function (t, e) {
            return (
              e || j(t, 1, this.length),
              128 & this[t] ? -1 * (255 - this[t] + 1) : this[t]
            );
          }),
          (h.prototype.readInt16LE = function (t, e) {
            e || j(t, 2, this.length);
            var i = this[t] | (this[t + 1] << 8);
            return 32768 & i ? 4294901760 | i : i;
          }),
          (h.prototype.readInt16BE = function (t, e) {
            e || j(t, 2, this.length);
            var i = this[t + 1] | (this[t] << 8);
            return 32768 & i ? 4294901760 | i : i;
          }),
          (h.prototype.readInt32LE = function (t, e) {
            return (
              e || j(t, 4, this.length),
              this[t] |
                (this[t + 1] << 8) |
                (this[t + 2] << 16) |
                (this[t + 3] << 24)
            );
          }),
          (h.prototype.readInt32BE = function (t, e) {
            return (
              e || j(t, 4, this.length),
              (this[t] << 24) |
                (this[t + 1] << 16) |
                (this[t + 2] << 8) |
                this[t + 3]
            );
          }),
          (h.prototype.readFloatLE = function (t, e) {
            return e || j(t, 4, this.length), r.read(this, t, !0, 23, 4);
          }),
          (h.prototype.readFloatBE = function (t, e) {
            return e || j(t, 4, this.length), r.read(this, t, !1, 23, 4);
          }),
          (h.prototype.readDoubleLE = function (t, e) {
            return e || j(t, 8, this.length), r.read(this, t, !0, 52, 8);
          }),
          (h.prototype.readDoubleBE = function (t, e) {
            return e || j(t, 8, this.length), r.read(this, t, !1, 52, 8);
          }),
          (h.prototype.writeUIntLE = function (t, e, i, n) {
            ((t = +t), (e |= 0), (i |= 0), n) ||
              P(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
            var r = 1,
              s = 0;
            for (this[e] = 255 & t; ++s < i && (r *= 256); )
              this[e + s] = (t / r) & 255;
            return e + i;
          }),
          (h.prototype.writeUIntBE = function (t, e, i, n) {
            ((t = +t), (e |= 0), (i |= 0), n) ||
              P(this, t, e, i, Math.pow(2, 8 * i) - 1, 0);
            var r = i - 1,
              s = 1;
            for (this[e + r] = 255 & t; --r >= 0 && (s *= 256); )
              this[e + r] = (t / s) & 255;
            return e + i;
          }),
          (h.prototype.writeUInt8 = function (t, e, i) {
            return (
              (t = +t),
              (e |= 0),
              i || P(this, t, e, 1, 255, 0),
              h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
              (this[e] = 255 & t),
              e + 1
            );
          }),
          (h.prototype.writeUInt16LE = function (t, e, i) {
            return (
              (t = +t),
              (e |= 0),
              i || P(this, t, e, 2, 65535, 0),
              h.TYPED_ARRAY_SUPPORT
                ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
                : L(this, t, e, !0),
              e + 2
            );
          }),
          (h.prototype.writeUInt16BE = function (t, e, i) {
            return (
              (t = +t),
              (e |= 0),
              i || P(this, t, e, 2, 65535, 0),
              h.TYPED_ARRAY_SUPPORT
                ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
                : L(this, t, e, !1),
              e + 2
            );
          }),
          (h.prototype.writeUInt32LE = function (t, e, i) {
            return (
              (t = +t),
              (e |= 0),
              i || P(this, t, e, 4, 4294967295, 0),
              h.TYPED_ARRAY_SUPPORT
                ? ((this[e + 3] = t >>> 24),
                  (this[e + 2] = t >>> 16),
                  (this[e + 1] = t >>> 8),
                  (this[e] = 255 & t))
                : k(this, t, e, !0),
              e + 4
            );
          }),
          (h.prototype.writeUInt32BE = function (t, e, i) {
            return (
              (t = +t),
              (e |= 0),
              i || P(this, t, e, 4, 4294967295, 0),
              h.TYPED_ARRAY_SUPPORT
                ? ((this[e] = t >>> 24),
                  (this[e + 1] = t >>> 16),
                  (this[e + 2] = t >>> 8),
                  (this[e + 3] = 255 & t))
                : k(this, t, e, !1),
              e + 4
            );
          }),
          (h.prototype.writeIntLE = function (t, e, i, n) {
            if (((t = +t), (e |= 0), !n)) {
              var r = Math.pow(2, 8 * i - 1);
              P(this, t, e, i, r - 1, -r);
            }
            var s = 0,
              o = 1,
              a = 0;
            for (this[e] = 255 & t; ++s < i && (o *= 256); )
              t < 0 && 0 === a && 0 !== this[e + s - 1] && (a = 1),
                (this[e + s] = (((t / o) >> 0) - a) & 255);
            return e + i;
          }),
          (h.prototype.writeIntBE = function (t, e, i, n) {
            if (((t = +t), (e |= 0), !n)) {
              var r = Math.pow(2, 8 * i - 1);
              P(this, t, e, i, r - 1, -r);
            }
            var s = i - 1,
              o = 1,
              a = 0;
            for (this[e + s] = 255 & t; --s >= 0 && (o *= 256); )
              t < 0 && 0 === a && 0 !== this[e + s + 1] && (a = 1),
                (this[e + s] = (((t / o) >> 0) - a) & 255);
            return e + i;
          }),
          (h.prototype.writeInt8 = function (t, e, i) {
            return (
              (t = +t),
              (e |= 0),
              i || P(this, t, e, 1, 127, -128),
              h.TYPED_ARRAY_SUPPORT || (t = Math.floor(t)),
              t < 0 && (t = 255 + t + 1),
              (this[e] = 255 & t),
              e + 1
            );
          }),
          (h.prototype.writeInt16LE = function (t, e, i) {
            return (
              (t = +t),
              (e |= 0),
              i || P(this, t, e, 2, 32767, -32768),
              h.TYPED_ARRAY_SUPPORT
                ? ((this[e] = 255 & t), (this[e + 1] = t >>> 8))
                : L(this, t, e, !0),
              e + 2
            );
          }),
          (h.prototype.writeInt16BE = function (t, e, i) {
            return (
              (t = +t),
              (e |= 0),
              i || P(this, t, e, 2, 32767, -32768),
              h.TYPED_ARRAY_SUPPORT
                ? ((this[e] = t >>> 8), (this[e + 1] = 255 & t))
                : L(this, t, e, !1),
              e + 2
            );
          }),
          (h.prototype.writeInt32LE = function (t, e, i) {
            return (
              (t = +t),
              (e |= 0),
              i || P(this, t, e, 4, 2147483647, -2147483648),
              h.TYPED_ARRAY_SUPPORT
                ? ((this[e] = 255 & t),
                  (this[e + 1] = t >>> 8),
                  (this[e + 2] = t >>> 16),
                  (this[e + 3] = t >>> 24))
                : k(this, t, e, !0),
              e + 4
            );
          }),
          (h.prototype.writeInt32BE = function (t, e, i) {
            return (
              (t = +t),
              (e |= 0),
              i || P(this, t, e, 4, 2147483647, -2147483648),
              t < 0 && (t = 4294967295 + t + 1),
              h.TYPED_ARRAY_SUPPORT
                ? ((this[e] = t >>> 24),
                  (this[e + 1] = t >>> 16),
                  (this[e + 2] = t >>> 8),
                  (this[e + 3] = 255 & t))
                : k(this, t, e, !1),
              e + 4
            );
          }),
          (h.prototype.writeFloatLE = function (t, e, i) {
            return E(this, t, e, !0, i);
          }),
          (h.prototype.writeFloatBE = function (t, e, i) {
            return E(this, t, e, !1, i);
          }),
          (h.prototype.writeDoubleLE = function (t, e, i) {
            return z(this, t, e, !0, i);
          }),
          (h.prototype.writeDoubleBE = function (t, e, i) {
            return z(this, t, e, !1, i);
          }),
          (h.prototype.copy = function (t, e, i, n) {
            if (
              (i || (i = 0),
              n || 0 === n || (n = this.length),
              e >= t.length && (e = t.length),
              e || (e = 0),
              n > 0 && n < i && (n = i),
              n === i)
            )
              return 0;
            if (0 === t.length || 0 === this.length) return 0;
            if (e < 0) throw new RangeError("targetStart out of bounds");
            if (i < 0 || i >= this.length)
              throw new RangeError("sourceStart out of bounds");
            if (n < 0) throw new RangeError("sourceEnd out of bounds");
            n > this.length && (n = this.length),
              t.length - e < n - i && (n = t.length - e + i);
            var r,
              s = n - i;
            if (this === t && i < e && e < n)
              for (r = s - 1; r >= 0; --r) t[r + e] = this[r + i];
            else if (s < 1e3 || !h.TYPED_ARRAY_SUPPORT)
              for (r = 0; r < s; ++r) t[r + e] = this[r + i];
            else Uint8Array.prototype.set.call(t, this.subarray(i, i + s), e);
            return s;
          }),
          (h.prototype.fill = function (t, e, i, n) {
            if ("string" == typeof t) {
              if (
                ("string" == typeof e
                  ? ((n = e), (e = 0), (i = this.length))
                  : "string" == typeof i && ((n = i), (i = this.length)),
                1 === t.length)
              ) {
                var r = t.charCodeAt(0);
                r < 256 && (t = r);
              }
              if (void 0 !== n && "string" != typeof n)
                throw new TypeError("encoding must be a string");
              if ("string" == typeof n && !h.isEncoding(n))
                throw new TypeError("Unknown encoding: " + n);
            } else "number" == typeof t && (t &= 255);
            if (e < 0 || this.length < e || this.length < i)
              throw new RangeError("Out of range index");
            if (i <= e) return this;
            var s;
            if (
              ((e >>>= 0),
              (i = void 0 === i ? this.length : i >>> 0),
              t || (t = 0),
              "number" == typeof t)
            )
              for (s = e; s < i; ++s) this[s] = t;
            else {
              var o = h.isBuffer(t) ? t : F(new h(t, n).toString()),
                a = o.length;
              for (s = 0; s < i - e; ++s) this[s + e] = o[s % a];
            }
            return this;
          });
        var R = /[^+\/0-9A-Za-z-_]/g;
        function G(t) {
          return t < 16 ? "0" + t.toString(16) : t.toString(16);
        }
        function F(t, e) {
          var i;
          e = e || 1 / 0;
          for (var n = t.length, r = null, s = [], o = 0; o < n; ++o) {
            if ((i = t.charCodeAt(o)) > 55295 && i < 57344) {
              if (!r) {
                if (i > 56319) {
                  (e -= 3) > -1 && s.push(239, 191, 189);
                  continue;
                }
                if (o + 1 === n) {
                  (e -= 3) > -1 && s.push(239, 191, 189);
                  continue;
                }
                r = i;
                continue;
              }
              if (i < 56320) {
                (e -= 3) > -1 && s.push(239, 191, 189), (r = i);
                continue;
              }
              i = 65536 + (((r - 55296) << 10) | (i - 56320));
            } else r && (e -= 3) > -1 && s.push(239, 191, 189);
            if (((r = null), i < 128)) {
              if ((e -= 1) < 0) break;
              s.push(i);
            } else if (i < 2048) {
              if ((e -= 2) < 0) break;
              s.push((i >> 6) | 192, (63 & i) | 128);
            } else if (i < 65536) {
              if ((e -= 3) < 0) break;
              s.push((i >> 12) | 224, ((i >> 6) & 63) | 128, (63 & i) | 128);
            } else {
              if (!(i < 1114112)) throw new Error("Invalid code point");
              if ((e -= 4) < 0) break;
              s.push(
                (i >> 18) | 240,
                ((i >> 12) & 63) | 128,
                ((i >> 6) & 63) | 128,
                (63 & i) | 128
              );
            }
          }
          return s;
        }
        function B(t) {
          return n.toByteArray(
            (function (t) {
              if (
                (t = (function (t) {
                  return t.trim ? t.trim() : t.replace(/^\s+|\s+$/g, "");
                })(t).replace(R, "")).length < 2
              )
                return "";
              for (; t.length % 4 != 0; ) t += "=";
              return t;
            })(t)
          );
        }
        function H(t, e, i, n) {
          for (var r = 0; r < n && !(r + i >= e.length || r >= t.length); ++r)
            e[r + i] = t[r];
          return r;
        }
      }).call(this, i(16));
    },
    function (t, e) {
      var i;
      i = (function () {
        return this;
      })();
      try {
        i = i || new Function("return this")();
      } catch (t) {
        "object" == typeof window && (i = window);
      }
      t.exports = i;
    },
    function (t, e, i) {
      "use strict";
      (e.byteLength = function (t) {
        var e = c(t),
          i = e[0],
          n = e[1];
        return (3 * (i + n)) / 4 - n;
      }),
        (e.toByteArray = function (t) {
          var e,
            i,
            n = c(t),
            o = n[0],
            a = n[1],
            h = new s(
              (function (t, e, i) {
                return (3 * (e + i)) / 4 - i;
              })(0, o, a)
            ),
            l = 0,
            u = a > 0 ? o - 4 : o;
          for (i = 0; i < u; i += 4)
            (e =
              (r[t.charCodeAt(i)] << 18) |
              (r[t.charCodeAt(i + 1)] << 12) |
              (r[t.charCodeAt(i + 2)] << 6) |
              r[t.charCodeAt(i + 3)]),
              (h[l++] = (e >> 16) & 255),
              (h[l++] = (e >> 8) & 255),
              (h[l++] = 255 & e);
          2 === a &&
            ((e = (r[t.charCodeAt(i)] << 2) | (r[t.charCodeAt(i + 1)] >> 4)),
            (h[l++] = 255 & e));
          1 === a &&
            ((e =
              (r[t.charCodeAt(i)] << 10) |
              (r[t.charCodeAt(i + 1)] << 4) |
              (r[t.charCodeAt(i + 2)] >> 2)),
            (h[l++] = (e >> 8) & 255),
            (h[l++] = 255 & e));
          return h;
        }),
        (e.fromByteArray = function (t) {
          for (
            var e, i = t.length, r = i % 3, s = [], o = 0, a = i - r;
            o < a;
            o += 16383
          )
            s.push(l(t, o, o + 16383 > a ? a : o + 16383));
          1 === r
            ? ((e = t[i - 1]), s.push(n[e >> 2] + n[(e << 4) & 63] + "=="))
            : 2 === r &&
              ((e = (t[i - 2] << 8) + t[i - 1]),
              s.push(n[e >> 10] + n[(e >> 4) & 63] + n[(e << 2) & 63] + "="));
          return s.join("");
        });
      for (
        var n = [],
          r = [],
          s = "undefined" != typeof Uint8Array ? Uint8Array : Array,
          o =
            "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
          a = 0,
          h = o.length;
        a < h;
        ++a
      )
        (n[a] = o[a]), (r[o.charCodeAt(a)] = a);
      function c(t) {
        var e = t.length;
        if (e % 4 > 0)
          throw new Error("Invalid string. Length must be a multiple of 4");
        var i = t.indexOf("=");
        return -1 === i && (i = e), [i, i === e ? 0 : 4 - (i % 4)];
      }
      function l(t, e, i) {
        for (var r, s, o = [], a = e; a < i; a += 3)
          (r =
            ((t[a] << 16) & 16711680) +
            ((t[a + 1] << 8) & 65280) +
            (255 & t[a + 2])),
            o.push(
              n[((s = r) >> 18) & 63] +
                n[(s >> 12) & 63] +
                n[(s >> 6) & 63] +
                n[63 & s]
            );
        return o.join("");
      }
      (r["-".charCodeAt(0)] = 62), (r["_".charCodeAt(0)] = 63);
    },
    function (t, e) {
      (e.read = function (t, e, i, n, r) {
        var s,
          o,
          a = 8 * r - n - 1,
          h = (1 << a) - 1,
          c = h >> 1,
          l = -7,
          u = i ? r - 1 : 0,
          g = i ? -1 : 1,
          f = t[e + u];
        for (
          u += g, s = f & ((1 << -l) - 1), f >>= -l, l += a;
          l > 0;
          s = 256 * s + t[e + u], u += g, l -= 8
        );
        for (
          o = s & ((1 << -l) - 1), s >>= -l, l += n;
          l > 0;
          o = 256 * o + t[e + u], u += g, l -= 8
        );
        if (0 === s) s = 1 - c;
        else {
          if (s === h) return o ? NaN : (1 / 0) * (f ? -1 : 1);
          (o += Math.pow(2, n)), (s -= c);
        }
        return (f ? -1 : 1) * o * Math.pow(2, s - n);
      }),
        (e.write = function (t, e, i, n, r, s) {
          var o,
            a,
            h,
            c = 8 * s - r - 1,
            l = (1 << c) - 1,
            u = l >> 1,
            g = 23 === r ? Math.pow(2, -24) - Math.pow(2, -77) : 0,
            f = n ? 0 : s - 1,
            d = n ? 1 : -1,
            p = e < 0 || (0 === e && 1 / e < 0) ? 1 : 0;
          for (
            e = Math.abs(e),
              isNaN(e) || e === 1 / 0
                ? ((a = isNaN(e) ? 1 : 0), (o = l))
                : ((o = Math.floor(Math.log(e) / Math.LN2)),
                  e * (h = Math.pow(2, -o)) < 1 && (o--, (h *= 2)),
                  (e += o + u >= 1 ? g / h : g * Math.pow(2, 1 - u)) * h >= 2 &&
                    (o++, (h /= 2)),
                  o + u >= l
                    ? ((a = 0), (o = l))
                    : o + u >= 1
                    ? ((a = (e * h - 1) * Math.pow(2, r)), (o += u))
                    : ((a = e * Math.pow(2, u - 1) * Math.pow(2, r)), (o = 0)));
            r >= 8;
            t[i + f] = 255 & a, f += d, a /= 256, r -= 8
          );
          for (
            o = (o << r) | a, c += r;
            c > 0;
            t[i + f] = 255 & o, f += d, o /= 256, c -= 8
          );
          t[i + f - d] |= 128 * p;
        });
    },
    function (t, e) {
      var i = {}.toString;
      t.exports =
        Array.isArray ||
        function (t) {
          return "[object Array]" == i.call(t);
        };
    },
    function (t, e) {},
    function (t, e) {},
    function (t, e) {},
    function (t, e, i) {
      var n;
      /*!
       * EventEmitter2
       * https://github.com/hij1nx/EventEmitter2
       *
       * Copyright (c) 2013 hij1nx
       * Licensed under the MIT license.
       */ !(function (r) {
        var s = Array.isArray
          ? Array.isArray
          : function (t) {
              return "[object Array]" === Object.prototype.toString.call(t);
            };
        function o() {
          (this._events = {}), this._conf && a.call(this, this._conf);
        }
        function a(t) {
          t &&
            ((this._conf = t),
            t.delimiter && (this.delimiter = t.delimiter),
            t.maxListeners && (this._events.maxListeners = t.maxListeners),
            t.wildcard && (this.wildcard = t.wildcard),
            t.newListener && (this.newListener = t.newListener),
            this.wildcard && (this.listenerTree = {}));
        }
        function h(t) {
          (this._events = {}), (this.newListener = !1), a.call(this, t);
        }
        function c(t, e, i, n) {
          if (!i) return [];
          var r,
            s,
            o,
            a,
            h,
            l,
            u,
            g = [],
            f = e.length,
            d = e[n],
            p = e[n + 1];
          if (n === f && i._listeners) {
            if ("function" == typeof i._listeners)
              return t && t.push(i._listeners), [i];
            for (r = 0, s = i._listeners.length; r < s; r++)
              t && t.push(i._listeners[r]);
            return [i];
          }
          if ("*" === d || "**" === d || i[d]) {
            if ("*" === d) {
              for (o in i)
                "_listeners" !== o &&
                  i.hasOwnProperty(o) &&
                  (g = g.concat(c(t, e, i[o], n + 1)));
              return g;
            }
            if ("**" === d) {
              for (o in ((u = n + 1 === f || (n + 2 === f && "*" === p)) &&
                i._listeners &&
                (g = g.concat(c(t, e, i, f))),
              i))
                "_listeners" !== o &&
                  i.hasOwnProperty(o) &&
                  ("*" === o || "**" === o
                    ? (i[o]._listeners &&
                        !u &&
                        (g = g.concat(c(t, e, i[o], f))),
                      (g = g.concat(c(t, e, i[o], n))))
                    : (g =
                        o === p
                          ? g.concat(c(t, e, i[o], n + 2))
                          : g.concat(c(t, e, i[o], n))));
              return g;
            }
            g = g.concat(c(t, e, i[d], n + 1));
          }
          if (((a = i["*"]) && c(t, e, a, n + 1), (h = i["**"])))
            if (n < f)
              for (o in (h._listeners && c(t, e, h, f), h))
                "_listeners" !== o &&
                  h.hasOwnProperty(o) &&
                  (o === p
                    ? c(t, e, h[o], n + 2)
                    : o === d
                    ? c(t, e, h[o], n + 1)
                    : (((l = {})[o] = h[o]), c(t, e, { "**": l }, n + 1)));
            else
              h._listeners
                ? c(t, e, h, f)
                : h["*"] && h["*"]._listeners && c(t, e, h["*"], f);
          return g;
        }
        function l(t, e) {
          for (
            var i = 0,
              n = (t =
                "string" == typeof t ? t.split(this.delimiter) : t.slice())
                .length;
            i + 1 < n;
            i++
          )
            if ("**" === t[i] && "**" === t[i + 1]) return;
          for (var r = this.listenerTree, o = t.shift(); o; ) {
            if ((r[o] || (r[o] = {}), (r = r[o]), 0 === t.length)) {
              if (r._listeners) {
                if ("function" == typeof r._listeners)
                  r._listeners = [r._listeners, e];
                else if (
                  s(r._listeners) &&
                  (r._listeners.push(e), !r._listeners.warned)
                ) {
                  var a = 10;
                  void 0 !== this._events.maxListeners &&
                    (a = this._events.maxListeners),
                    a > 0 &&
                      r._listeners.length > a &&
                      ((r._listeners.warned = !0),
                      console.error(
                        "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                        r._listeners.length
                      ),
                      console.trace());
                }
              } else r._listeners = e;
              return !0;
            }
            o = t.shift();
          }
          return !0;
        }
        (h.prototype.delimiter = "."),
          (h.prototype.setMaxListeners = function (t) {
            this._events || o.call(this),
              (this._events.maxListeners = t),
              this._conf || (this._conf = {}),
              (this._conf.maxListeners = t);
          }),
          (h.prototype.event = ""),
          (h.prototype.once = function (t, e) {
            return this.many(t, 1, e), this;
          }),
          (h.prototype.many = function (t, e, i) {
            var n = this;
            if ("function" != typeof i)
              throw new Error("many only accepts instances of Function");
            function r() {
              0 == --e && n.off(t, r), i.apply(this, arguments);
            }
            return (r._origin = i), this.on(t, r), n;
          }),
          (h.prototype.emit = function () {
            this._events || o.call(this);
            var t,
              e = arguments[0];
            if (
              "newListener" === e &&
              !this.newListener &&
              !this._events.newListener
            )
              return !1;
            if (this._all) {
              for (
                var i = arguments.length, n = new Array(i - 1), r = 1;
                r < i;
                r++
              )
                n[r - 1] = arguments[r];
              for (r = 0, i = this._all.length; r < i; r++)
                (this.event = e), this._all[r].apply(this, n);
            }
            if (
              "error" === e &&
              !(
                this._all ||
                this._events.error ||
                (this.wildcard && this.listenerTree.error)
              )
            )
              throw arguments[1] instanceof Error
                ? arguments[1]
                : new Error("Uncaught, unspecified 'error' event.");
            if (this.wildcard) {
              t = [];
              var s =
                "string" == typeof e ? e.split(this.delimiter) : e.slice();
              c.call(this, t, s, this.listenerTree, 0);
            } else t = this._events[e];
            if ("function" == typeof t) {
              if (((this.event = e), 1 === arguments.length)) t.call(this);
              else if (arguments.length > 1)
                switch (arguments.length) {
                  case 2:
                    t.call(this, arguments[1]);
                    break;
                  case 3:
                    t.call(this, arguments[1], arguments[2]);
                    break;
                  default:
                    for (
                      i = arguments.length, n = new Array(i - 1), r = 1;
                      r < i;
                      r++
                    )
                      n[r - 1] = arguments[r];
                    t.apply(this, n);
                }
              return !0;
            }
            if (t) {
              for (
                i = arguments.length, n = new Array(i - 1), r = 1;
                r < i;
                r++
              )
                n[r - 1] = arguments[r];
              var a = t.slice();
              for (r = 0, i = a.length; r < i; r++)
                (this.event = e), a[r].apply(this, n);
              return a.length > 0 || !!this._all;
            }
            return !!this._all;
          }),
          (h.prototype.on = function (t, e) {
            if ("function" == typeof t) return this.onAny(t), this;
            if ("function" != typeof e)
              throw new Error("on only accepts instances of Function");
            if (
              (this._events || o.call(this),
              this.emit("newListener", t, e),
              this.wildcard)
            )
              return l.call(this, t, e), this;
            if (this._events[t]) {
              if ("function" == typeof this._events[t])
                this._events[t] = [this._events[t], e];
              else if (
                s(this._events[t]) &&
                (this._events[t].push(e), !this._events[t].warned)
              ) {
                var i = 10;
                void 0 !== this._events.maxListeners &&
                  (i = this._events.maxListeners),
                  i > 0 &&
                    this._events[t].length > i &&
                    ((this._events[t].warned = !0),
                    console.error(
                      "(node) warning: possible EventEmitter memory leak detected. %d listeners added. Use emitter.setMaxListeners() to increase limit.",
                      this._events[t].length
                    ),
                    console.trace());
              }
            } else this._events[t] = e;
            return this;
          }),
          (h.prototype.onAny = function (t) {
            if ("function" != typeof t)
              throw new Error("onAny only accepts instances of Function");
            return this._all || (this._all = []), this._all.push(t), this;
          }),
          (h.prototype.addListener = h.prototype.on),
          (h.prototype.off = function (t, e) {
            if ("function" != typeof e)
              throw new Error(
                "removeListener only takes instances of Function"
              );
            var i,
              n = [];
            if (this.wildcard) {
              var r =
                "string" == typeof t ? t.split(this.delimiter) : t.slice();
              n = c.call(this, null, r, this.listenerTree, 0);
            } else {
              if (!this._events[t]) return this;
              (i = this._events[t]), n.push({ _listeners: i });
            }
            for (var o = 0; o < n.length; o++) {
              var a = n[o];
              if (((i = a._listeners), s(i))) {
                for (var h = -1, l = 0, u = i.length; l < u; l++)
                  if (
                    i[l] === e ||
                    (i[l].listener && i[l].listener === e) ||
                    (i[l]._origin && i[l]._origin === e)
                  ) {
                    h = l;
                    break;
                  }
                if (h < 0) continue;
                return (
                  this.wildcard
                    ? a._listeners.splice(h, 1)
                    : this._events[t].splice(h, 1),
                  0 === i.length &&
                    (this.wildcard
                      ? delete a._listeners
                      : delete this._events[t]),
                  this
                );
              }
              (i === e ||
                (i.listener && i.listener === e) ||
                (i._origin && i._origin === e)) &&
                (this.wildcard ? delete a._listeners : delete this._events[t]);
            }
            return this;
          }),
          (h.prototype.offAny = function (t) {
            var e,
              i = 0,
              n = 0;
            if (t && this._all && this._all.length > 0) {
              for (i = 0, n = (e = this._all).length; i < n; i++)
                if (t === e[i]) return e.splice(i, 1), this;
            } else this._all = [];
            return this;
          }),
          (h.prototype.removeListener = h.prototype.off),
          (h.prototype.removeAllListeners = function (t) {
            if (0 === arguments.length)
              return !this._events || o.call(this), this;
            if (this.wildcard)
              for (
                var e =
                    "string" == typeof t ? t.split(this.delimiter) : t.slice(),
                  i = c.call(this, null, e, this.listenerTree, 0),
                  n = 0;
                n < i.length;
                n++
              ) {
                var r = i[n];
                r._listeners = null;
              }
            else {
              if (!this._events[t]) return this;
              this._events[t] = null;
            }
            return this;
          }),
          (h.prototype.listeners = function (t) {
            if (this.wildcard) {
              var e = [],
                i = "string" == typeof t ? t.split(this.delimiter) : t.slice();
              return c.call(this, e, i, this.listenerTree, 0), e;
            }
            return (
              this._events || o.call(this),
              this._events[t] || (this._events[t] = []),
              s(this._events[t]) || (this._events[t] = [this._events[t]]),
              this._events[t]
            );
          }),
          (h.prototype.listenersAny = function () {
            return this._all ? this._all : [];
          }),
          void 0 ===
            (n = function () {
              return h;
            }.call(e, i, e, t)) || (t.exports = n);
      })();
    },
    function (t, e, i) {
      var n = i(2).fabric;
      !(function () {
        "use strict";
        var t = n.util.object.extend;
        n.Arrow
          ? n.warn("fabric.Arrow is already defined")
          : ((n.Arrow = n.util.createClass(n.Line, {
              type: "arrow",
              doubleArrowhead: !1,
              _render: function (t) {
                if (
                  (t.beginPath(),
                  this.group &&
                    "path-group" === this.group.type &&
                    !this.transformMatrix)
                ) {
                  var e = this.getCenterPoint();
                  t.translate(
                    -this.group.width / 2 + e.x,
                    -this.group.height / 2 + e.y
                  );
                }
                if (!this.strokeDashArray) {
                  var i,
                    n = this.x1 <= this.x2 ? -1 : 1,
                    r = this.y1 <= this.y2 ? -1 : 1,
                    s = 1 === this.width ? 0 : (n * this.width) / 2,
                    o = 1 === this.height ? 0 : (r * this.height) / 2,
                    a = 1 === this.width ? 0 : (-1 * n * this.width) / 2,
                    h = 1 === this.height ? 0 : (-1 * r * this.height) / 2,
                    c = a - s,
                    l = h - o,
                    u = Math.sqrt(c * c + l * l),
                    g = 0.5 * this.strokeWidth,
                    f = Math.min(
                      3 * g,
                      u * (this.doubleArrowhead ? 0.21 : 0.35)
                    ),
                    d = (2 * f * c) / u,
                    p = (2 * f * l) / u,
                    C = a - d,
                    A = h - p,
                    v = a - 1.1 * d,
                    m = h - 1.1 * p;
                  if (this.doubleArrowhead) {
                    var I = s + d,
                      w = o + p,
                      y = s + 1.1 * d,
                      M = o + 1.1 * p;
                    i = [
                      this._perpCoords(s, o, a, h, I, w, g, 1),
                      this._perpCoords(s, o, a, h, y, M, f, 1),
                      [s, o],
                      this._perpCoords(s, o, a, h, y, M, f, -1),
                      this._perpCoords(s, o, a, h, I, w, g, -1),
                    ];
                  } else
                    i = [
                      this._perpCoords(s, o, a, h, s, o, 0.5 * g, 1),
                      this._perpCoords(s, o, a, h, s, o, 0.5 * g, -1),
                    ];
                  i.push(
                    this._perpCoords(s, o, a, h, C, A, g, -1),
                    this._perpCoords(s, o, a, h, v, m, f, -1),
                    [a, h],
                    this._perpCoords(s, o, a, h, v, m, f, 1),
                    this._perpCoords(s, o, a, h, C, A, g, 1)
                  ),
                    t.moveTo(i[0][0], i[0][1]),
                    i.forEach(function (e) {
                      t.lineTo(e[0], e[1]);
                    });
                }
                if (this.stroke) {
                  var b = t.fillStyle;
                  (t.fillStyle = this.stroke),
                    this._renderFill(t),
                    (t.fillStyle = b);
                }
              },
              _perpCoords: function (t, e, i, n, r, s, o, a) {
                var h = i - t,
                  c = n - e,
                  l = o / Math.sqrt(h * h + c * c);
                return [r + l * -c * a, s + l * h * a];
              },
              toObject: function (e) {
                const i = {
                  x1: this.x1,
                  y1: this.y1,
                  x2: this.x2,
                  y2: this.y2,
                  doubleArrowhead: this.get("doubleArrowhead"),
                };
                return t(this.callSuper("toObject", e), i);
              },
            })),
            (n.Arrow.ATTRIBUTE_NAMES = n.SHARED_ATTRIBUTES.concat(
              "x1 y1 x2 y2".split(" ")
            )),
            (n.Arrow.fromElement = function (e, i) {
              var r = n.parseAttributes(e, n.Line.ATTRIBUTE_NAMES),
                s = [r.x1 || 0, r.y1 || 0, r.x2 || 0, r.y2 || 0];
              return new n.Arrow(s, t(r, i));
            }),
            (n.Arrow.fromObject = function (t, e) {
              return (
                (t.points = [t.x1, t.y1, t.x2, t.y2]),
                n.Object._fromObject("Arrow", t, e, "points")
              );
            }));
      })();
    },
    function (t, e, i) {
      var n = i(2).fabric,
        r = i(0),
        s = i(4),
        o =
          (i(6),
          {
            rect: { fabricType: "rect" },
            square: { fabricType: "rect", uniform: !0 },
            ellipse: { fabricType: "ellipse", radius: !0 },
            circle: { fabricType: "ellipse", uniform: !0, radius: !0 },
          });
      function a(t, e, i) {
        s.call(this, t, e),
          (this._type = o[i]),
          (this._shapeKlass = n.util.getKlass(this._type.fabricType));
      }
      function h(t) {
        return t >= 0 ? 1 : -1;
      }
      r(a, s),
        (a.prototype.mouseDown = function (t) {
          if ((a.super.mouseDown.call(this, t), this.active)) {
            var e = this.canvas.getPointer(t.e),
              i = e.x,
              n = e.y;
            (this.originX = i),
              (this.originY = n),
              (this.curr = new this._shapeKlass({
                top: n,
                left: i,
                width: 0,
                height: 0,
                selectable: !1,
                lockUniScaling: this._type.uniform,
                fill: this.master.state.fill,
                stroke: this.master.state.stroke,
                strokeWidth: this.master.state.strokeWidth,
                objectCaching: !1,
              })),
              this.canvas.add(this.curr);
          }
        }),
        (a.prototype.mouseMove = function (t) {
          if ((a.super.mouseMove.call(this, t), !1 !== this.down)) {
            var e = this.canvas.getPointer(t.e),
              i = e.x - this.originX,
              n = e.y - this.originY;
            this._type.uniform &&
              (Math.abs(i) < Math.abs(n)
                ? (n = Math.abs(i) * h(n))
                : (i = Math.abs(n) * h(i))),
              this.curr.set(
                this.convertToPositiveDimensions({
                  left: this.originX,
                  top: this.originY,
                  width: i,
                  height: n,
                })
              ),
              this._type.radius &&
                this.curr.set({
                  rx: this.curr.width / 2,
                  ry: this.curr.height / 2,
                }),
              this.canvas.renderAll();
          }
        }),
        (a.prototype.mouseUp = function (t) {
          a.super.mouseUp.call(this, t),
            this._processNewShape(this.curr),
            this.canvas.renderAll(),
            this.actionComplete(this.curr),
            (this.curr = void 0),
            this.master.pushToHistory();
        }),
        (a.prototype._processNewShape = function (t) {
          Math.max(t.width, t.height) < this.minSize &&
            (t.set("width", this.defSize),
            t.set("height", this.defSize),
            this._type.radius &&
              (t.set("rx", this.defSize / 2), t.set("ry", this.defSize / 2)),
            this.moveObjectLeftTop(t)),
            this.setCentralOrigin(t),
            t.setCoords();
        }),
        (t.exports = a);
    },
    function (t, e, i) {
      var n = i(0),
        r = i(4);
      function s(t, e) {
        r.call(this, t, e);
        var i = this;
        (i.canvas.freeDrawingBrush.color = this.master.state.stroke),
          (i.canvas.freeDrawingBrush.width = this.master.state.strokeWidth),
          this.master.on("state:changed", function (t) {
            (i.canvas.freeDrawingBrush.color = i.master.state.stroke),
              (i.canvas.freeDrawingBrush.width = i.master.state.strokeWidth);
          });
      }
      n(s, r),
        (s.prototype.mouseDown = function (t) {
          s.super.mouseDown.call(this, t),
            this.active &&
              (this.canvas.isDrawingMode ||
                ((this.canvas.isDrawingMode = !0),
                this.canvas._onMouseDownInDrawingMode(t.e)));
        }),
        (s.prototype.mouseUp = function (t) {
          var e = this.canvas.getObjects(),
            i = e[e.length - 1];
          (this.curr = i),
            (this.curr.fill = this.master.state.fill),
            (this.curr.objectCaching = !1),
            s.super.mouseUp.call(this, t),
            this._locked || (this.canvas.isDrawingMode = !1),
            this.actionComplete(i),
            (this.curr = void 0),
            this.master.pushToHistory();
        }),
        (s.prototype.deactivate = function () {
          s.super.deactivate.call(this), (this.canvas.isDrawingMode = !1);
        }),
        (t.exports = s);
    },
    function (t, e, i) {
      var n = i(1),
        r = i(2).fabric,
        s = i(0),
        o = i(4);
      function a(t, e) {
        o.call(this, t, e),
          this.canvas.on(
            "text:editing:exited",
            function (t) {
              this.active && (t.target.selectable = !1),
                this._pushToHistoryIfModified(t.target);
            }.bind(this)
          );
      }
      s(a, o),
        (a.prototype.mouseDown = function (t) {
          if (!t.target || !t.target.isEditing) {
            a.super.mouseDown.call(this, t);
            var e = this.canvas.findTarget(t.e);
            if (e && "i-text" === e.type) this.editText(e, t.e);
            else if (this.active && !t.e._dt_doNotCreateNewTextObj) {
              var i = this.canvas.getPointer(t.e),
                n = i.x,
                s = i.y,
                o = new r.IText("", {
                  left: n,
                  top: s,
                  lockUniScaling: !0,
                  fontFamily: "Lato, Arial, Helvetica, sans-serif",
                  fontSize: this.master.state.fontSize,
                  fill: this.master.state.stroke,
                });
              this.actionComplete(o),
                this.canvas.add(o),
                this.editText(o, t.e),
                t.e.preventDefault();
            }
          }
        }),
        (a.prototype.activate = function () {
          a.super.activate.call(this, !0);
        }),
        (a.prototype.deactivate = function () {
          a.super.deactivate.call(this), this.exitTextEditing();
        }),
        (a.prototype.exitTextEditing = function () {
          var t = this.canvas.getActiveObject();
          t && t.isEditing && this.canvas.discardActiveObject();
        }),
        (a.prototype.editText = function (t, e) {
          this.canvas.setActiveObject(t),
            t.enterEditing(),
            t.setCursorByClick(e),
            t.hiddenTextarea &&
              t.canvas &&
              (t.canvas.wrapperEl.appendChild(t.hiddenTextarea),
              r.isTouchSupported &&
                n(t.hiddenTextarea).css({
                  left: "-1000px",
                  top: e.pageY || 0,
                  "font-size": "50px",
                }),
              t.hiddenTextarea.focus()),
            this._exitTextEditingOnFirstClick();
        }),
        (a.prototype._exitTextEditingOnFirstClick = function () {
          var t = this,
            e = this.canvas;
          function i(r) {
            if (!(n(r.target).closest(".dt-keep-text-edit-mode").length > 0)) {
              var s = e.findTarget(r),
                o = e.getActiveObject();
              s !== o &&
                o &&
                o.isEditing &&
                (window.removeEventListener("mousedown", i, !0),
                window.removeEventListener("touchstart", i, !0),
                t.exitTextEditing(),
                (r._dt_doNotCreateNewTextObj = !0));
            }
          }
          window.addEventListener("mousedown", i, !0),
            window.addEventListener("touchstart", i, !0);
        }),
        (a.prototype._pushToHistoryIfModified = function (t) {
          t.text !== t._dt_lastText &&
            (this.master.pushToHistory(), (t._dt_lastText = t.text));
        }),
        (t.exports = a);
    },
    function (t, e, i) {
      var n = i(2).fabric,
        r = i(0),
        s = i(4);
      function o(t, e, i) {
        s.call(this, t, e),
          (this._parseSVG = i),
          (this._stamp = null),
          (this._curr = null),
          (this._startX = null),
          (this._startY = null);
      }
      function a(t) {
        return t >= 0 ? 1 : -1;
      }
      r(o, s),
        (o.prototype.mouseDown = function (t) {
          if ((o.super.mouseDown.call(this, t), this.active && this._stamp)) {
            var e = this.canvas.getPointer(t.e);
            (this._startX = e.x),
              (this._startY = e.y),
              this._stamp.clone(
                function (t) {
                  t.set({
                    left: this._startX,
                    top: this._startY,
                    scaleX: 0,
                    scaleY: 0,
                    originX: "center",
                    originY: "center",
                    selectable: !1,
                  }),
                    (this._curr = t),
                    this.canvas.add(this._curr);
                }.bind(this)
              );
          }
        }),
        (o.prototype.mouseMove = function (t) {
          if (
            (o.super.mouseMove.call(this, t), !1 !== this.down && this._curr)
          ) {
            var e = this.canvas.getPointer(t.e),
              i = e.x - this._startX,
              n = e.y - this._startY,
              r = this._stamp.width / this._stamp.height || 1;
            Math.abs(i / n) > r
              ? (i = a(i) * Math.abs(n) * r)
              : (n = (a(n) * Math.abs(i)) / r),
              this._curr.set({
                scaleX: Math.abs(i) / this._stamp.width,
                scaleY: Math.abs(n) / this._stamp.height,
                left: this._startX + 0.5 * i,
                top: this._startY + 0.5 * n,
              }),
              this.canvas.renderAll();
          }
        }),
        (o.prototype.mouseUp = function (t) {
          o.super.mouseUp.call(this, t),
            this._curr &&
              (this._processNewShape(this._curr),
              this.canvas.renderAll(),
              this.actionComplete(this._curr),
              (this._curr = void 0),
              this.master.pushToHistory());
        }),
        (o.prototype.loadImage = function (t, e) {
          this._parseSVG && ".svg" === t.toLowerCase().substr(-4)
            ? this._loadSVGImage(t, e)
            : this._loadNonSVGImage(t, e);
        }),
        (o.prototype.setStampObject = function (t) {
          this._stamp = t;
        }),
        (o.prototype.getStampSrc = function () {
          return this._stamp && this._stamp._dt_sourceURL;
        }),
        (o.prototype._processNewShape = function (t) {
          Math.max(t.width * t.scaleX, t.height * t.scaleY) < this.minSize &&
            t.set({ scaleX: 1, scaleY: 1 }),
            t.setCoords();
        }),
        (o.prototype._loadSVGImage = function (t, e) {
          n.loadSVGFromURL(
            t,
            function (i, r) {
              var s = n.util.groupSVGElements(i, r);
              (s._dt_sourceURL = t), e(s, this._renderToImage(s));
            }.bind(this)
          );
        }),
        (o.prototype._loadNonSVGImage = function (t, e) {
          n.util.loadImage(
            t,
            function (i) {
              var r = new n.Image(i, { crossOrigin: i.crossOrigin });
              (r._dt_sourceURL = t), e(r, i);
            },
            null,
            "anonymous"
          );
        }),
        (o.prototype._renderToImage = function (t) {
          var e = new n.Canvas(document.createElement("canvas"));
          e.setDimensions({ width: t.width, height: t.height }),
            e.add(t).renderAll();
          var i = new Image();
          return (i.src = e.toDataURL()), i;
        }),
        (t.exports = o);
    },
    function (t, e, i) {
      var n = i(0),
        r = i(5);
      function s(t, e) {
        r.call(this, t, e),
          (this.singleUse = !0),
          this.master.$element.on(
            "keydown",
            function (t) {
              (8 !== t.keyCode && 46 !== t.keyCode) ||
                (this.master.currentTool !== this.master.tools.text &&
                  this.master.currentTool !== this.master.tools.annotation &&
                  (this.use(), t.preventDefault()));
            }.bind(this)
          );
      }
      n(s, r),
        (s.prototype.use = function () {
          var t = this.canvas;
          t.getActiveObjects().forEach(function (e) {
            t.remove(e);
          }),
            t.discardActiveObject().renderAll(),
            this.master.pushToHistory();
        }),
        (t.exports = s);
    },
    function (t, e, i) {
      i(2).fabric;
      var n = i(0),
        r = i(5);
      function s(t, e) {
        r.call(this, t, e),
          (this.singleUse = !0),
          (this._clipboard = null),
          this.master.$element.on(
            "keydown",
            function (t) {
              this._inTextEditMode() ||
                (67 === t.keyCode &&
                  (t.ctrlKey || t.metaKey) &&
                  (this.copy(), t.preventDefault()),
                86 === t.keyCode &&
                  (t.ctrlKey || t.metaKey) &&
                  (this.paste(), t.preventDefault()));
            }.bind(this)
          );
      }
      n(s, r),
        (s.prototype.use = function () {
          this.copy(
            function () {
              this.paste();
            }.bind(this)
          );
        }),
        (s.prototype.copy = function (t) {
          var e = this.canvas.getActiveObject();
          if (e) {
            e._dt_sourceObj && (e = e._dt_sourceObj);
            var i = this.master.ADDITIONAL_PROPS_TO_SERIALIZE;
            e.clone(
              function (e) {
                this._updateClipboard(e), "function" == typeof t && t();
              }.bind(this),
              i
            );
          }
        }),
        (s.prototype.paste = function () {
          if (this._clipboard) {
            var t = this._clipboard;
            this.canvas.discardActiveObject(),
              t.set({ left: t.left + 15, top: t.top + 15 }),
              t.setCoords(),
              "activeSelection" === t.type
                ? (t.getObjects().forEach(
                    function (t) {
                      this.canvas.add(t);
                    }.bind(this)
                  ),
                  this.canvas.setActiveObject(t))
                : (this.canvas.add(t), this.canvas.setActiveObject(t)),
              this.canvas.renderAll(),
              this.master.pushToHistory(),
              (this._clipboard = null),
              this.copy();
          }
        }),
        (s.prototype._updateClipboard = function (t) {
          this._clipboard = t;
        }),
        (s.prototype._inTextEditMode = function () {
          var t = this.canvas.getActiveObject();
          return t && t.isEditing;
        }),
        (t.exports = s);
    },
    function (t, e, i) {
      var n = i(1),
        r = i(2).fabric,
        s = i(0),
        o = i(4),
        a = i(90).v4,
        h = i(32);
      function c(t, e) {
        o.call(this, t, e),
          this.canvas.on(
            "text:editing:exited",
            function (t) {
              this.active && (t.target.selectable = !1),
                this._pushToHistoryIfModified(t.target);
            }.bind(this)
          ),
          this.canvas.on("object:moved", (t) => {
            t.target.annotationId && this.master.pushToHistory();
          }),
          h(this);
      }
      s(c, o),
        (c.prototype.mouseDown = function (t) {
          if (!t.target || !t.target.isEditing) {
            c.super.mouseDown.call(this, t);
            var e = this.canvas.findTarget(t.e);
            if (e && e.type === r.AnnotationText.prototype.type)
              this.editText(e, t.e);
            else if (e && e.type === r.AnnotationBorder.prototype.type) {
              var i = r.Annotations.get(
                e.annotationId,
                r.AnnotationText.prototype.type
              );
              this.editText(i, t.e);
            } else if (
              this.active &&
              !t.e._dt_doNotCreateNewTextObj &&
              (!e || !e.annotationId)
            ) {
              var n = this.canvas.getPointer(t.e),
                s = n.x,
                o = n.y,
                h = a();
              (i = new r.AnnotationText("", {
                annotationId: h,
                left: s,
                top: o,
                fontFamily: "Helvetica, Arial, sans-serif",
                fontSize: 16,
                fill: "#3f3f3f",
              })).hasControls = !1;
              var l = new r.AnnotationArrow(r.Annotations.calcArrowPoints(i), {
                annotationId: h,
                stroke: "#3f3f3f",
                strokeWidth: 4,
                selectable: !1,
              });
              this.canvas.add(l);
              var u = r.Annotations.calcBorderRect(i),
                g = new r.AnnotationBorder({
                  annotationId: h,
                  left: u.left,
                  top: u.top,
                  width: u.width,
                  height: u.height,
                  fill: "white",
                  stroke: "#3f3f3f",
                  rx: 4,
                  ry: 4,
                });
              this.canvas.add(g),
                this.actionComplete(i),
                (i.perPixelTargetFind = !1),
                this.canvas.add(i),
                this.editText(i, t.e),
                t.e.preventDefault(),
                this.master.pushToHistory();
            }
          }
        }),
        (c.prototype.activate = function () {
          c.super.activate.call(this, !0);
        }),
        (c.prototype.deactivate = function () {
          c.super.deactivate.call(this), this.exitTextEditing();
        }),
        (c.prototype.exitTextEditing = function () {
          var t = this.canvas.getActiveObject();
          t && t.isEditing && this.canvas.discardActiveObject();
        }),
        (c.prototype.editText = function (t, e) {
          this.canvas.setActiveObject(t),
            t.enterEditing(),
            t.setCursorByClick(e),
            t.hiddenTextarea &&
              t.canvas &&
              (t.canvas.wrapperEl.appendChild(t.hiddenTextarea),
              r.isTouchSupported &&
                n(t.hiddenTextarea).css({
                  left: "-1000px",
                  top: e.pageY || 0,
                  "font-size": "50px",
                }),
              t.hiddenTextarea.focus()),
            this._exitTextEditingOnFirstClick();
        }),
        (c.prototype._exitTextEditingOnFirstClick = function () {
          var t = this,
            e = this.canvas;
          function i(r) {
            if (!(n(r.target).closest(".dt-keep-text-edit-mode").length > 0)) {
              var s = e.findTarget(r),
                o = e.getActiveObject();
              s !== o &&
                o &&
                o.isEditing &&
                (window.removeEventListener("mousedown", i, !0),
                window.removeEventListener("touchstart", i, !0),
                t.exitTextEditing(),
                (r._dt_doNotCreateNewTextObj = !0));
            }
          }
          window.addEventListener("mousedown", i, !0),
            window.addEventListener("touchstart", i, !0);
        }),
        (c.prototype._pushToHistoryIfModified = function (t) {
          t.text !== t._dt_lastText &&
            (this.master.pushToHistory(), (t._dt_lastText = t.text));
        }),
        (t.exports = c);
    },
    function (t, e, i) {
      var n = i(2).fabric;
      (t.exports = function (t) {
        var e = t.canvas;
        e.__annotationsHandled ||
          ((e.__annotationsHandled = !0),
          e.on("object:moving", (t) => {
            var i = t.target.annotationId;
            if (i && t.target.type === n.AnnotationText.prototype.type) {
              const t = {};
              e.forEachObject((e) => {
                e.annotationId === i &&
                  (t[e.type.replace("annotation-", "")] = e);
              });
              const { text: o, border: a, arrow: h } = t;
              if (!o || !a || !h) return;
              var r = n.Annotations.calcBorderRect(o);
              (a.left === r.left && a.top === r.top) ||
                (a.set(r), e.requestRenderAll());
              var s = n.Annotations.calcArrowPoints(o, h);
              (h.x1 === s[0] && h.y1 === s[1]) ||
                (h.set({ x1: s[0], y1: s[1] }), e.requestRenderAll());
            }
          }),
          e.on("object:removed", (t) => {
            var i = t.target && t.target.annotationId;
            i &&
              t.target.type !== n.AnnotationControlPoint.prototype.type &&
              e.forEachObject((t) => {
                t.annotationId === i && e.remove(t);
              });
          }),
          e.on("text:editing:entered", (t) => {
            (t.target.__annotationTextLastValue =
              t.target.hiddenTextarea.value),
              t.target.__annotationKeyUpHandler &&
                t.target.hiddenTextarea.removeEventListener(
                  "keyup",
                  t.target.__annotationKeyUpHandler
                ),
              (t.target.__annotationKeyUpHandler = (i) => {
                var n = i.key,
                  r = t.target.hiddenTextarea.value;
                ("Delete" !== n && "Backspace" !== n) ||
                  "" !== r ||
                  "" !== t.target.__annotationTextLastValue ||
                  (t.target.hiddenTextarea.removeEventListener(
                    "keyup",
                    t.target.__annotationKeyUpHandler
                  ),
                  (t.target.__annotationKeyUpHandler = null),
                  e.remove(t.target)),
                  (t.target.__annotationTextLastValue = r);
              }),
              t.target.hiddenTextarea.addEventListener(
                "keyup",
                t.target.__annotationKeyUpHandler
              );
          }),
          e.on("text:editing:exiting", (t) => {
            t.target.__annotationKeyUpHandler &&
              (t.target.hiddenTextarea.removeEventListener(
                "keyup",
                t.target.__annotationKeyUpHandler
              ),
              (t.target.__annotationKeyUpHandler = null));
          }));
      }),
        (function () {
          "use strict";
          var t = n.util.object.extend;
          n.Annotations
            ? n.warn("fabric.Annotations is already defined")
            : ((n.Annotations = {
                margin: 10,
                getObject: function (t, e, i) {
                  return t.getObjects(i).find((t) => t.annotationId === e);
                },
                getAllAnnotationIds: function (t) {
                  return t
                    .getObjects(n.AnnotationText.prototype.type)
                    .reduce((t, e) => (t.push(e.annotationId), t), []);
                },
                addControlPoint: function (t, e) {
                  var i = n.Annotations.getObject(
                    e,
                    t,
                    n.AnnotationControlPoint.prototype.type
                  );
                  if (!i) {
                    var r = n.Annotations.getObject(
                        e,
                        t,
                        n.AnnotationText.prototype.type
                      ),
                      s = n.Annotations.getObject(
                        e,
                        t,
                        n.AnnotationArrow.prototype.type
                      );
                    r &&
                      s &&
                      ((i = new n.AnnotationControlPoint({
                        annotationId: t,
                        left: s.x2,
                        top: s.y2,
                        width: 12,
                        height: 12,
                        strokeWidth: 0,
                        stroke: "#bcd2ff",
                        fill: "#bcd2ff",
                        hasControls: !1,
                        hasBorders: !1,
                        originX: "center",
                        originY: "center",
                      })).on("moving", () => {
                        var t = n.Annotations.calcArrowPoints(r, {
                          x2: i.left,
                          y2: i.top,
                        });
                        s.set({ x1: t[0], y1: t[1], x2: t[2], y2: t[3] }),
                          e.requestRenderAll();
                      }),
                      e.contains(i) || e.add(i));
                  }
                },
                removeControlPoint: function (t, e) {
                  var i = n.Annotations.getObject(
                    e,
                    t,
                    n.AnnotationControlPoint.prototype.type
                  );
                  i && (i.off("moving"), e.contains(i) && e.remove(i));
                },
                addAllControlPoints: function (t) {
                  n.Annotations.getAllAnnotationIds(t).forEach((e) => {
                    n.Annotations.addControlPoint(e, t);
                  });
                },
                removeAllControlPoints: function (t, e) {
                  n.Annotations.getAllAnnotationIds(t).forEach((i) => {
                    i !== e && n.Annotations.removeControlPoint(i, t);
                  });
                },
                calcRect: function (t, e) {
                  return {
                    left: t.left - e,
                    top: t.top - e,
                    width: t.width + 2 * e,
                    height: t.height + 2 * e,
                    dirty: !0,
                  };
                },
                calcTextRect: function (t) {
                  return this.calcRect(t, -this.margin);
                },
                calcBorderRect: function (t) {
                  return this.calcRect(t, this.margin);
                },
                calcArrowPoints: function (t, e) {
                  var i,
                    n,
                    r = this.calcBorderRect(t),
                    s = r.left + r.width,
                    o = r.top + r.height,
                    a = r.left + r.width / 2,
                    h = r.top + r.height / 2,
                    c = e ? e.x2 : r.left - 50,
                    l = e ? e.y2 : r.top,
                    u = Math.PI / 4,
                    g = 3 * u,
                    f = Math.atan2(l - h, c - a);
                  return (
                    f >= -u && f <= u
                      ? ((i = s), (n = h))
                      : f >= u && f <= g
                      ? ((i = a), (n = o))
                      : f >= g || f <= -g
                      ? ((i = r.left), (n = h))
                      : ((i = a), (n = r.top)),
                    [i, n, c, l]
                  );
                },
                removeControlPointsFromJSON: function (t) {
                  return (
                    t &&
                      t.objects &&
                      t.objects.length > 0 &&
                      (t.objects = t.objects.filter(
                        (t) =>
                          t.type !== n.AnnotationControlPoint.prototype.type
                      )),
                    t
                  );
                },
                disableControlsInJSON: function (t) {
                  return (
                    t &&
                      t.objects &&
                      t.objects.length > 0 &&
                      t.objects.forEach((t) => {
                        (t.hasControls = !1), (t.hasBorders = !1);
                      }),
                    t
                  );
                },
              }),
              (n.AnnotationText = n.util.createClass(n.IText, {
                type: "annotation-text",
                annotationId: "",
                initialize: function (t, e) {
                  this.callSuper("initialize", t, e),
                    (e = e || {}),
                    this.set("annotationId", e.annotationId);
                },
                containsPoint: function (t) {
                  var e = n.Annotations.calcBorderRect(this);
                  return (
                    t.x >= e.left &&
                    t.x <= e.left + e.width &&
                    t.y >= e.top &&
                    t.y <= e.top + e.height
                  );
                },
                exitEditing: function () {
                  this.canvas &&
                    this.canvas.fire("text:editing:exiting", { target: this }),
                    this.callSuper("exitEditing");
                },
                _renderTextCommon: function (t, e) {
                  this.callSuper("_renderTextCommon", t, e);
                  const i = this.annotationId;
                  let r = !1;
                  const s = this.canvas
                    .getObjects(n.AnnotationBorder.prototype.type)
                    .find((t) => t.annotationId === i);
                  if (s) {
                    var o = n.Annotations.calcBorderRect(this);
                    (s.width === o.width && s.height === o.height) ||
                      (s.set(o), (r = !0));
                  }
                  const a = this.canvas
                    .getObjects(n.AnnotationArrow.prototype.type)
                    .find((t) => t.annotationId === i);
                  if (a) {
                    var h = n.Annotations.calcArrowPoints(this, a);
                    (a.x1 === h[0] && a.y1 === h[1]) ||
                      (a.set({ x1: h[0], y1: h[1] }), (r = !0));
                  }
                  r && this.canvas.requestRenderAll();
                },
                toObject: function (e) {
                  return t(this.callSuper("toObject", e), {
                    annotationId: this.get("annotationId"),
                  });
                },
              })),
              (n.AnnotationText.fromObject = function (t, e) {
                return n.Object._fromObject("AnnotationText", t, e, "text");
              }),
              (n.AnnotationBorder = n.util.createClass(n.Rect, {
                type: "annotation-border",
                annotationId: "",
                initialize: function (t) {
                  (t = t || {}),
                    this.callSuper("initialize", t),
                    this.set({
                      annotationId: t.annotationId,
                      hasControls: !1,
                      hasBorders: !1,
                      lockMovementX: !0,
                      lockMovementY: !0,
                      hoverCursor: "default",
                    });
                },
                toObject: function (e) {
                  return t(this.callSuper("toObject", e), {
                    annotationId: this.get("annotationId"),
                  });
                },
              })),
              (n.AnnotationBorder.fromObject = function (t, e) {
                return n.Object._fromObject("AnnotationBorder", t, e);
              }),
              (n.AnnotationArrow = n.util.createClass(n.Line, {
                type: "annotation-arrow",
                annotationId: "",
                _drawArrow: function (t) {
                  var e = this.x1,
                    i = this.y1,
                    n = this.x2,
                    r = this.y2,
                    s = Math.atan2(r - i, n - e);
                  t.save(),
                    (t.strokeStyle = this.stroke),
                    t.beginPath(),
                    t.moveTo(e, i),
                    t.lineTo(n, r),
                    (t.lineWidth = 5),
                    t.stroke(),
                    t.beginPath(),
                    t.moveTo(n, r),
                    t.lineTo(
                      n - 10 * Math.cos(s - Math.PI / 7),
                      r - 10 * Math.sin(s - Math.PI / 7)
                    ),
                    t.lineTo(
                      n - 10 * Math.cos(s + Math.PI / 7),
                      r - 10 * Math.sin(s + Math.PI / 7)
                    ),
                    t.lineTo(n, r),
                    t.lineTo(
                      n - 10 * Math.cos(s - Math.PI / 7),
                      r - 10 * Math.sin(s - Math.PI / 7)
                    ),
                    t.stroke(),
                    t.restore();
                },
                render: function (t) {
                  this._drawArrow(t);
                },
                initialize: function (t, e) {
                  (e = e || {}),
                    this.callSuper("initialize", t, e),
                    this.set({
                      annotationId: e.annotationId,
                      hasControls: !1,
                      hasBorders: !1,
                      lockMovementX: !0,
                      lockMovementY: !0,
                      hoverCursor: "default",
                    });
                },
                toObject: function (e) {
                  const i = {
                    x1: this.x1,
                    y1: this.y1,
                    x2: this.x2,
                    y2: this.y2,
                    annotationId: this.get("annotationId"),
                  };
                  return t(this.callSuper("toObject", e), i);
                },
              })),
              (n.AnnotationArrow.fromObject = function (t, e) {
                return (
                  (t.points = [t.x1, t.y1, t.x2, t.y2]),
                  n.Object._fromObject("AnnotationArrow", t, e, "points")
                );
              }),
              (n.AnnotationControlPoint = n.util.createClass(n.Rect, {
                type: "annotation-arrow-control-point",
                annotationId: "",
                initialize: function (t) {
                  (t = t || {}),
                    this.callSuper("initialize", t),
                    this.set({
                      annotationId: t.annotationId,
                      hasControls: !1,
                      hasBorders: !1,
                    });
                },
                toObject: function (e) {
                  return t(this.callSuper("toObject", e), {
                    annotationId: this.get("annotationId"),
                  });
                },
              })),
              (n.AnnotationControlPoint.fromObject = function (t, e) {
                return n.Object._fromObject("AnnotationControlPoint", t, e);
              }));
        })();
    },
    function (t, e, i) {
      var n = i(1),
        r = i(3),
        s = i(35),
        o = i(36),
        a = i(39);
      function h(t) {
        (this.drawingTool = t),
          (this.$tools = n("<div>").addClass("dt-tools").prependTo(t.$element)),
          this.$tools.css("height", this.drawingTool.options.height),
          (this._palettes = {}),
          (this._buttons = {}),
          (this._paletteActiveButton = {});
        var e = n.extend(!0, {}, a);
        this.drawingTool.options.stamps &&
          o(e, this.drawingTool.options.stamps);
        const i = this.drawingTool.options.buttons || [];
        if (i.length > 0) {
          const t = [];
          i.forEach((i) => {
            const n = "linesPalette" === i,
              r = "stamp" === i,
              s = "shapesPalette" === i,
              o = "text" === i,
              a = "strokeColorPalette" === i,
              h = "strokeWidthPalette" === i,
              c = "fillColorPalette" === i;
            e.buttons.forEach((e) => {
              (e.name === i ||
                (n && "lines" === e.palette) ||
                (s && "shapes" === e.palette) ||
                (o && "fontSizes" === e.palette) ||
                (a && "strokeColors" === e.palette) ||
                (h && "strokeWidths" === e.palette) ||
                (c && "fillColors" === e.palette) ||
                (r &&
                  ("stampCategories" === e.palette ||
                    e.palette.indexOf("StampsPalette") >= 0))) &&
                t.push(e);
            }),
              e.optionalButtons.forEach((e) => {
                e.name === i && t.push(e);
              });
          }),
            (e.buttons = t);
        }
        const r = this.drawingTool.options.separatorsAfter || [];
        for (var s in (r.length > 0 &&
          e.buttons.forEach((t) => {
            -1 !== r.indexOf(t.name) && (t.separatorAfter = !0);
          }),
        this._processUIDefinition(e),
        this._buttons)) {
          var h = this._buttons[s];
          h.onInit && h.onInit.call(h, this, t);
        }
      }
      (h.prototype._processUIDefinition = function (t) {
        for (var e = -1, i = -1, n = 0; n < t.buttons.length; n++)
          "main" === t.buttons[n].palette && (-1 === e && (e = n), (i = n));
        this.$tools.empty(),
          t.palettes.forEach(this._createPalette.bind(this)),
          t.buttons.forEach((t, n) => {
            this._createButton(t, n, e, i);
          });
      }),
        (h.prototype.getButton = function (t) {
          return this._buttons[t];
        }),
        (h.prototype.getPalette = function (t) {
          return this._palettes[t];
        }),
        (h.prototype.togglePalette = function (t) {
          this._palettes[t].toggle();
        }),
        (h.prototype.getMainContainer = function () {
          return this.drawingTool.$element;
        }),
        (h.prototype.getPaletteActiveButton = function (t) {
          return this._paletteActiveButton[t];
        }),
        (h.prototype._createPalette = function (t) {
          var e = new s(t, this),
            i = e.name || l();
          e.$element.appendTo(this.$tools), (this._palettes[i] = e);
        }),
        (h.prototype._createButton = function (t, e, i, n) {
          var s = [];
          e === i ? s.push("dt-first") : e === n && s.push("dt-last"),
            t.separatorAfter && s.push("dt-separator-after");
          var o = new (t.buttonClass || r)(
              t,
              this,
              this.drawingTool,
              s.join(" ")
            ),
            a = o.name || l();
          (this._buttons[a] = o), this._setupPaletteActiveButton(o);
        }),
        (h.prototype._setupPaletteActiveButton = function (t) {
          this._paletteActiveButton[t.palette] ||
            (this._paletteActiveButton[t.palette] = t),
            t.$element.on(
              "mousedown touchstart",
              function () {
                this._paletteActiveButton[t.palette] = t;
              }.bind(this)
            );
        });
      var c = 0;
      function l() {
        return c++;
      }
      t.exports = h;
    },
    function (t, e, i) {
      var n = i(1);
      n.fn.longPress = function (t, e) {
        return this.on("mousedown touchstart", function (i) {
          var r;
          (r = setTimeout(function () {
            t.call(this, i);
          }, e || 150)),
            n(window).one(
              "mouseup touchend touchcancel touchleave",
              function () {
                clearTimeout(r);
              }
            );
        });
      };
    },
    function (t, e, i) {
      var n = i(1);
      function r(t, e) {
        (this.ui = e),
          (this.name = t.name),
          (this.permanent = !!t.permanent),
          (this.hideOnClick = void 0 === t.hideOnClick || t.hideOnClick),
          (this.anchor = t.anchor),
          (this.$element = n("<div>")
            .addClass("dt-palette")
            .addClass(t.vertical ? "dt-vertical" : "dt-horizontal")),
          (this.topOffset = t.hasOwnProperty("topOffset") ? t.topOffset : 0),
          (this.leftOffset = t.hasOwnProperty("leftOffset") ? t.leftOffset : 0),
          (this._closeOnClick = function (t) {
            (!this.hideOnClick &&
              (this.$element === t.target ||
                this.$element.find(t.target).length > 0)) ||
              (this.$element.is(":visible") && this._hide(),
              this._clearWindowHandlers());
          }.bind(this)),
          this.permanent || this.$element.hide();
      }
      (r.prototype.toggle = function () {
        this.$element.is(":visible") ? this._hide() : this._show();
      }),
        (r.prototype._show = function () {
          this._position(), this.$element.show();
          var t = this.anchor && this.ui.getButton(this.anchor);
          t && t.$element.addClass("dt-active"),
            this.permanent ||
              setTimeout(
                function () {
                  n(window).on("mousedown touchstart", this._closeOnClick);
                }.bind(this),
                16
              );
        }),
        (r.prototype._hide = function () {
          this.$element.hide(), this._clearWindowHandlers();
          var t = this.anchor && this.ui.getButton(this.anchor);
          t && t.$element.removeClass("dt-active");
        }),
        (r.prototype._clearWindowHandlers = function () {
          n(window).off("mousedown touchstart", this._closeOnClick);
        }),
        (r.prototype._position = function () {
          var t = this.anchor && this.ui.getButton(this.anchor);
          if (t) {
            var e = t.$element.offset(),
              i = this.ui.getMainContainer().offset();
            this.$element.css({
              position: "absolute",
              top: e.top - i.top + this.topOffset,
              left: e.left + t.$element.outerWidth() - i.left + this.leftOffset,
            });
          }
        }),
        (t.exports = r);
    },
    function (t, e, i) {
      var n = i(37);
      t.exports = function (t, e) {
        if (e) {
          var r = (function (t, e) {
            for (var i = 0; i < e.length; i++) if (e[i].name === t) return i;
          })("text", t.buttons);
          t.buttons.splice(r + 1, 0, {
            name: "stamp",
            tooltip: "Stamp tool (click and hold to show available categories)",
            classes: "dt-expand dt-img-btn",
            label: "M",
            palette: "main",
            activatesTool: "stamp",
            onLongPress: function () {
              this.ui.togglePalette("stampCategories");
            },
            onStampChange: function (t) {
              this.$icon.attr("src", t.imgSrc);
            },
            icon: i(38),
          }),
            t.palettes.push({
              name: "stampCategories",
              anchor: "stamp",
              vertical: !0,
              hideOnClick: !1,
            }),
            Object.keys(e).forEach(function (i) {
              var r = i + "StampsCategory",
                s = i + "StampsPalette",
                o = {
                  name: r,
                  label: i,
                  tooltip: i + " category (click to show available stamps)",
                  classes: "dt-text-btn dt-expand",
                  palette: "stampCategories",
                  onClick: function () {
                    this.ui.togglePalette(s);
                  },
                };
              t.buttons.push(o);
              var a,
                h,
                c,
                l = { name: s, anchor: r, topOffset: -1.5, leftOffset: -1.5 };
              t.palettes.push(l),
                ((a = s),
                (h = e[i]),
                (c = []),
                h.forEach(function (t) {
                  c.push({ imageSrc: t, buttonClass: n, palette: a });
                }),
                c).forEach(function (e) {
                  t.buttons.push(e);
                });
            });
        }
      };
    },
    function (t, e, i) {
      var n = i(1),
        r = i(0),
        s = i(3);
      function o(t, e, i, r) {
        (t.onClick = function () {
          this.dt.setStampObject(this._stamp, this._imageSrc);
        }),
          s.call(this, t, e, i, r),
          (this._stamp = null),
          (this._imageSrc = i.proxy(t.imageSrc)),
          this.$element.addClass("dt-img-btn"),
          this._startWaiting(),
          this.dt.tools.stamp.loadImage(
            this._imageSrc,
            function (t, e) {
              (this._stamp = t),
                (this.$image = n(e).appendTo(this.$element)),
                this._stopWaiting();
            }.bind(this),
            null,
            "anonymous"
          ),
          i.on(
            "tool:changed",
            function (t) {
              "stamp" === t && i.tools.stamp.getStampSrc() === this._imageSrc
                ? this.setActive(!0)
                : this.setActive(!1);
            }.bind(this)
          );
      }
      r(o, s),
        (o.prototype._startWaiting = function () {
          this.setLocked(!0),
            this.$element.find("span").addClass("dt-spin").text("/");
        }),
        (o.prototype._stopWaiting = function () {
          this.setLocked(!1),
            this.$element.find("span").removeClass("dt-spin").text("");
        }),
        (t.exports = o);
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMzkuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDIwMzkuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzU0NTQ1NCIgZD0iTTkgMjJ2NmgxOHYtNmMwLTEuMS0xLjAxMi0yLTIuMjUtMmgtMTMuNUMxMC4wMTIgMjAgOSAyMC45IDkgMjJ6bTE2IDJIMTF2LTJoMTR2MnpNMTggOGMtMi43NiAwLTUgMi4yNC01IDVsNSA3IDUtN2MwLTIuNzYtMi4yNC01LTUtNXptMCA5bC0zLTRjMC0xLjY2IDEuMzQtMyAzLTNzMyAxLjM0IDMgM2wtMyA0eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMzkuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDIwMzkuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      var n = i(40),
        r = i(41),
        s = i(42),
        o = i(43),
        a = i(44),
        h = [
          { value: "", icon: i(45) },
          { value: "#3f3f3f", icon: i(46) },
          { value: "#fff", icon: i(47) },
          { value: "#bfbfbf", icon: i(48) },
          { value: "#eb0000", icon: i(49) },
          { value: "#008a00", icon: i(50) },
          { value: "#00f", icon: i(51) },
          { value: "#ff8415", icon: i(52) },
          { value: "#ff0", icon: i(53) },
          { value: "#d100d1", icon: i(54) },
        ],
        c = [
          { value: 1, icon: i(55) },
          { value: 2, icon: i(56) },
          { value: 4, icon: i(57) },
          { value: 8, icon: i(58) },
          { value: 12, icon: i(59) },
          { value: 16, icon: i(60) },
          { value: 20, icon: i(61) },
        ],
        l = {
          12: i(62),
          17: i(63),
          22: i(64),
          27: i(10),
          32: i(65),
          37: i(66),
          42: i(67),
        },
        u = {
          palettes: [
            { name: "main", permanent: !0, vertical: !0 },
            { name: "lines", anchor: "linesPalette" },
            { name: "shapes", anchor: "shapesPalette" },
            { name: "fontSizes", anchor: "text" },
            { name: "strokeColors", anchor: "strokeColorPalette" },
            { name: "fillColors", anchor: "fillColorPalette" },
            { name: "strokeWidths", anchor: "strokeWidthPalette" },
          ],
          buttons: [
            {
              name: "select",
              label: "s",
              tooltip: "Select tool",
              activatesTool: "select",
              palette: "main",
              icon: i(68),
            },
            {
              name: "free",
              tooltip: "Free hand drawing tool",
              label: "F",
              activatesTool: "free",
              palette: "main",
              icon: i(69),
            },
            {
              name: "linesPalette",
              tooltip:
                "Line tool (click and hold to show available line types)",
              classes: "dt-expand",
              reflectsTools: ["line", "arrow", "doubleArrow"],
              palette: "main",
              onInit: function () {
                this.setIcon(this.ui.getPaletteActiveButton("lines"));
              },
              onClick: function () {
                this.ui.getPaletteActiveButton("lines").click();
              },
              onLongPress: function () {
                this.ui.togglePalette("lines");
              },
              icon: i(11),
            },
            {
              name: "shapesPalette",
              tooltip:
                "Basic shape tool (click and hold to show available shapes)",
              classes: "dt-expand",
              reflectsTools: ["rect", "ellipse", "square", "circle"],
              palette: "main",
              onInit: function () {
                this.setIcon(this.ui.getPaletteActiveButton("shapes"));
              },
              onClick: function () {
                this.ui.getPaletteActiveButton("shapes").click();
              },
              onLongPress: function () {
                this.ui.togglePalette("shapes");
              },
              icon: i(12),
            },
            {
              name: "text",
              tooltip:
                "Text tool (click and hold to show available font sizes)",
              label: "T",
              classes: "dt-expand dt-keep-text-edit-mode",
              activatesTool: "text",
              palette: "main",
              onLongPress: function () {
                this.ui.togglePalette("fontSizes");
              },
              onStateChange: function (t) {
                t.fontSize &&
                  l[t.fontSize] &&
                  this.$icon.attr("src", l[t.fontSize].default);
              },
              icon: i(10),
            },
            {
              name: "strokeColorPalette",
              tooltip: "Stroke color (click and hold to show available colors)",
              buttonClass: n,
              classes: "dt-keep-text-edit-mode",
              palette: "main",
              onInit: function () {
                this.setColor(this.dt.state.stroke);
              },
              onStateChange: function (t) {
                this.setColor(t.stroke);
              },
              onClick: function () {
                this.ui.togglePalette("strokeColors");
              },
              icon: i(70),
            },
            {
              name: "fillColorPalette",
              tooltip: "Fill color (click and hold to show available colors)",
              buttonClass: r,
              palette: "main",
              onInit: function () {
                this.setColor(this.dt.state.fill);
              },
              onStateChange: function (t) {
                this.setColor(t.fill);
              },
              onClick: function () {
                this.ui.togglePalette("fillColors");
              },
              icon: i(71),
            },
            {
              name: "strokeWidthPalette",
              tooltip:
                "Stroke width (click and hold to show available options)",
              buttonClass: a,
              label: "w",
              palette: "main",
              onClick: function () {
                this.ui.togglePalette("strokeWidths");
              },
              onStateChange: function (t) {
                this.setLineWidth(t.strokeWidth);
              },
              icon: i(72),
            },
            {
              name: "clone",
              tooltip: "Clone tool",
              label: "c",
              activatesTool: "clone",
              palette: "main",
              onInit: g,
              icon: i(73),
            },
            {
              name: "sendToBack",
              tooltip: "Send selected objects to back",
              label: "m",
              classes: "dt-send-to",
              palette: "main",
              onInit: g,
              onClick: function () {
                this.dt.sendSelectionToBack();
              },
              icon: i(74),
            },
            {
              name: "sendToFront",
              tooltip: "Send selected objects to front",
              label: "l",
              classes: "dt-send-to",
              palette: "main",
              onInit: g,
              onClick: function () {
                this.dt.sendSelectionToFront();
              },
              icon: i(75),
            },
            {
              name: "undo",
              tooltip: "Undo",
              label: "u",
              classes: "dt-undo-redo",
              palette: "main",
              onClick: function () {
                this.dt.undo();
              },
              onInit: function () {
                this.setLocked(!0),
                  this.dt.on(
                    "undo:possible",
                    function () {
                      this.setLocked(!1);
                    }.bind(this)
                  ),
                  this.dt.on(
                    "undo:impossible",
                    function () {
                      this.setLocked(!0);
                    }.bind(this)
                  );
              },
              icon: i(76),
            },
            {
              name: "redo",
              tooltip: "Redo",
              label: "r",
              classes: "dt-undo-redo",
              palette: "main",
              onClick: function () {
                this.dt.redo();
              },
              onInit: function () {
                this.setLocked(!0),
                  this.dt.on(
                    "redo:possible",
                    function () {
                      this.setLocked(!1);
                    }.bind(this)
                  ),
                  this.dt.on(
                    "redo:impossible",
                    function () {
                      this.setLocked(!0);
                    }.bind(this)
                  );
              },
              icon: i(77),
            },
            {
              name: "trash",
              tooltip: "Delete selected objects",
              label: "d",
              activatesTool: "trash",
              palette: "main",
              onInit: g,
              icon: i(78),
            },
            {
              name: "line",
              tooltip: "Line",
              label: "L",
              activatesTool: "line",
              palette: "lines",
              icon: i(11),
            },
            {
              name: "arrow",
              tooltip: "Arrow",
              label: "A",
              activatesTool: "arrow",
              palette: "lines",
              icon: i(79),
            },
            {
              name: "doubleArrow",
              tooltip: "Double arrow",
              label: "D",
              activatesTool: "doubleArrow",
              palette: "lines",
              icon: i(80),
            },
            {
              name: "circle",
              tooltip: "Circle",
              label: "C",
              activatesTool: "circle",
              palette: "shapes",
              icon: i(12),
            },
            {
              name: "square",
              tooltip: "Square",
              label: "S",
              activatesTool: "square",
              palette: "shapes",
              icon: i(81),
            },
            {
              name: "ellipse",
              tooltip: "Ellipse",
              label: "E",
              activatesTool: "ellipse",
              palette: "shapes",
              icon: i(82),
            },
            {
              name: "rect",
              tooltip: "Rectangle",
              label: "R",
              activatesTool: "rect",
              palette: "shapes",
              icon: i(83),
            },
          ],
          optionalButtons: [
            {
              name: "annotation",
              tooltip: "Annotation tool",
              label: "a",
              classes: "dt-keep-text-edit-mode",
              activatesTool: "annotation",
              palette: "main",
              icon: i(84),
            },
          ],
        };
      function g() {
        this.setLocked(!0),
          this.dt.canvas.on(
            "selection:created",
            function () {
              this.setLocked(!1);
            }.bind(this)
          ),
          this.dt.canvas.on(
            "selection:cleared",
            function () {
              this.setLocked(!0);
            }.bind(this)
          );
      }
      [12, 17, 22, 27, 32, 37, 42].forEach(function (t) {
        u.buttons.push({
          label: "T",
          tooltip: t + "px",
          classes: "dt-keep-text-edit-mode",
          onClick: function () {
            this.dt.setFontSize(t), this.dt.setSelectionFontSize(t);
          },
          onStateChange: function (e) {
            this.setActive(e.fontSize === t);
          },
          palette: "fontSizes",
          icon: l[t],
        });
      }),
        h.forEach(function (t) {
          u.buttons.push({
            buttonClass: s,
            tooltip: t.value,
            classes: "dt-keep-text-edit-mode",
            color: t.value,
            type: "stroke",
            palette: "strokeColors",
            icon: t.icon,
          }),
            u.buttons.push({
              buttonClass: s,
              tooltip: t.value,
              color: t.value,
              type: "fill",
              palette: "fillColors",
              icon: t.icon,
            });
        }),
        c.forEach(function (t) {
          u.buttons.push({
            buttonClass: o,
            tooltip: t.value + "px",
            width: t.value,
            palette: "strokeWidths",
            icon: t.icon,
          });
        }),
        (t.exports = u);
    },
    function (t, e, i) {
      i(1);
      var n = i(0),
        r = i(3),
        s = [
          '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">',
          '    <g fill="none" fill-rule="evenodd">',
          "        <g>",
          "            <g>",
          '                <path d="M0 0H36V36H0z" transform="translate(-2131.000000, -942.000000) translate(2131.000000, 942.000000)"/>',
          "                <g>",
          '                    <path id="color_stroke_bar" fill="#545454" d="M0 18H26V23H0z" transform="translate(-2131.000000, -942.000000) translate(2131.000000, 942.000000) translate(5.000000, 7.000000)"/>',
          '                    <path id="color_stroke_outline" fill="#545454" d="M26 18v5H0v-5h26zm-.5.5H.5v4h25v-4z" transform="translate(-2131.000000, -942.000000) translate(2131.000000, 942.000000) translate(5.000000, 7.000000)"/>',
          '                    <path fill="#0481A0" d="M7.91 13.248h1.478v1.135l-1.987.353-.958-.972.347-2.016h1.12v1.5zM9.02 10.62c-.17-.17-.17-.446 0-.618l4.745-4.812c.17-.172.44-.172.61 0 .17.171.17.446 0 .618l-4.745 4.812c-.169.172-.44.172-.61 0zm4.933-7.502l-8.092 8.205-.652 3.798c-.09.513.35.956.856.869l3.744-.665L17.9 7.118c.145-.148.145-.385 0-.532l-3.42-3.47c-.148-.146-.382-.146-.527 0zm6.585 1.322l-1.42 1.441c-.146.145-.38.145-.524 0l-3.42-3.47c-.146-.147-.146-.385 0-.53l1.42-1.441c.576-.585 1.513-.585 2.091 0l1.853 1.878c.58.584.58 1.533 0 2.122z" transform="translate(-2131.000000, -942.000000) translate(2131.000000, 942.000000) translate(5.000000, 7.000000)"/>',
          "                </g>",
          "            </g>",
          "        </g>",
          "    </g>",
          "</svg>",
        ].join("");
      function o(t, e, i, n) {
        r.call(this, t, e, i, n);
      }
      n(o, r),
        (o.prototype.setColor = function (t) {
          var e =
              "none" == (t = t || "none")
                ? "none"
                : "#fff" == t || "#ff0" == t
                ? "#545454"
                : t,
            i = s
              .replace(
                'id="color_stroke_bar" fill="#545454"',
                'id="color_stroke_bar" fill="' + t + '"'
              )
              .replace(
                'id="color_stroke_outline" fill="#545454"',
                'id="color_stroke_bar" fill="' + e + '"'
              ),
            n = ["data:image/svg+xml;base64", window.btoa(i)].join(",");
          this.$element.find("img").attr("src", n);
        }),
        (t.exports = o);
    },
    function (t, e, i) {
      i(1);
      var n = i(0),
        r = i(3),
        s = [
          '<svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 36 36">',
          "    <defs>",
          '        <filter id="5d93qer36a" color-interpolation-filters="auto">',
          '            <feColorMatrix in="SourceGraphic" values="0 0 0 0 0.015686 0 0 0 0 0.505882 0 0 0 0 0.627451 0 0 0 1.000000 0"/>',
          "        </filter>",
          "    </defs>",
          '    <g fill="none" fill-rule="evenodd">',
          "        <g>",
          "            <g>",
          '                <path d="M0 0H36V36H0z" transform="translate(-2177.000000, -942.000000) translate(2177.000000, 942.000000)"/>',
          "                <g>",
          '                    <path fill-rule="nonzero" d="M0 17.999H26V22.999H0z" transform="translate(-2177.000000, -942.000000) translate(2177.000000, 942.000000) translate(5.000000, 7.000575)"/>',
          '                    <path id="color_fill_bar" fill="#545454" d="M0 18H26V23H0z" transform="translate(-2131.000000, -942.000000) translate(2131.000000, 942.000000) translate(5.000000, 7.000000)"/>',
          '                    <path id="color_fill_outline" fill="#979797" d="M26 18v5H0v-5h26zm-.5.5H.5v4h25v-4z" transform="translate(-2177.000000, -942.000000) translate(2177.000000, 942.000000) translate(5.000000, 7.000575)"/>',
          '                    <g filter="url(#5d93qer36a)" transform="translate(-2177.000000, -942.000000) translate(2177.000000, 942.000000) translate(5.000000, 7.000575)">',
          "                        <g>",
          '                            <path fill="#0481A0" d="M7.01 4.07l4.427 4.427H2.583L7.01 4.07zm6.717 4.243L5.67.257c-.34-.342-.893-.342-1.235-.001-.344.34-.344.896-.002 1.238l1.34 1.34-5.48 5.479c-.39.39-.39 1.024 0 1.414l6.01 6.01c.196.195.452.293.709.293.255 0 .511-.098.707-.293l6.01-6.01c.39-.39.39-1.023 0-1.414zM17.98 14.23c0 1.035-.839 1.875-1.874 1.875-1.035 0-1.874-.84-1.874-1.874 0-1.521 1.891-3.21 1.891-3.21s1.857 1.666 1.857 3.21" transform="translate(4.000300, 0.000000)"/>',
          "                        </g>",
          "                    </g>",
          "                </g>",
          "            </g>",
          "        </g>",
          "    </g>",
          "</svg>",
        ].join("");
      function o(t, e, i) {
        r.call(this, t, e, i);
      }
      n(o, r),
        (o.prototype.setColor = function (t) {
          var e =
              "none" == (t = t || "none")
                ? "none"
                : "#fff" == t || "#ff0" == t
                ? "#545454"
                : t,
            i = s
              .replace(
                'id="color_fill_bar" fill="#545454"',
                'id="color_fill_bar" fill="' + t + '"'
              )
              .replace(
                'id="color_fill_outline" fill="#979797"',
                'id="color_fill_bar" fill="' + e + '"'
              ),
            n = ["data:image/svg+xml;base64", window.btoa(i)].join(",");
          this.$element.find("img").attr("src", n);
        }),
        (t.exports = o);
    },
    function (t, e, i) {
      var n = i(0),
        r = i(3);
      function s(t, e, i, n) {
        var s;
        (s =
          "stroke" === t.type
            ? function () {
                this.dt.setStrokeColor(t.color),
                  this.dt.setSelectionStrokeColor(t.color);
              }
            : function () {
                this.dt.setFillColor(t.color),
                  this.dt.setSelectionFillColor(t.color);
              }),
          (t.onClick = s),
          (t.onStateChange = function (e) {
            "stroke" === t.type
              ? e.stroke === t.color
                ? this.$element.addClass("dt-active")
                : this.$element.removeClass("dt-active")
              : e.fill === t.color
              ? this.$element.addClass("dt-active")
              : this.$element.removeClass("dt-active");
          }),
          r.call(this, t, e, i, n);
      }
      n(s, r),
        (s.prototype.setBackground = function (t) {
          t
            ? this.$element.css("background", t)
            : this.$element.addClass("dt-transparent");
        }),
        (t.exports = s);
    },
    function (t, e, i) {
      i(1);
      var n = i(0),
        r = i(3);
      function s(t, e, i, n) {
        (t.onClick = function () {
          this.dt.setStrokeWidth(t.width),
            this.dt.setSelectionStrokeWidth(t.width);
        }),
          (t.onStateChange = function (e) {
            e.strokeWidth === t.width
              ? this.$element.addClass("dt-active")
              : this.$element.removeClass("dt-active");
          }),
          r.call(this, t, e, i, n);
      }
      n(s, r), (t.exports = s);
    },
    function (t, e, i) {
      var n = i(1),
        r = i(0),
        s = i(3);
      function o(t, e, i, r) {
        s.call(this, t, e, i, r),
          (this.$width = n("<div>")
            .addClass("dt-selected-line-width")
            .html(8)
            .appendTo(this.$element));
      }
      r(o, s),
        (o.prototype.setLineWidth = function (t) {
          this.$width.html(t);
        }),
        (t.exports = o);
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MTcuMDAwMDAwLCAtOTg4LjAwMDAwMCkgdHJhbnNsYXRlKDE3MTcuMDAwMDAwLCA5ODguMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MTcuMDAwMDAwLCAtOTg4LjAwMDAwMCkgdHJhbnNsYXRlKDE3MTcuMDAwMDAwLCA5ODguMDAwMDAwKSB0cmFuc2xhdGUoNy4wMDAwMDAsIDcuMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTEiIGN5PSIxMSIgcj0iMTEiIGZpbGw9IiNEOEVGRjUiLz4KICAgICAgICAgICAgICAgICAgICA8ZyBmaWxsPSIjNTQ1NDU0Ij4KICAgICAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEyLjgzMyA5LjljMC0zLjY2Ny01LjUtOS45LTUuNS05LjlTNi4xMTQgMS4zODQgNC44MzEgMy4yMjdsNy44NzQgNy44NzRjLjA4Mi0uMzg1LjEyOC0uNzg5LjEyOC0xLjIwMXptLS44MDYgMi44Nkw3Ljc5MiA4LjUyNSAxLjE2NCAxLjg5NyAwIDMuMDcxbDMuMDQzIDMuMDQzYy0uNzA2IDEuMzMtMS4yMSAyLjY3Ny0xLjIxIDMuNzg2IDAgMy4wMzQgMi40NjYgNS41IDUuNSA1LjUgMS4zOTQgMCAyLjY1OS0uNTIzIDMuNjMtMS4zNzVsMi40MTEgMi40MSAxLjE2NC0xLjE2My0yLjUxMS0yLjUxMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDMuNjY2NjY3LCAyLjUwMDAwMCkiLz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzYzLjAwMDAwMCwgLTk4OC4wMDAwMDApIHRyYW5zbGF0ZSgxNzYzLjAwMDAwMCwgOTg4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTAiIGZpbGw9IiMzRjNGM0YiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MDkuMDAwMDAwLCAtOTg4LjAwMDAwMCkgdHJhbnNsYXRlKDE4MDkuMDAwMDAwLCA5ODguMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzk3OTc5NyIgZD0iTTE4IDhjNS41MjMgMCAxMCA0LjQ3NyAxMCAxMHMtNC40NzcgMTAtMTAgMTBTOCAyMy41MjMgOCAxOCAxMi40NzcgOCAxOCA4eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MDkuMDAwMDAwLCAtOTg4LjAwMDAwMCkgdHJhbnNsYXRlKDE4MDkuMDAwMDAwLCA5ODguMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZGRiIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTggOWMtNC45NyAwLTkgNC4wMy05IDlzNC4wMyA5IDkgOSA5LTQuMDMgOS05LTQuMDMtOS05LTl6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgwOS4wMDAwMDAsIC05ODguMDAwMDAwKSB0cmFuc2xhdGUoMTgwOS4wMDAwMDAsIDk4OC4wMDAwMDApIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODU1LjAwMDAwMCwgLTk4OC4wMDAwMDApIHRyYW5zbGF0ZSgxODU1LjAwMDAwMCwgOTg4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTAiIGZpbGw9IiNCRkJGQkYiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTAxLjAwMDAwMCwgLTk4OC4wMDAwMDApIHRyYW5zbGF0ZSgxOTAxLjAwMDAwMCwgOTg4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTAiIGZpbGw9IiNFQjAwMDAiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTQ3LjAwMDAwMCwgLTk4OC4wMDAwMDApIHRyYW5zbGF0ZSgxOTQ3LjAwMDAwMCwgOTg4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTAiIGZpbGw9IiMwMDhBMDAiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTkzLjAwMDAwMCwgLTk4OC4wMDAwMDApIHRyYW5zbGF0ZSgxOTkzLjAwMDAwMCwgOTg4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTAiIGZpbGw9IiMwMEYiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDM5LjAwMDAwMCwgLTk4OC4wMDAwMDApIHRyYW5zbGF0ZSgyMDM5LjAwMDAwMCwgOTg4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTAiIGZpbGw9IiNGRjg0MTUiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwODUuMDAwMDAwLCAtOTg4LjAwMDAwMCkgdHJhbnNsYXRlKDIwODUuMDAwMDAwLCA5ODguMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzk3OTc5NyIgZD0iTTE4IDhjNS41MjMgMCAxMCA0LjQ3NyAxMCAxMHMtNC40NzcgMTAtMTAgMTBTOCAyMy41MjMgOCAxOCAxMi40NzcgOCAxOCA4eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwODUuMDAwMDAwLCAtOTg4LjAwMDAwMCkgdHJhbnNsYXRlKDIwODUuMDAwMDAwLCA5ODguMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iI0ZGMCIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTggOWMtNC45NyAwLTkgNC4wMy05IDlzNC4wMyA5IDkgOSA5LTQuMDMgOS05LTQuMDMtOS05LTl6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjA4NS4wMDAwMDAsIC05ODguMDAwMDAwKSB0cmFuc2xhdGUoMjA4NS4wMDAwMDAsIDk4OC4wMDAwMDApIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTMxLjAwMDAwMCwgLTk4OC4wMDAwMDApIHRyYW5zbGF0ZSgyMTMxLjAwMDAwMCwgOTg4LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIvPgogICAgICAgICAgICAgICAgPGNpcmNsZSBjeD0iMTgiIGN5PSIxOCIgcj0iMTAiIGZpbGw9IiNEMTAwRDEiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3NjMuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgxNzYzLjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjNTQ1NDU0IiBkPSJNNSAxNy41SDMxVjE4LjVINXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzYzLjAwMDAwMCwgLTEwMzYuMDAwMDAwKSB0cmFuc2xhdGUoMTc2My4wMDAwMDAsIDEwMzYuMDAwMDAwKSIvPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDM2IDQwIj4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlY0MEgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MDkuMDAwMDAwLCAtMTAzNC4wMDAwMDApIHRyYW5zbGF0ZSgxODA5LjAwMDAwMCwgMTAzNC4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjNTQ1NDU0IiBkPSJNNSAxOC44ODlIMzFWMjEuMTExSDV6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgwOS4wMDAwMDAsIC0xMDM0LjAwMDAwMCkgdHJhbnNsYXRlKDE4MDkuMDAwMDAwLCAxMDM0LjAwMDAwMCkiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NTUuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgxODU1LjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjNTQ1NDU0IiBkPSJNNSAxNkgzMVYyMEg1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NTUuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgxODU1LjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5MDEuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgxOTAxLjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjNTQ1NDU0IiBkPSJNNSAxNEgzMVYyMkg1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5MDEuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgxOTAxLjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5NDcuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgxOTQ3LjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjNTQ1NDU0IiBkPSJNNSAxMkgzMVYyNEg1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5NDcuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgxOTQ3LjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5OTMuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgxOTkzLjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjNTQ1NDU0IiBkPSJNNSAxMEgzMVYyNkg1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5OTMuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgxOTkzLjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwMzkuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgyMDM5LjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjNTQ1NDU0IiBkPSJNNSA4SDMxVjI4SDV6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjAzOS4wMDAwMDAsIC0xMDM2LjAwMDAwMCkgdHJhbnNsYXRlKDIwMzkuMDAwMDAwLCAxMDM2LjAwMDAwMCkiLz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MTcuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE3MTcuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTUuMDggOC41MzFMNS4wOCA3Ljc5MyA0LjEyNSA3LjYyOSA0LjEyNSAwLjg3MyA2LjA1OSAwLjg3MyA2LjIzNCAyLjA1NyA3LjA5IDIuMDU3IDcuMDkgMCAwIDAgMCAyLjA1NyAwLjg2NyAyLjA1NyAxLjAzNyAwLjg3MyAyLjk3MSAwLjg3MyAyLjk3MSA3LjYyOSAyLjAxNiA3Ljc5MyAyLjAxNiA4LjUzMXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzE3LjAwMDAwMCwgLTk0Mi4wMDAwMDApIHRyYW5zbGF0ZSgxNzE3LjAwMDAwMCwgOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE0LjQ1MDAwMCwgMTMuNzMwMDAwKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3NjMuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE3NjMuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTcuMTk3IDEyLjA4Nkw3LjE5NyAxMS4wNCA1Ljg0NCAxMC44MDggNS44NDQgMS4yMzcgOC41ODMgMS4yMzcgOC44MzIgMi45MTQgMTAuMDQ0IDIuOTE0IDEwLjA0NCAwIDAgMCAwIDIuOTE0IDEuMjI5IDIuOTE0IDEuNDY5IDEuMjM3IDQuMjA4IDEuMjM3IDQuMjA4IDEwLjgwOCAyLjg1NSAxMS4wNCAyLjg1NSAxMi4wODZ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTc2My4wMDAwMDAsIC05NDIuMDAwMDAwKSB0cmFuc2xhdGUoMTc2My4wMDAwMDAsIDk0Mi4wMDAwMDApIHRyYW5zbGF0ZSgxMi45ODAwMDAsIDExLjk1MDAwMCkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MDkuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE4MDkuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTkuMzEzIDE1LjY0MUw5LjMxMyAxNC4yODcgNy41NjMgMTMuOTg2IDcuNTYzIDEuNjAxIDExLjEwNyAxLjYwMSAxMS40MyAzLjc3MSAxMi45OTggMy43NzEgMTIuOTk4IDAgMCAwIDAgMy43NzEgMS41OSAzLjc3MSAxLjkwMSAxLjYwMSA1LjQ0NiAxLjYwMSA1LjQ0NiAxMy45ODYgMy42OTUgMTQuMjg3IDMuNjk1IDE1LjY0MXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODA5LjAwMDAwMCwgLTk0Mi4wMDAwMDApIHRyYW5zbGF0ZSgxODA5LjAwMDAwMCwgOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDExLjUwMDAwMCwgMTAuMTgwMDAwKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5MDEuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE5MDEuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTEzLjU0NyAyMi43NUwxMy41NDcgMjAuNzgxIDExIDIwLjM0NCAxMSAyLjMyOCAxNi4xNTYgMi4zMjggMTYuNjI1IDUuNDg0IDE4LjkwNiA1LjQ4NCAxOC45MDYgMCAwIDAgMCA1LjQ4NCAyLjMxMyA1LjQ4NCAyLjc2NiAyLjMyOCA3LjkyMiAyLjMyOCA3LjkyMiAyMC4zNDQgNS4zNzUgMjAuNzgxIDUuMzc1IDIyLjc1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5MDEuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE5MDEuMDAwMDAwLCA5NDIuMDAwMDAwKSB0cmFuc2xhdGUoOC41NDAwMDAsIDYuNjIwMDAwKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5NDcuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE5NDcuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE1LjY2NCAyNi4zMDVMMTUuNjY0IDI0LjAyOCAxMi43MTkgMjMuNTIyIDEyLjcxOSAyLjY5MiAxOC42ODEgMi42OTIgMTkuMjIzIDYuMzQxIDIxLjg2IDYuMzQxIDIxLjg2IDAgMCAwIDAgNi4zNDEgMi42NzQgNi4zNDEgMy4xOTggMi42OTIgOS4xNiAyLjY5MiA5LjE2IDIzLjUyMiA2LjIxNSAyNC4wMjggNi4yMTUgMjYuMzA1eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5NDcuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE5NDcuMDAwMDAwLCA5NDIuMDAwMDAwKSB0cmFuc2xhdGUoNy4wNzAwMDAsIDQuODUwMDAwKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5OTMuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDE5OTMuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE3Ljc4IDI5Ljg1OUwxNy43OCAyNy4yNzUgMTQuNDM4IDI2LjcwMSAxNC40MzggMy4wNTYgMjEuMjA1IDMuMDU2IDIxLjgyIDcuMTk4IDI0LjgxNCA3LjE5OCAyNC44MTQgMCAwIDAgMCA3LjE5OCAzLjAzNSA3LjE5OCAzLjYzIDMuMDU2IDEwLjM5NyAzLjA1NiAxMC4zOTcgMjYuNzAxIDcuMDU1IDI3LjI3NSA3LjA1NSAyOS44NTl6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk5My4wMDAwMDAsIC05NDIuMDAwMDAwKSB0cmFuc2xhdGUoMTk5My4wMDAwMDAsIDk0Mi4wMDAwMDApIHRyYW5zbGF0ZSg1LjU5MDAwMCwgMy4wNzAwMDApIi8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMCAwSDM2VjM2SDB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcxNy4wMDAwMDAsIC04OTIuMDAwMDAwKSB0cmFuc2xhdGUoMTcxNy4wMDAwMDAsIDg5Mi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjNTQ1NDU0IiBkPSJNMjAuMjcgMjAuNTcxbDEuOTYyIDQuNzhjLjEzNy4zMzItLjAxOS43MDMtLjMzMi44NDRsLTEuNzI4Ljc1NGMtLjMyMi4xNDEtLjY4NC0uMDItLjgyLS4zNDJsLTEuODY2LTQuNTQtMy4wNDcgMy4xMzRjLS40MDYuNDE4LTEuMDY0LjA5Ni0xLjA2NC0uNDUyVjkuNjQzYzAtLjU3Ni43LS44NTggMS4wNjQtLjQ1Mmw5Ljk5OSAxMC4yODRjLjQwNC4zOTQuMTA2IDEuMDk2LS40MzkgMS4wOTZIMjAuMjd6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcxNy4wMDAwMDAsIC04OTIuMDAwMDAwKSB0cmFuc2xhdGUoMTcxNy4wMDAwMDAsIDg5Mi4wMDAwMDApIi8+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3NjMuMDAwMDAwLCAtODkyLjAwMDAwMCkgdHJhbnNsYXRlKDE3NjMuMDAwMDAwLCA4OTIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTMuMjIgMTUuNzMyaDEuNzU1djEuMzQ4bC0yLjM2LjQyLTEuMTM3LTEuMTU2LjQxMy0yLjM5NGgxLjMyOHYxLjc4MnptMS4zMi0zLjEyMWMtLjIwMi0uMjA0LS4yMDItLjUzMSAwLS43MzVsNS42MzUtNS43MTVjLjItLjIwMy41MjItLjIwMy43MjQgMCAuMjAxLjIwNC4yMDEuNTMxIDAgLjczNUw1LjI2NSAxMi42MWMtLjIwMS4yMDMtLjUyNC4yMDMtLjcyNSAwem01Ljg1Ny04LjkxTC43OSAxMy40NDVsLS43NzUgNC41MWMtLjEwNi42MS40MTYgMS4xMzUgMS4wMTYgMS4wMzJsNC40NDYtLjc5IDkuNjA5LTkuNzQ1Yy4xNzItLjE3NS4xNzItLjQ1NyAwLS42M0wxMS4wMjMgMy43Yy0uMTc1LS4xNzQtLjQ1My0uMTc0LS42MjYgMHptNy44MiAxLjU3TDE2LjUzIDYuOTgzYy0uMTcyLjE3Mi0uNDUuMTcyLS42MjEgMGwtNC4wNjItNC4xMmMtLjE3My0uMTc2LS4xNzMtLjQ1OCAwLS42M0wxMy41MzQuNTJjLjY4NC0uNjk1IDEuNzk3LS42OTUgMi40ODMgMGwyLjIgMi4yM2MuNjg4LjY5My42ODggMS44MjEgMCAyLjUyeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3NjMuMDAwMDAwLCAtODkyLjAwMDAwMCkgdHJhbnNsYXRlKDE3NjMuMDAwMDAwLCA4OTIuMDAwMDAwKSB0cmFuc2xhdGUoOC4yMzUyNzAsIDguNTAwMDAwKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMzEuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDIxMzEuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9ImNvbG9yX3N0cm9rZV9iYXIiIGZpbGw9IiM1NDU0NTQiIGQ9Ik0wIDE4SDI2VjIzSDB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjEzMS4wMDAwMDAsIC05NDIuMDAwMDAwKSB0cmFuc2xhdGUoMjEzMS4wMDAwMDAsIDk0Mi4wMDAwMDApIHRyYW5zbGF0ZSg1LjAwMDAwMCwgNy4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9ImNvbG9yX3N0cm9rZV9vdXRsaW5lIiBmaWxsPSIjNTQ1NDU0IiBkPSJNMjYgMTh2NUgwdi01aDI2em0tLjUuNUguNXY0aDI1di00eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMzEuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDIxMzEuMDAwMDAwLCA5NDIuMDAwMDAwKSB0cmFuc2xhdGUoNS4wMDAwMDAsIDcuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiMwNDgxQTAiIGQ9Ik03LjkxIDEzLjI0OGgxLjQ3OHYxLjEzNWwtMS45ODcuMzUzLS45NTgtLjk3Mi4zNDctMi4wMTZoMS4xMnYxLjV6TTkuMDIgMTAuNjJjLS4xNy0uMTctLjE3LS40NDYgMC0uNjE4bDQuNzQ1LTQuODEyYy4xNy0uMTcyLjQ0LS4xNzIuNjEgMCAuMTcuMTcxLjE3LjQ0NiAwIC42MThsLTQuNzQ1IDQuODEyYy0uMTY5LjE3Mi0uNDQuMTcyLS42MSAwem00LjkzMy03LjUwMmwtOC4wOTIgOC4yMDUtLjY1MiAzLjc5OGMtLjA5LjUxMy4zNS45NTYuODU2Ljg2OWwzLjc0NC0uNjY1TDE3LjkgNy4xMThjLjE0NS0uMTQ4LjE0NS0uMzg1IDAtLjUzMmwtMy40Mi0zLjQ3Yy0uMTQ4LS4xNDYtLjM4Mi0uMTQ2LS41MjcgMHptNi41ODUgMS4zMjJsLTEuNDIgMS40NDFjLS4xNDYuMTQ1LS4zOC4xNDUtLjUyNCAwbC0zLjQyLTMuNDdjLS4xNDYtLjE0Ny0uMTQ2LS4zODUgMC0uNTNsMS40Mi0xLjQ0MWMuNTc2LS41ODUgMS41MTMtLjU4NSAyLjA5MSAwbDEuODUzIDEuODc4Yy41OC41ODQuNTggMS41MzMgMCAyLjEyMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTMxLjAwMDAwMCwgLTk0Mi4wMDAwMDApIHRyYW5zbGF0ZSgyMTMxLjAwMDAwMCwgOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDUuMDAwMDAwLCA3LjAwMDAwMCkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxkZWZzPgogICAgICAgIDxmaWx0ZXIgaWQ9IjVkOTNxZXIzNmEiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0iYXV0byI+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VHcmFwaGljIiB2YWx1ZXM9IjAgMCAwIDAgMC4wMTU2ODYgMCAwIDAgMCAwLjUwNTg4MiAwIDAgMCAwIDAuNjI3NDUxIDAgMCAwIDEuMDAwMDAwIDAiLz4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxNzcuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDIxNzcuMDAwMDAwLCA5NDIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMCAxNy45OTlIMjZWMjIuOTk5SDB6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE3Ny4wMDAwMDAsIC05NDIuMDAwMDAwKSB0cmFuc2xhdGUoMjE3Ny4wMDAwMDAsIDk0Mi4wMDAwMDApIHRyYW5zbGF0ZSg1LjAwMDAwMCwgNy4wMDA1NzUpIi8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggaWQ9ImNvbG9yX2ZpbGxfYmFyIiBmaWxsPSIjNTQ1NDU0IiBkPSJNMCAxOEgyNlYyM0gweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMzEuMDAwMDAwLCAtOTQyLjAwMDAwMCkgdHJhbnNsYXRlKDIxMzEuMDAwMDAwLCA5NDIuMDAwMDAwKSB0cmFuc2xhdGUoNS4wMDAwMDAsIDcuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGlkPSJjb2xvcl9maWxsX291dGxpbmUiIGZpbGw9IiM5Nzk3OTciIGQ9Ik0yNiAxOHY1SDB2LTVoMjZ6bS0uNS41SC41djRoMjV2LTR6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE3Ny4wMDAwMDAsIC05NDIuMDAwMDAwKSB0cmFuc2xhdGUoMjE3Ny4wMDAwMDAsIDk0Mi4wMDAwMDApIHRyYW5zbGF0ZSg1LjAwMDAwMCwgNy4wMDA1NzUpIi8+CiAgICAgICAgICAgICAgICAgICAgPGcgZmlsdGVyPSJ1cmwoIzVkOTNxZXIzNmEpIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMjE3Ny4wMDAwMDAsIC05NDIuMDAwMDAwKSB0cmFuc2xhdGUoMjE3Ny4wMDAwMDAsIDk0Mi4wMDAwMDApIHRyYW5zbGF0ZSg1LjAwMDAwMCwgNy4wMDA1NzUpIj4KICAgICAgICAgICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjMDQ4MUEwIiBkPSJNNy4wMSA0LjA3bDQuNDI3IDQuNDI3SDIuNTgzTDcuMDEgNC4wN3ptNi43MTcgNC4yNDNMNS42Ny4yNTdjLS4zNC0uMzQyLS44OTMtLjM0Mi0xLjIzNS0uMDAxLS4zNDQuMzQtLjM0NC44OTYtLjAwMiAxLjIzOGwxLjM0IDEuMzQtNS40OCA1LjQ3OWMtLjM5LjM5LS4zOSAxLjAyNCAwIDEuNDE0bDYuMDEgNi4wMWMuMTk2LjE5NS40NTIuMjkzLjcwOS4yOTMuMjU1IDAgLjUxMS0uMDk4LjcwNy0uMjkzbDYuMDEtNi4wMWMuMzktLjM5LjM5LTEuMDIzIDAtMS40MTR6TTE3Ljk4IDE0LjIzYzAgMS4wMzUtLjgzOSAxLjg3NS0xLjg3NCAxLjg3NS0xLjAzNSAwLTEuODc0LS44NC0xLjg3NC0xLjg3NCAwLTEuNTIxIDEuODkxLTMuMjEgMS44OTEtMy4yMXMxLjg1NyAxLjY2NiAxLjg1NyAzLjIxIiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg0LjAwMDMwMCwgMC4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MTcuMDAwMDAwLCAtMTAzNi4wMDAwMDApIHRyYW5zbGF0ZSgxNzE3LjAwMDAwMCwgMTAzNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8ZyBmaWxsPSIjMDQ4MUEwIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCA0TDI2IDQgMjYgMCAwIDB6TTAgOUwyNiA5IDI2IDcgMCA3ek0wIDEzTDI2IDEzIDI2IDEyIDAgMTJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTcxNy4wMDAwMDAsIC0xMDM2LjAwMDAwMCkgdHJhbnNsYXRlKDE3MTcuMDAwMDAwLCAxMDM2LjAwMDAwMCkgdHJhbnNsYXRlKDUuMDAwMDAwLCA2LjAwMDAwMCkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3MTcuMDAwMDAwLCAtMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSgxNzE3LjAwMDAwMCwgMTA4Mi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8ZyBmaWxsPSIjMDQ4MUEwIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTUgMHY1aC0yLjAwMUwxMyAySDd2NUgydjloM3YySDBWNmw2LTZoOXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzE3LjAwMDAwMCwgLTEwODIuMDAwMDAwKSB0cmFuc2xhdGUoMTcxNy4wMDAwMDAsIDEwODIuMDAwMDAwKSB0cmFuc2xhdGUoNy4wMDAwMDAsIDUuNTAwMDAwKSIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0xNiA3SDd2MThoMTVWMTNsLTYtNnpNOSAyM1Y5aDZ2NWg1djlIOXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzE3LjAwMDAwMCwgLTEwODIuMDAwMDAwKSB0cmFuc2xhdGUoMTcxNy4wMDAwMDAsIDEwODIuMDAwMDAwKSB0cmFuc2xhdGUoNy4wMDAwMDAsIDUuNTAwMDAwKSB0cmFuc2xhdGUoMTQuNTAwMDAwLCAxNi4wMDAwMDApIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTE0LjUwMDAwMCwgLTE2LjAwMDAwMCkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3NjMuMDAwMDAwLCAtMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSgxNzYzLjAwMDAwMCwgMTA4Mi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjOTc5Nzk3IiBkPSJNMjQgMTJ2MTJIMTJWMTJoMTJ6bS0yIDJoLTh2OGg4di04eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE3NjMuMDAwMDAwLCAtMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSgxNzYzLjAwMDAwMCwgMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSg2LjAwMDAwMCwgNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzk3OTc5NyIgZD0iTTE4IDZMMTggMTAgMTYgMTAgMTYgOCA4IDggOCAxNiAxMCAxNiAxMCAxOCA2IDE4IDYgNnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzYzLjAwMDAwMCwgLTEwODIuMDAwMDAwKSB0cmFuc2xhdGUoMTc2My4wMDAwMDAsIDEwODIuMDAwMDAwKSB0cmFuc2xhdGUoNi4wMDAwMDAsIDYuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiNEOEVGRjUiIGZpbGwtcnVsZT0ibm9uemVybyIgZD0iTTEwIDJMMTAgNCA0IDQgNCAxMCAyIDEwIDIgMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzYzLjAwMDAwMCwgLTEwODIuMDAwMDAwKSB0cmFuc2xhdGUoMTc2My4wMDAwMDAsIDEwODIuMDAwMDAwKSB0cmFuc2xhdGUoNi4wMDAwMDAsIDYuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiMwNDgxQTAiIGQ9Ik0xMiAwTDEyIDQgMTAgNCAxMCAyIDIgMiAyIDEwIDQgMTAgNCAxMiAwIDEyIDAgMHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xNzYzLjAwMDAwMCwgLTEwODIuMDAwMDAwKSB0cmFuc2xhdGUoMTc2My4wMDAwMDAsIDEwODIuMDAwMDAwKSB0cmFuc2xhdGUoNi4wMDAwMDAsIDYuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MDkuMDAwMDAwLCAtMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSgxODA5LjAwMDAwMCwgMTA4Mi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjMDQ4MUEwIiBkPSJNMjQgMTJ2MTJIMTJWMTJoMTJ6bS0yIDJoLTh2OGg4di04eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MDkuMDAwMDAwLCAtMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSgxODA5LjAwMDAwMCwgMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSg2LjAwMDAwMCwgNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iI0Q4RUZGNSIgZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMjIgMTRMMTQgMTQgMTQgMjIgMjIgMjJ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTgwOS4wMDAwMDAsIC0xMDgyLjAwMDAwMCkgdHJhbnNsYXRlKDE4MDkuMDAwMDAwLCAxMDgyLjAwMDAwMCkgdHJhbnNsYXRlKDYuMDAwMDAwLCA2LjAwMDAwMCkiLz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsPSIjOTc5Nzk3IiBkPSJNMTggNkwxOCAxMCAxNiAxMCAxNiA4IDggOCA4IDE2IDEwIDE2IDEwIDE4IDYgMTggNiA2eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MDkuMDAwMDAwLCAtMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSgxODA5LjAwMDAwMCwgMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSg2LjAwMDAwMCwgNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzk3OTc5NyIgZD0iTTEyIDBMMTIgNCAxMCA0IDEwIDIgMiAyIDIgMTAgNCAxMCA0IDEyIDAgMTIgMCAweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4MDkuMDAwMDAwLCAtMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSgxODA5LjAwMDAwMCwgMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSg2LjAwMDAwMCwgNi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NTUuMDAwMDAwLCAtMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSgxODU1LjAwMDAwMCwgMTA4Mi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCAwTDI0IDAgMjQgMjQgMCAyNHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODU1LjAwMDAwMCwgLTEwODIuMDAwMDAwKSB0cmFuc2xhdGUoMTg1NS4wMDAwMDAsIDEwODIuMDAwMDAwKSB0cmFuc2xhdGUoNi4wMDAwMDAsIDYuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiMwNDgxQTAiIGQ9Ik0xMi41IDhjLTIuNjUgMC01LjA1Ljk5LTYuOSAyLjZMMiA3djloOWwtMy42Mi0zLjYyYzEuMzktMS4xNiAzLjE2LTEuODggNS4xMi0xLjg4IDMuNTQgMCA2LjU1IDIuMzEgNy42IDUuNWwyLjM3LS43OEMyMS4wOCAxMS4wMyAxNy4xNSA4IDEyLjUgOHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xODU1LjAwMDAwMCwgLTEwODIuMDAwMDAwKSB0cmFuc2xhdGUoMTg1NS4wMDAwMDAsIDEwODIuMDAwMDAwKSB0cmFuc2xhdGUoNi4wMDAwMDAsIDYuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5MDEuMDAwMDAwLCAtMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSgxOTAxLjAwMDAwMCwgMTA4Mi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8Zz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMCAwTDI0IDAgMjQgMjQgMCAyNHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTAxLjAwMDAwMCwgLTEwODIuMDAwMDAwKSB0cmFuc2xhdGUoMTkwMS4wMDAwMDAsIDEwODIuMDAwMDAwKSB0cmFuc2xhdGUoNi4wMDAwMDAsIDYuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgICAgIDxwYXRoIGZpbGw9IiMwNDgxQTAiIGQ9Ik0xOC40IDEwLjZDMTYuNTUgOC45OSAxNC4xNSA4IDExLjUgOGMtNC42NSAwLTguNTggMy4wMy05Ljk2IDcuMjJMMy45IDE2YzEuMDUtMy4xOSA0LjA1LTUuNSA3LjYtNS41IDEuOTUgMCAzLjczLjcyIDUuMTIgMS44OEwxMyAxNmg5VjdsLTMuNiAzLjZ6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTkwMS4wMDAwMDAsIC0xMDgyLjAwMDAwMCkgdHJhbnNsYXRlKDE5MDEuMDAwMDAwLCAxMDgyLjAwMDAwMCkgdHJhbnNsYXRlKDYuMDAwMDAwLCA2LjAwMDAwMCkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5NDYuMDAwMDAwLCAtMTA4Mi4wMDAwMDApIHRyYW5zbGF0ZSgxOTQ2LjAwMDAwMCwgMTA4Mi4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8ZyBmaWxsPSIjMDQ4MUEwIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTMuMTY3IDE4LjVoLTEwVjZoMTBtMi0yaC0xNHYxNC4xNjdjMCAxLjI4MyAxLjA1IDIuMzMzIDIuMzMzIDIuMzMzaDkuMzMzYzEuMjg0IDAgMi4zMzQtMS4wNSAyLjMzNC0yLjMzM1Y0ek0xMS4wODMgMEw1LjI1IDAgNC4wODMuOTk3IDAgLjk5NyAwIDMgMTYuMzMzIDMgMTYuMzMzLjk5NyAxMi4yNS45OTd6IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSgtMTk0Ni4wMDAwMDAsIC0xMDgyLjAwMDAwMCkgdHJhbnNsYXRlKDE5NDYuMDAwMDAwLCAxMDgyLjAwMDAwMCkgdHJhbnNsYXRlKDkuODMzMzMzLCA3Ljc1MDAwMCkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NTUuMDAwMDAwLCAtODkyLjAwMDAwMCkgdHJhbnNsYXRlKDE4NTUuMDAwMDAwLCA4OTIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE5LjAyMSAwTDE2LjAxNiA4Ljc5NyAxNC4wNyA2LjczNyAxLjQxNCAyMC4xMzcgMCAxOC42NCAxMi42NTYgNS4yMzkgMTAuNzEzIDMuMTgyeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE4NTUuMDAwMDAwLCAtODkyLjAwMDAwMCkgdHJhbnNsYXRlKDE4NTUuMDAwMDAwLCA4OTIuMDAwMDAwKSB0cmFuc2xhdGUoOC4yOTI4OTMsIDguMDk1NDc0KSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTE5MDEuMDAwMDAwLCAtODkyLjAwMDAwMCkgdHJhbnNsYXRlKDE5MDEuMDAwMDAwLCA4OTIuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGcgZmlsbD0iIzU0NTQ1NCI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTE4LjYyOSAwTDE1LjYyMyA4Ljc5NyAxMy42NzcgNi43MzcgNi4zNjIgMTQuNDgyIDguMzA4IDE2LjU0MyAwIDE5LjcyNSAzLjAwNSAxMC45MjggNC45NDggMTIuOTg1IDEyLjI2MyA1LjIzOSAxMC4zMiAzLjE4MnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xOTAxLjAwMDAwMCwgLTg5Mi4wMDAwMDApIHRyYW5zbGF0ZSgxOTAxLjAwMDAwMCwgODkyLjAwMDAwMCkgdHJhbnNsYXRlKDguNjg1NzM1LCA4LjA5NTQ3NCkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwOTMuMDAwMDAwLCAtODkzLjAwMDAwMCkgdHJhbnNsYXRlKDIwOTMuMDAwMDAwLCA4OTMuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzU0NTQ1NCIgZD0iTTE5IDB2MTlIMFYwaDE5em0tMiAySDJ2MTVoMTVWMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMDkzLjAwMDAwMCwgLTg5My4wMDAwMDApIHRyYW5zbGF0ZSgyMDkzLjAwMDAwMCwgODkzLjAwMDAwMCkgdHJhbnNsYXRlKDguNTAwMDAwLCA4LjUwMDAwMCkiLz4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBmaWxsLXJ1bGU9Im5vbnplcm8iIGQ9Ik0xNyAyTDIgMiAyIDE3IDE3IDE3eiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIwOTMuMDAwMDAwLCAtODkzLjAwMDAwMCkgdHJhbnNsYXRlKDIwOTMuMDAwMDAwLCA4OTMuMDAwMDAwKSB0cmFuc2xhdGUoOC41MDAwMDAsIDguNTAwMDAwKSIvPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICA8L2c+CiAgICAgICAgPC9nPgogICAgPC9nPgo8L3N2Zz4K");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMzkuMDAwMDAwLCAtODkzLjAwMDAwMCkgdHJhbnNsYXRlKDIxMzkuMDAwMDAwLCA4OTMuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzU0NTQ1NCIgZD0iTTEyIDBjNi42MjcgMCAxMiAzLjM1OCAxMiA3LjUgMCA0LjE0Mi01LjM3MyA3LjUtMTIgNy41UzAgMTEuNjQyIDAgNy41QzAgMy4zNTggNS4zNzMgMCAxMiAwem0wIDJDNi4zMzcgMiAyIDQuNzEgMiA3LjVTNi4zMzcgMTMgMTIgMTNzMTAtMi43MSAxMC01LjVTMTcuNjYzIDIgMTIgMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTM5LjAwMDAwMCwgLTg5My4wMDAwMDApIHRyYW5zbGF0ZSgyMTM5LjAwMDAwMCwgODkzLjAwMDAwMCkgdHJhbnNsYXRlKDYuMDAwMDAwLCAxMC41MDAwMDApIi8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMTIgMkM2LjMzNyAyIDIgNC43MSAyIDcuNVM2LjMzNyAxMyAxMiAxM3MxMC0yLjcxIDEwLTUuNVMxNy42NjMgMiAxMiAyeiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxMzkuMDAwMDAwLCAtODkzLjAwMDAwMCkgdHJhbnNsYXRlKDIxMzkuMDAwMDAwLCA4OTMuMDAwMDAwKSB0cmFuc2xhdGUoNi4wMDAwMDAsIDEwLjUwMDAwMCkiLz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTAgMEgzNlYzNkgweiIgdHJhbnNmb3JtPSJ0cmFuc2xhdGUoLTIxODUuMDAwMDAwLCAtODkzLjAwMDAwMCkgdHJhbnNsYXRlKDIxODUuMDAwMDAwLCA4OTMuMDAwMDAwKSIvPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbD0iIzU0NTQ1NCIgZD0iTTIzIDB2MTRIMFYwaDIzem0tMiAySDJ2MTBoMTlWMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTg1LjAwMDAwMCwgLTg5My4wMDAwMDApIHRyYW5zbGF0ZSgyMTg1LjAwMDAwMCwgODkzLjAwMDAwMCkgdHJhbnNsYXRlKDYuNTAwMDAwLCAxMS4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMjEgMkwyIDIgMiAxMiAyMSAxMnoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0yMTg1LjAwMDAwMCwgLTg5My4wMDAwMDApIHRyYW5zbGF0ZSgyMTg1LjAwMDAwMCwgODkzLjAwMDAwMCkgdHJhbnNsYXRlKDYuNTAwMDAwLCAxMS4wMDAwMDApIi8+CiAgICAgICAgICAgICAgICA8L2c+CiAgICAgICAgICAgIDwvZz4KICAgICAgICA8L2c+CiAgICA8L2c+Cjwvc3ZnPgo=");
    },
    function (t, e, i) {
      "use strict";
      i.r(e),
        (e.default =
          "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzNiIgaGVpZ2h0PSIzNiIgdmlld0JveD0iMCAwIDM2IDM2Ij4KICAgIDxkZWZzPgogICAgICAgIDxmaWx0ZXIgaWQ9IjEzdW5veGc0bmEiIGNvbG9yLWludGVycG9sYXRpb24tZmlsdGVycz0iYXV0byI+CiAgICAgICAgICAgIDxmZUNvbG9yTWF0cml4IGluPSJTb3VyY2VHcmFwaGljIiB2YWx1ZXM9IjAgMCAwIDAgMC4zMjk0MTIgMCAwIDAgMCAwLjMyOTQxMiAwIDAgMCAwIDAuMzI5NDEyIDAgMCAwIDEuMDAwMDAwIDAiLz4KICAgICAgICA8L2ZpbHRlcj4KICAgIDwvZGVmcz4KICAgIDxnIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CiAgICAgICAgPGc+CiAgICAgICAgICAgIDxnPgogICAgICAgICAgICAgICAgPGc+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZmlsbC1ydWxlPSJub256ZXJvIiBkPSJNMCAwaDM2djM2SDBWMHoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDI3LjAwMDAwMCwgLTgwLjAwMDAwMCkgdHJhbnNsYXRlKDc1MS4wMDAwMDAsIDU0LjAwMDAwMCkgdHJhbnNsYXRlKDI3Ni4wMDAwMDAsIDI2LjAwMDAwMCkiLz4KICAgICAgICAgICAgICAgICAgICA8ZyBmaWx0ZXI9InVybCgjMTN1bm94ZzRuYSkiIHRyYW5zZm9ybT0idHJhbnNsYXRlKC0xMDI3LjAwMDAwMCwgLTgwLjAwMDAwMCkgdHJhbnNsYXRlKDc1MS4wMDAwMDAsIDU0LjAwMDAwMCkgdHJhbnNsYXRlKDI3Ni4wMDAwMDAsIDI2LjAwMDAwMCkiPgogICAgICAgICAgICAgICAgICAgICAgICA8ZyBmaWxsPSIjNTQ1NDU0Ij4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik0yMSAwSDNDMS4zIDAgMCAxLjQgMCAzLjF2MTIuNWMwIDEuNyAxLjMgMy4xIDMgMy4xaDQuNWMuMyAwIC41LjIuNS41djMuN2MwIC4zLjIuNS41LjUuMSAwIC4yIDAgLjMtLjFsNS40LTQuNGMuMS0uMS4yLS4xLjMtLjFIMjFjMS43IDAgMy0xLjQgMy0zLjFWMy4xQzI0IDEuNCAyMi43IDAgMjEgMG0wIDJjLjUgMCAxIC41IDEgMS4xdjEyLjVjMCAuNi0uNCAxLjEtMSAxLjFoLTYuNWMtLjYgMC0xLjIuMi0xLjYuNkwxMCAxOS43di0uNGMwLTEuNC0xLjEtMi41LTIuNS0yLjVIM2MtLjUgMC0xLS41LTEtMS4xVjMuMUMyIDIuNSAyLjUgMiAzIDJoMTgiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA3LjAwMDAwMCkiLz4KICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwYXRoIGQ9Ik01IDdMMTkgNyAxOSA1IDUgNXpNNSAxMUwxNiAxMSAxNiA5IDUgOXoiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDYuMDAwMDAwLCA3LjAwMDAwMCkiLz4KICAgICAgICAgICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+Cg==");
    },
    function (t, e) {
      function i(t) {
        (this.dt = t),
          (this._suppressHistoryUpdate = !1),
          this.reset(),
          this.dt.$element.on(
            "keydown",
            function (t) {
              90 === t.keyCode && (t.ctrlKey || t.metaKey)
                ? (this.undo(), t.preventDefault())
                : 89 === t.keyCode &&
                  (t.ctrlKey || t.metaKey) &&
                  (this.redo(), t.preventDefault());
            }.bind(this)
          );
      }
      (i.prototype.undo = function (t) {
        var e = this._storage[this._idx - 1];
        e && (this._load(e, t), (this._idx -= 1));
      }),
        (i.prototype.redo = function (t) {
          var e = this._storage[this._idx + 1];
          e && (this._load(e, t), (this._idx += 1));
        }),
        (i.prototype.saveState = function (t) {
          var e = this.dt.save();
          this._suppressHistoryUpdate ||
            e === this._lastState() ||
            ((this._idx += 1),
            (this._storage[this._idx] = e),
            (this._storage.length = this._idx + 1),
            this._cutOffOldStates());
        }),
        (i.prototype.reset = function () {
          (this._storage = []), (this._idx = -1);
        }),
        (i.prototype.canUndo = function () {
          return !!this._storage[this._idx - 1];
        }),
        (i.prototype.canRedo = function () {
          return !!this._storage[this._idx + 1];
        }),
        (i.prototype._lastState = function () {
          return this._storage[this._idx];
        }),
        (i.prototype._load = function (t, e = null) {
          this.dt.load(t, e, !0);
        }),
        (i.prototype._cutOffOldStates = function () {
          var t = this._storage.length - 20;
          t > 0 &&
            (this._storage.splice(0, t),
            (this._idx = this._storage.length - 1));
        }),
        (t.exports = i);
    },
    function (t, e) {
      var i = {
        0: function (t) {
          return (
            t.canvas.objects.forEach(function (t) {
              if ("path" === t.type) {
                (t.pathOffset.x = t.left), (t.pathOffset.y = t.top);
                for (
                  var e = t.left - 0.5 * t.width,
                    i = t.top - 0.5 * t.height,
                    n = t.path,
                    r = 0;
                  r < n.length;
                  r++
                )
                  for (var s = n[r], o = 1; o < s.length; o++)
                    s[o] += o % 2 == 1 ? e : i;
              }
            }),
            (t.version = 1),
            t
          );
        },
      };
      t.exports = function (t) {
        for (void 0 === t.version && (t.version = 0); i[t.version]; )
          t = i[t.version](t);
        return t;
      };
    },
    function (t, e, i) {
      var n = i(1),
        r = i(2).fabric;
      i(9);
      function s(t) {
        (t.width = t.width * t.scaleX + t.strokeWidth * (t.scaleX - 1)),
          (t.height = t.height * t.scaleY + t.strokeWidth * (t.scaleY - 1)),
          (t.scaleX = 1),
          (t.scaleY = 1);
      }
      var o = {
          rect: function (t) {
            s(t);
          },
          ellipse: function (t) {
            s(t),
              (t.rx = Math.abs(t.width / 2)),
              (t.ry = Math.abs(t.height / 2));
          },
          line: function (t) {
            s(t),
              t.x1 > t.x2
                ? ((t.x1 = t.left + t.width), (t.x2 = t.left))
                : ((t.x2 = t.left + t.width), (t.x1 = t.left)),
              t.y1 > t.y2
                ? ((t.y1 = t.top + t.height), (t.y2 = t.top))
                : ((t.y2 = t.top + t.height), (t.y1 = t.top));
          },
          arrow: function (t) {
            this.line(t);
          },
          path: function (t) {
            for (
              var e = t.pathOffset.x, i = t.pathOffset.y, n = 0;
              n < t.path.length;
              n++
            )
              (t.path[n][1] = (t.path[n][1] - e) * t.scaleX + e),
                (t.path[n][2] = (t.path[n][2] - i) * t.scaleY + i),
                (t.path[n][3] = (t.path[n][3] - e) * t.scaleX + e),
                (t.path[n][4] = (t.path[n][4] - i) * t.scaleY + i);
            s(t);
          },
        },
        a = n.extend(!0, {}, o, {
          "i-text": function (t) {
            t.set({
              fontSize: t.get("fontSize") * t.get("scaleX"),
              strokeWidth: t.get("strokeWidth") * t.get("scaleX"),
              scaleX: 1,
              scaleY: 1,
            }),
              t.setCoords();
          },
        });
      t.exports = function (t) {
        t.on("object:scaling", function (t) {
          var e = t.target,
            i = e.type;
          o[i] && o[i](e);
        }),
          t.on("object:modified", function (t) {
            var e = t.target,
              i = e.type;
            (1 === e.scaleX && 1 === e.scaleY) || !a[i] || a[i](e);
          }),
          (r.Group.prototype.lockUniScaling = !0),
          t.on("before:selection:cleared", function (t) {
            var e = t.target;
            if ("group" === e.type && 1 !== e.scaleX)
              for (
                var i, n = e.scaleX, r = e.getObjects(), s = 0;
                s < r.length;
                s++
              )
                void 0 !== a[r[s].type] &&
                  ((i = r[s].strokeWidth),
                  (r[s].strokeWidth = 0),
                  (r[s].scaleX = n),
                  (r[s].scaleY = n),
                  a[r[s].type](r[s]),
                  (r[s].strokeWidth = i * n),
                  (r[s].scaleX = 1 / n),
                  (r[s].scaleY = 1 / n));
          });
      };
    },
    function (t, e, i) {
      var n = i(2).fabric;
      t.exports = function (t) {
        if ("undefined" != typeof Hammer && n.isTouchSupported) {
          var e,
            i,
            r,
            s,
            o,
            a = new Hammer.Manager(t.upperCanvasEl);
          a.add(new Hammer.Pinch()),
            a.on("pinchstart", function (t) {
              var n = c();
              n &&
                !h(n) &&
                (l(n, !0),
                (e = n.get("angle")),
                (i = n.get("scaleX")),
                (r = "center" !== n.originX || "center" !== n.originY) &&
                  (function (t) {
                    (s = t.originX), (o = t.originY);
                    var e = t.getCenterPoint();
                    (t.originX = "center"),
                      (t.originY = "center"),
                      (t.left = e.x),
                      (t.top = e.y);
                  })(n));
            }),
            a.on("pinchmove", function (t) {
              var n = c();
              n &&
                !h(n) &&
                (n.set({
                  scaleX: t.scale * i,
                  scaleY: t.scale * i,
                  angle: e + t.rotation,
                }),
                u(n, "scaling", t.srcEvent),
                u(n, "rotating", t.srcEvent),
                n.get("scaleX") !== t.scale * i && (i = 1 / t.scale));
            }),
            a.on("pinchend", function (t) {
              var e,
                i,
                n = c();
              n &&
                !h(n) &&
                (r &&
                  ((i = (e = n).translateToOriginPoint(
                    e.getCenterPoint(),
                    s,
                    o
                  )),
                  (e.originX = s),
                  (e.originY = o),
                  (e.left = i.x),
                  (e.top = i.y)),
                l(n, !1));
            });
        }
        function h(t) {
          return "line" === t.type || "arrow" === t.type;
        }
        function c() {
          var e = t.getActiveObjects();
          if (e.length) return e[0];
        }
        function l(t, e) {
          t.set({
            lockMovementX: e,
            lockMovementY: e,
            lockScalingX: e,
            lockScalingY: e,
          });
        }
        function u(e, i, n) {
          t.fire("object:" + i, { target: e, e: n }), e.fire(i, { e: n });
        }
      };
    },
    function (t, e, i) {
      "use strict";
      i.r(e), (e.default = i.p + "drawing-tool.css");
    },
    function (t, e, i) {
      "use strict";
      var n;
      i.r(e),
        i.d(e, "v1", function () {
          return p;
        }),
        i.d(e, "v3", function () {
          return x;
        }),
        i.d(e, "v4", function () {
          return D;
        }),
        i.d(e, "v5", function () {
          return S;
        }),
        i.d(e, "NIL", function () {
          return O;
        }),
        i.d(e, "version", function () {
          return j;
        }),
        i.d(e, "validate", function () {
          return a;
        }),
        i.d(e, "stringify", function () {
          return g;
        }),
        i.d(e, "parse", function () {
          return C;
        });
      var r = new Uint8Array(16);
      function s() {
        if (
          !n &&
          !(n =
            ("undefined" != typeof crypto &&
              crypto.getRandomValues &&
              crypto.getRandomValues.bind(crypto)) ||
            ("undefined" != typeof msCrypto &&
              "function" == typeof msCrypto.getRandomValues &&
              msCrypto.getRandomValues.bind(msCrypto)))
        )
          throw new Error(
            "crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported"
          );
        return n(r);
      }
      var o =
        /^(?:[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}|00000000-0000-0000-0000-000000000000)$/i;
      for (
        var a = function (t) {
            return "string" == typeof t && o.test(t);
          },
          h = [],
          c = 0;
        c < 256;
        ++c
      )
        h.push((c + 256).toString(16).substr(1));
      var l,
        u,
        g = function (t) {
          var e =
              arguments.length > 1 && void 0 !== arguments[1]
                ? arguments[1]
                : 0,
            i = (
              h[t[e + 0]] +
              h[t[e + 1]] +
              h[t[e + 2]] +
              h[t[e + 3]] +
              "-" +
              h[t[e + 4]] +
              h[t[e + 5]] +
              "-" +
              h[t[e + 6]] +
              h[t[e + 7]] +
              "-" +
              h[t[e + 8]] +
              h[t[e + 9]] +
              "-" +
              h[t[e + 10]] +
              h[t[e + 11]] +
              h[t[e + 12]] +
              h[t[e + 13]] +
              h[t[e + 14]] +
              h[t[e + 15]]
            ).toLowerCase();
          if (!a(i)) throw TypeError("Stringified UUID is invalid");
          return i;
        },
        f = 0,
        d = 0;
      var p = function (t, e, i) {
        var n = (e && i) || 0,
          r = e || new Array(16),
          o = (t = t || {}).node || l,
          a = void 0 !== t.clockseq ? t.clockseq : u;
        if (null == o || null == a) {
          var h = t.random || (t.rng || s)();
          null == o && (o = l = [1 | h[0], h[1], h[2], h[3], h[4], h[5]]),
            null == a && (a = u = 16383 & ((h[6] << 8) | h[7]));
        }
        var c = void 0 !== t.msecs ? t.msecs : Date.now(),
          p = void 0 !== t.nsecs ? t.nsecs : d + 1,
          C = c - f + (p - d) / 1e4;
        if (
          (C < 0 && void 0 === t.clockseq && (a = (a + 1) & 16383),
          (C < 0 || c > f) && void 0 === t.nsecs && (p = 0),
          p >= 1e4)
        )
          throw new Error("uuid.v1(): Can't create more than 10M uuids/sec");
        (f = c), (d = p), (u = a);
        var A = (1e4 * (268435455 & (c += 122192928e5)) + p) % 4294967296;
        (r[n++] = (A >>> 24) & 255),
          (r[n++] = (A >>> 16) & 255),
          (r[n++] = (A >>> 8) & 255),
          (r[n++] = 255 & A);
        var v = ((c / 4294967296) * 1e4) & 268435455;
        (r[n++] = (v >>> 8) & 255),
          (r[n++] = 255 & v),
          (r[n++] = ((v >>> 24) & 15) | 16),
          (r[n++] = (v >>> 16) & 255),
          (r[n++] = (a >>> 8) | 128),
          (r[n++] = 255 & a);
        for (var m = 0; m < 6; ++m) r[n + m] = o[m];
        return e || g(r);
      };
      var C = function (t) {
        if (!a(t)) throw TypeError("Invalid UUID");
        var e,
          i = new Uint8Array(16);
        return (
          (i[0] = (e = parseInt(t.slice(0, 8), 16)) >>> 24),
          (i[1] = (e >>> 16) & 255),
          (i[2] = (e >>> 8) & 255),
          (i[3] = 255 & e),
          (i[4] = (e = parseInt(t.slice(9, 13), 16)) >>> 8),
          (i[5] = 255 & e),
          (i[6] = (e = parseInt(t.slice(14, 18), 16)) >>> 8),
          (i[7] = 255 & e),
          (i[8] = (e = parseInt(t.slice(19, 23), 16)) >>> 8),
          (i[9] = 255 & e),
          (i[10] = ((e = parseInt(t.slice(24, 36), 16)) / 1099511627776) & 255),
          (i[11] = (e / 4294967296) & 255),
          (i[12] = (e >>> 24) & 255),
          (i[13] = (e >>> 16) & 255),
          (i[14] = (e >>> 8) & 255),
          (i[15] = 255 & e),
          i
        );
      };
      var A = function (t, e, i) {
        function n(t, n, r, s) {
          if (
            ("string" == typeof t &&
              (t = (function (t) {
                t = unescape(encodeURIComponent(t));
                for (var e = [], i = 0; i < t.length; ++i)
                  e.push(t.charCodeAt(i));
                return e;
              })(t)),
            "string" == typeof n && (n = C(n)),
            16 !== n.length)
          )
            throw TypeError(
              "Namespace must be array-like (16 iterable integer values, 0-255)"
            );
          var o = new Uint8Array(16 + t.length);
          if (
            (o.set(n),
            o.set(t, n.length),
            ((o = i(o))[6] = (15 & o[6]) | e),
            (o[8] = (63 & o[8]) | 128),
            r)
          ) {
            s = s || 0;
            for (var a = 0; a < 16; ++a) r[s + a] = o[a];
            return r;
          }
          return g(o);
        }
        try {
          n.name = t;
        } catch (t) {}
        return (
          (n.DNS = "6ba7b810-9dad-11d1-80b4-00c04fd430c8"),
          (n.URL = "6ba7b811-9dad-11d1-80b4-00c04fd430c8"),
          n
        );
      };
      function v(t) {
        return 14 + (((t + 64) >>> 9) << 4) + 1;
      }
      function m(t, e) {
        var i = (65535 & t) + (65535 & e);
        return (((t >> 16) + (e >> 16) + (i >> 16)) << 16) | (65535 & i);
      }
      function I(t, e, i, n, r, s) {
        return m(((o = m(m(e, t), m(n, s))) << (a = r)) | (o >>> (32 - a)), i);
        var o, a;
      }
      function w(t, e, i, n, r, s, o) {
        return I((e & i) | (~e & n), t, e, r, s, o);
      }
      function y(t, e, i, n, r, s, o) {
        return I((e & n) | (i & ~n), t, e, r, s, o);
      }
      function M(t, e, i, n, r, s, o) {
        return I(e ^ i ^ n, t, e, r, s, o);
      }
      function b(t, e, i, n, r, s, o) {
        return I(i ^ (e | ~n), t, e, r, s, o);
      }
      var x = A("v3", 48, function (t) {
        if ("string" == typeof t) {
          var e = unescape(encodeURIComponent(t));
          t = new Uint8Array(e.length);
          for (var i = 0; i < e.length; ++i) t[i] = e.charCodeAt(i);
        }
        return (function (t) {
          for (var e = [], i = 32 * t.length, n = 0; n < i; n += 8) {
            var r = (t[n >> 5] >>> n % 32) & 255,
              s = parseInt(
                "0123456789abcdef".charAt((r >>> 4) & 15) +
                  "0123456789abcdef".charAt(15 & r),
                16
              );
            e.push(s);
          }
          return e;
        })(
          (function (t, e) {
            (t[e >> 5] |= 128 << e % 32), (t[v(e) - 1] = e);
            for (
              var i = 1732584193,
                n = -271733879,
                r = -1732584194,
                s = 271733878,
                o = 0;
              o < t.length;
              o += 16
            ) {
              var a = i,
                h = n,
                c = r,
                l = s;
              (i = w(i, n, r, s, t[o], 7, -680876936)),
                (s = w(s, i, n, r, t[o + 1], 12, -389564586)),
                (r = w(r, s, i, n, t[o + 2], 17, 606105819)),
                (n = w(n, r, s, i, t[o + 3], 22, -1044525330)),
                (i = w(i, n, r, s, t[o + 4], 7, -176418897)),
                (s = w(s, i, n, r, t[o + 5], 12, 1200080426)),
                (r = w(r, s, i, n, t[o + 6], 17, -1473231341)),
                (n = w(n, r, s, i, t[o + 7], 22, -45705983)),
                (i = w(i, n, r, s, t[o + 8], 7, 1770035416)),
                (s = w(s, i, n, r, t[o + 9], 12, -1958414417)),
                (r = w(r, s, i, n, t[o + 10], 17, -42063)),
                (n = w(n, r, s, i, t[o + 11], 22, -1990404162)),
                (i = w(i, n, r, s, t[o + 12], 7, 1804603682)),
                (s = w(s, i, n, r, t[o + 13], 12, -40341101)),
                (r = w(r, s, i, n, t[o + 14], 17, -1502002290)),
                (n = w(n, r, s, i, t[o + 15], 22, 1236535329)),
                (i = y(i, n, r, s, t[o + 1], 5, -165796510)),
                (s = y(s, i, n, r, t[o + 6], 9, -1069501632)),
                (r = y(r, s, i, n, t[o + 11], 14, 643717713)),
                (n = y(n, r, s, i, t[o], 20, -373897302)),
                (i = y(i, n, r, s, t[o + 5], 5, -701558691)),
                (s = y(s, i, n, r, t[o + 10], 9, 38016083)),
                (r = y(r, s, i, n, t[o + 15], 14, -660478335)),
                (n = y(n, r, s, i, t[o + 4], 20, -405537848)),
                (i = y(i, n, r, s, t[o + 9], 5, 568446438)),
                (s = y(s, i, n, r, t[o + 14], 9, -1019803690)),
                (r = y(r, s, i, n, t[o + 3], 14, -187363961)),
                (n = y(n, r, s, i, t[o + 8], 20, 1163531501)),
                (i = y(i, n, r, s, t[o + 13], 5, -1444681467)),
                (s = y(s, i, n, r, t[o + 2], 9, -51403784)),
                (r = y(r, s, i, n, t[o + 7], 14, 1735328473)),
                (n = y(n, r, s, i, t[o + 12], 20, -1926607734)),
                (i = M(i, n, r, s, t[o + 5], 4, -378558)),
                (s = M(s, i, n, r, t[o + 8], 11, -2022574463)),
                (r = M(r, s, i, n, t[o + 11], 16, 1839030562)),
                (n = M(n, r, s, i, t[o + 14], 23, -35309556)),
                (i = M(i, n, r, s, t[o + 1], 4, -1530992060)),
                (s = M(s, i, n, r, t[o + 4], 11, 1272893353)),
                (r = M(r, s, i, n, t[o + 7], 16, -155497632)),
                (n = M(n, r, s, i, t[o + 10], 23, -1094730640)),
                (i = M(i, n, r, s, t[o + 13], 4, 681279174)),
                (s = M(s, i, n, r, t[o], 11, -358537222)),
                (r = M(r, s, i, n, t[o + 3], 16, -722521979)),
                (n = M(n, r, s, i, t[o + 6], 23, 76029189)),
                (i = M(i, n, r, s, t[o + 9], 4, -640364487)),
                (s = M(s, i, n, r, t[o + 12], 11, -421815835)),
                (r = M(r, s, i, n, t[o + 15], 16, 530742520)),
                (n = M(n, r, s, i, t[o + 2], 23, -995338651)),
                (i = b(i, n, r, s, t[o], 6, -198630844)),
                (s = b(s, i, n, r, t[o + 7], 10, 1126891415)),
                (r = b(r, s, i, n, t[o + 14], 15, -1416354905)),
                (n = b(n, r, s, i, t[o + 5], 21, -57434055)),
                (i = b(i, n, r, s, t[o + 12], 6, 1700485571)),
                (s = b(s, i, n, r, t[o + 3], 10, -1894986606)),
                (r = b(r, s, i, n, t[o + 10], 15, -1051523)),
                (n = b(n, r, s, i, t[o + 1], 21, -2054922799)),
                (i = b(i, n, r, s, t[o + 8], 6, 1873313359)),
                (s = b(s, i, n, r, t[o + 15], 10, -30611744)),
                (r = b(r, s, i, n, t[o + 6], 15, -1560198380)),
                (n = b(n, r, s, i, t[o + 13], 21, 1309151649)),
                (i = b(i, n, r, s, t[o + 4], 6, -145523070)),
                (s = b(s, i, n, r, t[o + 11], 10, -1120210379)),
                (r = b(r, s, i, n, t[o + 2], 15, 718787259)),
                (n = b(n, r, s, i, t[o + 9], 21, -343485551)),
                (i = m(i, a)),
                (n = m(n, h)),
                (r = m(r, c)),
                (s = m(s, l));
            }
            return [i, n, r, s];
          })(
            (function (t) {
              if (0 === t.length) return [];
              for (
                var e = 8 * t.length, i = new Uint32Array(v(e)), n = 0;
                n < e;
                n += 8
              )
                i[n >> 5] |= (255 & t[n / 8]) << n % 32;
              return i;
            })(t),
            8 * t.length
          )
        );
      });
      var D = function (t, e, i) {
        var n = (t = t || {}).random || (t.rng || s)();
        if (((n[6] = (15 & n[6]) | 64), (n[8] = (63 & n[8]) | 128), e)) {
          i = i || 0;
          for (var r = 0; r < 16; ++r) e[i + r] = n[r];
          return e;
        }
        return g(n);
      };
      function _(t, e, i, n) {
        switch (t) {
          case 0:
            return (e & i) ^ (~e & n);
          case 1:
            return e ^ i ^ n;
          case 2:
            return (e & i) ^ (e & n) ^ (i & n);
          case 3:
            return e ^ i ^ n;
        }
      }
      function T(t, e) {
        return (t << e) | (t >>> (32 - e));
      }
      var S = A("v5", 80, function (t) {
          var e = [1518500249, 1859775393, 2400959708, 3395469782],
            i = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];
          if ("string" == typeof t) {
            var n = unescape(encodeURIComponent(t));
            t = [];
            for (var r = 0; r < n.length; ++r) t.push(n.charCodeAt(r));
          } else Array.isArray(t) || (t = Array.prototype.slice.call(t));
          t.push(128);
          for (
            var s = t.length / 4 + 2,
              o = Math.ceil(s / 16),
              a = new Array(o),
              h = 0;
            h < o;
            ++h
          ) {
            for (var c = new Uint32Array(16), l = 0; l < 16; ++l)
              c[l] =
                (t[64 * h + 4 * l] << 24) |
                (t[64 * h + 4 * l + 1] << 16) |
                (t[64 * h + 4 * l + 2] << 8) |
                t[64 * h + 4 * l + 3];
            a[h] = c;
          }
          (a[o - 1][14] = (8 * (t.length - 1)) / Math.pow(2, 32)),
            (a[o - 1][14] = Math.floor(a[o - 1][14])),
            (a[o - 1][15] = (8 * (t.length - 1)) & 4294967295);
          for (var u = 0; u < o; ++u) {
            for (var g = new Uint32Array(80), f = 0; f < 16; ++f)
              g[f] = a[u][f];
            for (var d = 16; d < 80; ++d)
              g[d] = T(g[d - 3] ^ g[d - 8] ^ g[d - 14] ^ g[d - 16], 1);
            for (
              var p = i[0], C = i[1], A = i[2], v = i[3], m = i[4], I = 0;
              I < 80;
              ++I
            ) {
              var w = Math.floor(I / 20),
                y = (T(p, 5) + _(w, C, A, v) + m + e[w] + g[I]) >>> 0;
              (m = v), (v = A), (A = T(C, 30) >>> 0), (C = p), (p = y);
            }
            (i[0] = (i[0] + p) >>> 0),
              (i[1] = (i[1] + C) >>> 0),
              (i[2] = (i[2] + A) >>> 0),
              (i[3] = (i[3] + v) >>> 0),
              (i[4] = (i[4] + m) >>> 0);
          }
          return [
            (i[0] >> 24) & 255,
            (i[0] >> 16) & 255,
            (i[0] >> 8) & 255,
            255 & i[0],
            (i[1] >> 24) & 255,
            (i[1] >> 16) & 255,
            (i[1] >> 8) & 255,
            255 & i[1],
            (i[2] >> 24) & 255,
            (i[2] >> 16) & 255,
            (i[2] >> 8) & 255,
            255 & i[2],
            (i[3] >> 24) & 255,
            (i[3] >> 16) & 255,
            (i[3] >> 8) & 255,
            255 & i[3],
            (i[4] >> 24) & 255,
            (i[4] >> 16) & 255,
            (i[4] >> 8) & 255,
            255 & i[4],
          ];
        }),
        O = "00000000-0000-0000-0000-000000000000";
      var j = function (t) {
        if (!a(t)) throw TypeError("Invalid UUID");
        return parseInt(t.substr(14, 1), 16);
      };
    },
  ]);
});
