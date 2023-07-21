// Import the required dependencies
const http = require("http");
const moviesService = require("./moviesService");
const getRequestData = require("./utils");

// Define the port at which the application will run
const PORT = 5000;

// Define the server
const server = http.createServer(async (req, res) => {
  // Get all movies
  if ((req.url = "/api/v1/movies" && req.method === "GET")) {
    moviesService.getMovies((err, result) => {
      res.writeHead(200, {
        "Content-Type": "application/json",
      });
      res.end(result);
    });
  }
  // Get a movie with specified id
  else if (
    req.url.match(/\/api\/v1\/movies\/([0-9])/) &&
    req.method === "GET"
  ) {
    console.log("get by id triggered");
    const id = req.url.split("/")[4];
    moviesService.getMoviesById(parseInt(id), (err, result) => {
      if (err !== null) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end("Requested product doesn't exist..!");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(result);
      }
    });
  }
  // Save movie details
  else if (req.url == "/api/v1/movies" && req.method == "POST") {
    // console.log("it hit the api")
    let req_body = await getRequestData(req);
    // console.log("the body is ", req_body)
    moviesService.saveMovie(req_body, (err, result) => {
      // console.log(" the error is ", err, " and the result is ",result)
      if (err !== null) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end("Product already exists..!");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(result);
      }
    });
  }
  // Update a specific movie
  else if (req.url == "/api/v1/movies" && req.method == "PUT") {
    let req_body = await getRequestData(req);
    console.log("the body is ", req_body);
    id = req_body.id;
    console.log("the id is ", id);
    moviesService.updateMovie(parseInt(id), req_body, (err, result) => {
      if (err !== null) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end("Requested Movie doesn't exist..!");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(result);
      }
    });
  }
  // Delete a specific movie
  else if (
    req.url.match(/\/api\/v1\/movies\/([0-9])/) &&
    req.method === "DELETE"
  ) {
    const id = req.url.split("/")[4];
    moviesService.deleteMovieById(parseInt(id), (err, result) => {
      // console.log(" the error is ", err, " and the result is ",result)
      if (err !== null) {
        res.writeHead(500, {
          "Content-Type": "application/json",
        });
        res.end("Requested movie doesn't exist..!");
      } else {
        res.writeHead(200, {
          "Content-Type": "application/json",
        });
        res.end(result);
      }
    });
  }
  // If no route present capture in the else part
  else {
    res.writeHead(200, {
      "Content-Type": "application/json",
    });
    res.end("Please choose a route");
  }
});
// listen to the server on the specified port
server.listen(PORT, () => {
  console.log(`server started on port: ${PORT}`);
});
server.on("error", (error) => {
  if (error.code === "EADRINUSE") {
    console.log("Port already in use");
  }
});
