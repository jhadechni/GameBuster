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
import { RentPage } from './components/Pages/Rents/RentPage';
import { RentStore } from './store/Rent/rentStore'
import { CustomerStore } from './store/Customer/customerStore'
import { CharacterStore } from './store/Character/charactersStore'
import { PlatformStore } from './store/Platform/platformStore';

const gameController = new GameStore();
const rentController = new RentStore()
const customerController = new CustomerStore();
const characterController = new CharacterStore();
const platformController = new PlatformStore();

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
            element={<CustomerPage customerController={customerController} />}
          />

          <Route
            path='/dailyrents'
            element={<DailyRents rentController={rentController} />}
          />

          <Route
            path='/platforms'
            element={<PlatformPage platformController={platformController} />}
          />

          <Route
            path='/character'
            element={<CharacterPage characterController={characterController} />}
          />

          <Route
            path='/rent'
            element={<RentPage rentController={rentController} />}
          />

        </Routes>

        <Footer />
      </div>
    </Router>

  );
}
export default App;
