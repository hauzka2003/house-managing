import { useState } from "react";

import { useRouter } from "next/router";
import { useEffect } from "react";
import { useUser } from "../../../store/user";

function AIAssistantPage() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState();
  const { user } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!user) {
      router.push("/log-in");
    }
  }, [user]);
  async function onSubmit(e) {
    e.preventDefault();
    const data = await fetch("/api/openai/assistant", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        prompt: prompt,
      }),
    });
    const response = await data.json();
    setResponse(response.data);
  }

  return (
    <div style={{ marginLeft: "300px" }}>
      <textarea value={prompt} onChange={(e) => setPrompt(e.target.value)} />
      <div>{response ?? "eo co veo gi"}</div>
      <div onClick={onSubmit}>click tao ne</div>
    </div>
  );
}

export default AIAssistantPage;
