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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsx_runtime_1 = require("react/jsx-runtime");
var useAnimationComponent_1 = require("./useAnimationComponent");
var AnimationComponent = function (props) {
    var imageSrc = props.imageSrc, atlasConfig = props.atlasConfig, animationConfig = props.animationConfig, animationName = props.animationName, rest = __rest(props, ["imageSrc", "atlasConfig", "animationConfig", "animationName"]);
    var _a = (0, useAnimationComponent_1.default)({
        imageSrc: imageSrc,
        atlasConfig: atlasConfig,
        animationConfig: animationConfig,
        animationName: animationName,
    }), loaded = _a.loaded, parentSize = _a.parentSize, canvasRef = _a.canvasRef, parentRef = _a.parentRef;
    return ((0, jsx_runtime_1.jsx)("div", __assign({ style: { width: "100%", height: "100%" } }, rest, { ref: parentRef }, { children: loaded && ((0, jsx_runtime_1.jsx)("canvas", { width: parentSize.w, height: parentSize.h, ref: canvasRef })) })));
};
exports.default = AnimationComponent;