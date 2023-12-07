import DeviceStatus from "@/components/DeviceStatus";
import Login from "@/components/Login";

function App() {
    return (
        <div className="mx-auto my-4 flex flex-col items-center gap-4">
            <Login />
            <DeviceStatus />
        </div>
    );
}

export default App;
