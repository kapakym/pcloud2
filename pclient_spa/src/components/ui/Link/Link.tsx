import { PropsWithChildren } from "react";
import { useNavigate } from "react-router-dom";

interface LinkProps {
  to: string;
}

export default function Link({ children, to }: PropsWithChildren<LinkProps>) {
  const navigate = useNavigate();

  const handleNavigateTo = () => {
    navigate({ pathname: to });
  };
  return (
    <div
      className="hover:underline text-lg cursor-pointer text-slate-200"
      onClick={handleNavigateTo}
    >
      {children}
    </div>
  );
}
