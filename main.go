package main

import (
	"tutoring/internal/middleware"

	"github.com/gin-gonic/gin"
)

var cnx middleware.Connector

func init() {
	// if err := godotenv.Load(); err != nil {
	// 	log.Fatal("Error loading .env file")
	// }
	cnx.EstablishConnectionWithDatabase()
}
func main() {
	router := gin.Default()
	router.Static("/tutoring/app", "./static")
	router.POST("/tutoring/students", cnx.RegisterStudent)
	router.GET("/tutoring/search", cnx.Search)
	router.DELETE("/tutoring/students/:name",cnx.Delete)
	router.PUT("/tutoring/students/:name/feestatus/:status",cnx.UpdateFeeStatus)
	router.Run()
}
