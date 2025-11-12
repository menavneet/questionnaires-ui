import { useState, useEffect } from 'react'
import './App.css'
import FilterBar from './components/FilterBar'
import QuestionnaireList from './components/QuestionnaireList'
import QuestionnaireDetail from './components/QuestionnaireDetail'
import Pagination from './components/Pagination'
import ScrollIndicator from './components/ScrollIndicator'

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://api.devnet.icm.social/api'
const BACKDOOR_TOKEN = import.meta.env.VITE_BACKDOOR_TOKEN || ''

function App() {
  const [questionnaires, setQuestionnaires] = useState([])
  const [selectedQuestionnaire, setSelectedQuestionnaire] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [pagination, setPagination] = useState({
    count: 0,
    next: null,
    previous: null,
    currentPage: 1,
  })
  const [filters, setFilters] = useState({
    user_type: '',
    start_date: '',
    end_date: '',
    search: '',
    page_size: 20,
  })

  const fetchQuestionnaires = async (page = 1) => {
    setLoading(true)
    setError(null)

    try {
      const params = new URLSearchParams({
        page: page.toString(),
        page_size: filters.page_size.toString(),
      })

      if (filters.user_type) params.append('user_type', filters.user_type)
      if (filters.start_date) params.append('start_date', filters.start_date)
      if (filters.end_date) params.append('end_date', filters.end_date)
      if (filters.search) params.append('search', filters.search)

      const response = await fetch(`${API_BASE_URL}/backdoor/questionnaires/?${params}`, {
        headers: {
          'X-Yappr-Backdoor': BACKDOOR_TOKEN,
        },
      })

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('Authentication failed. Please check your token.')
        }
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()
      setQuestionnaires(data.results)
      setPagination({
        count: data.count,
        next: data.next,
        previous: data.previous,
        currentPage: page,
      })
    } catch (err) {
      setError(err.message)
      console.error('Error fetching questionnaires:', err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchQuestionnaires(1)
  }, [filters])

  const handleFilterChange = (newFilters) => {
    setFilters({ ...filters, ...newFilters })
  }

  const handlePageChange = (page) => {
    fetchQuestionnaires(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleViewDetails = (questionnaire) => {
    setSelectedQuestionnaire(questionnaire)
  }

  const handleCloseDetails = () => {
    setSelectedQuestionnaire(null)
  }

  const totalPages = Math.ceil(pagination.count / filters.page_size)

  return (
    <div className="app">
      <ScrollIndicator />
      <header className="app-header">
        <h1>📋 Questionnaires Dashboard</h1>
        <p>View and manage questionnaire submissions</p>
      </header>

      <main className="app-main">
        <div className="container">
          <FilterBar 
            filters={filters} 
            onFilterChange={handleFilterChange}
            totalCount={pagination.count}
          />

          {error && (
            <div className="error-message">
              <strong>Error:</strong> {error}
            </div>
          )}

          {loading ? (
            <div className="loading">
              <div className="spinner"></div>
              <p>Loading questionnaires...</p>
            </div>
          ) : questionnaires.length === 0 ? (
            <div className="empty-state">
              <p>No questionnaires found</p>
              <small>Try adjusting your filters</small>
            </div>
          ) : (
            <>
              <QuestionnaireList 
                questionnaires={questionnaires}
                onViewDetails={handleViewDetails}
              />
              
              <Pagination
                currentPage={pagination.currentPage}
                totalPages={totalPages}
                hasNext={pagination.next !== null}
                hasPrevious={pagination.previous !== null}
                onPageChange={handlePageChange}
              />
            </>
          )}
        </div>
      </main>

      {selectedQuestionnaire && (
        <QuestionnaireDetail 
          questionnaire={selectedQuestionnaire}
          onClose={handleCloseDetails}
        />
      )}
    </div>
  )
}

export default App

