# Environment Variables Setup

## 🔐 Securing API Keys

Your Firebase API keys have been moved to environment variables for security. Follow these steps to set up your environment:

### 1. Create a `.env` file

Create a `.env` file in the root directory of your project with the following content:

```env
# Firebase Configuration
VITE_FIREBASE_API_KEY=AIzaSyAucusuF70bLUMQ2lA7r6eToY84hB50da4
VITE_FIREBASE_AUTH_DOMAIN=reba-ai.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=reba-ai
VITE_FIREBASE_STORAGE_BUCKET=reba-ai.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=201669748242
VITE_FIREBASE_APP_ID=1:201669748242:web:3222f6ca8e078270311acb
```

### 2. Verify `.env` is in `.gitignore`

The `.env` file should already be listed in your `.gitignore` file to prevent it from being committed to version control.

### 3. Restart your development server

After creating the `.env` file, restart your development server:

```bash
npm run dev
```

## 🔒 Security Best Practices

- ✅ **Never commit API keys to version control**
- ✅ **Use environment variables for all sensitive data**
- ✅ **Keep `.env` files out of version control**
- ✅ **Use different API keys for development and production**

## 🚨 Important Notes

- The `.env` file contains your actual Firebase configuration
- This file should never be shared or committed to version control
- For production, use different Firebase project credentials
- Consider using Firebase App Check for additional security

## 🔧 Troubleshooting

If you encounter issues:

1. Make sure the `.env` file is in the root directory
2. Verify all environment variable names start with `VITE_`
3. Restart your development server after creating the `.env` file
4. Check that the `.env` file is not being tracked by git 