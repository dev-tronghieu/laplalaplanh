import { FC } from "react";
import ItemInfo from "./ItemInfo";

interface DeviceInfoProps {
  id: string;
  name: string;
  onwer: string;
}

const DeviceInfo: FC<DeviceInfoProps> = ({ id, name, onwer }) => {
  return (
    <div>
      <h1 className="text-xl font-semibold text-primary">Device Information</h1>
      <div className="max-w-[600px]">
        <ItemInfo title="ID" content={id} />
        <ItemInfo title="Name" content={name} />
        <ItemInfo title="Owner" content={onwer} />
      </div>
    </div>
  );
};

export default DeviceInfo;
