import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Gallery from './components/Gallery';
import Packages from './components/Packages';
import Experiences from './components/Experiences';
import Testimonials from './components/Testimonials';
import Faq from './components/Faq';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen bg-white text-gray-800 font-sans">
      <Navbar />
      <Hero />
      <About />
      <Gallery />
      <Packages />
      <Experiences />
      <Testimonials />
      <Faq />
      <BookingForm />
      <Footer />
    </div>
  );
}
