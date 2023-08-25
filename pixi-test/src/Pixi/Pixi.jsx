import {Stage, Container, Graphics} from "@pixi/react";
import { useMemo, useCallback} from "react";
import { BlurFilter } from "pixi.js";
import { usePixiDragAndDrop } from "../usePixiDragAndDrop";
import '@pixi/accessibility';

const isE2E = navigator.webdriver;
const width = 1920;
const height = 1080;
const backgroundColor = 0x1d2330;

const DraggableBox = () => {
  const p = usePixiDragAndDrop();

  const draw = useCallback(
    (g) => {
        g.clear();
        g.debug = true;
        g.accessible = true;
        g.interactive = true;
        g.accessibleTitle = isE2E ?  "PIXI__TEST__RECTANGLE" : "I am rectangle"
        g.lineStyle(0);
        g.beginFill(0xffff0b, 0.5);
        g.drawRect(50, 250, 120, 120);
        g.endFill();
    },
    [],
  );

  return (
    <Graphics draw={draw} {...p}/>
  );
};

export const Pixi = () => {

  // without this line, all mouse events are broken
  useMemo(() => new BlurFilter(0), []);

  return (
    <Stage width={width} height={height} options={{ backgroundColor }}>
    <Container sortableChildren={true}>
      <DraggableBox tint={0xff00ff} x={0} />
    </Container>
  </Stage>
)};

