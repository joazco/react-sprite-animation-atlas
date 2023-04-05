"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.animationDefaultState = void 0;
exports.animationDefaultState = {
    imgLoaded: false,
    loaded: false,
    objectPosition: { x: -1, y: -1 },
    objectSize: { w: 0, h: 0 },
    parentSize: { h: 0, w: 0 },
};
var animationReducer = function (state, action) {
    var data = action.data, type = action.type;
    switch (type) {
        case "loaded":
            return __assign(__assign({}, state), { loaded: true });
        case "parentSize":
            if ((data === null || data === void 0 ? void 0 : data.h) && data.w) {
                return __assign(__assign({}, state), { parentSize: {
                        h: data.h,
                        w: data.w,
                    } });
            }
            return state;
        case "objectSize":
            if ((data === null || data === void 0 ? void 0 : data.w) && data.h) {
                return __assign(__assign({}, state), { objectSize: { h: data.h, w: data.w } });
            }
            return state;
        case "objectPosition":
            if (typeof (data === null || data === void 0 ? void 0 : data.x) !== "undefined" && typeof data.y !== "undefined") {
                return __assign(__assign({}, state), { objectPosition: { x: data.x, y: data.y } });
            }
            return state;
        case "imgLoaded":
            return __assign(__assign({}, state), { imgLoaded: true });
        default:
            return state;
    }
};
exports.default = animationReducer;
