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
	router.GET("/ping", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "pong",
		})
	})
	// Serve frontend static files
	router.Use(static.Serve("/", static.LocalFile(binDir+"/front", true)))

	router.Run(":5901") // listen and serve on 0.0.0.0:5901
}
