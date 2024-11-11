import cn from "clsx";
import debounce from "lodash.debounce";
import {
  ArrowDownAZ,
  ArrowUpAZ,
  Calendar,
  Image as ImageIco,
  Settings,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { DASHBOARD_PAGES } from "../../../config/page-url.config";
import { useMediaStore } from "../../../stores/media.store";
import Button from "../../ui/Button/Button";
import { EButtonType } from "../../ui/Button/button.enums";
import { InputField } from "../../ui/Fields/InputField";
import { Modal } from "../../ui/Modal/Modal";
import { VSeparator } from "../../ui/VSeparator/VSeparator";

export default function MediaActionBar() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{ name: string }>({
    mode: "onChange",
  });

  const { setSortBy, setSortWay, sortWay, sortBy, setSearch, setOffset } =
    useMediaStore((state) => state);

  const [open, setOpen] = useState(false);
  const [openRename, setOpenRename] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const handleClose = () => setOpen(false);
  const handleCloseRename = () => setOpenRename(false);

  const debouncedUpdate = useCallback(
    debounce((value) => {
      setOffset(0);
      setSearch(value);
    }, 300), // 300 мс задержка
    []
  );

  useEffect(() => {
    return () => {
      debouncedUpdate.cancel(); // Очищаем таймер при размонтировании
    };
  }, [debouncedUpdate]);

  const handleDeleteFiles = () => {
    handleClose();
  };

  const onSubmit: SubmitHandler<{ name: string }> = () => {
    // mutate(formData)
    setOpenRename(false);
  };

  const handleSortByDate = () => {
    setSortBy("dateCreate");
  };

  const handleSortBy = () => {
    setSortBy(undefined);
  };

  const handleSortWay = () => {
    sortWay === "asc" ? setSortWay("desc") : setSortWay("asc");
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchValue(value);
    debouncedUpdate(value); // Вызовем дебаунсированную функцию
  };

  return (
    <div className="bg-gray-800 min-h-[46px] flex border-[1px] border-solid py-2 px-1 justify-between border-slate-600 rounded-b-xl">
      <div className="flex space-x-2 w-full  items-center">
        <ImageIco
          size={28}
          className={cn(
            "  cursor-pointer ",
            !sortBy ? "text-green-500" : "text-slate-400 hover:text-slate-200"
          )}
          onClick={() => handleSortBy()}
        />
        <Calendar
          size={28}
          className={cn(
            "  cursor-pointer ",
            sortBy === "dateCreate"
              ? "text-green-500"
              : "text-slate-400 hover:text-slate-200"
          )}
          onClick={() => handleSortByDate()}
        />
        {sortWay === "asc" && (
          <ArrowUpAZ
            size={28}
            className="text-slate-400 hover:text-slate-200 cursor-pointer"
            onClick={() => handleSortWay()}
          />
        )}
        {sortWay === "desc" && (
          <ArrowDownAZ
            size={28}
            className="text-slate-400 hover:text-slate-200 cursor-pointer min-w-[48px]"
            onClick={() => handleSortWay()}
          />
        )}

        <VSeparator />
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          className={
            "bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg flex-1   block p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white "
          }
        />
        <VSeparator />
        <>
          <Settings
            size={28}
            className="text-slate-400 hover:text-slate-200 cursor-pointer"
            onClick={() =>
              window.location.replace(DASHBOARD_PAGES.SETTINGS_EXPLORER)
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
