'use client'
import React, {useEffect} from 'react';
import ProgressBar from "./lists/ProgressBar";

export default function Home() {
  const [Trigger, setTrigger] = React.useState(false)

  return (
    <div>
      <ProgressBar LengthValue={23} Type="symbols" Style="hexagons" Trigger={[Trigger, setTrigger]} Size={5} Color={["red", "grfzffeen", "fuchsia", "#34adc3", "purple"]}/>
    </div>
  );
}
