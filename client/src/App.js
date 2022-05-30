import React, { useEffect, useState} from 'react';
import axios from './config/axios';
import { Header, CasesCard, SummaryChart, Filter} from './components';
import './App.css';

function App() {
  const [ casesSummary, setCasesSummary ] = useState([])
  useEffect(() => {
    async function getCasesSummary() {
      try {
        const response = await axios.get('/summary');
        setCasesSummary(response.data.Global)
      } catch (error) {
        console.error(error);
      }
    }
    getCasesSummary()
  }, [])

  return (
    <div className="App">
     <Header />
     <Filter />
     <CasesCard {...casesSummary}/>
     <SummaryChart />
    </div>
  );
}

export default App;
