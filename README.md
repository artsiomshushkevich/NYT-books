NYT Books
===

### This simple web application is written for studying *MEAN* stack which is used for developing full-stack web applications.
### Data for the application is retrieved via [The New Yourk Times Books API](https://developer.nytimes.com/books_api.json).


===
###Downloading application:

1. Download/clone a repository [NYT-books](https://github.com/artsiomshushkevich/NYT-books.git)
2. Run in the root directory of the application `npm install`
===

###How to run client-side application:

1. Go into `/client/src` directory
2. Run `gulp start`

> If you don't have ***npm or node.js*** installed on your local machine, please, wisit [Getting started page](https://docs.npmjs.com/getting-started) and follow the instructions.

> If you don't have `gulp` as global dependecy, run `npm install -g gulp-cli`.
> Here's couple of commads for the client-side application:

> 1. `gulp start` - deploys application on local server(port 8085) and starts javascript- and sass-watchers
> 2. `gulp server` - deploys application on local server(port 8085)
> 3. `gulp watch` - starts watching all the changes of files with extensions `.js` and `.scss` in `app/` directory
> 4. `gulp scripts` - concats and minifies all the external files and files from `app/` directory (files have .js extension) and places result file to `public/js/` directory
> 5. `gulp styles` - compiles `.scss` files to `.css`, minifies and places result file to `public/css/` directory

===

###How to run server-side application

1. Go to `/server/src` directory
2. Deploy local mongo database (usually run `mongod` command)
2. Run `node server.js`

>For successful running server-side application `Python 2.x` is required on your local machine. If you don't have Python 2.x, please, visit [Python downloading page](https://www.python.org/downloads/)
>Also you have to install `node-gyp`(run `npm install -g node-gyp`)
>And finally install monogodb database on your local machine. Visit [Mongodb installation page](https://docs.mongodb.com/manual/installation/?jmp=footer)
===

###Current functionality:

- Home page
  - Register
  - Log in
- Books page
  - Displaying books by their topic
  - Changing topic
  - Adding chosen book to favorites (data will be stored in cookies)
  - Deleting сhosen book from favorites
  - Deleting all favorites
  - Displaying book on the Amazon
  - Update user's profile
- Favorites page
  - Displaying favorites
  - Displaying addition info about the book
  - Deleting chosen book from favorites
  - Update user's profile
  
  
