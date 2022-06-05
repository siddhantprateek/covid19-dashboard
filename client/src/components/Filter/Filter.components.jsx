import React, { useEffect, useState } from "react";
import { useQuery, gql } from "@apollo/client";
import {
  Chart as ChartJS,
  RadialLinearScale,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import { PolarArea } from "react-chartjs-2";
import "./Filter.styles.css";
import axios from "../../config/axios";

ChartJS.register(RadialLinearScale, ArcElement, Tooltip, Legend);


const Filter = () => {
  const [countrySlug, setCountrySlug] = useState("Worldwide");
  const date = new Date()

  const [ fromDate, setFromDate ] = useState("2020-01-30")
  const currentTodate = `${date.getFullYear()}-0${date.getMonth()}-0${date.getDate() - 1}`
  console.log(currentTodate)
  const [ ToDate, setToDate ] = useState(currentTodate)
  const [active, setActive ] = useState(0)
  const [recovered, setRecovered] = useState(0)
  const [deceased, setDeceased] = useState(0)

  const { loading, error, data } = useQuery(gql`
    {
      countries {
        Country
        Slug
      }
    }
  `);
  useEffect(() => {
    axios.get(`/country/${countrySlug}/from/${fromDate}/to/${ToDate}`)
    .then(res => {
      // setCountryCases(res.data)
      setActive(res.data[res.data.length - 1].Confirmed)
      setRecovered(res.data[res.data.length - 1].Recovered)
      setDeceased(res.data[res.data.length - 1].Deaths)
    })
    .catch(err => console.error(err))
  }, [countrySlug, ToDate, fromDate])

  const handleChange = (e) => {
    setCountrySlug(e.target.value)
  }
  const pieData = {
  labels: ["Deceased", "Recovered", "Active"],
  datasets: [
    {
      label: "# of Votes",
      data: [deceased, recovered, active],
      backgroundColor: [
        "rgba(255, 99, 132, 0.5)",
        "rgba(255, 206, 86, 0.5)",
        "rgba(75, 192, 192, 0.5)",
      ],
      borderWidth: 1,
      },
    ],
  };

  if (loading) return (
    <div className="filter-section">
      <p>Loading...</p>
    </div>
  
  );
  if (error) return (
    <div className="filter-section">
      <p>Error :(</p>
    </div>
  );
  return (
    <div className="filter-section">
      <div className="filter-option">
        <select
          className="select-cnt"
          onClick={handleChange}
        >
          {data.countries.map((cnt) => (
            <option value={cnt.Slug}>{cnt.Country}</option>
          ))}
        </select>
        <br/>
        
        </div>
        <div className="date-section">
          <input value={fromDate} type="date" onChange={(e) => setFromDate(e.target.value)} className="filter-date" id="" />
          <input value={ToDate} type="date" onChange={(e) => setToDate(e.target.value)} className="filter-date" id="" />
        </div>
      <div className="polar-chart">
        <PolarArea data={pieData} />
      </div>
    </div>
  );
};

export default Filter;
