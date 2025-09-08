package main

import (
	"net/http"
	"os"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

type HealthResponse struct {
	Status    string    `json:"status"`
	Timestamp time.Time `json:"timestamp"`
	Uptime    float64   `json:"uptime"`
	Version   string    `json:"version"`
}

type User struct {
	ID    int    `json:"id"`
	Name  string `json:"name"`
	Email string `json:"email"`
}

var startTime = time.Now()

func main() {
	// Setup logging
	log := logrus.New()
	log.SetFormatter(&logrus.JSONFormatter{})
	log.SetOutput(os.Stdout)

	// Setup Gin
	r := gin.Default()

	// CORS middleware
	config := cors.DefaultConfig()
	config.AllowAllOrigins = true
	config.AllowMethods = []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"}
	config.AllowHeaders = []string{"Origin", "Content-Type", "Accept", "Authorization"}
	r.Use(cors.New(config))

	// Routes
	r.GET("/health", healthCheck)
	r.GET("/api/hello", helloHandler)
	r.GET("/api/users", getUsers)
	r.GET("/api/metrics", getMetrics)

	// Start server
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	log.Infof("Server starting on port %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

func healthCheck(c *gin.Context) {
	response := HealthResponse{
		Status:    "OK",
		Timestamp: time.Now(),
		Uptime:    time.Since(startTime).Seconds(),
		Version:   "1.0.0",
	}
	c.JSON(http.StatusOK, response)
}

func helloHandler(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message":   "Hello from CI/CD Workshop Backend!",
		"timestamp": time.Now(),
		"service":   "golang-backend",
	})
}

func getUsers(c *gin.Context) {
	users := []User{
		{ID: 1, Name: "John Doe", Email: "john@example.com"},
		{ID: 2, Name: "Jane Smith", Email: "jane@example.com"},
		{ID: 3, Name: "Bob Johnson", Email: "bob@example.com"},
	}
	c.JSON(http.StatusOK, users)
}

func getMetrics(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"uptime":    time.Since(startTime).Seconds(),
		"timestamp": time.Now(),
		"memory":    "256MB",
		"cpu":       "2.5%",
	})
}
