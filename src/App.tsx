import axios from 'axios'
import { PokemonCollection } from 'components'
import { Detail, Pokemon, PokemonList } from 'models'
import { useEffect, useState } from 'react'
import './App.css'

const App: React.FC = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [nextURL, setNextURL] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [viewDetail, setViewDetail] = useState<Detail>({
    id: 0,
    isOpened: false
  })

  useEffect(() => {
    const getPokemonList = async () => {
      const res = await axios.get('https://pokeapi.co/api/v2/pokemon?offset=20&limit=20')
      setNextURL(res.data.next)

      res.data.results.forEach(async (pokemon: PokemonList) => {
        const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
        setPokemonList((prev) => [...prev, poke.data])
        setLoading(false)
      })
    }
    getPokemonList()
  }, [])

  const handleLoadMore = async () => {
    const res = await axios.get(nextURL)

    setNextURL(res.data.next)
    res.data.results.forEach(async (pokemon: PokemonList) => {
      const poke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`)
      setPokemonList((prev) => [...prev, poke.data])
      setLoading(false)
    })
  }
  return (
    <div className="App">
      <div className="container">
        <header className="pokemon-header">Pokemon</header>
        <PokemonCollection pokemonList={pokemonList} viewDetail={viewDetail} setViewDetail={setViewDetail} />
        {!viewDetail.isOpened && (
          <div className="btn">
            <button onClick={handleLoadMore}>{loading ? 'Loading...' : 'Load more'}</button>
          </div>
        )}
      </div>
    </div>
  )
}

export default App
