export default function Footer() {
  return (
    <footer className="rpp-footer">
      <div className="rpp-container">
        <div className="rpp-footer-grid">
          <div>
            <div className="rpp-footer-brand">
              <span className="rpp-nav-logo-mark">R</span>
              RemovePDFPages
            </div>
            <p className="rpp-footer-tagline">
              Free PDF tools in your browser. Subscribe or buy once.
            </p>
          </div>
          <div>
            <h3 className="rpp-footer-col-title">Legal</h3>
            <a href="/privacy" className="rpp-footer-link">
              Privacy Policy
            </a>
            <a href="/terms" className="rpp-footer-link">
              Terms of Service
            </a>
            <a href="/refund" className="rpp-footer-link">
              Refund Policy
            </a>
            <a href="/cookie-policy" className="rpp-footer-link">
              Cookie Policy
            </a>
          </div>
          <div>
            <h3 className="rpp-footer-col-title">Tools</h3>
            <a href="/remove-pages" className="rpp-footer-link">
              Remove Pages
            </a>
            <a href="/merge" className="rpp-footer-link">
              Merge PDFs
            </a>
            <a href="/compress" className="rpp-footer-link">
              Compress PDF
            </a>
            <a href="/sign" className="rpp-footer-link">
              Sign PDF
            </a>
            <a href="/convert-to-word" className="rpp-footer-link">
              Convert to Word
            </a>
          </div>
          <div>
            <h3 className="rpp-footer-col-title">Support</h3>
            <a href="/pricing" className="rpp-footer-link">
              Pricing
            </a>
            <a href="/faq" className="rpp-footer-link">
              FAQ
            </a>
            <a href="/contact" className="rpp-footer-link">
              Contact
            </a>
            <a href="/blog" className="rpp-footer-link">
              Blog
            </a>
          </div>
        </div>
        <div className="rpp-footer-bottom">
          <p>© 2026 RemovePDFPages. All rights reserved.</p>
          <p>
            RemovePDFPages is a standalone tool and is not affiliated with Adobe,
            Foxit, or any other PDF software company.
          </p>
        </div>
      </div>
    </footer>
  );
}
