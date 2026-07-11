import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { useRef } from "react";

const tools = [
  { command: "bold", icon: Bold, label: "Bold" },
  { command: "italic", icon: Italic, label: "Italic" },
  { command: "insertUnorderedList", icon: List, label: "Bullets" },
  { command: "insertOrderedList", icon: ListOrdered, label: "Numbered" },
];

export default function RichTextEditor({ value, onChange, disabled = false }) {
  const editorRef = useRef(null);

  const runCommand = (command) => {
    if (disabled) return;
    editorRef.current?.focus();
    document.execCommand(command);
    onChange(editorRef.current?.innerHTML || "");
  };

  return (
    <div className="rounded-lg border border-neutral-200 bg-white">
      <div className="flex gap-1 border-b border-neutral-200 p-2">
        {tools.map((tool) => {
          const Icon = tool.icon;
          return (
            <button
              key={tool.command}
              type="button"
              onClick={() => runCommand(tool.command)}
              disabled={disabled}
              title={tool.label}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-neutral-600 hover:bg-neutral-100 disabled:opacity-50"
            >
              <Icon size={17} />
            </button>
          );
        })}
      </div>
      <div
        ref={editorRef}
        contentEditable={!disabled}
        suppressContentEditableWarning
        onInput={(event) => onChange(event.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: value }}
        className="min-h-32 rounded-b-lg px-3 py-3 text-sm leading-6 outline-none empty:before:text-neutral-400"
      />
    </div>
  );
}
