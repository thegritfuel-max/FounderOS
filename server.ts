import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import YahooFinance from 'yahoo-finance2';
import axios from "axios";

dotenv.config();

const yahooFinance = new YahooFinance();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // API Route for Google Trends via SerpApi
  app.get("/api/trends", async (req, res) => {
    const { q } = req.query;
    const apiKey = process.env.SERPAPI_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "SERPAPI_KEY is not configured" });
    }

    if (!q) {
      return res.status(400).json({ error: "Query parameter 'q' is required" });
    }

    try {
      const url = new URL("https://serpapi.com/search");
      url.searchParams.append("engine", "google_trends");
      url.searchParams.append("q", q as string);
      url.searchParams.append("api_key", apiKey);

      const response = await fetch(url.toString());
      const data = await response.json();
      
      res.json(data);
    } catch (error) {
      console.error("SerpApi Error:", error);
      res.status(500).json({ error: "Failed to fetch trends data" });
    }
  });

  // API Route for Yahoo Finance
  app.get("/api/finance", async (req, res) => {
    const { symbol } = req.query;
    if (!symbol) return res.status(400).json({ error: "Symbol is required" });

    try {
      // In yahoo-finance2 v3+, we might need to use the default export or a specific method
      // The error suggests we need to instantiate it if using it in a certain way, 
      // but usually the default export works. Let's try to use it directly with quote.
      const result = await yahooFinance.quote(symbol as string);
      res.json(result);
    } catch (error: any) {
      console.error("Yahoo Finance Error:", error);
      res.status(500).json({ 
        error: "Failed to fetch finance data",
        details: error.message 
      });
    }
  });

  // API Route for Competitor Scraping via SerpApi
  app.get("/api/competitors", async (req, res) => {
    const { q } = req.query;
    const apiKey = process.env.SERPAPI_KEY;

    if (!apiKey) return res.status(500).json({ error: "SERPAPI_KEY is not configured" });
    if (!q) return res.status(400).json({ error: "Query parameter 'q' is required" });

    try {
      const url = new URL("https://serpapi.com/search");
      url.searchParams.append("engine", "google");
      url.searchParams.append("q", `${q} competitors`);
      url.searchParams.append("api_key", apiKey);

      const response = await fetch(url.toString());
      const data = await response.json();
      
      res.json(data.organic_results || []);
    } catch (error) {
      console.error("Competitor Scraping Error:", error);
      res.status(500).json({ error: "Failed to fetch competitors" });
    }
  });

  // API Route for NVIDIA AI API
  app.post("/api/nvidia/chat", async (req, res) => {
    const { messages, model = "google/gemma-4-31b-it", stream = false } = req.body;
    const userApiKey = req.headers['x-nvidia-api-key'] as string;
    const apiKey = userApiKey || process.env.NVIDIA_API_KEY;

    if (!apiKey) {
      return res.status(500).json({ error: "NVIDIA_API_KEY is not configured. Please add it in Settings or environment." });
    }

    if (!messages) {
      return res.status(400).json({ error: "Messages are required" });
    }

    try {
      const invokeUrl = "https://integrate.api.nvidia.com/v1/chat/completions";
      const headers = {
        "Authorization": `Bearer ${apiKey}`,
        "Accept": stream ? "text/event-stream" : "application/json",
        "Content-Type": "application/json"
      };

      const payload = {
        model,
        messages,
        max_tokens: 16384,
        temperature: 1.00,
        top_p: 0.95,
        stream,
        chat_template_kwargs: { "enable_thinking": true }
      };

      if (stream) {
        const response = await axios.post(invokeUrl, payload, {
          headers,
          responseType: 'stream'
        });

        res.setHeader('Content-Type', 'text/event-stream');
        res.setHeader('Cache-Control', 'no-cache');
        res.setHeader('Connection', 'keep-alive');

        response.data.pipe(res);
      } else {
        const response = await axios.post(invokeUrl, payload, { headers });
        res.json(response.data);
      }
    } catch (error: any) {
      console.error("NVIDIA API Error:", error.response?.data || error.message);
      res.status(error.response?.status || 500).json({ 
        error: "Failed to fetch from NVIDIA API",
        details: error.response?.data || error.message
      });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
