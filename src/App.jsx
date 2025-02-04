import { useEffect, useState } from 'react'
import { useWindowSize } from 'react-use'
import Confetti from 'react-confetti'
import Form from './components/Form'
import MemoryCard from './components/MemoryCard'
import GameOver from './components/GameOver'
import ErrorCard from './components/ErrorCard'
import QuitButton from './components/QuitButton'

const App = () => {
   const initialFormData = { category: 'animals-and-nature', number: 10 }
   
   const { width, height } = useWindowSize() 

	const [isGameOn, setIsGameOn] = useState(false)
   const [emojisData, setEmojisData] = useState([])
   const [selectedCards, setSelectedCards] = useState([])
   const [matchedCards, setMatchedCards] = useState([])
   const [areAllCardsMatched, setAreAllCardsMatched] = useState(false)
   const [isError, setIsError] = useState(false)
   const [formData, setFormData] = useState(() => initialFormData)
   const [isFirstRender, setIsFirstRender] = useState(true)

   // Every time 2 cards are selected, determine whether they're a match and update state
   useEffect(() => {
      if(selectedCards.length === 2 && selectedCards[0].name === selectedCards[1].name) {
         setMatchedCards(prevMatchedCards => [...prevMatchedCards, ...selectedCards])
      }
   }, [selectedCards])

   // Every time we have a match, determine whether all cards have been matched and update state 
   useEffect(() => {
      if(emojisData.length && emojisData.length === matchedCards.length) {
         setAreAllCardsMatched(true)
      }
   }, [matchedCards])

   // Update state based on values choosen in form
   function handleFormChange(e) {
      setFormData((prevFormData) => ({
         ...prevFormData,
         [e.target.name]: e.target.value
      }))
   }

	async function startGame(e) {
      e.preventDefault() // Prevents auto refresh
      
      try {
         // Fetch data from API
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
      } finally {
         setIsFirstRender(false)
      }
	}

   // Get an X amount of random indexed emoji objects from data
   // X is taken from user form selection 
   function getDataSlice(data) {
      const randomIndices = getRandomIndices(data)
      const dataSlice = randomIndices.map(index => data[index])

      return dataSlice
   }
   
   // Returns an array of length num/2 containing random indices 
   // num is retrieved from form
   function getRandomIndices(data) {
      const randomIndicesArray = []

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

   // Duplicate the data, so all unique cards have a card to match with
   function getEmojisArray(data) {
      const pairedEmojisArray = [...data, ...data]

      for(let i = pairedEmojisArray.length - 1; i > 0; i--) {
         const j = Math.floor(Math.random() * (i + 1))
         const temp = pairedEmojisArray[i]
         pairedEmojisArray[i] = pairedEmojisArray[j]
         pairedEmojisArray[j] = temp
       }

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
			{!isError && !isGameOn && 
            <Form 
               handleSubmit={startGame} 
               handleChange={handleFormChange} 
               isFirstRender={isFirstRender}
            />
         }
         {areAllCardsMatched && <Confetti width={width} height={height} />}
         {areAllCardsMatched && <GameOver handleClick={resetGame}/>}
			{isGameOn && <MemoryCard 
            data={emojisData} 
            handleClick={turnCard} 
            selectedCards={selectedCards}
            matchedCards={matchedCards}
         />}
         {isGameOn && !areAllCardsMatched && <QuitButton handleQuit={resetGame} />}
         {isError && <ErrorCard handleClick={resetError}/>}
		</main>
	)
}

export default App
