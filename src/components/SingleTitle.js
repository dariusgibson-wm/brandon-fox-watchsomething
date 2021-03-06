import React from 'react';
import axios from 'axios';
import '../AllTitles.css';
import { Link } from 'react-router-dom';

export default class AllTitles extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  callIMDBDetails(type) {
    axios
      .request({
        method: 'GET',
        url: 'http://localhost:3001/api/singletitle',
        params: { type, imdb: this.props.match.params.id },
        headers: {
          'x-rapidapi-host': 'movies-tvshows-data-imdb.p.rapidapi.com',
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        },
      })
      .then((res) => {
        this.setState(res.data);
      });
  }

  componentDidMount() {
    this.callIMDBDetails('get-movie-details');
    if (
      this.state &&
      Object.keys(this.state).length === 0 &&
      Object.getPrototypeOf(this.state) === Object.prototype
    )
      this.callIMDBDetails('get-show-details');
  }

  styleScript(heading, key) {
    if (key) {
      return (
        <p>{`${heading}: ${key?.[0] ? key[0] : ''}${
          key?.[1] ? ', ' + key[1] : ''
        }${key?.[2] ? ', ' + key[2] : ''}`}</p>
      );
    }
    return '';
  }

  render() {
    const {
      title,
      directors,
      genres,
      networks,
      tagline,
      stars,
      imdb_rating,
      description,
    } = this.state;
    return (
      <div>
        <header>
          <h2>
            <i className="ion-plane"></i>
          </h2>
          <nav>
            <ul>
              <li>
                <Link className="btn" to={`/`}>
                  Back To Search
                </Link>
              </li>
            </ul>
          </nav>
        </header>
        <div>
          <h1>{title}</h1>
          <h3>{tagline}</h3>
          {this.styleScript('Directors', directors)}
          <div />
          {this.styleScript('Top Stars', stars)}
          <div />
          {this.styleScript('Genres', genres)}
          <div />
          {this.styleScript('Networks', networks)}
          <div />
          <p color="#fff">{`IMDB Rating: ${imdb_rating}`}</p>
          <div />
          <p color="#fff">Description: {description}</p>
        </div>
      </div>
    );
  }
}
