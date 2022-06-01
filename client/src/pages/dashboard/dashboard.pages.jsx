import React, {useEffect, useState } from 'react'
import { CasesCard, SummaryChart, Filter, News} from '../../components';
import axios from '../../config/axios'
const Dashboard = () => {
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
    <div>
        <div className='top-section'>
            <Filter />
            <News /> 
        </div>
        <CasesCard {...casesSummary} />
        <div className='chart-view'>
            <SummaryChart />
        </div>
    </div>
  )
}

export default Dashboard