import Lottie from 'lottie-react';
import './content.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useRef } from 'react';
import image from './../../../Images/proccesor .png'
import contentBack from './../../../Images/contentBackground.jpg'
export default function Content(){
    let lottieEle = useRef();
    useEffect(() => {
        if (lottieEle.current) {
          lottieEle.current.setSpeed(0.2);
        }
      }, []);
    return <div className='site-section1' style={{ backgroundImage:`url(${contentBack})` }}>
        <div className='site-content'>
            <div className='content-left'>
                <div className='content-title'>Quantum Chip</div>
                <div className='content-p'>
                    Raising Modern Technology to New Heights
                </div>
                <div className='content-subtitle'>
                    Discover the latest in high-performance computing with cutting-edge processors, laptops, and accessories designed to enhance your digital experience and drive productivity to new levels of efficiency and speed.
                </div>
                <div className='content-input'>
                    <FontAwesomeIcon className='search-icon' icon={faMagnifyingGlass} />
                    <input type='search' readOnly placeholder='search products ... '/>
                </div>
            </div>
            <div className='content-right'>
                <div className='content-parent-image'>
                    <div className='image'>
                        <img src={image} />
                    </div>
                </div>
            </div>
        </div>
        <div className="shape">
                <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" style={{ width:"100%" }} height={400} preserveAspectRatio="none" viewBox="0 0 1440 400">
                <g mask="url(&quot;#SvgjsMask1255&quot;)" fill="none">
                    <path d="M 0,380 C 288,340.2 1152,220.8 1440,181L1440 400L0 400z" fill="rgba(255, 255, 255, 1)" />
                </g>
                <defs>
                    <mask id="SvgjsMask1255">
                    <rect width={1440} height={400} fill="#ffffff" />
                    </mask>
                </defs>
                </svg>
        </div>
    </div>
   
}

