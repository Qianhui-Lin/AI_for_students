# 📚 TrainWise – AI-Powered Training Recommender

TrainWise is a Node.js Express backend that uses OpenAI’s GPT model to recommend university training opportunities to students based on their academic interests or project needs.

---

## 🚀 Features

- Recommends training programs using OpenAI's GPT-4o mini model
- Accepts message history to provide context-aware suggestions
- Express backend with CORS enabled for local frontend access



## 📦 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/YOUR_USERNAME/TrainWise.git
cd TrainWise
```

### 2. Install Dependencies

```bash
npm init -y
npm install express cors openai dotenv
```

### 3. Set Up Environment Variables

Create a `.env` file in the project root, and add your OpenAI API key:

```env
# .env
OPENAI_API_KEY=your-openai-api-key-here
```

📌 The `.env` file is ignored by Git for security. You can refer to `.env.example` as a template.

---

## 🚀 Running the Server

```bash
node server.js
```

The server will run at:

```
http://localhost:5050
```

---


## 🔐 Environment Variable Reference

**`.env.example`**

```env
OPENAI_API_KEY=your-openai-api-key-here
```

You can get your API key from:  
[https://platform.openai.com/account/api-keys](https://platform.openai.com/account/api-keys)

---


## ✅ Note

> The actual API key is excluded from the repository for security reasons. Please create a `.env` file based on `.env.example` with your own OpenAI key to run this app locally.

