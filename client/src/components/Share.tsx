import { FaFacebook, FaInstagram, FaLink, FaWhatsapp } from "react-icons/fa";

const Share = () => {
  const shareUrl = "https://example.com"; // Replace with your URL
  const shareMessage = "Check out this amazing content!";

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Link copied to clipboard!");
    });
  };

  return (
    <>
      {/* Desktop */}
      <div className="absolute sm:flex flex-col gap-1 hidden bg-white dark:bg-[#111111] p-2 rounded-lg top-32 lg:right-28 md:right-16 right-4 text-gray-800 dark:text-slate-200 w-60 shadow-lg">
        {/* WhatsApp */}
        <a
          href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
            `${shareMessage} ${shareUrl}`
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-start gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333333] w-full"
        >
          <FaWhatsapp className="text-xl" /> WhatsApp
        </a>

        {/* Facebook */}
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            shareUrl
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-start gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333333] w-full"
        >
          <FaFacebook className="text-xl" /> Facebook
        </a>

        {/* Instagram (Placeholder, no direct sharing link) */}
        <a
          href="https://www.instagram.com/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-start gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333333] w-full"
        >
          <FaInstagram className="text-xl" /> Instagram
        </a>

        {/* Copy Link */}
        <button
          onClick={handleCopyLink}
          className="flex items-center justify-start gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333333] w-full"
        >
          <FaLink className="text-xl" /> Copy
        </button>
      </div>

      {/* Mobile */}
      <div
        className="fixed inset-x-0 bottom-0 sm:hidden flex items-center justify-center z-20"
        style={{ maxHeight: "70vh", overflowY: "auto" }}
      >
        <div className="relative bg-white dark:bg-[#111111] p-6 rounded-t-lg dark:text-white w-full shadow-lg">
          <div className="flex flex-col gap-2">
            {/* WhatsApp */}
            <a
              href={`https://api.whatsapp.com/send?text=${encodeURIComponent(
                `${shareMessage} ${shareUrl}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333333] w-full"
            >
              <FaWhatsapp className="text-xl" /> WhatsApp
            </a>

            {/* Facebook */}
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                shareUrl
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333333] w-full"
            >
              <FaFacebook className="text-xl" /> Facebook
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-start gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333333] w-full"
            >
              <FaInstagram className="text-xl" /> Instagram
            </a>

            {/* Copy Link */}
            <button
              onClick={handleCopyLink}
              className="flex items-center justify-start gap-2 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-[#333333] w-full"
            >
              <FaLink className="text-xl" /> Copy
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Share;
