"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useSprite = function (atlas, frames) {
    var _a = (0, react_1.useState)(0), position = _a[0], setPosition = _a[1];
    var _b = (0, react_1.useState)([]), frameObject = _b[0], setFrameObject = _b[1];
    var currentFrame = (0, react_1.useMemo)(function () {
        if (frameObject.length === 0) {
            return null;
        }
        return frameObject[position] || null;
    }, [position, frameObject]);
    var isLastPosition = (0, react_1.useMemo)(function () {
        if (position + 1 === frameObject.length) {
            return true;
        }
        return false;
    }, [position, frameObject]);
    var nextFrame = (0, react_1.useCallback)(function () {
        var nextPosition = position + 1;
        if (nextPosition > frameObject.length - 1) {
            setPosition(0);
        }
        else {
            setPosition(nextPosition);
        }
    }, [position, frameObject]);
    (0, react_1.useEffect)(function () {
        if (!frames) {
            console.warn("Frames not found");
        }
        var fo = [];
        frames === null || frames === void 0 ? void 0 : frames.forEach(function (frame) {
            var frameFind = atlas.frames.find(function (f) { return f.filename === frame.frame; });
            if (frameFind) {
                fo.push(frameFind.frame);
            }
        });
        setPosition(0);
        setFrameObject(fo);
    }, [frames]);
    return { currentFrame: currentFrame, isLastPosition: isLastPosition, nextFrame: nextFrame };
};
exports.default = useSprite;
