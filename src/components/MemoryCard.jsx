import { decodeEntity } from "html-entities"
import EmojiButton from "./EmojiButton"

// handleClick function prop is passed down from App.jsx

const MemoryCard = ({ data, handleClick, selectedCards, matchedCards }) => {
   // Stores list of buttons containing an emoji from the emojiArray
	const cardElements = data.map((emojiObj, index) => {
      const selectedCardEntry = selectedCards.find(emoji => emoji.index === index)
      const matchedCardEntry = matchedCards.find(emoji => emoji.index === index)

      let cardStyle = ''
      if(selectedCardEntry) cardStyle = 'card-item--selected'
      if(matchedCardEntry) cardStyle = 'card-item--matched'
      
      return (
		   <li key={index} className={`card-item ${cardStyle}`}>
			   <EmojiButton 
               content={decodeEntity(emojiObj.htmlCode[0])}
               handleClick={() => handleClick(emojiObj.name, index)}
               isSelected={selectedCardEntry}
               isMatched={matchedCardEntry}
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
