import { useState } from "react";
import Cross from "./Cross";

interface addFotoProps {
  imagesArray: string[];
  setimagesArray: (images: string[]) => void;
  id: string;
}

const AddFoto = ({ imagesArray, setimagesArray, id }: addFotoProps) => {
  const [error, setError] = useState("");

  const handleImagePreview = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        setError("File is too large");
        return;
      }
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setimagesArray([...imagesArray, reader.result as string]);
      };
      reader.onerror = (error) => {
        console.log("Error: ", error);
      };
    }
  };

  const toggleSomething = (id: string) => {
    const newArray = imagesArray.filter((item: string) => item !== id);
    setimagesArray(newArray);
  };

  return (
    <div className="addFoto">
      <h2>Добавить фотографию</h2>

      <input
        accept="image/*"
        type="file"
        id={id}
        onChange={(e) => {
          handleImagePreview(e);
        }}
      />

      <p className="errorText">{error}</p>

      <div className="addFoto__imagesArray">
        {imagesArray?.map((item: string, index: number) => (
          <div className="addFoto__imagesArray__img" key={index}>
            <div className="addFoto__imagesArray__img__cross">
              <Cross toggleComment={() => toggleSomething(item)} />
            </div>
            <img src={item} alt="" />
          </div>
        ))}

        <label htmlFor={id}>
          <img src="./camera.fill.svg" alt="" />
          <span>Добавить фотографию</span>
        </label>
      </div>
    </div>
  );
};

export default AddFoto;