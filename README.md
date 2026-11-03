# Fetch Lab — JavaScript API Assignment

A responsive beginner-friendly web app that fetches user data from a public API and displays it dynamically on the page.

## Assignment requirements covered

- Uses JavaScript `fetch()` with `async` / `await` to request API data.
- Displays the returned data dynamically as user cards.
- Includes a **Load Data** button that starts the API request when clicked.
- Shows a loading state while the request is in progress.
- Handles request errors with a clear message and a **Try again** button.
- Uses the JSONPlaceholder Users API. No API key is required.

## Files

- `index.html` — page structure and accessible status areas.
- `style.css` — responsive page styling.
- `script.js` — API request, error handling, and dynamic rendering.

## API used

`https://jsonplaceholder.typicode.com/users`

JSONPlaceholder is a free fake REST API for testing and learning. The user details are sample data, not real contacts.

## Run the project

1. Keep all three files (`index.html`, `style.css`, and `script.js`) in the same folder.
2. Open the folder in Visual Studio Code.
3. Run `index.html` using the Live Server extension, or publish the folder with GitHub Pages.
4. Click **Load Data**. The user cards should appear after the API responds.

An internet connection is required because the data is fetched from an online API.

## Upload to GitHub

Create a new **Public** repository on GitHub. A suggested repository name is `javascript-fetch-api-assignment`.

Open Command Prompt in this project folder and run these commands one at a time:

```bash
git init
git add .
git commit -m "Build JavaScript API fetch assignment"
git branch -M main
git remote add origin https://github.com/Fametee-tech/javascript-fetch-api-assignment.git
git push -u origin main
```

If Git says `remote origin already exists`, update the existing remote instead:

```bash
git remote set-url origin https://github.com/Fametee-tech/javascript-fetch-api-assignment.git
git push -u origin main
```

## Publish with GitHub Pages

1. Open the repository on GitHub and select **Settings**.
2. Select **Pages** from the left menu.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Select branch `main` and folder `/(root)`, then click **Save**.
5. Wait for GitHub Pages to finish deploying. The expected URL is:

`https://fametee-tech.github.io/javascript-fetch-api-assignment/`

The live link works after the repository has been pushed and the Pages deployment has succeeded.
