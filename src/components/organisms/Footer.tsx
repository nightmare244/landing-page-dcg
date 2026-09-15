"use client";

import { Container, Text, Section } from '../atoms';
import { motion } from 'framer-motion';
import { 
  MapPinIcon, 
  PhoneIcon, 
  EnvelopeIcon,
  GlobeAltIcon 
} from '@heroicons/react/24/outline';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  const links = [
    { title: 'Layanan', items: [
      { label: 'CCTV Installation', href: '#services' },
      { label: 'Network Setup', href: '#services' },
      { label: 'IT Procurement', href: '#services' },
      { label: 'Server Maintenance', href: '#services' },
    ] },
    { title: 'Perusahaan', items: [
      { label: 'Tentang Kami', href: '#about' },
      { label: 'Karir', href: '#' },
      { label: 'Blog', href: '#' },
    ] },
    { title: 'Dukungan', items: [
      { label: 'FAQ', href: '#faq' }, 
      { label: 'Kontak', href: '#contact' }, 
      { label: 'Syarat Layanan', href: '#' }, 
      { label: 'Kebijakan Privasi', href: '#' }
    ] },
  ];

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href === '#contact') {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent('openContactModal'));
      return;
    }
    
    if (href.startsWith('#') && href !== '#') {
      e.preventDefault();
      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const socialLinks = [
    { name: 'Facebook', icon: 'F', href: '#' },
    { name: 'Instagram', icon: 'I', href: '#' },
    { name: 'LinkedIn', icon: 'L', href: '#' },
    { name: 'YouTube', icon: 'Y', href: '#' },
  ];

  return (
    <Section bgColor="dark" py="xl" className="relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <Container className="relative z-10">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Company Info */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="mb-6 h-16 md:h-20 w-auto inline-block">
              <img 
                src="/icon.png" 
                alt="Digital Company Group"
                className="h-full w-auto object-contain brightness-0 invert drop-shadow-md"
              />
            </div>
            <Text color="white" size="base" className="opacity-70 mb-6 max-w-sm leading-relaxed">
              Solusi IT profesional untuk transformasi digital bisnis Anda. Kami berkomitmen memberikan layanan terbaik dengan teknologi terkini.
            </Text>
            
            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social) => (
                <motion.a 
                  key={social.name} 
                  href={social.href}
                  className="w-10 h-10 bg-white/10 hover:bg-gradient-to-br hover:from-blue-600 hover:to-teal-500 rounded-xl flex items-center justify-center transition-all duration-300 group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span className="text-white font-medium text-sm group-hover:text-white">{social.icon}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          {links.map((section, index) => (
            <motion.div 
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <h4 className="text-white font-bold mb-5 text-lg">{section.title}</h4>
              <ul className="space-y-3">
                {section.items.map((item) => (
                  <li key={item.label}>
                    <a 
                      href={item.href} 
                      onClick={(e) => handleLinkClick(e, item.href)}
                      className="text-gray-400 hover:text-white text-sm transition-colors duration-300 flex items-center gap-2 group"
                    >
                      <span className="w-0 group-hover:w-2 h-0.5 bg-blue-500 transition-all duration-300" />
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Contact Bar */}
        

        {/* Divider */}
        <div className="border-t border-white/10" />

        {/* Copyright */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 gap-4">
          <Text color="white" size="sm" className="opacity-60">
            © {currentYear} Digital Company Group. All rights reserved.
          </Text>
          <div className="flex flex-wrap justify-center gap-6">
            {['Privacy Policy', 'Terms of Service', 'Cookies'].map((item) => (
              <a 
                key={item}
                href="#" 
                className="text-gray-500 hover:text-white text-sm transition-colors duration-300"
              >
                {item}
              </a>
            ))}
          </div>
        </div>
      </Container>
    </Section>
  );
}