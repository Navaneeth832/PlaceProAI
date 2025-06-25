import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Form from './pages/Form';
import Result from './pages/Result';
import Batch from './pages/Batch';
import Charts from './pages/Charts';
import Admin from './pages/Admin';

function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-purple-50 dark:from-gray-900 dark:to-purple-950 transition-colors duration-300">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/form" element={<Form />} />
          <Route path="/result" element={<Result />} />
          <Route path="/batch" element={<Batch />} />
          <Route path="/charts" element={<Charts />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;