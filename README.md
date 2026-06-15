# Romantic Date Invitation

A mobile-friendly date-night invitation that lets your girlfriend choose a date,
time, food, and film. Her choices are placed into a prepared email for her to
send back to you.

## Personalize it

Open `script.js` and edit the `SETTINGS` block at the very top:

```js
const SETTINGS = {
  girlfriendName: "Her Name",
  senderName: "Your Name",
  recipientEmail: "you@example.com",
  emailSubject: "My choices for our date night",
  invitationMessage: "Your personal message here."
};
```

Replace `assets/couple-photo.jpg` with your own photo. Use that exact filename,
or update the image path in `index.html`. A styled placeholder appears if the
photo is missing.

Food and film cards can be changed directly in `index.html`. Keep a unique
`data-value` on each card.

## Preview

You can double-click `index.html` to preview it. For the most accurate preview,
run a local web server from this folder:

```powershell
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Publish with GitHub Pages

1. Create a public GitHub repository. Do not add private information you do not
   want to make public.
2. Push these files to the repository's default branch (usually `main`).
3. On GitHub, open **Settings**, then **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select your default branch and `/ (root)`, then click **Save**.
6. GitHub will show the public link when deployment finishes. It normally looks
   like `https://YOUR-USERNAME.github.io/REPOSITORY-NAME/`.

## How replies work

The final button uses a `mailto:` link. It opens the visitor's configured email
app with the date-night choices filled in. She must still press **Send** in that
app. No form data is stored by this website.
