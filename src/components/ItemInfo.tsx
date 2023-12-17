import { EditOutlined } from "@ant-design/icons";
import { FC } from "react";

interface Props {
  title: string;
  content: string;
  isEditabled?: boolean;
  onEdit?: () => void;
}

const ItemInfo: FC<Props> = ({
  title,
  content,
  isEditabled = false,
  onEdit,
}) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-1 items-center">
        <h1 className="text-large text-tertiary font-medium">{title}</h1>
        {isEditabled && (
          <button className="flex items-center" onClick={onEdit}>
            <EditOutlined className="text-primary cursor-pointer" />
          </button>
        )}
      </div>
      <p className="text-large">{content}</p>
    </div>
  );
};

export default ItemInfo;
