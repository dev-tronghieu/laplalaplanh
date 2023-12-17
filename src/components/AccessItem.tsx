import { CloseOutlined } from "@ant-design/icons";
import { FC } from "react";

interface Props {
  name: string;
  onRemove?: () => void;
}

const AccessItem: FC<Props> = ({ name, onRemove }) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-large text-tertiary font-medium">{name}</h1>
      <button onClick={onRemove}>
        <CloseOutlined className="text-primary font-bold" />
      </button>
    </div>
  );
};

export default AccessItem;
