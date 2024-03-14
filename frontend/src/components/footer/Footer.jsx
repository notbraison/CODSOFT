const date = new Date();
export const year = date.getFullYear();

const Footer = () => {
  return (
    <div className="bg-dark text-white text-center py-4">
      &copy; {year} All Rights Reserved
    </div>
  );
};

export default Footer;
