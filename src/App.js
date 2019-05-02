import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import MainPage from './components/MainPage';
import SimilarMovies from './components/SimilarMovies';

function App({ store }) {
  return (
    <Provider store={store}>
      <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
          <Route exact path="/similar-movies_:id" component={SimilarMovies} />
          <Route exact path="/" component={MainPage} />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
