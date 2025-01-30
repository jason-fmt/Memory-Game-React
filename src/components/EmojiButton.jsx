const EmojiButton = ({ content, handleClick, isSelected, isMatched }) => {
	const btnContent = isSelected || isMatched ? content : '?'

	const btnStyle = 
		isMatched ? 'btn--emoji__back--matched' : 
		isSelected ? 'btn--emoji__back--selected': 
		'btn--emoji__front'


	return (
		<button
			className={`btn btn--emoji ${btnStyle}`}
			onClick={isSelected ? null : handleClick}
			disabled={isMatched}
		>
			{btnContent}
		</button>
	)
}

export default EmojiButton
