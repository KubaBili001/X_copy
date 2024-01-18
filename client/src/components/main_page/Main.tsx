import CenterSection from "./sections/CenterSection"
import LeftSection from "./sections/LeftSection"
import RightSection from "./sections/RightSection"
import './Main.css'

export default function Main() {
    return (
        <div className="section_container">
            <div className="box">
                <LeftSection />
                <CenterSection />
                <RightSection />
            </div>
        </div>
    )
}