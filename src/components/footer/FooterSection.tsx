
import { Link } from 'react-router-dom';

interface FooterLink {
  href: string;
  label: string;
}

interface FooterSectionProps {
  title: string;
  links: FooterLink[];
}

export function FooterSection({ title, links }: FooterSectionProps) {
  return (
    <div>
      <h3 className="mb-4 text-lg font-semibold">{title}</h3>
      <ul className="space-y-2 text-gray-400">
        {links.map(({ href, label }) => (
          <li key={label}>
            {href.startsWith('/') ? (
              <Link to={href} className="hover:text-green-500">{label}</Link>
            ) : (
              <a href={href} className="hover:text-green-500">{label}</a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}