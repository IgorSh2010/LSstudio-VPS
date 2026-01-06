import Breadcrumbs from "../components/Breadcrumbs";

function About() {
  return (
    <>
      <div className="ml-1 p-2 w-full">
        <Breadcrumbs />
      </div>

      <section className="
        ml-1 p-6 max-w-3xl mx-auto
        rounded-2xl
        backdrop-blur-md
        bg-[#FFF7F9]/80
        shadow-sm
        border border-pink-200/40
        text-[#3B2F33]
      ">
        <h1 className="text-2xl font-semibold mb-4 text-pink-700">
          Witajcie w <strong>LS Studio</strong> ✨
        </h1>

        <div className="space-y-4 text-sm leading-relaxed">
          <p>
            Mam na imię <strong>Larysa Shepetko</strong> i z ogromną radością witam Was
            na stronie mojej pracowni rękodzieła.
          </p>

          <p>
            <strong>LS Studio</strong> to miejsce stworzone z pasji do tworzenia
            pięknych, unikalnych rzeczy. Każdy przedmiot powstaje z dbałością
            o szczegóły, sercem i z myślą o tych, którzy cenią ręczną pracę
            i wyjątkowy styl.
          </p>

          <p>
            Z dumą prezentuję Wam nasze produkty – od dekoracji wnętrz,
            przez akcesoria, po ręcznie robione prezenty.
          </p>

          <p>
            Dziękuję, że jesteście z nami. Mam nadzieję, że znajdziecie tu coś,
            co Was zachwyci i zostanie z Wami na dłużej.
          </p>

          <div className="pt-2">
            <p>Z serdecznymi pozdrowieniami,</p>
            <p className="font-semibold">Larysa Shepetko</p>
            <p className="italic text-pink-700">LS Studio</p>
          </div>

          <a
            href="/regulamin"
            className="
              inline-block mt-2
              text-sm text-pink-700
              border-b border-pink-300/60
              hover:border-pink-500
              transition-colors
            "
          >
            Regulamin i Polityki prywatności
          </a>
        </div>
      </section>
    </>
  );
}

export default About;
