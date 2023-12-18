import { EditOutlined } from "@ant-design/icons";
import { FC, useState } from "react";

interface Props {
  title: string;
  content: string;
  isEditabled?: boolean;
  onEdit?: (content: string) => void;
}

const ItemInfo: FC<Props> = ({
  title,
  content,
  isEditabled = false,
  onEdit,
}) => {
  const [editedContent, setEditedContent] = useState(content);
  const [isEditing, setIsEditing] = useState(false);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
    if (onEdit) {
      onEdit(editedContent);
    }
  };

  return (
    <div className="flex justify-between">
      <div className="flex gap-1 items-center">
        <h1 className="text-large text-tertiary font-medium">{title}</h1>

        {isEditabled && (
          <button
            className="flex items-center"
            onClick={() => {
              setIsEditing(!isEditing);
            }}
          >
            <EditOutlined className="text-primary cursor-pointer" />
          </button>
        )}
      </div>

      {isEditing ? (
        <input
          type="text"
          value={editedContent}
          onChange={(text) => setEditedContent(text.target.value)}
          onKeyDown={(event) => handleKeyDown(event)}
        />
      ) : (
        <p className="text-large">{editedContent}</p>
      )}
    </div>
  );
};

export default ItemInfo;
