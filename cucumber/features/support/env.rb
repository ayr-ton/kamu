require 'selenium-webdriver'
require 'page-object'
require 'rest-assured'

World PageObject::PageFactory

Before do
	case ENV['BROWSER']
	when 'chrome'
		@browser = Selenium::WebDriver.for :chrome
	when 'firefox'
		@browser = Selenium::WebDriver.for :firefox
	else
		@browser = Selenium::WebDriver.for :chrome		
	end	
	RestAssured::Server.start(database: ':memory:')
end

After do
  @browser.close
end

