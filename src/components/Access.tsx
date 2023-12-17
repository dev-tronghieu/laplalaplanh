import AccessItem from "./AccessItem";

const Access = () => {
  return (
    <div className="flex flex-col gap-2 py-5">
      <h1 className="text-xl font-semibold text-primary">
        Quyền truy cập thiết bị
      </h1>
      <div className="max-w-[600px]">
        <AccessItem name="abcd@gmail.com" />
        <AccessItem name="abcd@gmail.com" />
        <AccessItem name="abcd@gmail.com" />
      </div>
    </div>
  );
};

export default Access;
