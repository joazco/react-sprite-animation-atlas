import { AnimationType, AtlasType } from "./types";
import useAnimationComponent from "./useAnimationComponent";

type AnimationProps = {
  imageSrc: string;
  atlasConfig: AtlasType;
  animationConfig: AnimationType;
  animationName: string;
};

type AnimationComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AnimationProps;

const AnimationComponent: React.FC<AnimationComponentProps> = (props) => {
  const { imageSrc, atlasConfig, animationConfig, animationName, ...rest } =
    props;
  const { loaded, parentSize, canvasRef, parentRef } = useAnimationComponent({
    imageSrc,
    atlasConfig,
    animationConfig,
    animationName,
  });

  return (
    <div style={{ width: "100%", height: "100%" }} {...rest} ref={parentRef}>
      {loaded && (
        <canvas width={parentSize.w} height={parentSize.h} ref={canvasRef} />
      )}
    </div>
  );
};

export default AnimationComponent;

export { AnimationProps, AnimationType, AtlasType };
