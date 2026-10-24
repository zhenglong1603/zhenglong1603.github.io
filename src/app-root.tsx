import { BrowserRouter as Router } from 'react-router-dom';
import HomePage from './pages/home-page';

function AppRoot() {
  return (
    <Router>
      <HomePage />
    </Router>
  );
}

export default AppRoot;
