import Title from "@/components/Title";
import Temperature from "./Temperature";

const DeviceStatus = () => {
    return (
        <div className="flex-1">
            <Title text="Thông số thiết bị" />
            <Temperature />
        </div>
    );
};

export default DeviceStatus;
