const GoogleMap = () => {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d2996.797593026149!2d69.2889213760559!3d41.31326667130939!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zNDHCsDE4JzQ3LjgiTiA2OcKwMTcnMjkuNCJF!5e0!3m2!1sru!2s!4v1738941463573!5m2!1sru!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Map"></iframe>
    </div>
  );
};

export default GoogleMap;
