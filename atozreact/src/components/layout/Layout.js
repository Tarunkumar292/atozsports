// Layout.js
import React from "react";
import Footer from "./Footer";
import Header from "./Header";
import Sidebar1 from "./Sidebar1";

function Layout({ children }) {
    return (
        <React.Fragment>
            <Header />
            <div className="container-fluid">
                <div className="row">
                    <Sidebar1 />
                    <div className="col-md-9 col-lg-9 p-0">
                        {children}
                    </div>
                </div>
            </div>
            <Footer />
        </React.Fragment>
    );
}

export default Layout;
