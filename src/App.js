import React from 'react';
import './App.css';
// import Swal from 'sweetalert2';

class App extends React.Component {
  state = {
    // isLoading: '',
    imageUrl: '',
  };

  async componentDidMount() {
    this.fetchDogUrl();
  }

  shouldComponentUpdate(_nextProps, nextState) {
    return !nextState.imageUrl.includes('terrier');
  }

  componentDidUpdate(_prevProps, prevState) {
    localStorage.setItem('dogUrl', prevState.imageUrl);
  }

  fetchDogUrl = async () => {
    const api = await fetch('https://dog.ceo/api/breeds/image/random');
    const data = await api.json();
    this.setState({
      imageUrl: data.message,
    }, () => {
      const urlSplit = data.message.split('/');
      const breed = urlSplit[4];
      alert(breed);
    });
  };

  render() {
    const { imageUrl } = this.state;
    return (
      <div>
        <h1>Doguinhos</h1>
        <div>
          { imageUrl.length ? <img src={ imageUrl } alt="Doguinho aleatório" />
            : <span>Loading...</span> }
        </div>
        <button onClick={ this.fetchDogUrl }>Novo doguinho!</button>
      </div>
    );
  }
}

export default App;
