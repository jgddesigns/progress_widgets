Progress Widgets for React.js

By Jason Dunn 

Github: https://www.github.com/jgddesigns

Contact: jaygeorgedunn@gmail.com

Progress Widget component for use with React.js and Next.js. Customize size, color and progress sections. Bar, Meter, Pie and Symbol Widgets available.



<ProgressWidgets Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Title="My Progress Bar" Type="bar" Color={["red", "orange", "yellow", "lime", "green"]} Size={4}/>

![001-a](https://github.com/user-attachments/assets/6d9a5018-65d6-4847-9013-441714c52e89)



<ProgressWidgets Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Title="My Progress Meter" Type="meter" Color={["red", "orange", "yellow", "lime", "green"]} Size={3}/>

![002-a](https://github.com/user-attachments/assets/73917779-8cf9-4bcc-8875-de104c45e5f9)



<ProgressWidgets Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Title="My Progress Pie" Type="pie" Color={["red", "orange", "yellow", "lime", "green"]} Size={5}/>

![003-a](https://github.com/user-attachments/assets/c5016b58-4b27-4104-9f5a-8cef37004d79)



<ProgressWidgets Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Title="My Progress Symbols" Type="symbols" Color={["red", "orange", "yellow", "lime", "green"]} Size={2} Style="arrows_right" LengthValue={10}/>

![004-a](https://github.com/user-attachments/assets/17770557-ae5c-4bec-a43a-2c304bdbe6c0)



<ProgressWidgets Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Title="My Progress Symbols" Type="symbols" Color={["red", "orange", "yellow", "lime", "green"]} Size={2} Style="stars" LengthValue={10}/>

![005-a](https://github.com/user-attachments/assets/2f6a5d6f-d2be-41ea-aa1c-623442a0f804)



<ProgressWidgets Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Title="My Progress Symbols" Type="symbols" Color={["#eb9234", "#ebab34", "#f0bd3c", "#f0c65b"]} Size={3} Style="diamonds" LengthValue={7}/>

![006-a](https://github.com/user-attachments/assets/585b793a-c235-49f5-8ea6-bee2fb98e19e)



<ProgressWidgets Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Title="My Progress Bar" Type="bar" Color={["darkgreen", "green", "yellowgreen", "lime", "springgreen", "palegreen"]} Size={3}/> 

![007-a](https://github.com/user-attachments/assets/22f4f8a5-3f84-440a-b24b-34dd072e9711)



<ProgressWidgets Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Title="My Progress Meter" Type="meter" Color={["blue", "turquoise", "lightblue", "skyblue"]} Size={2}/>

![008-a](https://github.com/user-attachments/assets/fbce413a-134c-4664-91f0-11499bc39bad)



<ProgressWidgets Trigger={[Trigger, setTrigger]} TriggerAmount={[TriggerAmount, setTriggerAmount]} Title="My Progress Pie" Type="pie" Color={["red", "orange", "yellow", "lime", "green", "#e63946", "#457b9d", "#f4a261", "#2a9d8f", "#9b5de5", "#ff6b6b", "#1d3557", "#ff9f1c", "#6a0572", "#52b788", "#8338ec", "#ffbe0b", "#3a86ff", "#06d6a0", "#ef476f", "#8ac926", "#ff595e", "#1982c4", "#d81159", "#ffca3a", "#c1121f", "#4361ee", "#f77f00", "#8f2d56", "#118ab2", "#9d4edd", "#e36414", "#00a896", "#bc4749", "#6a994e", "#ff007f", "#0a9396", "#aacc00", "#db3069", "#3d348b"]} Size={5}/>

![009-a](https://github.com/user-attachments/assets/b90f0722-5fbc-45b4-bc92-c5cf938895f4)




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

            Color=["#000fff", "#123abc", "#000fff", "#ea45ca"]

            Color=["blue", "turqoise", "aqua", "sky-blue"]

            Color=["blue", "turqoise", "#000fff", "#ea45ca"]



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
