import Footer from './components/Footer';
import Header from './components/Header';
import Home from './components/Home'
import { GameStore } from './store/Game/gameStore';
import { GamePage } from './components/Pages/Games/GamePage';
import { CustomerPage } from './components/Pages/Customer/CustomerPage'
import { PlatformPage } from './components/Pages/Platform/PlatformPage'
import { CharacterPage } from './components/Pages/Character/CharacterPage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { DailyRents } from './components/Pages/Rents/DailyRents';

const gameController = new GameStore();



function App() {

  // const [games, setGames] = useState([])
  // useEffect(() => {
  //   axios.get('/api/Games').then((response) => setGames(response.data)).catch(console.log);
  // }, [])

  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>

          <Route
            path='/'
            element={<Home />}
          />

          <Route
            path='/games'
            element={<GamePage gameController={gameController} />}
          />

          <Route
            path='/customers'
            element={<CustomerPage />}
          />

          <Route
            path='/dailyrents'
            element={<DailyRents />}
          />

          <Route
            path='/platforms'
            element={<PlatformPage />}
          />

          <Route
            path='/character'
            element={<CharacterPage />}
          />

        </Routes>

        <Footer />
      </div>
    </Router>

  );
}
export default App;
