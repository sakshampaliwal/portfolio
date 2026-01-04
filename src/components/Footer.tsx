import { Terminal } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="py-8 border-t border-border">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-medium text-sm gradient-text">
              Saksham Paliwal
            </span>
          </div>
          
          <p className="text-sm text-muted-foreground text-center">
            Designed & Built with precision • © {new Date().getFullYear()}
          </p>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            Available for work
          </div>
        </div>
      </div>
    </footer>
  );
};
