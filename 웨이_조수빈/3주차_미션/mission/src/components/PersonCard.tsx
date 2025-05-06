import defaultProfile from "../assets/default-profile.svg";

type PersonProps = {
    name: string;
    profile_path: string | null;
    role?: string; // character 또는 job
  };
  
  const PersonCard = ({ name, profile_path, role }: PersonProps) => {
    return (
      <div className="flex flex-col items-center">
        <img
          src={
            profile_path
              ? `https://image.tmdb.org/t/p/w185${profile_path}`
              : defaultProfile
          }
          alt={name}
          className="w-20 h-20 rounded-full object-cover border-2 border-white shadow"
        />
        <p className="mt-2 text-sm text-white text-center font-semibold truncate w-24">
          {name}
        </p>
        {role && (
          <p className="text-xs text-gray-400 text-center truncate w-24">
            {role}
          </p>
        )}
      </div>
    );
  };
  
  export default PersonCard;
  