import { decodeEntity } from "html-entities"

// handleClick function prop is passed down from App.jsx

const MemoryCard = ({ data, handleClick }) => {
   // Stores list of buttons containing an emoji from the emojiArray
	const emojiElements = data.map((emojiObj, index) => (
		<li key={index} className='card-item'>
			<button 
            className='btn btn--emoji' 
            onClick={() => handleClick(emojiObj.name, index)}
         >
				{decodeEntity(emojiObj.htmlCode[0])}
			</button>
		</li>
	))

   // Return an unordered list of buttons
	return (
      <ul className="card-container">
         {emojiElements}
      </ul>
   )
}

export default MemoryCard
