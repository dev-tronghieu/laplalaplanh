import {
    LogoutOutlined,
    DashboardOutlined,
    ProfileOutlined,
    SettingOutlined,
} from "@ant-design/icons";
import { ReactNode } from "react";
import { authActions, authState } from "@/valtio/auth";
import { Link, useLocation } from "react-router-dom";
import { useSnapshot } from "valtio";

interface SidebarItemProps {
    icon: ReactNode;
    label: string;
    href: string;
    onClick?: () => void;
}

const SidebarItem = ({ icon, href, label, onClick }: SidebarItemProps) => {
    const pathname = useLocation().pathname;

    const activeStyle =
        !onClick && href === pathname && "bg-primary text-white";

    return (
        <Link
            className={`flex items-center gap-4 px-4 py-2 rounded-md hover:bg-primary hover:text-white transition ${activeStyle}`}
            to={onClick ? "#" : href}
            onClick={onClick}
        >
            {icon}
            <span>{label}</span>
        </Link>
    );
};

interface SidebarProps {
    className?: string;
}

const Sidebar = ({ className }: SidebarProps) => {
    const authSnap = useSnapshot(authState);

    return (
        <nav className={`bg-secondary flex flex-col ${className}`}>
            {authSnap.profile && (
                <div className="flex flex-col items-center gap-2 mt-12 mb-4">
                    <img
                        className="w-24 h-24 rounded-full border-2 border-tertiary"
                        src={authSnap.profile.photoURL}
                        alt="avatar"
                    />
                    <p className="text-tertiary text-lg">
                        {authSnap.profile.displayName}
                    </p>
                </div>
            )}

            <SidebarItem
                icon={<DashboardOutlined />}
                label="Bảng điều khiển"
                href="/"
            />

            <SidebarItem
                icon={<ProfileOutlined />}
                label="Hồ sơ"
                href="/profile"
            />

            <SidebarItem
                icon={<SettingOutlined />}
                label="Quản lý thiết bị"
                href="/manage"
            />

            <SidebarItem
                icon={<LogoutOutlined />}
                label="Đăng xuất"
                href="/"
                onClick={async () => {
                    await authActions.logout();
                }}
            />
        </nav>
    );
};

export default Sidebar;
