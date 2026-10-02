import "./Sidebar.css";

function Sidebar({ currentStep }) {

    const steps = [

        "Personal Info",
        "Address",
        "Education",
        "Preferences",
        "Review"

    ];

    return (

        <div className="sidebar">

            <div className="logo">

                <h2>📝 Register</h2>

                <p>Multi-Step Form</p>

            </div>

            <div className="step-list">

                {

                    steps.map((step, index) => (

                        <div

                            key={index}

                            className={
                                currentStep === index + 1
                                    ? "step active"
                                    : "step"
                            }

                        >

                            <div className="circle">

                                {index + 1}

                            </div>

                            <span>{step}</span>

                        </div>

                    ))

                }

            </div>

        </div>

    );

}

export default Sidebar;