import Breadcrumbs from "../components/Breadcrumbs";

function Regulamin() {
  return (
    <>
      <div className="ml-1 mb-2">
        <Breadcrumbs />
      </div>

      <section
        className="
          mx-auto max-w-5xl
          rounded-2xl
          bg-surface/85
          backdrop-blur-md
          p-6 sm:p-8
          shadow-[0_10px_30px_rgba(43,58,103,0.15)]
        "
      >
        {/* REGULAMIN */}
        <h1 className="mb-6 text-center text-2xl font-semibold text-lineStrong">
          REGULAMIN WITRYNY INTERNETOWEJ{" "}
          <span className="text-textAccent">LS Studio</span>
        </h1>

        <div className="space-y-4 text-sm leading-relaxed text-textSecondary">
          <p className="font-semibold text-lineStrong">
            §1. Informacje ogólne
          </p>

          <p className="pl-4">
            Witryna internetowa <strong>LS STUDIO</strong> prowadzona jest przez:
            Larysa Shepetko.
          </p>

          <div className="pl-4">
            <p className="font-medium text-lineStrong">
              Kontakt z administratorem:
            </p>
            <p>
              <strong>e-mail:</strong>{" "}
              <span className="text-textAccent">
                likashepetko@gmail.com
              </span>
            </p>
            <p>
              <strong>tel.:</strong> +48 501 577 919
            </p>
          </div>

          <p className="font-semibold text-lineStrong">
            §2. Zamówienia
          </p>

          <div className="pl-4 space-y-1">
            <p>
              Zamówienia mogą być dokonywane{" "}
              <strong>wyłącznie przez osoby pełnoletnie</strong>.
            </p>
            <p>Wszystkie ceny podane są w złotych polskich.</p>
            <p>
              Dostawa realizowana jest przez InPost, DPD, Pocztę Polską lub
              odbiór osobisty w Mińsku Mazowieckim.
            </p>
          </div>

          <p className="font-semibold text-lineStrong">
            §3. Rejestracja i konto
          </p>

          <div className="pl-4 space-y-1">
            <p>
              Klient może założyć konto użytkownika w celu dostępu do historii
              zamówień i ulubionych produktów.
            </p>
            <p>
              Rejestracja wymaga podania adresu e-mail oraz hasła.
            </p>
            <p>Klient zobowiązuje się do podania prawdziwych danych.</p>
          </div>

          <p className="font-semibold text-lineStrong">
            §4. Płatność i dostawa
          </p>

          <div className="pl-4 space-y-1">
            <p>
              Aktualnie witryna nie obsługuje płatności online.
            </p>
            <p>
              Zamówienia realizowane są po indywidualnym ustaleniu szczegółów
              z właścicielem witryny.
            </p>
          </div>

          <p className="font-semibold text-lineStrong">
            §5. Reklamacje
          </p>

          <div className="pl-4 space-y-1">
            <p>
              Reklamacje należy zgłaszać drogą mailową w ciągu 14 dni od
              otrzymania produktu.
            </p>
            <p>
              Reklamacje rozpatrywane są w terminie do 14 dni.
            </p>
          </div>

          <p className="font-semibold text-lineStrong">
            §6. Zastrzeżenia
          </p>

          <div className="pl-4 space-y-1">
            <p>
              Witryna zastrzega sobie prawo do wprowadzania zmian w regulaminie.
            </p>
            <p>
              Korzystanie z witryny oznacza akceptację regulaminu.
            </p>
          </div>
        </div>

        {/* POLITYKA PRYWATNOŚCI */}
        <h2 className="mt-10 mb-6 text-center text-2xl font-semibold text-lineStrong">
          POLITYKA PRYWATNOŚCI{" "}
          <span className="text-textAccent">LS Studio</span>
        </h2>

        <div className="space-y-4 text-sm leading-relaxed text-textSecondary">
          <p className="font-semibold text-lineStrong">
            §1. Administrator danych
          </p>

          <p className="pl-4">
            Administratorem danych osobowych jest LS STUDIO – Larysa Shepetko.
          </p>

          <p className="font-semibold text-lineStrong">
            §2. Zakres i cel przetwarzania
          </p>

          <div className="pl-4 space-y-1">
            <p>Dane przetwarzane są w celu:</p>
            <ul className="list-disc pl-5">
              <li>realizacji zamówień,</li>
              <li>kontaktu z klientem,</li>
              <li>obsługi konta użytkownika.</li>
            </ul>
            <p>
              Dane nie są przekazywane podmiotom trzecim.
            </p>
          </div>

          <p className="font-semibold text-lineStrong">
            §3. Prawa użytkownika
          </p>

          <ul className="pl-9 list-disc">
            <li>dostęp do danych,</li>
            <li>ich sprostowanie lub usunięcie,</li>
            <li>wniesienie sprzeciwu lub skargi.</li>
          </ul>

          <p className="font-semibold text-lineStrong">
            §4. Cookies
          </p>

          <p className="pl-4">
            Strona wykorzystuje pliki cookies w celach statystycznych oraz
            funkcjonalnych.
          </p>
        </div>
      </section>
    </>
  );
}

export default Regulamin;