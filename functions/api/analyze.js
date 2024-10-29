export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const goal_id = searchParams.get("goal_id");
  const token = searchParams.get("token");

  if (!goal_id) {
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

  const url = `${workerUrl}/api/analyze`;
  console.log("Worker URL:", url);

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ goal_id }),
  };

  try {
    const response = await fetch(url, init);
    console.log("Response from worker:", response);

    if (!response.ok) {
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

    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  } catch (error) {
    console.error("Error during analysis: in function", error);
    return new Response(
      JSON.stringify({ error: "Failed to process request" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
