import { Bold, Italic, List, ListOrdered } from "lucide-react";
import { useRef, useEffect } from "react";

const tools = [
  { command: "bold", icon: Bold, label: "Bold" },
  { command: "italic", icon: Italic, label: "Italic" },
  { command: "insertUnorderedList", icon: List, label: "Bullets" },
  { command: "insertOrderedList", icon: ListOrdered, label: "Numbered" },
];

export default function RichTextEditor({
  value,
  onChange,
  disabled = false,
}) {
  const editorRef = useRef(null);

  useEffect(() => {
    if (
      editorRef.current &&
      editorRef.current.innerHTML !== value
    ) {
      editorRef.current.innerHTML = value || "";
    }
  }, [value]);

  const runCommand = (command) => {
    if (disabled) return;

    editorRef.current.focus();
    document.execCommand(command);

    onChange(editorRef.current.innerHTML);
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
              disabled={disabled}
              title={tool.label}
              onClick={() => runCommand(tool.command)}
              className="flex h-9 w-9 items-center justify-center rounded-lg hover:bg-neutral-100 disabled:opacity-50"
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
        onInput={(e) => onChange(e.currentTarget.innerHTML)}
        className="min-h-32 rounded-b-lg px-3 py-3 text-sm leading-6 outline-none"
      />
    </div>
  );
}