export async function onRequest(context) {
  console.log("SUBGOAL", context);

  const isLocal = context.request.url === "http://localhost:8788/api/subgoal";
  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";
  const url = `${workerUrl}/api/subgoal`;
  const body = await context.request.json();
  console.log("SUBGOAL", body);
  const { goalId, sub_goal_name, line_number } = body;
  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: context.request.headers.get("authorization"),
    },
    body: JSON.stringify({
      goalId,
      sub_goal_name,
      line_number,
    }),
  };
  console.log("making request");
  try {
    const response = await fetch(url, init);
    const data = await response.json();
    console.log("SUBGOAL", data);
    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.log("Error getting goal:", error);
    return new Response(JSON.stringify({ error: "Failed to get goal" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
