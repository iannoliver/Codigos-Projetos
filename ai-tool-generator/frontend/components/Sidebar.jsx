import { useState } from "react";

function Sidebar({ chats, activeId, onSelect, onCreateChat, onRenameChat, onDeleteChat }) {
  const [editingId, setEditingId] = useState(null);
  const [tempName, setTempName] = useState("");

  const startEdit = (chat) => {
    setEditingId(chat.id);
    setTempName(chat.name);
  };

  const commitEdit = (chat) => {
    onRenameChat(chat.id, tempName.trim() || chat.name);
    setEditingId(null);
    setTempName("");
  };

  return (
    <div className="h-full flex flex-col">
      {/* topo */}
      <div className="p-3 border-b border-out bg-[rgba(var(--panel-rgb),0.85)] backdrop-blur">
        <div className="flex items-center justify-between gap-2">
          <h2 className="text-lg font-semibold">Conversas</h2>
          <button
            className="btn-primary"
            onClick={() => onCreateChat("Nova conversa")}
          >
            + Nova
          </button>
        </div>
      </div>

      {/* lista */}
      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {chats.map((chat) => {
          const isActive = chat.id === activeId;
          return (
            <div
              key={chat.id}
              className={`cursor-pointer rounded-lg border ${
                isActive ? "border-[color-mix(in_srgb,var(--violet-600)_50%,var(--outline))]" : "border-out"
              } bg-[rgba(var(--panel-rgb),0.75)] hover:bg-[rgba(var(--panel-rgb),0.9)] transition`}
              onClick={() => onSelect(chat.id)}
            >
              <div className="flex items-center justify-between gap-2 px-3 py-2">
                {editingId === chat.id ? (
                  <input
                    className="input"
                    value={tempName}
                    onChange={(e) => setTempName(e.target.value)}
                    onBlur={() => commitEdit(chat)}
                    onKeyDown={(e) => e.key === "Enter" && commitEdit(chat)}
                    autoFocus
                  />
                ) : (
                  <>
                    <div className="min-w-0">
                      <div className="truncate">{chat.name}</div>
                      <div className="text-mute text-xs">
                        {new Date(chat.updatedAt || chat.createdAt).toLocaleString()}
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        className="text-sm opacity-75 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          startEdit(chat);
                        }}
                        title="Renomear"
                      >
                        ✏️
                      </button>
                      <button
                        className="text-sm opacity-75 hover:opacity-100"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDeleteChat(chat.id);
                        }}
                        title="Excluir"
                      >
                        🗑️
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;