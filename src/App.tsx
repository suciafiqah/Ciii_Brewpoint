/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Coffee, 
  Users, 
  Zap, 
  Gift, 
  BarChart3, 
  ArrowRight, 
  Check, 
  Menu, 
  X,
  LayoutDashboard,
  LogOut,
  Plus,
  Search,
  Star,
  Settings
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { cn } from './lib/utils';
import { ChatBot } from './components/ChatBot';

// --- Types & Data ---

type Page = 'landing' | 'login' | 'register' | 'dashboard';

const stats = [
  { label: 'Total Pelanggan', value: '1,284', change: '+12%', icon: Users, trend: 'up' },
  { label: 'Pendapatan Bulanan', value: 'Rp42.5jt', change: '+24%', icon: BarChart3, trend: 'up' },
  { label: 'Tingkat Retensi', value: '68%', change: '+8%', icon: Zap, trend: 'up' },
  { label: 'Poin Aktif', value: '840rb', change: '-2%', icon: Coffee, trend: 'down' },
];

const pricingPlans = [
  {
    title: "Basic",
    price: 850000,
    desc: "Cocok untuk gerobakan kopi atau kedai kecil.",
    features: ['Hingga 100 Pelanggan', 'Analitik Dasar', 'Sistem Poin Digital', 'Check-in Kode QR', 'Dukungan Email'],
  },
  {
    title: "Pro",
    price: 1500000,
    desc: "Ideal untuk kafe mapan yang siap berkembang.",
    recommended: true,
    features: ['Hingga 1.000 Pelanggan', 'CRM Lanjutan', 'Hadiah Kustom', 'Pemasaran WhatsApp', 'Dukungan Prioritas', 'Cadangan Harian'],
  },
  {
    title: "Premium",
    price: 2200000,
    desc: "Untuk bisnis kopi multi-cabang & waralaba.",
    features: ['Pelanggan Tanpa Batas', 'Dukungan Multi-outlet', 'Integrasi Sistem POS', 'Manajer Khusus', 'API & Webhooks', 'Branding Kustom'],
  },
];

const faqs = [
  { q: "Bagaimana cara pelanggan check-in?", a: "Pelanggan cukup memindai kode QR unik di counter Anda atau memberikan nomor telepon mereka ke kasir." },
  { q: "Apakah ini berfungsi offline?", a: "Ya, sistem kami menyimpan data transaksi secara lokal dan akan disinkronkan secara otomatis setelah Anda online kembali." },
  { q: "Dapatkah saya berintegrasi dengan POS saya?", a: "Tentu saja! Kami mendukung sistem POS besar seperti Moka, Square, dan Shopify POS." },
  { q: "Apakah ada uji coba gratis?", a: "Ya, kami menawarkan uji coba fitur lengkap selama 14 hari tanpa memerlukan kartu kredit." },
];

const chartData = [
  { name: 'Sen', points: 4000, transactions: 240 },
  { name: 'Sel', points: 3000, transactions: 139 },
  { name: 'Rab', points: 2000, transactions: 980 },
  { name: 'Kam', points: 2780, transactions: 390 },
  { name: 'Jum', points: 1890, transactions: 480 },
  { name: 'Sab', points: 2390, transactions: 380 },
  { name: 'Min', points: 3490, transactions: 430 },
];

// --- Components ---

const Navbar = ({ onNavigate, currentPage }: { onNavigate: (p: Page) => void, currentPage: Page }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4",
      isScrolled ? "glass bg-white/80 py-3 shadow-sm" : "bg-transparent"
    )}>
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => onNavigate('landing')}>
          <div className="bg-coffee-800 p-2 rounded-xl">
            <Coffee className="text-white w-6 h-6" />
          </div>
          <span className="text-2xl font-display font-bold tracking-tight text-coffee-900">BrewPoint</span>
        </div>

        <div className="hidden md:flex items-center gap-8">
          <a href="#features" className="text-coffee-700 hover:text-coffee-900 font-medium transition-colors">Fitur</a>
          <a href="#pricing" className="text-coffee-700 hover:text-coffee-900 font-medium transition-colors">Harga</a>
          <button 
            onClick={() => onNavigate('login')}
            className="text-coffee-800 font-semibold hover:text-coffee-600 transition-colors"
          >
            Masuk
          </button>
          <button 
            onClick={() => onNavigate('register')}
            className="bg-coffee-800 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-coffee-900 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Coba Gratis
          </button>
        </div>

        <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 glass bg-white border-b p-6 flex flex-col gap-4 md:hidden"
          >
            <a href="#features" onClick={() => setIsMobileMenuOpen(false)}>Features</a>
            <a href="#pricing" onClick={() => setIsMobileMenuOpen(false)}>Pricing</a>
            <button onClick={() => { onNavigate('login'); setIsMobileMenuOpen(false); }}>Login</button>
            <button onClick={() => { onNavigate('register'); setIsMobileMenuOpen(false); }} className="bg-coffee-800 text-white py-3 rounded-xl">Try for Free</button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const FeatureCard = ({ icon: Icon, title, desc, delay }: any) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    viewport={{ once: true }}
    className="bg-white p-8 rounded-3xl border border-coffee-100 hover:border-coffee-300 transition-all shadow-sm hover:shadow-xl group"
  >
    <div className="bg-coffee-50 w-14 h-14 rounded-2xl flex items-center justify-center mb-6 text-coffee-800 group-hover:bg-coffee-800 group-hover:text-white transition-colors">
      <Icon size={28} />
    </div>
    <h3 className="text-xl font-display font-bold mb-3 text-coffee-900">{title}</h3>
    <p className="text-coffee-600 leading-relaxed">{desc}</p>
  </motion.div>
);

