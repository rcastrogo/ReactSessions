import { useEffect, useState } from "react";
import { cn } from "../lib/utils";
import { AlertManager } from "../lib/alert-manager";

// =====================================================================================
// IndeterminateProgressBar
// =====================================================================================
export const IndeterminateProgressBar = ({
  intervalSpeed = 100,
  increment = 5,
  showPercentage = false,
  containerClasses = '',
  progressClasses = '',
}) => {
  const [progress, setProgress] = useState(0);

  const defaultContainerClasses = 'h-1 w-full rounded-full bg-gray-400 dark:bg-muted';
  const defaultProgressClasses =
    'h-full bg-blue-700 dark:bg-blue-800 rounded-full text-white text-center text-sm';

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prevProgress => {
        if (prevProgress >= 100) {
          return 0;
        }
        return prevProgress + increment;
      });
    }, intervalSpeed);

    return () => clearInterval(interval);
  }, [intervalSpeed, increment]);

  return (
    <div className={cn(defaultContainerClasses, containerClasses)}>
      <div
        className={cn(defaultProgressClasses, progressClasses)}
        style={{ width: `${progress}%` }}
      >
        {showPercentage && `${progress}%`}
      </div>
    </div>
  );
};

export function FullScreenLoader({
  message = "Cargando...",
}: {
  message?: string;
}) {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80">
      <div className="flex flex-col items-center justify-center gap-4">
        <span className="h-12 w-12 animate-spin rounded-full border-2 border-t-transparent border-blue-500"></span>
        <span className="text-lg m text-gray-800 dark:text-gray-200">
          {message}
        </span>
      </div>
    </div>
  );
}

export default function Loading({
  message = "Cargando datos...",
}: {
  message?: string;
}) {
  const { showLoading, close} = AlertManager;
  useEffect(() => {
    showLoading(
      <div className="flex flex-col items-center justify-center gap-2 m-2">
        <span className="h-6 w-6 animate-spin rounded-full border-2 border-t-transparent border-blue-500"></span>
        <span className="text-lg text-gray-800 dark:text-gray-200">
          {message}
        </span>
      </div>);
    return () => close();
  });
  return null;
}
