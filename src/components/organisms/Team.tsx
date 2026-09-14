"use client";

import { Container, Heading, Text, Section } from '../atoms';
import { motion } from 'framer-motion';
import Image from 'next/image';

const teamMembers = [
  {
    name: "John Doe",
    role: "CEO & Founder",
    description: "Berpengalaman lebih dari 10 tahun dalam industri teknologi dan pengembangan bisnis.",
    image: "https://ui-avatars.com/api/?name=John+Doe&background=random&size=200",
  },
  {
    name: "Jane Smith",
    role: "Chief Technology Officer",
    description: "Pakar arsitektur sistem dengan spesialisasi pada skalabilitas dan keamanan cloud.",
    image: "https://ui-avatars.com/api/?name=Jane+Smith&background=random&size=200",
  },
  {
    name: "Michael Johnson",
    role: "Lead Developer",
    description: "Menguasai berbagai bahasa pemrograman modern dan framework untuk web dan mobile.",
    image: "https://ui-avatars.com/api/?name=Michael+Johnson&background=random&size=200",
  },
  {
    name: "Sarah Williams",
    role: "UI/UX Designer",
    description: "Ahli dalam merancang pengalaman pengguna yang intuitif dan estetis.",
    image: "https://ui-avatars.com/api/?name=Sarah+Williams&background=random&size=200",
  }
];

export default function Team() {
  return (
    <Section bgColor="white" py="2xl" id="team">
      <Container>
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="inline-flex items-center gap-2 bg-blue-50 rounded-full px-5 py-2.5 mb-6 border border-blue-100">
              <span className="w-2 h-2 bg-blue-600 rounded-full animate-pulse" />
              <span className="text-sm font-semibold text-blue-700">Tim Kami</span>
            </div>
            <Heading level={2} className="mb-4">
              Kenali <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-teal-500">Pakar Kami</span>
            </Heading>
            <Text color="gray" size="lg" className="max-w-2xl mx-auto">
              Digital Company Group didukung oleh tenaga ahli profesional yang berdedikasi tinggi untuk memberikan solusi teknologi terbaik bagi bisnis Anda.
            </Text>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-3xl p-6 shadow-xl shadow-gray-200/50 border border-gray-100 hover:shadow-2xl hover:shadow-blue-500/10 hover:-translate-y-2 transition-all duration-300 group text-center flex flex-col items-center"
            >
              <div className="relative w-32 h-32 mb-6 rounded-full overflow-hidden border-4 border-white shadow-lg group-hover:border-blue-50 transition-colors">
                <Image
                  src={member.image}
                  alt={member.name}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
              <p className="text-sm font-semibold text-blue-600 mb-4">{member.role}</p>
              <p className="text-gray-500 text-sm leading-relaxed">{member.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </Section>
  );
}
