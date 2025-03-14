import { CompanyNearestMetro, NearestMetro } from "../../app/types/companyType";
import "./nearestMetro.scss";
import { ReactSVG } from "react-svg";

interface nearestMetroProps {
  metro: NearestMetro | CompanyNearestMetro;
  from: string;
}

const NearestMetroHolder = ({ metro, from }: nearestMetroProps) => {

  return (
    
    <div className="nearestMetro">
      <ReactSVG src="./metro.svg" />
      <div>
        <span className="nearestMetro__hint">{from}</span>

        <div className="nearestMetro__text">
          <span>{metro?.name} - </span>

          <div className="nearestMetro__text-icon">
            <ReactSVG src="./walkPerson.svg" />
            <span className="nowrap">{metro?.distance?.walking_duration}</span>
            <span>•</span>
            <span className="nowrap">{metro?.distance?.distance}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NearestMetroHolder;
