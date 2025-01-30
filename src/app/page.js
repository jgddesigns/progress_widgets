'use client'
import React, {useEffect} from 'react';
import ProgressBar from "./lists/ProgressBar";

export default function Home() {
  const [Trigger, setTrigger] = React.useState(false)

  return (
    <div>
      <ProgressBar LengthValue={35} Type="circles" Trigger={[Trigger, setTrigger]} Size={5} Color={["red", "green", "purple"]}/>
    </div>
  );
}
