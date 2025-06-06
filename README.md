# HydroSense Monitor

To unlock the full potential of crops, providing the best growing conditions is important.
This is a demo app created in honor of Agwa company. It monitors a growing cabin by sending pH, temperature, and conductivity readings every ten minutes. Acting like a virtual agronomist, it helps track the health and nutrition needs of crops to support their growth.

Inspired by Jewish philosophy to make the world a better place, the aim is to improve the lives of people who lack access to fresh crops because they work in remote and isolated places like rigs and vessels.

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [Documentation of thought process](#documentation-of-thought-process)

## Documentation of thought process  

After reading the home assignment requirements a couple of time and articles on Agwa's website (to get to know the company and for design inspiration), I began braking down each visual requirement in to small component using [Miro (digital canvas for sketches) for initial planning.](https://miro.com/app/board/uXjVIuWrTeg=/). On the canvas it easy to add and drop ideas much faster than coding! AGWA's growing cabin had gave me the inspiration for background color and because data it collected pre unit (tray of crops) I have decided to display 3 like trays to have border color green if healthy or red if the unit need attention for quick overview of the units condition.  
I choose to have A progress circle around each "crop" to show case the level of ripeness of the corp, after asking couple of people what it the most important pice of information they wanted to know if they had such growing cabin and all said "well to know when is it going to be ripe and ready to be eaten!".  

After all the components where in place and I was happy with overall design, I have began generally thinking (in light of the way React works) on which components fetches data what state each will need or pass as props to it's children. planning ahead can save ton of time developing.  

When I start a new project I know that frontend take most of the time therefore what I like do is, to start with creating a local service with builder functions to create initial data required for the design and to store it in the browser local storage.  

The parent component fetches the data as promise from local storage to simulate async data fetching from the backend. After each major section of code (service functions | React components) I have began describing jest tests for it. After the design was ready the migration to the real service that makes http request to the backend was pretty easy.  

This process of work save the forth and back between frontend and backend. finally I took some of the functionally I wrote in the local service to python Fast-API backend server and had test for the endpoints.             


## Installation
To install the project follow these steps:  
Open your terminal and go to the backend directory and install:
 
    cd backend
    pip install -r requirements.txt

Run the backend with:

    uvicorn main:app

To run the frontend of the application follow these steps:    
Install dependencies:

    npm install

Run the frontend with:

    npm run dev

## Testing
**Backend Tests**      
This project includes backend tests like, payload validation, classification logic, and retrieval of alerts using pytest. These tests covers the basic API functionality and also focus on production-critical scenarios to ensure strong code.

In addition I added tests which I think can be valuable in the real-world:
A test for timestamps which are out of order, A test to ensures the system responds correctly with (400 or 422) when malformed JSON is submitted.

**Extra test**  
for Persistent issues - not-yet-implemented in code - the  test checks if a unit remains in a Needs Attention state for more than 3 hours, What can point at a malfunction in hardware that responsible to fix it as soon as it discovers a bad readings.    

To run tests for the backend project follow these steps:  
Open your terminal and go to the backend directory:

    cd backend

Run the following command to execute all tests:

    pytest


**Frontend Tests**  
These tests suite covers functionality of the monitor, ensuring components and titles render correctly, and visual logic like color indicators behaves as expected. It also verifies critical data flow operations, such as fetching alerts for problematic readings and sending randomly generated sensor data to the backend.

To run the frontend tests suites:

    npm run test

## Usage
When you launch the app, a modal window appears with a brief self-introduction. You can close this modal by clicking the "Start Technical Exercise" button.

**Main Display**

The main interface simulates three trays inside of a growing cabin. Each tray is marked with color to reflect the state of its most recent pH reading:


    🟢 Green – Healthy unit (pH in the correct range)

    🔴 Red – Needs Attention (pH outside the healthy range)

This gives a quick, visual overview of the unit's condition.

**Unit Radio Buttons**

Clicking the radio button on a unit reveals a table of 20 plants within the tray.  

**My Enhancement**  
Each plant includes:

A circle indicating the age of the crop - the more complete the circle, the older the crop.

A tooltip that shows the crop's growth progress in %

This design is based on a simple user-focused insight:

"In the end, what matters most is when the crop is ready to be eaten."

**Future Integration Ideas**

There are plans to integrate the app with an external API to fetch additional data such as:

    Nutritional values of the crops

    Recipes based on what’s growing

This would enhance the app’s usefulness, especially for remote workers who rely on cabin-grown food.

**🔍 Unit Panel**

Each unit also includes a Unit ID and an Inspect button. When clicked, this opens a modal displaying the last 10 problematic sensor readings, sorted by timestamp (most recent first). This allows deeper inspection of the unit’s condition over time.

## App demo

<p align="center">
  <img src="https://res.cloudinary.com/dii16awkb/image/upload/v1749136294/gxh8eref5x4ban1vjhih.gif" alt="App demo" width="600">
</p>
