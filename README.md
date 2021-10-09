## For Debugging on Chrome you will need this config file
Save it in /.vscode as launch.json 
* Try Debug (Ctrl+Shift+D) and use option to create a config file, copy the below code and save it.
* To start with debugging, make sure you are running  the server (npm start) and then press F5.
* Refresh the page that load, Now you are ready to do Debugging in VS Code.


```json
{
"version": "0.2.0",
"configurations": [
{
"type": "pwa-chrome",
"request": "launch",
"name": "Launch Chrome against localhost",
"url": "http://localhost:3000",
"webRoot": "${workspaceFolder}"
}
]
}
```

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
