(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('@angular/core'), require('@ptsecurity/cdk/datetime'), require('messageformat'), require('moment')) :
    typeof define === 'function' && define.amd ? define('@ptsecurity/mosaic-moment-adapter/adapter', ['exports', '@angular/core', '@ptsecurity/cdk/datetime', 'messageformat', 'moment'], factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory((global.ptsecurity = global.ptsecurity || {}, global.ptsecurity['mosaic-moment-adapter'] = global.ptsecurity['mosaic-moment-adapter'] || {}, global.ptsecurity['mosaic-moment-adapter'].adapter = {}), global.ng.core, global.datetime, global.MessageFormat, global._rollupMoment));
}(this, (function (exports, core, datetime, MessageFormat, _rollupMoment) { 'use strict';

    function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e : { 'default': e }; }

    function _interopNamespace(e) {
        if (e && e.__esModule) return e;
        var n = Object.create(null);
        if (e) {
            Object.keys(e).forEach(function (k) {
                if (k !== 'default') {
                    var d = Object.getOwnPropertyDescriptor(e, k);
                    Object.defineProperty(n, k, d.get ? d : {
                        enumerable: true,
                        get: function () {
                            return e[k];
                        }
                    });
                }
            });
        }
        n['default'] = e;
        return Object.freeze(n);
    }

    var MessageFormat__namespace = /*#__PURE__*/_interopNamespace(MessageFormat);
    var _rollupMoment__default = /*#__PURE__*/_interopDefaultLegacy(_rollupMoment);
    var _rollupMoment__namespace = /*#__PURE__*/_interopNamespace(_rollupMoment);

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation.

    Permission to use, copy, modify, and/or distribute this software for any
    purpose with or without fee is hereby granted.

    THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
    REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
    AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
    INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
    LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
    OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
    PERFORMANCE OF THIS SOFTWARE.
    ***************************************************************************** */
    /* global Reflect, Promise */
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b)
                if (Object.prototype.hasOwnProperty.call(b, p))
                    d[p] = b[p]; };
        return extendStatics(d, b);
    };
    function __extends(d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    }
    var __assign = function () {
        __assign = Object.assign || function __assign(t) {
            for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                    if (Object.prototype.hasOwnProperty.call(s, p))
                        t[p] = s[p];
            }
            return t;
        };
        return __assign.apply(this, arguments);
    };
    function __rest(s, e) {
        var t = {};
        for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
                t[p] = s[p];
        if (s != null && typeof Object.getOwnPropertySymbols === "function")
            for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
                if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                    t[p[i]] = s[p[i]];
            }
        return t;
    }
    function __decorate(decorators, target, key, desc) {
        var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
        if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
            r = Reflect.decorate(decorators, target, key, desc);
        else
            for (var i = decorators.length - 1; i >= 0; i--)
                if (d = decorators[i])
                    r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
        return c > 3 && r && Object.defineProperty(target, key, r), r;
    }
    function __param(paramIndex, decorator) {
        return function (target, key) { decorator(target, key, paramIndex); };
    }
    function __metadata(metadataKey, metadataValue) {
        if (typeof Reflect === "object" && typeof Reflect.metadata === "function")
            return Reflect.metadata(metadataKey, metadataValue);
    }
    function __awaiter(thisArg, _arguments, P, generator) {
        function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
        return new (P || (P = Promise))(function (resolve, reject) {
            function fulfilled(value) { try {
                step(generator.next(value));
            }
            catch (e) {
                reject(e);
            } }
            function rejected(value) { try {
                step(generator["throw"](value));
            }
            catch (e) {
                reject(e);
            } }
            function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
            step((generator = generator.apply(thisArg, _arguments || [])).next());
        });
    }
    function __generator(thisArg, body) {
        var _ = { label: 0, sent: function () { if (t[0] & 1)
                throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
        return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function () { return this; }), g;
        function verb(n) { return function (v) { return step([n, v]); }; }
        function step(op) {
            if (f)
                throw new TypeError("Generator is already executing.");
            while (_)
                try {
                    if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done)
                        return t;
                    if (y = 0, t)
                        op = [op[0] & 2, t.value];
                    switch (op[0]) {
                        case 0:
                        case 1:
                            t = op;
                            break;
                        case 4:
                            _.label++;
                            return { value: op[1], done: false };
                        case 5:
                            _.label++;
                            y = op[1];
                            op = [0];
                            continue;
                        case 7:
                            op = _.ops.pop();
                            _.trys.pop();
                            continue;
                        default:
                            if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) {
                                _ = 0;
                                continue;
                            }
                            if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                                _.label = op[1];
                                break;
                            }
                            if (op[0] === 6 && _.label < t[1]) {
                                _.label = t[1];
                                t = op;
                                break;
                            }
                            if (t && _.label < t[2]) {
                                _.label = t[2];
                                _.ops.push(op);
                                break;
                            }
                            if (t[2])
                                _.ops.pop();
                            _.trys.pop();
                            continue;
                    }
                    op = body.call(thisArg, _);
                }
                catch (e) {
                    op = [6, e];
                    y = 0;
                }
                finally {
                    f = t = 0;
                }
            if (op[0] & 5)
                throw op[1];
            return { value: op[0] ? op[1] : void 0, done: true };
        }
    }
    var __createBinding = Object.create ? (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        Object.defineProperty(o, k2, { enumerable: true, get: function () { return m[k]; } });
    }) : (function (o, m, k, k2) {
        if (k2 === undefined)
            k2 = k;
        o[k2] = m[k];
    });
    function __exportStar(m, o) {
        for (var p in m)
            if (p !== "default" && !Object.prototype.hasOwnProperty.call(o, p))
                __createBinding(o, m, p);
    }
    function __values(o) {
        var s = typeof Symbol === "function" && Symbol.iterator, m = s && o[s], i = 0;
        if (m)
            return m.call(o);
        if (o && typeof o.length === "number")
            return {
                next: function () {
                    if (o && i >= o.length)
                        o = void 0;
                    return { value: o && o[i++], done: !o };
                }
            };
        throw new TypeError(s ? "Object is not iterable." : "Symbol.iterator is not defined.");
    }
    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m)
            return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done)
                ar.push(r.value);
        }
        catch (error) {
            e = { error: error };
        }
        finally {
            try {
                if (r && !r.done && (m = i["return"]))
                    m.call(i);
            }
            finally {
                if (e)
                    throw e.error;
            }
        }
        return ar;
    }
    /** @deprecated */
    function __spread() {
        for (var ar = [], i = 0; i < arguments.length; i++)
            ar = ar.concat(__read(arguments[i]));
        return ar;
    }
    /** @deprecated */
    function __spreadArrays() {
        for (var s = 0, i = 0, il = arguments.length; i < il; i++)
            s += arguments[i].length;
        for (var r = Array(s), k = 0, i = 0; i < il; i++)
            for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
                r[k] = a[j];
        return r;
    }
    function __spreadArray(to, from) {
        for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
            to[j] = from[i];
        return to;
    }
    function __await(v) {
        return this instanceof __await ? (this.v = v, this) : new __await(v);
    }
    function __asyncGenerator(thisArg, _arguments, generator) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var g = generator.apply(thisArg, _arguments || []), i, q = [];
        return i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i;
        function verb(n) { if (g[n])
            i[n] = function (v) { return new Promise(function (a, b) { q.push([n, v, a, b]) > 1 || resume(n, v); }); }; }
        function resume(n, v) { try {
            step(g[n](v));
        }
        catch (e) {
            settle(q[0][3], e);
        } }
        function step(r) { r.value instanceof __await ? Promise.resolve(r.value.v).then(fulfill, reject) : settle(q[0][2], r); }
        function fulfill(value) { resume("next", value); }
        function reject(value) { resume("throw", value); }
        function settle(f, v) { if (f(v), q.shift(), q.length)
            resume(q[0][0], q[0][1]); }
    }
    function __asyncDelegator(o) {
        var i, p;
        return i = {}, verb("next"), verb("throw", function (e) { throw e; }), verb("return"), i[Symbol.iterator] = function () { return this; }, i;
        function verb(n, f) { i[n] = o[n] ? function (v) { return (p = !p) ? { value: __await(o[n](v)), done: n === "return" } : f ? f(v) : v; } : f; }
    }
    function __asyncValues(o) {
        if (!Symbol.asyncIterator)
            throw new TypeError("Symbol.asyncIterator is not defined.");
        var m = o[Symbol.asyncIterator], i;
        return m ? m.call(o) : (o = typeof __values === "function" ? __values(o) : o[Symbol.iterator](), i = {}, verb("next"), verb("throw"), verb("return"), i[Symbol.asyncIterator] = function () { return this; }, i);
        function verb(n) { i[n] = o[n] && function (v) { return new Promise(function (resolve, reject) { v = o[n](v), settle(resolve, reject, v.done, v.value); }); }; }
        function settle(resolve, reject, d, v) { Promise.resolve(v).then(function (v) { resolve({ value: v, done: d }); }, reject); }
    }
    function __makeTemplateObject(cooked, raw) {
        if (Object.defineProperty) {
            Object.defineProperty(cooked, "raw", { value: raw });
        }
        else {
            cooked.raw = raw;
        }
        return cooked;
    }
    ;
    var __setModuleDefault = Object.create ? (function (o, v) {
        Object.defineProperty(o, "default", { enumerable: true, value: v });
    }) : function (o, v) {
        o["default"] = v;
    };
    function __importStar(mod) {
        if (mod && mod.__esModule)
            return mod;
        var result = {};
        if (mod != null)
            for (var k in mod)
                if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k))
                    __createBinding(result, mod, k);
        __setModuleDefault(result, mod);
        return result;
    }
    function __importDefault(mod) {
        return (mod && mod.__esModule) ? mod : { default: mod };
    }
    function __classPrivateFieldGet(receiver, privateMap) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to get private field on non-instance");
        }
        return privateMap.get(receiver);
    }
    function __classPrivateFieldSet(receiver, privateMap, value) {
        if (!privateMap.has(receiver)) {
            throw new TypeError("attempted to set private field on non-instance");
        }
        privateMap.set(receiver, value);
        return value;
    }

    var enUS = {
        variables: {
            SECONDS: 's',
            MILLISECONDS: '.SSS',
            MICROSECONDS: '.SSSSSS',
            MINUTES: 'm',
            TIME: 'HH:mm',
            DAY: 'D',
            MONTH: 'MMM',
            YEAR: 'YYYY',
            DATE: 'MMMM\u00A0D',
            SHORT_DATE: 'MMM\u00A0D',
            DASH: '\u2013',
            LONG_DASH: '\u202F\u2013\u2009',
            NBSP: '\u00A0'
        },
        monthNames: {
            long: [
                'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September',
                'October', 'November', 'December'
            ],
            short: {
                standalone: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
                formatted: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            narrow: ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
        },
        dayOfWeekNames: {
            long: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
            short: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
            narrow: ['S', 'M', 'T', 'W', 'T', 'F', 'S']
        },
        relativeTemplates: {
            short: {
                SECONDS_AGO: 'Just now',
                MINUTES_AGO: '{MINUTES_PASSED}{NBSP}min ago',
                TODAY: '{TIME}',
                YESTERDAY: 'Yesterday, {TIME}',
                BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE}, {YEAR}}}'
            },
            long: {
                SECONDS_AGO: 'Just now',
                MINUTES_AGO: '{MINUTES_PASSED, plural, =1{#{NBSP}minute} other{#{NBSP}minutes}} ago',
                TODAY: '{TIME}',
                YESTERDAY: 'Yesterday, {TIME}',
                BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE}, {YEAR}}}'
            }
        },
        absoluteTemplates: {
            short: {
                DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE}, {YEAR}}}',
                DATETIME: "{\n                CURRENT_YEAR,\n                select,\n                    yes{{SHORT_DATE}, {TIME}}\n                    other{{SHORT_DATE}, {YEAR}, {TIME}}\n            }{\n                SHOW_MILLISECONDS,\n                select,\n                    yes{{MILLISECONDS}}\n                    other{}\n            }{\n                SHOW_MICROSECONDS,\n                    select,\n                        yes{{MICROSECONDS}}\n                        other{}\n            }"
            },
            long: {
                DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
                DATETIME: "{\n                CURRENT_YEAR,\n                select,\n                    yes{{DATE}, {TIME}}\n                    other{{DATE}, {YEAR}, {TIME}}\n            }{\n                SHOW_MILLISECONDS,\n                select,\n                    yes{{MILLISECONDS}}\n                    other{}\n            }{\n                SHOW_MICROSECONDS,\n                select,\n                    yes{{MICROSECONDS}}\n                    other{}\n            }"
            }
        },
        rangeTemplates: {
            closedRange: {
                short: {
                    START_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE}, {YEAR}}}',
                    END_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}}\n                                other{{SHORT_DATE}, {YEAR}}\n                        }}\n                }",
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}, {TIME}}\n                                other{{SHORT_DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{TIME}, {SHORT_DATE}}\n                                other{{TIME}, {SHORT_DATE}, {YEAR}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}, {TIME}}\n                                other{{SHORT_DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                        other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                }"
                },
                middle: {
                    START_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}}\n                                other{{DATE}, {YEAR}}\n                        }}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{TIME}, {DATE}}\n                                other{{TIME}, {DATE}, {YEAR}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                        other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                }"
                },
                long: {
                    START_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE}, {YEAR}}}',
                    END_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}}\n                                other{{DATE}, {YEAR}}\n                        }}\n                }",
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, from{NBSP}{TIME}}\n                                other{{DATE}, {YEAR}, from{NBSP}{TIME}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{to{NBSP}{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE}, {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME} {END_DATETIME}}\n                        other{From {START_DATETIME} to{NBSP}{END_DATETIME}}\n                }"
                }
            },
            openedRange: {
                short: {
                    START_DATE: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}}\n                        other{{SHORT_DATE} {YEAR}}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
                    DATE: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{From{NBSP}{START_DATE}}\n                        other{Until{NBSP}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}, {TIME}}\n                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                }",
                    END_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}, {TIME}}\n                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                }",
                    DATETIME: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{From{NBSP}{START_DATETIME}}\n                        other{Until{NBSP}{END_DATETIME}}\n                }"
                },
                long: {
                    START_DATE: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}}\n                        other{{DATE} {YEAR}}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                    DATE: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{From{NBSP}{START_DATE}}\n                        other{Until{NBSP}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}, {TIME}}\n                        other{{DATE} {YEAR}, {TIME}}\n                }",
                    END_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}, {TIME}}\n                        other{{DATE} {YEAR}, {TIME}}\n                }",
                    DATETIME: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{From{NBSP}{START_DATETIME}}\n                        other{Until{NBSP}{END_DATETIME}}\n                }"
                }
            }
        }
    };

    var ruRU = {
        variables: {
            SECONDS: 's',
            MILLISECONDS: ',SSS',
            MICROSECONDS: ',SSSSSS',
            MINUTES: 'm',
            TIME: 'HH:mm',
            DAY: 'D',
            MONTH: 'MMM',
            YEAR: 'YYYY',
            DATE: 'D\u00A0MMMM',
            SHORT_DATE: 'D\u00A0MMM',
            DASH: '\u2013',
            LONG_DASH: '\u202F\u2014\u2009',
            NBSP: '\u00A0'
        },
        monthNames: {
            long: [
                'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
                'Октябрь', 'Ноябрь', 'Декабрь'
            ],
            short: {
                standalone: ['янв', 'фев', 'март', 'апр', 'май', 'июнь', 'июль', 'авг', 'сен', 'окт', 'ноя', 'дек'],
                formatted: ['янв', 'фев', 'мар', 'апр', 'мая', 'июня', 'июля', 'авг', 'сен', 'окт', 'ноя', 'дек']
            },
            narrow: ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д']
        },
        dayOfWeekNames: {
            long: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
            short: ['вс', 'пн', 'вт', 'ср', 'чт', 'пт', 'сб'],
            narrow: ['В', 'П', 'В', 'С', 'Ч', 'П', 'С']
        },
        relativeTemplates: {
            short: {
                SECONDS_AGO: 'Только что',
                MINUTES_AGO: '{MINUTES_PASSED}{NBSP}мин назад',
                TODAY: '{TIME}',
                YESTERDAY: 'Вчера, {TIME}',
                BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{SHORT_DATE}, {TIME}} other{{SHORT_DATE} {YEAR}}}'
            },
            long: {
                SECONDS_AGO: 'Только что',
                MINUTES_AGO: '{MINUTES_PASSED, plural, =1{#{NBSP}минуту} =2{#{NBSP}минуты} other{#{NBSP}минут}} назад',
                TODAY: '{TIME}',
                YESTERDAY: 'Вчера, {TIME}',
                BEFORE_YESTERDAY: '{CURRENT_YEAR, select, yes{{DATE}, {TIME}} other{{DATE} {YEAR}}}'
            }
        },
        absoluteTemplates: {
            short: {
                DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
                DATETIME: "{\n                CURRENT_YEAR,\n                select,\n                    yes{{SHORT_DATE}, {TIME}}\n                    other{{SHORT_DATE} {YEAR}, {TIME}}\n            }{\n                SHOW_MILLISECONDS,\n                select,\n                    yes{{MILLISECONDS}}\n                    other{}\n            }{\n                SHOW_MICROSECONDS,\n                select,\n                    yes{{MICROSECONDS}}\n                    other{}\n            }"
            },
            long: {
                DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                DATETIME: "{\n                CURRENT_YEAR,\n                select,\n                    yes{{DATE}, {TIME}}\n                    other{{DATE} {YEAR}, {TIME}}\n            }{\n                SHOW_MILLISECONDS,\n                select,\n                    yes{{MILLISECONDS}}\n                    other{}\n            }{\n                SHOW_MICROSECONDS,\n                select,\n                    yes{{MICROSECONDS}}\n                    other{}\n            }"
            }
        },
        rangeTemplates: {
            closedRange: {
                short: {
                    START_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}}\n                                other{{SHORT_DATE} {YEAR}}\n                        }}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}, {TIME}}\n                                other{{SHORT_DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{TIME}, {SHORT_DATE}}\n                                other{{TIME}, {SHORT_DATE} {YEAR}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{SHORT_DATE}, {TIME}}\n                                other{{SHORT_DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                        other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                }"
                },
                middle: {
                    START_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}}\n                                other{{DATE} {YEAR}}\n                        }}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{TIME}, {DATE}}\n                                other{{TIME}, {DATE} {YEAR}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME}{DASH}{END_DATETIME}}\n                        other{{START_DATETIME}{LONG_DASH}{END_DATETIME}}\n                }"
                },
                long: {
                    START_DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{DAY}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}}\n                                other{{DATE} {YEAR}}\n                        }}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                    DATE: "{\n                    SAME_MONTH,\n                    select,\n                        yes{{START_DATE}{DASH}{END_DATE}}\n                        other{{START_DATE}{LONG_DASH}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, \u0441{NBSP}{TIME}}\n                                other{{DATE} {YEAR}, \u0441{NBSP}{TIME}}\n                        }}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    END_DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{\u043F\u043E{NBSP}{TIME}}\n                        other{{\n                            CURRENT_YEAR,\n                            select,\n                                yes{{DATE}, {TIME}}\n                                other{{DATE} {YEAR}, {TIME}}\n                        }}\n                }",
                    DATETIME: "{\n                    SAME_DAY,\n                    select,\n                        yes{{START_DATETIME} {END_DATETIME}}\n                        other{\u0421{NBSP}{START_DATETIME} \u043F\u043E{NBSP}{END_DATETIME}}\n                }"
                }
            },
            openedRange: {
                short: {
                    START_DATE: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}}\n                        other{{SHORT_DATE} {YEAR}}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{SHORT_DATE}} other{{SHORT_DATE} {YEAR}}}',
                    DATE: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{\u0421{NBSP}{START_DATE}}\n                        other{\u041F\u043E{NBSP}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}, {TIME}}\n                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                }",
                    END_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{SHORT_DATE}, {TIME}}\n                        other{{SHORT_DATE} {YEAR}, {TIME}}\n                }",
                    DATETIME: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{\u0421{NBSP}{START_DATETIME}}\n                        other{\u041F\u043E{NBSP}{END_DATETIME}}\n                }"
                },
                long: {
                    START_DATE: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}}\n                        other{{DATE} {YEAR}}\n                }",
                    END_DATE: '{CURRENT_YEAR, select, yes{{DATE}} other{{DATE} {YEAR}}}',
                    DATE: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{\u0421{NBSP}{START_DATE}}\n                        other{\u041F\u043E{NBSP}{END_DATE}}\n                }",
                    START_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}, {TIME}}\n                        other{{DATE} {YEAR}, {TIME}}\n                }",
                    END_DATETIME: "{\n                    CURRENT_YEAR,\n                    select,\n                        yes{{DATE}, {TIME}}\n                        other{{DATE} {YEAR}, {TIME}}\n                }",
                    DATETIME: "{\n                    RANGE_TYPE,\n                    select,\n                        onlyStart{\u0421{NBSP}{START_DATETIME}}\n                        other{\u041F\u043E{NBSP}{END_DATETIME}}\n                }"
                }
            }
        }
    };

    var moment = _rollupMoment__default['default'] || _rollupMoment__namespace;
    /** InjectionToken for moment date adapter to configure options. */
    var MC_MOMENT_DATE_ADAPTER_OPTIONS = new core.InjectionToken('MC_MOMENT_DATE_ADAPTER_OPTIONS', {
        providedIn: 'root',
        factory: MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY
    });
    /** @docs-private */
    // tslint:disable:naming-convention
    function MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY() {
        return {
            useUtc: false,
            findDateFormat: false
        };
    }
    /** Creates an array and fills it with values. */
    function range(length, valueFunction) {
        var valuesArray = Array(length);
        for (var i = 0; i < length; i++) {
            valuesArray[i] = valueFunction(i);
        }
        return valuesArray;
    }
    var MomentDateAdapter = /** @class */ (function (_super) {
        __extends(MomentDateAdapter, _super);
        function MomentDateAdapter(dateLocale, options) {
            var _this = _super.call(this) || this;
            _this.options = options;
            _this.invalidDateErrorText = 'Invalid date';
            _this.setLocale(dateLocale || moment.locale());
            _this.configureTranslator(_this.locale);
            return _this;
        }
        Object.defineProperty(MomentDateAdapter.prototype, "momentWithLocale", {
            get: function () {
                return moment().locale(this.locale);
            },
            enumerable: false,
            configurable: true
        });
        MomentDateAdapter.prototype.setLocale = function (locale) {
            var _this = this;
            _super.prototype.setLocale.call(this, locale);
            var momentLocaleData = moment.localeData(locale);
            // This is our customs translations
            var i18nLocals = ['en', 'ru'];
            if (i18nLocals.indexOf(locale) !== -1) {
                this.formatterConfig = locale === 'en' ? enUS : ruRU;
                momentLocaleData = moment.updateLocale(locale, {
                    monthsShort: {
                        format: this.formatterConfig.monthNames.short.formatted,
                        standalone: this.formatterConfig.monthNames.short.standalone
                    },
                    weekdaysShort: this.formatterConfig.dayOfWeekNames.short,
                    weekdays: this.formatterConfig.dayOfWeekNames.long
                });
            }
            this.localeData = {
                firstDayOfWeek: momentLocaleData.firstDayOfWeek(),
                longMonths: momentLocaleData.months(),
                shortMonths: momentLocaleData.monthsShort(),
                dates: range(31, function (i) { return _this.createDate(2017, 0, i + 1).format('D'); }),
                longDaysOfWeek: momentLocaleData.weekdays(),
                shortDaysOfWeek: momentLocaleData.weekdaysShort(),
                narrowDaysOfWeek: momentLocaleData.weekdaysMin()
            };
        };
        MomentDateAdapter.prototype.getLocaleData = function () {
            return this.localeData;
        };
        MomentDateAdapter.prototype.setLocaleData = function (localeData) {
            this.localeData = localeData;
        };
        MomentDateAdapter.prototype.updateLocaleData = function (localeData) {
            this.localeData = Object.assign(Object.assign({}, this.localeData), localeData);
        };
        MomentDateAdapter.prototype.getYear = function (date) {
            return this.clone(date).year();
        };
        MomentDateAdapter.prototype.getMonth = function (date) {
            return this.clone(date).month();
        };
        MomentDateAdapter.prototype.getDate = function (date) {
            return this.clone(date).date();
        };
        MomentDateAdapter.prototype.getHours = function (date) {
            return this.clone(date).hours();
        };
        MomentDateAdapter.prototype.getMinutes = function (date) {
            return this.clone(date).minutes();
        };
        MomentDateAdapter.prototype.getSeconds = function (date) {
            return this.clone(date).seconds();
        };
        MomentDateAdapter.prototype.getMilliseconds = function (date) {
            return this.clone(date).milliseconds();
        };
        MomentDateAdapter.prototype.getTime = function (date) {
            return date.valueOf();
        };
        MomentDateAdapter.prototype.getDayOfWeek = function (date) {
            return this.clone(date).day();
        };
        MomentDateAdapter.prototype.getMonthNames = function (style) {
            // Moment.js doesn't support narrow month names
            return style === 'long' ? this.localeData.longMonths : this.localeData.shortMonths;
        };
        MomentDateAdapter.prototype.getDateNames = function () {
            return this.localeData.dates;
        };
        MomentDateAdapter.prototype.getDayOfWeekNames = function (style) {
            if (style === 'long') {
                return this.localeData.longDaysOfWeek;
            }
            if (style === 'short') {
                return this.localeData.shortDaysOfWeek;
            }
            return this.localeData.narrowDaysOfWeek;
        };
        MomentDateAdapter.prototype.getYearName = function (date) {
            return this.clone(date).format('YYYY');
        };
        MomentDateAdapter.prototype.getFirstDayOfWeek = function () {
            return this.localeData.firstDayOfWeek;
        };
        MomentDateAdapter.prototype.getNumDaysInMonth = function (date) {
            return this.clone(date).daysInMonth();
        };
        MomentDateAdapter.prototype.clone = function (date) {
            return date.clone().locale(this.locale);
        };
        MomentDateAdapter.prototype.createDate = function (year, month, date) {
            // Moment.js will create an invalid date if any of the components are out of bounds, but we
            // explicitly check each case so we can throw more descriptive errors.
            if (month < 0 || month > 11) {
                throw Error("Invalid month index \"" + month + "\". Month index has to be between 0 and 11.");
            }
            if (date < 1) {
                throw Error("Invalid date \"" + date + "\". Date has to be greater than 0.");
            }
            var result = this.createMoment({ year: year, month: month, date: date }).locale(this.locale);
            // If the result isn't valid, the date must have been out of bounds for this month.
            if (!result.isValid()) {
                throw Error("Invalid date \"" + date + "\" for month with index \"" + month + "\".");
            }
            return result;
        };
        MomentDateAdapter.prototype.createDateTime = function (year, month, date, hours, minutes, seconds, milliseconds) {
            var newDate = this.createDate(year, month, date);
            newDate.hours(hours);
            newDate.minutes(minutes);
            newDate.seconds(seconds);
            newDate.milliseconds(milliseconds);
            return newDate;
        };
        MomentDateAdapter.prototype.today = function () {
            return this.createMoment().locale(this.locale);
        };
        MomentDateAdapter.prototype.parse = function (value, parseFormat) {
            if (value) {
                if (value && typeof value === 'string') {
                    if (this.options && this.options.findDateFormat) {
                        return this.findFormat(value);
                    }
                    return parseFormat
                        ? this.createMoment(value, parseFormat, this.locale)
                        : this.createMoment(value).locale(this.locale);
                }
                return this.createMoment(value).locale(this.locale);
            }
            return null;
        };
        MomentDateAdapter.prototype.format = function (date, displayFormat) {
            // tslint:disable:no-parameter-reassignment
            date = this.clone(date);
            if (!this.isValid(date)) {
                throw Error('MomentDateAdapter: Cannot format invalid date.');
            }
            return date.format(displayFormat);
        };
        MomentDateAdapter.prototype.addCalendarYears = function (date, years) {
            return this.clone(date).add({ years: years });
        };
        MomentDateAdapter.prototype.addCalendarMonths = function (date, months) {
            return this.clone(date).add({ months: months });
        };
        MomentDateAdapter.prototype.addCalendarDays = function (date, days) {
            return this.clone(date).add({ days: days });
        };
        MomentDateAdapter.prototype.toIso8601 = function (date) {
            return this.clone(date).format();
        };
        /** https://www.ietf.org/rfc/rfc3339.txt */
        MomentDateAdapter.prototype.deserialize = function (value) {
            var date;
            if (value instanceof Date) {
                date = this.createMoment(value).locale(this.locale);
            }
            else if (this.isDateInstance(value)) {
                // Note: assumes that cloning also sets the correct locale.
                return this.clone(value);
            }
            if (typeof value === 'string') {
                if (!value) {
                    return null;
                }
                date = this.createMoment(value, moment.ISO_8601).locale(this.locale);
            }
            if (date && this.isValid(date)) {
                return this.createMoment(date).locale(this.locale);
            }
            return _super.prototype.deserialize.call(this, value);
        };
        MomentDateAdapter.prototype.isDateInstance = function (obj) {
            return moment.isMoment(obj);
        };
        MomentDateAdapter.prototype.isValid = function (date) {
            return this.clone(date).isValid();
        };
        MomentDateAdapter.prototype.invalid = function () {
            return moment.invalid();
        };
        MomentDateAdapter.prototype.relativeDate = function (date, template) {
            if (!this.isDateInstance(date)) {
                throw new Error(this.invalidDateErrorText);
            }
            var now = this.momentWithLocale;
            var totalSeconds = now.diff(date, 'seconds');
            var totalMinutes = now.diff(date, 'minutes');
            var isToday = now.isSame(date, 'day');
            var isYesterday = now.add(-1, 'days').isSame(date, 'day');
            var templateVariables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
            var variables = this.compileVariables(date, templateVariables);
            var newTemplate;
            if (totalSeconds <= 59) { // seconds ago
                variables.SECONDS_PASSED = totalSeconds;
                newTemplate = template.SECONDS_AGO;
            }
            else if (totalMinutes <= 59) { // minutes ago
                variables.MINUTES_PASSED = totalMinutes;
                newTemplate = template.MINUTES_AGO;
            }
            else if (isToday) { // today
                newTemplate = template.TODAY;
            }
            else if (isYesterday) { // yesterday
                newTemplate = template.YESTERDAY;
            }
            else { // before yesterday
                newTemplate = template.BEFORE_YESTERDAY;
            }
            return this.messageformat.compile(newTemplate)(variables);
        };
        MomentDateAdapter.prototype.relativeShortDate = function (date) {
            return this.relativeDate(date, this.formatterConfig.relativeTemplates.short);
        };
        MomentDateAdapter.prototype.relativeLongDate = function (date) {
            return this.relativeDate(date, this.formatterConfig.relativeTemplates.long);
        };
        MomentDateAdapter.prototype.absoluteDate = function (date, params, datetime, milliseconds, microseconds) {
            if (datetime === void 0) { datetime = false; }
            if (milliseconds === void 0) { milliseconds = false; }
            if (microseconds === void 0) { microseconds = false; }
            if (!this.isDateInstance(date)) {
                throw new Error(this.invalidDateErrorText);
            }
            var variables = this.compileVariables(date, Object.assign(Object.assign({}, this.formatterConfig.variables), params.variables));
            variables.SHOW_MILLISECONDS = milliseconds ? 'yes' : 'no';
            variables.SHOW_MICROSECONDS = microseconds ? 'yes' : 'no';
            var template = datetime ? params.DATETIME : params.DATE;
            return this.messageformat.compile(template)(variables);
        };
        MomentDateAdapter.prototype.absoluteShortDate = function (date) {
            return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short);
        };
        MomentDateAdapter.prototype.absoluteShortDateTime = function (date, options) {
            return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.short, true, options === null || options === void 0 ? void 0 : options.milliseconds, options === null || options === void 0 ? void 0 : options.microseconds);
        };
        MomentDateAdapter.prototype.absoluteLongDate = function (date) {
            return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long);
        };
        MomentDateAdapter.prototype.absoluteLongDateTime = function (date, options) {
            return this.absoluteDate(date, this.formatterConfig.absoluteTemplates.long, true, options === null || options === void 0 ? void 0 : options.milliseconds, options === null || options === void 0 ? void 0 : options.microseconds);
        };
        MomentDateAdapter.prototype.openedRangeDate = function (startDate, endDate, template) {
            if (!moment.isMoment(startDate) && !moment.isMoment(endDate)) {
                throw new Error(this.invalidDateErrorText);
            }
            var variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
            var params = {};
            if (startDate) {
                var startDateVariables = this.compileVariables(startDate, variables);
                params = Object.assign(Object.assign({}, variables), { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), RANGE_TYPE: 'onlyStart' });
            }
            else if (endDate) {
                var endDateVariables = this.compileVariables(endDate, variables);
                params = Object.assign(Object.assign({}, variables), { END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
            }
            return this.messageformat.compile(template.DATE)(params);
        };
        MomentDateAdapter.prototype.openedRangeDateTime = function (startDate, endDate, template) {
            if (!moment.isMoment(startDate) && !moment.isMoment(endDate)) {
                throw new Error(this.invalidDateErrorText);
            }
            var variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
            var params = {};
            if (startDate) {
                var startDateVariables = this.compileVariables(startDate, variables);
                params = Object.assign(Object.assign({}, variables), { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), RANGE_TYPE: 'onlyStart' });
            }
            else if (endDate) {
                var endDateVariables = this.compileVariables(endDate, variables);
                params = Object.assign(Object.assign({}, variables), { END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), RANGE_TYPE: 'onlyEnd' });
            }
            return this.messageformat.compile(template.DATETIME)(params);
        };
        MomentDateAdapter.prototype.rangeDate = function (startDate, endDate, template) {
            if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
                throw new Error(this.invalidDateErrorText);
            }
            var variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
            var sameMonth = this.isSame('month', startDate, endDate);
            var startDateVariables = this.compileVariables(startDate, variables);
            startDateVariables.SAME_MONTH = sameMonth;
            var endDateVariables = this.compileVariables(endDate, variables);
            endDateVariables.SAME_MONTH = sameMonth;
            var bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' && endDateVariables.CURRENT_YEAR === 'yes';
            startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
            endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
            var params = Object.assign(Object.assign({}, variables), { START_DATE: this.messageformat.compile(template.START_DATE)(startDateVariables), END_DATE: this.messageformat.compile(template.END_DATE)(endDateVariables), SAME_MONTH: sameMonth });
            return this.messageformat.compile(template.DATE)(params);
        };
        MomentDateAdapter.prototype.rangeDateTime = function (startDate, endDate, template) {
            if (!this.isDateInstance(startDate) || !this.isDateInstance(endDate)) {
                throw new Error(this.invalidDateErrorText);
            }
            var variables = Object.assign(Object.assign({}, this.formatterConfig.variables), template.variables);
            var sameMonth = this.isSame('month', startDate, endDate);
            var sameDay = this.isSame('day', startDate, endDate);
            var startDateVariables = this.compileVariables(startDate, variables);
            startDateVariables.SAME_MONTH = sameMonth;
            startDateVariables.SAME_DAY = sameDay;
            var endDateVariables = this.compileVariables(endDate, variables);
            endDateVariables.SAME_MONTH = sameMonth;
            endDateVariables.SAME_DAY = sameDay;
            var bothCurrentYear = startDateVariables.CURRENT_YEAR === 'yes' && endDateVariables.CURRENT_YEAR === 'yes';
            startDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
            endDateVariables.CURRENT_YEAR = bothCurrentYear ? 'yes' : 'no';
            var params = Object.assign(Object.assign({}, variables), { START_DATETIME: this.messageformat.compile(template.START_DATETIME)(startDateVariables), END_DATETIME: this.messageformat.compile(template.END_DATETIME)(endDateVariables), SAME_MONTH: sameMonth, SAME_DAY: sameDay });
            return this.messageformat.compile(template.DATETIME)(params);
        };
        MomentDateAdapter.prototype.rangeShortDate = function (startDate, endDate) {
            var rangeTemplates = this.formatterConfig.rangeTemplates;
            if (startDate && endDate) {
                return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.short);
            }
            return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.short);
        };
        MomentDateAdapter.prototype.rangeShortDateTime = function (startDate, endDate) {
            var rangeTemplates = this.formatterConfig.rangeTemplates;
            if (startDate && endDate) {
                return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.short);
            }
            return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.short);
        };
        MomentDateAdapter.prototype.rangeLongDate = function (startDate, endDate) {
            var rangeTemplates = this.formatterConfig.rangeTemplates;
            if (startDate && endDate) {
                return this.rangeDate(startDate, endDate, rangeTemplates.closedRange.long);
            }
            return this.openedRangeDate(startDate, endDate || null, rangeTemplates.openedRange.long);
        };
        MomentDateAdapter.prototype.rangeLongDateTime = function (startDate, endDate) {
            var rangeTemplates = this.formatterConfig.rangeTemplates;
            if (startDate && endDate) {
                return this.rangeDateTime(startDate, endDate, rangeTemplates.closedRange.long);
            }
            return this.openedRangeDateTime(startDate, endDate || null, rangeTemplates.openedRange.long);
        };
        MomentDateAdapter.prototype.rangeMiddleDateTime = function (startDate, endDate) {
            return this.rangeDateTime(startDate, endDate, this.formatterConfig.rangeTemplates.closedRange.middle);
        };
        /** Creates a Moment instance while respecting the current UTC settings. */
        MomentDateAdapter.prototype.createMoment = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            return (this.options && this.options.useUtc) ? moment.utc.apply(moment, __spread(args)) : moment.apply(void 0, __spread(args));
        };
        MomentDateAdapter.prototype.compileVariables = function (date, variables) {
            var compiledVariables = {};
            // tslint:disable-next-line:no-for-in
            for (var key in variables) {
                if (!variables.hasOwnProperty(key)) {
                    continue;
                }
                var value = variables[key];
                compiledVariables[key] = date.format(value);
            }
            compiledVariables.CURRENT_YEAR = this.isCurrentYear(date);
            return compiledVariables;
        };
        MomentDateAdapter.prototype.isCurrentYear = function (value) {
            return this.momentWithLocale.isSame(value, 'year') ? 'yes' : 'no';
        };
        MomentDateAdapter.prototype.isSame = function (unit, startDate, endDate) {
            return startDate.isSame(endDate, unit) ? 'yes' : 'no';
        };
        MomentDateAdapter.prototype.configureTranslator = function (locale) {
            this.messageformat = new MessageFormat__namespace(locale);
        };
        MomentDateAdapter.prototype.isNumeric = function (value) {
            return !isNaN(parseFloat(value)) && isFinite(value);
        };
        MomentDateAdapter.prototype.findFormat = function (value) {
            if (!value) {
                return null;
            }
            // default test - iso
            var isoDate = this.createMoment(value, moment.ISO_8601, this.locale);
            if (isoDate.isValid()) {
                return isoDate;
            }
            if (this.isNumeric(value)) {
                // unix time sec
                return this.createMoment(value, 'X', this.locale);
            }
            // long months naming: D MMM YYYY, MMM Do YYYY with short case support
            if (/^\d{1,2}\s\S+\s(\d{2}|\d{4})$/.test(value.trim()) ||
                /^\S+\s\d{1,2}[a-z]{2}\s(\d{2}|\d{4})$/.test(value.trim())) {
                return this.parseWithSpace(value);
            }
            // slash notation: DD/MM/YYYY, MM/DD/YYYY with short case support
            if (/^\d{1,2}\/\d{1,2}\/(\d{2}|\d{4})$/.test(value)) {
                return this.parseWithSlash(value);
            }
            // dash notation: DD-MM-YYYY, YYYY-DD-MM with short case support
            if (/(^(\d{1,2}|\d{4})-\d{1,2}-\d{1,2}$)|(^\d{1,2}-\d{1,2}-(\d{2}|\d{4})$)/.test(value)) {
                return this.parseWithDash(value);
            }
            // dot notation: DD.MM.YYYY with short case support
            if (/^\d{1,2}\.\d{1,2}\.(\d{2}|\d{4})$/.test(value)) {
                return this.parseWithDot(value);
            }
            return null;
        };
        MomentDateAdapter.prototype.parseWithSpace = function (value) {
            switch (this.locale) {
                case 'ru':
                    return this.createMoment(value, 'DD MMMM YYYY', this.locale);
                case 'en':
                    // 16 Feb 2019 vs Feb 16th 2019, covers Feb and February cases
                    if (this.isNumeric(value[0])) {
                        return this.createMoment(value, 'D MMMM YYYY', this.locale);
                    }
                    return this.createMoment(value, 'MMMM Do YYYY', this.locale);
                default:
                    throw new Error("Locale " + this.locale + " is not supported");
            }
        };
        MomentDateAdapter.prototype.parseWithSlash = function (value) {
            switch (this.locale) {
                case 'ru':
                    return this.createMoment(value, 'DD/MM/YYYY', this.locale);
                // todo do we use generalized locales? en vs en-US; until not we try to guess
                case 'en':
                    // US vs UK
                    var parts = value.split('/');
                    var datePartsCount = 3;
                    if (parts.length !== datePartsCount) {
                        return null;
                    }
                    var firstPart = parts[0].trim();
                    var secondPart = parts[1].trim();
                    if (!this.isNumeric(firstPart) || !this.isNumeric(secondPart)) {
                        return null;
                    }
                    var monthsInYears = 12;
                    var canFirstBeMonth = +firstPart <= monthsInYears;
                    var canSecondByMonth = +secondPart <= monthsInYears;
                    // first two parts cannot be month
                    if (!canFirstBeMonth && !canSecondByMonth) {
                        return null;
                    }
                    var canDetermineWhereMonth = canFirstBeMonth && canSecondByMonth;
                    // use US format by default
                    if (canDetermineWhereMonth) {
                        return this.createMoment(value, 'MM/DD/YYYY', this.locale);
                    }
                    return canFirstBeMonth && !canSecondByMonth
                        ? this.createMoment(value, 'MM/DD/YYYY', this.locale)
                        : this.createMoment(value, 'DD/MM/YYYY', this.locale);
                default:
                    throw new Error("Locale " + this.locale + " is not supported");
            }
        };
        MomentDateAdapter.prototype.parseWithDash = function (value) {
            // leading year vs finishing year
            var parts = value.split('-');
            if (parts[0].length === 0) {
                return null;
            }
            var maxDayOrMonthCharsCount = 2;
            return parts[0].length <= maxDayOrMonthCharsCount
                ? this.createMoment(value, 'DD-MM-YYYY', this.locale)
                : this.createMoment(value, 'YYYY-MM-DD', this.locale);
        };
        MomentDateAdapter.prototype.parseWithDot = function (value) {
            // covers two cases YYYY and YY (for current year)
            return this.createMoment(value, 'DD.MM.YYYY', this.locale);
        };
        return MomentDateAdapter;
    }(datetime.DateAdapter));
    MomentDateAdapter.decorators = [
        { type: core.Injectable }
    ];
    /** @nocollapse */
    MomentDateAdapter.ctorParameters = function () { return [
        { type: String, decorators: [{ type: core.Optional }, { type: core.Inject, args: [datetime.MC_DATE_LOCALE,] }] },
        { type: undefined, decorators: [{ type: core.Optional }, { type: core.Inject, args: [MC_MOMENT_DATE_ADAPTER_OPTIONS,] }] }
    ]; };

    var MC_MOMENT_DATE_FORMATS = {
        dateInput: 'DD.MM.YYYY',
        monthYearLabel: 'MMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    };

    var MomentDateModule = /** @class */ (function () {
        function MomentDateModule() {
        }
        return MomentDateModule;
    }());
    MomentDateModule.decorators = [
        { type: core.NgModule, args: [{
                    providers: [
                        {
                            provide: datetime.DateAdapter,
                            useClass: MomentDateAdapter,
                            deps: [datetime.MC_DATE_LOCALE, MC_MOMENT_DATE_ADAPTER_OPTIONS]
                        }
                    ]
                },] }
    ];
    var ɵ0 = MC_MOMENT_DATE_FORMATS;
    var McMomentDateModule = /** @class */ (function () {
        function McMomentDateModule() {
        }
        return McMomentDateModule;
    }());
    McMomentDateModule.decorators = [
        { type: core.NgModule, args: [{
                    imports: [MomentDateModule],
                    providers: [{
                            provide: datetime.MC_DATE_FORMATS,
                            useValue: ɵ0
                        }]
                },] }
    ];

    /**
     * Generated bundle index. Do not edit.
     */

    exports.MC_MOMENT_DATE_ADAPTER_OPTIONS = MC_MOMENT_DATE_ADAPTER_OPTIONS;
    exports.MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY = MC_MOMENT_DATE_ADAPTER_OPTIONS_FACTORY;
    exports.MC_MOMENT_DATE_FORMATS = MC_MOMENT_DATE_FORMATS;
    exports.McMomentDateModule = McMomentDateModule;
    exports.MomentDateAdapter = MomentDateAdapter;
    exports.MomentDateModule = MomentDateModule;
    exports.ɵ0 = ɵ0;

    Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=ptsecurity-mosaic-moment-adapter-adapter.umd.js.map
