import {Stage, Container, Graphics} from "@pixi/react";
import { useMemo, useCallback} from "react";
import { BlurFilter } from "pixi.js";
import { usePixiDragAndDrop } from "../usePixiDragAndDrop";
import '@pixi/accessibility';

const isE2E = navigator.webdriver;
const width = 1920;
const height = 1080;
const backgroundColor = 0x1d2330;

const DraggableBox = ({tint, x, y, testId}) => {
  const p = usePixiDragAndDrop();

  const draw = useCallback(
    (g) => {
        g.clear();
        g.debug = true;
        g.accessible = true;
        g.interactive = true;
        g.accessibleTitle = isE2E ?   testId : "I am rectangle";
        g.lineStyle(0);
        g.beginFill(tint, 0.5);
        g.drawRect(x, y, 40, 40);
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
    <Stage width={width} height={height} options={{ backgroundColor }} data-testid="canvas">
    <Container sortableChildren={true}>
      <DraggableBox tint={0xff00ff} x={0} y={0} testId={"PIXI__TEST__RECTANGLE_1"}/>
      <DraggableBox tint={0xffff00} x={80} y={80} testId={"PIXI__TEST__RECTANGLE_2"}/>
      <DraggableBox tint={0xff0000} x={160} y={160} testId={"PIXI__TEST__RECTANGLE_3"}/>
    </Container>
  </Stage>
)};

