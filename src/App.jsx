import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

// Component Imports
import LoadingScreen from './components/LoadingScreen';
import CustomCursor from './components/CustomCursor';
import NeuralNetwork from './components/NeuralNetwork';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AIAssistant from './components/AIAssistant';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <>
      <AnimatePresence mode="wait">
        {isLoading ? (
          <LoadingScreen key="loading" onFinished={() => setIsLoading(false)} />
        ) : (
          <React.Fragment key="main-content">
            {/* Custom Interactive Elements */}
            <CustomCursor />
            <NeuralNetwork />

            {/* Layout Header */}
            <Navbar />

            {/* Main Sections */}
            <main>
              <Hero />
              <About />
              <Experience />
              <Projects />
              <Skills />
              <Contact />
            </main>

            {/* Footer */}
            <Footer />

            {/* Floating AI Agent Chat Widget */}
            <AIAssistant />
          </React.Fragment>
        )}
      </AnimatePresence>
    </>
  );
}

export default App;
