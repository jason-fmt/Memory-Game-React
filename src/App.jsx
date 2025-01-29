import { useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

const App = () => {
	const [isGameOn, setIsGameOn] = useState(false)
   const [emojisData, setEmojisData] = useState([])

	async function startGame(e) {
		e.preventDefault() // Prevents auto refresh

      try {
         const response = await fetch(`https://emojihub.yurace.pro/api/all/category/animals-and-nature`)

         if(!response.ok) {
            throw new Error('Could not fetch data from API')
         }

         const data = await response.json()
         const dataSample = data.slice(0, 5)
         
         setEmojisData(dataSample)
         setIsGameOn(true)
      } catch (err) {
         console.error(err)
      }
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
