import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import LatestInfoScreen from "./LatestInfoScreen";
import HistoryScreen from "./HistoryScreen";
import NewsletterScreen from "./NewsletterScreen";

function HomeScreen() {
  return (
    <article className='hero-section'>
      <div className='hero-holder'>
        <img
          src='images/profilepic.png'
          className='profile-img'
          alt='Ayodele Odubela Headshot'
        ></img>
        <section className='hero-info'>
          <h1>
            Meet <span className='italics bold larger shimmer'>Ayodele!</span>
          </h1>
          <p className='hero-copy'>
            A leading voice in today's <span>ethical AI</span> landscape, book
            your consultation with Ayodele today for a <span>one-on-one</span>{" "}
            chat and stay ahead of the curve.
          </p>
          <Link
            className='nav-link new-font'
            id='contact-btn-main'
            to='/contact'
          >
            Contact Me!
          </Link>
        </section>
      </div>
      <div>
        <LatestInfoScreen />
        <HistoryScreen />
        <NewsletterScreen />
      </div>
    </article>
  );
}
export default HomeScreen;
