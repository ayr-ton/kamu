require 'selenium-webdriver'
require 'page-object'

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
end

After do
  @browser.close
end

