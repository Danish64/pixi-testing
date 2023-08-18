import {Stage, Sprite} from "@pixi/react";
import {useState, useMemo} from "react";
import { BlurFilter } from "pixi.js";
import '@pixi/accessibility';

const bunny = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png";

const isE2E = navigator.webdriver;

export const Pixi = () => {

  // without this line, all mouse events are broken
  useMemo(() => new BlurFilter(0), []);

  const [spriteScale, setSpriteScale] = useState({ x: 2, y: 2 });

  const onClick = () => {
    setSpriteScale((spriteScale) => ({x: spriteScale.x * 5, y: spriteScale.y * 5}))
  }

  return (
  <Stage width={1920} height={1080} options={{ backgroundColor: 0x012b30 }} data-testid="canvas">
    <Sprite
      x={250}
      y={250}
      anchor={[0.5, 0.5]}
      interactive
      accessible={isE2E}
      accessibleTitle="I am bunny"
      debug={isE2E}
      scale={spriteScale}
      image={bunny}
      pointerdown={onClick}
      ontap={onClick}
    />
  </Stage>
)};

