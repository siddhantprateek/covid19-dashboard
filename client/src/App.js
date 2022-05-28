import React, { useEffect, useState} from 'react';
import axios from 'axios';
import { Header, CasesCard, SummaryChart} from './components';
import './App.css';

function App() {
  const [ casesSummary, setCasesSummary ] = useState([])

  async function getCasesSummary() {
    try {
      const response = await axios.get('https://api.covid19api.com/summary');
      setCasesSummary(response.data.Global)
    } catch (error) {
      console.error(error);
    }
  }
  getCasesSummary()

  return (
    <div className="App">
     <Header />
     <CasesCard {...casesSummary}/>
     <SummaryChart />
    </div>
  );
}

export default App;
