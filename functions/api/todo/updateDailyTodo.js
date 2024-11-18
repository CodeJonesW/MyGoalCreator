export async function onRequest(context) {
  const isLocal =
    context.request.url === "http://localhost:8788/api/todo/updateDailyTodo";

  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/dailyTodo`;

  const request = context.request;
  const requestBody = await request.json();
  const { daily_todo_id, completed } = requestBody;
  console.log("sending", daily_todo_id, completed);

  const init = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("authorization"),
    },
    body: JSON.stringify({
      daily_todo_id,
      completed,
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
    return new Response(JSON.stringify({ error: "Failed to create todo" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
