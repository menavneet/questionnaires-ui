# Questionnaires API - Quick Reference

## Endpoint
```
GET https://api.devnet.icm.social/api/backdoor/questionnaires/
```

## Authentication
```
X-Yappr-Backdoor: <token>
```

## Parameters
| Param | Type | Example |
|-------|------|---------|
| `page` | int | `?page=2` |
| `page_size` | int | `?page_size=50` (max: 100) |
| `user_type` | string | `?user_type=BUILDER` or `KOL` |
| `start_date` | string | `?start_date=2025-01-01` |
| `end_date` | string | `?end_date=2025-12-31` |
| `search` | string | `?search=twitter` |

## Response Structure
```json
{
  "count": 150,
  "next": "url-to-next-page",
  "previous": "url-to-prev-page",
  "results": [{
    "uuid": "123e4567-...",
    "user_type": "BUILDER",
    "json_data": {...},
    "created_at": "2025-11-12T10:30:00Z"
  }],
  "filters": {...}
}
```

## Quick Copy-Paste Examples

### Basic Request
```bash
curl -H "X-Yappr-Backdoor: TOKEN" \
  "https://api.devnet.icm.social/api/backdoor/questionnaires/"
```

### With Filters
```bash
curl -H "X-Yappr-Backdoor: TOKEN" \
  "https://api.devnet.icm.social/api/backdoor/questionnaires/?user_type=BUILDER&page_size=50"
```

### JavaScript Fetch
```javascript
const res = await fetch('https://api.devnet.icm.social/api/backdoor/questionnaires/', {
  headers: { 'X-Yappr-Backdoor': 'TOKEN' }
});
const data = await res.json();
```

### React Hook Example
```javascript
const useQuestionnaires = (filters) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const params = new URLSearchParams(filters);
    fetch(`https://api.devnet.icm.social/api/backdoor/questionnaires/?${params}`, {
      headers: { 'X-Yappr-Backdoor': process.env.REACT_APP_BACKDOOR_TOKEN }
    })
    .then(res => res.json())
    .then(setData)
    .finally(() => setLoading(false));
  }, [filters]);
  
  return { data, loading };
};
```

## TypeScript Interface
```typescript
interface Questionnaire {
  uuid: string;
  user_type: 'BUILDER' | 'KOL' | null;
  json_data: {
    questionnaire: Array<{
      question: string;
      options: string[];
      answer: string;
    }>;
    userType?: 'BUILDER' | 'KOL';
  };
  created_at: string;
}

interface Response {
  count: number;
  next: string | null;
  previous: string | null;
  results: Questionnaire[];
  filters: Record<string, any>;
}
```

## UI Components Needed
- ✅ Filter bar (user type, date range, search)
- ✅ Data table/list (uuid, type, date, preview)
- ✅ Pagination controls (prev/next, page size)
- ✅ Detail modal/page (full questionnaire view)
- ✅ Export button (optional)
- ✅ Loading states
- ✅ Error handling

## Key Notes
- Newest submissions first
- Max 100 items per page
- Returns 404 if auth fails
- All dates in ISO 8601 format
- Search is case-insensitive

