# Questionnaires List API Documentation

## Overview
Backdoor API endpoint to retrieve paginated list of questionnaire submissions with advanced filtering capabilities.

**Base URL:** `https://api.devnet.icm.social/api/`

**Endpoint:** `GET /backdoor/questionnaires/`

**Full URL:** `https://api.devnet.icm.social/api/backdoor/questionnaires/`

---

## Authentication

### Required Header
```http
X-Yappr-Backdoor: <your-backdoor-token>
```

**Security Note:** This endpoint returns `404 Not Found` if the authentication header is missing or invalid (to hide the endpoint from unauthorized users).

---

## Request

### HTTP Method
```
GET
```

### Query Parameters

| Parameter | Type | Required | Default | Max | Description |
|-----------|------|----------|---------|-----|-------------|
| `page` | integer | No | 1 | - | Page number for pagination |
| `page_size` | integer | No | 20 | 100 | Number of items per page |
| `user_type` | string | No | - | - | Filter by user type: `BUILDER` or `KOL` |
| `start_date` | string | No | - | - | Filter by created date >= start_date (ISO format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`) |
| `end_date` | string | No | - | - | Filter by created date <= end_date (ISO format: `YYYY-MM-DD` or `YYYY-MM-DDTHH:MM:SS`) |
| `search` | string | No | - | - | Case-insensitive search in json_data content |

### Date Format Examples
- Simple date: `2025-01-15`
- Full datetime: `2025-01-15T10:30:00`
- ISO with timezone: `2025-01-15T10:30:00Z`

---

## Response

### Success Response (200 OK)

```json
{
  "count": 150,
  "next": "https://api.devnet.icm.social/api/backdoor/questionnaires/?page=2",
  "previous": null,
  "results": [
    {
      "uuid": "123e4567-e89b-12d3-a456-426614174000",
      "user_type": "BUILDER",
      "json_data": {
        "questionnaire": [
          {
            "question": "What is your project name?",
            "options": ["Option 1", "Option 2"],
            "answer": "My Project"
          }
        ],
        "userType": "BUILDER"
      },
      "created_at": "2025-11-12T10:30:00.123456Z"
    },
    {
      "uuid": "987e6543-e21b-12d3-a456-426614174111",
      "user_type": "KOL",
      "json_data": {
        "questionnaire": [
          {
            "question": "What's your Twitter handle?",
            "options": [],
            "answer": "@example"
          }
        ],
        "userType": "KOL"
      },
      "created_at": "2025-11-11T15:45:00.654321Z"
    }
  ],
  "filters": {
    "user_type": null,
    "start_date": null,
    "end_date": null,
    "search": null
  }
}
```

### Response Fields

#### Root Level
- `count` (integer): Total number of questionnaires matching the filters
- `next` (string|null): URL to the next page, or null if on last page
- `previous` (string|null): URL to the previous page, or null if on first page
- `results` (array): Array of questionnaire objects
- `filters` (object): Echo of applied filters for reference

#### Questionnaire Object (in results array)
- `uuid` (string): Unique identifier for the submission (UUID format)
- `user_type` (string|null): Type of user - `"BUILDER"`, `"KOL"`, or `null`
- `json_data` (object): Complete questionnaire data including questions, answers, and metadata
- `created_at` (string): Timestamp when the questionnaire was submitted (ISO 8601 format)

---

## Error Responses

### 404 Not Found
**Cause:** Missing or invalid authentication header

```json
// Returns HTML 404 page (by design, to hide endpoint)
```

### 500 Internal Server Error
**Cause:** Server error during processing

```json
{
  "error": "Failed to retrieve questionnaires",
  "details": "Error message details"
}
```

---

## Usage Examples

### Example 1: Get First Page (Default Settings)
```bash
curl -X GET \
  -H "X-Yappr-Backdoor: YOUR_TOKEN_HERE" \
  "https://api.devnet.icm.social/api/backdoor/questionnaires/"
```

**Response:** Returns first 20 questionnaires, newest first

---

### Example 2: Filter by User Type (BUILDER)
```bash
curl -X GET \
  -H "X-Yappr-Backdoor: YOUR_TOKEN_HERE" \
  "https://api.devnet.icm.social/api/backdoor/questionnaires/?user_type=BUILDER"
```

**Response:** Returns only BUILDER submissions

---

### Example 3: Filter by User Type (KOL)
```bash
curl -X GET \
  -H "X-Yappr-Backdoor: YOUR_TOKEN_HERE" \
  "https://api.devnet.icm.social/api/backdoor/questionnaires/?user_type=KOL"
```

**Response:** Returns only KOL submissions

---

### Example 4: Date Range Filter
```bash
curl -X GET \
  -H "X-Yappr-Backdoor: YOUR_TOKEN_HERE" \
  "https://api.devnet.icm.social/api/backdoor/questionnaires/?start_date=2025-01-01&end_date=2025-01-31"
```

**Response:** Returns submissions from January 2025

---

### Example 5: Search in JSON Data
```bash
curl -X GET \
  -H "X-Yappr-Backdoor: YOUR_TOKEN_HERE" \
  "https://api.devnet.icm.social/api/backdoor/questionnaires/?search=twitter"
```

**Response:** Returns submissions containing "twitter" in their json_data

---

### Example 6: Custom Page Size
```bash
curl -X GET \
  -H "X-Yappr-Backdoor: YOUR_TOKEN_HERE" \
  "https://api.devnet.icm.social/api/backdoor/questionnaires/?page_size=50"
```

**Response:** Returns 50 items per page (instead of default 20)

---

### Example 7: Combined Filters
```bash
curl -X GET \
  -H "X-Yappr-Backdoor: YOUR_TOKEN_HERE" \
  "https://api.devnet.icm.social/api/backdoor/questionnaires/?user_type=BUILDER&search=crypto&start_date=2025-01-01&page=2&page_size=30"
```

**Response:** Returns BUILDER submissions containing "crypto", from 2025 onwards, page 2 with 30 items per page

---

### Example 8: JavaScript/Fetch
```javascript
const response = await fetch('https://api.devnet.icm.social/api/backdoor/questionnaires/?page=1&page_size=20', {
  method: 'GET',
  headers: {
    'X-Yappr-Backdoor': 'YOUR_TOKEN_HERE',
    'Content-Type': 'application/json'
  }
});

const data = await response.json();
console.log('Total questionnaires:', data.count);
console.log('Results:', data.results);
```

---

### Example 9: JavaScript/Axios
```javascript
import axios from 'axios';

const getQuestionnaires = async (filters = {}) => {
  try {
    const response = await axios.get('https://api.devnet.icm.social/api/backdoor/questionnaires/', {
      headers: {
        'X-Yappr-Backdoor': 'YOUR_TOKEN_HERE'
      },
      params: {
        page: filters.page || 1,
        page_size: filters.page_size || 20,
        user_type: filters.user_type,
        start_date: filters.start_date,
        end_date: filters.end_date,
        search: filters.search
      }
    });
    
    return response.data;
  } catch (error) {
    console.error('Error fetching questionnaires:', error);
    throw error;
  }
};

// Usage
const questionnaires = await getQuestionnaires({
  user_type: 'BUILDER',
  page: 1,
  page_size: 50
});
```

---

## Pagination

### Navigation
- Use `next` URL to go to the next page
- Use `previous` URL to go to the previous page
- `count` shows total number of items across all pages
- Calculate total pages: `Math.ceil(count / page_size)`

### Example: Paginating Through All Results
```javascript
let allResults = [];
let currentPage = 1;
let hasMore = true;

while (hasMore) {
  const response = await fetch(`https://api.devnet.icm.social/api/backdoor/questionnaires/?page=${currentPage}&page_size=50`, {
    headers: { 'X-Yappr-Backdoor': 'YOUR_TOKEN_HERE' }
  });
  
  const data = await response.json();
  allResults = allResults.concat(data.results);
  
  hasMore = data.next !== null;
  currentPage++;
}

console.log('Fetched all questionnaires:', allResults.length);
```

---

## Data Ordering

Results are always ordered by **newest first** (descending `created_at`).

- Most recent submissions appear first
- Oldest submissions appear last

---

## Frontend Implementation Tips

### 1. State Management
```javascript
const [questionnaires, setQuestionnaires] = useState([]);
const [pagination, setPagination] = useState({
  count: 0,
  next: null,
  previous: null,
  currentPage: 1
});
const [filters, setFilters] = useState({
  user_type: null,
  start_date: null,
  end_date: null,
  search: ''
});
const [loading, setLoading] = useState(false);
```

### 2. Filtering Component Structure
```javascript
// Filter controls to include:
- User Type dropdown (All / BUILDER / KOL)
- Date range picker (start_date, end_date)
- Search input (debounced)
- Page size selector (20 / 50 / 100)
- Pagination controls (Previous / Next / Page numbers)
```

### 3. Table/List Columns to Display
```javascript
// Suggested columns:
- UUID (shortened, with copy button)
- User Type (badge with color coding)
- Created Date (formatted, e.g., "Jan 15, 2025 10:30 AM")
- Preview/Excerpt (first question/answer)
- Actions (View Details button)
```

### 4. Detail View
```javascript
// When clicking on a questionnaire:
- Show full UUID
- Display user type
- Show formatted created_at
- Render all questions and answers from json_data
- Allow navigation to next/previous submission
```

### 5. Error Handling
```javascript
// Handle these cases:
- Network errors (timeout, no connection)
- 404 errors (invalid auth token)
- 500 errors (server issues)
- Invalid date formats
- Empty results
```

---

## Performance Considerations

1. **Default Page Size:** 20 items is optimal for most use cases
2. **Maximum Page Size:** Limited to 100 to prevent performance issues
3. **Database Index:** `created_at` field is indexed for fast sorting
4. **Search Performance:** JSON search may be slower on large datasets

---

## Rate Limiting

⚠️ **Note:** Check with backend team for any rate limiting policies on this endpoint.

---

## Change Log

### Version 1.0 (Initial Release - Nov 12, 2025)
- Initial endpoint implementation
- Basic pagination support (page, page_size)
- Filter by user_type
- Date range filtering (start_date, end_date)
- JSON content search
- Database index on created_at for performance

---

## Support & Issues

For questions or issues with this API:
1. Check authentication token is valid
2. Verify request parameters match documentation
3. Review error messages in response
4. Contact backend team with specific error details

---

## Related Endpoints

- **Submit Questionnaire:** `POST /public/questionnaire/`
  - Public endpoint (no auth required)
  - Used to create new questionnaire submissions
  - Returns UUID of created submission

---

## Security Notes

1. **Never expose the backdoor token in frontend code**
2. Use environment variables for the token
3. This endpoint should only be used in admin/internal tools
4. Consider implementing a backend proxy if building public-facing features
5. All access is logged with IP addresses for audit purposes

---

## TypeScript Types (for Frontend Development)

```typescript
// Request types
interface QuestionnaireFilters {
  page?: number;
  page_size?: number;
  user_type?: 'BUILDER' | 'KOL';
  start_date?: string;
  end_date?: string;
  search?: string;
}

// Response types
interface QuestionnaireQuestion {
  question: string;
  options: string[];
  answer: string;
  saved?: boolean;
}

interface QuestionnaireJsonData {
  questionnaire: QuestionnaireQuestion[];
  userType?: 'BUILDER' | 'KOL';
}

interface Questionnaire {
  uuid: string;
  user_type: 'BUILDER' | 'KOL' | null;
  json_data: QuestionnaireJsonData;
  created_at: string;
}

interface PaginationInfo {
  count: number;
  next: string | null;
  previous: string | null;
  currentPage?: number;
  totalPages?: number;
}

interface FilterMetadata {
  user_type: string | null;
  start_date: string | null;
  end_date: string | null;
  search: string | null;
}

interface QuestionnaireListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Questionnaire[];
  filters: FilterMetadata;
}

// API function signature
async function getQuestionnaires(
  filters: QuestionnaireFilters,
  token: string
): Promise<QuestionnaireListResponse>;
```

---

**Document Version:** 1.0  
**Last Updated:** November 12, 2025  
**Endpoint Status:** ✅ Live in Production (DevNet)

