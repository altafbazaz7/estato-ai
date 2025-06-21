import clsx from "clsx";

export default function ChatMessage({
  sender,
  text,
}: {
  sender: "user" | "ai";
  text: string;
}) {
  const isUser = sender === "user";

  return (
    <div
      className={clsx("flex", {
        "justify-end": isUser,
        "justify-start": !isUser,
      })}
    >
      <div
        className={clsx(
          "rounded-lg px-4 py-2 max-w-xs sm:max-w-md md:max-w-lg",
          {
            "bg-primary text-primary-foreground": isUser,
            "bg-muted text-muted-foreground": !isUser,
          }
        )}
      >
        
   <div dangerouslySetInnerHTML={{ __html: text }} />

      </div>
    </div>
  );
}
