import { OperatingMode, Power, SwitchDevice } from "@/features/Controller";

const Dashboard = () => {
    return (
        <div className="flex flex-col gap-x-32 gap-y-8 px-4 md:px-8 py-8">
            <SwitchDevice />
            <div className="flex flex-wrap gap-x-8 gap-y-4">
                <Power />
                <OperatingMode />
            </div>
        </div>
    );
};

export default Dashboard;
