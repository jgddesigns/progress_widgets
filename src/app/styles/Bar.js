'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../helpers/symbols.css'
import {global_functions} from '../helpers/functions'




export default function Bar(props) {
    const [SymbolArray, setSymbolArray] = React.useState([])
    const [SymbolMap, setSymbolMap] = React.useState([])
    const [StyleList, setStyleList] = React.useState(null)
    const [Triggered, setTriggered] = React.useState(true)


    const shape_states = {"shape_array": [SymbolArray, setSymbolArray], "shape_map": [SymbolMap, setSymbolMap]}


    useEffect(() => {   
        read_file()
    }, [])

    useEffect(() => {
        StyleList ? display_circles() : null
    }, [StyleList])

    useEffect(() => {
        if(props.base_states["trigger"][0] && props.base_states["current_position"][0] > 0 && props.base_states["trigger_amount"][0] && Triggered){
            props.base_states["trigger_amount"][0] > 0 ? show_circles(true) : props.base_states["trigger_amount"][1](null)
            !props.base_states["trigger_amount"][0] ? props.base_states["trigger"][1](false) : null
        }
    }, [props.base_states["trigger"][0], props.base_states["current_position"][0], props.base_states["trigger_amount"][0], Triggered])


    function clear_circles(){
        shape_states["shape_array"][1]([])
        shape_states["shape_map"][1]([])
    }


    function display_circles(){
        let i = 0

        props.base_states["length_value"][0] = 100
        props.base_states["current_position"][1](100)
        props.base_states["restart"][1](false)

        clear_circles()

        while(i < props.base_states["length_value"][0]){
            show_circles(false, true)
            i++
        }    
    }


    function create_circle(condition){
        let style = {}

        style["--width"] = "5px" 
        style["--height"] = get_size()

        condition ? style["--bgcolor"] = get_color() : style["--bgcolor"] = "#c2c2c2"

        return (
            <div className="w-8">
                <div className="bar" style={style}>
                </div>
            </div>
        )
    }


    function show_circles(condition, start = null){
        let trigger_amount = props.base_states["trigger_amount"][0] - 1
        let pos = props.base_states["current_position"][0]
        let shown_arr = shape_states["shape_array"][0]

        !start ? shown_arr[Math.abs(props.base_states["length_value"][0] - props.base_states["current_position"][0])] = create_circle(condition) : shown_arr.push(create_circle(condition))

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
        props.base_states["trigger_amount"][1](trigger_amount)
    }


    function trigger_test(){
        props.base_states["trigger"][1](true)
        props.base_states["trigger_amount"][1](Math.round(Math.random(20) * 10))
        setTriggered(true)
    }


    function get_color(){
        let value = props.base_states["current_color"][0].length - Math.ceil(props.base_states["current_position"][0] / props.base_states["length_value"][0] * props.base_states["current_color"][0].length)

        return value < props.base_states["current_color"][0].length ? (props.base_states["current_position"][0] / props.base_states["length_value"][0]) >= ((props.base_states["current_color"][0].length - 1) / props.base_states["current_color"][0].length) ? props.base_states["current_color"][0][0] : props.base_states["current_color"][0][value] : props.base_states["current_color"][0][props.base_states["current_color"][0].length - 1]
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
                {/* <div className="grid place-items-end mt-96">
                    <button className="text-4xl" onClick={e => trigger_test()}>Increment</button>
                </div> */}
            </div> 
        </div>
    )
}