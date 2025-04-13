const express = require('express');
const cors = require('cors');
require('dotenv').config();
const OpenAI = require("openai");

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

const trainingEvents = [
  "Intro to R for Social Science - Learn the basics of R programming for social science research.",
  "Advanced Machine Learning in Python - Deep dive into machine learning models using Python.",
  "Academic Writing Workshop - Improve writing skills for thesis and publication.",
  "Data Ethics and Privacy - Understand ethical issues in data handling.",
  "Environmental Modelling with GIS - Learn GIS tools for environmental research.",
  "Cross-Disciplinary Research Skills - A short course on how to work across disciplines effectively."
];

app.get("/", (req, res) => {
    res.send("Hello from the backend!");
  });

app.post('/recommend', async (req, res) => {
  const messages = req.body.messages || [];
  const formatted = trainingEvents.map((e, i) => `${i + 1}. ${e}`).join("\n");
  
  try {
      const chatResponse = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: "You are a helpful assistant that recommends university training opportunities to students based on their interests or project needs. Use the provided training list when suggesting options."
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

