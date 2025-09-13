import { useState } from 'react'
import './App.css'
import SearchBar from './searchbar';
function App() {
  const [results, setResults] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const handleSearch = async (searchTerm) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(`http://localhost:5000/api/search?song=${encodeURIComponent(searchTerm)}`);
      if(!response.ok){
        throw new Error('No result found');
      }
      const data = await response.json();
      setResults(data);
      setIsLoading(false);
    }
      catch(error){
        setError(error.message)
        setIsLoading(false)
      }
      
  };

  
  return(
    <div>
    <SearchBar onSearch={handleSearch}/>
    {isLoading && <p>Loading...</p>}
    {error && <p>{error}</p>}
    {results.title && (
      <div className="font-luckiest text-[35px] flex flex-col items-center justify-center text-pink-300">
        <h2 className='mt-10'>{results.title}</h2>
        <h3>{results.artist}</h3>
        <img src={results.image} alt={`Album cover for ${results.title}`}/>
        {results.url && (
            <p>
              <a href={results.url} target="_blank" rel="noopener noreferrer" className='px-6 py-3 rounded-lg inline-block transition bg-blue-500 text-black'>
                View Lyrics on Genius
              </a>
            </p>
          )}
      </div>
    )}
    </div>

  )
}

export default App
