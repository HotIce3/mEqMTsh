# Setup Guide for Backend

## Prerequisites

- Node.js 18+
- Supabase account (free at https://supabase.com)

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and sign up
2. Create a new project
3. Wait for it to be provisioned
4. Get your **Project URL** and **Anon Key** from Settings > API

### 2. Create Database Table

In Supabase SQL Editor, run:

```sql
CREATE TABLE contacts (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  message TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert
CREATE POLICY "Allow insert" ON contacts FOR INSERT WITH CHECK (true);

-- Allow anyone to read (optional, for admin dashboard)
CREATE POLICY "Allow read" ON contacts FOR SELECT USING (true);
```

### 3. Setup Backend Environment

```bash
cd backend
cp .env.example .env
```

Edit `backend/.env` and add:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
PORT=5000
```

### 4. Install Dependencies

```bash
cd backend
npm install
```

### 5. Run Backend

```bash
npm run dev  # Development with auto-reload
# or
npm start    # Production
```

Backend akan berjalan di `http://localhost:5000`

### 6. Frontend Configuration

Frontend sudah dikonfigurasi untuk send ke backend di `http://localhost:5000/api/contact`

Untuk production, update `VITE_API_URL` di `.env.local`:

```
VITE_API_URL=https://your-backend-domain.com
```

## Testing

1. Run backend: `cd backend && npm run dev`
2. Run frontend: `npm run dev`
3. Fill form di http://localhost:3000 dan submit
4. Check Supabase dashboard untuk data yang masuk

## Deployment

### Backend (dapat di-deploy ke):

- **Vercel** (serverless functions)
- **Railway** (PaaS)
- **Render** (free tier available)
- **Heroku** (paid)
- **VPS/Server** (any provider)

### Frontend

Tetap di Vercel, hanya update `VITE_API_URL` ke backend URL yang sudah deployed

## Troubleshooting

- CORS error? Pastikan backend punya CORS enabled
- Database error? Check Supabase credentials
- 404 di /api/contact? Pastikan backend running
