'use client'
import React, {useEffect} from 'react';
import { v4 as uuidv4 } from 'uuid';
import '../helpers/symbols.css';




export default function Symbols(props) {
    const [SymbolArray, setSymbolArray] = React.useState([])
    const [SymbolMap, setSymbolMap] = React.useState([])

    const base_color = "#ebebeb"

    const shape_states = {"shape_array": [SymbolArray, setSymbolArray], "shape_map": [SymbolMap, setSymbolMap]}
    const row_size = props.base_states["size"] < 4 ? 20 : 10
    const row_class = props.base_states["size"] == 1 ? "grid mt-12" : "grid mt-24"
    const styles = ["circles", "squares", "stars", "hearts", "moons", "hexagons", "diamonds", "trapezoids", "arrows_right", "arrows_left", "arrows_up", "arrows_down"]


    useEffect(() => {
        props.base_states["reset"][0] ? reset_circles() : null
    }, [props.base_states["reset"][0]])


    useEffect(() => {
        shape_states["shape_map"][0].length < 1 ? display_circles() : null
    }, [shape_states["shape_map"][0]])


    useEffect(() => {
        if(props.base_states["trigger"][0] && props.base_states["current_position"][0] > 0){
            show_circles(true)
        }
    }, [props.base_states["trigger"][0]])



    function reset_circles(){
        shape_states["shape_array"][1]([])
        shape_states["shape_map"][1]([])
        props.base_states["current_position"][1](props.base_states["length_value"][0])
        props.base_states["reset"][1](false)
    }

    
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

        condition ? style["--bgcolor"] = get_color() : style["--bgcolor"] = base_color

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
        return props.base_states["current_color"][0].length > 1 ? props.base_states["current_color"][0][props.base_states["current_color"][0].length - (Math.ceil(props.base_states["current_color"][0].length * (props.base_states["current_position"][0] / props.base_states["length_value"][0])))] : props.base_states["current_color"][0][0]
    }


    function get_style(){
        try{
            if(styles.includes(props.base_states["style"])){
                return props.base_states["style"]
            }

            return <div className="mt-[150px]"> "Invalid 'Style' prop passed. Pass a valid 'Style' prop identified in the README file." </div>
        }catch{}
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
        <div className="grid grid-auto-rows place-items-center">
            {props.base_states["length_value"][0] <= 10 ?
                <div className="grid place-items-center">
                    <div className="text-xl">
                        {props.base_states["title"]}
                    </div>
                    <div className="mt-24">
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
            :
                <div style={{marginTop: "50%"}} className="mt-48 text-xl">
                    Error. Please set the LengthValue prop to 10 or less.
                </div>
            }
        </div>
    )
}