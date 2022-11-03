import React from 'react';
import { ConfiguratorContext } from '@elfsquad/configurator';
import { useEffect, useState } from 'react';

import { Step } from './Step';
import './Configurator.css';

const TENANT_ID = '5ad49ccc-6f5d-49a6-a48a-2a7cfa1f444d';
const MODEL_ID = 'd22978a8-711e-4646-c407-08da446a5fba';
const configuratorContext = new ConfiguratorContext({
    tenantId: TENANT_ID,
});

export function Configurator() {
    const [configuration, updateConfiguration] = useState({});
    const [activeStep, updateActiveStep] = useState(0);
    const [maxSteps, updateMaxSteps] = useState(0);

    useEffect(() => {
        configuratorContext.onUpdate((update) => {
            //updateConfiguration({...configuratorContext.configurations[0]});
            console.log({...update.detail});
            updateConfiguration({...update.detail});
            updateMaxSteps(update.detail.steps?.length || 0);
        });
    
        const setupConfigurator = async () => {
            //Open existing or create new configuration
            if ( configuratorContext.configurations?.length ) {
                console.log('opened existing configurator');
                await configuratorContext.openConfiguration(configuratorContext.configurations[0].id);
            } else {
                await configuratorContext.newConfiguration(MODEL_ID);
            }

        }
        setupConfigurator();
    }, []);

    return (
        <section className='configurator'>
            <header className='debug-header'>
                <h2>Debug Header</h2>
                <button onClick={()=>{ console.log(configuratorContext); }}>log configuratorContext</button>
                <button onClick={()=>{ console.log(configuration); }}>log configuration</button>
            </header>

            {configuration?.steps &&
                <Step step={configuration.steps[activeStep]} configuratorContext={configuratorContext} />
            }

            <footer className='configurator__footer'>
                <nav className='configurator__nav'>
                    {activeStep > 0 &&
                        <button className="step__f-previous btn btn--secondary" onClick={() => { updateActiveStep(activeStep - 1)}}>
                            Previous
                        </button>
                    }

                    {configuration?.steps?.map( (step, index) => {
                        return (
                            <button key={step.id} className='configurator__step' onClick={() => { updateActiveStep(index); }}>
                                <span className='configurator__step-number'>{index + 1}.</span><br/>
                                <span className='configurator__step-title'>{step.title}</span>
                            </button>
                        )
                    })}

                    { activeStep < maxSteps-1 &&
                        <button className="step__f-next btn btn--primary" onClick={() => { updateActiveStep(activeStep + 1)}}>
                            Next
                        </button>
                    }
                </nav>
            </footer>
        </section>
    )
}