
import { useState } from "react";


/* component */
import LogoutModal from "../../components/LogoutModal";

/* import css */
import "./TestPage.css";

const TestPage = () => {

    return (
        <div className="test-page">
            <LogoutModal></LogoutModal>
        </div>
    )
}

export default TestPage;