
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "~/components/ui/dialog";

export type DialogSize = "sm" | "md" | "lg" | "xl" | "fullscreen";
// Tailwind size presets
export const DialogSizeClasses: Record<DialogSize, string> = {
  sm: "!max-w-sm",
  md: "!max-w-lg",
  lg: "!max-w-2xl",
  xl: "!max-w-4xl",
  fullscreen: "!w-screen h-screen max-w-none",
};

export interface DialogLayoutProps {
  /** Dialog size preset */
  size?: DialogSize;
  /** Dialog title text */
  title?: string;
  /** Optional short description below title */
  description?: string;
  /** Dialog body content */
  children?: React.ReactNode;
  /** Optional footer (e.g. buttons) */
  footer?: React.ReactNode;
  /** Whether dialog is open */
  open?: boolean;
  /** Controlled open handler */
  onOpenChange?: (open: boolean) => void;
  /** Optional extra styles (e.g. height or overrides) */
  className?: string;
}

/**
 * Base layout for shadcn Dialog with responsive sizing,
 * fixed header/footer, and scrollable body.
 */
export function DialogLayout({
  size = "md",
  title,
  description,
  children,
  footer,
  open,
  onOpenChange,
  className,
}: DialogLayoutProps) {

  const heightClasses =
    size === "fullscreen" ? "h-screen" : "h-[80vh] max-h-[85vh]";

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className={`
          ${DialogSizeClasses[size]} 
          ${heightClasses} 
          flex flex-col p-0 gap-0 overflow-hidden
          ${className}
        `}
      >
        {/* Header */}
        {(title || description) && (
          <DialogHeader className="flex-shrink-0 border-b p-4">
            {title && <DialogTitle>{title}</DialogTitle>}
            {description && (
              <DialogDescription>{description}</DialogDescription>
            )}
          </DialogHeader>
        )}
        <div className="flex-1 overflow-y-auto">{children}</div>
        {footer && (
          <DialogFooter className="flex-shrink-0 border-t p-4">
            {footer}
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}
