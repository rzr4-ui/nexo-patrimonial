import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * Logotipo oficial Nexo Patrimonial (versión reverso, para fondos oscuros).
 * Assets en /public/brand/, derivados del logo vectorial del manual de marca.
 * - showTagline=true  -> logo completo con "PATRIMONIO 360°"
 * - showTagline=false -> logo sin la línea de tagline
 */
export function Logo({
  className,
  showTagline = true,
}: {
  className?: string;
  showTagline?: boolean;
}) {
  const src = showTagline
    ? "/brand/logo-reverse.png"
    : "/brand/logo-reverse-notag.png";
  // Dimensiones intrínsecas (px) de cada asset, para preservar el ratio.
  const dims = showTagline ? { w: 1063, h: 293 } : { w: 1063, h: 250 };

  return (
    <span className={cn("inline-flex items-center", className)}>
      <Image
        src={src}
        alt="Nexo Patrimonial — Patrimonio 360°"
        width={dims.w}
        height={dims.h}
        priority
        sizes="200px"
        className="h-10 w-auto"
      />
    </span>
  );
}
