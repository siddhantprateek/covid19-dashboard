
// import millify from "millify";
import './CasesCard.styles.css';

const CasesCard = (props) => {

  return (
    <div className="cases-section">
      <div className='cases-card'>
        <h1>Active</h1>
        <p>{props.TotalConfirmed}</p>  
        <p>+{props.NewConfirmed}</p>
      </div>

      <div className='cases-card death'>
        <h1>Deceased</h1>
        <p>{props.TotalDeaths}</p>  
        <p>+{props.NewDeaths}</p>
      </div>
      
      <div className='cases-card'>
        <h1>Recovered</h1>
        <p>{props.TotalRecovered}</p>  
        <p>+{props.NewRecovered}</p>
      </div>
    </div>
  );
};

export default CasesCard;