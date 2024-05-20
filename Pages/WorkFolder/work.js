
function checkLoanStatus() {
    let cloudLoanBalance = parseInt(localStorage.getItem('loanBalance')) || 0
    const activeLoan = cloudLoanBalance > 0
    localStorage.setItem('activeLoan', activeLoan.toString())
    return activeLoan
};

function showOrHideRepayLoanButton() {
    const loanStatus = checkLoanStatus()
    loanStatus ? showLoanButton() : hideLoanButton() 
}

function showLoanButton() {
    const loanButtonEl = document.getElementById("repay-loan-button")
    loanButtonEl.style.display = "inline"
}

function hideLoanButton() {
    const loanButtonEl = document.getElementById("repay-loan-button")
    loanButtonEl.style.display = "none"
}

function loanIsTrue() {
    const workBalanceEl = document.getElementById("work-balance")
    const repayLoanButton = document.getElementById("repay-loan-button")
    let cloudBankBalance = parseInt(localStorage.getItem('bankBalance')) || 0
    let cloudLoanBalance = parseInt(localStorage.getItem('loanBalance'))
    
    const moneyToBank = calculateBankSum(cloudLoanBalance)
    const moneyToLoan = calculateLoanSum(cloudLoanBalance)
    cloudBankBalance += moneyToBank 
    cloudLoanBalance -= moneyToLoan

    localStorage.setItem('bankBalance', cloudBankBalance.toString())
    localStorage.setItem('loanBalance', cloudLoanBalance.toString())
    checkLoanStatus() ? repayLoanButton.style.display = "inline" : repayLoanButton.style.display = "none"
    
    workBalanceEl.innerHTML = `0 NOK`
}

function loanIsFalse() {
    const workBalanceEl = document.getElementById("work-balance")
    let cloudBankBalance = parseInt(localStorage.getItem('bankBalance')) || 0
    let currentWorkBalance = parseInt(workBalanceEl.innerHTML)

    cloudBankBalance += currentWorkBalance
    localStorage.setItem('bankBalance', cloudBankBalance)
    workBalanceEl.innerHTML = `0 Kr`
}

function calculateBankSum(cloudLoanBalance) {
    const workBalanceEl = document.getElementById("work-balance")
    const currentWorkBalance = parseInt(workBalanceEl.innerHTML)
   
    let moneyToLoan = 10 / 100 * currentWorkBalance

    if (moneyToLoan >= cloudLoanBalance) moneyToLoan = cloudLoanBalance
    
    const moneyToBank = currentWorkBalance - moneyToLoan 
    return moneyToBank
}

function calculateLoanSum(cloudLoanBalance) {
    const workBalanceEl = document.getElementById("work-balance")
    const currentWorkBalance = parseInt(workBalanceEl.innerHTML)

    let moneyToLoan = 10 / 100 * currentWorkBalance 

    if (moneyToLoan <= cloudLoanBalance) {
        return moneyToLoan
    } else {
        moneyToLoan = cloudLoanBalance
        return moneyToLoan
    }
};

function everythingToLoan() {
    const workBalanceEl = document.getElementById("work-balance")
    const repayLoanButton = document.getElementById("repay-loan-button")

    let cloudLoanBalance = parseInt(localStorage.getItem('loanBalance'))
    let currentWorkBalance = parseInt(workBalanceEl.innerHTML)

    cloudLoanBalance -= currentWorkBalance
    localStorage.setItem('loanBalance', cloudLoanBalance.toString())

    checkLoanStatus() ? repayLoanButton.style.display = "inline" : repayLoanButton.style.display = "none"
    workBalanceEl.innerHTML = `0 NOK`
};

function someToLoan() {
    const workBalanceEl = document.getElementById("work-balance")
    const repayLoanButton = document.getElementById("repay-loan-button")

    let cloudBankBalance = parseInt(localStorage.getItem('bankBalance'))
    let cloudLoanBalance = parseInt(localStorage.getItem('loanBalance'))
    let currentWorkBalance = parseInt(workBalanceEl.innerHTML)

    let moneyToLoan = cloudLoanBalance
    let moneyToBank = currentWorkBalance - cloudLoanBalance

    cloudBankBalance += moneyToBank;
    cloudLoanBalance -= moneyToLoan;
    
    localStorage.setItem('bankBalance', cloudBankBalance.toString())
    localStorage.setItem('loanBalance', cloudLoanBalance.toString())
    checkLoanStatus()

    workBalanceEl.innerHTML = `0 NOK`
};

const workFunctions = {
    checkLoanStatus,
    showOrHideRepayLoanButton,
    showLoanButton,
    hideLoanButton,
    loanIsTrue,
    loanIsFalse,
    calculateBankSum,
    calculateLoanSum,
    everythingToLoan,
    someToLoan
}

export default workFunctions