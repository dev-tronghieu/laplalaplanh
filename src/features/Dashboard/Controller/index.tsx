import Title from "@/components/Title";
import SayHello from "./SayHello";
import Power from "./Power";

const DeviceController = () => {
    return (
        <div>
            <Title text="Điều khiển thiết bị" />

            <div className="flex flex-col gap-2">
                <Power />
                <SayHello />
            </div>
        </div>
    );
};

export default DeviceController;
