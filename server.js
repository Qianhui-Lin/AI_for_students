const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require("openai");
const fs = require('fs');
const path = require('path');

const app = express();
app.use(cors());
// app.use(cors({
//   origin: "http://127.0.0.1:5500", 
//   methods: ["POST","GET"],
//   allowedHeaders: ["Content-Type"]
// }));
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});



app.get("/", (req, res) => {
    res.send("Hello from the backend!");
  });

app.post('/recommend', async (req, res) => {
  const messages = req.body.messages || [];
  let events = [];
  try {
    const data = fs.readFileSync(path.join(__dirname, 'training_data.json'), 'utf-8');
    events = JSON.parse(data);
  } catch (error) {
    console.error("❌ Failed to read trainingData.json:", error);
    return res.status(500).json({ error: "Failed to load training data." });
  }

  const formatted = events.map((e, i) => {
    const eligible = e.eligible_students?.join(", ") || "All students";
    return `${i + 1}. ${e.title} - ${e.description} 
  (Time: ${e.time}, Place: ${e.place}, Info: ${e.website}, Eligible: ${eligible})`;
  }).join("\n\n");
  
  
  try {
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `You are an intelligent assistant helping university students discover training opportunities across departments.
        
        Each event includes:
        - a title
        - a description
        - time and place
        - a website link for more details
        - a list of eligible students (e.g., MSc, MRes, PhD)
        
        Only recommend trainings that are appropriate for the student’s needs or goals.`
          },
          {
            role: "user",
            content: `Here are the available training events:\n\n${formatted}\n\nNow, let’s start the conversation.`
          },
          ...messages
        ]
      
      });
  
      res.json({ response: chatResponse.choices[0].message.content });
    } catch (err) {
      console.error("OpenAI error:", err);
      res.status(500).json({ error: 'OpenAI request failed.' });
    }
  });


const PORT = 5050;
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

