# Animal crossing utility

This is web application made with React JS and Express JS, for people who want maximize profits in [Animal crossing: New Horizons](https://www.google.com/search?gs_ssp=eJzj4tVP1zc0zDCOtzCySDcyYPSSSczLzE3MUUguyi8uzsxLV8hLLVfIyC_KrMrPKwYANkQPCw&q=animal+crossing+new+horizons&rlz=1C5CHFA_enCA856CA856&oq=animal+crossing+new+&aqs=chrome.2.69i59j69i57j46j69i59j0l3j69i60.9411j0j7&sourceid=chrome&ie=UTF-8). It displays a list of all the currently obtainable fish and insects in real time, and by default is sorted by sale price in descending order. In addition to the price being displayed, their species, how to get (location) and the time left to obtain it will also be shown. The user will also be click on any record in the list to view more information about any given creature.

## Requirements

- Node Js and npm are installed and your active node installation is < v12.0.0
- Gulp is installed globally ('npm install -g gulp'. Your local gulp version, in client/ should be < v4.0)

## Initial setup
1. On your local mysql server, crearte a schema called animal_crossing
2. Then go into api/sql_scrpts and run the ddl and dml scripts (in that order)
3. Change the api/bin/www.js file and the api/models/db.js file to match the mysql connection configurations of your local server
4. Open a terminal/cmd window & navigate to the root of this repository
5. cd api/
6. npm install (Install the node modules)
7. npm start (Start the api server)
8. Open a new terminal/cmd window in the root of this repo
9. cd client/
10. npm install
11. npm start (Start the client build)
12. The web page should open automatically
