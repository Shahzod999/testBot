
const GoogleMap = () => {
  return (
    <div style={{ width: '100%', height: '100%' }}>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d5685.74063157881!2d69.29118446695718!3d41.312354051719886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sru!2s!4v1738940519634!5m2!1sru!2s"
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};

export default GoogleMap;
