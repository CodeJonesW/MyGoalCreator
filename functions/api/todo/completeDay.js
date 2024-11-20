export async function onRequest(context) {
  const isLocal =
    context.request.url === "http://localhost:8788/api/todo/completeDay";
  const body = await context.request.json();
  const { datetime } = body;
  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/completeDay`;
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("authorization"),
      userTimezone: context.request.headers.get("userTimezone"),
      datetime: context.request.headers.get("datetime"),
    },
    body: JSON.stringify({ datetime }),
  };
  try {
    const response = await fetch(url, init);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to create todo" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
