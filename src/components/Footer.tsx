export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="mt-[4.5rem] border-t border-[rgba(234,217,194,0.8)] px-4 pb-10 pt-8 text-[#7c674f]">
      <div className="mx-auto flex w-full max-w-[72rem] flex-col items-center justify-between gap-3 text-center sm:flex-row sm:text-left">
        <p className="w-full text-center text-[0.9rem] sm:text-left">
          &copy; {year} DevJokes. Debug hard, laugh harder.
        </p>
      </div>
    </footer>
  );
}
