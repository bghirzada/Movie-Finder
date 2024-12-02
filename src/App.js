import { useEffect, useState } from 'react';
import './App.css';
import Movies from './components/Movies';
import Searching from './components/Searching';

function App() {
  const [inputValue, setInputValue] = useState('avatar')
  const [loading, setLoading] = useState(false)
  const [movies, setMovies] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      if (!inputValue.trim()) return; //input bos olduqda islemesin helelik
      try {
        setLoading(true)
        const res = await fetch(`https://omdbapi.com/?apikey=fc1fef96&s=${inputValue}`)
        const data = await res.json()
        setMovies(data.Search || [])

        console.log(data);


      } catch (err) {
        console.log(err);

      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [inputValue])



  return (
    <div className='min-h-screen  w-full bg-slate-800 p-24 flex flex-col items-center gap-8'>
      <div className='text-5xl text-white'>Movie Finder</div>
      <Searching setInputValue={setInputValue} />
      <Movies movies={movies} />
      {loading && <div>Loading...</div>}
    </div>
  );
}

export default App;
