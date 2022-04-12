import React from 'react';
import '../css/home.css';
import logo from '../images/me.jpg';

class Home extends React.Component {
  render() {
    return (
      <div className="container-main">
      <div className="home">
        <img className="profile-pic" src={logo} alt="That's me!" />
        <p className="intro-text">
          Hei! Mitt navn er Erlend og jeg går 2. året Datateknologi
          på NTNU i Trondheim. Jeg bruker mye av fritiden min på
          Samfundet, hvor jeg er funksjonær i IT-komiteen. Her var
          jeg tidligere nettverksansvarlig. Jeg er stor tilhenger
          av FOSS, og prøver å fremme dette. Sjekk ut
          min <a className="info-link" href="https://github.com/erlendps" target="_blank" rel="noreferrer">GitHub</a> for
          å se mine andre prosjekter. Utvalgte prosjekter ligger også under "prosjekter".
          I tillegg liker jeg enkel og god mat, så jeg har også laget en samling
          av mine enkleste og beste oppskrifter!
        </p>
      </div>
      </div>
    );
  }
}

export default Home;