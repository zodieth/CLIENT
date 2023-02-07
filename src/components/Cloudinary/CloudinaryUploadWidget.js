import { useEffect } from "react";

const CloudinaryUploadWidget = ({ onSuccess }) => {
  useEffect(() => {
    const cloudName = "dy5msftwe"; // replace with your own cloud name
    const uploadPreset = "tqcoo913"; // replace with your own upload preset

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        multiple: false,  //restrict upload to a single file
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          onSuccess(result.info.secure_url);
        }
      }
    );
    document.getElementById("upload_widget").addEventListener(
      "click",
      function (e) {
        e.preventDefault();
        myWidget.open();
      },
      false
    );
  }, []);

  return (
    <button id="upload_widget" className="cloudinary-button">
      Subir
    </button>
  );
};

export default CloudinaryUploadWidget;