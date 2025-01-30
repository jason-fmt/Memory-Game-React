const EmojiButton = ({ content, style, handleClick }) => {
	return (
		<button
			className={style}
			onClick={handleClick}
		>
			{content}
		</button>
	)
}

export default EmojiButton
