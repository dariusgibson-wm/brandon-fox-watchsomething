import AllTitles from './components/AllTitles.js';
import SingleTitle from './components/SingleTitle.js';
import { Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Route path="/movie/:id" component={SingleTitle} />
      <Route exact path="/" component={AllTitles} />
    </div>
  );
}

export default App;
