# Deploy Guliyev Photo to Netlify

## Option 1: Upload through GitHub (recommended)

1. Extract this ZIP.
2. Create a new GitHub repository and upload all extracted files.
3. In Netlify, select **Add new project** and then **Import an existing project**.
4. Connect GitHub and choose the repository.
5. Netlify will read `netlify.toml` automatically. Confirm:
   - Build command: `npm run build`
   - Publish directory: `out`
   - Node version: `22`
6. Select **Deploy site**.

## Option 2: Netlify CLI

From the extracted project folder:

```bash
npm install
npm run build
npx netlify-cli deploy --prod --dir=out
```

## Supabase

The Supabase project URL and publishable key are already configured. Admin login,
content editing, image uploads, portfolio management, and contact inquiries will
continue using the existing Supabase project.

After Netlify provides your final domain, add it in Supabase under
**Authentication > URL Configuration** as the Site URL and an allowed redirect URL.
