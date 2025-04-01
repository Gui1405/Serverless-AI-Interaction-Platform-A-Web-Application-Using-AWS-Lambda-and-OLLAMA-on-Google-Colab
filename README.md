> **Note:** I created a video tutorial showing how to configure everything to work: https://youtu.be/4S85cvHn55Q?si=Rajio2v6NBe5PJ1W

# 📌 Project Documentation

## 📝 Overview

This project demonstrates the use of various technologies within the Free Tier. It features an interactive web app where users interact with an AI model running on **OLLAMA**. The backend utilizes AWS Lambda and API Gateway to interact with the OLLAMA server, while the frontend is hosted on Amazon S3, offering a scalable, cost-effective solution.

OLLAMA is a platform that facilitates the execution of AI models on its server. For this project, the OLLAMA server is hosted on **Google Colab**, where it processes requests sent by AWS Lambda.

---

## 🏗️ System Architecture

The project follows a **serverless** and distributed approach, using the following components:

### 📌 Website

- **Technologies:** HTML, CSS, and JavaScript.
- **Hosting:** Amazon S3 (Simple Storage Service).
- **Functionality:** Interface for users to interact with the AI model through OLLAMA.

### 📌 Backend

- **AWS Lambda:** Serverless function that processes website requests and intermediates communication with the OLLAMA server. Remember to set a longer wait time for the server's response, because the response takes a while.
- **API Gateway:** Exposes RESTful endpoints for frontend-backend interaction.

### 📌 OLLAMA Server

- **Platform:** Google Colab.
- **Function:** Executes the AI model on its server, processing requests sent by AWS Lambda.
- **Communication:** The OLLAMA server exposes an API endpoint to receive HTTP requests from AWS Lambda.

---

## 📚 Technologies Used

### 🔹 **Amazon S3**

Amazon Simple Storage Service (S3) is a scalable and secure AWS storage service. In this project, it is used to host frontend HTML, CSS, and JavaScript files. S3 allows fast content delivery with low latency and high availability.

### 🔹 **AWS Lambda**

AWS Lambda is a serverless computing service that runs code without the need for server provisioning. In this project, the Lambda function receives requests from the frontend via API Gateway, processes the data, and sends it to the OLLAMA server for responses.

### 🔹 **Amazon API Gateway**

API Gateway is a fully managed AWS service for creating, publishing, maintaining, monitoring, and securing APIs at scale. Here, it exposes HTTP endpoints to connect the frontend to the backend, directing requests to the Lambda function.

### 🔹 **OLLAMA**

OLLAMA is a platform that enables users to run AI models on its server. In this project, the OLLAMA server is hosted on Google Colab, which processes incoming requests from AWS Lambda.

---

## 🔄 Request Flow

1. The user accesses the website hosted on S3.
2. The frontend makes an HTTP request to API Gateway.
3. API Gateway triggers the AWS Lambda function.
4. AWS Lambda forwards the request to the OLLAMA server (running on Google Colab).
5. The OLLAMA server processes the request and returns the response.
6. The response is sent back to the frontend via API Gateway.

---

## 🚀 How to Run the Project

### 📌 Requirements

To run this project, you will need the following resources:

- AWS account with permissions to configure S3, API Gateway, and Lambda.
- Google account to run OLLAMA on Google Colab.
- **ngrok account** to expose the OLLAMA server to the internet.

### 📌 Steps

1. **Clone the repository:**
   ```sh
   git clone https://github.com/Gui1405/Serverless-AI-Interaction-Platform-A-Web-Application-Using-AWS-Lambda-and-OLLAMA-on-Google-Colab.git
   ```
2. **Set up the Frontend:**
   - Host the HTML, CSS, and JS files on Amazon S3.
3. **Set up the Backend:**
   - Create an AWS Lambda function and configure it to run the provided code from the `AWS/Lambda/ProxyParaColab.txt` file.
   - Configure API Gateway to expose a public endpoint.
4. **Set up the OLLAMA Server:**
   - Open Google Colab and execute the OLLAMA server script (located in `Google Colab/ollama_server.ipynb`).
   - Use the ngrok URL as the OLLAMA endpoint in the AWS Lambda function.
5. **Test the application:**
   - Access the website hosted on S3 and interact with the AI model through the OLLAMA framework.

---

## 📂 Repository Structure

```
/your-repository
├── AWS
│ ├── Lambda
│ │ └── ProxyParaColab.txt
│ ├── S3
│ │ └── index.html
│ │ └── style
│ │ │ └── style.css
│ └── script
│ │ │ └── script.js
├── Google Colab
│ └── ollama_server.ipynb
└── README.md
```

---

## 🛠️ Function Explanations

### **Frontend (script.js)**

- **`selectModel(model)`**: Sets the model selected by the user and loads the associated conversation history. If no history exists for the selected model, it initializes an empty array to store future messages.
- **`highlightSelectedModel(model)`**: Highlights the selected model's button by changing its background color, visually indicating which model is currently active. All other buttons are reset to their default color.
- **`displayMessage(text, role)`**: Displays a message in the chat area, differentiating between user and assistant messages by applying distinct CSS classes (`user-message` and `bot-message`). The chat area is automatically scrolled to the bottom to ensure the latest message is visible.
- **`sendMessage()`**: Sends the user’s message to the OLLAMA API via a POST request. The message is added to the chat history and displayed in the chat area. After receiving a response from the API, the bot's reply is also displayed and stored in the history. If an error occurs during the request, an error message is shown.
- **`DOMContentLoaded` Event**: Initializes the interface by setting up model selection buttons, configuring event listeners for sending messages (both via button click and Enter key press), and adding functionality to the 'New Chat' button to reset the conversation history.
- **`newChatBtn` Event Listener**: Resets the conversation history for the selected model and clears the chat area, allowing the user to start a new conversation.

---

## 📊 Monitoring

### 🔍 Monitoring

- **AWS CloudWatch**: Collects logs from Lambda functions and API Gateway events.
- **Google Colab Logs**: Records received requests and responses sent by the OLLAMA server.

---

## 🎯 Final Considerations

This architecture enables scalability and easy maintenance, leveraging the benefits of **serverless computing** and **cloud hosting**. 📌 Future improvements may include **migrating the OLLAMA server to an EC2 instance or Fargate**, if higher performance is required.

---

## 👤 Author

Developed by Guilherme Barroso Costa.
