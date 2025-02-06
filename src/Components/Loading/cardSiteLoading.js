import Skeleton from 'react-loading-skeleton';
import './siteCardLoading.css';
export default function(){
    return <div className="cardSiteLoading">
        <div className="imgSkeleton">
        <Skeleton 
            w="100%" 
            height="100%" 
            baseColor="#666666" 
            highlightColor="#888888" 
        />
        </div>
        <div className='cardSiteLoading-right '>
        <div className="titleSkeleton">
            <Skeleton 
            w="100%" 
            height="100%" 
            baseColor="#666666" 
            highlightColor="#888888" 
        />
        </div>
        <div className="desSkeleton">
            <div>
            <Skeleton 
            w="100%" 
            height="100%" 
            baseColor="#666666" 
            highlightColor="#888888" 
        />
            </div>
            <div>
            <Skeleton 
            w="100%" 
            height="100%" 
            baseColor="#666666" 
            highlightColor="#888888" 
        />
            </div>
            <div>
            <Skeleton 
            w="100%" 
            height="100%" 
            baseColor="#666666" 
            highlightColor="#888888" 
        />
            </div>
        </div>
        <div className='divider'></div>
        <div className="starSkeleton">
            <Skeleton 
            w="100%" 
            height="100%" 
            baseColor="#666666" 
            highlightColor="#888888" 
        />
        </div>
        <div className='d-flex justify-content-between align-items-center mt-3'>
            <div className="priceSkeleton">
                <Skeleton 
            w="100%" 
            height="100%" 
            baseColor="#666666" 
            highlightColor="#888888" 
        />
            </div>
            <div className="btnSkeleton">
                <Skeleton 
            w="100%" 
            height="100%" 
            baseColor="#666666" 
            highlightColor="#888888" 
        />
            </div>
        </div>
        </div>
    </div>
}