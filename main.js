
import bankFunctions from "./Pages/BankFolder/bank.js";
import shopFunctions from "./Pages/ShopFolder/shop.js";
import workFunctions from "./Pages/WorkFolder/work.js"
// import workFunctions from "../byenok.github.io/Pages/WorkFolder/work.js"


document.addEventListener('DOMContentLoaded', () => { 
    
    
    // --- Home Page Setup ---
    // const homePage = document.location.pathname
    // if (homePage === "/index.html") 
    if (document.body.dataset.page === 'index') {

        setTimeout( () => {
            getUserName()
        }, 1000);


        // Checks user name on homepage visit 
        function getUserName() {
            const registeredUser = checkUserNameStatus()
            if (!registeredUser) {
                console.log("Creating User!")
                createUserName()
            } else {
                console.log("User Exists")
            }
        }
        function checkUserNameStatus() {
            const userNameStatus = localStorage.getItem('userNameStatus') || '0'
            let registeredUser = userNameStatus === 'true'
            localStorage.setItem('userNameStatus', registeredUser)
            return registeredUser
        }
        function createUserName() {
            const userName = prompt("Enter your name", "John Doe")
            if (userName === null || userName.trim() === "") {
                alert("That's okay! You can always come back if you change your mind. \nEnjoy your stay!")
                
            } else {
                localStorage.setItem('userName', userName)
                localStorage.setItem('userNameStatus', 'true')
                alert(`Thanks, ${userName}! The account is now personalized. Enjoy your stay!`)
            }
            console.log(userName)
        }


        const resetButton = document.getElementById("reset-storage-button")
            resetButton.addEventListener('click', resetDataConfirmation)

        function resetDataConfirmation() {
            const confirmation = prompt("Are you sure you want to reset all user information?\n\nType 'y' to confirm or press Enter/Cancel to exit.", "y")
            if (confirmation.toLowerCase() === 'y') {
                resetData() 
            } else {
                alert("Data reset was cancelled")
            }
        }


        function resetData() {
            const userDetails = {}
            userDetails.userName = localStorage.getItem('userName')
            userDetails.bankBalance = localStorage.getItem('bankBalance')
            userDetails.userNameStatus = localStorage.getItem('userNameStatus')
            userDetails.loanBalance = localStorage.getItem('loanBalance')
            userDetails.loanStatus = localStorage.getItem('activeLoan')
            
            const anythingActive = userDetails
            if (Object.values(anythingActive).some(value => value === 'true' || value > 0)) {
                resettingData()
            } else {
                alert("There is no user data to reset")   
            }
        };

        function resettingData() {
            localStorage.removeItem('userName') 
            localStorage.removeItem('bankBalance') 
            localStorage.removeItem('userNameStatus')
            localStorage.removeItem('loanBalance')
            localStorage.removeItem('loanStatus')
            localStorage.removeItem('activeLoan')
            alert("All user data is now reset")
        };
    

        
        function userNameFalse() {
            let newUser = prompt("Please enter your Name", "Simon Enoksen")
            localStorage.setItem('userName', newUser.toString())
            alert("Thank you, enjoy your stay!")
        };

        // Scroll Wheel auto scroll on Home Page
        const bankCard = document.getElementById("bank-icon")
        window.addEventListener('wheel', (event) => {
            if (event.deltaY > 0) {
                bankCard.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
            }
        });

        // Arrow auto Scroll on Home Page 
        const arrowJump = document.getElementById("arrow-jump")
        const shopIcon = document.getElementById("shop-icon")
        arrowJump.addEventListener('click', () => {
            shopIcon.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'});
        });
    }
    


    // Bank Page Setup
    // const bankPage = document.location.pathname
    // if (bankPage === "/Main/Bank/bank.html") {
       if (document.body.dataset.page === 'bank') {

        // Sets user name if given
        bankFunctions.checkUserName()

        // Updates/Checks Bank Balance innerHTML & Cloud Loan Status
        bankFunctions.updateBalances()

        // Get Loan Button
        const loanButton = document.getElementById("get-loan-button")
        loanButton.addEventListener('click', () => {
            bankFunctions.verifyLoanInput()
        });
    };
    
    
    // Shop Page Setup
    // const shopPage = document.location.pathname
    // if (shopPage === "/Main/Shop/shop.html") {
    if (document.body.dataset.page === 'shop') {
        shopFunctions.initializeShopPage()
        shopFunctions.updateBalances()
    }

    // Work Page Setup
    // const workPage = document.location.pathname
    // if (workPage === "/Main/Work/work.html") {
    if (document.body.dataset.page === 'work') {

        workFunctions.showOrHideRepayLoanButton()

        // Transfer to Bank Button
        const bankButton = document.getElementById("bank-button")
        bankButton.addEventListener('click', () => {
            const loanStatus = workFunctions.checkLoanStatus()
            loanStatus ? workFunctions.loanIsTrue() : workFunctions.loanIsFalse()
            // workFunctions.checkLoanStatus ? workFunctions.loanIsTrue() : workFunctions.loanIsFalse()
        });

        // Earn Money Button
        const workButton = document.getElementById("work-button")
        workButton.addEventListener('click', () => {
            const workBalanceEl = document.getElementById("work-balance")
            let currentWorkBalance = parseInt(workBalanceEl.innerHTML)
            const work = 100
    
            currentWorkBalance += work
            workBalanceEl.innerHTML = ` ${currentWorkBalance} Kr`
        });

        // Repay Loan Button
        const repayLoanButton = document.getElementById("repay-loan-button")
        const workBalanceEl = document.getElementById("work-balance")

        repayLoanButton.addEventListener('click', () => {

            const moneyEarned = workBalanceEl.innerHTML
            if (parseInt(moneyEarned) > 0) {
                let cloudLoanBalance = parseInt(localStorage.getItem('loanBalance'))
                let currentWorkBalance = parseInt(workBalanceEl.innerHTML)

                currentWorkBalance <= cloudLoanBalance ? workFunctions.everythingToLoan() : workFunctions.someToLoan()
                const loanButtonStatus = workFunctions.showOrHideRepayLoanButton()

                if (!loanButtonStatus) alert("You've paid back your loan in full")

            } 

            //     if (cloudLoanBalance === 0) alert("You've paid back your loan in full \nWe hope to see you again!")
            // } else {
            //     prompt("there is no money to transfer")
            // }
    
            // let cloudBankBalance = parseInt(localStorage.getItem('bankBalance')) || 0
            // let cloudLoanBalance = parseInt(localStorage.getItem('loanBalance'))
            // let currentWorkBalance = parseInt(workBalanceEl.innerHTML)
            // currentWorkBalance <= cloudLoanBalance ? workFunctions.everythingToLoan() : workFunctions.someToLoan()
            // workFunctions.showOrHideRepayLoanButton()
            // alert("You've paid back your loan in full! \nWe hope to see you again!")
        });
    }

})