import { ConnectionStatus, mqttState } from "@/valtio/mqtt";
import { useSnapshot } from "valtio";
import * as mqttService from "@/services/mqtt";

const DeviceStatus = () => {
    const mqttSnap = useSnapshot(mqttState);

    const handleConnection = () => {
        if (mqttSnap.connectionStatus === ConnectionStatus.CONNECTED) {
            mqttService.stop();
        }

        if (mqttSnap.connectionStatus === ConnectionStatus.DISCONNECTED) {
            mqttService.start();
        }
    };

    const getConnectionText = () => {
        if (mqttSnap.connectionStatus === ConnectionStatus.CONNECTED) {
            return "Disconnect";
        }

        if (mqttSnap.connectionStatus === ConnectionStatus.DISCONNECTED) {
            return "Connect";
        }

        return "Loading";
    };

    const handleSayHello = () => {
        mqttService.publish(
            mqttService.LLLL_CHANNEL.HELLO,
            "Say hello from LLLL client!"
        );
    };

    return (
        <div className="flex flex-col items-center gap-4">
            <button className="btn" onClick={handleConnection}>
                {getConnectionText()}
            </button>

            {mqttSnap.connectionStatus === ConnectionStatus.CONNECTED && (
                <button className="btn" onClick={handleSayHello}>
                    Say hello
                </button>
            )}
        </div>
    );
};

export default DeviceStatus;
