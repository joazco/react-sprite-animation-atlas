# react-sprite-animation-atlas

React component to animate a sprite from an atlas configuration.

[Gammafp outil](https://gammafp.com/)

## Installation

```sh
npm i react-sprite-animation-atlas
```

## React

### Declaration

```typescript
import { AnimationType, AtlasType } from "./types";
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
declare type AnimationComponentProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> &
  AnimationProps;
declare const AnimationComponent: React.FC<AnimationComponentProps>;
export default AnimationComponent;
export { AnimationProps, AnimationType, AtlasType };
```

### Usages with file config

In this example Sprite Image and Atlas file is generated by
<a href="https://gammafp.com/tool/atlas-packer/" target="_blank">
https://gammafp.com/tool/atlas-packer/
</a>

And Animation file is generated by
<a href="https://gammafp.com/tool/animator/" target="_blank">
https://gammafp.com/tool/animator/
</a>

```typescript
import AnimationComponent from "react-sprite-animation-atlas";
import atlas from "./configFiles/mario_sprites_atlas.json";
import animations from "./configFiles/mario_sprite_anim.json";

function App() {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <AnimationComponent
        imageSrc="sprites/mario_sprites.png"
        animationConfig={animations}
        atlasConfig={atlas}
        animationName={animationName}
      />
    </div>
  );
}
```

### Usages with constants

```typescript
import AnimationComponent, {
  AnimationType,
  AtlasType,
} from "react-sprite-animation-atlas";

const marioAtlas: AtlasType = {
  frames: [
    {
      filename: "tile001",
      frame: {
        w: 16,
        h: 32,
        x: 0,
        y: 0,
      },
    },
    {
      filename: "tile003",
      frame: {
        w: 16,
        h: 32,
        x: 16,
        y: 0,
      },
    },
    {
      filename: "tile002",
      frame: {
        w: 16,
        h: 32,
        x: 32,
        y: 0,
      },
    },
    {
      filename: "tile004",
      frame: {
        w: 16,
        h: 32,
        x: 48,
        y: 0,
      },
    },
  ],
};

const marioAnimation: AnimationType = {
  anims: [
    {
      key: "mario_animation",
      type: "frames",
      repeat: -1,
      frameRate: 6,
      frames: [
        {
          key: "mario_sprites",
          frame: "tile001",
        },
        {
          key: "mario_sprites",
          frame: "tile003",
        },
        {
          key: "mario_sprites",
          frame: "tile002",
        },
        {
          key: "mario_sprites",
          frame: "tile004",
        },
      ],
    },
  ],
};

function App() {
  return (
    <div style={{ width: "400px", height: "400px" }}>
      <AnimationComponent
        imageSrc="sprites/mario_sprites.png"
        animationConfig={marioAnimation}
        atlasConfig={marioAtlas}
        animationName="mario_animation"
      />
    </div>
  );
}
```

## Example

```bash
git clone https://github.com/joazco/react-sprite-animation-atlas.git
cd example
npm install
npm start
```
