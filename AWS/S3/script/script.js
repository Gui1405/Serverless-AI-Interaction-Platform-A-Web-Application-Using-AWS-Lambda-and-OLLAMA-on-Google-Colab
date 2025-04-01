const OLLAMA_API_URL = "o_endpoint_da_apigateway/generate";
const MODELS = ["gemma3:1b", "llama3.2"];
let selectedModel = null;
let histories = {};

document.addEventListener("DOMContentLoaded", () => {
    const modelButtonsContainer = document.getElementById("model-buttons");
    const chatArea = document.getElementById("chat-area");
    const userInput = document.getElementById("user-input");
    const sendBtn = document.getElementById("send-btn");
    const newChatBtn = document.getElementById("new-chat");

    // Criar botões de modelo
    MODELS.forEach(model => {
        const btn = document.createElement("button");
        btn.className = "btn";
        btn.textContent = model;
        btn.addEventListener("click", () => selectModel(model));
        modelButtonsContainer.appendChild(btn);
    });

    // Selecionar modelo
    function selectModel(model) {
        selectedModel = model;
        if (!histories[model]) {
            histories[model] = [];
        }
        chatArea.innerHTML = "";
        histories[model].forEach(msg => displayMessage(msg.content, msg.role));
        highlightSelectedModel(model);
    }

    // Destacar modelo selecionado
    function highlightSelectedModel(model) {
        const buttons = document.querySelectorAll("#model-buttons .btn");
        buttons.forEach(btn => {
            btn.style.backgroundColor = btn.textContent === model ? "#235284" : "#222222";
        });
    }

    // Exibir mensagem no chat
    function displayMessage(text, role) {
        const messageDiv = document.createElement("div");
        messageDiv.className = `message ${role}-message`;
        messageDiv.textContent = role === "user" ? `Você: ${text}` : `Ollama: ${text}`;
        chatArea.appendChild(messageDiv);
        chatArea.scrollTop = chatArea.scrollHeight;
    }

    // Enviar mensagem
    sendBtn.addEventListener("click", sendMessage);
    userInput.addEventListener("keypress", (e) => {
        if (e.key === "Enter") sendMessage();
    });

    function sendMessage() {
        if (!selectedModel) return;
        const userText = userInput.value.trim();
        if (!userText) return;

        displayMessage(userText, "user");
        histories[selectedModel].push({ role: "user", content: userText });

        const data = {
            model: selectedModel,
            prompt: histories[selectedModel].map(msg => msg.content).join("\n"),
            stream: false
        };

        fetch(OLLAMA_API_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            const botResponse = data.response || "Nenhuma resposta recebida.";
            displayMessage(botResponse, "bot");
            histories[selectedModel].push({ role: "assistant", content: botResponse });
        })
        .catch(error => {
            displayMessage(`Erro de conexão: ${error}`, "bot");
        });

        userInput.value = "";
    }

    // Novo chat
    newChatBtn.addEventListener("click", () => {
        if (selectedModel) {
            histories[selectedModel] = [];
            chatArea.innerHTML = "";
        }
    });
});
