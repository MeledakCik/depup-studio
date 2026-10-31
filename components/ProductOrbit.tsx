'use client';

import { useState } from 'react';
import { ArrowUpRight, Cloud, FileText } from 'lucide-react';

const products = [
  {
    id: 'cloud',
    name: 'depup.cloud',
    category: 'CLOUD STORAGE',
    description: 'Simpan dan kelola file Anda dalam satu ruang penyimpanan cloud.',
    href: 'https://depup.cloud',
    Icon: Cloud,
  },
  {
    id: 'office',
    name: 'depup Office',
    category: 'PRODUCTIVITY',
    description: 'Perangkat kerja untuk dokumen, spreadsheet, presentasi, dan PDF.',
    href: 'https://play.google.com/store/apps/details?id=studio.depup.office',
    Icon: FileText,
  },
] as const;

export function ProductOrbit() {
  const [activeId, setActiveId] = useState<(typeof products)[number]['id']>('cloud');
  const activeProduct = products.find((product) => product.id === activeId) ?? products[0];

  return (
    <div className={`hero-visual focus-${activeId}`} role="group" aria-label="Jelajahi produk Depup">
      <div className="visual-topline">
        <span>DEPUP / PRODUCT ECOSYSTEM</span>
        <span className="visual-live"><i /> TWO PRODUCTS</span>
      </div>

      <div className="orbit-stage" aria-hidden="true">
        <div className="orbit-glow" />
        <div className="orbit-ring orbit-ring-outer" />
        <div className="orbit-ring orbit-ring-middle" />
        <div className="orbit-ring orbit-ring-inner" />
        <div className="orbit-track orbit-track-one" />
        <div className="orbit-track orbit-track-two" />
        <span className="orbit-particle particle-one" />
        <span className="orbit-particle particle-two" />
        <span className="orbit-particle particle-three" />
        <div className="orbit-core">
          <span className="orbit-core-mark">d<span>.</span></span>
          <span className="orbit-core-rule" />
          <span className="orbit-core-caption">DIGITAL STUDIO</span>
        </div>
      </div>

      {products.map(({ id, name, category, Icon }) => (
        <button
          className={`orbit-product orbit-product-${id}${activeId === id ? ' is-active' : ''}`}
          key={id}
          type="button"
          aria-pressed={activeId === id}
          onClick={() => setActiveId(id)}
        >
          <span className="orbit-product-icon"><Icon size={18} strokeWidth={1.8} aria-hidden="true" /></span>
          <span className="orbit-product-copy"><strong>{name}</strong><small>{category}</small></span>
          <ArrowUpRight className="orbit-product-arrow" size={15} aria-hidden="true" />
        </button>
      ))}

      <div className="orbit-detail" aria-live="polite" aria-atomic="true">
        <div className="orbit-detail-copy" key={activeProduct.id}>
          <span className="orbit-detail-kicker">{activeProduct.category}</span>
          <strong>{activeProduct.name}</strong>
          <p>{activeProduct.description}</p>
        </div>
        <a href={activeProduct.href} target="_blank" rel="noreferrer" aria-label={`Kunjungi ${activeProduct.name}`}>
          <ArrowUpRight size={18} aria-hidden="true" />
        </a>
      </div>

      <span className="visual-index">01 <i /> 02</span>
    </div>
  );
}
