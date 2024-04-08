package main

import (
	"log"
	"tutoring/internal/middleware"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

var cnx middleware.Connector

func init() {
	if err := godotenv.Load(); err != nil {
		log.Fatal("Error loading .env file")
	}
	cnx.EstablishConnectionWithDatabase()
}
func main() {
	router := gin.Default()
	router.Static("/tutoring/app", "./static")
	router.POST("/tutoring/students", cnx.RegisterStudent)
	router.GET("/tutoring/search", cnx.Search)
	router.Run()
}
