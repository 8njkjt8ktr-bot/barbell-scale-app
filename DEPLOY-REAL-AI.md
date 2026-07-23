# Upload and connect real AI Spotter

## 1. Upload the updated app to GitHub

1. Unzip `barbell-scale-ai-final-upload.zip`.
2. Open your `barbell-scale-app` repository.
3. Upload every file and folder from inside the unzipped folder.
4. Let GitHub replace files with the same names.
5. Commit the changes.

This version includes:
- Correct barbell-and-scale logo
- Gauge lines in the scale
- No eyes in the main logo
- Separate robot logo for Spotter
- Secure real-AI backend
- Updated cache version

## 2. Create an OpenAI API key

1. Go to the OpenAI Platform website and sign in.
2. Open **API keys**.
3. Choose **Create new secret key**.
4. Copy the key when it appears.
5. Do not paste the key into GitHub or the app files.

Your ChatGPT subscription and API billing are separate. Add API billing and set a low project budget or usage alert for cost control.

## 3. Deploy with Vercel

1. Sign in to Vercel.
2. Select **Add New → Project**.
3. Import `8njkjt8ktr-bot/barbell-scale-app`.
4. For Framework Preset, select **Other**.
5. Open **Environment Variables**.
6. Add:

   Name: `OPENAI_API_KEY`

   Value: paste your secret OpenAI API key

7. Optional model setting:

   Name: `OPENAI_MODEL`

   Value: `gpt-5-mini`

8. Select **Deploy**.
9. Open the Vercel URL after deployment.

## 4. Refresh the iPhone app

Because the earlier app used offline caching:

1. Close the existing Home Screen app and Safari tab.
2. Open the new Vercel URL in Safari.
3. Refresh once.
4. Use **Share → Add to Home Screen**.
5. Delete the old Home Screen icon if it continues showing the earlier version.

The real AI works from the Vercel URL because Vercel runs the secure `/api/chat` function. The old GitHub Pages URL cannot run that backend by itself.
