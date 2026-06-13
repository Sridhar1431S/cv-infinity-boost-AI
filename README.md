# 💼 CV Infinity Boost AI

An AI-powered resume optimizer that analyzes, enhances, and perfects your CV — helping you land more interviews with smarter, ATS-friendly applications.



<img width="1915" height="930" alt="Screenshot 2026-06-13 101952" src="https://github.com/user-attachments/assets/c5641723-2028-4414-8963-6dfafffe18e7" />






🔗 **Live Demo:** [cv-infinity-boost-ai.vercel.app](https://cv-infinity-boost-ai.vercel.app)

---

## **📌 Table of Contents**

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Available Scripts](#available-scripts)
- [How It Works](#how-it-works)
- [Deployment](#deployment)
- [Contributing](#contributing)
- [Acknowledgements](#acknowledgements)
- [License](#license)

---

## **📖 Overview**

CV Infinity Boost AI is an advanced, AI-driven web application designed to supercharge your resume. In today's competitive job market, a well-structured, keyword-optimized CV is essential — and that's exactly what this tool helps you build.

It uses cutting-edge AI to evaluate your resume content, suggest ATS-friendly improvements, offer personalized enhancement recommendations, and provide real-time keyword and formatting feedback. Whether you're a fresh graduate or an experienced professional, CV Infinity Boost AI ensures your resume speaks the language recruiters want to hear.

---

## **✨ Features**

| Feature | Description |
|---|---|
| 🤖 AI Resume Analysis | Leverages language models to assess your resume content |
| 📈 ATS Optimization | Ensures compatibility with modern Applicant Tracking Systems |
| 🔍 Keyword Scanner | Detects essential keywords based on your target role or industry |
| 📁 Smart Resume Suggestions | Improves tone, clarity, formatting, and overall impact |
| 📄 Live Preview & Export | See changes in real time and download the enhanced version |
| ⚡ Responsive & Fast | Works seamlessly across all devices and screen sizes |

---

## **🛠️ Tech Stack**

| Layer | Technology |
|---|---|
| Frontend Framework | React 18 + TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS + Shadcn/UI |
| AI Engine | OpenAI GPT / Custom AI Models |
| Component Library | Radix UI |
| Package Manager | Bun / npm |
| Linting | ESLint |
| Deployment | Vercel |

---

## **📁 Project Structure**

```
cv-infinity-boost-AI/
├── public/                  # Static assets (favicon, images)
├── src/
│   ├── assets/              # Images, logos, icons
│   ├── components/          # Reusable UI components
│   ├── pages/               # Application route pages
│   ├── utils/               # Helper and utility functions
│   └── main.tsx             # Application entry point
├── index.html               # Main HTML template
├── tailwind.config.ts       # Tailwind CSS configuration
├── vite.config.ts           # Vite bundler configuration
├── tsconfig.json            # TypeScript configuration
├── components.json          # Shadcn/UI component config
├── package.json             # Project metadata and dependencies
└── README.md                # Project documentation
```

---

## **🚀 Getting Started**

### **Prerequisites**

- Node.js >= 18.x
- npm, bun, or yarn
- An OpenAI API key (or equivalent AI service key)

### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/Sridhar1431S/cv-infinity-boost-AI.git
   cd cv-infinity-boost-AI
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   bun install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:
   ```bash
   cp .env.example .env
   ```
   See [Environment Variables](#environment-variables) for the required keys.

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## **🔐 Environment Variables**

Create a `.env` file in the root of the project with the following:

```env
VITE_OPENAI_API_KEY=
```

> ⚠️ Never commit your `.env` file. It is already listed in `.gitignore`.

---

## **📜 Available Scripts**

| Script | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Create an optimized production build |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint to check for code issues |

---

## **⚙️ How It Works**

1. **Upload / Paste Resume** — The user uploads their CV or pastes the content directly into the editor.
2. **AI Analysis** — The app sends the resume content to an AI language model (OpenAI GPT or custom) for deep analysis.
3. **ATS Scoring** — The AI evaluates the CV against common ATS rules — keyword density, section structure, formatting, and readability.
4. **Suggestions Generated** — Personalized, role-specific improvement suggestions are returned and displayed to the user.
5. **Live Preview** — Users can apply suggestions and instantly preview the updated CV.
6. **Export** — The enhanced resume can be downloaded for immediate use in job applications.

---

## **☁️ Deployment**

This project is deployed on **Vercel**. To deploy your own instance:

1. Push the repository to GitHub.
2. Import the project into [Vercel](https://vercel.com).
3. Add the required environment variables (`VITE_OPENAI_API_KEY`) in Vercel's project settings.
4. Deploy — Vercel auto-detects the Vite framework and builds accordingly.

Alternatively, deploy on:

- **Netlify** — Drag and drop the `dist/` folder or connect via GitHub
- **GitHub Pages** — Use `vite build` and push the output to the `gh-pages` branch
- **Firebase Hosting** — Use `firebase deploy` after setting up Firebase CLI

---

## **🤝 Contributing**

Contributions are welcome! Here's how to get started:

1. Fork the repository
2. Create a new feature branch: `git checkout -b feature/your-feature-name`
3. Make your changes and commit: `git commit -m "feat: add your feature"`
4. Push to your fork: `git push origin feature/your-feature-name`
5. Open a Pull Request

Please follow the existing code style and ensure all linting passes before submitting.

---

## **🙌 Acknowledgements**

- [OpenAI](https://openai.com) — for the language processing models powering the AI engine
- [Tailwind CSS](https://tailwindcss.com) — for the elegant, utility-first styling
- [Vite](https://vitejs.dev) — for the lightning-fast development experience
- [Shadcn/UI](https://ui.shadcn.com) — for the accessible, beautiful component library
- Inspired by real-world ATS systems and professional career coaches

---

## **📄 License**

This project is licensed under the **MIT License** — free to use, modify, and distribute.

---

> Built with ❤️ by [Sridhar1431S](https://github.com/Sridhar1431S)
