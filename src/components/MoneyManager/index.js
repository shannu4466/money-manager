import {Component} from 'react'

import {v4 as uuidv4} from 'uuid'

import MoneyDetails from '../MoneyDetails'

import TransactionItem from '../TransactionItem'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    transactionList: [],
    titleInput: '',
    amountInput: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  deleteList = id => {
    const {transactionList} = this.state
    const updatedTransactionList = transactionList.filter(
      eachTrans => id !== eachTrans.id,
    )
    this.setState({transactionList: updatedTransactionList})
  }

  onSubmitUserEnteredDetails = event => {
    event.preventDefault()
    const {titleInput, amountInput, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachtrans => eachtrans.optionId === optionId,
    )
    const {displayText} = typeOption
    const newTransaction = {
      id: uuidv4(),
      title: titleInput,
      amount: parseInt(amountInput),
      type: displayText,
    }
    this.setState(prevState => ({
      transactionList: [...prevState.transactionList, newTransaction],
      titleInput: '',
      amountInput: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  onChangeTitleInput = event => {
    // console.log(event.target.value)
    this.setState({titleInput: event.target.value})
  }

  onChangeAmountInput = event => {
    // console.log(event.target.value)
    this.setState({amountInput: event.target.value})
  }

  onChangeSelect = event => {
    // console.log(event.target.value)
    this.setState({optionId: event.target.value})
  }

  getBalance = () => {
    const {transactionList} = this.state
    let balaceAmount = 0
    let incomeAmount = 0
    let expenseAmount = 0
    transactionList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrans.amount
      } else {
        expenseAmount += eachTrans.amount
      }
    })
    balaceAmount = incomeAmount - expenseAmount
    return balaceAmount
  }

  getIncome = () => {
    const {transactionList} = this.state
    let incomeAmount = 0
    transactionList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachTrans.amount
      }
    })
    return incomeAmount
  }

  getExpense = () => {
    const {transactionList} = this.state
    let expenseAmount = 0
    transactionList.forEach(eachTrans => {
      if (eachTrans.type === transactionTypeOptions[1].displayText) {
        expenseAmount += eachTrans.amount
      }
    })
    return expenseAmount
  }

  render() {
    const {titleInput, amountInput, optionId, transactionList} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expenseAmount = this.getExpense()

    return (
      <div className="container">
        <div className="card">
          <div className="user-profile">
            <h1>Hi, Richard</h1>
            <p>
              Welcome back to your <span>Money Manager</span>
            </p>
          </div>
          <MoneyDetails
            balanceAmount={balanceAmount}
            incomeAmount={incomeAmount}
            expenseAmount={expenseAmount}
          />
          <div className="account-details">
            <form onSubmit={this.onSubmitUserEnteredDetails}>
              <h1>Add Transaction</h1>
              <label htmlFor="title">TITLE</label>
              <input
                type="text"
                id="title"
                value={titleInput}
                placeholder="TITLE"
                onChange={this.onChangeTitleInput}
              />
              <label htmlFor="amount">AMOUNT</label>
              <input
                type="Number"
                id="amount"
                value={amountInput}
                placeholder="AMOUNT"
                onChange={this.onChangeAmountInput}
              />
              <label htmlFor="select">TYPE</label>
              <select
                id="select"
                value={optionId}
                onChange={this.onChangeSelect}
              >
                {transactionTypeOptions.map(eachType => (
                  <option key={eachType.optionId} value={eachType.optionId}>
                    {eachType.displayText}
                  </option>
                ))}
              </select>
              <button type="submit">Add</button>
            </form>
            <div className="history">
              <h1>History</h1>
              <div>
                <ul>
                  <li>
                    <p className="abc">Title</p>
                    <p className="abc">Amount</p>
                    <p className="abc">Type</p>
                  </li>
                  {transactionList.map(eachTransaction => (
                    <TransactionItem
                      key={eachTransaction.id}
                      transactionDetails={eachTransaction}
                      deleteList={this.deleteList}
                    />
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
