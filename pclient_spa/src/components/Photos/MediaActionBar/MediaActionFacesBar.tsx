import cn from "clsx";
import { CalendarSearch, PanelBottomOpen, Settings } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DASHBOARD_PAGES } from "../../../config/page-url.config";
import { useMediaStore } from "../../../stores/media.store";
import Button from "../../ui/Button/Button";
import { EButtonType } from "../../ui/Button/button.enums";
import { InputField } from "../../ui/Fields/InputField";
import { Modal } from "../../ui/Modal/Modal";
import { VSeparator } from "../../ui/VSeparator/VSeparator";
import { useNavigate } from "react-router-dom";

export default function MediaActionFacesBar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: "onChange",
  });

  const navigate = useNavigate();

  const { setOpenPeoplesBar, openPeoplesBar, showPeople } = useMediaStore(
    (state) => state
  );

  const [open, setOpen] = useState(false);
  const [openRename, setOpenRename] = useState(false);

  const handleClose = () => setOpen(false);
  const handleCloseRename = () => setOpenRename(false);

  const handleDeleteFiles = () => {
    handleClose();
  };

  const onSubmit: SubmitHandler<{ name: string }> = () => {
    // mutate(formData)
    setOpenRename(false);
  };

  const handleGetFaces = async () => {
    setOpenPeoplesBar(!openPeoplesBar);
  };

  const handleSetDateRange = async () => {};
  return (
    <div className="bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-b-xl">
      <div className="flex space-x-2">
        <CalendarSearch
          size={28}
          className={cn(
            "  cursor-pointer ",
            showPeople
              ? "text-green-500"
              : "text-slate-400 hover:text-slate-200"
          )}
          onClick={() => handleSetDateRange()}
        />
        <PanelBottomOpen
          size={28}
          className={cn(
            "  cursor-pointer ",
            openPeoplesBar
              ? "text-green-500"
              : "text-slate-400 hover:text-slate-200"
          )}
          onClick={() => handleGetFaces()}
        />

        <VSeparator />

        <>
          <Settings
            size={28}
            className="text-slate-400 hover:text-slate-200 cursor-pointer"
            onClick={() =>
              navigate({ pathname: DASHBOARD_PAGES.SETTINGS_EXPLORER })
            }
          />
        </>
      </div>

      <Modal
        open={open}
        onClose={handleClose}
        title={"Delete files (folders)"}
        renderButtons={() => (
          <div className="flex space-x-2">
            <Button onClick={handleClose}>Cancel</Button>
            <Button
              typeButton={EButtonType.WARNING}
              onClick={handleDeleteFiles}
            >
              Delete
            </Button>
          </div>
        )}
      >
        Do you really want to delete the selected files (folder)?
      </Modal>
      <Modal open={openRename} onClose={handleCloseRename} title={"Rename"}>
        <form
          className=" flex flex-col w-full px-2 text-left"
          onSubmit={handleSubmit(onSubmit)}
        >
          <InputField
            label="New name"
            placeholder="Enter new name"
            {...register("name", {
              required: "field required",
            })}
            error={errors.name?.message}
          />
          <div className="flex space-x-2">
            <Button onClick={handleCloseRename}>Cancel</Button>
            <Button typeButton={EButtonType.WARNING} type="submit">
              Rename
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
