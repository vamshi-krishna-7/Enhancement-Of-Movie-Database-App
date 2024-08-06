import './index.css'

const MovieCastCard = props => {
  const {castData} = props
  const {profileImg, name, characterName} = castData

  return (
    <li className="movie-card-container col-12 col-sm-6 col-lg-2 mb-3 d-flex flex-column">
      <img src={profileImg} alt={name} className="movie-card-image" />
      <div className="d-flex flex-column align-items-center mt-2">
        <p className="origin-name m-0">
          <span className="name">Name:</span> {name}
        </p>
        <p className="char-name mb-0 ms-1">
          <span className="character">character:</span> {characterName}
        </p>
      </div>
    </li>
  )
}

export default MovieCastCard
