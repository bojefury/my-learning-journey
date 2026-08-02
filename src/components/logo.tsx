import Image from "next/image";
import Link from "next/link";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Help Store — главная">
      <Image
        src="/api/media/logo"
        width={44}
        height={44}
        alt="Товарный знак Help Store"
        priority
        unoptimized
      />
      <span>
        <b>HELP</b> STORE
      </span>
    </Link>
  );
}
