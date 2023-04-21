"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var react_1 = require("react");
var animationReducer_1 = require("./animationReducer");
var useSprite_1 = require("./useSprite");
var useSize_1 = require("./useSize");
var useAnimationComponent = function (props) {
    /**  */
    var imageSrc = props.imageSrc, atlas = props.atlasConfig, animations = props.animationConfig, animationName = props.animationName, responsive = props.responsive, center = props.center, blockAtMaxSize = props.blockAtMaxSize, blockAtMinSize = props.blockAtMinSize, minSize = props.minSize;
    /**  */
    var _a = (0, react_1.useReducer)(animationReducer_1.default, animationReducer_1.animationDefaultState), state = _a[0], dispatch = _a[1];
    var loaded = state.loaded, imgLoaded = state.imgLoaded, parentSize = state.parentSize, objectPosition = state.objectPosition, objectSize = state.objectSize;
    var _b = (0, react_1.useState)(0), _ = _b[0], setNbLoop = _b[1];
    var _c = (0, react_1.useState)(null), timeoutState = _c[0], setTimeoutState = _c[1];
    /** */
    /**  */
    var canvasRef = (0, react_1.useRef)(null);
    var parentRef = (0, react_1.useRef)(null);
    /** */
    var image = (0, react_1.useMemo)(function () {
        var img = new Image();
        img.src = imageSrc;
        return img;
    }, [imageSrc]);
    var animation = (0, react_1.useMemo)(function () { return animations.anims.find(function (a) { return a.key === animationName; }); }, [animations, animationName]);
    /** */
    var _d = (0, useSprite_1.default)(atlas, animation === null || animation === void 0 ? void 0 : animation.frames), currentFrame = _d.currentFrame, isLastPosition = _d.isLastPosition, nextFrame = _d.nextFrame;
    var getSize = (0, useSize_1.default)();
    /** */
    var updateParentSize = (0, react_1.useCallback)(function () {
        if (parentRef.current) {
            var _a = parentRef.current, clientWidth = _a.clientWidth, clientHeight = _a.clientHeight;
            dispatch({
                type: "parentSize",
                data: {
                    w: clientWidth,
                    h: clientHeight,
                },
            });
        }
    }, [parentRef]);
    // update parent size if ref is charged
    (0, react_1.useEffect)(function () {
        updateParentSize();
    }, [parentRef]);
    // update parent size on resize window
    (0, react_1.useEffect)(function () {
        window.addEventListener("resize", updateParentSize);
        return function () {
            window.addEventListener("resize", updateParentSize);
        };
    }, []);
    // check img loaded
    (0, react_1.useEffect)(function () {
        var dispatchImgLoaded = function () {
            dispatch({ type: "imgLoaded" });
        };
        var warningError = function () {
            console.warn("Image with path ".concat(imageSrc, " can't be charged"));
        };
        if (image.complete) {
            dispatchImgLoaded();
        }
        else {
            image.addEventListener("load", dispatchImgLoaded);
            image.addEventListener("error", warningError);
            return function () {
                image.removeEventListener("load", dispatchImgLoaded);
                image.removeEventListener("error", warningError);
            };
        }
    }, [image]);
    // draw image
    (0, react_1.useEffect)(function () {
        if (canvasRef.current && loaded) {
            var ctx = canvasRef.current.getContext("2d");
            ctx === null || ctx === void 0 ? void 0 : ctx.clearRect(0, 0, parentSize.w, parentSize.h);
            var _a = getSize(parentSize, objectSize, !!responsive, !!blockAtMaxSize, !!blockAtMinSize, minSize), pw = _a[0], ph = _a[1];
            ctx === null || ctx === void 0 ? void 0 : ctx.drawImage(image, objectPosition.x, objectPosition.y, objectSize.w, objectSize.h, center ? (parentSize.w - pw) / 2 : 0, center ? (parentSize.h - ph) / 2 : 0, pw, ph);
        }
    }, [canvasRef, objectPosition, loaded, parentSize, objectSize]);
    (0, react_1.useEffect)(function () {
        if (currentFrame !== null) {
            dispatch({
                type: "objectPosition",
                data: {
                    x: currentFrame.x,
                    y: currentFrame.y,
                },
            });
            dispatch({
                type: "objectSize",
                data: {
                    w: currentFrame.w,
                    h: currentFrame.h,
                },
            });
        }
    }, [currentFrame]);
    // if all is charged
    (0, react_1.useEffect)(function () {
        if (imgLoaded &&
            parentSize &&
            objectPosition.x !== -1 &&
            objectSize.w !== 0) {
            dispatch({ type: "loaded" });
        }
    }, [imgLoaded, parentSize, objectPosition, objectSize]);
    (0, react_1.useEffect)(function () {
        if (loaded && animation && timeoutState === null) {
            var t = setTimeout(function () {
                setTimeoutState(null);
                setNbLoop(function (nbLoop) {
                    if (animation.repeat === -1 || animation.repeat >= nbLoop) {
                        nextFrame();
                    }
                    return nbLoop;
                });
            }, 1000 / animation.frameRate);
            setTimeoutState(t);
        }
    }, [loaded, currentFrame]);
    (0, react_1.useEffect)(function () {
        if (isLastPosition) {
            setNbLoop(function (l) { return l + 1; });
        }
    }, [isLastPosition]);
    (0, react_1.useEffect)(function () {
        if (timeoutState) {
            clearTimeout(timeoutState);
            setTimeoutState(null);
        }
        setNbLoop(0);
    }, [animationName]);
    return {
        loaded: loaded,
        parentSize: parentSize,
        canvasRef: canvasRef,
        parentRef: parentRef,
    };
};
exports.default = useAnimationComponent;
