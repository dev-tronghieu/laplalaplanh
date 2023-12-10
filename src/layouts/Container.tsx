import type { ReactNode } from "react";
import Header from "./Header";
import Footer from "./Footer";

interface Props {
    children: ReactNode;
    className?: string;
}

const Container = ({ children, className }: Props) => {
    return (
        <div className={`min-h-screen flex flex-col ${className}`}>
            <Header />
            {children}
            <Footer />
        </div>
    );
};

export default Container;
