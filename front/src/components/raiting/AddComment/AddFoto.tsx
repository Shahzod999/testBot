import { useState } from "react";
import Cross from "./Cross";

const AddFoto = () => {
  const [error, setError] = useState("");
  const [imagesArray, setimagesArray] = useState<any>([]);

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
        setimagesArray((prev: any) => [...prev, reader.result]);
        console.log(reader.result);
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
        id="addFoto__img"
        onChange={(e) => {
          handleImagePreview(e);
        }}
      />

      <p className="errorText">{error}</p>

      <div className="addFoto__imagesArray">
        {imagesArray.map((item: any) => (
          <div className="addFoto__imagesArray__img">
            <div className="addFoto__imagesArray__img__cross">
              <Cross toggleComment={() => toggleSomething(item)} />
            </div>
            <img src={item} alt="" />
          </div>
        ))}

        <label htmlFor="addFoto__img">
          <img src="./camera.fill.svg" alt="" />
          <span>Добавить фотографию</span>
        </label>
      </div>
    </div>
  );
};

export default AddFoto;
