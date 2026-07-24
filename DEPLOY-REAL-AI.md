# Deploy Barbell & Scale with Real AI Spotter

## 1. Upload this corrected build to GitHub

1. Unzip this package.
2. Open the `barbell-scale-app` repository.
3. Upload every file and folder inside the unzipped package.
4. Replace existing files and commit the changes.
5. Be sure the `api` folder and `package.json` are visible in the repository root.

## 2. Create an OpenAI API key

1. Sign in to the OpenAI developer platform.
2. Open API keys.
3. Create a new secret key.
4. Copy it immediately and keep it private.

Do not paste this key into `app.js`, GitHub, or any public file.

## 3. Add the key in Vercel

1. Open your Vercel project.
2. Open **Settings → Environment Variables**.
3. Add:

   Name: `OPENAI_API_KEY`

   Value: your OpenAI secret key

4. Enable it for Production, Preview, and Development.
5. Save it.

Optional:

   Name: `OPENAI_MODEL`

   Value: `gpt-5-mini`

## 4. Redeploy

After the GitHub upload finishes, Vercel should deploy automatically.

If it does not:

1. Open **Deployments** in Vercel.
2. Select the latest deployment.
3. Choose **Redeploy**.

Use the Vercel URL after it succeeds. GitHub Pages cannot run the secure AI endpoint.
