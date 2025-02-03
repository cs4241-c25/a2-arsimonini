const http = require( "node:http" ),
    fs   = require( "node:fs" ),
    // IMPORTANT: you must run `npm install` in the directory for this assignment
    // to install the mime library if you're testing this on your local machine.
    // However, Glitch will install it automatically by looking in your package.json
    // file.

    //Weird Stuff with Mime, Don't Touch
    mime = require( "mime" ),
    dir  = "public/",
    port = 3000

//Appdata, I should likely try to update this
let appdata = [
   /* { "favConsole": "toyota", "favGame": "Mario", "completed?": "Yes" },
    { "favConsole": "nintendo", "favGame": "Luigi", "completed?": "No" },
    { "favConsole": "xbox", "favGame": "Zelda", "completed?": "Yes" }*/
]

// let fullURL = ""
const server = http.createServer( function( request,response ) {

    if( request.method === "GET" ) {
        handleGet( request, response )
    }else if( request.method === "POST" ){
        handlePost( request, response )
    }

    // The following shows the requests being sent to the server
    // fullURL = `http://${request.headers.host}${request.url}`
    // console.log( fullURL );
})

const handleGet = function( request, response ) {
    const filename = dir + request.url.slice( 1 )

    if( request.url === "/" ) {
        sendFile( response, "public/index.html" )
    }else if( request.url === "/results.html" ) {
        sendFile( response, filename )
    }
    else if( request.url === "/table") {
        response.end(JSON.stringify(appdata))
    }
    else {
        sendFile( response, filename )
    }
}

const handlePost = function( request, response ) {
    let dataString = ""

    request.on( "data", function( data ) {
        dataString += data
        console.log( "Request.on(data, function(data)): " + dataString )

    })

    request.on( "end", function(  ) {
        if(request.url === "/submit") {
            const inputedData = JSON.parse(dataString)
            appdata.push(inputedData)
            //console.log("Recent Input Data: " + JSON.stringify(inputedData))
            console.log("App Data: " + JSON.stringify(appdata))

            response.writeHead(200, "OK", {"Content-Type": "application/json"})
            //response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
            response.end(JSON.stringify(appdata))
        }
        else if( request.url === "/update") {
            const inputedData = JSON.parse(dataString)
            appdata = inputedData
            //console.log("Recent Input Data: " + JSON.stringify(inputedData))
            console.log("App Data: " + JSON.stringify(appdata))


            response.writeHead(200, "OK", {"Content-Type": "application/json"})
            //response.writeHead( 200, "OK", {"Content-Type": "text/plain" })
            response.end(JSON.stringify(appdata))
        }

    })

}

const sendFile = function( response, filename ) {
    const type = mime.getType( filename )

    fs.readFile( filename, function( err, content ) {

        // if the error = null, then we've loaded the file successfully
        if( err === null ) {

            // status code: https://httpstatuses.com
            response.writeHeader( 200, { "Content-Type": type })
            response.end( content )

        } else {

            // file not found, error code 404
            response.writeHeader( 404 )
            response.end( "404 Error: File Not Found" )

        }
    })
}





// process.env.PORT references the port that Glitch uses
// the following line will either use the Glitch port or one that we provided
server.listen( process.env.PORT || port )

