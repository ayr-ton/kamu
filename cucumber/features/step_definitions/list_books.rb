When(/^the user visits the Book List Page$/) do
	visit_page ListBooksPage
end

Given(/^there is no registered books on the Library System$/) do
	estabilish_connection;
	Book.delete_all
end

Given(/^there are registered books on the Library System$/) do
	estabilish_connection;
	Book.delete_all
	@book1 = Book.create!(title: 'The Secrets of Consulting: A Guide to Giving and Getting Advice Successfully', 
						  author: 'Gerald Weinberg', status: 'BORROWED', id: 1)
	@book2 = Book.create!(title: 'Racismo no Brasil', 
						  author: 'Cidinha da Silva', status: 'AVAILABLE', id: 2)
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
	expect(listed_books).to include(@book1.title + " " + @book1.author + " " + @book1.status)
	expect(listed_books).to include(@book2.title + " " + @book2.author + " " + @book2.status)
	expect(total_listed_books).to eq(3)
end