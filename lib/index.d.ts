/// <reference types="react" />
import { AnimationType, AtlasType, ObjectSize } from "./types";
declare type AnimationProps = {
    imageSrc: string;
    atlasConfig: AtlasType;
    animationConfig: AnimationType;
    animationName: string;
    center?: boolean;
    responsive?: boolean;
    blockAtMaxSize?: boolean;
    blockAtMinSize?: boolean;
    minSize?: ObjectSize;
};
declare type AnimationComponentProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & AnimationProps;
declare const AnimationComponent: React.FC<AnimationComponentProps>;
export default AnimationComponent;
export { AnimationProps, AnimationType, AtlasType };
