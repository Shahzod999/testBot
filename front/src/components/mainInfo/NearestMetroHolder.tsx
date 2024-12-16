import { CompanyNearestMetro, NearestMetro } from "../../app/types/companyType";
import "./nearestMetro.scss";
import { ReactSVG } from "react-svg";

interface nearestMetroProps {
  metro: NearestMetro | CompanyNearestMetro;
  from: string;
}

const NearestMetroHolder = ({ metro, from }: nearestMetroProps) => {
  console.log(metro, "tutt");

  return (
    <div className="nearestMetro">
      <ReactSVG src="./metro.svg" />
      <div>
        <span className="nearestMetro__hint">{from}</span>

        <div className="nearestMetro__text">
          <span>{metro.name} • </span>
          <ReactSVG src="./walkPerson.svg" />
          <span>{metro.distance.walking_duration}</span>
        </div>
      </div>
    </div>
  );
};

export default NearestMetroHolder;
