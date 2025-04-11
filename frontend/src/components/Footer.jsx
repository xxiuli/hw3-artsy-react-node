import defaultImg from "/images/artsy_logo.svg";


const Footer = () => {
    return (
        <div style={{height:"60px",  width: "100vw", background:"yellow"}}>
            <footer className="bg-dark text-white text-center py-2 fixed-bottom">
                <p className="mb-0">
                    Powered by
                    <img src={defaultImg} alt="artsy_logo" width="15" className="mx-1" />
                    <a href="https://www.artsy.net" rel="noreferrer" target="_blank" className="text-white text-decoration-none">
                    Artsy.
                    </a>
                </p>
            </footer>
        </div>
    );
};

export default Footer;