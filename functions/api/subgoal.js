export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const goalId = searchParams.get("goalId");
  const token = searchParams.get("token");

  if (!goalId) {
    console.log("Missing required parameters");
    return new Response(
      JSON.stringify({ error: "Missing required parameters" }),
      {
        status: 400,
        headers: { "Content-Type": "application/json" },
      }
    );
  }

  if (!token) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  const isLocal = context.request.url.includes("localhost");
  const workerUrl = isLocal
    ? "http://localhost:8787"
    : "https://tube-script-ai-worker.williamjonescodes.workers.dev";

  const url = `${workerUrl}/api/subgoal`;

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      goal_id: goalId,
    }),
  };

  try {
    // Fetch the streaming response from the worker
    const response = await fetch(url, init);

    if (!response.ok) {
      console.error("Worker returned an error:", response.status);
      return new Response(JSON.stringify({ error: "Worker error" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    const encoder = new TextEncoder();
    const decoder = new TextDecoder("utf-8");
    const reader = response.body.getReader();

    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            setTimeout(() => {
              controller.close();
            }, 5000);
            break;
          }

          const chunk = decoder.decode(value, { stream: true });
          const sanitizedChunk = chunk.replace(/\n/g, "[NEWLINE]");
          controller.enqueue(encoder.encode(`data: ${sanitizedChunk}\n\n`));
        }
      },
    });

    // Return the readable stream as a Server-Sent Event (SSE)
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error during subgoal v2: in function", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
