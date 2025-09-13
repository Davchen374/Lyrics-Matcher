import { useState, useEffect } from 'react';


function SearchBar({onSearch}){
  const [input, setInput] = useState('');
  const [recentSearches, setRecentSearches] = useState([]);
  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('recentSearches')) || [];
    setRecentSearches(saved);

  }, []);
  const handleSearch = () => {
    localStorage.setItem('recentSearches', JSON.stringify(recentSearches));
    if(input !== '')
    {
      const newArray = [input, ...recentSearches.filter(item => item !== input)].slice(0,5);
      setRecentSearches(newArray);
      localStorage.setItem('recentSearches', JSON.stringify(newArray));
      onSearch(input);
      setInput('');
    
    }
    else{
      alert('Error');
    }
  

  }

  return(
    <div className='bg-black text-white flex flex-col items-center justify-center'>
      <h1 className='font-luckiest text-[50px] mt-40'>Lyrics Matcher</h1>
      <br/>
      <p className='font-luckiest text-[50px] mb-2 italic text-blue-500' >Input songs/music to find its lyrics<br/>using Genius API</p>
  

      <input type='text' value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSearch()} className='font-luckiest text-black text-[25px] mt-5 rounded-lg border border-gray-500'/>
      <button className='font-luckiest mt-2 text-[30px] inline-block transition bg-yellow-500 px-6 py-3 rounded-lg text-black ' onClick={handleSearch}>Enter</button>
      {recentSearches.length > 0 && (
        <div className='font-luckiest text-[30px] text-pink-300'>
          <p>Recent Searches</p>
          <ul>
            {recentSearches.map((item,index) => (
              <li key={index}
                className="cursor-pointer hover:text-blue-600"
                onClick={() => setInput(item)}>
                {item}
              
              </li>
            ))}
          </ul>


        </div>
      )}
    
    </div>
  )

}

export default SearchBar;