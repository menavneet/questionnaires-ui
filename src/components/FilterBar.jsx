import { useState } from 'react'
import './FilterBar.css'

function FilterBar({ filters, onFilterChange, totalCount }) {
  const [localFilters, setLocalFilters] = useState(filters)

  const handleChange = (e) => {
    const { name, value } = e.target
    setLocalFilters({ ...localFilters, [name]: value })
  }

  const handleApplyFilters = () => {
    onFilterChange(localFilters)
  }

  const handleClearFilters = () => {
    const clearedFilters = {
      user_type: '',
      start_date: '',
      end_date: '',
      search: '',
      page_size: 20,
    }
    setLocalFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  return (
    <div className="filter-bar">
      <div className="filter-header">
        <h2>🔍 Filters</h2>
        <span className="total-count">Total: {totalCount}</span>
      </div>

      <div className="filter-grid">
        <div className="filter-group">
          <label htmlFor="user_type">User Type</label>
          <select
            id="user_type"
            name="user_type"
            value={localFilters.user_type}
            onChange={handleChange}
          >
            <option value="">All Types</option>
            <option value="BUILDER">BUILDER</option>
            <option value="KOL">KOL</option>
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="start_date">Start Date</label>
          <input
            type="date"
            id="start_date"
            name="start_date"
            value={localFilters.start_date}
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="end_date">End Date</label>
          <input
            type="date"
            id="end_date"
            name="end_date"
            value={localFilters.end_date}
            onChange={handleChange}
          />
        </div>

        <div className="filter-group">
          <label htmlFor="page_size">Items per Page</label>
          <select
            id="page_size"
            name="page_size"
            value={localFilters.page_size}
            onChange={handleChange}
          >
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>

        <div className="filter-group filter-group-full">
          <label htmlFor="search">Search</label>
          <input
            type="text"
            id="search"
            name="search"
            placeholder="Search in questionnaire content..."
            value={localFilters.search}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="filter-actions">
        <button className="btn btn-primary" onClick={handleApplyFilters}>
          Apply Filters
        </button>
        <button className="btn btn-secondary" onClick={handleClearFilters}>
          Clear All
        </button>
      </div>
    </div>
  )
}

export default FilterBar

