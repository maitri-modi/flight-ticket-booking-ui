import './App.css';
import { ExploreFlights } from './layouts/homePage/ExploreFights';
import { Footer } from './layouts/navbarAndFooter/Footer';
import { Navbar } from './layouts/navbarAndFooter/Navbar';

function App() {
  return (
    <div>
      <Navbar />
      <ExploreFlights/>
      <Footer/>
    </div>
  );
}

export default App;
