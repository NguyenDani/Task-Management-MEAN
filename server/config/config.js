const token = localStorage.getItem('token');

fetch('/api/some-protected-route', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'x-auth-token': token
  }
})
.then(response => {
  if (response.ok) {
    return response.json();
  } else {
    throw new Error('Network response was not ok.');
  }
})
.then(data => {
  console.log(data);
})
.catch(error => {
  console.error('Error:', error.message);
});
