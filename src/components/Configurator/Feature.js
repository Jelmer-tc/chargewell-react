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
        <div className={"feature " + (feature.displayType != 0 ? ' feature--top' : '')}>
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
                id={feature.id}
                type={type}
                checked={feature.isSelected}
                onChange={() => {
                    configuratorContext.configurations[0].updateRequirement(feature.id, feature.isSelected, feature.isSelected ? 0 : 1);
                }}
            />
            <label className="feature__label" htmlFor={feature.id}>
                {feature.description.replace(tagRegex, '')}
            </label>
        </div>
    )
}