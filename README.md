# Placement Assistant

This project is a web application designed to assist students in their placement preparation. It uses a machine learning model to predict the likelihood of a student getting placed and provides a personalized roadmap to improve their chances. It also includes features for practicing interview questions and visualizing placement data.

## Features

- **Placement Prediction:** Predicts the probability of a student's placement based on their academic and personal details.
- **Personalized Roadmap:** Generates a 10-week roadmap to help students improve their skills and placement chances.
- **Interview Practice:** Provides a set of technical and general interview questions for practice.
- **Answer Evaluation:** Evaluates user's answers to interview questions and provides feedback.
- **Data Visualization:** Presents placement data in the form of charts and graphs.

## Tech Stack

### Backend

- **FastAPI:** A modern, fast (high-performance) web framework for building APIs with Python 3.7+.
- **scikit-learn:** A machine learning library for Python.
- **Google Gemini:** A family of generative AI models developed by Google.
- **Joblib:** A set of tools to provide lightweight pipelining in Python.

### Frontend

- **React:** A JavaScript library for building user interfaces.
- **Vite:** A build tool that aims to provide a faster and leaner development experience for modern web projects.
- **Tailwind CSS:** A utility-first CSS framework for rapidly building custom designs.

## Project Structure

The project is divided into the following directories:

- **analysis:** Contains images and charts generated from the analysis of the placement data.
- **backend:** Contains the FastAPI application that serves the machine learning model and provides the API endpoints.
- **datasets:** Contains the student placement data in CSV format.
- **frontend:** Contains the React application that provides the user interface.
- **models:** Contains the pre-trained machine learning models and encoders.
- **train.ipynb:** A Jupyter notebook for training the machine learning model.
- **test.py:** A Python script for testing the backend API.

## Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

- Python 3.7+
- Node.js
- npm

### Installation

1. **Clone the repo**
   ```sh
   git clone https://github.com/your_username/placement-assistant.git
   ```
2. **Install backend dependencies**
   ```sh
   pip install -r backend/requirements.txt
   ```
3. **Install frontend dependencies**
   ```sh
   npm install --prefix frontend
   ```
4. **Set up environment variables**
   Create a `.env` file in the `backend` directory and add your Google API key:
   ```
   GOOGLE_API_KEY=your_api_key
   ```

### Running the Application

1. **Start the backend server**
   ```sh
   uvicorn backend.main:app --reload
   ```
2. **Start the frontend development server**
   ```sh
   npm run dev --prefix frontend
   ```
The application will be available at `http://localhost:5173`.
