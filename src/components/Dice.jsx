import React from 'react';
import '../index.css'
import { nanoid } from 'nanoid';
import { Toggle2Off } from 'react-bootstrap-icons';

export default function Dice(props){

    let styles = {
        backgroundColor : props.isHeld ? "grey" : 'black',
    }
    return (
        <div className='dice'
            style={styles}
            onClick={() => props.toggle(props.id)}
            >

            <h2 className='dice-value'> {props.value} </h2>
        </div>
    )
}