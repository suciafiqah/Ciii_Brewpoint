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
  { label: 'Total Customers', value: '1,284', change: '+12%', icon: Users, trend: 'up' },
  { label: 'Monthly Revenue', value: 'Rp42.5M', change: '+24%', icon: BarChart3, trend: 'up' },
  { label: 'Repeat Rate', value: '68%', change: '+8%', icon: Zap, trend: 'up' },
  { label: 'Points Active', value: '840k', change: '-2%', icon: Coffee, trend: 'down' },
];

const pricingPlans = [
  {
    title: "Basic",
    price: 850000,
    desc: "Perfect for single cart or small coffee stands.",
    features: ['Up to 100 Customers', 'Basic Analytics', 'Digital Point System', 'QR Code Check-in', 'Email Support'],
  },
  {
    title: "Pro",
    price: 1500000,
    desc: "Ideal for established cafes ready to scale.",
    recommended: true,
    features: ['Up to 1,000 Customers', 'Advanced CRM', 'Custom Rewards', 'WhatsApp Marketing', 'Priority Support', 'Daily Backups'],
  },
  {
    title: "Premium",
    price: 2200000,
    desc: "For multi-branch & franchise coffee businesses.",
    features: ['Unlimited Customers', 'Multi-outlet Support', 'POS System Integration', 'Dedicated Manager', 'API & Webhooks', 'Custom Branding'],
  },
];

const faqs = [
  { q: "How do customers check in?", a: "Customers can simply scan a unique QR code at your counter or provide their phone number to the cashier." },
  { q: "Does it work offline?", a: "Yes, our system caches transaction data and syncs automatically when you're back online." },
  { q: "Can I integrate with my POS?", a: "Absolutely! We support major POS systems like Moka, Square, and Shopify POS." },
  { q: "Is there a free trial?", a: "Yes, we offer a 14-day full feature trial with no credit card required." },
];

