import './NavBar.css'
import Logo from '../../img/logo.png'
const NavBar = () => {
    return (
        <nav className="bg-transparent d-flex flex-row justify-content-between vw-100 ps-5 pt-3">
            <div className='bg-transparent d-flex flex-row justify-content-between LogoNav'>
                <img src={Logo} alt='Logo' />
                <h2 className="align-items-center">Formulate</h2>
            </div>
            <div className="bg-transparent d-flex flex-row justify-content-between pe-5">
                <ul className="nav nav-underline" style={{ gap: "3rem" }}>
                    <li className="nav-item">
                        <p className="nav-link ItemListStyle active" aria-current="page">Home</p>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link ItemListStyle" href='#HowItWorks'>How it works</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link ItemListStyle" href='#Pricing'>Pricing</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link ItemListStyle" href='https://getbootstrap.com/docs/5.3/components/navs-tabs/'>Why us</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link ItemListStyle" href='https://getbootstrap.com/docs/5.3/components/navs-tabs/'>FAQ</a>
                    </li>
                </ul>
            </div>
        </nav>

    )
}
export default NavBar