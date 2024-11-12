import { useMutation } from "@tanstack/react-query";
import dayjs from "dayjs";
import { Clipboard } from "lucide-react";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { IShareLink } from "../../../types/share.types";
import { useFileActionsStore } from "../../../stores/file-actions.store";
import { IUpdateShareLinkReq } from "../../../types/files.types";
import { shareService } from "../../../services/share.service";
import { Modal } from "../../ui/Modal/Modal";
import { handleCopyToClipboard } from "../../../utils/clipboard.utils";
import Button from "../../ui/Button/Button";
import { InputField } from "../../ui/Fields/InputField";
import { EButtonType } from "../../ui/Button/button.enums";

interface ModalAddEditShareProps {
  setOpen: (value: boolean) => void;
  open: boolean;
  link: IShareLink | null;
}

interface FormTypes {
  password?: string;
  retryPassword?: string;
  timeLive?: string;
}

export const ModalEditShare = (props: ModalAddEditShareProps) => {
  const { open, setOpen, link } = props;

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm<FormTypes>({
    mode: "onChange",
  });

  const { selected } = useFileActionsStore((state) => state);

  const {
    mutate: mutateUpdateShareLink,
    data,
    reset,
  } = useMutation({
    mutationKey: ["mutateUpdateShareLink"],
    mutationFn: (data: IUpdateShareLinkReq) => shareService.updateShare(data),
  });

  useEffect(() => {
    if (link) {
      setValue("timeLive", link.timeLive);
    }
  }, [link, setValue]);

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  const handleClose = () => {
    setOpen(false);
  };

  const onSubmit: SubmitHandler<FormTypes> = async (formData) => {
    if (link) {
      const data: IUpdateShareLinkReq = {
        id: link.id,
        password: formData.password
          ? formData.password === formData.retryPassword
            ? formData.password
            : undefined
          : undefined,
        timeLive: formData.timeLive
          ? dayjs(formData.timeLive).toISOString()
          : undefined,
      };

      mutateUpdateShareLink(data);
    }
  };

  return (
    <Modal open={open} onClose={handleClose} title={"Share"}>
      {data?.data && link && (
        <div className="flex flex-col space-y-4">
          <div className="flex space-x-2">
            <div>{`${window.location.host}/share/${link.id}`}</div>
            <Clipboard
              size={28}
              className="text-slate-400 hover:text-slate-200 cursor-pointer"
              onClick={() =>
                handleCopyToClipboard(
                  `${window.location.host}/share/${link.id}`
                )
              }
            ></Clipboard>
          </div>

          <Button onClick={handleClose}>Close</Button>
        </div>
      )}
      {link && !data?.data && (
        <form
          className=" flex flex-col w-full px-2 text-left justify-between h-full"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div>
            <div>{selected[0]?.name}</div>
            <InputField
              type={"date"}
              label="Active to"
              placeholder="Enter password"
              {...register("timeLive", {})}
              error={errors.timeLive?.message}
            />
            <InputField
              label="Password"
              placeholder="Enter password"
              {...register("password", {})}
              error={errors.password?.message}
            />
            <InputField
              label="Retry password"
              placeholder="Retry password"
              {...register("retryPassword", {})}
              error={errors.retryPassword?.message}
            />
          </div>

          <div className="flex space-x-2">
            <Button onClick={handleClose}>Cancel</Button>
            <Button typeButton={EButtonType.WARNING} type="submit">
              Share
            </Button>
          </div>
        </form>
      )}
    </Modal>
  );
};
