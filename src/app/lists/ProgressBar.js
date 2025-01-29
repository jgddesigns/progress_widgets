'use client'
import React, {useEffect} from 'react';
import "../helpers/shapes.css"
import Circles from '../styles/Circles'
import Bar from '../styles/Bar';

// Creates the display for the progress bar
// Needs props LengthValue, Type, Trigger, Color, Size
export default function ProgressBar (props) {
    const [Restart, setRestart] = React.useState(false)
    const [CurrentPosition, setCurrentPosition] = React.useState(props.LengthValue) 
    const [CurrentColor, setCurrentColor] = React.useState(props.Color) 

    const base_states = {"restart": [Restart, setRestart], "current_position": [CurrentPosition, setCurrentPosition], "length_value": [props.LengthValue, props.setLengthValue], "trigger": props.Trigger, "current_color": [CurrentColor, setCurrentColor]}

    const types = {"circles": <Circles base_states={base_states}/>, "bar": <Bar base_states={base_states}/>}


    function get_type(){
        if(types[props.Type]){
            return types[props.Type]
        }
        return <div className="mt-[150px]"> "Invalid 'Type' prop passed. Pass a valid 'Type' prop identified in the README file." </div>
    }


  return(
    <div className="grid place-items-center">
        {get_type()}
        {/* <Circles base_states={base_states}/> */}
    </div>
  )
}


