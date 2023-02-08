
/* import react */

/* import lib */

/* import img */

/* import module */

/* import component */
import FlowerGlassBottle from "../../../components/GardenComponent/FlowerGlassBottleItem";
import HeaderComponent from "../../../components/HeaderComponent/HeaderComponent";
import LetterStep1Component from "../../../components/EndingLetterCompoents/LetterStep1Component/LetterStep1Component";
import LetterStep2Component from "../../../components/EndingLetterCompoents/LetterStep2Component/LetterStep2Component";
import LetterStep3Component from "../../../components/EndingLetterCompoents/LetterStep3Component/LetterStep3Component";
import LetterStep4Component from "../../../components/EndingLetterCompoents/LetterStep4Component/LetterStep4Component";


/* import css */
import "./EndingPage.css";

const EndingPage = () => {

    return (<>
        <HeaderComponent backVisible={true} pageName={"엔딩페이지"}></HeaderComponent>
        <div className="ending-page">
            {/* <LetterStep1Component></LetterStep1Component> */}
            {/* <LetterStep2Component></LetterStep2Component> */}
            {/* <LetterStep3Component></LetterStep3Component> */}
            {/* <LetterStep4Component></LetterStep4Component> */}
        </div>        
    </>)
}

export default EndingPage;