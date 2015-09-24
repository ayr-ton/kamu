module.exports = function () {
  var self, form, username, password;
  self = {};

  form = function () { return browser.driver.findElement(By.css('form')); }
  username = function () { return form().findElement(By.id('username')); }
  password = function () { return form().findElement(By.id('password')); }

  self.login = function (name) {
    browser.ignoreSynchronization = true;
    browser.get('http://localhost:9000/test/login');

    username().sendKeys(name);
    password().sendKeys('any')
    form().submit();

    browser.ignoreSynchronization = false;
  }

  return self;
};
