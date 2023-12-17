import Access from "@/components/Access";
import DeviceInfo from "@/components/DeviceInfo";
import { SwitchDevice } from "@/features/Controller";

const ManagePage = () => {
  return (
    <div>
      <SwitchDevice />
      <DeviceInfo id="123" name="Device 1" onwer="John Doe" />
      <Access />
    </div>
  );
};

export default ManagePage;
