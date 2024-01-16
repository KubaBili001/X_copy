import CenterSection from "./sections/CenterSection"
import LeftSection from "./sections/LeftSection"
import RightSection from "./sections/RightSection"

export default function Main() {
    return (
        <div className="container">
            <div className="box">
                <LeftSection />
                <CenterSection />
                <RightSection />
            </div>
        </div>
    )
}