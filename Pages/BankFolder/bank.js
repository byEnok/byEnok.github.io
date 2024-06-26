function updateBalances() {
    setBankBalance()
    setLoanStatusAndBalance()
}

function checkUserNameStatus() {
    const userNameStatus = localStorage.getItem('userNameStatus') || '0'
    // const userName = localStorage.getItem("userName") || 0
    let registeredUser = userNameStatus === 'true'
    localStorage.setItem('userNameStatus', registeredUser)
    return registeredUser
}

function checkUserName() {
    const userNameStatus = localStorage.getItem('userNameStatus') || '0'
    let registeredUser = userNameStatus === 'true'
    
    if (registeredUser) {
        const userName = localStorage.getItem('userName')
        const userNameEl = document.getElementById("user-name")
        userNameEl.innerHTML = `- ${userName} -`
        userNameEl.innerHTML += `<br>` 
        userNameEl.innerHTML += `Account Details`
    }
}

// Set Bank Balance 
function setBankBalance() {
    const bankBalanceEl = document.getElementById("bank-balance")
    let cloudBankBalance = parseInt(localStorage.getItem('bankBalance')) || 0
    bankBalanceEl.innerHTML = ` ${cloudBankBalance} NOK`
    return cloudBankBalance
}

//  Set Loan Balance and Cloud Status 
function setLoanStatusAndBalance() {
    const loanBalanceEl = document.getElementById("loan-balance")
    let cloudLoanBalance = parseInt(localStorage.getItem('loanBalance')) || 0

    loanBalanceEl.innerHTML = ` ${cloudLoanBalance} NOK`
    const activeLoan = cloudLoanBalance > 0

    localStorage.setItem('activeLoan', activeLoan.toString())
    return activeLoan
}

// Verify Loan Input
function verifyLoanInput() {
    const activeLoan = setLoanStatusAndBalance()
    const cloudBankBalance = setBankBalance()

    
    const loanInputContainer = document.getElementById("loan-input-container")
    loanInputContainer.style.display = "flex"

    const loanInputExitButton = document.getElementById("loan-input-exit-button")
    loanInputExitButton.addEventListener('click', () => {
        loanInputContainer.style.display = "none"
    })

    const loanInput = document.getElementById("loan-input")
    const loanInputButton = document.getElementById("loan-input-button")
    
    loanInputButton.addEventListener('click', () => {
        let loanAmount = parseInt(loanInput.value)

        // if (loanAmount !== null && loanAmount.trim() !== "" && !isNaN(loanAmount)) {
        if (loanAmount !== null && !isNaN(loanAmount)) {
        loanAmount = parseInt(loanAmount)
        if ( Number.isInteger(loanAmount) && loanAmount > 0 && !activeLoan && loanAmount <= cloudBankBalance * 2 ) {
            let currentBalance = cloudBankBalance 
            let newBalance = currentBalance + loanAmount

            localStorage.setItem('bankBalance', newBalance.toString())
            localStorage.setItem('loanBalance', loanAmount.toString())

            updateBalances()
            alert(`Your loan was granted for ${loanAmount} NOK!`)
            loanInputContainer.style.display = "none"

        }
        else if ( Number.isInteger(loanAmount) && activeLoan ) {
            alert("You allready have a active loan with us. \nYou must pay it down before you are allowed another.")
            loanInputContainer.style.display = "none"
        }
        else if ( Number.isInteger(loanAmount) && !activeLoan && loanAmount > cloudBankBalance * 2 ) {
            alert("You cannot loan more than twice your Bank Balance! \nYou must enter a lower amount. ")
        } 
        else {
            alert("We don't loan out that! \nYou must enter a number!")    
        }
    } 
    else {
        alert("We don't loan out that! \nYou must enter a number!") 
    }
    // loanInputContainer.style.display = "none"
    return loanAmount

})




    // Old loan input getter
    // let loanAmount = prompt("Enter Loan Amount", 500);

    // Condition used for when loanAmount was from prompt
    // if (loanAmount !== null && loanAmount.trim() !== "" && !isNaN(loanAmount)) {
    //     loanAmount = parseInt(loanAmount)
    //     if ( Number.isInteger(loanAmount) && !activeLoan && loanAmount <= cloudBankBalance * 2 ) {
    //         let currentBalance = cloudBankBalance 
    //         let newBalance = currentBalance + loanAmount

    //         localStorage.setItem('bankBalance', newBalance.toString())
    //         localStorage.setItem('loanBalance', loanAmount.toString())

    //         updateBalances()
    //         alert(`Your loan was granted for ${loanAmount} NOK!`)

    //     }
    //     else if ( Number.isInteger(loanAmount) && activeLoan ) {
    //         alert("You allready have a active loan with us. \nYou must pay it down before you are allowed another.")
    //     }
    //     else if ( Number.isInteger(loanAmount) && !activeLoan && loanAmount > cloudBankBalance * 2 ) {
    //         alert("You cannot loan more than twice your Bank Balance! \nYou must enter a lower amount. ")
    //     } 
    //     else {
    //         alert("We don't loan out that! \nYou must enter a number!")    
    //     }
    // } 
    // else {
    //     alert("We don't loan out that! \nYou must enter a number!") 
    // }
    // return loanAmount
};

const bankFunctions = {
    checkUserNameStatus,
    checkUserName,
    verifyLoanInput,
    setLoanStatusAndBalance,
    setBankBalance,
    updateBalances
}

export default bankFunctions