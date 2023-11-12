import Link from "next/link";

export default function Home() {
  return (
    <main>
      <button>
        <Link href="/signup">Sign Up</Link>
      </button>
    </main>
  );
}
