import DeviceController from "./Controller";
import DeviceMetadata from "./Metadata";

const Dashboard = () => {
    return (
        <div className="flex flex-wrap gap-8 px-4 md:px-8 py-8">
            <DeviceMetadata />
            <DeviceController />
        </div>
    );
};

export default Dashboard;
