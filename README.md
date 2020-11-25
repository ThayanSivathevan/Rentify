Install node js https://nodejs.org/en/download/
Install wamp server
Install mysql workbench

git clone https://github.com/ThayanSivathevan/Rentify.git or download zip in folder


open up mysql workbench and turn on wamp server , connect to localhost 3306, and 
create a database schema called rentify then import rentify.sql from the rentify folder -> go to servers-> data import-> navigate to your folder and import rentify.sql


open keys/key.js and change the password and username if different

open up command prompt, navigate to folder, run command npm install package.json
node app.js to start the node js backend

open up another command prompt and navigate to the client folder
npm install package.json
npm start to start the react frontend
Site should open up on default browser
