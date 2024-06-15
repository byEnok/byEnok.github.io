let selectedComputer = null;

async function getApiData() {
    const COMPUTER_API_URL = "https://hickory-quilled-actress.glitch.me/computers"
    try {
        const response = await fetch(COMPUTER_API_URL)
        if(!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        
        const computers = await response.json()
        populateDropdownSelection(computers)

    } catch (error) {
        console.error("Failed to fetch computers from API:", error);
    }
};


function updateBalances() {
    setBankBalance()
    setLoanStatusAndBalance()
}

// Set Bank Balance 
function setBankBalance() {
    const bankBalanceEl = document.getElementById("bank-balance")
    let cloudBankBalance = parseInt(localStorage.getItem('bankBalance')) || 0
    bankBalanceEl.innerHTML = ` Current Balance: ${cloudBankBalance} Kr`
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


function populateDropdownSelection(computers) {
    computers.forEach(computer => {
        const computerList = document.getElementById("computer-list")
        const option = document.createElement("option")
        option.value = computer.id
        option.text = computer.title
        computerList.appendChild(option)
        
        // setComputerDetails(computers) 

        computerList.addEventListener('click', () => {
            computerList.options[0].display = true
        })
    
        computerList.addEventListener('change', () => {
            setComputerDetails(computers) 
            const defaultOption = computerList.options[0] 
            // computerList.options[0].disabled = true;
            defaultOption.style.display = "none";
        })
    })
};

function setComputerDetails(computers) {

    const computerList = document.getElementById("computer-list")
    const selectedId = parseInt(computerList.value) 
    const computerFeatures = document.getElementById("computer-features")
    selectedComputer = computers.find( computer => selectedId === computer.id )
    
    const pngUrl = `https://hickory-quilled-actress.glitch.me/assets/images/${selectedId}.png`;
    const jpgUrl = `https://hickory-quilled-actress.glitch.me/assets/images/${selectedId}.jpg`;

    const computerImage = document.getElementById("computer-image")
    const computerName = document.getElementById("computer-name")
    const computerDescription = document.getElementById("computer-description")
    const computerPrice = document.getElementById("computer-price")

    if (selectedComputer) {

        // selectedComputer.image === `assets/images/${selectedId}.png` ? computerImage.src = pngUrl : computerImage.src = jpgUrl
        selectedComputer.image && selectedComputer.image === `assets/images/${selectedId}.png` ? computerImage.src = pngUrl : computerImage.src = jpgUrl
        // Old tries below
        // selectedComputer.image ? computerImage.alt = `Picture of ${computerName.innerHTML}` : computerImage.alt = `${computerName.innerHTML} computer has no image`
        // computerImage.alt = selectedComputer.image ? `Picture of ${computerName.innerHTML}` : `${computerName.innerHTML} computer has no image`;

        // If there's no image -- Not needed i thnk
        // if (selectedComputer.image = `assets/images/5.jpg`) {
        //     computerImage.alt = `${computerName.innerHTML} has no image`
        // } 
        // else {

        //     computerImage.alt = `Picture of ${computerName.innerHTML}`
        // }

        
        computerName.innerHTML = selectedComputer.title
        computerDescription.innerHTML = selectedComputer.description
        computerPrice.innerHTML = `${selectedComputer.price} Kr`

        computerFeatures.innerHTML = ""
        selectedComputer.specs.forEach(spec => {
            const featureEl = document.createElement("li")
            featureEl.innerHTML = spec
            computerFeatures.appendChild(featureEl)
        });
    }
 
    const buyButton = document.getElementById("buy-button")
        buyButton.ariaDisabled = false; 
        // buyButton.disabled = false; 
}

function computerPurchase() {
    if (selectedComputer) {
        const computerPrice = selectedComputer.price
        let cloudBankBalance = parseInt(localStorage.getItem('bankBalance')) || 0
        cloudBankBalance >= computerPrice ? enoughMoney(computerPrice, cloudBankBalance) : notEnoughMoney(cloudBankBalance)
        setBankBalance()
    }
};

function enoughMoney (computerPrice, cloudBankBalance) {
    cloudBankBalance -= computerPrice
    localStorage.setItem('bankBalance', cloudBankBalance.toString())
    return alert("The purchase was successfull! Enjoy your new computer!")
}

function notEnoughMoney(cloudBankBalance) {
    return alert(`You don't have enough funds for this computer. \nFunds available: ${cloudBankBalance} Kr`)
}

function initializeShopPage() {
    getApiData()

    const buyButton = document.getElementById("buy-button")
    buyButton.addEventListener('click', () => {
        computerPurchase()
    })
}

const shopFunctions = {
    getApiData,
    populateDropdownSelection,
    setComputerDetails,
    computerPurchase,
    enoughMoney,
    notEnoughMoney,
    updateBalances,
    setLoanStatusAndBalance,
    setBankBalance,
    initializeShopPage
}

export default shopFunctions