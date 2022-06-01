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
  const [countryCases, setCountryCases ] = useState([])
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
    axios.get(`/country/${countrySlug}`)
    .then(res => {
      console.log(res.data)
      setCountryCases(res.data)
      setActive(res.data[100].Confirmed)
      setRecovered(res.data[100].Recovered)
      setDeceased(res.data[100].Deaths)
    })
    .catch(err => console.error(err))
  }, [countrySlug])

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
  if (error) return <p>Error :(</p>;
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
      </div>
      <div className="polar-chart">
        <PolarArea data={pieData} />
      </div>
    </div>
  );
};

export default Filter;
