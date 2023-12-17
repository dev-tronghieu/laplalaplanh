import { FC } from "react";
import AccessItem from "./AccessItem";

interface Props {
  accessList: string[];
}

const Access: FC<Props> = ({ accessList }) => {
  return (
    <div className="flex flex-col gap-2 py-5">
      <h1 className="text-xl font-semibold text-primary">
        Quyền truy cập thiết bị
      </h1>
      <div className="max-w-[600px]">
        {accessList.map((item) => (
          <AccessItem key={item} name={item} />
        ))}
      </div>
    </div>
  );
};

export default Access;
