'use client'
import React, {useEffect} from 'react';
import ProgressBar from './lists/ProgressBar';

export default function Home() {
  const [Trigger, setTrigger] = React.useState(false)

  return (
    <div>
      <ProgressBar LengthValue={23} Type="symbols" Style="stars" Trigger={[Trigger, setTrigger]} Size={5} Color={["orange", "#ce35aa", "lime", "#34adc3"]}/>
      {/* <ProgressBar Trigger={[Trigger, setTrigger]} Size={4}/> */}
    </div>
  );
}




// 'Trigger' PROPS IS TO INCREMENT PROGRESS BAR  **required
  // pass variable event that is intended to increment the bar. Accepts a set state array only in this format: 

      // [variable, setVariable]

  // If this is not set correctly the component will not function.



// 'Size' SETS THE COMPONENT DISPLAY SIZE. ACCEPTS RANGE FROM 1 (smallest) - 5 (largest)



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



// 'LengthValue' SETS AMOUNT OF SYMBOLS
  // defaults to 10



// 'Color' ACCEPTS ANY VALID CSS SYMBOL OR HEX VALUE
  // defaults to ["red", "yellow", "green"]

  // Must be in an array format <= LengthValue to display correctly. Color display will be divided equally based on amount of colors passed (size of array). If array size is greater than LengthValue, some colors will be skipped in the on-screen display.  