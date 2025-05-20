import notFoundImage from "../assets/not-found.svg";

function NotFoundPage() {
  return (
    <>
      <div className="bg-black flex flex-col items-center justify-center min-h-screen text-red-400">
        <img src={notFoundImage} alt="404 Not Found" className="h-auto w-80 animate-bounce" />
        <h1 className="text-4xl font-bold mt-4 select-none">404 Not Found</h1>
      </div>
    </>

  );
}

export default NotFoundPage;