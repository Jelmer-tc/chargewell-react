import { Feature } from "./Feature";

export function Step(props) {
    const {step, configuratorContext} = {...props};

    return (
        <div className="step">
            <h2 className="step__title">{step.title}</h2>
            {step.features.map(childFeature =>
                <Feature key={childFeature.id} feature={childFeature} configuratorContext={configuratorContext} />
            )}
        </div>
    )
}