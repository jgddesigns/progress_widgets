'use client'
import React, {useEffect} from 'react';
import ProgressBar from "./lists/ProgressBar";

export default function Home() {
  const [Trigger, setTrigger] = React.useState(false)
  const [Color, setColor] = React.useState("#234aae")

  return (
    <div>
      <ProgressBar LengthValue={15} Type="circles" Trigger={[Trigger, setTrigger]} Size={5} Color={Color}/>
    </div>
  );
}
