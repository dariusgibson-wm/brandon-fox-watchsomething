import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import '../AllTitles.css';
export default class AllTitles extends React.Component {
  constructor() {
    super();

    this.state = {
      movies: [],
      shows: [],
      title: '',
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({ title: event.target.value });
  }

  callIMDB(type) {
    axios
      .request({
        method: 'GET',
        url: 'https://movies-tvshows-data-imdb.p.rapidapi.com/',
        params: { type, title: this.state.title },
        headers: {
          'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
          'x-rapidapi-key':
            'a394fec0f6msh0eb3bb896bc76b3p13026cjsne014cc19422f',
        },
      })
      .then((res) => {
        type === 'get-movies-by-title'
          ? this.setState({
              movies: res.data.movie_results,
            })
          : this.setState({
              shows: res.data.tv_results,
            });
      });
  }

  handleSubmit(event) {
    event.preventDefault();

    this.callIMDB('get-movies-by-title');
    this.callIMDB('get-shows-by-title');
  }

  render() {
    console.log(this.state);
    let movieList;
    let tvList;
    let noList = <h1>Please select a valid movie/TV Show</h1>;

    if (this.state.movies) {
      movieList = (
        <ul>
          {this.state.movies.slice(0, 5).map((movie) => (
            <li key={movie.imdb_id}>
              <Link to={`/movie/${movie.imdb_id}`}>{`🎭 ${movie.title}`}</Link>
            </li>
          ))}{' '}
        </ul>
      );
    }

    if (this.state.shows) {
      tvList = (
        <ul>
          {this.state.shows.slice(0, 5).map((show) => (
            <li key={show.imdb_id}>
              <Link to={`/movie/${show.imdb_id}`}>{`🎭 ${show.title}`}</Link>
            </li>
          ))}{' '}
        </ul>
      );
    }

    return (
      <div>
        <div>
          <div className="cover">
            <h1>Discover what's out there.</h1>
            <form className="flex-form" onSubmit={this.handleSubmit}>
              <label htmlFor="from">
                <i className="ion-location"></i>
              </label>
              <input
                type="text"
                name="title"
                value={this.state.title}
                onChange={this.handleChange}
                placeholder="Your Viewing Awaits"
              />
              <input type="submit" value="Submit" />
            </form>
            <div id="madeby">
              <span>
                Photo by{' '}
                <a
                  href="https://unsplash.com/@benblenner"
                  target="_blank"
                  rel="noreferrer"
                >
                  Ben Blennerhassett
                </a>
              </span>
            </div>
            <div>{!movieList && !tvList ? noList : null}</div>
            <div>
              {movieList ? movieList : null} {tvList ? tvList : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
