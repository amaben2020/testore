import Button from '../button';

const Banner = ({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: { text: string; href: string };
}) => {
  return (
    <div className="px-6 py-4 text-white bg-gradient-to-r from-gray-light to-gray-dark">
      <div className="container flex items-center justify-between mx-auto">
        <h3 className="text-lg font-semibold text-gray-dark">{title}</h3>
        <p className="text-lg font-semibold text-gray-light">{description}</p>
        <Button href={link.href} title={link.text} />
      </div>
    </div>
  );
};

export default Banner;
