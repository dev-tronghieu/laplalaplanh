import DeviceController from "./Controller";
import DeviceMetadata from "./Metadata";
import DeviceStatus from "./Status";

const Dashboard = () => {
    return (
        <div className="flex flex-wrap gap-x-32 gap-y-8 px-4 md:px-8 py-8">
            <DeviceMetadata />
            <DeviceController />
            <DeviceStatus />
        </div>
    );
};

export default Dashboard;
