NYT Books
===

### This simple web application is written for studying *AngularJs 1.x* framework which is used for developing single-page applications.
### Data for the application is retrieved via [The New Yourk Times Books API](https://developer.nytimes.com/books_api.json).

===

###How to run this application:

1. Download/clone a repository [NYT-books](https://github.com/artsiomshushkevich/NYT-books.git)
2. Run in the root directory of the application `npm install`
4. Run `gulp scripts`
5. Run `gulp styles`
3. Run `gulp start`

> If you don't have ***npm or node.js*** installed on your local machine, please, wisit [Getting started page](https://docs.npmjs.com/getting-started) and follow the instructions.

> If you don't have `gulp` as global dependecy, run `npm install -g gulp-cli`.
> Here's couple of commads for the application:

> 1. `gulp start` - deploys application on local server(port 8085) and starts javascript- and sass-watchers
> 2. `gulp server` - deploys application on local server(port 8085)
> 3. `gulp watch` - starts watching all the changes of files with extensions `.js` and `.scss` in `app/` directory
> 4. `gulp scripts` - concats and minifies all the external files and files from `app/` directory (files have .js extension) and places result file to `public/js/` directory
> 5. `gulp styles` - compiles `.scss` files to `.css`, minifies and places result file to `public/css/` directory

===

###Unit testing

If you want to run unit test, run `karma start`.

> If **karma** isn't installed as global dependency, please, run `npm install -g karma`

===

###Current functionality:

- Books page
  - Displaying books by their topic
  - Changing topic
  - Adding chosen book to favorites (data will be stored in cookies)
  - Deleting сhosen book from favorites
  - Deleting all favorites
  - Displaying book on the Amazon
- Favorites page
  - Displaying favorites
  - Displaying addition info about the book
  - Deleting chosen book from favorites
  
  
