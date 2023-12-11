import Title from "@/components/Title";
import * as mqttService from "@/services/mqtt";

const DeviceController = () => {
    const handleSayHello = () => {
        mqttService.publish(
            mqttService.LLLL_CHANNEL.HELLO,
            "Say hello from LLLL client!"
        );
    };

    return (
        <div>
            <Title text="Điều khiển thiết bị" />

            <button className="btn" onClick={handleSayHello}>
                Say hello
            </button>
        </div>
    );
};

export default DeviceController;
