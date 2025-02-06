import React from 'react';
import './../../Css/Forbidden/403.css'
import { Link } from 'react-router-dom';
export default function ErrorPage403({role}){
    return (
        <div className="error-page" style={{ height : role == "2001" ? "100vh":"calc(100vh - 65px)"}} >
          <div className="error-content">
            <h1 className="error-code">403</h1>
            <p className="error-message">Forbidden</p>
            <p className="error-description">You don't have permission to access this page.</p>
              <Link to={role === "2001" ? "/" : "/dashboard/writer"} className="back-home" replace={true}>
                {
                  role === "2001" ? "Go Back Home" : "Go Back Writer Page"
                }
              </Link>
          </div>
        </div>
      );
}