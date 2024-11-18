export async function onRequest(context) {
  const isLocal =
    context.request.url === "http://localhost:8788/api/todo/deleteDailyTodo";

  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/dailyTodo`;

  const request = context.request;
  const requestBody = await request.json();
  const { daily_todo_id } = requestBody;
  console.log("sending delete todo", daily_todo_id);

  const init = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("authorization"),
    },
    body: JSON.stringify({
      daily_todo_id,
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
    return new Response(JSON.stringify({ error: "Failed to delete todo" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
