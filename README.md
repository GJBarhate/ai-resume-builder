# AI Resume Builder

A powerful, full-stack application that leverages Google's Gemini AI to help users craft professional and tailored resumes with ease.

**Author: Gaurav Barhate**

---

## 🌟 Features

- **AI-Powered Content Generation**: Automatically generate key resume sections like professional summaries, work experience bullet points, and more.
- **User Authentication**: Secure user accounts to save and manage multiple resume versions.
- **Dynamic Resume Editing**: An intuitive interface to create, edit, and customize resume content.
- **Template Selection**: (Future Feature) Choose from various professional resume templates.
- **PDF Export**: Download the final resume as a high-quality PDF document.

## 🛠️ Tech Stack

- **Frontend**: React, Vite, Axios
- **Backend**: Node.js, Express.js
- **Database**: MongoDB with Mongoose
- **AI**: Google Gemini Pro via the `@google/generative-ai` SDK
- **Authentication**: bcrypt for password hashing, JWT for sessions

## 🚀 Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

- Node.js (v18 or later recommended)
- npm or yarn
- MongoDB (local instance or a cloud service like MongoDB Atlas)

### Installation & Setup

1.  **Clone the repository:**
    ```sh
    git clone <your-repository-url>
    cd ai-resume-builder
    ```

2.  **Setup the Backend:**
    ```sh
    cd Backend
    npm install
    ```
    Create a `.env` file in the `Backend` directory and add the following variables:
    ```env
    PORT=5001
    MONGO_URI=your_mongodb_connection_string
    JWT_SECRET=your_jwt_secret
    GEMINI_API_KEY=your_google_gemini_api_key
    ```

3.  **Setup the Frontend:**
    ```sh
    cd ../Frontend
    npm install
    ```

4.  **Run the application:**
    - Start the backend server (from the `Backend` directory): `npm start`
    - Start the frontend development server (from the `Frontend` directory): `npm run dev`

The frontend will be available at `http://localhost:5173` (or another port specified by Vite), and the backend will be running on `http://localhost:5001`