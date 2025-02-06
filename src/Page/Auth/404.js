import React from 'react';
import './../../Css/Forbidden/404.css'; // تأكد من إنشاء هذا الملف وتعديله حسب حاجتك
import Lottie from 'lottie-react';
import done from './../../Animation/Animation.json'
export default function ErrorPage404() {
  return (
    <div className="error-page-404">
      <div className="error-content-404">
        <h1 className="error-code-404">404</h1>
        <p className="error-message-404">Oops! Page Not Found</p>
        <p className="error-description-404">The page you are looking for does not exist.</p>
        <div className="animation-container">
          <Lottie animationData={done} className='anim404' />
        </div>
      </div>
    </div>
  );
}