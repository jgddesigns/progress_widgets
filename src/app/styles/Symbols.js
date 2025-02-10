'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../helpers/symbols.css';




export default function Symbols(props) {
    const [SymbolArray, setSymbolArray] = React.useState([])
    const [SymbolMap, setSymbolMap] = React.useState([])


    const shape_states = {"shape_array": [SymbolArray, setSymbolArray], "shape_map": [SymbolMap, setSymbolMap]}
    const row_size = props.base_states["size"] < 4 ? 20 : 10
    const row_class = props.base_states["size"] == 1 ? "grid mt-12" : "grid mt-24"
    const styles = ["circles", "squares", "stars", "hearts", "moons", "hexagons", "diamonds", "trapezoids", "arrows_right", "arrows_left", "arrows_up", "arrows_down"]


    useEffect(() => {
        display_circles() 
    }, [])

    useEffect(() => {
        if(props.base_states["trigger"][0] && props.base_states["current_position"][0] > 0){
            show_circles(true)
        }
    }, [props.base_states["trigger"][0]])


    function clear_circles(){
        shape_states["shape_array"][1]([])
        shape_states["shape_map"][1]([])
    }


    function display_circles(){
        props.base_states["restart"][1](false)

        clear_circles()

        let i = 0
        while(i < props.base_states["length_value"][0]){
            show_circles(false, true)
            i++
        }  
    }


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


    function get_color(){
        let value = props.base_states["current_color"][0].length - Math.ceil(props.base_states["current_position"][0] / props.base_states["length_value"][0] * props.base_states["current_color"][0].length)

        return value < props.base_states["current_color"][0].length ? (props.base_states["current_position"][0] / props.base_states["length_value"][0]) >= ((props.base_states["current_color"][0].length - 1) / props.base_states["current_color"][0].length) ? props.base_states["current_color"][0][0] : props.base_states["current_color"][0][value] : props.base_states["current_color"][0][props.base_states["current_color"][0].length - 1]
    }


    function get_style(){
        try{
            if(styles.includes(props.base_states["style"])){
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
        if(props.base_states["size"]){
            return (props.base_states["size"] * 25).toString() + "px"
        }else if(props.base_states["size"] == 1){
            return "25px"
        }
        return "90px"
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
        <div className="grid grid-auto-rows">
            <div className="grid place-items-center" style={{marginTop: "10%", marginBottom: "10%", fontSize: "18px"}}>
                <div>
                    {/* {props.base_states["title"]} */}
                    My Progress Symbols 
                </div>
            </div>
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
                    </div>  
                : null}
            </div>
        </div>
    )
}