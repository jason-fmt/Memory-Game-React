import { useEffect, useRef } from "react"
import RegularButton from "./RegularButton"

const GameOver = ({ handleClick }) => {
   const cardRef = useRef(null)

   useEffect(() => {
      cardRef.current.focus()
   }, [])

   return (
      <div className="wrapper wrapper--accent" ref={cardRef} tabIndex={-1}>
         <p className="p--large">
            You've mathced all the memory cards!
         </p>
         <RegularButton handleClick={handleClick}>
            Play  Again
         </RegularButton>
      </div>
   )
}

export default GameOver
