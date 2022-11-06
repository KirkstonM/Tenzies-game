import { nanoid } from 'nanoid';
import React from 'react';
import Dice from './components/Dice';
import Confetti from 'react-confetti';
import {Container} from 'react-bootstrap';

function App() {

  const [dice, setDice] = React.useState(newDice())
  const[tenzies, setTenzies] = React.useState(false)

React.useEffect(() => {
  const allHeld = dice.every(die => die.isHeld)
  const firstValue = dice[0].value
  const allSameValue = dice.every(die => die.value === firstValue)
  if (allHeld && allSameValue){
    setTenzies(true)
  }

},[dice])

// CREATING A NEW ARRAY/DICE
  function newDice(){
    const arr = []
    for (let i=0; i<10; i++){
      arr.push({
        value : Math.ceil(Math.random() * 6),
        id : nanoid(),
        isHeld : false
      })
    }
    return arr
  }
 
  // MAPPING AND RETURNING DIE VALUE
  let diceElements = dice.map(die => {
    return <Dice
          value={die.value}
          id={die.id}
          isHeld={die.isHeld}
          toggle={holdDice}
    />
  })

  //Roll button function to roll a new dice
  function rollDice(){
    if (!tenzies){
      setDice(prevState => prevState.map(obj => {
        return obj.isHeld ? 
        obj: 
        {value : Math.ceil(Math.random() * 6),
          id : nanoid(),
          isHeld : false}
      }))

    }else {
      setDice(newDice())
      setTenzies(false)
    }
    
  }

 function holdDice(id){
 setDice(prevDice => prevDice.map(die =>{
  return die.id === id ?
  {...die, isHeld: !die.isHeld} :
  die
 }))
 }
  
  return (
    <Container>
<main>
  
  {tenzies && <Confetti/>}
  <h1> {tenzies? 'YOU WON!!' : 'TENZIES'} </h1>
 <p>{tenzies ? "Roll new game to play again" : "Roll the dice till all numbers are equal"}</p> 
  <p>  </p>
    <div  className='dice-container'>
      {diceElements}
    </div>
    <button type='button' className='btn btn-warning px-5 py-2 mt-5' onClick={rollDice}>
      {tenzies ? "Roll New Game" : 'Roll'}  </button>
      
</main>
</Container>


  )
}

export default App;
