import useGetLpList from "../hooks/queries/useGetLPList";


function HomePage() {
  const {data: ResponseLPListDto, isPending, isError} = useGetLpList({});
  console.log("ResponseLPListDto", ResponseLPListDto);
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {ResponseLPListDto?.data.map((lp)=><h1>{lp.title}</h1>)}
    </div>
  );
}

export default HomePage;