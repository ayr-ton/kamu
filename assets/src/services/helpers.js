function getCookie(name) {
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
}

export default function fetchFromAPI(endpoint, method = 'GET') {
  const csrftoken = getCookie('csrftoken');
  const options = {
    method,
    credentials: 'include',
    headers: new Headers({
      'X-CSRFToken': csrftoken,
    }),
  };

  const url = endpoint.substring(0, 1) === '/' ? `/api${endpoint}` : endpoint;
  return fetch(url, options).then((response) => response.json());
}
