import { ConnectionStatus, mqttActions, mqttState } from "@/valtio/mqtt";
import { useSnapshot } from "valtio";

const DeviceStatus = () => {
    const mqttSnap = useSnapshot(mqttState);

    const handlePressButton = () => {
        if (mqttSnap.connectionStatus === ConnectionStatus.CONNECTED) {
            mqttActions.disconnect();
        }

        if (mqttSnap.connectionStatus === ConnectionStatus.DISCONNECTED) {
            mqttActions.connect();
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

    return (
        <div>
            <button className="btn" onClick={handlePressButton}>
                {getConnectionText()}
            </button>
        </div>
    );
};

export default DeviceStatus;
