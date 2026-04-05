import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import yahooFinance from 'yahoo-finance2';

dotenv.config();

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
      const result = await yahooFinance.quote(symbol as string);
      res.json(result);
    } catch (error) {
      console.error("Yahoo Finance Error:", error);
      res.status(500).json({ error: "Failed to fetch finance data" });
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
