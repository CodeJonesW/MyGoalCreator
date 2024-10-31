export async function onRequest(context) {
  const isLocal =
    context.request.url === "http://localhost:8788/api/goal/createSubGoal";

  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/createSubGoal`;
  const body = await context.request.json();
  const { parentGoalId, subGoalName } = body;

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("authorization"),
    },
    body: JSON.stringify({
      parent_goal_id: parentGoalId,
      sub_goal_name: subGoalName,
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
    return new Response(JSON.stringify({ error: "Failed to create goal" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
