import PokemonItem from 'components/PokemonItem'
import { Detail, PokemonDetail } from 'models'
import '../index.css'

interface Props {
  pokemonList: PokemonDetail[]
  viewDetail: Detail
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonCollection: React.FC<Props> = ({ pokemonList, viewDetail, setViewDetail }) => {
  const selectPokemon = (id: number) => {
    if (!viewDetail.isOpened) {
      setViewDetail({
        id,
        isOpened: true
      })
    }
  }

  return (
    <div className={viewDetail.isOpened ? 'collection-container-active' : 'collection-container'}>
      {viewDetail.isOpened ? <div className="overlay" /> : <div className="" />}
      {pokemonList.map((pokemon) => (
        <PokemonItem
          key={pokemon.id}
          name={pokemon.name}
          id={pokemon.id}
          abilities={pokemon.abilities}
          image={pokemon.sprites.front_default}
          onSelect={selectPokemon}
          viewDetail={viewDetail}
          setViewDetail={setViewDetail}
        />
      ))}
    </div>
  )
}

export default PokemonCollection
