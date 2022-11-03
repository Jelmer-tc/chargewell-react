import { act } from "react-dom/test-utils";
import { Feature } from "./Feature";

export function Step(props) {
    const {step, configuratorContext, activeStep, updateActiveStep} = {...props};

    return (
        <div className="step">
            {step.name}
            {step.features.map(childFeature =>
                <Feature key={childFeature.id} feature={childFeature} configuratorContext={configuratorContext} />
            )}

            <div className="step__footer">
                {activeStep > 0 &&
                    <button className="step__f-previous btn btn--secondary"
                        onClick={() => { updateActiveStep(activeStep - 1)}}
                    >Previous</button>
                }
                {activeStep < 3 &&
                    <button className="step__f-next btn btn--primary"
                        onClick={() => { updateActiveStep(activeStep + 1)}}
                    >Next</button>
                }
            </div>
        </div>
    )
}