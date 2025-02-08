'use client'
import React, {useEffect} from 'react';
import ProgressBar from './lists/ProgressBar';

export default function Home() {
  const [Trigger, setTrigger] = React.useState(false)
  const [TriggerAmount, setTriggerAmount] = React.useState(15)

  return (
    <div className="mt-12">
      {/* <ProgressBar LengthValue={225} Type="symbols" Style="trapezoids" Trigger={[Trigger, setTrigger]} Size={3} Color={["#e63946", "#457b9d", "#f4a261", "#2a9d8f", "#9b5de5", "#ff6b6b", "#1d3557", "#ff9f1c", "#6a0572", "#52b788", "#8338ec", "#ffbe0b", "#3a86ff", "#06d6a0", "#ef476f", "#8ac926", "#ff595e", "#1982c4", "#d81159", "#ffca3a", "#c1121f", "#4361ee", "#f77f00", "#8f2d56", "#118ab2", "#9d4edd", "#e36414", "#00a896", "#bc4749", "#6a994e", "#ff007f", "#0a9396", "#aacc00", "#db3069", "#3d348b"]}/> */}
      <ProgressBar Type="pie" LengthValue={1} Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Size={5} Color={["red", "orange", "yellow", "lime", "green"]}/>
      {/* <ProgressBar Trigger={[Trigger, setTrigger]} Size={4}/> */}
    </div>
  );
}




// 'Trigger' PROPS IS TO INCREMENT PROGRESS BAR  **required
  // pass variable event that is intended to increment the bar. Accepts a set state array only in this format: 

      // [variable, setVariable]

  // If this is not set correctly the component will not function.

  // For 'bar' type, each trigger increments bar 1%. Trigger multiple times to advance for other percentages. (see below)


// 'TriggerAmount' IS HOW MUCH THE BAR ADVANCES (15 = 15%, 1:1 ratio) 
  //Not needed for 'shapes' prop


// 'Size' SETS THE COMPONENT DISPLAY SIZE. ACCEPTS RANGE FROM 1 (smallest) - 5 (largest)

  //For 'bar' type, length is always 100 and increment is based on percentage. Each increment is 1%. 



// 'Type' ACCEPTS THE TYPE OF BAR TO DISPLAY.
  //defaults to 'bar' CHANGE WHEN BAR IS SET

  // bar
  // meter
  // pie
  // symbols


  // 'Style' OPTIONS DEPENDS ON TYPE PROP. ONLY RELEVANT FOR 'symbols' TYPE.
    //defaults to 'circles'

    // SYMBOLS
    // ===========
    // circles
    // squares
    // stars
    // hearts
    // moons
    // hexagons
    // diamonds
    // trapezoids
    // arrows_left
    // arrows_right
    // arrows_up
    // arrows_down



// 'LengthValue' SETS AMOUNT OF SYMBOLS
  // defaults to 10
  // Max 250


// 'Color' ACCEPTS ANY VALID CSS SYMBOL OR HEX VALUE
  // defaults to ["red", "yellow", "green"]

  // Must be in an array format <= LengthValue to display correctly. Color display will be divided equally based on amount of colors passed (size of array). If array size is greater than LengthValue, some colors will be skipped in the on-screen display.  