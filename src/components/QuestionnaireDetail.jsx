import './QuestionnaireDetail.css'

function QuestionnaireDetail({ questionnaire, onClose }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    })
  }

  const getUserTypeBadge = (userType) => {
    if (!userType) return <span className="badge badge-null">N/A</span>
    if (userType === 'BUILDER') return <span className="badge badge-builder">BUILDER</span>
    if (userType === 'KOL') return <span className="badge badge-kol">KOL</span>
    return <span className="badge">{userType}</span>
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    alert('UUID copied to clipboard!')
  }

  const questions = questionnaire.json_data?.questionnaire || []

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <div>
            <h2>Questionnaire Details</h2>
            <div className="meta-info">
              {getUserTypeBadge(questionnaire.user_type)}
              <span className="date">{formatDate(questionnaire.created_at)}</span>
            </div>
          </div>
          <button className="close-btn" onClick={onClose}>
            ✕
          </button>
        </div>

        <div className="modal-body">
          <div className="info-section">
            <div className="info-row">
              <span className="info-label">UUID:</span>
              <div className="uuid-container">
                <code className="full-uuid">{questionnaire.uuid}</code>
                <button
                  className="copy-btn"
                  onClick={() => copyToClipboard(questionnaire.uuid)}
                  title="Copy UUID"
                >
                  📋
                </button>
              </div>
            </div>
          </div>

          <div className="questions-section">
            <h3>Questions & Answers ({questions.length})</h3>
            
            {questions.length === 0 ? (
              <p className="no-questions">No questions available</p>
            ) : (
              <div className="questions-list">
                {questions.map((item, index) => (
                  <div key={index} className="question-item">
                    <div className="question-number">Q{index + 1}</div>
                    <div className="question-content">
                      <div className="question-text">
                        <strong>{item.question}</strong>
                        {item.saved !== undefined && (
                          <span className={`saved-badge ${item.saved ? 'saved' : 'not-saved'}`}>
                            {item.saved ? '✓ Saved' : '○ Not Saved'}
                          </span>
                        )}
                      </div>
                      
                      {item.options && item.options.length > 0 && (
                        <div className="options">
                          <span className="options-label">Options:</span>
                          <div className="options-list">
                            {item.options.map((option, optIdx) => (
                              <span 
                                key={optIdx} 
                                className={`option-chip ${option === item.answer ? 'selected' : ''}`}
                              >
                                {option}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}
                      
                      <div className="answer">
                        <span className="answer-label">Answer:</span>
                        <span className="answer-text">{item.answer || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-close" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  )
}

export default QuestionnaireDetail

