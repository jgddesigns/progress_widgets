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
    const [CurrentPosition, setCurrentPosition] = React.useState(props.Type ? props.Type.toLowerCase() == "bar" || props.Type.toLowerCase() == "meter" ? 100 : props.Type.toLowerCase() == "pie" ? 1 : props.LengthValue ?  props.LengthValue : 10 : 10)
    const [CurrentColor, setCurrentColor] = React.useState(null) 


    const base_states = {"title": props.Title ? props.Title : "", "restart": [Restart, setRestart], "current_position": [CurrentPosition, setCurrentPosition], "length_value": [props.Type ? props.Type.toLowerCase() == "bar" || props.Type.toLowerCase() == "meter" ? 100 : props.Type.toLowerCase() == "pie" ? 1 : props.LengthValue ?  props.LengthValue : 10 : 10], "current_color": [CurrentColor ? CurrentColor : ["red", "yellow", "green"], setCurrentColor], "size": props.Size ? props.Size : "3", "trigger": props.Trigger, "trigger_amount": props.TriggerAmount, "style": props.Type =="symbols" ? props.Style ? props.Style.toLowerCase() : "circles" : "squares"} 

    const types = {"bar": <Bar base_states={base_states}/>, "meter": <Meter base_states={base_states}/>, "pie": <Pie base_states={base_states}/>, "symbols": <Symbols base_states={base_states}/>}


    useEffect(() => {
        !props.CurrentColor ? setCurrentColor(global_functions["is_color"](props.Color ? props.Color : ["red", "orange", "yellow", "lime", "green"])) : null
    }, [props.CurrentColor])



    function get_type(){
        let check = check_trigger()
        if(check){
            return <div className="mt-48 text-2xl">{check[1]} prop is not passed correctly. Ensure it is a set of state variables [variable, setVariable]. See README file for further details.</div>
        }
        if(types[props.Type ? props.Type.toLowerCase() : null]){
            return types[props.Type ? props.Type.toLowerCase() : null]
        }else{
            return types["bar"]
        }
    }


    function check_trigger(){
        let check_str = ""
        if(!props.Trigger || props.Trigger.length != 2){ 
            check_str = "Trigger"
        }
        if(!props.TriggerAmount || props.TriggerAmount.length != 2){ 
            check_str = check_str + "TriggerAmount"
        }
        if(check_str.length > 0){
            return check_str
        }
        return false
    }




  return(
    <div className="grid grid-auto-rows place-items-center gap-24">
        <div className="mt-12">
            {get_type()}
        </div>
    </div>
  )
}