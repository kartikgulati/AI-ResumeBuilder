import { Loader2 } from "lucide-react";
import { Button, ButtonProps } from "./ui/button";
import { cn } from "@/lib/utils";

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
}
export default function LoadingButton({
  loading,
  disabled,
  className,
  ...props
}: LoadingButtonProps) {
  return (
    <Button
    disabled={disabled || disabled}
    className={cn("flex items-center justify-center gap-2", className)}
    {...props}>
      {loading && <Loader2 className="animate-spin size-5" />}
      {props.children}
    </Button>
  );
}
