import logo from './logo.svg';
import './App.css';
import {useState, useEffect} from 'react'
import Profile from './Profile';
import Login from './Login';
function App() {
  const LS_KEY ="666dd95029f663aae81270aa4323ec2589ff35203f837ed5c610f12012cd438e"
  const [state, setState] = useState({});

	useEffect(() => {
		// Access token is stored in localstorage
		const ls = window.localStorage.getItem(LS_KEY);
		const auth = ls && JSON.parse(ls);
		setState({ auth });
	}, []);

	const handleLoggedIn = (auth) => {
		localStorage.setItem(LS_KEY, JSON.stringify(auth));
		setState({ auth });
	};

	const handleLoggedOut = () => {
		localStorage.removeItem(LS_KEY);
		setState({ auth: undefined });
	};

	const { auth } = state;
  return (
    <div className="App">
      <header className="">
        
        <p>
        Login with MetaMask using Node JS, Express Js , React Js&  MongoDb
        </p>
       
      </header>
      {auth ? (
					<Profile auth={auth} onLoggedOut={handleLoggedOut} />
				) : (
					<Login onLoggedIn={handleLoggedIn} />
				)}
    </div>
  );
}

export default App;