const PricingCard = ({ title, price, desc, features, recommended, onNavigate, isAnnual }: any) => (
  <motion.div 
    initial={{ opacity: 0, scale: 0.95 }}
    whileInView={{ opacity: 1, scale: 1 }}
    viewport={{ once: true }}
    className={cn(
      "p-8 rounded-3xl border relative transition-all flex flex-col h-full",
      recommended ? "bg-coffee-900 text-white border-coffee-900 shadow-2xl scale-105 z-10" : "bg-white border-coffee-100 text-coffee-900 shadow-sm"
    )}
  >
    {recommended && (
      <span className="absolute -top-4 left-1/2 -translate-x-1/2 bg-coffee-500 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-widest">
        Most Popular
      </span>
    )}
    <h3 className="text-xl font-display font-bold mb-2">{title}</h3>
    <p className={cn("text-sm mb-6", recommended ? "text-coffee-300" : "text-coffee-500")}>{desc}</p>
    <div className="flex items-baseline gap-1 mb-6">
      <span className="text-4xl font-bold">Rp{(price * (isAnnual ? 0.8 : 1)).toLocaleString()}</span>
      <span className={cn("text-sm", recommended ? "text-coffee-200" : "text-coffee-500")}>/mo</span>
    </div>
    
    <div className="space-y-4 mb-10 flex-1">
      {features.map((f: string, i: number) => (
        <li key={i} className="flex items-start gap-3 text-sm list-none">
          <div className={cn("rounded-full p-0.5 mt-0.5 shrink-0", recommended ? "bg-coffee-500" : "bg-coffee-100")}>
            <Check size={14} className={recommended ? "text-white" : "text-coffee-600"} />
          </div>
          <span className={recommended ? "text-coffee-100" : "text-coffee-700"}>{f}</span>
        </li>
      ))}
    </div>
    
    <button 
      onClick={() => onNavigate('register')}
      className={cn(
        "w-full py-4 rounded-xl font-bold transition-all active:scale-95 shadow-md",
        recommended ? "bg-white text-coffee-900 hover:bg-coffee-50" : "bg-coffee-800 text-white hover:bg-coffee-900"
      )}
    >
      Get Started
    </button>
  </motion.div>
);

