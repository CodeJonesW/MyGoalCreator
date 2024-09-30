export async function onRequest(context) {
  // Determine if running locally
  const isLocal = context.env.NODE_ENV === "development";

  // Set the appropriate worker URL
  const workerUrl = isLocal ? "http://localhost:8787" : context.env.WORKER_URL;
  const url = `${workerUrl}/api/profile`;

  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("authorization"),
    },
  };
  console.log("Sending request to", url, init);

  try {
    const response = await fetch(url, init);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to register user" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
