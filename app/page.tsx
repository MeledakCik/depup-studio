import { ArrowDown, ArrowRight, ArrowUpRight, Cloud, FileText, Layers3 } from 'lucide-react';
import { ProductOrbit } from '@/components/ProductOrbit';

const playStore = 'https://play.google.com/store/apps/details?id=';

export default function HomePage() {
  return (
    <>
      <header className="site-header">
        <div className="nav-shell">
          <a className="brand" href="#top" aria-label="Depup Studio, beranda">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span>depup<span className="brand-light"> studio</span></span>
          </a>

          <nav className="main-nav" aria-label="Navigasi utama">
            <a href="#studio">Studio</a>
            <a href="#produk">Produk</a>
            <a href="#prinsip">Cara kami bekerja</a>
          </nav>

          <a className="nav-cta" href="#produk">
            Kenali produk <ArrowUpRight size={16} strokeWidth={1.8} aria-hidden="true" />
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero section-wrap" aria-labelledby="hero-title">
          <div className="hero-copy">
            <div className="eyebrow"><span className="eyebrow-dot" /> FOUNDER-LED PRODUCT STUDIO</div>
            <h1 id="hero-title">Studio yang membangun produk <span>untuk kerja nyata.</span></h1>
            <p className="hero-description">
              depup.cloud dan depup Office adalah dua produk digital yang dikembangkan
              Depup Studio untuk kebutuhan file dan produktivitas sehari-hari.
            </p>
            <div className="hero-actions">
              <a className="button button-primary" href="https://depup.cloud" target="_blank" rel="noreferrer">
                Buka depup.cloud <ArrowRight size={17} strokeWidth={1.8} aria-hidden="true" />
              </a>
              <a className="text-link" href="https://play.google.com/store/apps/details?id=studio.depup.office" target="_blank" rel="noreferrer">Lihat depup Office</a>
            </div>
            <div className="hero-caption"><span /> Dua produk digital, satu studio pengembang.</div>
          </div>

          <ProductOrbit />
        </section>

        <section className="intro-band" id="studio" aria-labelledby="studio-title">
          <div className="section-wrap intro-layout">
            <aside className="founder-card" aria-label="Tentang Depup Studio">
              <div className="founder-monogram" aria-hidden="true">d<span>.</span></div>
              <div className="founder-identity">
                <strong>depup studio</strong>
                <span>FOUNDER-LED PRODUCT STUDIO</span>
              </div>
              <div className="founder-tags"><span>CLOUD</span><span>PRODUCTIVITY</span></div>
            </aside>
            <div className="studio-note">
              <div className="section-kicker"><span>01</span> / STUDIO NOTE</div>
              <div className="intro-content">
              <h2 id="studio-title">Dibangun langsung oleh studio di balik produknya.</h2>
              <div className="intro-detail">
                <p>
                  Depup Studio adalah studio pengembang produk digital. Kami membangun
                  depup.cloud untuk penyimpanan file dan depup Office untuk bekerja dengan
                  dokumen, spreadsheet, presentasi, dan PDF.
                </p>
                <a className="inline-link" href="#prinsip">Kenali pendekatan kami <ArrowDown size={15} /></a>
              </div>
              </div>
            </div>
          </div>
        </section>

        <section className="products section-wrap" id="produk" aria-labelledby="products-title">
          <div className="section-heading">
            <div>
              <div className="section-kicker"><span>02</span> / PRODUK KAMI</div>
              <h2 id="products-title">Dua produk. Satu studio.</h2>
            </div>
            <p>Dua produk dengan fokus berbeda, dikembangkan oleh satu studio.</p>
          </div>

          <div className="product-grid">
            <article className="product-card cloud-card">
              <div className="product-card-top">
                <div className="product-symbol cloud-symbol"><Cloud size={23} strokeWidth={1.7} /></div>
                <span className="product-number">PRODUCT 01</span>
              </div>
              <div className="product-art cloud-art" aria-hidden="true">
                <div className="cloud-surface"><Cloud size={78} strokeWidth={0.8} /></div>
                <div className="cloud-orb orb-a" /><div className="cloud-orb orb-b" />
                <div className="cloud-file file-a"><span /><i /><i /></div>
                <div className="cloud-file file-b"><span /><i /><i /></div>
              </div>
              <div className="product-info">
                <div className="product-title-line"><h3>depup.cloud</h3><span className="product-type">CLOUD STORAGE</span></div>
                <p>Simpan dan kelola file Anda dalam satu ruang penyimpanan cloud.</p>
                <div className="product-links">
                  <a href="https://depup.cloud" target="_blank" rel="noreferrer">Kunjungi depup.cloud <ArrowUpRight size={16} /></a>
                  <a href={`${playStore}cloud.depup.app`} target="_blank" rel="noreferrer">Google Play <ArrowUpRight size={16} /></a>
                </div>
              </div>
            </article>

            <article className="product-card office-card">
              <div className="product-card-top">
                <div className="product-symbol office-symbol"><FileText size={21} strokeWidth={1.7} /></div>
                <span className="product-number">PRODUCT 02</span>
              </div>
              <div className="product-art office-art" aria-hidden="true">
                <div className="office-window">
                  <div className="window-bar"><span /><span /><span /></div>
                  <div className="document-page"><b /><i /><i /><i /><div><span /><span /><span /></div></div>
                  <div className="office-tile tile-one"><FileText size={20} /></div>
                  <div className="office-tile tile-two"><Layers3 size={20} /></div>
                </div>
                <div className="office-glow" />
              </div>
              <div className="product-info">
                <div className="product-title-line"><h3>depup Office</h3><span className="product-type">PRODUCTIVITY</span></div>
                <p>Aplikasi produktivitas untuk membuat dan mengelola dokumen, spreadsheet, presentasi, dan PDF.</p>
                <div className="product-links">
                  <a href={`${playStore}studio.depup.office`} target="_blank" rel="noreferrer">Lihat di Google Play <ArrowUpRight size={16} /></a>
                </div>
              </div>
            </article>
          </div>
        </section>

        <section className="principles" id="prinsip" aria-labelledby="principles-title">
          <div className="section-wrap principles-layout">
            <div className="section-kicker"><span>03</span> / PRINSIP KAMI</div>
            <div className="principles-main">
              <h2 id="principles-title">Teknologi seharusnya terasa sederhana, bahkan saat mengerjakan hal besar.</h2>
              <div className="principle-list">
                <div><span>01</span><p>Produk digital yang fokus</p><ArrowUpRight size={17} /></div>
                <div><span>02</span><p>Pengalaman yang mudah dipahami</p><ArrowUpRight size={17} /></div>
                <div><span>03</span><p>Dibangun dan dikembangkan langsung</p><ArrowUpRight size={17} /></div>
              </div>
            </div>
          </div>
        </section>

        <section className="closing section-wrap" aria-labelledby="closing-title">
          <div className="closing-mark"><span className="brand-mark" aria-hidden="true"><span /></span></div>
          <div>
            <div className="section-kicker"><span>DEPUP STUDIO</span></div>
            <h2 id="closing-title">Bangun bareng Depup Studio?</h2>
            <p>Punya pertanyaan atau ingin berkolaborasi? Hubungi tim Depup.</p>
          </div>
          <a className="button button-light" href="mailto:hello@depup.cloud">Hubungi Depup <ArrowRight size={17} /></a>
        </section>
      </main>

      <footer className="site-footer">
        <div className="section-wrap footer-layout">
          <a className="brand footer-brand" href="#top">
            <span className="brand-mark" aria-hidden="true"><span /></span>
            <span>depup<span className="brand-light"> studio</span></span>
          </a>
          <span className="footer-note">Membangun produk digital dengan tujuan.</span>
          <div className="footer-links"><a href="https://depup.cloud" target="_blank" rel="noreferrer">depup.cloud <ArrowUpRight size={14} /></a><a href="#produk">Produk</a></div>
          <span className="copyright">© {new Date().getFullYear()} Depup Studio</span>
        </div>
      </footer>
    </>
  );
}
