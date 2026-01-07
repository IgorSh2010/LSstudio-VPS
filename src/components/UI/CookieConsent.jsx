import { useEffect, useState } from "react";

const CookieConsent = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem("cookieConsent");
    if (!accepted) {
      setIsVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookieConsent", "true");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-pink-200 text-gray-800 p-4 z-50 shadow-md">
      <div className="max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        <p className="text-sm">
          Strona wykorzystuje pliki cookies w celu poprawy jakości usług. Korzystając ze strony wyrażasz zgodę na ich użycie.
          Techniczne i funkcjonalne pliki cookie umożliwiają prawidłowe działanie naszej strony internetowej. Wykorzystujemy je w celu zapewnienia bezpieczeństwa i odpowiedniego wyświetlania strony. Dzięki nim możemy ulepszyć usługi oferowane za jej pośrednictwem, na przykład dostosowując je do wyborów użytkownika. Pliki z tej kategorii umożliwiają także rozpoznanie preferencji użytkownika po powrocie na naszą stronę.
        </p>
        <button
          onClick={handleAccept}
          className="bg-pink-500 text-white px-4 py-2 rounded hover:bg-pink-600 text-sm"
        >
          Akceptuję
        </button>
      </div>
    </div>
  );
};

export default CookieConsent;
