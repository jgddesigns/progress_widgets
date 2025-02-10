'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../helpers/symbols.css';




export default function Bar(props) {
    const [SymbolArray, setSymbolArray] = React.useState([])
    const [SymbolMap, setSymbolMap] = React.useState([])


    const shape_states = {"shape_array": [SymbolArray, setSymbolArray], "shape_map": [SymbolMap, setSymbolMap]}
    const base_color = "#ebebeb"




    useEffect(() => {
        display_circles() 
    }, [])

    useEffect(() => {
        if(props.base_states["trigger"][0] && props.base_states["current_position"][0] > 0 && props.base_states["trigger_amount"][0]){
            props.base_states["trigger_amount"][0] > 0 ? show_circles(true) : props.base_states["trigger_amount"][1](null)
            !props.base_states["trigger_amount"][0] ? props.base_states["trigger"][1](false) : null
        }
    }, [props.base_states["trigger"][0], props.base_states["current_position"][0], props.base_states["trigger_amount"][0]])


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

        condition ? style["--bgcolor"] = get_color() : style["--bgcolor"] = base_color

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




    return(
        <div>
            <div className="grid grid-auto-rows">
                <div className="grid place-items-center" style={{marginTop: "20%", marginBottom: "15%", fontSize: "18px"}}>
                    <div>
                        {/* {props.base_states["title"]} */}
                        My Progress Bar 
                    </div>
                </div>
            </div>
            <div className="mt-[150px] grid place-items-center" style={{ gridTemplateColumns: 'repeat(' + props.base_states["length_value"][0] + ', 4px)' }}>
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
    )
}