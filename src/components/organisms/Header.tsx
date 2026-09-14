"use client";

import { useState, useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { Container, Button } from '../atoms';
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline';
import { motion, AnimatePresence } from 'framer-motion';
import ContactModal from './ContactModal';

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();
  const isHomePage = pathname === '/';

  const [isScrolled, setIsScrolled] = useState(!isHomePage);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    if (!isHomePage) {
      setIsScrolled(true);
      return;
    }
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll);

    const handleOpenModal = () => setIsContactModalOpen(true);
    window.addEventListener('openContactModal', handleOpenModal as EventListener);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('openContactModal', handleOpenModal as EventListener);
    };
  }, [isHomePage]);

  const navLinks = [
    { name: 'Beranda', href: '#' },
    { name: 'Tentang', href: '#about' },
    { name: 'Layanan', href: '#services' },
    { name: 'Keunggulan', href: '#benefits' },
    { name: 'Kontak', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    setIsMobileMenuOpen(false);

    if (href === '#contact') {
      setIsContactModalOpen(true);
      return;
    }

    if (!isHomePage) {
      // Navigate to home page, then scroll to section
      if (href === '#') {
        router.push('/');
      } else {
        router.push('/' + href);
      }
      return;
    }
    if (href === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
            ? 'bg-white/95 backdrop-blur-md shadow-lg'
            : 'bg-transparent'
          }`}
      >
        <Container>
          <nav className="flex items-center justify-between py-4">
            {/* Logo */}
            <a
              href="#"
              onClick={(e) => { e.preventDefault(); scrollToSection('#'); }}
              className="flex items-center group relative h-14 md:h-16 w-auto"
            >
              <img
                src="/ICON.png"
                alt="Digital Compny Group"
                className={`h-full w-auto object-contain transition-all duration-300 ${isScrolled ? '' : 'brightness-0 invert drop-shadow-md'
                  }`}
              />
            </a>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                  className={`font-medium transition-all duration-300 hover:scale-105 ${isScrolled
                      ? 'text-gray-600 hover:text-blue-600'
                      : 'text-white/90 hover:text-white'
                    }`}
                >
                  {link.name}
                </a>
              ))}
            </div>

            {/* CTA Button */}
            <div className="hidden lg:block">
              <Button
                variant={isScrolled ? 'primary' : 'outline-white'}
                size="md"
                onClick={() => scrollToSection('#contact')}
                className={isScrolled ? '!bg-gradient-to-r !from-blue-600 !to-teal-500 !text-white !border-0 hover:shadow-lg hover:shadow-blue-500/25' : ''}
              >
                Hubungi Kami
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`lg:hidden p-2 rounded-lg transition-colors ${isScrolled ? 'text-gray-800' : 'text-white'
                }`}
            >
              {isMobileMenuOpen ? (
                <XMarkIcon className="w-6 h-6" />
              ) : (
                <Bars3Icon className="w-6 h-6" />
              )}
            </button>
          </nav>
        </Container>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-x-0 top-[72px] z-40 lg:hidden"
          >
            <div className="bg-white/95 backdrop-blur-md shadow-xl mx-4 rounded-2xl overflow-hidden">
              <div className="p-6 space-y-4">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
                    className="block py-3 px-4 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-xl font-medium transition-colors"
                  >
                    {link.name}
                  </a>
                ))}
                <Button
                  variant="primary"
                  size="lg"
                  onClick={() => scrollToSection('#contact')}
                  className="w-full mt-4 !bg-gradient-to-r !from-blue-600 !to-teal-500 !text-white !border-0"
                >
                  Hubungi Kami
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </>
  );
}
