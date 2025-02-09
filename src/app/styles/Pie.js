'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../helpers/symbols.css'
import {global_functions} from '../helpers/functions'

// Creates the display for the 'Bar' progress bar
export default function Pie(props) {
    const [SymbolArray, setSymbolArray] = React.useState([])
    const [SymbolMap, setSymbolMap] = React.useState([])
    const [StyleList, setStyleList] = React.useState(null)
    const [Triggered, setTriggered] = React.useState(false)
    const [ColorArray, setColorArray] = React.useState([])
    const [PercentArray, setPercentArray] = React.useState([])
    const [TriggerArray, setTriggerArray] = React.useState([])


    const shape_states = {"shape_array": [SymbolArray, setSymbolArray], "shape_map": [SymbolMap, setSymbolMap]}

    const sections = Math.round(100 / props.base_states["current_color"][0].length)

    const base_color = "#ebebeb"


    useEffect(() => {   
        read_file()
    }, [])

    useEffect(() => {
        if(shape_states["shape_map"][0].length > 0){
            props.base_states["length_value"] = 100 
            props.base_states["current_position"][1](100) 
        }
    }, [shape_states["shape_map"][0]])

    useEffect(() => {
        StyleList ? display_circles() : null
    }, [StyleList])

    useEffect(() => {
        if(props.base_states["trigger"][0] && props.base_states["current_position"][0] > 0 && props.base_states["trigger_amount"][0] && Triggered){
            props.base_states["trigger_amount"][0] > 0 ? show_circles(true) : props.base_states["trigger_amount"][1](null)
            !props.base_states["trigger_amount"][0] ? props.base_states["trigger"][1](false) : null
        }
    }, [props.base_states["trigger"][0], props.base_states["current_position"][0], props.base_states["trigger_amount"][0], Triggered])



    // Clears the circle array and map
    // @param: N/A
    // @return: N/A
    function clear_circles(){
        shape_states["shape_array"][1]([])
        shape_states["shape_map"][1]([])
    }


    // Starts the process to display the progress bar circles. First the circles are cleared, then the 'show_circles' function is called based on the needed length (LengthValue prop). 
    // @param: N/A
    // @return: N/A
    function display_circles(){
        let i = 0

        props.base_states["restart"][1](false)

        clear_circles()

        while(i < props.base_states["length_value"][0]){
            show_circles(false, true)
            i++
        }  
    }


    // Creates a circle to be added to the array. Called whenever a change is made (set to gray, red, green etc...). Used in combination with 'show_circles' function.
    // @param 'condition': True if circle is to be green. False if it is to be red.
    // @return HTML Object: The div containing one circle
    function create_circle(condition){
        let color = base_color
        let style = {}
        let percent_array = PercentArray
        let shape = ""
        let extra = 0
        let percent = 0
        let gray_value = 0

        style["--width"] = "5px" 
        style["--height"] = get_size()

        condition ? percent_array.length < 1 ? percent_array.push(props.base_states["trigger_amount"][0]) : percent_array[percent_array.length-1] <= sections ? percent_array[percent_array.length-1] = percent_array[percent_array.length-1] + props.base_states["trigger_amount"][0] : percent_array.push(props.base_states["trigger_amount"][0]) : null
        
        for(let k=0; k<percent_array.length; k++){
            if(percent_array[k] > sections && (k + 1) < percent_array.length){
                extra = percent_array[k] - sections
                percent_array[k] = sections
                try{
                    percent_array[k+1] = percent_array[k+1] + extra
                }catch{}
            }
        }

        if(percent_array.length > props.base_states["current_color"][0].length){
            percent_array = percent_array.slice(percent_array.length - props.base_states["current_color"][0].length)
            percent_array[percent_array.length-1] = sections
        }  

        for(let i=0; i<percent_array.length; i++){
            percent = percent + percent_array[i]
            percent > sections * (i + 1)? percent = sections * (i+1): null  
            color = get_color(true, percent_array.length-1)[i]
            i == 0 ? shape = color + " 0% " + percent + "%" : shape = shape + ", " + color + " 0% " + percent + "%"
        }

        for(let k=0; k<percent_array.length; k++){
            gray_value = gray_value + percent_array[k]
            gray_value > sections * (k + 1) ? gray_value = sections * (k + 1): null
        }

        shape = shape + ", " + base_color + " " + gray_value + "% 100%"

        style["--shape"] = shape

        !condition ?  style["--shape"] = base_color + " 0% 100%, transparent 100% 100%" : null

        percent_array.length > 0 && percent_array[0] != 0 ? setPercentArray(percent_array) : null
        

        return (
            <div className="w-8">
                <div className="circle_fill" style={style}>
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
        let shown_arr = []

        shown_arr.push(create_circle(condition))

        const shape_map = shown_arr.map((name, index) => {
            return {
              obj: shown_arr[index],
              key: uuidv4()
            }
        })

        shape_states["shape_array"][1](shown_arr)
        shape_states["shape_map"][1](shape_map)

        condition ? pos = pos - 1 : null
        props.base_states["current_position"][1](pos)
        setTriggered(false)
    }


    function trigger_test(){
        let trigger_array = TriggerArray
        let amount = null

        props.base_states["trigger"][1](true)
        amount = Math.round(Math.random(10) * 10)
        props.base_states["trigger_amount"][1](amount)
        setTriggered(true)
        amount != 0 ? trigger_array.push(amount) : null
        setTriggerArray(trigger_array)
    }


    function get_color(check, spot){
        let color_array = ColorArray

        color_array.length < 1 && spot > 0 ? spot = 0 : null

        if(check){
            !color_array.includes(props.base_states["current_color"][0][spot]) ?  color_array.push(props.base_states["current_color"][0][spot]) : null

            setColorArray(color_array)

            return color_array
        }

        return props.base_states["current_color"][0][spot]
    }


    function get_size(){
        if(props.base_states["size"]){
            return (props.base_states["size"] * 15).toString() + "px"
        }
        return "45px"
    }


    async function read_file(){
        var retrieved = null

        const response = await fetch('styles/file_scan');
        const retrieve = await response.json().then((data) => retrieved = data)

        const promise = new Promise((resolve, reject) => {
            resolve(global_functions["parse_file"](retrieved, ".", "{"))
        }).then(result => {
            setStyleList(result)
        })  
    }


    return(
        <div>
            <div className="mt-[150px] grid place-items-center" style={{ gridTemplateColumns: 'repeat(' + props.base_states["length_value"][0] + ', 4px)' }}>
                {shape_states["shape_map"][0] ? shape_states["shape_map"][0].map((result) =>  {         
                        return(
                            <div key={result.key}>
                                {result.obj}
                            </div>
                        )
                    })
                : null}
                <div className="grid place-items-end mt-96">
                    <button className="text-4xl" onClick={e => trigger_test()}>Increment</button>
                </div>
            </div> 

        </div>
    )
}

