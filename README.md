1. `cd` into your folder
2. create "package.json" via npm with `npm init` and follow the instructions
3. install "express" with `npm i --save express`
4. duplicate the `.env-sample`, rename it to `.env` and replace the variables values
5. install "nodemon" so you don't have to restart the server on every change with `npm i -g nodemon`
6. run the app with `nodemon`

<!-- Google Login -->
1. Visit https://console.developers.google.com
2. Create a project
3. Click "Enable API and Services"
4. Enable "Google+ API"
5. Create Credentials: API = Google+ API, Where from = Web Server, what? User data
6. Set up Consent Screen
7. Create Credentials
8. Add authorized redirect URIs: http://localhost:3000/google/redirect
