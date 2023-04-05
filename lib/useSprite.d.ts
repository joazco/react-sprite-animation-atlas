import { AnimationTypeAnimsFrame, AtlasType, AtlasTypeFrameFrame } from "./types";
declare const useSprite: (atlas: AtlasType, frames: AnimationTypeAnimsFrame[] | undefined) => {
    currentFrame: AtlasTypeFrameFrame | null;
    isLastPosition: boolean;
    nextFrame: () => void;
};
export default useSprite;
