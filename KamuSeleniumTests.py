from selenium import webdriver
from selenium.common.exceptions import NoSuchElementException

from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from selenium.webdriver.common.by import By

import unittest


class KamuSeleniumTests(unittest.TestCase):
    @classmethod
    def setUp(cls):
        cls.driver = webdriver.Chrome()
        # self.driver = webdriver.Firefox()
        cls.driver.get("http://localhost:8000")
        assert "Log in | Kamu administration" in cls.driver.title

    def testAcessLibrarie(self):

        self.login()

        self.acessLibrarie("/bh")

        time_wait = 10
        wait = WebDriverWait(self.driver, time_wait)

        WebDriverWait(self.driver, self.page_has_loaded)

        # Assert
        book_list = wait.until(lambda driver: driver.find_element_by_class_name("book-list"))
        books_librarie_elements = wait.until(lambda driver: book_list.find_elements_by_class_name("book"))
        self.assertIsNotNone(books_librarie_elements)

    def testBorrowBook(self):

        time_wait = 10
        wait = WebDriverWait(self.driver, time_wait)

        self.login()

        self.acessLibrarie("/bh")

        # 1
        # book_list = self.driver.find_element_by_class_name("book-list")
        # books = book_list.find_elements_by_class_name("book")
        # # bookBorrowed = 0
        # for actionBorrow in books:
        #     if actionBorrow.text == "Borrow":
        #         actionBorrow.click()
        #         # var = bookBorrowed + 1
        #     self.assertIn("Return", actionBorrow.text())
        #     assert "Return" in actionBorrow.text()

        # 2
        # action_borrow_xpath = "//span[contains(text(), 'Borrow')]"
        # actionBorrow = wait.until(EC.visibility_of_element_located((By.XPATH, action_borrow_xpath)))
        # actionBorrow.click()

        # 3
        buttons_books = wait.until(EC.visibility_of_all_elements_located((By.TAG_NAME, "button")))
        # actionBorrow = buttons_books.text == "Borrow"
        for buttonElement in buttons_books:
            if buttonElement.text == "Borrow":
                buttonElement.click()
                self.AssertIn("Return", buttonElement.text())
                wait.until(EC.text_to_be_present_in_element(buttonElement, 'Return'))
                
        # self.assertFalse("Borrow", self.driver.page_source)

    def testReturnBook(self):

        time_wait = 10
        wait = WebDriverWait(self.driver, time_wait)

        self.login()

        self.acessLibrarie("/bh")

        # action_return_xpath = "//span[contains(text(), 'Return')]"
        # actionReturn = wait.until(EC.visibility_of_element_located((By.XPATH, action_return_xpath)))
        # actionReturn.click()

        buttons_books = wait.until(EC.visibility_of_all_elements_located((By.TAG_NAME, "button")))
        for buttonElement in buttons_books:
            if buttonElement.text == "Borrow":
                buttonElement.click()
                # self.AssertIn("Borrow", buttonElement.text())
                # wait.until(EC.text_to_be_present_in_element(buttonElement, 'Borrow'))
                
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

        driver = self.driver

        self.assertIn("Log in | Kamu administration", self.driver.title)

        kamu_username = "selenium_tests"
        kamu_password = "selenium_10"
        time_wait = 10
        wait = WebDriverWait(driver, time_wait)

        username_field_id = "id_username"
        password_field_id = "id_password"
        login_button_xpath = "//input[@type='submit']"
        kamu_logo_xpath = "//img[contains(@src,'logo')]"

        usernameFieldElement = wait.until(EC.visibility_of_element_located((By.ID, username_field_id)))
        passwordFieldElement = wait.until(EC.visibility_of_element_located((By.ID, password_field_id)))
        loginButtonElement = wait.until(EC.visibility_of_element_located((By.XPATH, login_button_xpath)))

        usernameFieldElement.clear()
        usernameFieldElement.send_keys(kamu_username)
        passwordFieldElement.clear()
        passwordFieldElement.send_keys(kamu_password)
        loginButtonElement.click()

        wait.until(EC.visibility_of_element_located((By.XPATH, kamu_logo_xpath)))

    def acessLibrarie(self, librarie):
        time_wait = 10
        wait = WebDriverWait(self.driver, time_wait)
        librarie_link_xpath = "//a[contains(@href, '" + librarie + "')]"
        librarieLinkElement = wait.until(EC.visibility_of_element_located((By.XPATH, librarie_link_xpath)))
        librarieLinkElement.click()

        WebDriverWait(self.driver, self.page_has_loaded)

    def page_has_loaded(self):
        self.log.info("Checking if {} page is loaded.".format(self.driver.current_url))
        page_state = self.driver.execute_script('return document.readyState;')
        return page_state == 'complete'


if __name__ == '__main__':
    unittest.main(verbosity=2)
