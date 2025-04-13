# 📚 TrainWise – AI-Powered Training Recommender

TrainWise AI is a conversational assistant powered by AI that helps university students discover relevant training opportunities (i.e., cross-departmental courses, workshops, and skills sessions) based on their goals, interests, or research needs.

## 🎯 Examples
See how students can use TrainWise:

👉 **[Explore Examples](example.md)**  

---
## 🛠️ Prerequisites  
Before running the project, ensure you have:  
- **Node.js** installed 
- An **OpenAI API key**.  

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/Qianhui-Lin/AI_for_students.git
cd AI_for_students
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



