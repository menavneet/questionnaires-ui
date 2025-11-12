import './QuestionnaireList.css'

function QuestionnaireList({ questionnaires, onViewDetails }) {
  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const shortenUuid = (uuid) => {
    return `${uuid.substring(0, 8)}...${uuid.substring(uuid.length - 8)}`
  }

  const copyToClipboard = (text, event) => {
    event.stopPropagation()
    navigator.clipboard.writeText(text)
    alert('UUID copied to clipboard!')
  }

  const getUserTypeBadge = (userType) => {
    if (!userType) return <span className="badge badge-null">N/A</span>
    if (userType === 'BUILDER') return <span className="badge badge-builder">BUILDER</span>
    if (userType === 'KOL') return <span className="badge badge-kol">KOL</span>
    return <span className="badge">{userType}</span>
  }

  const getQuestionnairePreview = (questionnaire) => {
    const questions = questionnaire.json_data?.questionnaire || []
    if (questions.length === 0) return 'No questions available'
    
    const firstQuestion = questions[0]
    const preview = `Q: ${firstQuestion.question.substring(0, 50)}${firstQuestion.question.length > 50 ? '...' : ''}`
    const answer = `A: ${firstQuestion.answer.substring(0, 50)}${firstQuestion.answer.length > 50 ? '...' : ''}`
    
    return (
      <>
        <div><strong>{preview}</strong></div>
        <div className="answer-preview">{answer}</div>
      </>
    )
  }

  return (
    <div className="questionnaire-list">
      {questionnaires.map((questionnaire) => (
        <div
          key={questionnaire.uuid}
          className="questionnaire-card"
          onClick={() => onViewDetails(questionnaire)}
        >
          <div className="card-header">
            <div className="uuid-section">
              <span className="uuid-label">UUID:</span>
              <code className="uuid">{shortenUuid(questionnaire.uuid)}</code>
              <button
                className="copy-btn"
                onClick={(e) => copyToClipboard(questionnaire.uuid, e)}
                title="Copy full UUID"
              >
                📋
              </button>
            </div>
            <div className="badge-date">
              {getUserTypeBadge(questionnaire.user_type)}
              <span className="date">{formatDate(questionnaire.created_at)}</span>
            </div>
          </div>

          <div className="card-body">
            <div className="preview">
              {getQuestionnairePreview(questionnaire)}
            </div>
            <div className="question-count">
              {questionnaire.json_data?.questionnaire?.length || 0} questions total
            </div>
          </div>

          <div className="card-footer">
            <button className="view-btn" aria-label="View details"></button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default QuestionnaireList

