import {Stage, Sprite, Graphics} from "@pixi/react";
import {useState, useMemo, useRef, useEffect, useCallback} from "react";
import { BlurFilter } from "pixi.js";
import '@pixi/accessibility';

const bunny = "https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png";

const isE2E = navigator.webdriver;

function Rectangle({onClick, rectangle}) {
  const draw = useCallback(
    (g) => {
      g.clear();
      g.debug = true;
      g.accessible = true;
      g.interactive = true;
      // g._accessibleDiv.dataset["data-testid"] = "test_rect"; 
      g.accessibleTitle = isE2E ?  "PIXI__TEST__RECTANGLE" : "I am rectangle"
      g.pointerdown = onClick
      g.ontap = onClick
      g.lineStyle(0);
      g.beginFill(0xffff0b, 0.5);
      g.drawRect(rectangle.leftTop, rectangle.rightTop, rectangle.bottomLeft, rectangle.bottomRight);
      g.endFill();
    },
    [rectangle, onClick],
  );

  return <Graphics draw={draw} />;
}

export const Pixi = () => {

  // without this line, all mouse events are broken
  useMemo(() => new BlurFilter(0), []);

  const [spriteScale, setSpriteScale] = useState({ leftTop: 50, rightTop: 250, bottomLeft: 120, bottomRight: 120});

  const onClick = () => {
    setSpriteScale((spriteScale) => ({leftTop: spriteScale.leftTop + 10, rightTop: spriteScale.rightTop + 10, bottomLeft: spriteScale.bottomLeft + 10, bottomRight: spriteScale.bottomRight + 10}));
  }

  return (
  <Stage width={1920} height={1080} options={{ backgroundColor: 0x012b30 }} data-testid="canvas">
    <Rectangle onClick={onClick} rectangle={spriteScale}/>
  </Stage>
)};

