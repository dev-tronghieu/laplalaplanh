import { OperatingMode, Power, SwitchDevice } from "@/features/Controller";
import { Temperature } from "@/features/Status";

const DashboardPage = () => {
    return (
        <div className="flex flex-col gap-x-32 gap-y-8">
            <SwitchDevice />

            <div className="flex flex-wrap gap-x-8 gap-y-4">
                <Power />
                <OperatingMode />
            </div>

            <Temperature />
        </div>
    );
};

export default DashboardPage;
