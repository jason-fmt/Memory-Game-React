import RegularButton from './RegularButton'

const Form = ({ handleSubmit }) => {
	return (
		<form className='wrapper'>
			<RegularButton handleClick={handleSubmit}>
            Start Game
         </RegularButton>
		</form>
	)
}

export default Form
