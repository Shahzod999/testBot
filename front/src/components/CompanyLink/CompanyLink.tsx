import "./companyLink.scss";

const CompanyLink = () => {

  const handleOrder = () => {
    window.open("https://cosinus.uz/");
  };

  return (
    <p className="companyLink">
      Powered by <span onClick={handleOrder}>Cosinus LLC</span> v0.0.1
    </p>
  );
};

export default CompanyLink;
