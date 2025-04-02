export type TCredit = {
  id: number;
  name: string;
  character: string;
  profile_path: string;
};

function CreditCard(credit: TCredit) {
  return (
    <div className="flex flex-col items-center justify-between">
      <img
        className="rounded-full h-[80px] w-[80px] object-cover border-white border-2"
        src={
          credit.profile_path
            ? `https://image.tmdb.org/t/p/w500${credit.profile_path}`
            : "https://sellercenter.interpark.com/common/img/default_profile.png"
        }
        alt={credit.name}
      />
      <div className="text-white font-bold text-[12px] mt-2 flex-grow text-center overflow-hidden">
        {credit.character || "no character"}
      </div>
      <div className="text-gray-100 text-[10px] mt-1 flex-grow text-center overflow-hidden">
        {credit.name}
      </div>
    </div>
  );
}

export default CreditCard;
