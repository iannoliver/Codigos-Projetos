import { useEffect, useMemo, useState } from "react";
import Sidebar from "../components/Sidebar.jsx";
import ChatWindow from "../components/ChatWindow.jsx";

const API = import.meta.env.VITE_API_URL || "http://localhost:3001";

export default function App() {
  const [chats, setChats] = useState(() => {
    // estado local de chats (mantém o que você já tinha)
    const raw = localStorage.getItem("aitool_chats");
    return raw ? JSON.parse(raw) : [];
  });
  const [activeId, setActiveId] = useState(() => {
    const raw = localStorage.getItem("aitool_active");
    return raw || null;
  });

  const active = useMemo(
    () => chats.find((c) => c.id === activeId) || null,
    [chats, activeId]
  );

  // persistência básica local
  useEffect(() => {
    localStorage.setItem("aitool_chats", JSON.stringify(chats));
  }, [chats]);
  useEffect(() => {
    if (activeId) localStorage.setItem("aitool_active", activeId);
  }, [activeId]);

  // ações simples (mantém seu fluxo)
  const onCreateChat = (name = "Nova conversa") => {
    const id = crypto.randomUUID();
    const now = Date.now();
    const chat = { id, name, createdAt: now, updatedAt: now, draft: "", messages: [] };
    setChats((prev) => [chat, ...prev]);
    setActiveId(id);
  };
  const onRenameChat = (id, name) => {
    setChats((prev) => prev.map((c) => (c.id === id ? { ...c, name } : c)));
  };
  const onDeleteChat = (id) => {
    setChats((prev) => prev.filter((c) => c.id !== id));
    if (id === activeId) setActiveId(null);
  };
  const onSelect = (id) => setActiveId(id);

  // helpers que o ChatWindow consome
  const onDraftChange = (val) => {
    if (!active) return;
    setChats((prev) =>
      prev.map((c) => (c.id === active.id ? { ...c, draft: val, updatedAt: Date.now() } : c))
    );
  };
  const onPushMessage = (msg) => {
    if (!active) return;
    setChats((prev) =>
      prev.map((c) =>
        c.id === active.id
          ? { ...c, messages: [...c.messages, msg], updatedAt: Date.now() }
          : c
      )
    );
  };
  const onSetLastCode = (code) => {
    if (!active) return;
    setChats((prev) =>
      prev.map((c) => (c.id === active.id ? { ...c, lastCode: code } : c))
    );
  };

  return (
  <div className="h-screen w-screen overflow-hidden flex bg-soft text-[var(--text)]">
    {/* LADO ESQUERDO (conversas) — com pontilhado */}
    <aside className="w-80 min-w-72 max-w-80 h-full border-r border-out relative bg-grid flex-shrink-0">
      {/* camada sólida para contraste do conteúdo */}
      <div className="absolute inset-0 bg-[color-mix(in_srgb,var(--bg-soft)_85%,transparent)] pointer-events-none" />
      <div className="relative h-full overflow-hidden">
        <Sidebar
          chats={chats}
          activeId={activeId}
          onSelect={onSelect}
          onCreateChat={onCreateChat}
          onRenameChat={onRenameChat}
          onDeleteChat={onDeleteChat}
        />
      </div>
    </aside>

    {/* ÁREA CENTRAL (tipo ChatGPT) */}
    <main className="flex-1 h-full flex flex-col overflow-hidden">
      {/* rolagem acontece só aqui */}
      <div className="flex-1 overflow-y-auto">
        <div className="max-w-3xl mx-auto w-full px-4 sm:px-6 md:px-8 py-6">
          <ChatWindow
            chat={active}
            onDraftChange={onDraftChange}
            onPushMessage={onPushMessage}
            onSetLastCode={onSetLastCode}
          />
        </div>
      </div>
    </main>
  </div>
  );
}