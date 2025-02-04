import RegularButton from "./RegularButton"

const QuitButton = ({ handleQuit }) => {
  return (
   <RegularButton 
      handleClick={handleQuit}
   >
      Quit game
   </RegularButton>    
  )
}

export default QuitButton
