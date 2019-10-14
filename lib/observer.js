"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var Observer = /** @class */ (function () {
    function Observer() {
        /**
         * A hash for storing convenient subscriptions.
         */
        this.subscriptions = [];
        /**
         * A hash for storing efficient subscriptions.
         */
        this.fastEvents = {};
    }
    /**
     * Publish a new event for all subscribers to consume.
     */
    Observer.prototype.publish = function (name, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var fns, evts, i, l;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fns = [];
                        evts = this.subscriptions;
                        for (i = 0, l = evts.length; i < l; i++) {
                            if (evts[i] && name === evts[i].name) {
                                fns.push(this.subscriptions[i].fn(payload));
                            }
                        }
                        return [4 /*yield*/, Promise.all(fns)];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * O(1) publishing. The limitations here is there can only be one subscriber.
     */
    Observer.prototype.publishFast = function (name, payload) {
        return __awaiter(this, void 0, void 0, function () {
            var fn;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fn = this.fastEvents[name];
                        if (!fn) return [3 /*break*/, 2];
                        return [4 /*yield*/, fn(payload)];
                    case 1:
                        _a.sent();
                        _a.label = 2;
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Subscribe to a published event.
     */
    Observer.prototype.subscribe = function (name, fn) {
        this.subscriptions.push({ name: name, fn: fn });
    };
    /**
     * O(1) subscribing. Same limitations as publishFast.
     */
    Observer.prototype.subscribeFast = function (name, fn) {
        this.fastEvents[name] = fn;
    };
    /**
     * Remove any subscriptions that were subscribed.
     */
    Observer.prototype.unsubscribe = function (name, fn) {
        var j = this.subscriptions.length;
        while (j--) {
            if (this.subscriptions[j].name === name &&
                fn === this.subscriptions[j].fn) {
                this.subscriptions.splice(j, 1);
            }
        }
    };
    /**
     * Remove a fast subscription.
     */
    Observer.prototype.unsubscribeFast = function (name) {
        if (this.fastEvents[name]) {
            delete this.fastEvents[name];
        }
    };
    return Observer;
}());
exports.default = Observer;
