import { useState } from "react";

export default function PreviewImage({ file }) {
  const [preview, setPreview] = useState({});
  if (file) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setPreview(reader.result);
    };
  }
  return (
    <div>
      <img
        style={{ borderRadius: "50%", width: "200px", height: "200px" }}
        src={preview}
        alt={"imagePreview"}
      />
    </div>
  );
}
