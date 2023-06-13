[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/w5ovOekq)
# CS 110 Alternative Project (project-meraki)
## Meraki Members
  > #### Hannah Bach (hbach003@ucr.edu)
  > #### Jasmine Lau (jlau053@ucr.edu)
  > #### Connie Pak (cpak014@ucr.edu)
  > #### Alexander Roh (aroh002@ucr.edu)

## Goal:
  - Develop a platform that allows users to communicate with each other through text messages. It provides a real-time messaging experience and supports multiple users concurrently.

## Features:
  - **Registration:** users can create accounts and log in
  - **Create and Join Chatrooms:** users can create their own chatrooms or join existing ones
      - Room creators are able to delete rooms
  - **Real-time Messaging:** users within chatrooms can send, recieve, and react to messages in real-time
      - Message authors are able to edit their messages
  - **User Profiles:** users are able to change their account name and change their profile photo
  - **Search:** users are able to search for specific messages in the chatroom

## Technologies Used:
  - **Front-end:** HTML, CSS, JavaScript, React.js, Socket.io-cliend
  - **Back-end:** Node.js, Express.js, Mongoose, Dotenv, Express-session, Socket.io
  - **Database:** MongoDB

## Installation:
  **1.** Clone the repository: `git clone https://github.com/UCR-CS110-S23/project-meraki.git` <br>
  **2.** Navigate to the project directory: `cd "Lab 6"` then `cd Messenger` <br>
  **3.** Split the terminal and navigate to the front-end and back-end: `cd front` and `cd back` <br>
  **4.** In both, install the dependencies: `npm install` <br>
  **5.** Set up the environment variables: <br>
  - Create a `.env` file in the back-end directory <br> 
  - Add the necessary environment variables such as database connection details, port number, and session-secret
  
  **6.** Start the development server: `npm start` <br>
  **7.** Connect to the database: `npx nodemon start` <br>
  
 ---
## **project-meraki**
  project-meraki created by GitHub Classroom <br><br>
  Before we decided to do the alternative final project, Lab 6 was done in a separate CS110 Lab repository. We cloned the original lab repository and merged it with this final project repository, so the commit history will contain commits from labs 1-5.
  * To only view the commit history for the alternative project, please start on May 29, 2023.
  ![image](https://github.com/UCR-CS110-S23/project-meraki/assets/57569284/510850da-fbe3-4b6a-a72d-a1190d921211)
