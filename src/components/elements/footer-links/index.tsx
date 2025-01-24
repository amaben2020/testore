import { TSocialLinks } from './data/data';

const FooterLinks = ({
  data,
  title,
}: {
  data: TSocialLinks[];
  title: string;
}) => {
  return (
    <div>
      <h4 className="text-sm text-[#878787]">{title}</h4>
      <ul className="mt-4 space-y-3">
        {data.map((social) => (
          <li key={social.id}>
            <a
              href={social.href}
              target="_blank"
              rel="noreferrer"
              className="text-sm text-black"
            >
              {social.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterLinks;
