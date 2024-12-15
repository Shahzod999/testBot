import Cross from "./Cross";
import { ReactSVG } from "react-svg";

interface AddFotoProps {
  imagesArray: File[];
  setimagesArray: React.Dispatch<React.SetStateAction<File[]>>;
  id: string;
}

const AddFoto = ({ imagesArray, setimagesArray, id }: AddFotoProps) => {
  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setimagesArray((prev: File[]) => [...prev, ...Array.from(files)]);
    }
  };

  const removeImage = (index: number) => {
    setimagesArray((prev: File[]) => prev.filter((_, i) => i !== index));
  };

  return (
    <div className="addFoto">
      <h2>Добавить фотографию</h2>

      <input
        accept="image/*"
        type="file"
        id={id}
        onChange={handleImagePreview}
      />

      <div className="addFoto__imagesArray">
        {imagesArray.map((file, index) => (
          <div className="addFoto__imagesArray__img" key={index}>
            <div className="addFoto__imagesArray__img__cross">
              <Cross toggleComment={() => removeImage(index)} />
            </div>
            <img src={URL.createObjectURL(file)} alt={`preview-${index}`} />
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
