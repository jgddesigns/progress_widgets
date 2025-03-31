'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../helpers/symbols.css';




export default function Meter(props) {
    const [SymbolArray, setSymbolArray] = React.useState([])
    const [SymbolMap, setSymbolMap] = React.useState([])


    const shape_states = {"shape_array": [SymbolArray, setSymbolArray], "shape_map": [SymbolMap, setSymbolMap]}
    const base_color = "#ebebeb"


    useEffect(() => {
        props.base_states["reset"][0] ? reset_circles() : null
    }, [props.base_states["reset"][0]])


    useEffect(() => {
        shape_states["shape_map"][0].length < 1 ? display_circles() : null
    }, [shape_states["shape_map"][0]])


    useEffect(() => {
        if(props.base_states["trigger"][0] && props.base_states["current_position"][0] >= 0 && props.base_states["trigger_amount"][0]){
            props.base_states["trigger_amount"][0] > 0 ? show_circles(true) : props.base_states["trigger_amount"][1](null)
            !props.base_states["trigger_amount"][0] ? props.base_states["trigger"][1](false) : null
        }
    }, [props.base_states["trigger"][0], props.base_states["current_position"][0], props.base_states["trigger_amount"][0]])


    function reset_circles(){
        shape_states["shape_array"][1]([])
        shape_states["shape_map"][1]([])
        props.base_states["length_value"][0] = 100
        props.base_states["current_position"][1](100)
        props.base_states["reset"][1](false)
    }

    
    function clear_circles(){
        shape_states["shape_array"][1]([])
        shape_states["shape_map"][1]([])
    }


    function display_circles(){
        let i = 0

        props.base_states["restart"][1](false)

        clear_circles()

        while(i < props.base_states["length_value"][0]){
            show_circles(false, true)
            i++
        }    

        props.base_states["current_position"][1](99)
    }


    function create_circle(condition, pos){
        let style = {}

        style["--width"] = get_size() 
        style["--height"] = "10px"

        condition ? style["--bgcolor"] = get_color(pos) : style["--bgcolor"] = base_color

        return (
            <div className="w-8">
                <div className="meter" style={style}>
                </div>
            </div>
        )
    }


    function show_circles(condition, start = null){
        let pos = props.base_states["current_position"][0]
        let shown_arr = shape_states["shape_array"][0]
        let i 

        condition ? i = 0 : i = props.base_states["trigger_amount"][0] - 1
        while(i < props.base_states["trigger_amount"][0]){
            !start ? shown_arr[pos] = create_circle(condition, pos) : shown_arr.push(create_circle(condition, pos))
            condition ? pos = pos - 1 : null
            i++
        }

        const shape_map = shown_arr.map((name, index) => {
            return {
                obj: shown_arr[index],
                key: uuidv4()
            }
        })

        shape_states["shape_array"][1](shown_arr)
        shape_states["shape_map"][1](shape_map)

        props.base_states["current_position"][1](pos)
        props.base_states["trigger"][1](false)
    }


    function get_color(pos){
        return props.base_states["current_color"][0][Math.floor((((props.base_states["length_value"][0] - pos) / props.base_states["length_value"][0]) * props.base_states["current_color"][0].length))]
    }


    function get_size(){
        if(props.base_states["size"]){
            return (props.base_states["size"] * 15).toString() + "px"
        }
        return "45px"
    }




    return(
        <div className="grid place-items-center">
            <div className="text-xl mb-24">
                {props.base_states["title"]}
            </div>
            <div> 
                <div className="grid place-items-center" style={{gridTemplateRows: 'repeat(' + props.base_states["length_value"][0] + ', 4px)' }}>
                    {shape_states["shape_map"][0] ? shape_states["shape_map"][0].map((result) =>  {         
                            return(
                                <div key={result.key}>
                                    {result.obj}
                                </div>
                            )
                        })
                    : null}
                </div> 
            </div>
        </div>
    )
}