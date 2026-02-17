import React from 'react';

interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle }) => {
  return (
    <section
      className="relative py-20 w-screen max-w-[100vw] overflow-hidden"
      style={{
        backgroundImage: `linear-gradient(135deg, hsl(220 60% 20% / 0.92), hsl(220 60% 30% / 0.85)), url('/lovable-uploads/58f1478c-d1dd-44f8-ba7c-7c2ac9498182.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        marginLeft: 'calc(-50vw + 50%)',
        marginRight: 'calc(-50vw + 50%)',
        width: '100vw'
      }}
    >
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white tracking-tight">{title}</h1>
        {subtitle && (
          <p className="text-lg text-white/75 max-w-2xl mx-auto leading-relaxed">{subtitle}</p>
        )}
      </div>
    </section>
  );
};

export default PageHeader;
