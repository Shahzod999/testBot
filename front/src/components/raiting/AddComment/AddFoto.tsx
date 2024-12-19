import { PhotosSample } from "../../../app/types/companyType";
import Cross from "./Cross";
import { ReactSVG } from "react-svg";

interface AddFotoProps {
  imagesArray: (PhotosSample & { file?: File })[];
  setimagesArray: React.Dispatch<
    React.SetStateAction<(PhotosSample & { file?: File })[]>
  >;
  id: string;
}

const AddFoto = ({ imagesArray, setimagesArray, id }: AddFotoProps) => {
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      const newImages = Array.from(files).map((file) => ({
        photo_id: "", // У новых изображений можно оставить ID пустым
        photo_url: URL.createObjectURL(file),
        photo_url_large: "",
        video_thumbnail_url: null,
        latitude: 0,
        longitude: 0,
        type: "photo",
        photo_datetime_utc: new Date().toISOString(),
        photo_timestamp: Date.now(),
        file,
      }));
      setimagesArray((prev) => [...prev, ...newImages]);
    }
  };

  const removeImage = (index: number) => {
    setimagesArray((prev) => prev.filter((_, i) => i !== index));
  };
  return (
    <div className="addFoto">
      <h2>Добавить фотографию</h2>

      <input
        accept="image/*"
        type="file"
        id={id}
        multiple
        onChange={handleImagePreview}
      />

      <div className="addFoto__imagesArray">
        {imagesArray.map((image, index) => (
          <div className="addFoto__imagesArray__img" key={index}>
            <div className="addFoto__imagesArray__img__cross">
              <Cross toggleComment={() => removeImage(index)} />
            </div>
            <img src={image.photo_url} alt={`preview-${index}`} />
          </div>
        ))}

        <label htmlFor={id}>
          <ReactSVG src="./camera.fill.svg" />
          <span>Добавить фотографию</span>
        </label>
      </div>
    </div>
  );
};

export default AddFoto;
