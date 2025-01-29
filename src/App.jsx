import { useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

const App = () => {
	const [isGameOn, setIsGameOn] = useState(false)

	function startGame(e) {
		e.preventDefault() // Prevents auto refresh
		setIsGameOn(true)
	}
   
	function turnCard() {
      console.log('Card clicked')
   }

	return (
		<main>
			<h1>Memory</h1>
			{!isGameOn && <Form handleSubmit={startGame} />}
			{isGameOn && <MemoryCard handleClick={turnCard} />}
		</main>
	)
}

export default App
