import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">

        <div className="footer-section">
          <h3>Contacto</h3>
          <p><strong>Giovanny Carreño</strong></p>
          <p>
            <a href="mailto:hernan.carreno@uptc.edu.co">
              hernan.carreno@uptc.edu.co
            </a>
          </p>
          <p>Universidad Pedagógica y Tecnológica de Colombia</p>
          <p>Semillero de investigación GALASH</p>
        </div>

        <div className="footer-section-2">
          <h3>Este trabajo es una implementación de los siguientes proyectos:</h3>
          <ul>
            <li>
              <a
                href="https://github.com/dvschultz/stylegan2-ada-pytorch"
                target="_blank"
                rel="noopener noreferrer"
              >
                StyleGAN2-ADA-PyTorch
              </a>
                <a> | </a>
              <a
                href="https://github.com/Sanster/IOPaint"
                target="_blank"
                rel="noopener noreferrer"
              >
                IOPaint
              </a>
            </li>
          </ul>
        </div>

      </div>

      <div className="footer-bottom">
        © {new Date().getFullYear()} Proyecto de investigación - Universidad Pedagógica y Tecnológica de Colombia
      </div>
    </footer>
  );
}