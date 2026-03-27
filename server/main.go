package main

import (
	"log/slog"
	"net/http"
	"os"
	"time"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
	_ "github.com/rickferrdev/dotenv/auto"
	"github.com/skip2/go-qrcode"
)

func main() {
	e := echo.New()

	frontUrl := os.Getenv("FRONT_URL")
	if frontUrl == "" {
		slog.Error("environment variable FRONT_URL is not set", "action", "check_config")
		frontUrl = "https://go-ghost-qrcode.vercel.com"
	}

	rate := middleware.RateLimiterWithConfig(middleware.RateLimiterConfig{
		Skipper: middleware.DefaultSkipper,
		Store: middleware.NewRateLimiterMemoryStoreWithConfig(middleware.RateLimiterMemoryStoreConfig{
			Rate:      2,
			Burst:     10,
			ExpiresIn: 1 * time.Minute,
		}),
		IdentifierExtractor: func(ctx echo.Context) (string, error) {
			return ctx.RealIP(), nil
		},
		ErrorHandler: func(c echo.Context, err error) error {
			return c.JSON(http.StatusTooManyRequests, map[string]string{
				"error": "request limit exceeded per minute",
			})
		},
	})

	cors := middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{frontUrl},
		AllowMethods: []string{http.MethodPost},
		AllowHeaders: []string{echo.HeaderContentDisposition, echo.HeaderContentType, echo.HeaderAuthorization},
	})

	e.Use(rate, cors)

	type RequestGenerate struct {
		Text string `json:"text"`
	}

	type ResponseErrorDTO struct {
		Error string `json:"error"`
	}

	group := e.Group("/api/v1")
	group.POST("/qrcode", func(c echo.Context) error {
		var body RequestGenerate

		if err := c.Bind(&body); err != nil {
			slog.Warn("failed to bind request body",
				"ip", c.RealIP(),
				"error", err.Error(),
			)
			return c.JSON(http.StatusBadRequest, ResponseErrorDTO{Error: "invalid request body"})
		}

		if body.Text == "" {
			slog.Warn("empty text field received", "ip", c.RealIP())
			return c.JSON(http.StatusBadRequest, ResponseErrorDTO{Error: "text field is required"})
		}

		png, err := qrcode.Encode(body.Text, qrcode.High, 256)

		if err != nil {
			slog.Error("qrcode encoding failed",
				"text_length", len(body.Text),
				"error", err.Error(),
			)
			return c.JSON(http.StatusInternalServerError, ResponseErrorDTO{Error: "failed to generate qrcode"})
		}

		c.Response().Header().Set(echo.HeaderContentDisposition, "attachment; filename=qrcode.png")

		slog.Info("qrcode generated successfully", "ip", c.RealIP())

		return c.Blob(http.StatusOK, "image/png", png)
	})

	if err := e.Start(":8080"); err != nil {
		slog.Error("failed running api", slog.Any("error", err))
	}
}
