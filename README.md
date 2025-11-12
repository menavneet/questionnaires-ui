# 📋 Questionnaires Dashboard

A modern React single-page application for viewing and managing questionnaire submissions from the ICM.Social platform.

## Features

- 🔍 **Advanced Filtering** - Filter by user type, date range, and search content
- 📄 **Pagination** - Navigate through large datasets efficiently
- 📱 **Responsive Design** - Works beautifully on desktop and mobile
- 🎨 **Modern UI** - Clean, gradient-based design with smooth animations
- 📊 **Detailed View** - View complete questionnaire responses in a modal
- 📋 **Copy UUID** - Quick copy functionality for UUIDs
- ⚡ **Fast & Lightweight** - Built with Vite for optimal performance

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- A valid API backdoor token

## Installation

1. **Clone or navigate to the project directory:**
   ```bash
   cd questionnaires-ui
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   
   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```

   Edit `.env` and add your API token:
   ```env
   VITE_API_BASE_URL=https://api.devnet.icm.social/api
   VITE_BACKDOOR_TOKEN=your_actual_token_here
   ```

## Usage

### Development Mode

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### Build for Production

Create a production build:

```bash
npm run build
```

Preview the production build:

```bash
npm run preview
```

## Project Structure

```
questionnaires-ui/
├── src/
│   ├── components/
│   │   ├── FilterBar.jsx           # Filter controls
│   │   ├── FilterBar.css
│   │   ├── QuestionnaireList.jsx   # List view
│   │   ├── QuestionnaireList.css
│   │   ├── QuestionnaireDetail.jsx # Detail modal
│   │   ├── QuestionnaireDetail.css
│   │   ├── Pagination.jsx          # Pagination controls
│   │   └── Pagination.css
│   ├── App.jsx                     # Main app component
│   ├── App.css
│   ├── main.jsx                    # Entry point
│   └── index.css                   # Global styles
├── index.html
├── vite.config.js
├── package.json
├── .env.example
└── README.md
```

## API Documentation

For detailed API documentation, refer to:
- `API_QUESTIONNAIRES_QUICK_REF.md` - Quick reference guide
- `API_QUESTIONNAIRES_LIST.md` - Complete API documentation

## Features Overview

### Filter Bar
- **User Type:** Filter by BUILDER, KOL, or All
- **Date Range:** Filter submissions by start and end date
- **Search:** Search within questionnaire content
- **Page Size:** Choose between 10, 20, 50, or 100 items per page

### Questionnaire Cards
- Display UUID (shortened with copy function)
- Show user type badge (color-coded)
- Display creation date and time
- Preview first question and answer
- Click to view full details

### Detail Modal
- Full UUID with copy function
- Complete questionnaire with all Q&A
- Highlight selected options
- Show saved/not saved status
- Responsive layout

### Pagination
- Previous/Next navigation
- Direct page number selection
- Smart ellipsis for large page counts
- Disabled state for boundary pages

## Customization

### Colors & Styling

The app uses CSS custom properties and can be easily customized. Main gradient colors are defined in the CSS files:

```css
/* Primary gradient */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### API Configuration

Update the API base URL in `.env`:

```env
VITE_API_BASE_URL=https://your-api-url.com/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Security Notes

⚠️ **Important Security Considerations:**

1. Never commit your `.env` file to version control
2. The backdoor token should be kept secure
3. This is intended for internal/admin use only
4. Consider implementing a backend proxy for production use

## Troubleshooting

### Authentication Error (404)
- Verify your `VITE_BACKDOOR_TOKEN` in `.env`
- Ensure the token is valid and not expired

### No Data Showing
- Check your internet connection
- Verify the API endpoint is accessible
- Check browser console for errors
- Ensure filters aren't too restrictive

### Build Errors
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`
- Clear Vite cache: `rm -rf node_modules/.vite`

## Technologies Used

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **CSS3** - Styling with modern features
- **Fetch API** - HTTP requests

## License

This project is for internal use only.

## Support

For issues or questions:
1. Check the API documentation
2. Review browser console for errors
3. Contact the development team

---

Built with ❤️ for ICM.Social

