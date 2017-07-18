import unittest
import configparser

from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException
from selenium.webdriver.common.by import By
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.support.ui import WebDriverWait


class Selenium(unittest.TestCase):

    @classmethod
    def setUp(cls):
        global time_wait
        time_wait = 10

        global config
        config = configparser.RawConfigParser()
        config.read('data.props')

        cls.driver = webdriver.Chrome()
        cls.driver.get(config.get('urls', 'url_local'))
        assert "Log in | Kamu administration" in cls.driver.title

        global wait
        wait = WebDriverWait(cls.driver, time_wait)

    def testAcessLibrarie(self):
        self.login()
        self.acessLibrarie(config.get('libraries', 'bh'))
        wait
        WebDriverWait(self.driver, self.page_has_loaded)
        book_list = wait.until(lambda driver: driver.find_element_by_class_name("book-list"))
        books_librarie_elements = wait.until(lambda driver: book_list.find_elements_by_class_name("book"))
        self.assertIsNotNone(books_librarie_elements)
        wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "book")))

    def testBorrowBook(self):
        self.login()
        self.acessLibrarie(config.get('libraries', 'bh'))
        wait
        wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "book")))
        buttons_books = wait.until(EC.presence_of_all_elements_located((By.TAG_NAME, "button")))
        for buttonElement in buttons_books:
            if buttonElement.text == "BORROW":
                buttonElement.click()
                wait.until(lambda driver: "RETURN" in buttonElement.text)
                self.assertEqual(buttonElement.text, "RETURN")
                break

    def testReturnBook(self):
        self.login()
        self.acessLibrarie(config.get('libraries', 'bh'))
        wait
        wait.until(EC.presence_of_all_elements_located((By.CLASS_NAME, "book")))
        buttons_books = wait.until(EC.presence_of_all_elements_located((By.TAG_NAME, "button")))
        for buttonElement in buttons_books:
            if buttonElement.text == "RETURN":
                buttonElement.click()
                wait.until(lambda driver: "BORROW" in buttonElement.text)
                self.assertEqual(buttonElement.text, "BORROW")
                break

    @classmethod
    def tearDown(cls):
        cls.driver.quit()

    def is_element_present(self, how, what):
        """
        Helper method to confirm the presence of an element on page
        :params how: By locator type
        :params what: locator value
        """
        try:
            self.driver.find_element(by=how, value=what)
        except NoSuchElementException:
            return False
        return True

    def login(self):
        self.assertIn("Log in | Kamu administration", self.driver.title)
        wait
        username_field_id = "id_username"
        password_field_id = "id_password"
        login_button_xpath = "//input[@type='submit']"
        kamu_logo_xpath = "//img[contains(@src,'logo')]"

        usernameFieldElement = wait.until(EC.visibility_of_element_located((By.ID, username_field_id)))
        passwordFieldElement = wait.until(EC.visibility_of_element_located((By.ID, password_field_id)))
        loginButtonElement = wait.until(EC.visibility_of_element_located((By.XPATH, login_button_xpath)))

        usernameFieldElement.clear()
        usernameFieldElement.send_keys(config.get('login', 'kamu_username'))
        passwordFieldElement.clear()
        passwordFieldElement.send_keys(config.get('login', 'kamu_password'))
        loginButtonElement.click()

        wait.until(EC.visibility_of_element_located((By.XPATH, kamu_logo_xpath)))

    def acessLibrarie(self, librarie):
        wait = WebDriverWait(self.driver, time_wait)
        librarie_link_xpath = "//div[contains(text(), '" + librarie + "')]"
        librarieLinkElement = wait.until(EC.visibility_of_element_located((By.XPATH, librarie_link_xpath)))
        librarieLinkElement.click()
        WebDriverWait(self.driver, self.page_has_loaded)

    def page_has_loaded(self):
        self.log.info("Checking if {} page is loaded.".format(self.driver.current_url))
        page_state = self.driver.execute_script('return document.readyState;')
        return page_state == 'complete'


if __name__ == '__main__':
    unittest.main(verbosity=2)
