import { useTranslation } from "react-i18next";
import { useGetYandexPriceQuery } from "../../../app/api/companySlice";
import { selectedDistance } from "../../../app/features/companyStateSlice";
import { selectedPlatform } from "../../../app/features/getCompanyIdSlice";
import { selectedUserLocation } from "../../../app/features/userLocationSlice";
import { CompanyState } from "../../../app/types/companyType";
import { openLinkNavigate } from "../../../hooks/openLinkNavigate";

import { useAppSelector } from "../../../hooks/reduxHooks";
import BottomSheet from "../../Actions/BottomSheet";
import EditAction from "../../contacts/EditAction";
import { useMemo } from "react";
import LocationNotAvailable from "../../LocationNotAvailable/LocationNotAvailable";

interface TaxiProps {
  activeAction: string | null;
  closeBottomSheet: () => void;
  companyInfo: CompanyState;
}

const Taxi = ({ activeAction, closeBottomSheet, companyInfo }: TaxiProps) => {
  const platform = useAppSelector(selectedPlatform);
  const location = useAppSelector(selectedUserLocation);
  const distance = useAppSelector(selectedDistance);
  const { t } = useTranslation();

  const isBottomSheetOpen = activeAction === "taxi";

  const query = useMemo(
    () => ({
      from_address: {
        lat: location.lat,
        long: location.lon,
      },
      to_address: {
        lat: companyInfo.latitude,
        long: companyInfo.longitude,
      },
    }),
    [location, companyInfo],
  );

  const { data, isLoading, isFetching } = useGetYandexPriceQuery(query, {
    skip: !isBottomSheetOpen,
  });

  const yandexUrl = `https://3.redirect.appmetrica.yandex.com/route?start-lat=${location.lat}&start-lon=${location.lon}&end-lat=${companyInfo.latitude}&end-lon=${companyInfo.longitude}&tariffClass=econom&ref=https://truegiswebapp.uz/&appmetrica_tracking_id=1178268795219780156`;

  const uklonAndroid =
    "https://play.google.com/store/apps/details?id=ua.com.uklontaxi";
  const uklonIos =
    "https://apps.apple.com/ru/app/uklon-more-than-a-taxi/id654646098";

  const fastenAndroid =
    "https://play.google.com/store/apps/details?id=com.fasten.rider";
  const fastenIos =
    "https://apps.apple.com/si/app/fasten-safarlar-va-yetkazish/id6578446117";

  const universalLinkMyTaxi = "https://my-taxi.onelink.me/sda5/s0pn2a00";

  return (
    <div className="mainInfoTaxi">
      <BottomSheet isOpen={isBottomSheetOpen} onClose={closeBottomSheet}>
        <div className="contacts__actions">
          <h3 className="contacts__actions__centerTitle">{t("taxi")}</h3>

          {(!location.lat || !location.lon) && <LocationNotAvailable />}

          <EditAction
            smallInfo={
              isLoading || isFetching
                ? t("wait")
                : data?.data?.options?.[0]
                ? `${distance?.distance} • ${(
                    data.data.estimatedTime / 60
                  ).toFixed(1)} min • ${data.data.options[0].price} ${
                    data.data.currency
                  }`
                : t("unavailable")
            }
            text="Yandex Go"
            icon="./yandexGo.svg"
            arrowRight={true}
            inputmode="none"
            onClick={() => openLinkNavigate(yandexUrl)}
          />

          <EditAction
            smallInfo={t("learnMoreInApp")}
            text="Fasten"
            icon="./fasten.svg"
            arrowRight={true}
            inputmode="none"
            onClick={() =>
              openLinkNavigate(
                platform == "android" ? fastenAndroid : fastenIos,
              )
            }
          />

          <EditAction
            smallInfo={t("learnMoreInApp")}
            text="My taxi"
            icon="./mytaxi.svg"
            arrowRight={true}
            inputmode="none"
            onClick={() => openLinkNavigate(universalLinkMyTaxi)}
          />

          <EditAction
            smallInfo={t("learnMoreInApp")}
            text="Uklon"
            icon="./uklon.svg"
            arrowRight={true}
            inputmode="none"
            onClick={() =>
              openLinkNavigate(platform == "android" ? uklonAndroid : uklonIos)
            }
          />
        </div>
      </BottomSheet>
    </div>
  );
};

export default Taxi;
