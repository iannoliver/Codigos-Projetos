import { useEffect, useRef, useState } from "react";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

/** Parser de blocos no formato:
 * [caminho/arquivo.ext]
 * <conteúdo>
 */
function parseFilesFromContent(content = "") {
  const files = [];
  const regex = /\[([^\]\n]+)\]\s*\n([\s\S]*?)(?=\n\[[^\]\n]+\]\s*\n|$)/g;
  let m;
  while ((m = regex.exec(content)) !== null) {
    files.push({ name: m[1].trim(), content: m[2].trim() });
  }
  return files;
}

function ChatWindow({ chat, onDraftChange, onPushMessage, onSetLastCode }) {
  const [loading, setLoading] = useState(false);
  const listRef = useRef(null);

  // auto scroll para a última mensagem
  useEffect(() => {
    listRef.current?.scrollTo({
      top: listRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [chat?.messages?.length]);

  if (!chat) {
    return (
      <div className="h-full flex items-center justify-center text-mute">
        <div className="text-center">
          <h1 className="text-xl font-semibold mb-2">AI Tool Generator</h1>
          <p>Selecione ou crie uma conversa.</p>
        </div>
      </div>
    );
  }

  // Envio da prompt
  const send = async () => {
    const text = chat.draft?.trim();
    if (!text || loading) return;

    setLoading(true);
    onPushMessage({ role: "user", content: text, ts: Date.now() });

    try {
      const res = await fetch(`${API}/generate-tool`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description: text }),
      });

      const ct = res.headers.get("content-type") || "";
      const payload = ct.includes("application/json")
        ? await res.json()
        : { errorText: await res.text() };

      if (!res.ok) {
        throw new Error(payload?.error || payload?.errorText || `HTTP ${res.status}`);
      }

      const code = payload.code || "";
      onSetLastCode(code);
      onPushMessage({
        role: "assistant",
        content: code || "Sem retorno.",
        ts: Date.now(),
      });
      onDraftChange("");
    } catch (err) {
      onPushMessage({
        role: "assistant",
        content: `Erro: ${String(err.message || err)}.\nVerifique se o backend está rodando em ${API}.`,
        ts: Date.now(),
        error: true,
      });
    } finally {
      setLoading(false);
    }
  };

  // Download do ZIP
  const downloadZip = async () => {
    const code = chat.lastCode || ""; // depende do parent preencher via onSetLastCode
    if (!code) {
      alert("Nenhum código disponível para baixar.");
      return;
    }
    const res = await fetch(`${API}/download-zip`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ code, name: chat.name }),
    });
    if (!res.ok) {
      alert("Erro ao gerar ZIP.");
      return;
    }
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${chat.name || "projeto"}.zip`;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  return (
    <div className="h-full flex flex-col">
      {/* Cabeçalho */}
      <div
        className="px-3 py-2 border-b border-out"
        style={{ background: "rgba(var(--panel-rgb),0.35)", backdropFilter: "blur(6px)" }}
      >
        <div className="font-semibold">
          {chat.name}{" "}
          <span className="text-mute text-xs">
            • {new Date(chat.updatedAt || chat.createdAt).toLocaleString()}
          </span>
        </div>
      </div>

      {/* Lista de mensagens — rola sozinha */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-3 py-3 space-y-3">
        {chat.messages.length === 0 && (
          <div className="text-mute text-center py-12">
            Comece descrevendo a ferramenta que deseja…
          </div>
        )}

        {chat.messages.map((m, idx) => {
          const isUser = m.role === "user";
          const files = !isUser ? parseFilesFromContent(m.content) : [];

          return (
            <div
              key={idx}
              className="w-full"
              style={{ display: "flex", justifyContent: isUser ? "flex-end" : "flex-start" }}
            >
              <div
                className="border p-3 rounded"
                style={{
                  maxWidth: "900px",
                  width: "100%",
                  background: isUser
                    ? "linear-gradient(135deg, var(--indigo-600), var(--violet-600))"
                    : "rgba(var(--panel-rgb),0.85)",
                  color: isUser ? "#fff" : "var(--text-base)",
                  borderColor: isUser ? "transparent" : "var(--border-out)",
                }}
              >
                <div className="text-[11px]" style={{ opacity: 0.75, marginBottom: 6 }}>
                  {isUser ? "Você" : "Assistente"} • {new Date(m.ts).toLocaleTimeString()}
                </div>

                {/* Se vier em blocos [arquivo], mostra cada arquivo como um "card" */}
                {files.length > 0 ? (
                  <div className="space-y-2">
                    {files.map((f, i) => (
                      <details
                        key={i}
                        open
                        className="border rounded"
                        style={{
                          borderColor: "var(--border-out)",
                          background: "rgba(var(--panel-rgb),0.6)",
                        }}
                      >
                        <summary
                          className="px-3 py-2 text-sm cursor-pointer select-none"
                          style={{ display: "flex", justifyContent: "space-between", gap: 12 }}
                        >
                          <span style={{ overflow: "hidden", textOverflow: "ellipsis" }}>
                            {f.name}
                          </span>
                          <button
                            className="text-xs border rounded px-2 py-1"
                            style={{
                              background: "rgba(var(--panel-rgb),0.85)",
                              borderColor: "var(--border-out)",
                            }}
                            onClick={(e) => {
                              e.preventDefault();
                              navigator.clipboard.writeText(f.content);
                            }}
                            title="Copiar conteúdo"
                          >
                            Copiar
                          </button>
                        </summary>
                        <pre
                          className="text-xs border-t overflow-auto"
                          style={{
                            whiteSpace: "pre-wrap",
                            padding: "12px",
                            borderColor: "var(--border-out)",
                            maxHeight: 320,
                          }}
                        >
                          {f.content}
                        </pre>
                      </details>
                    ))}
                  </div>
                ) : (
                  <pre className="text-sm" style={{ whiteSpace: "pre-wrap" }}>
                    {m.content}
                  </pre>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Barra fixa inferior: textarea + ações */}
      <div
        className="border-t px-3 py-3"
        style={{
          background: "rgba(var(--panel-rgb),0.40)",
          borderColor: "var(--border-out)",
          backdropFilter: "blur(8px)",
        }}
      >
        <textarea
          className="input"
          rows={3}
          placeholder="Descreva a ferramenta que deseja…"
          value={chat.draft}
          onChange={(e) => onDraftChange(e.target.value)}
        />

        <div className="mt-2" style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
          <button
            onClick={send}
            disabled={loading}
            className="btn-primary"
            style={{ opacity: loading ? 0.6 : 1 }}
          >
            {loading ? "Gerando…" : "Gerar"}
          </button>

          <button
            onClick={downloadZip}
            disabled={!chat.lastCode}
            className="btn-primary"
            style={{
              background:
                "linear-gradient(135deg, var(--indigo-600), var(--violet-600))",
              opacity: chat.lastCode ? 1 : 0.5,
            }}
            title={chat.lastCode ? "Baixar ZIP do último código" : "Gere um código primeiro"}
          >
            Baixar ZIP
          </button>
        </div>
      </div>
    </div>
  );
}

export default ChatWindow;