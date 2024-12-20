import { useGetYandexPriceQuery } from "../../../app/api/companySlice";
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
  const { data, isLoading, isFetching } = useGetYandexPriceQuery({
    from_address: {
      lat: 41.311081,
      long: 69.240562,
    },
    to_address: {
      lat: 41.325638,
      long: 69.228487,
    },
  });

  console.log(data, "eee");

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
                ? ` • ${(data.data.options[0].waitingTime / 60).toFixed(
                    1,
                  )} мин • ${data.data.options[0].price} ${data.data.currency}`
                : "No data available"
            }
            text="Yandex Go"
            icon="./yandexGo.svg"
            arrowRight={true}
          />
          <EditAction
            smallInfo="4km • 15-20 min • 20,000 so’m"
            text="Fasten"
            icon="./fasten.svg"
            arrowRight={true}
          />
          <EditAction
            smallInfo="4km • 15-20 min • 20,000 so’m"
            text="My taxi"
            icon="./mytaxi.svg"
            arrowRight={true}
          />
          <EditAction
            smallInfo="4km • 15-20 min • 20,000 so’m"
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
