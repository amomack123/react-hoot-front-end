const BASE_URL = `${import.meta.env.VITE_EXPRESS_BACKEND_URL}/hoots`;

const index = async () => {
    try {
        const res = await fetch(BASE_URL, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
        });
        return res.json();
    } 
    catch (error) {
      console.log(error);
    }
};

const show = async (hootId) => {
    try {
      const res = await fetch(`${BASE_URL}/${hootId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` },
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const create = async (hootFormData) => {
    try {
      const res = await fetch(BASE_URL, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(hootFormData),
      });
      return res.json();
    } catch (error) {
      console.log(error);
    }
  };

  const createComment = async (hootId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}/comments`, {
            method: 'POST',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });
        return res.json();
    } 
    catch (error) {
        console.log(error);
    }
};

const updateComment = async (hootId, commentId, commentFormData) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}/comments/${commentId}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(commentFormData),
        });

        const updatedComment = await res.json();
        
        // Ensure author field is included, if not from the response, merge from the existing data
        return { ...updatedComment, author: updatedComment.author || { username: 'Unknown User' } };
    } 
    catch (error) {
        console.log(error);
    }
};

const deleteComment = async (hootId, commentId) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } 
    catch (error) {
        console.log(error);
    }
};

const deleteHoot = async (hootId) => {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: 'DELETE',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        });
        return res.json();
    } 
    catch (error) {
        console.log(error);
    }
};

async function update(hootId, hootFormData) {
    try {
        const res = await fetch(`${BASE_URL}/${hootId}`, {
            method: 'PUT',
            headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/json',
            },
            body: JSON.stringify(hootFormData),
        });
        return res.json();
    }
    catch (error) {
      console.log(error);
    }
}
  
  
export { index, show, create, createComment, deleteHoot, update, updateComment, deleteComment};