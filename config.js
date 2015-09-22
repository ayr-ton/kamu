module.exports = {
  environments: {
  	development: { apiEndpoint: 'http://localhost:8080' },
  	staging:     { apiEndpoint: 'http://staging-twlib-api.herokuapp.com' },
  	qa:          { apiEndpoint: 'http://qa-twlib-api.herokuapp.com' },
  	production:  { apiEndpoint: 'http://twlib-api.herokuapp.com' }
  }
};