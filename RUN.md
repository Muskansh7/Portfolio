# Run Locally

## 1. Install dependencies

```bash
npm install
```

## 2. Set up environment variables

Copy `.env.example` to `.env` and add your OpenAI key:

```bash
# macOS / Linux
cp .env.example .env

# Windows (PowerShell)
Copy-Item .env.example .env
```

Edit `.env`:

```
OPENAI_API_KEY=your_key_here
PORT=5000
NODE_ENV=development
```

## 3. Start the backend (API + chatbot)

```bash
npm start
```

You should see: `OpenAI API key loaded — chat assistant is live.`

## 4. Start the frontend (new terminal)

```bash
npm run dev
```

Open **http://localhost:5173** in your browser.

---

**Note:** Run both terminals at the same time. If you change `.env`, restart the backend (`npm start`).
