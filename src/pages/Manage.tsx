import Access from "@/components/Access";
import DeviceInfo from "@/components/DeviceInfo";
import Subtitle from "@/components/Subtitle";
import { LlllDevice } from "@/services/firebase";
import { mqttActions, mqttState } from "@/valtio/mqtt";
import { ChangeEvent, FC } from "react";
import { useSnapshot } from "valtio";

interface SwitchDeviceProps {
  devices: LlllDevice[];
}

const SwitchDevice: FC<SwitchDeviceProps> = ({ devices }) => {
  const mqttSnap = useSnapshot(mqttState);

  const handleChangeDevice = async (e: ChangeEvent<HTMLSelectElement>) => {
    const device = devices.find((device) => device.id === e.target.value);
    if (!device) return;

    await mqttActions.setActiveDeviceInfo(device as LlllDevice);
  };

  return (
    <div className="flex items-centers gap-2">
      <Subtitle text="Thiết bị: " />
      <select
        onChange={handleChangeDevice}
        value={mqttSnap.activeDeviceInfo.id}
      >
        {devices.map((device) => (
          <option key={device.id} value={device.id}>
            {device.name}
          </option>
        ))}
      </select>
    </div>
  );
};

const ManagePage = () => {
  const mqttSnap = useSnapshot(mqttState);

  if (mqttSnap.ownedDevices.length === 0) {
    return (
      <div className="text-xl text-tertiary font-semibold">
        <p>Bạn không sở hữu thiết bị nào!</p>
      </div>
    );
  }

  const device = mqttSnap.activeDeviceInfo;

  return (
    <div>
      <SwitchDevice devices={mqttSnap.ownedDevices as LlllDevice[]} />
      <div key={device.id}>
        <DeviceInfo id={device.id} name={device.name} owner={device.owner} />
        <Access accessList={[...device.users]} id={device.id} />
      </div>
    </div>
  );
};

export default ManagePage;
