import './index.css'

const TransactionItem = props => {
  const {transactionDetails, deleteList} = props
  const {id, title, amount, type} = transactionDetails

  const onDeleteHistory = () => {
    deleteList(id)
  }

  return (
    <li>
      <p>{title}</p>
      <p>Rs {amount}</p>
      <p>{type}</p>
      <div>
        <button type="button" onClick={onDeleteHistory} data-testid="delete">
          <img
            src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
            alt="delete"
            className="dlt-btn-img"
          />
        </button>
      </div>
    </li>
  )
}

export default TransactionItem
