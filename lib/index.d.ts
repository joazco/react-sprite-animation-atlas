/// <reference types="react" />
import { AnimationType, AtlasType } from "./types";
declare type AnimationProps = {
    imageSrc: string;
    atlasConfig: AtlasType;
    animationConfig: AnimationType;
    animationName: string;
};
declare type AnimationComponentProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement> & AnimationProps;
declare const AnimationComponent: React.FC<AnimationComponentProps>;
export default AnimationComponent;
export { AnimationProps, AnimationType, AtlasType };
