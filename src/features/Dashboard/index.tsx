import Device from "./Device";
import UserInfo from "./UserInfo";

const Dashboard = () => {
    return (
        <div className="flex flex-wrap gap-8 px-4 md:px-8 py-8">
            <UserInfo />
            <Device />
        </div>
    );
};

export default Dashboard;
