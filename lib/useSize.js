"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var useSize = function () {
    var getSize = (0, react_1.useCallback)(function (parentSize, frameObjectSize, responsive, blockAtMaxSize, blockAtMinSize, minSize) {
        var pw = frameObjectSize.w;
        var ph = frameObjectSize.h;
        if (responsive) {
            pw = parentSize.w;
            ph = parentSize.h;
        }
        if (blockAtMaxSize && pw > frameObjectSize.w) {
            pw = frameObjectSize.w;
        }
        if (blockAtMaxSize && ph > frameObjectSize.h) {
            ph = frameObjectSize.h;
        }
        if (blockAtMinSize && pw < frameObjectSize.w) {
            pw = frameObjectSize.w;
        }
        if (blockAtMinSize && ph < frameObjectSize.h) {
            ph = frameObjectSize.h;
        }
        if (minSize && pw < minSize.w) {
            pw = minSize.w;
        }
        if (minSize && ph < minSize.h) {
            ph = minSize.h;
        }
        return [pw, ph];
    }, []);
    return getSize;
};
exports.default = useSize;
