import { useState } from "react";

export function Checkout(props) {
    const {configuration, configuratorContext} = {...props};
    const [email, updateEmail] = useState('');
    const [result, updateResult] = useState(false);

    /*
    * Better stick to these values?
    * https://github.com/Elfsquad/configurator/blob/main/src/models/QuotationRequest.ts
    */
    const requestQuote = async () => {
        const tempResult = await configuratorContext.requestQuote({
            email: email,
        });
        console.log(tempResult); //requestQuote does not seem to return anything..
        const settings = await configuratorContext.getSettings();
        updateResult(settings.afterOrderText);
    }

    return (
        <>
            {result === false &&
                <div className='configurator__total'>
                    <span className='configurator__price'>{configuration?.totalPriceExclVat}<span className='configurator__excl-vat'>Excl.</span></span>
                    <input type="email" placeholder="E-mail adres" value={email} onChange={(event) => { updateEmail(event.target.value) }}/>
                    <button onClick={() => { requestQuote() }}>Request quote</button>
                </div>
            ||
                <div className="configurator__result">
                    <span>{result}</span>
                </div>
            }
        </>
    )
}