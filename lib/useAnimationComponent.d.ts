/// <reference types="react" />
import { AnimationProps } from ".";
declare const useAnimationComponent: (props: AnimationProps) => {
    loaded: boolean;
    parentSize: import("./types").ObjectSize;
    canvasRef: import("react").RefObject<HTMLCanvasElement>;
    parentRef: import("react").RefObject<HTMLDivElement>;
};
export default useAnimationComponent;
