export async function onRequest(context) {
  const { searchParams } = new URL(context.request.url);
  const goal = searchParams.get("goal");
  const prompt = searchParams.get("prompt");
  const timeline = searchParams.get("timeline");
  const token = searchParams.get("token");

  if (!goal || !timeline) {
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

  const init = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ goal, prompt, timeline }),
  };

  try {
    // Fetch the streaming response from the worker
    const response = await fetch(url, init);

    if (!response.ok) {
      return new Response(JSON.stringify({ error: "Worker error" }), {
        status: response.status,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Define a TextEncoder instance to encode the response chunks
    const encoder = new TextEncoder();
    const decoder = new TextDecoder("utf-8");

    // Read the stream from the response body
    const reader = response.body.getReader();

    // Create a readable stream to send the data incrementally to the client
    const stream = new ReadableStream({
      async start(controller) {
        while (true) {
          const { done, value } = await reader.read();
          if (done) {
            console.log("Stream complete");
            setTimeout(() => {
              console.log("Closing stream");
              controller.close();
            }, 5000);
            break;
          }

          // Decode the Uint8Array into a string
          const chunk = decoder.decode(value, { stream: true });
          console.log("Received chunk in fn:", chunk);

          // Enqueue the encoded chunk to the stream controller
          controller.enqueue(encoder.encode(`data: ${chunk}\n\n`));
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
