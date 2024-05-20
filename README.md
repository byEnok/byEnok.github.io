  # ForeverFunds

  ForeverFunds is a great new and innovative way to make money and shop computers quick and easy! 
  This is a small website with four different pages: Home, Bank, Shop, and Work, each with specific functionalities described below.

  ## Table of Contents
  - [Pages Overview](#pages-overview)
    - [Home Page](#1-home-page)
    - [Bank Page](#2-bank-page)
    - [Shop Page](#3-shop-page)
    - [Work Page](#4-work-page)
  - [Project Setup](#project-setup)
  - [Technologies Used](#technologies-used)
  - [Contribution Guidelines](#contribution-guidelines)
  - [License](#license)

  ## Pages Overview

  ### 1. Home Page
  - **Description**: The main landing page of the website.
  - **Features**:
    - Scroll down or press the hovering button at the bottom of the page to navigate further down the site.
    - Three cards are displayed, each representing one of the other pages (Bank, Shop, Work).
    - **New Feature**: Input prompt for username on homepage launch, which the bank page will use to personalize the title on the bank card.
    - **New Feature**: A button at the bottom of the homepage for users to clear the localStorage data. This button has a confirmation input that takes "y" to continue and reset data, and anything else to abort the reset procedure.

  ### 2. Bank Page
  - **Description**: A page where users can manage their bank balance and loans.
  - **Features**:
    - Display of user's bank balance and loan balance.
    - A button to request a loan.
      - **Conditions for Loan Approval**:
        - No existing outstanding loan.
        - The requested loan amount is not more than twice the user's current bank balance.
    - **New Feature**: Personalized title on the bank card using the username entered on the homepage.

  ### 3. Shop Page
  - **Description**: A page where users can purchase computers.
  - **Features**:
    - Display of the current balance in the middle of the screen.
    - Dropdown menu to select different computers, displaying the corresponding information, picture, and price.
    - A button to purchase the selected computer.
      - **Conditions for Purchase**:
        - User must have sufficient funds to buy the selected computer.
    - **New Feature**: A card showing the current bank balance so users don't have to navigate back to the bank page to see their balance.

  ### 4. Work Page
  - **Description**: A page where users can perform work and bank-related actions.
  - **Features**:
    - Three buttons: Bank, Work, and Repay Loan.
      - **Bank Button**:
        - Always visible.
        - Transfers collected money to the bank balance.
        - If there is an outstanding loan, 10% of the salary is deducted and transferred to the loan balance before the remaining amount is added to the bank balance.
      - **Work Button**:
        - Always visible.
        - Allows the user to collect money by an increment of 100.
      - **Repay Loan Button**:
        - Hidden unless there is an active/outstanding loan.
        - Transfers the full value of the current pay amount to the loan balance.
        - Any remaining funds after paying off the loan are transferred to the bank balance.


  ## Project Setup

  To set up the project locally, follow these steps:

  1. **Clone the repository**:
      - Change the current working directory to the location where you want the cloned directory:
        ```sh
        cd <repository-folder>
        ```
      - Clone the repository:
        ```sh
        git clone <repository-url>
        ```
      - Press Enter to create your local clone.

  ## Technologies Used
  - HTML
  - CSS
  - JavaScript

  ## Contribution Guidelines

  1. Fork the repository.
  2. Create a new branch:
      ```sh
      git checkout -b feature-branch
      ```
  3. Make your changes.
  4. Commit your changes:
      ```sh
      git commit -m 'Add some feature'
      ```
  5. Push to the branch:
      ```sh
      git push origin feature-branch
      ```
  6. Open a pull request.

  ## License

  This project is licensed under the MIT License.
