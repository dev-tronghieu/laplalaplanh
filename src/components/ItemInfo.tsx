import { FC } from "react";

interface Props {
  title: string;
  content: string;
}

const ItemInfo: FC<Props> = ({ title, content }) => {
  return (
    <div className="flex justify-between">
      <h1 className="text-large text-tertiary font-medium">{title}</h1>
      <p className="text-large">{content}</p>
    </div>
  );
};

export default ItemInfo;
