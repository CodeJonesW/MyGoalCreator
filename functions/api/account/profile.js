export async function onRequest(context) {
  const isLocal =
    context.request.url === "http://localhost:8788/api/account/profile";
  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";
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
