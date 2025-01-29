
// handleClick function prop is passed down from App.jsx

const MemoryCard = ({ handleClick }) => {
	const emojiArray = ['🐶','🐷','🐙','🐛','🐵','🐶','🐷','🐙','🐛','🐵']

   // Stores list of buttons containing an emoji from the emojiArray
	const emojiElements = emojiArray.map((emoji, index) => (
		<li key={index} className='card-item'>
			<button 
            className='btn btn--emoji' 
            onClick={handleClick}
         >
				{emoji}
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
