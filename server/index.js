
let https;
try {
  https = await import('node:https');
} catch (err) {
  console.error('https support is disabled!');
}

const server = Bun.serve({
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
    return new Response("404!");
  },
});

console.log(`Listening on http://localhost:${server.port} ...`);

