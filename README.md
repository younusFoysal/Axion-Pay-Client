
<h1 align="center">AXION PAY </h1>


<p align="center">
  <img src="https://github.com/younusFoysal/HR-Hub-Pro-Client/blob/main/public/hrHubPro.gif" alt="Axion Pay">
</p>
<br>


## Live Link:

[https://axion-pay.web.app](https://axion-pay.web.app)

## Overview:
**Axion Pay** is a basic MFS(Mobile Financial Service) application (like bKash or Binance) using React.js, Node.js, 
Express.js, and MongoDB. Implemented essential features: user authentication, send money,
cash-out, and balance inquiries. Ensure a simple and secure web interface.

## Features:

### User
* After registration, the account is activated by `admin approval`, the user will get a Bonus of
  $40 which will be credited to the user’s balance. This is a one time bonus for
  new users.

* Users can `send money` to other users. 
   For every transaction over $100, a user has to pay a fee of $5 . 
   A user needs to do a transaction with at least $50.
* Users can only `cash out` through an agent. There will be a fee which is 1.5% of the transaction amount
  and the fee will be deducted from the user's balance and added to the balance
  of the agent.
* Users can `cash-in` through agents without a fee. 
  For cash-in the user will send a request to an agent, if the agent approves the
  request, then the amount will be added to the balance of the user and deducted
  from the balance of the agent.
* Users can view their last 10 `transactions`.


### Agent
* After registration, the account is activated by `admin approval`, the agent will get a Bonus of
  $10,000 which will be credited to the agent’s balance. This is a one time
  bonus for new agents.
* Agents can `manage transactions` like e.g. **cash-in request** or **cash-out request**. If
  the agent approves the cash-in request from the user, the amount will be
  deducted from the agent’s balance and added to the user's balance. And if the
  agent approves a cash-out request from the user, the amount will be added to the
  agent's balance and deducted from the user's balance.
* Agents can view their last 20 `transactions`.

### Admin
* View all users, search any specific user by name, and `manage user accounts` like
  activate account/block account.
* Admin can see `all transactions` within the system

<h3 align="center">All Credentials</h3>

### Admin Credentials:
```
Admin Email: foysal@gmail.com
Admin Pin: 12312
```
### Agent Credentials:
```
Admin Email: altaf@gmail.com
Admin Pin: 12378
```
### User Credentials:
```
Admin Email: nafisa@gmail.com
Admin Pin: 12345
```


Installed Npm Packages:
```
@headlessui/react
@stripe/react-stripe-js
@tanstack/react-query
axios
Firebase
react
react-hot-toast
react-icons
react-router-dom
react-toastify
recharts
sweetalert2
tailwindcss
```

### How to Set Up Locally

1. Install npm packages:
    ```sh
    npm i
    ```
2. Create a `.env.local` file containing API keys and Firebase credentials. 
3. Run the API server from [Axion-Pay-Server](https://github.com/younusFoysal/Axion-Pay-Server). 
4. Run the development server:
    ```sh
    npm run dev
    ```
5. Browse the application at:
    ```sh
    http://localhost:5173/
    ```

