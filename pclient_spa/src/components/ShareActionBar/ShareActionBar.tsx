import { useMutation, useQueryClient } from "@tanstack/react-query";
import { ClipboardCopy, Edit, Trash } from "lucide-react";
import { useState } from "react";
import { shareService } from "../../services/share.service";
import { useShareStore } from "../../stores/share.store";
import { handleCopyToClipboard } from "../../utils/clipboard.utils";
import { ModalDeleteShareLink } from "./ModalDeleteShareLink/ModalDeleteShareLink";
import { ModalEditShare } from "./ModalEditShareLink/ModalEditShare";

export default function ShareActionBar() {
  const queryClient = useQueryClient();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const { selected } = useShareStore((state) => state);

  const { mutate: mutateDeleteShareLink } = useMutation({
    mutationKey: ["deleteShareLink"],
    mutationFn: (data: { id: string }) => shareService.deleteShare(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["queryGetHareLinks"] });
    },
  });

  const handleEdit = () => {
    setOpenEdit(true);
  };
  const handleDelete = () => {
    if (selected) {
      mutateDeleteShareLink({ id: selected?.id });
    }
    setOpen(false);
  };

  return (
    <div className="bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-b-xl">
      <div className="flex space-x-2">
        {selected && (
          <>
            <ClipboardCopy
              size={28}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
              onClick={() =>
                handleCopyToClipboard(
                  `${window.location.host}/share/${selected.id}`
                )
              }
            />
            <Edit
              size={28}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
              onClick={() => handleEdit()}
            />
            <Trash
              size={28}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
              onClick={() => setOpen(true)}
            />
          </>
        )}
      </div>
      <ModalDeleteShareLink
        filename={selected?.filename}
        onClick={handleDelete}
        onClose={() => setOpen(false)}
        open={open}
      />
      <ModalEditShare open={openEdit} link={selected} setOpen={setOpenEdit} />
    </div>
  );
}
