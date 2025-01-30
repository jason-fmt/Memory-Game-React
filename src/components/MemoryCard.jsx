import { decodeEntity } from "html-entities"
import EmojiButton from "./EmojiButton"

// handleClick function prop is passed down from App.jsx

const MemoryCard = ({ data, handleClick, selectedCards, matchedCards }) => {
   // Stores list of buttons containing an emoji from the emojiArray
	const cardElements = data.map((emojiObj, index) => {

      return (
		   <li key={index} className='card-item'>
			   <EmojiButton 
               content={decodeEntity(emojiObj.htmlCode[0])}
               style={'btn btn--emoji'}
               handleClick={() => handleClick(emojiObj.name, index)}
            />
		   </li>
	   )
   })

   // Return an unordered list of buttons
	return (
      <ul className="card-container">
         {cardElements}
      </ul>
   )
}

export default MemoryCard
