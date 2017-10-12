# HRS Blog

### Directions

You are to create a very basic blogging web app using the included AngularJS project and the REST API at https://jsonplaceholder.typicode.com. Visit this link for information about using the API.

Requirements:
- Displaying existing blog posts
- Creating a new blog post

You don't need to bother with any other features that would normally exist if this was a real application, such as authentication.

As you will see, only one API endpoint needs to be used for the blog features: `https://jsonplaceholder.typicode.com/posts`. The userId field in the posts can be ignored.

One stubbed page has been provided here (`home.js` and `home.html`), but you're encouraged to create any additional files and Angular entities (factories, services, controllers, templates) as you see fit for organizing the application in a way that is well-designed and forward-looking.

Bootstrap has been included in the project, but the UI can be as simple or as fancy as you'd like.

Note that the API won't return any new posts you create (since it returns fake data). So instead, you should find a way to display the new post on the page after getting a successful response from posting it to the API.

Lastly, treat the above as guidelines rather than strict requirements. If anything here is vague or if you want to get creative, please feel free to use your judgement.

---

## Usage

### Requirements

Manually install the following first:

- npm v5.x

### Setup

Install dependencies:

    npm install

### Run

Compile and run the app in a browser, with automatic reloading when you modify the source code:

    npm run dev

### Test

Run tests in the console:

    npm test

Run tests in Chrome:

    npm run test-browser
