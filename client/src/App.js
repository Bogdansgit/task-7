import { BrowserRouter } from 'react-router-dom';

import './App.css';
import Router from './routes';
import { UserContext } from './Context/userContext';
import { userData } from './api';
import { AuthProvider } from './Context/auth';

function App() {
  return (
    <div className="App">
      <UserContext.Provider value={userData}>
          <AuthProvider>
            <Router />
          </AuthProvider>
      </UserContext.Provider>
    </div>
  );
}

export default App;
