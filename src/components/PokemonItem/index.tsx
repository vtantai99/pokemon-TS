import { Detail } from 'models'
import { useEffect, useState } from 'react'
import '../index.css'

interface Props {
  name: string
  id: number
  image: string
  abilities:
    | {
        name: string
        ability: string
      }[]
    | undefined
  onSelect: (id: number) => void
  viewDetail: Detail
  setViewDetail: React.Dispatch<React.SetStateAction<Detail>>
}

const PokemonItem: React.FC<Props> = ({
  name,
  id,
  image,
  abilities,
  onSelect,
  viewDetail,
  setViewDetail
}) => {
  const [isSelected, setIsSelected] = useState<boolean>(false)

  useEffect(() => {
    setIsSelected(viewDetail.id === id)
  }, [viewDetail])

  const closeDetail = () => {
    setViewDetail({
      id: 0,
      isOpened: false
    })
  }

  return (
    <div onClick={() => onSelect(id)}>
      {isSelected ? (
        <section className="pokemon-list-detailed">
          <div className="detail-container">
            <p className="detail-close" onClick={closeDetail}>
              X
            </p>
            <div className="detail-info">
              <img src={image} alt="pokemon" className="detail-img" />
              <p className="detail-name"> {name}</p>
            </div>
            <div className="detail-skill">
              <p className="detail-ability"> Ablities: </p>
              {abilities?.map((ab: any) => {
                return <div className=""> {ab.ability.name}</div>
              })}
            </div>
          </div>
        </section>
      ) : (
        <section className="pokemon-list-container">
          <p className="pokemon-name"> {name} </p>
          <img src={image} alt="pokemon" />
        </section>
      )}
    </div>
  )
}

export default PokemonItem
