
const Footer = () => {
    return (
        <div style={{height:"60",  width: "100vw", background:"yellow"}}>
            <footer className="bg-dark text-white text-center py-2 fixed-bottom">
                <p className="mb-0">
                    Powered by
                    <img src="/images/artsy_logo.svg" alt="artsy_logo" width="15" className="mx-1" />
                    <a href="https://www.artsy.net" rel="noreferrer" className="text-white text-decoration-none">
                    Artsy.
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default Footer;