# Ecoleta

## How to start a node server
After installing Node.js and NPM (comes in the same intallation process - nodejs.org):
1. In the project folder: `npm init -y`<br>
2. Then install express: `npm intall express`
3. In src folder create a file named server.js (the name choice isn't mandatory), and import express, execute it and start the server, like this:
```javascript
const express = require("express") // import from node_modules folder installed in the step 1
const server = espress()

server.listen(3000) // start node server in this port
```
4. Then, in the folder where `server.js` is located: `npm server.js`.


### Nodemom
To watch automatically the changes made on js.<br>
Install: `npm install nodemon`<br>
Change package.json, and in the scripts section create: `"start": "nodemon src/server.js"`.<br>
Then, just use: `npm start` instead of `npm server.js`.<br>

### Template engine - Nunjuks
`npm install nunjucks`<br>

