import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import './Page/Auth/Auth.css'
import './Css/components/alert.css';
import './Css/components/load.css'
import './Components/Dashboard/Bar/sideBar.css'
import './Components/Dashboard/Bar/topBar.css'
import './Page/Dashboard/Dashboard.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import './custom.css' ;
import { BrowserRouter as Router } from 'react-router-dom';
import MenuContaxt from './Context/menuContext';
import ScreenWidthContext from './Context/WindowSize';
import SearchContextFunction from './Context/searchContext';
import { CategoriesProvider } from './Context/CategoriesContext';
import SideBarWidthProvider from './Context/sideBarWidth';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SearchContextFunction>
    <ScreenWidthContext>
          <MenuContaxt>
      <SideBarWidthProvider>
            <CategoriesProvider>
            <Router>
              <App />
            </Router>
            </CategoriesProvider>
        </SideBarWidthProvider>
          </MenuContaxt>
    </ScreenWidthContext>
    </SearchContextFunction>
  </React.StrictMode>
);  