import "./ProgressBar.css";

function ProgressBar({ currentStep }) {

    const percentage = (currentStep / 5) * 100;

    return (

        <div className="progress-wrapper">

            <div className="progress-info">

                <span>Progress</span>

                <span>{percentage}%</span>

            </div>

            <div className="progress-track">

                <div
                    className="progress-fill"
                    style={{ width: `${percentage}%` }}
                ></div>

            </div>

        </div>

    );

}

export default ProgressBar;