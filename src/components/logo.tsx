import Image from "next/image";
import Link from "next/link";
export function Logo() {
  return (
    <Link href="/" className="logo" aria-label="Help Store — главная">
      <Image
        src="/brand/help-store-logo.jpg"
        width={44}
        height={44}
        alt="Товарный знак Help Store"
        priority
      />
      <span>
        <b>HELP</b> STORE
      </span>
    </Link>
  );
}
