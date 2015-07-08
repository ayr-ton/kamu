require 'json'

When(/^the user visits the Book List Page$/) do
  visit_page ListBooksPage
end

Given(/^there is no registered books on the Library System$/) do
end

Given(/^there are registered books on the Library System$/) do
  @file = File.read('features/support/data/book.json')
  RestAssured::Double.create(fullpath: '/books',
                 content: @file,
                 verb: 'GET',
                 response_headers: { 
                    'Content-Type' => 'application/json',
                    'Access-Control-Allow-Origin' => '*' 
                  })
end

Then(/^the user should not see any book$/) do
  total_listed_books = 0
  on_page ListBooksPage do |page|
    total_listed_books = page.get_book_list_total
  end
  expect(total_listed_books).to eq(1)
end

Then(/^the user should see a list with id, title, authors and status of all registered books$/) do
  listed_books = ""
  total_listed_books = 0
  on_page ListBooksPage do |page|
    listed_books = page.get_book_list_data
    total_listed_books = page.get_book_list_total
  end
  book_data = JSON.parse(@file)
  expect(listed_books).to include(book_data['_embedded']['books'][0]['title'] + " " + 
                                  book_data['_embedded']['books'][0]['author'] + " " + 
                                  book_data['_embedded']['books'][0]['status'])
  expect(total_listed_books).to eq(2)
end