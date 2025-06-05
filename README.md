# HydroSense Monitor

To unlock the full potential of crops, providing the best growing conditions is important.
This is a demo app created in honor of Agwa company. It monitors a growing cabin by sending pH, temperature, and conductivity readings every ten minutes. Acting like a simple virtual agronomist, it helps track the health and nutrition needs of crops to support their growth.

Inspired by Jewish philosophy to make the world a better place, the aim is to improve the lives of people who lack access to fresh crops because they work in remote and isolated places like rigs and vessels.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Contributing](#contributing)
- [License](#license)

## Installation
To install the project follow these steps:
 Open your terminal and go to the backend directory:
 
    cd backend
    pip install -r requirements.txt
    Run the backend with:
    uvicorn main:app

To run the frontend of the application, follow these steps:
Install dependencies:

    npm install
    Run the frontend with:
    npm run dev

## Testing
Backend Tests
This project includes backend tests like, payload validation, classification logic, and retrieval of alerts using pytest. These tests covers the basic API functionality and also focus on production-critical scenarios to ensure strong code.

In addition I added tests which I think can be valuable in the real-world:
A test for timestamp which are out of order ,a test to ensures the system responds correctly with (400 or 422) when malformed JSON is submitted.

Extra test for Persistent issues - not-yet-implemented in code - test checks if a unit remains in a Needs Attention state for more than 3 hours. which can point a malfunction in hardware, beacuse system needs to fix it as soon as it discovers bad readings  

To run tests for the backend project follow these steps:
1.Open your terminal and go to the backend directory:
cd backend
2.Run the following command to execute all tests:
    pytest


Frontend Tests
These tests suite covers functionality of the monitor , ensuring components and titles render correctly, and visual logic like color indicators behaves as expected. It also verifies critical data flow operations, such as fetching alerts for problematic readings and sending randomly generated sensor data to the backend.

To run the frontend tests suites:
    npm run test

## Usage
When you launch the app, a modal window appears with a brief self-introduction. You can close this modal by clicking the "Start Technical Exercise" button.

🌱 Main Display

The main interface simulates three trays inside a growing cabin. Each tray is marked with color to reflect the state of its most recent pH reading:

    🟢 Green – Healthy unit (pH in the correct range)

    🔴 Red – Needs Attention (pH outside the healthy range)

This gives a quick, visual overview of the cabin's condition.

Unit Radio Buttons

Clicking the radio button on a unit reveals a table of 20 plants within that tray. Each plant includes:

    A circle indicating the age of the crop - the more complete the circle, the older the crop.

    A tooltip that shows the crop's growth progress in %

This design is based on a simple user-focused insight:

    "In the end, what matters most is when the crop is ready to be eaten."

🍽️ Future Integration Ideas

There are plans to integrate the app with an external API to fetch additional data such as:

    Nutritional values of the crops

    Recipes based on what’s growing

This would enhance the app’s usefulness, especially for remote workers who rely on cabin-grown food.

🔍 Unit Panel

Each unit also includes a Unit ID and an Inspect button. When clicked, this opens a modal displaying the last 10 sensor readings, sorted by timestamp (most recent first). This allows deeper inspection of the unit’s condition over time.


