Full-Stack Developer Technical Assessment
Overview
This project is a full-stack application built using React, TailwindCSS, Shadcn UI, Supabase, and Zustand. It mirrors the provided Figma design and includes a responsive UI, CRUD functionality, and an additional AI chat feature for enhanced user experience.

Features
UI & Design:

Recreated the primary screen from the Figma file.
Responsive design using TailwindCSS and polished with Shadcn UI.

State Management:

Implemented global state management using Zustand.
Efficient data flow with CRUD actions for items or users.
Database Integration:

Configured Supabase for database management.

AI Chat Feature:
Integrated an AI-powered chat interface where users can ask questions and receive responses.

CRUD Functionality:
Fully functional create, read, update, and delete operations.

Real-time updates synced between the database and the UI.

Deployment:
Hosted the application on Netlify with environment variables for secure integration.
Tech Stack
Frontend: React, TailwindCSS, Shadcn UI.
Backend: Supabase,
State Management: Zustand.
Deployment: Vercel.
Additional Features: AI chat powered by [API/Model Used].
Setup Instructions

Clone the Repository:

bash
Copy code
git clone <repository-url>
cd project-folder
Install Dependencies:

bash
Copy code
npm install
Set Up Environment Variables: Create a .env file and add:

makefile
Copy code
SUPABASE_URL=<your-supabase-url>
SUPABASE_KEY=<your-supabase-key>
Run Locally:

bash
Copy code
npm run dev
Deployment:

Deploy to Vercel/Netlify and configure environment variables in the deployment platform.
AI Chat Feature
The AI chat feature allows users to:

Ask questions related to the application or general topics.
Receive intelligent and contextual responses.
[HUGGINGFACE free api text Model Used].

Live Demo
Application URL: https://stu-topaz.vercel.app/

GitHub Repository
Repository URL:https://github.com/VilokMasuti/stu
