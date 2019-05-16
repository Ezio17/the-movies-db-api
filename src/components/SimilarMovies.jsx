import React from 'react';
import { connect } from 'react-redux';
import StarRatings from 'react-star-ratings';
import { Link } from 'react-router-dom';

class SimilarMovies extends React.Component {
  constructor(props) {
    super(props);

    this.getId = this.getId.bind(this);
  }

  componentDidMount() {
    fetch(
      `https://api.themoviedb.org/3/movie/${
        this.props.id
      }/similar?api_key=29574201b32259e0b6282b3bb21eb28c&language=en-US&page=1`
    )
      .then(response => response.json())
      .then(moviesFromServer => this.props.setMovies(moviesFromServer));
  }

  componentWillUpdate(prevProps) {
    if (prevProps.id !== this.props.id) {
      fetch(
        `https://api.themoviedb.org/3/movie/${
          prevProps.id
        }/similar?api_key=29574201b32259e0b6282b3bb21eb28c&language=en-US&page=1`
      )
        .then(response => response.json())
        .then(moviesFromServer => this.props.setMovies(moviesFromServer));

      return;
    }

    return;
  }

  getId(id) {
    this.props.setId(id);
  }

  render() {
    const { movies } = this.props;
    const baseUrlForImage = 'http://image.tmdb.org/t/p/w185';
    return (
      <main>
        {movies.results === undefined ? (
          <h1 className="loading">Loading...</h1>
        ) : (
          <div>
            <Link to={'/'}>
              <p className="home">Home</p>
            </Link>
            <div className="movies-block">
              {movies.results.map(movie => (
                <Link to={`/similar-movies_${movie.id}`} key={movie.id}>
                  <section
                    className="movie-block"
                    key={movie.id}
                    onClick={() => this.getId(`${movie.id}`)}
                  >
                    <h3 className="movie__title">{movie.title}</h3>
                    <img
                      src={baseUrlForImage + movie.backdrop_path}
                      alt={movie.title}
                      className="movie__image"
                    />
                    <p className="movie__language">Language: {movie.original_language}</p>
                    <div className="movie__block-rating">
                      <p className="movie__vote-count">Vote count: {movie.vote_count} </p>
                      <StarRatings
                        rating={movie.vote_average}
                        numberOfStars={10}
                        starDimension="15px"
                        starRatedColor="#FFDE6A"
                        starSpacing="2px"
                        className="movie__count-stars"
                      />
                    </div>
                  </section>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    );
  }
}

const mapStateToProps = state => ({
  id: state.id,
  movies: state.movies,
});

const mapDispatchToProps = dispatch => {
  return {
    setMovies(movies) {
      dispatch({ type: 'SET_MOVIES', payload: movies });
    },
    setId(id) {
      dispatch({ type: 'SET_ID', payload: id });
    },
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SimilarMovies);
