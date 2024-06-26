package middleware

import (
	"database/sql"
	"log"
	"os"
	"time"
	"tutoring/internal/database"

	"github.com/gin-gonic/gin"
	"github.com/google/uuid"
	_ "github.com/lib/pq"
)

type Connector struct {
	accessor *database.Queries
}

func (c *Connector) EstablishConnectionWithDatabase() {
	conn, err := sql.Open("postgres", os.Getenv("DATABASE_URL"))
	if err != nil {
		log.Fatal("Error connect to database")
	}
	_, e := conn.Exec("CREATE TABLE IF NOT EXISTS students (id UUID PRIMARY KEY, created_at TIMESTAMP NOT NULL, updated_at TIMESTAMP NOT NULL,	name TEXT NOT NULL,	subject TEXT NOT NULL, class TEXT NOT NULL,	fees INTEGER NOT NULL, fee_status TEXT NOT NULL);")
	if e != nil {
		panic("students table creation failed")
	}
	c.accessor = database.New(conn)
}

func (con *Connector) RegisterStudent(c *gin.Context) {
	type reqBody struct {
		Name      string `json:"name" binding:"required"`
		Subject   string `json:"subject" binding:"required"`
		Class     string `json:"class" binding:"required"`
		Fees      int32  `json:"fees" binding:"required"`
		FeeStatus string `json:"fee_status" binding:"required"`
	}
	var rBody reqBody
	log.Printf("%v", c.Request.Body)

	if err := c.Bind(&rBody); err != nil {
		log.Print(err.Error())
		c.JSON(400, gin.H{
			"error": "Bad Request : One of the field might be empty or wrong",
		})
		return
	}
	log.Print("Successfuly parsed")

	student, err := con.accessor.RegisterStudent(c.Request.Context(), database.RegisterStudentParams{
		ID:        uuid.New(),
		CreatedAt: time.Now().UTC(),
		UpdatedAt: time.Now().UTC(),
		Name:      rBody.Name,
		Subject:   rBody.Subject,
		Class:     rBody.Class,
		Fees:      rBody.Fees,
		FeeStatus: rBody.FeeStatus,
	})

	if err != nil {
		c.JSON(400, gin.H{
			"error": err,
		})
		return
	}
	c.JSON(200, gin.H{
		"message": "User succesfully created",
		"student": student,
	})

}

func (con *Connector) Search(c *gin.Context) {
	queryParams := c.Request.URL.Query()
	name := queryParams.Get("name")
	subject := queryParams.Get("subject")
	class := queryParams.Get("class")
	fee_status := queryParams.Get("fee_status")

	users, err := con.accessor.Search(c.Request.Context(), database.SearchParams{
		Name:      name,
		Subject:   subject,
		Class:     class,
		FeeStatus: fee_status,
	})
	if err != nil {
		c.Status(400)
	}
	c.JSON(200, gin.H{
		"user": users,
	})
}

func (con *Connector) Delete(c *gin.Context) {
	name := c.Param("name")
	err := con.accessor.DeleteStudent(c.Request.Context(), name)
	if err != nil {
		log.Fatal("Error deleting student")
		c.Status(400)
	}
	c.JSON(200, gin.H{
		"msg": "Success",
	})
}

func (con *Connector) UpdateFeeStatus(c *gin.Context) {
	name := c.Param("name")
	status := c.Param("status")
	err := con.accessor.UpdateFeeStatus(c.Request.Context(), database.UpdateFeeStatusParams{
		Name:      name,
		FeeStatus: status,
	})
	if err != nil {
		c.Status(400)
	}
	c.JSON(200, gin.H{
		"msg": "Successfully Updated",
	})
}
