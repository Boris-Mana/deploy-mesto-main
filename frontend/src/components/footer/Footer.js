function Footer() {
    return (
        <footer className="footer root__container root__container_margins_for-footer">
            <h2 className="footer__info" lang="en">&copy; {(new Date()).getFullYear()} Mesto Russia</h2>
        </footer>
    )
}

export default Footer;