import { useApp } from "@pixi/react";
import intersectsBoxPolygon from "intersects/box-polygon";
import lineToPolygon from "intersects/lineToPolygon";
import { pick } from "lodash-es";
import { useCallback, useEffect, useMemo, useRef } from "react";
import {keyboard} from "./keyboard";


const noDragStyles = {};
const noCollision = [];

export const usePixiDragAndDrop = (
  dragStyles = noDragStyles,
  collisionShapes = noCollision
) => {
  const app = useApp();
  const dragged = useRef();
  const left = keyboard(37),
      up = keyboard(38),
      right = keyboard(39),
      down = keyboard(40);

  const collisionPolygons = useMemo(() => {
    return collisionShapes.reduce((acc, shape) => {
      for (let i = 0; i < shape.length; i++) {
        const point1 = shape[i];
        const point2 = shape[(i + 1) % shape.length];
        const polygon = lineToPolygon(
          point1.x,
          point1.y,
          point2.x,
          point2.y,
          10
        );
        acc.push(polygon);
      }
      return acc;
    }, []);
  }, [collisionShapes]);

  const onDragStart = useCallback(
    (e) => {
      const item = e.currentTarget;

      const originalStyles = pick(item, Object.keys(dragStyles));
      Object.assign(item, dragStyles);

      const dragStart = e.getLocalPosition(item.parent);
      const offset = { x: item.x - dragStart.x, y: item.y - dragStart.y };

      const { width, height } = item.getBounds(true);

      dragged.current = {
        item,
        originalStyles,
        offset,
        width,
        height,
      };
    },
    [dragStyles]
  );

  const onDragMove = useCallback(
    (e) => {
      if (!dragged.current) {
        return;
      }

      const { item, offset, width, height } = dragged.current;

      const newPosition = e.getLocalPosition(item.parent);
      const newX = newPosition.x + offset.x;
      const newY = newPosition.y + offset.y;

      const newPositionIntersects = collisionPolygons.some((polygon) =>
        intersectsBoxPolygon(newX, newY, width, height, polygon)
      );

      if (!newPositionIntersects) {
        item.x = newX;
        item.y = newY;
      }
    },
    [collisionPolygons]
  );

  const onDragEnd = useCallback(() => {
    if (!dragged.current) {
      return;
    }

    const { item, originalStyles } = dragged.current;

    Object.assign(item, originalStyles);
    dragged.current = undefined;
  }, []);

  const onElementSelect = useCallback((e) => {
    if (dragged.current) {
        // drop the item
        dragged.current = undefined;
        } else {
        // pick up the item
        dragged.current = { item: e.target };
        }
  }, [dragged]);

  left.press = () => {
    if(!dragged.current){
        return ;
    }
    dragged.current.item.x -= 10;
  };
  up.press = () => {
    if(!dragged.current){
        return ;
    }
    dragged.current.item.y -= 10;
  };
  right.press = () => {
    if(!dragged.current){
        return ;
    }
    dragged.current.item.x += 10;
  };
  down.press = () => {
    if(!dragged.current){
        return ;
    }
    dragged.current.item.y += 10;
  };
  
  useEffect(() => {
    if (!app.stage) {
      return;
    }

    const originalValues = pick(app.stage, ["eventMode", "hitArea"]);
    app.stage.on("pointerup", onDragEnd);
    app.stage.on("pointerupoutside", onDragEnd);
    app.stage.on("pointermove", onDragMove);
    app.stage.eventMode = "static";
    app.stage.hitArea = app.screen;

    return () => {
      if (!app.stage) {
        return;
      }

      app.stage.off("pointerup", onDragEnd);
      app.stage.off("pointerupoutside", onDragEnd);
      app.stage.off("pointermove", onDragMove);
      app.stage.eventMode = originalValues.eventMode;
      app.stage.hitArea = originalValues.hitArea;
    };
  }, [app, onDragEnd, onDragMove]);

  return {
    onpointerdown: onDragStart,
    eventMode: "static",
    ontap: onElementSelect
  };
};