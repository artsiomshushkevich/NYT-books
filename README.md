NYT Books
===

### This simple web application is written for stutying *AngularJs 1.x* framework which is used for developing single-page applications.
### Data for the application is retrieved via [The New Yourk Times Books API](https://developer.nytimes.com/books_api.json)

How to run this application:

1. Download/clone a repository [NYT-books](https://github.com/artsiomshushkevich/NYT-books.git)
2. Run in the root directory of the application `npm install`
3. Run `gulp start` (it will create local server on 8085 port)

Current functionality:
- Books page
  - Displaying books by their topic
  - Changing topic
  - Adding chosen book to favorites (data will be stored in cookies)
  - Deleting сhosen books from favorites
  - Deleting all favorites
  - Displaying a book on the Amazon
- Favorites page
  - Displaying favorites
  - Displaying addition info about the book
  - Deleting chosen book from favorites
  
  
