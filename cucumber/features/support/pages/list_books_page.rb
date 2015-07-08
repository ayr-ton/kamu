require 'page-object'

class ListBooksPage

  include PageObject

  table(:book_table, :class => 'ng-isolate-scope')

  page_url 'http://tw-library-ui.herokuapp.com/'
  
  def get_book_list_data
  	sleep 1
  	return book_table_element.text
  end

  def get_book_list_total
  	sleep 1
  	return book_table_element.count
  end

end