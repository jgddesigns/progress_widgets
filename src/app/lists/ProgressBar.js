'use client'
import React, {useEffect} from 'react';
import {global_functions} from '../helpers/functions'
import "../helpers/symbols.css"
import Symbols from '../styles/Symbols'
import Bar from '../styles/Bar';
import Meter from '../styles/Meter';
import Pie from '../styles/Pie';

// Creates the display for the progress bar
// Needs props LengthValue, Type, Trigger, Color, Size
export default function ProgressBar (props) {
    const [Restart, setRestart] = React.useState(false)
    const [CurrentPosition, setCurrentPosition] = React.useState(props.LengthValue)
    const [CurrentColor, setCurrentColor] = React.useState(null) 

    const base_states = {"restart": [Restart, setRestart], "current_position": [CurrentPosition, setCurrentPosition], "length_value": [props.LengthValue, props.setLengthValue], "current_color": [CurrentColor, setCurrentColor], "trigger": props.Trigger, "style": props.Style}

    const types = {"symbols": <Symbols base_states={base_states}/>, "bar": <Bar base_states={base_states}/>, "meter": <Meter base_states={base_states}/>, "pie": <Pie base_states={base_states}/>}


    useEffect(() => {
        !props.CurrentColor ? setCurrentColor(global_functions["is_color"](props.Color)) : null
    }, [props.CurrentColor])

    function get_type(){
        if(types[props.Type]){
            return types[props.Type]
        }
        return <div className="mt-[150px]"> "Invalid 'Type' prop passed. Pass a valid 'Type' prop identified in the README file." </div>
    }


  return(
    <div className="grid place-items-center">
        {get_type()}
    </div>
  )
}


