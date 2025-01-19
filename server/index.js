const server = Bun.serve({
  // tls: {
  //   key: Bun.file("./key.pem"),
  //   cert: Bun.file("./cert.pem"),
  //   passphrase: "9615",
  // },
  port: 3000,
  static: {
    // serve a file by buffering it in memory
    "/": new Response(await Bun.file("../frontend/index.html").bytes(), {
      headers: {
        "Content-Type": "text/html",
      },
    }),
    // "/favicon.ico": new Response(await Bun.file("./favicon.ico").bytes(), {
    //   headers: {
    //     "Content-Type": "image/x-icon",
    //   },
    // }),

  },

  fetch(req) {
    console.log('REQUIEST', req)
    return new Response("404!");
  }

});

console.log(`Listening on http://localhost:${server.port} ...`);
