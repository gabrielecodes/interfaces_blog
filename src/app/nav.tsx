import Link from "next/link";

export default function Nav() {
  return (
    <header className="w-full h-20 mx-auto font-serif font-normal sticky top-0 bg-background border-b border-neutral-700 z-10">
      <nav className="mx-auto pt-10 flex justify-between">
        <Link href={"/"}>
          <h2 className="hover:text-neutral-50"> &#8465;nterfaces Blog</h2>
        </Link>
        <ul className="flex gap-10">
          <li className="md:w-fit md:visible w-0 invisible">
            <Link href={"/"}>
              <h2 className="hover:text-neutral-50">Home</h2>
            </Link>
          </li>
          <li>
            <Link href={"/about"}>
              <h2 className="hover:text-neutral-50">About</h2>
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}
