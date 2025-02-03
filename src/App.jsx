import { useEffect, useState } from 'react'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'
import GameOver from './components/GameOver'
import ErrorCard from './components/ErrorCard'

const App = () => {
   const initialFormData = { category: 'animals-and-nature', number: 10 }

	const [isGameOn, setIsGameOn] = useState(false)
   const [emojisData, setEmojisData] = useState([])
   const [selectedCards, setSelectedCards] = useState([])
   const [matchedCards, setMatchedCards] = useState([])
   const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)
   const [isError, setIsError] = useState(false)
   const [formData, setFormData] = useState(() => initialFormData)

   // console.log(isError)

   useEffect(() => {
      if(selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
         setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
      }
   }, [selectedCards])

   useEffect(() => {
      if(emojisData.length && emojisData.length === matchedCards.length) {
         setAreAllCardsMatched(true)
      }
   }, [matchedCards])

	async function startGame(e) {
      e.preventDefault() // Prevents auto refresh
      
      try {
         // throw new Error('Error in try block.')
         const response = await fetch(`https://emojihub.yurace.pro/api/all/category/${formData.category}`)
         
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
         setIsError(true)
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
      for(let i = 0; i < formData.number / 2; i++) {
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

   function resetGame() {
      setIsGameOn(false)
      setSelectedCards([])
      setMatchedCards([])
      setAreAllCardsMatched(false)
   }

   function resetError() {
      setIsError(false)
   }

	return (
		<main>
			<h1>Memory</h1>
			{!isError && !isGameOn && <Form handleSubmit={startGame} />}
         {areAllCardsMatched && <GameOver handleClick={resetGame}/>}
			{isGameOn && <MemoryCard 
            data={emojisData} 
            handleClick={turnCard} 
            selectedCards={selectedCards}
            matchedCards={matchedCards}
         />}
         {isError && <ErrorCard handleClick={resetError}/>}
		</main>
	)
}

export default App
