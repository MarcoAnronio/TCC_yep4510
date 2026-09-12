import React, { useEffect, useState, useRef } from "react";
import Layout from "../components/layout.js";
import "../style/PaginaInicio.css";
import "../style/Global.css";

const banners = [
  { src: "/images/ImagemBrasileirosDinamarca.jpg", alt: "Intercâmbio Longa Duração" },
  { src: "/images/ImagemIntercambistas1.jpg", alt: "Intercâmbio Curta Duração" },
  { src: "/images/ImagemIntercambistas2.jpg", alt: "Cultura e Experiências" },
];

function PaginaInicio() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef(null);

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(
      () => setIndex((prev) => (prev + 1) % banners.length),
      5000
    );
    return () => resetTimeout();
  }, [index]);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  const handleNext = () => setIndex((prev) => (prev + 1) % banners.length);
  const handlePrev = () =>
    setIndex((prev) => (prev === 0 ? banners.length - 1 : prev - 1));

  return (
    <Layout>

      <h1 className="titulo-principal"><img src="/images/Logo4510.png" alt="Sobre o YEP" /></h1>

      {/* CARROSSEL */}
      <section className="carousel-section">
        <div className="carousel-container">
          {banners.map((b, idx) => (
            <img
              key={idx}
              src={b.src}
              alt={b.alt}
              className={`carousel-img ${idx === index ? "visible" : ""}`}
            />
          ))}
          <button className="carousel-btn prev" onClick={handlePrev}>
            ‹
          </button>
          <button className="carousel-btn next" onClick={handleNext}>
            ›
          </button>
        </div>
      </section>

      
      <section className="sobre-yep">
        <div className="sobre-content">
          <div className="sobre-text">
            <h2>Sobre o YEP 4510</h2>
            <p>
              Há mais de <strong>50 anos</strong>, o Rotary promove o Programa de Intercâmbio Jovem (YEP),
              oferecendo aos jovens a oportunidade de estudar e viver em outro país, desenvolvendo
              liderança, empatia e visão global. O Distrito 4510 é referência em <strong>programas culturais e educacionais</strong>,
              conectando alunos, famílias e clubes ao redor do mundo.
            </p>
            <p>
              Acreditamos em parcerias internacionais, amizades duradouras e experiências que
              transformam vidas. Nosso compromisso é inspirar a juventude a construir um futuro melhor,
              guiado pelos valores rotários de <strong>amizade, paz e compreensão mútua</strong>.
            </p>
          </div>

          <div className="sobre-img">
            <img src="/images/LogoRYE.png" alt="Sobre o YEP" />
          </div>
        </div>
      </section>

      <section className="intercambio-longad">
        <div className="intercambio-content">
          <div className="intercambio-text">
            <h2>Programa de Intercâmbio de Longa Duração</h2>
            <h4>Visão Geral e Especificidades</h4>
            <p>
              Imagina viver um ano em um país diferente, mergulhando de cabeça em uma nova cultura,
              aprendendo uma nova língua e fazendo amigos que vão durar a vida inteira. O Programa de
              Intercâmbio de Longa Duração do Rotary do Distrito 4510 oferece exatamente isso a jovens
              na faixa etária, conforme tabela:
            </p>

            <ul>
              <li>Em 2025 — aceitamos candidatos nascidos a partir de 1 de janeiro de 2009.</li>
              <li>Em 2026 — aceitamos candidatos nascidos a partir de 1 de janeiro de 2010.</li>
              <li>Em 2027 — aceitamos candidatos nascidos a partir de 1 de janeiro de 2011, e assim por diante.</li>
            </ul>

            <p>
              A seleção da cidade, das famílias anfitriãs e da instituição de ensino é responsabilidade
              do distrito anfitrião. Em casos em que o distrito abrange mais de um país, como o distrito
              5020 (EUA e Canadá), a alocação do estudante é decidida exclusivamente por seus dirigentes.
              Os intercâmbios duram de 10 meses a um ano, com partidas geralmente em agosto, alinhadas ao
              início do ano letivo no hemisfério norte.
            </p>

            <h4>Anfitrionamento</h4>
            <p>
              O programa é essencialmente recíproco. Solicita-se às famílias participantes que indiquem
              até quatro residências dispostas a compartilhar essa responsabilidade ao longo do ano,
              fortalecendo o sentido de comunidade e parceria com o Rotary.
            </p>

            <h4>Compromisso Acadêmico</h4>
            <p>
              Conhecido como <i>year study exchange</i>, o compromisso com a educação é inegociável.
              A frequência escolar facilita a integração social, a expansão cultural e o domínio do idioma.
            </p>
          </div>

          <div className="intercambio-img">
            <img src="/images/Logo4510.png" alt="Intercâmbio de Longa Duração" />
            <img src="/images/ImagemRotex2.jpg" alt="Intercâmbio de Longa Duração" />
          </div>
        </div>
      </section>

      <footer className="footer">
        <p>© 2025 YEP 4510 - Distrito 4510 | Rotary Youth Exchange</p>
        <div className="socials">
          <a href="https://instagram.com" target="_blank" rel="noreferrer">
            <img src="/icons/Instagram.svg" alt="Instagram" />
          </a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer">
            <img src="/icons/Facebook.svg" alt="Facebook" />
          </a>
          <a href="https://rotary.org" target="_blank" rel="noreferrer">
            <img src="/icons/Rotary.svg" alt="Rotary" />
          </a>
        </div>
      </footer>
    </Layout>
  );
}

export default PaginaInicio;
