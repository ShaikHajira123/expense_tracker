# Expense Tracker - Frontend

## Overview

The frontend of the Expense Tracker application allows users to track their expenses and view various analytics such as total spending, category-wise spending, and monthly spending. The application is built using **React**, **Redux**, and **TypeScript** for state management, routing, and a type-safe development environment.

## Features

- **User Authentication**: 
  - Users can sign up and log in using their credentials.
  - After successful login, users are authenticated using JWT tokens.
  
- **Expense Management**: 
  - Users can view their total expenses and add new expense entries.
  - Expenses are categorized and can be filtered based on categories.
  
- **Analytics**:
  - Visual representation of monthly and category-wise expenses.
  - Ability to compare expenses across multiple months.
  - See percentage of spending per category for each month.

## Tech Stack

- **React**: For building the user interface.
- **Redux**: For managing the application’s state (authentication, user data, expenses).
- **React Router**: For client-side routing.
- **Axios**: For making HTTP requests to the backend.
- **TailwindCSS**: For styling the components.

## Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/ShaikHajira123/expense-tracker.git
    cd expense-tracker
    ```

2. Install the dependencies:
    ```bash
    npm install
    ```

4. Start the development server:
    ```bash
    npm run dev
    ```

5. The frontend will be running.

## Routes

| Route                 | Description                          | Method |
|-----------------------|--------------------------------------|--------|
| `/`                   | Login form for authenticating users | POST |
| `/auth`               | Sign-up form for creating a new user | POST |
| `/dashboard`          | Dashboard page showing expense categories and analytics | GET |
| `/expense`            | Create or view, update and delete expenses | POST/GET/PATCH/DELETE |

## Usage

- The user can navigate to the "Login" or "Signup" page to authenticate themselves.
- After logging in, users will be redirected to the dashboard, where they can view charts and analytics and navigate to view and add new expenses page.
- Monthly and category-wise analytics will be shown to track spending trends.

