import {Component} from 'react'
import Loader from 'react-loader-spinner'

import NavBar from '../NavBar/index'
import MovieCastCard from '../MovieCastCard'

import './index.css'

class MovieCardDetails extends Component {
  state = {
    singleMovieDetails: {},
    isLoading: true,
    movieCastDetails: [],
  }

  componentDidMount() {
    this.getMovieAndCastDetails()
  }

  getUpdatedMovieDetails = data => ({
    movieName: data.title,
    releaseDate: data.release_data,
    imageUrl: `https://image.tmdb.org/t/p/w500${data.poster_path}`,
    duration: data.runtime,
    ratings: data.vote_average,
  })

  getMovieAndCastDetails = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    const API_KEY = 'af67eb3f15370becc35878ae6318b9bc'
    const apiUrl1 = `https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}&language=en-US`
    const apiUrl2 = `https://api.themoviedb.org/3/movie/${id}/credits?api_key=${API_KEY}&language=en-US`

    const response1 = await fetch(apiUrl1)
    const data1 = await response1.json()

    const response2 = await fetch(apiUrl2)
    const data2 = await response2.json()

    const movieData = this.getUpdatedMovieDetails(data1)

    const castData = data2.cast.map(eachData => ({
      profileImg: `https://image.tmdb.org/t/p/w500${eachData.profile_path}`,
      name: eachData.original_name,
      characterName: eachData.character,
      id: eachData.id,
    }))

    this.setState({
      singleMovieDetails: movieData,
      isLoading: false,
      movieCastDetails: castData,
    })
  }

  renderLoadingView = () => (
    <div className="loader-container">
      <Loader type="TailSpin" color="#032541" />
    </div>
  )

  renderPageView = () => {
    const {singleMovieDetails, movieCastDetails} = this.state
    const {
      movieName,
      releaseDate,
      imageUrl,
      duration,
      ratings,
    } = singleMovieDetails

    return (
      <div className="main-back-ground">
        <NavBar />
        <div className="d-flex align-items-center justify-content-center">
          <img src={imageUrl} alt={movieName} className="single-image-size" />
          <div className="d-flex justify-content-center-align-items-center flex-column ml-5 mt-5">
            <h1 className="text-head">Movie: {movieName}</h1>
            <p className="text">duration: {duration}</p>
            <p className="text">release on: {releaseDate}</p>
            <p className="text">ratings: {ratings}</p>
          </div>
        </div>
        <ul className="row p-0 ms-0 me-0 mt-3">
          {movieCastDetails.map(eachCast => (
            <MovieCastCard castData={eachCast} key={eachCast.id} />
          ))}
        </ul>
      </div>
    )
  }

  render() {
    const {isLoading} = this.setState
    return <>{isLoading ? this.renderLoadingView() : this.renderPageView()}</>
  }
}

export default MovieCardDetails