const LandingPage = ({ onNavigate }: { onNavigate: (p: Page) => void }) => {
  const [isAnnual, setIsAnnual] = useState(false);

  return (
    <div className="pt-24 pb-12">
      {/* Hero */}
      <section className="relative px-6 py-20 lg:py-32 max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 overflow-hidden">
        {/* Background Decorative Element */}
        <div className="absolute top-0 right-0 -z-10 w-[600px] h-[600px] bg-coffee-200/20 rounded-full blur-3xl opacity-50 translate-x-1/2 -translate-y-1/4"></div>
        
        <div className="flex-1 text-center lg:text-left z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-coffee-100 text-coffee-800 text-sm font-semibold mb-6 border border-coffee-200"
          >
            <Zap size={16} fill="currentColor" />
            <span>Loyalty Digital yang Sederhana</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black leading-[1.1] mb-6 text-coffee-950"
          >
            Minum Kopi, <span className="text-coffee-500 italic">Dapat Poin.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-coffee-700 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            Solusi loyalitas digital all-in-one yang dirancang untuk coffee shop modern. Tingkatkan retensi pelanggan dan penjualan tanpa hambatan.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start"
          >
            <button 
              onClick={() => onNavigate('register')}
              className="bg-coffee-800 text-white px-8 py-4 rounded-2xl text-lg font-bold hover:bg-coffee-900 transition-all shadow-xl hover:shadow-coffee-300 inline-flex items-center gap-2 group w-full sm:w-auto justify-center"
            >
              Coba Gratis <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-white border-2 border-coffee-100 text-coffee-800 px-8 py-4 rounded-2xl text-lg font-bold hover:border-coffee-300 transition-all shadow-sm w-full sm:w-auto"
            >
              Lihat Demo
            </button>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="mt-12 flex items-center justify-center lg:justify-start gap-4"
          >
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-coffee-200 overflow-hidden">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i}`} alt="user" referrerPolicy="no-referrer" />
                </div>
              ))}
            </div>
            <p className="text-sm text-coffee-600 font-medium font-display">Bergabung dengan 500+ coffee shop</p>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: 20, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 relative w-full max-w-2xl"
        >
          <div className="absolute inset-0 bg-coffee-300 rounded-full blur-3xl opacity-20 -rotate-12 translate-y-20"></div>
          <div className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
            <img 
              src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80&w=1200" 
              alt="BrewPoint App Mockup" 
              className="w-full h-auto object-cover"
              referrerPolicy="no-referrer"
            />
            {/* Floating UI Element */}
            <div className="absolute bottom-6 left-6 right-6 glass p-4 rounded-2xl flex items-center justify-between border-t border-white/40 shadow-lg">
              <div className="flex items-center gap-3">
                <div className="bg-coffee-800 p-2 rounded-xl text-white">
                  <Star size={20} fill="currentColor" />
                </div>
                <div>
                  <p className="text-xs font-bold text-coffee-950 uppercase tracking-tighter">Poin Loyalitas Baru</p>
                  <p className="text-sm font-display font-medium text-coffee-800">+25 poin diberikan kepada Andi</p>
                </div>
              </div>
              <div className="bg-green-500/10 text-green-600 text-[10px] font-black px-2 py-1 rounded-lg">LANGSUNG</div>
            </div>
          </div>
        </motion.div>
      </section>

        {/* Trusted By Logo Bar */}
        <div className="max-w-7xl mx-auto px-6 py-20 border-t border-coffee-100/50">
          <p className="text-center text-xs font-bold text-coffee-400 uppercase tracking-[0.2em] mb-10">Dipercaya oleh roaster & cafe terkemuka</p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-20 opacity-40 grayscale hover:grayscale-0 transition-all duration-700">
             {['RoastMasters', 'Velvet Brew', 'Urban Cup', 'Morning Dew', 'The Grind'].map(logo => (
               <div key={logo} className="font-display font-black text-2xl text-coffee-950 italic tracking-tighter">
                 {logo}
               </div>
             ))}
          </div>
        </div>

      {/* Atmosphere Section */}
      <section className="px-6 py-24">
        <div className="max-w-7xl mx-auto rounded-[3rem] overflow-hidden relative min-h-[500px] flex items-center shadow-2xl">
          <img 
            src="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80&w=1600" 
            alt="Coffee Shop Atmosphere" 
            className="absolute inset-0 w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-coffee-950/80 via-coffee-950/40 to-transparent"></div>
          <div className="relative z-10 px-12 md:px-20 max-w-2xl">
            <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-6 leading-tight">
              Dirancang untuk <span className="text-coffee-300">Barista Modern.</span>
            </h2>
            <p className="text-coffee-100 text-lg mb-8 leading-relaxed">
              Kami memahami bahwa kecepatan adalah segalanya di balik meja counter. Antarmuka BrewPoint dioptimalkan untuk kafe dengan trafik tinggi, memastikan Anda menghabiskan lebih sedikit waktu di layar dan lebih banyak waktu meracik kopi yang sempurna.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="glass px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                Checkout Cepat
              </div>
              <div className="glass px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-coffee-400"></div>
                Dukungan Offline
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid - Enhanced */}
      <section id="features" className="px-6 py-32 bg-white/50 bg-checkered relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-20 bg-gradient-to-b from-coffee-50 to-transparent"></div>
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <motion.span 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              className="text-coffee-500 font-bold tracking-widest uppercase text-xs"
            >
              Fitur Unggulan
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-coffee-950 mt-4 mb-6">Dirancang untuk <span className="text-gradient">Skala Besar.</span></h2>
            <p className="text-coffee-600 text-xl max-w-3xl mx-auto font-medium">Dari kedai kopi kecil hingga jaringan kopi multinasional, BrewPoint menyediakan alat kelas perusahaan yang Anda butuhkan.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Users} 
              title="CRM Lanjutan" 
              desc="Pelajari perilaku pelanggan, riwayat pesanan, dan profil selera individu secara mendalam."
              delay={0}
            />
            <FeatureCard 
              icon={Zap} 
              title="Mesin Poin" 
              desc="Hadiah berjenjang otomatis berdasarkan frekuensi pembelian dan rata-rata belanja."
              delay={0.1}
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Analitik Prediktif" 
              desc="Wawasan berbasis AI tentang tren penjualan masa depan dan kebutuhan inventaris."
              delay={0.2}
            />
            <FeatureCard 
              icon={Gift} 
              title="Sistem Hadiah" 
              desc="Buat hadiah dinamis: dari espresso gratis hingga merchandise eksklusif."
              delay={0.3}
            />
            <FeatureCard 
              icon={Star} 
              title="Membership VIP" 
              desc="Manajemen otomatis tingkatan Silver, Gold, dan Platinum dengan keuntungan eksklusif."
              delay={0.4}
            />
            <FeatureCard 
              icon={Settings} 
              title="Integrasi POS" 
              desc="Sinkronisasi mulus dengan Shopify, Moka, Square, dan sistem kasir Anda saat ini."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* How it Works - Business Centric */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-black text-coffee-950 mb-6">Efisiensi dalam <span className="text-gradient">Setiap Langkah.</span></h2>
          <p className="text-coffee-600">Alur kerja yang disederhanakan untuk menghargai kecepatan Anda pada jam-jam sibuk.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-coffee-100 -translate-y-1/2 hidden lg:block -z-10"></div>
          {[
            { step: '01', title: 'Daftar Toko', desc: 'Daftarkan cabang Anda dan unggah logo serta menu Anda.' },
            { step: '02', title: 'Hubungkan POS', desc: 'Sinkronkan dengan kasir Anda dengan integrasi satu klik atau gunakan sistem QR kami.' },
            { step: '03', title: 'Otomatisasi Loyalitas', desc: 'Atur aturan Anda dan biarkan sistem menangani interaksi secara mandiri.' },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2 }}
              className="bg-white p-10 rounded-[3rem] border border-coffee-50 shadow-xl relative"
            >
              <div className="absolute -top-8 left-10 w-16 h-16 rounded-3xl bg-coffee-800 text-white flex items-center justify-center text-2xl font-black shadow-lg">
                {item.step}
              </div>
              <h4 className="text-2xl font-bold text-coffee-900 mb-4 mt-4">{item.title}</h4>
              <p className="text-coffee-600 leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Pricing - Enhanced */}
      <section id="pricing" className="px-6 py-32 bg-coffee-950 text-white rounded-[4rem] mx-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-checkered opacity-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-black mb-8 italic">Pilih <span className="text-coffee-400">Racikan Terbaikmu.</span></h2>
            
            {/* Annual Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={cn("text-lg font-bold", !isAnnual ? "text-white" : "text-coffee-500")}>Bulanan</span>
              <button 
                onClick={() => setIsAnnual(!isAnnual)}
                className="w-16 h-8 rounded-full bg-coffee-800 p-1 relative transition-all"
              >
                <div className={cn(
                  "w-6 h-6 rounded-full bg-white transition-all shadow-lg",
                  isAnnual ? "translate-x-8" : "translate-x-0"
                )}></div>
              </button>
              <div className="flex items-center gap-2">
                <span className={cn("text-lg font-bold", isAnnual ? "text-white" : "text-coffee-500")}>Tahunan</span>
                <span className="bg-coffee-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">HEMAT 20%</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
            {pricingPlans.map((plan, i) => (
              <PricingCard 
                key={i}
                {...plan}
                isAnnual={isAnnual}
                onNavigate={onNavigate}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Mobile Card Preview Section */}
      <section className="px-6 py-32 bg-coffee-50 overflow-hidden">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="text-coffee-500 font-bold tracking-widest uppercase text-xs">Pengalaman Pelanggan</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-coffee-950 mt-4 mb-8">Kartu yang Selalu <span className="text-gradient underline italic">Mereka Simpan.</span></h2>
            <p className="text-coffee-700 text-lg mb-10 leading-relaxed">
              Tinggalkan kartu fisik. BrewPoint menyediakan pengalaman kartu seluler yang menawan untuk pelanggan Anda. Mereka dapat melacak poin, melihat hadiah, dan menerima notifikasi push untuk penawaran khusus—semuanya di satu tempat.
            </p>
            <div className="space-y-6">
              {[
                { title: 'Tidak Perlu Unduh Aplikasi', desc: 'Bekerja melalui browser web atau integrasi Apple/Google Wallet.' },
                { title: 'Penukaran Hadiah Instan', desc: 'Pelanggan dapat menukarkan hadiah dengan satu ketukan di counter.' }
              ].map((item, i) => (
                <div key={i} className="flex gap-4">
                  <div className="w-12 h-12 shrink-0 rounded-2xl bg-white shadow-sm flex items-center justify-center text-coffee-800">
                    <Check size={20} />
                  </div>
                  <div>
                    <h4 className="font-bold text-coffee-900">{item.title}</h4>
                    <p className="text-coffee-500 text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-coffee-200 rounded-full blur-3xl opacity-30"></div>
            {/* Mobile Mockup */}
            <div className="mx-auto w-[300px] h-[600px] bg-coffee-950 rounded-[3rem] p-3 shadow-2xl relative z-10 border-[8px] border-coffee-800">
              <div className="w-full h-full bg-white rounded-[2.4rem] overflow-hidden flex flex-col">
                <div className="p-6 pt-10 bg-coffee-900 text-white">
                  <div className="flex justify-between items-center mb-6">
                    <Coffee size={24} />
                    <div className="w-8 h-8 rounded-full bg-white/20"></div>
                  </div>
                  <p className="text-xs uppercase tracking-widest font-black text-coffee-300">Status Member</p>
                  <h3 className="text-2xl font-display font-bold">Tingkat Gold</h3>
                  <div className="mt-8 bg-white/10 p-4 rounded-2xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold mb-1">Saldo Anda</p>
                    <p className="text-3xl font-black italic">2,450 <span className="text-xs font-normal not-italic opacity-60">poin</span></p>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1">
                  <h4 className="font-bold text-coffee-900 text-sm">Hadiah Tersedia</h4>
                  {[
                    { title: 'Extra Espresso Shot', cost: '500 poin', icon: Coffee },
                    { title: 'Kotak Roti Alpukat', cost: '1,200 poin', icon: Gift },
                    { title: 'Acara Tasting VIP', cost: '2,500 poin', icon: Star },
                  ].map((reward, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-coffee-50 border border-coffee-100/50">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-coffee-800 shadow-sm">
                        <reward.icon size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-coffee-900">{reward.title}</p>
                        <p className="text-[10px] text-coffee-500">{reward.cost}</p>
                      </div>
                      <button className="bg-coffee-950 text-white text-[10px] font-bold px-3 py-1 rounded-lg">Tukar</button>
                    </div>
                  ))}
                </div>
                {/* QR Code Placeholder */}
                <div className="p-6 bg-coffee-50 text-center">
                   <div className="w-24 h-24 bg-white mx-auto rounded-xl border-4 border-coffee-900 flex items-center justify-center mb-2">
                     <Zap size={40} className="text-coffee-950" />
                   </div>
                   <p className="text-[10px] font-bold text-coffee-400">Scan di Counter</p>
                </div>
              </div>
            </div>
            {/* Decorative floating elements */}
            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 4, repeat: Infinity }}
              className="absolute -top-10 -right-10 glass p-4 rounded-2xl shadow-xl z-20 border-white/20"
            >
              <div className="flex items-center gap-3">
                <div className="bg-green-500 p-2 rounded-lg text-white">
                  <Check size={16} />
                </div>
                <p className="text-xs font-bold text-coffee-900 whitespace-nowrap">Poin Diperbarui!</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="px-6 py-24 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-black text-coffee-950">Dipercaya oleh Barista di Seluruh Dunia</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "Andi R.", shop: "Kedai Kopi Kenangan", text: "BrewPoint meningkatkan kunjungan berulang kami sebesar 40% hanya dalam dua bulan!" },
            { name: "Sarah K.", shop: "Filosofi Kopi", text: "Akhirnya, aplikasi loyalitas yang benar-benar dinikmati pelanggan saya. Sangat bersih." },
            { name: "Devin M.", shop: "Janji Jiwa", text: "Analitik mengungkapkan bahwa lonjakan jam 3 sore adalah peluang pertumbuhan terbaik kami." }
          ].map((t, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-8 rounded-3xl border border-coffee-50 shadow-sm max-w-sm flex flex-col"
            >
              <div className="flex gap-1 mb-4 text-coffee-400">
                {[1, 2, 3, 4, 5].map(s => <Star key={s} size={16} fill="currentColor" />)}
              </div>
              <p className="text-coffee-700 italic mb-6">"{t.text}"</p>
              <div className="mt-auto">
                <p className="font-bold text-coffee-900">{t.name}</p>
                <p className="text-sm text-coffee-500">{t.shop}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="px-6 py-20">
        <div className="max-w-5xl mx-auto rounded-[3rem] bg-gradient-to-br from-coffee-800 to-coffee-950 p-12 md:p-20 text-center relative overflow-hidden shadow-2xl">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 relative z-10">Mulai Tingkatkan Loyalitas Pelanggan Sekarang</h2>
          <p className="text-coffee-200 mb-10 text-lg relative z-10">Bergabung dengan 500+ coffee shop yang membangun bisnis lebih baik.</p>
          <button 
            onClick={() => onNavigate('register')}
            className="bg-white text-coffee-950 px-10 py-4 rounded-2xl text-xl font-black hover:bg-coffee-100 transition-all shadow-xl active:scale-95"
          >
            Mulai Gratis Sekarang
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 max-w-7xl mx-auto border-t border-coffee-100 mt-12 text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <Coffee className="text-coffee-800" />
              <span className="text-xl font-display font-bold text-coffee-950">BrewPoint</span>
            </div>
            <p className="text-sm text-coffee-600 leading-relaxed">Solusi loyalitas digital modern untuk pemilik coffee shop masa kini.</p>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-coffee-900">Produk</h5>
            <ul className="text-sm text-coffee-600 space-y-2">
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Fitur</a></li>
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Harga</a></li>
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Demo</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-coffee-900">Perusahaan</h5>
            <ul className="text-sm text-coffee-600 space-y-2">
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Tentang Kami</a></li>
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Karir</a></li>
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Kontak</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-coffee-900">Sosial</h5>
            <div className="flex gap-4 items-center">
              {[1, 2, 3, 4].map(i => (
                <div key={i} className="w-8 h-8 rounded-full bg-coffee-100 flex items-center justify-center text-coffee-800 hover:bg-coffee-800 hover:text-white transition-all cursor-pointer">
                  <div className="w-4 h-4 rounded-sm bg-current opacity-60"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="text-sm text-coffee-500 border-t border-coffee-50 pt-8 mt-8 text-center flex flex-col md:flex-row justify-between gap-4">
          <p>© 2026 BrewPoint. Hak Cipta Dilindungi.</p>
          <div className="flex gap-6 justify-center">
            <a href="#" className="underline">Kebijakan Privasi</a>
            <a href="#" className="underline">Syarat Layanan</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

const AuthPage = ({ type, onNavigate }: { type: 'login' | 'register', onNavigate: (p: Page) => void }) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-coffee-100">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md bg-white p-10 rounded-[2.5rem] shadow-2xl"
      >
        <div className="text-center mb-8">
          <div className="inline-flex bg-coffee-800 p-3 rounded-2xl mb-4 text-white">
            <Coffee size={32} />
          </div>
          <h2 className="text-3xl font-display font-black text-coffee-950">
            {type === 'login' ? 'Selamat Datang Kembali' : 'Buat Akun'}
          </h2>
          <p className="text-coffee-600 mt-2">
            {type === 'login' ? 'Kopi sempurna menanti Anda.' : 'Mulai perjalanan Anda dengan BrewPoint hari ini.'}
          </p>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
          {type === 'register' && (
            <div>
              <label className="block text-sm font-semibold text-coffee-700 mb-1.5 ml-1">Nama Toko</label>
              <input type="text" placeholder="Kedai Kopi Kita" className="w-full px-5 py-3 rounded-2xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all" />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-coffee-700 mb-1.5 ml-1">Alamat Email</label>
            <input type="email" placeholder="pemilik@kafe.com" className="w-full px-5 py-3 rounded-2xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-coffee-700 mb-1.5 ml-1">Kata Sandi</label>
            <input type="password" placeholder="••••••••" className="w-full px-5 py-3 rounded-2xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all" />
          </div>
          
          <button className="w-full py-4 bg-coffee-800 text-white rounded-2xl font-bold text-lg hover:bg-coffee-900 transition-all shadow-lg active:scale-95 mt-4">
            {type === 'login' ? 'Masuk' : 'Daftar'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-coffee-600">
          {type === 'login' ? (
            <p>Belum punya akun? <button onClick={() => onNavigate('register')} className="text-coffee-800 font-bold hover:underline">Daftar Sekarang</button></p>
          ) : (
            <p>Sudah punya akun? <button onClick={() => onNavigate('login')} className="text-coffee-800 font-bold hover:underline">Masuk</button></p>
          )}
        </div>
        <button onClick={() => onNavigate('landing')} className="mt-6 w-full text-sm text-coffee-500 hover:text-coffee-800 transition-colors uppercase tracking-widest font-bold">Kembali ke Beranda</button>
      </motion.div>
    </div>
  );
};

const Dashboard = ({ onNavigate }: { onNavigate: (p: Page) => void }) => {
  return (
    <div className="min-h-screen bg-coffee-50 flex">
      {/* Sidebar */}
      <aside className="hidden lg:flex w-72 flex-col glass border-r bg-white/50 sticky top-0 h-screen p-8">
        <div className="flex items-center gap-2 mb-12">
          <div className="bg-coffee-800 p-2 rounded-xl">
            <Coffee className="text-white w-5 h-5" />
          </div>
          <span className="text-xl font-display font-bold tracking-tight text-coffee-950">BrewPoint</span>
        </div>

        <nav className="flex-1 space-y-2">
          {[
            { icon: LayoutDashboard, label: 'Ringkasan', active: true },
            { icon: Users, label: 'Pelanggan' },
            { icon: Gift, label: 'Hadiah' },
            { icon: BarChart3, label: 'Analitik' },
            { icon: Settings, label: 'Pengaturan' },
          ].map((item, i) => (
            <button 
              key={i} 
              className={cn(
                "w-full flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold transition-all",
                item.active ? "bg-coffee-800 text-white shadow-lg" : "text-coffee-600 hover:bg-coffee-100"
              )}
            >
              <item.icon size={20} />
              {item.label}
            </button>
          ))}
        </nav>

        <button 
          onClick={() => onNavigate('landing')}
          className="flex items-center gap-3 px-4 py-3 rounded-2xl text-sm font-semibold text-red-600 hover:bg-red-50 transition-all mt-auto"
        >
          <LogOut size={20} />
          Keluar
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-10 py-10 max-h-screen overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-display font-black text-coffee-950">Selamat Pagi, Brews!</h1>
            <p className="text-coffee-600">Inilah yang terjadi hari ini di toko Anda.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400 group-focus-within:text-coffee-800 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Cari pelanggan..." 
                className="bg-white border text-sm border-coffee-100 px-12 py-3 rounded-2xl focus:outline-none focus:ring-2 focus:ring-coffee-500 w-full md:w-64"
              />
            </div>
            <button className="bg-coffee-800 text-white p-3 rounded-2xl hover:bg-coffee-900 transition-all shadow-md active:scale-95">
              <Plus size={20} />
            </button>
          </div>
        </header>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'Tambah Transaksi', icon: Zap, color: 'bg-coffee-900 text-white' },
            { label: 'Daftar Pelanggan', icon: Users, color: 'bg-white text-coffee-800 border border-coffee-100' },
            { label: 'Buat Hadiah', icon: Gift, color: 'bg-white text-coffee-800 border border-coffee-100' },
            { label: 'Luncurkan Kampanye', icon: Star, color: 'bg-white text-coffee-800 border border-coffee-100' },
          ].map((action, i) => (
            <button key={i} className={cn("p-4 rounded-2xl flex flex-col items-center gap-3 transition-all hover:scale-105 active:scale-95 shadow-sm font-bold text-xs uppercase tracking-widest", action.color)}>
              <action.icon size={24} />
              {action.label}
            </button>
          ))}
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-10">
          {stats.map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white p-6 rounded-[2rem] shadow-sm border border-coffee-50 hover:shadow-xl hover:-translate-y-1 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-3 bg-coffee-50 rounded-2xl text-coffee-800">
                  <stat.icon size={24} />
                </div>
                <span className="text-xs font-bold text-coffee-400 uppercase tracking-widest">{stat.label}</span>
              </div>
              <div className="flex items-end justify-between">
                <div>
                  <h3 className="text-3xl font-display font-black text-coffee-950 mt-1">{stat.value}</h3>
                  <div className="flex items-center gap-1 mt-1">
                    <span className="text-green-500 text-sm font-bold">{stat.change}</span>
                    <span className="text-coffee-400 text-xs font-semibold">vs bulan lalu</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Chart & Activity/Customers */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 pb-10">
          <div className="xl:col-span-2 space-y-8">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-coffee-50">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-xl font-display font-black text-coffee-950">Tren Pendapatan & Poin</h3>
                <select className="bg-coffee-50 text-coffee-800 text-xs font-bold px-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-coffee-500">
                  <option>7 Hari Terakhir</option>
                  <option>30 Hari Terakhir</option>
                </select>
              </div>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorPoints" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#4b3621" stopOpacity={0.1}/>
                        <stop offset="95%" stopColor="#4b3621" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f5f1ed" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#bc8e56', fontSize: 12}} />
                    <YAxis axisLine={false} tickLine={false} tick={{fill: '#bc8e56', fontSize: 12}} />
                    <Tooltip 
                      contentStyle={{borderRadius: '1.5rem', border: 'none', boxShadow: '0 10px 25px -5px rgba(75, 54, 33, 0.1)', padding: '12px 16px'}}
                      itemStyle={{fontWeight: 'bold'}}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="points" 
                      stroke="#4b3621" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorPoints)" 
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-coffee-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-black text-coffee-950">Kampanye Aktif</h3>
                <button className="text-coffee-600 font-bold text-sm hover:text-coffee-900">Kelola Semua</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Morning Coffee Rush', status: 'Aktif', reach: '450 kunjungan', boost: '+15%', color: 'border-l-green-500' },
                  { title: 'Weekend Pastry Promo', status: 'Terjadwal', reach: '1.2k target', boost: 'N/A', color: 'border-l-blue-500' },
                ].map((camp, i) => (
                  <div key={i} className={cn("p-6 rounded-2xl bg-coffee-50/30 border-l-4", camp.color)}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-coffee-900">{camp.title}</h4>
                      <span className="text-[10px] font-black uppercase bg-white px-2 py-0.5 rounded-md shadow-sm">{camp.status}</span>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-coffee-400">Jangkauan</p>
                        <p className="text-sm font-bold text-coffee-800">{camp.reach}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-coffee-400">Peningkatan Penjualan</p>
                        <p className="text-sm font-bold text-green-600">{camp.boost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-coffee-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-black text-coffee-950">Pelanggan Terbaru</h3>
                <button className="text-coffee-600 font-bold text-sm hover:text-coffee-900">Lihat Semua</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-coffee-50">
                      <th className="pb-4 text-xs font-bold text-coffee-400 uppercase tracking-widest pl-2">Pelanggan</th>
                      <th className="pb-4 text-xs font-bold text-coffee-400 uppercase tracking-widest">Poin</th>
                      <th className="pb-4 text-xs font-bold text-coffee-400 uppercase tracking-widest text-right pr-2">Tingkat</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-coffee-50">
                    {[
                      { name: 'Sarah Miller', email: 'sarah@example.com', points: 1240, status: 'Gold' },
                      { name: 'James Wilson', email: 'james@example.com', points: 4500, status: 'Platinum' },
                      { name: 'Lia Chen', email: 'lia@example.com', points: 2800, status: 'Silver' },
                    ].map((cust, i) => (
                      <tr key={i} className="group hover:bg-coffee-50/50 transition-colors">
                        <td className="py-4 pl-2">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 rounded-full bg-coffee-100 flex items-center justify-center text-[10px] font-bold text-coffee-800">
                              {cust.name[0]}
                            </div>
                            <div>
                              <p className="font-bold text-coffee-900 text-sm">{cust.name}</p>
                              <p className="text-[10px] text-coffee-500">{cust.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-4 text-sm font-semibold text-coffee-700">{cust.points}</td>
                        <td className="py-4 text-right pr-2">
                          <span className="text-[9px] uppercase font-bold px-2 py-0.5 rounded-full bg-coffee-50 text-coffee-800 border border-coffee-100">
                            {cust.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <div className="h-full space-y-8 pb-10">
            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-coffee-50">
              <h3 className="text-xl font-display font-black text-coffee-950 mb-6">Penukaran Terbaru</h3>
              <div className="space-y-6">
                {[
                  { name: 'Alex Johnson', reward: 'Latte Gratis', time: '12 menit lalu', color: 'bg-orange-100 text-orange-600' },
                  { name: 'Siti Sarah', reward: 'Extra Shot', time: '45 menit lalu', color: 'bg-brown-100 text-brown-600' },
                  { name: 'Budi Santoso', reward: 'Pastry BOGO', time: '1 jam lalu', color: 'bg-green-100 text-green-600' },
                  { name: 'Clara Bella', reward: 'Biji Kopi 250g', time: '3 jam lalu', color: 'bg-blue-100 text-blue-600' },
                  { name: 'David Miller', reward: 'Latte Gratis', time: '5 jam lalu', color: 'bg-orange-100 text-orange-600' },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-coffee-50 flex items-center justify-center font-bold text-coffee-800">
                      {item.name[0]}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-bold text-coffee-950 text-sm">{item.name}</h4>
                      <p className="text-xs text-coffee-500 font-medium">{item.time}</p>
                    </div>
                    <span className={cn("text-[10px] uppercase font-bold px-3 py-1.5 rounded-full tracking-wider", item.color)}>
                      {item.reward}
                    </span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 bg-coffee-50 text-coffee-800 font-bold rounded-2xl hover:bg-coffee-100 transition-colors text-sm">
                Lihat Semua Aktivitas
              </button>
            </div>
            
            <div className="bg-coffee-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-lg font-display font-bold mb-2">Upgrade ke Pro</h3>
               <p className="text-coffee-200 text-sm mb-6">Buka dukungan multi-outlet dan alat CRM canggih.</p>
               <button className="w-full py-3 bg-white text-coffee-900 font-bold rounded-xl hover:bg-coffee-50 transition-all text-sm shadow-lg">
                 Upgrade Sekarang
               </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('landing');

  // Smooth scroll helper
  const navigate = (page: Page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  return (
    <div className="selection:bg-coffee-200 selection:text-coffee-900 min-h-screen">
      {currentPage === 'landing' ? (
        <>
          <Navbar onNavigate={navigate} currentPage={currentPage} />
          <LandingPage onNavigate={navigate} />
        </>
      ) : currentPage === 'dashboard' ? (
        <Dashboard onNavigate={navigate} />
      ) : (
        <AuthPage type={currentPage as 'login' | 'register'} onNavigate={navigate} />
      )}
      <ChatBot />
    </div>
  );
}

