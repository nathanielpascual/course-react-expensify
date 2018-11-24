//HIGHER ORDER COMPONENT
//Reuse code
//Render hijacking
//prop manipulation
//abstract state

import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <h1>Infor</h1>
        <p>The info is : {props.info}</p>
    </div>
);
    
const withAdminWarning = (WrappedComponent) => {
    return (props) => (
        <div>
            {props.isAdmin && <p>This is private info please dont share.</p>}
            
            <WrappedComponent {...props}/>
        </div>
    );
};

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
        {props.isAuthenticated ?<WrappedComponent {...props}/> : <p> Please Login to view the info.</p>}
        
        
    </div>
    );
};
const AuthInfo = requireAuthentication(Info);

const AdminInfo = withAdminWarning(Info);

//ReactDOM.render(<AdminInfo isAdmin={false} info="There is the details."/>,document.getElementById('app'));

ReactDOM.render(<AuthInfo isAuthenticated={false} info="There is the details."/>,document.getElementById('app'));