import React from "react"
import Footer from "./Footer"
import Header from "./Header"


function Layout({children}){
return(
    <React.Fragment>
        <Header/>
        {children}
        <Footer/>
    </React.Fragment>
)
}

export default Layout