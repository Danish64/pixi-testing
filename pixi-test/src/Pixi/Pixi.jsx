import {Stage, Sprite} from "@pixi/react";
import {useState, useMemo} from "react";
import { BlurFilter } from "pixi.js";
import '@pixi/accessibility';

const bunny = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png";
export const Pixi = () => {

  // without this line, all mouse events are broken
  useMemo(() => new BlurFilter(0), []);

  const [spriteScale, setSpriteScale] = useState({ x: 2, y: 2 });

  return (
  <Stage width={1920} height={1080} options={{ backgroundColor: 0x012b30 }}>
    <Sprite
      x={250}
      y={250}
      anchor={[0.5, 0.5]}
      interactive={true}
      accessible={true}
      accessibleTitle="I am bunny, hehe"
      scale={spriteScale}
      image={bunny}
      pointerdown={() => {
        setSpriteScale((spriteScale) => ({x: spriteScale.x * 5, y: spriteScale.y * 5}))
      }}
      ontap={() => {
        setSpriteScale((spriteScale) => ({x: spriteScale.x * 1.25, y: spriteScale.y * 1.25}))
      }}
    />
  </Stage>
)};

