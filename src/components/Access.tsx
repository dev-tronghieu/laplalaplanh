import { FC, useState } from "react";
import AccessItem from "./AccessItem";
import { addAccessToDevice, removeAccessOfDevice } from "@/services/firebase";
import { PlusCircleFilled } from "@ant-design/icons";

interface Props {
  id: string;
  accessList: string[];
}

const Access: FC<Props> = ({ accessList, id }) => {
  const [accessesState, setAccessesState] = useState<string[]>(accessList);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const [newAccess, setNewAccess] = useState<string>("");

  const handleRemove = async (content: string) => {
    await removeAccessOfDevice(id, content);
    const newList = accessesState.filter((item) => item !== content);
    setAccessesState(newList);
  };

  const handleAddAccess = async (content: string) => {
    await addAccessToDevice(id, content);
    const newList = [...accessesState, content];
    setAccessesState(newList);
  };

  return (
    <div className="flex flex-col gap-2 py-5">
      <div className="flex gap-2 items-center">
        <h1 className="text-xl font-semibold text-primary">
          Quyền truy cập thiết bị
        </h1>
        <button
          onClick={() => {
            setIsAdding(true);
          }}
          className="flex gap-2 items-center"
        >
          <PlusCircleFilled className="text-primary font-bold" />
        </button>
      </div>
      <div className="max-w-[600px]">
        {accessesState.map((item) => (
          <AccessItem key={item} name={item} onRemove={handleRemove} />
        ))}
      </div>

      {isAdding && (
        <div className="flex flex-col absolute w-[300px] h-[120px] bg-tertiary rounded-md p-4 gap-4">
          <input
            className="w-full h-10 rounded-md p-2"
            placeholder="Email người được cấp quyền"
            onChange={(text) => setNewAccess(text.target.value)}
          />
          <div className="flex gap-2 self-center">
            <button
              className="bg-primary text-white rounded-md w-[100px] p-1"
              onClick={() => {
                setIsAdding(false);
                handleAddAccess(newAccess);
                setNewAccess("");
              }}
            >
              Xác nhận
            </button>
            <button
              className="bg-primary text-white rounded-md w-[100px] p-1"
              onClick={() => {
                setIsAdding(false);
                setNewAccess("");
              }}
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Access;
