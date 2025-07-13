const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="flex justify-center w-full px-4 py-3 text-sm text-gray-600 bg-gray-100 border-t">
      {/* Centered messages */}
      <p>
        © {year} Chatbot Flow Builder. All rights reserved.{" "}
        <a
          href="https://thecodechaser.com"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          thecodechaser.com
        </a>
      </p>
    </footer>
  );
};

export default Footer;
