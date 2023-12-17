import { FC } from "react";
import ItemInfo from "./ItemInfo";

interface DeviceInfoProps {
  id: string;
  name: string;
  onwer: string;
}

const DeviceInfo: FC<DeviceInfoProps> = ({ id, name, onwer }) => {
  return (
    <div className="flex flex-col gap-2 py-5">
      <h1 className="text-xl font-semibold text-primary">Thông tin thiết bị</h1>
      <div className="max-w-[600px]">
        <ItemInfo title="Mã thiết bị" content={id} />
        <ItemInfo title="Tên thiết bị" content={name} isEditabled={true} />
        <ItemInfo title="Chủ thiết bị" content={onwer} />
      </div>
    </div>
  );
};

export default DeviceInfo;
