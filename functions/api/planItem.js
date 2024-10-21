export async function onRequest(context) {
  const isLocal = context.request.url === "http://localhost:8788/api/planItem";
  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/planItem`;
  const body = await context.request.json();
  const { taskId, status } = body;
  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("authorization"),
    },
    body: JSON.stringify({
      plan_item_id: taskId,
      status: status,
    }),
  };

  try {
    const response = await fetch(url, init);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "Failed to update plan item" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
