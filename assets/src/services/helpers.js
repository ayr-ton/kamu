export function fetchFromAPI(endpoint, method = 'GET') {
	const csrftoken = getCookie('csrftoken');
	const options = { 
		method, 
		credentials: 'include',
		headers: new Headers({
			'X-CSRFToken': csrftoken
		})
	};

	return fetch('/api' + endpoint, options).then(response => {
		return response.json();
	});
}

function getCookie(name) {
	var cookieValue = null;
	if (document.cookie && document.cookie !== '') {
		var cookies = document.cookie.split(';');
		for (var i = 0; i < cookies.length; i++) {
			var cookie = cookies[i].trim();

			// Does this cookie string begin with the name we want?
			if (cookie.substring(0, name.length + 1) === (name + '=')) {
				cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
				break;
			}
		}
	}
	return cookieValue;
}