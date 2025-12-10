import { type ReactNode } from "react";

interface PageHeaderProps {
  title: ReactNode;
  imageUrl: string;
}

export default function PageHeader({ title, imageUrl }: PageHeaderProps) {
  return (
    <div
      className="w-full h-[50px] sm:h-[80px] md:h-[100px] flex items-center justify-center text-white font-bold text-2xl md:text-3xl relative bg-center bg-cover"
      style={{ backgroundImage: `url(${imageUrl})` }}
    >
      <div className="absolute inset-0 bg-black/30"></div>
      <h1 className="relative z-10">{title}</h1>
    </div>
  );
}