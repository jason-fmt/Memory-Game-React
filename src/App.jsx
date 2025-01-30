import { useEffect, useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'

const App = () => {
	const [isGameOn, setIsGameOn] = useState(false)
   const [emojisData, setEmojisData] = useState([])
   const [selectedCards, setSelectedCards] = useState([])
   const [matchedCards, setMatchedCards] = useState([])
   const [isGameOver, setIsGameOver] = useState(false)

   useEffect(() => {
      if(selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
         setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
      }
   }, [selectedCards])

   useEffect(() => {
      if(emojisData.length && emojisData.length === matchedCards.length) {
         setIsGameOver(true)
      }
   }, [matchedCards])

	async function startGame(e) {
      e.preventDefault() // Prevents auto refresh
      
      try {
         const response = await fetch(`https://emojihub.yurace.pro/api/all/category/animals-and-nature`)
         
         if(!response.ok) {
            throw new Error('Could not fetch data from API')
         }
         
         const data = await response.json()
         const dataSlice = getDataSlice(data)
         const emojisArray = getEmojisArray(dataSlice)
         
         setEmojisData(emojisArray)
         setIsGameOn(true)
      } catch (err) {
         console.error(err)
      }
	}

   function getDataSlice(data) {
      const randomIndices = getRandomIndices(data)
      // Map over array of random numbers
      // Create an array containing an emoji object at that random number index
      const dataSlice = randomIndices.map(index => data[index])

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

   function getEmojisArray(data) {
      const pairedEmojisArray = [...data, ...data]

      for(let i = pairedEmojisArray.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1))
         const temp = pairedEmojisArray[i]
         pairedEmojisArray[i] = pairedEmojisArray[j]
         pairedEmojisArray[j] = temp
       }

      // Return an array containing each element twice
      return pairedEmojisArray
   }

	function turnCard(name, index) {
      if(selectedCards.length < 2) {
         setSelectedCards(prevSelectedCards => ([
            ...prevSelectedCards,
            { name, index }
         ]))
      } else if(selectedCards.length === 2){
         setSelectedCards([{ name, index }])
      }
   }

	return (
		<main>
			<h1>Memory</h1>
			{!isGameOn && <Form handleSubmit={startGame} />}
			{isGameOn && <MemoryCard 
            data={emojisData} 
            handleClick={turnCard} 
            selectedCards={selectedCards}
            matchedCards={matchedCards}
         />}
		</main>
	)
}

export default App
