import React from 'react';
import '../css/footer.css';

class Footer extends React.Component {
  render() {
    let date = new Date();
    return (
      <footer className="footer">
        <p>Laget med Express/MariaDB og React</p>
        <p>Copyright © {date.getFullYear} Erlend Paulsen Skaaden. All rights reserved</p>
      </footer>
    );
  }
}

export default Footer