// Optional local language model for CHAT.
// The model is downloaded only after the user taps the setup button.
const MODEL_ID = "onnx-community/SmolLM2-135M-Instruct-ONNX-MHA";
let generator = null;
let loading = false;

const statusEl = () => document.getElementById("aiStatus");
const progressEl = () => document.getElementById("aiProgress");
const loadButton = () => document.getElementById("loadAI");

function setStatus(message) {
  const el = statusEl();
  if (el) el.textContent = message;
}

function setProgress(percent) {
  const el = progressEl();
  if (!el) return;
  el.style.display = "block";
  el.value = Math.max(0, Math.min(100, Number(percent) || 0));
}

window.chatAIReady = false;
window.chatAIRespond = null;

async function loadLocalAI() {
  if (generator || loading) return;
  if (!navigator.onLine) {
    setStatus("Connect to the internet for the first download. After the model is cached, it can run offline.");
    return;
  }
  loading = true;
  if (loadButton()) loadButton().disabled = true;
  setStatus("Preparing the AI engine. This is a large first-time download; keep CHAT open.");
  setProgress(0);

  try {
    if (navigator.storage && navigator.storage.estimate) {
      const estimate = await navigator.storage.estimate();
      const available = Number(estimate.quota || 0) - Number(estimate.usage || 0);
      if (available > 0 && available < 250 * 1024 * 1024) {
        throw new Error("Not enough estimated browser storage for the model and runtime");
      }
      if (navigator.storage.persist) await navigator.storage.persist().catch(() => false);
    }
    const { pipeline, env } = await import("https://cdn.jsdelivr.net/npm/@huggingface/transformers@4.3.2");
    // Use the browser's model cache so later sessions can reuse downloaded files.
    if ("useBrowserCache" in env) env.useBrowserCache = true;
    if ("useWasmCache" in env) env.useWasmCache = true;

    const options = {
      dtype: "q4",
      progress_callback: (event) => {
        if (event && event.status === "progress" && Number.isFinite(event.progress)) {
          setProgress(event.progress);
          const file = event.file ? String(event.file).split("/").pop() : "model files";
          setStatus("Downloading " + file + " — " + Math.round(event.progress) + "%. Keep CHAT open.");
        } else if (event && event.status === "initiate") {
          setStatus("Starting download: " + (event.file || "AI model") + "…");
        } else if (event && event.status === "done") {
          setStatus("Downloaded " + (event.file || "a model file") + ". Preparing the model…");
        }
      }
    };

    if (navigator.gpu) {
      try {
        setStatus("Loading the model using your device's graphics processor…");
        generator = await pipeline("text-generation", MODEL_ID, { ...options, device: "webgpu" });
      } catch (gpuError) {
        generator = null;
        setStatus("Graphics acceleration was unavailable. Trying the slower CPU mode…");
        generator = await pipeline("text-generation", MODEL_ID, { ...options, device: "wasm" });
      }
    } else {
      setStatus("No WebGPU detected. Loading the model in CPU mode; this may be slower…");
      generator = await pipeline("text-generation", MODEL_ID, { ...options, device: "wasm" });
    }

    window.chatAIReady = true;
    window.chatAIRespond = async (question) => {
      if (!generator) throw new Error("Model is not loaded");
      const messages = [
        { role: "system", content: "You are CHAT, a careful and honest personal assistant. Answer only the question asked. Use simple, clear English and give a direct answer. Do not invent facts, names, dates, sources, calculations, or instructions. If you do not know or cannot understand the question, say clearly that you are not sure and ask one short clarifying question. For factual questions, do not guess. Avoid repeating the same point, sentence, or number. Keep the answer short and useful. Use age-appropriate language." },
        { role: "user", content: String(question).slice(0, 1800) }
      ];
      const output = await generator(messages, {
        max_new_tokens: 100,
        do_sample: false,
        repetition_penalty: 1.15,
        no_repeat_ngram_size: 3
      });
      const generated = output && output[0] && output[0].generated_text;
      let answer = "";
      if (Array.isArray(generated)) {
        const last = generated[generated.length - 1];
        answer = last && typeof last.content === "string" ? last.content : "";
      } else if (typeof generated === "string") {
        answer = generated;
      }
      if (!answer.trim()) throw new Error("The model returned an empty answer");
      return answer.trim();
    };

    setProgress(100);
    setStatus("Offline AI is ready. You can now ask open-ended questions. The first download is complete.");
  } catch (error) {
    console.error("CHAT local AI setup failed:", error);
    setStatus("AI setup did not finish. Check your connection and available storage, then try again. Your existing offline CHAT features still work.");
    setProgress(0);
    if (loadButton()) loadButton().disabled = false;
  } finally {
    loading = false;
    if (window.chatAIReady && loadButton()) {
      loadButton().textContent = "AI ready";
      loadButton().disabled = true;
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const button = loadButton();
  if (button) button.addEventListener("click", loadLocalAI);
  if (button && !navigator.onLine) {
    setStatus("Offline now. If the model was downloaded before, CHAT can reuse its cached files; otherwise connect for first setup.");
  }
});

window.addEventListener("online", () => {
  if (!window.chatAIReady) setStatus("Internet restored. Tap Download & prepare AI when you are ready.");
});
