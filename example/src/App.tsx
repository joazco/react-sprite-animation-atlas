import "./App.css";
import AnimationComponent, {
  AnimationType,
  AtlasType,
} from "react-sprite-animation-atlas";
import atlas from "./configFiles/robot_sprites_atlas.json";
import animations from "./configFiles/robot_sprite_anim.json";
import { useEffect, useState } from "react";

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
let timeout: null | NodeJS.Timer = null;
function App() {
  const [animationName, setAnimationName] = useState<
    | "dialog_animation"
    | "heal_animation"
    | "damage_animation"
    | "idle_animation"
  >("idle_animation");

  useEffect(() => {
    const values: Array<
      | "dialog_animation"
      | "heal_animation"
      | "damage_animation"
      | "idle_animation"
    > = [
      "dialog_animation",
      "heal_animation",
      "damage_animation",
      "idle_animation",
    ];
    if (timeout === null) {
      timeout = setInterval(() => {
        const arr = values.filter((a) => a !== animationName);
        setAnimationName(arr[Math.floor(Math.random() * arr.length)]);
      }, 2000);
    }
  }, []);

  return (
    <div className="App">
      <h1>react-sprite-animation-atlas</h1>
      <article>
        <h2>Example with File configuration</h2>
        <p>
          In this example Sprite Image and Atlas file is generated by{" "}
          <a href="https://gammafp.com/tool/atlas-packer/" target="_blank">
            https://gammafp.com/tool/atlas-packer/
          </a>
          <br />
          And Animation file is generated by{" "}
          <a href="https://gammafp.com/tool/animator/" target="_blank">
            https://gammafp.com/tool/animator/
          </a>
        </p>
        <div>
          <AnimationComponent
            imageSrc="sprites/robot_sprites.png"
            animationConfig={animations}
            atlasConfig={atlas}
            animationName={animationName}
          />
        </div>
      </article>
      <article>
        <h2>Example with constants</h2>
        <div>
          <AnimationComponent
            imageSrc="sprites/mario_sprites.png"
            animationConfig={marioAnimation}
            atlasConfig={marioAtlas}
            animationName="mario_animation"
          />
        </div>
      </article>
    </div>
  );
}

export default App;