import { useParams } from "react-router-dom";
import CreditCard from "../components/creditCard";
import { TCredit } from "../components/creditCard";
import useFetchCredit from "../hooks/useFetchCredit";

function Credit() {
  const { id } = useParams();
  const { credit, isPending, isError } = useFetchCredit(id);

  if (isError) {
    return (
      <div className="h-dvh flex justify-center items-center">
        <span className="text-red-500 text-2xl whitespace-pre-line">
          에러가 발생했습니다. <br />
          다시 시도해주세요.
        </span>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-[repeat(auto-fill,_minmax(150px,_1fr))] gap-2 justify-center mt-10">
      {isPending ? (
        <span className="text-white">로딩 중...</span>
      ) : (
        credit?.map((credit: TCredit, idx) => (
          <CreditCard {...credit} key={idx} />
        ))
      )}
    </div>
  );
}

export default Credit;