const chartData = [
  { name: 'Mon', points: 4000, transactions: 240 },
  { name: 'Tue', points: 3000, transactions: 139 },
  { name: 'Wed', points: 2000, transactions: 980 },
  { name: 'Thu', points: 2780, transactions: 390 },
  { name: 'Fri', points: 1890, transactions: 480 },
  { name: 'Sat', points: 2390, transactions: 380 },
  { name: 'Sun', points: 3490, transactions: 430 },
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
          <a href="#features" className="text-coffee-700 hover:text-coffee-900 font-medium transition-colors">Features</a>
          <a href="#pricing" className="text-coffee-700 hover:text-coffee-900 font-medium transition-colors">Pricing</a>
          <button 
            onClick={() => onNavigate('login')}
            className="text-coffee-800 font-semibold hover:text-coffee-600 transition-colors"
          >
            Login
          </button>
          <button 
            onClick={() => onNavigate('register')}
            className="bg-coffee-800 text-white px-6 py-2.5 rounded-full font-semibold hover:bg-coffee-900 transition-all shadow-md hover:shadow-lg active:scale-95"
          >
            Try for Free
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
            <span>Digital Loyalty, Simplified</span>
          </motion.div>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-display font-black leading-[1.1] mb-6 text-coffee-950"
          >
            Sip Coffee, <span className="text-coffee-500 italic">Earn Points.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-coffee-700 mb-10 max-w-xl mx-auto lg:mx-0 leading-relaxed"
          >
            The all-in-one digital loyalty solution designed for modern coffee shops. Boost customer retention and drive sales with zero friction.
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
              Try for Free <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => onNavigate('dashboard')}
              className="bg-white border-2 border-coffee-100 text-coffee-800 px-8 py-4 rounded-2xl text-lg font-bold hover:border-coffee-300 transition-all shadow-sm w-full sm:w-auto"
            >
              View Demo
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
            <p className="text-sm text-coffee-600 font-medium font-display">Joined by 500+ coffee shops</p>
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
                  <p className="text-xs font-bold text-coffee-950 uppercase tracking-tighter">New Loyalty Point</p>
                  <p className="text-sm font-display font-medium text-coffee-800">+25 pts awarded to Andi</p>
                </div>
              </div>
              <div className="bg-green-500/10 text-green-600 text-[10px] font-black px-2 py-1 rounded-lg">LIVE</div>
            </div>
          </div>
        </motion.div>
      </section>

        {/* Trusted By Logo Bar */}
        <div className="max-w-7xl mx-auto px-6 py-20 border-t border-coffee-100/50">
          <p className="text-center text-xs font-bold text-coffee-400 uppercase tracking-[0.2em] mb-10">Trusted by leading roasters & cafes</p>
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
              Designed for the <span className="text-coffee-300">Modern Barista.</span>
            </h2>
            <p className="text-coffee-100 text-lg mb-8 leading-relaxed">
              We understand that speed is everything behind the counter. BrewPoint's interface is optimized for high-traffic cafes, ensuring you spend less time on the screen and more time crafting the perfect cup.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="glass px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-400"></div>
                Fast Checkout
              </div>
              <div className="glass px-6 py-3 rounded-2xl text-white font-bold flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-coffee-400"></div>
                Offline Support
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
              Powerful Features
            </motion.span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-coffee-950 mt-4 mb-6">Built for <span className="text-gradient">Scale.</span></h2>
            <p className="text-coffee-600 text-xl max-w-3xl mx-auto font-medium">From single carts to multinational coffee chains, BrewPoint provides the enterprise-grade tools you need.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard 
              icon={Users} 
              title="Advanced CRM" 
              desc="Deep dive into customer behavior, order history, and individual taste profiles."
              delay={0}
            />
            <FeatureCard 
              icon={Zap} 
              title="Point Engine" 
              desc="Automatic tiered rewards based on purchase frequency and average basket size."
              delay={0.1}
            />
            <FeatureCard 
              icon={BarChart3} 
              title="Predictive Analytics" 
              desc="AI-driven insights on future sales trends and inventory requirements."
              delay={0.2}
            />
            <FeatureCard 
              icon={Gift} 
              title="Reward Engine" 
              desc="Create dynamic rewards: from free shots to exclusive merchandise and private events."
              delay={0.3}
            />
            <FeatureCard 
              icon={Star} 
              title="VIP Membership" 
              desc="Automated Silver, Gold, and Platinum tiers with exclusive benefit management."
              delay={0.4}
            />
            <FeatureCard 
              icon={Settings} 
              title="POS Integration" 
              desc="Seamlessly sync with Shopify, Moka, Square, and your existing cashier systems."
              delay={0.5}
            />
          </div>
        </div>
      </section>

      {/* How it Works - Business Centric */}
      <section className="px-6 py-32 max-w-7xl mx-auto">
        <div className="text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-display font-black text-coffee-950 mb-6">Efficiency in <span className="text-gradient">Every Step.</span></h2>
          <p className="text-coffee-600">A streamlined workflow that respects your speed during peak hours.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16 relative">
          <div className="absolute top-1/2 left-0 w-full h-0.5 bg-coffee-100 -translate-y-1/2 hidden lg:block -z-10"></div>
          {[
            { step: '01', title: 'Onboard Shop', desc: 'Register your outlets and upload your logo and menu items.' },
            { step: '02', title: 'Connect POS', desc: 'Sync with your cashier with one-click integration or use our QR system.' },
            { step: '03', title: 'Automate Loyalty', desc: 'Set your rules and watch the system handle engagement independently.' },
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
            <h2 className="text-4xl md:text-6xl font-display font-black mb-8 italic">Choose your <span className="text-coffee-400">Perfect Blend.</span></h2>
            
            {/* Annual Toggle */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <span className={cn("text-lg font-bold", !isAnnual ? "text-white" : "text-coffee-500")}>Monthly</span>
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
                <span className={cn("text-lg font-bold", isAnnual ? "text-white" : "text-coffee-500")}>Annual</span>
                <span className="bg-coffee-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">SAVE 20%</span>
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
            <span className="text-coffee-500 font-bold tracking-widest uppercase text-xs">Customer Experience</span>
            <h2 className="text-4xl md:text-6xl font-display font-black text-coffee-950 mt-4 mb-8">A Wallet they actually <span className="text-gradient underline italic">Keep.</span></h2>
            <p className="text-coffee-700 text-lg mb-10 leading-relaxed">
              Ditch the physical cards. BrewPoint provides a stunning mobile card experience for your customers. They track points, browse rewards, and receive push notifications for special offers—all in one place.
            </p>
            <div className="space-y-6">
              {[
                { title: 'No App Download Required', desc: 'Works via web browser or Apple/Google Wallet integration.' },
                { title: 'Instant Reward Redemption', desc: 'Customers can redeem rewards with a single tap at the counter.' }
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
                  <p className="text-xs uppercase tracking-widest font-black text-coffee-300">Member Status</p>
                  <h3 className="text-2xl font-display font-bold">Gold Tier</h3>
                  <div className="mt-8 bg-white/10 p-4 rounded-2xl border border-white/10">
                    <p className="text-[10px] uppercase font-bold mb-1">Your Balance</p>
                    <p className="text-3xl font-black italic">2,450 <span className="text-xs font-normal not-italic opacity-60">pts</span></p>
                  </div>
                </div>
                <div className="p-6 space-y-4 flex-1">
                  <h4 className="font-bold text-coffee-900 text-sm">Available Rewards</h4>
                  {[
                    { title: 'Free Espresso Shot', cost: '500 pts', icon: Coffee },
                    { title: 'Avocado Toast Box', cost: '1,200 pts', icon: Gift },
                    { title: 'VIP Tasting Event', cost: '2,500 pts', icon: Star },
                  ].map((reward, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 rounded-xl bg-coffee-50 border border-coffee-100/50">
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center text-coffee-800 shadow-sm">
                        <reward.icon size={16} />
                      </div>
                      <div className="flex-1">
                        <p className="text-xs font-bold text-coffee-900">{reward.title}</p>
                        <p className="text-[10px] text-coffee-500">{reward.cost}</p>
                      </div>
                      <button className="bg-coffee-950 text-white text-[10px] font-bold px-3 py-1 rounded-lg">Redeem</button>
                    </div>
                  ))}
                </div>
                {/* QR Code Placeholder */}
                <div className="p-6 bg-coffee-50 text-center">
                   <div className="w-24 h-24 bg-white mx-auto rounded-xl border-4 border-coffee-900 flex items-center justify-center mb-2">
                     <Zap size={40} className="text-coffee-950" />
                   </div>
                   <p className="text-[10px] font-bold text-coffee-400">Scan at Counter</p>
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
                <p className="text-xs font-bold text-coffee-900 whitespace-nowrap">Points Updated!</p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <section className="px-6 py-24 max-w-7xl mx-auto overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-display font-black text-coffee-950">Trusted by Baristas Worldwide</h2>
        </div>
        <div className="flex flex-wrap justify-center gap-8">
          {[
            { name: "Andi R.", shop: "Bean Haven", text: "BrewPoint increased our repeat visits by 40% in just two months!" },
            { name: "Sarah K.", shop: "The Daily Grind", text: "Finally, a loyalty app that my customers actually enjoy using. So clean." },
            { name: "Devin M.", shop: "Caffeine Lab", text: "The analytics revealed that our 3 PM rush was our best growth opportunity." }
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
          <h2 className="text-3xl md:text-5xl font-display font-black text-white mb-6 relative z-10">Start Increasing Customer Loyalty Now</h2>
          <p className="text-coffee-200 mb-10 text-lg relative z-10">Join 500+ coffee shops building better businesses.</p>
          <button 
            onClick={() => onNavigate('register')}
            className="bg-white text-coffee-950 px-10 py-4 rounded-2xl text-xl font-black hover:bg-coffee-100 transition-all shadow-xl active:scale-95"
          >
            Get Started for Free
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
            <p className="text-sm text-coffee-600 leading-relaxed">Modern digital loyalty solution for today's coffee shop owners.</p>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-coffee-900">Product</h5>
            <ul className="text-sm text-coffee-600 space-y-2">
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Features</a></li>
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Pricing</a></li>
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Demo</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-coffee-900">Company</h5>
            <ul className="text-sm text-coffee-600 space-y-2">
              <li><a href="#" className="hover:text-coffee-800 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-coffee-800 transition-colors">Contact</a></li>
            </ul>
          </div>
          <div>
            <h5 className="font-bold mb-4 text-coffee-900">Social</h5>
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
          <p>© 2026 BrewPoint. All rights reserved.</p>
          <div className="flex gap-6 justify-center">
            <a href="#" className="underline">Privacy Policy</a>
            <a href="#" className="underline">Terms of Service</a>
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
            {type === 'login' ? 'Welcome Back' : 'Create Account'}
          </h2>
          <p className="text-coffee-600 mt-2">
            {type === 'login' ? 'Perfect cup is waiting for you.' : 'Start your journey with BrewPoint today.'}
          </p>
        </div>
        
        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onNavigate('dashboard'); }}>
          {type === 'register' && (
            <div>
              <label className="block text-sm font-semibold text-coffee-700 mb-1.5 ml-1">Shop Name</label>
              <input type="text" placeholder="The Coffee Club" className="w-full px-5 py-3 rounded-2xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all" />
            </div>
          )}
          <div>
            <label className="block text-sm font-semibold text-coffee-700 mb-1.5 ml-1">Email Address</label>
            <input type="email" placeholder="owner@brewview.com" className="w-full px-5 py-3 rounded-2xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-coffee-700 mb-1.5 ml-1">Password</label>
            <input type="password" placeholder="••••••••" className="w-full px-5 py-3 rounded-2xl border border-coffee-200 focus:outline-none focus:ring-2 focus:ring-coffee-500 focus:border-transparent transition-all" />
          </div>
          
          <button className="w-full py-4 bg-coffee-800 text-white rounded-2xl font-bold text-lg hover:bg-coffee-900 transition-all shadow-lg active:scale-95 mt-4">
            {type === 'login' ? 'Sign In' : 'Sign Up'}
          </button>
        </form>

        <div className="mt-8 text-center text-sm text-coffee-600">
          {type === 'login' ? (
            <p>Don't have an account? <button onClick={() => onNavigate('register')} className="text-coffee-800 font-bold hover:underline">Register Now</button></p>
          ) : (
            <p>Already have an account? <button onClick={() => onNavigate('login')} className="text-coffee-800 font-bold hover:underline">Sign In</button></p>
          )}
        </div>
        <button onClick={() => onNavigate('landing')} className="mt-6 w-full text-sm text-coffee-500 hover:text-coffee-800 transition-colors uppercase tracking-widest font-bold">Back to Home</button>
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
            { icon: LayoutDashboard, label: 'Overview', active: true },
            { icon: Users, label: 'Customers' },
            { icon: Gift, label: 'Rewards' },
            { icon: BarChart3, label: 'Analytics' },
            { icon: Settings, label: 'Settings' },
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
          Sign Out
        </button>
      </aside>

      {/* Main Content */}
      <main className="flex-1 px-4 md:px-10 py-10 max-h-screen overflow-y-auto">
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
          <div>
            <h1 className="text-3xl font-display font-black text-coffee-950">Good Morning, Brews!</h1>
            <p className="text-coffee-600">Here's what's happening today at your shop.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-coffee-400 group-focus-within:text-coffee-800 transition-colors" size={20} />
              <input 
                type="text" 
                placeholder="Search customers..." 
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
            { label: 'Add Transaction', icon: Zap, color: 'bg-coffee-900 text-white' },
            { label: 'Register Customer', icon: Users, color: 'bg-white text-coffee-800 border border-coffee-100' },
            { label: 'Create Reward', icon: Gift, color: 'bg-white text-coffee-800 border border-coffee-100' },
            { label: 'Launch Campaign', icon: Star, color: 'bg-white text-coffee-800 border border-coffee-100' },
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
                    <span className="text-coffee-400 text-xs font-semibold">vs last month</span>
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
                <h3 className="text-xl font-display font-black text-coffee-950">Earnings & Points Trend</h3>
                <select className="bg-coffee-50 text-coffee-800 text-xs font-bold px-4 py-2 rounded-xl border-none focus:ring-2 focus:ring-coffee-500">
                  <option>Last 7 Days</option>
                  <option>Last 30 Days</option>
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
                <h3 className="text-xl font-display font-black text-coffee-950">Active Campaigns</h3>
                <button className="text-coffee-600 font-bold text-sm hover:text-coffee-900">Manage All</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: 'Morning Coffee Rush', status: 'Active', reach: '450 visits', boost: '+15%', color: 'border-l-green-500' },
                  { title: 'Weekend Pastry Promo', status: 'Scheduled', reach: '1.2k targets', boost: 'N/A', color: 'border-l-blue-500' },
                ].map((camp, i) => (
                  <div key={i} className={cn("p-6 rounded-2xl bg-coffee-50/30 border-l-4", camp.color)}>
                    <div className="flex justify-between items-start mb-2">
                      <h4 className="font-bold text-coffee-900">{camp.title}</h4>
                      <span className="text-[10px] font-black uppercase bg-white px-2 py-0.5 rounded-md shadow-sm">{camp.status}</span>
                    </div>
                    <div className="flex gap-4 mt-4">
                      <div>
                        <p className="text-[10px] uppercase font-bold text-coffee-400">Reach</p>
                        <p className="text-sm font-bold text-coffee-800">{camp.reach}</p>
                      </div>
                      <div>
                        <p className="text-[10px] uppercase font-bold text-coffee-400">Sales Boost</p>
                        <p className="text-sm font-bold text-green-600">{camp.boost}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-coffee-50">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-display font-black text-coffee-950">Recent Customers</h3>
                <button className="text-coffee-600 font-bold text-sm hover:text-coffee-900">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="border-b border-coffee-50">
                      <th className="pb-4 text-xs font-bold text-coffee-400 uppercase tracking-widest pl-2">Customer</th>
                      <th className="pb-4 text-xs font-bold text-coffee-400 uppercase tracking-widest">Points</th>
                      <th className="pb-4 text-xs font-bold text-coffee-400 uppercase tracking-widest text-right pr-2">Tier</th>
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
              <h3 className="text-xl font-display font-black text-coffee-950 mb-6">Recent Redemptions</h3>
              <div className="space-y-6">
                {[
                  { name: 'Alex Johnson', reward: 'Free Latte', time: '12 mins ago', color: 'bg-orange-100 text-orange-600' },
                  { name: 'Siti Sarah', reward: 'Extra Shot', time: '45 mins ago', color: 'bg-brown-100 text-brown-600' },
                  { name: 'Budi Santoso', reward: 'Pastry BOGO', time: '1 hr ago', color: 'bg-green-100 text-green-600' },
                  { name: 'Clara Bella', reward: 'Bean Bag 250g', time: '3 hrs ago', color: 'bg-blue-100 text-blue-600' },
                  { name: 'David Miller', reward: 'Free Latte', time: '5 hrs ago', color: 'bg-orange-100 text-orange-600' },
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
                View All Activity
              </button>
            </div>
            
            <div className="bg-coffee-900 p-8 rounded-[2.5rem] shadow-xl text-white relative overflow-hidden">
               <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2"></div>
               <h3 className="text-lg font-display font-bold mb-2">Upgrade to Pro</h3>
               <p className="text-coffee-200 text-sm mb-6">Unlock multi-outlet support and advanced CRM tools.</p>
               <button className="w-full py-3 bg-white text-coffee-900 font-bold rounded-xl hover:bg-coffee-50 transition-all text-sm shadow-lg">
                 Upgrade Now
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

