EZ Radar Chart for React.js

By Jason Dunn 

Github: https://www.github.com/jgddesigns

Contact: jaygeorgedunn@gmail.com

A simple Progress Widget component for use with React.js and Next.js. Customize size, color and progress sections. Bar, Meter, Pie and Symbol Widgets available.



![Screenshot (50)](https://github.com/user-attachments/assets/96bb0f5c-889f-43e7-909e-0ceb0d4d08e0)
![Screenshot (51)](https://github.com/user-attachments/assets/d1e18442-e97d-4251-8c0e-cd3d14dd77e4)
![Screenshot (52)](https://github.com/user-attachments/assets/9c0f9e0b-9dc7-4204-9f51-8c555dfc26bb)
![Screenshot (54)](https://github.com/user-attachments/assets/516097a7-c8e7-4208-9e83-4673d0a78371)
![Screenshot (55)](https://github.com/user-attachments/assets/cfc99b6d-14d7-426c-8482-68e5554fa862)
![Screenshot (56)](https://github.com/user-attachments/assets/0fa97ada-c426-4663-8e8f-2783ecdeb568)
![Screenshot (57)](https://github.com/user-attachments/assets/90b60c46-806f-452f-b9c0-b4ad8f6aa436)
![Screenshot (58)](https://github.com/user-attachments/assets/fc97ef99-4dc0-433e-82d3-d133b66dbe20)
![Screenshot (60)](https://github.com/user-attachments/assets/94276920-f5af-4baf-b49e-48d48146b89f)



Getting Started:

    From Terminal 
        npm install progress-widgets

    Import Line
        import ProgressWidgets from 'progress-widgets'



Component Example:

      <ProgressWidgets Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Title="My Symbols Widget" Type="symbols" Color={["red", "orange", "yellow", "lime", "green"]}  Size={4} LengthValue={12} Style="stars"/>  


Props Detailed:


    Trigger (required)

        A React state-variable set that holds a variable which triggers the movement of the current widget. The variable moves the widget when set to 'true'. The state does not need to be set to 'false' on the project end.

        Example:

            Trigger={[MyTrigger, setMyTrigger]}


    TriggerAmount (required)

        A React state-variable set that holds a variable containing the current percentage at which the widget is intended to increment. The percentage needs to be set prior to setting the Trigger state to 'true'.

        Example:

            TriggerAmount={[MyTriggerAmount, setMyTriggerAmount]}

 
    Title (optional)

        A string holding the title of the chart.

        Defaults to no title if prop is not set.

        Example:

            Title="My Progress Widget"


    Type (optional)

        A string containing the type of widget. 

        Choices:

            bar
            meter
            pie
            symbols

        Defaults to "bar" if prop is not set.

        Examples:

            Type="meter"

            Type="Meter"

            Type="METER"

            Type="MeTeR"


    Color (optional)

        An array containing the colors intended to be used.

        In bar, meter, and pie types, the number of sections is dependent on the amount of colors in the array.

        Accepts:

            Hex Value: '#000fff'
                or
            CSS Color: 'green'

        Defaults to ["red", "yellow", "green"] if prop is not set.

        Examples:

            Color=[]"#000fff"

            Color="#a2d4cb"

            Color="green"

            Color="aqua"


    Size (optional)

        Ranges from extra small to extra large using number values 1-5.

        Defaults to 3 (medium) if prop is not set.

        Example:

            Size={4}


    LengthValue (optional, 'symbols' type only)

        Number value that sets the amount of symbols to be displayed.

        Defaults to 10 if prop is not set.

        Example:

            LengthValue={25}

    
    Style (optional, 'symbols' type only)

        A string describing the style of symbol used in the 'symbols' widget. 

        Choices:

            circles 
            squares 
            bar 
            meter 
            stars 
            hearts 
            moons 
            hexagons 
            diamonds 
            trapezoids
            arrows_right
            arrows_left
            arrows_up
            arrows_down

        Defaults to "squares" if prop is not set.

        Examples:

            Style="trapezoids"






MIT License

Copyright (c) 2025 Jason Dunn

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.






















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
