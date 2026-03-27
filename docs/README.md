# 👻 Go Ghost QRCode - Frontend

A sleek, minimalist, and private QR Code generator interface built with **React 19**, **TypeScript**, and **Tailwind CSS 4**. This project serves as a study on handling binary data (blobs) in the browser and implementing rate-limiting feedback in the UI

## ✨ Features

*   **Instant Generation**: Convert any text or URL into a high-quality QR Code image in milliseconds
*   **Auto-Download**: Automatically triggers a file download using `file-saver` once the backend processes the request
*   **Spam Protection**: Built-in UI safeguards including button debouncing and a 2-second cooldown period after each generation
*   **Privacy-First**: No data is stored; the text is sent to the API, converted to a PNG, and immediately delivered to you
*   **Responsive Design**: A clean, modern interface styled with the latest Tailwind CSS

## 🛠️ Tech Stack

*   **React 19**
*   **Vite** (Build Tool)
*   **TypeScript**
*   **Tailwind CSS 4**
*   **File-Saver**: For handling browser-side file downloads

## 🚀 Getting Started

### Prerequisites

*   Node.js (latest LTS recommended)
*   A running instance of the **Go Ghost QRCode Backend**

### Installation

1.  **Clone the repository**:
    ```bash
    git clone https://github.com/rickferrdev/go-ghost-qrcode
    cd page
    ```

2.  **Install dependencies**:
    ```bash
    bun install
    ```

3.  **Configure Environment Variables**:
    Create a `.env` file in the root directory and add your backend API URL
    ```env
    VITE_API_URL=http://localhost:8080/api/v1/qrcode
    ```

4.  **Run Development Server**:
    ```bash
    npm run dev
    ```

## 📂 Project Structure

*   `src/App.tsx`: Main application logic, including fetch calls and state management
*   `src/index.css`: Entry point for Tailwind CSS 4 directives
*   `vite.config.ts`: Configuration for Vite and the Tailwind CSS plugin

---

> **Note**: This is a study project. The UI includes specific handling for `429 Too Many Requests` status codes to demonstrate graceful error handling for API rate limits
