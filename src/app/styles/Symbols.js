'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../helpers/symbols.css'
import {global_functions} from '../helpers/functions'

// Creates the display for the 'Symbols' progress bar
export default function Symbols(props) {
    const [SymbolArray, setSymbolArray] = React.useState([])
    const [SymbolMap, setSymbolMap] = React.useState([])
    const [StyleList, setStyleList] = React.useState(null)

    const shape_states = {"shape_array": [SymbolArray, setSymbolArray], "shape_map": [SymbolMap, setSymbolMap]}

    const row_size = props.base_states["size"] < 4 ? 20 : 10

    const row_class = props.base_states["size"] == 1 ? "grid mt-12" : "grid mt-24"


    useEffect(() => {   
        read_file()
    }, [])

    useEffect(() => {
        StyleList ? display_circles() : null
    }, [StyleList])

    useEffect(() => {
        if(props.base_states["trigger"][0] && props.base_states["current_position"][0] > 0){
            show_circles(true)
        }
    }, [props.base_states["trigger"][0]])


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

        style["--size"] = get_size() 

        condition ? style["--bgcolor"] = get_color() : style["--bgcolor"] = "#c2c2c2"

        return (
            <div className="w-8">
                <div className={get_style()} style={style}>
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
        let shown_arr = shape_states["shape_array"][0]

        !start ? shown_arr[Math.abs(props.base_states["length_value"][0] - props.base_states["current_position"][0])] = create_circle(condition) : shown_arr.push(create_circle(condition, start))

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
        props.base_states["trigger"][1](false)
    }


    function trigger_test(){
        props.base_states["trigger"][1](true)
    }


    function get_color(){
        let value = props.base_states["current_color"][0].length - Math.ceil(props.base_states["current_position"][0] / props.base_states["length_value"][0] * props.base_states["current_color"][0].length)

        return value < props.base_states["current_color"][0].length ? (props.base_states["current_position"][0] / props.base_states["length_value"][0]) >= ((props.base_states["current_color"][0].length - 1) / props.base_states["current_color"][0].length) ? props.base_states["current_color"][0][0] : props.base_states["current_color"][0][value] : props.base_states["current_color"][0][props.base_states["current_color"][0].length - 1]
    }


    function get_style(){
        try{
            let temp_arr = StyleList

            if(temp_arr && temp_arr.includes(props.base_states["style"])){
                return props.base_states["style"]
            }

            return <div className="mt-[150px]"> "Invalid 'Style' prop passed. Pass a valid 'Style' prop identified in the README file." </div>
        }catch{
            console.log("Error in Symbols component, 'get_style' function.")
        }
    }


    function get_size(){
        if(props.base_states["size"]){
            return (props.base_states["size"] * 15).toString() + "px"
        }
        return "45px"
    }


    function get_spacing(){
        // if(props.base_states["size"] > 1){
        //     return (props.base_states["size"] * 25).toString() + "px"
        // }else if(props.base_states["size"] == 1){
        //     return "25px"
        // }
        if(props.base_states["size"]){
            return (props.base_states["size"] * 25).toString() + "px"
        }else if(props.base_states["size"] == 1){
            return "25px"
        }
        return "90px"
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


    function display_map(){
        let temp_arr = []
        let display_arr = shape_states["shape_map"][0]

        while(display_arr.length > 0){
            if(display_arr.length >= row_size){
                temp_arr.push(display_arr.slice(0, row_size))
                display_arr = display_arr.slice(row_size)
            }else{
                temp_arr.push(display_arr.slice(0, display_arr.length))
                display_arr = []
            }

        }

        const new_arr = temp_arr.map((name, index) =>  {         
            return{
                obj: temp_arr[index],
                key: uuidv4()
            }
        })

        return new_arr
    }


    return(
        <div>
            {shape_states["shape_map"][0] ?    
                <div style={{ display: "grid", gridTemplateRows: `repeat(${display_map().length}, auto)`, gridTemplateColumns: `1fr`}}> 
                    {display_map().map((result) =>  {         
                        return(
                            <div style={{ gridTemplateRows: 1, gridTemplateColumns: 'repeat(' + result.obj.length + ', ' + get_spacing() + ')'}} key={result.key} className={row_class}>
                                {result.obj.map((result2) => {
                                    return(
                                        <div key={result2.key}>
                                            {result2.obj}
                                        </div>
                                    )
                                })}
                            </div>
                        )
                    })}
                    <div className="grid place-items-end mt-96">
                        <button className="text-4xl" onClick={e => trigger_test()}>Increment</button>
                    </div>
                </div>  
            : null}
        </div>
    )
}



