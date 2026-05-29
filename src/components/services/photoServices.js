const API_BASE = "http://localhost:8000";

const getAuthHeaders = () => ({
  Authorization: `Token ${localStorage.getItem("auth_token")}`,
});

export const createPhoto = (formData) => {
  return fetch(`${API_BASE}/photos/`, {
    method: "POST",
    headers: {
      ...getAuthHeaders(),
      // NOTE: Do NOT set Content-Type — the browser sets it automatically
      // for FormData (with the multipart boundary). Setting it manually breaks the upload.
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
  return fetch(`${API_BASE}/photos/${photoId}`, {
    method: "DELETE",
    headers: getAuthHeaders(),
  }).then((res) => {
    if (!res.ok) {
      const error = new Error("Photo delete failed");
      error.status = res.status;
      throw error;
    }
    return res;
  });
};