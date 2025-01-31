'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import "../helpers/symbols.css"

// Creates the display for the progress bar
// Needs props Restart, setRestart, LengthValue, CurrentPosition, ShowCirclesGreen, setShowCirclesGreen, ShowCirclesRed, setShowCirclesRed
export default function Circles(props) {
    const [CircleArray, setCircleArray] = React.useState([])
    const [CircleMap, setCircleMap] = React.useState([])

    const circle_states = {"circle_array": [CircleArray, setCircleArray], "circle_map": [CircleMap, setCircleMap]}

    const circle_style = "circles"

    useEffect(() => {
        display_circles() 
     }, [])

    useEffect(() => {
        if(props.base_states["trigger"][0] && props.base_states["current_position"][0] > 0){
            show_circles(true)
        }
    }, [props.base_states["trigger"][0]])


    // Clears the circle array and map
    // @param: N/A
    // @return: N/A
    function clear_circles(){
        circle_states["circle_array"][1]([])
        circle_states["circle_map"][1]([])
    }

    // Starts the process to display the progress bar circles. First the circles are cleared, then the 'show_circles' function is called based on the needed length (LengthValue prop). 
    // @param: N/A
    // @return: N/A
    function display_circles(){
        props.base_states["restart"][1](false)
        clear_circles()
        let i = 0
        while(i < props.base_states["length_value"][0]){
            show_circles(false, true)
            i++
        }  
    }

    // Creates a circle to be added to the array. Called whenever a change is made (set to gray, red, green etc...). Used in combination with 'show_circles' function.
    // @param 'condition': True if circle is to be green. False if it is to be red.
    // @return HTML Object: The div containing one circle
    function create_circle(condition, start = null){
        let class_txt = null
        let style = {}
        condition ? style["--bgcolor"] = props.base_states["current_color"][0] : null
        start ? class_txt = "progress_gray" : class_txt = circle_style
        return (
            <div className="w-8">
                <div className={class_txt} style={style}>
                </div>
            </div>
        )
    }


    // Creates all needed circles and adds them to the circle map. 
    // @param 'condition': True if the circle is to be green, false if red
    // @param 'start': Only set if it is the initial display, null if otherwise
    // @return: N/A 
    function show_circles(condition, start = null){
        let pos = props.base_states["current_position"][0]
        let shown_arr = circle_states["circle_array"][0]
        !start ? shown_arr[Math.abs(props.base_states["length_value"][0] - props.base_states["current_position"][0])] = create_circle(condition) : shown_arr.push(create_circle(condition, start))
        const circle_map = shown_arr.map((name, index) => {
            return {
              obj: shown_arr[index],
              key: uuidv4()
            }
        })
        circle_states["circle_array"][1](shown_arr)
        circle_states["circle_map"][1](circle_map)
        condition ? pos = pos - 1 : null
        props.base_states["current_position"][1](pos)
        props.base_states["trigger"][1](false)
    }


    function test(condition){
        console.log("trigger test")
        condition ? props.base_states["current_color"][1]("green") : props.base_states["current_color"][1]("red")
        props.base_states["trigger"][1](true)
    }


    return(
        <div>
            <div className="mt-[150px] grid place-items-center" style={{ gridTemplateColumns: 'repeat(' + props.base_states["length_value"][0] + ', 30px)' }}>
                {circle_states["circle_map"][0] ? circle_states["circle_map"][0].map((result) =>  {         
                        return(
                            <div key={result.key}>
                                {result.obj}
                            </div>
                        )
                    })
                : null}
            </div> 
            <div className="grid place-items-center grid-rows-1 grid-cols-2 gap-12">
                <div>
                <button className="mt-12" onClick={e => test(true)}>Green</button>
                </div>
                <div>
                <button className="mt-12" onClick={e => test(false)}>Red</button>
                </div>
                
            </div>
        </div>
    )
}



