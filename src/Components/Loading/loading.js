import { useEffect, useState } from "react";
export default function Loading(){
    const [i, setI] = useState(0);
    useEffect(() => {
        const intervalId = setInterval(() => {
            setI(prevI => (prevI === 3 ? 0 : prevI + 1));
        }, 50);

        // Cleanup function to clear the interval
        return () => clearInterval(intervalId);
    }, []);
    return (
        <div className="fixed">
             {/* <div className="load">
                <div>
                    <div style={{backgroundColor : i==0? "#2e2e2e"  : "gray"}}></div>
                    <div style={{backgroundColor : i==1? "#2e2e2e"  : "gray"}}></div>
                </div>
                <div>
                    <div style={{backgroundColor : i==3? "#2e2e2e"  : "gray"}}></div>
                    <div style={{backgroundColor : i==2? "#2e2e2e"  : "gray"}}></div>
                </div>
             </div> */}
            <svg className="loading-spinner" width={65} height={65} viewBox="0 0 44 44" role="status">
                <circle className="loading-circle" cx={22} cy={22} r={20} fill="none" strokeWidth={4} />
            </svg>

        </div>
    );
}