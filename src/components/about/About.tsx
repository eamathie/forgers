import MobileSidebar from "../navbar/MobileSidebar";

const About: React.FC = () => {
    return (
        <div className="relative flex-1 min-h-0">
            <span className="md:hidden">
                <MobileSidebar />
            </span>
            <h2>About page</h2>
        </div>
    );
};

export default About;