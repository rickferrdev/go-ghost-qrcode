# 👻 Go Ghost QRCode - Backend

This is a minimalist, high-performance implementation for generating QR codes, developed in **Go** as a study project on microservices and API security.

The main objective was to create a stateless service that processes information in real time without storing sensitive data.

## 🛠️ Technologies
* **Go 1.25+**
* **Echo Framework:** Routing and middlewares.

* **Skip2/go-qrcode:** Native engine for generating PNG images.

* **Middleware Rate Limiter:** Native protection against spam/DDoS.

## 📌 Features
* **Instant Generation:** Converts strings/URLs into QR codes with high error correction (`qrcode.High`).

* **Integrated Security:**
* **Rate Limiting:** Limits requests per IP to prevent abuse.

* **CORS:** Configured to accept requests only from allowed origins.

* **Privacy:** The server does not have a database; data enters, the binary exits, and nothing is persisted.

## 🚦 Main Endpoint

### `POST /api/v1/qrcode`
Generates and returns a binary `.png` file.

**Request Body (JSON):**
```json
{
    "text": "https://your-link-here.com"
}
```

**Responses:**
* `200 OK`: Returns the image binary (`image/png`).

* `400 Bad Request`: Empty text or invalid JSON.

* `429 Too Many Requests`: Generation limit per minute exceeded.

## ⚡ How to run

1. Make sure you have Go installed.

2. Install the dependencies:

```bash
go mod tidy
```

3. Start the server:

```bash
go run main.go
```

The server will be available at `http://localhost:8080`.

---

> **Study Note:**
> This project was designed to practice implementing `Content-Disposition` headers for direct download and using `Blobs` on the client side.
