import React, { useEffect } from "react";

const CloudinaryUploadWidget = () => {
  useEffect(() => {
    const cloudName = "dy5msftwe"; // replace with your own cloud name
    const uploadPreset = "tqcoo913"; // replace with your own upload preset

    var myWidget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        // cropping: true, //add a cropping step
        // showAdvancedOptions: true,  //add advanced options (public_id and tag)
        // sources: [ "local", "url"], // restrict the upload sources to URL and local files
        multiple: false,  //restrict upload to a single file
        // folder: "user_images", //upload files to the specified folder
        // tags: ["users", "profile"], //add the given tags to the uploaded files
        // context: {alt: "user_uploaded"}, //add the given context data to the uploaded files
        // clientAllowedFormats: ["images"], //restrict uploading to image files only
        // maxImageFileSize: 2000000,  //restrict file size to less than 2MB
        // maxImageWidth: 2000, //Scales the image down to a width of 2000 pixels before uploading
        // theme: "purple", //change to a purple theme
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          console.log("Done! Here is the image info: ", result.info);
          document
            .getElementById("uploadedimage")
            .setAttribute("src", result.info.secure_url);

            document.getElementById("images").value= result.info.secure_url;
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