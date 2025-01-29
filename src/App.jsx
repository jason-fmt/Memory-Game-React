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
         const dataSlice = getDataSlice(data)
         
         setEmojisData(dataSlice)
         setIsGameOn(true)
      } catch (err) {
         console.error(err)
      }
	}

   function getDataSlice(data) {
      const randomIndices = getRandomIndices(data)
      const dataSlice = randomIndices.map(num => data[num])
      return dataSlice
   }
   
   function getRandomIndices(data) {
      const randomIndicesArray = []

      // Generate 5 UNIQUE numbers
      for(let i = 0; i < 5; i++) {
         const randomNum = Math.floor(Math.random() * data.length)

         // If the number is NOT in the array, add it 
         if (!randomIndicesArray.includes(randomNum)) {
            randomIndicesArray.push(randomNum)
         } else {
            // If the number was already in the array
            // Make sure there are still 5 elements in the array
            i--
         }
      }

      return randomIndicesArray
   }

	function turnCard() {
      console.log('Card clicked')
   }

	return (
		<main>
			<h1>Memory</h1>
			{!isGameOn && <Form handleSubmit={startGame} />}
			{isGameOn && <MemoryCard data={emojisData} handleClick={turnCard} />}
		</main>
	)
}

export default App
