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
import axios from 'axios'
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
const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];


const SummaryChart = () => {

  var activeCase = []
  useEffect(()=>{
    const getData = async () => {
      const res = await axios.get('https://api.covid19api.com/world')
      try {
        res.data.slice(1, 100).map((confirmed) => activeCase.push(confirmed.NewConfirmed))
      }catch(err){
        console.error(err)
      }
    }
    getData()
  })

  const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: activeCase,
      borderColor: 'rgb(255, 99, 132)',
      backgroundColor: 'rgba(255, 99, 132, 0.5)',
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