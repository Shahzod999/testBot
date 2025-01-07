import { ReactSVG } from "react-svg";
import { CompanyState } from "../../../app/types/companyType";
import { useCopyAddress } from "../../../hooks/copyText";

const EmailContact = ({ companyInfo }: { companyInfo: CompanyState }) => {
  const { copyed, handleCopyAdress } = useCopyAddress();

  const handleCopyEmail = () => {
    const email = companyInfo?.email || null;
    handleCopyAdress(email, "email");
  };
  const handleNavigateToEmail = () => {
    window.open("mailto:${companyInfo.email}");
  };

  return (
    <div className="contacts__actions">
      <button className="actions">
        <ReactSVG src="./copy.svg" onClick={handleCopyEmail} />
        <span className="actions__text" onClick={handleNavigateToEmail}>
          <span className="actions__text__letters ">
            {copyed || companyInfo?.email || "Почта не доступна"}
          </span>
          <span style={{fontSize: 12}}>открыть почту</span>
        </span>
      </button>
    </div>
  );
};

export default EmailContact;
