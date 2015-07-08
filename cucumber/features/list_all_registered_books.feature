# Story: List all registered books

Feature: As a library user, I want to view a list with id, title, authors and status of all registered books, So that I can know what books are registered on the Library

Scenario: Display an empty book list
  Given there is no registered books on the Library System
  When the user visits the Book List Page
  Then the user should not see any book

Scenario: Display a list of all books registered on the Library System
  Given there are registered books on the Library System 
  When the user visits the Book List Page
  Then the user should see a list with id, title, authors and status of all registered books