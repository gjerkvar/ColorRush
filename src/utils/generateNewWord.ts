// generateNewWord.ts
type WordOption = {
    text: string;
    color: string;
  };
  
  const colors = [
    { text: 'Red', color: 'red' },
    { text: 'Blue', color: 'blue' },
    { text: 'Green', color: 'green' },
    { text: 'Yellow', color: 'yellow' }
  ];
  
  // Modify this function to always give a mismatched color.
  const generateNewWord = () => {
    const word = colors[Math.floor(Math.random() * colors.length)];
    
    // Pick a random color that is different from the word's meaning.
    let colorOptions = [...colors].filter(c => c.text !== word.text);
    const displayedColor = colorOptions[Math.floor(Math.random() * colorOptions.length)].color;
    
    // Return the word with a mismatched color and the shuffled color options.
    return { word: { ...word, color: displayedColor }, colorOptions: [...colors].sort(() => Math.random() - 0.5) };
  };
  
  export default generateNewWord;
  
  