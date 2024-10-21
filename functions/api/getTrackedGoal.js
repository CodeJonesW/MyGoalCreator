export async function onRequest(context) {
  const isLocal = context.request.url.includes("localhost");

  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";

  const { searchParams } = new URL(context.request.url);
  const goal_id = searchParams.get("goal_id");

  const url = `${workerUrl}/api/trackGoal?goal_id=${goal_id}`;

  const init = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("authorization"),
    },
  };

  try {
    const response = await fetch(url, init);
    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Failed to get goal" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
