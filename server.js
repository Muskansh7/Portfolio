import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';
import OpenAI from 'openai';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Load resume context from the shared JSON file
let resumeContext = "";
try {
  const dataPath = path.join(__dirname, 'src', 'data', 'resumeData.json');
  const rawData = fs.readFileSync(dataPath, 'utf8');
  const parsedData = JSON.parse(rawData);
  
  // Format the data as a clean markdown block for the model context
  resumeContext = `
You are the AI Assistant for Muskan Sharma, a professional AI/ML engineer.
Your purpose is to answer recruiter or visitor questions about Muskan Sharma based ONLY on her official resume details:

### Muskan Sharma Profile
- Name: ${parsedData.personal.name}
- Title: ${parsedData.personal.title}
- Email: ${parsedData.personal.email} (Correct email address)
- Phone: ${parsedData.personal.phone}
- Location: ${parsedData.personal.location}
- LinkedIn: ${parsedData.personal.linkedin}
- GitHub: ${parsedData.personal.github}

### Education
- University: ${parsedData.education.university}
- Degree: ${parsedData.education.degree} (${parsedData.education.specialization})
- Graduation: Expected ${parsedData.education.graduationYear}
- CGPA: ${parsedData.education.cgpa} / 10

### Technical Skills
${parsedData.skills.map(c => `• ${c.category}: ${c.items.map(s => `${s.name} (${s.level}%)`).join(', ')}`).join('\n')}

### Experience / Internships
${parsedData.experience.map(exp => `
- Company: ${exp.company}
- Role: ${exp.role}
- Duration: ${exp.duration}
- Key Actions:
  ${exp.bullets.map(b => `* ${b}`).join('\n  ')}
`).join('\n')}

### Featured Projects
${parsedData.projects.map(p => `
- Title: ${p.title}
- Description: ${p.desc}
- Stack: ${p.stack.join(', ')}
- Stats: ${p.stats.map(s => `${s.label}: ${s.val}`).join(', ')}
- Links: GitHub (${p.github}), Demo (${p.demo})
`).join('\n')}

### Certifications & Hackathons
${parsedData.certifications.map(c => `• ${c.title} by ${c.org} [${c.tag}]`).join('\n')}

### Leadership Role
- Role: ${parsedData.leadership.role} at ${parsedData.leadership.organization} (${parsedData.leadership.duration})
- Details:
  ${parsedData.leadership.bullets.map(b => `* ${b}`).join('\n  ')}
- Metrics: ${parsedData.leadership.stats.map(s => `${s.label}: ${s.val}`).join(', ')}

### Guidelines for AI Assistant:
1. Ground all answers in Muskan's resume context provided above.
2. Be professional, friendly, concise, and direct. Keep your answers under 3-4 sentences/bullets unless the user specifically asks for more detail.
3. If asked about contact info, provide email (${parsedData.personal.email}), phone, GitHub, and LinkedIn links.
4. If a question is not answerable using the resume details (e.g., questions about politics, general knowledge, or other people), politely state that you can only answer questions regarding Muskan Sharma's professional skills, projects, and qualifications, and offer to direct them to her email (${parsedData.personal.email}).
5. NEVER hallucinate details not provided in the resume context (e.g., do not make up extra internships, GPA, or projects).
6. Format output with clean paragraph spacing or simple markdown bullets.
`;
} catch (error) {
  console.error("Error loading resume context JSON:", error);
  resumeContext = "You are Muskan Sharma's AI assistant. Please note that resume context was not successfully loaded on the server.";
}

// Route to handle chat completions
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid requests. 'messages' array is required." });
  }

  // Check if API key is present
  if (!process.env.OPENAI_API_KEY) {
    console.warn("OPENAI_API_KEY environment variable is not defined.");
    return res.status(200).json({ 
      text: "I'm currently running in offline simulation mode because my OpenAI API credentials are not configured on the server. Feel free to contact Muskan directly at muskansharma4997@gmail.com!" 
    });
  }

  try {
    const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
    
    // Inject grounding system prompt
    const apiMessages = [
      { role: 'system', content: resumeContext },
      ...messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }))
    ];

    const response = await openai.chat.completions.create({
      model: 'gpt-4o-mini',
      messages: apiMessages,
      max_tokens: 400, // Safe guardrail limit for response length
      temperature: 0.5,
    });

    const reply = response.choices[0]?.message?.content || "I couldn't generate a reply. Please try again.";
    res.json({ text: reply });
  } catch (error) {
    console.error("OpenAI API completion error:", error);
    res.status(500).json({ 
      error: "API error", 
      text: "I encountered a processing issue connecting to the AI brain. Please contact Muskan directly at muskansharma4997@gmail.com or try again in a few moments." 
    });
  }
});

// Serve static assets in production
if (process.env.NODE_ENV === 'production' || fs.existsSync(path.join(__dirname, 'dist'))) {
  app.use(express.static(path.join(__dirname, 'dist')));
  
  app.get(/.*/, (req, res) => {
    res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
  });
} else {
  app.get('/', (req, res) => {
    res.send('Vite server proxy is active. Please start the client using npm run dev.');
  });
}

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
