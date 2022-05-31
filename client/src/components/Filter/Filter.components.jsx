import React from 'react';
import { useQuery, gql } from '@apollo/client'
import './Filter.styles.css';

const Filter = () => {
  const { loading, error, data }= useQuery(gql`
   {
      countries {
        Country
        Slug
      }
   }
  `);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  console.log(data.countries)
  return (
    <div className='filter-section'>
      <div className="filter-option section-left">
        <select name="" id="">
         {
           data.countries.map((cnt) => (
             <option value="">{cnt.Country}</option>
           ))
         }
        </select>
      </div>
      <div className="pie-chart section-right">
      
      </div>
    </div>
  );
};

export default Filter