import Access from "@/components/Access";
import DeviceInfo from "@/components/DeviceInfo";
import { SwitchDevice } from "@/features/Controller";
import { mqttState } from "@/valtio/mqtt";
import { useSnapshot } from "valtio";

const ManagePage = () => {
    const mqttSnap = useSnapshot(mqttState);

    if (!mqttSnap.activeDevice) {
        return (
            <div>
                <SwitchDevice />
                <p>No device selected</p>
            </div>
        );
    }

    return (
        <div>
            <SwitchDevice />
            <DeviceInfo
                id={mqttSnap.activeDevice.id}
                name={mqttSnap.activeDevice.name}
                owner={mqttSnap.activeDevice.owner}
            />
            <Access accessList={["abcd@gmail.com"]} />
        </div>
    );
};

export default ManagePage;
