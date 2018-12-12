package main

import (
	"fmt"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"log"
	"os"
	"path/filepath"
)

func main() {
	// Get directory of its binary
	binDir, err := filepath.Abs(filepath.Dir(os.Args[0]))
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Starting server")

	router := gin.Default()

	// [GET]ping
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})

	// [POST]upload
	router.POST("/upload", func(c *gin.Context) {
		_, header, err := c.Request.FormFile("file")
		if err != nil {
			fmt.Println("Error @ upload")
			log.Fatal(err)
		}
		filename := header.Filename
		fmt.Println(filename)
	})

	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile(binDir+"/front", true)))

	router.Run(":5901") // listen and serve on 0.0.0.0:5901
}
