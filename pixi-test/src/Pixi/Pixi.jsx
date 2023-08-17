import { BlurFilter } from 'pixi.js';
import { Stage, Container, Sprite, Text } from '@pixi/react';
import { useMemo, useRef, useState, useCallback } from 'react';

const useDrag = ({ x, y }) => {
  const sprite =  useRef();
  const [isDragging, setIsDragging] =  useState(false);
  const [position, setPosition] =  useState({ x, y });
  
  const onDown =  useCallback(() => setIsDragging(true), []);
  const onUp =  useCallback(() => setIsDragging(false), []);
  const onMove =  useCallback(e => {
    if (isDragging && sprite.current) {
      setPosition(e.data.getLocalPosition(sprite.current.parent));
    }
  }, [isDragging, setPosition]);
  
  return {
    ref: sprite,
    interactive: true, 
    pointerdown: onDown, 
    pointerup: onUp, 
    pointerupoutside: onUp,
    pointermove: onMove,
    alpha: isDragging ? 0.5 : 1,
    anchor: 0.5,
    position,
  };
};

const DraggableBunny = ({ x = 400, y = 300, ...props }) => {
  const bind = useDrag({ x, y });
  
  return (
    <Sprite
      image="https://s3-us-west-2.amazonaws.com/s.cdpn.io/693612/IaUrttj.png" 
      scale={4}
      {...bind}
      {...props}
    />
  );
}

export const Pixi = () => {
  
  
  return (
    <Stage width={1920} height={1080} options={{ backgroundColor: 0xeef1f5 }} id='canvas' data-testid="canvas">
        <Container>
            <DraggableBunny x={100} y={100} scale={2} data-testid="bunny1"/>
            <DraggableBunny x={300} y={100} scale={3} />
            <DraggableBunny x={500} y={100} scale={4} />
            <DraggableBunny x={700} y={100} scale={5} />
      </Container>
    </Stage>
  )
};
