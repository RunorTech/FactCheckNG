import { ClaimNav } from "../ui/ClaimNav";
import { FeedSidebar } from "../ui/FeedSidebar";
import { TrendingSidebar } from "../ui/TrendingSidebar";

const AllClaimsLayout = ({ children }: { children: React.ReactNode }) => {

    return (
        <div className="min-h-screen bg-background">
            <div className="container lg:flex lg:gap-4 py-4">
                {/* Left Sidebar */}
                <FeedSidebar />
                {/* Main Feed */}
                {children}
                {/* Right Sidebar */}
                <TrendingSidebar />
                <div className="lg:hidden  fixed bottom-6 left-4">
                    <ClaimNav />
                </div>
            </div>
        </div>
    );
};

export default AllClaimsLayout;
