import './Footer.css';
import FooterSVG from '../../img/footer.svg';

const Footer = () => {
    return (
        <div className="footer-container">
            <img src={FooterSVG} alt="Footer Decoration" className="footer-svg" />
            <p className="h1 footer-text">Check us out on</p>
            <div className="footer-icons">

                <i className="bi bi-twitter" />
                <i className="bi bi-facebook" />
                <i className="bi bi-envelope" />
                <i className="bi bi-instagram" />
            </div>
        </div>
    );
}

export default Footer;
