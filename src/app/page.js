'use client'
import React, {useEffect} from 'react';
import {global_functions} from './helpers/functions'
import './ProgressBars.module.css';
import Bar from './styles/Bar';
import Meter from './styles/Meter';
import Pie from './styles/Pie';
import Symbols from './styles/Symbols'




export default function ProgressBars (props) {
    const [Restart, setRestart] = React.useState(false)
    const [CurrentPosition, setCurrentPosition] = React.useState(props.Type == "bar" || props.Type == "meter" ? 100 : props.Type == "pie" ? 1 : props.LengthValue ?  props.LengthValue : 10)
    const [CurrentColor, setCurrentColor] = React.useState(null) 


    const base_states = {"restart": [Restart, setRestart], "current_position": [CurrentPosition, setCurrentPosition], "length_value": [props.Type == "bar" || props.Type == "meter" ? 100 : props.Type == "pie" ? 1 : props.LengthValue ?  props.LengthValue : 10], "current_color": [CurrentColor ? CurrentColor : ["red", "yellow", "green"], setCurrentColor], "size": props.Size ? props.Size : "3", "trigger": props.Trigger, "trigger_amount": props.TriggerAmount, "style": props.Type =="symbols" ? props.Style ? props.Style : "circles" : "squares"} 

    const types = {"bar": <Bar base_states={base_states}/>, "meter": <Meter base_states={base_states}/>, "pie": <Pie base_states={base_states}/>, "symbols": <Symbols base_states={base_states}/>}


    useEffect(() => {
        !props.CurrentColor ? setCurrentColor(global_functions["is_color"](props.Color ? props.Color : ["red", "orange", "yellow", "lime", "green"])) : null
    }, [props.CurrentColor])



    function get_type(){
        if(!check_trigger()){
            return <div className="mt-48 text-2xl">'Trigger' prop is not passed correctly. Ensure it is a set of state variables [variable, setVariable]. See README file for further details.</div>
        }
        if(types[props.Type]){
            return types[props.Type]
        }else{
            return types["bar"]
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