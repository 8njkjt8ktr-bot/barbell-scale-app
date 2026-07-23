# Turn on real AI Spotter

This version must be deployed to Vercel (not only GitHub Pages), because `api/chat.js` securely calls OpenAI.

## 1. Create an OpenAI API key

Create a project API key in the OpenAI platform. Never paste it into `app.js`, GitHub, or any public file.

## 2. Deploy the repository to Vercel

1. Sign in to Vercel.
2. Choose **Add New → Project**.
3. Import `8njkjt8ktr-bot/barbell-scale-app`.
4. Leave Framework Preset as **Other**.
5. Leave Build Command blank and Output Directory blank.
6. Add an environment variable named `OPENAI_API_KEY` and paste the key as its value.
7. Optionally add `OPENAI_MODEL` with value `gpt-5-mini`.
8. Deploy.

Use the new Vercel URL for the AI-enabled app. GitHub Pages cannot execute the `/api/chat.js` server function.

## Updating

Push future files to GitHub. Vercel will redeploy automatically.
