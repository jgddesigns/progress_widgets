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

    const shape_states = {"shape_array": [SymbolArray, setSymbolArray], "shape_map": [SymbolMap, setSymbolMap]}



    useEffect(() => {   
        read_file()
    }, [])

    shape_states["shape_map"][0]

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
            // props.base_states["trigger"][1](false)
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

        // props.base_states["length_value"][0] = 100
        // props.base_states["current_position"][1](100)
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
        let style = {}

        style["--width"] = "5px" 
        style["--height"] = get_size()

        console.log(props.base_states["trigger_amount"][0])


        condition ? style["--shape"] = get_color() + " 0% " + props.base_states["trigger_amount"][0]+ "%, gray " + props.base_states["trigger_amount"][0] + "% 100%" : style["--shape"] = "gray 0% 100%, transparent 100% 100%"

        // condition ? style["--bgcolor"] = get_color() : style["--bgcolor"] = "#c2c2c2"

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
        let trigger_amount = props.base_states["trigger_amount"][0]
        trigger_amount = trigger_amount - 1
        console.log(trigger_amount)
        let pos = props.base_states["current_position"][0]
        let shown_arr = []

        console.log("shown arr")
        console.log(shown_arr)

        !start ? shown_arr[0] = create_circle(condition) : shown_arr.push(create_circle(condition, start))

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
        // props.base_states["trigger_amount"][1](trigger_amount)
    }


    function trigger_test(){
        props.base_states["trigger"][1](true)
        props.base_states["trigger_amount"][1](props.base_states["trigger_amount"][0] + Math.round(Math.random(20) * 10))
        setTriggered(true)
    }


    function get_color(){
        let value = Math.round((props.base_states["trigger_amount"][0]/100) * props.base_states["current_color"][0].length)

        value > props.base_states["current_color"][0].length - 1 ? value = props.base_states["current_color"][0].length  : null

        return props.base_states["current_color"][0][value - 1]
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

