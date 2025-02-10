'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../helpers/symbols.css'




export default function Pie(props) {
    const [SymbolArray, setSymbolArray] = React.useState([])
    const [SymbolMap, setSymbolMap] = React.useState([])
    const [ColorArray, setColorArray] = React.useState([])
    const [PercentArray, setPercentArray] = React.useState([])


    const shape_states = {"shape_array": [SymbolArray, setSymbolArray], "shape_map": [SymbolMap, setSymbolMap]}
    const sections = Math.round(100 / props.base_states["current_color"][0].length)
    const base_color = "#ebebeb"


    useEffect(() => {   
        display_circles()
    }, [])

    useEffect(() => {
        if(shape_states["shape_map"][0].length > 0){
            props.base_states["length_value"] = 100 
            props.base_states["current_position"][1](100) 
        }
    }, [shape_states["shape_map"][0]])

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

        props.base_states["restart"][1](false)

        clear_circles()

        while(i < props.base_states["length_value"][0]){
            show_circles(false, true)
            i++
        }  
    }


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
        props.base_states["trigger"][1](false)
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


  

    return(
        <div>
            <div className="grid grid-auto-rows">
                <div className="grid place-items-center" style={{marginTop: "20%", marginBottom: "35%", fontSize: "18px"}}>
                    <div>
                        {/* {props.base_states["title"]} */}
                        My Progress Pie 
                    </div>
                </div>
            </div>
            <div className="mt-[150px] grid place-items-center ml-[10%]" style={{ gridTemplateColumns: 'repeat(' + props.base_states["length_value"][0] + ', 4px)', marginLeft: "50%" }}>
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