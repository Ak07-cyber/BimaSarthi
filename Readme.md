# 🛡️ BimaSarthi (Insurance Companion)
BimaSarthi is an open-source, AI-powered platform designed to simplify and democratize access to life insurance in India.

Despite being one of the fastest-growing insurance markets, the sector faces significant challenges, including policy mis-selling, complex documentation, low financial literacy, poor persistency, and high claim rejection rates. BimaSarthi leverages AI, NLP, and React to make insurance more transparent, inclusive, and user-friendly—with a strong focus on empowering rural and low-income groups.

## ✨ Key Features
🤖 AI-Powered Life Insurance Recommendations
Personalized suggestions based on user profiles (age, dependents, budget, goals).

## 🌐 Multilingual Policy Explanations
Simplifies complex documents into easy-to-understand summaries in regional languages.

## 🔍 Transparent Insights
Converts jargon into clear, actionable insights with cautions and disclaimers.

## 📚 Financial Literacy Hub
Provides educational content in local languages to build financial awareness.

## 🏛️ Aligned with IRDAI Vision 2047
Supports the Insurance for All by 2047 initiative by reducing mis-selling and promoting trust.

## 📊 Why It Matters
BimaSarthi is not just software—it’s a socio-economic enabler. By simplifying insurance and improving literacy, it:

Bridges trust gaps between users and providers.

Reduces opportunities for mis-selling.

Empowers users to make informed financial decisions.

Promotes greater inclusivity in financial services for all Indians.

## 🏗️ Tech Stack
Frontend: React (for a multilingual, user-friendly UI)

Backend: Node.js + Express (for the API & recommendation engine)

AI Layer: OpenAI models (for summarization, personalization & natural language understanding)

## 🚀 Getting Started
Follow these steps to set up and run BimaSarthi locally on your machine.

First, clone the project repository to your local system.
### 1. Clone the Repository

git clone [https://github.com/your-username/bimasarthi.git](https://github.com/your-username/bimasarthi.git)
cd bimasarthi

The following script will install all necessary dependencies for the root, frontend, and backend, then build the project, and finally start the development servers. You can run this entire block in your terminal.
### 2. Install, Build, and Run

echo "Installing root dependencies..."
### Install root-level dependencies
npm install

### Install frontend dependencies
echo "Installing frontend dependencies..."
cd frontend
npm install
cd ..

### Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install
cd ..

### Build the project for production
echo "Building the project..."
npm run build

### Start both development servers
echo "Starting development servers..."
npm run dev

The backend server (Node.js + Express) will run the recommendation engine and AI integrations. The frontend server (React) will launch the user interface for BimaSarthi. You can now access the application in your browser.
