

interface PageHeaderProps {
  title: string;
  description: string;
  image: string;
}

export function PageHeader({ title, description, image }: PageHeaderProps) {
  return (
    <section className="relative flex min-h-[60vh] items-center justify-center overflow-hidden pt-16">
      <div className="absolute inset-0 z-0">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      
      <div className="relative z-10 mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
        <h1 className="mb-6 text-5xl font-bold leading-tight tracking-tight text-white">
          {title}
        </h1>
        <p className="mx-auto text-xl text-gray-300">
          {description}
        </p>
      </div>
    </section>
  );
}