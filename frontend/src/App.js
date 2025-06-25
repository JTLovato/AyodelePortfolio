import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import Footer from "./components/Footer";
import LinksScreen from "./screens/LinksScreen";
import AboutScreen from "./screens/AboutScreen";
import ContactScreen from "./screens/ContactScreen";
import NotFound from "./screens/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Helmet>
        <title>Ayodele Odubela</title>
      </Helmet>

      <header>
        <Link to='/'>
          <Navbar.Brand>
            <img src='../images/logo.png' alt='Logo' />
          </Navbar.Brand>
        </Link>
        <Link
          className='nav-link nav-contact-me'
          id='contact-btn'
          to='/contact'
        >
          Contact Me!
        </Link>
      </header>
      <main>
        <div className='landing'>
          <Routes>
            <Route path='/links' element={<LinksScreen />} />
            <Route path='/about' element={<AboutScreen />} />
            <Route path='/contact' element={<ContactScreen />} />
            <Route path='/' element={<HomeScreen />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </main>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
