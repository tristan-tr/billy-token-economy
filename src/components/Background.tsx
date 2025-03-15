import React from 'react';

type BackgroundProps = {
    children: React.ReactNode;
}

function Background({children}: BackgroundProps) {
    return (
        <>
            <div className="absolute bottom-5 left-4 z-10">
                <img src="/compass-rose.png" alt="Compass" className="w-48 h-48 opacity-70" />
            </div>

            <div
                className="h-full w-full bg-cover bg-center"
                style={{ backgroundImage: 'url(/pirate-map-bg.jpg)' }}
            >
                {children}
            </div>
        </>
    )
}

export default Background;