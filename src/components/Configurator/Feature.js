const tagRegex = /(<([^>]+)>)/ig;

export function Feature(props) {
    const {feature, configuratorContext} = {...props};

    const featureInput = () => {
        switch(feature.type) {
            case 0:
            case 3: return <FeatureInput type="checkbox" feature={feature} configuratorContext={configuratorContext} />
            case 2: return <FeatureInput type="radio" feature={feature} configuratorContext={configuratorContext} />
        }
    }

    return (
        <div className="feature">
            {feature.description.replace(tagRegex, '')}
            {featureInput()}
            {feature.features.map(childFeature =>
                <Feature key={childFeature.id} feature={childFeature} configuratorContext={configuratorContext} />
            )}
        </div>
    )
}

export function FeatureInput(props) {
    const {type, feature, configuratorContext} = {...props};

    return (
        <div className={"feature__input feature__input--" + type}>
            <input
                className={"feature__" + type}
                type={type}
                checked={feature.isSelected}
                onChange={() => {
                    configuratorContext.configurations[0].updateRequirement(feature.id, feature.isSelected, feature.isSelected ? 1 : 0);
                }}
            />
            <label className="feature__label">
                {feature.description.replace(tagRegex, '')}
            </label>
        </div>
    )
}