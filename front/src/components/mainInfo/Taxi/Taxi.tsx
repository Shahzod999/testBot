import { useGetYandexPriceQuery } from "../../../app/api/companySlice";
import { selectedDistance } from "../../../app/features/companyStateSlice";
import { selectedUserLocation } from "../../../app/features/userLocationSlice";
import { CompanyState } from "../../../app/types/companyType";
import { useAppSelector } from "../../../hooks/reduxHooks";
import BottomSheet from "../../Actions/BottomSheet";
import EditAction from "../../contacts/EditAction";

interface TaxiProps {
  activeAction: string | null;
  closeBottomSheet: () => void;
  companyInfo: CompanyState;
}

const Taxi = ({ activeAction, closeBottomSheet, companyInfo }: TaxiProps) => {
  const location = useAppSelector(selectedUserLocation);
  const distance = useAppSelector(selectedDistance);
  const { data, isLoading, isFetching } = useGetYandexPriceQuery({
    from_address: {
      lat: location.lat,
      long: location.lon,
    },
    to_address: {
      lat: companyInfo.latitude,
      long: companyInfo.longitude,
    },
  });

  return (
    <div className="mainInfoTaxi">
      <BottomSheet isOpen={activeAction === "taxi"} onClose={closeBottomSheet}>
        <div className="contacts__actions">
          <h3 className="contacts__actions__centerTitle">Такси</h3>
          <EditAction
            smallInfo={
              isLoading || isFetching
                ? "...Wait"
                : data?.data.options?.[0]
                ? `${distance}км • ${(
                    data.data.options[0].waitingTime / 60
                  ).toFixed(1)} мин • ${data.data.options[0].price} ${
                    data.data.currency
                  }`
                : "No data available"
            }
            text="Yandex Go"
            icon="./yandexGo.svg"
            arrowRight={true}
          />
          <EditAction
            smallInfo="узнать подробнее в приложении"
            text="Fasten"
            icon="./fasten.svg"
            arrowRight={true}
          />
          <EditAction
            smallInfo="узнать подробнее в приложении"
            text="My taxi"
            icon="./mytaxi.svg"
            arrowRight={true}
          />
          <EditAction
            smallInfo="узнать подробнее в приложении"
            text="Uklon"
            icon="./uklon.svg"
            arrowRight={true}
          />
        </div>
      </BottomSheet>
    </div>
  );
};

export default Taxi;
