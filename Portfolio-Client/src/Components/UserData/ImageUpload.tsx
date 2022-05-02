import axios from "axios";
import React, { useState } from "react";
import { useStoreSelector } from "../../Store";

export default function ImageUpload() {
  var userToken = useStoreSelector((state) => state.auth.userToken);
  var userBearerToken = useStoreSelector((state) => state.auth.bearerToken);

  const [file, setFile] = useState<File>();

  const saveFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files![0]);
  };

  const uploadFile = async () => {
    if (file) {
      const formData = new FormData();
      formData.append("imageFile", file);
      axios
        .post(
          `/api/UserData/EditUserProfilePicture?jwt=${userToken}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${userBearerToken}`,
            },
          }
        )
        .then((res) => {
          alert("file uploaded");
        })
        .catch((err) => {
          alert("file upload failed");
        });
    } else {
      alert("no file selected");
    }
  };

  return (
    <div className="container">
      <input
        className="form-control my-2 mx-auto"
        type="file"
        accept="image/*"
        onChange={saveFile}
      />
      <div className="my-2">
        <button
          className="btn btn-dark"
          type="submit"
          value="Submit"
          onClick={uploadFile}
        >
          Submit
        </button>
      </div>
    </div>
  );
}
