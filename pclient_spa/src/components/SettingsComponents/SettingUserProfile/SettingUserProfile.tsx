import { ModalEditUserProfile } from "../ModalEditUserProfile/ModalEditUserProfile";
import { useQuery } from "@tanstack/react-query";
import { Edit } from "lucide-react";
import { useState } from "react";
import { usersService } from "../../../services/users.service";

export const SettingUserProfile = () => {
  const { data } = useQuery({
    queryKey: ["getUserProfile"],
    queryFn: () => usersService.getUserProfile(),
  });

  const [open, setOpen] = useState(false);

  const handleOpenEditProfile = () => {
    setOpen(true);
  };

  return (
    <div className="flex flex-col space-y-2">
      <div className="text-sm">Name: {data?.data.name}</div>
      <div className="text-sm">Email: {data?.data.email}</div>
      <div className="text-sm">Role: {data?.data.roles}</div>
      <div className="flex flex-row items-center space-x-4 ">
        <Edit
          size={38}
          className="text-slate-400 hover:text-slate-200 cursor-pointer"
          onClick={handleOpenEditProfile}
        />
        <div className="text-sm">Edit profile</div>
      </div>
      <ModalEditUserProfile data={data?.data} open={open} setOpen={setOpen} />
    </div>
  );
};
