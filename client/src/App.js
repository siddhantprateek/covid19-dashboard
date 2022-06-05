import React from 'react';
import { Header, Footer } from './components';
import { Routes, Route } from 'react-router-dom'
import './App.css';
import Dashboard from './pages/dashboard/dashboard.pages';
import NewsPage from './pages/news/news.pages';

function App() {
  return (
    <div className="App">
      <section>
        <div className='spreads'/>
        <div className='spreads'/>
      </section>
     <Header />
     <Routes>
      <Route path="/" element={<Dashboard />} />
      <Route path="/news" element={<NewsPage />} />
     </Routes>
      <Footer />
    </div>
  );
}

export default App;
