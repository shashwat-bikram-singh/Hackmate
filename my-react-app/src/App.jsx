import './App.css';
import { useState, useEffect } from 'react';
import Landing from './Pages/Landing.jsx';
import SignIn from './Pages/Auth/SignIn.jsx';
import SignUp from './Pages/Auth/SignUp.jsx';
import AboutSection from './Pages/about/about.jsx';
import ContactSection from './Pages/contact/contact.jsx';
import Navbar from './Components/Navbar/Navbar.jsx';
import Footer from './Components/Footer/Footer.jsx';
import DashboardPage from './Pages/Dashboard/DashboardPage.jsx';

function getRoute() {
  return window.location.hash || '#/';
}

function App() {
  const [route, setRoute] = useState(getRoute());

  useEffect(() => {
    const onChange = () => {
      const next = getRoute();
      setRoute(next);
      if (next === '#/' || next === '#/login' || next === '#/signup' || next === '#/about' || next === '#/contact' || next === '#/dashboard') {
        window.scrollTo(0, 0);
      }
    };
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  if (route === '#/dashboard') return <DashboardPage />;
  if (route === '#/login') return <SignIn />;
  if (route === '#/signup') return <SignUp />;

  if (route === '#/about') {
    return (
      <>
        <Navbar />
        <main>
          <AboutSection />
        </main>
        <Footer />
      </>
    );
  }

  if (route === '#/contact') {
    return (
      <>
        <Navbar />
        <main>
          <ContactSection />
        </main>
        <Footer />
      </>
    );
  }

  return <Landing />;
}

export default App;
