import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import axios from '../../config/axios'
import './SummaryChart.styles.css';


ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);
export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    title: {
      display: true,
      text: 'Chart.js Line Chart',
    },
  },
};
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];


const SummaryChart = () => {

  const [ activeCase, setactiveCase ] = useState([]) 
  useEffect(()=>{
    const getData = async () => {
      const res = await axios.get('/world')
      try {
        setactiveCase(res.data)
      }catch(err){
        console.error(err)
      }
    }
    getData()
  }, [])

  var TotalcasesData = []
  activeCase.map((cnf) => TotalcasesData.push(cnf.TotalConfirmed))

  var DeathcasesData = []
  activeCase.map((cnf) => DeathcasesData.push(cnf.NewDeaths))
  
  var NewcasesData = []
  activeCase.map((cnf) => NewcasesData.push(cnf.NewConfirmed))

  const data = {
  labels,
  datasets: [
    {
      label: 'Total Cases',
      data: [],
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
    },
    {
      label: 'Active Cases',
      data: NewcasesData,
      borderColor: 'rgb(255,255,0)',
      backgroundColor: 'rgba(255, 255, 0, 0.5)',
    },
    {
      label: 'Deceased Cases',
      data: DeathcasesData,
      borderColor: 'rgb(53, 162, 235)',
      backgroundColor: 'rgba(53, 162, 235, 0.5)',
    }
  ],
};
  return (
    <div className='summary-chart'>
     <h2>Summary</h2>
     <Line 
      data={data}
     />
    </div>
  );
};

export default SummaryChart;