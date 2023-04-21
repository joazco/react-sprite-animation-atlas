import {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
  useState,
} from "react";
import animationReducer, {
  AnimationReducerActionData,
  animationDefaultState,
} from "./animationReducer";
import { AnimationProps } from ".";
import useSprite from "./useSprite";
import useSize from "./useSize";

const useAnimationComponent = (props: AnimationProps) => {
  /**  */
  const {
    imageSrc,
    atlasConfig: atlas,
    animationConfig: animations,
    animationName,
    responsive,
    center,
    blockAtMaxSize,
    blockAtMinSize,
    minSize,
  } = props;
  /**  */
  const [state, dispatch] = useReducer(animationReducer, animationDefaultState);
  const { loaded, imgLoaded, parentSize, objectPosition, objectSize } = state;
  const [_, setNbLoop] = useState<number>(0);
  const [timeoutState, setTimeoutState] = useState<any>(null);
  /** */

  /**  */
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const parentRef = useRef<HTMLDivElement>(null);
  /** */
  const image = useMemo(() => {
    const img = new Image();
    img.src = imageSrc;
    return img;
  }, [imageSrc]);
  const animation = useMemo(
    () => animations.anims.find((a) => a.key === animationName),
    [animations, animationName]
  );
  /** */
  const { currentFrame, isLastPosition, nextFrame } = useSprite(
    atlas,
    animation?.frames
  );
  const getSize = useSize();
  /** */

  const updateParentSize = useCallback(() => {
    if (parentRef.current) {
      const { clientWidth, clientHeight } = parentRef.current;
      dispatch({
        type: "parentSize",
        data: {
          w: clientWidth,
          h: clientHeight,
        } as AnimationReducerActionData,
      });
    }
  }, [parentRef]);

  // update parent size if ref is charged
  useEffect(() => {
    updateParentSize();
  }, [parentRef]);
  // update parent size on resize window
  useEffect(() => {
    window.addEventListener("resize", updateParentSize);
    return () => {
      window.addEventListener("resize", updateParentSize);
    };
  }, []);
  // check img loaded
  useEffect(() => {
    const dispatchImgLoaded = () => {
      dispatch({ type: "imgLoaded" });
    };
    const warningError = () => {
      console.warn(`Image with path ${imageSrc} can't be charged`);
    };
    if (image.complete) {
      dispatchImgLoaded();
    } else {
      image.addEventListener("load", dispatchImgLoaded);
      image.addEventListener("error", warningError);
      return () => {
        image.removeEventListener("load", dispatchImgLoaded);
        image.removeEventListener("error", warningError);
      };
    }
  }, [image]);
  // draw image
  useEffect(() => {
    if (canvasRef.current && loaded) {
      const ctx = canvasRef.current.getContext("2d");
      ctx?.clearRect(0, 0, parentSize.w, parentSize.h);
      const [pw, ph] = getSize(
        parentSize,
        objectSize,
        !!responsive,
        !!blockAtMaxSize,
        !!blockAtMinSize,
        minSize
      );

      ctx?.drawImage(
        image,
        objectPosition.x,
        objectPosition.y,
        objectSize.w,
        objectSize.h,
        center ? (parentSize.w - pw) / 2 : 0,
        center ? (parentSize.h - ph) / 2 : 0,
        pw,
        ph
      );
    }
  }, [canvasRef, objectPosition, loaded, parentSize, objectSize]);

  useEffect(() => {
    if (currentFrame !== null) {
      dispatch({
        type: "objectPosition",
        data: {
          x: currentFrame.x,
          y: currentFrame.y,
        } as AnimationReducerActionData,
      });
      dispatch({
        type: "objectSize",
        data: {
          w: currentFrame.w,
          h: currentFrame.h,
        } as AnimationReducerActionData,
      });
    }
  }, [currentFrame]);
  // if all is charged
  useEffect(() => {
    if (
      imgLoaded &&
      parentSize &&
      objectPosition.x !== -1 &&
      objectSize.w !== 0
    ) {
      dispatch({ type: "loaded" });
    }
  }, [imgLoaded, parentSize, objectPosition, objectSize]);

  useEffect(() => {
    if (loaded && animation && timeoutState === null) {
      const t = setTimeout(() => {
        setTimeoutState(null);
        setNbLoop((nbLoop) => {
          if (animation.repeat === -1 || animation.repeat >= nbLoop) {
            nextFrame();
          }
          return nbLoop;
        });
      }, 1000 / animation.frameRate);
      setTimeoutState(t);
    }
  }, [loaded, currentFrame]);

  useEffect(() => {
    if (isLastPosition) {
      setNbLoop((l) => l + 1);
    }
  }, [isLastPosition]);

  useEffect(() => {
    if (timeoutState) {
      clearTimeout(timeoutState);
      setTimeoutState(null);
    }
    setNbLoop(0);
  }, [animationName]);

  return {
    loaded,
    parentSize,
    canvasRef,
    parentRef,
  };
};

export default useAnimationComponent;
