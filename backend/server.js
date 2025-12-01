import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Supabase
const supabaseUrl = process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.VITE_SUPABASE_ANON_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "Server is running" });
});

// Submit contact form
app.post("/api/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate input
    if (!name || !email || !message) {
      return res
        .status(400)
        .json({ error: "Name, email, and message are required" });
    }

    // Insert into Supabase
    const { data, error } = await supabase
      .from("contacts")
      .insert([
        {
          name,
          email,
          message,
          created_at: new Date(),
        },
      ])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return res.status(500).json({ error: "Failed to save message" });
    }

    res.status(201).json({
      success: true,
      message: "Message sent successfully",
      data,
    });
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all contacts (optional - for admin)
app.get("/api/contacts", async (req, res) => {
  try {
    const { data, error } = await supabase
      .from("contacts")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      return res.status(500).json({ error: "Failed to fetch contacts" });
    }

    res.json(data);
  } catch (err) {
    console.error("Server error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
