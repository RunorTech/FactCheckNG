import { FeedSidebar } from "../ui/FeedSidebar";
import { TrendingSidebar } from "../ui/TrendingSidebar";

const AllClaimsLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="min-h-screen bg-background">
            <div className="container flex gap-4 py-4">
                {/* Left Sidebar */}
                <FeedSidebar />
                {/* Main Feed */}
                {children}
                {/* Right Sidebar */}
                <TrendingSidebar />
            </div>
        </div>
    );
};

export default AllClaimsLayout;
