import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

export default function SkeletonLoader({ w, h , border_radius }) {
    const width = 100;
    const height = h || 450 ;
    const bR = border_radius || 8;
    return (
        <SkeletonTheme baseColor="#202020" highlightColor="#444">
            <p className="m-0">
                <Skeleton 
                    count={1}        
                    style={{ 
                        width: `${width}%`, 
                        height: `${height}px`, 
                        borderRadius: `${bR}px`, 
                    }}
                />
            </p>
        </SkeletonTheme>
    );
}
