

const Header = () => {
    return(
        <>
            <nav className="navbar sticky-top navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">Blogy</a>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-home" type="button" role="tab" aria-controls="nav-home" aria-selected="true">Home</button>
                        <button className="nav-link" id="nav-profile-tab" data-bs-toggle="tab" data-bs-target="#nav-profile" type="button" role="tab" aria-controls="nav-profile" aria-selected="false">Profile</button>
                        <button className="nav-link" id="nav-contact-tab" data-bs-toggle="tab" data-bs-target="#nav-contact" type="button" role="tab" aria-controls="nav-contact" aria-selected="false">Contact</button>
                    </div>
                    <div>
                        <button className='bi bi-person-circle customBtn' ><a href="/login">Sign in</a></button>
                    </div>
                </div>
            </nav>
      
    
        
    
        </>
    )
}


export default Header ;