import { FC } from "react";
import ItemInfo from "./ItemInfo";
import { updateDeviceName } from "@/services/firebase";

interface DeviceInfoProps {
  id: string;
  name: string;
  owner: string;
}

const DeviceInfo: FC<DeviceInfoProps> = ({ id, name, owner }) => {
  const handleEditName = async (content: string) => {
    await updateDeviceName(id, content);
  };

  return (
    <div className="flex flex-col gap-2 py-5">
      <h1 className="text-xl font-semibold text-primary">Thông tin thiết bị</h1>
      <div className="max-w-[600px]">
        <ItemInfo title="Mã thiết bị" content={id} />
        <ItemInfo
          title="Tên thiết bị"
          content={name}
          isEditabled={true}
          onEdit={handleEditName}
        />
        <ItemInfo title="Chủ thiết bị" content={owner} />
      </div>
    </div>
  );
};

export default DeviceInfo;
