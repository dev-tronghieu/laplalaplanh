import type { ReactNode } from "react";

interface Props {
    children: ReactNode;
    className?: string;
}

const Container = ({ children, className }: Props) => {
    return (
        <div
            className={`min-h-screen bg-background flex flex-col ${className}`}
        >
            {children}
        </div>
    );
};

export default Container;
