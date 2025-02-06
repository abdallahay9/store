import './skeleton.css';
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css'
export default function skeleton(){
    return (
        <SkeletonTheme baseColor="#656871" highlightColor="#888b94">
          <p className='m-0'>
            <Skeleton count={1} className='inerr-card' />
          </p>
        </SkeletonTheme>
      );      
}