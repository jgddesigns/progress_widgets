'use client'
import React, {useEffect} from 'react';
import {global_functions} from '../helpers/functions'
import '../helpers/symbols.css';
import Bar from '../styles/Bar';
import Meter from '../styles/Meter';
import Pie from '../styles/Pie';
import Symbols from '../styles/Symbols'


// Creates the display for the progress bar
// Needs props LengthValue, Type, Style, Trigger, Color, Size
export default function ProgressBar (props) {
    const [Restart, setRestart] = React.useState(false)
    const [CurrentPosition, setCurrentPosition] = React.useState(props.LengthValue ? props.LengthValue : 10)
    const [CurrentColor, setCurrentColor] = React.useState(null) 


    const base_states = {"restart": [Restart, setRestart], "current_position": [CurrentPosition, setCurrentPosition], "length_value": [props.LengthValue ? props.LengthValue : 10, props.setLengthValue], "current_color": [CurrentColor ? CurrentColor : ["red", "yellow", "green"], setCurrentColor], "size": props.Size ? props.Size : "3", "trigger": props.Trigger, "style": props.Type =="symbols" ? props.Style ? props.Style : "circles" : "squares"} //set to null when other components are created

    const types = {"bar": <Bar base_states={base_states}/>, "meter": <Meter base_states={base_states}/>, "pie": <Pie base_states={base_states}/>, "symbols": <Symbols base_states={base_states}/>}



    useEffect(() => {
        !props.CurrentColor ? setCurrentColor(global_functions["is_color"](props.Color ? props.Color : ["red", "yellow", "green"])) : null
    }, [props.CurrentColor])



    function get_type(){
        if(!check_trigger()){
            return <div className="mt-48 text-2xl">'Trigger' prop is not passed correctly. Ensure it is a set of state variables [variable, setVariable]. See README file for further details.</div>
        }
        if(types[props.Type]){
            return types[props.Type]
        }else{
            return types["symbols"]
            // return types["bar"]
        }
    }



    function check_trigger(){
        if(!props.Trigger || props.Trigger.length != 2){ //need to check if each is a proper state variable
            return false
        }
        return true
    }



  return(
    <div className="grid place-items-center">
        {get_type()}
    </div>
  )
}


