const getCookie = (name) => {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i += 1) {
      const cookie = cookies[i].trim();

      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) === (`${name}=`)) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
};

const fetchFromAPI = async (endpoint, method = 'GET') => {
  const csrftoken = getCookie('csrftoken');
  const options = {
    method,
    credentials: 'include',
    headers: new Headers({
      'X-CSRFToken': csrftoken,
    }),
  };

  const url = endpoint.substring(0, 1) === '/' ? `/api${endpoint}` : endpoint;

  try {
    const response = await fetch(url, options);
    if (response.type === 'error' || !response.ok) {
      throw new Error(response.statusText);
    }

    return response.json();
  } catch (error) {
    throw new Error(error);
  }
};

export default fetchFromAPI;
