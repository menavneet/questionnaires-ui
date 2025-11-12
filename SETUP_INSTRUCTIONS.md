# 🚀 Quick Setup Instructions

## Step 1: Configure Your API Token

You need to create a `.env` file with your API backdoor token:

```bash
echo 'VITE_API_BASE_URL=https://api.devnet.icm.social/api' > .env
echo 'VITE_BACKDOOR_TOKEN=your_actual_token_here' >> .env
```

**OR** manually create a `.env` file in the project root with:

```env
VITE_API_BASE_URL=https://api.devnet.icm.social/api
VITE_BACKDOOR_TOKEN=your_actual_token_here
```

⚠️ **Important:** Replace `your_actual_token_here` with your real API token!

## Step 2: Run the Development Server

```bash
npm run dev
```

The app will start at: **http://localhost:3000**

## Step 3: Open in Browser

Open your browser and navigate to:
```
http://localhost:3000
```

## What You'll See

✅ A modern dashboard with filters
✅ Questionnaire cards in a grid layout  
✅ Click any card to view full details
✅ Use filters to search and filter data
✅ Pagination at the bottom

## Features to Try

1. **Filter by User Type:** Select BUILDER or KOL
2. **Date Range:** Pick start and end dates
3. **Search:** Type keywords to search in questionnaire content
4. **View Details:** Click any card to see the full questionnaire
5. **Copy UUID:** Click the 📋 icon to copy UUIDs

## Troubleshooting

### If you see "Authentication failed"
- Check your `.env` file exists
- Verify your `VITE_BACKDOOR_TOKEN` is correct
- Restart the dev server after changing `.env`

### If the page is blank
- Open browser console (F12) to check for errors
- Ensure the API endpoint is accessible
- Check your internet connection

## Build for Production

```bash
npm run build
npm run preview
```

## Project Structure

```
questionnaires-ui/
├── src/
│   ├── components/          # React components
│   │   ├── FilterBar        # Filter controls
│   │   ├── QuestionnaireList # Card grid view
│   │   ├── QuestionnaireDetail # Modal view
│   │   └── Pagination       # Page navigation
│   ├── App.jsx              # Main app
│   └── main.jsx             # Entry point
├── package.json
├── vite.config.js
└── .env                     # YOUR CONFIG (create this!)
```

---

**Need Help?** Check the main README.md or API documentation files.

