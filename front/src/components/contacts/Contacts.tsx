import { ContactsActions } from "./ContactsActions";
import { TbAppsFilled } from "react-icons/tb";
import { TbMessageChatbotFilled } from "react-icons/tb";
import { IoCall } from "react-icons/io5";
import { IoEarth } from "react-icons/io5";
import { GoClockFill } from "react-icons/go";
import { IoNavigateCircle } from "react-icons/io5";
import { FaAddressCard } from "react-icons/fa6";
import "./contacts.scss";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectedCompany } from "../../app/features/companyStateSlice";

const getAvailableSocialMedia = (
  socialMedia: Record<string, string | any | null>,
): string => {
  const names = Object.entries(socialMedia)
    .filter(([_, url]) => url)
    .map(([name]) => name);
  return names.length > 0 ? names.join(", ") : "Соцсети не указаны";
};

const createActionText = (
  field: any,
  fallback: string,
): { text: string; isDisabled: boolean } => {
  if (field) {
    return {
      text: typeof field === "string" ? field : JSON.stringify(field),
      isDisabled: false,
    };
  }
  return { text: fallback, isDisabled: true };
};

const Contacts = () => {
  const companyInfo = useAppSelector(selectedCompany);
  if (!companyInfo) return null;

  const actions = [
    {
      ...createActionText(
        companyInfo.mobile_apps?.android || companyInfo.mobile_apps?.ios,
        "Приложение недоступно",
      ),
      icon: <TbAppsFilled />,
    },
    {
      text: getAvailableSocialMedia(companyInfo.social_media || {}),
      icon: <TbMessageChatbotFilled />,
      isDisabled: !Object.values(companyInfo.social_media || {}).some(
        (url) => url,
      ),
    },
    {
      ...createActionText(companyInfo.phone_number, "Телефон не указан"),
      icon: <IoCall />,
    },
    {
      ...createActionText(
        companyInfo.website.replace("https://", ""),
        "Сайт не указан",
      ),
      icon: <IoEarth />,
    },
    {
      text: "Открыто до 22:00",
      icon: <GoClockFill />,
      isDisabled: false,
    },
    {
      ...createActionText(companyInfo.address, "Адрес не указан"),
      icon: <IoNavigateCircle />,
    },
    {
      text: "Доступные вакансии (2)",
      icon: <FaAddressCard />,
      isDisabled: false,
    },
  ];

  return (
    <div className="contacts">
      <div className="contacts__header">
        <h2>Контакты</h2>
        <button>
          <svg
            width="21"
            height="20"
            viewBox="0 0 21 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
              d="M17.5937 15L16.7603 15.9117C16.3183 16.3951 15.7189 16.6667 15.0939 16.6667C14.4688 16.6667 13.8694 16.3951 13.4274 15.9117C12.9848 15.4293 12.3854 15.1584 11.7606 15.1584C11.1357 15.1584 10.5364 15.4293 10.0937 15.9117M2.59375 16.6667H3.9892C4.39685 16.6667 4.60068 16.6667 4.79249 16.6206C4.96255 16.5798 5.12513 16.5124 5.27425 16.4211C5.44244 16.318 5.58657 16.1739 5.87482 15.8856L16.3438 5.41666C17.0341 4.72631 17.0341 3.60702 16.3438 2.91666C15.6534 2.22631 14.5341 2.22631 13.8438 2.91666L3.3748 13.3856C3.08655 13.6739 2.94242 13.818 2.83935 13.9862C2.74797 14.1353 2.68063 14.2979 2.6398 14.4679C2.59375 14.6598 2.59375 14.8636 2.59375 15.2712V16.6667Z"
              stroke="black"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Редактировать
        </button>
      </div>
      <div className="contacts__actions">
        {actions.map(({ text, icon, isDisabled }, index) => (
          <ContactsActions
            key={index}
            text={text}
            icon={icon}
            isDisabled={isDisabled}
          />
        ))}
      </div>
    </div>
  );
};

export default Contacts;
