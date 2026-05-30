export const createPhoto = (formData) => {
  return fetch(`http://localhost:8000/api/photos`, {
    method: "POST",
    headers: {
      //Don't need content-type
             Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
    },
    body: formData,
  }).then((res) => {
    if (!res.ok) {
      const error = new Error("Photo upload failed");
      error.status = res.status;
      throw error;
    }
    return res.json();
  });
};

export const deletePhoto = (photoId) => {
  return fetch(`http://localhost:8000/api/photos/${photoId}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: "Token " + JSON.parse(localStorage.getItem("WanderLens_token")).token,
    },
  }).then((res) => {
    if (!res.ok) {
      const error = new Error("Photo delete failed");
      error.status = res.status;
      throw error;
    }
    return res;
  });
};